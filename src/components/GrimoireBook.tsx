import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GrimoireChapter } from "../data/grimoire";

type GrimoireBookProps = {
  chapter: GrimoireChapter;
};

const pageVariants = {
  enter: { rotateY: 0, opacity: 1, zIndex: 1 },
  center: { rotateY: 0, opacity: 1, zIndex: 1 },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -115 : 115,
    opacity: 0,
    zIndex: 2,
    transition: { duration: 0.45, ease: "easeIn" as const },
  }),
};

export function GrimoireBook({ chapter }: GrimoireBookProps) {
  const totalPages = chapter.kind === "story" ? chapter.pages.length : chapter.spells.length;
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number, dir: 1 | -1) => {
    setDirection(dir);
    setPageIndex(index);
  };

  const isSpells = chapter.kind === "spells";

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg border border-gold/25 bg-gradient-to-br from-panel-2 to-panel shadow-2xl shadow-black/50 sm:grid sm:grid-cols-2">
        {/* spine */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-6 -translate-x-1/2 bg-gradient-to-r from-black/50 via-black/5 to-black/50 sm:block" />

        {/* left leaf — title page, always visible on sm+ */}
        <div className="relative hidden flex-col justify-between border-r border-gold/10 p-8 sm:flex">
          <div>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-mist">
              {isSpells ? "Forbidden pages" : "A chronicle"}
            </span>
            <h4 className="mt-3 font-display text-2xl font-semibold leading-tight text-gold-soft">
              {chapter.title}
            </h4>
            <div className="mt-5 h-px w-16 bg-gold/30" />
            <svg viewBox="0 0 60 60" className="mt-8 h-14 w-14 text-gold/30">
              <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="30" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M30 5 L30 15 M30 45 L30 55 M5 30 L15 30 M45 30 L55 30" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          <PageControls pageIndex={pageIndex} totalPages={totalPages} onGo={goTo} />
        </div>

        {/* right leaf — flipping content */}
        <div className="relative p-6 sm:p-8" style={{ perspective: 1400 }}>
          {/* page-stack shading behind the active leaf, for thickness */}
          <div aria-hidden className="absolute inset-3 translate-x-1 translate-y-1 rounded-md bg-void/30 sm:inset-4" />
          <div aria-hidden className="absolute inset-3 translate-x-0.5 translate-y-0.5 rounded-md bg-void/20 sm:inset-4" />

          <div className="relative min-h-[28rem] sm:min-h-[22rem]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={pageIndex}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
                className="absolute inset-0 overflow-y-auto rounded-md border border-gold/15 bg-panel p-5 sm:p-6"
              >
                {chapter.kind === "story" ? (
                  <p className="font-body text-base leading-relaxed text-parchment/90">
                    {chapter.pages[pageIndex]}
                  </p>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <h4 className="font-display text-2xl font-semibold text-gold-soft sm:text-3xl">
                      {chapter.spells[pageIndex].name}
                    </h4>
                    <p className="mt-4 font-display text-lg italic text-parchment sm:text-xl">
                      &ldquo;{chapter.spells[pageIndex].incantation}&rdquo;
                    </p>
                    <p className="mx-auto mt-4 max-w-sm font-body text-sm text-mist sm:text-base">
                      {chapter.spells[pageIndex].effect}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* mobile-only title + controls, since the left leaf is hidden below sm */}
        <div className="border-t border-gold/10 p-4 sm:hidden">
          <span className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-mist">
            {isSpells ? "Forbidden pages" : "A chronicle"} — {chapter.title}
          </span>
        </div>
      </div>

      <div className="mt-4 sm:hidden">
        <PageControls pageIndex={pageIndex} totalPages={totalPages} onGo={goTo} />
      </div>
    </div>
  );
}

type PageControlsProps = {
  pageIndex: number;
  totalPages: number;
  onGo: (index: number, dir: 1 | -1) => void;
};

function PageControls({ pageIndex, totalPages, onGo }: PageControlsProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={() => onGo(pageIndex - 1, -1)}
        disabled={pageIndex === 0}
        className="min-h-[44px] rounded-sm border border-gold/30 px-4 py-2 font-body text-xs uppercase tracking-[0.15em] text-gold-soft transition-colors hover:border-gold hover:bg-gold/10 disabled:opacity-30"
      >
        Previous
      </button>
      <span className="font-body text-xs uppercase tracking-[0.2em] text-mist">
        Page {pageIndex + 1} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onGo(pageIndex + 1, 1)}
        disabled={pageIndex === totalPages - 1}
        className="min-h-[44px] rounded-sm border border-gold/30 px-4 py-2 font-body text-xs uppercase tracking-[0.15em] text-gold-soft transition-colors hover:border-gold hover:bg-gold/10 disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}
