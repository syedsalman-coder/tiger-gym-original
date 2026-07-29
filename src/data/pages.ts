import { localized } from "./types";

// Marketing copy is demo content. Arabic copy should be approved by a native Arabic-speaking reviewer before launch.
export const pageContent = {
  home: {
    status: "demo",
    metadata: {
      title: localized(
        "Tiger Gym | Fitness Center in Salmiya, Kuwait",
        "Tiger Gym | مركز لياقة بدنية في السالمية، الكويت",
      ),
      description: localized(
        "Tiger Gym is a focused strength and fitness center in Salmiya, Kuwait.",
        "Tiger Gym مركز للقوة واللياقة البدنية في السالمية، الكويت، يوفّر بيئة تدريب مركّزة.",
      ),
    },
    hero: {
      index: localized("01 / Strength protocol", "01 / منهج القوة"),
      titleLines: [
        localized("Built", "صُمّم"),
        localized("For", "من أجل"),
        localized("Strength", "القوة"),
      ],
      joinLabel: localized("Join Tiger Gym", "انضم إلى Tiger Gym"),
      facilitiesLabel: localized("Explore facilities", "استكشف مرافق التدريب"),
      scrollLabel: localized("Scroll", "مرّر للأسفل"),
    },
    intro: {
      number: localized("02", "02"),
      eyebrow: localized("Tiger Gym", "Tiger Gym"),
      title: localized("Purpose in every rep.", "هدف واضح في كل تكرار."),
      description: localized(
        "A strength and fitness center in Salmiya built around disciplined training and serious progress.",
        "مركز للقوة واللياقة في السالمية يقوم على التدريب المنضبط والسعي الجاد نحو التقدّم.",
      ),
      body: localized(
        "Strength training, free weights, cardio and functional training come together in one focused environment.",
        "تجتمع تدريبات القوة والأوزان الحرة والتمارين الهوائية والتدريب الوظيفي في بيئة واحدة مركّزة.",
      ),
      linkLabel: localized("Discover Tiger Gym", "تعرّف إلى Tiger Gym"),
      ticker: localized(
        "Strength · Discipline · Performance · Progress ·",
        "القوة · الانضباط · الأداء · التقدّم ·",
      ),
    },
    scrollStory: {
      number: localized("03", "03"),
      eyebrow: localized("Scroll sequence", "تسلسل التمرين"),
      kicker: localized("Cinematic training flow", "مسار تدريبي سينمائي"),
      ariaLabel: localized(
        "Cinematic training sequence",
        "تسلسل تدريبي سينمائي",
      ),
      title: localized(
        "A session told in motion.",
        "حصة تدريب تُروى بالحركة.",
      ),
      description: localized(
        "A lightweight sticky sequence uses CSS transforms and opacity instead of scroll JavaScript, keeping the homepage cinematic without adding runtime listeners.",
        "يستخدم هذا التسلسل الثابت مؤثرات CSS للحركة والشفافية بدل JavaScript أثناء التمرير، ليحافظ على الطابع السينمائي دون إضافة مستمعات تشغيلية.",
      ),
      chapters: [
        {
          step: "01",
          title: localized("Enter the floor", "ادخل مساحة التدريب"),
          description: localized(
            "The hero gives way to a focused training floor built around strength, discipline, and clear intent.",
            "تنتقل المقدمة إلى مساحة تدريب مركّزة قائمة على القوة والانضباط والهدف الواضح.",
          ),
        },
        {
          step: "02",
          title: localized("Set the work", "حدّد العمل"),
          description: localized(
            "Training categories move into view as deliberate checkpoints rather than heavy media assets.",
            "تظهر فئات التدريب كنقاط تقدّم مدروسة بدل الاعتماد على وسائط ثقيلة.",
          ),
        },
        {
          step: "03",
          title: localized(
            "Leave ready for the next session",
            "اخرج جاهزًا للحصة التالية",
          ),
          description: localized(
            "The sequence resolves into membership and visit actions so the cinematic moment stays conversion-focused.",
            "ينتهي التسلسل إلى إجراءات العضوية والزيارة ليبقى المشهد السينمائي موجّهًا نحو التحويل.",
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
    loader: {
      progressLabel: localized("Preparing the floor", "جارٍ تجهيز مساحة التدريب"),
    },
  },
  about: {
    status: "demo",
    metadata: {
      title: localized(
        "About Tiger Gym | Salmiya, Kuwait",
        "عن Tiger Gym | السالمية، الكويت",
      ),
      description: localized(
        "Learn about Tiger Gym's focused approach to strength, discipline and consistent training in Salmiya, Kuwait.",
        "تعرّف إلى نهج Tiger Gym المركّز على القوة والانضباط والاستمرارية في التدريب في السالمية، الكويت.",
      ),
    },
    hero: {
      index: localized("02 / About", "02 / من نحن"),
      eyebrow: localized("Our approach", "نهجنا"),
      title: localized("Built around the work.", "العمل هو الأساس."),
      description: localized(
        "Tiger Gym is a bodybuilding, strength and fitness center in Salmiya, Kuwait.",
        "Tiger Gym مركز لكمال الأجسام والقوة واللياقة البدنية في السالمية، الكويت.",
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
          "Tiger Gym brings strength training, free weights, cardio and functional training together in a focused environment for people who want purpose in every session.",
          "يجمع Tiger Gym تدريبات القوة والأوزان الحرة والتمارين الهوائية والتدريب الوظيفي في بيئة مركّزة لمن يريد هدفًا واضحًا في كل حصة.",
        ),
        localized(
          "The philosophy is direct: show up, train with intent and give progress time to compound. Every session is a clear commitment to the work in front of you.",
          "فلسفتنا واضحة: احضر، وتدرّب بتركيز، وامنح التقدّم وقته ليتراكم. كل حصة التزام صريح بالعمل الذي أمامك.",
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
  },
  contact: {
    status: "demo",
    metadata: {
      title: localized(
        "Contact Tiger Gym | Salmiya, Kuwait",
        "تواصل مع Tiger Gym | السالمية، الكويت",
      ),
      description: localized(
        "Call, message, locate or visit Tiger Gym Fitness Center in Salmiya, Kuwait.",
        "اتصل أو أرسل رسالة أو تعرّف إلى موقع مركز Tiger Gym للياقة البدنية في السالمية، الكويت.",
      ),
    },
    hero: {
      index: localized("06 / Contact", "06 / تواصل معنا"),
      eyebrow: localized("Find Tiger Gym", "اعثر على Tiger Gym"),
      title: localized("Salmiya. Your next session.", "السالمية. حصتك المقبلة."),
      description: localized(
        "Call, message or use the verified map location to plan your visit.",
        "اتصل أو أرسل رسالة أو استخدم الموقع الموثّق على الخريطة للتخطيط لزيارتك.",
      ),
      nextLabel: localized("Location details", "تفاصيل الموقع"),
      nextHref: "#location",
    },
    location: {
      number: localized("06.1", "06.1"),
      eyebrow: localized("Location", "الموقع"),
      title: localized("Get here. Get to work.", "تصل إلى هنا. وتبدأ العمل."),
    },
    formIntro: {
      eyebrow: localized("Contact form", "نموذج التواصل"),
      title: localized("Prepare a message.", "جهّز رسالتك."),
      description: localized(
        "This form validates your details and opens WhatsApp for you to review and send the message yourself.",
        "يتحقق هذا النموذج من بياناتك ثم يفتح واتساب لتراجع الرسالة وترسلها بنفسك.",
      ),
    },
  },
  footer: {
    status: "demo",
    taglineLineOne: localized("Built for strength.", "صُمّم للقوة."),
    taglineLineTwo: localized("Made for progress.", "وصُنع للتقدّم."),
    contactLabel: localized("Speak with the gym", "تواصل مع النادي"),
  },
} as const;
