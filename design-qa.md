# One-Page Runtime Dossier Design QA

## Result

`passed`

No P0, P1, or P2 findings remain. The production candidate is one tagged A4 page and preserves six professional engagements, one independent professional-development record, and the target keywords. The existing full dossier remains two tagged A4 pages.

## 2026-08-10 Iterable and migration content consolidation

Result: `passed`

- The canonical one-page CV now names Iterable marketing automation and Java-to-NestJS microservice migration without changing the approved layout or route structure.
- ImmoScout24 explicitly connects Iterable to React and Node.js product flows, targeted lifecycle messaging, SEO, testing, and release constraints.
- RWE explicitly describes incremental legacy Java to NestJS microservice migration, integration and E2E coverage, regression-risk reduction, MongoDB profiling, and Worker Pools.
- The capability section and Person JSON-LD now include Iterable, marketing automation, third-party integrations, legacy modernization, and Java-to-NestJS migration terms.
- `npm run build` completed successfully, regenerated both PDFs, and synchronized the canonical CV to `/Users/calingabriel/job-search/cv.pdf`.
- `dist/cv.pdf` remains one tagged A4 page at `595.92 × 842.88 pt`; the full dossier remains two tagged A4 pages.
- Extracted PDF text contains the required keywords in the intended summary, ImmoScout24, RWE, and capability sections, with no em or en dashes.
- Arial and Courier New remain embedded, subsetted, and Unicode-mapped. Email, phone, website, LinkedIn, and GitHub annotations remain clickable.
- Visual inspection found no clipping, overlap, orphaning, or unintended second page. Desktop, narrow, and 200%-effective-width browser checks found no horizontal overflow or console errors.
- The synchronized PDF is byte-for-byte identical to `dist/cv.pdf`.

## Previous source target and evidence

The paths below document the earlier Runtime Dossier design iteration and predate the current CV-audit redesign.

- Source HTML: `/Users/calingabriel/.codex/visualizations/2026/07/13/019f5a37-e68a-7be2-99ff-0e6326b5a978/one-page-runtime-dossier-target.html`
- Source A4 target: `/Users/calingabriel/.codex/visualizations/2026/07/13/019f5a37-e68a-7be2-99ff-0e6326b5a978/one-page-runtime-dossier-target.png`
- Matched source/implementation comparison: `/Users/calingabriel/.codex/worktrees/runtime-dossier-one-page/cgdev-portfolio/tmp/design-qa-one-page/one-page-comparison.jpg`
- One-page PDF render: `/Users/calingabriel/.codex/worktrees/runtime-dossier-one-page/cgdev-portfolio/tmp/design-qa-one-page/cv-one-page-1.png`
- Desktop browser capture: `/Users/calingabriel/.codex/worktrees/runtime-dossier-one-page/cgdev-portfolio/tmp/design-qa-one-page/browser-desktop.png`
- Narrow browser capture: `/Users/calingabriel/.codex/worktrees/runtime-dossier-one-page/cgdev-portfolio/tmp/design-qa-one-page/browser-narrow.png`
- 200%-effective-width capture: `/Users/calingabriel/.codex/worktrees/runtime-dossier-one-page/cgdev-portfolio/tmp/design-qa-one-page/browser-200-percent.png`
- Verified local route: `http://127.0.0.1:4176/resume/`

The source appears on the left and the implementation PDF on the right at matching 794 × 1123 A4 dimensions. Header hierarchy, two-line name, contact block, summary, continuous career spine, experience spacing, capability rows, facts rows, cobalt edge, rules, and footer placement match.

## Typography, spacing, color, and assets

- Arial and Courier New load successfully and are embedded as subsets in both PDFs.
- The one-page document uses the same Frost, Carbon, Cobalt, Steel, Rule, and Paper tokens as the approved dossier.
- White-background contrast remains Carbon 16.09:1, Cobalt 5.18:1, and Steel 4.85:1.
- Readability was protected by editing content and expanding useful spacing rather than applying a global scale reduction.
- The main information reaches the lower portion of the A4 page, leaving only the deliberate footer breathing zone instead of a mostly empty second page.
- No photography, icons, logos, cards, shadows inside the document, skill pills, or decorative metrics were introduced.

## Content, SEO, and extraction

- Bitpanda, ImmoScout24, and RWE each contain exactly two outcome-focused bullets.
- Independent professional development, Endava, WIP Romania, and DeverSoft remain chronological compact records with role, dates, location, and one factual summary each.
- The PDF preserves `65%`, `15,000+`, `45 to 12 minutes`, `2,000+`, regulated custody ownership, all contact channels, and career continuity.
- Required Node.js, TypeScript, Fastify, NestJS, GraphQL, REST APIs, microservices, Iterable, marketing automation, legacy modernization, AWS/serverless, MongoDB, PostgreSQL, Redis, Docker, CI/CD, integration/E2E testing, profiling, Worker Pools, and React terms are present.
- Default `pdftotext` order passes: name → title → contact → summary → chronological experience → skills → education → languages → availability.
- The production candidate retains the existing canonical title, description, Person JSON-LD, `/resume` route, `/cv.pdf`, navigation, and sitemap entry.
- `/resume-dossier` and `/cv-runtime-dossier.pdf` are unlisted and absent from the sitemap. The route is `noindex, nofollow`; both routes and the PDF are disallowed in `robots.txt` because GitHub Pages cannot attach an `X-Robots-Tag` header to a static PDF.
- `/resume-draft` is a `noindex, nofollow` compatibility redirect to the one-page `/resume`, so existing review links resolve to the application CV.

## PDF checks

- `dist/cv.pdf`: one page, tagged, A4 `595.92 × 842.88 pt`.
- `dist/cv-runtime-dossier.pdf`: two pages, tagged, A4 `595.92 × 842.88 pt`.
- All fonts report embedded, subsetted, and Unicode-mapped.
- Email, phone, website, LinkedIn, and GitHub annotations are clickable in the one-page PDF.
- The configured local CV sync is byte-for-byte identical to `dist/cv.pdf`.
- No clipping, overlap, orphaned experience, unintended second page, or missing text was found.

## Responsive and accessibility checks

- Desktop: 1280 × 720, one document page, no horizontal overflow.
- Narrow: 390 × 844, semantic single-column reflow, no horizontal overflow.
- Effective 200% zoom: 640 × 720, no horizontal overflow.
- All tested layouts contain three recent entries with two bullets each and four compact earlier entries.
- First Tab focuses `/cv.pdf` with a visible 2 px cobalt outline.
- Reduced-motion mode removes the download transition (`0s`).
- Browser console and page-error capture returned no errors.
- `/resume-dossier` renders two document pages with the correct noindex canonical metadata.
- `/resume-draft` resolves to the one-page `/resume` in the browser.

## Iteration history

1. Built and reviewed the one-page visual target using a single uninterrupted 2026→2013 runtime spine and no duplicate proof strip.
2. Implemented the target; the matched visual comparison had no layout drift, but a two-column lower grid allowed spatial PDF extraction to interleave education with skills. Classified P2.
3. Moved capabilities into full-width rows; extraction improved, but the rightmost availability block could still follow the footer. Classified P2.
4. Replaced the facts columns with a semantic full-width definition list. Rebuilt, recaptured, and confirmed the complete intended extraction order.
5. Re-ran build, PDF, font, link, target-comparison, responsive, focus, reduced-motion, redirect, metadata, and console checks. All P0/P1/P2 findings are resolved.

final result: passed
