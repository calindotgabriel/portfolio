/**
 * DOM wiring: sizes, run state, the ledger readout, results.
 *
 * Nothing above the fold depends on this file. If it never loads, the page is
 * still a readable article and the demo section says so.
 */
import {
  ACCOUNTS,
  OPENING_TOTAL,
  makeTransfers,
  runNaive,
  runLocked,
  runSerializable,
  runDeadlock,
  runWriteSkew,
} from "./scenarios.js";

const SIZES = [50, 200, 1000];
const DEFAULT_SIZE = 200;
const DEADLOCK_SIZE = 40; // a deadlock costs a detection pass; 40 is plenty

const $ = (id) => document.getElementById(id);

const el = {
  sizes: $("tx-sizes"),
  runNaive: $("tx-run-naive"),
  runLocked: $("tx-run-locked"),
  runSerial: $("tx-run-serial"),
  runDeadlock: $("tx-run-deadlock"),
  runOrdered: $("tx-run-ordered"),
  runSkew: $("tx-run-skew"),
  runSkewFixed: $("tx-run-skew-fixed"),
  reset: $("tx-reset"),
  status: $("tx-status"),
  results: $("tx-results"),
  verdict: $("tx-verdict"),
  ledger: $("tx-ledger"),
  skewOut: $("tx-skew-out"),
};

const nf = new Intl.NumberFormat("en-US");
let size = DEFAULT_SIZE;
let busy = false;

/* ---------------------------------------------------------------- ledger */

/** The three accounts and the running total, drawn from a snapshot. */
function drawLedger(rows, total) {
  el.ledger.innerHTML = "";
  const frag = document.createDocumentFragment();
  for (const row of rows) {
    const cell = document.createElement("div");
    cell.className = "tx-acct";
    const name = document.createElement("span");
    name.className = "tx-acct-name";
    name.textContent = row.owner;
    const value = document.createElement("span");
    value.className = "tx-acct-balance";
    value.textContent = nf.format(row.balance);
    cell.append(name, value);
    frag.appendChild(cell);
  }
  const sum = document.createElement("div");
  sum.className = "tx-acct is-total";
  const sumName = document.createElement("span");
  sumName.className = "tx-acct-name";
  sumName.textContent = "total";
  const sumValue = document.createElement("span");
  sumValue.className = "tx-acct-balance";
  sumValue.textContent = nf.format(total);
  if (total !== OPENING_TOTAL) sumValue.classList.add("is-bad");
  sum.append(sumName, sumValue);
  frag.appendChild(sum);
  el.ledger.appendChild(frag);
}

function resetLedger() {
  drawLedger(
    ACCOUNTS.map((a) => ({ ...a })),
    OPENING_TOTAL,
  );
}

/* --------------------------------------------------------------- results */

function figure(value, key, { bad = false, small = false } = {}) {
  const wrap = document.createElement("div");
  wrap.className = "tx-figure-row";
  const v = document.createElement("span");
  v.className = "tx-figure";
  if (bad) v.classList.add("is-bad");
  if (small) v.classList.add("is-small");
  v.textContent = value;
  const k = document.createElement("span");
  k.className = "tx-figure-key";
  k.textContent = key;
  wrap.append(v, k);
  return wrap;
}

