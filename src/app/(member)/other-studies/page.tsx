import Image from "next/image";
import ContentCard from "@/components/ContentCard";

export default function OtherStudiesPage() {
  return (
    <div className="min-h-screen bg-[#4a5568] pt-20">
      <section className="relative z-10">
        <div className="absolute inset-0">
          <Image src="/starry-mountain.jpg" alt="Stars over mountains" fill className="object-cover brightness-110 saturate-[1.15]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#4a5568]" />
        </div>
        <div className="relative px-6 pb-8 pt-14 sm:pt-16 sm:pb-10">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">Other Studies</h1>
            <p className="mt-1.5 text-sm font-medium text-white/80 drop-shadow">Additional studies and resources beyond the weekly KF meetings.</p>
          </div>
        </div>
      </section>
      <section className="px-6 pb-12 pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 sm:grid-cols-2">
            <ContentCard title="Romans Bible Study" description="A study through the book of Romans, typically offered October through December." href="/other-studies/romans" accent="teal" />
            <ContentCard title="Honor, Patronage, Kinship & Purity" description="The HPKP book study exploring cultural context of the Bible, typically offered April through May." href="/other-studies/hpkp" accent="amber" />
            <ContentCard title="Mindfulness Month" description="Mindfulness resources and training materials." href="/other-studies/mindfulness" accent="sky" />
          </div>
        </div>
      </section>
    </div>
  );
}
