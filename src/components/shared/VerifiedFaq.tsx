import { site } from "@/data/site";
import { getLocalizedValue, type Locale } from "@/i18n/config";

export default function VerifiedFaq({ locale }: { locale: Locale }) {
  const text = (value: Parameters<typeof getLocalizedValue>[0]) =>
    getLocalizedValue(value, locale);

  const items =
    locale === "ar"
      ? [
          {
            question: "Ø£ÙŠÙ† ÙŠÙ‚Ø¹ Tiger GymØŸ",
            answer: `ÙŠÙ‚Ø¹ Tiger Gym ÙÙŠ ${text(site.address)}.`,
          },
          {
            question: "Ù…Ø§ Ø³Ø§Ø¹Ø§Øª Ø¹Ù…Ù„ Tiger GymØŸ",
            answer: `${text(site.openingHours.regularDays)}: ${text(site.openingHours.regularTime)}. ${text(site.openingHours.fridayDays)}: ${text(site.openingHours.fridayTime)}.`,
          },
          {
            question: "ÙƒÙŠÙ ÙŠÙ…ÙƒÙ†Ù†ÙŠ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ Tiger GymØŸ",
            answer: `ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ù„Ø§ØªØµØ§Ù„ Ø¹Ù„Ù‰ ${site.phoneDisplay} Ø£Ùˆ Ø§Ù„ØªÙˆØ§ØµÙ„ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨ Ø£Ùˆ Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ${site.email}.`,
          },
          {
            question: "Ù‡Ù„ Ù„Ø¯Ù‰ Tiger Gym Ø­Ø³Ø§Ø¨ Ø¥Ù†Ø³ØªØºØ±Ø§Ù…ØŸ",
            answer: `Ù†Ø¹Ù…ØŒ Ø§Ù„Ø­Ø³Ø§Ø¨ Ø§Ù„Ø±Ø³Ù…ÙŠ Ù‡Ùˆ ${site.instagramHandle}.`,
          },
        ]
      : [
          {
            question: "Where is Tiger Gym located?",
            answer: `Tiger Gym is located at ${text(site.address)}.`,
          },
          {
            question: "What are Tiger Gym's opening hours?",
            answer: `${text(site.openingHours.regularDays)}: ${text(site.openingHours.regularTime)}. ${text(site.openingHours.fridayDays)}: ${text(site.openingHours.fridayTime)}.`,
          },
          {
            question: "How can I contact Tiger Gym?",
            answer: `Call ${site.phoneDisplay}, message on WhatsApp, or email ${site.email}.`,
          },
          {
            question: "Does Tiger Gym have Instagram?",
            answer: `Yes. The official Instagram account is ${site.instagramHandle}.`,
          },
        ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const labels =
    locale === "ar"
      ? {
          ariaLabel: "Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ø§Ø¦Ø¹Ø© Ø¹Ù† Tiger Gym",
          eyebrow: "Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ù…Ø¤ÙƒØ¯Ø©",
          title: "Ø®Ø·Ù‘Ø· Ù„Ø²ÙŠØ§Ø±ØªÙƒ Ø¨Ø«Ù‚Ø©.",
          description:
            "Ø¥Ø¬Ø§Ø¨Ø§Øª Ù…Ø®ØªØµØ±Ø© Ù…Ø¨Ù†ÙŠØ© Ø¹Ù„Ù‰ ØªÙØ§ØµÙŠÙ„ Ø§Ù„ØªÙˆØ§ØµÙ„ ÙˆØ§Ù„Ù…ÙˆÙ‚Ø¹ ÙˆØ³Ø§Ø¹Ø§Øª Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ù…Ø¤ÙƒØ¯Ø©.",
        }
      : {
          ariaLabel: "Tiger Gym frequently asked questions",
          eyebrow: "Verified information",
          title: "Plan your visit with confidence.",
          description:
            "Quick answers based on confirmed location, contact, and opening-hour details.",
        };

  return (
    <section className="faq-section section-space" aria-label={labels.ariaLabel}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="page-shell faq-section__panel" data-reveal>
        <div className="faq-section__copy">
          <span className="eyebrow">{labels.eyebrow}</span>
          <h2>{labels.title}</h2>
          <p>{labels.description}</p>
        </div>
        <div className="responsive-grid">
          {items.map((item) => (
            <article className="philosophy__card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}