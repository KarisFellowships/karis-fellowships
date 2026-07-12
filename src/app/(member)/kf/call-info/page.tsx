import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { getMeetingCodes, phoneNumber, kfMeetings } from "@/lib/meeting-codes";
import { requireKF } from "@/lib/require-tier";

export default async function KFCallInfoPage() {
  await requireKF();
  const codes = await getMeetingCodes();
  const callPhone = phoneNumber(codes);
  const meetings = kfMeetings(codes);
  return (
    <div className="min-h-screen bg-[#4a5568]">
      <PageHeader title="Call & Playback Info" subtitle="Conference call details for KF weekly meetings." accent="amber" image="/sunrise-ocean.jpg" imageAlt="Sunrise over calm water" />
      <section className="px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-xl bg-[#1e293b] p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-white/30">Phone Number</p>
            <p className="mt-1 text-3xl font-bold text-teal-light">{callPhone}</p>
          </div>

          <div className="rounded-xl bg-[#1e293b] p-8">
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
