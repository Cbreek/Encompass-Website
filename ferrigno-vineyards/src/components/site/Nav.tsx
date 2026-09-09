import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CONTACT } from "@/data/site";
import { Mark } from "./Mark";

const LINKS = [
  { to: "/wines", label: "The Wines", sub: null },
  { to: "/story", label: "Our Story", sub: null },
  { to: "/find-us", label: "Find Ferrigno", sub: null },
  { to: "/visit", label: "Visit", sub: null },
  { to: "/cellar", label: "The Cellar", sub: "Join Us" },
  { to: "/contact", label: "Contact", sub: null },
] as const;

const LIGHT_TOP_ROUTES = ["/trade", "/studio"];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));
  const solid = scrolled || LIGHT_TOP_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-background/85 backdrop-blur-xl border-b border-border/70 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-colors duration-500 ${
            solid ? "text-foreground" : "text-background"
          }`}
        >
          <Link to="/" aria-label="Ferrigno Vineyards — home" className="flex items-center gap-3">
            <Mark size={38} spin />
            <span className="font-display text-lg tracking-[0.18em] uppercase">
              Ferrigno
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="link-underline flex flex-col text-[0.72rem] uppercase tracking-[0.16em] opacity-75 transition-opacity hover:opacity-100 xl:text-[0.76rem]"
                activeProps={{ className: "opacity-100" }}
                activeOptions={{ exact: false }}
              >
                {l.label}
                {l.sub && (
                  <span className="text-[0.55rem] tracking-[0.22em] text-gold">
                    {l.sub}
                  </span>
                )}
              </Link>
            ))}
            <Link
              to="/visit"
              className="border border-current px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-500 hover:bg-gold hover:border-gold hover:text-ink"
            >
              Schedule a tasting
            </Link>
            <Link
              to="/shop"
              className="bg-wine px-6 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-background transition-opacity duration-500 hover:opacity-90"
            >
              Shop
            </Link>
          </nav>

          <div className="flex items-center gap-4 lg:hidden">
            <Link
              to="/shop"
              className="bg-wine px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-background"
            >
              Shop
            </Link>
            <button onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-background"
          >
            <div className="flex items-start justify-between px-6 py-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="flex flex-col items-start gap-4"
              >
                <Mark size={84} spin />
                <span className="font-display text-2xl uppercase tracking-[0.24em]">
                  Ferrigno
                </span>
              </motion.div>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col px-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="block border-b border-background/15 py-4 font-display text-3xl text-gold"
                >
                  Shop
                </Link>
              </motion.div>
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 * (i + 1), duration: 0.6 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-3 border-b border-background/15 py-4 font-display text-3xl"
                  >
                    {l.label}
                    {l.sub && (
                      <span className="font-sans text-[0.6rem] uppercase tracking-[0.24em] text-gold">
                        — {l.sub}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-6 pt-10">
              <Link
                to="/visit"
                onClick={() => setOpen(false)}
                className="block bg-gold px-6 py-4 text-center text-[0.72rem] uppercase tracking-[0.22em] text-ink"
              >
                Schedule a tasting
              </Link>
            </div>

            <div className="px-6 py-10 text-sm text-background/70">
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <br />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
