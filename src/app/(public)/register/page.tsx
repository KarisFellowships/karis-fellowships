import PageHeader from "@/components/PageHeader";
import RegisterClient from "./RegisterClient";
import { getNHGStatus } from "@/lib/nhg-date-engine";

export default async function RegisterPage() {
  const nhgStatus = await getNHGStatus();

  const schedule = nhgStatus.schedule;
  const introWeek = schedule.find((w) => w.weekNumber === 0) || null;
  const weeklyStart = schedule.find((w) => w.weekNumber === 1) || null;
  const lastChapterWeek = schedule.find((w) => w.weekNumber === 8) || null;
  const weekendIntensive = schedule.find((w) => w.weekNumber === 9) || null;
  const studyEnd = weekendIntensive || lastChapterWeek;

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr + "T12:00:00Z");
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  }

  const dateInfo = introWeek && studyEnd ? {
    introMeeting: formatDate(introWeek.startDate),
    studyEnd: formatDate(studyEnd.endDate),
    weeklyStart: weeklyStart ? formatDate(weeklyStart.startDate) : null,
    weekendIntensive: weekendIntensive ? formatDate(weekendIntensive.startDate) : null,
  } : null;

  return (
    <>
      <PageHeader
        title="Register for the NHG Book Study"
        subtitle="Your first step is to participate in the Neurosis and Human Growth (NHG) book study."
        accent="coral"
        image="/forest-light.jpg"
        imageAlt="Light breaking through the forest"
        imagePosition="center 30%"
      />

      <section className="px-6 py-10 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <RegisterClient dateInfo={dateInfo} />
        </div>
      </section>
    </>
  );
}
