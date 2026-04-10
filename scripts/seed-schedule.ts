/**
 * One-time script to populate the kf_schedule table in Supabase.
 * Run with: npx ts-node --esm scripts/seed-schedule.ts
 *
 * KF schedule: 52 lessons per year, each lesson = one week (Sunday to Saturday).
 * Anchor: KF Lesson 1 starts Sunday, September 7, 2025.
 * After KF52, the cycle resets to KF1 the following Sunday.
 * Covers 2021 through 2150.
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Anchor: KF1 starts Sunday September 7, 2025
const ANCHOR_DATE = new Date("2025-09-07T12:00:00Z");
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MS_PER_WEEK = 7 * MS_PER_DAY;

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

async function seed() {
  const rows: { lesson_number: number; year: number; start_date: string; end_date: string }[] = [];

  // Generate from 2021 through 2150
  const startYear = 2021;
  const endYear = 2150;

  // Find the week offset for Jan 1, 2021 relative to anchor
  const jan2021 = new Date("2021-01-03T12:00:00Z"); // First Sunday on or after Jan 1, 2021
  const weeksBeforeAnchor = Math.floor((ANCHOR_DATE.getTime() - jan2021.getTime()) / MS_PER_WEEK);

  // Work backwards to find the first Sunday <= Jan 1, 2021
  const firstSunday = new Date(ANCHOR_DATE.getTime() - weeksBeforeAnchor * MS_PER_WEEK);

  // Generate enough weeks to cover 2021-2150
  const totalWeeks = (endYear - startYear + 2) * 53;

  for (let i = 0; i < totalWeeks; i++) {
    const weekStart = new Date(firstSunday.getTime() + i * MS_PER_WEEK);
    const weekEnd = addDays(weekStart, 6);
    const year = weekStart.getUTCFullYear();

    if (year < startYear || year > endYear) continue;

    // Lesson number cycles 1-52 relative to anchor
    const weeksFromAnchor = Math.round((weekStart.getTime() - ANCHOR_DATE.getTime()) / MS_PER_WEEK);
    const lessonNumber = ((weeksFromAnchor % 52) + 52) % 52 + 1;

    rows.push({
      lesson_number: lessonNumber,
      year,
      start_date: toDateString(weekStart),
      end_date: toDateString(weekEnd),
    });
  }

  console.log(`Seeding ${rows.length} rows into kf_schedule...`);

  // Insert in batches of 500
  const batchSize = 500;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from("kf_schedule").insert(batch);
    if (error) {
      console.error(`Error inserting batch at index ${i}:`, error.message);
      process.exit(1);
    }
    console.log(`Inserted rows ${i + 1}–${Math.min(i + batchSize, rows.length)}`);
  }

  console.log("Done! kf_schedule is fully populated.");
}

seed().catch(console.error);
