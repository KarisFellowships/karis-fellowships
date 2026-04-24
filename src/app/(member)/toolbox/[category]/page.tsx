import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { docUrl } from "@/lib/storage-url";

type Accent = "teal" | "coral" | "sky" | "violet" | "amber";

interface DocItem {
  label: string;
  href: string;
  type?: string;
}

interface CategoryData {
  title: string;
  accent: Accent;
  docs: DocItem[];
  subcategories?: { title: string; docs: DocItem[] }[];
}

const categories: Record<string, CategoryData> = {
  worksheets: {
    title: "Worksheets",
    accent: "teal",
    docs: [
      { label: "Claim/Blame Worksheet", href: "/docs/toolbox/worksheets/Claim.Blm_.-Wkst-for-PDF-2021z-.pdf" },
      { label: "Love or Pride", href: "/docs/toolbox/worksheets/Love-or-Pride-FINI-2021.pdf" },
      { label: "Shoulds Worksheet (PDF)", href: "/docs/toolbox/worksheets/Shoulds-Wksht-2021z-PDF.pdf" },
      { label: "Shoulds Worksheet (Typed)", href: "/docs/toolbox/worksheets/Shoulds-Wksht-typing-2021z.docx", type: "docx" },
      { label: "Suffering Worksheet (PDF)", href: "/docs/toolbox/worksheets/Suffering-wkst-master-PDF-2021z.pdf" },
      { label: "Suffering Worksheet (Typed)", href: "/docs/toolbox/worksheets/Suffering-wkst-master-typed-2021z (2).docx", type: "docx" },
      { label: "Two Paths Flow Chart", href: "/docs/toolbox/worksheets/Two-Paths-Flow-Chart-v2.pdf" },
      { label: "Two Paths Worksheet (PDF)", href: "/docs/toolbox/worksheets/Two-Paths-Wksht-PDF-2021z.pdf" },
      { label: "Two Paths Worksheet (Typed)", href: "/docs/toolbox/worksheets/Two-Paths-Wksht-Typed-2021z.docx", type: "docx" },
    ],
  },
  "healing-integration": {
    title: "Healing / Integration",
    accent: "coral",
    docs: [
      { label: "Body Talk Tap", href: "/docs/toolbox/healing-integration/Body-Talk-Tap-2019.pdf" },
      { label: "Boundary Tap", href: "/docs/toolbox/healing-integration/Boundary-Tap-2019.pdf" },
      { label: "Healing Color", href: "/docs/toolbox/healing-integration/Healing-Color-2019.pdf" },
      { label: "Karis Dialogue Prayer", href: "/docs/toolbox/healing-integration/Karis-Dialogue-Prayer-1.pdf" },
      { label: "Prayer of Confession", href: "/docs/toolbox/healing-integration/Prayer-of-Confession-v2a.pdf" },
      { label: "Tapping (Detailed Version)", href: "/docs/toolbox/healing-integration/Tapping-Detailed-Version-2022z.pdf" },
      { label: "TAT (Condensed Web Version)", href: "/docs/toolbox/healing-integration/TAT-Cndsd-Web-Version-FINI-2021z.pdf" },
      { label: "TAT (Expanded Version)", href: "/docs/toolbox/healing-integration/TAT-Exp.-Version-FINI-2021z.pdf" },
      { label: "The FAITH Process", href: "/docs/toolbox/healing-integration/The-FAITH-Process-for-Website-v1a.pdf" },
      { label: "UFO Hold", href: "/docs/toolbox/healing-integration/UFO-Hold-2019.pdf" },
    ],
  },
  "mini-meetings": {
    title: "Mini Meetings + CORE Meetings",
    accent: "amber",
    docs: [],
    subcategories: [
      {
        title: "CORE Meetings",
        docs: [
          { label: "CORE Meeting Schedule", href: "/docs/toolbox/mini-meetings/KF-CORE-Meeting-Schedule-2022z.pdf" },
          { label: "CORE Meeting Protocol 1", href: "/docs/toolbox/mini-meetings/KF-Core-Mtg-Protocol-1-2022z.pdf" },
          { label: "CORE Meeting Protocol 2", href: "/docs/toolbox/mini-meetings/KF-Core-Mtg-Protocol-2-2022z.pdf" },
        ],
      },
      {
        title: "Mini Meeting Guides",
        docs: (() => {
          const pdfDates: Record<number, string> = {
            1: "2018-06-24", 2: "2018-06-24", 3: "2018-06-24", 4: "2018-06-24",
            5: "2018-06-24", 6: "2018-06-24", 7: "2018-06-24", 8: "2018-06-24",
            9: "2018-06-24", 10: "2018-06-24", 11: "2018-06-19", 12: "2018-06-20",
            13: "2018-07-09", 14: "2018-07-09", 15: "2018-06-24", 16: "2018-07-09",
            17: "2018-07-09", 18: "2018-07-21", 19: "2018-07-21", 20: "2018-07-29",
            21: "2018-08-06", 22: "2018-09-24", 23: "2018-10-01", 24: "2018-10-02",
            25: "2018-10-03", 26: "2018-11-26", 27: "2018-11-27", 28: "2018-11-28",
            29: "2018-11-29", 30: "2018-12-03", 31: "2018-12-03", 32: "2018-12-04",
            33: "2018-12-05", 34: "2018-12-06", 35: "2018-12-13", 36: "2018-12-13",
            37: "2018-12-17", 38: "2018-12-17", 39: "2018-12-21",
          };
          return Array.from({ length: 52 }, (_, i) => {
            const n = i + 1;
            if (n <= 39 && n !== 40) {
              return {
                label: `Mini Meeting — Lesson ${n}`,
                href: `/docs/toolbox/mini-meetings/KF-Mini-Mtg-Lesson-${n}_${pdfDates[n]}.pdf`,
              };
            }
            return {
              label: `Mini Meeting — Lesson ${n}`,
              href: `/docs/toolbox/mini-meetings/KF-Mini-Mtg-Lesson-${n}.docx`,
              type: "docx" as const,
            };
          }).filter((_, i) => i + 1 !== 40);
        })(),
      },
    ],
  },
  archived: {
    title: "Archived",
    accent: "violet",
    docs: [],
    subcategories: [
      {
        title: "Mindfulness Month",
        docs: [
          { label: "Week 1 Reflection Guide", href: "/docs/toolbox/archived/mindfulness-month/MM-Week-1-Reflection-Guide.pdf" },
          { label: "Weeks 2–4 Experiment Guide", href: "/docs/toolbox/archived/mindfulness-month/MM-Weeks-2-4-Experiment-Guide.pdf" },
          { label: "RAIN Process", href: "/docs/toolbox/archived/mindfulness-month/RAIN-Process-v2a.pdf" },
        ],
      },
      {
        title: "Neurotic Types — Mastery",
        docs: [
          { label: "Call to Courage Meeting Schedule", href: "/docs/toolbox/archived/neurotic-types/mastery/KF-Call-to-Courage-Meeting-Schedule-v1a.pdf" },
          { label: "Call to Courage Prep Guide", href: "/docs/toolbox/archived/neurotic-types/mastery/KF-Call-to-Courage-Prep-Guide.pdf" },
        ],
      },
      {
        title: "Neurotic Types — Resigned",
        docs: [
          { label: "Resigned NT Schedule", href: "/docs/toolbox/archived/neurotic-types/resigned/2019-Resigned-NT-Schedule.pdf" },
        ],
      },
      {
        title: "Neurotic Types — Self Effacing",
        docs: [
          { label: "Self-Effacing Meeting Facilitator Guide", href: "/docs/toolbox/archived/neurotic-types/self-effacing/SE-Meeting-Facilitator-Guide-2020.pdf" },
          { label: "Self-Effacing NT Meeting Schedule", href: "/docs/toolbox/archived/neurotic-types/self-effacing/Self-Effacing-NT-Meeting-Schedule-2020.pdf" },
        ],
      },
    ],
  },
};

