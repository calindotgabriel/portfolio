/**
 * Local-only tracker for the 8-week training plan.
 * Binds to 127.0.0.1. No auth — never expose this.
 *
 *   npm run track   →  http://localhost:4173
 */
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { openDb, ROOT, today, addDays } from "./track-db.mjs";

const PORT = Number(process.env.TRACK_PORT ?? 4173);
const HOST = "127.0.0.1";
const db = openDb();
const UI = join(ROOT, "scripts", "track-ui.html");

const json = (res, code, body) => {
  res.writeHead(code, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c) => {
      raw += c;
      if (raw.length > 1e6) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("invalid JSON body"));
      }
    });
    req.on("error", reject);
  });

const isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
const num = (v) => (v === "" || v === null || v === undefined ? null : Number(v));
const str = (v) => (v === "" || v === null || v === undefined ? null : String(v));

// ---------------------------------------------------------------- queries

function getDay(date) {
  const plan = db.prepare("SELECT * FROM curriculum WHERE date = ?").get(date) ?? null;
  const log = db.prepare("SELECT * FROM log WHERE date = ?").get(date) ?? null;
  return { date, plan, log };
}

function saveLog(date, b) {
  const day = db.prepare("SELECT day FROM curriculum WHERE date = ?").get(date)?.day ?? null;
  db.prepare(
    `INSERT INTO log (date, day, lc_solved, lc_attempted, depth, design, mock,
                      applications, postmortems, note, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(date) DO UPDATE SET
       day = excluded.day, lc_solved = excluded.lc_solved,
       lc_attempted = excluded.lc_attempted, depth = excluded.depth,
       design = excluded.design, mock = excluded.mock,
       applications = excluded.applications, postmortems = excluded.postmortems,
       note = excluded.note, updated_at = excluded.updated_at`,
  ).run(
    date,
    day,
    num(b.lc_solved),
    num(b.lc_attempted),
    str(b.depth),
    str(b.design),
    str(b.mock),
    num(b.applications),
    num(b.postmortems),
    str(b.note),
    new Date().toISOString(),
  );
  return db.prepare("SELECT * FROM log WHERE date = ?").get(date);
}

function listRedo() {
  const t = today();
  const active = db
    .prepare("SELECT * FROM redo WHERE status = 'active' ORDER BY due7, due21")
    .all();
  return {
    today: t,
    // What is actually due: the +7 slot if unanswered, else the +21 slot.
    due: active.filter((r) => (r.result7 === null ? r.due7 <= t : r.due21 <= t)),
    active,
    gaps: db.prepare("SELECT * FROM redo WHERE status = 'gap' ORDER BY id DESC").all(),
    closed: db
      .prepare("SELECT * FROM redo WHERE status = 'closed' ORDER BY closed_on DESC LIMIT 50")
      .all(),
  };
}

function addRedo({ problem, category }) {
  const t = today();
  const info = db
    .prepare("INSERT INTO redo (problem, category, missed_on, due7, due21) VALUES (?, ?, ?, ?, ?)")
    .run(String(problem).trim(), str(category), t, addDays(t, 7), addDays(t, 21));
  return db.prepare("SELECT * FROM redo WHERE id = ?").get(info.lastInsertRowid);
}

/**
 * Applies the rules written in training/redo.md:
 *   +7 solved   → keep the +21 slot
 *   +21 solved  → close
 *   failed      → reset both dates from today, bump resets; 3rd reset becomes a fundamentals gap
 */
function recordResult(id, slot, result) {
  const row = db.prepare("SELECT * FROM redo WHERE id = ?").get(id);
  if (!row) return null;
  const t = today();

  if (result === "failed") {
    const resets = row.resets + 1;
    db.prepare(
      `UPDATE redo SET missed_on = ?, due7 = ?, due21 = ?, result7 = NULL, result21 = NULL,
                       resets = ?, status = ? WHERE id = ?`,
    ).run(t, addDays(t, 7), addDays(t, 21), resets, resets >= 3 ? "gap" : "active", id);
  } else if (slot === "7") {
    db.prepare("UPDATE redo SET result7 = 'solved' WHERE id = ?").run(id);
  } else {
    db.prepare("UPDATE redo SET result21 = 'solved', status = 'closed', closed_on = ? WHERE id = ?")
      .run(t, id);
  }

  return db.prepare("SELECT * FROM redo WHERE id = ?").get(id);
}

