# Job Search Operating System

## Win Condition

Land one long-term engagement — remote-EU Node.js/TypeScript B2B contract **or** senior permanent
role.

**The bottleneck is interview conversion, not distribution.** ~150 applications produced 10 screens
and 5–6 technical interviews — a healthy top of funnel — and 0 offers, with zero interviews debriefed.
This system was built to solve sourcing and must now stop competing with training for the same hours.
See `docs/market-fit-plan.md` for the diagnosis and `docs/training-plan.md` for the remedy.

- Funnel: applications → screens → technical rounds → **post-mortems written** → offers.
- **Post-mortems written must equal technical rounds taken. This is the primary system metric.**
- Two tracks run in parallel. Every account is tagged `contract` or `permanent` and scored on that
  track's rubric.
- Commercial posture (contract): anchor at €55–65/hour; floors are €35/hour long-term and €25/hour
  bridge, effective, as recorded in `sales/core-proposal.md`.
- Commercial posture (permanent): evaluate on annual salary against the bands recorded in
  `sales/core-proposal.md`. The hourly floor does not apply to permanent roles.
- Authority: agents research, recommend, and draft. Calin approves and performs every external action.
- Effort split: roughly 60% training, 40% search. If search work starts eating training hours, the
  search work is wrong.

## Canonical Files

- `sales/core-proposal.md`: current offer, proof, segment variants, commercial bands, and experiment history.
- `sales/pipeline.csv`: canonical account status, track, ownership, and next action.
- `sales/accounts/<slug>.md`: evidence, strategy, drafts, and outcome for one account. Create only for
  accounts that have replied or reached an interview — not for every application.
- `sales/interviews/YYYY-MM-DD-<company>.md`: interview and mock post-mortems. Template at
  `sales/interviews/_template.md`. **Non-optional, within 2 hours, every time.**
- `sales/weekly/YYYY-Www.md`: weekly funnel metrics, results, and decisions. Replaces the former
  per-day command log.
- `docs/training-plan.md`: the 8-week interview conversion programme and its weekly checkpoint.
- `docs/market-fit-plan.md` and `docs/interview-narrative.md`: source positioning and verified story guidance.

## Gate Model

Gates are **tiered**. Confusing a preference for a blocker is the most expensive error this system
can make — it silently empties the funnel while appearing rigorous.

### Tier 1 — Hard blockers (auto-reject, no exceptions)

Only these five disqualify an opportunity outright:

1. **Eligibility / geography**: Calin cannot legally or practically work the role from Romania
   (on-site requirement elsewhere, non-EU work authorization, incompatible timezone mandate).
2. **Engagement form conflicts with both tracks**: the role is neither an acceptable B2B contract
   nor an acceptable permanent position.
3. **Language**: a working language Calin does not have is mandatory.
4. **Commercial floor**: published compensation is verifiably below the track's floor as recorded in
   `sales/core-proposal.md` — €35/hour effective for long-term contract, €25/hour for bridge work, or
   the recorded salary floor for permanent. Unknown compensation is **not** a Tier 1 failure; it is an
   open question to resolve in conversation.
5. **Role is closed, filled, or withdrawn.**

### Tier 2 — Scored preferences (reduce score, never auto-reject)

Everything else. Explicitly including:

- Years-of-experience lines ("10+ years", "8+ years"). These are wish-list items, not gates.
- Nice-to-have or secondary stack items.
- Optional domain specialisms (Web3, ML/LLM, specific vendor platforms).
- Certifications, degrees beyond the one held, and industry-tenure preferences.

A missing Tier 2 item lowers the technical-fit component and is recorded as a **known objection** for
the entry angle and interview prep to address. It does not remove the opportunity.

### Rationale

Job ads are wish lists written to filter, not contracts. No candidate meets all of it, and both
contract and permanent markets expect negotiation. A gate model that rejects a 95/100 exact-stack
match on an unverified years-of-experience line is not protecting quality — it is preventing the
funnel from existing.

## Seniority Band

Targeting only Senior and Principal roles means facing the strongest applicant pool **at exactly the
stage that is currently failing**. Widen the band:

- **Mid-level and mid-senior Node/TS roles are in scope.** Identical stack overlap, materially lower
  technical bar, and the Bitpanda/RWE proof is stronger relative to that pool.
- A role being below Calin's title is **not** a rejection reason. Compensation below the floor is; the
  title is not.
- **Every interview is a training rep.** An interview for a role that would not be accepted still
  produces a post-mortem, and post-mortems are the scarce resource right now.

## Throughput Floor

Applications are now a **volume instrument**: their job is to produce interview reps, not only offers.
Cheap and repeatable beats tailored and rare.

- **Target: 15–20 applications per week**, each costing minutes, not hours.
- A normal application requires **no** handoff document, no per-account file, no entry-angle memo, and
  no approval gate. Those exist for accounts that have replied.
- Create a `sales/accounts/<slug>.md` file only once an account replies or schedules something.

