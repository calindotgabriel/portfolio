# 01 — Ingestie idempotentă de webhook-uri de plată · REFERINȚĂ

> **Nu citi asta înainte de Runda 1.** Fă întâi 40 min la tablă, oarbă, pe cadrul de 7 pași.
> Abia apoi deschizi fișierul ăsta, compari, și scrii exact 3 lucruri ratate în
> `01-idempotent-webhooks.md`.

Promptul: *„Primim webhook-uri de la Stripe pentru evenimente de plată. Proiectează ingestia
astfel încât livrarea dublă, evenimentele în altă ordine și replay-ul să nu strice nimic."*

---

## 1. Cerințe

### Funcționale
- Primim HTTP POST de la un provider de plăți (Stripe ca model) pe un endpoint public.
- Fiecare eveniment are un `id` stabil dat de provider (`evt_...`) și un `type`
  (`payment_intent.succeeded`, `charge.refunded`, `charge.dispute.created`, ...).
- Pentru fiecare eveniment *unic* rulăm exact o dată efectele din aval: scriem în ledger,
  actualizăm starea comenzii, trimitem mail de confirmare, notificăm alte servicii.
- Un eveniment livrat de N ori produce **un singur** set de efecte.
- Endpointul răspunde providerului rapid; procesarea grea e asincronă.
- Putem reprocesa manual un eveniment (replay controlat de noi) fără dublă-execuție.

### Non-funcționale
- **Corectitudine > throughput.** Bani. O dublă-creditare e incident, nu bug.
- Durabilitate: un eveniment `2xx`-uit nu se pierde niciodată, nici la crash imediat după ACK.
- Latența răspunsului către provider < ~1s (Stripe dă timeout la ~10s → apoi retrimite).
- Disponibilitate rezonabilă: dacă suntem jos, ne bazăm pe retry-urile providerului (ore–zile),
  nu pierdem evenimente.
- Securitate: doar providerul poate scrie; evenimentele vechi nu pot fi rejucate de un atacator.
- Observabilitate: știm câte evenimente au intrat, câte așteaptă, câte au eșuat, care e lag-ul.
- Webhook-urile sunt **best-effort**. Sistemul trebuie să prindă și evenimentele care nu ajung
  niciodată — prin reconciliere, nu prin speranță.

---

## 2. Cifre de scală — spuse cu voce tare

- Platformă mid-size: ~50 000 plăți/zi ⇒ ~150 000 evenimente/zi (3–4 evenimente per plată)
  ⇒ **~2 evenimente/sec în medie**, ~20/sec în vârf (batch de refund-uri, payout-uri).
- Payload ~2–5 KB JSON. 150k/zi × 4 KB ≈ **600 MB/zi** date brute dacă păstrăm tot payload-ul.
- Retenția evenimentelor procesate: providerul retrimite până la ~3 zile ⇒ dedup-ul trebuie să
  țină minim 3 zile; din motive de audit ținem **90 de zile** hot, apoi arhivă.

> **Fraza de senior:** „Throughput-ul aici e minuscul — 20 req/sec e nimic. Asta e o problemă de
> corectitudine sub retry și concurență, nu de scală. Nu-mi trebuie sharding, îmi trebuie un
> unique constraint și o coadă durabilă."

---

## 3. Suprafața de API

### Endpoint public (providerul → noi)
```
POST /webhooks/stripe
Headers: Stripe-Signature: t=1699999999,v1=<hmac_sha256>
Body:    <raw JSON, citit ca bytes, NU parsat înainte de verificarea semnăturii>

200  primit (sau deja primit — duplicat) → providerul nu retrimite
400  semnătură invalidă / timestamp în afara toleranței → logăm, alertăm dacă rata crește
500/503  noi suntem jos → providerul retrimite mai târziu (retry-ul lui = coada noastră de rezervă)
```

Reguli:
- **Un singur** endpoint pe provider. Rutarea pe `type` se face intern, nu prin URL-uri diferite.
- Răspunde `200` și pentru duplicate — altfel providerul crede că a eșuat și insistă.
- Nu returna `200` decât **după** ce evenimentul e scris durabil (persistat), nu doar primit în RAM.

