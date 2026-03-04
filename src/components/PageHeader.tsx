interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: "sage" | "gold" | "terracotta" | "sky" | "plum";
}

const accentStyles = {
  sage: { bg: "from-sage-muted/50 to-cream", bar: "bg-sage" },
  gold: { bg: "from-gold-light/50 to-cream", bar: "bg-gold" },
  terracotta: { bg: "from-terracotta-light/50 to-cream", bar: "bg-terracotta" },
  sky: { bg: "from-sky-light/50 to-cream", bar: "bg-sky" },
  plum: { bg: "from-plum-light/50 to-cream", bar: "bg-plum" },
};

export default function PageHeader({ title, subtitle, accent = "sage" }: PageHeaderProps) {
  const style = accentStyles[accent];

  return (
    <section className={`bg-gradient-to-b ${style.bg} px-6 pb-14 pt-28 sm:pb-20 sm:pt-32`}>
      <div className="mx-auto max-w-4xl">
        <div className={`mb-5 h-1 w-12 rounded-full ${style.bar}`} />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/65">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
