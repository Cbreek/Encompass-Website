import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { InstagramStrip } from "@/components/site/InstagramStrip";
import { CellarBanner } from "@/components/site/CellarBanner";
import { Mark } from "@/components/site/Mark";
import { Concierge } from "@/components/site/Concierge";

import { WINES, PLACEMENTS, CONTACT } from "@/data/site";
import hero from "@/assets/hero-vineyard.jpg";
import table from "@/assets/restaurant-table.jpg";
import harvest from "@/assets/harvest-hands.jpg";
import rose from "@/assets/rose-terrace.jpg";
import barrel from "@/assets/barrel-room.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ferrigno Vineyards — Small-Lot Cabernet from Paso Robles" },
      {
        name: "description",
        content:
          "Joe Ferrigno and his family make a small-lot Cabernet Sauvignon from 40-year-old Willow Creek vines, poured at Newport Beach's best tables.",
      },
      { property: "og:title", content: "Ferrigno Vineyards — Small-Lot Paso Robles Cabernet" },
      {
        property: "og:description",
        content:
          "Forty-year-old vines, hand harvest, light French oak. Made for the dinner table.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <img
            src={hero}
            alt="Old Cabernet vines at sunrise above the Willow Creek District, Paso Robles"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/85" />

        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.28em" }}
            transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="eyebrow text-gold"
          >
            Willow Creek District · Paso Robles
          </motion.p>

          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] text-background">
            <RevealWords text="The wine your" delay={0.2} />
            <br />
            <span className="italic text-gold">
              <RevealWords text="favorite table" delay={0.5} />
            </span>{" "}
            <RevealWords text="already pours." delay={0.8} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-background/80"
          >
            Small-lot Cabernet Sauvignon from forty-year-old vines, made by the
            Ferrigno family in Paso Robles — and poured at tables along the
            California coast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 bg-gold px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink transition-colors duration-500 hover:bg-background"
            >
              Shop the wine
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/wines"
              className="inline-flex items-center border border-background/50 px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-background transition-colors duration-500 hover:bg-background hover:text-ink"
            >
              Explore the wines
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="h-12 w-px bg-background/50"
          />
        </motion.div>
      </section>

      {/* MARQUEE OF PLACES */}
      <section className="overflow-hidden border-b border-border bg-ink py-6">
        <p className="eyebrow mb-4 px-6 text-center text-gold">Ferrigno is poured at</p>
        <motion.div

          className="flex w-max gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...PLACEMENTS, ...PLACEMENTS, ...PLACEMENTS, ...PLACEMENTS].map((p, i) => (
            <span
              key={i}
              className="eyebrow flex items-center gap-12 text-background/60"
            >
              {p.name} <span className="text-gold">◆</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* STORY INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow text-wine">Since the vines were young</p>
            <h2 className="mt-5 text-4xl leading-tight md:text-6xl">
              A family, a hillside,
              <br />
              <span className="italic text-wine">and a wine made with intention.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-6 md:col-start-7">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Joe Ferrigno and his family are hands-on in every part of this —
              walking the rows, picking the fruit, tasting through barrels. The
              vines are over forty years old, farmed sustainably in the Willow
              Creek District, where hot afternoons and cold Pacific air arriving
              over the Santa Lucia range concentrate the flavor.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              The wine is raised in second-use light French oak on purpose. It's
              built to sit beside dinner, not to shout over it.
            </p>
            <Link
              to="/story"
              className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] link-underline"
            >
              Read the story <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            { src: harvest, alt: "Hands harvesting Cabernet grapes at dawn", label: "Hand harvest" },
            { src: barrel, alt: "French oak barrels resting in the cellar", label: "Light French oak" },
            { src: table, alt: "A bottle of Ferrigno on a candlelit restaurant table", label: "On the list" },
          ].map((img, i) => (
            <Reveal key={img.label} delay={i * 0.12}>
              <div className="group relative aspect-[4/5] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={1408}
                  height={1008}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <span className="eyebrow absolute bottom-5 left-5 text-background">
                  {img.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONCIERGE */}
      <section className="bg-sand/50 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Concierge />
          </Reveal>
        </div>
      </section>

      {/* WINES */}
      <section className="grain bg-ink py-28 text-background md:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow text-gold">Three wines. That's it.</p>
            <h2 className="mt-5 max-w-2xl text-4xl leading-tight text-background md:text-6xl">
              Made in quantities you can count.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {WINES.map((w, i) => (
              <Reveal key={w.slug} delay={i * 0.15}>
                <Link
                  to="/wines"
                  hash={w.slug}
                  className="group block h-full border border-background/15 p-8 transition-colors duration-700 hover:border-gold/70 md:p-12"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="eyebrow text-gold">{w.varietal}</p>
                      <h3 className="mt-4 font-display text-3xl text-background md:text-4xl">
                        {w.name}
                      </h3>
                    </div>
                    <span
                      className="mt-2 h-10 w-10 shrink-0 rotate-45 border transition-transform duration-700 group-hover:rotate-[135deg]"
                      style={{ borderColor: w.accent }}
                    />
                  </div>
                  <p className="mt-6 leading-relaxed text-background/70">{w.blurb}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {w.notes.map((n) => (
                      <span
                        key={n}
                        className="border border-background/20 px-3 py-1 text-xs tracking-wide text-background/70"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                  <span className="mt-8 inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.22em] text-gold">
                    Tasting notes
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COASTAL / ROSE FEATURE */}
      <section className="relative grid md:grid-cols-2">
        <div className="relative h-[60vh] overflow-hidden md:h-auto md:min-h-[42rem]">
          <motion.img
            src={rose}
            alt="A glass of Ferrigno Tempranillo Rosé on a coastal terrace at sunset"
            loading="lazy"
            width={1408}
            height={1008}
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center bg-sand px-6 py-24 md:px-16">
          <div className="max-w-lg">
            <Reveal>
              <p className="eyebrow text-terracotta">Coast side</p>
              <h2 className="mt-5 text-4xl leading-tight md:text-5xl">
                Paso in the ground.
                <br />
                <span className="italic">Newport in the glass.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                The fruit grows three hours north, but the wine grew up on the
                coast — on patios in Newport Beach, at long tables in Corona del
                Mar, next to burrata and grilled fish and the last hour of light.
              </p>
              <Link
                to="/find-us"
                className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] link-underline"
              >
                See where it's poured <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LOGO MOMENT */}
      <section className="grain relative overflow-hidden bg-ink py-32 text-background md:py-44">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Mark size={170} spin />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-10 font-display text-4xl uppercase tracking-[0.32em] md:text-5xl"
          >
            Ferrigno
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-6 max-w-md text-background/60"
          >
            One family. One hillside. A few hundred cases a year.
          </motion.p>
        </div>
      </section>

      <InstagramStrip />


      {/* BEHIND THE WINERY */}
      <section className="bg-background px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow text-wine">Behind the winery</p>
            <h2 className="mt-5 max-w-2xl text-4xl leading-tight md:text-5xl">
              A boutique winery.
              <br />
              <span className="italic text-wine">A bold presence.</span>
              <br />
              A personal touch.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <Reveal>
              <Link
                to="/trade"
                className="group flex h-full flex-col justify-between border border-border bg-card p-10 transition-colors duration-500 hover:border-wine"
              >
                <div>
                  <p className="eyebrow text-muted-foreground">Restaurants &amp; retail</p>
                  <h3 className="mt-4 font-display text-3xl">Qualified leads, already answered.</h3>
                  <p className="mt-5 leading-relaxed text-muted-foreground">
                    A buyer asks about carrying Ferrigno. Joe gets a clean summary, an honest read on
                    whether the account fits a small allocation, and a reply drafted in his own voice.
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.2em] text-wine">
                  Try the trade inquiry
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>

            <Reveal delay={0.12}>
              <Link
                to="/studio"
                className="group flex h-full flex-col justify-between border border-border bg-card p-10 transition-colors duration-500 hover:border-wine"
              >
                <div>
                  <p className="eyebrow text-muted-foreground">The studio</p>
                  <h3 className="mt-4 font-display text-3xl">One update. Everything written.</h3>
                  <p className="mt-5 leading-relaxed text-muted-foreground">
                    A photo and three sentences from the vineyard become the Instagram post, the
                    Cellar email, the journal story and the note to restaurant buyers. Joe approves.
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.2em] text-wine">
                  See it write
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CellarBanner />

      {/* CTA */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <div className="rule-gold mx-auto w-40" />
            <h2 className="mt-10 text-4xl leading-tight md:text-6xl">
              "The best wines
              <br />
              <span className="italic text-wine">belong at the table."</span>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground">
              Pull up a chair with us in Paso Robles, pour a bottle at home, or
              ask for Ferrigno by name tonight.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/visit"
                className="bg-ink px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-background transition-colors duration-500 hover:bg-wine"
              >
                Book a tasting
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="border border-ink px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-500 hover:bg-ink hover:text-background"
              >
                Call Joe
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