### Endpoint intern (noi → noi, pentru replay controlat)
```
POST /internal/webhooks/{event_id}/reprocess   → re-rulează efectele idempotent, pentru debugging
GET  /internal/webhooks?status=dead            → coada de evenimente moarte
```

### Job de reconciliere (cron, noi → provider)
```
La fiecare 15 min: GET https://api.provider/v1/events?created>=<last_cursor>
Comparăm cu ce avem în webhook_events. Ce lipsește → îl injectăm în pipeline ca și cum ar fi
venit pe webhook. Ce avem noi și el nu → imposibil, dar logăm.
```

---

## 4. Model de date

### `webhook_events` — inbox-ul durabil, sursa de adevăr pentru „am văzut evenimentul ăsta?"
```sql
CREATE TABLE webhook_events (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider         text        NOT NULL,              -- 'stripe'
  provider_event_id text       NOT NULL,              -- 'evt_1abc...'
  event_type       text        NOT NULL,              -- 'payment_intent.succeeded'
  api_version      text,
  payload          jsonb       NOT NULL,              -- evenimentul brut
  signature        text        NOT NULL,
  received_at      timestamptz NOT NULL DEFAULT now(),
  status           text        NOT NULL DEFAULT 'received',
                   -- received | processing | processed | failed | dead
  attempts         int         NOT NULL DEFAULT 0,
  next_attempt_at  timestamptz,
  last_error       text,
  processed_at     timestamptz,

  UNIQUE (provider, provider_event_id)                -- ← GARANȚIA de dedup
);

CREATE INDEX ON webhook_events (status, next_attempt_at);   -- worker-ul pescuiește de aici
CREATE INDEX ON webhook_events (received_at);               -- retenție / arhivare
```

### `processed_effects` — idempotență a efectelor din aval (dacă nu sunt natural idempotente)
```sql
CREATE TABLE processed_effects (
  event_id     uuid NOT NULL REFERENCES webhook_events(id),
  effect_name  text NOT NULL,          -- 'ledger_entry' | 'confirmation_email' | 'notify_fulfillment'
  result_ref   text,                   -- id-ul rândului creat, message-id-ul mailului etc.
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (event_id, effect_name)
);
```

### `ledger_entries` — exemplu de efect, el însuși idempotent prin cheie
```sql
CREATE TABLE ledger_entries (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key   text UNIQUE NOT NULL,   -- ex. 'evt_1abc:credit' — derivată din event_id
  account_id        uuid NOT NULL,
  amount_minor      bigint NOT NULL,
  currency          text NOT NULL,
  created_at        timestamptz NOT NULL DEFAULT now()
);
```

Idee-cheie: **cheia de idempotență a fiecărui efect se derivă determinist din `provider_event_id`**.
Același eveniment ⇒ aceeași cheie ⇒ `INSERT` al doilea eșuează pe `UNIQUE` ⇒ no-op.

---

## 5. Componente și flux

```
                 ┌─────────────────────────────────────────────┐
   Provider ───► │  Webhook handler (Fastify)                   │
   (Stripe)      │  1. citește raw bytes                        │
     ▲  │        │  2. verifică HMAC + toleranță timestamp ±5m  │
     │  │        │  3. INSERT ... ON CONFLICT DO NOTHING        │──► [ webhook_events ]
     │  │        │     în webhook_events (status='received')    │      (Postgres)
     │  │        │  4. return 200  (și dacă a fost duplicat)    │          │
     │  │        └─────────────────────────────────────────────┘          │
     │  │                                                                 │
     │  │        ┌─────────────────────────────────────────────┐          │
     │  └───retry│  Worker (poll SELECT ... FOR UPDATE          │◄─────────┘
     │  (ore/zile)│         SKIP LOCKED  WHERE status IN         │
     │           │         ('received','failed')                │
     │           │         AND next_attempt_at <= now())        │
     │           │  - status='processing'                        │
     │           │  - rulează efectele în UNA tranzacție:        │
     │           │      ledger + processed_effects + status      │
     │           │  - la succes: status='processed'             │
     │           │  - la eroare: attempts++, backoff,           │
     │           │      status='failed'; după N → 'dead' + alert │
     │           └─────────────────────────────────────────────┘
     │
     │           ┌─────────────────────────────────────────────┐
     └───────────│  Reconciler (cron 15 min)                    │
     poll events │  listează events din API provider,           │
                 │  injectează ce lipsește în webhook_events    │
                 └─────────────────────────────────────────────┘
```

