import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const mammoth = require("mammoth");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCX_DIR = path.join(ROOT, "public", "docs", "lessons");
const OUT_DIR = path.join(ROOT, "src", "data", "lessons-html");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function convertLesson(num) {
  const docxPath = path.join(DOCX_DIR, `kf${num}-meeting.docx`);
  if (!fs.existsSync(docxPath)) {
    console.warn(`  KF${num}: DOCX not found — skipping`);
    return false;
  }

  const result = await mammoth.convertToHtml(
    { path: docxPath },
    {
      styleMap: [
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='List Paragraph'] => p:fresh",
        "p[style-name='Normal (Web)'] => p:fresh",
        "r[style-name='Emphasis'] => em:fresh",
        "r[style-name='wordsofchrist'] => em:fresh",
      ],
    }
  );

  const html = result.value;
  const outPath = path.join(OUT_DIR, `kf${num}.html`);
  fs.writeFileSync(outPath, html, "utf-8");

  const warnings = result.messages.filter((m) => m.type === "warning");
  const wordCount = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  if (warnings.length > 0) {
    console.log(`  KF${num}: ${wordCount} words, ${warnings.length} warning(s)`);
    for (const w of warnings.slice(0, 3)) {
      console.log(`    - ${w.message}`);
    }
    if (warnings.length > 3) console.log(`    ... and ${warnings.length - 3} more`);
  } else {
    console.log(`  KF${num}: ${wordCount} words — OK`);
  }

  return true;
}

async function main() {
  console.log("Extracting KF Meeting DOCX files to HTML...\n");

  let success = 0;
  let failed = 0;

  for (let i = 0; i <= 52; i++) {
    try {
      const ok = await convertLesson(i);
      if (ok) success++;
      else failed++;
    } catch (e) {
      console.error(`  KF${i}: ERROR — ${e.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${success} converted, ${failed} failed`);
  console.log(`Output: ${OUT_DIR}`);
}

main().catch(console.error);
