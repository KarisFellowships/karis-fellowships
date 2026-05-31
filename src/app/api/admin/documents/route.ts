import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

const BUCKET = "documents";

async function verifyAdmin() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("tier")
    .eq("id", user.id)
    .single();

  return profile?.tier === "admin" ? user : null;
}

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const client = createAdminClient();

  const categories = ["toolbox", "nhg", "other-studies", "lessons", "questions", "kf-resources", "facilitator"];
  const result: Record<string, { name: string; path: string; size: number; updated: string }[]> = {};

  for (const cat of categories) {
    const { data, error } = await client.storage.from(BUCKET).list(cat, {
      limit: 200,
      sortBy: { column: "name", order: "asc" },
    });

    if (error || !data) {
      result[cat] = [];
      continue;
    }

    result[cat] = data
      .filter((f) => f.name !== ".emptyFolderPlaceholder")
      .map((f) => ({
        name: f.name,
        path: `${cat}/${f.name}`,
        size: f.metadata?.size ?? 0,
        updated: f.updated_at ?? "",
      }));
  }

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = formData.get("folder") as string | null;

  if (!file || !folder) {
    return NextResponse.json({ error: "Missing file or folder" }, { status: 400 });
  }

  const filePath = `${folder}/${file.name}`;
  const client = createAdminClient();

  const { error } = await client.storage
    .from(BUCKET)
    .upload(filePath, file, { upsert: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, path: filePath });
}

export async function DELETE(request: Request) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { path } = body as { path?: string };
  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  const client = createAdminClient();
  const { error } = await client.storage.from(BUCKET).remove([path]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
