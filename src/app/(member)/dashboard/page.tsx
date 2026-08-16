import { getCurrentLesson, getAllLessons } from "@/lib/date-engine";
import { getMeetingCodes, phoneNumber, kfMeetings } from "@/lib/meeting-codes";
import { requireKF } from "@/lib/require-tier";
import DashboardView from "./DashboardView";

export default async function DashboardPage() {
  await requireKF();
  const currentLesson = await getCurrentLesson();
  const allLessons = await getAllLessons();
  const codes = await getMeetingCodes();
  const callPhone = phoneNumber(codes);
  const meetings = kfMeetings(codes);
  const lessonMap = new Map(allLessons.map((l) => [l.lessonNumber, l]));

  // Build recent lessons: the 6 lessons immediately before the current week
  const recent: { n: number; dateRange: string | null }[] = [];
  for (let i = 1; i <= 6; i++) {
    let num = currentLesson.lessonNumber - i;
    if (num < 0) num += 53; // wrap around (KF0-KF52 = 53 lessons)
    recent.push({ n: num, dateRange: lessonMap.get(num)?.dateRange ?? null });
  }

  return (
    <DashboardView
      lessonNumber={currentLesson.lessonNumber}
      dateRange={currentLesson.dateRange}
      callPhone={callPhone}
      meetings={meetings}
      recent={recent}
    />
  );
}
