import PageHeader from "@/components/PageHeader";

export default function NHGRecordingsPage() {
  return (
    <div className="min-h-screen bg-[#4a5568]">
      <PageHeader title="NHG Recordings" subtitle="Recordings from past NHG sessions for review and catch-up." accent="sky" image="/waterfall.jpg" imageAlt="Waterfall in nature" />
      <section className="px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-[#1e293b] p-6">
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
