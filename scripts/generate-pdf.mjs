import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, existsSync, copyFileSync } from "node:fs";
import { resolve, join, extname, dirname } from "node:path";
import { homedir } from "node:os";

const DIST = resolve("dist");
const PDF_TARGETS = [
  { route: "/resume/", filename: "cv.pdf" },
  { route: "/resume-dossier/", filename: "cv-runtime-dossier.pdf" },
];

const cvSyncConfig = JSON.parse(readFileSync(resolve("cv-sync.config.json"), "utf8"));
const CV_SYNC_PATH = cvSyncConfig.syncPath.replace(/^~/, homedir());

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

// Simple static file server for the dist directory
function serve() {
  return new Promise((res) => {
    const server = createServer((req, resp) => {
      let pathname = new URL(req.url, "http://localhost").pathname;
      if (pathname.endsWith("/")) pathname += "index.html";

      const file = join(DIST, pathname);
      if (!existsSync(file)) {
        resp.writeHead(404);
        resp.end();
        return;
      }

      const ext = extname(file);
      resp.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      resp.end(readFileSync(file));
    });

    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      res({ server, port });
    });
  });
}

async function main() {
  console.log("Generating CV PDF...");

  const { server, port } = await serve();

  const browser = await chromium.launch();
  for (const target of PDF_TARGETS) {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}${target.route}`, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: join(DIST, target.filename),
      format: "A4",
      printBackground: true,
      tagged: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });
    await page.close();
    console.log(`CV PDF generated at ${join(DIST, target.filename)}`);
  }

  await browser.close();
  server.close();

  if (existsSync(dirname(CV_SYNC_PATH))) {
    copyFileSync(join(DIST, "cv.pdf"), CV_SYNC_PATH);
    console.log(`Synced to ${CV_SYNC_PATH}`);
  }
}

main().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
