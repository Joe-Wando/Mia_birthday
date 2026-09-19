import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import miaEmblem from "../assets/photos/mia-4.jpg";

const links = [
  { id: "home", label: "Home" },
  { id: "trials", label: "Trials" },
  { id: "grimoire", label: "Grimoire" },
  { id: "lorekeeper", label: "Lorekeeper" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavigate = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-void/85 backdrop-blur-md border-b border-gold/15" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("home");
          }}
          className="flex items-center gap-3"
        >
          <img
            src={miaEmblem}
            alt="Mia's emblem"
            className="h-10 w-10 rounded-full border-2 border-gold object-cover object-top shadow-[0_0_12px_rgba(201,162,39,0.35)]"
          />
          <span className="font-display text-lg font-semibold tracking-wide text-parchment sm:text-xl">
            Mia&apos;s Chronicle
          </span>
        </a>

        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(link.id);
                }}
                className={`font-body text-sm uppercase tracking-[0.15em] transition-colors ${
                  active === link.id ? "text-gold" : "text-mist hover:text-gold-soft"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold-soft sm:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-void/97 sm:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="pointer-events-none absolute inset-4 rounded-lg border border-gold/25"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-display text-lg text-gold-soft">Mia&apos;s Chronicle</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold-soft"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>

            <motion.ul
              className="flex flex-1 flex-col items-center justify-center gap-8"
              initial="closed"
              animate="open"
              variants={{ open: { transition: { staggerChildren: 0.08 } } }}
            >
              {links.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    closed: { opacity: 0, y: 16 },
                    open: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(link.id);
                    }}
                    className={`font-display text-3xl italic transition-colors ${
                      active === link.id ? "text-gold" : "text-parchment hover:text-gold-soft"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
