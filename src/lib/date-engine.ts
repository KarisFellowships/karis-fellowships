import { createServerClient } from "./supabase-server";

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
  const today = new Date().toISOString().split("T")[0];

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("kf_schedule")
      .select("lesson_number, start_date, end_date")
      .lte("start_date", today)
      .gte("end_date", today)
      .single();

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

function getFallbackLesson(today: string): CurrentLesson {
  // Anchor: KF1 week starts 2025-09-07 (Sunday)
  const anchor = new Date("2025-09-07T12:00:00Z");
  const current = new Date(today + "T12:00:00Z");
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksSinceAnchor = Math.floor((current.getTime() - anchor.getTime()) / msPerWeek);
  const lessonNumber = ((weeksSinceAnchor % 52) + 52) % 52 + 1;
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