If a discovery batch reviews its full cap and activates **zero** accounts, that is a
**gate-calibration incident**, not a market finding.

- The lead **corrects the gates and reprocesses the batch in the same session.** Logging the incident
  and moving on is not a valid response — that is what happened to batches 4, 5 and 6, three times in
  a row, while the funnel starved.
- Do not run another batch until the current one has been reprocessed under corrected gates.

Two consecutive zero-activation batches means the rubric is wrong. Fix the rubric, not the market.

## Target Score: 100 Points

### Contract track

| Component | Maximum | Scoring guidance |
| --- | ---: | --- |
| Technical and domain fit | 25 | Node/TypeScript plus fintech, payments, custody, DACH product, migration, performance, or data-heavy overlap |
| Active hiring or contract signal | 25 | Current first-party opening or explicit contract need scores highest; unverified flexibility scores low |
| Relevance of Calin's proof | 20 | A direct Bitpanda, RWE, ImmoScout24, or Endava story maps to the observed need |
| Remote-EU compatibility | 15 | Remote from Romania, EU engagement, timezone, and B2B eligibility are evidenced |
| Reachable contact path | 10 | Named recruiter, role owner, engineering leader, or direct application path |
| Likely rate viability | 5 | Published budget or credible senior-market signal; use `unknown` when unsupported |

### Permanent track

| Component | Maximum | Scoring guidance |
| --- | ---: | --- |
| Technical and domain fit | 25 | Same stack and domain overlap as the contract rubric |
| Active hiring signal | 25 | Current first-party opening; recruiter-confirmed search scores high |
| Relevance of Calin's proof | 20 | A direct case-study story maps to the observed need |
| Work model compatibility | 15 | Remote-from-Romania, Cluj hybrid, or Cluj on-site; timezone and relocation expectations evidenced |
| Reachable contact path | 10 | Named recruiter, hiring manager, or direct application path |
| Salary viability | 5 | Published band or credible market signal against the recorded salary band |

Activate accounts scoring at least **55/100** with dated evidence. Show all component scores. Never
award points for an invented assumption. Record Tier 2 misses as objections, not as reasons to skip.

The threshold moved from 65 to 55 on 2026-08-07. Scoring exists to rank a queue, not to guard a gate:
under the widened seniority band, a mid-senior role with real stack overlap that scores 58 is worth
applying to, because an interview taken is a training rep produced.

**Cluj scoring note (2026-08-07).** A Cluj hybrid or on-site role scores **full marks** on work-model
compatibility — Calin lives there, so proximity is an advantage, not a compromise. Do not deduct for
on-site. Two further adjustments for local roles:

- **Local roles carry a smaller applicant pool**, which is worth more than a few points of stack
  overlap right now. When ranking the queue, a local 60 beats a remote-EU 75.
- **An in-person interview is a better training rep than a video call**, because it reproduces more of
  the pressure that is currently breaking. Count it accordingly.

## Pipeline Statuses

Use only: `researching`, `qualified`, `angle-ready`, `draft-ready`, `awaiting-approval`, `contacted`,
`replied`, `interviewing`, `negotiating`, `won`, `lost`, `nurture`, `rejected`.

## Channels

**Correction, 2026-08-07.** The former blanket rule — "warm network and colleague referrals are
unavailable" — was written for cold remote-EU outreach, where it is true. It is **materially false for
the Cluj local market**, and applying it there suppressed a real channel for months.

What remains true everywhere: never invent, imply, or assume a relationship that does not exist, and
never draft a message that implies a shared contact or a referral Calin does not have.

What is actually available locally:

1. **Boomerang at Endava.** A former employer with a Cluj office. Re-applying to a company that
   already employed you is not a referral and needs no personal vouching — HR keeps the record, and
   returning candidates are a recognised hiring channel. This is a legitimate, evidence-backed path
   and must not be blocked by the no-warm-network rule.
2. **Local meetups and the Cluj tech community.** Cluj has active JS, backend, and general tech
   meetups. Attending creates real contacts from zero — that is building a network, not assuming one.
3. **Cluj and Bucharest technical recruiters**, who work a market small enough that one good
   conversation surfaces many roles.

Active channels, in order of expected yield:

1. **First-party applications** to current openings — now the primary channel, because its job has
   changed: it produces **interview reps**, not only offers. Cheap, repeatable, high volume.
2. **Recruiters and agencies** — DACH/EU contract agencies and marketplaces for the contract track;
   Romanian and remote-EU permanent recruiters for the permanent track. Recruiter registration is a
   capability motion, repeatable across many roles, and distinct from a single job application. Still
   at zero, still worth a fixed weekly slot.
3. **Direct outbound** to companies with an evidenced need, hooked on a public proof artifact.
4. **Public proof** — inspectable repositories and technical writing that substitute for the
   references and recommendations Calin cannot supply. Built as training block 5 of
   `docs/training-plan.md`, so it costs no additional hours.

## Proof Constraint

