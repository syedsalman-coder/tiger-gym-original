import { MapPin, Phone } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import { site } from "@/data/site";

export default function LocationPreview() {
  return (
    <section className="location-preview section-space">
      <div className="page-shell location-preview__grid">
        <div data-reveal>
          <span className="eyebrow">Visit Tiger Gym</span>
          <h2>Train in<br />Salmiya.</h2>
        </div>
        <div className="location-preview__details" data-reveal>
          <p><MapPin size={22} aria-hidden="true" /> {site.address}</p>
          <a href={site.phoneHref}><Phone size={20} aria-hidden="true" /> {site.phoneDisplay}</a>
          <div>
            <MagneticButton href="/contact">Location & contact</MagneticButton>
            <MagneticButton href={site.directionsUrl} target="_blank" rel="noreferrer" variant="outline">Get directions</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
