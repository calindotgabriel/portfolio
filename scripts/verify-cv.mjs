import { readFileSync, readdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const DIST = resolve("dist");
const CV_PATH = join(DIST, "cv.pdf");

// Claims that were removed on purpose. If one reappears in a build, something
// regenerated old copy - fix the source rather than relaxing this list.
const forbiddenPhrases = [
  "more than 10 years",
  "nearly three years",
  "since 2013",
  "20% higher user engagement",
  "ath seo",
  "Projects & Professional Development",
  "contract buyer",
  "Runtime Dossier",
  "Case file",
  "End-to-end feature ownership",
];

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function loadPdf(path) {
  const loadingTask = getDocument({
    data: new Uint8Array(readFileSync(path)),
    disableWorker: true,
  });
  return loadingTask.promise;
}

async function extractPdfText(pdf) {
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    pages.push(
      normalizeText(
        textContent.items
          .filter((item) => "str" in item)
          .map((item) => item.str)
          .join(" "),
      ),
    );
  }

  return pages;
}

function assertContains(text, requiredPhrases, label) {
  const lowerText = text.toLowerCase();

  for (const phrase of requiredPhrases) {
    assert(
      lowerText.includes(phrase.toLowerCase()),
      `${label} is missing required text: ${phrase}`,
    );
  }
}

function assertAbsent(text, phrases, label) {
  const lowerText = text.toLowerCase();

  for (const phrase of phrases) {
    assert(
      !lowerText.includes(phrase.toLowerCase()),
      `${label} contains forbidden text: ${phrase}`,
    );
  }
}

function assertOrdered(text, phrases, label) {
  const lowerText = text.toLowerCase();
  let previousIndex = -1;

  for (const phrase of phrases) {
    const index = lowerText.indexOf(phrase.toLowerCase(), previousIndex + 1);
    assert(index >= 0, `${label} is missing ordered text: ${phrase}`);
    assert(
      index > previousIndex,
      `${label} extraction order is invalid at: ${phrase}`,
    );
    previousIndex = index;
  }
}

function collectHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectHtmlFiles(path);
    return extname(entry.name) === ".html" ? [path] : [];
  });
}

async function verifyLinks(pdf) {
  const page = await pdf.getPage(1);
  const annotations = await page.getAnnotations();
  const urls = annotations
    .map((annotation) => annotation.url || annotation.unsafeUrl || "")
    .filter(Boolean);
  const expectedUrls = [
    "mailto:contact@calingabriel.com",
    "tel:+40759407066",
    "https://calingabriel.com/",
    "https://www.linkedin.com/in/calingabriel-ts-dev/",
    "https://github.com/calindotgabriel",
  ];

  for (const expectedUrl of expectedUrls) {
    assert(
      urls.some((url) => url === expectedUrl),
      `cv.pdf is missing link annotation: ${expectedUrl}`,
    );
  }
}

async function main() {
  const cv = await loadPdf(CV_PATH);

  assert(cv.numPages === 1, `cv.pdf must have 1 page, found ${cv.numPages}`);
  const cvPages = await extractPdfText(cv);
  const cvText = cvPages.join(" ");

  assertContains(
    cvText,
    [
      "Senior Backend Developer",
      "React",
      "around 7 years",
      "over 5 years",
      "event-driven systems",
      "PostgreSQL",
      "payments",
      "AWS",
      "Docker",
      "CI/CD",
      "Bitpanda",
      "ImmoScout24",
      "RWE",
      "Freelance",
      "15,000+",
      "65%",
      "45 to 12 minutes",
      "microservices",
      "Permanent / long-term B2B",
      "EU citizen",
    ],
    "cv.pdf",
  );
  assertOrdered(
    cvText,
    [
      "Work experience",
      "Bitpanda",
      "ImmoScout24",
      "RWE",
      "Earlier experience",
      "Freelance",
      "Technical skills",
      "Education",
    ],
    "cv.pdf",
  );
  assertAbsent(cvText, forbiddenPhrases, "cv.pdf");
  await verifyLinks(cv);

  const builtHtml = collectHtmlFiles(DIST)
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  assertAbsent(builtHtml, forbiddenPhrases, "built HTML");

  console.log("CV verification passed.");
}

main().catch((error) => {
  console.error(`CV verification failed: ${error.message}`);
  process.exit(1);
});
