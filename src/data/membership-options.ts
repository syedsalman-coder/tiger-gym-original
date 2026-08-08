import { localized, type MembershipEnquiryStep } from "./types";

export const membershipPlans = [
  {
    id: "one-year",
    months: 12,
    term: localized("1 Year", "سنة واحدة"),
    regularPrice: 150,
    offerPrice: 120,
    freeze: localized(
      "1 month membership freeze",
      "تجميد العضوية لمدة شهر واحد",
    ),
  },
  {
    id: "six-months",
    months: 6,
    term: localized("6 Months", "6 أشهر"),
    regularPrice: 85,
    offerPrice: 68,
    freeze: localized(
      "15 days membership freeze",
      "تجميد العضوية لمدة 15 يومًا",
    ),
  },
  {
    id: "three-months",
    months: 3,
    term: localized("3 Months", "3 أشهر"),
    regularPrice: 60,
    offerPrice: 48,
    freeze: null,
  },
  {
    id: "one-month",
    months: 1,
    term: localized("1 Month", "شهر واحد"),
    regularPrice: 35,
    offerPrice: 28,
    freeze: null,
  },
] as const;

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

export const membershipContent = {
  status: "confirmed",
  metadata: {
    title: localized("Gym Membership in Salmiya | Tiger Gym Kuwait", "اشتراك الجيم في السالمية | Tiger Gym الكويت"),
    description: localized(
      "View Tiger Gym Salmiya membership offers: 1 month for KD 28, 3 months for KD 48, 6 months for KD 68 and 1 year for KD 120.",
      "اطّلع على عروض عضوية Tiger Gym السالمية: شهر بـ28 د.ك، و3 أشهر بـ48 د.ك، و6 أشهر بـ68 د.ك، وسنة بـ120 د.ك.",
    ),
  },
  hero: {
    index: localized("04 / Membership", "04 / العضوية"),
    eyebrow: localized("Start training", "ابدأ التدريب"),
    title: localized("Start training at Tiger Gym.", "ابدأ التدريب في Tiger Gym."),
    description: localized(
      "Choose from four new membership offers with 20% off every listed package, from one month to one full year.",
      "اختر من أربعة عروض عضوية جديدة بخصم 20% على جميع الباقات المدرجة، من شهر واحد حتى سنة كاملة.",
    ),
    nextLabel: localized("View membership packages", "شاهد باقات العضوية"),
    nextHref: "#membership-offers",
  },
  offer: {
    number: localized("04.1", "04.1"),
    eyebrow: localized("New offer", "عرض جديد"),
    title: localized(
      "Four packages. One clear saving.",
      "أربع باقات. وخصم واضح.",
    ),
    description: localized(
      "Save 20% on every listed Tiger Gym membership package. Choose the training period that fits your schedule and contact the team to confirm your membership.",
      "وفّر 20% على جميع باقات عضوية Tiger Gym المدرجة. اختر مدة التدريب المناسبة لجدولك وتواصل مع الفريق لتأكيد عضويتك.",
    ),
    packagesLabel: localized("Membership packages", "باقات الاشتراك"),
    savingBadge: localized("20% off", "خصم 20%"),
    regularPrice: localized("Regular price", "السعر السابق"),
    offerPrice: localized("Offer price", "سعر العرض"),
    saveLabel: localized("You save", "قيمة التوفير"),
    currency: localized("KD", "د.ك"),
    freezeTitle: localized(
      "Freeze time included with longer memberships",
      "مدة تجميد متاحة مع العضويات الأطول",
    ),
    freezeDescription: localized(
      "The 1-year package includes 1 month of freeze time. The 6-month package includes 15 days.",
      "تشمل باقة السنة مدة تجميد قدرها شهر واحد، وتشمل باقة 6 أشهر مدة تجميد قدرها 15 يومًا.",
    ),
    enquire: localized("Ask about this package", "استفسر عن هذه الباقة"),
    note: localized(
      "Contact Tiger Gym to confirm offer availability and membership terms before payment.",
      "تواصل مع Tiger Gym لتأكيد توفر العرض وشروط العضوية قبل الدفع.",
    ),
  },
  section: {
    number: localized("04.2", "04.2"),
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
