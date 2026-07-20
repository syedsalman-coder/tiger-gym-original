import type { Metadata } from "next";
import { Activity, BicepsFlexed, Dumbbell, Zap } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { facilities } from "@/data/site";

const icons = { activity: Activity, dumbbell: Dumbbell, weight: BicepsFlexed, zap: Zap } as const;

export const metadata: Metadata = {
  title: "Gym Facilities | Tiger Gym Salmiya",
  description:
    "Explore the strength, free weight, cardio and functional training categories currently listed by Tiger Gym in Salmiya.",
};

export default function FacilitiesPage() {
  return (
    <main id="main-content">
      <PageHero
        index="03 / Facilities"
        eyebrow="The training floor"
        title="Space for serious sessions."
        description="Four focused training categories carried forward from Tiger Gym's existing information."
        nextLabel="View training areas"
        nextHref="#training-areas"
      />

      <section className="facility-list section-space" id="training-areas">
        <div className="page-shell">
          <SectionHeading
            number="03.1"
            eyebrow="Verified categories"
            title="Choose the work."
            description="Exact equipment availability should be confirmed directly with the gym."
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
                    <span className="eyebrow">{facility.shortTitle}</span>
                    <h2>{facility.title}</h2>
                    <p>{facility.description}</p>
                    <div className="facility-row__detail"><span>Training focus</span><p>{facility.detail}</p></div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="inline-cta inline-cta--yellow section-space">
        <div className="page-shell inline-cta__panel" data-reveal>
          <span className="eyebrow">Train at Tiger Gym</span>
          <h2>Ask the team about current access.</h2>
          <MagneticButton href="/membership" variant="light">Membership enquiry</MagneticButton>
        </div>
      </section>
    </main>
  );
}
