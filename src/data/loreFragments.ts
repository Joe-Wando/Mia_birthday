// Lore fragments revealed by the "Wander & Discover" game. Each one is
// pulled from (or written to match the tone of) the Lorekeeper's Corner.
// `position` is a percentage (0-100) across the scene where the character stops.

export type LoreFragment = {
  id: string;
  position: number;
  title: string;
  text: string;
};

export const loreFragments: LoreFragment[] = [
  {
    id: "frag-1",
    position: 14,
    title: "The Crossroads",
    text: "Old maps mark this spot with a single word: wait. Travelers who linger here at dusk say the path changes when no one is looking.",
  },
  {
    id: "frag-2",
    position: 40,
    title: "The Sunken Library",
    text: "Somewhere below, a library of grimoires sleeps underwater, pages perfectly preserved by a spell no one remembers casting.",
  },
  {
    id: "frag-3",
    position: 66,
    title: "The Watching Wolf",
    text: "A black wolf is said to guard the throne road — not out of duty, but loyalty freely given to whoever earns it.",
  },
  {
    id: "frag-4",
    position: 88,
    title: "The Last Ember",
    text: "Legend says the realm was born from a single ember that refused to go out. It's said to still be burning, somewhere far east.",
  },
];
