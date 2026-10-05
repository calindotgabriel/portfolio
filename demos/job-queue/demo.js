/**
 * The three panels on /lab/job-queue. Each button builds a fresh queue,
 * runs it with queue.js, and draws the jobs table and the event log as it goes.
 */
import { createQueue, run, MODEL } from "./queue.js";

const $ = (id) => document.getElementById(id);

const LABELS = {
  pending: "waiting",
  running: "running",
  done: "done",
  failed: "failed",
  dead: "dead",
};

function draw(prefix, queue, { showTries = false, showSent = true } = {}) {
  const table = $(`${prefix}-jobs`);
  table.innerHTML = "";
  for (const job of queue.jobs) {
    const row = document.createElement("div");
    row.className = "jq-job";

    const name = document.createElement("span");
    name.className = "jq-job-name";
    name.textContent = job.label;

    const chip = document.createElement("span");
    chip.className = `jq-chip is-${job.status}`;
    chip.textContent = LABELS[job.status];
    if (job.status === "running" && job.lockedBy) chip.textContent += ` · ${job.lockedBy}`;

    const extra = document.createElement("span");
    extra.className = "jq-job-extra";
    const bits = [];
    if (showSent) bits.push(job.sent === 1 ? "sent once" : job.sent === 0 ? "not sent" : `sent ${job.sent}×`);
    if (showTries) bits.push(`${job.attempts} ${job.attempts === 1 ? "failure" : "failures"}`);
    extra.textContent = bits.join(" · ");
    if (job.sent > 1) extra.classList.add("is-bad");

    row.append(name, chip, extra);
    table.append(row);
  }

  const log = $(`${prefix}-log`);
  log.innerHTML = "";
  for (const event of queue.events) {
    const p = document.createElement("p");
    p.className = `jq-line${event.kind ? ` is-${event.kind}` : ""}`;
    p.textContent = `${event.t.toFixed(1).padStart(5)}s  ${event.text}`;
    log.append(p);
  }
  log.scrollTop = log.scrollHeight;
}

function stats(prefix, facts) {
  const box = $(`${prefix}-stats`);
  box.innerHTML = "";
  for (const [value, label] of facts) {
    const cell = document.createElement("div");
    cell.className = "jq-stat";
    const v = document.createElement("span");
    v.className = "jq-stat-value";
    v.textContent = value;
    const l = document.createElement("span");
    l.className = "jq-stat-label";
    l.textContent = label;
    cell.append(v, l);
    box.append(cell);
  }
}

function lock(prefix, on) {
  for (const button of document.querySelectorAll(`[data-panel="${prefix}"]`)) button.disabled = on;
}

async function scenario(prefix, setup, options, summarise, drawOptions) {
  lock(prefix, true);
  $(`${prefix}-note`).textContent = "";
  $(`${prefix}-stats`).innerHTML = "";
  let queue;
  queue = createQueue(() => queue && draw(prefix, queue, drawOptions));
  try {
    setup(queue);
    const result = await run(queue, options);
    draw(prefix, queue, drawOptions);
    summarise(queue, result);
  } catch (error) {
    $(`${prefix}-note`).textContent = `Something broke: ${error.message}`;
  } finally {
    lock(prefix, false);
  }
}

// 1. Two workers grab the same job ------------------------------------------

const EMAILS = 10;

function races(claim) {
  scenario(
    "jq-race",
    (q) => {
      for (let i = 1; i <= EMAILS; i++) q.enqueue(`Email ${i}`);
    },
    { workers: 3, claim },
    (q) => {
      const sent = q.jobs.reduce((n, j) => n + j.sent, 0);
      const twice = q.jobs.filter((j) => j.sent > 1).length;
      stats("jq-race", [
        [`${EMAILS}`, "emails queued"],
        [`${sent}`, "emails sent"],
        [`${twice}`, twice === 1 ? "customer got doubles" : "customers got doubles"],
      ]);
      $("jq-race-note").textContent =
        claim === "two-step"
          ? `Every job says "done". ${sent - EMAILS} extra emails went out anyway. Run it again for a different number.`
          : `Each email went out once. No worker ever saw a job another worker had taken.`;
    },
  );
}

// 2. A job fails ------------------------------------------------------------

function failures(retry) {
  scenario(
    "jq-fail",
    (q) => {
      for (let i = 1; i <= 6; i++) q.enqueue(`Email ${i}`, { failRate: 0.7 });
    },
    { workers: 3, retry, limitSec: 40 },
    (q) => {
      const count = (s) => q.jobs.filter((j) => j.status === s).length;
      stats("jq-fail", [
        [`${count("done")}`, "sent"],
        retry ? [`${count("dead")}`, "in the dead pile"] : [`${count("failed")}`, "given up on"],
        [`${q.jobs.reduce((n, j) => n + j.attempts, 0)}`, "failures along the way"],
      ]);
      $("jq-fail-note").textContent = retry
        ? `Every job ended somewhere: sent, or on the dead pile for a person to look at. Nothing is lost silently.`
        : `The mail server fails 7 times in 10. Without a retry, most of these customers never hear from you.`;
    },
    { showTries: true },
  );
}

// 3. A worker crashes halfway through ----------------------------------------

function crash(reaper, when) {
  scenario(
    "jq-crash",
    (q) => {
      for (let i = 1; i <= 4; i++) q.enqueue(`Email ${i}`);
    },
    { workers: 2, reaper, crash: { worker: "Worker A", nth: 2, when }, limitSec: 30 },
    (q, result) => {
      const stuck = q.jobs.filter((j) => j.status === "running");
      const twice = q.jobs.filter((j) => j.sent > 1);
      stats("jq-crash", [
        [`${q.jobs.filter((j) => j.status === "done").length} of ${q.jobs.length}`, "done"],
        [`${stuck.length}`, "stuck on running"],
        [`${twice.length}`, "sent twice"],
      ]);
      let note;
      if (stuck.length) {
        note = `${stuck[0].label} still says "running", but the worker holding it is gone. Nothing will ever pick it up.`;
      } else if (twice.length) {
        note = `${twice[0].label} went out twice. The worker sent it, then died before writing "done", so the reaper put it back. This is the catch, below.`;
      } else {
        note = `The reaper put Worker A's job back after ${MODEL.VISIBILITY_SEC}s and Worker B finished it.`;
      }
      $("jq-crash-note").textContent = note;
    },
  );
}

$("jq-race-twostep").addEventListener("click", () => races("two-step"));
$("jq-race-onestep").addEventListener("click", () => races("one-step"));
$("jq-fail-giveup").addEventListener("click", () => failures(false));
$("jq-fail-retry").addEventListener("click", () => failures(true));
$("jq-crash-noreaper").addEventListener("click", () => crash(false, "before"));
$("jq-crash-reaper").addEventListener("click", () => crash(true, "before"));
$("jq-crash-after").addEventListener("click", () => crash(true, "after"));

$("jq-model").textContent =
  `The clock here runs ${1000 / MODEL.SECOND_MS}× faster than real time, and each worker takes ` +
  `${MODEL.BATCH} jobs at a time.`;
