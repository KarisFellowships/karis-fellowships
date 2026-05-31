"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Still have questions? Ask the person who invited you or email us at admin@karisfellowships.com."
        accent="sky"
        image="/butterfly-transform.jpg"
        imageAlt="Transformation in nature"
      />

      <section className="px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-border/40 bg-white p-10">
            <div className="mb-10 rounded-2xl bg-ivory/60 p-6">
              <p className="text-sm text-slate">
                You can reach us directly at{" "}
                <a
                  href="mailto:admin@karisfellowships.com"
                  className="font-medium text-teal underline underline-offset-4 decoration-teal/30 hover:text-teal-hover transition-colors"
                >
                  admin@karisfellowships.com
                </a>
              </p>
            </div>

            {status === "sent" ? (
              <div className="rounded-2xl bg-emerald-50 p-8 text-center">
                <svg className="mx-auto h-10 w-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">Message Sent</h3>
                <p className="mt-1 text-sm text-slate/60">Thank you for reaching out. We will get back to you soon.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm font-medium text-teal hover:text-teal-hover transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="font-serif text-2xl font-semibold text-foreground">Send Us a Message</h2>
                {status === "error" && (
                  <p className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
                <div className="mt-8 space-y-5">
                  {/* Honeypot — hidden from humans, filled by bots */}
                  <div className="absolute opacity-0 -z-10" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60">Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3.5 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3.5 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60">Message</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3.5 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                      rows={5}
                      placeholder="How can we help?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-xl bg-teal px-6 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-teal-hover disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