const COLUMNS = {
  naive: {
    name: "No transaction",
    figures: (r) => [
      figure(nf.format(r.totalAfter), `Total after — opened at ${nf.format(r.totalBefore)}`, {
        bad: !r.conserved,
      }),
      figure(`${nf.format(r.committed)} / ${nf.format(r.transfers)}`, "Transfers that reported success", { small: true }),
      figure(nf.format(0), "Errors raised", { small: true }),
      figure(nf.format(r.staleWrites), "Writes computed from a value that had already changed", {
        small: true,
        bad: r.staleWrites > 0,
      }),
    ],
  },
  locked: {
    name: "Row locks",
    figures: (r) => [
      figure(nf.format(r.totalAfter), `Total after — opened at ${nf.format(r.totalBefore)}`, {
        bad: !r.conserved,
      }),
      figure(`${nf.format(r.committed)} / ${nf.format(r.transfers)}`, "Transfers that reported success", { small: true }),
      figure(nf.format(r.lockWaits), "Times a transfer waited for a row somebody else held", { small: true }),
      figure(`${r.lockWaitMs.toFixed(1)} ms`, "Total time spent waiting", { small: true }),
    ],
  },
  serializable: {
    name: "Serializable + retry",
    figures: (r) => [
      figure(nf.format(r.totalAfter), `Total after — opened at ${nf.format(r.totalBefore)}`, {
        bad: !r.conserved,
      }),
      figure(`${nf.format(r.committed)} / ${nf.format(r.transfers)}`, "Transfers that eventually committed", { small: true }),
      figure(nf.format(r.serializationFailures), "Transactions the database threw out (40001)", { small: true }),
      figure(nf.format(r.gaveUp), "Transfers abandoned after 5 attempts", {
        small: true,
        bad: r.gaveUp > 0,
      }),
    ],
  },
  deadlock: {
    name: "Locks in the order named",
    figures: (r) => [
      figure(nf.format(r.deadlocks), "Deadlocks detected (40P01)", { bad: r.deadlocks > 0 }),
      figure(`${nf.format(r.committed)} / ${nf.format(r.transfers)}`, "Transfers that committed", { small: true }),
      figure(`${Math.round(r.wallMs)} ms`, "Wall clock", { small: true }),
    ],
  },
  ordered: {
    name: "Locks in ascending id",
    figures: (r) => [
      figure(nf.format(r.deadlocks), "Deadlocks detected (40P01)", { bad: r.deadlocks > 0 }),
      figure(`${nf.format(r.committed)} / ${nf.format(r.transfers)}`, "Transfers that committed", { small: true }),
      figure(`${Math.round(r.wallMs)} ms`, "Wall clock", { small: true }),
    ],
  },
};

function render(key, result) {
  const spec = COLUMNS[key];
  const existing = el.results.querySelector(`[data-col="${key}"]`);
  if (existing) existing.remove();

  const col = document.createElement("div");
  col.className = "tx-col";
  col.dataset.col = key;
  if (result.conserved && key !== "deadlock") col.classList.add("is-good");
  if (!result.conserved) col.classList.add("is-bad");

  const name = document.createElement("p");
  name.className = "tx-col-name";
  name.textContent = spec.name;
  col.appendChild(name);
  for (const f of spec.figures(result)) col.appendChild(f);
  el.results.appendChild(col);
}

/* ------------------------------------------------------------------- run */

function setBusy(on, label) {
  busy = on;
  // Every control on the page, not only the ones inside #tx-demo: the write-skew
  // buttons sit in their own section further down, and they share the run lock.
  for (const b of document.querySelectorAll(".tx-btn")) b.disabled = on;
  if (label) el.status.textContent = label;
}

function verdict(result) {
  if (!result.conserved) {
    const direction = result.drift > 0 ? "more" : "less";
    el.verdict.className = "tx-verdict is-bad";
    el.verdict.textContent =
      `Every one of the ${nf.format(result.committed)} transfers reported success and not one raised an error. ` +
      `There is now ${nf.format(Math.abs(result.drift))} ${direction} in the three accounts than the bank started with. ` +
      `${nf.format(result.staleWrites)} of the writes were computed from a balance that had already changed by the time they landed.`;
    return;
  }
  el.verdict.className = "tx-verdict";
  if (result.mode === "serializable") {
    el.verdict.textContent =
      `The total is intact. Getting there cost ${nf.format(result.serializationFailures)} rejected transactions` +
      (result.gaveUp > 0
        ? `, and ${nf.format(result.gaveUp)} transfers never happened at all — they ran out of attempts.`
        : `, every one of which was retried until it went through.`);
    return;
  }
  // lockWaits counts lock acquisitions that had to queue, not transfers: each
  // transfer takes two rows, so it can wait more than once.
  el.verdict.textContent =
    `The total is intact: ${nf.format(result.totalAfter)}, the same as it opened. ` +
    `Getting there meant queueing for a row somebody else was holding ` +
    `${nf.format(result.lockWaits)} times, ${result.lockWaitMs.toFixed(1)} ms of waiting in total.`;
}

