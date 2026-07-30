import { MessageCircle } from "lucide-react";

import MagneticButton from "@/components/shared/MagneticButton";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";

export default function PendingFaq({ locale }: { locale: Locale }) {
  const labels =
    locale === "ar"
      ? {
          ariaLabel: "أسئلة Tiger Gym الشائعة",
          eyebrow: "الأسئلة الشائعة",
          title: "إجابات الأسئلة الشائعة قيد التأكيد.",
          description:
            "لا ننشر هنا إجابات تشغيلية غير مؤكدة. اسأل فريق Tiger Gym مباشرةً لتأكيد العضوية أو المعدات أو تفاصيل الزيارة الحالية.",
          note: "سيتم نشر الأسئلة الشائعة بعد تأكيد كل إجابة من مالك النادي.",
          whatsapp: "اسأل عبر واتساب",
        }
      : {
          ariaLabel: "Tiger Gym FAQ",
          eyebrow: "FAQ",
          title: "FAQ answers are pending confirmation.",
          description:
            "No unverified operating answers are published here. Ask the Tiger Gym team directly to confirm current membership, equipment, or visit details.",
          note: "FAQs will be published after each answer is confirmed by the gym owner.",
          whatsapp: "Ask on WhatsApp",
        };

  return (
    <section className="faq-section section-space" aria-label={labels.ariaLabel}>
      <div className="page-shell faq-section__panel" data-reveal>
        <div className="faq-section__copy">
          <span className="eyebrow">{labels.eyebrow}</span>
          <h2>{labels.title}</h2>
          <p>{labels.description}</p>
          <small>{labels.note}</small>
        </div>

        <MagneticButton href={site.whatsappHref} target="_blank" rel="noreferrer" variant="outline">
          <MessageCircle size={17} aria-hidden="true" /> {labels.whatsapp}
        </MagneticButton>
      </div>
    </section>
  );
}
