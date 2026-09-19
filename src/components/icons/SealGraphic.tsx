type SealGraphicProps = {
  crackLevel: number;
  maxCracks: number;
  broken: boolean;
};

const crackPaths = [
  "M50 12 L46 30 L54 38 L48 55",
  "M88 40 L70 46 L66 40 L52 50",
  "M85 78 L66 66 L60 72 L58 88",
  "M20 75 L38 64 L36 56 L48 52",
  "M15 35 L34 44 L38 38 L50 45",
  "M50 8 L52 26 L44 32 L50 50",
];

export function SealGraphic({ crackLevel, maxCracks, broken }: SealGraphicProps) {
  const activeCracks = crackPaths.slice(0, Math.min(crackLevel, maxCracks));

  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 sm:h-36 sm:w-36" aria-hidden="true">
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="#1d1729"
        stroke={broken ? "#6b1e2b" : "#c9a227"}
        strokeWidth="2.5"
      />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#e2c261" strokeWidth="1" opacity="0.4" />
      <path
        d="M50 20 C60 20 68 28 68 38 C68 48 60 52 50 52 C40 52 32 48 32 38 C32 28 40 20 50 20 Z"
        fill="none"
        stroke="#c9a227"
        strokeWidth="1"
        opacity="0.55"
      />
      {activeCracks.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#6b1e2b"
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity="0.9"
        />
      ))}
    </svg>
  );
}
