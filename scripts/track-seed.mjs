/**
 * Seeds the `curriculum` table from training/curriculum.md.
 * Idempotent: re-running updates existing days rather than duplicating them.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { openDb, ROOT } from "./track-db.mjs";

const YEAR = 2026;

const clean = (s) =>
  s
    .replace(/\*+/g, "")
    .replace(/&amp;/g, "&")
    .trim();

function parseCurriculum(md) {
  const rows = [];
  let week = 0;

  for (const raw of md.split("\n")) {
    const line = raw.trim();

    const weekHeading = line.match(/^###\s+Săptămâna\s+(\d+)/);
    if (weekHeading) {
      week = Number(weekHeading[1]);
      continue;
    }

    if (!line.startsWith("|") || week === 0) continue;

    const cells = line.split("|").slice(1, -1).map(clean);
    if (cells.length < 5) continue;

    const day = Number(cells[0]);
    if (!Number.isInteger(day)) continue; // header and separator rows

    // "Lu 10.08" / "Sâ 15.08" (bold already stripped)
    const when = cells[1].match(/^(\S+)\s+(\d{2})\.(\d{2})$/);
    if (!when) continue;
    const [, weekday, dd, mm] = when;

    const dash = (v) => (v === "—" || v === "-" || v === "" ? null : v);

    rows.push({
      day,
      date: `${YEAR}-${mm}-${dd}`,
      weekday,
      week,
      live_coding: dash(cells[2]),
      depth: dash(cells[3]),
      // Saturday carries "— · *11:45 checkpoint*" in the design column
      design: dash(cells[4]?.replace(/^—\s*·\s*/, "").trim()),
    });
  }

  return rows;
}

const md = readFileSync(join(ROOT, "training", "curriculum.md"), "utf8");
const rows = parseCurriculum(md);

if (rows.length === 0) {
  console.error("No curriculum rows parsed — refusing to write an empty table.");
  process.exit(1);
}

const db = openDb();
const upsert = db.prepare(`
  INSERT INTO curriculum (day, date, weekday, week, live_coding, depth, design)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(day) DO UPDATE SET
    date = excluded.date, weekday = excluded.weekday, week = excluded.week,
    live_coding = excluded.live_coding, depth = excluded.depth, design = excluded.design
`);

for (const r of rows) {
  upsert.run(r.day, r.date, r.weekday, r.week, r.live_coding, r.depth, r.design);
}

const { n } = db.prepare("SELECT COUNT(*) AS n FROM curriculum").get();
const span = db.prepare("SELECT MIN(date) AS a, MAX(date) AS b FROM curriculum").get();
console.log(`Seeded ${rows.length} rows. Curriculum now holds ${n} days, ${span.a} → ${span.b}.`);
db.close();
