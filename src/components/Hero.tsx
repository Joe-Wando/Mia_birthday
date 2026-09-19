import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import heroImg from "../assets/photos/mia-1.jpg";

const EMBER_COUNT = 18;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const embers = useMemo(
    () =>
      Array.from({ length: EMBER_COUNT }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        delay: Math.round(Math.random() * 9 * 10) / 10,
        duration: 7 + Math.round(Math.random() * 5 * 10) / 10,
        size: 2 + Math.round(Math.random() * 3),
        drift: Math.round((Math.random() - 0.5) * 80),
      })),
    [],
  );

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-void"
    >
      <img
        src={heroImg}
        alt="A hooded sorceress conjures a glowing orb before a moonlit castle and a distant dragon"
        className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/55 to-void" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-void/20 to-void/70" />

      {!shouldReduceMotion ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {embers.map((ember) => (
            <span
              key={ember.id}
              className="absolute bottom-0 rounded-full bg-gold-soft/80 shadow-[0_0_6px_2px_rgba(226,194,97,0.5)] animate-ember-rise"
              style={{
                left: `${ember.left}%`,
                width: ember.size,
                height: ember.size,
                animationDelay: `${ember.delay}s`,
                animationDuration: `${ember.duration}s`,
                ["--drift" as string]: `${ember.drift}px`,
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-32 text-center sm:px-6">
        <p className="font-body text-sm italic tracking-[0.2em] text-mist sm:text-base">
          a small chronicle, written for
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] text-gold-soft drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)] sm:text-7xl">
          Happy Birthday
          <span className="mt-2 block font-display text-6xl italic font-medium text-parchment sm:text-8xl">
            Mia
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-parchment/90 sm:text-lg">
          Another year added to the legend. Somewhere between the realm's trials and its
          quiet lore, a chronicle has been kept — and tonight, it's yours to explore.
        </p>
        <a
          href="#trials"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("trials")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-10 inline-flex min-h-[44px] items-center justify-center rounded-sm border border-gold bg-gold/10 px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-gold-soft transition-colors hover:bg-gold/20"
        >
          Enter the Trials
        </a>
      </div>
    </section>
  );
}
