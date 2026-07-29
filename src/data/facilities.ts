import { localized, type Facility } from "./types";

// Categories came from the prior site; the owner must confirm category names and equipment before publication updates.
export const facilities = [
  {
    status: "pending",
    number: "01",
    slug: "strength-zone",
    title: localized("Strength Zone", "منطقة القوة"),
    shortTitle: localized("Strength Training", "تدريبات القوة"),
    description: localized(
      "A focused category for structured strength training.",
      "فئة مخصّصة لتدريبات القوة المنظّمة.",
    ),
    detail: localized(
      "Confirm the available strength equipment directly with the gym.",
      "يُرجى تأكيد أجهزة القوة المتاحة مباشرةً مع النادي.",
    ),
    icon: "dumbbell",
  },
  {
    status: "pending",
    number: "02",
    slug: "free-weights",
    title: localized("Free Weights", "الأوزان الحرة"),
    shortTitle: localized("Free Weight Training", "تدريبات الأوزان الحرة"),
    description: localized(
      "A category for free-weight movement and bodybuilding fundamentals.",
      "فئة لحركات الأوزان الحرة وأساسيات كمال الأجسام.",
    ),
    detail: localized(
      "Confirm the available free-weight equipment directly with the gym.",
      "يُرجى تأكيد معدات الأوزان الحرة المتاحة مباشرةً مع النادي.",
    ),
    icon: "weight",
  },
  {
    status: "pending",
    number: "03",
    slug: "cardio-area",
    title: localized("Cardio Area", "منطقة التمارين الهوائية"),
    shortTitle: localized("Cardio Training", "التمارين الهوائية"),
    description: localized(
      "A conditioning category for stamina and general fitness.",
      "فئة لرفع القدرة على التحمّل وتعزيز اللياقة العامة.",
    ),
    detail: localized(
      "Confirm the available cardio equipment directly with the gym.",
      "يُرجى تأكيد أجهزة التمارين الهوائية المتاحة مباشرةً مع النادي.",
    ),
    icon: "activity",
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
      "Confirm the available functional-training equipment directly with the gym.",
      "يُرجى تأكيد معدات التدريب الوظيفي المتاحة مباشرةً مع النادي.",
    ),
    icon: "zap",
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
      "Four training categories carried forward from Tiger Gym's existing information.",
      "أربع فئات تدريب منقولة من المعلومات الحالية لـ Tiger Gym.",
    ),
    nextLabel: localized("View training areas", "عرض مناطق التدريب"),
    nextHref: "#training-areas",
  },
  section: {
    number: localized("03.1", "03.1"),
    eyebrow: localized("Listed categories", "الفئات المدرجة"),
    title: localized("Choose the work.", "اختر نوع التدريب."),
    description: localized(
      "Category and equipment details remain pending until confirmed by the gym owner.",
      "تبقى تفاصيل الفئات والمعدات قيد التأكيد من مالك النادي.",
    ),
    detailLabel: localized("Training focus", "محور التدريب"),
    readiness: {
      title: localized(
        "Training details are being verified.",
        "تفاصيل التدريب قيد التأكيد.",
      ),
      description: localized(
        "Some details are pending owner confirmation, so each area is shown as a training category instead of a final equipment list.",
        "بعض التفاصيل قيد تأكيد المالك، لذلك تُعرض كل منطقة كفئة تدريب وليس كقائمة نهائية بالمعدات.",
      ),
      note: localized(
        "Confirm equipment availability with the Tiger Gym team before planning a specific workout.",
        "تأكّد من توفر المعدات مع فريق Tiger Gym قبل التخطيط لتمرين محدد.",
      ),
    },
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
