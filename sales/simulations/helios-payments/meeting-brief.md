# Helios Payments Meeting Brief — Simulation Only

This is internal preparation for a fictional opportunity. It authorizes no contact, scheduling, rate acceptance, submission, promise, or other external action. The controlling event is `reply-input.md`; the later `call-feedback-input.md` fixture is explicitly excluded and has not been used as evidence.

## Stage Classification

**Fictional reply received / 30-minute screen requested / not scheduled / no offer or acceptance.**

- The reply says Calin's bank-facing custody and service-authentication background looks relevant and asks for a 30-minute screen.
- Date, time, timezone, meeting link, participant identity, and participant authority are unknown.
- The stated terms are six months, 40 hours weekly, B2B, and a €55–70/hour budget.
- The €58/hour question is an in-range discussion point, not an offer, acceptance, commitment, or agreed rate.
- Helios remains absent from the live pipeline. Live funnel and account files must remain unchanged.

## 30-Minute Screen Brief

### Why Helios

The fictional role sits at the intersection of Calin's strongest positioning: payments infrastructure, bank-facing delivery, Node.js/TypeScript, AWS, service authentication, and performance-sensitive backend work. The stated work must support two banking-partner onboardings, but their requirements and timing are unknown.

### Why this role

The role asks for the two risks closest to Calin's verified proof:

1. safer authentication between services in a bank-facing environment; and
2. a measurement-first investigation of export timeouts.

The remote-EU B2B model, six-month duration, 40-hour schedule, and published budget also fit the approved engagement posture. Romania eligibility still needs explicit confirmation because “remote from EU member states” supports, but does not replace, contract-entity and compliance checks.

### Closest proof — Bitpanda authentication hardening

- Worked on an institutional crypto-custody platform for banks using Node.js, TypeScript, Fastify, GraphQL, and AWS microservices/serverless.
- Strengthened authentication between services.
- Introduced backend testing patterns adopted by the team.
- Relevant buyer value: experience making service-boundary risk and production confidence clearer in regulated, bank-facing delivery.

**Evidence boundary:** the supplied proof does not identify the authentication protocol, credential mechanism, threat model, migration method, or a quantified authentication result. Do not invent them or imply that Helios has the same architecture.

### Supporting proof — RWE export performance

- Used profiling to identify expensive paths in a Node.js/NestJS and MongoDB-backed data workflow.
- Optimized MongoDB-heavy filtering and moved expensive work into worker pools.
- Reduced export time from 45 minutes to 12 minutes; separately improved API response times by 65%.
- Relevant buyer value: diagnose before prescribing, separate CPU and data-path bottlenecks, and tie changes to a measurable workflow outcome.

**Evidence boundary:** this is MongoDB proof, not PostgreSQL proof. It does not establish Helios's timeout cause, data model, query shape, scale, or appropriate solution.

### Likely risks Calin can reduce

- Service-boundary authentication changes that need safe rollout and test coverage.
- Backend delivery risk where failure modes must be made explicit before implementation.
- Export investigations that could otherwise start from guesses instead of measurements.
- Coordination risk when a senior engineer must own a meaningful slice and communicate scope, evidence, and early risks clearly.

These are relevance hypotheses based on the stated work and verified proof, not established Helios stakeholder views.

### Known evaluation points and possible objections

- **Known evaluation point:** the reply specifically asks about PostgreSQL depth.
- **Possible objection — hypothesis:** a listed PostgreSQL skill without a supplied project-specific story may be seen as less direct than the role requires.
- **Possible objection — hypothesis:** Helios may question whether custody authentication experience transfers to its payments architecture.
- **Response posture:** be precise about the verified environment and method, acknowledge the architecture boundary, and ask what PostgreSQL and authentication depth the work actually requires. Do not bridge a proof gap with invented detail.

### Five high-value questions

