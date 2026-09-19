// "The Rune Cast" — a luck-based divination game with no wrong outcomes.
// Each cast draws 3 runes (repeats allowed) and stitches their fragments
// into a reading. Edit the fragments to change the tone of every reading.

import type { RuneId } from "./runes";

export const runeFragments: Record<RuneId, string> = {
  ember: "a stubborn little spark refuses to go out",
  thorn: "something worth protecting is closer than it looks",
  wave: "a change is already moving, quietly, underneath everything",
  crown: "you're about to be given more credit than you expect",
  eye: "you already know the answer — you're just double-checking",
  key: "a door you assumed was locked was never actually closed",
};

export const castIntro =
  "Cast the runes and see which three fragments land face up.";
