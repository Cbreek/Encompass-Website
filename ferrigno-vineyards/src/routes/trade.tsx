import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { qualifyTradeLead } from "@/lib/ai.functions";
import { CONTACT } from "@/data/site";

export const Route = createFileRoute("/trade")({
  head: () => ({
    meta: [
      { title: "Carry Ferrigno | Restaurant & Retail Inquiries" },
      {
        name: "description",
        content:
          "Restaurants, wine bars and retailers: ask about carrying Ferrigno Vineyards, small-lot Cabernet from the Willow Creek District of Paso Robles.",
      },
      { property: "og:title", content: "Carry Ferrigno | Restaurant & Retail Inquiries" },
      {
        property: "og:description",
        content: "A short qualifier, and Joe answers you personally. Limited allocation each year.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Trade,
});

type Result = Awaited<ReturnType<typeof qualifyTradeLead>>;

const TYPES = ["Restaurant", "Wine bar", "Retailer", "Hotel / club", "Distributor"];

function Trade() {
  const [type, setType] = useState(TYPES[0]);
  const [form, setForm] = useState({
    business: "",
    location: "",
    buyer: "",
    email: "",
    program: "",
    volume: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      setResult(await qualifyTradeLead({ data: { ...form, type } }));
    } catch {
      setError(`Something went wrong. Email Joe directly at ${CONTACT.email}.`);
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-wine";

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <span className="eyebrow text-olive">Trade &amp; wholesale</span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] sm:text-6xl">
            Interested in carrying <span className="italic text-wine">Ferrigno?</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A few hundred cases leave the cellar each year, so the wine is placed by hand. Tell us
            about your program and Joe answers personally — usually the same week.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-28 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <form onSubmit={submit} className="space-y-6 border border-border bg-card p-8 sm:p-10">
            <div>
              <span className="eyebrow text-muted-foreground">You are a</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`border px-4 py-2 text-[0.7rem] uppercase tracking-[0.14em] transition-colors ${
                      type === t ? "border-wine bg-wine text-background" : "border-border hover:border-wine"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Business name" value={form.business} onChange={set("business")} className={field} />
              <input required placeholder="City, state" value={form.location} onChange={set("location")} className={field} />
              <input required placeholder="Buyer name" value={form.buyer} onChange={set("buyer")} className={field} />
              <input required type="email" placeholder="Email" value={form.email} onChange={set("email")} className={field} />
            </div>

            <textarea
              rows={4}
              placeholder="Tell us about your wine program — by the glass, bottle list, guest count, what your tables drink."
              value={form.program}
              onChange={set("program")}
              className={field}
            />
            <input
              placeholder="Estimated volume (cases per year)"
              value={form.volume}
              onChange={set("volume")}
              className={field}
            />

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-3 bg-ink px-8 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Sending" : "Send inquiry"}
            </button>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="sticky top-28 border border-border bg-secondary/40 p-8 sm:p-10">
            <span className="eyebrow text-wine">What Joe sees</span>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Every inquiry arrives qualified and already answered — a priority read, an honest note
              on whether the account fits a small allocation, and a reply drafted in Joe&apos;s own
              voice for him to approve or edit.
            </p>

            {!result && (
              <p className="mt-8 border-t border-border pt-8 text-sm italic text-muted-foreground">
                Fill in the form to see the qualified lead Joe receives.
              </p>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8 space-y-6 border-t border-border pt-8"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-wine" />
                  <span className="text-[0.72rem] uppercase tracking-[0.18em] text-wine">
                    Priority: {result.priority}
                  </span>
                </div>
                <div>
                  <span className="eyebrow text-muted-foreground">Summary</span>
                  <p className="mt-2 text-sm leading-relaxed">{result.summary}</p>
                </div>
                <div>
                  <span className="eyebrow text-muted-foreground">Fit</span>
                  <p className="mt-2 text-sm leading-relaxed">{result.fitNotes}</p>
                </div>
                <div>
                  <span className="eyebrow text-muted-foreground">Offer</span>
                  <p className="mt-2 text-sm leading-relaxed">{result.suggestedWines}</p>
                </div>
                <div>
                  <span className="eyebrow text-muted-foreground">Draft reply</span>
                  <p className="mt-2 whitespace-pre-line border-l-2 border-wine/40 pl-4 text-sm leading-relaxed">
                    {result.replyDraft}
                  </p>
                </div>
                <div>
                  <span className="eyebrow text-muted-foreground">Next step</span>
                  <p className="mt-2 text-sm leading-relaxed">{result.nextStep}</p>
                </div>
              </motion.div>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
