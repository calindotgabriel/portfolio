/**
 * Regenerates the tables inside training/log.md and training/redo.md from SQLite.
 * Only the region between <!-- BEGIN:TABLE --> and <!-- END:TABLE --> is replaced;
 * every line of prose around it is preserved byte for byte.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { openDb, ROOT, toShort } from "./track-db.mjs";

const BEGIN = "<!-- BEGIN:TABLE -->";
const END = "<!-- END:TABLE -->";

function replaceRegion(file, table) {
  const path = join(ROOT, "training", file);
  const src = readFileSync(path, "utf8");
  const a = src.indexOf(BEGIN);
  const b = src.indexOf(END);

  if (a === -1 || b === -1 || b < a) {
    console.error(`${file}: missing ${BEGIN} / ${END} markers — skipped, nothing written.`);
    return false;
  }

  const next = src.slice(0, a + BEGIN.length) + "\n" + table.trimEnd() + "\n" + src.slice(b);
  if (next === src) {
    console.log(`${file}: unchanged.`);
    return true;
  }
  writeFileSync(path, next);
  console.log(`${file}: table regenerated.`);
  return true;
}

const cell = (v) => (v === null || v === undefined || v === "" ? "" : String(v).replace(/\|/g, "\\|"));

const db = openDb();

// ------------------------------------------------------------------ log.md

const logRows = db
  .prepare("SELECT l.*, c.day AS cday FROM log l LEFT JOIN curriculum c ON c.date = l.date ORDER BY l.date")
  .all();

const lc = (r) =>
  r.lc_solved === null && r.lc_attempted === null ? "" : `${r.lc_solved ?? 0}/${r.lc_attempted ?? 0}`;

const logTable = [
  "| Data | Zi | LC | Adâncime | Design | Mock | Aplicări | PM | Notă |",
  "| --- | ---: | --- | --- | --- | --- | ---: | ---: | --- |",
  ...logRows.map((r) =>
    `| ${toShort(r.date)} | ${cell(r.day ?? r.cday ?? 0)} | ${lc(r)} | ${cell(r.depth) || "—"} | ` +
    `${cell(r.design) || "—"} | ${cell(r.mock) || "—"} | ${cell(r.applications)} | ` +
    `${cell(r.postmortems)} | ${cell(r.note)} |`,
  ),
].join("\n");

// ----------------------------------------------------------------- redo.md

const active = db.prepare("SELECT * FROM redo WHERE status = 'active' ORDER BY due7, id").all();
const gaps = db.prepare("SELECT * FROM redo WHERE status = 'gap' ORDER BY id").all();
const closed = db.prepare("SELECT * FROM redo WHERE status = 'closed' ORDER BY closed_on, id").all();

const empty = (cols) => `| ${" | ".repeat(cols - 1)}|`;
const section = (title, header, sep, rows, cols) =>
  [`### ${title}`, "", header, sep, ...(rows.length ? rows : [empty(cols)]), ""].join("\n");

const redoTable = [
  section(
    "Active",
    "| Problemă | Categorie | Ratată | Scadent +7 | Scadent +21 | Rezultat +7 | Rezultat +21 |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    active.map((r) =>
      `| ${cell(r.problem)} | ${cell(r.category)} | ${r.missed_on} | ${r.due7} | ${r.due21} | ` +
      `${cell(r.result7)} | ${cell(r.result21)} |`,
    ),
    7,
  ),
  section(
    "Goluri de fundament",
    "| Gol | De unde a venit | Data | Resetări | Închis |",
    "| --- | --- | --- | ---: | --- |",
    gaps.map((r) =>
      `| ${cell(r.problem)} | ${cell(r.category)} | ${r.missed_on} | ${r.resets} | ${cell(r.closed_on)} |`,
    ),
    5,
  ),
  section(
    "Închise",
    "| Problemă | Categorie | Ratată prima dată | Închisă |",
    "| --- | --- | --- | --- |",
    closed.map((r) => `| ${cell(r.problem)} | ${cell(r.category)} | ${r.missed_on} | ${cell(r.closed_on)} |`),
    4,
  ),
].join("\n");

const ok = [replaceRegion("log.md", logTable), replaceRegion("redo.md", redoTable)].every(Boolean);
console.log(
  `\n${logRows.length} log rows · ${active.length} active redo · ${gaps.length} gaps · ${closed.length} closed`,
);
db.close();
process.exit(ok ? 0 : 1);
