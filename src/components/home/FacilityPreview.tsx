import Link from "next/link";
import { Activity, BicepsFlexed, Dumbbell, MoveUpRight, Zap } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import TiltCard from "@/components/shared/TiltCard";
import { facilities, facilitiesContent } from "@/data/facilities";
import { getLocalizedValue, localizePath, type Locale } from "@/i18n/config";

const icons = { activity: Activity, dumbbell: Dumbbell, weight: BicepsFlexed, zap: Zap } as const;

export default function FacilityPreview({ locale }: { locale: Locale }) {
  const content = facilitiesContent.preview;
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);

  return (
    <section className="facility-preview section-space">
      <div className="page-shell">
        <SectionHeading number={text(content.number)} eyebrow={text(content.eyebrow)} title={text(content.title)} />
        <div className="facility-preview__grid">
          {facilities.map((facility) => {
            const Icon = icons[facility.icon];
            return (
              <TiltCard key={facility.slug}>
                <article className="facility-preview__card" data-stagger-card data-cursor>
                  <div><span>{facility.number}</span><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></div>
                  <h3>{text(facility.shortTitle)}</h3>
                  <p>{text(facility.description)}</p>
                  <MoveUpRight size={20} aria-hidden="true" />
                </article>
              </TiltCard>
            );
          })}
        </div>
        <Link className="text-link" href={localizePath(locale, "/facilities")}>{text(content.linkLabel)} <MoveUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
