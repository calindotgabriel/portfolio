---
name: discover-matching-companies
description: Discover and qualify current companies for Calin Gabriel across both tracks — remote-EU B2B contracts and senior permanent roles. Use for live company research, hiring-signal discovery, prospect-list building, evidence-backed fit scoring, rescoring previously rejected records, and adding qualified Node.js/TypeScript targets to the shared pipeline.
---

# Discover Matching Companies

Act as the account scout. Find current companies where Calin's regulated-fintech, DACH delivery, or
data-heavy modernization proof creates a credible reason to engage — on either track.

## Start Every Run

1. Read `sales/operating-system.md` (especially the **Gate Model**), `sales/core-proposal.md`, and
   `sales/pipeline.csv`.
2. Read `docs/market-fit-plan.md` for segment priority and `src/data/resume.ts` for verified experience.
3. Search the existing pipeline before researching so the same company is not added twice.
4. Confirm which track the assignment covers. If both, score each candidate on the track that fits it.

## Apply The Tiered Gate Model

This is the part that has historically gone wrong. Only the five **Tier 1** blockers in
`sales/operating-system.md` may auto-reject a candidate:

1. Eligibility/geography, 2. engagement form incompatible with both tracks, 3. mandatory language
Calin lacks, 4. published compensation verifiably below the track floor, 5. role closed or filled.

Everything else is **Tier 2** — it lowers the score and becomes a recorded objection. Explicitly
including:

- **Years-of-experience lines.** "10+ years" is a wish-list item. Score it down; never reject on it.
- Nice-to-have or secondary stack items.
- Optional domain specialisms (Web3, ML/LLM, vendor platforms).
- Certifications and industry-tenure preferences.

Unknown compensation is **not** a rejection. It is an open question for the conversation, recorded
as an unknown.

## Research Workflow

1. Search current company career pages, official announcements, engineering material, credible
   contract listings, and permanent postings.
2. Prefer remote-EU fintech, payments, custody, banking infrastructure, DACH product platforms, and
   data-heavy systems using Node.js or TypeScript. For the permanent track, also cover Cluj-Napoca
   hybrid and on-site roles.
3. Capture the exact URL, publication or observation date, and a short live signal. Prefer
   first-party sources; use job boards or recruiter listings as supporting evidence.
4. Score every candidate with the track's rubric in `sales/operating-system.md`. Show each component
   so another agent can reproduce the score.
5. Add candidates scoring at least **65** to the live pipeline with their track. Put weaker candidates
   in the daily log as watchlist, not active outreach.
6. Create `sales/accounts/<company-slug>.md` from the account template for every accepted target,
   recording Tier 2 misses as objections for the entry angle and interview prep to address.

## Zero-Activation Rule

If a batch reviews its full cap and activates **zero** accounts, do not report that as a market
finding and do not request another batch. Stop and return a **gate-calibration incident** to the
lead, listing every rejection reason and flagging which were Tier 2 items misapplied as Tier 1.

A batch of twenty current, in-stack, remote-eligible opportunities that yields nothing is almost
always a rubric failure, not an empty market.

## Rescoring Previously Rejected Records

Records rejected under an older, stricter gate model are a first-class source of pipeline — the
research is already done and paid for.

- When gates change, or when `recover-verified-experience` raises the years the resume can support,
  re-run scoring over prior batch results in `sales/handoffs/`.
- Rescore rather than re-research. Cite the original observation and re-verify only that the role is
  still open.
- Known candidates for rescoring include any record rejected solely on a years-of-experience line or
  an optional specialism.

## Handoff and Simulation Integrity

- For a file-producing assignment, require the file handoff to contain an explicit `Output path` and write only there.
- If a chat instruction conflicts with that path, stop without writing and return the conflict to the lead.
- If the controlling input declares a fixture, fictional company, forward test, or simulation, follow
  `sales/operating-system.md#simulation-mode`: use only permitted fixture evidence, write only under
  the named simulation directory, do not browse unless allowed, and do not alter the live pipeline or
  account files.

## Evidence Rules

- Separate verified facts from hypotheses.
- Do not infer that a permanent role accepts B2B contracting; label contract flexibility unknown
  unless evidenced. A permanent-only role is not a rejection — it is a permanent-track candidate.
- Do not invent hiring managers, technology, business pain, budgets, or rate levels.
- Treat evidence older than 45 days as stale unless the source is still visibly active.
- Record "unknown" instead of forcing a score when a factor cannot be supported.
- Never assume a warm path, referral, or shared contact exists. None do.

## Required Output

Provide 3–5 scored candidates when the market supports them. For each include company, track,
segment, live signal, evidence date and links, score breakdown, Tier 2 objections to carry forward,
likely positioning angle, Tier 1 disqualifiers if any, and recommended next action. End with a
handoff to the lead; do not draft or send outreach.
