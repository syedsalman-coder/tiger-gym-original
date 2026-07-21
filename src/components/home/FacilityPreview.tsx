import Link from "next/link";
import { Activity, BicepsFlexed, Dumbbell, MoveUpRight, Zap } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import TiltCard from "@/components/shared/TiltCard";
import { facilities, facilitiesContent } from "@/data/facilities";

const icons = { activity: Activity, dumbbell: Dumbbell, weight: BicepsFlexed, zap: Zap } as const;

export default function FacilityPreview() {
  const content = facilitiesContent.preview;

  return (
    <section className="facility-preview section-space">
      <div className="page-shell">
        <SectionHeading number={content.number.en} eyebrow={content.eyebrow.en} title={content.title.en} />
        <div className="facility-preview__grid">
          {facilities.map((facility) => {
            const Icon = icons[facility.icon];
            return (
              <TiltCard key={facility.slug}>
                <article className="facility-preview__card" data-stagger-card data-cursor>
                  <div><span>{facility.number}</span><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></div>
                  <h3>{facility.shortTitle.en}</h3>
                  <p>{facility.description.en}</p>
                  <MoveUpRight size={20} aria-hidden="true" />
                </article>
              </TiltCard>
            );
          })}
        </div>
        <Link className="text-link" href="/facilities">{content.linkLabel.en} <MoveUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
