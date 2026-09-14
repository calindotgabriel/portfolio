/**
 * DOM wiring for the demo: calibration, size selection, run state, results.
 *
 * Nothing above the fold depends on this file. If it never loads, the page is
 * still a readable article — the demo section just says so.
 */
import { WorkerPool, supportsModuleWorkers } from "./pool.js";
import { runNaive, runCopy, runStream } from "./scenarios.js";
import { HEARTBEAT_MS } from "./probe.js";

const WORK = 60; // matches the Node benchmark's default
const CHUNK = 5000; // matches the Node benchmark's default
const SIZES = [25_000, 100_000, 200_000];
const COMFORTABLE_FREEZE_MS = 1200; // largest default we will pick for someone
const SCARY_FREEZE_MS = 5000; // above this, ask before freezing their browser

const $ = (id) => document.getElementById(id);

const el = {
  root: $("wp-demo"),
  sizes: $("wp-sizes"),
  runNaive: $("wp-run-naive"),
  runStream: $("wp-run-stream"),
  runCopy: $("wp-run-copy"),
  confirm: $("wp-confirm"),
  reset: $("wp-reset"),
  yield: $("wp-yield"),
  status: $("wp-status"),
  results: $("wp-results"),
  ticker: $("wp-ticker"),
  hand: $("wp-hand"),
  counter: $("wp-counter"),
  ratio: $("wp-ratio"),
  pool: $("wp-pool-info"),
  verdict: $("wp-verdict"),
  unsupported: $("wp-unsupported"),
};

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let reducedMotion = motionQuery.matches;
motionQuery.addEventListener("change", (event) => {
  reducedMotion = event.matches;
});

/* ---------------------------------------------------------------- ticker */

const TICK_CELLS = window.matchMedia("(max-width: 720px)").matches ? 80 : 160;
const cells = [];
let cursor = 0;

function buildTicker() {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < TICK_CELLS; i += 1) {
    const cell = document.createElement("span");
    cell.className = "wp-tick";
    cells.push(cell);
    frag.appendChild(cell);
  }
  el.ticker.appendChild(frag);
}

function resetTicker() {
  for (const cell of cells) cell.className = "wp-tick";
  cursor = 0;
  el.ratio.textContent = "";
}

/** One class write per 10ms tick. The row is never re-rendered. */
function onTick(onTime) {
  cells[cursor % TICK_CELLS].className = onTime ? "wp-tick is-ok" : "wp-tick is-late";
  cells[(cursor + 1) % TICK_CELLS].className = "wp-tick is-head";
  cursor += 1;
}

/* ----------------------------------------------------------- calibration */

let msPerRow = 0;

async function calibrate() {
  const { makeRows, transformChunk } = await import("./task.js");
  const sample = makeRows(2000);
  transformChunk(sample, WORK); // warm the JIT, discard
  const started = performance.now();
  transformChunk(sample, WORK);
  msPerRow = (performance.now() - started) / 2000;
}

const estimateMs = (rows) => rows * msPerRow;

