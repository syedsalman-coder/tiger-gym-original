import type { Metadata } from "next";
import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";
import MagneticButton from "@/components/shared/MagneticButton";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Tiger Gym | Salmiya, Kuwait",
  description:
    "Call, message, locate or visit Tiger Gym Fitness Center in Salmiya, Kuwait.",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        index="06 / Contact"
        eyebrow="Find Tiger Gym"
        title="Salmiya. Your next session."
        description="Call, message or use the verified map location to plan your visit."
        nextLabel="Location details"
        nextHref="#location"
      />

      <section className="contact-details section-space" id="location">
        <div className="page-shell">
          <SectionHeading number="06.1" eyebrow="Location" title="Get here. Get to work." />
          <div className="contact-details__grid">
            <div className="contact-details__copy" data-reveal>
              <span className="eyebrow">Tiger Gym Fitness Center</span>
              <address><MapPin size={24} aria-hidden="true" /> {site.address}</address>
              <a className="contact-details__phone" href={site.phoneHref}>{site.phoneDisplay}</a>
              <div className="contact-hours" aria-label="Tiger Gym opening hours">
                <div className="contact-hours__icon">
                  <Clock3 size={22} aria-hidden="true" />
                </div>
                <div className="contact-hours__schedule">
                  <div className="contact-hours__row">
                    <span>{site.openingHours.regularDays}</span>
                    <strong>{site.openingHours.regularTime}</strong>
                  </div>
                  <div className="contact-hours__row">
                    <span>{site.openingHours.fridayDays}</span>
                    <strong>{site.openingHours.fridayTime}</strong>
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
          <div data-reveal><span className="eyebrow">Contact form</span><h2>Prepare a message.</h2><p>This form validates your details and opens WhatsApp for you to review and send the message yourself.</p></div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
