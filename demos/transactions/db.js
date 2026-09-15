/**
 * A very small account table with genuinely asynchronous reads and writes.
 *
 * Nothing here simulates a race. Every read and every write waits for a real
 * turn of the event loop before it takes effect, so when two transfers are
 * started at the same time the browser really does run one transfer's read
 * between the other's read and its write. The lost updates on this page are
 * lost by the same mechanism they are lost by in a database: someone else
 * committed in the gap.
 *
 * What this is NOT: Postgres. There is no WAL, no MVCC snapshot, no planner,
 * no disk. It is a model of the read/write interleaving and of one commit-time
 * validation rule, which is the part the page is about. The measured Postgres
 * numbers are quoted separately, from a real server.
 */

/* ------------------------------------------------------------------ timing */

/**
 * Hand the browser one turn.
 *
 * MessageChannel rather than setTimeout(0): setTimeout is clamped to ~4ms, and
 * over a few thousand reads and writes that clamp would dominate the wall
 * clock and make every scenario look identical.
 */
const channel = typeof MessageChannel !== "undefined" ? new MessageChannel() : null;
const waiters = [];
if (channel) {
  // One channel, many waiters, so the resolvers go in a queue rather than
  // into channel.port1.onmessage. Assigning onmessage per call looks tidier
  // and is wrong here: this page has twenty transfers awaiting a turn at
  // once, each assignment replaces the last, and every waiter but the most
  // recent is never resolved. One postMessage delivers one message and
  // releases exactly one waiter, in the order they asked.
  channel.port1.onmessage = () => {
    const resolve = waiters.shift();
    if (resolve) resolve();
  };
}
export const tick = channel
  ? () =>
      new Promise((resolve) => {
        waiters.push(resolve);
        channel.port2.postMessage(0);
      })
  : () => new Promise((resolve) => setTimeout(resolve, 0));

/* ------------------------------------------------------------------- seeds */

/**
 * mulberry32. The transfer list is seeded so every run moves the same amounts
 * between the same accounts. The interleaving is not seeded and cannot be —
 * it is whatever the event loop does. So a changing result across runs is the
 * concurrency, never a different workload.
 */
export function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------------------------------------------------------------- failures */

/** The two SQLSTATEs the Postgres lab retries on, modelled by name. */
export class TxnAbort extends Error {
  constructor(code, message) {
    super(message);
    this.name = "TxnAbort";
    this.code = code;
  }
}
export const SERIALIZATION_FAILURE = "40001";
export const DEADLOCK_DETECTED = "40P01";

/* ------------------------------------------------------------------- store */

export function createDb(accounts) {
  const rows = new Map(
    accounts.map((a) => [a.id, { ...a, version: 0 }]),
  );

  /**
   * Counters, not measurements.
   *
   * `staleWrites` is the honest one and the reason this object exists. The
   * store cannot tell a correct write from an incorrect one — but it can tell
   * whether the value being written was computed from a version of the row
   * that is no longer the current version. That is exactly a lost update, and
   * counting it needs no guessing:
   *
   *   a write is stale if the row changed between the read it was based on
   *   and the moment the write lands.
   *
   * Nothing rejects a stale write. It is counted and allowed through, because
   * that is what the database does when the application does the arithmetic.
   */
  const stats = { reads: 0, writes: 0, staleWrites: 0, lockWaits: 0, lockWaitMs: 0 };

  async function read(id) {
    await tick();
    stats.reads += 1;
    const row = rows.get(id);
    return { id, balance: row.balance, version: row.version };
  }

  /** Write an absolute value the caller computed. The read-modify-write path. */
  async function write(id, balance, basedOnVersion) {
    await tick();
    const row = rows.get(id);
    if (basedOnVersion !== undefined && row.version !== basedOnVersion) {
      stats.staleWrites += 1;
    }
    row.balance = balance;
    row.version += 1;
    stats.writes += 1;
  }

  /**
   * Apply a change relative to whatever the value is right now, in this turn,
   * without yielding first.
   *
   * This is the write a commit makes, and it is deliberately synchronous. A
   * commit that checked its read set and then awaited something before writing
   * would have the same hole the naive transfer has: the check would describe a
   * world that is already out of date by the time it is acted on.
   */
  function commitDelta(id, delta) {
    const row = rows.get(id);
    row.balance += delta;
    row.version += 1;
    stats.writes += 1;
  }

  /* ------------------------------------------------------------- row locks */

  const held = new Map(); // id -> txn id holding it
  const queues = new Map(); // id -> [{ txn, resolve, reject }]
  const waitingFor = new Map(); // txn id -> row id it is blocked on

  /**
   * Walk the wait-for graph from `txn`. If following "who holds what I am
   * waiting for" leads back to `txn`, the wait is a cycle and one of the
   * transactions in it has to be killed — which is what a database means by
   * "deadlock detected".
   */
  function cycleFrom(txn, wantedId) {
    let holder = held.get(wantedId);
    const seen = new Set();
    while (holder !== undefined) {
      if (holder === txn) return true;
      if (seen.has(holder)) return false;
      seen.add(holder);
      const next = waitingFor.get(holder);
      if (next === undefined) return false;
      holder = held.get(next);
    }
    return false;
  }

  async function lock(txn, id) {
    if (!held.has(id)) {
      held.set(id, txn);
      return;
    }
    if (held.get(id) === txn) return;
    if (cycleFrom(txn, id)) {
      throw new TxnAbort(DEADLOCK_DETECTED, "deadlock detected");
    }
    stats.lockWaits += 1;
    const started = performance.now();
    waitingFor.set(txn, id);
    try {
      await new Promise((resolve, reject) => {
        if (!queues.has(id)) queues.set(id, []);
        queues.get(id).push({ txn, resolve, reject });
      });
    } finally {
      waitingFor.delete(txn);
      stats.lockWaitMs += performance.now() - started;
    }
  }

  function unlock(txn, id) {
    if (held.get(id) !== txn) return;
    const queue = queues.get(id);
    if (queue && queue.length > 0) {
      const next = queue.shift();
      held.set(id, next.txn);
      next.resolve();
    } else {
      held.delete(id);
    }
  }

  return {
    read,
    write,
    commitDelta,
    lock,
    unlock,
    stats,
    balance: (id) => rows.get(id).balance,
    version: (id) => rows.get(id).version,
    snapshot: () => [...rows.values()].map((r) => ({ ...r })),
    total: () => [...rows.values()].reduce((sum, r) => sum + r.balance, 0),
  };
}
