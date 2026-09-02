-- ============================================================================
--  Transactions & isolation levels — hands-on scenarios (PostgreSQL 16)
-- ============================================================================
--  HOW TO RUN
--    1. docker compose up -d
--    2. open TWO terminals, each a psql session:
--         docker compose exec db psql -U postgres -d lab
--       Below, "A>" = run it in session 1, "B>" = run it in session 2.
--    3. run the SETUP block once, then walk one scenario top to bottom,
--       alternating sessions as marked.
--    4. after each scenario run its own `reset:` line (or the whole SETUP block).
--
--  WHAT TO WATCH
--    - which SELECT returns stale vs fresh data
--    - which statement BLOCKS (psql just hangs -> the other session holds a lock)
--    - which COMMIT / UPDATE ERRORs, and the SQLSTATE:
--        40001  serialization_failure  -> retry the WHOLE transaction
--        40P01  deadlock_detected      -> one victim is aborted
-- ============================================================================


-- ============================== SETUP =======================================
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS on_call;

CREATE TABLE accounts (
  id      int    PRIMARY KEY,
  owner   text   NOT NULL,
  balance bigint NOT NULL CHECK (balance >= 0)
);
INSERT INTO accounts (id, owner, balance) VALUES
  (1, 'alice', 1000),
  (2, 'bob',   1000),
  (3, 'carol',   50);

CREATE TABLE on_call (
  doctor  text    PRIMARY KEY,
  on_call boolean NOT NULL
);
INSERT INTO on_call VALUES ('alice', true), ('bob', true);
-- invariant for scenario 5: at least ONE doctor on call.


-- ============================================================================
--  1. DIRTY READ  —  can B see A's uncommitted write?
--     Standard SQL: allowed at READ UNCOMMITTED.
--     PostgreSQL:   NEVER. "READ UNCOMMITTED" is silently treated as READ COMMITTED.
-- ============================================================================
-- reset: UPDATE accounts SET balance = 1000 WHERE id = 1;

-- A>  BEGIN;
-- A>  UPDATE accounts SET balance = balance - 100 WHERE id = 1;   -- 900, NOT committed

-- B>  BEGIN TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- B>  SELECT balance FROM accounts WHERE id = 1;
--       EXPECT: 1000  (committed value) — Postgres will not show you 900
-- B>  COMMIT;

-- A>  ROLLBACK;
-- TAKEAWAY: dirty reads are impossible in Postgres at every level.


-- ============================================================================
--  2. NON-REPEATABLE READ  —  same row read twice in one txn, value changed.
--     READ COMMITTED   -> happens.
--     REPEATABLE READ  -> prevented (txn sees a frozen snapshot).
-- ============================================================================

-- ---- 2a. READ COMMITTED: the anomaly happens -------------------------------
-- reset: UPDATE accounts SET balance = 1000 WHERE id = 1;
-- A>  BEGIN;                                            -- default = READ COMMITTED
-- A>  SELECT balance FROM accounts WHERE id = 1;        -- 1000

-- B>  BEGIN;
-- B>  UPDATE accounts SET balance = 500 WHERE id = 1;
-- B>  COMMIT;

-- A>  SELECT balance FROM accounts WHERE id = 1;        -- 500  <-- changed mid-transaction
-- A>  COMMIT;

-- ---- 2b. REPEATABLE READ: prevented --------------------------------------
-- reset: UPDATE accounts SET balance = 1000 WHERE id = 1;
-- A>  BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- A>  SELECT balance FROM accounts WHERE id = 1;        -- 1000

-- B>  BEGIN;
-- B>  UPDATE accounts SET balance = 500 WHERE id = 1;
-- B>  COMMIT;

-- A>  SELECT balance FROM accounts WHERE id = 1;        -- still 1000 (snapshot frozen at txn start)
-- A>  COMMIT;


-- ============================================================================
--  3. PHANTOM READ  —  a range query run twice returns a different set of rows.
--     Standard SQL: only SERIALIZABLE must prevent this.
--     PostgreSQL:   REPEATABLE READ already prevents it (it is snapshot isolation).
-- ============================================================================
-- reset: DELETE FROM accounts WHERE id = 99;

-- A>  BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- A>  SELECT count(*) FROM accounts WHERE balance >= 100;      -- e.g. 2

-- B>  BEGIN;
-- B>  INSERT INTO accounts (id, owner, balance) VALUES (99, 'ghost', 5000);
-- B>  COMMIT;

-- A>  SELECT count(*) FROM accounts WHERE balance >= 100;      -- still 2 in Postgres
--       (the SQL standard would allow 3 here at REPEATABLE READ)
-- A>  COMMIT;


-- ============================================================================
--  4. LOST UPDATE  —  two read-modify-write cycles, one overwrites the other.
--     The classic app bug: SELECT in code, compute in code, UPDATE in code.
-- ============================================================================

-- ---- 4a. READ COMMITTED + read-modify-write in "app": the update is LOST --
-- reset: UPDATE accounts SET balance = 1000 WHERE id = 1;
-- A>  BEGIN;
-- A>  SELECT balance FROM accounts WHERE id = 1;    -- 1000  (app remembers 1000)

-- B>  BEGIN;
-- B>  SELECT balance FROM accounts WHERE id = 1;    -- 1000  (app remembers 1000)
-- B>  UPDATE accounts SET balance = 1000 - 100 WHERE id = 1;   -- app writes 900
-- B>  COMMIT;

