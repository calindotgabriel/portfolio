# Profile Improvement Results — 2026-07-24

## Evidence Boundary

- Observed funnel signal: two completed applications, zero replies, zero interviews, and no objections as of the controlling handoff.
- Sample size: 2 applications.
- Diagnosis: there is not enough response evidence to change the canonical proposal. The current opportunity evidence instead exposes three smaller issues: a public-CV positioning inconsistency, incomplete or weak matching-profile discoverability, and limited third-party proof.
- Decision: keep `sales/core-proposal.md` and EXP-001 unchanged. Treat the first two recommendations as do-now hygiene after Calin approval; treat the third as a bounded proof experiment.

## Improvement 1 — Align the Public One-Page CV With the Contract Offer

- Category: Do-now consistency hygiene.
- Observed signal: the controlling handoff records that the live one-page CV uses hybrid/permanent positioning while the approved offer and current repository resume data target long-term remote-EU B2B work. Both submitted opportunities were remote European contracts.
- Affected asset: the public one-page PDF at `https://calingabriel.com/cv.pdf`; no source or public asset is changed by this recommendation.
- Truthful proposed change:
  - Title: `Senior Node.js / TypeScript Engineer`
  - Opening line: `Senior Node.js/TypeScript engineer for fintech, regulated backend systems, migrations, data-heavy APIs, and tested React/Node platforms.`
  - Availability line: `Long-term B2B contract · Remote EU / Romania · Available immediately · EU citizen · Fluent English`
  - Remove `hybrid`, `permanent`, and any wording that implies Calin is primarily seeking a local employment role.
- Supporting evidence: `src/data/resume.ts`, `sales/core-proposal.md`, and both active account records already support the proposed wording; no new responsibility or metric is introduced.
- Effort estimate: 20–30 minutes to update, regenerate, deploy, and visually verify the PDF after approval.
- Expected benefit: recruiters and application reviewers receive the same engagement message across the website, uploaded CV, and sales proposal, reducing avoidable contract-fit ambiguity.
- Measurable test: download the deployed PDF after release and verify that all four contract signals—B2B, remote EU, Romania, immediate availability—appear once and that hybrid/permanent wording appears zero times. Use this version for the next five qualified contract applications and record any engagement-model objection.
- Rollback condition: if Calin deliberately resumes a permanent/hybrid search, create a separately named employment CV rather than weakening the contract CV; otherwise roll back only if a verified recruiter reports that the contract wording blocks an otherwise suitable opportunity.
- Calin approval required: Yes, because this changes a public CV asset.

## Improvement 2 — Complete Matching Profiles With Verified Search Terms

- Category: Do-now discoverability hygiene.
- Observed signal: the Himalayas dashboard screenshot showed profile completion at 1 of 6, while Data Edge searched centrally for React and TypeScript. Calin's verified profile contains relevant React, TypeScript, Node.js, AWS, MongoDB, API, microservices, testing, and performance proof, but the contract positioning is backend-led and can hide the full-stack match in keyword-based searches.
- Affected asset: Himalayas first; apply the same verified headline and skill ordering to LinkedIn or another matching profile only after reviewing the existing field values.
- Truthful proposed change:
  - Headline: `Senior TypeScript Engineer | Node.js, React, AWS | Remote EU B2B`
  - First summary sentence: `Senior TypeScript engineer with backend-heavy full-stack experience across Node.js, React, AWS, APIs, testing, and data-heavy product systems.`
  - Prioritized verified skills: `TypeScript`, `Node.js`, `React`, `AWS`, `REST APIs`, `GraphQL`, `NestJS`, `Fastify`, `MongoDB`, `PostgreSQL`, `Docker`, `CI/CD`, `E2E testing`, `Microservices`, `Performance profiling`.
  - Explicit exclusion: do not add Python, FastAPI, Flask, Vue, GCP, Kubernetes, or IaC as proficiency claims without verified source evidence.
