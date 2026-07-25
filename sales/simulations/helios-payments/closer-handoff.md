# Helios Payments Simulation: Closer Handoff

## Lead Review of Outbound Drafts

The Contract Outreach Writer's `outreach-drafts.md` passes the outbound guardrails as an internal forward-test artifact.

- The document and every message are labeled `DRAFT — CALIN APPROVAL REQUIRED — NOT SENT`.
- The 72-word primary note is within the 60–110-word target and contains one Helios observation, one closest Bitpanda proof, and one low-friction CTA.
- The primary stays authentication-specific and does not dilute the angle with the RWE story.
- The two follow-ups add distinct value: RWE export-performance evidence first, then availability and engagement fit.
- Personalized claims are mapped to fixture or proof files, and missing URLs, contact details, relationship, authority, current status, architecture, rate agreement, and outcome are not invented.
- The application form is the only verified motion. Follow-up channels and timing are explicitly conditional.
- No rate is introduced in the cold drafts, no below-floor engagement is suggested, and no message is approved, sent, submitted, or scheduled.

The drafts are accepted only as a successful outbound-role simulation. They remain unapproved and unsent.

## Fictional Reply Event

Source: `sales/simulations/helios-payments/reply-input.md`.

### Verified fixture facts

- The reply is fictional and authorizes no external action.
- The sender says Calin's bank-facing custody and service-authentication background looks relevant.
- The team would like a 30-minute screen.
- The stated budget is €55–70/hour B2B, with 40 hours weekly for six months.
- Requested discussion topics are Calin's service-authentication hardening, his approach to reconciliation export timeouts, and his PostgreSQL depth.
- The reply asks whether €58/hour would work.

### What the reply does not establish

- No interview date, time, timezone, location, link, or participant identity is supplied.
- “The team” does not identify a hiring manager, engineer, decision-maker, or interviewer.
- The screen invitation is not a scheduled meeting, offer, promise, commitment, or acceptance.
- The €58/hour question is not an offer or agreed rate, and Calin has not accepted it.
- The fixture does not verify the role's start date, exact scope and ownership, team shape, process after the screen, decision path, payment terms, notice, exclusivity, on-call expectations, travel, currency terms, or intellectual-property terms.

## Funnel and Stage Containment

The canonical live funnel remains unchanged:

- Qualified targets: 0 / 30
- Tailored contacts sent by Calin: 0 / 20
- Replies: 0 / 5
- Interviews: 0 / 3
- Contracts: 0 / 1

Simulation-only event state:

- Fictional replies: 1
- Screen invitations: 1
- Meetings scheduled: 0
- Interviews completed: 0
- Offers or rate agreements: 0

Helios Payments remains fictional and must not be added to `sales/pipeline.csv`, a live account file, or live daily metrics. Do not use `sales/simulations/helios-payments/call-feedback-input.md` or any later fixture event in this stage; `reply-input.md` is the controlling next event.

## Commercial Direction

- Preserve the approved €55–65/hour B2B anchor and €40/hour hard floor.
- €58/hour falls inside the anchor and the fixture's €55–70/hour budget, so it is commercially viable for preparation.
- Do not call €58 accepted or agreed. Treat it as an in-range discussion point subject to scope, guaranteed duration, weekly commitment, payment period, notice, exclusivity, on-call load, travel, currency risk, and other contract terms.
- Do not recommend accepting below €40/hour. If a later fictional event moves below the floor, prepare scope or term trade-offs or a walk-away—not a concession below the floor.
- Any reply language is a draft for Calin's review only. For this fictional company, it must never be sent.

## Handoff

