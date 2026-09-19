import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { loreFragments } from "../../data/loreFragments";

export function WanderDiscover() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [found, setFound] = useState<Set<string>>(new Set());
  const shouldReduceMotion = useReducedMotion();

  const active = loreFragments.find((f) => f.id === activeId) ?? null;
  const stops = loreFragments.map((f) => f.position);

  const reveal = (id: string) => {
    setActiveId(id);
    setFound((prev) => new Set(prev).add(id));
  };

  return (
    <div>
      <p className="font-body text-sm text-mist">
        Click the glowing markers along the path to uncover fragments of the realm's lore.
      </p>

      <div className="relative mt-6 h-40 overflow-hidden rounded-md border border-gold/20 bg-gradient-to-b from-panel-2 to-panel sm:h-48">
        {/* ground line */}
        <div className="absolute inset-x-0 bottom-10 h-px bg-gold/15" />

        {/*
          PLACEHOLDER CHARACTER — swap this motion.div for a real sprite:
          e.g. <motion.img src={characterSprite} className="h-12 w-12" ... />
          or a sprite-sheet animation driven by steps() timing on backgroundPosition.
          Keeping it a simple silhouette so the game logic isn't blocked on final art.
        */}
        <motion.div
          className="absolute bottom-10 h-8 w-8 rounded-full border-2 border-gold-soft bg-gradient-to-b from-gold-soft/80 to-panel shadow-[0_0_10px_rgba(226,194,97,0.5)]"
          style={{ marginLeft: "-1rem" }}
          animate={
            shouldReduceMotion
              ? { left: `${stops[stops.length - 1]}%` }
              : { left: stops.map((s) => `${s}%`) }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: stops.length * 2.6,
                  times: stops.map((_, i) => i / (stops.length - 1)),
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }
          }
        />

        {loreFragments.map((fragment) => (
          <button
            key={fragment.id}
            type="button"
            onClick={() => reveal(fragment.id)}
            style={{ left: `${fragment.position}%` }}
            className="absolute bottom-8 flex min-h-[44px] min-w-[44px] -translate-x-1/2 flex-col items-center justify-end gap-1 pb-1"
            aria-label={`Reveal lore: ${fragment.title}`}
          >
            <span
              className={`h-3 w-3 rounded-full transition-shadow ${
                found.has(fragment.id)
                  ? "bg-glow-soft shadow-[0_0_10px_rgba(111,179,163,0.7)]"
                  : "bg-gold-soft shadow-[0_0_10px_rgba(226,194,97,0.7)] animate-pulse"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="mt-6 min-h-[7rem]">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="rounded-sm border border-gold/20 bg-panel-2/60 p-4"
            >
              <h5 className="font-display text-lg text-gold-soft">{active.title}</h5>
              <p className="mt-2 font-body text-sm leading-relaxed text-parchment/90">{active.text}</p>
            </motion.div>
          ) : (
            <p className="font-body text-xs uppercase tracking-[0.2em] text-mist/70">
              {found.size} of {loreFragments.length} fragments found
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
