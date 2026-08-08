import type { Metadata } from "next";
import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import MembershipForm from "@/components/contact/MembershipForm";

import MagneticButton from "@/components/shared/MagneticButton";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { membershipContent, membershipEnquirySteps } from "@/data/membership-options";
import { site } from "@/data/site";
import { getLocalizedValue } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { requireLocale, type LocaleParams } from "@/i18n/server";

const icons = { clock: Clock3, location: MapPin, message: MessageCircle } as const;

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await requireLocale(params);
  return createLocalizedMetadata(locale, "/membership", membershipContent.metadata);
}

export default async function MembershipPage({ params }: { params: LocaleParams }) {
  const locale = await requireLocale(params);
  const content = membershipContent;
  const dictionary = getDictionary(locale);
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);

  return (
    <main id="main-content">
      <PageHero index={text(content.hero.index)} eyebrow={text(content.hero.eyebrow)} title={text(content.hero.title)} description={text(content.hero.description)} nextLabel={text(content.hero.nextLabel)} nextHref={content.hero.nextHref} />
      <section className="membership-options section-space" id="membership-options">
        <div className="page-shell">
          <SectionHeading number={text(content.section.number)} eyebrow={text(content.section.eyebrow)} title={text(content.section.title)} />
          <div className="membership-options__grid">
            {membershipEnquirySteps.map((step, index) => {
              const Icon = icons[step.icon];
              return <article className="membership-option" key={step.id} data-stagger-card>
                <div><span>0{index + 1}</span><Icon size={24} strokeWidth={1.4} aria-hidden="true" /></div>
                <h3>{text(step.title)}</h3><p>{text(step.description)}</p><strong>{text(step.detailLabel)}</strong>
              </article>;
            })}
          </div>
          <div className="membership-options__direct" data-reveal>
            <MagneticButton href={site.phoneHref} variant="outline"><Phone size={17} aria-hidden="true" /> {dictionary.common.callNow}</MagneticButton>
            <MagneticButton href={site.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={17} aria-hidden="true" /> {dictionary.common.whatsapp}</MagneticButton>
          </div>
        </div>
      </section>
      <section className="form-section section-space" id="membership-form">
        <div className="page-shell form-section__grid">
          <div data-reveal><span className="eyebrow">{text(content.formIntro.eyebrow)}</span><h2>{text(content.formIntro.title)}</h2><p>{text(content.formIntro.description)}</p></div>
          <MembershipForm locale={locale} />
        </div>
      </section>
    </main>
  );
}
