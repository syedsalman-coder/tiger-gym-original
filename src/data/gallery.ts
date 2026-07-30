import { localized, type GalleryImage, type GalleryPlaceholder } from "./types";

// Owner-supplied and approved Tiger Gym photography.
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
  {
    status: "confirmed",
    id: "tiger-gym-interior",
    src: "/images/tiger-gym-interior.webp",
    alt: localized(
      "Elevated view of the Tiger Gym training floor with yellow strength machines, benches, free weights and black flooring.",
      "منظر علوي لمساحة التدريب في Tiger Gym مع أجهزة القوة الصفراء والمقاعد والأوزان الحرة والأرضية السوداء.",
    ),
    title: localized("The Tiger Gym training floor", "مساحة التدريب في Tiger Gym"),
    description: localized(
      "A wide view of the strength-focused training floor and its yellow-and-black equipment layout.",
      "منظر واسع لمساحة التدريب المخصصة للقوة وتوزيع المعدات باللونين الأصفر والأسود.",
    ),
    width: 1000,
    height: 562,
  },
  {
    status: "confirmed",
    id: "tiger-gym-building",
    src: "/images/tiger-gym-building.webp",
    alt: localized(
      "Exterior of Building 15 on Amman Street in Salmiya with the Tiger Gym sign on the facade.",
      "واجهة مبنى 15 في شارع عمّان بالسالمية مع لافتة Tiger Gym على الواجهة.",
    ),
    title: localized("Tiger Gym building in Salmiya", "مبنى Tiger Gym في السالمية"),
    description: localized(
      "The exterior of the building where Tiger Gym is located on Amman Street in Salmiya.",
      "الواجهة الخارجية للمبنى الذي يقع فيه Tiger Gym في شارع عمّان بالسالمية.",
    ),
    width: 1000,
    height: 1000,
  },
  {
    status: "confirmed",
    id: "tiger-gym-dumbbells",
    src: "/images/tiger-gym-dumbbells.webp",
    alt: localized(
      "Rows of black and red dumbbells in front of mirrors inside Tiger Gym with yellow benches and equipment.",
      "صفوف من الدمبل الأسود والأحمر أمام المرايا داخل Tiger Gym مع مقاعد ومعدات صفراء.",
    ),
    title: localized("Free-weight and dumbbell area", "منطقة الأوزان الحرة والدمبل"),
    description: localized(
      "The mirrored dumbbell area with a broad range of free weights and dedicated benches.",
      "منطقة الدمبل المحاطة بالمرايا مع مجموعة واسعة من الأوزان الحرة والمقاعد المخصصة.",
    ),
    width: 1000,
    height: 1000,
  },
] as const satisfies readonly GalleryImage[];

export const galleryPlaceholders: readonly GalleryPlaceholder[] = [];

// Marketing copy, including Arabic, should receive final owner and native-speaker approval before launch.
export const galleryContent = {
  status: "confirmed",
  metadata: {
    title: localized("Gallery | Tiger Gym Salmiya", "المعرض | Tiger Gym السالمية"),
    description: localized(
      "Explore official photos of Tiger Gym's training floor, building and free-weight area in Salmiya, Kuwait.",
      "شاهد الصور الرسمية لمساحة تدريب Tiger Gym والمبنى ومنطقة الأوزان الحرة في السالمية، الكويت.",
    ),
  },
  hero: {
    index: localized("05 / Gallery", "05 / المعرض"),
    eyebrow: localized("Inside Tiger Gym", "داخل Tiger Gym"),
    title: localized("The floor. The equipment. The place.", "المساحة. المعدات. المكان."),
    description: localized(
      "See the real Tiger Gym environment, from the Salmiya building to the strength floor and dumbbell area.",
      "شاهد بيئة Tiger Gym الحقيقية، من مبنى السالمية إلى مساحة القوة ومنطقة الدمبل.",
    ),
  },
  note: localized(
    "These official photographs were supplied for the Tiger Gym website and optimized for fast loading.",
    "تم توفير هذه الصور الرسمية لموقع Tiger Gym وتحسينها للتحميل السريع.",
  ),
  verifiedLabel: localized("Official Tiger Gym photo", "صورة رسمية من Tiger Gym"),
  lightboxEyebrow: localized("Tiger Gym gallery", "معرض Tiger Gym"),
  placeholderLabel: localized("Photo placeholder", "مساحة صورة مستقبلية"),
  viewLabel: localized("View full screen", "عرض بملء الشاشة"),
  finalCta: {
    eyebrow: localized("See it in person", "شاهد المكان بنفسك"),
    title: localized("Ready to visit the Tiger Gym floor?", "جاهز لزيارة مساحة Tiger Gym؟"),
    description: localized(
      "Use WhatsApp, phone, email or directions to confirm your visit and current membership options.",
      "استخدم واتساب أو الهاتف أو البريد الإلكتروني أو الاتجاهات لتأكيد زيارتك وخيارات العضوية الحالية.",
    ),
    label: localized("Prepare membership enquiry", "جهّز استفسار العضوية"),
  },
} as const;
