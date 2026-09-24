/**
 * The core of what the `dataloader` package does, in about twenty lines.
 *
 * load(key) does not query anything. It remembers the key and hands back a
 * promise. The first load() in a turn schedules a dispatch for the end of
 * that turn; every load() made before then joins the same batch. Then the
 * batch function is called once, with every key, and each promise gets the
 * value in its slot. A key asked for twice returns the same promise.
 *
 * The real package also handles batch size limits, custom cache keys and
 * error slots. This is only the part that turns N queries into one.
 */
export class TinyLoader {
  constructor(batchFn) {
    this.batchFn = batchFn;
    this.cache = new Map();
    this.queue = [];
  }

  load(key) {
    if (this.cache.has(key)) return this.cache.get(key);
    const promise = new Promise((resolve, reject) => {
      this.queue.push({ key, resolve, reject });
      if (this.queue.length === 1) queueMicrotask(() => this.dispatch());
    });
    this.cache.set(key, promise);
    return promise;
  }

  async dispatch() {
    const batch = this.queue;
    this.queue = [];
    try {
      const values = await this.batchFn(batch.map((item) => item.key));
      batch.forEach((item, i) => item.resolve(values[i]));
    } catch (error) {
      batch.forEach((item) => item.reject(error));
    }
  }
}
