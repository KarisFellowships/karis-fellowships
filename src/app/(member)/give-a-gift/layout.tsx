import { requireKF } from "@/lib/require-tier";

export default async function GiveAGiftLayout({ children }: { children: React.ReactNode }) {
  await requireKF();
  return <>{children}</>;
}
