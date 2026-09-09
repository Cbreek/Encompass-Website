import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { PLACEMENTS, CONTACT } from "@/data/site";
import table from "@/assets/restaurant-table.jpg";

const FILTERS = ["All", "Restaurant", "Wine Bar", "Retail"] as const;

export const Route = createFileRoute("/find-us")({
  head: () => ({
    meta: [
      { title: "Where Ferrigno Is Poured — Restaurants & Retailers" },
      {
        name: "description",
        content:
          "Restaurants, wine bars and tasting rooms in Newport Beach, Orange County and Paso Robles pouring Ferrigno Vineyards Cabernet, Intenso and Rosé.",
      },
      { property: "og:title", content: "Where Ferrigno Is Poured" },
      {
        property: "og:description",
        content: "The restaurants and bars pouring Ferrigno along the California coast.",
      },
    ],
  }),
  component: FindUs,
});

function FindUs() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = PLACEMENTS.filter((p) => filter === "All" || p.type === filter);

  return (
    <>
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={table}
          alt="A bottle of red wine and two glasses on a candlelit restaurant table"
          width={1408}
          height={1008}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="eyebrow text-gold"
          >
            Find Ferrigno
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-5 max-w-3xl text-5xl leading-[0.95] text-background md:text-7xl"
          >
            Where Ferrigno <span className="italic text-gold">is poured.</span>
          </motion.h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The wine reaches most people at a table before it reaches them at
            home. Here's where to ask for it by name — and what they're pouring.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-400 ${
                  filter === f
                    ? "border-ink bg-ink text-background"
                    : "border-border hover:border-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-px bg-border md:grid-cols-2">
          {list.map((p, i) => (
            <motion.div
              layout
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group flex items-start justify-between gap-6 bg-background p-8 transition-colors duration-500 hover:bg-sand"
            >
              <div>
                <p className="eyebrow text-wine">{p.type}</p>
                <h2 className="mt-3 text-2xl">{p.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.city}</p>
                <p className="mt-4 text-sm">
                  <span className="eyebrow mr-3 text-muted-foreground">Pouring</span>
                  {p.pour}
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  `${p.name} ${p.city}`,
                )}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Directions to ${p.name}`}
                className="mt-1 shrink-0 border border-border p-3 transition-colors duration-500 group-hover:border-ink"
              >
                <MapPin className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-16 border border-border bg-sand p-10 md:p-14">
            <p className="eyebrow text-wine">Restaurants, retailers & hospitality</p>
            <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl">
              Interested in pouring Ferrigno?
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Joe works directly with restaurants and wine directors — no
              distributor maze. Tell us about your program and we'll come back
              with the right allocation and samples.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/trade"
                className="group inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.22em] text-background transition-colors duration-500 hover:bg-wine"
              >
                Start a trade inquiry
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="border border-ink px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-500 hover:bg-ink hover:text-background"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
