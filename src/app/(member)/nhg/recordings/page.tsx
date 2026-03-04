import PageHeader from "@/components/PageHeader";

export default function NHGRecordingsPage() {
  return (
    <div className="bg-slate-dark">
      <PageHeader title="NHG Recordings" subtitle="Recordings from past NHG sessions for review and catch-up." accent="sky" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6">
            <p className="text-white/50">
              Listen to past NHG conference call recordings. Links to recordings from StartMeeting will appear here.
            </p>
          </div>
          <p className="mt-6 text-sm text-white/30 italic">
            Recordings will be linked here once StartMeeting URLs are provided.
          </p>
        </div>
      </section>
    </div>
  );
}
