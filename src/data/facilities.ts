import { localized, type Facility } from "./types";

// Categories came from the prior site; the owner must confirm category names and equipment before publication updates.
export const facilities = [
  {
    status: "confirmed",
    number: "01",
    slug: "strength-zone",
    title: localized("Strength Zone", "منطقة القوة"),
    shortTitle: localized("Strength Training", "تدريبات القوة"),
    description: localized(
      "A focused category for structured strength training.",
      "فئة مخصّصة لتدريبات القوة المنظّمة.",
    ),
    detail: localized(
      "A dedicated space for structured strength and plate-loaded training.",
      "مساحة مخصصة لتدريبات القوة المنظمة وتمارين الأوزان المحملة.",
    ),
    icon: "dumbbell",
    image: {
      src: "/images/tiger-gym-strength-floor.webp",
      alt: localized(
        "Low-angle view of Tiger Gym's strength floor with yellow plate-loaded equipment, benches and black rubber flooring.",
        "منظر منخفض لمساحة تدريبات القوة في Tiger Gym مع أجهزة صفراء ومقاعد وأرضية مطاطية سوداء.",
      ),
      position: "50% 58%",
    },

  },
  {
    status: "confirmed",
    number: "02",
    slug: "free-weights",
    title: localized("Free Weights", "الأوزان الحرة"),
    shortTitle: localized("Free Weight Training", "تدريبات الأوزان الحرة"),
    description: localized(
      "A category for free-weight movement and bodybuilding fundamentals.",
      "فئة لحركات الأوزان الحرة وأساسيات كمال الأجسام.",
    ),
    detail: localized(
      "A mirrored free-weight and dumbbell area for strength and bodybuilding sessions.",
      "منطقة مزودة بالمرايا للأوزان الحرة والدمبل وتدريبات القوة وكمال الأجسام.",
    ),
    icon: "weight",
    image: {
      src: "/images/tiger-gym-free-weights.webp",
      alt: localized(
        "Rows of black and red dumbbells beside the mirrored free-weight area inside Tiger Gym.",
        "صفوف من الدمبل الأسود والأحمر بجانب المرايا في منطقة الأوزان الحرة داخل Tiger Gym.",
      ),
      position: "50% 48%",
    },

  },
  {
    status: "confirmed",
    number: "03",
    slug: "cardio-area",
    title: localized("Cardio Area", "منطقة التمارين الهوائية"),
    shortTitle: localized("Cardio Training", "التمارين الهوائية"),
    description: localized(
      "A conditioning category for stamina and general fitness.",
      "فئة لرفع القدرة على التحمّل وتعزيز اللياقة العامة.",
    ),
    detail: localized(
      "A dedicated treadmill area for cardio, stamina and general conditioning.",
      "منطقة مخصصة لأجهزة المشي وتمارين الكارديو والتحمل واللياقة العامة.",
    ),
    icon: "activity",
    image: {
      src: "/images/tiger-gym-cardio-treadmills.webp",
      alt: localized(
        "A line of treadmills in Tiger Gym's black-and-yellow cardio area.",
        "صف من أجهزة المشي في منطقة الكارديو السوداء والصفراء داخل Tiger Gym.",
      ),
      position: "50% 50%",
    },

  },
  {
    status: "pending",
    number: "04",
    slug: "functional-training",
    title: localized("Functional Training", "التدريب الوظيفي"),
    shortTitle: localized("Personal Fitness", "اللياقة الشخصية"),
    description: localized(
      "A flexible category for movement-focused training.",
      "فئة مرنة للتدريب الذي يركّز على الحركة.",
    ),
    detail: localized(
      "A flexible area for movement-focused and personal fitness training.",
      "مساحة مرنة للتدريب الحركي وتمارين اللياقة الشخصية.",
    ),
    icon: "zap",
    image: null,

  },
] as const satisfies readonly Facility[];

// Demo marketing copy, including Arabic, requires final owner and native-speaker approval before launch.
export const facilitiesContent = {
  status: "demo",
  metadata: {
    title: localized("Gym Facilities | Tiger Gym Salmiya", "مرافق Tiger Gym | السالمية"),
    description: localized(
      "Explore the training categories currently listed by Tiger Gym in Salmiya.",
      "استكشف فئات التدريب المدرجة حاليًا لدى Tiger Gym في السالمية.",
    ),
  },
  hero: {
    index: localized("03 / Facilities", "03 / مرافق التدريب"),
    eyebrow: localized("The training floor", "مساحة التدريب"),
    title: localized("Space for serious sessions.", "مساحة لحصص جادّة."),
    description: localized(
      "Explore strength, free-weight, cardio and functional-training areas at Tiger Gym.",
      "استكشف مناطق القوة والأوزان الحرة والكارديو والتدريب الوظيفي في Tiger Gym.",
    ),
    nextLabel: localized("View training areas", "عرض مناطق التدريب"),
    nextHref: "#training-areas",
  },
  section: {
    number: localized("03.1", "03.1"),
    eyebrow: localized("Listed categories", "الفئات المدرجة"),
    title: localized("Choose the work.", "اختر نوع التدريب."),
    description: localized(
      "Explore the main training areas available at Tiger Gym.",
      "استكشف مناطق التدريب الرئيسية المتاحة في Tiger Gym.",
    ),
    detailLabel: localized("Training focus", "محور التدريب"),
  },
  preview: {
    number: localized("03", "03"),
    eyebrow: localized("Training areas", "مناطق التدريب"),
    title: localized("Made for the work.", "مهيّأة للعمل."),
    linkLabel: localized("View all facilities", "عرض جميع مرافق التدريب"),
  },
  cta: {
    eyebrow: localized("Train at Tiger Gym", "تدرّب في Tiger Gym"),
    title: localized("Ask the team about current access.", "اسأل الفريق عن خيارات الدخول الحالية."),
    label: localized("Membership enquiry", "استفسار عن العضوية"),
    href: "/membership",
  },
  finalCta: {
    eyebrow: localized("Verify the training floor", "أكّد مساحة التدريب"),
    title: localized("Ask what is available before you train.", "اسأل عمّا هو متاح قبل التدريب."),
    description: localized(
      "Training categories are listed, but equipment details should be confirmed directly with Tiger Gym before a specific workout.",
      "فئات التدريب مدرجة، لكن يجب تأكيد تفاصيل المعدات مباشرةً مع Tiger Gym قبل تمرين محدد.",
    ),
    label: localized("Prepare membership enquiry", "جهّز استفسار العضوية"),
  },
} as const;
