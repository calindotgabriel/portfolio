# Profile Improvements Implementation Results — 2026-07-24

## Evidence Boundary

- Observed signal: two completed applications, zero replies, zero interviews, and no objections at the time of the approved profile-improvement handoff.
- Sample size: 2 applications.
- Diagnosis: there is still insufficient response evidence for a canonical proposal change. The approved work addresses a public-CV consistency gap, matching-profile discoverability, and missing third-party proof.
- Decision: keep `sales/core-proposal.md`, EXP-001, pipeline statuses, and verified metrics unchanged.
- External-action boundary: the initial implementation made truthful local source and build changes only. Calin later explicitly authorized committing and pushing the CV changes to `main` so the production pipeline can deploy them to the domain. Repository and domain inspection confirmed that pipeline is GitHub Pages, not Vercel. Profile publication, external-profile login, messages, recommendation requests, applications, and all other external actions remain unauthorized.

## Work Completed

### 1. One-page contract CV

- Located the current generation path after synchronizing with `origin/main`:
  - Active data and verified claims: `src/data/resumeDraft.ts`
  - One-page PDF component: `src/components/RuntimeResumeDocument.astro`
  - Route: `src/pages/resume.astro`
  - Print styling: `src/styles/runtime-resume.css`
  - PDF generator: `scripts/generate-pdf.mjs`
  - Generated artifact: `dist/cv.pdf`
- Upstream had replaced the legacy resume template with the Runtime Dossier architecture. The approved contract positioning was therefore moved into the current active source rather than publishing stale template edits.
- Changed the active location, summary, availability, and one-page skill ordering from hybrid/permanent to long-term remote-EU B2B positioning.
- Used the required availability wording exactly:

  > Long-term B2B contract · Remote EU / Romania · Available immediately · EU citizen · Fluent English

- Preserved every employer, role, location code, employment date, and active verified experience statement.
- Preserved the verified proof displayed by the Runtime Dossier source: RWE exports reduced from 45 to 12 minutes, API response times improved by 65%, 15,000+ daily queries, and Endava's 2,000+ scientific papers daily.
- Reordered the one-page capability groups so Node.js, TypeScript, React, and AWS remain prominent.
- Preserved the current tagged A4 PDF generator and Runtime Dossier layout without adding stale scaling or margin overrides.
- Added print-only system font stacks to both Runtime Dossier PDF styles after the first production build exposed corrupted glyph embedding from externally loaded Google variable fonts in the GitHub Actions environment. Screen typography remains unchanged.
- Regenerated the PDF locally, pushed the scoped changes to `main`, and completed the GitHub Pages production deployment.

### 2. Matching-profile pack

- Prepared exact copy-ready field values for Himalayas and LinkedIn below.
- Kept TypeScript, Node.js, React, and AWS in the first four skill positions.
- Excluded Python, FastAPI, Flask, Vue, GCP, Kubernetes, IaC, and commercetools from all proficiency claims.
- Did not inspect, log in to, edit, or publish either external profile.

### 3. Third-party recommendation

- Defined a defensible selection method for one genuine former colleague.
- Drafted one initial request and one polite follow-up.
- Defined a strict 14-day stop rule.
- Did not identify or invent a recipient, relationship, recommendation, or testimonial.
- Did not send either message.

## Files Changed

- `src/data/resumeDraft.ts`
  - Replaced hybrid/permanent location, summary, and availability copy with the approved long-term remote-EU B2B positioning.
  - Reordered the one-page capability groups to keep Node.js, TypeScript, React, and AWS prominent.
- `src/components/RuntimeResumeDocument.astro`
  - Replaced the hard-coded hybrid/permanent availability line with the required exact wording.
- `src/styles/runtime-resume.css`
  - Added a print-only Arial/Helvetica/Courier stack so the one-page CI-generated PDF does not depend on externally loaded variable-font embedding.
- `src/styles/resume-draft.css`
  - Applied the same print-only font reliability fix to the generated two-page Runtime Dossier PDF.
- `sales/handoffs/2026-07-24-profile-improvements-implementation-results.md`
  - This implementation, upstream-integration, validation, publishing-authorization, and return handoff record.

Generated validation artifacts:

- `dist/cv.pdf` — regenerated current one-page PDF.
- `dist/cv-runtime-dossier.pdf` — regenerated current full dossier PDF by the unchanged build pipeline.
- `tmp/pdfs/contract-cv-runtime-check/page-1.png` — local visual-validation render; intentionally not committed.

