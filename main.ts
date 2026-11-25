// One Star for Monday — a one-star review of Monday, written as if Monday
// were a restaurant. The program writes the single review line to
// <MAKEFUN_OUTPUT_DIR>/entry.txt (defaults to ./out) and self-checks the
// competition gates before writing: one line, 1-180 characters, at most
// 25 words, plain text with no hashtags or stage directions.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review: the diner ordered the weekend and got Monday served instead.
// Dish gone wrong (cold, undercooked Monday), bill gone wrong (four more
// days attached) — a complaint that could only be about Monday. The
// semicolon gives the line a clipped two-beat review rhythm: the order,
// then what actually arrived.
const LINE =
  "One star. I ordered the weekend; they served Monday instead — cold, undercooked, and the bill came with four more days attached.";

function check(line: string): void {
  const words = line.trim().split(/\s+/).filter(Boolean);
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.length < 1 || line.length > 180) {
    throw new Error(`entry is ${line.length} chars, gate is 1-180`);
  }
  if (words.length > 25) {
    throw new Error(`entry is ${words.length} words, gate is at most 25`);
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
check(LINE);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(
  `wrote entry.txt (${LINE.length} chars, ${LINE.trim().split(/\s+/).length} words)`
);
