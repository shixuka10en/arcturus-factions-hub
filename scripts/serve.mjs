import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const defaultRoot = path.resolve("C:/Users/user/.antigravity-ide/lusterni");
const root = path.resolve(process.env.SERVE_DIR || defaultRoot);
const port = parseInt(process.env.PORT || "3000", 10);

const mimes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
};

export function resolveSafeStaticPath(baseRoot, rawUrl) {
  const resolvedRoot = path.resolve(baseRoot);
  const pathname = (rawUrl || "/").split("?")[0].split("#")[0];
  const decoded = decodeURI(pathname);
  const candidate = path.resolve(resolvedRoot, "." + decoded);
  const rel = path.relative(resolvedRoot, candidate);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    return null;
  }
  return candidate;
}

const server = http.createServer((req, res) => {
  try {
    let filePath;
    try {
      filePath = resolveSafeStaticPath(root, req.url || "/");
    } catch {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Bad Request: Malformed URI");
      return;
    }

    if (!filePath) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("403 Forbidden");
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`404 Not Found: ${req.url}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimes[ext] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(`500 Internal Error: ${err.message}`);
  }
});

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  server.listen(port, "0.0.0.0", () => {
    console.log(`\nLocal static server is running:`);
    console.log(`  > Network: http://localhost:${port}/`);
    console.log(`  > Serving: ${root}\n`);
  });
}
