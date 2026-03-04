import PageHeader from "@/components/PageHeader";
import Image from "next/image";

export default function CalendarPage() {
  return (
    <div className="bg-slate-dark">
      <PageHeader title="Calendar" subtitle="Upcoming dates, meetings, and events for Karis Fellowships." accent="amber" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-36">
              <Image src="/sunrise-ocean.jpg" alt="New day dawning" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/70 to-teal-deep/30" />
            </div>
            <div className="absolute bottom-4 left-5 right-5">
              <p className="text-sm font-bold text-white">Your year at a glance.</p>
            </div>
          </div>

          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6">
            <p className="text-white/50">
              Please refer to the Calendar on the Karis Fellowships website to
              find the dates, times, and call-in numbers of this season&apos;s
              mega-meetings and other events.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {[
              { label: "KF Weekly Meetings", detail: "Sundays — check Call Info for times", color: "bg-teal" },
              { label: "NHG Book Study", detail: "January – March annually", color: "bg-coral" },
              { label: "Romans Bible Study", detail: "October – December", color: "bg-sky" },
              { label: "HPKP Study", detail: "April – May", color: "bg-violet" },
            ].map(({ label, detail, color }) => (
              <div key={label} className="flex items-center gap-4 rounded-xl bg-white/5 ring-1 ring-white/10 p-4 transition-all hover:bg-white/10">
                <span className={`h-3 w-3 rounded-full ${color}`} />
                <div>
                  <h3 className="text-sm font-bold text-white">{label}</h3>
                  <p className="text-xs text-white/40">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-white/30 italic">
            A full interactive calendar will be integrated once event data is connected.
          </p>
        </div>
      </section>
    </div>
  );
}
