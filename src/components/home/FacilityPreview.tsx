import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  BicepsFlexed,
  Dumbbell,
} from "lucide-react";

import SectionHeading from "@/components/shared/SectionHeading";
import {
  facilities,
  facilitiesContent,
} from "@/data/facilities";
import {
  getLocalizedValue,
  localizePath,
  type Locale,
} from "@/i18n/config";

const icons = {
  activity: Activity,
  dumbbell: Dumbbell,
  weight: BicepsFlexed,
} as const;

export default function FacilityPreview({
  locale,
}: {
  locale: Locale;
}) {
  const content = facilitiesContent.preview;

  const text = (
    value: Parameters<typeof getLocalizedValue>[0],
  ) => getLocalizedValue(value, locale);

  const labels =
    locale === "ar"
      ? {
          category: "منطقة تدريب",
          explore: "استكشف المنطقة",
          featured: "المساحة الرئيسية",
        }
      : {
          category: "Training area",
          explore: "Explore area",
          featured: "Featured zone",
        };

  const [featuredFacility, ...supportingFacilities] =
    facilities;

  const FeaturedIcon =
    icons[featuredFacility.icon];

  const featuredHref =
    `${localizePath(locale, "/facilities")}#${featuredFacility.slug}`;

  return (
    <section className="training-experiences section-space">
      <div className="page-shell">
        <SectionHeading
          number={text(content.number)}
          eyebrow={text(content.eyebrow)}
          title={text(content.title)}
        />

        <div className="training-experiences__layout">
          <Link
            className="training-experiences__featured"
            href={featuredHref}
            aria-label={`${text(
              featuredFacility.shortTitle,
            )} - ${labels.explore}`}
            data-reveal
            data-cursor
          >
            <article>
              <div className="training-experiences__featured-top">
                <span>
                  {labels.featured}
                </span>

                <strong>
                  {featuredFacility.number}
                </strong>
              </div>

              <div
                className="training-experiences__visual"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.78)), url('/images/tiger-gym-interior.webp')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <span className="training-experiences__visual-line" />

                <div className="training-experiences__visual-mark">
                  <FeaturedIcon
                    size={72}
                    strokeWidth={1}
                  />
                </div>

                <span className="training-experiences__visual-code">
                  TG / {featuredFacility.number}
                </span>
              </div>

              <div className="training-experiences__featured-copy">
                <span className="eyebrow">
                  {labels.category}
                </span>

                <h3>
                  {text(featuredFacility.shortTitle)}
                </h3>

                <p>
                  {text(featuredFacility.description)}
                </p>

                <span className="training-experiences__action">
                  {labels.explore}

                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </article>
          </Link>

          <div className="training-experiences__list">
            {supportingFacilities.map((facility) => {
              const Icon = icons[facility.icon];

              const href =
                `${localizePath(locale, "/facilities")}#${facility.slug}`;

              return (
                <Link
                  className="training-experiences__item"
                  href={href}
                  key={facility.slug}
                  aria-label={`${text(
                    facility.shortTitle,
                  )} - ${labels.explore}`}
                  data-stagger-card
                  data-cursor
                >
                  <article>
                    <div className="training-experiences__item-index">
                      <span>
                        {facility.number}
                      </span>

                      <Icon
                        size={24}
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="training-experiences__item-copy">
                      <span>
                        {labels.category}
                      </span>

                      <h3>
                        {text(facility.shortTitle)}
                      </h3>

                      <p>
                        {text(facility.description)}
                      </p>
                    </div>

                    <span className="training-experiences__item-arrow">
                      <ArrowUpRight
                        size={20}
                        aria-hidden="true"
                      />
                    </span>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>

        <Link
          className="text-link training-experiences__all"
          href={localizePath(locale, "/facilities")}
        >
          {text(content.linkLabel)}

          <ArrowUpRight
            size={18}
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
