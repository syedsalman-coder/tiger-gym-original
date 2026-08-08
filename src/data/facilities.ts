import { localized, type Facility } from "./types";

// Only owner-confirmed training areas are published here.
export const facilities = [
  {
    status: "confirmed",
    number: "01",
    slug: "strength-zone",
    title: localized("Strength Zone", "منطقة القوة"),
    shortTitle: localized("Strength Training", "تدريبات القوة"),
    description: localized(
      "Plate-loaded strength training with dedicated stations and benches.",
      "تدريبات قوة باستخدام أجهزة محمّلة بالأوزان مع محطات ومقاعد مخصصة.",
    ),
    detail: localized(
      "Train in a black-and-yellow strength area with plate-loaded stations and benches shown in official Tiger Gym photos.",
      "تدرّب في منطقة قوة باللونين الأسود والأصفر مع أجهزة محمّلة بالأوزان ومقاعد تظهر في صور Tiger Gym الرسمية.",
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
      "A mirrored dumbbell and free-weight area for strength and bodybuilding-style training.",
      "منطقة مزودة بالمرايا للدمبل والأوزان الحرة وتدريبات القوة وأسلوب كمال الأجسام.",
    ),
    detail: localized(
      "Train with rows of dumbbells, free weights and benches beside the mirrored training wall.",
      "تدرّب مع صفوف الدمبل والأوزان الحرة والمقاعد بجانب جدار التدريب المزود بالمرايا.",
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
      "Treadmill-based cardio for conditioning, stamina and general fitness.",
      "كارديو على أجهزة المشي لتحسين التحمل واللياقة العامة.",
    ),
    detail: localized(
      "Use the dedicated treadmill line for cardio sessions, warm-ups and general conditioning.",
      "استخدم صف أجهزة المشي المخصص للكارديو والإحماء وتحسين اللياقة العامة.",
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
] as const satisfies readonly Facility[];

// Demo marketing copy, including Arabic, requires final owner and native-speaker approval before launch.
export const facilitiesContent = {
  status: "demo",
  metadata: {
    title: localized("Gym Facilities in Salmiya | Tiger Gym Kuwait", "مرافق الجيم في السالمية | Tiger Gym الكويت"),
    description: localized(
      "Explore Tiger Gym's strength floor, free-weight and dumbbell area, and treadmill cardio section in Salmiya, Kuwait.",
      "استكشف مساحة القوة ومنطقة الأوزان الحرة والدمبل وقسم الكارديو وأجهزة المشي في Tiger Gym بالسالمية، الكويت.",
    ),
  },
  hero: {
    index: localized("03 / Facilities", "03 / مرافق التدريب"),
    eyebrow: localized("The training floor", "مساحة التدريب"),
    title: localized("Space for serious sessions.", "مساحة لحصص جادّة."),
    description: localized(
      "Explore the real Tiger Gym training floor in Salmiya, including strength stations, free weights, dumbbells and treadmills.",
      "استكشف مساحة التدريب الحقيقية في Tiger Gym بالسالمية، بما في ذلك محطات القوة والأوزان الحرة والدمبل وأجهزة المشي.",
    ),
    nextLabel: localized("View training areas", "عرض مناطق التدريب"),
    nextHref: "#training-areas",
  },
  section: {
    number: localized("03.1", "03.1"),
    eyebrow: localized("Three dedicated zones", "ثلاث مناطق مخصصة"),
    title: localized("Choose your training zone.", "اختر منطقة تدريبك."),
    description: localized(
      "Explore the main training areas available at Tiger Gym.",
      "استكشف مناطق التدريب الرئيسية المتاحة في Tiger Gym.",
    ),
    detailLabel: localized("Training focus", "محور التدريب"),
  },
  preview: {
    number: localized("04", "04"),
    eyebrow: localized("Training areas", "مناطق التدريب"),
    title: localized("Built for focused training.", "مهيّأة لتدريب مركّز."),
    linkLabel: localized("View all facilities", "عرض جميع مرافق التدريب"),
  },
  cta: {
    eyebrow: localized("Train at Tiger Gym", "تدرّب في Tiger Gym"),
    title: localized("Plan your training at Tiger Gym.", "خطط لتدريبك في Tiger Gym."),
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