- Objective: Prepare Calin for the fictional 30-minute recruiter screen and the €58/hour discussion without scheduling a meeting, accepting a rate, inventing stakeholders, or taking any external action.
- Inputs and file paths: `skills/close-contract-opportunity/SKILL.md` (closer rules); `sales/operating-system.md` (truth, authority, and handoff rules); `sales/core-proposal.md` (positioning and commercial guardrails); `sales/pipeline.csv` (read only, solely to confirm Helios remains absent); `sales/simulations/helios-payments-input.md` (base fictional opportunity evidence); `sales/simulations/helios-payments/scout-qualification.md`; `sales/simulations/helios-payments/entry-angle.md`; `sales/simulations/helios-payments/outreach-handoff.md`; `sales/simulations/helios-payments/outreach-drafts.md` (accepted as drafts only, never sent); `sales/simulations/helios-payments/reply-input.md` (the controlling fictional reply event); `sales/simulations/helios-payments/closer-handoff.md` (this assignment); `docs/interview-narrative.md` (verified stories, technical prep, contract answers, and CV-gap answers); `src/pages/projects/bitpanda-custody.astro` (authentication proof); `src/pages/projects/rwe-energy.astro` (export-performance proof); `src/data/resume.ts` (verified experience and skills, including PostgreSQL listed only as a database skill). Explicitly exclude `sales/simulations/helios-payments/call-feedback-input.md` and any later event from this task.
- Verified evidence: The fictional reply states that Calin's bank-facing custody and service-authentication background looks relevant; requests a 30-minute screen; repeats €55–70/hour B2B, 40 hours weekly, and six months; asks for discussion of service-authentication hardening, reconciliation export-timeout investigation, and PostgreSQL depth; and asks whether €58/hour would work. Verified Calin proof includes Bitpanda service-to-service authentication hardening and team-adopted testing patterns on an AWS-based custody platform for banks, plus RWE profiler-led export optimization using MongoDB path improvements and worker pools that reduced exports from 45 to 12 minutes. `src/data/resume.ts` lists PostgreSQL as a skill but supplies no project-specific PostgreSQL result or ownership story.
- Required deliverable: Create `sales/simulations/helios-payments/closer-prep.md` containing (1) an explicit stage classification of `fictional reply received / screen requested / not scheduled / no offer or acceptance`; (2) a one-page 30-minute screen brief covering why Helios, why the role, the one closest Bitpanda proof, the supporting RWE proof, likely risks Calin can reduce, known objections, and five high-value questions; (3) a qualification plan for scope, ownership, team, contract duration, EU/Romania eligibility, hours, start date, interview process, budget, decision path, and full commercial terms; (4) concise, evidence-bounded answer outlines for service-authentication hardening and investigating reconciliation export timeouts; (5) a PostgreSQL-depth section that distinguishes the verified skill listing from unsupported project claims, identifies truthful topics to prepare, and flags any specific experience detail that requires Calin's confirmation rather than inventing it; (6) a negotiation posture for the €58 question that preserves the €55–65 anchor and €40 floor, compares total terms, and does not accept or reject on incomplete information; (7) walk-away and pause conditions; (8) one next-step response draft labeled `DRAFT — CALIN APPROVAL REQUIRED — NOT SENT` that expresses interest and treats €58 as within the discussion range subject to scope and terms, while asking for proposed screen times rather than inventing or scheduling one; and (9) a complete handoff back to Lead Contract Sales. Write only under `sales/simulations/helios-payments/`. Do not browse, use later fixture events, edit live files, contact anyone, schedule anything, accept a rate, quote a rate externally, or make a promise.
- Recommendation: Prepare around Bitpanda authentication hardening as the primary interview proof and RWE's measurement-first export result as the supporting proof. Treat PostgreSQL depth as a calibration point: the skill is verified, but no detailed project story is supplied, so ask Calin to confirm any specific production example before external use. Treat €58/hour as in-range but conditional on scope and total terms; do not characterize it as accepted.
- Blockers or unknowns: No meeting date or participant is known. The service-authentication design, reconciliation cause, PostgreSQL workload, scope boundaries, team, success measures, start date, process, decision-makers, and most contract terms are unknown. Calin's detailed PostgreSQL project evidence is not present in the supplied files. These gaps do not block preparation but prohibit specific claims, scheduling, or agreement.
- Next owner: Lead Contract Sales, after the closer creates `sales/simulations/helios-payments/closer-prep.md`.
- Due date: 2026-07-22, in the current forward-test session.
- External action: Draft only; Calin approval required.

## Decisions Needed from Calin

- None to complete the internal closer forward test.
- Calin would need to confirm any specific PostgreSQL production example before it could be used in a real interview.
- Calin has not accepted €58/hour, agreed to a meeting, or approved any reply. No external approval should be requested or exercised for this fictional fixture.

## Risks and Next Review Point

- **Invitation-versus-schedule confusion:** A requested screen is not a scheduled interview. The closer must leave date, time, timezone, link, and participants unknown.
- **Rate acceptance ambiguity:** €58 is in range but not agreed. The closer must condition any posture on the complete scope and terms.
- **PostgreSQL overclaim:** A listed skill is not evidence of a specific production result. The closer must not manufacture a PostgreSQL story.
- **Solution guessing:** The closer may describe a measurement-first investigation method but must not assert Helios's timeout cause, authentication flaw, or required solution.
- **Fixture sequencing:** `call-feedback-input.md` is a later event and must not influence this preparation.
- **Next review point:** Lead reviews `sales/simulations/helios-payments/closer-prep.md` for stage accuracy, proof truthfulness, five useful qualification questions, calibrated PostgreSQL treatment, preserved rate guardrails, non-accepting response language, required draft labeling, and a complete return handoff.
