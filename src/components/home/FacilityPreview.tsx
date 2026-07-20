import Link from "next/link";
import { Activity, BicepsFlexed, Dumbbell, MoveUpRight, Zap } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import TiltCard from "@/components/shared/TiltCard";
import { facilities } from "@/data/site";

const icons = { activity: Activity, dumbbell: Dumbbell, weight: BicepsFlexed, zap: Zap } as const;

export default function FacilityPreview() {
  return (
    <section className="facility-preview section-space">
      <div className="page-shell">
        <SectionHeading number="03" eyebrow="Training areas" title="Made for the work." />
        <div className="facility-preview__grid">
          {facilities.map((facility) => {
            const Icon = icons[facility.icon];
            return (
              <TiltCard key={facility.slug}>
                <article className="facility-preview__card" data-stagger-card data-cursor>
                  <div><span>{facility.number}</span><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></div>
                  <h3>{facility.shortTitle}</h3>
                  <p>{facility.description}</p>
                  <MoveUpRight size={20} aria-hidden="true" />
                </article>
              </TiltCard>
            );
          })}
        </div>
        <Link className="text-link" href="/facilities">View all facilities <MoveUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
