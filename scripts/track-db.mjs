import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const DB_PATH = join(ROOT, "training", "tracker.db");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS curriculum (
  day INTEGER PRIMARY KEY,
  date TEXT UNIQUE NOT NULL,
  weekday TEXT NOT NULL,
  week INTEGER NOT NULL,
  live_coding TEXT,
  depth TEXT,
  design TEXT
);

CREATE TABLE IF NOT EXISTS log (
  date TEXT PRIMARY KEY,
  day INTEGER,
  lc_solved INTEGER,
  lc_attempted INTEGER,
  depth TEXT,
  design TEXT,
  mock TEXT,
  applications INTEGER,
  postmortems INTEGER,
  note TEXT,
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS redo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  problem TEXT NOT NULL,
  category TEXT,
  missed_on TEXT NOT NULL,
  due7 TEXT NOT NULL,
  due21 TEXT NOT NULL,
  result7 TEXT,
  result21 TEXT,
  resets INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  closed_on TEXT
);

CREATE TABLE IF NOT EXISTS todo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  due TEXT,
  done INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
`;

export function openDb() {
  mkdirSync(dirname(DB_PATH), { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL");
  db.exec("PRAGMA foreign_keys = ON");
  db.exec(SCHEMA);
  return db;
}

/** Local calendar date as YYYY-MM-DD. Never use toISOString here — it shifts to UTC. */
export function today() {
  return toISO(new Date());
}

export function toISO(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function addDays(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  return toISO(new Date(y, m - 1, d + n));
}

/** 2026-08-10 -> 10.08, for the markdown tables. */
export function toShort(iso) {
  const [, m, d] = iso.split("-");
  return `${d}.${m}`;
}
