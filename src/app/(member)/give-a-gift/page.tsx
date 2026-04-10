import { createServerClient } from "@/lib/supabase-server";
import GiveAGiftClient from "./GiveAGiftClient";

export default async function GiveAGiftPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <GiveAGiftClient
      userId={user?.id ?? ""}
      userEmail={user?.email ?? ""}
    />
  );
}
