import { useState } from "react";
import { motion } from "framer-motion";
import { successMessage } from "../../data/slidingCrest";

const TILE_SIZE = 96;
const GRID = 3;
const BLANK = 8;

function CrestArt() {
  return (
    <svg viewBox="0 0 288 288" width={TILE_SIZE * GRID} height={TILE_SIZE * GRID} className="text-gold-soft">
      <rect x="4" y="4" width="280" height="280" rx="8" fill="#1d1729" stroke="currentColor" strokeWidth="2" opacity="0.9" />
      <circle cx="144" cy="144" r="110" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <circle cx="144" cy="144" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <circle cx="144" cy="144" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M144 24 L144 264 M24 144 L264 144" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M144 44 L158 130 L144 244 L130 130 Z" fill="currentColor" opacity="0.15" />
      <path d="M64 64 L84 64 M64 64 L64 84" stroke="currentColor" strokeWidth="2" />
      <path d="M224 64 L204 64 M224 64 L224 84" stroke="currentColor" strokeWidth="2" />
      <path d="M64 224 L84 224 M64 224 L64 204" stroke="currentColor" strokeWidth="2" />
      <path d="M224 224 L204 224 M224 224 L224 204" stroke="currentColor" strokeWidth="2" />
      <circle cx="144" cy="144" r="8" fill="currentColor" />
    </svg>
  );
}

function solvedTiles(): number[] {
  return Array.from({ length: 9 }, (_, i) => i);
}

function neighborIndices(index: number): number[] {
  const row = Math.floor(index / GRID);
  const col = index % GRID;
  const neighbors: number[] = [];
  if (row > 0) neighbors.push(index - GRID);
  if (row < GRID - 1) neighbors.push(index + GRID);
  if (col > 0) neighbors.push(index - 1);
  if (col < GRID - 1) neighbors.push(index + 1);
  return neighbors;
}

function shuffle(): number[] {
  let tiles = solvedTiles();
  let blankIndex = BLANK;
  for (let i = 0; i < 120; i++) {
    const options = neighborIndices(blankIndex);
    const swapWith = options[Math.floor(Math.random() * options.length)];
    [tiles[blankIndex], tiles[swapWith]] = [tiles[swapWith], tiles[blankIndex]];
    blankIndex = swapWith;
  }
  return tiles;
}

export function SlidingCrest() {
  const [tiles, setTiles] = useState<number[]>(() => shuffle());
  const [moves, setMoves] = useState(0);

  const solved = tiles.every((value, i) => value === i);
  const blankIndex = tiles.indexOf(BLANK);

  const handleTileClick = (gridIndex: number) => {
    if (solved) return;
    if (!neighborIndices(blankIndex).includes(gridIndex)) return;

    const next = [...tiles];
    [next[blankIndex], next[gridIndex]] = [next[gridIndex], next[blankIndex]];
    setTiles(next);
    setMoves((m) => m + 1);
  };

  const reset = () => {
    setTiles(shuffle());
    setMoves(0);
  };

  return (
    <div className="text-center">
      <p className="font-body text-sm text-mist">Slide the tiles to restore the crest. No two ways about it — just patience.</p>

      <div className="mt-6 flex items-center justify-center gap-6 font-body text-xs uppercase tracking-[0.2em] text-mist">
        <span>Moves: {moves}</span>
      </div>

      <div
        className="relative mx-auto mt-4 overflow-hidden rounded-md border border-gold/25 bg-void"
        style={{ width: TILE_SIZE * GRID, height: TILE_SIZE * GRID }}
      >
        {tiles.map((homeIndex, gridIndex) => {
          if (homeIndex === BLANK) return null;
          const row = Math.floor(gridIndex / GRID);
          const col = gridIndex % GRID;
          const homeRow = Math.floor(homeIndex / GRID);
          const homeCol = homeIndex % GRID;
          const isMovable = !solved && neighborIndices(blankIndex).includes(gridIndex);

          return (
            <motion.button
              key={homeIndex}
              type="button"
              onClick={() => handleTileClick(gridIndex)}
              aria-label={`Puzzle tile ${homeIndex + 1}`}
              className={`absolute overflow-hidden shadow-[inset_0_0_0_1px_rgba(201,162,39,0.25)] ${
                isMovable ? "cursor-pointer hover:brightness-110" : "cursor-default"
              }`}
              style={{ width: TILE_SIZE, height: TILE_SIZE }}
              animate={{ left: col * TILE_SIZE, top: row * TILE_SIZE }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            >
              <div style={{ position: "absolute", left: -homeCol * TILE_SIZE, top: -homeRow * TILE_SIZE }}>
                <CrestArt />
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 min-h-[4rem]">
        {solved ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="font-display text-xl text-gold-soft">Restored!</p>
            <p className="mx-auto mt-2 max-w-md font-body text-sm italic text-mist">{successMessage}</p>
          </motion.div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={reset}
        className="mt-2 min-h-[44px] rounded-sm border border-gold/40 px-6 py-2 font-body text-sm uppercase tracking-[0.15em] text-mist transition-colors hover:border-gold hover:text-gold-soft"
      >
        Shuffle again
      </button>
    </div>
  );
}
