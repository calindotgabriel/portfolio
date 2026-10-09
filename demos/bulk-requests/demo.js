/**
 * The demo on /lab/bulk-requests. Each button runs one scenario in sim.js and
 * draws a chart of every request over time, coloured by what came back.
 */
import { runScenario, CLIENT, PROVIDER } from "./sim.js";

const $ = (id) => document.getElementById(id);
const SVG = "http://www.w3.org/2000/svg";

const VALID = CLIENT.customers - Math.floor(CLIENT.customers / 97);
const BUCKET_MS = 250;
const AXIS_MS = 14000;

// Order of the stacked bars, bottom up.
const OUTCOMES = [
  ["200", "charged"],
  ["400", "declined"],
  ["500", "500 error"],
  ["503", "503 too many in flight"],
  ["429", "429 rate limited"],
  ["timeout", "client gave up"],
  ["409", "409 still in progress"],
];

const SCENARIOS = {
  "br-all": {
    options: {},
    note: (r) =>
      `All 1,000 left at the same moment. The provider let ${PROVIDER.ratePerSec} through its rate limit, ` +
      `and ${r.stats.overloaded} of those found 10 requests already in flight. ${charged(r)} customers were charged.`,
  },
  "br-paced": {
    options: { pace: true, key: true },
    note: (r) =>
      `One request every 11 ms, so no 429s. But about 1 in 20 got a 500, and nothing tried again: ` +
      `${VALID - charged(r)} customers were never charged.`,
  },
  "br-retry": {
    options: { pace: true, retry: true, key: true },
    note: () =>
      `A 500 is tried again after 100 ms, then 200, 400... Every valid customer is charged. ` +
      `The declined cards are not retried: that answer won't change.`,
  },
  "br-nokey": {
    options: { pace: true, retry: true, timeout: true },
    note: (r) =>
      `Slow answers are now cut off after 1 s. The provider doesn't know and charges anyway. ` +
      `The retry carries no key, so it's a new charge: ${r.stats.duplicates} customers paid twice.`,
  },
  "br-key": {
    options: { pace: true, retry: true, timeout: true, key: true },
    note: (r) =>
      `The same run, with the same key on every retry. The provider recognises a retry and returns the ` +
      `first result instead of charging again: ${r.stats.duplicates} double charges.`,
  },
};

const charged = (r) => r.results.filter((x) => x.ok).length;

function chart(attempts) {
  const width = 640;
  const height = 180;
  const pad = { left: 36, right: 8, top: 10, bottom: 24 };
  const buckets = Math.ceil(AXIS_MS / BUCKET_MS);
  const counts = Array.from({ length: buckets }, () => ({}));
  for (const a of attempts) {
    const b = Math.min(buckets - 1, Math.floor(a.t / BUCKET_MS));
    counts[b][a.outcome] = (counts[b][a.outcome] || 0) + 1;
  }
  const max = Math.max(1, ...counts.map((c) => Object.values(c).reduce((s, n) => s + n, 0)));
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const barW = plotW / buckets;

  const svg = document.createElementNS(SVG, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("class", "br-chart");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Requests started per quarter second, coloured by outcome");

  const line = (x1, y1, x2, y2, cls) => {
    const l = document.createElementNS(SVG, "line");
    Object.entries({ x1, y1, x2, y2 }).forEach(([k, v]) => l.setAttribute(k, v));
    l.setAttribute("class", cls);
    svg.append(l);
  };
  const text = (x, y, value, anchor = "start") => {
    const t = document.createElementNS(SVG, "text");
    t.setAttribute("x", x);
    t.setAttribute("y", y);
    t.setAttribute("text-anchor", anchor);
    t.setAttribute("class", "br-axis-label");
    t.textContent = value;
    svg.append(t);
  };

  line(pad.left, pad.top + plotH, width - pad.right, pad.top + plotH, "br-axis");
  text(pad.left - 6, pad.top + 9, String(max), "end");
  text(pad.left - 6, pad.top + plotH, "0", "end");
  for (let s = 0; s <= AXIS_MS / 1000; s += 2) {
    text(pad.left + (s * 1000 / AXIS_MS) * plotW, height - 6, `${s}s`, "middle");
  }

  counts.forEach((c, i) => {
    let y = pad.top + plotH;
    for (const [outcome] of OUTCOMES) {
      const n = c[outcome];
      if (!n) continue;
      const h = (n / max) * plotH;
      y -= h;
      const r = document.createElementNS(SVG, "rect");
      r.setAttribute("x", pad.left + i * barW + 0.5);
      r.setAttribute("y", y);
      r.setAttribute("width", Math.max(1, barW - 1));
      r.setAttribute("height", Math.max(0.5, h));
      r.setAttribute("class", `br-bar is-${outcome}`);
      const title = document.createElementNS(SVG, "title");
      title.textContent = `${(i * BUCKET_MS / 1000).toFixed(2)}s: ${n} × ${OUTCOMES.find(([o]) => o === outcome)[1]}`;
      r.append(title);
      svg.append(r);
    }
  });
  return svg;
}

function legend(attempts) {
  const present = new Set(attempts.map((a) => a.outcome));
  const box = document.createElement("div");
  box.className = "br-legend";
  for (const [outcome, label] of OUTCOMES) {
    if (!present.has(outcome)) continue;
    const item = document.createElement("span");
    item.className = "br-legend-item";
    const swatch = document.createElement("span");
    swatch.className = `br-swatch is-${outcome}`;
    item.append(swatch, label);
    box.append(item);
  }
  return box;
}

function stats(r) {
  const box = $("br-stats");
  box.innerHTML = "";
  const facts = [
    [`${charged(r)} of ${VALID}`, "valid customers charged"],
    [`${r.stats.requests}`, "requests sent"],
    [`${r.stats.rateLimited}`, "rate limited (429)"],
    [`${r.stats.duplicates}`, r.stats.duplicates === 1 ? "customer charged twice" : "customers charged twice"],
    [`${r.stats.maxInflight}`, "most in flight at once"],
    [`${(r.elapsedMs / 1000).toFixed(1)} s`, "simulated time"],
  ];
  for (const [value, label] of facts) {
    const cell = document.createElement("div");
    cell.className = "jq-stat";
    if (label.includes("twice") && r.stats.duplicates > 0) cell.classList.add("is-bad");
    const v = document.createElement("span");
    v.className = "jq-stat-value";
    v.textContent = value;
    const l = document.createElement("span");
    l.className = "jq-stat-label";
    l.textContent = label;
    cell.append(v, l);
    box.append(cell);
  }
}

async function run(id) {
  const buttons = document.querySelectorAll("[data-panel='br']");
  buttons.forEach((b) => { b.disabled = true; b.classList.toggle("is-active", b.id === id); });
  $("br-note").textContent = "";
  try {
    const result = await runScenario(SCENARIOS[id].options);
    const plot = $("br-plot");
    plot.innerHTML = "";
    plot.append(chart(result.attempts), legend(result.attempts));
    stats(result);
    $("br-note").textContent = SCENARIOS[id].note(result);
  } catch (error) {
    $("br-note").textContent = `Something broke: ${error.message}`;
  } finally {
    buttons.forEach((b) => { b.disabled = false; });
  }
}

for (const id of Object.keys(SCENARIOS)) $(id).addEventListener("click", () => run(id));