// ---------------------------------------------------------------- routing

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  const path = url.pathname;

  try {
    if (req.method === "GET" && (path === "/" || path === "/index.html")) {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      return res.end(readFileSync(UI));
    }

    if (req.method === "GET" && path === "/api/today") {
      const date = isDate(url.searchParams.get("date")) ? url.searchParams.get("date") : today();
      const week = db.prepare("SELECT week FROM curriculum WHERE date = ?").get(date)?.week ?? null;
      return json(res, 200, {
        ...getDay(date),
        week,
        span: db.prepare("SELECT MIN(date) a, MAX(date) b FROM curriculum").get(),
        counts: db
          .prepare(
            `SELECT COALESCE(SUM(lc_solved),0) solved, COALESCE(SUM(lc_attempted),0) attempted,
                    COALESCE(SUM(applications),0) applications,
                    COALESCE(SUM(postmortems),0) postmortems,
                    COUNT(*) days
             FROM log`,
          )
          .get(),
      });
    }

    const logMatch = path.match(/^\/api\/log\/(\d{4}-\d{2}-\d{2})$/);
    if (req.method === "PUT" && logMatch) {
      return json(res, 200, saveLog(logMatch[1], await readBody(req)));
    }

    if (path === "/api/redo") {
      if (req.method === "GET") return json(res, 200, listRedo());
      if (req.method === "POST") {
        const b = await readBody(req);
        if (!b.problem?.trim()) return json(res, 400, { error: "problem is required" });
        return json(res, 201, addRedo(b));
      }
    }

    const resultMatch = path.match(/^\/api\/redo\/(\d+)\/result$/);
    if (req.method === "POST" && resultMatch) {
      const b = await readBody(req);
      if (!["7", "21"].includes(String(b.slot)) || !["solved", "failed"].includes(b.result)) {
        return json(res, 400, { error: "slot must be 7|21 and result solved|failed" });
      }
      const row = recordResult(Number(resultMatch[1]), String(b.slot), b.result);
      return row ? json(res, 200, row) : json(res, 404, { error: "not found" });
    }

    if (path === "/api/todo") {
      if (req.method === "GET") {
        return json(res, 200, {
          open: db.prepare("SELECT * FROM todo WHERE done = 0 ORDER BY due IS NULL, due, id").all(),
          done: db.prepare("SELECT * FROM todo WHERE done = 1 ORDER BY id DESC LIMIT 30").all(),
        });
      }
      if (req.method === "POST") {
        const b = await readBody(req);
        if (!b.text?.trim()) return json(res, 400, { error: "text is required" });
        const info = db
          .prepare("INSERT INTO todo (text, due, created_at) VALUES (?, ?, ?)")
          .run(b.text.trim(), isDate(b.due) ? b.due : null, today());
        return json(res, 201, db.prepare("SELECT * FROM todo WHERE id = ?").get(info.lastInsertRowid));
      }
    }

    const todoMatch = path.match(/^\/api\/todo\/(\d+)$/);
    if (todoMatch) {
      const id = Number(todoMatch[1]);
      if (req.method === "PATCH") {
        const b = await readBody(req);
        db.prepare("UPDATE todo SET done = ? WHERE id = ?").run(b.done ? 1 : 0, id);
        return json(res, 200, db.prepare("SELECT * FROM todo WHERE id = ?").get(id));
      }
      if (req.method === "DELETE") {
        db.prepare("DELETE FROM todo WHERE id = ?").run(id);
        return json(res, 204, null);
      }
    }

    return json(res, 404, { error: "not found" });
  } catch (err) {
    return json(res, 500, { error: err.message });
  }
});

server.listen(PORT, HOST, () => {
  const n = db.prepare("SELECT COUNT(*) AS n FROM curriculum").get().n;
  if (n === 0) console.log("Curriculum is empty — run `npm run track:seed` first.\n");
  console.log(`Tracker running at http://localhost:${PORT}  (${n} curriculum days loaded)`);
  console.log("Ctrl+C to stop. Export to markdown with `npm run track:export`.");
});

for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    db.close();
    server.close(() => process.exit(0));
  });
}
