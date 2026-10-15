import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveSafeStaticPath } from "../scripts/serve.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

test("resolveSafeStaticPath resolves valid paths and blocks directory traversal", () => {
  const base = path.resolve(rootDir, "public");
  assert.equal(resolveSafeStaticPath(base, "/robots.txt"), path.join(base, "robots.txt"));
  assert.equal(
    resolveSafeStaticPath(base, "/store/index.html?v=1"),
    path.join(base, "store", "index.html"),
  );
  assert.equal(resolveSafeStaticPath(base, "/../../etc/passwd"), null);
  assert.throws(() => resolveSafeStaticPath(base, "/%E0%A4%A"), URIError);
});

test("Public assets referenced in site.ts exist in public/", () => {
  const siteTs = fs.readFileSync(path.join(rootDir, "src/config/site.ts"), "utf8");
  const imageMatches = [...siteTs.matchAll(/\/images\/[a-z0-9._-]+/gi)].map((m) => m[0]);
  assert.ok(imageMatches.length >= 5, "Expected at least 5 /images/ paths in src/config/site.ts");

  for (const imgRef of imageMatches) {
    const diskPath = path.join(rootDir, "public", imgRef.replace(/^\/+/, ""));
    assert.ok(fs.existsSync(diskPath), `Missing public asset ${imgRef} at ${diskPath}`);
  }
});