function formatDuration(ms) {
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(ms < 10_000 ? 1 : 0)} s`;
}

function renderSizes() {
  el.sizes.innerHTML = "";
  // Pick the largest size that still estimates under a comfortable freeze, so
  // a laptop gets the 200k run that matches the published Node numbers and a
  // phone does not get an eight-second lockup it never asked for.
  let chosen = SIZES[0];
  for (const size of SIZES) {
    if (estimateMs(size) <= COMFORTABLE_FREEZE_MS) chosen = size;
  }

  for (const size of SIZES) {
    const id = `wp-size-${size}`;
    const label = document.createElement("label");
    label.className = "wp-size-option";
    label.innerHTML = `
      <input type="radio" name="wp-size" id="${id}" value="${size}" ${size === chosen ? "checked" : ""}>
      <span class="wp-size-rows">${size.toLocaleString("en-US")} rows</span>
      <span class="wp-size-est">est. ${formatDuration(estimateMs(size))} frozen</span>
    `;
    el.sizes.appendChild(label);
  }
  el.sizes.addEventListener("change", () => {
    pendingConfirm = null;
    el.confirm.hidden = true;
    syncNaiveLabel();
  });
  syncNaiveLabel();
}

const selectedRows = () => Number(el.sizes.querySelector("input:checked")?.value ?? SIZES[0]);

function syncNaiveLabel() {
  const est = estimateMs(selectedRows());
  el.runNaive.textContent =
    est >= SCARY_FREEZE_MS
      ? `Run the naive version (≈${formatDuration(est)} freeze)`
      : "Run the naive version";
}

/* ----------------------------------------------------------------- pool */

let pool = null;
const poolSize = Math.max(2, Math.min((navigator.hardwareConcurrency || 4) - 1, 8));

function workerUrl() {
  // public/ is copied verbatim and never touched by Vite, so the usual
  // new URL("./worker.js", import.meta.url) idiom would resolve against the
  // bundled script in /assets/. BASE_URL is inlined at build time and is
  // always root-relative, so resolve it against the origin.
  const base = document.currentScript?.dataset.base ?? el.root.dataset.base;
  return new URL(`${base}worker.js`, location.origin).href;
}

function ensurePool() {
  // Built once and reused: rebuilding per run re-pays worker startup and makes
  // a second run noisier than the first.
  if (!pool) pool = new WorkerPool(workerUrl(), poolSize);
  return pool;
}

window.addEventListener("pagehide", () => {
  pool?.destroy();
  pool = null;
});

/* -------------------------------------------------------------- results */

const runs = new Map();

const pct = (n) => `${(n * 100).toFixed(1)}%`;

function render() {
  const entries = [...runs.entries()];
  if (entries.length === 0) {
    el.results.innerHTML = "";
    el.verdict.textContent = "";
    return;
  }

  const valid = entries.filter(([, r]) => !r.responsiveness.visibilityDirty);
  const fingerprints = new Set(valid.map(([, r]) => r.fingerprint));
  const mismatch = fingerprints.size > 1;
  const best = valid.length
    ? valid.reduce((a, b) => (a[1].wallMs <= b[1].wallMs ? a : b))[0]
    : null;

  el.results.innerHTML = entries
    .map(([name, r]) => {
      if (r.responsiveness.visibilityDirty) {
        return `<div class="wp-col is-void">
          <p class="wp-col-name">${name}</p>
          <p class="wp-void">Result discarded</p>
          <p class="wp-note">The tab was backgrounded during this run. Browsers throttle
            timers to one second when a tab is hidden, so the responsiveness numbers would
            be fiction. Run it again with this tab in front.</p>
        </div>`;
      }
      const heap =
        r.heapDeltaBytes !== null
          ? `<div class="wp-figure-row">
               <span class="wp-figure is-small">${(r.heapDeltaBytes / 1048576).toFixed(1)} MB</span>
               <span class="wp-figure-key">Main-thread heap growth<br><span class="wp-note">Chrome only · quantised · workers not counted</span></span>
             </div>`
          : "";
      return `<div class="wp-col${name === best && !mismatch ? " is-winner" : ""}">
        <p class="wp-col-name">${name}</p>
        <div class="wp-figure-row">
          <span class="wp-figure">${formatDuration(r.wallMs)}</span>
          <span class="wp-figure-key">Wall clock</span>
        </div>
        <div class="wp-figure-row">
          <span class="wp-figure${r.responsiveness.worstFreezeMs > 100 ? " is-bad" : ""}">${formatDuration(r.responsiveness.worstFreezeMs)}</span>
          <span class="wp-figure-key">Longest UI freeze</span>
        </div>
        <div class="wp-figure-row">
          <span class="wp-figure${r.responsiveness.onTimeRatio < 0.5 ? " is-bad" : ""}">${pct(r.responsiveness.onTimeRatio)}</span>
          <span class="wp-figure-key">Health checks answered on time<br>
            <span class="wp-note">${r.responsiveness.heartbeatsOnTime} of ${r.responsiveness.heartbeatsExpected} due</span></span>
        </div>
        <div class="wp-figure-row">
          <span class="wp-figure is-small">${r.peakRows.toLocaleString("en-US")}</span>
          <span class="wp-figure-key">Peak rows held<br><span class="wp-note">counted, not measured</span></span>
        </div>
        ${heap}
        <div class="wp-figure-row">
          <span class="wp-fp">${r.fingerprint}</span>
          <span class="wp-figure-key">Output fingerprint</span>
        </div>
      </div>`;
    })
    .join("");

  if (mismatch) {
    el.verdict.className = "wp-verdict is-bad";
    el.verdict.textContent =
      "FINGERPRINT MISMATCH — the scenarios did not produce the same output, so no speedup is reported. Something here is wrong, and a number would only hide it.";
    return;
  }
  if (valid.length < 2) {
    el.verdict.className = "wp-verdict";
    el.verdict.textContent = "";
    return;
  }
  const naive = runs.get("naive") ?? runs.get("naive + yield");
  const stream = runs.get("pool + streamed ranges");
  if (naive && stream && !naive.responsiveness.visibilityDirty && !stream.responsiveness.visibilityDirty) {
    el.verdict.className = "wp-verdict";
    el.verdict.textContent =
      `Same output, same fingerprint. ${(naive.wallMs / stream.wallMs).toFixed(1)}× faster, ` +
      `${(naive.peakRows / stream.peakRows).toFixed(1)}× fewer rows held, and the longest freeze went ` +
      `from ${formatDuration(naive.responsiveness.worstFreezeMs)} to ${formatDuration(stream.responsiveness.worstFreezeMs)}.`;
  }
}

/* ------------------------------------------------------------ run state */

/**
 * Resolves once the browser has painted the DOM writes queued so far.
 *
 * Two frames guarantees the paint happened; the setTimeout then moves the
 * blocking work into a fresh task, so the frame we measure is not the frame we
 * are already inside.
 *
 * The timeout is not belt-and-braces. A tab that is not being painted —
 * backgrounded, or in a hidden panel — suspends requestAnimationFrame
 * entirely, and without the race this promise would never settle: the demo
 * would sit on "Running…" with every button disabled until a reload. Waiting
 * for a paint that is never going to come is not worth hanging over.
 */
const afterPaint = () =>
  new Promise((resolve) => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(done, 0)));
    setTimeout(done, 250);
  });

const runButtons = () => [el.runNaive, el.runStream, el.runCopy].filter(Boolean);

let running = false;
let pendingConfirm = null;

async function run(name, fn, active) {
  if (running) return;
  running = true;
  for (const button of runButtons()) button.disabled = true;
  active.setAttribute("aria-busy", "true");
  el.confirm.hidden = true;

  const rows = selectedRows();
  resetTicker();
  el.status.textContent = `Running ${name} over ${rows.toLocaleString("en-US")} rows…`;

  await afterPaint();

  let result;
  try {
    result = await fn({
      rows,
      work: WORK,
      chunk: CHUNK,
      yieldBetweenChunks: el.yield?.checked ?? false,
    });
  } catch (error) {
    el.status.textContent = `That run failed: ${error.message}`;
    running = false;
    for (const button of runButtons()) button.disabled = false;
    active.removeAttribute("aria-busy");
    return;
  }

  runs.set(name, result);
  render();

  const r = result.responsiveness;
  el.ratio.textContent = r.visibilityDirty
    ? "Tab was hidden — result discarded."
    : `${r.heartbeatsOnTime} of ${r.heartbeatsExpected} health checks answered on time.`;
  el.status.textContent = r.visibilityDirty
    ? `${name} finished, but the tab was backgrounded so the result was discarded.`
    : `${name} finished in ${formatDuration(result.wallMs)}. Longest freeze ${formatDuration(r.worstFreezeMs)}. ` +
      `${r.heartbeatsOnTime} of ${r.heartbeatsExpected} health checks answered on time.`;

  running = false;
  for (const button of runButtons()) button.disabled = false;
  active.removeAttribute("aria-busy");
  syncNaiveLabel();
}

const ui = () => ({
  canaryEl: el.hand,
  counterEl: el.counter,
  reducedMotion,
  onTick,
});

function startNaive() {
  const name = el.yield?.checked ? "naive + yield" : "naive";
  return run(name, (opts) => runNaive(opts, ui()), el.runNaive);
}

el.runNaive.addEventListener("click", () => {
  const est = estimateMs(selectedRows());
  // No window.confirm() — it is a modal on the very thread this page is about.
  if (est >= SCARY_FREEZE_MS && pendingConfirm !== selectedRows()) {
    pendingConfirm = selectedRows();
    el.confirm.hidden = false;
    el.confirm.textContent = `Yes — freeze this page for about ${formatDuration(est)}`;
    el.confirm.focus();
    return;
  }
  startNaive();
});

el.confirm.addEventListener("click", () => {
  pendingConfirm = selectedRows();
  startNaive();
});

el.runStream.addEventListener("click", () =>
  run("pool + streamed ranges", (opts) => runStream(opts, ui(), ensurePool()), el.runStream),
);

el.runCopy?.addEventListener("click", () =>
  run("pool + rows copied", (opts) => runCopy(opts, ui(), ensurePool()), el.runCopy),
);

el.reset.addEventListener("click", () => {
  runs.clear();
  render();
  resetTicker();
  el.status.textContent = "Cleared.";
});

/* ------------------------------------------------------------------ init */

buildTicker();
await calibrate();
renderSizes();

el.pool.textContent =
  `Pool: ${poolSize} workers · ${navigator.hardwareConcurrency ?? "an unreported number of"} logical cores · ` +
  `chunk ${CHUNK.toLocaleString("en-US")} rows · work ${WORK} · heartbeat every ${HEARTBEAT_MS} ms`;

if (!supportsModuleWorkers()) {
  // On-topic failure: say what is missing rather than silently degrading.
  for (const button of [el.runStream, el.runCopy]) if (button) button.disabled = true;
  el.unsupported.hidden = false;
} else {
  // Spawn and warm the pool now, before anything is measured. Otherwise worker
  // startup lands inside the measured window and makes the pooled scenarios
  // look better than they are — unfair in the direction of my own argument,
  // which is the worst direction to be unfair in.
  ensurePool()
    .warmAll()
    .catch(() => {});
}

el.root.dataset.ready = "true";
el.status.textContent = "Ready.";
