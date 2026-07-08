import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const BUCKET = "documents";
const SIGNED_URL_TTL_SECONDS = 60;

// Mirrors the route gating in src/proxy.ts:
// - nhg/facilitator/ material is KF/admin only (it's for the people running the
//   meetings), even though it lives under the nhg/ folder.
// - Other nhg/ material (reading guides, introductions) is available to paid
//   NHG members and to KF/admin.
// - Everything else (lessons, questions, toolbox, kf-resources, facilitator,
//   other-studies) is KF-tier content.
function isAllowed(pathSegments: string[], tier: string | null, nhgPaid: boolean): boolean {
  const kfOrAdmin = tier === "kf" || tier === "admin";
  if (pathSegments[0] === "nhg" && pathSegments[1] === "facilitator") return kfOrAdmin;
  if (pathSegments[0] === "nhg") return kfOrAdmin || (tier === "nhg" && nhgPaid);
  return kfOrAdmin;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  if (!path || path.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    // Member-only content: send unauthenticated requests to log in.
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { data: profile } = await supabase
    .from("users")
    .select("tier, active, nhg_paid")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.active) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!isAllowed(path, profile.tier, !!profile.nhg_paid)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Sign the object with the service-role client (the bucket is private, so the
  // anon/SSR client cannot read it). Short TTL: the link is used immediately.
  const objectPath = path.join("/");
  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from(BUCKET)
    .createSignedUrl(objectPath, SIGNED_URL_TTL_SECONDS);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const response = NextResponse.redirect(data.signedUrl);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
