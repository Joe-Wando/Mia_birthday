// "Weave the Constellation" — connect the stars in order to complete the
// shape and reveal its blessing. Purely a drawing/completion game.

export type ConstellationPoint = {
  x: number;
  y: number;
};

export type ConstellationPattern = {
  id: string;
  name: string;
  points: ConstellationPoint[];
  blessing: string;
};

export const constellationPatterns: ConstellationPattern[] = [
  {
    id: "crown",
    name: "The Quiet Crown",
    points: [
      { x: 12, y: 68 },
      { x: 27, y: 30 },
      { x: 42, y: 58 },
      { x: 57, y: 20 },
      { x: 72, y: 58 },
      { x: 88, y: 30 },
    ],
    blessing: "A small, unofficial crown — for surviving another year with your sense of humor intact.",
  },
  {
    id: "wanderer",
    name: "The Wanderer's Path",
    points: [
      { x: 10, y: 25 },
      { x: 28, y: 55 },
      { x: 46, y: 35 },
      { x: 64, y: 65 },
      { x: 82, y: 40 },
      { x: 92, y: 70 },
    ],
    blessing: "A path that doubles back on itself more than once — and somehow still gets you exactly where you needed to be.",
  },
  {
    id: "ember-trail",
    name: "The Ember's Trail",
    points: [
      { x: 15, y: 75 },
      { x: 30, y: 55 },
      { x: 38, y: 65 },
      { x: 55, y: 35 },
      { x: 63, y: 45 },
      { x: 85, y: 15 },
    ],
    blessing: "A trail of small, stubborn sparks, each one lighting the way for the next. Follow it as far as it goes.",
  },
];
