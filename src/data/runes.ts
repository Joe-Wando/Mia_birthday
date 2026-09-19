// Rune ids used by the Runic Memory game. Each id maps to an SVG glyph
// drawn in src/components/icons/RuneIcon.tsx. Add/remove ids in pairs of
// meaning (each appears twice on the board) — keep this list at 6 entries
// for a 12-card board, or adjust the game's layout math if you change it.

export type RuneId =
  | "ember"
  | "thorn"
  | "wave"
  | "crown"
  | "eye"
  | "key";

export const runeIds: RuneId[] = ["ember", "thorn", "wave", "crown", "eye", "key"];
