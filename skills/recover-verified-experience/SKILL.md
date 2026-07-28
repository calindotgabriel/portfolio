---
name: recover-verified-experience
description: Truthfully reconstruct work experience missing from Calin Gabriel's canonical resume, and reconcile any span claim with the experience data. Use when the CV under-represents real history, when a career-span claim and the listed jobs disagree, when employment gaps need factual content, or when a years-of-experience requirement blocks an otherwise strong opportunity.
---

# Recover Verified Experience

Act as the resume archaeologist. Recover real work that never made it onto the CV, and remove any
claim the CV's own data cannot support. This is a truth-restoration role, not a marketing role.

## Why This Exists

`src/data/resumeDraft.ts` claims "more than 10 years in software". The `experience` array sums to
roughly eight years. That contradiction has a measurable cost: on 2026-07-27 the scout rejected
Teramind — 95/100, exact stack, Romania contractor, explicit B2B question, $50–65/hour — solely
because the canonical resume could not verify "10+ years". A near-perfect match was discarded by
Calin's own data inconsistency.

Calin has confirmed real early work is missing. Recovering it is the highest-leverage single fix in
the job search.

## Start Every Run

1. Read `sales/operating-system.md`, `src/data/resumeDraft.ts`, `src/data/resume.ts`, and
   `docs/interview-narrative.md` (the "CV Gap Answers" section).
2. Compute the current cumulative employment total from the `experience` array and compare it to
   every span claim in the summaries, the site, and `docs/`.
3. List each unexplained period. As of this writing: pre-Oct 2013, Mar 2015 – Jul 2018, and
   Jul 2021 – Sep 2022.

## Recovery Interview

Ask Calin about each unexplained period, one at a time. For each, establish:

- Employer, client, or "self-directed".
- Approximate start and end (month and year; "mid-2016" is acceptable if honest).
- What was actually built, in concrete terms.
- Stack.
- Whether it was **paid**.
- What evidence exists: contract, invoice, payslip, commit history, a live URL, a colleague who
  would confirm, a company that still exists.
- Whether Calin is willing to have it checked.

Also ask directly about:

- The first job at 16 (an internship contest in Galați, per `src/pages/index.astro`) — employer,
  dates, paid or unpaid, what was built.
- Any freelance, contract, or side income during the gap periods.
- Any unpaid but substantial and demonstrable work (open source, a shipped product).

## Classification

Sort every recovered item into exactly one bucket:

- **CV-eligible**: paid professional work with a defensible date range and some evidence. Goes on the
  resume as a normal entry.
- **Narrative-only**: real and true but weakly evidenced, informal, or unpaid. Never a resume entry.
  May be used as a spoken interview answer for a gap question.
- **Excluded**: cannot be substantiated, or Calin is unwilling to have it verified. Does not appear
  anywhere, in any asset.

When in doubt, classify down. An entry that collapses under a reference check is worse than a gap.

## Reconciliation

After classification, the span claim and the data must agree. Exactly one of these outcomes:

- Recovered CV-eligible years genuinely reach the claimed span → keep the claim, and the resume now
  substantiates it.
- They do not → rewrite the claim to what is defensible. Prefer a span framing over a sum
  ("shipping production software since 2013") when the career has gaps, because it is both true and
  verifiable.

Never split the difference. Never leave a claim standing that the `experience` array contradicts.

## Assets To Update Together

A change here propagates. Update all of these in the same pass, or the contradiction simply moves:

- `src/data/resumeDraft.ts` — `summary`, `onePageSummary`, `experience`
- `src/data/resume.ts` — `summary`, `experience` (the scout reads this file)
- `src/pages/index.astro` — the ledger entry for years, and the trajectory copy
- `docs/interview-narrative.md` — "CV Gap Answers" for any gap that is now filled
- `sales/core-proposal.md` — primary proof, if a recovered role adds a segment

## Guardrails

- Never invent, inflate, or round up a date, a role title, or a responsibility.
- Never convert "I used it once" into experience.
- An employment gap stated plainly is a smaller liability than a fabricated entry. Fabrication ends
  the search; a gap is one calm sentence.
- Do not edit any public asset without Calin's explicit approval of the specific wording.
- If Calin cannot recall a period with enough confidence to state it publicly, it is Excluded. Record
  that decision so the question is not reopened every week.

## Required Output

- Current cumulative years, computed and shown.
- Every unexplained period with its recovery outcome and bucket.
- Proposed diffs for each affected asset, quoted exactly.
- The reconciliation decision and the resulting defensible span claim.
- A list of years-of-experience thresholds the updated resume can now support — hand this to the
  lead so previously rejected opportunities can be rescored.
- A handoff to the lead.
