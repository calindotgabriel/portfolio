# Runtime Dossier Production Design QA

## Result

`passed`

No P0, P1, or P2 findings remain. The production promotion matches the approved two-page target; the only intentional visual difference is the corrected Bitpanda end date (`Jun 2026`) from the latest upstream resume data.

## Comparison target and evidence

- Source page 1: `/Users/calingabriel/.codex/visualizations/2026/07/13/019f5a37-e68a-7be2-99ff-0e6326b5a978/runtime-dossier-target-page-1.png`
- Source page 2: `/Users/calingabriel/.codex/visualizations/2026/07/13/019f5a37-e68a-7be2-99ff-0e6326b5a978/runtime-dossier-target-page-2.png`
- Production comparison page 1: `/Users/calingabriel/.codex/worktrees/runtime-dossier-prod/cgdev-portfolio/tmp/design-qa-prod/comparison-page-1.jpg`
- Production comparison page 2: `/Users/calingabriel/.codex/worktrees/runtime-dossier-prod/cgdev-portfolio/tmp/design-qa-prod/comparison-page-2.jpg`
- Production PDF render page 1: `/Users/calingabriel/.codex/worktrees/runtime-dossier-prod/cgdev-portfolio/tmp/design-qa-prod/cv-page-1.png`
- Production PDF render page 2: `/Users/calingabriel/.codex/worktrees/runtime-dossier-prod/cgdev-portfolio/tmp/design-qa-prod/cv-page-2.png`
- Desktop route capture: `/Users/calingabriel/.codex/worktrees/runtime-dossier-prod/cgdev-portfolio/tmp/design-qa-prod/browser-desktop.png`
- Narrow route capture: `/Users/calingabriel/.codex/worktrees/runtime-dossier-prod/cgdev-portfolio/tmp/design-qa-prod/browser-narrow.png`
- 200%-effective-width capture: `/Users/calingabriel/.codex/worktrees/runtime-dossier-prod/cgdev-portfolio/tmp/design-qa-prod/browser-200-percent.png`
- Verified route: `http://127.0.0.1:4175/resume/`

The source is on the left and the implementation on the right in each matched 794 × 1123 A4 comparison. Typography, margins, cobalt edge, rules, career-spine geometry, entry spacing, capability matrix, and footer baselines match without actionable drift.

## Typography, layout, and color

- Geologica, Atkinson Hyperlegible Next, and Martian Mono resolved during generation and are embedded as subsets in the PDF.
- Both output files are exactly two A4 pages (`595.92 × 842.88 pt`) with no clipping, overlap, orphaned entry, or third page.
- Frost, Carbon, Cobalt, Steel, Rule, and Paper tokens match the target.
- White-background contrast remains: Carbon 16.09:1, Cobalt 5.18:1, Steel 4.85:1.
- No photography, logos, illustrations, shadows inside the document, or fallback ornamental assets are present.

## Content, SEO, and document extraction

- `/resume` has the production canonical `https://calingabriel.com/resume`, descriptive title and description, and no `noindex` directive.
- `/resume-draft` keeps `noindex, nofollow`, its own canonical, and remains absent from navigation and the sitemap.
- Person JSON-LD includes `jobTitle`, Cluj-Napoca locality, URL, LinkedIn and GitHub `sameAs`, Babeș-Bolyai University, and factual engineering topics.
- Selectable text includes all six companies, roles, dates, proof metrics, and the intended Node.js, TypeScript, Fastify, NestJS, GraphQL, REST APIs, microservices, AWS/serverless, MongoDB, PostgreSQL, Redis, Docker, CI/CD, integration/E2E testing, profiling, Worker Pools, and React terms.
- The PDF is tagged. Raw extraction follows name → title → contact → summary; normal spatial extraction preserves chronological experience and all remaining sections. The right-side header contact can be grouped after the left summary by spatial extractors, but all labeled fields remain complete and selectable.
- Link annotations are present for email, phone, website, LinkedIn, and GitHub.

## Responsive and accessibility checks

- Desktop: 1280 × 720, no horizontal overflow.
- Narrow: 390 × 844, no horizontal overflow and the header/intro reflow to one column.
- 200%-effective-width proxy: 640 × 720, no horizontal overflow.
- First Tab focuses the production `/cv.pdf` link with a visible 2 px cobalt outline.
- Reduced-motion mode removes the download transition (`0s`).
- Browser console and page-error capture returned no errors at all tested widths.
- Both `/cv.pdf` and `/cv-runtime-dossier.pdf` returned HTTP 200 with `application/pdf`.

## PDF and build verification

- Production build completed successfully.
- `dist/cv.pdf` and `dist/cv-runtime-dossier.pdf` were generated together.
- `dist/cv.pdf` was synced byte-for-byte to the configured local CV path.
- Both PDFs are tagged, have embedded fonts, preserve selectable text, and contain live contact annotations.

## Iteration history

1. The approved isolated draft passed matched full-page and focused comparison with no P0/P1/P2 visual findings.
2. Production integration moved the same document component to `/resume`, retained the noindex draft mirror, and incorporated the newer upstream Bitpanda end date.
3. PDF generation was upgraded to tagged output and rerun for both routes.
4. Production comparisons and desktop, narrow, 200%-effective-width, focus, reduced-motion, PDF, metadata, link, font, and extraction checks all passed.
