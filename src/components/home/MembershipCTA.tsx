import { MessageCircle } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import { membershipContent } from "@/data/membership-options";

export default function MembershipCTA() {
  const content = membershipContent.homeCta;

  return (
    <section className="home-membership section-space">
      <div className="page-shell home-membership__panel" data-reveal>
        <div className="home-membership__weight" aria-hidden="true"><span /><span /><strong>TG</strong></div>
        <div>
          <span className="eyebrow">{content.eyebrow.en}</span>
          <h2>{content.title.en}</h2>
          <p>{content.description.en}</p>
          <MagneticButton href="/membership"><MessageCircle size={17} aria-hidden="true" /> {content.label.en}</MagneticButton>
        </div>
      </div>
    </section>
  );
}
