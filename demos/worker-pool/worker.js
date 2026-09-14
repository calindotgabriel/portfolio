/**
 * The worker end of the pool.
 *
 * A module worker, so it can import the very same task.js the page imports.
 * A classic worker would have to importScripts() a globals-exposing copy of
 * the algorithm, and two copies is exactly what would undermine the claim this
 * page makes — that the browser and the Node benchmark compute the same thing.
 */
import { makeRows, transformChunk } from "./task.js";

// #region worker-branch
/**
 * Either the main thread paid to build and copy `rows` over, or it sent two
 * numbers and the worker builds its own slice. That is the entire difference
 * between the two pooled runs on this page.
 *
 * In a real export the second branch is a cursor, a file offset, or a
 * LIMIT/OFFSET query: the worker does its own reading.
 */
function resolveRows({ rows, range }) {
  if (rows) return rows;
  return makeRows(range.count, range.start);
}
// #endregion

self.onmessage = (event) => {
  const request = event.data;
  try {
    if (request.fail) throw new Error("deliberate worker failure");
    const result = transformChunk(resolveRows(request), request.work);
    self.postMessage({ id: request.id, ok: true, result });
  } catch (error) {
    self.postMessage({
      id: request.id,
      ok: false,
      error: { message: error.message, stack: error.stack },
    });
  }
};
