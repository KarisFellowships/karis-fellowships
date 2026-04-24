/**
 * One-time migration: upload swappable docs from public/docs/ to Supabase Storage.
 *
 * Usage:  node scripts/migrate-docs-to-storage.mjs
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { config } from "dotenv";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const BUCKET = "documents";

const FOLDERS_TO_MIGRATE = ["toolbox", "nhg", "other-studies", "lessons", "questions"];

const SINGLE_FILES = [
  "facilitator-guide.pdf",
  "meeting-prep-guide.pdf",
  "KF-Meeting-Schedule.pdf",
];

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 50 * 1024 * 1024,
    });
    if (error) {
      console.error("Failed to create bucket:", error.message);
      process.exit(1);
    }
    console.log(`Created bucket "${BUCKET}"`);
  } else {
    console.log(`Bucket "${BUCKET}" already exists`);
  }
}

async function uploadFile(localPath, storagePath) {
  const fileBuffer = fs.readFileSync(localPath);
  const ext = path.extname(localPath).toLowerCase();
  const mimeMap = {
    ".pdf": "application/pdf",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".doc": "application/msword",
  };
  const contentType = mimeMap[ext] || "application/octet-stream";

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, { contentType, upsert: true });

  if (error) {
    console.error(`  FAIL ${storagePath}: ${error.message}`);
    return false;
  }
  console.log(`  OK   ${storagePath}`);
  return true;
}

function walkDir(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function main() {
  await ensureBucket();

  const docsRoot = path.resolve("public/docs");
  let total = 0;
  let ok = 0;

  for (const folder of FOLDERS_TO_MIGRATE) {
    const folderPath = path.join(docsRoot, folder);
    if (!fs.existsSync(folderPath)) {
      console.log(`Skipping ${folder} (not found)`);
      continue;
    }
    console.log(`\nUploading ${folder}/...`);
    const files = walkDir(folderPath);
    for (const file of files) {
      const relative = path.relative(docsRoot, file).replace(/\\/g, "/");
      total++;
      if (await uploadFile(file, relative)) ok++;
    }
  }

  for (const file of SINGLE_FILES) {
    const filePath = path.join(docsRoot, file);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${file} (not found)`);
      continue;
    }
    console.log(`\nUploading ${file}...`);
    total++;
    const destFolder = file === "facilitator-guide.pdf" ? "facilitator" : "kf-resources";
    if (await uploadFile(filePath, `${destFolder}/${file}`)) ok++;
  }

  console.log(`\nDone: ${ok}/${total} files uploaded.`);
}

main().catch(console.error);
