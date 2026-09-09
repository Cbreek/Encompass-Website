import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/data/site";
import barrel from "@/assets/barrel-room.jpg";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Book a Tasting — Ferrigno Vineyards, Paso Robles" },
      {
        name: "description",
        content:
          "Request a private Ferrigno tasting in Paso Robles at Dunning Vineyards on Niderer Road, or arrange a wine dinner in Orange County.",
      },
      { property: "og:title", content: "Book a Tasting — Ferrigno Vineyards" },
      {
        property: "og:description",
        content: "Private tastings in Paso Robles and wine dinners on the coast.",
      },
    ],
  }),
  component: Visit,
});

const EXPERIENCES = [
  {
    title: "Barrel Tasting",
    where: "Paso Robles",
    detail: "An hour in the cellar with the current lots, straight from the barrel.",
    size: "2–6 guests",
  },
  {
    title: "Vineyard Walk & Taste",
    where: "Willow Creek District",
    detail: "Walk the old vines, then sit down with the current release and something to eat.",
    size: "2–10 guests",
  },
  {
    title: "Wine Dinner",
    where: "Orange County",
    detail: "Joe brings the wine to your table or your restaurant and pours it himself.",
    size: "8–40 guests",
  },
];

const TIMES = ["11:00 am", "1:00 pm", "3:00 pm", "5:00 pm"];

function Visit() {
  const [experience, setExperience] = useState<string>("Barrel Tasting");
  const [time, setTime] = useState<string>("1:00 pm");
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="relative h-[55vh] overflow-hidden">
        <img
          src={barrel}
          alt="Barrel room at the winery"
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
            Visit
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-5 max-w-3xl text-5xl leading-[0.95] text-background md:text-7xl"
          >
            Pull up a chair <span className="italic text-gold">in the cellar.</span>
          </motion.h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow text-wine">Choose your visit</p>
              <h2 className="mt-4 text-4xl md:text-5xl">Three ways to taste.</h2>
            </Reveal>
            <div className="mt-10 space-y-px bg-border">
              {EXPERIENCES.map((e, i) => (
                <Reveal key={e.title} delay={i * 0.08}>
                  <button
                    onClick={() => setExperience(e.title)}
                    className={`w-full bg-background p-7 text-left transition-colors duration-500 ${
                      experience === e.title ? "bg-sand" : "hover:bg-sand/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="text-2xl">{e.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {e.where} · {e.size}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed">{e.detail}</p>
                      </div>
                      <span
                        className={`mt-2 grid h-6 w-6 shrink-0 place-items-center rotate-45 border transition-colors duration-500 ${
                          experience === e.title
                            ? "border-wine bg-wine"
                            : "border-border"
                        }`}
                      >
                        {experience === e.title && (
                          <Check className="h-3 w-3 -rotate-45 text-background" />
                        )}
                      </span>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-10 border border-border p-7 text-sm leading-relaxed text-muted-foreground">
                Tastings are hosted with our winemaking partner{" "}
                <strong className="text-foreground">{CONTACT.partnerWinery}</strong>,{" "}
                {CONTACT.partnerAddress}. Prefer to talk it through? Call Joe at{" "}
                <a href={CONTACT.phoneHref} className="text-wine link-underline">
                  {CONTACT.phone}
                </a>
                .
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="border border-border bg-sand p-8 md:p-12">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-16 text-center"
                  >
                    <span className="mx-auto grid h-14 w-14 rotate-45 place-items-center border border-wine">
                      <Check className="h-6 w-6 -rotate-45 text-wine" />
                    </span>
                    <h3 className="mt-8 text-3xl">Request received</h3>
                    <p className="mt-4 text-muted-foreground">
                      Joe will confirm your {experience.toLowerCase()} personally,
                      usually within a day.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-6"
                  >
                    <div>
                      <p className="eyebrow text-wine">Reserve</p>
                      <h3 className="mt-3 text-3xl">{experience}</h3>
                    </div>

                    <Field label="Name" name="name" />
                    <Field label="Email" name="email" type="email" />
                    <Field label="Phone" name="phone" type="tel" required={false} />

                    <div className="grid grid-cols-2 gap-6">
                      <Field label="Date" name="date" type="date" />
                      <Field label="Guests" name="guests" type="number" />
                    </div>

                    <div>
                      <p className="eyebrow mb-3 text-muted-foreground">Time</p>
                      <div className="flex flex-wrap gap-2">
                        {TIMES.map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setTime(t)}
                            className={`border px-4 py-2 text-sm transition-colors duration-400 ${
                              time === t
                                ? "border-ink bg-ink text-background"
                                : "border-border hover:border-ink"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="eyebrow text-muted-foreground" htmlFor="notes">
                        Anything we should know
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        className="mt-2 w-full resize-none border-b border-ink/25 bg-transparent py-2 outline-none focus:border-wine"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-ink py-4 text-[0.72rem] uppercase tracking-[0.22em] text-background transition-colors duration-500 hover:bg-wine"
                    >
                      Request this tasting
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow text-muted-foreground" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-ink/25 bg-transparent py-2 outline-none transition-colors focus:border-wine"
      />
    </div>
  );
}