Decizii de flux:
- **Handler-ul nu face logică de business.** Doar: verifică, persistă, ACK. Sub 50ms.
- Inbox-table *este* coada. La scala asta nu-ți trebuie Kafka/SQS. `SELECT ... FOR UPDATE SKIP
  LOCKED` îți dă workeri concurenți fără dublă-luare.
- Efectele + marcarea `processed` sunt în **aceeași tranzacție DB**. Fie toate, fie niciunul.
  Asta e ce face crash-ul recuperabil: dacă murim, tranzacția face rollback, evenimentul rămâne
  `processing`/`received` și un reaper îl repune (vezi mai jos).
- Efectele non-transacționale (mail, HTTP către alt serviciu) se fac **după** commit, cu propria
  cheie de idempotență în `processed_effects`, și sunt re-încercabile.

---

## 6. Moduri de eșec — pasul care contează

| # | Ce se întâmplă | Ce facem | De ce ține |
|---|---|---|---|
| 1 | **ACK lent** (procesare inline 15s) → provider timeout → retrimite | Handler-ul nu procesează inline. Doar persistă + ACK în <1s. | Eliminăm cauza principală de duplicate. |
| 2 | **Livrare dublă concurentă** — 2 copii ale `evt_X` intră în paralel | `INSERT ... ON CONFLICT (provider, provider_event_id) DO NOTHING`. Una câștigă, a doua e no-op, ambele primesc `200`. | Constrângerea `UNIQUE` serializează în DB; nu-ți trebuie lock aplicativ. |
| 3 | **Crash după efect, înainte de ACK** | Efect + `status='processed'` sunt în aceeași tranzacție. Dacă murim înainte de commit → rollback → evenimentul se reia. Dacă murim după commit dar înainte de răspuns → providerul retrimite → dedup pe pasul 2, întoarcem `200`. | Atomicitate DB + dedup pe re-livrare. Nu există dublă-creditare. |
| 4 | **Worker moare cu evenimentul în `processing`** | Reaper: `UPDATE ... SET status='received' WHERE status='processing' AND updated_at < now() - interval '5 min'`. Sau folosești lock-ul tranzacției (dacă worker-ul ține `FOR UPDATE`, lock-ul cade la disconnect și rândul redevine luabil). | Nimic nu rămâne blocat permanent. |
| 5 | **DB jos când vine webhook-ul** | Handler-ul întoarce `503`. Providerul retrimite ore/zile. | Retry-ul providerului = coada de rezervă durabilă. Nu inventăm noi persistență. |
| 6 | **Eveniment în altă ordine** — `payment_intent.succeeded` înaintea lui `...created` | Pentru evenimente care mută bani: **re-fetch obiectul din API-ul providerului după id** și folosim starea aia ca adevăr, nu payload-ul evenimentului. Alternativ: versionăm după `created` al providerului și ignorăm ce e mai vechi decât starea curentă. | API-ul providerului e sursa de adevăr; payload-ul de webhook e doar un semnal „uită-te acum". |
| 7 | **Replay attack** — atacatorul retrimite un eveniment valid vechi | Verificăm `t=` din `Stripe-Signature`: dacă `|now - t| > 5 min` → `400`. Plus HMAC pe `t.payload`. | Semnătura veche rămâne validă criptografic; fereastra de timp e ce o invalidează. |
| 8 | **Semnătură invalidă** (secret rotit, sau chiar atac) | `400`, log structurat. Dacă rata > prag → alertă (poate secretul e desincronizat după deploy). | Nu procesăm ce nu putem autentifica; nu tăcem peste un posibil incident. |
| 9 | **Poison event** — unul care eșuează la fiecare încercare | `attempts++`, backoff exponențial cu jitter (`next_attempt_at`). După N=8 → `status='dead'`, alertă, **worker-ul merge mai departe** cu restul. | O intrare stricată nu blochează coada. DLQ + om în buclă. |
| 10 | **Eveniment care nu ajunge niciodată** (providerul îl pică de tot) | Reconciler la 15 min listează `events` din API și injectează ce lipsește. | Webhook-urile sunt best-effort by design. Reconcilierea e singura garanție reală de completitudine. |
| 11 | **Efect parțial** — ledger scris, dar mailul a picat | Ledger e în tranzacție (commit-uit). Mailul e efect post-commit, cu rând propriu în `processed_effects`; lipsa lui = re-încercabil independent, fără a re-scrie ledger-ul. | Separi efectele transacționale de cele externe; fiecare are propria idempotență. |
| 12 | **Furtună de retry-uri** după un downtime de 2h | Worker-ul are concurență limitată + rate-limit pe efectele externe. Coada se drenează în ordine, cu backoff. | Degradare grațioasă; nu prăbușim serviciile din aval când ne revenim. |

