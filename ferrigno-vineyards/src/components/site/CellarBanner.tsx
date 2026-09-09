import { Reveal } from "./Reveal";
import { CellarSmartForm } from "./CellarSmartForm";
import { Mark } from "./Mark";

export function CellarBanner() {
  return (
    <section className="grain relative overflow-hidden bg-wine px-6 py-24 text-background md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="flex items-center gap-4">
            <Mark size={44} spin borderClass="border-background/70" letterClass="text-background" />
            <p className="eyebrow text-background/70">First access to Ferrigno</p>
          </div>
          <h2 className="mt-6 text-4xl leading-[1.05] md:text-6xl">
            Join the
            <br />
            <span className="italic">Ferrigno Cellar.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-background/80">
            Small releases move quickly. Join us for first access to new
            vintages, tasting invitations, vineyard notes, restaurant features,
            limited availability, and 10% off your first purchase.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="bg-background/95 p-8 text-foreground md:p-10">
            <CellarSmartForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
