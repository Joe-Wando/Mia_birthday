// Edit this file to change the Grimoire Quiz questions.
// `correctIndex` is the zero-based index into `options`.

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is Mia's favorite color?",
    options: ["Black", "Burgundy", "Emerald", "Gold"],
    correctIndex: 0,
  },
  {
    id: "q2",
    question: "If Mia had a familiar (a magical animal companion), it would most likely be a...",
    options: ["Raven", "Black cat", "Wolf", "Owl"],
    correctIndex: 1,
  },
  {
    id: "q3",
    question: "Mia's ideal birthday celebration involves...",
    options: [
      "A quiet night in with a good book",
      "A big party with all her friends",
      "A themed dress-up night",
      "A long, aimless adventure",
    ],
    correctIndex: 2,
  },
  {
    id: "q4",
    question: "Which fantasy trope is Mia most drawn to?",
    options: [
      "The chosen one prophecy",
      "The morally-grey antihero",
      "The found-family adventuring party",
      "The forbidden romance",
    ],
    correctIndex: 1,
  },
  {
    id: "q5",
    question: "What would Mia's grimoire (spellbook) title be?",
    options: [
      "Rituals for the Restless",
      "A Compendium of Petty Curses",
      "Notes on Surviving Mortals",
      "The Book of Second Chances",
    ],
    correctIndex: 3,
  },
  {
    id: "q6",
    question: "Mia's go-to comfort snack while gaming or watching a show?",
    options: ["Chocolate", "Chips", "Gummy candy", "Tea and biscuits"],
    correctIndex: 0,
  },
];
