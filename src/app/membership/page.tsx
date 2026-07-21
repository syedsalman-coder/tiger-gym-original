import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import MembershipForm from "@/components/contact/MembershipForm";
import MagneticButton from "@/components/shared/MagneticButton";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { membershipContent, membershipOptions } from "@/data/membership-options";
import { site } from "@/data/site";

const icons = { location: MapPin, message: MessageCircle, phone: Phone } as const;

export const metadata: Metadata = {
  title: membershipContent.metadata.title.en,
  description: membershipContent.metadata.description.en,
};

export default function MembershipPage() {
  const content = membershipContent;

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

      <section className="membership-options section-space" id="membership-options">
        <div className="page-shell">
          <SectionHeading number={content.section.number.en} eyebrow={content.section.eyebrow.en} title={content.section.title.en} />
          <div className="membership-options__grid">
            {membershipOptions.map((option, index) => {
              const Icon = icons[option.icon];
              return <article className="membership-option" key={option.id} data-stagger-card>
                <div><span>0{index + 1}</span><Icon size={24} strokeWidth={1.4} aria-hidden="true" /></div>
                <h3>{option.title.en}</h3><p>{option.description.en}</p><strong>{option.price?.en ?? option.priceLabel.en}</strong>
              </article>;
            })}
          </div>
          <div className="membership-options__direct" data-reveal>
            <MagneticButton href={site.phoneHref} variant="outline"><Phone size={17} aria-hidden="true" /> Call now</MagneticButton>
            <MagneticButton href={site.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={17} aria-hidden="true" /> WhatsApp</MagneticButton>
          </div>
        </div>
      </section>

      <section className="form-section section-space">
        <div className="page-shell form-section__grid">
          <div data-reveal><span className="eyebrow">{content.formIntro.eyebrow.en}</span><h2>{content.formIntro.title.en}</h2><p>{content.formIntro.description.en}</p></div>
          <MembershipForm />
        </div>
      </section>
    </main>
  );
}
