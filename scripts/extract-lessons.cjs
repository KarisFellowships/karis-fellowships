const fs = require("fs");
const path = require("path");

const LESSONS_DIR = path.join(__dirname, "..", "content", "kf-lessons");
const QUESTIONS_DIR = path.join(__dirname, "..", "content", "kf-questions");
const OUTPUT_DIR = path.join(__dirname, "..", "src", "data");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function extractText(filePath) {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await pdfjsLib.getDocument({ url: filePath, useSystemFonts: true }).promise;
  let fullText = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str);
    fullText += strings.join(" ") + "\n\n";
  }
  return fullText.trim();
}

function extractLessonNumber(filename) {
  const match = filename.match(/KF10\.(\d+)/);
  if (match) return parseInt(match[1]);
  return null;
}

async function main() {
  const lessonFiles = fs.readdirSync(LESSONS_DIR).filter((f) => f.endsWith(".pdf"));
  const questionFiles = fs.existsSync(QUESTIONS_DIR)
    ? fs.readdirSync(QUESTIONS_DIR).filter((f) => f.endsWith(".pdf"))
    : [];

  const mFiles = lessonFiles.filter((f) => / M /.test(f));
  const eFiles = lessonFiles.filter((f) => / E /.test(f));

  console.log("Found " + mFiles.length + " Meeting PDFs, " + eFiles.length + " Expanded PDFs, " + questionFiles.length + " Question PDFs");

  const lessons = {};

  for (const mFile of mFiles) {
    const num = extractLessonNumber(mFile);
    if (num === null) continue;

    process.stdout.write("KF" + num + "... ");
    let text = "";
    try {
      text = await extractText(path.join(LESSONS_DIR, mFile));
      process.stdout.write("OK (" + text.length + " chars)\n");
    } catch (e) {
      process.stdout.write("ERROR: " + e.message + "\n");
    }

    const eFile = eFiles.find((f) => extractLessonNumber(f) === num) || null;
    const qFile = questionFiles.find((f) => extractLessonNumber(f) === num) || null;

    lessons[num] = {
      number: num,
      meetingFile: mFile,
      expandedFile: eFile,
      questionsFile: qFile,
      text: text,
    };
  }

  const sortedKeys = Object.keys(lessons).map(Number).sort((a, b) => a - b);
  const sortedLessons = {};
  for (const k of sortedKeys) {
    sortedLessons[k] = lessons[k];
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "lessons.json"),
    JSON.stringify(sortedLessons, null, 2)
  );

  console.log("\nDone! Extracted " + sortedKeys.length + " lessons to src/data/lessons.json");
}

main().catch(console.error);
