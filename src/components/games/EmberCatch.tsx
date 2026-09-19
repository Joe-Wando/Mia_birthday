import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  gameDurationSeconds,
  emberSpawnIntervalMs,
  emberLifetimeMs,
  scoreTiers,
} from "../../data/emberCatch";

type Phase = "idle" | "playing" | "finished";

type Ember = {
  id: number;
  left: number;
};

function getVerdict(score: number) {
  return scoreTiers.find((tier) => score >= tier.minScore)?.message ?? "";
}

export function EmberCatch() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [embers, setEmbers] = useState<Ember[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameDurationSeconds);

  const nextId = useRef(0);
  const missTimers = useRef<Map<number, number>>(new Map());
  const spawnInterval = useRef<number | null>(null);
  const countdownInterval = useRef<number | null>(null);

  const clearAllTimers = () => {
    if (spawnInterval.current) window.clearInterval(spawnInterval.current);
    if (countdownInterval.current) window.clearInterval(countdownInterval.current);
    missTimers.current.forEach((t) => window.clearTimeout(t));
    missTimers.current.clear();
  };

  useEffect(() => clearAllTimers, []);

  const spawnEmber = () => {
    const id = nextId.current++;
    const left = 8 + Math.random() * 84;
    setEmbers((prev) => [...prev, { id, left }]);

    const missTimer = window.setTimeout(() => {
      setEmbers((prev) => prev.filter((e) => e.id !== id));
      missTimers.current.delete(id);
    }, emberLifetimeMs);
    missTimers.current.set(id, missTimer);
  };

  const startGame = () => {
    setScore(0);
    setEmbers([]);
    setTimeLeft(gameDurationSeconds);
    setPhase("playing");

    spawnInterval.current = window.setInterval(spawnEmber, emberSpawnIntervalMs);
    countdownInterval.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearAllTimers();
          setEmbers([]);
          setPhase("finished");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const catchEmber = (id: number) => {
    const timer = missTimers.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      missTimers.current.delete(id);
    }
    setEmbers((prev) => prev.filter((e) => e.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div className="text-center">
      <p className="font-body text-sm text-mist">
        Catch as many rising embers as you can before they fade. Tap them the moment you see them.
      </p>

      {phase === "finished" ? (
        <div className="mt-8">
          <p className="font-display text-2xl text-gold-soft">{score} caught</p>
          <p className="mx-auto mt-3 max-w-md font-body italic text-mist">{getVerdict(score)}</p>
          <button
            type="button"
            onClick={startGame}
            className="mt-6 min-h-[44px] rounded-sm border border-gold px-6 py-2 font-body text-sm uppercase tracking-[0.15em] text-gold-soft transition-colors hover:bg-gold/10"
          >
            Play again
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4 flex items-center justify-between font-body text-xs uppercase tracking-[0.2em] text-mist">
            <span>Score: {score}</span>
            <span>Time: {timeLeft}s</span>
          </div>

          <div className="relative mt-4 h-72 overflow-hidden rounded-md border border-gold/20 bg-gradient-to-b from-panel-2 to-void sm:h-80">
            {phase === "idle" ? (
              <div className="flex h-full items-center justify-center">
                <button
                  type="button"
                  onClick={startGame}
                  className="min-h-[44px] rounded-sm border border-gold px-6 py-2 font-body text-sm uppercase tracking-[0.15em] text-gold-soft transition-colors hover:bg-gold/10"
                >
                  Start catching
                </button>
              </div>
            ) : (
              <AnimatePresence>
                {embers.map((ember) => (
                  <motion.button
                    key={ember.id}
                    type="button"
                    onClick={() => catchEmber(ember.id)}
                    aria-label="Catch ember"
                    className="absolute bottom-0 flex h-11 w-11 -translate-x-1/2 items-center justify-center"
                    style={{ left: `${ember.left}%` }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={
                      shouldReduceMotion
                        ? { opacity: [0, 1, 1, 0] }
                        : { y: -260, opacity: [0, 1, 1, 0] }
                    }
                    exit={{ opacity: 0, scale: 1.6 }}
                    transition={{ duration: emberLifetimeMs / 1000, ease: "easeOut" }}
                  >
                    <span className="h-4 w-4 rounded-full bg-gold-soft shadow-[0_0_14px_4px_rgba(226,194,97,0.65)]" />
                  </motion.button>
                ))}
              </AnimatePresence>
            )}
          </div>
        </>
      )}
    </div>
  );
}
