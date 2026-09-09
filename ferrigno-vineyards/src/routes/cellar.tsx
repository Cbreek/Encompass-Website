import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { CellarSmartForm } from "@/components/site/CellarSmartForm";
import rose from "@/assets/rose-terrace.jpg";

const BENEFITS = [
  {
    title: "First access",
    body: "Release emails go to the list before anything is posted publicly. The Intenso rarely makes it past this stage.",
  },
  {
    title: "10% off your first order",
    body: "A thank-you for joining, applied to your first direct purchase from the family.",
  },
  {
    title: "Harvest notes from Joe",
    body: "A short letter a few times a year — what the season looked like, what's in barrel, what's about to be bottled.",
  },
  {
    title: "Invitations",
    body: "Barrel tastings in Paso, wine dinners in Newport Beach, and the occasional pour with Joe himself.",
  },
];

export const Route = createFileRoute("/cellar")({
  head: () => ({
    meta: [
      { title: "The Cellar List — Ferrigno Vineyards Preferred Customers" },
      {
        name: "description",
        content:
          "Join the Ferrigno Cellar List for first access to small-lot releases, 10% off your first order, harvest notes from Joe and invitations to tastings.",
      },
      { property: "og:title", content: "The Cellar List — Ferrigno Vineyards" },
      {
        property: "og:description",
        content: "First access to Ferrigno releases, harvest notes and tasting invitations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cellar,
});

function Cellar() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink px-6 pb-24 pt-40 text-background md:pt-52">
        <motion.img
          src={rose}
          alt=""
          aria-hidden
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.28, scale: 1 }}
          transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="eyebrow text-gold"
          >
            Preferred customers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 max-w-3xl text-5xl leading-[0.95] md:text-7xl"
          >
            The Cellar
            <span className="italic text-gold"> List.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-6 max-w-xl text-background/75"
          >
            No membership, no commitment, no shipments you didn't ask for. Just
            an email from the family when there's wine worth telling you about.
          </motion.p>
        </div>
      </section>

      <section className="bg-background px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-8 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="border-t border-gold pt-5">
                  <h2 className="text-xl">{b.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="border border-border bg-sand/60 p-8">
              <p className="eyebrow text-wine">Join the list</p>
              <h2 className="mt-4 text-3xl leading-tight">
                Two minutes now, first pick later.
              </h2>
              <div className="mt-7">
                <CellarSmartForm />
              </div>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Tell us why you're joining and you'll get mail that actually
                applies to you — collectors, gift buyers, restaurants and Paso
                visitors all hear different things. Leave any time. A full
                membership club can follow once the list is built.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
