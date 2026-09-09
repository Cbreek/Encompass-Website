import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { WINES } from "@/data/site";
import barrel from "@/assets/barrel-room.jpg";
import rose from "@/assets/rose-terrace.jpg";
import bottles from "@/assets/bottles.jpg";

const IMAGES: Record<string, string> = { cabernet: barrel, intenso: bottles, rose: rose };

export const Route = createFileRoute("/wines")({
  head: () => ({
    meta: [
      { title: "The Wines — Ferrigno Vineyards Cabernet & Rosé" },
      {
        name: "description",
        content:
          "Tasting notes, farming detail and food pairings for the Ferrigno Limited Bottling Cabernet Sauvignon and Tempranillo Rosé from Paso Robles.",
      },
      { property: "og:title", content: "The Wines — Ferrigno Vineyards" },
      {
        property: "og:description",
        content: "Limited Bottling Cabernet Sauvignon and Tempranillo Rosé, made in small lots.",
      },
    ],
  }),
  component: Wines,
});

function Wines() {
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
            The collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 max-w-3xl text-5xl leading-[0.95] text-background md:text-7xl"
          >
            Three wines, one family approach
            <span className="italic text-gold"> from Paso Robles.</span>
          </motion.h1>
        </div>
      </section>

      {WINES.map((w, i) => (
        <section
          key={w.slug}
          id={w.slug}
          className={`scroll-mt-24 ${i % 2 ? "bg-sand" : "bg-background"}`}
        >
          <div
            className={`mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-2 md:py-32 ${
              i % 2 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden">
                <motion.img
                  src={IMAGES[w.slug]}
                  alt={w.name}
                  loading="lazy"
                  width={1408}
                  height={1008}
                  initial={{ scale: 1.14 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <div className="flex flex-col justify-center">
              <Reveal delay={0.1}>
                <p className="eyebrow" style={{ color: w.accent }}>
                  {w.appellation}
                </p>
                <h2 className="mt-4 text-4xl leading-tight md:text-5xl">{w.name}</h2>
                <p className="mt-3 text-sm italic text-muted-foreground">
                  {w.vintageNote}
                </p>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  {w.blurb}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow text-muted-foreground">In the glass</p>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {w.notes.map((n) => (
                        <li key={n} className="flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 rotate-45"
                            style={{ background: w.accent }}
                          />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow text-muted-foreground">At the table</p>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {w.pairings.map((p) => (
                        <li key={p} className="flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 rotate-45"
                            style={{ background: w.accent }}
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <dl className="mt-10 divide-y divide-border border-y border-border">
                  {w.spec.map((s) => (
                    <div key={s.label} className="flex justify-between gap-6 py-3 text-sm">
                      <dt className="text-muted-foreground">{s.label}</dt>
                      <dd className="text-right">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="bg-ink px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.22em] text-background transition-colors duration-500 hover:bg-wine"
                  >
                    Request an allocation
                  </Link>
                  <Link
                    to="/find-us"
                    className="border border-ink px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-500 hover:bg-ink hover:text-background"
                  >
                    Where to drink it
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
