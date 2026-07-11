import Stripe from "stripe";

let instance: Stripe | null = null;

function getInstance(): Stripe {
  if (!instance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    instance = new Stripe(key, { apiVersion: "2026-03-25.dahlia" });
  }
  return instance;
}

// Lazy proxy: the Stripe client is constructed on first use, so a build/CI run
// (or any route that never touches Stripe) doesn't require STRIPE_SECRET_KEY.
// Existing `import { stripe } from "@/lib/stripe"` call sites are unchanged.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const client = getInstance() as unknown as Record<string | symbol, unknown>;
    const value = client[prop];
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value;
  },
});
