import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/hero-vineyard.jpg";
import harvest from "@/assets/harvest-hands.jpg";
import barrel from "@/assets/barrel-room.jpg";

const FACTS = [
  { k: "40+", v: "Years the vines have been in the ground" },
  { k: "1,600 ft", v: "Elevation in the Willow Creek District" },
  { k: "45°F", v: "Day-to-night temperature swing at harvest" },
  { k: "100%", v: "Hand-picked, hand-sorted fruit" },
];

const BLOCKS = [
  {
    title: "Calcareous soil",
    body: "Willow Creek sits on ancient seabed — chalky, limestone-rich soil that stresses the vine, shrinks the berries and concentrates everything that ends up in the glass.",
  },
  {
    title: "Ocean air over the Santa Lucias",
    body: "The Templeton Gap pulls cold Pacific air inland every evening. Hot afternoons, cold nights, long hang time, and acidity that survives the California sun.",
  },
  {
    title: "Old head-trained vines",
    body: "Forty-plus-year-old plants that no longer chase yield. Fewer clusters, deeper roots, and fruit with a savory edge younger vineyards can't fake.",
  },
  {
    title: "Picked cold, before dawn",
    body: "The family walks the rows at first light with bins and shears. Nothing is machine harvested, and nothing goes in that wouldn't go on the table.",
  },
];

export const Route = createFileRoute("/vineyard")({
  head: () => ({
    meta: [
      { title: "The Vineyard — Willow Creek District, Paso Robles" },
      {
        name: "description",
        content:
          "Ferrigno's 40-year-old, hand-picked Cabernet vines in the Willow Creek District of Paso Robles: calcareous soil, ocean air and long hang time.",
      },
      { property: "og:title", content: "The Vineyard — Ferrigno Vineyards" },
      {
        property: "og:description",
        content: "Old vines, chalky soil and cold Pacific nights in Willow Creek, Paso Robles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Vineyard,
});

function Vineyard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <>
      <section className="relative h-[78vh] min-h-[520px] overflow-hidden">
        <motion.img
          src={hero}
          alt="Old Cabernet vines in the Willow Creek District of Paso Robles"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-20">
          <div className="text-background">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="eyebrow text-gold"
            >
              Willow Creek District · Paso Robles
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-5 max-w-3xl text-5xl leading-[0.95] md:text-7xl"
            >
              The wine is made
              <span className="italic text-gold"> out here, first.</span>
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <Reveal key={f.k} delay={i * 0.08}>
              <div className="border-t border-gold pt-5">
                <p className="font-display text-4xl">{f.k}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section ref={ref} className="relative overflow-hidden bg-sand px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2">
          <div>
            {BLOCKS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="border-b border-border py-8">
                  <h2 className="text-2xl md:text-3xl">{b.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="relative min-h-[420px] overflow-hidden">
            <motion.img
              src={harvest}
              alt="Hand-picking Cabernet grapes at dawn"
              style={{ y }}
              loading="lazy"
              className="absolute inset-0 h-[116%] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grain bg-ink px-6 py-24 text-background md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">
          <Reveal>
            <div className="aspect-[5/4] overflow-hidden">
              <img
                src={barrel}
                alt="Barrels resting in the cellar"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow text-gold">From row to barrel</p>
            <h2 className="mt-5 text-4xl leading-tight md:text-5xl">
              Small lots, light oak, made with intention.
            </h2>
            <p className="mt-6 leading-relaxed text-background/75">
              Fruit is fermented in small open-top lots and raised in second-use
              light French oak alongside veteran Paso winemaker Bob Dunning — more
              than 30 years making wine in Willow Creek. The barrel is a frame,
              not the picture.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="bg-gold px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-90"
              >
                Shop the wines
              </Link>
              <Link
                to="/visit"
                className="border border-background/40 px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-500 hover:bg-background hover:text-ink"
              >
                Visit the vineyard
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
