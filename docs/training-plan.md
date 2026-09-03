# 8-Week Interview Conversion Training Plan

Companion to `market-fit-plan.md` (how to get in the room) and `interview-narrative.md` (what to say
in the room). **This document is about not losing the room.**

## Why This Exists

The funnel says the problem is not distribution:

| Stage | Count | Conversion |
| --- | ---: | --- |
| Applications | ~150 | — |
| Initial screens | 10 | 6.7% — normal for cold applications |
| Technical interviews | 5–6 | ~55% screen→tech — good |
| Offers | 0 | **0%** |

The CV works. The positioning works. Everything after the technical round fails, and there is no
record of why, because no interview was ever debriefed.

**The reframe:** shipping the Bitpanda custody address-book and solving a medium algorithm problem in
25 minutes while narrating out loud are different skills. Eight years of production delivery trains
the first and not the second. This is not a seniority problem — it is an untrained-skill problem, and
the treatment is eight weeks of deliberate practice.

## Where Execution Lives

This document is the **why and how**: the diagnosis, the methods, the rules for each block. It does
not tell you what to do on a given morning, and it does not remember what you did. Those live in
`training/`:

| File | Answers |
| --- | --- |
| Google Calendar | **When.** Time blocks, alarms, boundaries. |
| `training/curriculum.md` | **What today.** All 48 days, with the actual problems and topics named. |
| `training/journal.md` | **What was done.** Every entry, tagged. The system's memory. |
| `training/depth/` | The 12 written explanations and their runnable demos. |
| `training/design/` | Notes from the 10 design prompts and what was missed. |
| `sales/interviews/` | Post-mortems from real interviews and mocks. |

The daily loop: open `training/curriculum.md`, find today's date, do the three rows, then write one
`#log` entry in `training/journal.md` during the 15:15 block. Anything missed gets a `#redo` entry
carrying its own +7 and +21 dates.

## Time Budget

Roughly 60% training / 40% applying. The applying half must stay cheap — see the throughput rules in
`sales/operating-system.md`. Sourcing ceremony is not allowed to eat training hours.

**Daily shape, ~3 hours:**

| Block | Duration | Cadence |
| --- | --- | --- |
| Live coding | 60–90 min | Every day |
| Node/JS/DB depth | 30–45 min | Every day |
| System design | 90 min | 3×/week (Mon/Wed/Fri) |
| Applications + post-mortems | 45–60 min | Every day |
| Mock interview | 60 min | 1–2×/week |

---

## Block 1 — Live Coding

The slowest to fix. Start today, not after reading anything.

**Source:** NeetCode 150 (Blind 75 first if time is tight), in this order:

1. Arrays & hashing
2. Two pointers
3. Sliding window
4. Stack
5. Binary search
6. Linked list
7. Trees
8. Tries
9. Heap / priority queue
10. Backtracking
11. Graphs
12. 1-D dynamic programming

Stop there. Advanced DP, intervals-heavy, and math puzzles are below the return of the first twelve
for a senior backend contractor.

**Rules — these are what is actually being graded, not the answer:**

- TypeScript. Plain editor. No Copilot, no autocomplete-driven solutions.
- **Timer on.** 25 minutes for a medium, 15 for an easy. When it rings, stop. Mark it failed, read the
  solution, and understand it — do not extend the timer. Interviews do not extend the timer.
- **Speak out loud the entire time**, alone, as if someone is listening. Restate the problem, state
  the brute force, state the complexity, state why the better approach is better, then code while
  narrating. This is the single most-transferable habit in this document, and it is impossible to
  learn during a real interview.
- Record audio for the first two weeks and listen back to at least three sessions. The gap between
  what it feels like and what it sounds like is the point.
- Every failed problem goes on the redo list, redone at **+7 days** and **+21 days**.

**Volume target:** 80–100 problems over 8 weeks, ~60% medium. Roughly 2/day.

**The metric that matters is not problems attempted — it is problems solved inside the timer**, on the
first pass, narrating. Track that number and nothing else.

---

## Block 2 — System Design

Not a knowledge problem. A vocabulary and structure problem, and therefore fast to fix.

**Do not practise FAANG-scale prompts.** "Design Twitter" is not what a senior Node contractor gets
asked. Practise this band instead:

