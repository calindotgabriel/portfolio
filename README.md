# Calin Gabriel Portfolio

Astro static portfolio and CV site for `calingabriel.com`.

## Stack

- Astro 5 static output
- TypeScript data for resume and project content
- Playwright-based PDF generation for `/cv.pdf` and `/cv-runtime-dossier.pdf`
- GitHub Pages deployment via `gh-pages`

## Commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` runs `astro build`, generates the one-page `dist/cv.pdf` from `/resume/`, and generates the full two-page `dist/cv-runtime-dossier.pdf` from `/resume-dossier/`.

## Content Editing

- Runtime CV and dossier content lives in `src/data/resumeDraft.ts`.
- Project cards and the project index share `src/data/projects.ts`.
- Detailed case studies live under `src/pages/projects/`.
- CV metadata is shared through `src/layouts/RuntimeDossierLayout.astro` and `src/data/runtimeDossierSeo.ts`.

## Deployment

```sh
npm run deploy
```

The canonical domain is `https://calingabriel.com`.
