import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const meetings = [
  { day: "Sunday", time: "8:00 am CST", code: "140-752-083#" },
  { day: "Monday", time: "10:00 am CST", code: "227-470-849#" },
  { day: "Tuesday", time: "7:30 pm CST", code: "744-046-419#" },
];
const callPhone = "(701) 801-1220";

export default function KFCallInfoPage() {
  return (
    <div className="bg-slate-dark">
      <PageHeader title="Call & Playback Info" subtitle="Conference call details for KF weekly meetings." accent="amber" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-white/30">Phone Number</p>
            <p className="mt-1 text-3xl font-bold text-teal-light">{callPhone}</p>
          </div>

          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-white/30 mb-5">Meeting Times &amp; Access Codes</p>
            <div className="space-y-5">
              {meetings.map(({ day, time, code }) => (
                <div key={day} className="flex items-center justify-between border-b border-white/10 pb-5 last:border-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-white">{day}</p>
                    <p className="text-sm text-white/50">{time}</p>
                  </div>
                  <p className="font-mono text-lg font-bold text-amber">{code}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/dashboard" className="text-sm font-semibold text-teal-light hover:text-teal transition-colors">
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
