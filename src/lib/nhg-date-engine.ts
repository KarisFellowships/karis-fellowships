import { createServerClient } from "./supabase-server";
import { todayCentral } from "./today-central";

export interface NHGWeek {
  weekNumber: number;
  label: string;
  startDate: string;
  endDate: string;
  dateRange: string;
}

export interface NHGStatus {
  active: boolean;
  currentWeek: NHGWeek | null;
  nextWeek: NHGWeek | null;
  schedule: NHGWeek[];
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

function toNHGWeek(row: { week_number: number; label: string; start_date: string; end_date: string }): NHGWeek {
  return {
    weekNumber: row.week_number,
    label: row.label,
    startDate: row.start_date,
    endDate: row.end_date,
    dateRange: formatDateRange(row.start_date, row.end_date),
  };
}

export async function getNHGStatus(): Promise<NHGStatus> {
  const today = todayCentral();

  try {
    const supabase = await createServerClient();

    const { data: currentData } = await supabase
      .from("nhg_schedule")
      .select("week_number, label, start_date, end_date")
      .lte("start_date", today)
      .gte("end_date", today)
      .single();

    const { data: nextData } = await supabase
      .from("nhg_schedule")
      .select("week_number, label, start_date, end_date")
      .gt("start_date", today)
      .order("start_date", { ascending: true })
      .limit(1)
      .single();

    // Get the full schedule for the upcoming or current study year
    const targetYear = currentData
      ? new Date(currentData.start_date + "T12:00:00Z").getUTCFullYear()
      : nextData
        ? new Date(nextData.start_date + "T12:00:00Z").getUTCFullYear()
        : new Date().getUTCFullYear();

    const { data: scheduleData } = await supabase
      .from("nhg_schedule")
      .select("week_number, label, start_date, end_date")
      .eq("year", targetYear)
      .order("week_number", { ascending: true });

    return {
      active: !!currentData,
      currentWeek: currentData ? toNHGWeek(currentData) : null,
      nextWeek: nextData ? toNHGWeek(nextData) : null,
      schedule: (scheduleData || []).map(toNHGWeek),
    };
  } catch {
    return { active: false, currentWeek: null, nextWeek: null, schedule: [] };
  }
}
