import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import MembershipForm from "@/components/contact/MembershipForm";
import MagneticButton from "@/components/shared/MagneticButton";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { site } from "@/data/site";

const enquiryOptions = [
  { title: "Monthly Membership", text: "Contact Tiger Gym for current monthly membership information.", icon: MessageCircle },
  { title: "Flexible Training Access", text: "Speak with the team about the access options currently available.", icon: Phone },
  { title: "Membership Enquiry", text: "Visit the gym or prepare a WhatsApp enquiry using the form below.", icon: MapPin },
] as const;

export const metadata: Metadata = {
  title: "Membership | Tiger Gym Kuwait",
  description:
    "Ask Tiger Gym in Salmiya about current membership options through phone, WhatsApp or an enquiry form.",
};

export default function MembershipPage() {
  return (
    <main id="main-content">
      <PageHero
        index="04 / Membership"
        eyebrow="Start training"
        title="Make the enquiry. Do the work."
        description="Current membership rates and access options are available directly from the Tiger Gym team."
        nextLabel="Membership options"
        nextHref="#membership-options"
      />

      <section className="membership-options section-space" id="membership-options">
        <div className="page-shell">
          <SectionHeading number="04.1" eyebrow="Enquiry options" title="Talk to the team." />
          <div className="membership-options__grid">
            {enquiryOptions.map(({ title, text, icon: Icon }, index) => (
              <article className="membership-option" key={title} data-stagger-card>
                <div><span>0{index + 1}</span><Icon size={24} strokeWidth={1.4} aria-hidden="true" /></div>
                <h3>{title}</h3><p>{text}</p><strong>Contact for current price</strong>
              </article>
            ))}
          </div>
          <div className="membership-options__direct" data-reveal>
            <MagneticButton href={site.phoneHref} variant="outline"><Phone size={17} aria-hidden="true" /> Call now</MagneticButton>
            <MagneticButton href={site.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={17} aria-hidden="true" /> WhatsApp</MagneticButton>
          </div>
        </div>
      </section>

      <section className="form-section section-space">
        <div className="page-shell form-section__grid">
          <div data-reveal><span className="eyebrow">Membership form</span><h2>Prepare your enquiry.</h2><p>The form validates your details and opens a message for you to review in WhatsApp. Nothing is sent automatically.</p></div>
          <MembershipForm />
        </div>
      </section>
    </main>
  );
}