Files intentionally not changed:

- `sales/core-proposal.md`
- `sales/pipeline.csv`
- `src/data/resume.ts`, `src/pages/resume.astro`, `src/styles/resume.css`, and `scripts/generate-pdf.mjs`
- Pipeline statuses, experiment state, verified metrics, and unrelated portfolio content

## Exact Profile Copy

The text fields below are copy-ready. Dropdown labels vary by platform, so Calin should choose the nearest truthful platform-provided option without adding unsupported skills or changing the meaning.

### Himalayas

**Headline**

> Senior TypeScript Engineer | Node.js, React, AWS | Remote EU B2B

**About / summary**

> Senior TypeScript engineer with backend-heavy full-stack experience across Node.js, React, AWS, APIs, testing, and data-heavy product systems. Most recently, I built backend features for Bitpanda's institutional crypto-custody platform for banks using Fastify, GraphQL, TypeScript, and AWS. At RWE, I helped migrate legacy Java components to NestJS services, reduced export time from 45 to 12 minutes, and improved API response times by 65%. I am based in Romania and available immediately for long-term remote-EU B2B work.

**Preferred roles — use this order**

1. Senior Backend Engineer
2. Senior TypeScript Engineer
3. Senior Node.js Engineer
4. Senior Full Stack Engineer

**Contract and location preferences**

- Employment / engagement type: `Contract`
- Contract preference: `Long-term B2B`
- Workplace: `Remote`
- Geographic scope: `European Union`
- Current location: `Romania`
- Time zone: `Europe/Bucharest`

**Ordered skills**

1. TypeScript
2. Node.js
3. React
4. AWS
5. REST APIs
6. GraphQL
7. NestJS
8. Fastify
9. MongoDB
10. PostgreSQL
11. Docker
12. CI/CD
13. E2E testing
14. Microservices
15. Performance profiling

**Availability**

> Long-term B2B contract · Remote EU / Romania · Available immediately · EU citizen · Fluent English

### LinkedIn

**Headline**

> Senior TypeScript Engineer | Node.js, React, AWS | Remote EU B2B

**About / summary**

> Senior TypeScript engineer with backend-heavy full-stack experience across Node.js, React, AWS, APIs, testing, and data-heavy product systems.
>
> Most recently, I built backend features for Bitpanda's institutional crypto-custody platform for banks using Fastify, GraphQL, TypeScript, and AWS. I owned the crypto address-book backend end to end, strengthened authentication across services, and introduced backend testing patterns adopted by the team.
>
> At RWE, I helped migrate legacy Java components to NestJS services, reduced export time from 45 to 12 minutes with Worker Pools, and improved API response times by 65%. At ImmoScout24, I shipped React/Node work inside a fully tested distributed platform.
>
> Long-term B2B contract · Remote EU / Romania · Available immediately · EU citizen · Fluent English

**Preferred roles / Open to Work titles — use this order**

1. Senior Backend Engineer
2. Senior TypeScript Engineer
3. Senior Node.js Engineer
4. Senior Full Stack Engineer

**Contract and location preferences**

- Job type: `Contract`
- Workplace type: `Remote`
- Preferred geographic scope: `European Union`
- Current location: `Romania`
- Engagement note, where free text is available: `Long-term remote-EU B2B`

**Ordered skills**

1. TypeScript
2. Node.js
3. React
4. AWS
5. REST APIs
6. GraphQL
7. NestJS
8. Fastify
9. MongoDB
10. PostgreSQL
11. Docker
12. CI/CD
13. E2E testing
14. Microservices
15. Performance profiling

**Availability**

> Long-term B2B contract · Remote EU / Romania · Available immediately · EU citizen · Fluent English

**Explicit exclusions**

Do not add Python, FastAPI, Flask, Vue, GCP, Kubernetes, IaC, or commercetools as skills, experience, proficiency, or keywords. If a role asks about one of them, state the verified boundary rather than implying production experience.

## Third-party Recommendation Selection Criteria

Choose exactly one genuine former colleague from Bitpanda, ImmoScout24, or RWE who meets all mandatory criteria:

1. Worked directly with Calin on real production delivery, not merely at the same company.
2. Personally observed at least one relevant behavior: end-to-end ownership, clear communication, or production quality.
3. Can write in their own words without relying on supplied praise, metrics, or claims they did not observe.
4. Has no known confidentiality, policy, or relationship concern that makes the request inappropriate.
5. Is someone Calin can truthfully address as a former colleague.

