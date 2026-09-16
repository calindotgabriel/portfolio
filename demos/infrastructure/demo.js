/**
 * Two toy "clouds", each a plain object with three booleans: network,
 * firewall, server. No API calls, no real infrastructure — the point is the
 * mechanism, not the plumbing. See scenarios.js for the two rule sets this
 * plays against.
 */
import { RESOURCES, LABELS, attemptCreate, planApply } from "./scenarios.js";

const $ = (id) => document.getElementById(id);

const el = {
  handChips: $("iac-hand-chips"),
  handLog: $("iac-hand-log"),
  handReplay: $("iac-hand-replay"),
  handReset: $("iac-hand-reset"),
  declaredChips: $("iac-declared-chips"),
  declaredLog: $("iac-declared-log"),
  declaredApply: $("iac-declared-apply"),
  declaredDrift: $("iac-declared-drift"),
  declaredReset: $("iac-declared-reset"),
};

function emptyCloud() {
  return { network: false, firewall: false, server: false };
}

/* ------------------------------------------------------------- log lines */

function line(container, text, kind) {
  const p = document.createElement("p");
  p.className = kind ? `iac-line is-${kind}` : "iac-line";
  p.textContent = text;
  container.append(p);
  container.scrollTop = container.scrollHeight;
}

function clearLog(container) {
  container.innerHTML = "";
}

/* ---------------------------------------------------------------- chips */

function drawChips(container, cloud) {
  container.innerHTML = "";
  for (const name of RESOURCES) {
    const chip = document.createElement("span");
    chip.className = `iac-chip ${cloud[name] ? "is-up" : "is-down"}`;
    chip.textContent = `${LABELS[name]} — ${cloud[name] ? "up" : "not created"}`;
    container.append(chip);
  }
}

/* -------------------------------------------------------------- by hand */

let handCloud = emptyCloud();
let handHistory = []; // successful creates, in the order they were clicked

function handCreate(name) {
  const result = attemptCreate(handCloud, name);
  line(el.handLog, result.text, result.ok ? "ok" : "bad");
  if (result.ok) {
    handCloud[name] = true;
    handHistory.push(name);
  }
  drawChips(el.handChips, handCloud);
}

function handReplay() {
  if (handHistory.length === 0) {
    line(el.handLog, "Nothing to replay yet — create something first.", "warn");
    return;
  }
  line(el.handLog, `Running the same ${handHistory.length} notes again, in order:`, "warn");
  for (const name of handHistory) {
    const result = attemptCreate(handCloud, name);
    line(el.handLog, result.text, result.ok ? "ok" : "bad");
    if (result.ok) handCloud[name] = true;
  }
  drawChips(el.handChips, handCloud);
}

function handReset() {
  handCloud = emptyCloud();
  handHistory = [];
  clearLog(el.handLog);
  drawChips(el.handChips, handCloud);
  line(el.handLog, "Reset.", "warn");
}

/* -------------------------------------------------------------- declared */

let declaredCloud = emptyCloud();

function declaredApply() {
  const plan = planApply(declaredCloud);
  if (plan.length === 0) {
    line(el.declaredLog, "Planning… 0 to add, 0 to change, 0 to destroy.", "warn");
    line(el.declaredLog, "No changes. Infrastructure matches the config.", "ok");
    return;
  }
  line(el.declaredLog, `Planning… ${plan.length} to add, 0 to change, 0 to destroy.`, "warn");
  for (const name of plan) {
    declaredCloud[name] = true;
    line(el.declaredLog, `+ created ${LABELS[name]}`, "ok");
  }
  line(el.declaredLog, `Applied. ${plan.length} added.`, "ok");
  drawChips(el.declaredChips, declaredCloud);
}

function declaredDrift() {
  if (!declaredCloud.firewall) {
    line(el.declaredLog, "Nothing to change from outside yet — apply first.", "warn");
    return;
  }
  declaredCloud.firewall = false;
  line(el.declaredLog, 'Someone deleted firewall "web" in the console. The config still says it should exist.', "bad");
  drawChips(el.declaredChips, declaredCloud);
}

function declaredReset() {
  declaredCloud = emptyCloud();
  clearLog(el.declaredLog);
  drawChips(el.declaredChips, declaredCloud);
  line(el.declaredLog, "Reset.", "warn");
}

/* ---------------------------------------------------------------- wiring */

document.getElementById("iac-hand-server").addEventListener("click", () => handCreate("server"));
document.getElementById("iac-hand-firewall").addEventListener("click", () => handCreate("firewall"));
document.getElementById("iac-hand-network").addEventListener("click", () => handCreate("network"));
el.handReplay.addEventListener("click", handReplay);
el.handReset.addEventListener("click", handReset);

el.declaredApply.addEventListener("click", declaredApply);
el.declaredDrift.addEventListener("click", declaredDrift);
el.declaredReset.addEventListener("click", declaredReset);

drawChips(el.handChips, handCloud);
drawChips(el.declaredChips, declaredCloud);
