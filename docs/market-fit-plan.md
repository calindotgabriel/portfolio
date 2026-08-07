# Market-Fit Plan: Convert The Interviews Already Being Won

Companion to `interview-narrative.md` (what to say in the room) and `training-plan.md` (how to not
lose the room). This one is how to get in the room — a job it is now doing well enough that it is no
longer the priority.

## What Changed And Why

The previous version of this plan diagnosed a **distribution problem**: no referenceable colleagues,
no warm introductions, therefore build public proof and open the recruiter channel. Everything was
organised around getting more first conversations.

The full-search numbers say the distribution problem is solved and a different one is not:

| Stage | Count | Conversion |
| --- | ---: | --- |
| Applications | ~150 | — |
| Initial screens | 10 | 6.7% — normal for cold applications |
| Technical interviews | 5–6 | ~55% screen→tech — **good** |
| Offers | 0 | **0% — the entire problem** |

The CV converts. The positioning converts. Screens turn into technical rounds at a healthy rate.
**Nothing after the technical round converts, and there is no record of why** — not one of the 5–6
technical interviews was ever debriefed.

Two consequences drive everything below:

1. **The bottleneck is interview performance, not sourcing.** Live coding, system design, and
   Node/JS/DB deep-dives are all breaking down. That is a trainable skill gap, not a seniority
   verdict — see `training-plan.md`.
2. **Effort spent on targeting is now actively harmful**, because it competes with training for the
   same hours. Discovery batches 4, 5 and 6 each reviewed 20 opportunities and activated **zero**,
   while the stage that was actually failing had no instrumentation at all.

## Two Tracks

The search runs on both tracks in parallel, scored separately (see `sales/operating-system.md`).

- **Contract** — remote-EU B2B. €55–65/hour anchor, revised floors in `sales/core-proposal.md`.
- **Permanent** — senior Node/TS roles, remote-EU or Cluj hybrid, evaluated against the salary band in
  `sales/core-proposal.md`.

Contract remains the stated preference. The permanent track is unblocked and available rather than
actively pushed.

## The Targeting Band Correction

Applying almost exclusively to Senior and Principal roles at companies scored 95+/100 means competing
against the strongest possible applicant pool **at exactly the stage that is currently failing**. That
is the worst possible place to face the hardest possible competition.

- **Add mid-level and mid-senior Node/TS roles to the target set.** The bar in the technical round is
  materially lower, the stack overlap is identical, and the Bitpanda/RWE proof is stronger relative to
  that pool than to a principal-level pool.
- **Every interview is a training rep.** Take interviews for roles that would not be accepted, purely
  for the reps. Five real interviews a month is a training programme that no amount of solo practice
  substitutes for.
- Volume of applications should go **up**, and cost per application **down**. See the throughput rules
  in `sales/operating-system.md`.

## Target Segments (Priority Order)

1. **EU fintech / crypto / payments** — custody, banking infrastructure, PSPs, exchanges. Direct
   Bitpanda proof. Highest rates and most remote-friendly.
2. **DACH product platforms** — three consecutive AT/DE employers make "proven with Austrian and
   German teams, EU citizen, Bucharest timezone" a concrete de-risking pitch.
3. **Data-heavy platforms** (energy, marketplaces, publishing) — RWE / ImmoScout24 / Endava proof.
4. **Cluj-Napoca product companies** — permanent track; local hybrid roles where being on the ground
   is an advantage rather than a constraint.

Segment priority now matters **less** than throughput. A slightly worse-fit interview that happens is
worth more than a perfect-fit opportunity that stays in research.

## Lead Channels (Ranked By Expected Yield)

### 1. First-party applications, at volume and low cost

Now the primary channel, because its job has changed: it exists to produce **interview reps**, not
just offers. Cheap and repeatable beats tailored and rare. No per-opportunity handoff document, no
scoring ceremony, no approval gate for a normal application.

### 2. Recruiters and agencies

EU B2B contracts are distributed through agencies, not public boards. A recruiter contact is a
**capability registration**: one conversation surfacing many roles over months. Still valuable, still
at zero, still worth a fixed small slot.

