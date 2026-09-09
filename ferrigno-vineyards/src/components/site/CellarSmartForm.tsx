import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { segmentCellarSignup } from "@/lib/ai.functions";

const INTERESTS = [
  "I've had the wine and want more",
  "I collect and cellar",
  "I run a restaurant or shop",
  "I'm local to Orange County",
  "I'm visiting Paso Robles",
];

type Result = Awaited<ReturnType<typeof segmentCellarSignup>>;

export function CellarSmartForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      setResult(
        await segmentCellarSignup({
          data: { email, name: name.trim() || undefined, interest: interest.trim() || undefined },
        }),
      );
    } catch {
      setError("Couldn't sign you up just now. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-wine";

  return (
    <AnimatePresence mode="wait">
      {result ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-wine">You&apos;re on the list</p>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed">{result.welcomeNote}</p>
          <div className="mt-7 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
            <p className="uppercase tracking-[0.16em]">Sorted as: {result.segment}</p>
            <p className="mt-2">{result.reason}</p>
            <p className="mt-2">First email you&apos;ll get: {result.firstSend}</p>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={submit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          className="space-y-4"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={field}
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className={field}
          />
          <div className="flex flex-wrap gap-2 pt-1">
            {INTERESTS.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInterest(i)}
                className={`border px-3 py-2 text-left text-[0.68rem] uppercase tracking-[0.1em] transition-colors ${
                  interest === i ? "border-wine bg-wine text-background" : "border-border hover:border-wine"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-3 bg-ink px-6 py-3.5 text-[0.72rem] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Joining" : "Join the Cellar"}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
