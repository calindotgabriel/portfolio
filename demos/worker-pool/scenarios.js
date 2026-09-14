/**
 * The three scenarios, framed as a database export.
 *
 *   naive   fetch every row into memory, then transform on the main thread
 *   copy    fetch every row, then postMessage chunks of them to a pool
 *   stream  never hold the set; send ranges, let each worker read its own slice
 *
 * All three produce an identical fingerprint. That equality is the point: the
 * fast ones are not doing less work, they are doing the same work somewhere
 * else.
 */
import { makeRows, transformChunk, createFingerprinter } from "./task.js";
import { startProbe, startCanary } from "./probe.js";
import { createLedger, heapNow } from "./ledger.js";

// #region yield
/**
 * Hand the browser one turn.
 *
 * MessageChannel rather than setTimeout(0), because setTimeout is clamped to
 * ~4ms. Over 40 chunks that clamp alone would add ~160ms to the wall clock and
 * get charged to the scenario, which would misattribute the cost of yielding.
 */
const channel = typeof MessageChannel !== "undefined" ? new MessageChannel() : null;
const tick = channel
  ? () =>
      new Promise((resolve) => {
        channel.port1.onmessage = () => resolve();
        channel.port2.postMessage(0);
      })
  : () => new Promise((resolve) => setTimeout(resolve, 0));
// #endregion

function chunkRanges(rows, chunk) {
  const ranges = [];
  for (let start = 0; start < rows; start += chunk) {
    ranges.push({ start, count: Math.min(chunk, rows - start) });
  }
  return ranges;
}

function instrument({ canaryEl, counterEl, reducedMotion, onTick }) {
  const canary = startCanary(canaryEl, counterEl, { reducedMotion });
  const probe = startProbe({ onTick });
  const heapBefore = heapNow();
  let heapPeak = heapBefore;
  const sampleHeap = () => {
    const now = heapNow();
    if (now !== null && (heapPeak === null || now > heapPeak)) heapPeak = now;
  };
  return {
    sampleHeap,
    stop() {
      sampleHeap();
      const responsiveness = probe.stop();
      const canaryResult = canary.stop();
      return {
        responsiveness,
        canary: canaryResult,
        heapDeltaBytes: heapBefore !== null && heapPeak !== null ? heapPeak - heapBefore : null,
      };
    },
  };
}

// #region naive
/**
 * The version almost everyone writes first.
 *
 *   const rows = await db.fetchAll();      // all of it, in memory
 *   return rows.map(transform);            // on this thread, without pausing
 *
 * There is no yield in it, because there is no yield in the real thing either.
 * Yielding is already the first fix someone applies, so a "naive" version that
 * yields would be a strawman in the wrong direction — it would make the
 * problem look milder than it is. The `yieldBetweenChunks` option exists to
 * show that intermediate step on request, not as the default.
 */
export async function runNaive({ rows, work, chunk, yieldBetweenChunks = false }, ui) {
  const ledger = createLedger();
  const gauges = instrument(ui);
  const started = performance.now();

  // Stand-in for `await db.fetchAll()`: the whole result set, materialised.
  const all = makeRows(rows);
  ledger.alloc(rows);

  const fp = createFingerprinter();
  const out = [];
  for (const range of chunkRanges(rows, chunk)) {
    const slice = all.slice(range.start, range.start + range.count);
    const done = transformChunk(slice, work);
    ledger.alloc(range.count); // outputs, held for the fingerprint
    out.push(done);
    if (yieldBetweenChunks) {
      gauges.sampleHeap();
      await tick();
    }
  }
  for (const part of out) fp.fold(part);

  const wallMs = performance.now() - started;
  return { wallMs, peakRows: ledger.peak, fingerprint: fp.value(), ...gauges.stop() };
}
// #endregion

// #region copy
/**
 * The middle case, and the interesting one.
 *
 * The rows still all get materialised on the main thread, and then each chunk
 * is structured-cloned into a worker. The transform moves off the thread, but
 * the serialisation does not — so wall clock improves while responsiveness can
 * get *worse* than doing it inline. This is the result the Node benchmark
 * found and the reason the page shows three scenarios instead of two.
 */
export async function runCopy({ rows, work, chunk }, ui, pool) {
  const ledger = createLedger();
  const gauges = instrument(ui);
  const started = performance.now();

  const all = makeRows(rows);
  ledger.alloc(rows);

  const ranges = chunkRanges(rows, chunk);
  const results = await Promise.all(
    ranges.map((range) => {
      const slice = all.slice(range.start, range.start + range.count);
      ledger.alloc(range.count); // the slice we are about to hand over
      return pool
        .run({ rows: slice, work }, () => gauges.sampleHeap())
        .then((result) => {
          ledger.free(range.count); // slice released
          ledger.alloc(range.count); // result arrives
          gauges.sampleHeap();
          return result;
        });
    }),
  );

  const fp = createFingerprinter();
  for (const part of results) {
    fp.fold(part);
    ledger.free(part.length);
  }

  const wallMs = performance.now() - started;
  return { wallMs, peakRows: ledger.peak, fingerprint: fp.value(), ...gauges.stop() };
}
// #endregion

// #region stream
/**
 * The version that actually fixes it.
 *
 * The main thread never holds the result set. It hands out ranges — two
 * numbers — and each worker builds and transforms its own slice. In a real
 * export that range is a cursor position, a file offset, or a LIMIT/OFFSET
 * query: the worker owns its own reads.
 *
 * Results are folded in dispatch order and released immediately, so peak
 * residency is bounded by the number of chunks in flight rather than by the
 * size of the export. Doubling the row count does not change it.
 */
export async function runStream({ rows, work, chunk }, ui, pool) {
  const ledger = createLedger();
  const gauges = instrument(ui);
  const started = performance.now();

  const ranges = chunkRanges(rows, chunk);
  const fp = createFingerprinter();
  // Fold in order even though results arrive out of order: the fold is a left
  // fold over rows in id order, and folding chunks out of order would silently
  // produce a different fingerprint.
  const pending = new Map();
  let nextToFold = 0;

  await Promise.all(
    ranges.map((range, index) =>
      pool
        .run({ range, work }, () => {
          ledger.alloc(range.count); // the worker is building its own slice
          gauges.sampleHeap();
        })
        .then((result) => {
          ledger.free(range.count); // worker's input slice is gone
          ledger.alloc(result.length); // its result is here
          pending.set(index, result);
          while (pending.has(nextToFold)) {
            const part = pending.get(nextToFold);
            pending.delete(nextToFold);
            fp.fold(part);
            ledger.free(part.length); // counted, released
            nextToFold += 1;
          }
          gauges.sampleHeap();
        }),
    ),
  );

  const wallMs = performance.now() - started;
  return { wallMs, peakRows: ledger.peak, fingerprint: fp.value(), ...gauges.stop() };
}
// #endregion
