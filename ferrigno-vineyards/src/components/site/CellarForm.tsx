import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function CellarForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.p
          key="done"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm ${dark ? "text-gold" : "text-wine"}`}
        >
          You're on the list. Watch for the next release.
        </motion.p>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setSent(true);
          }}
          className={`flex items-center border-b ${
            dark ? "border-background/30" : "border-ink/25"
          }`}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-current/40"
          />
          <button
            type="submit"
            className={`shrink-0 text-[0.7rem] uppercase tracking-[0.2em] transition-opacity hover:opacity-60 ${
              dark ? "text-gold" : "text-wine"
            }`}
          >
            Join
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
