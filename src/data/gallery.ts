import { localized, type GalleryImage, type GalleryPlaceholder } from "./types";

// Owner-supplied and approved Tiger Gym photography.
export const galleryImages = [
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
    id: "tiger-gym-strength-floor",
    src: "/images/tiger-gym-strength-floor.webp",
    alt: localized(
      "Low-angle view through Tiger Gym's strength floor with yellow plate-loaded stations, benches and black rubber flooring.",
      "منظر منخفض عبر مساحة تدريبات القوة في Tiger Gym مع أجهزة صفراء ومقاعد وأرضية مطاطية سوداء.",
    ),
    title: localized(
      "Strength floor and plate-loaded stations",
      "مساحة القوة وأجهزة الأوزان",
    ),
    description: localized(
      "A floor-level view showing the depth of Tiger Gym's black-and-yellow strength-training space.",
      "منظر من مستوى الأرض يوضح امتداد مساحة تدريبات القوة باللونين الأسود والأصفر في Tiger Gym.",
    ),
    width: 900,
    height: 1600,
  },
  {
    status: "confirmed",
    id: "tiger-gym-free-weights-floor",
    src: "/images/tiger-gym-free-weights.webp",
    alt: localized(
      "Close perspective of Tiger Gym's mirrored free-weight area with red and black dumbbells.",
      "منظور قريب لمنطقة الأوزان الحرة المزودة بالمرايا في Tiger Gym مع دمبل حمراء وسوداء.",
    ),
    title: localized(
      "Mirrored free-weight and dumbbell area",
      "منطقة الأوزان الحرة والدمبل",
    ),
    description: localized(
      "A long view along Tiger Gym's dumbbell racks, benches and mirrored training wall.",
      "منظر ممتد على رفوف الدمبل والمقاعد والجدار المزود بالمرايا داخل Tiger Gym.",
    ),
    width: 900,
    height: 1600,
  },
  {
    status: "confirmed",
    id: "tiger-gym-cardio-treadmills",
    src: "/images/tiger-gym-cardio-treadmills.webp",
    alt: localized(
      "A line of treadmills in Tiger Gym's black-and-yellow cardio area.",
      "صف من أجهزة المشي في منطقة الكارديو السوداء والصفراء داخل Tiger Gym.",
    ),
    title: localized(
      "Tiger Gym treadmill area",
      "منطقة أجهزة المشي في Tiger Gym",
    ),
    description: localized(
      "The dedicated treadmill line inside the gym's black-and-yellow cardio section.",
      "صف أجهزة المشي المخصص داخل منطقة الكارديو باللونين الأسود والأصفر.",
    ),
    width: 900,
    height: 1600,
  },] as const satisfies readonly GalleryImage[];

export const galleryPlaceholders: readonly GalleryPlaceholder[] = [];

// Marketing copy, including Arabic, should receive final owner and native-speaker approval before launch.
export const galleryContent = {
  status: "confirmed",
  metadata: {
    title: localized("Tiger Gym Salmiya Photos | Gym Floor & Equipment", "صور Tiger Gym السالمية | مساحة الجيم والمعدات"),
    description: localized(
      "See official Tiger Gym photos from Salmiya, including the strength floor, free-weight and dumbbell area, treadmills and the gym building.",
      "شاهد صور Tiger Gym الرسمية في السالمية، بما في ذلك مساحة القوة ومنطقة الأوزان الحرة والدمبل وأجهزة المشي ومبنى النادي.",
    ),
  },
  hero: {
    index: localized("05 / Gallery", "05 / المعرض"),
    eyebrow: localized("Inside Tiger Gym", "داخل Tiger Gym"),
    title: localized("See Tiger Gym before you visit.", "شاهد Tiger Gym قبل زيارتك."),
    description: localized(
      "See the real Tiger Gym environment, from the Salmiya building to the strength floor and dumbbell area.",
      "شاهد بيئة Tiger Gym الحقيقية، من مبنى السالمية إلى مساحة القوة ومنطقة الدمبل.",
    ),
  },
  note: localized(
    "Take a closer look at the training floor, free weights, cardio area and Salmiya location.",
    "ألقِ نظرة أقرب على مساحة التدريب والأوزان الحرة ومنطقة الكارديو وموقع النادي في السالمية.",
  ),
  verifiedLabel: localized("Inside Tiger Gym", "داخل Tiger Gym"),
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
