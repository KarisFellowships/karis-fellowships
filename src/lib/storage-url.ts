const STORAGE_PREFIXES = [
  "toolbox/", "nhg/", "other-studies/", "facilitator/",
  "lessons/", "questions/", "kf-resources/",
];

function toDocumentRoute(objectPath: string): string {
  // Percent-encode each segment (handles spaces and parentheses) while keeping
  // "/" as the separator for the /api/documents/[...path] catch-all route.
  const encoded = objectPath.split("/").map(encodeURIComponent).join("/");
  return `/api/documents/${encoded}`;
}

/**
 * Maps a legacy /docs/... path to the authenticated document route. The file
 * lives in the PRIVATE "documents" Storage bucket; /api/documents verifies the
 * member's access and redirects to a short-lived signed URL. Paths that are not
 * stored in the bucket are returned unchanged.
 */
export function docUrl(staticPath: string): string {
  const stripped = staticPath.replace(/^\/docs\//, "");
  if (STORAGE_PREFIXES.some((p) => stripped.startsWith(p))) {
    return toDocumentRoute(stripped);
  }
  return staticPath;
}

/** Builds an authenticated document-route URL from a bucket object path. */
export function storageUrl(path: string): string {
  return toDocumentRoute(path);
}