- Contract: Darwin Recruitment, Hays, Computer Futures, Austin Fraser; plus **freelancermap** and
  **GULP**, where DACH contract demand concentrates.
- Permanent: Cluj and Bucharest technical recruiters, in-house talent teams at remote-first EU
  employers.

### 3. Public proof — built as training, not as a separate project

The worker-pool benchmark repository is now **Block 5 of `training-plan.md`**: a Node/TypeScript
service moving CPU-bound work into worker pools with reproducible before/after benchmarks. It is
simultaneously the deepest available Node-internals exercise, a rehearsal of the story most likely to
be probed, and the public artifact that substitutes for unavailable references. One piece of work,
three returns — which is the only reason it survives the reprioritisation.

The article follows from the repo in weeks 5–6.

### 4. Direct outbound

Short note, one concrete hook, one inspectable link. Do not send these without a proof artifact to
point at.

### 5. LinkedIn profile (a landing surface, not an outreach channel)

- Headline: "Senior Backend Engineer · Node/TS · built institutional crypto-custody for banks at
  Bitpanda · open to EU contract and permanent roles".
- Featured: Bitpanda and RWE case studies, `/cv.pdf`, proof artifacts once they exist.
- Treat as where recruiters land after finding Calin elsewhere.

## Cadence

**Daily budget: ~60% training / ~40% applying.** The applying half is capped on purpose. If sourcing
starts consuming training hours, sourcing is wrong — not the training.

- **Week 1** — Start `training-plan.md` on day one, at whatever readiness level exists. Book the first
  mock interview immediately. Backfill post-mortems for any interview still recalled.
- **Weeks 1–8** — Daily: live coding, depth topic, applications, post-mortems. 3×/week system design.
  1–2 mocks/week.
- **Weeks 3–4** — Ship the proof repository as training block 5.
- **Weeks 5–6** — Publish the article. Open the recruiter channel.
- **Week 4 and week 8** — Review against the weekly checkpoint table in `training-plan.md`.

**Funnel target, revised:** the old target (30 qualified → 20 contacts → 5 replies → 3 interviews → 1
offer) measured the stage that already works. The new target measures the stage that does not:

> **Every technical interview produces a post-mortem, and the failure mode named in it changes over
> time.** The same failure repeating across three interviews means the training allocation is wrong.

## Sell-Factor Increases (Ranked)

1. **Interview conversion.** Nothing else on this list matters until a technical round is survivable.
   Owned entirely by `training-plan.md`.
2. **Instrumented interviews.** `sales/interviews/` post-mortems plus a feedback request after every
   rejection. Currently zero data exists on the only stage that is failing.
3. **One real, inspectable proof repository** — built as training block 5, so it costs no extra time.
4. **Recruiter channel activity** — the primary distribution route for contract, still unused.
5. **One technical write-up** — makes the RWE metrics feel verifiable and gives outbound a hook.

## Hard Rules Learned The Expensive Way

- **Optimising a stage that already converts is the most expensive mistake available.** Months went
  into CV, positioning, scoring, and gates while the 0%-conversion stage had no instrumentation.
- **An interview that is not debriefed is a lost data point that cost weeks to obtain.** Debrief within
  two hours, mocks included.
- **Never link a repository without inspecting its contents.** Two "Demo repo" links sat on the live
  site pointing at repositories containing a single README and zero code. They returned 200, so a
  liveness check passed. A hollow link is worse than no link.
- **A wish-list item is not a gate.** Rejecting a 95/100 exact-stack match on an unverified "10+ years"
  line is a rubric failure, not diligence.
- **Zero activations from a full batch is a calibration incident, not a market finding** — and it must
  be corrected in the same session, not logged for later.
- **Never plan a motion that depends on a warm path.** There are none.

## Weekly Review Questions

- Did every technical interview and mock this week get a post-mortem? If not, that is the first fix.
- Is `solved in time` in the training checkpoint moving? If flat for two weeks, add mocks, cut volume.
- How many mocks happened? Zero is a failed week regardless of everything else.
- Did applications go out at the target rate, cheaply, without ceremony?
- Is any interview feedback repeating? Fold it into `interview-narrative.md` and the training gaps
  list the same day.
- Was a feedback request sent for every rejection?
