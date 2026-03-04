interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: "teal" | "coral" | "sky" | "violet" | "amber";
}

const accentStyles = {
  teal: { bg: "from-teal-muted to-cream", bar: "bg-teal" },
  coral: { bg: "from-coral-light to-cream", bar: "bg-coral" },
  sky: { bg: "from-sky-light to-cream", bar: "bg-sky" },
  violet: { bg: "from-violet-light to-cream", bar: "bg-violet" },
  amber: { bg: "from-amber-light to-cream", bar: "bg-amber" },
};

export default function PageHeader({ title, subtitle, accent = "teal" }: PageHeaderProps) {
  const style = accentStyles[accent];

  return (
    <section className={`bg-gradient-to-b ${style.bg} px-6 pb-14 pt-28 sm:pb-20 sm:pt-32`}>
      <div className="mx-auto max-w-4xl">
        <div className={`mb-5 h-1 w-12 rounded-full ${style.bar}`} />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
