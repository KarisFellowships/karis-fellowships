"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

interface DateInfo {
  introMeeting: string;
  studyEnd: string;
  weeklyStart: string | null;
  weekendIntensive: string | null;
}

export default function RegisterClient({ dateInfo }: { dateInfo?: DateInfo | null }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [meetingChoice, setMeetingChoice] = useState("");
  const [karisLink, setKarisLink] = useState("");
  const [hopeToGain, setHopeToGain] = useState("");
  const [registeredBefore, setRegisteredBefore] = useState("");
  const [questionsComments, setQuestionsComments] = useState("");
  const [donationAmount, setDonationAmount] = useState("30");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isReturning = registeredBefore === "Yes";

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const registrationMeta = {
      name: firstName,
      country,
      state,
      city,
      phone,
      meeting_choice: meetingChoice,
      karis_link: karisLink,
      hope_to_gain: hopeToGain,
      registered_before: registeredBefore,
      questions_comments: questionsComments,
    };

    if (isReturning) {
      const supabase = createClient();
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError("Could not sign in. Please check your email and password, or select 'No' if this is your first time.");
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: { ...registrationMeta, last_re_registration: new Date().toISOString() },
      });

      if (updateError) {
        console.error("Metadata update failed:", updateError);
      }

      // Route returning members to their home by tier so a KF member lands on the
      // dashboard, not the NHG page (mirrors the /login redirect logic).
      let destination = "/register/success";
      if (signInData.user) {
        const { data: prof } = await supabase
          .from("users")
          .select("tier")
          .eq("id", signInData.user.id)
          .maybeSingle();
        destination = prof?.tier && prof.tier !== "nhg" ? "/kf" : "/nhg";
      }
      window.location.href = destination;
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "nhg_registration",
          amount: Math.round(parseFloat(donationAmount) * 100) || 3000,
          registrationData: {
            email,
            password,
            ...registrationMeta,
          },
        }),
      });
      const { url, error: checkoutError } = await res.json();
      if (!res.ok || checkoutError || !url) {
        setError(checkoutError || "Something went wrong setting up payment. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Upcoming Book Study — full-width at top, centered on mobile */}
      {dateInfo && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-teal/20 bg-gradient-to-r from-teal/5 to-transparent px-6 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10">
              <svg className="h-5 w-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">Upcoming Book Study</p>
              <p className="mt-1.5 text-sm leading-relaxed text-balance text-slate sm:text-base">
                9 weeks &middot; Covers chapters 1&ndash;11 of <em>Neurosis and Human Growth</em>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-balance text-slate sm:text-base">Weekly or Weekend Intensive Option</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 sm:items-end sm:text-right sm:shrink-0">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal">Intro Meeting</p>
              <p className="text-base font-semibold text-foreground">{dateInfo.introMeeting}</p>
            </div>
            {dateInfo.weeklyStart && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet">Study Begins</p>
                <p className="text-base font-semibold text-foreground">{dateInfo.weeklyStart}</p>
              </div>
            )}
            {dateInfo.weekendIntensive && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-coral">Weekend Intensive</p>
                <p className="text-base font-semibold text-foreground">{dateInfo.weekendIntensive}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-12">

        {/* Registration form — last on mobile, left column on desktop */}
        <div className="order-2 lg:order-1 lg:col-span-3">
          <div className="rounded-2xl border border-border/40 bg-white p-8 sm:p-10">
            <h2 className="font-serif text-2xl font-semibold text-foreground">Register</h2>
            <p className="mt-2 text-sm text-slate/60">Create your account to begin the NHG book study.</p>

            {success ? (
              <div className="mt-6 rounded-xl bg-teal-muted px-6 py-5">
                <p className="font-medium text-teal-hover">Registration submitted!</p>
                <p className="mt-1 text-sm text-slate">
                  Your account is ready! You can now log in to access your NHG Book Study materials.{" "}
                  <Link href="/login" className="font-medium text-teal-hover underline underline-offset-4">
                    Log in here
                  </Link>
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="reg-email" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">Email Address <span className="text-coral">*</span></label>
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="reg-password" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">Password <span className="text-coral">*</span></label>
                  <input
                    id="reg-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    placeholder="Minimum 8 characters"
                  />
                </div>
                <div>
                  <label htmlFor="reg-firstName" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">First Name <span className="text-coral">*</span></label>
                  <input
                    id="reg-firstName"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    placeholder="Your first name"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label htmlFor="reg-country" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">Country <span className="text-coral">*</span></label>
                    <input
                      id="reg-country"
                      type="text"
                      autoComplete="country-name"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                      placeholder="Country"
                    />
                  </div>
                  <div>
                    <label htmlFor="reg-state" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">State</label>
                    <input
                      id="reg-state"
                      type="text"
                      autoComplete="address-level1"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                      placeholder="State / Province"
                    />
                  </div>
                  <div>
                    <label htmlFor="reg-city" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">City</label>
                    <input
                      id="reg-city"
                      type="text"
                      autoComplete="address-level2"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                      placeholder="City"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-phone" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">Phone Number <span className="text-coral">*</span></label>
                  <input
                    id="reg-phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <span id="reg-meeting-label" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">Which meeting would you like to attend? <span className="text-coral">*</span></span>
                  <div role="radiogroup" aria-labelledby="reg-meeting-label" className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-4">
                    {[
                      { value: "weekly_study", label: "Weekly Study" },
                      { value: "weekend_intensive", label: "Weekend Intensive" },
                    ].map(({ value, label }) => (
                      <label key={value} className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm text-slate transition-all hover:border-teal/30 has-[:checked]:border-teal/50 has-[:checked]:bg-teal/5">
                        <input
                          type="radio"
                          name="meetingChoice"
                          value={value}
                          checked={meetingChoice === value}
                          onChange={(e) => setMeetingChoice(e.target.value)}
                          required
                          className="h-4 w-4 accent-teal"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-karisLink" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">Name of Your Karis Link <span className="text-coral">*</span></label>
                  <input
                    id="reg-karisLink"
                    type="text"
                    value={karisLink}
                    onChange={(e) => setKarisLink(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    placeholder="Person who invited you to the study"
                  />
                </div>

                <div>
                  <label htmlFor="reg-hopeToGain" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">What do you hope to gain through the Neurosis and Human Growth book study? <span className="text-coral">*</span></label>
                  <textarea
                    id="reg-hopeToGain"
                    value={hopeToGain}
                    onChange={(e) => setHopeToGain(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    rows={3}
                  />
                </div>

                <div>
                  <span id="reg-registered-label" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">Have you registered for the NHG study before? <span className="text-coral">*</span></span>
                  <div role="radiogroup" aria-labelledby="reg-registered-label" className="mt-2 flex gap-4">
                    {["Yes", "No"].map((opt) => (
                      <label key={opt} className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm text-slate transition-all hover:border-teal/30 has-[:checked]:border-teal/50 has-[:checked]:bg-teal/5">
                        <input
                          type="radio"
                          name="registeredBefore"
                          value={opt}
                          checked={registeredBefore === opt}
                          onChange={(e) => setRegisteredBefore(e.target.value)}
                          required
                          className="h-4 w-4 accent-teal"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-questionsComments" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">Questions or Comments</label>
                  <textarea
                    id="reg-questionsComments"
                    value={questionsComments}
                    onChange={(e) => setQuestionsComments(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    rows={2}
                    placeholder="Optional"
                  />
                </div>

                {!isReturning && (
                  <div className="rounded-xl border border-teal/20 bg-teal/5 px-5 py-5">
                    <p className="text-sm leading-relaxed text-slate">
                      After submitting, you will be prompted to make a donation to help cover our technology costs. We suggest <span className="font-semibold text-foreground">$30</span>, but any amount is appreciated.
                    </p>
                    <div className="mt-4">
                      <label htmlFor="reg-donation" className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate/80">Donation Amount</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {["10", "25", "30", "50"].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setDonationAmount(amt)}
                            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                              donationAmount === amt
                                ? "border-teal bg-teal/10 text-teal"
                                : "border-border/50 text-slate/60 hover:border-teal/30"
                            }`}
                          >
                            ${amt}
                          </button>
                        ))}
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate/40">$</span>
                          <input
                            id="reg-donation"
                            type="number"
                            min="1"
                            value={!["10", "25", "30", "50"].includes(donationAmount) ? donationAmount : ""}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            onFocus={() => { if (["10", "25", "30", "50"].includes(donationAmount)) setDonationAmount(""); }}
                            className="w-24 rounded-lg border border-border/50 bg-ivory/30 py-2 pl-7 pr-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                            placeholder="Other"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isReturning && (
                  <div className="rounded-xl border border-teal/20 bg-teal/5 px-5 py-4">
                    <p className="text-sm leading-relaxed text-slate">
                      Welcome back! As a returning student, no donation is needed. Simply enter the email and password from your previous registration and submit to confirm your attendance.
                    </p>
                  </div>
                )}

                {error && (
                  <p className="rounded-lg bg-coral-light px-4 py-3 text-sm text-coral">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-teal px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-teal-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting…" : "Submit Registration"}
                </button>
              </form>
            )}

            <p className="mt-4 text-xs text-slate/40">
              Already registered?{" "}
              <Link href="/login" className="text-teal underline underline-offset-2 hover:text-teal-hover transition-colors">
                Log in here
              </Link>
            </p>
          </div>
        </div>

        {/* Info — book image, how to get started, study options — first on mobile, right column on desktop */}
        <div className="order-1 lg:order-2 lg:col-span-2 lg:sticky lg:top-24">
          <div className="flex flex-col items-center">
            <a
              href="https://www.amazon.com/Neurosis-Human-Growth-Struggle-Self-Realization/dp/0393307751"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-56 sm:w-64"
            >
              <div className="overflow-hidden rounded-lg shadow-2xl shadow-slate-dark/20 transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  src="/nhg-book.jpg"
                  alt="Neurosis and Human Growth by Karen Horney"
                  width={400}
                  height={600}
                  className="w-full"
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate/50 transition-colors group-hover:text-teal">
                Purchase on Amazon &rarr;
              </p>
            </a>

            <div className="mt-8 w-full rounded-2xl bg-gradient-to-br from-ivory to-cream p-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-teal/60">How to Get Started</p>
              <h3 className="mt-2 font-serif text-lg font-semibold text-foreground">It&apos;s simple.</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                As the study progresses each week, you read the corresponding chapter of Karen Horney&apos;s <em>Neurosis and Human Growth</em>, complete its study guide, and attend a live conference call to hear additional material, check your answers, and ask questions.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-slate">
                For a big picture look at the book study and how it fits into Karis Fellowships,{" "}
                <Link href="/about" className="font-medium text-teal-hover underline underline-offset-4 decoration-teal/30 hover:text-teal-hover transition-colors">
                  click here
                </Link>.
              </p>
            </div>
          </div>

          {/* Study Formats */}
          <div className="mt-8 space-y-3">
            {[
              { title: "Flex Study", color: "border-l-teal/50", desc: "Begin any time and study at your own pace until the next round of live calls." },
              { title: "Weekend Intensive", color: "border-l-coral/50", desc: "An 8-week study with a single weekend of 6 two-hour conference calls at the end." },
              { title: "Weekly Study", color: "border-l-violet/50", desc: "An 8-week study with weekly 1.5-2 hour conference calls." },
            ].map(({ title, color, desc }) => (
              <div key={title} className={`rounded-xl border border-border/30 border-l-[3px] ${color} bg-white px-5 py-4`}>
                <h4 className="text-base font-semibold text-foreground">{title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate/70">{desc}</p>
              </div>
            ))}
          </div>

          {/* After the Study */}
          <div className="mt-6 rounded-xl bg-slate-dark/5 px-5 py-4">
            <h4 className="text-base font-semibold text-foreground">After the Study</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate/70">
              If you attend the NHG conference calls, complete your reading guides, and your registration is accepted by the KF board, you are eligible to join Karis Fellowships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
