import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import { CONTACT } from "@/data/site";
import hero from "@/assets/hero-vineyard.jpg";
import barrel from "@/assets/barrel-room.jpg";
import table from "@/assets/restaurant-table.jpg";
import rose from "@/assets/rose-terrace.jpg";
import harvest from "@/assets/harvest-hands.jpg";

const IMAGES = [hero, table, barrel, rose, harvest, hero, table, barrel, rose, harvest];

export function InstagramStrip() {
  return (
    <section className="overflow-hidden border-y border-border bg-sand/60 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-wine">From the feed</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Wherever the bottle lands</h2>
            <p className="mt-3 max-w-md text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Placeholder imagery — the live Instagram feed connects here
            </p>
          </div>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm link-underline"
          >
            <Instagram className="h-4 w-4" /> @ferrignovineyards
          </a>
        </div>
      </div>

      <div className="relative mt-12">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        >
          {IMAGES.concat(IMAGES).map((src, i) => (
            <a
              key={i}
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative h-56 w-56 shrink-0 overflow-hidden md:h-72 md:w-72"
            >
              <img
                src={src}
                alt="Ferrigno Vineyards on Instagram"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Instagram className="h-6 w-6 text-background" />
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
