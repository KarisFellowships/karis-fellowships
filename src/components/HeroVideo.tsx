"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
  }, []);

  return (
    <section className="grain relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-dark">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-105 brightness-105 saturate-[1.05] contrast-[1.03]"
        poster="/hero.jpg"
      >
        <source src="/TreeVideoClipped.mp4" type="video/mp4" />
        <Image src="/hero.jpg" alt="Soothing forest canopy with sunlight filtering through" fill className="object-cover scale-105" priority />
      </video>
      <div className="absolute inset-0 bg-slate-dark/15 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-dark/40 via-slate-dark/20 to-slate-dark/75" />
      <div className="relative z-10 mx-auto max-w-5xl px-8 text-center">
        <h1 className="animate-fade-up font-serif text-6xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-7xl md:text-8xl lg:text-9xl" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 4px 32px rgba(0,0,0,0.35)" }}>
          Karis Fellowships
        </h1>
        <p className="animate-fade-up-delay mt-4 whitespace-normal text-lg font-medium tracking-[0.15em] text-white uppercase sm:whitespace-nowrap sm:text-xl" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6), 0 2px 20px rgba(0,0,0,0.3)" }}>
          We empower Christians to fulfill their true glory.
        </p>
        <div className="animate-fade-up-delay-2 mt-14 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/register"
            className="group inline-flex items-center gap-3 rounded-lg bg-teal/85 backdrop-blur-sm px-8 py-4 text-[13px] font-medium tracking-widest text-white uppercase transition-all duration-500 hover:bg-teal/95"
          >
            Register
            <svg className="h-3.5 w-3.5 opacity-60 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
          <a
            href="#what-we-do"
            className="inline-flex items-center rounded-lg border border-white/50 bg-white/10 backdrop-blur-sm px-8 py-4 text-[13px] font-medium tracking-widest text-white uppercase transition-all duration-500 hover:border-white/70 hover:bg-white/20"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
