import { localized, type MembershipEnquiryStep } from "./types";

// These are enquiry steps, not advertised plans. Prices and access terms are confirmed directly by the gym.
export const membershipEnquirySteps: readonly MembershipEnquiryStep[] = [
  {
    status: "confirmed",
    id: "message-the-team",
    title: localized("Message the team", "راسل الفريق"),
    description: localized(
      "Ask Tiger Gym directly for current membership prices and access terms.",
      "اسأل Tiger Gym مباشرةً عن أسعار العضوية الحالية وشروط الدخول.",
    ),
    detailLabel: localized("WhatsApp or phone", "واتساب أو الهاتف"),
    icon: "message",
  },
  {
    status: "confirmed",
    id: "share-your-schedule",
    title: localized("Share your schedule", "شارك وقت تدريبك"),
    description: localized(
      "Tell the team when you prefer to train so they can explain the current access details.",
      "أخبر الفريق بوقت التدريب المفضّل ليشرح لك تفاصيل الدخول الحالية.",
    ),
    detailLabel: localized("Your preferred time", "وقت التدريب المفضّل"),
    icon: "clock",
  },
  {
    status: "confirmed",
    id: "plan-your-visit",
    title: localized("Plan your visit", "خطّط لزيارتك"),
    description: localized(
      "Check the Salmiya location and opening hours before you come to the gym.",
      "تعرّف إلى موقع النادي في السالمية وساعات العمل قبل زيارتك.",
    ),
    detailLabel: localized("Amman Street, Salmiya", "شارع عمّان، السالمية"),
    icon: "location",
  },
] as const satisfies readonly MembershipEnquiryStep[];

// Demo marketing copy, including Arabic, requires final owner and native-speaker approval before launch.
export const membershipContent = {
  status: "demo",
  metadata: {
    title: localized("Gym Membership in Salmiya | Tiger Gym Kuwait", "اشتراك الجيم في السالمية | Tiger Gym الكويت"),
    description: localized(
      "Ask Tiger Gym in Salmiya for current gym membership prices and access options. Contact the team by WhatsApp or phone and plan your visit.",
      "استفسر من Tiger Gym في السالمية عن أسعار اشتراك الجيم وخيارات الدخول الحالية، وتواصل مع الفريق عبر واتساب أو الهاتف وخطط لزيارتك.",
    ),
  },
  hero: {
    index: localized("04 / Membership", "04 / العضوية"),
    eyebrow: localized("Start training", "ابدأ التدريب"),
    title: localized("Start training at Tiger Gym.", "ابدأ التدريب في Tiger Gym."),
    description: localized(
      "For current membership prices and gym access options, contact the Tiger Gym team directly by WhatsApp, phone or the enquiry form below.",
      "لمعرفة أسعار العضوية وخيارات دخول الجيم الحالية، تواصل مباشرةً مع فريق Tiger Gym عبر واتساب أو الهاتف أو نموذج الاستفسار أدناه.",
    ),
    nextLabel: localized("How to get started", "كيف تبدأ"),
    nextHref: "#membership-options",
  },
  section: {
    number: localized("04.1", "04.1"),
    eyebrow: localized("Three simple steps", "ثلاث خطوات بسيطة"),
    title: localized("A clear way to get started.", "طريقة واضحة للبدء."),
  },
  homeCta: {
    eyebrow: localized("Membership · Speak with our team", "العضوية · تحدّث مع فريقنا"),
    title: localized("Put your next session on the calendar.", "حدّد موعد حصتك المقبلة."),
    description: localized(
      "Message Tiger Gym for current membership prices, access options and visit details in Salmiya.",
      "راسل Tiger Gym لمعرفة أسعار العضوية الحالية وخيارات الدخول وتفاصيل الزيارة في السالمية.",
    ),
    label: localized("Ask about membership", "استفسر عن العضوية"),
  },
  formIntro: {
    eyebrow: localized("Membership form", "نموذج العضوية"),
    title: localized("Prepare your enquiry.", "جهّز استفسارك."),
    description: localized(
      "Enter your details and the form prepares a WhatsApp membership message for you to review and send yourself.",
      "أدخل بياناتك وسيجهّز النموذج رسالة عضوية عبر واتساب لتراجعها وترسلها بنفسك.",
    ),
  },
  finalCta: {
    eyebrow: localized("Confirm before you join", "أكّد قبل الانضمام"),
    title: localized("Ready to confirm your membership option?", "جاهز لتأكيد خيار العضوية؟"),
    description: localized(
      "Use the form or WhatsApp to ask Tiger Gym for current prices, access terms and visit details before committing.",
      "استخدم النموذج أو واتساب لسؤال Tiger Gym عن الأسعار الحالية وشروط الدخول وتفاصيل الزيارة قبل الالتزام.",
    ),
    label: localized("Prepare membership enquiry", "جهّز استفسار العضوية"),
  },
} as const;
