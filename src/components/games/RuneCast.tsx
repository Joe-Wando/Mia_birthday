import { useState } from "react";
import { motion } from "framer-motion";
import { RuneIcon } from "../icons/RuneIcon";
import { runeIds } from "../../data/runes";
import type { RuneId } from "../../data/runes";
import { runeFragments, castIntro } from "../../data/runeCast";

function castThree(): RuneId[] {
  return Array.from({ length: 3 }, () => runeIds[Math.floor(Math.random() * runeIds.length)]);
}

export function RuneCast() {
  const [cast, setCast] = useState<RuneId[] | null>(null);
  const [tilts] = useState(() => Array.from({ length: 3 }, () => (Math.random() - 0.5) * 30));

  const handleCast = () => setCast(castThree());

  return (
    <div className="text-center">
      <p className="font-body text-sm text-mist">{castIntro}</p>

      <div className="mt-8 flex min-h-[7rem] items-center justify-center gap-6">
        {(cast ?? [null, null, null]).map((rune, i) => (
          <motion.div
            key={cast ? `${rune}-${i}` : `empty-${i}`}
            initial={{ scale: 0.3, opacity: 0, rotate: 0, y: -30 }}
            animate={{
              scale: 1,
              opacity: cast ? 1 : 0.25,
              rotate: cast ? tilts[i] : 0,
              y: 0,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: cast ? i * 0.12 : 0 }}
            className={`flex h-16 w-16 items-center justify-center rounded-full border-2 sm:h-20 sm:w-20 ${
              cast ? "border-gold-soft bg-gold/10" : "border-gold/20 bg-panel-2"
            }`}
          >
            {rune ? (
              <RuneIcon id={rune} className="h-9 w-9 text-gold-soft sm:h-11 sm:w-11" />
            ) : (
              <span className="font-display text-2xl text-gold/30">?</span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 min-h-[6rem]">
        {cast ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mx-auto max-w-md font-body text-sm italic leading-relaxed text-parchment/90"
          >
            The runes suggest that {runeFragments[cast[0]]}, that {runeFragments[cast[1]]}, and that{" "}
            {runeFragments[cast[2]]}.
          </motion.p>
        ) : (
          <p className="font-body text-xs uppercase tracking-[0.2em] text-mist/70">No reading yet</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleCast}
        className="mt-2 min-h-[44px] rounded-sm border border-gold px-6 py-2 font-body text-sm uppercase tracking-[0.15em] text-gold-soft transition-colors hover:bg-gold/10"
      >
        {cast ? "Cast again" : "Cast the runes"}
      </button>
    </div>
  );
}
