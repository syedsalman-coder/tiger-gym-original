import type { Metadata } from "next";
import { Activity, BicepsFlexed, Dumbbell, Zap } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { facilities, facilitiesContent } from "@/data/facilities";

const icons = { activity: Activity, dumbbell: Dumbbell, weight: BicepsFlexed, zap: Zap } as const;

export const metadata: Metadata = {
  title: facilitiesContent.metadata.title.en,
  description: facilitiesContent.metadata.description.en,
};

export default function FacilitiesPage() {
  const content = facilitiesContent;

  return (
    <main id="main-content">
      <PageHero
        index={content.hero.index.en}
        eyebrow={content.hero.eyebrow.en}
        title={content.hero.title.en}
        description={content.hero.description.en}
        nextLabel={content.hero.nextLabel.en}
        nextHref={content.hero.nextHref}
      />

      <section className="facility-list section-space" id="training-areas">
        <div className="page-shell">
          <SectionHeading
            number={content.section.number.en}
            eyebrow={content.section.eyebrow.en}
            title={content.section.title.en}
            description={content.section.description.en}
          />
          <div className="facility-list__items">
            {facilities.map((facility, index) => {
              const Icon = icons[facility.icon];
              return (
                <article className={`facility-row ${index % 2 ? "facility-row--reverse" : ""}`} key={facility.slug} data-reveal>
                  <div className="facility-row__visual" aria-hidden="true">
                    <span className="facility-row__number">{facility.number}</span>
                    <div className="facility-row__plates"><span /><span /><span /><strong>TG</strong></div>
                    <Icon size={32} strokeWidth={1.25} />
                  </div>
                  <div className="facility-row__copy">
                    <span className="eyebrow">{facility.shortTitle.en}</span>
                    <h2>{facility.title.en}</h2>
                    <p>{facility.description.en}</p>
                    <div className="facility-row__detail"><span>{content.section.detailLabel.en}</span><p>{facility.detail.en}</p></div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="inline-cta inline-cta--yellow section-space">
        <div className="page-shell inline-cta__panel" data-reveal>
          <span className="eyebrow">{content.cta.eyebrow.en}</span>
          <h2>{content.cta.title.en}</h2>
          <MagneticButton href={content.cta.href} variant="light">{content.cta.label.en}</MagneticButton>
        </div>
      </section>
    </main>
  );
}
