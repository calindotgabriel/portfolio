# Design system — "Field Notes of a Senior Engineer"

The aesthetic for calingabriel.com: an **editorial broadsheet × technical
spec-sheet**. It should read as a document deliberately set by a senior backend
engineer — not generic "AI startup" UI. No rounded cards, no drop shadows, no
purple gradients, no Inter.

Use this file as the source of truth when adding pages/components, and as the
prompt to paste into claude.ai/design (see the bottom section).

---

## 1. Typography

Loaded from Google Fonts (see `src/layouts/BaseLayout.astro` and
`src/layouts/ResumeLayout.astro`). Exposed as tokens in `src/styles/global.css`:

```css
--font-display: 'Fraunces', 'Iowan Old Style', Georgia, serif;
--font-body:    'Newsreader', Georgia, 'Times New Roman', serif;
--font-mono:    'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
```

- **Fraunces** (display) — headlines, names, big metric numbers. Weight 500–600,
  tracking ~`-0.02em`, line-height ~1.0–1.1. Used **big**. Italic Fraunces in
  copper for the occasional emphasized word (e.g. *headline*).
- **Newsreader** (body) — editorial paragraphs. Weight 400–500, line-height
  1.6–1.7, measure max ~62–66ch. `<strong>` = ink + weight 600.
- **JetBrains Mono** (labels) — section numbers, kickers, nav, tags, metric
  captions, the `EVIDENCE` label, contact metadata. Uppercase,
  letter-spacing ~`0.04–0.08em`, small (`0.62–0.74rem`).

Never use Inter / Roboto / Arial / system-ui for content.

---

## 2. Color

Tokens live in `src/styles/global.css` (`:root` = light, `[data-theme="dark"]`).
Theme is user-toggleable and persists in `localStorage` (`cgdev-theme`).

| Role            | Light       | Dark        |
|-----------------|-------------|-------------|
| Page background | `#f5f4fa`   | `#151123`   |
| Surface         | `#ffffff`   | `#1c182d`   |
| Text            | `#1c182d`   | `#f5f4fa`   |
| Text muted      | `#6a6484`   | `#ada7c3`   |
| Text subtle     | `#8d87a5`   | `#847e9d`   |
| Hairline        | `rgba(106,100,132,0.16)` | `rgba(207,203,222,0.12)` |
| Hairline strong | `#cfcbde`   | `#403a56`   |
| **Accent (violet)** | `--secondary: #6d2ec7` | `#ab8bff` |
| Live (status)   | `#1f9d6b` (both) | |

**One accent, used sparingly** - section labels, hover rules, link underlines,
the primary button, the availability dot. It is an accent, not a fill. Most of
the page is ink-on-paper with hairlines.

The neutrals are not grey: they carry the same violet hue (252) as the accent at
low saturation, so the page reads as one palette. If you change the accent hue,
rotate the neutrals with it or the greys will fight the accent.

`#6d2ec7` was chosen over the obvious `#7c3aed`: it leans red, which reads as ink
rather than SaaS-gradient. It clears WCAG AA both as text on the page background
(6.8:1) and as a button fill under white text (7.3:1). Check both before swapping.

The CV at `/resume` shares these tokens. It used to carry its own Apple-grey
palette; do not reintroduce a second one.

---

## 3. Layout & components

Reusable primitives live in `src/styles/editorial.css` (imported by
`global.css`). The homepage (`src/pages/index.astro`) carries its own scoped
copies of the masthead / case-list / colophon.

- **Masthead** (sticky): 2px ink top rule → name (Fraunces) + role (mono
  small-caps), mono nav with `01 02 03` prefixes, a pulsing "Available" dot,
  theme toggle → 1px hairline. ~940–1180px max width.
- **Document sections** — `.ed-section` + `.ed-section-grid`: the section number
  (`§ 01`, mono copper) sits in an ~8.5rem left margin; the heading
  (`.ed-h2`, Fraunces) and body (`.ed-body`, Newsreader) sit to the right.
  Hairline `border-top` between sections.
- **Metric ledger** — `.ed-ledger` / `.ed-metric`: each stat under a 2px ink top
  rule; value is big Fraunces, caption is mono uppercase. Like a data table.
- **Decision / feature grid** — `.ed-cards` / `.ed-card`: hairline-separated
  cells (1px gap over a border-colored background). **No** rounded corners,
  **no** shadows. Optional mono index in copper (`.ed-card-no`).
- **Tags / tech pills** — `.mono-pill`: mono text, 1px border, **2px radius**
  (nearly square). Never pill-shaped, never filled.
- **Status tags** — `.ed-status` + `.is-live` / `.is-enterprise` / `.is-agency`:
  mono, bordered, color-coded (green = live, copper = enterprise).
- **Case-file list** — index number + Fraunces title + status tag + summary +
  mono pills; on hover a copper accent-rule grows on the left and a `→` nudges.
- **Colophon** (`src/components/ContactFooter.astro`): 2px ink rule → Fraunces
  CTA + mono metadata table (label → value) → mono sign-off:
  *"Set in Fraunces & Newsreader. Built with Astro, no template."*
- **Grain**: optional fixed SVG fractal-noise overlay, `mix-blend-mode: soft-light`,
  opacity ~0.5 light / ~0.28 dark (see `.grain` in `index.astro`).

Spacing is generous; rules are hairline; corners are sharp (≤2px).

---

## 4. Motion

