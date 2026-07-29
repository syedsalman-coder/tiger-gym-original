import type { Metadata } from "next";
import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";
import FinalCta from "@/components/shared/FinalCta";
import MagneticButton from "@/components/shared/MagneticButton";
import PendingFaq from "@/components/shared/PendingFaq";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { pageContent } from "@/data/pages";
import { site } from "@/data/site";
import { getLocalizedValue } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { requireLocale, type LocaleParams } from "@/i18n/server";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await requireLocale(params);
  return createLocalizedMetadata(locale, "/contact", pageContent.contact.metadata);
}

export default async function ContactPage({ params }: { params: LocaleParams }) {
  const locale = await requireLocale(params);
  const content = pageContent.contact;
  const dictionary = getDictionary(locale);
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);

  return (
    <main id="main-content">
      <PageHero index={text(content.hero.index)} eyebrow={text(content.hero.eyebrow)} title={text(content.hero.title)} description={text(content.hero.description)} nextLabel={text(content.hero.nextLabel)} nextHref={content.hero.nextHref} />
      <section className="contact-details section-space" id="location">
        <div className="page-shell">
          <SectionHeading number={text(content.location.number)} eyebrow={text(content.location.eyebrow)} title={text(content.location.title)} />
          <div className="contact-details__grid">
            <div className="contact-details__copy" data-reveal>
              <span className="eyebrow">{text(site.fullName)}</span>
              <address><MapPin size={24} aria-hidden="true" /> {text(site.address)}</address>
              <a className="contact-details__phone bidi-isolate" href={site.phoneHref}>{site.phoneDisplay}</a>
              <div className="contact-hours" aria-label={dictionary.accessibility.openingHours}>
                <div className="contact-hours__icon"><Clock3 size={22} aria-hidden="true" /></div>
                <div className="contact-hours__schedule">
                  <div className="contact-hours__row"><span>{text(site.openingHours.regularDays)}</span><strong className="bidi-isolate">{text(site.openingHours.regularTime)}</strong></div>
                  <div className="contact-hours__row"><span>{text(site.openingHours.fridayDays)}</span><strong className="bidi-isolate">{text(site.openingHours.fridayTime)}</strong></div>
                </div>
              </div>
              <div>
                <MagneticButton href={site.phoneHref} variant="outline"><Phone size={17} aria-hidden="true" /> {dictionary.common.callNow}</MagneticButton>
                <MagneticButton href={site.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={17} aria-hidden="true" /> {dictionary.common.whatsapp}</MagneticButton>
                <MagneticButton href={site.directionsUrl} target="_blank" rel="noreferrer" variant="outline"><MapPin size={17} aria-hidden="true" /> {dictionary.common.getDirections}</MagneticButton>
              </div>
            </div>
            <div className="contact-details__map" data-reveal><MapEmbed locale={locale} /></div>
          </div>
        </div>
      </section>
      <section className="form-section form-section--contact section-space" id="contact-form">
        <div className="page-shell form-section__grid">
          <div data-reveal><span className="eyebrow">{text(content.formIntro.eyebrow)}</span><h2>{text(content.formIntro.title)}</h2><p>{text(content.formIntro.description)}</p></div>
          <ContactForm locale={locale} />
        </div>
      </section>
      <PendingFaq locale={locale} />
      <FinalCta
        locale={locale}
        ariaLabel={locale === "ar" ? "إجراء تحويل التواصل" : "Contact conversion action"}
        eyebrow={content.finalCta.eyebrow}
        title={content.finalCta.title}
        description={content.finalCta.description}
        primaryLabel={content.finalCta.label}
        primaryHref="/contact#contact-form"
        showDirections
      />
    </main>
  );
}
