import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { totalBraziers, sweepDurationMs, zoneWidths, successMessage } from "../../data/steadyFlame";

function randomZoneStart(width: number) {
  return Math.random() * (100 - width);
}

export function SteadyFlame() {
  const shouldReduceMotion = useReducedMotion();
  const [round, setRound] = useState(0);
  const [finished, setFinished] = useState(false);
  const [zoneStart, setZoneStart] = useState(() => randomZoneStart(zoneWidths[0]));
  const [flash, setFlash] = useState<"hit" | "miss" | null>(null);

  const position = useMotionValue(0);
  const left = useTransform(position, (v) => `${v}%`);
  const direction = useRef<1 | -1>(1);

  useAnimationFrame((_, delta) => {
    if (finished) return;
    const speed = shouldReduceMotion ? 100 / (sweepDurationMs * 2) : 100 / sweepDurationMs;
    let next = position.get() + direction.current * speed * delta;
    if (next >= 100) {
      next = 100;
      direction.current = -1;
    } else if (next <= 0) {
      next = 0;
      direction.current = 1;
    }
    position.set(next);
  });

  const zoneWidth = zoneWidths[Math.min(round, zoneWidths.length - 1)];

  const handleStop = () => {
    if (finished) return;
    const current = position.get();
    const hit = current >= zoneStart && current <= zoneStart + zoneWidth;

    setFlash(hit ? "hit" : "miss");
    window.setTimeout(() => setFlash(null), 300);

    if (hit) {
      const nextRound = round + 1;
      if (nextRound >= totalBraziers) {
        setFinished(true);
      } else {
        setRound(nextRound);
        setZoneStart(randomZoneStart(zoneWidths[Math.min(nextRound, zoneWidths.length - 1)]));
      }
    }
  };

  const reset = () => {
    setRound(0);
    setFinished(false);
    setZoneStart(randomZoneStart(zoneWidths[0]));
    position.set(0);
    direction.current = 1;
  };

  return (
    <div className="text-center">
      <p className="font-body text-sm text-mist">
        Click "Stop" the instant the marker crosses the glowing zone to light each brazier.
      </p>

      <div className="mt-6 flex justify-center gap-3">
        {Array.from({ length: totalBraziers }, (_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full ${
              i < round || finished ? "bg-gold-soft shadow-[0_0_10px_rgba(226,194,97,0.7)]" : "bg-panel-2 border border-gold/25"
            }`}
          />
        ))}
      </div>

      {finished ? (
        <div className="mt-8">
          <p className="font-display text-xl text-gold-soft">Every brazier is lit.</p>
          <p className="mx-auto mt-2 max-w-md font-body text-sm italic text-mist">{successMessage}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 min-h-[44px] rounded-sm border border-gold px-6 py-2 font-body text-sm uppercase tracking-[0.15em] text-gold-soft transition-colors hover:bg-gold/10"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="relative mx-auto mt-8 h-4 max-w-md rounded-full bg-panel-2">
            <div
              className="absolute inset-y-0 rounded-full bg-gold/25 border border-gold-soft/50"
              style={{ left: `${zoneStart}%`, width: `${zoneWidth}%` }}
            />
            <motion.div
              className={`absolute top-1/2 h-6 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                flash === "hit" ? "bg-glow-soft" : flash === "miss" ? "bg-wine" : "bg-gold-soft"
              }`}
              style={{ left }}
            />
          </div>

          <button
            type="button"
            onClick={handleStop}
            className="mt-8 min-h-[44px] rounded-sm border border-gold px-8 py-2 font-body text-sm uppercase tracking-[0.2em] text-gold-soft transition-colors hover:bg-gold/10"
          >
            Stop
          </button>
        </>
      )}
    </div>
  );
}
