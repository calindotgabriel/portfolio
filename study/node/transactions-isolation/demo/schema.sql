-- Loaded by transfer.ts on every run, so each run starts from a known state.
DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
  id      int    PRIMARY KEY,
  owner   text   NOT NULL,
  balance bigint NOT NULL CHECK (balance >= 0)   -- overdraft fails loudly
);

INSERT INTO accounts (id, owner, balance) VALUES
  (1, 'alice', 1000),
  (2, 'bob',   1000),
  (3, 'carol', 1000);
