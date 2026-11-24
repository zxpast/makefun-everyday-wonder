// Everyday Wonder, Two Days to Find the Line
// Entry: a single sentence (<=200 characters) written to /output/entry.txt.
// Constant writer: deterministic, stdlib only, no network, no Date, no random.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "At 3 a.m. the fridge hummed a note so low the cat sat up, tilted her head, and answered it in the same key.";

// Self-check enforcing the competition gate:
// - UTF-8 text, 1 to 200 characters counted as code points
// - not only whitespace
// - a single sentence (one line, no newline, ends with one full stop,
//   no other sentence-ending punctuation)
function selfCheck(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`gate fail: ${chars.length} characters, need 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate fail: entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate fail: entry must be a single line");
  }
  if (!text.endsWith(".")) {
    throw new Error("gate fail: entry must end with a full stop");
  }
  if (text.includes("  ")) {
    throw new Error("gate fail: entry must not contain a double space");
  }
  if (text.includes("!") || text.includes("?")) {
    throw new Error("gate fail: entry must be a single sentence");
  }
}

selfCheck(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
// Read-back: the written bytes must be exactly the entry, no trailing
// newline or encoding surprise.
if (readFileSync("/output/entry.txt", "utf8") !== ENTRY) {
  throw new Error("gate fail: written entry differs from ENTRY");
}
