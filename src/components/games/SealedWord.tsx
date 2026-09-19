import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SealGraphic } from "../icons/SealGraphic";
import { sealedWords, maxWrongGuesses } from "../../data/sealedWords";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function pickWord() {
  return sealedWords[Math.floor(Math.random() * sealedWords.length)];
}

export function SealedWord() {
  const [entry, setEntry] = useState(() => pickWord());
  const [guessed, setGuessed] = useState<Set<string>>(new Set());

  const wrongGuesses = useMemo(
    () => [...guessed].filter((letter) => !entry.word.includes(letter)),
    [guessed, entry],
  );
  const won = entry.word.split("").every((letter) => guessed.has(letter));
  const lost = wrongGuesses.length >= maxWrongGuesses;
  const over = won || lost;

  const handleGuess = (letter: string) => {
    if (over || guessed.has(letter)) return;
    setGuessed((prev) => new Set(prev).add(letter));
  };

  const newGame = () => {
    setEntry(pickWord());
    setGuessed(new Set());
  };

  return (
    <div className="text-center">
      <div className="flex justify-center">
        <SealGraphic crackLevel={wrongGuesses.length} maxCracks={maxWrongGuesses} broken={lost} />
      </div>

      <p className="mt-2 font-body text-xs uppercase tracking-[0.2em] text-mist">{entry.hint}</p>

      <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
        {entry.word.split("").map((letter, i) => {
          const revealed = guessed.has(letter) || lost;
          return (
            <span
              key={i}
              className="flex h-10 w-8 items-center justify-center border-b-2 border-gold/40 font-display text-2xl sm:h-12 sm:w-9 sm:text-3xl"
            >
              {revealed ? (
                <motion.span
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.4 }}
                  className={lost && !guessed.has(letter) ? "text-wine" : "text-gold-soft"}
                >
                  {letter}
                </motion.span>
              ) : (
                ""
              )}
            </span>
          );
        })}
      </div>

      {over ? (
        <div className="mt-8">
          <p className={`font-display text-xl ${won ? "text-gold-soft" : "text-wine"}`}>
            {won ? "The seal cracks open!" : `The seal shatters. It was "${entry.word}".`}
          </p>
          <button
            type="button"
            onClick={newGame}
            className="mt-6 min-h-[44px] rounded-sm border border-gold px-6 py-2 font-body text-sm uppercase tracking-[0.15em] text-gold-soft transition-colors hover:bg-gold/10"
          >
            Try another word
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-7 gap-1.5 sm:grid-cols-9 sm:gap-2">
          {ALPHABET.map((letter) => {
            const used = guessed.has(letter);
            const correct = used && entry.word.includes(letter);
            return (
              <button
                key={letter}
                type="button"
                disabled={used}
                onClick={() => handleGuess(letter)}
                className={`flex h-10 min-h-[44px] items-center justify-center rounded-sm border font-body text-sm transition-colors sm:h-11 ${
                  used
                    ? correct
                      ? "border-gold-soft/50 bg-gold/10 text-gold-soft/60"
                      : "border-wine/50 bg-wine/15 text-wine/70"
                    : "border-gold/25 text-parchment hover:border-gold-soft hover:bg-panel-2"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      )}

      <p className="mt-4 font-body text-xs uppercase tracking-[0.2em] text-mist/70">
        {wrongGuesses.length} / {maxWrongGuesses} cracks
      </p>
    </div>
  );
}
