/**
 * A pretend jobs table and the workers that poll it.
 *
 * Mirrors study/sysdesign/job-scheduler/after.ts, but in memory. Every query
 * waits a short random time, like a round trip to the database would. The
 * one thing that matters is where those waits sit:
 *
 *  - claimTwoStep() reads the due jobs, waits, then marks them running.
 *    Another worker can read the same jobs inside that wait.
 *  - claimOneStep() picks and marks the jobs at a single instant, then waits.
 *    That is what `UPDATE ... WHERE id IN (SELECT ... FOR UPDATE SKIP LOCKED)`
 *    does inside Postgres.
 *
 * The clock is shown in model seconds and runs faster than real time.
 */

export const MODEL = {
  SECOND_MS: 200, // one model second lasts this many real milliseconds
  QUERY_MS: [15, 45],
  POLL_MS: 80,
  BATCH: 2,
  VISIBILITY_SEC: 10,
  REAPER_SEC: 1,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const roundTrip = () =>
  sleep(MODEL.QUERY_MS[0] + Math.random() * (MODEL.QUERY_MS[1] - MODEL.QUERY_MS[0]));

export function createQueue(onChange = () => {}) {
  const start = performance.now();
  const jobs = [];
  const events = [];
  let nextId = 1;

  const now = () => performance.now();
  const clock = () => (now() - start) / MODEL.SECOND_MS;

  function log(text, kind = "") {
    events.push({ t: clock(), text, kind });
    onChange();
  }

  function enqueue(label, { delaySec = 0, maxAttempts = 3, failRate = 0 } = {}) {
    jobs.push({
      id: nextId++,
      label,
      status: "pending",
      runAt: now() + delaySec * MODEL.SECOND_MS,
      attempts: 0,
      maxAttempts,
      failRate,
      lockedAt: null,
      lockedBy: null,
      sent: 0,
    });
    onChange();
  }

  const due = () => jobs.filter((j) => j.status === "pending" && j.runAt <= now());

  function mark(job, worker) {
    job.status = "running";
    job.lockedAt = now();
    job.lockedBy = worker;
  }

  // SELECT ... LIMIT n, then a separate UPDATE ... SET status = 'running'.
  async function claimTwoStep(worker) {
    await roundTrip();
    const rows = due().slice(0, MODEL.BATCH);
    if (rows.length === 0) return [];
    await roundTrip();
    for (const job of rows) mark(job, worker);
    onChange();
    return rows;
  }

  // One statement: pick and mark in the same instant.
  async function claimOneStep(worker) {
    const rows = due().slice(0, MODEL.BATCH);
    for (const job of rows) mark(job, worker);
    if (rows.length) onChange();
    await roundTrip();
    return rows;
  }

  async function complete(job) {
    await roundTrip();
    job.status = "done";
    job.lockedBy = null;
    onChange();
  }

  async function fail(job, retry) {
    await roundTrip();
    job.attempts++;
    job.lockedBy = null;
    if (!retry) {
      job.status = "failed";
      log(`${job.label} failed. Nobody will try it again.`, "bad");
    } else if (job.attempts < job.maxAttempts) {
      // Same formula as after.ts: 2^attempts seconds, capped, plus jitter.
      const waitSec = Math.min(2 ** job.attempts, 60) + Math.random();
      job.status = "pending";
      job.runAt = now() + waitSec * MODEL.SECOND_MS;
      log(`${job.label} failed (try ${job.attempts}). Trying again in ${waitSec.toFixed(1)}s.`);
    } else {
      job.status = "dead";
      log(`${job.label} failed ${job.attempts} times. Moved to the dead pile.`, "bad");
    }
    onChange();
  }

  // UPDATE jobs SET status = 'pending' WHERE status = 'running'
  //   AND locked_at < now() - visibility timeout
  function reap() {
    const limit = now() - MODEL.VISIBILITY_SEC * MODEL.SECOND_MS;
    for (const job of jobs) {
      if (job.status === "running" && job.lockedAt < limit) {
        job.status = "pending";
        job.lockedBy = null;
        log(`Reaper: ${job.label} has said "running" for ${MODEL.VISIBILITY_SEC}s. Back in the queue.`, "warn");
      }
    }
  }

  return { jobs, events, clock, log, enqueue, claimTwoStep, claimOneStep, complete, fail, reap };
}

/**
 * Runs workers and an optional reaper until every job has finished, or until
 * `limitSec` model seconds pass with nothing left that could change.
 *
 * options:
 *   workers  number of workers
 *   claim    "two-step" | "one-step"
 *   retry    retry failed jobs with backoff, or give up on the first failure
 *   reaper   run the reaper loop
 *   crash    { worker, nth, when: "before" | "after" } — that worker dies on
 *            its nth job, before or after the email goes out
 */
export async function run(queue, options) {
  const { workers = 3, claim = "one-step", retry = true, reaper = false, crash = null, limitSec = 30 } = options;
  const finished = () => queue.jobs.every((j) => ["done", "dead", "failed"].includes(j.status));
  const stuck = () => queue.jobs.some((j) => j.status === "running") && !reaper;
  let stop = false;
  const alive = new Set();

  async function worker(name) {
    alive.add(name);
    let taken = 0;
    while (!stop) {
      const rows = claim === "two-step" ? await queue.claimTwoStep(name) : await queue.claimOneStep(name);
      if (rows.length === 0) {
        await sleep(MODEL.POLL_MS);
        continue;
      }
      for (const job of rows) {
        taken++;
        const crashHere = crash && crash.worker === name && crash.nth === taken;
        if (crashHere && crash.when === "before") {
          queue.log(`${name} crashed while holding ${job.label}.`, "bad");
          alive.delete(name);
          return;
        }
        await sleep(40); // the handler doing its work
        if (Math.random() < job.failRate) {
          await queue.fail(job, retry);
          continue;
        }
        job.sent++;
        queue.log(
          `${name} sent ${job.label}${job.sent > 1 ? ` (${job.sent}× now)` : ""}.`,
          job.sent > 1 ? "bad" : "",
        );
        if (crashHere && crash.when === "after") {
          queue.log(`${name} crashed after sending ${job.label}, before marking it done.`, "bad");
          alive.delete(name);
          return;
        }
        await queue.complete(job);
      }
    }
  }

  async function reaperLoop() {
    while (!stop) {
      queue.reap();
      await sleep(MODEL.REAPER_SEC * MODEL.SECOND_MS);
    }
  }

  async function watch() {
    let quietSince = null;
    while (!stop) {
      await sleep(50);
      if (finished()) stop = true;
      else if (queue.clock() > limitSec) stop = true;
      else if (stuck() && queue.jobs.every((j) => j.status !== "pending")) {
        // Only a "running" job no living worker holds is left, and no reaper will free it.
        quietSince ??= queue.clock();
        if (queue.clock() - quietSince > 6) stop = true;
      }
    }
  }

  const names = Array.from({ length: workers }, (_, i) => `Worker ${String.fromCharCode(65 + i)}`);
  await Promise.all([...names.map(worker), reaper ? reaperLoop() : null, watch()]);
  return { finished: finished(), alive: [...alive] };
}