-- A>  UPDATE accounts SET balance = 1000 - 200 WHERE id = 1;   -- blocks until B commits,
--                                                             -- then writes 800 from a STALE base
-- A>  COMMIT;
-- A>  SELECT balance FROM accounts WHERE id = 1;    -- 800.  B's -100 vanished. Expected 700.

-- ---- 4b. fix: atomic UPDATE (no read-modify-write in app) ----------------
-- reset: UPDATE accounts SET balance = 1000 WHERE id = 1;
-- A>  BEGIN;
-- A>  UPDATE accounts SET balance = balance - 200 WHERE id = 1;
-- B>  BEGIN;
-- B>  UPDATE accounts SET balance = balance - 100 WHERE id = 1;   -- blocks, then applies on fresh value
-- A>  COMMIT;
-- B>  COMMIT;
-- any> SELECT balance FROM accounts WHERE id = 1;   -- 700.  correct.

-- ---- 4c. fix: SELECT ... FOR UPDATE (pessimistic row lock) ---------------
-- reset: UPDATE accounts SET balance = 1000 WHERE id = 1;
-- A>  BEGIN;
-- A>  SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;   -- 1000, row now locked
-- B>  BEGIN;
-- B>  SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;   -- BLOCKS until A commits
-- A>  UPDATE accounts SET balance = 800 WHERE id = 1;
-- A>  COMMIT;
-- B>  -- unblocks; SELECT now returns 800
-- B>  UPDATE accounts SET balance = 700 WHERE id = 1;
-- B>  COMMIT;   -- 700, correct.

-- ---- 4d. fix: REPEATABLE READ turns the lost update into an ERROR --------
-- reset: UPDATE accounts SET balance = 1000 WHERE id = 1;
-- A>  BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- A>  SELECT balance FROM accounts WHERE id = 1;    -- 1000
-- B>  BEGIN;
-- B>  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- B>  COMMIT;
-- A>  UPDATE accounts SET balance = balance - 200 WHERE id = 1;
--       ERROR:  could not serialize access due to concurrent update   (SQLSTATE 40001)
-- A>  ROLLBACK;   -- the app must retry the whole transaction


-- ============================================================================
--  5. WRITE SKEW  —  two txns read the same rows, write DIFFERENT rows, and
--     together break an invariant that no single txn violated.
--     REPEATABLE READ -> slips through (no row is written twice).
--     SERIALIZABLE    -> one txn aborts with 40001.
-- ============================================================================

-- ---- 5a. REPEATABLE READ: invariant ">= 1 doctor on call" is violated ----
-- reset: UPDATE on_call SET on_call = true;
-- A>  BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- A>  SELECT count(*) FROM on_call WHERE on_call;    -- 2  -> "safe for me to go off call"

-- B>  BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- B>  SELECT count(*) FROM on_call WHERE on_call;    -- 2  -> same conclusion
-- B>  UPDATE on_call SET on_call = false WHERE doctor = 'bob';
-- B>  COMMIT;

-- A>  UPDATE on_call SET on_call = false WHERE doctor = 'alice';
-- A>  COMMIT;                                         -- succeeds!
-- any> SELECT count(*) FROM on_call WHERE on_call;    -- 0.  nobody on call.

-- ---- 5b. SERIALIZABLE: the second commit is rejected --------------------
-- reset: UPDATE on_call SET on_call = true;
-- A>  BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- A>  SELECT count(*) FROM on_call WHERE on_call;    -- 2
-- B>  BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- B>  SELECT count(*) FROM on_call WHERE on_call;    -- 2
-- B>  UPDATE on_call SET on_call = false WHERE doctor = 'bob';
-- B>  COMMIT;                                         -- ok
-- A>  UPDATE on_call SET on_call = false WHERE doctor = 'alice';
-- A>  COMMIT;
--       ERROR:  could not serialize access due to read/write dependencies
--               among transactions   (SQLSTATE 40001)
--
--  WHY A FAILS AND NOT B:
--    both txns READ the set {alice, bob} (the count(*) query), then each WROTE one
--    row from that set. A read what B later changed AND B read what A later changed
--    -> a read/write dependency cycle with no equivalent serial order. B already
--    committed, so Postgres aborts the SECOND committer (A). Commit order picks the
--    victim, not the row. Commit A first and B gets the 40001 instead.
-- A>  -- retry: re-run the txn; the re-read now sees only 1 on call, so the app declines.


-- ============================================================================
--  6. DEADLOCK  —  two txns take the same locks in opposite order.
--     Postgres detects the cycle (after deadlock_timeout ~1s) and kills a victim.
-- ============================================================================
-- reset: UPDATE accounts SET balance = 1000 WHERE id IN (1, 2);

-- A>  BEGIN;
-- A>  UPDATE accounts SET balance = balance - 1 WHERE id = 1;   -- locks row 1

-- B>  BEGIN;
-- B>  UPDATE accounts SET balance = balance - 1 WHERE id = 2;   -- locks row 2

-- A>  UPDATE accounts SET balance = balance - 1 WHERE id = 2;   -- waits for B

-- B>  UPDATE accounts SET balance = balance - 1 WHERE id = 1;   -- waits for A -> CYCLE
--       one session ERRORs:  deadlock detected   (SQLSTATE 40P01)
--       the other proceeds — COMMIT it.
-- both> ROLLBACK / COMMIT as appropriate.
--
-- FIX: always lock rows in a consistent order (e.g. ascending id). Then step 6
--      just blocks and serializes instead of deadlocking.
