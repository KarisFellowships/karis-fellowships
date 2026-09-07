import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: "teal" | "coral" | "sky" | "violet" | "amber";
  dark?: boolean;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  /** "Pray As You Go" style: a pulled-down header image that fades into the
   *  #4a5568 member-page background, with the title near the top. Opt-in so the
   *  light-themed public pages keep the original header. */
  payg?: boolean;
}

const accentLine = {
  teal: "bg-teal/40",
  coral: "bg-coral/40",
  sky: "bg-sky/40",
  violet: "bg-violet/40",
  amber: "bg-amber/40",
};

export default function PageHeader({ title, subtitle, accent = "teal", dark = false, image, imageAlt, imagePosition, payg = false }: PageHeaderProps) {
  if (image && payg) {
    return (
      <section className="relative">
        <div className="relative h-[26rem] sm:h-[30rem]">
          <Image src={image} alt={imageAlt || title} fill priority className="object-cover" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[#4a5568] sm:from-black/40 sm:via-black/20" />
        </div>
        <div className="absolute inset-x-0 top-0 px-6 pt-32 sm:pt-44">
          <div className="mx-auto max-w-4xl">
            <div className={`mb-3 h-px w-10 ${accentLine[accent]}`} />
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-white/85 drop-shadow sm:text-base">{subtitle}</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (image) {
    return (
      <section className="relative overflow-hidden">
        <div className="relative h-72 sm:h-80">
          <Image src={image} alt={imageAlt || title} fill className="object-cover" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/50 to-slate-dark/30" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-8 pb-6 sm:pb-8">
          <div className="mx-auto max-w-4xl">
            <div className={`mb-3 h-px w-10 ${accentLine[accent]}`} />
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 drop-shadow sm:text-base">{subtitle}</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`px-8 pb-8 pt-24 sm:pb-10 sm:pt-28 ${dark ? "bg-slate-dark" : "bg-gradient-to-b from-slate-dark to-slate-dark/95"}`}>
      <div className="mx-auto max-w-4xl">
        <div className={`mb-4 h-px w-10 ${accentLine[accent]}`} />
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-sm leading-[1.8] text-white/65 sm:text-base">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
