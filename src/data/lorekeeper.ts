// Edit this file to change the flip-card content in the Lorekeeper's Corner.
// PLACEHOLDER entries below — swap in your final list when ready.

export type LoreCard = {
  id: string;
  term: string;
  explanation: string;
};

export type LoreTabId = "expressions" | "history" | "fantasy";

export type LoreTab = {
  id: LoreTabId;
  label: string;
  cards: LoreCard[];
};

export const loreTabs: LoreTab[] = [
  {
    id: "expressions",
    label: "Rare Expressions",
    cards: [
      {
        id: "expr-1",
        term: "Once in a blue moon",
        explanation: "Something that happens very rarely — blue moons (a second full moon in a month) are uncommon.",
      },
      {
        id: "expr-2",
        term: "Bite the bullet",
        explanation: "To force yourself to do something unpleasant or difficult that you've been putting off.",
      },
      {
        id: "expr-3",
        term: "Burning the midnight oil",
        explanation: "Working late into the night — from the days before electric light, when oil lamps were used.",
      },
      {
        id: "expr-4",
        term: "A red herring",
        explanation: "A clue or piece of information designed to mislead or distract from the real matter.",
      },
      {
        id: "expr-5",
        term: "Break the ice",
        explanation: "To ease tension or awkwardness, especially between people meeting for the first time.",
      },
      {
        id: "expr-6",
        term: "In the same boat",
        explanation: "Sharing the same difficult or unfortunate situation as someone else.",
      },
    ],
  },
  {
    id: "history",
    label: "History & Law",
    cards: [
      {
        id: "hist-1",
        term: "Habeas corpus",
        explanation: "A legal principle requiring that a detained person be brought before a court to justify their imprisonment.",
      },
      {
        id: "hist-2",
        term: "The Rosetta Stone",
        explanation: "A granite stele that let scholars finally decode Egyptian hieroglyphs, discovered in 1799.",
      },
      {
        id: "hist-3",
        term: "Stare decisis",
        explanation: "The legal doctrine of following precedent — courts generally stand by previously decided cases.",
      },
      {
        id: "hist-4",
        term: "The Magna Carta",
        explanation: "A 1215 charter that limited the power of English kings and laid early groundwork for constitutional law.",
      },
      {
        id: "hist-5",
        term: "Pro bono",
        explanation: "Professional work, especially legal work, undertaken voluntarily and without payment.",
      },
      {
        id: "hist-6",
        term: "The Peace of Westphalia",
        explanation: "The 1648 treaties that ended decades of war in Europe and shaped the modern concept of sovereign states.",
      },
    ],
  },
  {
    id: "fantasy",
    label: "Fantasy Lore",
    cards: [
      {
        id: "fan-1",
        term: "Familiar",
        explanation: "A spirit or animal companion believed to assist a witch or sorcerer in their magical workings.",
      },
      {
        id: "fan-2",
        term: "Grimoire",
        explanation: "A textbook of magic, containing spells, rituals, and knowledge of magical creatures.",
      },
      {
        id: "fan-3",
        term: "Scrying",
        explanation: "The practice of gazing into a crystal ball, mirror, or water to see visions or distant events.",
      },
      {
        id: "fan-4",
        term: "Ley lines",
        explanation: "Hypothetical alignments of ancient sites believed by some to carry magical or spiritual energy.",
      },
      {
        id: "fan-5",
        term: "The Wild Hunt",
        explanation: "A folkloric myth of a ghostly procession of hunters, often led by a god or legendary figure, across the night sky.",
      },
      {
        id: "fan-6",
        term: "Liminal space",
        explanation: "A threshold or in-between place — doorways, crossroads, dusk — often considered magically significant.",
      },
    ],
  },
];
