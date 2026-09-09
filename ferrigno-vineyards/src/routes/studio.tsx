import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Camera, Loader2, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { generateContentKit } from "@/lib/ai.functions";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "One Update, Everything Written | Ferrigno Studio" },
      {
        name: "description",
        content:
          "Joe sends one photo and three sentences from the vineyard. The studio turns it into an Instagram post, a Cellar email, a journal story and a note for restaurant buyers.",
      },
      { property: "og:title", content: "One Update, Everything Written | Ferrigno Studio" },
      {
        property: "og:description",
        content: "A winemaker's update becomes every piece of content the winery needs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Studio,
});

type Kit = Awaited<ReturnType<typeof generateContentKit>>;

const EXAMPLES = [
  "Picked the old Cabernet block at 4am today. Coldest fruit we've had in years. Bob says it's the best pick since 2019.",
  "Bottled the Intenso this morning. 187 cases. Labels go on Thursday.",
  "Poured at Louie's by the Bay last night. Sold through a case before nine o'clock.",
];

function Studio() {
  const [update, setUpdate] = useState("");
  const [photoNote, setPhotoNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [kit, setKit] = useState<Kit | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (update.trim().length < 5) return;
    setLoading(true);
    setError(null);
    try {
      setKit(await generateContentKit({ data: { update: update.trim(), photoNote: photoNote.trim() || undefined } }));
    } catch {
      setError("Couldn't write that one. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-wine";

  const cards = kit
    ? [
        { label: "Instagram", body: `${kit.instagram}\n\n${kit.hashtags}` },
        { label: "Cellar email", body: `Subject: ${kit.emailSubject}\n\n${kit.email}` },
        { label: "Website journal", body: kit.siteStory },
        { label: "Note to a restaurant buyer", body: kit.restaurantNote },
      ]
    : [];

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <span className="eyebrow text-olive">The studio</span>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] sm:text-6xl">
            One update from the vineyard.{" "}
            <span className="italic text-wine">Everything written.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Joe sends a photo and three sentences from his phone. Ferrigno turns it into the
            Instagram post, the Cellar email, the website story and the note that goes to restaurant
            buyers. He reads it, approves it, and goes back to work.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <form onSubmit={run} className="border border-border bg-card p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <Camera className="h-4 w-4 text-wine" />
              <span className="eyebrow text-wine">Joe&apos;s update</span>
            </div>
            <textarea
              rows={4}
              value={update}
              onChange={(e) => setUpdate(e.target.value)}
              placeholder="Three sentences. However you'd say it out loud."
              className={`${field} mt-5`}
            />
            <input
              value={photoNote}
              onChange={(e) => setPhotoNote(e.target.value)}
              placeholder="What's in the photo? (Optional)"
              className={`${field} mt-4`}
            />

            <div className="mt-5 flex flex-wrap gap-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setUpdate(ex)}
                  className="border border-border px-4 py-2 text-left text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-wine hover:text-wine"
                >
                  Example {i + 1}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || update.trim().length < 5}
              className="mt-8 inline-flex items-center gap-3 bg-ink px-8 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Writing" : "Write everything"}
            </button>
            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          </form>
        </Reveal>
      </section>

      {kit && (
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className="border border-border bg-secondary/40 p-8"
              >
                <span className="eyebrow text-wine">{c.label}</span>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Joe approves. Nothing publishes without him.
          </p>
        </section>
      )}
    </div>
  );
}
