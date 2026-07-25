# Helios Payments Simulation: Lead Command

## Scope and Safety

- This is a forward test using only the fictional evidence in `sales/simulations/helios-payments-input.md`.
- Helios Payments is not a live account and must not be added to `sales/pipeline.csv`, a live account file, or a live daily funnel total.
- Do not browse for Helios Payments or supplement the fixture with outside information.
- Do not contact Marta Example, open or submit an application, schedule a call, quote a rate, or make any promise.
- Calin approves and performs every external action. For this fictional fixture, no external action is authorized or needed.

## Funnel Snapshot

Live canonical funnel remains unchanged:

- Qualified targets: 0 / 30
- Tailored contacts sent by Calin: 0 / 20
- Replies: 0 / 5
- Interviews: 0 / 3
- Contracts: 0 / 1

Simulation-only state:

- Fixture candidates reviewed: 1
- Fixture candidates provisionally clearing the 70/100 activation gate: 1
- External touches, replies, interviews, or offers: 0

## Priority Account

1. **Helios Payments — simulation only.** It is the sole supplied fixture and provisionally scores 100/100. Its explicit six-month remote-EU B2B need, payments domain, Node.js/TypeScript stack, service-authentication work, reconciliation export problem, reachable application path, and €55–70/hour budget all map directly to the approved target profile and commercial guardrails. Next action: the scout independently reproduces the qualification from the fixture and returns it to the lead; no live activation follows.

No second priority account is assigned. The fixture supplies no other company, and manufacturing work would weaken the test.

## Provisional Score

| Component | Score | Fixture evidence |
| --- | ---: | --- |
| Technical and domain fit | 25/25 | EU payments infrastructure; Node.js, TypeScript, PostgreSQL, AWS, and event-driven services; service authentication and reconciliation export work. |
| Active hiring or contract signal | 25/25 | Careers page observed 2026-07-22 advertising a six-month Senior Backend Engineer B2B contract. |
| Relevance of Calin's proof | 20/20 | Bitpanda service-authentication and regulated bank-facing custody proof maps to the authentication and banking context; RWE export optimization maps to reconciliation export timeouts. |
| Remote-EU compatibility | 15/15 | Explicitly remote from EU member states; Calin is Romania-based and an EU citizen. |
| Reachable contact path | 10/10 | The fixture supplies a named recruiter, Marta Example, and a direct application form. |
| Likely rate viability | 5/5 | Published fixture budget is €55–70/hour, above the €40/hour floor and overlapping the €55–65/hour anchor. |
| **Total** | **100/100** | **Provisionally qualifies for the simulation; this does not activate a live account.** |

## Evidence Boundaries

### Verified fixture evidence

- All company, opportunity, stack, project, arrangement, budget, and contact-path facts in the score table come from `sales/simulations/helios-payments-input.md`, observed 2026-07-22 where stated.
- Calin's relevant proof, EU location, engagement preference, and commercial guardrails come from `sales/core-proposal.md`, `docs/market-fit-plan.md`, and `docs/interview-narrative.md`.

### Hypotheses

- Bitpanda authentication hardening is likely the strongest lead proof because it most directly matches inter-service authentication and banking-partner risk.
- RWE export optimization is likely useful secondary proof for the reconciliation timeout work.
- The team may value production-safety and integration-risk reduction, but the fixture does not state its evaluation criteria or stakeholder view.

### Unknowns

- The careers-page URL, application-form URL, publication date, and whether the listing remained active after the supplied observation.
- Recruiter details beyond the supplied name and whether Marta Example owns technical evaluation.
- Current authentication design, reconciliation architecture, timeout causes, success measures, delivery milestones, interview process, contract terms, and payment terms.
- Whether the company would agree to a rate inside Calin's target band; the budget supports viability but does not establish an offer.

These unknowns must remain unknown. The scout must not browse or invent answers for this simulation.

## Role Assignment

Only the scout is needed now. Strategy, outreach, proof iteration, and closing work are premature until the scout returns the reproducible qualification to the lead.

## Handoff

- Objective: Independently reproduce the Helios Payments fixture qualification, confirm whether it clears the 70/100 gate, and return an evidence-bounded recommendation to the Lead Contract Sales agent without activating a live account.
- Inputs and file paths: `sales/simulations/helios-payments-input.md` (the only source of Helios company evidence); `sales/simulations/helios-payments/lead-command.md` (scope, provisional score, and safety constraints); `sales/operating-system.md` (scoring rubric and handoff rules); `sales/core-proposal.md` (verified proof and commercial guardrails); `sales/pipeline.csv` (read only, solely to confirm that the fictional fixture is not present); `docs/market-fit-plan.md` (segment priority); `src/data/resume.ts` (verified experience context).
- Verified evidence: The fixture states a six-month remote-EU B2B Senior Backend Engineer contract observed 2026-07-22; Node.js, TypeScript, PostgreSQL, AWS, and event-driven services; work on inter-service authentication and reconciliation export timeouts before two banking-partner onboardings; EU-member-state remote eligibility; €55–70/hour at 35–40 hours weekly; and a named recruiter plus application form. No warm path is supplied. Calin's canonical proof includes Bitpanda bank-facing custody and service-authentication work plus RWE export optimization from 45 to 12 minutes.
- Required deliverable: Create `sales/simulations/helios-payments/scout-qualification.md` containing (1) the six-component score with evidence for every point, (2) verified facts, hypotheses, and unknowns kept separate, (3) likely positioning proof, disqualifiers, and recommended next action, and (4) a complete handoff back to Lead Contract Sales. Use only the fixture for Helios evidence. Do not browse, edit `sales/pipeline.csv`, create `sales/accounts/helios-payments.md`, or write outside `sales/simulations/helios-payments/`.
- Recommendation: Confirm the provisional 100/100 qualification for the simulation, with Bitpanda authentication proof primary and RWE export-performance proof secondary. Return to the lead after the qualification artifact; do not route directly to another specialist.
- Blockers or unknowns: No real URLs are supplied, and all technical details, stakeholder views, success criteria, process details, and contract terms beyond the fixture remain unknown. These do not block fixture scoring but prohibit deeper claims or external action.
- Next owner: Lead Contract Sales, after the scout writes the simulation qualification.
- Due date: 2026-07-22, in the current forward-test session.
- External action: Draft only; Calin approval required.

## Decisions Needed from Calin

- None to complete the internal scout forward test.
- Do not ask Calin to approve outreach or an application for this fictional company. If a comparable real account is later discovered, the lead must assess it separately and Calin must explicitly approve and perform any external action.

## Risks, Blockers, and Review Point

- **Contamination risk:** Writing Helios into the live pipeline or live daily metrics would corrupt the canonical funnel. Guardrail: all Helios artifacts stay under `sales/simulations/helios-payments/`.
- **Evidence inflation risk:** Treating plausible technical details or stakeholder concerns as facts would make the score non-reproducible. Guardrail: use the fixture only and preserve unknowns.
- **Premature funnel work:** Drafting outreach before scout validation would bypass the role sequence. Guardrail: stop after the scout handoff and return control to the lead.
- **Next review point:** Lead reviews `sales/simulations/helios-payments/scout-qualification.md` when complete, checks score reproducibility and evidence separation, and then records only forward-test findings—not Helios itself—in any system-validation summary.
