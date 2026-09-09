import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Wine as WineIcon } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { EventCalculator } from "@/components/site/EventCalculator";
import { EventPlanForm } from "@/components/site/EventPlanForm";
import { CellarBanner } from "@/components/site/CellarBanner";
import { Mark } from "@/components/site/Mark";
import { WINES, CONTACT } from "@/data/site";
import barrel from "@/assets/barrel-room.jpg";
import rose from "@/assets/rose-terrace.jpg";
import bottles from "@/assets/bottles.jpg";

const IMAGES: Record<string, string> = {
  cabernet: barrel,
  intenso: bottles,
  rose: rose,
};

const TIERS = [
  { title: "6+ bottles", label: "Preferred pricing", detail: "Free shipping and a better per-bottle price on a half case or more." },
  { title: "12+ bottles", label: "Case pricing", detail: "Full case rate, packed and shipped or held for pickup." },
  { title: "Events & larger orders", label: "Contact Joe", detail: "Dinners, parties and gifting — Joe prices these himself." },
];

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Ferrigno Wines — Cabernet, Intenso & Rosé" },
      {
        name: "description",
        content:
          "Buy small-lot Ferrigno wines direct from the family: Limited Bottling Cabernet Sauvignon, Intenso and Tempranillo Rosé from the Willow Creek District of Paso Robles.",
      },
      { property: "og:title", content: "Shop Ferrigno Vineyards" },
      {
        property: "og:description",
        content: "Order Ferrigno Cabernet, Intenso and Rosé direct from the family.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [placed, setPlaced] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  const set = (slug: string, n: number) =>
    setCart((c) => ({ ...c, [slug]: Math.max(0, (c[slug] ?? 0) + n) }));

  const items = WINES.filter((w) => (cart[w.slug] ?? 0) > 0);
  const total = items.reduce((s, w) => s + w.price * (cart[w.slug] ?? 0), 0);
  const count = items.reduce((s, w) => s + (cart[w.slug] ?? 0), 0);

  return (
    <>
      <section className="bg-ink px-6 pb-24 pt-40 text-background md:pt-52">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="eyebrow text-gold"
          >
            Direct from the family
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 max-w-3xl text-5xl leading-[0.95] md:text-7xl"
          >
            Buy the wine
            <span className="italic text-gold"> Joe makes himself.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-6 max-w-xl text-background/70"
          >
            A few hundred cases a year. Shipped to most states, or picked up in
            Newport Beach and Paso Robles. Free shipping on a case of six.
          </motion.p>
        </div>
      </section>

      <section className="bg-background px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          {WINES.map((w, i) => {
            const notesOpen = openPanel === `${w.slug}-notes`;
            const pairsOpen = openPanel === `${w.slug}-pairs`;
            return (
              <Reveal key={w.slug} delay={i * 0.1}>
                <article className="group flex h-full flex-col border border-border bg-sand/40">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <motion.img
                      src={IMAGES[w.slug]}
                      alt={w.name}
                      loading="lazy"
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                    <span
                      className="absolute left-4 top-4 bg-background/90 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em]"
                      style={{ color: w.accent }}
                    >
                      {w.status}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow" style={{ color: w.accent }}>
                      {w.varietal}
                    </p>
                    <h2 className="mt-3 text-2xl leading-tight">{w.name}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {w.blurb}
                    </p>

                    <div className="mt-6 flex items-baseline justify-between border-t border-border pt-5">
                      <span className="font-display text-2xl">${w.price}</span>
                      {w.priceCase && (
                        <span className="text-xs text-muted-foreground">
                          ${w.priceCase} / case of six
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                      <div className="flex items-center border border-ink/25">
                        <button
                          onClick={() => set(w.slug, -1)}
                          aria-label={`Remove one ${w.name}`}
                          className="px-3 py-2 transition-colors hover:bg-ink hover:text-background"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm">
                          {cart[w.slug] ?? 0}
                        </span>
                        <button
                          onClick={() => set(w.slug, 1)}
                          aria-label={`Add one ${w.name}`}
                          className="px-3 py-2 transition-colors hover:bg-ink hover:text-background"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => set(w.slug, 1)}
                        className="flex-1 bg-ink px-4 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-background transition-colors duration-500 hover:bg-wine"
                      >
                        Add to order
                      </button>
                    </div>

                    <div className="mt-5 flex gap-6 border-t border-border pt-4">
                      <button
                        onClick={() =>
                          setOpenPanel(notesOpen ? null : `${w.slug}-notes`)
                        }
                        className={`text-xs uppercase tracking-[0.18em] transition-colors ${
                          notesOpen ? "text-wine" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Tasting notes
                      </button>
                      <button
                        onClick={() =>
                          setOpenPanel(pairsOpen ? null : `${w.slug}-pairs`)
                        }
                        className={`text-xs uppercase tracking-[0.18em] transition-colors ${
                          pairsOpen ? "text-wine" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Pairs with
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {(notesOpen || pairsOpen) && (
                        <motion.div
                          key={notesOpen ? "notes" : "pairs"}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-5">
                            <p className="eyebrow text-muted-foreground">
                              {notesOpen ? "In the glass" : "On the table"}
                            </p>
                            <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                              {(notesOpen ? w.notes : w.pairings).map((n) => (
                                <li key={n} className="flex items-start gap-3">
                                  <span
                                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 border"
                                    style={{ borderColor: w.accent }}
                                  />
                                  {n}
                                </li>
                              ))}
                            </ul>
                            <Link
                              to="/wines"
                              hash={w.slug}
                              className="link-underline mt-4 inline-block text-xs uppercase tracking-[0.18em] text-muted-foreground"
                            >
                              Full tasting note
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div id="order" className="mx-auto mt-16 max-w-3xl border border-border bg-sand/60 p-8">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-4 w-4 text-wine" />
            <p className="eyebrow text-wine">Your order</p>
          </div>
          {count === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Nothing added yet. Pick your bottles above.
            </p>
          ) : (
            <>
              <ul className="mt-5 divide-y divide-border">
                {items.map((w) => (
                  <li key={w.slug} className="flex justify-between gap-4 py-3 text-sm">
                    <span>
                      {cart[w.slug]} × {w.name}
                    </span>
                    <span>${w.price * (cart[w.slug] ?? 0)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between border-t border-ink/20 pt-4">
                <span className="eyebrow">Total</span>
                <span className="font-display text-2xl">${total}</span>
              </div>
              {count >= 6 && (
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-wine">
                  {count >= 12 ? "Case pricing applied" : "Preferred pricing applied"}
                </p>
              )}
              {placed ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-sm text-wine"
                >
                  Thank you — Joe will confirm your order and shipping by email.
                  (Prototype: no payment has been taken.)
                </motion.p>
              ) : (
                <button
                  onClick={() => setPlaced(true)}
                  className="mt-6 w-full bg-wine px-6 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-90"
                >
                  Checkout
                </button>
              )}
              <p className="mt-4 text-xs text-muted-foreground">
                You must be 21+ to purchase. Shipping restrictions apply in some states.
              </p>
            </>
          )}
        </div>
      </section>

      {/* EVENT CALCULATOR */}
      <section className="bg-sand/50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <EventCalculator onAdd={(n) => set("cabernet", n)} />
          </Reveal>
        </div>
      </section>

      {/* PARTY / EVENT ORDERS */}
      <section className="bg-background px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <EventPlanForm />
          </Reveal>
        </div>
      </section>

      {/* VOLUME PRICING */}
      <section className="bg-background px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow text-wine">By the six, by the case</p>
            <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl">
              The more you take home, the better it gets.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
            {TIERS.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.1}>
                <div className="h-full bg-background p-8">
                  <p className="eyebrow text-muted-foreground">{t.label}</p>
                  <h3 className="mt-3 font-display text-2xl">{t.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {t.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-6 text-sm text-muted-foreground">
              Cellar members also take 10% off their first purchase.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WANT THE MAN HIMSELF */}
      <section className="grain bg-ink px-6 py-24 text-background md:py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <Mark size={64} spin />
            <p className="eyebrow mt-8 text-gold">Orange County only</p>
            <h2 className="mt-5 text-4xl leading-tight md:text-6xl">
              Want the <span className="italic text-gold">man himself?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-background/75">
              Ask about having Joe personally pour Ferrigno at your Orange
              County dinner, party, or event. He tells the story better than the
              back label does.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#plan-my-event"
                className="bg-gold px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink transition-colors duration-500 hover:bg-background"
              >
                Ask for Joe
              </a>
              <a
                href={CONTACT.phoneHref}
                className="border border-background/50 px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-500 hover:bg-background hover:text-ink"
              >
                {CONTACT.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CellarBanner />
    </>
  );
}