- **Hero / above the fold**: one orchestrated page-load via CSS
  `@keyframes riseIn` + per-element `animation-delay` (`.rise`, `--d`). **Never
  gate above-the-fold content on JS** — Astro bundles inline `<script>` as a
  deferred module that runs after `DOMContentLoaded`, so an observer-gated hero
  renders blank. (This bug was hit and fixed once already.)
- **Below the fold**: scroll-triggered reveal via `IntersectionObserver`
  (`.reveal` → `.in-view`), with the hidden state gated behind an `html.js`
  class so content is visible if the script never runs (progressive
  enhancement). Init must run on `readyState !== "loading"`, not only on
  `DOMContentLoaded`.
- Micro-interactions: copper accent-rules grow on hover; `→` arrows nudge.
- Everything inside `@media (prefers-reduced-motion: reduce)` is disabled.

---

## 5. Voice

Plain and specific. Say what was done and where. The reader draws the conclusion.

The previous version of this section said "every claim is paired with a mono
`EVIDENCE` line tying it to a real engagement". That rule is what turned the site
into a sales deck, so it is gone. Outcomes over adjectives still holds: "45 to 12
min", "~65% faster", not "blazing fast".

Six patterns to keep out. These are the ones that actually got written here:

1. **No closing epigram.** A paragraph ends on a fact or it stops. Not
   "adoption by the team is the difference between habit and policy."
2. **No words in number slots.** A metrics block gets real numbers or it gets
   deleted. `End-to-end / Bank-grade / Adopted` were once in one.
3. **Do not address the reader as a buyer.** "For a contract buyer, the relevance
   is direct" appeared in three of four case studies.
4. **No character claims about yourself.** Not "the one who takes the difficult
   piece". State the work; other people get to say what kind of engineer that is.
5. **No costume vocabulary.** No "dossier", "case file", "operating scope",
   section numbering, or `EVIDENCE:` labels. Call things what they are.
6. **No hedged filler.** "Contributed to improved SEO performance" asserts
   nothing. If you cannot say what changed, cut the bullet.

Read it out loud before shipping. If a sentence would be embarrassing to say to a
stranger's face, it goes.

---

## 6. Avoid

Inter / Roboto / Arial / system fonts · rounded cards · box-shadows ·
gradients of any kind · glassmorphism · emoji-as-decoration · centered hero with
one big CTA button · generic SaaS card grids · filled pill-shaped tags.

---

## 7. Stack & deploy

- **Astro 5** static site (`output: "static"`), no UI framework.
- Theme: inline no-flash script in the layout `<head>` sets `data-theme` before
  paint; `ThemeToggle.astro` flips it.
- Résumé (`/resume`) is print-optimized (A4, `pt` sizes); `npm run build`
  regenerates `dist/cv.pdf` via `scripts/generate-pdf.mjs` (Playwright). Keep it
  print-faithful when restyling.
- **Hosting: GitHub Pages** (custom domain via `CNAME` → calingabriel.com,
  Cloudflare in front). Deploys on push to `main` via
  `.github/workflows/astro.yml`. (Not Vercel.)

---

## 8. Prompt for claude.ai/design

> **Design system: "Field Notes of a Senior Engineer" — editorial broadsheet ×
> technical spec-sheet.** Create [DESCRIBE THE PAGE/COMPONENT] as a deliberate,
> document-like layout that reads as hand-set by a senior backend engineer — the
> opposite of generic "AI startup" UI. No rounded cards, no drop shadows, no
> purple gradients, no Inter/Roboto.
>
> **Type:** Fraunces (serif display, weight 500–600, tight tracking) for
> headlines/names/big numbers, with italic Fraunces in copper for one emphasized
> word; Newsreader (reading serif) for body, ~1.6–1.7 line-height, max ~64ch;
> JetBrains Mono (uppercase, ~0.08em tracking, small) for labels, section
> numbers, nav, tags, and metric captions.
>
> **Color:** light = paper `#fdfbf7`, ink `#0f172a`, muted `#475569`, hairlines
> `rgba(15,23,42,0.08–0.12)`; dark = bg `#020617`, text `#f8fafc`. Accent =
> copper `#9a3412` (light) / `#ea580c` (dark), used sparingly for section
> numbers, an `EVIDENCE` label, hover rules, and link underlines.
>
> **Layout:** sticky masthead (2px ink rule, Fraunces name + mono role, mono nav
> with `01 02` prefixes, pulsing "Available" dot, theme toggle); content as a
> document with numbered `§ 01` sections (mono number in the left margin,
> heading + serif body on the right) separated by hairlines; metric ledgers (big
> Fraunces number + mono caption under a 2px top rule); hairline-separated
> decision-card grids (no radius, no shadow); mono square-ish tags (1px border,
> 2px radius); color-coded status tags; a colophon footer with a Fraunces CTA, a
> mono metadata table, and a "Set in Fraunces & Newsreader" sign-off. Optional
> subtle SVG-noise grain overlay (soft-light, ~0.4 opacity). Sharp corners,
> generous margins, ~940px max width.
>
> **Motion:** one orchestrated staggered page-load for the hero via CSS
> animation-delay (never JS-gated, so it can't render blank); scroll-reveal
> below the fold via IntersectionObserver; copper accent-rules grow on hover;
> all `prefers-reduced-motion` safe.
>
> **Voice:** plain and specific - short sentences, concrete outcomes, no
> sales framing and no closing aphorisms. See section 5.
>
> **Avoid:** Inter/Roboto/Arial, rounded cards, box-shadows, gradients,
> glassmorphism, emoji decoration, centered hero with one big CTA
> button, generic SaaS card grids, filled pill tags.
