export function Sigil() {
  return (
    <svg viewBox="0 0 160 40" className="mx-auto h-8 w-40 text-gold" aria-hidden="true">
      <line x1="0" y1="20" x2="60" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="100" y1="20" x2="160" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="80" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M80 13 L83 20 L80 27 L77 20 Z" fill="currentColor" opacity="0.85" />
      <circle cx="66" cy="20" r="2" fill="currentColor" />
      <circle cx="94" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}
