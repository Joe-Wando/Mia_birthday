import { Sigil } from "./icons/Sigil";

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-void px-4 py-12 text-center sm:px-6">
      <Sigil />
      <p className="mt-4 font-display text-base italic text-mist">The chronicle continues&hellip;</p>
    </footer>
  );
}
