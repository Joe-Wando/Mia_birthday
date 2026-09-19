import { useState } from "react";
import { motion } from "framer-motion";
import portraitImg from "../assets/photos/mia-3.jpg";
import { loreTabs } from "../data/lorekeeper";
import type { LoreTabId } from "../data/lorekeeper";

function FlipCard({ term, explanation }: { term: string; explanation: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={flipped ? `${term}: ${explanation}` : `${term}. Click to reveal meaning.`}
      className="min-h-[140px] w-full [perspective:800px]"
    >
      <motion.div
        className="relative h-full min-h-[140px] w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center rounded-md border border-gold/25 bg-gradient-to-br from-panel to-panel-2 p-4 text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="font-display text-lg font-semibold text-gold-soft sm:text-xl">{term}</span>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-md border border-gold-soft/40 bg-panel-2 p-4 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="font-body text-sm leading-relaxed text-parchment/90">{explanation}</span>
        </div>
      </motion.div>
    </button>
  );
}

export function LorekeeperCorner() {
  const [activeTab, setActiveTab] = useState<LoreTabId>(loreTabs[0].id);
  const tab = loreTabs.find((t) => t.id === activeTab) ?? loreTabs[0];

  return (
    <section id="lorekeeper" className="relative bg-void px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <img
            src={portraitImg}
            alt="A hooded figure gazing at a glowing crystal ball, close portrait"
            className="h-28 w-28 rounded-full border-2 border-gold object-cover object-top shadow-[0_0_20px_rgba(201,162,39,0.3)] sm:h-36 sm:w-36"
          />
          <h2 className="mt-6 font-display text-4xl font-semibold text-gold-soft sm:text-5xl">
            The Lorekeeper&apos;s Corner
          </h2>
          <p className="mt-4 max-w-lg font-body text-sm text-mist">
            A small archive of words, history, and lore — flip each card to reveal its secret.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Lorekeeper categories"
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {loreTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={activeTab === t.id}
              onClick={() => setActiveTab(t.id)}
              className={`min-h-[44px] rounded-sm border px-5 py-2 font-body text-sm uppercase tracking-[0.15em] transition-colors ${
                activeTab === t.id
                  ? "border-gold bg-gold/15 text-gold-soft"
                  : "border-gold/20 text-mist hover:border-gold/50 hover:text-parchment"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3"
        >
          {tab.cards.map((card) => (
            <FlipCard key={card.id} term={card.term} explanation={card.explanation} />
          ))}
        </div>
      </div>
    </section>
  );
}
