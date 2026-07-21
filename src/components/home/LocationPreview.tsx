import { MapPin, Phone } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import { pageContent } from "@/data/pages";
import { site } from "@/data/site";
import { getLocalizedValue, localizePath, type Locale } from "@/i18n/config";

export default function LocationPreview({ locale }: { locale: Locale }) {
  const content = pageContent.home.location;
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);

  return (
    <section className="location-preview section-space">
      <div className="page-shell location-preview__grid">
        <div data-reveal>
          <span className="eyebrow">{text(content.eyebrow)}</span>
          <h2>{text(content.titleLineOne)}<br />{text(content.titleLineTwo)}</h2>
        </div>
        <div className="location-preview__details" data-reveal>
          <p><MapPin size={22} aria-hidden="true" /> {text(site.address)}</p>
          <a className="bidi-isolate" href={site.phoneHref}><Phone size={20} aria-hidden="true" /> {site.phoneDisplay}</a>
          <div>
            <MagneticButton href={localizePath(locale, "/contact")}>{text(content.contactLabel)}</MagneticButton>
            <MagneticButton href={site.directionsUrl} target="_blank" rel="noreferrer" variant="outline">{text(content.directionsLabel)}</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
