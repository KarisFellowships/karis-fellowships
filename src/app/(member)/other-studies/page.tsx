import Image from "next/image";
import ContentCard from "@/components/ContentCard";

export default function OtherStudiesPage() {
  return (
    <div className="relative min-h-screen bg-[#4a5568]">
      {/* Header image pulled up behind the nav and faded into the page behind the cards */}
      <div className="absolute inset-x-0 top-0 h-[38rem]">
        <Image src="/starry-mountain.jpg" alt="Stars over mountains" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#4a5568] sm:from-black/40 sm:via-black/25" />
      </div>

      <div className="relative z-10">
        <section className="px-6 pt-32 sm:pt-44">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">Other Studies</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/85 drop-shadow sm:text-base">
              Additional studies and resources beyond the weekly KF meetings.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 pt-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContentCard
                title="Romans Bible Study"
                description="A study through the book of Romans, typically offered October through December."
                href="/other-studies/romans"
                accent="teal"
                icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
              <ContentCard
                title="Honor, Patronage, Kinship & Purity"
                description="The HPKP book study exploring cultural context of the Bible, typically offered April through May."
                href="/other-studies/hpkp"
                accent="amber"
                icon="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
              <ContentCard
                title="Mindfulness Month"
                description="Mindfulness resources and training materials."
                href="/other-studies/mindfulness"
                accent="sky"
                icon="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
