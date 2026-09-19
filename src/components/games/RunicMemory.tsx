import { useState } from "react";
import { motion } from "framer-motion";
import { RuneIcon } from "../icons/RuneIcon";
import { runeIds } from "../../data/runes";
import type { RuneId } from "../../data/runes";

type Card = {
  key: string;
  rune: RuneId;
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makeDeck(): Card[] {
  const doubled = [...runeIds, ...runeIds];
  return shuffle(doubled).map((rune, i) => ({ key: `${rune}-${i}`, rune }));
}

export function RunicMemory() {
  const [deck, setDeck] = useState<Card[]>(() => makeDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const won = matched.size === deck.length;

  const handleFlip = (index: number) => {
    if (locked || flipped.includes(index) || matched.has(index)) return;

    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      setLocked(true);
      setMoves((m) => m + 1);
      const [a, b] = next;
      const isMatch = deck[a].rune === deck[b].rune;

      if (isMatch) {
        window.setTimeout(() => {
          setMatched((prev) => new Set(prev).add(a).add(b));
          setFlipped([]);
          setLocked(false);
        }, 500);
      } else {
        window.setTimeout(() => {
          setWrongPair(next);
          window.setTimeout(() => {
            setWrongPair([]);
            setFlipped([]);
            setLocked(false);
          }, 500);
        }, 500);
      }
    }
  };

  const reset = () => {
    setDeck(makeDeck());
    setFlipped([]);
    setMatched(new Set());
    setWrongPair([]);
    setMoves(0);
    setLocked(false);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between font-body text-xs uppercase tracking-[0.15em] text-mist">
        <span>Moves: {moves}</span>
        <button
          type="button"
          onClick={reset}
          className="min-h-[44px] rounded-sm border border-gold/30 px-3 py-2 text-mist transition-colors hover:border-gold hover:text-gold-soft"
        >
          Reset
        </button>
      </div>

      {won ? (
        <div className="py-8 text-center">
          <p className="font-display text-2xl text-gold-soft">You win!</p>
          <p className="mt-2 font-body text-sm text-mist">Solved in {moves} moves.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 min-h-[44px] rounded-sm border border-gold px-6 py-2 font-body text-sm uppercase tracking-[0.15em] text-gold-soft transition-colors hover:bg-gold/10"
          >
            Play again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3">
          {deck.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.has(index);
            const isMatched = matched.has(index);
            const isWrong = wrongPair.includes(index);

            return (
              <button
                key={card.key}
                type="button"
                onClick={() => handleFlip(index)}
                disabled={isFlipped}
                aria-label={isFlipped ? `Rune revealed: ${card.rune}` : "Hidden rune card"}
                className="aspect-square min-h-[44px] [perspective:600px]"
              >
                <motion.div
                  className={`relative h-full w-full rounded-md ${isMatched ? "animate-glow-pulse" : ""}`}
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                    x: isWrong ? [0, -6, 6, -4, 4, 0] : 0,
                  }}
                  transition={{
                    rotateY: { duration: 0.45, ease: "easeInOut" },
                    x: { duration: 0.4 },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* card back */}
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-md border border-gold/30 bg-panel-2"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="font-display text-xl text-gold/50">?</span>
                  </div>
                  {/* card face */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center rounded-md border p-2 ${
                      isMatched ? "border-gold-soft bg-gold/10" : "border-gold/30 bg-panel"
                    }`}
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <RuneIcon id={card.rune} className="h-full w-full text-gold-soft" />
                  </div>
                </motion.div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
