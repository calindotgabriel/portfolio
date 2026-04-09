import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { resolve, join, extname } from "node:path";

const DIST = resolve("dist");
const OUT = join(DIST, "cv.pdf");

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
  const page = await browser.newPage();

  await page.goto(`http://127.0.0.1:${port}/resume/`, {
    waitUntil: "networkidle",
  });

  await page.pdf({
    path: OUT,
    format: "A4",
    printBackground: true,
    margin: { top: "15mm", bottom: "15mm", left: "15mm", right: "15mm" },
  });

  await browser.close();
  server.close();

  console.log(`CV PDF generated at ${OUT}`);
}

main().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
