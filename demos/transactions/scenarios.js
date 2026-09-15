/**
 * The scenarios, framed as a bank ledger.
 *
 *   naive         read both balances, decide in JavaScript, write both back
 *   locked        take the row locks first, in ascending id
 *   serializable  read freely, and refuse to commit if a row that was read
 *                 has changed since — then retry the whole thing
 *
 * All three are given exactly the same list of transfers, generated from a
 * fixed seed. So the workload never varies between runs, and the only thing
 * that varies is when the browser chooses to switch between them.
 *
 * The check at the end is the sum. Money is neither created nor destroyed by
 * moving it, so the total has to be what it was. When it is not, the run did
 * not fail — it succeeded, and the number is wrong. That is the whole point.
 */
import {
  createDb,
  seeded,
  tick,
  TxnAbort,
  SERIALIZATION_FAILURE,
  DEADLOCK_DETECTED,
} from "./db.js";

export const ACCOUNTS = [
  { id: 1, owner: "alice", balance: 1000 },
  { id: 2, owner: "bob", balance: 1000 },
  { id: 3, owner: "carol", balance: 1000 },
];

export const OPENING_TOTAL = ACCOUNTS.reduce((s, a) => s + a.balance, 0);

/** Models the connection pool in the Postgres lab: 20 transfers in flight. */
const POOL = 20;

/**
 * The same transfers every time. Amounts stay small relative to the balances
 * so the funds check rarely bites and the run is about concurrency rather
 * than about declining transfers.
 */
export function makeTransfers(count, seed = 20260914) {
  const random = seeded(seed);
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      from: ACCOUNTS[i % 3].id,
      to: ACCOUNTS[(i + 1) % 3].id,
      amount: 1 + Math.floor(random() * 20),
    });
  }
  return list;
}

/** Run `jobs` with at most POOL of them in flight, like a connection pool. */
async function withPool(jobs, limit = POOL) {
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, jobs.length) }, async () => {
    for (;;) {
      const index = next;
      next += 1;
      if (index >= jobs.length) return;
      await jobs[index]();
    }
  });
  await Promise.all(workers);
}

const RETRYABLE = new Set([SERIALIZATION_FAILURE, DEADLOCK_DETECTED]);

/**
 * Retry on the two codes a database uses to say "I could not run these
 * concurrently, run it again". Same contract as the Node lab's withRetry, and
 * the same five attempts.
 */
async function withRetry(fn, counters, maxAttempts = 5) {
  let attempt = 0;
  for (;;) {
    attempt += 1;
    try {
      const value = await fn(attempt);
      return { value, attempts: attempt };
    } catch (error) {
      if (error instanceof TxnAbort && RETRYABLE.has(error.code)) {
        counters[error.code] += 1;
        if (attempt < maxAttempts) {
          // Exponential backoff with full jitter, so retries do not all come
          // back at the same instant and collide again.
          const backoff = Math.random() * 2 ** attempt;
          await new Promise((r) => setTimeout(r, backoff));
          continue;
        }
      }
      throw error;
    }
  }
}

function emptyCounters() {
  return { [SERIALIZATION_FAILURE]: 0, [DEADLOCK_DETECTED]: 0 };
}

async function runAll(mode, transfers, transfer, onProgress) {
  const db = createDb(ACCOUNTS);
  const counters = emptyCounters();
  const totalBefore = db.total();
  let committed = 0;
  let retried = 0;
  let declined = 0;
  let gaveUp = 0;
  let done = 0;

  const started = performance.now();
  await withPool(
    transfers.map((t, i) => async () => {
      try {
        const { attempts } = await withRetry(
          (attempt) => transfer(db, t, i, attempt),
          counters,
        );
        committed += 1;
        if (attempts > 1) retried += 1;
      } catch (error) {
        if (error instanceof TxnAbort) gaveUp += 1;
        else declined += 1;
      }
      done += 1;
      if (onProgress && done % 10 === 0) onProgress(done / transfers.length, db);
    }),
  );
  const wallMs = performance.now() - started;
  const totalAfter = db.total();

  return {
    mode,
    wallMs,
    transfers: transfers.length,
    committed,
    retried,
    declined,
    gaveUp,
    serializationFailures: counters[SERIALIZATION_FAILURE],
    deadlocks: counters[DEADLOCK_DETECTED],
    staleWrites: db.stats.staleWrites,
    lockWaits: db.stats.lockWaits,
    lockWaitMs: db.stats.lockWaitMs,
    totalBefore,
    totalAfter,
    drift: totalAfter - totalBefore,
    conserved: totalAfter === totalBefore,
    rows: db.snapshot(),
  };
}

/* ------------------------------------------------------------------ naive */

/**
 * The version almost everyone writes first, and the one that is usually
 * correct in a test.
 *
 *   const from = await read(fromId);
 *   const to   = await read(toId);
 *   if (from.balance < amount) decline;
 *   await write(fromId, from.balance - amount);
 *   await write(toId,   to.balance + amount);
 *
 * Every line is reasonable. The bug is in the gaps between them: `from.balance`
 * is a number that was true when it was read, and by the time it is written
 * back somebody else has moved the same money. This write does not know that,
 * so it overwrites their change with a total computed before it happened.
 *
 * Nothing throws. Every transfer reports success.
 */
export async function runNaive(transfers, onProgress) {
  return runAll("naive", transfers, async (db, t) => {
    // Nothing is locked anywhere in here, so unlike the Postgres version there
    // is no lock order to get right and no deadlock to avoid. That is not an
    // improvement. It is the same absence that lets the writes below land on
    // top of each other.
    // #region naive-body
    const from = await db.read(t.from);
    const to = await db.read(t.to);
    if (from.balance < t.amount) throw new Error("insufficient funds");

    await db.write(t.from, from.balance - t.amount, from.version);
    await db.write(t.to, to.balance + t.amount, to.version);
    // #endregion
  }, onProgress);
}

