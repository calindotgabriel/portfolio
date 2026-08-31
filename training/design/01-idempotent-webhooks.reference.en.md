# 01 — Idempotent payment-webhook ingestion · REFERENCE

> **Do not read this before Round 1.** Do 40 minutes at the whiteboard first, blind, on the
> 7-step frame. Only then open this file, compare, and write down exactly 3 things you missed in
> `01-idempotent-webhooks.md`.

Prompt: *"We receive webhooks from Stripe for payment events. Design the ingestion so that
duplicate delivery, out-of-order events, and replay don't break anything."*

---

## 1. Requirements

### Functional
- We receive HTTP POST from a payment provider (Stripe as the model) on a public endpoint.
- Every event has a stable provider-issued `id` (`evt_...`) and a `type`
  (`payment_intent.succeeded`, `charge.refunded`, `charge.dispute.created`, ...).
- For each *unique* event we run the downstream effects exactly once: write to the ledger,
  update order state, send a confirmation email, notify other services.
- An event delivered N times produces **one** set of effects.
- The endpoint acknowledges the provider fast; heavy processing is asynchronous.
- We can manually reprocess an event (a replay we control) without double execution.

### Non-functional
- **Correctness > throughput.** This is money. A double credit is an incident, not a bug.
- Durability: an event we've `2xx`'d is never lost, not even on a crash immediately after ACK.
- Response latency to the provider < ~1s (Stripe times out at ~10s → then retries).
- Reasonable availability: if we're down, we rely on the provider's retries (hours–days), we
  don't lose events.
- Security: only the provider can write; old events can't be replayed by an attacker.
- Observability: we know how many events came in, how many are waiting, how many failed, and
  the processing lag.
- Webhooks are **best-effort**. The system must also catch events that never arrive — via
  reconciliation, not hope.

---

## 2. Scale numbers — said out loud

- Mid-size platform: ~50,000 payments/day ⇒ ~150,000 events/day (3–4 events per payment)
  ⇒ **~2 events/sec average**, ~20/sec peak (refund batches, payouts).
- Payload ~2–5 KB JSON. 150k/day × 4 KB ≈ **600 MB/day** of raw data if we keep the full payload.
- Retention of processed events: the provider retries for up to ~3 days ⇒ dedup must hold at
  least 3 days; for audit we keep **90 days** hot, then archive.

> **The senior sentence:** "Throughput here is tiny — 20 req/sec is nothing. This is a
> correctness-under-retry-and-concurrency problem, not a scale problem. I don't need sharding, I
> need a unique constraint and a durable queue."

---

## 3. API surface

### Public endpoint (provider → us)
```
POST /webhooks/stripe
Headers: Stripe-Signature: t=1699999999,v1=<hmac_sha256>
Body:    <raw JSON, read as bytes, NOT parsed before signature verification>

200  received (or already received — duplicate) → provider won't retry
400  invalid signature / timestamp outside tolerance → we log, alert if the rate climbs
500/503  we are down → provider retries later (its retry = our fallback queue)
```

Rules:
- **One** endpoint per provider. Routing on `type` happens internally, not through different URLs.
- Return `200` for duplicates too — otherwise the provider thinks it failed and keeps retrying.
- Don't return `200` until the event is written durably (persisted), not just received in memory.

### Internal endpoint (us → us, for controlled replay)
```
POST /internal/webhooks/{event_id}/reprocess   → idempotently re-run the effects, for debugging
GET  /internal/webhooks?status=dead            → the dead-letter queue
```

### Reconciliation job (cron, us → provider)
```
Every 15 min: GET https://api.provider/v1/events?created>=<last_cursor>
Compare against what we have in webhook_events. Anything missing → inject it into the pipeline
as if it had arrived on the webhook. Anything we have and it doesn't → impossible, but log it.
```

---

## 4. Data model

### `webhook_events` — the durable inbox, source of truth for "have I seen this event?"
```sql
CREATE TABLE webhook_events (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider          text        NOT NULL,             -- 'stripe'
  provider_event_id text        NOT NULL,             -- 'evt_1abc...'
  event_type        text        NOT NULL,             -- 'payment_intent.succeeded'
  api_version       text,
  payload           jsonb       NOT NULL,             -- the raw event
  signature         text        NOT NULL,
  received_at       timestamptz NOT NULL DEFAULT now(),
  status            text        NOT NULL DEFAULT 'received',
                    -- received | processing | processed | failed | dead
  attempts          int         NOT NULL DEFAULT 0,
  next_attempt_at   timestamptz,
  last_error        text,
  processed_at      timestamptz,

  UNIQUE (provider, provider_event_id)                -- ← the dedup GUARANTEE
);

CREATE INDEX ON webhook_events (status, next_attempt_at);   -- the worker fishes from here
CREATE INDEX ON webhook_events (received_at);               -- retention / archival
```

