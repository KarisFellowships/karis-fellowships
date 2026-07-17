import { createServerClient } from "./supabase-server";
import { todayCentral } from "./today-central";

export interface CurrentLesson {
  lessonNumber: number;
  startDate: string;
  endDate: string;
  dateRange: string;
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start + "T12:00:00Z");
  const e = new Date(end + "T12:00:00Z");
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  if (s.getUTCMonth() === e.getUTCMonth()) {
    return `${months[s.getUTCMonth()]} ${s.getUTCDate()} – ${e.getUTCDate()}, ${e.getUTCFullYear()}`;
  }
  return `${months[s.getUTCMonth()]} ${s.getUTCDate()} – ${months[e.getUTCMonth()]} ${e.getUTCDate()}, ${e.getUTCFullYear()}`;
}

export async function getCurrentLesson(): Promise<CurrentLesson> {
  const today = todayCentral();

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("kf_schedule")
      .select("lesson_number, start_date, end_date")
      .lte("start_date", today)
      .gte("end_date", today)
      .order("start_date", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return getFallbackLesson(today);
    }

    return {
      lessonNumber: data.lesson_number,
      startDate: data.start_date,
      endDate: data.end_date,
      dateRange: formatDateRange(data.start_date, data.end_date),
    };
  } catch {
    return getFallbackLesson(today);
  }
}

export async function getAllLessons(): Promise<CurrentLesson[]> {
  try {
    const supabase = await createServerClient();
    const today = todayCentral();
    const year = new Date().getUTCFullYear();

    const { data, error } = await supabase
      .from("kf_schedule")
      .select("lesson_number, start_date, end_date")
      .gte("start_date", `${year - 1}-06-01`)
      .lte("start_date", `${year + 1}-06-01`)
      .order("start_date", { ascending: true });

    if (error || !data || data.length === 0) {
      return [];
    }

    // Find the cycle closest to today: pick rows whose start_date is nearest
    const todayTime = new Date(today + "T12:00:00Z").getTime();
    let bestCycleStart = 0;
    let bestDistance = Infinity;

    // Group by cycles of ~53 consecutive rows (KF0-KF52)
    // Find the row for lesson 0 or 1 that is closest to today
    for (const row of data) {
      if (row.lesson_number <= 1) {
        const rowTime = new Date(row.start_date + "T12:00:00Z").getTime();
        const dist = Math.abs(rowTime - todayTime);
        if (dist < bestDistance) {
          bestDistance = dist;
          bestCycleStart = rowTime;
        }
      }
    }

    // Filter to the cycle that contains the best start
    const msPerYear = 365 * 24 * 60 * 60 * 1000;
    const cycleRows = data.filter((row) => {
      const rowTime = new Date(row.start_date + "T12:00:00Z").getTime();
      return Math.abs(rowTime - bestCycleStart) < msPerYear;
    });

    // Deduplicate by lesson_number (keep the one closest to today)
    const byLesson = new Map<number, typeof data[0]>();
    for (const row of cycleRows) {
      const existing = byLesson.get(row.lesson_number);
      if (!existing) {
        byLesson.set(row.lesson_number, row);
      } else {
        const existDist = Math.abs(new Date(existing.start_date + "T12:00:00Z").getTime() - todayTime);
        const newDist = Math.abs(new Date(row.start_date + "T12:00:00Z").getTime() - todayTime);
        if (newDist < existDist) {
          byLesson.set(row.lesson_number, row);
        }
      }
    }

    return Array.from(byLesson.values())
      .sort((a, b) => a.lesson_number - b.lesson_number)
      .map((row) => ({
        lessonNumber: row.lesson_number,
        startDate: row.start_date,
        endDate: row.end_date,
        dateRange: formatDateRange(row.start_date, row.end_date),
      }));
  } catch {
    return [];
  }
}

function getFallbackLesson(today: string): CurrentLesson {
  // Graceful-degradation only (used if the DB is unreachable). Anchor reconciled
  // with the live kf_schedule: the week of 2025-09-07 is KF25, not KF1.
  const anchor = new Date("2025-09-07T12:00:00Z");
  const anchorLesson = 25;
  const current = new Date(today + "T12:00:00Z");
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksSinceAnchor = Math.floor((current.getTime() - anchor.getTime()) / msPerWeek);
  const lessonNumber = (((anchorLesson - 1 + weeksSinceAnchor) % 52) + 52) % 52 + 1;
  const weekStart = new Date(anchor.getTime() + Math.floor(weeksSinceAnchor) * msPerWeek);
  const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
  const startStr = weekStart.toISOString().split("T")[0];
  const endStr = weekEnd.toISOString().split("T")[0];
  return {
    lessonNumber,
    startDate: startStr,
    endDate: endStr,
    dateRange: formatDateRange(startStr, endStr),
  };
}
