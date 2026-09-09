import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";

const TYPES = [
  { key: "Dinner", perHour: 1.6 },
  { key: "Cocktail", perHour: 1.4 },
  { key: "Celebration", perHour: 1.8 },
  { key: "Corporate", perHour: 1.1 },
  { key: "Other", perHour: 1.4 },
] as const;

const SHARE = [
  { key: "Wine is the main pour", factor: 1 },
  { key: "One of several drinks", factor: 0.6 },
] as const;

export function EventCalculator({ onAdd }: { onAdd?: (bottles: number) => void }) {
  const [guests, setGuests] = useState(30);
  const [hours, setHours] = useState(3);
  const [type, setType] = useState<string>("Dinner");
  const [share, setShare] = useState<string>("Wine is the main pour");
  const [menu, setMenu] = useState("");
  const [budget, setBudget] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [added, setAdded] = useState(false);

  const result = useMemo(() => {
    const perHour = TYPES.find((t) => t.key === type)?.perHour ?? 1.4;
    const factor = SHARE.find((s) => s.key === share)?.factor ?? 1;
    const glasses = guests * Math.max(1, hours) * perHour * factor;
    const glassesPerGuest = glasses / Math.max(1, guests);
    const bottles = glasses / 5;
    const low = Math.max(1, Math.round(bottles * 0.9));
    const high = Math.max(low + 1, Math.round(bottles * 1.15));
    const mid = Math.max(1, Math.round(bottles));
    const guestsPerBottle = guests / Math.max(1, mid);
    return { low, high, mid, glassesPerGuest, guestsPerBottle };
  }, [guests, hours, type, share]);

  return (
    <div className="border border-border bg-background">
      <div className="grid lg:grid-cols-2">
        {/* inputs */}
        <div className="p-8 md:p-12">
          <p className="eyebrow text-wine">The bottle math</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
            How much wine
            <br />
            <span className="italic text-wine">do I need?</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Tell us about your event. We'll do the bottle math.
          </p>

          <div className="mt-10 space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <Slider
                label="Guests"
                value={guests}
                min={4}
                max={200}
                step={2}
                display={`${guests}`}
                onChange={setGuests}
              />
              <Slider
                label="Hours of pouring"
                value={hours}
                min={1}
                max={8}
                step={1}
                display={`${hours} hr`}
                onChange={setHours}
              />
            </div>

            <Chips
              label="Kind of event"
              options={TYPES.map((t) => t.key)}
              value={type}
              onChange={setType}
            />
            <Chips
              label="Where wine sits"
              options={SHARE.map((s) => s.key)}
              value={share}
              onChange={setShare}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <Line label="Food / menu" value={menu} onChange={setMenu} placeholder="Steak, pasta, cheese board" />
              <Line label="Approximate budget" value={budget} onChange={setBudget} placeholder="$800" />
              <Line label="Location" value={place} onChange={setPlace} placeholder="Newport Beach" />
              <Line label="Date" value={date} onChange={setDate} type="date" />
            </div>
          </div>
        </div>

        {/* result */}
        <div className="grain flex flex-col justify-center bg-ink p-8 text-background md:p-12">
          <p className="eyebrow text-gold">Recommended</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`${result.low}-${result.high}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="mt-4 font-display text-6xl leading-none md:text-7xl"
            >
              {result.low}–{result.high}
              <span className="ml-4 font-sans text-base uppercase tracking-[0.22em] text-background/60">
                bottles
              </span>
            </motion.p>
          </AnimatePresence>

          <ul className="mt-10 space-y-4 border-t border-background/15 pt-8 text-background/75">
            <li className="flex items-start gap-4">
              <span className="mt-2 h-2 w-2 shrink-0 rotate-45 border border-gold" />
              About {result.glassesPerGuest.toFixed(1)} glasses per guest across{" "}
              {hours} {hours === 1 ? "hour" : "hours"}.
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-2 h-2 w-2 shrink-0 rotate-45 border border-gold" />
              Roughly one bottle for every {result.guestsPerBottle.toFixed(1)} guests.
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-2 h-2 w-2 shrink-0 rotate-45 border border-gold" />
              A 750ml bottle pours five 5-ounce glasses. We round up — leftover
              wine keeps, running out doesn't.
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => {
                onAdd?.(result.mid);
                setAdded(true);
              }}
              className="bg-gold px-7 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink transition-colors duration-500 hover:bg-background"
            >
              Add recommended bottles
            </button>
            <a
              href="#plan-my-event"
              className="border border-background/50 px-7 py-4 text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-500 hover:bg-background hover:text-ink"
            >
              Ask about event pricing
            </a>
          </div>

          {added && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-5 text-sm text-gold"
            >
              {result.mid} bottles of Cabernet added to your order above.{" "}
              <Link to="/shop" hash="order" className="link-underline">
                Review the order
              </Link>
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="eyebrow text-muted-foreground">{label}</span>
        <span className="font-display text-2xl">{display}</span>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--wine)]"
      />
    </div>
  );
}

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="eyebrow text-muted-foreground">{label}</span>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`border px-4 py-2 text-sm transition-colors duration-400 ${
              value === o
                ? "border-ink bg-ink text-background"
                : "border-border hover:border-ink"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Line({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="eyebrow text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-ink/25 bg-transparent py-2 outline-none transition-colors focus:border-wine"
      />
    </div>
  );
}
