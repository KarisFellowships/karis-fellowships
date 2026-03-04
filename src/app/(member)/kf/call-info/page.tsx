import PageHeader from "@/components/PageHeader";

export default function KFCallInfoPage() {
  return (
    <>
      <PageHeader title="Call & Playback Info" subtitle="Conference call details and playback information for KF meetings." accent="gold" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-gold-light/50 p-6">
            <p className="text-foreground/70">
              All of our programs are online, so you can attend from anywhere
              in the world. Call-in numbers, access codes, and playback
              information will appear here.
            </p>
          </div>
          <p className="mt-6 text-sm text-foreground/50 italic">
            Call-in details will be populated from your meeting information.
          </p>
        </div>
      </section>
    </>
  );
}
