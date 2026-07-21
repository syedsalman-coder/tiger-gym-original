import { MapPin, Phone } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import { pageContent } from "@/data/pages";
import { site } from "@/data/site";

export default function LocationPreview() {
  const content = pageContent.home.location;

  return (
    <section className="location-preview section-space">
      <div className="page-shell location-preview__grid">
        <div data-reveal>
          <span className="eyebrow">{content.eyebrow.en}</span>
          <h2>{content.titleLineOne.en}<br />{content.titleLineTwo.en}</h2>
        </div>
        <div className="location-preview__details" data-reveal>
          <p><MapPin size={22} aria-hidden="true" /> {site.address.en}</p>
          <a href={site.phoneHref}><Phone size={20} aria-hidden="true" /> {site.phoneDisplay}</a>
          <div>
            <MagneticButton href="/contact">{content.contactLabel.en}</MagneticButton>
            <MagneticButton href={site.directionsUrl} target="_blank" rel="noreferrer" variant="outline">{content.directionsLabel.en}</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