Calin has no referenceable former colleagues and no warm introductions. Third-party credibility must
therefore come from artifacts a stranger can inspect without asking anyone's permission.

- Never link a repository, demo, or artifact without verifying it contains real, working content.
  A hollow link is worse than no link.
- Verify by inspecting contents, not by checking that a URL returns 200.
- Treat public proof work as pipeline work, not as a side project.

## Role Handoff Contract

**Scope:** handoffs are for accounts that have replied, scheduled something, or reached negotiation.
A routine application does not get one. The handoff machinery is a coordination tool for live
opportunities, not a prerequisite for sending a CV.

Every handoff must contain:

```md
## Handoff

- Objective:
- Track: contract | permanent
- Inputs and file paths:
- Output path:
- Verified evidence:
- Required deliverable:
- Recommendation:
- Blockers or unknowns:
- Next owner:
- Due date:
- External action: Draft only; Calin approval required.
```

The receiving agent must be able to act without reading another chat. Write missing context into the
account or weekly file before handing off.

The `Output path` is authoritative. If a later instruction requests another path, the receiving agent
must stop and return the conflict to the lead without writing. When a path legitimately changes, the
lead must revise the source handoff before work begins. The lead must not advance the workflow until
the artifact exists at the assigned path and its return handoff points back to the lead.

## Simulation Mode

When any controlling input declares itself fictional, a fixture, a forward test, or a simulation:

- Confine every write to `sales/simulations/<slug>/`.
- Use fixture evidence in place of live URLs and do not browse unless the fixture explicitly permits it.
- Do not edit the live pipeline, live account files, weekly funnel metrics, interview post-mortems, canonical proposal, portfolio, CV, source files, or public assets.
- Keep all live funnel counts unchanged and never activate the fictional company.
- Use `External action: Prohibited — fictional simulation; Calin approval does not authorize action.` in every handoff.
- Require lead review between stages in the same sequence as live work.
- Treat simulation outputs as validation evidence only, never as customer or market evidence.

## Daily Loop

Deliberately small. It must fit in 45–60 minutes so the rest of the day belongs to
`docs/training-plan.md`.

1. **Post-mortems first.** Any interview or mock from the previous day gets its
   `sales/interviews/` file before anything else happens. Nothing outranks this.
2. Check replies. Anything that replied gets handled the same day.
3. Send 3–4 applications. Minutes each. No ceremony.
4. Send a feedback request for any rejection received.

That is the whole daily loop. Discovery batches, entry angles, and drafted outreach packages happen
**weekly**, not daily, and only for accounts that have replied or scored high enough to justify the
time.

## Weekly Loop

Written to `sales/weekly/YYYY-Www.md`. Replaces the former per-day command log, which cost hours per
day and produced 5 applications and 0 replies across its first six days.

1. Funnel numbers: applications sent, screens, technical rounds, **post-mortems written**, mocks,
   offers. Plus the training checkpoint row from `docs/training-plan.md`.
2. Post-mortem review: what failure mode appeared, and is it the same one as last week? Route each
   into the training gaps list.
3. One discovery batch. Correct the gates in-session if it activates zero.
4. Advance replied accounts: entry angle, outreach draft, or interview prep as needed.
5. One proof-artifact step — which is also a training block, so it costs no extra hours.
6. Decisions and next week's first action.

**Review rules:**

- Post-mortems < technical rounds → fix that before anything else on the list.
- Zero mocks → next week's first action, before any application.
- Same failure mode three interviews running → the training allocation is wrong, not insufficient.
- Applications below 15 → the daily loop is being crowded out; find what is eating it.

## Truth and Safety Rules

- Keep `Verified facts`, `Hypotheses`, and `Unknowns` separate.
- Cite the source and observation date for live company facts.
- Never invent a stakeholder, relationship, opening, technology, budget, pain, result, or portfolio claim.
- Never claim experience the canonical resume does not support. If a resume claim and the resume's own
  experience data disagree, that is a defect to fix in the resume, not a fact to work around.
- Never send, post, apply, schedule, or promise externally.
- Never contact the same company from two chats.
- Do not alter public portfolio or CV claims without Calin's explicit approval.
- Iteration means inspect evidence regularly; it does not require changing the canonical proposal on a
  schedule.
- **Never write an interview post-mortem on Calin's behalf.** `sales/interviews/` files record what was
  actually asked and where he actually stalled. Only he has that information, and an inferred
  post-mortem destroys the one dataset this system now depends on.

## Persistent Chat Launch Prompts

Use one persistent task per role. Replace `<skill>` and `<role>`:

> Load the repository-local skill at `/Users/mac/Documents/GitHub/portfolio/skills/<skill>/SKILL.md` and act as the `<role>` persistent agent. Read `/Users/mac/Documents/GitHub/portfolio/sales/operating-system.md` and the shared files required by the skill before working. Work only within this role, use file-based handoffs, and do not contact, apply, submit, schedule, or promise anything externally. Calin must approve and perform all external actions.
