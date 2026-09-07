import PageHeader from "@/components/PageHeader";
import { requireKF } from "@/lib/require-tier";
import { getMeetingCodes, kfMeetings } from "@/lib/meeting-codes";

export default async function KFRecordingsPage() {
  await requireKF();
  const codes = await getMeetingCodes();
  const meetings = kfMeetings(codes);
  return (
    <div className="min-h-screen bg-[#4a5568]">
      <PageHeader title="KF Recordings" subtitle="Listen to recordings from past KF weekly meetings." accent="sky" image="/ocean-horizon.jpg" imageAlt="Calm ocean horizon" payg />
      <section className="px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Listen by phone */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-8 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 9.5v5m0 0l-2-2m2 2l2-2M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></svg>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white/50">Listen by Phone</h2>
            </div>
            <p className="text-base leading-relaxed text-white/70">
              To listen to a recording of the latest meeting, use the phone number{" "}
              <span className="font-semibold text-teal-light">(701)&nbsp;801-1229</span> and your meeting time&apos;s
              access code from the table below. Follow the audio prompts. Press # to listen to the most recent recording.
            </p>
          </div>

          {/* Access codes */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-8 backdrop-blur-sm">
            <p className="mb-5 text-xs font-bold uppercase tracking-wider text-white/30">Meeting Times &amp; Access Codes</p>
            <div className="space-y-5">
              {meetings.map(({ day, time, code }) => (
                <div key={day} className="flex items-center justify-between border-b border-white/10 pb-5 last:border-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-white">{day}</p>
                    <p className="text-sm text-white/50">{time}</p>
                  </div>
                  <p className="font-mono text-lg font-bold text-sky">{code}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm italic text-white/30">
            Recordings will be linked here once StartMeeting URLs are provided.
          </p>
        </div>
      </section>
    </div>
  );
}
