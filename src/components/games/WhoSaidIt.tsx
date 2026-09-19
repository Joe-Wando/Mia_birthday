import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quotes } from "../../data/quotes";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function WhoSaidIt() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const quote = quotes[step];
  const options = useMemo(
    () => (quote ? shuffle([quote.speaker, ...quote.decoys]) : []),
    [quote],
  );

  const handlePick = (name: string) => {
    if (picked) return;
    setPicked(name);
    if (name === quote.speaker) setScore((s) => s + 1);

    window.setTimeout(() => {
      if (step + 1 < quotes.length) {
        setStep((s) => s + 1);
        setPicked(null);
      } else {
        setFinished(true);
      }
    }, 900);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setPicked(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="text-center">
        <p className="font-display text-2xl text-gold-soft sm:text-3xl">
          {score} / {quotes.length}
        </p>
        <p className="mt-4 font-body italic text-mist">
          {score === quotes.length
            ? "You know this crew's voices by heart."
            : "A worthy attempt — some quotes are trickier than others."}
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-8 min-h-[44px] rounded-sm border border-gold px-6 py-2 font-body text-sm uppercase tracking-[0.15em] text-gold-soft transition-colors hover:bg-gold/10"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="font-body text-xs uppercase tracking-[0.2em] text-mist">
        Quote {step + 1} of {quotes.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.blockquote
          key={quote.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mt-4 min-h-[4.5rem] font-display text-xl italic leading-snug text-parchment sm:text-2xl"
        >
          {quote.quote}
        </motion.blockquote>
      </AnimatePresence>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {options.map((name) => {
          let halo = "border-gold/25 hover:border-gold-soft hover:bg-panel-2";
          if (picked) {
            const isThisCorrect = name === quote.speaker;
            const isThisPicked = name === picked;
            if (isThisCorrect) {
              halo = "border-glow-soft bg-glow/15 text-glow-soft animate-glow-pulse";
            } else if (isThisPicked) {
              halo = "border-wine bg-wine/20 text-parchment";
            } else {
              halo = "border-gold/10 text-mist/50";
            }
          }

          return (
            <button
              key={name}
              type="button"
              disabled={Boolean(picked)}
              onClick={() => handlePick(name)}
              className={`min-h-[44px] rounded-sm border px-4 py-3 font-body text-sm transition-colors duration-300 sm:text-base ${halo}`}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
