import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "./Modal";
import { GrimoireBook } from "./GrimoireBook";
import { grimoireChapters } from "../data/grimoire";

export function GrimoireSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const activeChapter = grimoireChapters.find((c) => c.id === openId) ?? null;

  return (
    <section id="grimoire" className="relative bg-void px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold text-gold-soft sm:text-5xl">The Grimoire</h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-sm text-mist">
            A few chronicles worth reading in full, page by page — and, tucked in the back, a handful of
            spells no one should technically have access to.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {grimoireChapters.map((chapter, index) => {
            const isSpellChapter = chapter.kind === "spells";
            return (
              <motion.button
                key={chapter.id}
                type="button"
                onClick={() => setOpenId(chapter.id)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group relative flex min-h-[140px] flex-col justify-end overflow-hidden rounded-md border bg-gradient-to-br from-panel to-panel-2 py-5 pl-8 pr-5 text-left shadow-lg shadow-black/30 transition-colors ${
                  isSpellChapter
                    ? "border-wine/40 hover:border-wine"
                    : "border-gold/20 hover:border-gold-soft/60"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-2.5 bg-gradient-to-b ${
                    isSpellChapter ? "from-wine/80 via-wine/40 to-wine/80" : "from-gold/80 via-gold-soft/40 to-gold/80"
                  }`}
                />
                {isSpellChapter ? (
                  <span className="mb-2 font-body text-[0.65rem] uppercase tracking-[0.2em] text-wine">
                    Forbidden pages
                  </span>
                ) : null}
                <h3 className="font-display text-xl font-semibold text-gold-soft sm:text-2xl">
                  {chapter.title}
                </h3>
                <p className="mt-2 font-body text-sm text-parchment/85">{chapter.teaser}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      <Modal
        open={Boolean(activeChapter)}
        onClose={() => setOpenId(null)}
        title={activeChapter?.title ?? ""}
        maxWidthClassName="max-w-4xl"
      >
        {activeChapter ? <GrimoireBook chapter={activeChapter} /> : null}
      </Modal>
    </section>
  );
}
