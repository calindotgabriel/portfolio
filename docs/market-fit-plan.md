# Market-Fit Plan: Land a Senior Node/TS Engagement in 30 Days

Companion to `interview-narrative.md`. That doc is what to say in the room; this one is how to get
in the room.

## What Changed And Why

The previous version of this plan ranked **LinkedIn recommendations and referenceable colleagues** as
the single biggest missing sell factor, and built its channel strategy on warm introductions to
ex-colleagues at Bitpanda, ImmoScout24, RWE, and Endava.

That channel is **unavailable**. Calin has no referenceable former colleagues and no warm
introductions. Planning around them produced six days of activity with zero replies.

Two consequences drive everything below:

1. **The public profile has to carry the entire sell.** With nobody to vouch, credibility must come
   from artifacts a stranger can inspect without asking anyone's permission.
2. **Recruiters and agencies are now the primary distribution channel**, not a supplement.

## Two Tracks

The search runs on both tracks in parallel, scored separately (see `sales/operating-system.md`).

- **Contract** — remote-EU B2B, €55–65/hour target, €40/hour hard floor.
- **Permanent** — senior Node/TS roles, remote-EU or Cluj hybrid, evaluated against the salary band
  in `sales/core-proposal.md`. The hourly floor does not apply and must not be converted into one.

Contract-only targeting was starving the funnel. Permanent roles are a much larger market and the CV
is strongly competitive in it.

## The One Thing Being Iterated

**The Bitpanda credential is the spearhead.** "Built the backend of an institutional crypto-custody
platform for banks" is the strongest, freshest, most differentiated proof in the profile — and
regulated fintech pays the top EU rates. Energy (RWE) and marketplace (ImmoScout24) proof stay as
secondary evidence, not headline.

## Target Segments (Priority Order)

1. **EU fintech / crypto / payments** — custody, banking infrastructure, PSPs, exchanges. Direct
   Bitpanda proof. Highest rates, most remote-friendly, actively filters for regulated-environment
   experience.
2. **DACH product platforms** — three consecutive AT/DE employers make "proven with Austrian and
   German teams, EU citizen, Bucharest timezone" a concrete de-risking pitch. This is the geographic
   wedge.
3. **Data-heavy platforms** (energy, marketplaces, publishing) — RWE / ImmoScout24 / Endava proof as
   fallback breadth.
4. **Cluj-Napoca product companies** — permanent track only; local hybrid roles where being on the
   ground is an advantage rather than a constraint.

## Lead Channels (Ranked By Expected Yield)

### 1. Recruiters and agencies — the primary channel, currently at zero

EU B2B contracts are distributed through agencies, not public boards. A recruiter contact is a
**capability registration**: one conversation that surfaces many roles over months, including
unadvertised ones. This is categorically different from a job application and should not compete
with applications for the same slot in the day.

- Contract: Darwin Recruitment, Hays, Computer Futures, Austin Fraser; plus **freelancermap** and
  **GULP**, where DACH contract demand actually concentrates.
- Permanent: Cluj and Bucharest technical recruiters, plus in-house talent teams at remote-first EU
  employers.
- Owned by the `work-recruiter-channel` skill. Verify each agency is currently placing Node/TS people
  before investing effort.

### 2. Public proof — the reference substitute

This is the sell factor that replaces recommendations, and it is the one the profile most lacks.

- **One substantial repository** demonstrating a claim already on the CV. Strongest candidate: a
  working Node/TypeScript service showing CPU-bound work moved to worker pools with reproducible
  before/after benchmarks — the honest echo of "45 min → 12 min" and "65% faster APIs".
- **One technical article** from it. Previously ranked #3 and marked optional; it is not optional now.
  It is also the hook that direct outbound currently lacks entirely.
- Owned by `build-public-proof`. Nothing gets linked until it passes that skill's publication
  checklist — verified by inspecting contents, never by a URL returning 200.

### 3. Direct outbound

Shortlist EU fintech/custody/payments and DACH platform companies hiring Node/TS. Short note, one
concrete hook, one inspectable link. Do not send these without a proof artifact to point at — that
link is the entire credibility argument.

### 4. LinkedIn profile (as a landing surface, not an outreach channel)

- Headline: "Senior Backend Engineer · Node/TS · built institutional crypto-custody for banks at
  Bitpanda · open to EU contract and permanent roles".
- Featured: Bitpanda and RWE case studies, `/cv.pdf`, and proof artifacts once they exist.
- Open-to-Work for both engagement types.
- Treat this as where recruiters land after finding Calin elsewhere. It is not a source of inbound on
  its own.

### 5. Boards

cord, Welcome to the Jungle, RemoteOK, WeWorkRemotely for both tracks; freelancermap and GULP for
DACH contract. Lowest yield per hour — global applicant pools, no differentiation. Fill remaining
capacity with these, never the first hours of the day.

## 30-Day Cadence

- **Days 1–2** — Truth reconciliation. Recover the missing early experience and make the CV's span
  claim match its own data (`recover-verified-experience`). Set the permanent salary band. Nothing
  else is worth tuning until the resume is internally consistent.
- **Days 2–4** — Retune gates and open the permanent track. Rescore the ~100 opportunities already
  reviewed under the old, over-strict gates; that research is already paid for and is the fastest
  source of pipeline available.
- **Days 3–7** — Ship the proof repository and the article, in parallel with outreach.
- **Day 4 onward** — Open the recruiter channel. Registrations before applications, every day.
- **Weeks 2–3** — 5 outbound touches per day across a deliberate channel mix. Log every reply.
- **Week 4** — Convert. "Available immediately" is closing leverage, not desperation; anchor the band
  before the call.

Funnel target: 30 qualified → 20 contacts → 5 replies → 3 interviews → 1 offer, across both tracks.

## Sell-Factor Increases (Ranked)

1. **One real, inspectable proof repository** — replaces the recommendations that cannot be obtained.
   Nothing else moves credibility as much for a candidate with no references.
2. **A CV whose span claim its own experience data supports** — the current contradiction has already
   cost a 95/100 opportunity and is an unexploded interview question.
3. **Recruiter channel activity** — the primary distribution route, currently unused.
4. **One technical write-up** — makes the RWE metrics feel verifiable and gives outbound a hook.
5. **A GitHub profile that reads as a professional surface** — bio, website link, pinned real work.

## Hard Rules Learned The Expensive Way

- **Never link a repository without inspecting its contents.** Two "Demo repo" links sat on the live
  site pointing at repositories containing a single README and zero code. They returned 200, so a
  liveness check passed. A hollow link is worse than no link — it reads as implying code that does
  not exist.
- **A wish-list item is not a gate.** Rejecting a 95/100 exact-stack match on an unverified "10+
  years" line is a rubric failure, not diligence.
- **Zero activations from a full batch is a calibration incident, not a market finding.**
- **Never plan a motion that depends on a warm path.** There are none.

## Weekly Review Questions

- Did 25+ outbound touches go out this week, and across how many distinct channels?
- Are recruiter registrations still at zero? If so, that is this week's first fix.
- Has any proof artifact shipped, or is it still "in progress"?
- Which track and segment is replying? Double down there, don't spread.
- Is any interview feedback repeating? Fold it into `interview-narrative.md` the same day.
- Did the funnel add a qualified target in the last 48 hours? If not, the gates are wrong again.
