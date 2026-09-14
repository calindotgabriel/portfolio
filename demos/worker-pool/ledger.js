/**
 * Resident-row accounting.
 *
 * There is no cross-browser way to measure how much memory a scenario is
 * holding. performance.memory is Chrome-only, quantised, and covers the main
 * thread's heap only — so it cannot see worker heaps, which systematically
 * flatters exactly the scenarios this page is arguing for.
 *
 * So this does not measure. It counts, explicitly, at every point where rows
 * are created and released, against one published rule:
 *
 *   resident rows = row-shaped objects reachable by any thread at an instant.
 *
 * It deliberately does NOT include the serialised copy that exists in flight
 * during a structured clone. That copy is real and unmeasurable, and the page
 * says so rather than pretending the number is complete.
 *
 * A number you can explain beats a number you can't.
 */
export function createLedger() {
  let live = 0;
  let peak = 0;

  const bump = (n) => {
    live += n;
    if (live > peak) peak = live;
  };

  return {
    alloc(n) {
      bump(n);
    },
    free(n) {
      bump(-n);
    },
    get live() {
      return live;
    },
    get peak() {
      return peak;
    },
  };
}

/** Chrome and Edge only; null everywhere else. */
export function heapNow() {
  const used = performance.memory?.usedJSHeapSize;
  return typeof used === "number" ? used : null;
}
