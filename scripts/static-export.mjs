import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const publicOutput = resolve(projectRoot, ".output/public");
const serverEntry = await import(
  pathToFileURL(resolve(projectRoot, ".output/server/index.mjs")).href
);
const handler = serverEntry.default;

const pages = [
  { requestPath: "/", outputPath: "index.html" },
  { requestPath: "/vote", outputPath: "vote/index.html" },
  { requestPath: "/votes", outputPath: "votes/index.html" },
  { requestPath: "/404", outputPath: "404.html" },
];

for (const page of pages) {
  const response = await handler.fetch(
    new Request(`https://www.arcturusmc.org${page.requestPath}`),
    {},
    { waitUntil() {} },
  );

  if (!response.ok) {
    throw new Error(`Static export failed for ${page.requestPath}: ${response.status}`);
  }

  const outputFile = resolve(publicOutput, page.outputPath);
  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, await response.text(), "utf8");
  console.log(`static export: ${page.requestPath} -> ${outputFile}`);
}
