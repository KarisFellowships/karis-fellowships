import kfEvents from "@/data/kf-events.json";
import { todayCentral } from "@/lib/today-central";

// Date-driven announcement bar for the KF Weekly Meetings page. Rules are keyed to
// the program calendar (src/data/kf-events.json, generated from the KF Date
// Projection sheet), so the message changes through the year and rolls forward on
// its own. Add more rules here as seasonal messages are provided.

export interface Announcement {
  id: string;
  text: string;
  linkHref?: string;
  linkText?: string; // if this phrase appears in `text`, it is rendered as the link
  tone?: "amber" | "teal";
}

type KFEvent = {
  type: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  sortDate: string;
};

function addDays(iso: string, days: number): string {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function getActiveAnnouncement(): Announcement | null {
  const today = todayCentral();
  const events = kfEvents.events as KFEvent[];

  // --- Facilitator recruitment for the upcoming NHG book study ---------------
  // Active from ~30 days before that cycle's NHG registration opens through the
  // end of the study, pointing members to the Facilitator Sign-Up page.
  const study = events
    .filter((e) => e.type === "nhgStudy" && (e.endDate ?? e.sortDate) >= today)
    .sort((a, b) => (a.sortDate < b.sortDate ? -1 : 1))[0];

  if (study?.startDate) {
    const year = Number(study.startDate.slice(0, 4));
    const registration = events.find(
      (e) => e.type === "nhgRegistration" && Number((e.date ?? "").slice(0, 4)) === year - 1
    );
    const windowStart = registration?.date
      ? addDays(registration.date, -30)
      : addDays(study.startDate, -120);
    const windowEnd = study.endDate ?? study.startDate;

    if (today >= windowStart && today <= windowEnd) {
      return {
        id: `facilitator-recruitment-${year}`,
        text: `Now is the time to see if the KF community has the MATH to support a NHG Book Study for ${year}, please view the Facilitator Sign Up page to sign up for a meeting`,
        linkHref: "/nhg#facilitator",
        linkText: "Facilitator Sign Up",
        tone: "amber",
      };
    }
  }

  return null;
}
