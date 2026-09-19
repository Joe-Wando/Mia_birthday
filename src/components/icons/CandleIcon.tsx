import { motion, useReducedMotion } from "framer-motion";

type CandleIconProps = {
  lit: boolean;
};

export function CandleIcon({ lit }: CandleIconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 40 90" className="h-16 w-8 sm:h-20 sm:w-9" aria-hidden="true">
      {/* holder */}
      <ellipse cx="20" cy="86" rx="14" ry="3.5" fill="#1d1729" stroke="#c9a227" strokeWidth="1" />
      {/* candle body */}
      <rect x="12" y="34" width="16" height="52" rx="2.5" fill="#efe3c8" opacity="0.9" />
      <rect x="12" y="34" width="16" height="52" rx="2.5" fill="none" stroke="#a29fc0" strokeWidth="0.75" opacity="0.5" />
      {/* wax drips */}
      <path d="M12 44 q-3 4 0 9" stroke="#a29fc0" strokeWidth="1" fill="none" opacity="0.5" />
      {/* wick */}
      <line x1="20" y1="34" x2="20" y2="27" stroke="#3d2f1a" strokeWidth="1.5" />

      {lit ? (
        <motion.g
          initial={{ scale: 0, opacity: 0, y: 6 }}
          animate={
            shouldReduceMotion
              ? { scale: 1, opacity: 1, y: 0 }
              : {
                  scale: [1, 1.08, 0.94, 1.05, 1],
                  opacity: [1, 0.92, 1, 0.95, 1],
                  rotate: [-1, 1.5, -2, 1, -1],
                  y: 0,
                }
          }
          transition={
            shouldReduceMotion
              ? { type: "spring", stiffness: 300, damping: 14 }
              : {
                  scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                  y: { type: "spring", stiffness: 300, damping: 14 },
                }
          }
          style={{ transformOrigin: "20px 26px" }}
        >
          <path
            d="M20 8 C25 14 26 20 20 26 C14 20 15 14 20 8 Z"
            fill="#e2c261"
          />
          <path
            d="M20 14 C22.5 17.5 23 20.5 20 24 C17 20.5 17.5 17.5 20 14 Z"
            fill="#6fb3a3"
            opacity="0.85"
          />
        </motion.g>
      ) : null}
    </svg>
  );
}
