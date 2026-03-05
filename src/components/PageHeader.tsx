interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: "teal" | "coral" | "sky" | "violet" | "amber";
  dark?: boolean;
}

const accentLine = {
  teal: "bg-teal/40",
  coral: "bg-coral/40",
  sky: "bg-sky/40",
  violet: "bg-violet/40",
  amber: "bg-amber/40",
};

export default function PageHeader({ title, subtitle, accent = "teal", dark = false }: PageHeaderProps) {
  return (
    <section className={`px-8 pb-16 pt-32 sm:pb-24 sm:pt-36 ${dark ? "bg-slate-dark" : "bg-gradient-to-b from-slate-dark to-slate-dark/95"}`}>
      <div className="mx-auto max-w-4xl">
        <div className={`mb-6 h-px w-10 ${accentLine[accent]}`} />
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-[1.8] text-white/65">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
