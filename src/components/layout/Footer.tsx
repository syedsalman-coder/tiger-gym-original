import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import Logo from "@/components/shared/Logo";
import { pageContent } from "@/data/pages";
import { navigation, site } from "@/data/site";
import {
  getLocalizedValue,
  localizePath,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Footer({
  locale,
}: {
  locale: Locale;
}) {
  const dictionary = getDictionary(locale);

  const text = (
    value: Parameters<typeof getLocalizedValue>[0],
  ) => getLocalizedValue(value, locale);

  const labels =
    locale === "ar"
      ? {
          sectionNumber: "06",
          sectionLabel: "ابدأ الآن",
          titleLineOne: "تدريبك يبدأ",
          titleLineTwo: "من هنا.",
          membership: "استكشف العضوية",
          navigation: "استكشف الموقع",
          visit: "زيارة النادي",
          address: "العنوان",
          hours: "ساعات العمل",
          saturdayThursday: "السبت إلى الخميس",
          friday: "الجمعة",
          phone: "الهاتف",
          officialWebsite: "الموقع الرسمي",
        }
      : {
          sectionNumber: "06",
          sectionLabel: "Start now",
          titleLineOne: "Your training",
          titleLineTwo: "starts here.",
          membership: "Explore membership",
          navigation: "Explore the site",
          visit: "Visit the gym",
          address: "Address",
          hours: "Opening hours",
          saturdayThursday: "Saturday to Thursday",
          friday: "Friday",
          phone: "Phone",
          officialWebsite: "Official website",
        };

  return (
    <footer className="premium-footer">
      <div className="page-shell">
        <section className="premium-footer__cta">
          <div className="premium-footer__meta">
            <span>
              {labels.sectionNumber}
            </span>

            <span data-divider />

            <strong>
              {labels.sectionLabel}
            </strong>
          </div>

          <div className="premium-footer__cta-content">
            <div>
              <span className="eyebrow">
                {text(pageContent.footer.contactLabel)}
              </span>

              <h2>
                {labels.titleLineOne}
                <br />
                {labels.titleLineTwo}
              </h2>
            </div>

            <div className="premium-footer__cta-actions">
              <Link
                className="premium-footer__primary-link"
                href={localizePath(locale, "/membership")}
              >
                <span>
                  {labels.membership}
                </span>

                <ArrowUpRight
                  size={21}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>

              <a
                className="premium-footer__secondary-link"
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle
                  size={19}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <span>
                  {dictionary.common.whatsapp}
                </span>

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </section>

        <div className="premium-footer__main">
          <div className="premium-footer__identity">
            <Link
              className="premium-footer__logo"
              href={localizePath(locale, "/")}
              aria-label={dictionary.accessibility.home}
            >
              <Logo
                locale={locale}
                decorative
              />
            </Link>

            <p>
              {text(pageContent.footer.taglineLineOne)}
              <br />
              {text(pageContent.footer.taglineLineTwo)}
            </p>

            <div className="premium-footer__identity-location">
              <MapPin
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <span>
                {text(site.city)}, {text(site.country)}
              </span>
            </div>
          </div>

          <nav
            className="premium-footer__navigation"
            aria-label={
              dictionary.accessibility.footerNavigation
            }
          >
            <span className="premium-footer__column-label">
              {labels.navigation}
            </span>

            <div className="premium-footer__navigation-list">
              {navigation.map((item, index) => (
                <Link
                  href={localizePath(locale, item.href)}
                  key={item.href}
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>
                    {text(item.label)}
                  </strong>

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </nav>

          <div className="premium-footer__visit">
            <span className="premium-footer__column-label">
              {labels.visit}
            </span>

            <div className="premium-footer__visit-item">
              <MapPin
                size={19}
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <div>
                <span>
                  {labels.address}
                </span>

                <strong>
                  {text(site.address)}
                </strong>

                <a
                  className="premium-footer__directions"
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {dictionary.common.getDirections}
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <div className="premium-footer__visit-item">
              <Clock3
                size={19}
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <div>
                <span>
                  {labels.hours}
                </span>

                <p>
                  <span>
                    {labels.saturdayThursday}
                  </span>

                  <strong className="bidi-isolate">
                    {text(site.openingHours.regularTime)}
                  </strong>
                </p>

                <p>
                  <span>
                    {labels.friday}
                  </span>

                  <strong className="bidi-isolate">
                    {text(site.openingHours.fridayTime)}
                  </strong>
                </p>
              </div>
            </div>

            <div className="premium-footer__visit-item">
              <Phone
                size={19}
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <div>
                <span>
                  {labels.phone}
                </span>

                <a
                  className="bidi-isolate"
                  href={site.phoneHref}
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="premium-footer__wordmark"
          aria-hidden="true"
        >
          <span>
            TIGER
          </span>

          <span>
            GYM
          </span>
        </div>

        <div className="premium-footer__bottom">
          <span>
            © {new Date().getFullYear()}{" "}
            {text(site.fullName)}
          </span>

          <span>
            {labels.officialWebsite}
          </span>

          <span>
            {text(site.city)} · {text(site.country)}
          </span>
        </div>
      </div>
    </footer>
  );
}