### `processed_effects` — idempotency for downstream effects (when they aren't naturally idempotent)
```sql
CREATE TABLE processed_effects (
  event_id     uuid NOT NULL REFERENCES webhook_events(id),
  effect_name  text NOT NULL,          -- 'ledger_entry' | 'confirmation_email' | 'notify_fulfillment'
  result_ref   text,                   -- id of the created row, the mail message-id, etc.
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (event_id, effect_name)
);
```

### `ledger_entries` — example effect, itself idempotent via a key
```sql
CREATE TABLE ledger_entries (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key   text UNIQUE NOT NULL,   -- e.g. 'evt_1abc:credit' — derived from event_id
  account_id        uuid NOT NULL,
  amount_minor      bigint NOT NULL,
  currency          text NOT NULL,
  created_at        timestamptz NOT NULL DEFAULT now()
);
```

Key idea: **each effect's idempotency key is derived deterministically from `provider_event_id`**.
Same event ⇒ same key ⇒ the second `INSERT` fails on `UNIQUE` ⇒ no-op.

---

## 5. Components and data flow

```
                 ┌─────────────────────────────────────────────┐
   Provider ───► │  Webhook handler (Fastify)                   │
   (Stripe)      │  1. read raw bytes                           │
     ▲  │        │  2. verify HMAC + timestamp tolerance ±5m    │
     │  │        │  3. INSERT ... ON CONFLICT DO NOTHING        │──► [ webhook_events ]
     │  │        │     into webhook_events (status='received')  │      (Postgres)
     │  │        │  4. return 200  (even if it was a duplicate) │          │
     │  │        └─────────────────────────────────────────────┘          │
     │  │                                                                 │
     │  │        ┌─────────────────────────────────────────────┐          │
     │  └───retry│  Worker (poll SELECT ... FOR UPDATE          │◄─────────┘
     │ (hrs/days)│         SKIP LOCKED  WHERE status IN         │
     │           │         ('received','failed')                │
     │           │         AND next_attempt_at <= now())        │
     │           │  - status='processing'                       │
     │           │  - run effects in ONE transaction:           │
     │           │      ledger + processed_effects + status     │
     │           │  - on success: status='processed'            │
     │           │  - on error: attempts++, backoff,            │
     │           │      status='failed'; after N → 'dead' + alert│
     │           └─────────────────────────────────────────────┘
     │
     │           ┌─────────────────────────────────────────────┐
     └───────────│  Reconciler (cron 15 min)                    │
     poll events │  list events from provider API,              │
                 │  inject whatever is missing into webhook_events │
                 └─────────────────────────────────────────────┘
```

