/**
 * A pretend database: authors and posts in memory, every lookup written to a
 * log. Each query waits a few milliseconds and needs one of a small number of
 * connections, so a flood of small queries has to queue the way it would
 * against a real connection pool. The numbers are a model, not a benchmark.
 */

const LATENCY_MS = 3;
const POOL_SIZE = 10;

export const SIZES = {
  small: { posts: 6, authors: 3 },
  medium: { posts: 100, authors: 10 },
  large: { posts: 1000, authors: 25 },
};

const NAMES = ["Ada", "Alan", "Grace", "Edsger", "Barbara", "Donald", "Margaret", "Ken", "Frances", "Dennis"];

export function createDb(size) {
  const { posts: postCount, authors: authorCount } = SIZES[size];

  const users = Array.from({ length: authorCount }, (_, i) => ({
    id: i + 1,
    name: i < NAMES.length ? NAMES[i] : `Author ${i + 1}`,
  }));

  // The 6-post case is the exact data from the Node lab: author 1 three
  // times, author 3 twice, author 2 once. Larger sizes spread authors out.
  const smallAuthors = [1, 2, 1, 3, 1, 3];
  const posts = Array.from({ length: postCount }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1}`,
    authorId: size === "small" ? smallAuthors[i] : (i % authorCount) + 1,
  }));

  const log = [];
  let free = POOL_SIZE;
  const waiting = [];

  async function query(sql, answer) {
    if (free === 0) await new Promise((resolve) => waiting.push(resolve));
    else free--;
    log.push(sql);
    try {
      await new Promise((resolve) => setTimeout(resolve, LATENCY_MS));
      return answer();
    } finally {
      const next = waiting.shift();
      if (next) next();
      else free++;
    }
  }

  return {
    log,
    getAllPosts: () => query("SELECT * FROM posts", () => posts),
    getUserById: (id) =>
      query(`SELECT * FROM users WHERE id = ${id}`, () => users.find((u) => u.id === id) ?? null),
    getUsersByIds: (ids) =>
      query(`SELECT * FROM users WHERE id IN (${ids.join(", ")})`, () => users.filter((u) => ids.includes(u.id))),
  };
}

export const MODEL = { LATENCY_MS, POOL_SIZE };
