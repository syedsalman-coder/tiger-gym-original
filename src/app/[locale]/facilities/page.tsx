import type { Metadata } from "next";
import Image from "next/image";
import {
  Activity,
  BicepsFlexed,
  Dumbbell,
  Zap,
} from "lucide-react";

import MagneticButton from "@/components/shared/MagneticButton";

import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  facilities,
  facilitiesContent,
} from "@/data/facilities";
import {
  getLocalizedValue,
  localizePath,
} from "@/i18n/config";
import { createLocalizedMetadata } from "@/i18n/metadata";
import {
  requireLocale,
  type LocaleParams,
} from "@/i18n/server";

const icons = {
  activity: Activity,
  dumbbell: Dumbbell,
  weight: BicepsFlexed,
  zap: Zap,
} as const;

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await requireLocale(params);

  return createLocalizedMetadata(
    locale,
    "/facilities",
    facilitiesContent.metadata,
  );
}

export default async function FacilitiesPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await requireLocale(params);
  const content = facilitiesContent;

  const text = (
    value: Parameters<typeof getLocalizedValue>[0],
  ) => getLocalizedValue(value, locale);

  return (
    <main id="main-content">
      <PageHero
        index={text(content.hero.index)}
        eyebrow={text(content.hero.eyebrow)}
        title={text(content.hero.title)}
        description={text(content.hero.description)}
        nextLabel={text(content.hero.nextLabel)}
        nextHref={content.hero.nextHref}
      />

      <section
        className="facility-list section-space"
        id="training-areas"
      >
        <div className="page-shell">
          <SectionHeading
            number={text(content.section.number)}
            eyebrow={text(content.section.eyebrow)}
            title={text(content.section.title)}
            description={text(content.section.description)}
          />

          <div className="facility-list__items">
            {facilities.map((facility, index) => {
              const Icon = icons[facility.icon];

              return (
                <article
                  id={facility.slug}
                  className={`facility-row ${
                    index % 2
                      ? "facility-row--reverse"
                      : ""
                  }`}
                  key={facility.slug}
                  data-reveal
                >
                  <div
                    className="facility-row__visual"
                    aria-hidden={
                      facility.image
                        ? undefined
                        : true
                    }
                  >
                    {facility.image ? (
                      <>
                        <Image
                          className="facility-row__image"
                          src={facility.image.src}
                          alt={text(facility.image.alt)}
                          fill
                          sizes="(max-width: 767px) 100vw, 50vw"
                          style={{
                            objectPosition:
                              facility.image.position ??
                              "center",
                          }}
                        />

                        <span
                          className="facility-row__image-shade"
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <div className="facility-row__plates">
                        <span />
                        <span />
                        <span />
                        <strong>TG</strong>
                      </div>
                    )}

                    <span className="facility-row__number">
                      {facility.number}
                    </span>

                    <Icon
                      size={32}
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="facility-row__copy">
                    <span className="eyebrow">
                      {text(facility.shortTitle)}
                    </span>

                    <h2>
                      {text(facility.title)}
                    </h2>

                    <p>
                      {text(facility.description)}
                    </p>

                    <div className="facility-row__detail">
                      <span>
                        {text(
                          content.section.detailLabel,
                        )}
                      </span>

                      <p>
                        {text(facility.detail)}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="inline-cta inline-cta--yellow section-space">
        <div
          className="page-shell inline-cta__panel"
          data-reveal
        >
          <span className="eyebrow">
            {text(content.cta.eyebrow)}
          </span>

          <h2>
            {text(content.cta.title)}
          </h2>

          <MagneticButton
            href={localizePath(
              locale,
              content.cta.href,
            )}
            variant="light"
          >
            {text(content.cta.label)}
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}