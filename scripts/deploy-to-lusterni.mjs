import { cp, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const publicOutput = resolve(projectRoot, ".output/public");

// Default deployment target: lusterni directory
const lusterniDir = process.env.DEPLOY_DIR || resolve("C:/Users/user/.antigravity-ide/lusterni");

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function cleanLusterni() {
  console.log(`\n--- Cleaning deployment directory: ${lusterniDir} ---`);

  // Unwanted directories & files from previous Lovable / accidential installs
  const cleanupPaths = ["__l5e", "about", "node_modules", ".vite", "package-lock.json", "assets"];

  for (const item of cleanupPaths) {
    const target = join(lusterniDir, item);
    if (await exists(target)) {
      console.log(`Removing stale item: ${item}`);
      await rm(target, { recursive: true, force: true });
    }
  }
}

async function syncFiles() {
  console.log(`\n--- Syncing production build from ${publicOutput} to ${lusterniDir} ---`);

  if (!(await exists(publicOutput))) {
    throw new Error(
      `Build output directory not found: ${publicOutput}. Run 'npm run build' first.`,
    );
  }

  // Copy everything from .output/public to lusterni
  await cp(publicOutput, lusterniDir, { recursive: true, force: true });

  // Ensure CNAME exists
  const cnamePath = join(lusterniDir, "CNAME");
  if (!(await exists(cnamePath))) {
    await writeFile(cnamePath, "www.arcturusmc.org\n", "utf8");
    console.log("Created CNAME with www.arcturusmc.org");
  }

  // Ensure .nojekyll exists
  const nojekyllPath = join(lusterniDir, ".nojekyll");
  if (!(await exists(nojekyllPath))) {
    await writeFile(nojekyllPath, "", "utf8");
    console.log("Created .nojekyll");
  }

  console.log("Deployment sync complete!");
}

async function main() {
  try {
    await cleanLusterni();
    await syncFiles();
  } catch (err) {
    console.error("Deploy failed:", err);
    process.exit(1);
  }
}

main();
