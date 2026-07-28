# Job Search Operating System

## Win Condition

Land one long-term engagement — remote-EU Node.js/TypeScript B2B contract **or** senior permanent
role — within 30 days.

- Funnel: 30 qualified targets → 20 tailored contacts/applications → 5 replies → 3 interviews → 1 offer.
- Two tracks run in parallel. Every account is tagged `contract` or `permanent` and scored on that
  track's rubric.
- Commercial posture (contract): anchor qualified work at €55–65/hour; never accept or recommend
  below €40/hour B2B.
- Commercial posture (permanent): evaluate on annual salary against the band recorded in
  `sales/core-proposal.md`. The hourly floor does not apply to permanent roles.
- Authority: agents research, recommend, and draft. Calin approves and performs every external action.
- Coordination: the lead chat owns prioritization. Specialist chats work only from a lead handoff.

## Canonical Files

- `sales/core-proposal.md`: current offer, proof, segment variants, commercial bands, and experiment history.
- `sales/pipeline.csv`: canonical account status, track, ownership, and next action.
- `sales/accounts/<slug>.md`: evidence, hypotheses, strategy, drafts, conversations, and outcome for one account.
- `sales/daily/YYYY-MM-DD.md`: assignments, handoffs, funnel metrics, results, and decisions.
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
4. **Commercial floor**: published compensation is verifiably below the track's floor — below
   €40/hour effective for contract, or below the recorded salary floor for permanent. Unknown
   compensation is **not** a Tier 1 failure; it is an open question to resolve in conversation.
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

## Throughput Floor

If a discovery batch reviews its full cap and activates **zero** accounts, that is a
**gate-calibration incident**, not a market finding.

- Do not run another batch.
- The lead must review the batch's rejection reasons and identify which were Tier 2 items
  misapplied as Tier 1 blockers.
- Reprocess the batch under corrected gates before searching for new opportunities.
- Record the incident and the correction in the daily log.

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

Activate accounts scoring at least **65/100** with dated evidence. Show all component scores. Never
award points for an invented assumption. Record Tier 2 misses as objections, not as reasons to skip.

## Pipeline Statuses

Use only: `researching`, `qualified`, `angle-ready`, `draft-ready`, `awaiting-approval`, `contacted`,
`replied`, `interviewing`, `negotiating`, `won`, `lost`, `nurture`, `rejected`.

## Channels

Warm network and colleague referrals are **unavailable** and must not be planned for or assumed.
Never draft a message that implies an existing relationship, shared contact, or referral.

Active channels, in order of expected yield:

1. **Recruiters and agencies** — DACH/EU contract agencies and marketplaces for the contract track;
   Romanian and remote-EU permanent recruiters for the permanent track. This is the primary
   distribution channel. Recruiter registration is a capability motion, repeatable across many roles,
   and distinct from a single job application.
2. **Direct outbound** to companies with an evidenced need, hooked on a public proof artifact.
3. **First-party applications** to current openings.
4. **Public proof** — inspectable repositories and technical writing that substitute for the
   references and recommendations Calin cannot supply.

## Proof Constraint

Calin has no referenceable former colleagues and no warm introductions. Third-party credibility must
therefore come from artifacts a stranger can inspect without asking anyone's permission.

- Never link a repository, demo, or artifact without verifying it contains real, working content.
  A hollow link is worse than no link.
- Verify by inspecting contents, not by checking that a URL returns 200.
- Treat public proof work as pipeline work, not as a side project.

## Role Handoff Contract

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
account or daily file before handing off.

The `Output path` is authoritative. If a later instruction requests another path, the receiving agent
must stop and return the conflict to the lead without writing. When a path legitimately changes, the
lead must revise the source handoff before work begins. The lead must not advance the workflow until
the artifact exists at the assigned path and its return handoff points back to the lead.

## Simulation Mode

When any controlling input declares itself fictional, a fixture, a forward test, or a simulation:

- Confine every write to `sales/simulations/<slug>/`.
- Use fixture evidence in place of live URLs and do not browse unless the fixture explicitly permits it.
- Do not edit the live pipeline, live account files, daily funnel metrics, canonical proposal, portfolio, CV, source files, or public assets.
- Keep all live funnel counts unchanged and never activate the fictional company.
- Use `External action: Prohibited — fictional simulation; Calin approval does not authorize action.` in every handoff.
- Require lead review between stages in the same sequence as live work.
- Treat simulation outputs as validation evidence only, never as customer or market evidence.

## Daily Loop

1. Lead reviews pipeline, replies, meetings, overdue actions, and metrics across both tracks.
2. Scout researches 3–5 current candidates without duplicating the pipeline.
3. If the previous batch activated zero accounts, run the throughput-floor review before new search.
4. Lead activates no more than two priority accounts.
5. Strategist creates one evidence-backed entry angle for each selected account.
6. Outbound specialist drafts the approved motion; Calin reviews and sends.
7. Closer handles active replies, meetings, qualification, and negotiation preparation.
8. Proof strategist advances one public proof artifact or proposes one evidence-based improvement.
9. Lead records outcomes, experiment decisions, and tomorrow's first action.

## Truth and Safety Rules

- Keep `Verified facts`, `Hypotheses`, and `Unknowns` separate.
- Cite the source and observation date for live company facts.
- Never invent a stakeholder, relationship, opening, technology, budget, pain, result, or portfolio claim.
- Never claim experience the canonical resume does not support. If a resume claim and the resume's own
  experience data disagree, that is a defect to fix in the resume, not a fact to work around.
- Never send, post, apply, schedule, or promise externally.
- Never contact the same company from two chats.
- Do not alter public portfolio or CV claims without Calin's explicit approval.
- Daily iteration means inspect evidence daily; it does not require changing the canonical proposal daily.

## Persistent Chat Launch Prompts

Use one persistent task per role. Replace `<skill>` and `<role>`:

> Load the repository-local skill at `/Users/mac/Documents/GitHub/portfolio/skills/<skill>/SKILL.md` and act as the `<role>` persistent agent. Read `/Users/mac/Documents/GitHub/portfolio/sales/operating-system.md` and the shared files required by the skill before working. Work only within this role, use file-based handoffs, and do not contact, apply, submit, schedule, or promise anything externally. Calin must approve and perform all external actions.
