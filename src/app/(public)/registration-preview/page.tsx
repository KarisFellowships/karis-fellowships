import KFRegisterClient from "@/app/(member)/kf/register/KFRegisterClient";

// TEMPORARY internal preview so the team can see the (invite-gated) KF
// registration page without an invited login. It renders the REAL form
// component in both member states. Not linked anywhere; safe to delete.
// The form's submit hits /api/kf-register, which requires an authenticated
// invited user, so it is display-only here.

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="px-6 pt-14 text-center sm:pt-16">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-light">
        Karis Fellowships
      </span>
      <h1 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">{subtitle}</p>
    </section>
  );
}

export default function RegistrationPreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3f4856] to-[#2b323d]">
      <div className="border-b border-white/10 bg-black/20 px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.15em] text-white/45">
        Internal preview — the invite-only KF registration page, shown in both member states
      </div>

      <p className="mx-auto max-w-lg px-6 pt-12 text-xs font-semibold uppercase tracking-[0.2em] text-teal-light/70">
        1 · New member
      </p>
      <Header title="Complete Your Registration" subtitle="You have been invited to join Karis Fellowships." />
      <section className="px-6 pb-12 pt-10">
        <KFRegisterClient userName="Jane Doe" userEmail="jane@example.com" isReturning={false} />
      </section>

      <div className="mx-auto max-w-lg border-t border-white/10" />

      <p className="mx-auto max-w-lg px-6 pt-12 text-xs font-semibold uppercase tracking-[0.2em] text-teal-light/70">
        2 · Returning member
      </p>
      <Header title="Register for the Upcoming Year" subtitle="Confirm your participation for the upcoming KF training year." />
      <section className="px-6 pb-16 pt-10">
        <KFRegisterClient userName="Jane Doe" userEmail="jane@example.com" isReturning={true} />
      </section>
    </div>
  );
}
