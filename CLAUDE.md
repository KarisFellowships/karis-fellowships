# Karis Fellowships — Project Rules

Ministry site for Karis Fellowships (Next.js 16 App Router · React 19 · Supabase · Stripe · Resend).
These rules mirror the Cursor rules in `.cursor/rules/*.mdc` — **keep both in sync** if either changes.

## 1. Language protection — verbatim copy only
- ALL user-facing text (headings, descriptions, taglines, body copy, testimonials, bios, FAQ answers) must come **verbatim** from karisfellowships.com or the original KF documents.
- NEVER invent, paraphrase, or reword copy. NEVER alter the language in KF documents: lessons, NHG materials, toolbox docs, meditations, worksheets, facilitator guides, or question documents.
- **Lesson fidelity (wording AND formatting):** for lesson content, never change or remove ANY wording, and reproduce the source document's formatting exactly — indentation, spacing, question/step numbering, and centered/single-spaced hymns. Only ADD formatting to match the source; never edit or drop content. Reusable helpers live in `globals.css`: `.lesson-indent` (block indent) and `.lesson-hymn` (centered, single-spaced).
- **Images/photos — no changes without explicit approval.** Never add, replace, or swap any image/photo on your own. Images carry meaning and are often reused in multiple places, so changing one file changes every usage — e.g. `/public/nhg-book.jpg` is the actual *Neurosis and Human Growth* cover, shown on BOTH the register page and NHG "Start Here." Do not introduce stock/Unsplash photos or replace existing ones. If a layout genuinely needs a new/different image, propose it and get approval first; when restoring, prefer the original file from git history.
- If a label is needed that doesn't exist on the site, use the simplest functional word ("Open", "Download", "Back") and flag it for the user to review.
- When unsure, ask the user. Do not guess. (Full reference text lives in the Cursor global skill `karis-language/website-text.md`, which is not always available locally — when it isn't, do not touch existing copy and flag anything new.)

## 2. Program dates come from the Excel projection
- ALL program dates — KF weekly meetings, NHG book study (spreadsheet rows 63–78), HPKP, Romans, Weekend Intensives, any scheduled event — MUST come from `content/KF Date Projection.xlsx`.
- Never hardcode program dates or compute them from an anchor date.
- `scripts/seed-schedule.mjs` reads the Excel file and populates the Supabase schedule tables; application code fetches dates from those tables. Re-run the seed script if the Excel changes.
- The fallback in `src/lib/date-engine.ts` is graceful-degradation only — never a source of truth.

## 3. Meeting access codes come from the spreadsheet
- Access codes shown on the site MUST match the **"New Code KF Website"** column in `.cursor/KF Meeting Code Generator 2026.xlsx`.
- Format with dashes and a trailing `#` (e.g. `548-008-425#`). Never use old codes. Verify against the sheet when editing any page that displays codes.

## 4. Architecture
- **No CMS** (Sanity) is integrated yet — content is hardcoded or in static files. A CMS can be added later, incrementally, on a branch, without rewriting existing components.
- **Documents**: admin-swappable files live in the **PRIVATE** Supabase Storage bucket `documents` (folders: toolbox, nhg, other-studies, facilitator, lessons, questions, kf-resources). Use `docUrl()` from `src/lib/storage-url.ts` — it converts `/docs/...` paths into URLs for the **authenticated `/api/documents/[...path]` route, which verifies the member's tier and redirects to a short-lived signed URL**. The bucket is private as of the 2026 launch hardening — do NOT build public Storage URLs. The admin Documents tab manages these files.
- **Admin panel** at `src/app/(member)/admin/`, gated by `ADMIN_ONLY_ROUTES` in `src/proxy.ts` (only `tier === "admin"`). API routes `/api/admin/*` use the service-role key.
- **Tiers**: `src/proxy.ts` enforces `MEMBER_ROUTES`, `KF_ONLY_ROUTES`, `ADMIN_ONLY_ROUTES`. Missing/inactive profile → `/login`; NHG user on a KF-only route → `/nhg`; non-admin on an admin route → their home. Member pages and API routes should also re-check tier server-side — do not rely on middleware alone.
- **Email**: contact form and transactional email send via Resend (`/api/contact`).

## Working notes
- Pre-launch. Launch-readiness findings and the phased fix plan live in `LAUNCH-AUDIT.md`.
- Deployed on Vercel, git-connected: pushing to GitHub auto-deploys; non-`main` branches get preview URLs; `main` is production. Verify production builds with env vars present.
