import { MessageCircle } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import { membershipContent } from "@/data/membership-options";
import { getLocalizedValue, localizePath, type Locale } from "@/i18n/config";

export default function MembershipCTA({ locale }: { locale: Locale }) {
  const content = membershipContent.homeCta;
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);

  return (
    <section className="home-membership section-space">
      <div className="page-shell home-membership__panel" data-reveal>
        <div className="home-membership__weight" aria-hidden="true"><span /><span /><strong>TG</strong></div>
        <div>
          <span className="eyebrow">{text(content.eyebrow)}</span>
          <h2>{text(content.title)}</h2>
          <p>{text(content.description)}</p>
          <MagneticButton href={localizePath(locale, "/membership")}><MessageCircle size={17} aria-hidden="true" /> {text(content.label)}</MagneticButton>
        </div>
      </div>
    </section>
  );
}
