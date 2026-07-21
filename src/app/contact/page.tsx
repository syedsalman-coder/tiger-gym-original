import type { Metadata } from "next";
import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";
import MagneticButton from "@/components/shared/MagneticButton";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { pageContent } from "@/data/pages";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: pageContent.contact.metadata.title.en,
  description: pageContent.contact.metadata.description.en,
};

export default function ContactPage() {
  const content = pageContent.contact;

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

      <section className="contact-details section-space" id="location">
        <div className="page-shell">
          <SectionHeading number={content.location.number.en} eyebrow={content.location.eyebrow.en} title={content.location.title.en} />
          <div className="contact-details__grid">
            <div className="contact-details__copy" data-reveal>
              <span className="eyebrow">{site.fullName.en}</span>
              <address><MapPin size={24} aria-hidden="true" /> {site.address.en}</address>
              <a className="contact-details__phone" href={site.phoneHref}>{site.phoneDisplay}</a>
              <div className="contact-hours" aria-label={`${site.name.en} opening hours`}>
                <div className="contact-hours__icon">
                  <Clock3 size={22} aria-hidden="true" />
                </div>
                <div className="contact-hours__schedule">
                  <div className="contact-hours__row">
                    <span>{site.openingHours.regularDays.en}</span>
                    <strong>{site.openingHours.regularTime.en}</strong>
                  </div>
                  <div className="contact-hours__row">
                    <span>{site.openingHours.fridayDays.en}</span>
                    <strong>{site.openingHours.fridayTime.en}</strong>
                  </div>
                </div>
              </div>
              <div>
                <MagneticButton href={site.phoneHref} variant="outline"><Phone size={17} aria-hidden="true" /> Call now</MagneticButton>
                <MagneticButton href={site.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={17} aria-hidden="true" /> WhatsApp</MagneticButton>
                <MagneticButton href={site.directionsUrl} target="_blank" rel="noreferrer" variant="outline"><MapPin size={17} aria-hidden="true" /> Get directions</MagneticButton>
              </div>
            </div>
            <div className="contact-details__map" data-reveal><MapEmbed /></div>
          </div>
        </div>
      </section>

      <section className="form-section form-section--contact section-space">
        <div className="page-shell form-section__grid">
          <div data-reveal><span className="eyebrow">{content.formIntro.eyebrow.en}</span><h2>{content.formIntro.title.en}</h2><p>{content.formIntro.description.en}</p></div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
