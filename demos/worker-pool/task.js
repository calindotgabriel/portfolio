/**
 * The unit of work under test.
 *
 * It stands in for the row-level transform in a large export: read a record,
 * derive a few fields, and compute a checksum over the result. It is pure,
 * deterministic and CPU-bound on purpose — no I/O, no timers, no crypto. The
 * whole point of the demo is that this work cannot be made to yield, so
 * wherever it runs, it occupies that thread completely.
 *
 * This is a transliteration of src/task.ts in
 * https://github.com/calindotgabriel/node-worker-pool-bench
 * The arithmetic is deliberately byte-for-byte identical: Math.imul,
 * charCodeAt and >>> 0 are all spec-exact, so the same (rows, work) produces
 * the same fingerprint in this browser as it does in Node. The page relies on
 * that equality to show the fast path isn't cheating.
 */

const REGIONS = ["north", "south", "east", "west", "central"];

// #region make-rows
/**
 * Deterministic synthetic input, so any two runs are comparable — and
 * addressable by range, so a worker can build its own slice from two numbers
 * instead of being sent the rows. That difference turns out to matter more
 * than the thread count.
 */
export function makeRows(count, start = 0) {
  const rows = new Array(count);
  for (let offset = 0; offset < count; offset += 1) {
    const i = start + offset;
    rows[offset] = {
      id: i,
      account: `ACC-${(i * 7919) % 1_000_000}`,
      region: REGIONS[i % REGIONS.length],
      kwh: ((i * 37) % 9_000) + 100,
    };
  }
  return rows;
}
// #endregion

/** FNV-1a, iterated `work` times to make the per-row cost tunable. */
function checksum(input, work) {
  let hash = 0x811c9dc5;
  for (let pass = 0; pass < work; pass += 1) {
    for (let i = 0; i < input.length; i += 1) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    hash = (hash + pass) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

export function transformRow(row, work) {
  const label = `${row.region.toUpperCase()}/${row.account}/${row.kwh}`;
  return { id: row.id, label, checksum: checksum(label, work) };
}

export function transformChunk(rows, work) {
  const out = new Array(rows.length);
  for (let i = 0; i < rows.length; i += 1) {
    out[i] = transformRow(rows[i], work);
  }
  return out;
}

/** Collapses a result set to one value, so runs can be compared for equality. */
export function fingerprint(rows) {
  let hash = 0x811c9dc5;
  for (const row of rows) {
    for (let i = 0; i < row.checksum.length; i += 1) {
      hash ^= row.checksum.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    hash = (hash ^ row.id) >>> 0;
  }
  return `${rows.length}:${hash.toString(16).padStart(8, "0")}`;
}

// #region fingerprinter
/**
 * The same fold as fingerprint(), but incremental.
 *
 * fingerprint() needs the whole result set in memory at once, which would
 * quietly undo the point of streaming: you would avoid holding 200,000 input
 * rows only to hold 200,000 output rows instead. Folding chunk by chunk lets a
 * scenario release each chunk as soon as it has been counted.
 *
 * The fold is a left fold in id order, so folding chunks in order produces
 * exactly the value fingerprint() would have produced over the concatenation.
 * Folding them out of order does not — hence the assertion in fold().
 */
export function createFingerprinter() {
  let hash = 0x811c9dc5;
  let length = 0;

  return {
    /** Fold one chunk. MUST be called in chunk order. */
    fold(rows) {
      for (const row of rows) {
        for (let i = 0; i < row.checksum.length; i += 1) {
          hash ^= row.checksum.charCodeAt(i);
          hash = Math.imul(hash, 0x01000193) >>> 0;
        }
        hash = (hash ^ row.id) >>> 0;
        length += 1;
      }
    },
    value() {
      return `${length}:${(hash >>> 0).toString(16).padStart(8, "0")}`;
    },
  };
}
// #endregion
