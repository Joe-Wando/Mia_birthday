// "Ember Catch" — a pure reflex game, no knowledge required. Tune timing or
// edit the verdict messages shown at the end based on the final combo.

export const gameDurationSeconds = 20;
export const emberSpawnIntervalMs = 700;
export const emberLifetimeMs = 2200;

export type ScoreTier = {
  minScore: number;
  message: string;
};

// Checked from highest to lowest; the first match whose minScore is met wins.
export const scoreTiers: ScoreTier[] = [
  { minScore: 18, message: "Embers don't usually let themselves be caught. Yours clearly made an exception." },
  { minScore: 12, message: "A very respectable haul. The fire approves." },
  { minScore: 6, message: "A handful of sparks caught — not bad for a first pass." },
  { minScore: 0, message: "The embers were feeling shy tonight. Try again?" },
];
