/**
 * A model of the bulk-requests lab that runs in virtual time.
 *
 * The provider behaves like the Node mock in the practice lab: at most 10
 * requests in flight, at most 100 in any one-second window, 5% random 500s,
 * 3% slow answers that still charge after the client gave up, every 97th card
 * declined, and idempotency keys. The client code below mirrors the code
 * written in the lab.
 *
 * Time is simulated: sleep() puts a timer in a queue, and run() jumps the
 * clock from one timer to the next. Thirteen seconds of traffic take a
 * fraction of a second to compute.
 */

export const PROVIDER = {
  maxInflight: 10,
  ratePerSec: 100,
  failRate: 0.05,
  slowRate: 0.03,
  slowMs: 1500,
  latencyMs: 15,
};

export const CLIENT = {
  customers: 1000,
  ratePerSec: 90,
  maxAttempts: 7,
  timeoutMs: 1000,
};

// Seeded so every run of one scenario gives the same failures.
function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// One macrotask hop, so every pending microtask runs before the clock moves.
// A queue of waiters, not a reassigned onmessage: several runs may overlap.
const channel = new MessageChannel();
const hops = [];
channel.port1.onmessage = () => hops.shift()?.();
const hop = () => new Promise((resolve) => { hops.push(resolve); channel.port2.postMessage(0); });

function createClock() {
  let now = 0;
  let seq = 0;
  const heap = [];
  const before = (a, b) => a.t < b.t || (a.t === b.t && a.seq < b.seq);

  function push(timer) {
    heap.push(timer);
    let i = heap.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (!before(heap[i], heap[parent])) break;
      [heap[i], heap[parent]] = [heap[parent], heap[i]];
      i = parent;
    }
  }
  function pop() {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < heap.length && before(heap[l], heap[m])) m = l;
        if (r < heap.length && before(heap[r], heap[m])) m = r;
        if (m === i) break;
        [heap[i], heap[m]] = [heap[m], heap[i]];
        i = m;
      }
    }
    return top;
  }

  return {
    now: () => now,
    sleep: (ms) => new Promise((resolve) => push({ t: now + Math.max(0, ms), seq: seq++, resolve })),
    async run(main) {
      let finished = false;
      let failure = null;
      main().then(() => { finished = true; }, (error) => { failure = error; finished = true; });
      for (;;) {
        await hop();
        if (finished) break;
        if (!heap.length) throw new Error("the model stalled with no timers left");
        const t = heap[0].t;
        now = t;
        while (heap.length && heap[0].t === t) pop().resolve();
      }
      if (failure) throw failure;
    },
  };
}

function createProvider(clock, random) {
  const stats = {
    requests: 0, charges: 0, duplicates: 0, maxInflight: 0, overloaded: 0,
    rateLimited: 0, serverErrors: 0, slow: 0, inProgressConflicts: 0, declined: 0,
  };
  const chargesById = new Map();
  const byKey = new Map();
  const recent = [];
  let inflight = 0;

  async function handle(id, key) {
    stats.requests++;
    const now = clock.now();
    while (recent.length && recent[0] <= now - 1000) recent.shift();
    if (recent.length >= PROVIDER.ratePerSec) {
      stats.rateLimited++;
      return { status: 429 };
    }
    recent.push(now);

    inflight++;
    stats.maxInflight = Math.max(stats.maxInflight, inflight);
    try {
      if (inflight > PROVIDER.maxInflight) {
        stats.overloaded++;
        return { status: 503 };
      }
      if (id % 97 === 0) {
        stats.declined++;
        await clock.sleep(PROVIDER.latencyMs);
        return { status: 400 };
      }
      if (key && byKey.has(key)) {
        if (byKey.get(key) === "pending") {
          stats.inProgressConflicts++;
          return { status: 409 };
        }
        return { status: 200 };
      }
      const roll = random();
      if (roll < PROVIDER.failRate) {
        stats.serverErrors++;
        await clock.sleep(PROVIDER.latencyMs);
        return { status: 500 };
      }
      if (key) byKey.set(key, "pending");
      const slow = roll < PROVIDER.failRate + PROVIDER.slowRate;
      if (slow) stats.slow++;
      // The charge happens even if the client already gave up waiting.
      await clock.sleep(slow ? PROVIDER.slowMs : PROVIDER.latencyMs);
      const count = (chargesById.get(id) || 0) + 1;
      chargesById.set(id, count);
      if (count === 1) stats.charges++;
      else stats.duplicates++;
      if (key) byKey.set(key, "done");
      return { status: 200 };
    } finally {
      inflight--;
    }
  }

  return { stats, handle };
}

class TimeoutError extends Error {
  constructor() { super("timed out"); this.name = "TimeoutError"; }
}

/**
 * Runs one scenario.
 *   pace     – start requests through the pacer, 90 a second
 *   retry    – retry 5xx, 409 and timeouts with exponential backoff
 *   timeout  – give up on a request after 1 s
 *   key      – send an idempotency key, the same on every retry
 * Resolves with the provider's stats, every attempt (start time and
 * outcome), the per-customer results and the simulated duration.
 */
export async function runScenario({ pace = false, retry = false, timeout = false, key = false }, seed = 42) {
  const clock = createClock();
  const provider = createProvider(clock, mulberry32(seed));
  const attempts = [];

  // The client's fetch: the provider starts working at once; with a timeout
  // the client may stop waiting, but the provider carries on.
  function send(id, idempotencyKey) {
    const call = provider.handle(id, idempotencyKey);
    if (!timeout) return call;
    const giveUp = clock.sleep(CLIENT.timeoutMs).then(() => { throw new TimeoutError(); });
    return Promise.race([call, giveUp]);
  }

  function createPacer(ratePerSec) {
    const gapMs = 1000 / ratePerSec;
    let nextSlot = clock.now();
    return async function waitForSlot() {
      const now = clock.now();
      const myTurn = Math.max(now, nextSlot);
      nextSlot = myTurn + gapMs;
      await clock.sleep(myTurn - now);
    };
  }

  const backoff = (attempt) => 100 * 2 ** (attempt - 1);
  const waitForSlot = pace ? createPacer(CLIENT.ratePerSec) : null;
  const maxAttempts = retry ? CLIENT.maxAttempts : 1;

  async function chargeOne(id) {
    const idempotencyKey = key ? `ck-${id}` : undefined;
    for (let i = 0; i < maxAttempts; i++) {
      if (waitForSlot) await waitForSlot();
      const startedAt = clock.now();
      let res;
      try {
        res = await send(id, idempotencyKey);
      } catch {
        attempts.push({ t: startedAt, outcome: "timeout" });
        if (i + 1 < maxAttempts) await clock.sleep(backoff(i + 1));
        continue;
      }
      attempts.push({ t: startedAt, outcome: String(res.status) });
      if (res.status === 200) return { id, ok: true };
      if (res.status === 400) return { id, ok: false, reason: "declined" };
      if (i + 1 < maxAttempts) await clock.sleep(backoff(i + 1));
    }
    return { id, ok: false, reason: "gave up" };
  }

  let results;
  await clock.run(async () => {
    const ids = Array.from({ length: CLIENT.customers }, (_, i) => i + 1);
    results = await Promise.all(ids.map((id) => chargeOne(id)));
  });

  return { stats: provider.stats, attempts, results, elapsedMs: clock.now() };
}
