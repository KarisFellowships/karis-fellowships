import { requireKF } from "@/lib/require-tier";

export default async function CalendarLayout({ children }: { children: React.ReactNode }) {
  await requireKF();
  return <>{children}</>;
}