1. What must be true in the first 30 days for the person in this contract to be considered on track, across authentication and reconciliation?
2. What are the current service trust boundaries and desired ownership for the authentication work, and what constraints or failure modes should the engineer understand first?
3. For the reconciliation timeouts, what workload, PostgreSQL query path, baseline, timeout behavior, and acceptance target are currently observed?
4. Who is on the delivery team, who owns technical and commercial decisions, and what are the remaining interview stages and decision timeline?
5. Beyond six months at 40 hours weekly and the €55–70/hour budget, what are the proposed start date, Romania/EU contracting route, payment period, notice, exclusivity, on-call or travel expectations, currency, and other material terms?

## Suggested 30-Minute Flow

- **0–5 minutes:** concise positioning and confirm the screen's purpose and participant role.
- **5–13 minutes:** Bitpanda service-authentication story, with questions about Helios's trust boundaries and success criteria.
- **13–20 minutes:** RWE measurement-first export story and a bounded investigation approach for an unknown PostgreSQL workload.
- **20–25 minutes:** PostgreSQL calibration: distinguish verified skill breadth from the missing project-specific proof and clarify required depth.
- **25–30 minutes:** qualify scope, process, start timing, and commercial terms; agree no next step unless its owner and date are explicit.

## Qualification Plan

| Area | Verified now | Unknown to qualify | Screen objective |
| --- | --- | --- | --- |
| Scope | Service authentication and reconciliation export timeouts are stated workstreams. | Boundaries, milestones, priority split, baselines, targets, dependencies, and partner requirements. | Identify the first meaningful ownership slice and measurable success criteria. |
| Ownership | Senior Backend Engineer contract. | Individual decision rights, architecture ownership, delivery versus advisory balance, and support expectations. | Learn what Calin would own end to end in the first 30–60 days. |
| Team | “The team” wants a screen. | Team shape, reporting line, product/security/data counterparts, interviewer identity, and technical decision-maker. | Map collaborators and decision ownership without assuming Marta has technical authority. |
| Duration | Six months. | Extension likelihood, guaranteed duration, termination rights, and notice. | Establish commitment quality and downside protection. |
| Location | Remote from EU member states. Calin is Romania-based and an EU citizen. | Explicit Romania eligibility, contracting entity, equipment, tax/compliance constraints, and travel. | Confirm the actual engagement route before treating location fit as complete. |
| Hours | 40 hours weekly in the reply. | Schedule rigidity, timezone overlap, overtime, on-call, and whether 40 hours are guaranteed/billable. | Confirm workload and availability expectations. |
| Start date | Calin is available immediately. | Desired start date and onboarding dependencies. | Establish timing without promising a date. |
| Interview process | A 30-minute screen is requested. | Proposed times, participant, stages, assessments, decision criteria, and timeline. | Obtain a clear process and next decision point; do not schedule on Calin's behalf. |
| Budget and rate | Budget €55–70/hour B2B; €58 was raised. | Currency, VAT treatment, invoicing basis, rate review, and whether budget includes agency margin. | Keep €58 conditional and confirm total economics. |
| Decision path | No decision-maker is identified. | Technical approver, commercial approver, procurement/legal steps, and target decision date. | Know who decides, by what evidence, and when. |
| Full terms | B2B is stated. | Payment period, notice, exclusivity, on-call, travel, expenses, IP, confidentiality, liability, insurance, equipment, and currency risk. | Compare the complete package before any rate agreement. |

## Evidence-Bounded Answer Outlines

### “How did you harden service authentication?”

1. **Context:** “At Bitpanda I worked on an AWS microservices/serverless institutional crypto-custody platform for banks, where inter-service trust was part of the platform's security model.”
2. **Verified action:** “I strengthened authentication between services and introduced backend testing patterns that the team adopted.”
3. **Senior method to explain:** start from trust boundaries and failure modes; make identity and authorization behavior explicit; design least-privilege access; cover failure paths with executable tests; communicate rollout risk and validate changes safely.
4. **Boundary:** do not name protocols, token formats, credential rotation, observability tooling, rollout mechanics, or quantified security outcomes unless Calin confirms them from memory and is comfortable disclosing them.
5. **Bridge back:** ask which service identities, trust boundaries, existing controls, and success criteria Helios wants the contractor to own.

