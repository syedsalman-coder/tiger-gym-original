import { localized, type MembershipOption } from "./types";

// The owner must confirm available plans, access terms, and prices. Null prices are intentional.
export const membershipOptions: readonly MembershipOption[] = [
  {
    status: "pending",
    id: "monthly-membership",
    title: localized("Monthly Membership", "العضوية الشهرية"),
    description: localized(
      "Ask Tiger Gym for the current monthly membership price, access terms and available start options.",
      "اسأل Tiger Gym عن السعر الحالي للعضوية الشهرية وشروط الدخول وخيارات بدء الاشتراك.",
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
      "Tell the team when you plan to train and ask which current access option best fits your schedule.",
      "أخبر الفريق بوقت تدريبك المعتاد واسأل عن خيار الدخول الحالي الأنسب لجدولك.",
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
      "Message Tiger Gym on WhatsApp or visit the Salmiya gym to ask about current membership details.",
      "راسل Tiger Gym عبر واتساب أو زُر النادي في السالمية للاستفسار عن تفاصيل العضوية الحالية.",
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
