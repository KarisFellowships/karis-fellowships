# Karis Fellowships

A Next.js web application for Karis Fellowships International, providing weekly meeting content, member resources, and community tools.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Fonts:** Montserrat, Cormorant Garamond (via `next/font`)
- **Auth & Database:** Supabase (auth, Postgres, Storage)
- **Payments:** Stripe (checkout, webhooks)
- **Email:** Resend
- **Search:** Fuse.js (client-side)

## Getting Started

1. Copy `.env.example` to `.env.local` and fill in your credentials
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/app/(public)/` — Public pages (home, about, contact, login, register)
- `src/app/(member)/` — Authenticated member pages (dashboard, KF meetings, NHG, toolbox)
- `src/app/api/` — API routes (checkout, contact, stripe webhook, admin)
- `src/components/` — Shared UI components
- `src/lib/` — Utilities (Supabase clients, Stripe, storage URLs)
- `src/data/` — Static data (lessons JSON, lesson HTML, meeting schedule)
- `scripts/` — One-time migration and seeding scripts