### “How would you investigate reconciliation export timeouts?”

1. Reproduce and define the timeout: inputs, volume, concurrency, duration, failure point, and expected completion behavior.
2. Instrument the pipeline end to end so database time, application CPU, serialization, network or external waits, queueing, retries, and output generation are separable.
3. For PostgreSQL, inspect query plans and actual timings, query shape, indexes, row estimates, locks, transaction scope, connection-pool pressure, batching, and data growth—but do not assume any is the cause.
4. For Node.js, inspect event-loop delay, CPU-heavy transformations, memory pressure, concurrency, backpressure, and worker suitability.
5. Form a ranked hypothesis from evidence, change the smallest responsible path, test against representative load and correctness requirements, then roll out with observable success and rollback criteria.
6. Use the RWE example only as method proof: profiling led to MongoDB-path improvements and worker pools, reducing 45-minute exports to 12 minutes. Explicitly state that Helios may have a different cause and need a different solution.

## PostgreSQL Depth: Truthful Calibration

### Verified

- `src/data/resume.ts` lists PostgreSQL among Calin's database skills.
- No supplied experience entry or case study ties PostgreSQL to a named production project, ownership scope, performance incident, scale, or quantified outcome.
- Calin's strongest quantified database-performance proof is MongoDB-based at RWE.

### Truthful answer shape

“PostgreSQL is part of my database skill set, but I want to be precise: the strongest quantified performance example in my current portfolio is MongoDB-based at RWE, where profiling and worker pools reduced exports from 45 to 12 minutes. The diagnostic approach transfers, but I would not present that as PostgreSQL proof. For your workload, I would start with actual query plans, indexes, locking and transaction behavior, pool pressure, batching, and end-to-end timing before proposing a fix.”

### Topics to prepare, not claims to make

- `EXPLAIN (ANALYZE, BUFFERS)` and the difference between estimates and actual execution.
- Index selection, composite/partial indexes, query shape, selectivity, and avoiding unsupported index prescriptions.
- Transactions, isolation, locks, deadlocks, long-running queries, and consistency requirements in reconciliation.
- Connection pooling, saturation, timeouts, concurrency, batching, pagination, and backpressure.
- Observability, representative load testing, correctness checks, rollout, and rollback.

### Calin confirmation required before any specific example

Confirm the project, production context, schema/workload, personal ownership, diagnostic tools, action taken, and result for any PostgreSQL story. Until all are confirmed, do not cite a PostgreSQL project, scale, optimization, incident, or outcome.

## Negotiation Posture for €58/Hour

- Preserve the approved **€55–65/hour B2B anchor**. €58/hour sits inside that anchor and the fixture's stated €55–70/hour budget.
- Preserve **€40/hour B2B as the hard floor**, never an opening target. Do not recommend or signal a path below it.
- Treat €58 as potentially workable for discussion, not accepted or agreed, until scope and total terms are known.
- Compare the whole arrangement: guaranteed six-month duration, guaranteed/billable weekly hours, payment period, notice, exclusivity, overtime/on-call load, travel, expenses, currency and VAT treatment, IP, liability, and termination rights.
- If scope or terms increase risk, hold or move upward within the anchor rather than conceding. If economics are pressured, trade scope, weekly commitment, duration, notice, payment timing, exclusivity, or other terms—never the floor.
- No final rate decision belongs in a recruiter screen without enough commercial information and Calin's explicit approval.

## Pause and Walk-Away Conditions

### Pause and clarify

