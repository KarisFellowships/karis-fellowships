import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LESSONS_PATH = path.join(ROOT, "src", "data", "lessons.json");
const LESSONS_DIR = path.join(ROOT, "public", "docs", "lessons");

const lessons = JSON.parse(fs.readFileSync(LESSONS_PATH, "utf-8"));

for (let i = 0; i <= 52; i++) {
  const key = String(i);

  if (!lessons[key]) {
    lessons[key] = { number: i };
  }

  lessons[key].meetingFile = `KF10.${i} M FINI 2024z.pdf`;
  lessons[key].expandedFile = `KF10.${i} E FINI 2024z.pdf`;
  lessons[key].meetingDocx = `kf${i}-meeting.docx`;
  lessons[key].expandedDocx = `kf${i}-expanded.docx`;

  if (!lessons[key].text || lessons[key].text.trim().length === 0) {
    const txtFile = path.join(LESSONS_DIR, `kf${i}-meeting.txt`);
    if (fs.existsSync(txtFile)) {
      const rawText = fs.readFileSync(txtFile, "utf-8");
      const cleaned = rawText
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      lessons[key].text = cleaned;
      console.log(`KF${i}: Added text from .txt (${cleaned.length} chars)`);
    } else {
      console.log(`KF${i}: WARNING - no text file found`);
    }
  } else {
    console.log(`KF${i}: Text already present (${lessons[key].text.length} chars)`);
  }
}

fs.writeFileSync(LESSONS_PATH, JSON.stringify(lessons, null, 2));
console.log(`\nUpdated ${LESSONS_PATH}`);
console.log(`Total lessons: ${Object.keys(lessons).length}`);
