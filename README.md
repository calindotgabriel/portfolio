# Calin Gabriel Portfolio

Astro static portfolio and CV site for `calingabriel.com`.

## Stack

- Astro 5 static output
- TypeScript data for resume and project content
- Playwright-based PDF generation for `/cv.pdf`
- GitHub Pages deployment via `gh-pages`

## Commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` runs `astro build` and then generates `dist/cv.pdf` from the built `/resume/` route.

## Content Editing

- Resume content lives in `src/data/resume.ts`.
- Project cards and the project index share `src/data/projects.ts`.
- Detailed case studies live under `src/pages/projects/`.
- Site metadata is set in `src/layouts/BaseLayout.astro`, `src/layouts/ResumeLayout.astro`, and `astro.config.mjs`.

## Deployment

```sh
npm run deploy
```

The canonical domain is `https://calingabriel.com`.
