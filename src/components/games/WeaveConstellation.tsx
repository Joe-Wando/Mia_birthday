import { useState } from "react";
import { motion } from "framer-motion";
import { constellationPatterns } from "../../data/constellation";

function pickPattern(excludeId?: string) {
  const pool = excludeId
    ? constellationPatterns.filter((p) => p.id !== excludeId)
    : constellationPatterns;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function WeaveConstellation() {
  const [pattern, setPattern] = useState(() => pickPattern());
  const [connected, setConnected] = useState(1);
  const [wrongId, setWrongId] = useState<number | null>(null);

  const complete = connected === pattern.points.length;

  const handleClick = (index: number) => {
    if (complete) return;
    if (index === connected) {
      setConnected((c) => c + 1);
    } else if (index > connected) {
      setWrongId(index);
      window.setTimeout(() => setWrongId(null), 300);
    }
  };

  const nextPattern = () => {
    setPattern(pickPattern(pattern.id));
    setConnected(1);
  };

  return (
    <div className="text-center">
      <p className="font-body text-sm text-mist">
        Click the stars in order to trace {pattern.name.toLowerCase()}.
      </p>

      <div className="relative mt-6 h-64 overflow-hidden rounded-md border border-gold/20 bg-gradient-to-b from-panel-2 to-void sm:h-80">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {pattern.points.slice(1, connected).map((point, i) => {
            const prev = pattern.points[i];
            return (
              <line
                key={`${pattern.id}-${i}`}
                x1={prev.x}
                y1={prev.y}
                x2={point.x}
                y2={point.y}
                stroke="#e2c261"
                strokeWidth="0.5"
                opacity="0.8"
              />
            );
          })}
          {connected > 1 && connected <= pattern.points.length ? (
            <motion.line
              key={`${pattern.id}-latest-${connected}`}
              x1={pattern.points[connected - 2]?.x}
              y1={pattern.points[connected - 2]?.y}
              x2={pattern.points[connected - 1]?.x}
              y2={pattern.points[connected - 1]?.y}
              stroke="#e2c261"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          ) : null}
        </svg>

        {pattern.points.map((point, index) => {
          const isConnected = index < connected;
          const isNext = index === connected;
          const isWrong = wrongId === index;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              aria-label={isConnected ? "Star already connected" : "Star"}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              className="absolute flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            >
              <motion.span
                animate={
                  isWrong
                    ? { x: [0, -4, 4, -3, 3, 0] }
                    : isNext && !complete
                      ? { scale: [1, 1.3, 1] }
                      : { scale: 1 }
                }
                transition={
                  isWrong
                    ? { duration: 0.35 }
                    : { duration: 1.4, repeat: isNext && !complete ? Infinity : 0, ease: "easeInOut" }
                }
                className={`h-3 w-3 rounded-full ${
                  isConnected || complete
                    ? "bg-gold-soft shadow-[0_0_10px_rgba(226,194,97,0.8)]"
                    : "bg-mist/60"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-6 min-h-[5rem]">
        {complete ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="font-display text-lg text-gold-soft">{pattern.name} — complete</p>
            <p className="mx-auto mt-2 max-w-md font-body text-sm italic text-mist">{pattern.blessing}</p>
            <button
              type="button"
              onClick={nextPattern}
              className="mt-6 min-h-[44px] rounded-sm border border-gold px-6 py-2 font-body text-sm uppercase tracking-[0.15em] text-gold-soft transition-colors hover:bg-gold/10"
            >
              Weave another
            </button>
          </motion.div>
        ) : (
          <p className="font-body text-xs uppercase tracking-[0.2em] text-mist/70">
            {connected} of {pattern.points.length} stars connected
          </p>
        )}
      </div>
    </div>
  );
}
