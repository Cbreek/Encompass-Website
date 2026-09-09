import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { CONTACT } from "@/data/site";
import { CellarForm } from "./CellarForm";

export function Footer() {
  return (
    <footer className="grain bg-ink text-background/80">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center">
                <span className="absolute inset-0 rotate-45 border border-gold" />
                <span className="font-display text-sm text-gold">F</span>
              </span>
              <span className="font-display text-xl uppercase tracking-[0.2em] text-background">
                Ferrigno
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed">
              Family-made, small-lot Cabernet Sauvignon from forty-year-old vines in
              the Willow Creek District of Paso Robles.
            </p>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-gold link-underline"
            >
              <Instagram className="h-4 w-4" /> @ferrignovineyards
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="eyebrow text-gold">Explore</p>
              <ul className="mt-4 space-y-2">
                <li><Link to="/shop" className="link-underline text-gold">Shop</Link></li>
                <li><Link to="/story" className="link-underline">Our Story</Link></li>
                <li><Link to="/wines" className="link-underline">The Wines</Link></li>
                <li><Link to="/vineyard" className="link-underline">The Vineyard</Link></li>
                <li><Link to="/find-us" className="link-underline">Find Ferrigno</Link></li>
                <li><Link to="/visit" className="link-underline">Experience</Link></li>
                <li><Link to="/cellar" className="link-underline">The Cellar</Link></li>
                <li><Link to="/contact" className="link-underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-gold">Reach Joe</p>
              <ul className="mt-4 space-y-2">
                <li><a href={CONTACT.phoneHref} className="link-underline">{CONTACT.phone}</a></li>
                <li><a href={`mailto:${CONTACT.email}`} className="link-underline break-all">{CONTACT.email}</a></li>
                <li className="pt-2 leading-relaxed text-background/60">{CONTACT.address}</li>
                <li className="leading-relaxed text-background/60">
                  Tastings at {CONTACT.partnerWinery}
                  <br />
                  {CONTACT.partnerAddress}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <p className="eyebrow text-gold">The Cellar List</p>
            <p className="mt-4 text-sm leading-relaxed">
              New releases are small and they move fast. Join the list for first
              access, harvest news, and 10% off your first order.
            </p>
            <div className="mt-6">
              <CellarForm dark />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-background/15 pt-8 text-xs text-background/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {CONTACT.legal}. All rights reserved.</p>
          <p>Please enjoy responsibly. You must be 21+ to purchase.</p>
        </div>
      </div>
    </footer>
  );
}
