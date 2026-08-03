import { localized, type MembershipOption } from "./types";

// The owner must confirm available plans, access terms, and prices. Null prices are intentional.
export const membershipOptions: readonly MembershipOption[] = [
  {
    status: "pending",
    id: "monthly-membership",
    title: localized("Monthly Membership", "العضوية الشهرية"),
    description: localized(
      "Contact Tiger Gym to confirm current monthly membership availability.",
      "تواصل مع Tiger Gym لتأكيد توفّر العضوية الشهرية حاليًا.",
    ),
    price: null,
    priceLabel: localized("Contact for current price", "تواصل لمعرفة السعر الحالي"),
    icon: "message",
  },
  {
    status: "pending",
    id: "flexible-training-access",
    title: localized("Flexible Training Access", "خيارات دخول مرنة للتدريب"),
    description: localized(
      "Ask the team which training-access options are currently available.",
      "اسأل الفريق عن خيارات الدخول إلى التدريب المتاحة حاليًا.",
    ),
    price: null,
    priceLabel: localized("Contact for current price", "تواصل لمعرفة السعر الحالي"),
    icon: "phone",
  },
  {
    status: "pending",
    id: "membership-enquiry",
    title: localized("Membership Enquiry", "استفسار عن العضوية"),
    description: localized(
      "Visit the gym or prepare a WhatsApp enquiry using the form below.",
      "زُر النادي أو جهّز استفسارًا عبر واتساب باستخدام النموذج أدناه.",
    ),
    price: null,
    priceLabel: localized("Contact for current price", "تواصل لمعرفة السعر الحالي"),
    icon: "location",
  },
] as const;

// Demo marketing copy, including Arabic, requires final owner and native-speaker approval before launch.
export const membershipContent = {
  status: "demo",
  metadata: {
    title: localized("Membership | Tiger Gym Kuwait", "العضوية | Tiger Gym الكويت"),
    description: localized(
      "Ask Tiger Gym in Salmiya about current membership options through phone, WhatsApp or an enquiry form.",
      "استفسر من Tiger Gym في السالمية عن خيارات العضوية الحالية عبر الهاتف أو واتساب أو نموذج الاستفسار.",
    ),
  },
  hero: {
    index: localized("04 / Membership", "04 / العضوية"),
    eyebrow: localized("Start training", "ابدأ التدريب"),
    title: localized("Make the enquiry. Do the work.", "استفسر الآن. ثم ابدأ العمل."),
    description: localized(
      "Current membership rates and access options are available directly from the Tiger Gym team.",
      "يمكن معرفة أسعار العضوية وخيارات الدخول الحالية مباشرةً من فريق Tiger Gym.",
    ),
    nextLabel: localized("Membership options", "خيارات العضوية"),
    nextHref: "#membership-options",
  },
  section: {
    number: localized("04.1", "04.1"),
    eyebrow: localized("Enquiry options", "خيارات الاستفسار"),
    title: localized("Talk to the team.", "تحدّث مع الفريق."),
  },
  homeCta: {
    eyebrow: localized("Membership · Speak with our team", "العضوية · تحدّث مع فريقنا"),
    title: localized("Put your next session on the calendar.", "حدّد موعد حصتك المقبلة."),
    description: localized(
      "Contact Tiger Gym for current membership options and training access details.",
      "تواصل مع Tiger Gym لمعرفة خيارات العضوية الحالية وتفاصيل الدخول إلى التدريب.",
    ),
    label: localized("Ask about membership", "استفسر عن العضوية"),
  },
  formIntro: {
    eyebrow: localized("Membership form", "نموذج العضوية"),
    title: localized("Prepare your enquiry.", "جهّز استفسارك."),
    description: localized(
      "The form validates your details and opens a message for you to review in WhatsApp. Nothing is sent automatically.",
      "يتحقق النموذج من بياناتك ثم يفتح رسالة لتراجعها في واتساب. لن يُرسل أي شيء تلقائيًا.",
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
