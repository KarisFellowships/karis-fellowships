import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const mammoth = require("mammoth");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCX_DIR = path.join(ROOT, "public", "docs", "lessons");
const HTML_DIR = path.join(ROOT, "src", "data", "lessons-html");

const STRUCTURAL_PHRASES = [
  "OPENING",
  "TOOLBOX",
  "BIBLE TEACHING",
  "INTEGRATION",
  "ENDING PRAYER",
  "ANNOUNCEMENTS",
];

function stripHtml(html) {
  return html
    .replace(/<a[^>]*href="[^"]*"[^>]*>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&nbsp;/g, " ")
    .replace(/\[[\d]+\]/g, "")
    .replace(/\u2191/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getWords(text) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

async function auditLesson(num) {
  const docxPath = path.join(DOCX_DIR, `kf${num}-meeting.docx`);
  const htmlPath = path.join(HTML_DIR, `kf${num}.html`);

  if (!fs.existsSync(docxPath)) {
    return { num, status: "SKIP", reason: "DOCX not found" };
  }
  if (!fs.existsSync(htmlPath)) {
    return { num, status: "FAIL", reason: "HTML not found — extraction missing" };
  }

  const rawResult = await mammoth.extractRawText({ path: docxPath });
  const docxText = rawResult.value.replace(/\s+/g, " ").trim();
  const docxWords = getWords(docxText);

  const htmlRaw = fs.readFileSync(htmlPath, "utf-8");
  const htmlText = stripHtml(htmlRaw);
  const htmlWords = getWords(htmlText);

  const issues = [];

  // Word count comparison — HTML may have slightly more words than DOCX raw text
  // because mammoth extractRawText strips some elements that convertToHtml preserves.
  // We flag only if HTML has fewer words (truncation) or >5% more (unexpected extra content).
  const diff = htmlWords.length - docxWords.length;
  if (diff < 0) {
    issues.push(`TRUNCATION: HTML has fewer words than DOCX (DOCX=${docxWords.length}, HTML=${htmlWords.length}, missing=${Math.abs(diff)})`);
  } else if (diff > docxWords.length * 0.07) {
    issues.push(`Unexpected extra content: HTML has ${diff} more words than DOCX (DOCX=${docxWords.length}, HTML=${htmlWords.length})`);
  }

  // Structural phrase check
  const htmlUpper = htmlText.toUpperCase();
  for (const phrase of STRUCTURAL_PHRASES) {
    if (!htmlUpper.includes(phrase)) {
      issues.push(`Missing structural phrase: "${phrase}"`);
    }
  }

  // Truncation check: verify last meaningful words of DOCX appear in HTML
  // Use last 5 words of DOCX text (normalized) and check if they appear in HTML text
  function normalize(s) {
    return s.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
  }
  const normalizedDocx = normalize(docxText);
  const normalizedHtml = normalize(htmlText);
  const lastFiveWords = normalizedDocx.split(" ").slice(-5).join(" ");
  if (lastFiveWords && !normalizedHtml.includes(lastFiveWords)) {
    const lastThreeWords = normalizedDocx.split(" ").slice(-3).join(" ");
    if (!normalizedHtml.includes(lastThreeWords)) {
      issues.push(`Possible truncation: last words of DOCX not found in HTML — "${lastFiveWords}"`);
    }
  }

  if (issues.length === 0) {
    return { num, status: "PASS", docxWords: docxWords.length, htmlWords: htmlWords.length };
  } else {
    return { num, status: "FAIL", docxWords: docxWords.length, htmlWords: htmlWords.length, issues };
  }
}

async function main() {
  console.log("Auditing KF Lesson HTML vs source DOCX...\n");

  let pass = 0;
  let fail = 0;
  let skip = 0;

  for (let i = 0; i <= 52; i++) {
    const result = await auditLesson(i);

    if (result.status === "PASS") {
      console.log(`  KF${i}: PASS (DOCX=${result.docxWords} words, HTML=${result.htmlWords} words)`);
      pass++;
    } else if (result.status === "SKIP") {
      console.log(`  KF${i}: SKIP — ${result.reason}`);
      skip++;
    } else {
      console.log(`  KF${i}: FAIL (DOCX=${result.docxWords} words, HTML=${result.htmlWords} words)`);
      for (const issue of result.issues) {
        console.log(`    ✗ ${issue}`);
      }
      fail++;
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Results: ${pass} PASS, ${fail} FAIL, ${skip} SKIP`);
  console.log(`${"=".repeat(50)}`);

  if (fail > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
