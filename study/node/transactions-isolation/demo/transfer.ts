import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;
const here = dirname(fileURLToPath(import.meta.url));

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://postgres:lab@localhost:5433/lab";

const pool = new Pool({ connectionString: DATABASE_URL, max: 20 });

// ---------------------------------------------------------------------------
// The retry wrapper — the point of this demo.
//
// Postgres aborts a transaction it cannot serialize:
//   40001  serialization_failure   (Repeatable Read / Serializable)
//   40P01  deadlock_detected
// These are NOT bugs. The Serializable contract is: the DB may reject a
// transaction, and the application must retry the WHOLE thing. The retry
// re-reads fresh data and normally succeeds.
// ---------------------------------------------------------------------------
const RETRYABLE = new Set(["40001", "40P01"]);

async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 5,
): Promise<{ value: T; attempts: number }> {
  let attempt = 0;
  for (;;) {
    attempt++;
    try {
      return { value: await fn(), attempts: attempt };
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code && RETRYABLE.has(code) && attempt < maxAttempts) {
        // exponential backoff, full jitter: random in [0, base * 2^attempt) ms
        const backoffMs = Math.random() * 10 * 2 ** attempt;
        await new Promise((r) => setTimeout(r, backoffMs));
        continue;
      }
      throw err;
    }
  }
}

// ---------------------------------------------------------------------------
// The transaction under test.
//
// Move `amount` from account `fromId` to `toId` inside ONE serializable
// transaction. A balance must never go negative.
// ---------------------------------------------------------------------------
async function transfer(
  fromId: number,
  toId: number,
  amount: number,
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE");

    // TODO(you): fill in the body.
    //   1. read both balances:
    //        SELECT balance FROM accounts WHERE id = $1        (fromId, then toId)
    //   2. if the sender has < amount -> throw new Error("insufficient funds")
    //   3. UPDATE accounts SET balance = balance - $1 WHERE id = $2   (amount, fromId)
    //      UPDATE accounts SET balance = balance + $1 WHERE id = $2   (amount, toId)
    //
    // Experiments once it works:
    //   - swap SERIALIZABLE -> READ COMMITTED. What breaks, and when?
    //   - keep SERIALIZABLE, delete withRetry() in main(). How many transfers fail?
    //   - lock rows in a fixed order (lower id first) vs the natural order here
    //     -> watch the deadlock (40P01) rate.
    void fromId;
    void toId;
    void amount;
    void client;

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function loadSchema(): Promise<void> {
  await pool.query(readFileSync(join(here, "schema.sql"), "utf8"));
}

async function totalBalance(): Promise<number> {
  const { rows } = await pool.query<{ sum: string }>(
    "SELECT COALESCE(SUM(balance), 0)::text AS sum FROM accounts",
  );
  return Number(rows[0].sum);
}

async function main(): Promise<void> {
  await loadSchema();
  const before = await totalBalance();
  console.log(`total balance before: ${before}`);

  // Fire many concurrent transfers between the same 3 accounts. Plenty of
  // read/write dependency cycles -> plenty of 40001 at SERIALIZABLE.
  const N = 200;
  const accounts = [1, 2, 3];
  let ok = 0;
  let retried = 0;
  let failed = 0;

  await Promise.all(
    Array.from({ length: N }, async (_, i) => {
      const from = accounts[i % 3];
      const to = accounts[(i + 1) % 3];
      try {
        const { attempts } = await withRetry(() => transfer(from, to, 1));
        ok++;
        if (attempts > 1) retried++;
      } catch (err) {
        failed++;
        console.error(`transfer #${i} gave up:`, (err as Error).message);
      }
    }),
  );

  const after = await totalBalance();
  console.log(`done. ok=${ok} (retried=${retried}) failed=${failed}`);
  console.log(`total balance after:  ${after}`);
  console.log(
    before === after
      ? "money is conserved OK"
      : "money LEAKED  <-- a lost update slipped through",
  );

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
