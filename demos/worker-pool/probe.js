/**
 * Responsiveness measurement, browser edition.
 *
 * Node has monitorEventLoopDelay(). Browsers do not, so this reconstructs the
 * same signal with the same constants as src/lag.ts in the Node benchmark: a
 * heartbeat every 10ms, and a 25ms budget for it to be considered on time.
 *
 * The heartbeat stands in for a health check. The question it answers is not
 * "how fast was the export" but "could this process still have answered anyone
 * while it ran" — the two questions have different answers, which is the whole
 * reason the page exists.
 */

export const HEARTBEAT_MS = 10;
export const ON_TIME_BUDGET_MS = 25;

/** A frame gap above this is a stall a person can actually feel. */
const FRAME_BUDGET_MS = 50;

export function startProbe({ onTick } = {}) {
  const startedAt = performance.now();
  let last = startedAt;
  let ticks = 0;
  let onTimeCount = 0;
  let worstGapMs = 0;

  // A backgrounded tab has its timers throttled to >= 1s, which would produce
  // a spectacular and completely fake 0% on-time result. Track it and refuse
  // to report rather than publishing a number that flatters the argument.
  let visibilityDirty = document.visibilityState !== "visible";
  const onVisibility = () => {
    if (document.visibilityState !== "visible") visibilityDirty = true;
  };
  document.addEventListener("visibilitychange", onVisibility);

  const timer = setInterval(() => {
    const now = performance.now();
    const gap = now - last;
    last = now;
    ticks += 1;
    if (gap > worstGapMs) worstGapMs = gap;
    const onTime = gap <= ON_TIME_BUDGET_MS;
    if (onTime) onTimeCount += 1;
    onTick?.(onTime, gap);
  }, HEARTBEAT_MS);

  // An independent cross-check, where the browser offers one. Chrome and Edge
  // attribute long tasks themselves; Safari and Firefox do not.
  const longTasks = [];
  let observer = null;
  if (
    typeof PerformanceObserver !== "undefined" &&
    PerformanceObserver.supportedEntryTypes?.includes("longtask")
  ) {
    try {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) longTasks.push(entry.duration);
      });
      observer.observe({ entryTypes: ["longtask"] });
    } catch {
      observer = null;
    }
  }

  return {
    stop() {
      clearInterval(timer);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);

      const stoppedAt = performance.now();
      // The tail gap counts. A run that blocks from start to finish never lets
      // the interval fire even once, so worstGapMs would still be 0 and the
      // worst freeze on the page would be reported as no freeze at all. The
      // silence between the last tick and now is exactly the freeze.
      const tailGap = stoppedAt - last;
      if (tailGap > worstGapMs) worstGapMs = tailGap;

      const elapsedMs = stoppedAt - startedAt;
      // Browsers do not backlog setInterval: a 1.2s block produces ONE late
      // tick, not 120 queued ones. So observed collapses while expected stays
      // honest, and the ratio drops the way it should. Report both; the gap
      // between them is the evidence, not a bug to be smoothed over.
      const expected = Math.max(1, Math.round(elapsedMs / HEARTBEAT_MS));

      return {
        elapsedMs,
        heartbeatsExpected: expected,
        heartbeatsObserved: ticks,
        heartbeatsOnTime: onTimeCount,
        onTimeRatio: onTimeCount / expected,
        // Subtract the 10ms that were legitimately due, so "longest freeze"
        // means thread unavailability and not unavailability plus the interval.
        worstFreezeMs: Math.max(0, worstGapMs - HEARTBEAT_MS),
        worstGapMs,
        longTaskMaxMs: longTasks.length ? Math.max(...longTasks) : null,
        visibilityDirty,
      };
    },
  };
}

/**
 * The visible canary.
 *
 * This MUST be driven from JavaScript inside requestAnimationFrame. A CSS
 * animation or transition would be handed to the compositor and would keep
 * sweeping straight through a blocked main thread — hiding the exact thing the
 * page is trying to show. See the matching `transition: none` in the stylesheet.
 */
export function startCanary(el, counterEl, { reducedMotion } = {}) {
  let running = true;
  const startedAt = performance.now();
  let last = startedAt;
  let frames = 0;
  let worstFrameGapMs = 0;

  const step = (now) => {
    if (!running) return;
    const gap = now - last;
    last = now;
    frames += 1;
    if (gap > worstFrameGapMs) worstFrameGapMs = gap;

    const stalled = gap > FRAME_BUDGET_MS;
    if (el) {
      el.dataset.stalled = stalled ? "true" : "false";
      if (!reducedMotion) el.style.transform = `rotate(${(frames * 12) % 360}deg)`;
    }
    // Always written, whatever the motion preference: when the hand is hidden
    // this counter is the freeze indicator, and it simply stops incrementing.
    if (counterEl) counterEl.textContent = String(frames);

    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);

  return {
    stop() {
      running = false;
      const stoppedAt = performance.now();
      // Same reasoning as the heartbeat's tail gap: a frame that never arrived
      // is the longest gap, not an absent one.
      const tailGap = stoppedAt - last;
      if (tailGap > worstFrameGapMs) worstFrameGapMs = tailGap;

      const elapsedMs = stoppedAt - startedAt;
      if (el) el.dataset.stalled = "false";
      return {
        frames,
        elapsedMs,
        fps: elapsedMs > 0 ? frames / (elapsedMs / 1000) : 0,
        worstFrameGapMs,
      };
    },
  };
}