1. Idempotent payment-webhook ingestion (duplicate delivery, out-of-order events, replay)
2. An export/report pipeline with retries, backoff, and a dead-letter queue
3. API rate limiting (per-tenant, distributed, token bucket vs sliding window)
4. An audit log for a regulated custody platform (append-only, tamper evidence, retention)
5. Multi-tenant data isolation (row-level vs schema vs database, and the failure modes of each)
6. A read-heavy search API with caching and invalidation
7. A job scheduler / delayed-task system
8. File upload and processing at scale (presigned URLs, virus scan, async pipeline)
9. Notification fan-out with delivery guarantees
10. A migration from a legacy service with zero downtime and a rollback path

**Fixed frame, every single time — the frame is the skill:**

1. Clarify requirements. Functional, then non-functional.
2. State scale numbers out loud, even guessed ones. Requests/sec, data volume, growth.
3. API surface. Concrete endpoints or messages.
4. Data model. Tables/collections, keys, indexes.
5. Components and data flow. Draw it.
6. **Failure modes.** What breaks, what is retried, what is idempotent, what is lost. This is where
   senior candidates separate themselves, and it maps directly onto real Bitpanda/RWE experience.
7. Tradeoffs. Name the alternative that was rejected and why.

**Session shape (90 min):** 40 min whiteboarding out loud → compare against a reference → write down
exactly three things missed → add them to a running gaps list at the bottom of this file.

**References:** Alex Xu, *System Design Interview* Vol. 1 · ByteByteGo · Kleppmann, *Designing
Data-Intensive Applications* ch. 1–9.

---

## Block 3 — Node / JS / DB Depth

The cheapest win available. The practical knowledge is already there from Bitpanda, RWE and
ImmoScout24 — what is missing is the language to express it under questioning.

The topic list already exists at `interview-narrative.md:96-107`. Walk it one topic at a time.

**Each topic produces two artifacts — both required:**

1. A written explanation of ~200 words, in own words, no copy-paste.
2. A small runnable demo that proves it.

Order, highest interview-frequency first:

| # | Topic | Demo | Sources |
| --- | --- | --- | --- |
| 1 | Event loop phases; microtasks vs macrotasks | Ordering puzzle with `setTimeout`, `setImmediate`, `process.nextTick`, promises | `nodejs.org/en/guides/event-loop-timers-and-nexttick` |
| 2 | libuv threadpool vs `worker_threads`; CPU-bound vs I/O-bound | Block the loop, then fix it with a worker pool — this *is* the RWE story | `nodejs.org/en/docs/guides/dont-block-the-event-loop` · `nodejs.org/api/worker_threads.html` |
| 3 | Stream backpressure | Fast producer, slow consumer, memory growth, then `pipeline()` | `nodejs.org/en/guides/backpressuring-in-streams` |
| 4 | GC, memory leaks, heap snapshots | Leak a closure/`Map`, find it in a heap snapshot | `nodejs.org/en/learn/diagnostics/memory` — built-in `v8.writeHeapSnapshot()`, no DevTools install needed |
| 5 | Mongo `explain()`, index selection, compound-index prefix rule | Same query with and without the right index | `mongodb.com/docs/manual/tutorial/analyze-query-plan` · `.../tutorial/equality-sort-range-rule` (the ESR rule) |
| 6 | Transactions, isolation levels, and what Mongo does not give you | Concurrent write anomaly | DDIA ch. 7 · Postgres docs §13.2–13.3 (isolation levels) — see `study/node/transactions-isolation/` for the completed lab |
| 7 | GraphQL N+1 and DataLoader | Resolver firing N queries, then batched | `graphql.org/learn/best-practices/#server-side-batching-caching` · `github.com/graphql/dataloader` README |
| 8 | Idempotency keys and exactly-once delivery | Duplicate request, single effect | `stripe.com/docs/api/idempotent_requests` — the canonical real-world writeup |
| 9 | Retries, exponential backoff, jitter, DLQ | Flaky dependency simulator | `aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter` — explains *why* jitter, not just backoff |
| 10 | Service-to-service auth, least privilege | Signed internal request — the Bitpanda story | `owasp.org` microservices/service-to-service auth cheat sheet; the Bitpanda story is the primary source here |
| 11 | Fastify vs NestJS: encapsulation vs DI, JSON-schema vs class-validator | Same endpoint in both | `fastify.dev/docs` (encapsulation/plugins) · `docs.nestjs.com` (modules/DI) |
| 12 | Node clustering, graceful shutdown, health checks | SIGTERM draining in-flight requests | `nodejs.org/api/cluster.html` · `nodejs.org/en/learn` diagnostics section on graceful shutdown |

