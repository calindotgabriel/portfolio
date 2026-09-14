/**
 * A fixed-size Web Worker pool.
 *
 * Deliberately small. It exists to make one thing measurable — what happens to
 * the main thread when CPU-bound work is moved off it — not to compete with a
 * real library. The parts that matter are the ones people get wrong when they
 * hand-roll this: tasks queue instead of spawning threads, every task settles
 * exactly once, a worker that throws rejects its own task and stays in the
 * pool, and a worker that dies is replaced rather than silently leaving the
 * pool one thread short.
 *
 * Ported from src/pool.ts in node-worker-pool-bench. Two browser differences:
 * there is no 'exit' event, so death is detected through onerror; and
 * onmessageerror exists here and does not in Node — it fires when a structured
 * clone fails, which is a genuinely on-topic way for the copying scenario to
 * break.
 */

/** Feature-detect module workers by seeing whether the options bag is read. */
export function supportsModuleWorkers() {
  if (typeof Worker === "undefined") return false;
  let read = false;
  const url = URL.createObjectURL(new Blob([""], { type: "text/javascript" }));
  try {
    const probe = new Worker(url, {
      get type() {
        read = true;
        return "module";
      },
    });
    probe.terminate();
  } catch {
    // A browser without module workers throws here; `read` stays false.
  } finally {
    URL.revokeObjectURL(url);
  }
  return read;
}

export class WorkerPool {
  #workerUrl;
  #slots = [];
  #queue = [];
  #destroyed = false;
  #nextId = 1;

  constructor(workerUrl, size) {
    if (size < 1) throw new RangeError(`pool size must be >= 1, got ${size}`);
    this.#workerUrl = workerUrl;
    this.size = size;
    for (let i = 0; i < size; i += 1) this.#spawn();
  }

  get pending() {
    return this.#queue.length;
  }

  #spawn() {
    const worker = new Worker(this.#workerUrl, { type: "module" });
    const slot = { worker, busy: false, settle: null };

    // #region settle-once
    worker.onmessage = (event) => {
      const message = event.data;
      // Take the settler and clear it before using it, so a stray second
      // message from the same worker cannot settle the task twice.
      const settle = slot.settle;
      slot.settle = null;
      slot.busy = false;
      if (settle) {
        if (message.ok) {
          settle(null, message.result);
        } else {
          const error = new Error(message.error?.message ?? "worker task failed");
          if (message.error?.stack) error.stack = message.error.stack;
          settle(error, undefined);
        }
      }
      this.#drain();
    };

    // A worker that dies mid-task must reject that task, not hang it, and the
    // pool must not quietly shrink.
    worker.onerror = (event) => {
      this.#replace(slot, new Error(event.message || "worker error"));
    };
    // Fires when a message could not be structured-cloned or deserialised.
    worker.onmessageerror = () => {
      this.#replace(slot, new Error("worker message could not be deserialised"));
    };
    // #endregion

    this.#slots.push(slot);
    return slot;
  }

  #replace(slot, error) {
    const settle = slot.settle;
    slot.settle = null;
    slot.busy = false;
    settle?.(error, undefined);

    const index = this.#slots.indexOf(slot);
    if (index !== -1) this.#slots.splice(index, 1);
    slot.worker.terminate();

    if (!this.#destroyed) {
      this.#spawn();
      this.#drain();
    }
  }

  #drain() {
    while (this.#queue.length > 0) {
      const slot = this.#slots.find((candidate) => !candidate.busy);
      if (!slot) return;
      const task = this.#queue.shift();
      slot.busy = true;
      slot.settle = (error, result) => {
        if (error) task.reject(error);
        else task.resolve(result);
      };
      task.onDispatch?.();
      slot.worker.postMessage(task.payload);
    }
  }

  /**
   * @param payload  message for the worker
   * @param onDispatch  called synchronously just before postMessage, so a
   *   caller can account for the cost of the clone it is about to pay for.
   */
  run(payload, onDispatch) {
    if (this.#destroyed) {
      return Promise.reject(new Error("pool has been destroyed"));
    }
    return new Promise((resolve, reject) => {
      this.#queue.push({ payload: { ...payload, id: this.#nextId++ }, resolve, reject, onDispatch });
      this.#drain();
    });
  }

  /**
   * Give every worker one tiny task before anything is measured.
   *
   * This posts directly to each slot rather than going through the queue. The
   * Node version warms with Promise.all of queued no-ops, where one fast
   * worker can take two of them and another take none — leaving a cold thread
   * whose script-parse cost lands inside the measured window.
   */
  async warmAll() {
    await Promise.all(
      this.#slots.map(
        (slot) =>
          new Promise((resolve) => {
            slot.busy = true;
            slot.settle = () => {
              slot.busy = false;
              resolve();
            };
            // count: 1, not 0 — the worker must actually touch makeRows and
            // transformChunk so the JIT sees the hot loops before we measure.
            slot.worker.postMessage({ id: this.#nextId++, work: 1, range: { start: 0, count: 1 } });
          }),
      ),
    );
  }

  async destroy() {
    this.#destroyed = true;

    const drained = this.#queue.splice(0, this.#queue.length);
    for (const task of drained) task.reject(new Error("pool has been destroyed"));

    // Terminating a busy worker means its task will never report back. Settle
    // it here, or the caller waits on a promise that can no longer resolve.
    for (const slot of this.#slots) {
      const settle = slot.settle;
      slot.settle = null;
      slot.busy = false;
      settle?.(new Error("pool has been destroyed while the task was running"), undefined);
    }

    for (const slot of this.#slots) slot.worker.terminate();
    this.#slots.length = 0;
  }
}
