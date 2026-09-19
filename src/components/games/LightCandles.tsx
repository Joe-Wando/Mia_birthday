import { useState } from "react";
import { motion } from "framer-motion";
import { CandleIcon } from "../icons/CandleIcon";
import { candleCount, hiddenMessage } from "../../data/candles";

export function LightCandles() {
  const [lit, setLit] = useState<boolean[]>(Array(candleCount).fill(false));

  const allLit = lit.every(Boolean);

  const toggle = (index: number) => {
    setLit((prev) => prev.map((v, i) => (i === index ? true : v)));
  };

  const reset = () => setLit(Array(candleCount).fill(false));

  return (
    <div className="text-center">
      <p className="font-body text-sm text-mist">
        Light every candle to reveal what's written beneath them.
      </p>

      <div className="mt-8 flex flex-wrap items-end justify-center gap-3 sm:gap-5">
        {lit.map((isLit, index) => (
          <button
            key={index}
            type="button"
            onClick={() => toggle(index)}
            disabled={isLit}
            aria-pressed={isLit}
            aria-label={isLit ? `Candle ${index + 1}, lit` : `Light candle ${index + 1}`}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm p-1 transition-transform hover:scale-105 disabled:cursor-default"
          >
            <CandleIcon lit={isLit} />
          </button>
        ))}
      </div>

      <div className="mt-8 min-h-[6rem]">
        {allLit ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-md font-display text-lg italic text-gold-soft sm:text-xl"
          >
            {hiddenMessage}
          </motion.p>
        ) : (
          <p className="font-body text-xs uppercase tracking-[0.2em] text-mist/70">
            {lit.filter(Boolean).length} of {candleCount} lit
          </p>
        )}
      </div>

      {allLit ? (
        <button
          type="button"
          onClick={reset}
          className="mt-4 min-h-[44px] rounded-sm border border-gold/40 px-5 py-2 font-body text-xs uppercase tracking-[0.15em] text-mist transition-colors hover:border-gold hover:text-gold-soft"
        >
          Snuff out &amp; relight
        </button>
      ) : null}
    </div>
  );
}