Selection order:

1. Prefer the person with the strongest direct observation and relationship quality.
2. If two candidates are equally strong, prefer Bitpanda because it is the most recent and most relevant environment.
3. Otherwise use ImmoScout24 or RWE; company prestige must not override direct observation.
4. If nobody clearly meets the mandatory criteria, do not send a request and return the proof gap to Lead Contract Sales.

## Recommendation-request Drafts

### Initial request

> Hi [Name] — I'm tightening my profile for long-term contract work. Would you be comfortable writing two or three sentences about what it was like to work with me, especially anything you directly observed around ownership, communication, or production quality? Please only mention what you can personally verify. No pressure at all if the timing isn't good.

### One polite follow-up

Send only if there is no response seven days after the initial request:

> Hi [Name] — just a quick follow-up on my recommendation request in case it got buried. If you are comfortable sharing a few sentences based on what you personally observed, I would really appreciate it. If now is not a good time, no worries at all — I will leave it here.

### 14-day stop rule

- One initial request maximum.
- One follow-up maximum, no earlier than day 7.
- If no recommendation or clear commitment exists by day 14, stop. Do not chase again, infer consent, draft a testimonial for the person, or publish anything on their behalf.
- Return the result to Lead Contract Sales. Selecting a different person is a new decision, not an automatic continuation.

## Validation Performed

- Rebased the scoped implementation commit onto the latest `origin/main`, including the Runtime Dossier CV changes introduced upstream.
- Ran `npm run build`; Astro successfully built all 9 routes, pruned the local-only admin route, and regenerated both PDF targets.
- Used `pdfinfo` on `dist/cv.pdf`:
  - Pages: 1
  - Page size: A4
  - Tagged: yes
  - Title: `Senior Node.js & TypeScript Engineer in Cluj-Napoca | Calin Gabriel`
- Rendered the final PDF to `tmp/pdfs/contract-cv-runtime-check/page-1.png` and visually inspected:
  - All six employers are visible.
  - Roles and dates are visible.
  - The summary, experience, capabilities, education, languages, and availability sections are legible.
  - No content is clipped, overlapping, or carried to a second page.
- Verified the required availability sentence appears exactly in `src/data/resumeDraft.ts`, `src/components/RuntimeResumeDocument.astro`, and built `dist/resume/index.html`.
- Extracted the final PDF with `pypdf` and verified, after normalizing font-related extraction spaces, the exact availability sentence, all six employers, and the retained 45-to-12-minute, 65%, 15,000+, and 2,000+ proof.
- Verified `hybrid` and `permanent` occur zero times in the active CV source, built resume HTML, and normalized PDF text.
- Observed the first GitHub Pages production build complete successfully, then downloaded and rendered the live PDF. Its text layer was correct, but several visible glyph groups were missing because the CI-generated PDF embedded the external variable fonts incorrectly.
- Replaced only the print font variables with stable system stacks, rebuilt locally, and visually revalidated both the one-page CV and the first page of the two-page dossier with no missing glyphs, clipping, overlap, or page-count regression.
- Observed corrective GitHub Pages workflow run `30075366997` complete successfully for commit `965fec5`.
- Downloaded the cache-busted production `https://calingabriel.com/cv.pdf`, confirmed its `Last-Modified` timestamp followed the corrective deployment, verified one tagged A4 page and the required text/proof checks, rendered it to PNG, and visually confirmed that the missing-glyph defect was resolved with no clipping or overlap.
- Verified the implementation did not alter `sales/core-proposal.md`, `sales/pipeline.csv`, pipeline statuses, or verified metric values.
- Verified the matching-profile copy does not claim Python, FastAPI, Flask, Vue, GCP, Kubernetes, IaC, or commercetools experience.
- Verified `git diff --check` after resolving the upstream architecture change.

## Experiment and Decision Rule

### CV/profile hygiene

- Start date: after Calin publishes the approved CV and profile values.
- Audience: the next five qualified long-term remote-EU contract applications and profile reviewers.
- Variant: aligned B2B CV plus the verified matching-profile pack above.
- Baseline: two applications, zero replies, zero interviews, and no objections; no profile-sourced signal yet.
- Success measure: no engagement-model ambiguity and at least one qualified profile-sourced view, recommendation, invitation, reply, or recruiter reference within 14 days.
- Keep: retain the positioning when it yields relevant backend/full-stack contract signals without engagement-model objections.
- Change: review field ordering or headline breadth if two or more clearly frontend-only opportunities appear and no qualified backend/full-stack signal appears during the 14-day window.
- Rollback: if Calin deliberately restarts a permanent/hybrid search, create a separately named employment CV. Do not weaken the contract CV. Otherwise roll back only after verified recruiter feedback that the B2B wording blocked a suitable opportunity.

