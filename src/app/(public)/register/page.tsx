import Image from "next/image";
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
    <div className="relative">
      {/* Header image pulled up behind the nav and faded into the page background */}
      <div className="absolute inset-x-0 top-0 h-[28rem]">
        <Image
          src="/forest-light.jpg"
          alt="Light breaking through the forest"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 30%, rgba(248,249,251,0.92) 66%, #f8f9fb 84%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <header className="px-6 pt-32 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-3 h-px w-10 bg-coral/60" />
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              Register for the NHG Book Study
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80 drop-shadow sm:text-base">
              Your first step is to participate in the Neurosis and Human Growth (NHG) book study.
            </p>
          </div>
        </header>

        <section className="px-6 pb-16 pt-8 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <RegisterClient dateInfo={dateInfo} />
          </div>
        </section>
      </div>
    </div>
  );
}
