import { Sigil } from "./icons/Sigil";
import { STORAGE_KEY } from "./PasswordGate";

export function Footer() {
  const handleLock = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return (
    <footer className="border-t border-gold/10 bg-void px-4 py-12 text-center sm:px-6">
      <Sigil />
      <p className="mt-4 font-display text-base italic text-mist">The chronicle continues&hellip;</p>
      <button
        type="button"
        onClick={handleLock}
        className="mt-6 min-h-[44px] rounded-sm border border-gold/20 px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-mist/70 transition-colors hover:border-gold/40 hover:text-mist"
      >
        Seal the chronicle
      </button>
    </footer>
  );
}
