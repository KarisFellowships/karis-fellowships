interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: "teal" | "coral" | "sky" | "violet" | "amber";
  dark?: boolean;
}

const accentBar = {
  teal: "bg-teal",
  coral: "bg-coral",
  sky: "bg-sky",
  violet: "bg-violet",
  amber: "bg-amber",
};

export default function PageHeader({ title, subtitle, accent = "teal", dark = false }: PageHeaderProps) {
  return (
    <section className={`px-6 pb-14 pt-28 sm:pb-20 sm:pt-32 ${dark ? "bg-slate-dark" : "bg-gradient-to-b from-slate-dark to-slate-dark/95"}`}>
      <div className="mx-auto max-w-4xl">
        <div className={`mb-5 h-1 w-12 rounded-full ${accentBar[accent]}`} />
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/50">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