Flow decisions:
- **The handler does no business logic.** Only: verify, persist, ACK. Under 50ms.
- The inbox table *is* the queue. At this scale you don't need Kafka/SQS. `SELECT ... FOR UPDATE
  SKIP LOCKED` gives you concurrent workers with no double pickup.
- The effects + marking `processed` are in the **same DB transaction**. All or nothing. That's
  what makes a crash recoverable: if we die, the transaction rolls back, the event stays
  `processing`/`received`, and a reaper re-queues it (see below).
- Non-transactional effects (email, HTTP to another service) run **after** commit, each with its
  own idempotency key in `processed_effects`, and are individually retryable.

---

## 6. Failure modes — the step that matters

| # | What happens | What we do | Why it holds |
|---|---|---|---|
| 1 | **Slow ACK** (inline processing 15s) → provider timeout → retries | The handler doesn't process inline. Just persist + ACK in <1s. | Removes the primary cause of duplicates. |
| 2 | **Concurrent duplicate delivery** — 2 copies of `evt_X` arrive in parallel | `INSERT ... ON CONFLICT (provider, provider_event_id) DO NOTHING`. One wins, the other is a no-op, both get `200`. | The `UNIQUE` constraint serializes in the DB; you don't need an app-level lock. |
| 3 | **Crash after the effect, before the ACK** | Effect + `status='processed'` are in the same transaction. If we die before commit → rollback → the event is retried. If we die after commit but before responding → the provider retries → dedup on row 2, we return `200`. | DB atomicity + dedup on re-delivery. There is no double credit. |
| 4 | **Worker dies with the event in `processing`** | Reaper: `UPDATE ... SET status='received' WHERE status='processing' AND updated_at < now() - interval '5 min'`. Or rely on the transaction lock (if the worker holds `FOR UPDATE`, the lock drops on disconnect and the row becomes claimable again). | Nothing stays stuck permanently. |
| 5 | **DB down when the webhook arrives** | The handler returns `503`. The provider retries for hours/days. | The provider's retry = the durable fallback queue. We don't reinvent persistence. |
| 6 | **Out-of-order event** — `payment_intent.succeeded` before `...created` | For money-moving events: **re-fetch the object from the provider API by id** and use that state as truth, not the event payload. Alternative: version by the provider's `created` and ignore anything older than current state. | The provider API is the source of truth; the webhook payload is just a "look now" signal. |
| 7 | **Replay attack** — attacker resends an old valid event | Check `t=` in `Stripe-Signature`: if `|now - t| > 5 min` → `400`. Plus HMAC over `t.payload`. | The old signature stays cryptographically valid; the time window is what invalidates it. |
| 8 | **Invalid signature** (rotated secret, or an actual attack) | `400`, structured log. If the rate > threshold → alert (maybe the secret is out of sync after a deploy). | We don't process what we can't authenticate; we don't stay silent over a possible incident. |
| 9 | **Poison event** — one that fails on every attempt | `attempts++`, exponential backoff with jitter (`next_attempt_at`). After N=8 → `status='dead'`, alert, **the worker moves on** with the rest. | A broken entry doesn't block the queue. DLQ + human in the loop. |
| 10 | **Event that never arrives** (provider drops it entirely) | The reconciler every 15 min lists `events` from the API and injects whatever is missing. | Webhooks are best-effort by design. Reconciliation is the only real completeness guarantee. |
| 11 | **Partial effect** — ledger written, but the email failed | Ledger is in the transaction (committed). The email is a post-commit effect with its own row in `processed_effects`; its absence = retryable independently, without re-writing the ledger. | You separate transactional effects from external ones; each has its own idempotency. |
| 12 | **Retry storm** after a 2h downtime | The worker has bounded concurrency + a rate limit on external effects. The queue drains in order, with backoff. | Graceful degradation; we don't knock over downstream services as we recover. |

---

## 7. Trade-offs — the rejected alternative and why

| Decision | Chosen | Rejected | Why |
|---|---|---|---|
| **Where dedup lives** | `UNIQUE` in Postgres | `SET NX` in Redis | The DB is durable and transactional together with the effect. Redis adds a component and an inconsistency window (event written to Redis, crash before the DB). At 20 req/sec, Redis's speed buys me nothing. |
| **Queue** | Inbox table + `SKIP LOCKED` | Kafka / SQS | Scale doesn't justify a broker. The inbox table gives me durability, retry, DLQ, and replay with tools I already operate. I'd move to a broker past ~1000 events/sec or if multiple consumers need the same stream. |
| **Processing** | Async (handler persists, worker processes) | Inline in the handler | Inline risks the provider timeout (→ duplicates) and couples my latency to my downstream services' latency. |
| **Source of truth for payment state** | Re-fetch from the provider API for money events | Trust the webhook payload | Immune to out-of-order and to a tampered/stale payload. Costs one network call per event — acceptable at this volume. For purely informational events (e.g. `customer.updated`) I trust the payload. |
| **Delivery semantics** | At-least-once + idempotent processing = *effectively-once* | "Exactly-once delivery" | Exactly-once delivery doesn't exist over an unreliable network. You move the problem to *exactly-once processing*, which is solved with idempotency keys. |
| **Dedup retention** | 90 days in the hot table | Delete right after `processed` | The provider retries for up to 3 days; audit wants more. Fast deletion would make a late re-delivery look like a new event. |

---

## Comparison checklist — grade your Round 1

These are the things people miss on this prompt. If you missed ≥1, pick 3 for
`01-idempotent-webhooks.md`:

- [ ] Did you explicitly say "correctness, not scale" and give numbers?
- [ ] Does the handler **only** verify + persist + ACK, zero business logic?
- [ ] Is dedup a **`UNIQUE` constraint** on `(provider, event_id)`, not a `SELECT` then `INSERT`?
- [ ] Did you handle **concurrent** duplicate delivery (not just sequential)?
- [ ] Effect + marking `processed` in the **same transaction**?
- [ ] Do you have a plan for a **worker that dies with an event in `processing`** (reaper / lock timeout)?
- [ ] **Out-of-order**: re-fetch from the provider API, not blind trust in the payload?
- [ ] **Replay**: timestamp check, not just HMAC?
- [ ] **DLQ / poison event**: after N attempts → `dead` + alert, the queue moves on?
- [ ] **Reconciliation** for events that never arrive — did you say webhooks are best-effort?
- [ ] Did you name at least **3 trade-offs** with the rejected alternative?
- [ ] Did you tie something to real experience (Bitpanda custody / RWE)?

---

## Links

- The build that cements this in code: `training/design/01-idempotent-webhooks.build.md` (to be written)
- Related depth: transactions, isolation, `SKIP LOCKED` → `training/depth/`
- The next prompt that reuses 80% of this: **02 — export pipeline with retry/backoff/DLQ**
