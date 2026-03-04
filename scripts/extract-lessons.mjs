import fs from "fs";
import path from "path";
import pdf from "pdf-parse/lib/pdf-parse.js";

const LESSONS_DIR = path.join(process.cwd(), "content", "kf-lessons");
const OUTPUT_DIR = path.join(process.cwd(), "src", "data");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs.readdirSync(LESSONS_DIR).filter((f) => f.endsWith(".pdf"));

const mFiles = files.filter((f) => f.includes(" M ") || f.includes(" M."));
const eFiles = files.filter((f) => f.includes(" E ") || f.includes(" E."));

function extractLessonNumber(filename) {
  const match = filename.match(/KF10\.(\d+)/);
  if (match) return parseInt(match[1]);
  if (filename.includes("Intro Meeting")) return -1;
  return null;
}

async function extractText(filePath) {
  const buffer = fs.readFileSync(filePath);
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (e) {
    console.error(`  Error parsing ${filePath}: ${e.message}`);
    return "";
  }
}

async function main() {
  const lessons = {};

  console.log(`Found ${mFiles.length} Meeting PDFs, ${eFiles.length} Expanded PDFs`);

  for (const mFile of mFiles) {
    const num = extractLessonNumber(mFile);
    if (num === null) continue;

    console.log(`Extracting KF${num} from ${mFile}...`);
    const text = await extractText(path.join(LESSONS_DIR, mFile));

    const eFile = eFiles.find((f) => {
      const eNum = extractLessonNumber(f);
      return eNum === num;
    });

    lessons[num] = {
      number: num,
      meetingFile: mFile,
      expandedFile: eFile || null,
      text: text.trim(),
    };
  }

  const sortedKeys = Object.keys(lessons)
    .map(Number)
    .sort((a, b) => a - b);
  const sortedLessons = {};
  for (const k of sortedKeys) {
    sortedLessons[k] = lessons[k];
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "lessons.json"),
    JSON.stringify(sortedLessons, null, 2)
  );

  console.log(`\nExtracted ${Object.keys(sortedLessons).length} lessons to src/data/lessons.json`);
}

main().catch(console.error);
