// Edit this file to change the words used in "The Sealed Word".
// `hint` is shown above the seal to give a gentle clue.

export type SealedWord = {
  word: string;
  hint: string;
};

export const sealedWords: SealedWord[] = [
  { word: "SORCERESS", hint: "What Mia would be, in another life." },
  { word: "MIDNIGHT", hint: "Her favorite hour." },
  { word: "GRIMOIRE", hint: "A book of secrets and spells." },
  { word: "EMBER", hint: "A small, stubborn light in the dark." },
  { word: "CHRONICLE", hint: "The story you're standing in right now." },
];

export const maxWrongGuesses = 6;