---

## 7. Trade-offs — alternativa respinsă și de ce

| Decizie | Ales | Respins | De ce |
|---|---|---|---|
| **Unde trăiește dedup-ul** | `UNIQUE` în Postgres | `SET NX` în Redis | DB-ul e durabil și tranzacțional împreună cu efectul. Redis adaugă o componentă și o fereastră de inconsistență (event scris în Redis, crash înainte de DB). La 20 req/sec, viteza Redis nu-mi cumpără nimic. |
| **Coadă** | Inbox table + `SKIP LOCKED` | Kafka / SQS | Scala nu justifică un broker. Inbox-table îmi dă durabilitate, retry, DLQ și replay cu unelte pe care deja le operez. Aș trece la broker peste ~1000 evenimente/sec sau dacă mai mulți consumatori au nevoie de același stream. |
| **Procesare** | Asincron (handler persistă, worker procesează) | Inline în handler | Inline riscă timeout-ul providerului (→ duplicate) și leagă latența providerului de latența serviciilor mele din aval. |
| **Sursa de adevăr pentru starea plății** | Re-fetch din API-ul providerului pentru evenimente cu bani | Am încredere în payload-ul webhook-ului | Imun la out-of-order și la payload manipulat/învechit. Costă un call de rețea per eveniment — acceptabil la volumul ăsta. Pentru evenimente pur informative (ex. `customer.updated`) am încredere în payload. |
| **Semantica de livrare** | At-least-once + procesare idempotentă = *effectively-once* | „Exactly-once delivery" | Exactly-once delivery nu există peste o rețea nesigură. Muți problema la *exactly-once processing*, care se rezolvă cu chei de idempotență. |
| **Retenția dedup** | 90 zile în tabel hot | Șterg imediat după `processed` | Providerul retrimite până la 3 zile; auditul vrea mai mult. Ștergerea rapidă ar face ca o re-livrare târzie să fie tratată ca eveniment nou. |

---

## Checklist de comparație — bifează-ți Runda 1

Astea sunt lucrurile pe care lumea le ratează la promptul ăsta. Dacă ți-au lipsit ≥1, alege 3
pentru `01-idempotent-webhooks.md`:

- [ ] Ai zis explicit „corectitudine, nu scală" și ai dat cifre?
- [ ] Handler-ul **doar** verifică + persistă + ACK, zero logică de business?
- [ ] Dedup-ul e o **constrângere `UNIQUE`** pe `(provider, event_id)`, nu un `SELECT` urmat de `INSERT`?
- [ ] Ai tratat **livrarea dublă concurentă** (nu doar secvențială)?
- [ ] Efect + marcarea `processed` în **aceeași tranzacție**?
- [ ] Ai un plan pentru **worker mort cu eveniment în `processing`** (reaper / lock timeout)?
- [ ] **Out-of-order**: re-fetch din API-ul providerului, nu încredere oarbă în payload?
- [ ] **Replay**: verificare de timestamp, nu doar HMAC?
- [ ] **DLQ / poison event**: după N încercări → `dead` + alertă, coada merge mai departe?
- [ ] **Reconciliere** pentru evenimentele care nu ajung deloc — ai zis că webhook-urile sunt best-effort?
- [ ] Ai numit măcar **3 trade-off-uri** cu alternativa respinsă?
- [ ] Ai legat ceva de experiența reală (Bitpanda custody / RWE)?

---

## Legături

- Build-ul care fixează asta în cod: `training/design/01-idempotent-webhooks.build.md` (de scris)
- Depth înrudit: tranzacții, izolare, `SKIP LOCKED` → `training/depth/`
- Următorul prompt care refolosește 80% din asta: **02 — export pipeline cu retry/backoff/DLQ**
