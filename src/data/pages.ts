import { localized } from "./types";

// Marketing copy is demo content. Arabic copy should be approved by a native Arabic-speaking reviewer before launch.
export const pageContent = {
  home: {
    status: "demo",
    metadata: {
      title: localized(
        "Tiger Gym Salmiya | Strength & Fitness Center in Kuwait",
        "Tiger Gym السالمية | مركز للقوة واللياقة في الكويت",
      ),
      description: localized(
        "Train at Tiger Gym in Salmiya, Kuwait. Explore dedicated strength, free-weight and cardio areas, view real gym photos, check opening hours and contact the team directly.",
        "تدرّب في Tiger Gym بالسالمية، الكويت. استكشف مناطق القوة والأوزان الحرة والكارديو، وشاهد صور النادي الحقيقية، وتعرّف إلى ساعات العمل وطرق التواصل المباشر.",
      ),
    },
    hero: {
      index: localized("01 / Tiger Gym Salmiya", "01 / Tiger Gym السالمية"),
      titleLines: [
        localized("Built", "صُمّم"),
        localized("For", "من أجل"),
        localized("Strength", "القوة"),
      ],
      description: localized(
        "Strength, free weights and cardio in Salmiya, with extended opening hours.",
        "تدريبات قوة وأوزان حرة وكارديو في السالمية، مع ساعات عمل ممتدة.",
      ),
      joinLabel: localized("WhatsApp the team", "راسلنا عبر واتساب"),
      facilitiesLabel: localized("View the gym", "شاهد المرافق"),
      scrollLabel: localized("Scroll", "مرّر للأسفل"),
    },
    intro: {
      number: localized("02", "02"),
      eyebrow: localized("Tiger Gym", "Tiger Gym"),
      title: localized("Purpose in every rep.", "هدف واضح في كل تكرار."),
      description: localized(
        "Tiger Gym is a strength-focused gym in Salmiya for people who want structured training, free weights, cardio and consistent progress.",
        "Tiger Gym نادٍ يركّز على القوة واللياقة في السالمية لمن يبحث عن تدريب منظم وأوزان حرة وكارديو وتقدّم مستمر.",
      ),
      body: localized(
        "Train across plate-loaded strength stations, a mirrored free-weight and dumbbell area, and a dedicated treadmill zone in one focused gym environment.",
        "تدرّب بين أجهزة القوة المحمّلة بالأوزان ومنطقة الدمبل والأوزان الحرة المزودة بالمرايا ومنطقة أجهزة المشي في بيئة تدريب مركّزة واحدة.",
      ),
      linkLabel: localized("Discover Tiger Gym", "تعرّف إلى Tiger Gym"),
      ticker: localized(
        "Strength · Discipline · Performance · Progress ·",
        "القوة · الانضباط · الأداء · التقدّم ·",
      ),
    },
    scrollStory: {
      number: localized("03", "03"),
      eyebrow: localized("Inside Tiger Gym", "داخل Tiger Gym"),
      kicker: localized("Plan your session", "خطّط لحصتك"),
      ariaLabel: localized(
        "Plan a session at Tiger Gym",
        "خطّط لحصة في Tiger Gym",
      ),
      title: localized(
        "Everything you need to start.",
        "كل ما تحتاجه للبدء.",
      ),
      description: localized(
        "See the training floor, choose the area that fits your session and contact the team for current membership details.",
        "شاهد مساحة التدريب، واختر المنطقة المناسبة لحصتك، ثم تواصل مع الفريق لمعرفة تفاصيل العضوية الحالية.",
      ),
      chapters: [
        {
          step: "01",
          title: localized("Explore the floor", "استكشف مساحة التدريب"),
          description: localized(
            "View the real strength, free-weight and cardio areas before you arrive.",
            "شاهد مناطق القوة والأوزان الحرة والكارديو الحقيقية قبل وصولك.",
          ),
        },
        {
          step: "02",
          title: localized("Choose your focus", "اختر تركيزك"),
          description: localized(
            "Plan a strength, free-weight or treadmill session around the confirmed training zones.",
            "خطّط لحصة قوة أو أوزان حرة أو أجهزة مشي ضمن مناطق التدريب المؤكدة.",
          ),
        },
        {
          step: "03",
          title: localized(
            "Contact the team",
            "تواصل مع الفريق",
          ),
          description: localized(
            "Ask about current membership details on WhatsApp, then plan your visit to Salmiya.",
            "استفسر عبر واتساب عن تفاصيل العضوية الحالية، ثم خطّط لزيارتك إلى السالمية.",
          ),
        },
      ],
    },
    location: {
      eyebrow: localized("Visit Tiger Gym", "زُر Tiger Gym"),
      titleLineOne: localized("Train in", "تدرّب في"),
      titleLineTwo: localized("Salmiya.", "السالمية."),
      contactLabel: localized("Location & contact", "الموقع والتواصل"),
      directionsLabel: localized("Get directions", "احصل على الاتجاهات"),
    },
    finalCta: {
      eyebrow: localized("Start with verified details", "ابدأ بتفاصيل مؤكدة"),
      title: localized("Ready to plan your first session?", "جاهز للتخطيط لحصتك الأولى؟"),
      description: localized(
        "Use the membership form, WhatsApp, phone or directions to confirm the current option that fits your visit.",
        "استخدم نموذج العضوية أو واتساب أو الهاتف أو الاتجاهات لتأكيد الخيار الحالي المناسب لزيارتك.",
      ),
      label: localized("Prepare membership enquiry", "جهّز استفسار العضوية"),
    },
    loader: {
      progressLabel: localized("Preparing the floor", "جارٍ تجهيز مساحة التدريب"),
    },
  },
  about: {
    status: "demo",
    metadata: {
      title: localized(
        "About Tiger Gym Salmiya | Strength & Fitness Center Kuwait",
        "عن Tiger Gym السالمية | مركز للقوة واللياقة في الكويت",
      ),
      description: localized(
        "Learn about Tiger Gym in Salmiya, Kuwait, a strength-focused fitness center with dedicated strength, free-weight and cardio training areas.",
        "تعرّف إلى Tiger Gym في السالمية، الكويت، وهو مركز لياقة يركّز على القوة ويضم مناطق مخصصة لتدريبات القوة والأوزان الحرة والكارديو.",
      ),
    },
    hero: {
      index: localized("02 / About", "02 / من نحن"),
      eyebrow: localized("Our approach", "نهجنا"),
      title: localized("Built around the work.", "العمل هو الأساس."),
      description: localized(
        "Located on Amman Street in Salmiya, Tiger Gym is a strength-focused fitness center with dedicated areas for strength training, free weights and cardio.",
        "يقع Tiger Gym في شارع عمّان بالسالمية، وهو مركز لياقة يركّز على القوة ويضم مناطق مخصصة لتدريبات القوة والأوزان الحرة والكارديو.",
      ),
      nextLabel: localized("Our philosophy", "فلسفتنا"),
      nextHref: "#philosophy",
    },
    story: {
      title: localized(
        "Strength is built through consistency.",
        "القوة تُبنى بالاستمرارية.",
      ),
      paragraphs: [
        localized(
          "The training floor is built around the work people come to do: plate-loaded strength training, mirrored dumbbell and free-weight sessions, and treadmill-based cardio in one black-and-yellow gym environment.",
          "صُممت مساحة التدريب حول التمارين التي يأتي الناس من أجلها: تدريبات القوة المحمّلة بالأوزان، والدمبل والأوزان الحرة أمام المرايا، وتمارين الكارديو على أجهزة المشي، ضمن بيئة النادي السوداء والصفراء.",
        ),
        localized(
          "Tiger Gym is open from 5:00 AM to 2:00 AM Saturday to Thursday and from 12:00 PM to 2:00 AM on Friday, giving members a wide training window in Salmiya.",
          "يفتح Tiger Gym من 5:00 صباحًا حتى 2:00 صباحًا من السبت إلى الخميس، ومن 12:00 ظهرًا حتى 2:00 صباحًا يوم الجمعة، ما يمنح الأعضاء وقتًا واسعًا للتدريب في السالمية.",
        ),
      ],
      linkLabel: localized("Explore the training areas", "استكشف مساحات التدريب"),
    },
    philosophy: {
      number: localized("02.1", "02.1"),
      eyebrow: localized("Training philosophy", "فلسفة التدريب"),
      title: localized("The standard stays high.", "معيارنا يبقى مرتفعًا."),
      items: [
        {
          number: "01",
          title: localized("Strength", "القوة"),
          text: localized(
            "Build capability through focused, purposeful training.",
            "ابنِ قدراتك من خلال تدريب هادف ومركّز.",
          ),
        },
        {
          number: "02",
          title: localized("Discipline", "الانضباط"),
          text: localized(
            "Make the work consistent, clear, and repeatable.",
            "اجعل عملك منتظمًا وواضحًا وقابلًا للاستمرار.",
          ),
        },
        {
          number: "03",
          title: localized("Progress", "التقدّم"),
          text: localized(
            "Move forward one deliberate session at a time.",
            "تقدّم إلى الأمام حصةً مدروسة في كل مرة.",
          ),
        },
      ],
    },
    cta: {
      eyebrow: localized("Your next step", "خطوتك التالية"),
      titleLineOne: localized("Bring intent.", "أحضر بعزم."),
      titleLineTwo: localized(
        "We’ll make room for the work.",
        "وسنهيّئ لك مساحة للعمل.",
      ),
      label: localized("Ask about membership", "استفسر عن العضوية"),
    },
    finalCta: {
      eyebrow: localized("Talk to Tiger Gym", "تحدّث مع Tiger Gym"),
      title: localized("Confirm your next step directly.", "أكّد خطوتك التالية مباشرةً."),
      description: localized(
        "Membership, equipment and visit details should be confirmed with the team before you plan a session.",
        "يجب تأكيد تفاصيل العضوية والمعدات والزيارة مع الفريق قبل التخطيط لحصة تدريب.",
      ),
      label: localized("Prepare membership enquiry", "جهّز استفسار العضوية"),
    },
  },
  contact: {
    status: "demo",
    metadata: {
      title: localized(
        "Tiger Gym Salmiya | Location, Hours & Contact",
        "Tiger Gym السالمية | الموقع وساعات العمل والتواصل",
      ),
      description: localized(
        "Find Tiger Gym in Salmiya, Kuwait. Get the Amman Street location, opening hours, phone number, WhatsApp, email and directions for your visit.",
        "اعثر على Tiger Gym في السالمية، الكويت، وتعرّف إلى موقع شارع عمّان وساعات العمل ورقم الهاتف وواتساب والبريد الإلكتروني والاتجاهات.",
      ),
    },
    hero: {
      index: localized("06 / Contact", "06 / تواصل معنا"),
      eyebrow: localized("Find Tiger Gym", "اعثر على Tiger Gym"),
      title: localized("Visit Tiger Gym in Salmiya.", "زُر Tiger Gym في السالمية."),
      description: localized(
        "Tiger Gym is located in Building 15, Floor 1 on Amman Street in Salmiya. Call, message on WhatsApp or use the map to plan your visit.",
        "يقع Tiger Gym في مبنى 15، الطابق الأول، شارع عمّان في السالمية. اتصل أو راسلنا عبر واتساب أو استخدم الخريطة للتخطيط لزيارتك.",
      ),
      nextLabel: localized("Location details", "تفاصيل الموقع"),
      nextHref: "#location",
    },
    location: {
      number: localized("06.1", "06.1"),
      eyebrow: localized("Location", "الموقع"),
      title: localized("Building 15. Amman Street. Salmiya.", "مبنى 15. شارع عمّان. السالمية."),
    },
    formIntro: {
      eyebrow: localized("Contact form", "نموذج التواصل"),
      title: localized("Message Tiger Gym.", "راسل Tiger Gym."),
      description: localized(
        "Enter your details and the form prepares a WhatsApp message for you to review before you send it.",
        "أدخل بياناتك وسيجهّز النموذج رسالة واتساب لتراجعها قبل إرسالها.",
      ),
    },
    finalCta: {
      eyebrow: localized("Before you visit", "قبل زيارتك"),
      title: localized("Confirm today’s details with the team.", "أكّد تفاصيل اليوم مع الفريق."),
      description: localized(
        "Use WhatsApp, phone, the verified map, or the message form so your visit is based on current confirmed information.",
        "استخدم واتساب أو الهاتف أو الخريطة الموثّقة أو نموذج الرسائل لتكون زيارتك مبنية على معلومات حالية مؤكدة.",
      ),
      label: localized("Prepare WhatsApp message", "جهّز رسالة واتساب"),
    },
  },
  footer: {
    status: "demo",
    taglineLineOne: localized("Built for strength.", "صُمّم للقوة."),
    taglineLineTwo: localized("Made for progress.", "وصُنع للتقدّم."),
    contactLabel: localized("Speak with the gym", "تواصل مع النادي"),
  },
} as const;
