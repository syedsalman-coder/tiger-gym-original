import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { pageContent } from "@/data/pages";
import { site } from "@/data/site";
import {
  getLocalizedValue,
  localizePath,
  type Locale,
} from "@/i18n/config";

export default function HomeIntro({
  locale,
}: {
  locale: Locale;
}) {
  const content = pageContent.home.intro;

  const text = (
    value: Parameters<typeof getLocalizedValue>[0],
  ) => getLocalizedValue(value, locale);

  const labels =
    locale === "ar"
      ? {
          location: "الموقع",
          regularHours: "السبت إلى الخميس",
          fridayHours: "الجمعة",
          contact: "تواصل مباشر",
        }
      : {
          location: "Location",
          regularHours: "Saturday to Thursday",
          fridayHours: "Friday",
          contact: "Direct contact",
        };

  return (
    <section
      className="home-manifesto section-space"
      id="home-intro"
    >
      <div className="page-shell">
        <header
          className="home-manifesto__header"
          data-reveal
        >
          <div className="home-manifesto__meta">
            <span className="home-manifesto__number">
              {text(content.number)}
            </span>

            <span className="home-manifesto__line" data-divider />

            <span className="eyebrow">
              {text(content.eyebrow)}
            </span>
          </div>

          <h2 className="home-manifesto__headline">
            <span className="reveal-mask">
              <span data-heading-line>
                {text(content.title)}
              </span>
            </span>
          </h2>
        </header>

        <div className="home-manifesto__body">
          <div
            className="home-manifesto__lead"
            data-reveal
          >
            <p>{text(content.description)}</p>
          </div>

          <div
            className="home-manifesto__detail"
            data-reveal
          >
            <p>{text(content.body)}</p>

            <Link
              className="text-link"
              href={localizePath(locale, "/about")}
            >
              {text(content.linkLabel)}

              <ArrowUpRight
                size={18}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div
          className="home-manifesto__proof"
          aria-label={
            locale === "ar"
              ? "معلومات Tiger Gym"
              : "Tiger Gym information"
          }
        >
          <article
            className="home-manifesto__proof-item"
            data-stagger-card
          >
            <span className="home-manifesto__proof-index">
              01
            </span>

            <span className="home-manifesto__proof-label">
              {labels.location}
            </span>

            <strong>
              {text(site.locality)}
            </strong>
          </article>

          <article
            className="home-manifesto__proof-item"
            data-stagger-card
          >
            <span className="home-manifesto__proof-index">
              02
            </span>

            <span className="home-manifesto__proof-label">
              {labels.regularHours}
            </span>

            <strong className="bidi-isolate">
              {text(site.openingHours.regularTime)}
            </strong>
          </article>

          <article
            className="home-manifesto__proof-item"
            data-stagger-card
          >
            <span className="home-manifesto__proof-index">
              03
            </span>

            <span className="home-manifesto__proof-label">
              {labels.fridayHours}
            </span>

            <strong className="bidi-isolate">
              {text(site.openingHours.fridayTime)}
            </strong>
          </article>

          <article
            className="home-manifesto__proof-item"
            data-stagger-card
          >
            <span className="home-manifesto__proof-index">
              04
            </span>

            <span className="home-manifesto__proof-label">
              {labels.contact}
            </span>

            <a
              className="bidi-isolate"
              href={site.phoneHref}
            >
              {site.phoneDisplay}
            </a>
          </article>
        </div>
      </div>

      <div
        className="brand-ticker"
        aria-hidden="true"
      >
        <div>
          <span>{text(content.ticker)}</span>
          <span>{text(content.ticker)}</span>
        </div>
      </div>
    </section>
  );
}