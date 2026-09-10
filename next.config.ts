import type { NextConfig } from "next";

// The Supabase project origin the browser talks to (auth + signed storage URLs).
// Derived from env so the CSP tracks the configured project automatically.
const supabaseOrigin = (() => {
  try {
    return new URL(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://afeaatpzvpdlttqyspdd.supabase.co"
    ).origin;
  } catch {
    return "https://afeaatpzvpdlttqyspdd.supabase.co";
  }
})();
const supabaseWs = supabaseOrigin.replace(/^https:/, "wss:");

// Content-Security-Policy. Shipped as REPORT-ONLY first: it blocks nothing and
// only reports violations to the browser console, so we can watch a full Stripe
// checkout + login + lesson/document view and confirm nothing legitimate trips
// it. Once verified clean, rename the key to "Content-Security-Policy" to enforce.
//
// Notes:
// - script-src / style-src keep 'unsafe-inline' because Next.js App Router emits
//   inline hydration scripts and next/font + Tailwind + lesson inline styles need
//   inline styles. The real hardening (nonces + 'strict-dynamic') is a follow-up.
// - Stripe.js loads from js.stripe.com and beacons api.stripe.com; Checkout is a
//   top-level redirect (not framed), but Stripe.js still injects hidden iframes.
// - Fonts are self-hosted by next/font, so no fonts.gstatic.com is needed.
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${supabaseOrigin}`,
  "font-src 'self' data:",
  `connect-src 'self' ${supabaseOrigin} ${supabaseWs} https://api.stripe.com https://m.stripe.com https://r.stripe.com https://q.stripe.com`,
  `frame-src 'self' ${supabaseOrigin} https://js.stripe.com https://checkout.stripe.com https://hooks.stripe.com https://m.stripe.network`,
  "worker-src 'self' blob:",
  `media-src 'self' ${supabaseOrigin}`,
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
