import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { Sigil } from "./icons/Sigil";

// Client-side only — good enough to keep casual visitors out of a private
// birthday link, but not a real secret (it ships in the JS bundle).
const PASSWORD = "miaforjoe";
const STORAGE_KEY = "mia-chronicle-unlocked";

export function PasswordGate({ children }: { children: ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "true") {
      setUnlocked(true);
    }
    setChecked(true);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
    } else {
      setError(true);
      window.setTimeout(() => setError(false), 500);
    }
  };

  if (!checked) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="flex min-h-svh items-center justify-center bg-void px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm rounded-lg border border-gold/25 bg-gradient-to-b from-panel to-panel-2 p-8 text-center shadow-2xl shadow-black/60"
      >
        <Sigil />
        <h1 className="mt-4 font-display text-2xl font-semibold text-gold-soft">Mia&apos;s Chronicle</h1>
        <p className="mt-3 font-body text-sm italic text-mist">
          This chronicle is sealed. Speak the password to unlock it.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <motion.input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            animate={error ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            placeholder="Password"
            autoFocus
            aria-label="Password"
            className={`min-h-[44px] w-full rounded-sm border bg-void/40 px-4 py-2 text-center font-body text-parchment placeholder:text-mist/50 focus:outline-none ${
              error ? "border-wine" : "border-gold/30 focus:border-gold-soft"
            }`}
          />
          {error ? (
            <p className="mt-2 font-body text-xs text-wine">The seal doesn&apos;t recognize that word.</p>
          ) : null}
          <button
            type="submit"
            className="mt-5 min-h-[44px] w-full rounded-sm border border-gold bg-gold/10 px-6 py-2 font-body text-sm uppercase tracking-[0.2em] text-gold-soft transition-colors hover:bg-gold/20"
          >
            Unlock the Chronicle
          </button>
        </form>
      </motion.div>
    </div>
  );
}
