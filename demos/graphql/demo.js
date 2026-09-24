/**
 * Runs the same query twice against the pretend database in db.js: once with
 * a resolver that looks each author up on its own, once through TinyLoader.
 *
 * execute() is not graphql-js. It walks this one query in the same order
 * graphql-js does: resolve the list, then call the field resolver once per
 * item, all in the same turn, and wait for them together. That order is the
 * whole reason batching works, so it is kept exactly.
 */
import { createDb, MODEL } from "./db.js";
import { TinyLoader } from "./loader.js";

const $ = (id) => document.getElementById(id);
const SHOWN = 8;

async function execute(resolvers, ctx) {
  const posts = await resolvers.Query.posts(ctx);
  return Promise.all(
    posts.map(async (post) => {
      const author = await resolvers.Post.author(post, {}, ctx);
      return { id: post.id, title: post.title, author: author && { name: author.name } };
    }),
  );
}

const naive = {
  Query: { posts: (ctx) => ctx.db.getAllPosts() },
  Post: { author: (post, _args, ctx) => ctx.db.getUserById(post.authorId) },
};

const batched = {
  Query: { posts: (ctx) => ctx.db.getAllPosts() },
  Post: { author: (post, _args, ctx) => ctx.loaders.user.load(post.authorId) },
};

function createLoaders(db) {
  return {
    user: new TinyLoader(async (ids) => {
      const rows = await db.getUsersByIds(ids);
      const byId = new Map(rows.map((row) => [row.id, row]));
      return ids.map((id) => byId.get(id) ?? null);
    }),
  };
}

function render(prefix, db, ms, postCount) {
  const seen = new Set();
  let repeats = 0;
  const lines = db.log.map((sql) => {
    const repeat = seen.has(sql);
    if (repeat) repeats++;
    seen.add(sql);
    return { sql, repeat };
  });

  const stats = $(`${prefix}-stats`);
  stats.innerHTML = "";
  const facts = [
    [`${db.log.length}`, db.log.length === 1 ? "query" : "queries"],
    [`${repeats}`, repeats === 1 ? "repeat" : "repeats"],
    [`${Math.round(ms)} ms`, "in this model"],
  ];
  for (const [value, label] of facts) {
    const cell = document.createElement("div");
    cell.className = "gql-stat";
    const v = document.createElement("span");
    v.className = "gql-stat-value";
    v.textContent = value;
    const l = document.createElement("span");
    l.className = "gql-stat-label";
    l.textContent = label;
    cell.append(v, l);
    stats.append(cell);
  }

  const log = $(`${prefix}-log`);
  log.innerHTML = "";
  for (const { sql, repeat } of lines.slice(0, SHOWN)) {
    const p = document.createElement("p");
    p.className = repeat ? "gql-line is-repeat" : "gql-line";
    p.textContent = repeat ? `${sql}   ← again` : sql;
    log.append(p);
  }
  if (lines.length > SHOWN) {
    const p = document.createElement("p");
    p.className = "gql-line is-more";
    p.textContent = `… and ${lines.length - SHOWN} more`;
    log.append(p);
  }

  const note = $(`${prefix}-note`);
  note.textContent = `${postCount} posts, ${db.log.length} trips to the database.`;
}

async function run(mode) {
  const size = $("gql-size").value;
  const db = createDb(size);
  const ctx = mode === "naive" ? { db } : { db, loaders: createLoaders(db) };
  const button = $(`gql-${mode}-run`);
  button.disabled = true;
  try {
    const start = performance.now();
    const result = await execute(mode === "naive" ? naive : batched, ctx);
    render(`gql-${mode}`, db, performance.now() - start, result.length);
  } catch (error) {
    $(`gql-${mode}-log`).textContent = `Something broke: ${error.message}`;
  } finally {
    button.disabled = false;
  }
}

$("gql-naive-run").addEventListener("click", () => run("naive"));
$("gql-batched-run").addEventListener("click", () => run("batched"));
$("gql-size").addEventListener("change", () => {
  run("naive");
  run("batched");
});

$("gql-model").textContent =
  `Each query in this model waits ${MODEL.LATENCY_MS} ms and needs one of ${MODEL.POOL_SIZE} connections.`;