- Supporting evidence: `src/data/resume.ts` verifies every proposed term; the Data Edge record shows why React visibility matters, while Signify verifies that Node.js/TypeScript should remain prominent.
- Effort estimate: 15–25 minutes for one profile, including a field-by-field truth check.
- Expected benefit: stronger matching for both backend-led Node.js roles and React/TypeScript full-stack roles without diluting the regulated-backend differentiator or manufacturing missing-stack experience.
- Measurable test: reach the platform's complete-profile state; confirm every visible skill is supported by `src/data/resume.ts`; then track profile-sourced invitations or relevant recommendations for 14 days. Success is at least one qualified profile-sourced view, invitation, or recommendation that matches the ICP.
- Rollback condition: remove or demote the broader full-stack headline if it produces two or more clearly frontend-only opportunities and no qualified backend/full-stack signal during the 14-day window; retain the truthful skills in work history.
- Calin approval required: Yes, because Calin must edit and publish external profile fields.

## Improvement 3 — Add One Specific Third-Party Recommendation

- Category: Bounded proof experiment.
- Observed signal: the market-fit plan identifies third-party proof as the largest missing credibility element. Current assets contain detailed first-party claims, but the reviewed sources show no colleague or client recommendation validating ownership, communication, or production quality.
- Affected asset: LinkedIn Recommendations, ideally from one former Bitpanda colleague; ImmoScout24 or RWE is the fallback if that relationship is stronger.
- Truthful proposed change: ask one person who directly observed Calin's work for a short recommendation. Draft request:

  > Hi [Name] — I'm tightening my profile for long-term contract work. Would you be comfortable writing two or three sentences about what it was like to work with me, especially anything you directly observed around ownership, communication, or production quality? Please only mention what you can personally verify. No pressure at all if the timing isn't good.

- Supporting evidence: `docs/market-fit-plan.md` names recommendations as the missing sell factor; Bitpanda, ImmoScout24, and RWE are the three most relevant recent proof environments. The request deliberately avoids supplying praise or metrics for the recommender to repeat.
- Effort estimate: 5 minutes to select one appropriate person and personalize the draft; the external response time is outside Calin's control.
- Expected benefit: one credible external voice reduces reliance on self-authored claims and can substantiate the senior behaviors most difficult to prove through a CV.
- Measurable test: send one Calin-approved request to one genuine former colleague and measure whether one truthful recommendation is published within 14 days. If published, monitor whether recruiters reference it during the next ten qualified conversations or profile reviews.
- Rollback condition: if the person declines or does not respond within 14 days, do not manufacture a testimonial or repeatedly chase them. Return to the lead and choose either one different genuine relationship or wait for interview evidence.
- Calin approval required: Yes. Calin must choose the person, approve the wording, send the request, and approve any public use.

## Handoff

- Objective: Return exactly three evidence-grounded profile improvements to Lead Contract Sales for prioritization and Calin approval.
- Inputs and file paths: `sales/handoffs/2026-07-24-profile-improvements.md`; `sales/operating-system.md`; `sales/core-proposal.md`; `sales/pipeline.csv`; `sales/daily/2026-07-23.md`; `sales/accounts/signify-technology.md`; `sales/accounts/data-edge.md`; `src/data/resume.ts`; `docs/market-fit-plan.md`; `docs/interview-narrative.md`; reviewed portfolio source files.
- Output path: `sales/handoffs/2026-07-24-profile-improvements-results.md`.
- Verified evidence: Two applications, no replies or objections; a recorded live-CV contract-positioning inconsistency; a 1-of-6 Himalayas profile screenshot; React/TypeScript visibility relevant to Data Edge; and no reviewed third-party recommendation.
- Required deliverable: Exactly three bounded recommendations with signal, affected asset, wording, effort, benefit, test, rollback, and approval status.
- Recommendation: Approve Improvements 1 and 2 as consistency/discoverability hygiene; run Improvement 3 as a one-person, 14-day proof experiment. Keep the canonical proposal unchanged until response evidence exists.
- Blockers or unknowns: Current live LinkedIn field values, current Himalayas completion state after the application, the deployed PDF build source, suitable recommender willingness, and all future response evidence.
- Next owner: Lead Contract Sales.
- Due date: 2026-07-24.
- External action: Draft only; Calin approval required.
