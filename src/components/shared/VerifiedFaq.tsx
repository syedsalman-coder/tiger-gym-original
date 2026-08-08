import { site } from "@/data/site";
import {
  getLocalizedValue,
  type Locale,
} from "@/i18n/config";

export default function VerifiedFaq({
  locale,
}: {
  locale: Locale;
}) {
  const text = (
    value: Parameters<
      typeof getLocalizedValue
    >[0],
  ) => getLocalizedValue(value, locale);

  const items =
    locale === "ar"
      ? [
          {
            question:
              "أين يقع Tiger Gym في السالمية؟",
            answer:
              `يقع Tiger Gym في ${text(site.address)}.`,
          },
          {
            question:
              "ما ساعات عمل Tiger Gym؟",
            answer:
              `${text(site.openingHours.regularDays)}: ${text(site.openingHours.regularTime)}. ${text(site.openingHours.fridayDays)}: ${text(site.openingHours.fridayTime)}.`,
          },
          {
            question:
              "ما مناطق التدريب المتوفرة في Tiger Gym؟",
            answer:
              "يعرض الموقع مناطق مخصصة لتدريبات القوة والأوزان الحرة والدمبل، إضافة إلى منطقة كارديو تضم أجهزة المشي.",
          },
          {
            question:
              "كيف أعرف سعر اشتراك Tiger Gym الحالي؟",
            answer:
              `تواصل مباشرةً مع Tiger Gym عبر واتساب أو الهاتف على ${site.phoneDisplay} للاستفسار عن أسعار العضوية وخيارات الدخول الحالية.`,
          },
          {
            question:
              "هل يمكنني التواصل مع Tiger Gym عبر واتساب؟",
            answer:
              `نعم. يمكنك مراسلة Tiger Gym عبر واتساب على الرقم ${site.phoneDisplay}.`,
          },
          {
            question:
              "أين يمكنني مشاهدة صور Tiger Gym قبل الزيارة؟",
            answer:
              `يمكنك مشاهدة صور النادي الحقيقية في صفحة المعرض أو عبر حساب إنستغرام الرسمي ${site.instagramHandle}.`,
          },
        ]
      : [
          {
            question:
              "Where is Tiger Gym in Salmiya?",
            answer:
              `Tiger Gym is located at ${text(site.address)}.`,
          },
          {
            question:
              "What are Tiger Gym's opening hours?",
            answer:
              `${text(site.openingHours.regularDays)}: ${text(site.openingHours.regularTime)}. ${text(site.openingHours.fridayDays)}: ${text(site.openingHours.fridayTime)}.`,
          },
          {
            question:
              "What training areas are available at Tiger Gym?",
            answer:
              "The website shows dedicated strength-training areas, a mirrored free-weight and dumbbell section, and a cardio area with treadmills.",
          },
          {
            question:
              "How do I check the current Tiger Gym membership price?",
            answer:
              `Contact Tiger Gym directly on WhatsApp or call ${site.phoneDisplay} to ask about current membership prices and access options.`,
          },
          {
            question:
              "Can I contact Tiger Gym on WhatsApp?",
            answer:
              `Yes. You can message Tiger Gym on WhatsApp using ${site.phoneDisplay}.`,
          },
          {
            question:
              "Where can I see Tiger Gym photos before visiting?",
            answer:
              `View the official gallery on this website or visit the Tiger Gym Instagram account ${site.instagramHandle}.`,
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
          ariaLabel:
            "الأسئلة الشائعة عن Tiger Gym",
          eyebrow:
            "معلومات مفيدة قبل الزيارة",
          title:
            "كل ما تحتاجه قبل تدريبك.",
          description:
            "إجابات سريعة حول موقع Tiger Gym وساعات العمل ومناطق التدريب والعضوية وطرق التواصل.",
        }
      : {
          ariaLabel:
            "Tiger Gym frequently asked questions",
          eyebrow:
            "Plan your visit",
          title:
            "What to know before you train.",
          description:
            "Quick answers about the Tiger Gym location, opening hours, training areas, membership enquiries and contact options.",
        };

  return (
    <section
      className="faq-section section-space"
      aria-label={labels.ariaLabel}
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schema,
          ).replace(/</g, "\\u003c"),
        }}
      />

      <div
        className="page-shell faq-section__panel"
        data-reveal
      >
        <div className="faq-section__copy">
          <span className="eyebrow">
            {labels.eyebrow}
          </span>

          <h2>{labels.title}</h2>

          <p>{labels.description}</p>
        </div>

        <div className="faq-section__grid">
          {items.map((item) => (
            <article
              className="philosophy__card"
              key={item.question}
            >
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