/* ----------------------------------------------------------------- locked */

/**
 * SELECT ... FOR UPDATE, in ascending id.
 *
 * Take the lock on every row this transfer will touch before reading any of
 * them, and hold all of them until the end. Nobody else can read a row while
 * it is locked, so there is no gap left for anyone to commit into.
 *
 * Ascending id is not decoration. It is an order that every transfer in the
 * system agrees on, and agreeing is what stops two transfers holding one row
 * each and waiting for the other's forever.
 *
 * The cost is not an error rate. It is waiting: transfers queue.
 */
export async function runLocked(transfers, onProgress, { orderLocks = true } = {}) {
  return runAll("locked", transfers, async (db, t, index) => {
    const txn = `t${index}`;
    const ids = [t.from, t.to];
    if (orderLocks) ids.sort((a, b) => a - b);
    const taken = [];
    try {
      for (const id of ids) {
        await db.lock(txn, id);
        taken.push(id);
      }
      const from = await db.read(t.from);
      const to = await db.read(t.to);
      if (from.balance < t.amount) throw new Error("insufficient funds");
      await db.write(t.from, from.balance - t.amount, from.version);
      await db.write(t.to, to.balance + t.amount, to.version);
    } finally {
      for (const id of taken) db.unlock(txn, id);
    }
  }, onProgress);
}

/* ----------------------------------------------------------- serializable */

/**
 * The optimistic version: read whatever you like without locking anything,
 * and check at commit time whether any row you read has changed since. If one
 * has, this transaction saw a version of the world that never existed, so it
 * is thrown away and run again from the top.
 *
 * This is a model of what Postgres calls Serializable Snapshot Isolation, not
 * an implementation of it. Real SSI tracks read/write dependencies between
 * transactions and aborts on cycles; this tracks row versions, which catches
 * the same two anomalies this page shows and is small enough to read.
 *
 * The validate-and-apply step below deliberately contains no `await`. A commit
 * has to be one indivisible step — check, then write, with nothing able to run
 * in between. Put a pause in the middle and the check stops meaning anything,
 * which is the same bug the naive version has, one level down.
 */
export async function runSerializable(transfers, onProgress) {
  return runAll("serializable", transfers, async (db, t) => {
    const readSet = new Map();
    const from = await db.read(t.from);
    readSet.set(t.from, from.version);
    const to = await db.read(t.to);
    readSet.set(t.to, to.version);

    if (from.balance < t.amount) throw new Error("insufficient funds");

    const writes = [
      { id: t.from, delta: -t.amount },
      { id: t.to, delta: t.amount },
    ];

    await tick(); // the round trip to the server that COMMIT costs

    // #region commit
    // --- commit: one turn, no awaits ---
    for (const [id, version] of readSet) {
      if (db.version(id) !== version) {
        throw new TxnAbort(
          SERIALIZATION_FAILURE,
          "could not serialize access due to concurrent update",
        );
      }
    }
    for (const w of writes) db.commitDelta(w.id, w.delta);
    // #endregion
  }, onProgress);
}

/* ------------------------------------------------------------- write skew */

/**
 * Two doctors are on call. Each may go off call, as long as somebody else is
 * still on. Both check at the same time, both see two doctors on call, and
 * both conclude it is fine.
 *
 * Neither transaction breaks the rule on its own. They write different rows,
 * so there is no lost update and no write is overwritten — every value in the
 * table is one somebody deliberately wrote. The rule is broken by the pair.
 * This is why "did anyone overwrite my row?" is not a sufficient question, and
 * why snapshot isolation lets this through while Serializable does not.
 */
export async function runWriteSkew({ serializable }) {
  const doctors = new Map([
    ["alice", { onCall: true, version: 0 }],
    ["bob", { onCall: true, version: 0 }],
  ]);
  const onCallCount = () => [...doctors.values()].filter((d) => d.onCall).length;

  let aborted = 0;

  async function goOffCall(name) {
    // The predicate read: everyone this decision depends on.
    await tick();
    const readSet = [...doctors.entries()].map(([n, d]) => [n, d.version]);
    const stillCovered = onCallCount() > 1;
    await tick();
    if (!stillCovered) return "declined";

    await tick(); // COMMIT

    if (serializable) {
      // Every row the decision was based on must still be as it was read —
      // including the rows this transaction is not writing.
      for (const [n, version] of readSet) {
        if (doctors.get(n).version !== version) {
          aborted += 1;
          return "aborted";
        }
      }
    }
    const doctor = doctors.get(name);
    doctor.onCall = false;
    doctor.version += 1;
    return "committed";
  }

  const results = await Promise.all([goOffCall("alice"), goOffCall("bob")]);

  return {
    results,
    aborted,
    remaining: onCallCount(),
    safe: onCallCount() >= 1,
  };
}

/* ---------------------------------------------------------------- deadlock */

/**
 * The same locking transfer, with the one agreement removed.
 *
 * Locks are taken in the order each transfer happens to name its accounts:
 * a transfer from 1 to 2 takes 1 then 2, and one from 2 to 1 takes 2 then 1.
 * Run both at once and each ends up holding what the other is waiting for.
 * Neither can finish and neither will give up, so something has to kill one.
 *
 * The fix is not cleverness. It is picking an order — any order, as long as
 * it is the same one everywhere.
 */
export async function runDeadlock(transfers, onProgress) {
  return runLocked(transfers, onProgress, { orderLocks: false });
}
