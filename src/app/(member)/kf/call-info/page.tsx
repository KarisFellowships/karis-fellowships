import PageHeader from "@/components/PageHeader";

export default function KFCallInfoPage() {
  return (
    <div className="bg-slate-dark">
      <PageHeader title="Call & Playback Info" subtitle="Conference call details and playback information for KF meetings." accent="amber" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/30">Phone Number</p>
                <p className="mt-1 text-2xl font-bold text-teal-light">1-605-313-5111</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/30">Access Code</p>
                <p className="mt-1 text-2xl font-bold text-white">834205#</p>
              </div>
            </div>
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-white/50">
                All of our programs are online, so you can attend from anywhere
                in the world. Call-in numbers, access codes, and playback
                information are listed above.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-white/30 italic">
            Additional call-in details will be populated from your meeting information.
          </p>
        </div>
      </section>
    </div>
  );
}