### Third-party proof

- Variant: one request to one genuine former colleague, with one optional day-7 follow-up.
- Success measure: one truthful recommendation published within 14 days.
- Stop condition: no response or recommendation by day 14; no further chase.
- Evidence rule: any recommendation must remain in the recommender's own words and must not be expanded beyond what they personally observed.

## Remaining Blockers

- No production deployment blocker remains: the corrective GitHub Pages deployment completed and the live PDF passed visual and text validation.
- Current Himalayas and LinkedIn field contents, dropdown options, and completion states were not inspected because external-profile access was not authorized. Calin must map the exact values to the available truthful fields.
- A qualifying recommendation recipient has not been identified. Relationship strength, direct observation, willingness, and any confidentiality constraints remain unknown.
- The PDF generator's optional sync destination is `~/job-search/cv.pdf`; that parent directory was absent during generation, so the confirmed artifact is `dist/cv.pdf`.
- No live response evidence yet supports changing the canonical proposal.

## Items Requiring Calin's External Action

1. Review the production `https://calingabriel.com/cv.pdf` after GitHub Pages completes the authorized deployment.
2. Review existing Himalayas and LinkedIn fields, then manually paste or map the approved copy and publish it.
3. Confirm every platform-visible skill remains supported by the verified CV sources; do not add an excluded technology for matching.
4. Select one genuine former colleague using the criteria above.
5. Personalize, approve, and send the initial request personally.
6. Send at most one day-7 follow-up if appropriate, then enforce the 14-day stop rule.
7. Report profile-sourced signals, recommendation outcome, replies, objections, and recruiter references back to Lead Contract Sales.

## Complete Handoff to Lead Contract Sales

- Objective: Implement the three approved profile improvements without changing the canonical proposal or taking external action.
- Inputs and file paths: `sales/handoffs/2026-07-24-profile-improvements-results.md`; `sales/operating-system.md`; `sales/core-proposal.md`; `sales/pipeline.csv`; `sales/daily/2026-07-22.md`; `sales/daily/2026-07-23.md`; `sales/daily/2026-07-24.md`; `sales/accounts/signify-technology.md`; `sales/accounts/data-edge.md`; `src/data/resumeDraft.ts`; `src/components/RuntimeResumeDocument.astro`; `docs/market-fit-plan.md`; `docs/interview-narrative.md`; current CV route, styling, and generator files listed above.
- Output path: `sales/handoffs/2026-07-24-profile-improvements-implementation-results.md`.
- Verified evidence: two applications and no replies or objections; the deployed CV's hybrid/permanent inconsistency; the approved verified profile terms; detailed Bitpanda, RWE, ImmoScout24, and Endava proof; and the absence of reviewed third-party recommendations.
- Work completed: current Runtime Dossier one-page contract CV implemented and validated against the latest `origin/main`; exact Himalayas/LinkedIn copy prepared; one-recipient recommendation selection criteria, request, follow-up, and stop rule prepared; production commit/push authorized as a later follow-up.
- Recommendation: keep the validated production CV in place, then have Calin separately publish the profile fields and run the recommendation request as a one-person 14-day experiment. Keep `sales/core-proposal.md` and EXP-001 unchanged.
- Success measure: zero engagement-model ambiguity, at least one qualified profile-sourced signal within 14 days, and one truthful third-party recommendation within 14 days of the request.
- Rollback condition: use a separately named employment CV if permanent/hybrid search resumes; otherwise change only after verified recruiter or matching evidence. Stop recommendation outreach after day 14 without a result.
- Affected assets: local CV source and generated PDF; draft-only Himalayas/LinkedIn values; draft-only recommendation request.
- Blockers or unknowns: current external profile field state, platform dropdown labels, recipient identity and willingness, confidentiality constraints, and future response evidence.
- Next owner: Lead Contract Sales.
- Due date: 2026-07-24.
- External action: Calin explicitly authorized commit and push to `main` for the portfolio deployment. Profile publication and any message still require Calin's personal action.
