import { rm } from "node:fs/promises";
import { join } from "node:path";

const adminDir = join(process.cwd(), "dist", "admin");
const adminHtml = join(process.cwd(), "dist", "admin.html");

await Promise.all([
  rm(adminDir, { recursive: true, force: true }),
  rm(adminHtml, { force: true }),
]);

console.log("Pruned local-only admin route from dist.");