Sources are a starting point, not a reading list — 20–30 minutes each, enough to speak three
questions deep. `study/node/` and `training/depth/` hold what has actually been built so far;
check there first in case a topic is already in progress before starting from the table above.

Topics 2, 5, 9 and 10 map onto stories already in `interview-narrative.md`. Being able to go three
questions deep on those turns a rehearsed story into a demonstrated one — which is exactly the
transition that is currently failing.

---

## Block 4 — Mock Interviews

**The highest-value item in this plan.** Everything else is solo practice, and solo practice does not
reproduce interview pressure. Pressure is what is breaking.

- **Book the first one in week 1, before feeling ready.** Feeling ready is not a prerequisite; it is
  an outcome, and waiting for it is the failure mode this bullet exists to prevent.
- Sources: Pramp (free, peer-to-peer), interviewing.io (anonymous, real engineers), or a paid mock
  with a working senior engineer.
- 1–2 per week, alternating coding and system design.
- **Every mock gets a post-mortem in `sales/interviews/`, exactly like a real interview.**

A mock that is not debriefed is entertainment.

---

## Block 5 — The Proof Repository (Double Duty)

`market-fit-plan.md` already specifies it: a Node/TypeScript service moving CPU-bound work into
worker pools, with reproducible before/after benchmarks — the honest, inspectable echo of
"45 min → 12 min" and "65% faster APIs".

Build it as **Block 3, topic 2**. It is simultaneously:

- the deepest available exercise in Node internals,
- a rehearsal of the story most likely to be probed in an interview,
- and the public artifact that substitutes for unavailable references.

One piece of work, three returns. Ship it in weeks 3–4, then write the article from it.

Publication bar is unchanged and non-negotiable: nothing gets linked until its contents have been
inspected. See the hollow-link rule in `market-fit-plan.md` and `sales/operating-system.md`.

---

## Weekly Schedule

| Week | Live coding | System design | Depth | Milestone |
| ---: | --- | --- | --- | --- |
| 1 | Arrays & hashing, two pointers | Prompts 1–2 | Topics 1–3 | **First mock booked and completed.** First post-mortem written. |
| 2 | Sliding window, stack | Prompts 3–4 | Topics 4–5 | Audio review of 3 sessions. Redo list started. |
| 3 | Binary search, linked list | Prompts 5–6 | Topic 2 → proof repo | Proof repo skeleton + first benchmark. |
| 4 | Trees, tries | Prompt 7 + redo weakest | Topics 6–7 | **Mid-point review.** Proof repo published. |
| 5 | Heap, backtracking | Prompts 8–9 | Topics 8–9 | Technical article drafted from the repo. |
| 6 | Graphs | Prompt 10 + redo weakest two | Topics 10–11 | 2 mocks this week. Article published. |
| 7 | 1-D DP | Full redo of the 3 worst prompts | Topic 12 + gaps list | 2 mocks. Timed full-loop simulation. |
| 8 | Redo list only (+7/+21 due) | Redo list only | Gaps list only | **Consolidation.** No new material. |

Week 8 is deliberately all revision. New material in the final week trades retention for the feeling
of progress.

---

## Weekly Checkpoint

Filled in **Saturday at 11:45**, by reading the week's entries in `training/journal.md`. Numbers only — no
commentary, no explanations for a bad week. The personal check-in at 12:45 is a different question and
stays separate from these figures.

| Week | Attempted | **Solved in time** | Redo list size | Design prompts | Mocks | Real interviews | Post-mortems written |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |

**Review rules:**

- `Solved in time` trending flat for two consecutive weeks → the problem is narration or fundamentals,
  not volume. Add mocks, cut new problems.
- `Redo list size` growing for two consecutive weeks → attempting too many new problems. Cut the daily
  target in half and clear the backlog.
- `Post-mortems written` < `Real interviews` in any week → **stop everything and fix this first.**
  Untracked interviews are the original defect this whole plan exists to correct.
- Zero mocks in any week → next week's first action, before any application.

---

## Running Gaps List

Everything missed in a design session, a mock, or a real interview lands here, and is cleared by being
turned into a depth topic or a redo. Append with a date; never delete, only strike through when closed.

<!-- Format: - [ ] YYYY-MM-DD — gap — source (design prompt N / mock / <company> interview) -->

---

## What This Plan Does Not Do

It does not touch the CV. `src/data/resumeDraft.ts`, the site, and the PDF pipeline stay as they
are. A CV producing 6.7% cold-to-screen and 55% screen-to-technical is not the problem, and editing it
again would repeat the mistake this plan is correcting: optimising the stage that already works.
