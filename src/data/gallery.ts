import { localized, type GalleryImage, type GalleryPlaceholder } from "./types";

// Only the supplied logo is confirmed. Replace pending slots with owner-approved gym photography.
export const galleryImages = [
  {
    status: "confirmed",
    id: "tiger-gym-logo",
    src: "/tiger-logo.png",
    alt: localized(
      "Tiger Gym Fitness Center logo with a yellow tiger and kettlebell emblem on a black circular badge.",
      "شعار مركز Tiger Gym للياقة البدنية، ويظهر نمر أصفر ورمز كرة حديدية داخل شارة دائرية سوداء.",
    ),
    title: localized("Tiger Gym Fitness Center logo", "شعار مركز Tiger Gym للياقة البدنية"),
    description: localized(
      "The official yellow-and-black Tiger Gym brand mark supplied with this website.",
      "العلامة الرسمية الصفراء والسوداء لـ Tiger Gym والمزوّدة مع هذا الموقع.",
    ),
    width: 1233,
    height: 865,
  },
] as const satisfies readonly GalleryImage[];

export const galleryPlaceholders = [
  {
    status: "pending",
    number: "01",
    title: localized("Future facility photo", "صورة مستقبلية لمرافق التدريب"),
    description: localized(
      "Reserved for a verified Tiger Gym facility photograph.",
      "مساحة محجوزة لصورة موثّقة لمرافق Tiger Gym.",
    ),
    size: "tall",
    tone: "yellow",
  },
  {
    status: "pending",
    number: "02",
    title: localized("Future training photo", "صورة تدريب مستقبلية"),
    description: localized(
      "Reserved for a verified Tiger Gym training photograph.",
      "مساحة محجوزة لصورة تدريب موثّقة من Tiger Gym.",
    ),
    size: "standard",
    tone: "black",
  },
  {
    status: "pending",
    number: "03",
    title: localized("Future facility photo", "صورة مستقبلية لمرافق التدريب"),
    description: localized(
      "Reserved for another verified Tiger Gym facility photograph.",
      "مساحة محجوزة لصورة إضافية موثّقة لمرافق Tiger Gym.",
    ),
    size: "compact",
    tone: "black",
  },
  {
    status: "pending",
    number: "04",
    title: localized("Future training photo", "صورة تدريب مستقبلية"),
    description: localized(
      "Reserved for another verified Tiger Gym training photograph.",
      "مساحة محجوزة لصورة تدريب إضافية موثّقة من Tiger Gym.",
    ),
    size: "wide",
    tone: "yellow",
  },
  {
    status: "pending",
    number: "05",
    title: localized("Future gallery photo", "صورة مستقبلية للمعرض"),
    description: localized(
      "Reserved until an approved Tiger Gym photograph is supplied.",
      "مساحة محجوزة إلى حين توفير صورة معتمدة من Tiger Gym.",
    ),
    size: "standard",
    tone: "black",
  },
] as const satisfies readonly GalleryPlaceholder[];

// Demo marketing copy, including Arabic, requires final owner and native-speaker approval before launch.
export const galleryContent = {
  status: "demo",
  metadata: {
    title: localized("Gallery | Tiger Gym Salmiya", "المعرض | Tiger Gym السالمية"),
    description: localized(
      "View the verified Tiger Gym brand asset and prepared spaces for future approved gym photography.",
      "شاهد العلامة الموثّقة لـ Tiger Gym والمساحات المجهّزة لصور النادي المعتمدة مستقبلًا.",
    ),
  },
  hero: {
    index: localized("05 / Gallery", "05 / المعرض"),
    eyebrow: localized("Tiger Gym visuals", "هوية Tiger Gym البصرية"),
    title: localized("The brand. The floor—coming next.", "الهوية أولًا. وصور النادي قريبًا."),
    description: localized(
      "The official Tiger Gym mark leads a gallery prepared for future approved photography from the training floor.",
      "تتصدّر علامة Tiger Gym الرسمية معرضًا مجهّزًا لاستقبال صور معتمدة من مساحة التدريب مستقبلًا.",
    ),
  },
  note: localized(
    "One verified brand image is available. Future photo spaces are clearly marked and contain no stock or invented imagery.",
    "تتوفر صورة واحدة موثّقة للعلامة. أما مساحات الصور المستقبلية فمحددة بوضوح ولا تحتوي على صور مخزّنة أو مختلقة.",
  ),
  verifiedLabel: localized("Verified image", "صورة موثّقة"),
  lightboxEyebrow: localized("Verified Tiger Gym asset", "عنصر موثّق من Tiger Gym"),
  placeholderLabel: localized("Photo placeholder", "مساحة صورة مستقبلية"),
  viewLabel: localized("View full screen", "عرض بملء الشاشة"),
} as const;
