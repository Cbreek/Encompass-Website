import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Check, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ferrigno Vineyards" },
      {
        name: "description",
        content:
          "Reach Joe Ferrigno directly for allocations, restaurant placements, samples and private events. Irvine, California.",
      },
      { property: "og:title", content: "Contact — Ferrigno Vineyards" },
      {
        property: "og:description",
        content: "Allocations, restaurant lists, samples and events — straight to Joe.",
      },
    ],
  }),
  component: Contact,
});

const REASONS = ["Buy wine", "Restaurant list", "Private event", "Something else"];

function Contact() {
  const [reason, setReason] = useState<string>("Buy wine");
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-36 md:pt-48">
      <Reveal>
        <p className="eyebrow text-wine">Contact</p>
        <h1 className="mt-5 max-w-3xl text-5xl leading-[0.95] md:text-7xl">
          You'll be talking <span className="italic text-wine">to Joe.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          No call center, no contact-form void. Tell us what you need and it lands
          on the family's desk.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-px bg-border">
          {[
            { icon: Phone, label: "Call", value: CONTACT.phone, href: CONTACT.phoneHref },
            { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
            { icon: Instagram, label: "Instagram", value: "@ferrignovineyards", href: CONTACT.instagram },
            { icon: MapPin, label: "Office", value: CONTACT.address },
            { icon: MapPin, label: "Tastings", value: `${CONTACT.partnerWinery} · ${CONTACT.partnerAddress}` },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <div className="group bg-background p-7 transition-colors duration-500 hover:bg-sand">
                <p className="eyebrow flex items-center gap-2 text-muted-foreground">
                  <c.icon className="h-3.5 w-3.5" /> {c.label}
                </p>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-3 block text-xl link-underline break-words"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-3 text-xl leading-snug">{c.value}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="border border-border bg-sand p-8 md:p-12">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-20 text-center"
                >
                  <span className="mx-auto grid h-14 w-14 rotate-45 place-items-center border border-wine">
                    <Check className="h-6 w-6 -rotate-45 text-wine" />
                  </span>
                  <h2 className="mt-8 text-3xl">Message sent</h2>
                  <p className="mt-4 text-muted-foreground">
                    Thanks — we'll be in touch shortly.
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
                  className="space-y-7"
                >
                  <div>
                    <p className="eyebrow mb-3 text-muted-foreground">I'm here to</p>
                    <div className="flex flex-wrap gap-2">
                      {REASONS.map((r) => (
                        <button
                          type="button"
                          key={r}
                          onClick={() => setReason(r)}
                          className={`border px-4 py-2 text-sm transition-colors duration-400 ${
                            reason === r
                              ? "border-ink bg-ink text-background"
                              : "border-border hover:border-ink"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {["Name", "Email", "Company (optional)"].map((l) => (
                    <div key={l}>
                      <label className="eyebrow text-muted-foreground" htmlFor={l}>
                        {l}
                      </label>
                      <input
                        id={l}
                        type={l === "Email" ? "email" : "text"}
                        required={l !== "Company (optional)"}
                        className="mt-2 w-full border-b border-ink/25 bg-transparent py-2 outline-none transition-colors focus:border-wine"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="eyebrow text-muted-foreground" htmlFor="msg">
                      Message
                    </label>
                    <textarea
                      id="msg"
                      rows={4}
                      required
                      className="mt-2 w-full resize-none border-b border-ink/25 bg-transparent py-2 outline-none transition-colors focus:border-wine"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ink py-4 text-[0.72rem] uppercase tracking-[0.22em] text-background transition-colors duration-500 hover:bg-wine"
                  >
                    Send to Joe
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
