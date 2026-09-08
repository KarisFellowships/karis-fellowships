import PageHeader from "@/components/PageHeader";

// Shared shell for the public legal pages (Privacy, Terms, Refund). Keeps them
// visually consistent with the rest of the light-themed public site.
//
// DRAFT CONTENT — the three legal pages that use this component were drafted for
// Karis review and are NOT final. While `draft` is true a visible banner marks
// them as not-yet-in-effect. Once the wording is approved (and any bracketed
// [To confirm …] placeholders are filled), set draft={false} and pass a real
// `lastUpdated` date.
export default function LegalPage({
  title,
  subtitle,
  lastUpdated,
  draft = true,
  children,
}: {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  draft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        accent="teal"
        image="/starry-mountain.jpg"
        imageAlt="Stars over mountains"
      />

      <section className="px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          {draft ? (
            <div className="mb-10 rounded-2xl border border-border/40 bg-ivory/60 px-6 py-4 text-sm leading-relaxed text-slate">
              <span className="font-semibold text-foreground">Draft for review.</span>{" "}
              This policy is being finalized and is not yet in effect. Questions? Email{" "}
              <a
                href="mailto:admin@karisfellowships.com"
                className="font-medium text-teal-hover underline underline-offset-4 decoration-teal/30 hover:text-teal-hover"
              >
                admin@karisfellowships.com
              </a>
              .
            </div>
          ) : (
            lastUpdated && (
              <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.25em] text-teal/60">
                Last updated: {lastUpdated}
              </p>
            )
          )}

          <div className="space-y-10">{children}</div>
        </div>
      </section>
    </>
  );
}

// One titled section of a legal page.
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-foreground">{heading}</h2>
      <div className="mt-3 space-y-3 leading-[1.8] text-slate">{children}</div>
    </div>
  );
}

// A clearly-visible placeholder for a decision Karis still needs to make. Renders
// inline so it cannot silently ship as final wording.
export function ToConfirm({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-amber/15 px-1.5 py-0.5 text-[0.95em] font-medium text-foreground">
      [To confirm: {children}]
    </mark>
  );
}
