import { readFileSync, writeFileSync, mkdirSync, chmodSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(dir, "entry.txt"), "utf8");
// The forecast must be a real line, not blank: fail loudly rather than
// shipping an empty entry.
if (text.trim().length === 0) {
  throw new Error("entry.txt is empty");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(dir, "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");
chmodSync(outPath, 0o644);
