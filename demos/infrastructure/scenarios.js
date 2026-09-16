/**
 * The three resources both panels build, and the one rule that governs them:
 * a firewall rule needs a network, a server needs both. This is the whole
 * dependency graph — real IaC tools resolve the same kind of thing, just
 * across hundreds of resources instead of three.
 */
export const RESOURCES = ["network", "firewall", "server"];

export const ORDER = ["network", "firewall", "server"];

export const LABELS = {
  network: 'network "main"',
  firewall: 'firewall "web"',
  server: 'server "app"',
};

const DEPENDS_ON = {
  network: [],
  firewall: ["network"],
  server: ["network", "firewall"],
};

/**
 * One attempted create against a cloud object, the way a person running
 * commands by hand would experience it: already exists, or missing a
 * dependency, or fine.
 */
export function attemptCreate(cloud, name) {
  if (cloud[name]) {
    return { ok: false, text: `Error: ${LABELS[name]} already exists.` };
  }
  const missing = DEPENDS_ON[name].find((dep) => !cloud[dep]);
  if (missing) {
    return { ok: false, text: `Error: ${LABELS[name]} needs ${LABELS[missing]} first.` };
  }
  return { ok: true, text: `Created ${LABELS[name]}.` };
}

/** Everything the desired state wants that the cloud doesn't have yet, in dependency order. */
export function planApply(cloud) {
  return ORDER.filter((name) => !cloud[name]);
}
