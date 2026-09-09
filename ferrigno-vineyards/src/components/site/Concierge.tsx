import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { recommendWine } from "@/lib/ai.functions";
import { WINES } from "@/data/site";

const OCCASIONS = [
  "Steak dinner",
  "Italian, red sauce",
  "Charcuterie board",
  "Holiday dinner",
  "A gift",
  "Just drinking",
  "Warm night outside",
  "Big table, many people",
];

type Result = Awaited<ReturnType<typeof recommendWine>>;

export function Concierge() {
  const [occasion, setOccasion] = useState<string | null>(null);
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wine = result ? (WINES.find((w) => w.slug === result.wineSlug) ?? WINES[0]) : null;

  async function ask(pick: string) {
    setOccasion(pick);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await recommendWine({ data: { occasion: pick, detail: detail.trim() || undefined } });
      setResult(res);
    } catch {
      setError("The concierge is resting. Try again in a moment, or just email Joe.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setOccasion(null);
    setDetail("");
    setError(null);
  }

  return (
    <div className="border border-border bg-card p-8 sm:p-12">
      <div className="flex items-center gap-3">
        <Sparkles className="h-4 w-4 text-wine" />
        <span className="eyebrow text-wine">Ask the cellar</span>
      </div>

      <h3 className="mt-5 font-display text-3xl sm:text-4xl">What are you serving?</h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Tell us the table and we&apos;ll tell you the bottle — which one, why, how many, and how to
        pour it.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {OCCASIONS.map((o) => (
          <button
            key={o}
            type="button"
            disabled={loading}
            onClick={() => ask(o)}
            className={`border px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.14em] transition-colors duration-300 disabled:opacity-50 ${
              occasion === o
                ? "border-wine bg-wine text-background"
                : "border-border hover:border-wine hover:text-wine"
            }`}
          >
            {o}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Anything else? (Six people, one vegetarian, outside…)"
          className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-wine"
        />
        <button
          type="button"
          disabled={loading || (!occasion && !detail.trim())}
          onClick={() => ask(occasion || detail.trim() || "Just drinking")}
          className="inline-flex shrink-0 items-center justify-center gap-2 bg-ink px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Recommend"}
        </button>
      </div>

      {error && <p className="mt-5 text-sm text-destructive">{error}</p>}

      <AnimatePresence mode="wait">
        {loading && (
          <motion.p
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 text-sm italic text-muted-foreground"
          >
            Walking the cellar…
          </motion.p>
        )}

        {result && wine && !loading && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-10 border-t border-border pt-10"
          >
            <span className="eyebrow text-muted-foreground">{wine.varietal}</span>
            <h4 className="mt-3 font-display text-3xl">{result.headline}</h4>
            <p className="mt-2 font-display text-xl text-wine">{wine.name}</p>
            <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed">{result.why}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <span className="eyebrow text-muted-foreground">On the table</span>
                <p className="mt-2 text-sm leading-relaxed">{result.pairing}</p>
              </div>
              <div>
                <span className="eyebrow text-muted-foreground">How many</span>
                <p className="mt-2 text-sm leading-relaxed">
                  {result.bottles} {result.bottles === 1 ? "bottle" : "bottles"} — {result.bottlesWhy}
                </p>
              </div>
              <div>
                <span className="eyebrow text-muted-foreground">Pouring</span>
                <p className="mt-2 text-sm leading-relaxed">{result.serving}</p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 bg-wine px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
              >
                Buy the {wine.varietal.split(" ")[0]} — ${wine.price}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/wines"
                className="link-underline text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground"
              >
                Full tasting notes
              </Link>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Start over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
