import { MapPin, MessageCircle } from "lucide-react";

import MagneticButton from "@/components/shared/MagneticButton";
import { site } from "@/data/site";
import { getLocalizedValue, localizePath, type Locale, type RoutePath } from "@/i18n/config";
import type { LocalizedText } from "@/data/types";

type FinalCtaProps = {
  locale: Locale;
  ariaLabel: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  primaryLabel: LocalizedText;
  primaryHref?: RoutePath | `${RoutePath}#${string}`;
  showDirections?: boolean;
};

export default function FinalCta({
  locale,
  ariaLabel,
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref = "/membership#membership-form",
  showDirections = false,
}: FinalCtaProps) {
  const text = (value: LocalizedText) => getLocalizedValue(value, locale);
  const whatsappLabel = locale === "ar" ? "واتساب" : "WhatsApp";
  const directionsLabel = locale === "ar" ? "الاتجاهات" : "Directions";

  return (
    <section className="final-cta section-space" aria-label={ariaLabel}>
      <div className="page-shell final-cta__panel" data-reveal>
        <div className="final-cta__copy">
          <span className="eyebrow">{text(eyebrow)}</span>
          <h2>{text(title)}</h2>
          <p>{text(description)}</p>
        </div>
        <div className="final-cta__actions">
          <MagneticButton href={localizePath(locale, primaryHref)}>
            {text(primaryLabel)}
          </MagneticButton>
          <MagneticButton href={site.whatsappHref} target="_blank" rel="noreferrer" variant="outline">
            <MessageCircle size={17} aria-hidden="true" /> {whatsappLabel}
          </MagneticButton>
          {showDirections ? (
            <MagneticButton href={site.directionsUrl} target="_blank" rel="noreferrer" variant="outline">
              <MapPin size={17} aria-hidden="true" /> {directionsLabel}
            </MagneticButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
