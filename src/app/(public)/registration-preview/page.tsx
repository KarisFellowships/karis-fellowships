import KFRegisterClient from "@/app/(member)/kf/register/KFRegisterClient";

// TEMPORARY internal preview so the team can see the (invite-gated) KF
// registration page without an invited login. It renders the REAL form
// component in both member states. Not linked anywhere; safe to delete.
// The form's submit hits /api/kf-register, which requires an authenticated
// invited user, so it is display-only here.

function Header({ subtitle }: { subtitle: string }) {
  return (
    <section
      className="relative z-10"
      style={{ background: "linear-gradient(135deg, #0a6c6e 0%, #0d9494 50%, #14b8a6 100%)" }}
    >
      <div className="absolute inset-0 bg-white/[0.06]" />
      <div className="relative px-6 pb-8 pt-14 sm:pt-16 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">
            Karis Fellowships Registration
          </h1>
          <p className="mt-1.5 text-sm font-medium text-white/80 drop-shadow">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

export default function RegistrationPreviewPage() {
  return (
    <div className="min-h-screen bg-[#4a5568]">
      <div className="bg-amber-400 px-4 py-2 text-center text-sm font-medium text-black">
        Internal preview — this is the invite-only KF registration page, shown in both member states. Display only.
      </div>

      <p className="mx-auto max-w-6xl px-6 pt-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        1 · New member (first-time registration)
      </p>
      <Header subtitle="You have been invited to join Karis Fellowships." />
      <section className="px-6 py-12">
        <KFRegisterClient userName="Jane Doe" userEmail="jane@example.com" isReturning={false} />
      </section>

      <div className="mx-auto max-w-6xl border-t border-white/10" />

      <p className="mx-auto max-w-6xl px-6 pt-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        2 · Returning member (annual re-registration)
      </p>
      <Header subtitle="Register for the upcoming KF training year." />
      <section className="px-6 py-12">
        <KFRegisterClient userName="Jane Doe" userEmail="jane@example.com" isReturning={true} />
      </section>
    </div>
  );
}
