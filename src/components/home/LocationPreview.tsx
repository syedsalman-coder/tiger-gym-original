import {
  Clock3,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";

import MapEmbed from "@/components/contact/MapEmbed";
import MagneticButton from "@/components/shared/MagneticButton";
import { pageContent } from "@/data/pages";
import { site } from "@/data/site";
import {
  getLocalizedValue,
  localizePath,
  type Locale,
} from "@/i18n/config";

export default function LocationPreview({
  locale,
}: {
  locale: Locale;
}) {
  const content = pageContent.home.location;

  const text = (
    value: Parameters<typeof getLocalizedValue>[0],
  ) => getLocalizedValue(value, locale);

  const labels =
    locale === "ar"
      ? {
          sectionNumber: "05",
          sectionLabel: "زيارة النادي",
          address: "العنوان",
          openingHours: "ساعات العمل",
          phone: "الهاتف",
          saturdayThursday: "السبت إلى الخميس",
          friday: "الجمعة",
          contact: "التواصل والموقع",
          directions: "احصل على الاتجاهات",
          whatsapp: "واتساب",
          call: "اتصل الآن",
          mapLabel: "موقع Tiger Gym على الخريطة",
        }
      : {
          sectionNumber: "05",
          sectionLabel: "Visit the gym",
          address: "Address",
          openingHours: "Opening hours",
          phone: "Phone",
          saturdayThursday: "Saturday to Thursday",
          friday: "Friday",
          contact: "Location and contact",
          directions: "Get directions",
          whatsapp: "WhatsApp",
          call: "Call now",
          mapLabel: "Tiger Gym map location",
        };

  return (
    <section className="visit-finale section-space">
      <div className="page-shell">
        <header className="visit-finale__heading">
          <div
            className="visit-finale__meta"
            data-reveal
          >
            <span>
              {labels.sectionNumber}
            </span>

            <span data-divider />

            <strong>
              {labels.sectionLabel}
            </strong>
          </div>

          <div
            className="visit-finale__title"
            data-reveal
          >
            <span className="eyebrow">
              {text(content.eyebrow)}
            </span>

            <h2>
              {text(content.titleLineOne)}
              <br />
              {text(content.titleLineTwo)}
            </h2>

            <p>
              {text(site.description)}
            </p>
          </div>
        </header>

        <div className="visit-finale__layout">
          <div
            className="visit-finale__information"
            data-reveal
          >
            <article className="visit-finale__detail">
              <div className="visit-finale__detail-icon">
                <MapPin
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>

              <div>
                <span>
                  {labels.address}
                </span>

                <strong>
                  {text(site.address)}
                </strong>
              </div>
            </article>

            <article className="visit-finale__detail">
              <div className="visit-finale__detail-icon">
                <Clock3
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>

              <div>
                <span>
                  {labels.openingHours}
                </span>

                <div className="visit-finale__hours">
                  <p>
                    <span>
                      {labels.saturdayThursday}
                    </span>

                    <strong className="bidi-isolate">
                      {text(
                        site.openingHours.regularTime,
                      )}
                    </strong>
                  </p>

                  <p>
                    <span>
                      {labels.friday}
                    </span>

                    <strong className="bidi-isolate">
                      {text(
                        site.openingHours.fridayTime,
                      )}
                    </strong>
                  </p>
                </div>
              </div>
            </article>

            <article className="visit-finale__detail">
              <div className="visit-finale__detail-icon">
                <Phone
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>

              <div>
                <span>
                  {labels.phone}
                </span>

                <a
                  className="visit-finale__phone bidi-isolate"
                  href={site.phoneHref}
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </article>

            <div className="visit-finale__actions">
              <MagneticButton
                href={site.directionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Navigation
                  size={17}
                  aria-hidden="true"
                />

                {labels.directions}
              </MagneticButton>

              <MagneticButton
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                variant="outline"
              >
                <MessageCircle
                  size={17}
                  aria-hidden="true"
                />

                {labels.whatsapp}
              </MagneticButton>

              <a
                className="visit-finale__contact-link"
                href={localizePath(locale, "/contact")}
              >
                {labels.contact}
              </a>
            </div>
          </div>

          <div
            className="visit-finale__map"
            aria-label={labels.mapLabel}
            data-reveal
          >
            <div className="visit-finale__map-header">
              <span>
                Tiger Gym
              </span>

              <span>
                Salmiya / Kuwait
              </span>
            </div>

            <MapEmbed locale={locale} />

            <div className="visit-finale__map-footer">
              <span>
                29.3235° N
              </span>

              <span>
                48.0570° E
              </span>
            </div>
          </div>
        </div>

        <div
          className="visit-finale__closing"
          data-reveal
        >
          <span>
            {labels.call}
          </span>

          <a
            className="bidi-isolate"
            href={site.phoneHref}
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}