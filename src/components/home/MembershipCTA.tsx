import { MessageCircle } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

export default function MembershipCTA() {
  return (
    <section className="home-membership section-space">
      <div className="page-shell home-membership__panel" data-reveal>
        <div className="home-membership__weight" aria-hidden="true"><span /><span /><strong>TG</strong></div>
        <div>
          <span className="eyebrow">Membership · Speak with our team</span>
          <h2>Put your next session on the calendar.</h2>
          <p>Contact Tiger Gym for current membership options and training access details.</p>
          <MagneticButton href="/membership"><MessageCircle size={17} aria-hidden="true" /> Ask about membership</MagneticButton>
        </div>
      </div>
    </section>
  );
}