async function run(key, fn, label) {
  if (busy) return;
  setBusy(true, label);
  // Let the status line paint before the run takes the thread.
  await new Promise((r) => requestAnimationFrame(() => r()));
  try {
    const result = await fn();
    drawLedger(result.rows, result.totalAfter);
    render(key, result);
    verdict(result);
    el.status.textContent = `Done — ${nf.format(result.transfers)} transfers in ${Math.round(result.wallMs)} ms.`;
  } catch (error) {
    el.status.textContent = `The run failed: ${error.message}`;
  } finally {
    setBusy(false);
  }
}

/* -------------------------------------------------------------- controls */

function buildSizes() {
  const frag = document.createDocumentFragment();
  for (const n of SIZES) {
    const label = document.createElement("label");
    label.className = "tx-size-option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "tx-size";
    input.value = String(n);
    input.checked = n === DEFAULT_SIZE;
    input.addEventListener("change", () => {
      size = n;
    });
    const text = document.createElement("span");
    text.className = "tx-size-rows";
    text.textContent = `${nf.format(n)} transfers`;
    label.append(input, text);
    frag.appendChild(label);
  }
  el.sizes.appendChild(frag);
}

function wire() {
  buildSizes();
  resetLedger();

  el.runNaive.addEventListener("click", () =>
    run("naive", () => runNaive(makeTransfers(size)), "Running without transactions…"),
  );
  el.runLocked.addEventListener("click", () =>
    run("locked", () => runLocked(makeTransfers(size)), "Running with row locks…"),
  );
  el.runSerial.addEventListener("click", () =>
    run("serializable", () => runSerializable(makeTransfers(size)), "Running at serializable…"),
  );
  el.runDeadlock.addEventListener("click", () =>
    run(
      "deadlock",
      () => runDeadlock(makeTransfers(DEADLOCK_SIZE)),
      `Running ${DEADLOCK_SIZE} transfers, locks in the order each names them…`,
    ),
  );
  el.runOrdered.addEventListener("click", () =>
    run(
      "ordered",
      () => runLocked(makeTransfers(DEADLOCK_SIZE)),
      `Running the same ${DEADLOCK_SIZE} transfers, locks in ascending id…`,
    ),
  );

  const skew = async (serializable) => {
    if (busy) return;
    setBusy(true, "Two doctors deciding at once…");
    try {
      const r = await runWriteSkew({ serializable });
      el.skewOut.className = r.safe ? "tx-skew-out is-good" : "tx-skew-out is-bad";
      el.skewOut.textContent = r.safe
        ? `${r.remaining} doctor still on call. One transaction was thrown out with 40001 and, on retry, would read a single doctor on call and decline.`
        : `${r.remaining} doctors on call. Both transactions committed, neither overwrote the other, and no row in the table holds a value nobody meant to write.`;
    } finally {
      setBusy(false);
      el.status.textContent = "";
    }
  };
  el.runSkew.addEventListener("click", () => skew(false));
  el.runSkewFixed.addEventListener("click", () => skew(true));

  el.reset.addEventListener("click", () => {
    el.results.innerHTML = "";
    el.verdict.textContent = "";
    el.verdict.className = "tx-verdict";
    el.skewOut.textContent = "";
    el.skewOut.className = "tx-skew-out";
    el.status.textContent = "";
    resetLedger();
  });

  el.status.textContent = "";
}

wire();
