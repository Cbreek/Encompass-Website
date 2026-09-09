import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";

export function EventPlanForm() {
  const [sent, setSent] = useState(false);

  return (
    <div id="plan-my-event" className="border border-border bg-sand p-8 md:p-12">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 text-center"
          >
            <span className="mx-auto grid h-14 w-14 rotate-45 place-items-center border border-wine">
              <Check className="h-6 w-6 -rotate-45 text-wine" />
            </span>
            <h3 className="mt-8 text-3xl">We're on it.</h3>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Joe will come back with a bottle plan, pricing for the quantity,
              and a delivery or pickup option — usually the same day.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Prototype: nothing has been sent yet.
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
          >
            <p className="eyebrow text-wine">Party & event orders</p>
            <h2 className="mt-4 text-3xl leading-tight md:text-4xl">
              Planning a dinner, party or event?
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Let Ferrigno help plan the pour.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Field label="Your name" name="ev-name" />
              <Field label="Email" name="ev-email" type="email" />
              <Field label="Guest count" name="ev-guests" type="number" />
              <Field label="Date" name="ev-date" type="date" />
              <Field label="Location" name="ev-place" placeholder="Newport Beach" />
              <Field label="Type of event" name="ev-type" placeholder="Anniversary dinner" />
              <Field label="Food / menu" name="ev-menu" placeholder="Steak and pasta" />
              <Field label="Wine preference" name="ev-pref" placeholder="Reds, mostly" required={false} />
              <Field label="Approximate budget" name="ev-budget" placeholder="$800" required={false} />
              <Field label="Anything else" name="ev-notes" required={false} />
            </div>

            <button
              type="submit"
              className="mt-10 bg-wine px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-background transition-opacity duration-500 hover:opacity-90"
            >
              Plan my event
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
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
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full border-b border-ink/25 bg-transparent py-2 outline-none transition-colors focus:border-wine"
      />
    </div>
  );
}