interface Props {
  params: Promise<{ category: string }>;
}

export default async function ToolboxCategoryPage({ params }: Props) {
  const { category } = await params;
  const data = categories[category];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#4a5568]">
        <PageHeader title="Not Found" subtitle="This toolbox category does not exist." accent="teal" />
        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <Link href="/toolbox" className="text-sm font-medium text-teal-light hover:text-teal transition-colors">
              &larr; Back to Toolbox
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#4a5568]">
      <PageHeader title={data.title} subtitle={`KF Toolbox — ${data.title}`} accent={data.accent} image="/butterfly-transform.jpg" imageAlt="Transformation" />
      <section className="px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl">
          {data.docs.length > 0 && (
            <div className="grid gap-2">
              {data.docs.map(({ label, href, type }) => (
                <a
                  key={href}
                  href={docUrl(href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl bg-[#1e293b] p-4 transition-all hover:bg-[#243044] hover:-translate-y-0.5"
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-${data.accent}/15`}>
                    <svg className={`h-4 w-4 text-${data.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{label}</span>
                  </div>
                  {type === "docx" && (
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/40">DOCX</span>
                  )}
                </a>
              ))}
            </div>
          )}

          {data.subcategories?.map(({ title, docs }) => (
            <div key={title} className="mt-8">
              <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
              <div className="grid gap-2">
                {docs.map(({ label, href, type }) => (
                  <a
                    key={href}
                    href={docUrl(href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl bg-[#1e293b] p-4 transition-all hover:bg-[#243044] hover:-translate-y-0.5"
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-${data.accent}/15`}>
                      <svg className={`h-4 w-4 text-${data.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{label}</span>
                    </div>
                    {type === "docx" && (
                      <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/40">DOCX</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-8">
            <Link href="/toolbox" className="text-sm font-medium text-teal-light hover:text-teal transition-colors">
              &larr; Back to Toolbox
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
