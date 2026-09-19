// PLACEHOLDER DATA — replace with real inside jokes / things your friends
// have actually said. `speaker` is the correct answer; `decoys` are the
// wrong options shown alongside it (keep 2-3 decoys per quote).

export type Quote = {
  id: string;
  quote: string;
  speaker: string;
  decoys: string[];
};

export const quotes: Quote[] = [
  {
    id: "quote-1",
    quote: "\"[Placeholder] I wasn't lost, the map was wrong.\"",
    speaker: "Mia",
    decoys: ["Alex", "Sam", "Jordan"],
  },
  {
    id: "quote-2",
    quote: "\"[Placeholder] We are NOT doing that again.\"",
    speaker: "Alex",
    decoys: ["Mia", "Sam", "Priya"],
  },
  {
    id: "quote-3",
    quote: "\"[Placeholder] It's fine, it's fine, everything is fine.\"",
    speaker: "Sam",
    decoys: ["Mia", "Jordan", "Priya"],
  },
  {
    id: "quote-4",
    quote: "\"[Placeholder] Absolutely not, but let's do it anyway.\"",
    speaker: "Priya",
    decoys: ["Mia", "Alex", "Jordan"],
  },
  {
    id: "quote-5",
    quote: "\"[Placeholder] This is the best idea I've ever had.\"",
    speaker: "Jordan",
    decoys: ["Mia", "Sam", "Alex"],
  },
];
