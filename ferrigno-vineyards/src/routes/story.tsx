import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/site/Reveal";
import { TIMELINE, CONTACT } from "@/data/site";
import harvest from "@/assets/harvest-hands.jpg";
import hero from "@/assets/hero-vineyard.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "The Story — Joe Ferrigno & Willow Creek Cabernet" },
      {
        name: "description",
        content:
          "How Joe Ferrigno and his family make small-lot Cabernet from 40-year-old Willow Creek vines with Paso Robles winemaker Bob Dunning.",
      },
      { property: "og:title", content: "The Story — Ferrigno Vineyards" },
      {
        property: "og:description",
        content: "A family, a hillside in Paso Robles, and wine made with intention.",
      },
    ],
  }),
  component: Story,
});

function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <>
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={harvest}
          alt="Hands harvesting Cabernet grapes at dawn"
          width={1408}
          height={1008}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="eyebrow text-gold"
          >
            The story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-5 max-w-3xl text-5xl leading-[0.95] text-background md:text-7xl"
          >
            Everything here is done <span className="italic text-gold">the slow way.</span>
          </motion.h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <Reveal>
          <p className="text-2xl leading-relaxed md:text-3xl">
            Ferrigno Vineyards is a family operation. Joe and his family are
            hands-on through the whole thing — from walking the rows to standing
            behind the bottle at a restaurant on a Friday night.
          </p>
        </Reveal>
      </section>

      <section ref={ref} className="relative overflow-hidden">
        <motion.img
          style={{ y }}
          src={hero}
          alt="Vineyard hillside under coastal fog"
          loading="lazy"
          width={1920}
          height={1280}
          className="h-[50vh] w-full scale-110 object-cover"
        />
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="relative">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:block" />
          <div className="space-y-16 md:space-y-24">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <div className="relative md:pl-16">
                  <span className="absolute -left-[5px] top-2 hidden h-2.5 w-2.5 rotate-45 bg-wine md:block" />
                  <p className="eyebrow text-wine">{t.year}</p>
                  <h2 className="mt-4 text-3xl md:text-4xl">{t.title}</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grain bg-ink px-6 py-24 text-background md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
          {[
            { k: "40+", v: "Years in the ground" },
            { k: "100%", v: "Hand-harvested, sustainably farmed" },
            { k: "2", v: "Wines, made in small lots" },
          ].map((s, i) => (
            <Reveal key={s.k} delay={i * 0.12}>
              <p className="font-display text-6xl text-gold md:text-7xl">{s.k}</p>
              <p className="mt-3 text-background/70">{s.v}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-20 max-w-2xl text-center text-lg text-background/70">
            Tastings are hosted with our winemaking partner {CONTACT.partnerWinery} at{" "}
            {CONTACT.partnerAddress}.
          </p>
        </Reveal>
      </section>
    </>
  );
}
