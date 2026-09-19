import { useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import trialsImg from "../assets/photos/mia-2.jpg";
import wanderBg from "../assets/photos/mia-5.jpg";
import { Modal } from "./Modal";
import { GrimoireQuiz } from "./games/GrimoireQuiz";
import { LightCandles } from "./games/LightCandles";
import { RunicMemory } from "./games/RunicMemory";
import { SealedWord } from "./games/SealedWord";
import { WhoSaidIt } from "./games/WhoSaidIt";
import { WanderDiscover } from "./games/WanderDiscover";

type GameCard = {
  id: string;
  title: string;
  description: string;
  Component: ComponentType;
  bgImage?: string;
};

const games: GameCard[] = [
  {
    id: "quiz",
    title: "The Grimoire Quiz",
    description: "How well do you truly know Mia? Answer the grimoire's questions.",
    Component: GrimoireQuiz,
  },
  {
    id: "candles",
    title: "Light the Candles",
    description: "Six candles, six flames. Light them all to uncover a hidden message.",
    Component: LightCandles,
  },
  {
    id: "memory",
    title: "Runic Memory",
    description: "Match the ancient runes before your memory fails you.",
    Component: RunicMemory,
  },
  {
    id: "sealed-word",
    title: "The Sealed Word",
    description: "Guess the word before the crystal seal shatters completely.",
    Component: SealedWord,
  },
  {
    id: "who-said-it",
    title: "Who Said It?",
    description: "Match the quote to the friend who actually said it.",
    Component: WhoSaidIt,
  },
  {
    id: "wander",
    title: "Wander & Discover",
    description: "Follow the path and uncover fragments of the realm's lore.",
    Component: WanderDiscover,
    bgImage: wanderBg,
  },
];

export function TrialsSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const activeGame = games.find((g) => g.id === openId) ?? null;

  return (
    <section id="trials" className="relative bg-void px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="font-display text-4xl font-semibold text-gold-soft sm:text-5xl">
              Trials of the Realm
            </h2>
            <p className="mt-4 max-w-xs text-center font-body text-sm text-mist lg:text-left">
              Six small trials, each a piece of the chronicle. Complete them in any order you
              like.
            </p>
            <img
              src={trialsImg}
              alt="Mia seated on a dark throne, a black wolf resting beside her"
              className="mt-8 hidden aspect-[3/4] w-full max-w-[280px] rounded-md border border-gold/20 object-cover shadow-xl shadow-black/40 lg:block"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {games.map((game, index) => (
              <motion.button
                key={game.id}
                type="button"
                onClick={() => setOpenId(game.id)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative min-h-[160px] overflow-hidden rounded-md border border-gold/20 bg-gradient-to-br from-panel to-panel-2 p-5 text-left shadow-lg shadow-black/30 transition-colors hover:border-gold-soft/60"
              >
                {game.bgImage ? (
                  <>
                    <img
                      src={game.bgImage}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover opacity-45 transition-opacity group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/50 to-void/20" />
                  </>
                ) : null}
                <div className="relative z-10 flex h-full flex-col justify-end">
                  <h3 className="font-display text-xl font-semibold text-gold-soft sm:text-2xl">
                    {game.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-parchment/85">{game.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <Modal open={Boolean(activeGame)} onClose={() => setOpenId(null)} title={activeGame?.title ?? ""}>
        {activeGame ? <activeGame.Component /> : null}
      </Modal>
    </section>
  );
}
