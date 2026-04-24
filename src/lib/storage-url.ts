const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

const STORAGE_PREFIXES = [
  "toolbox/", "nhg/", "other-studies/", "facilitator/",
  "lessons/", "questions/", "kf-resources/",
];

/**
 * Converts a static /docs/... path to a Supabase Storage URL for migrated docs.
 */
export function docUrl(staticPath: string): string {
  const stripped = staticPath.replace(/^\/docs\//, "");
  if (STORAGE_PREFIXES.some((p) => stripped.startsWith(p))) {
    return `${SUPABASE_URL}/storage/v1/object/public/documents/${stripped}`;
  }
  return staticPath;
}

export function storageUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/documents/${path}`;
}
