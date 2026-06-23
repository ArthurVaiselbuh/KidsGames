// Build the Capacitor web bundle: copy the root launcher + every game folder
// into www/ (Capacitor's webDir). Uses only Node built-ins — no dependencies.
//
//   node scripts/build-www.mjs   (or: npm run build)
import { existsSync, rmSync, mkdirSync, cpSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const www = join(root, "www");

// The five game folders + the launcher entry point.
const GAME_DIRS = ["ChaosWords", "FallingPlates", "MathBakery", "MemoryLane", "ParkTheCar"];
const LAUNCHER = "index.html";

// Start from a clean www/ so removed files don't linger in the bundle.
rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });

copyFileSync(join(root, LAUNCHER), join(www, LAUNCHER));
for (const dir of GAME_DIRS) {
  const src = join(root, dir);
  if (!existsSync(src)) {
    console.error(`build-www: missing game folder "${dir}" — aborting.`);
    process.exit(1);
  }
  cpSync(src, join(www, dir), { recursive: true });
}

console.log(`build-www: wrote launcher + ${GAME_DIRS.length} games to www/`);