- Romania eligibility, B2B contracting route, screen participant, decision path, or start date remains unclear.
- Scope, first-30-day ownership, success criteria, or the balance between authentication and reconciliation is too vague to price responsibly.
- Payment period, notice, guaranteed hours, exclusivity, on-call, travel, currency, IP, liability, or termination terms are missing or materially change the value of €58.
- A PostgreSQL take-home or technical assessment is proposed without clear scope, time expectation, evaluation criteria, or ownership of submitted work.
- The role expects deeper PostgreSQL ownership than Calin can support with confirmed experience.

### Walk away or counter with terms

- The effective B2B rate falls below **€40/hour** after required unpaid time, fees, currency exposure, or mandatory load is considered.
- The company requires a below-floor concession instead of an acceptable scope or term trade-off.
- Romania is not eligible, the engagement is not genuinely remote-EU B2B, or mandatory travel/on-site work conflicts with the target engagement.
- Material terms create unacceptable uncapped risk, uncompensated exclusivity/on-call work, unreliable payment exposure, or ownership demands that cannot be corrected.
- Calin is asked to overstate experience, conceal a proof gap, or make claims he cannot verify.

## Next-Step Response

**DRAFT — CALIN APPROVAL REQUIRED — NOT SENT**

Hi Marta,

Thanks—the overlap sounds relevant, and I would be interested in the 30-minute screen. €58/hour is within the range I am prepared to discuss, subject to confirming the scope and full contract terms; I am not treating the rate as agreed at this stage. Please share the proposed screen times, timezone, and who I would be speaking with, and I can review them.

Best,
Calin

This draft expresses interest only. It does not accept €58/hour, schedule a meeting, promise availability for a specific time, or authorize sending.

## Handoff

- Objective: Return evidence-bounded preparation for the fictional Helios 30-minute screen and €58/hour discussion without scheduling, accepting, inventing, or acting externally.
- Inputs and file paths: `skills/close-contract-opportunity/SKILL.md`; `sales/operating-system.md`; `sales/core-proposal.md`; `docs/interview-narrative.md`; `docs/market-fit-plan.md`; `sales/pipeline.csv` read only; `sales/simulations/helios-payments-input.md`; current Helios simulation artifacts through `sales/simulations/helios-payments/closer-handoff.md`; controlling event `sales/simulations/helios-payments/reply-input.md`; `src/pages/projects/bitpanda-custody.astro`; `src/pages/projects/rwe-energy.astro`; `src/data/resume.ts`; completed artifact `sales/simulations/helios-payments/meeting-brief.md`. `call-feedback-input.md` is a later event and is excluded from the evidence used here.
- Verified evidence: The fictional reply requests an unscheduled 30-minute screen, states €55–70/hour B2B for 40 hours weekly over six months, asks about service authentication, reconciliation export timeouts, and PostgreSQL depth, and raises €58/hour. Verified candidate proof is Bitpanda service-authentication hardening and team-adopted testing patterns on an AWS bank-facing custody platform, plus RWE's MongoDB/worker-pool export improvement from 45 to 12 minutes. PostgreSQL is verified only as a listed skill.
- Required deliverable: Completed in this file: stage classification, one-page screen brief, five questions, qualification plan, proof mapping, answer outlines, PostgreSQL calibration, negotiation posture, pause and walk-away conditions, one clearly labeled response draft, and this return handoff.
- Recommendation: Advance only to internal lead review. Keep Bitpanda primary, RWE supporting, PostgreSQL claims bounded, and €58 conditional on scope and total terms.
- Blockers or unknowns: No date, time, timezone, link, participant, stakeholder authority, start date, technical design, timeout cause, PostgreSQL workload, success measure, team shape, process, decision-maker, or complete commercial terms are supplied. No project-specific PostgreSQL proof is supplied.
- Next owner: Lead Contract Sales.
- Due date: 2026-07-22, completed in the current forward-test session.
- External action: Draft only; Calin approval required. For this fictional fixture, nothing may be sent, scheduled, accepted, or otherwise acted upon.
