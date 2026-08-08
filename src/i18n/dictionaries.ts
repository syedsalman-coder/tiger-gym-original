import type { Locale } from "./config";

const english = {
  accessibility: {
    skipToContent: "Skip to content",
    primaryNavigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    conversionActions: "Quick contact actions",
    footerNavigation: "Footer navigation",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    languageSwitcher: "Choose language",
    switchToEnglish: "Switch to English",
    switchToArabic: "Switch to Arabic",
    home: "Tiger Gym home",
    loading: "Loading Tiger Gym",
    scrollToIntro: "Scroll to the Tiger Gym introduction",
    openingHours: "Tiger Gym opening hours",
    logo: "Tiger Gym Fitness Center logo",
    map: "Tiger Gym location in Salmiya, Kuwait",
  },
  common: {
    joinNow: "Join now",
    joinGym: "Join Tiger Gym",
    whatsapp: "WhatsApp",
    callNow: "Call now",
    getDirections: "Get directions",
  },
  gallery: {
    openFullScreen: "Open {title} full screen",
    verifiedStatus: "Verified image {current} of {total}",
    close: "Close full-screen image",
    navigation: "Gallery image navigation",
    previous: "View previous gallery image",
    next: "View next gallery image",
  },
  contactForm: {
    name: "Name",
    phone: "Phone",
    message: "Message",
    submit: "Prepare WhatsApp message",
    note: "This form prepares a WhatsApp message for you to review and send.",
    opened: "WhatsApp opened with your message. Review it and tap Send when you are ready.",
    blocked: "WhatsApp could not open automatically. Use the link below to continue with your prepared message.",
    openWhatsapp: "Open WhatsApp",
    errors: {
      name: "Enter your name.",
      phone: "Enter your phone number.",
      phoneFormat: "Enter a phone number containing 7 to 15 digits.",
      message: "Enter a message.",
    },
    template: {
      greeting: "Hello Tiger Gym,",
      name: "Name",
      phone: "Phone",
      message: "Message",
    },
  },
  membershipForm: {
    name: "Name",
    phone: "Phone",
    preferredTime: "Preferred training time",
    preferredTimePlaceholder: "For example, morning or evening",
    interest: "Which membership package interests you?",
    selectOption: "Select a membership package",
    message: "Message",
    submit: "Prepare membership enquiry",
    note: "This form prepares a WhatsApp message for you to review and send.",
    opened: "WhatsApp opened with your enquiry. Review it and tap Send when you are ready.",
    blocked: "WhatsApp could not open automatically. Use the link below to continue with your prepared enquiry.",
    openWhatsapp: "Open WhatsApp",
    errors: {
      name: "Enter your name.",
      phone: "Enter your phone number.",
      phoneFormat: "Enter a phone number containing 7 to 15 digits.",
      preferredTime: "Enter your preferred training time.",
      interest: "Select a membership package.",
      message: "Enter a message.",
    },
    template: {
      greeting: "Hello Tiger Gym, I would like to ask about membership.",
      name: "Name",
      phone: "Phone",
      preferredTime: "Preferred training time",
      interest: "Membership package",
      message: "Message",
    },
  },
} as const;

type DeepStringShape<T> = {
  readonly [Key in keyof T]: T[Key] extends string
    ? string
    : T[Key] extends Record<string, unknown>
      ? DeepStringShape<T[Key]>
      : T[Key];
};

export type Dictionary = DeepStringShape<typeof english>;

// Arabic marketing and interface copy should receive a final review by a native Arabic-speaking reviewer before launch.
const arabic: Dictionary = {
  accessibility: {
    skipToContent: "تخطَّ إلى المحتوى",
    primaryNavigation: "التنقل الرئيسي",
    mobileNavigation: "قائمة التنقل للأجهزة المحمولة",
    conversionActions: "إجراءات التواصل السريعة",
    footerNavigation: "روابط تذييل الصفحة",
    openMenu: "فتح قائمة التنقل",
    closeMenu: "إغلاق قائمة التنقل",
    languageSwitcher: "اختيار اللغة",
    switchToEnglish: "التبديل إلى الإنجليزية",
    switchToArabic: "التبديل إلى العربية",
    home: "الصفحة الرئيسية لـ Tiger Gym",
    loading: "جارٍ تحميل Tiger Gym",
    scrollToIntro: "الانتقال إلى مقدمة Tiger Gym",
    openingHours: "ساعات عمل Tiger Gym",
    logo: "شعار مركز Tiger Gym للياقة البدنية",
    map: "موقع Tiger Gym في السالمية، الكويت",
  },
  common: {
    joinNow: "انضم الآن",
    joinGym: "انضم إلى Tiger Gym",
    whatsapp: "واتساب",
    callNow: "اتصل الآن",
    getDirections: "احصل على الاتجاهات",
  },
  gallery: {
    openFullScreen: "فتح {title} بملء الشاشة",
    verifiedStatus: "الصورة الموثقة {current} من {total}",
    close: "إغلاق الصورة المعروضة بملء الشاشة",
    navigation: "التنقل بين صور المعرض",
    previous: "عرض صورة المعرض السابقة",
    next: "عرض صورة المعرض التالية",
  },
  contactForm: {
    name: "الاسم",
    phone: "رقم الهاتف",
    message: "الرسالة",
    submit: "تجهيز رسالة واتساب",
    note: "يجهّز هذا النموذج رسالة واتساب لتراجعها وترسلها بنفسك.",
    opened: "فُتح واتساب مع رسالتك. راجعها ثم اضغط إرسال عندما تكون جاهزًا.",
    blocked: "تعذّر فتح واتساب تلقائيًا. استخدم الرابط أدناه لمتابعة رسالتك المجهّزة.",
    openWhatsapp: "فتح واتساب",
    errors: {
      name: "أدخل اسمك.",
      phone: "أدخل رقم هاتفك.",
      phoneFormat: "أدخل رقم هاتف يتكوّن من 7 إلى 15 رقمًا.",
      message: "أدخل رسالتك.",
    },
    template: {
      greeting: "مرحبًا Tiger Gym،",
      name: "الاسم",
      phone: "رقم الهاتف",
      message: "الرسالة",
    },
  },
  membershipForm: {
    name: "الاسم",
    phone: "رقم الهاتف",
    preferredTime: "وقت التدريب المفضّل",
    preferredTimePlaceholder: "على سبيل المثال: صباحًا أو مساءً",
    interest: "ما باقة الاشتراك التي تهمك؟",
    selectOption: "اختر باقة اشتراك",
    message: "الرسالة",
    submit: "تجهيز استفسار العضوية",
    note: "يجهّز هذا النموذج رسالة واتساب لتراجعها وترسلها بنفسك.",
    opened: "فُتح واتساب مع استفسارك. راجعه ثم اضغط إرسال عندما تكون جاهزًا.",
    blocked: "تعذّر فتح واتساب تلقائيًا. استخدم الرابط أدناه لمتابعة استفسارك المجهّز.",
    openWhatsapp: "فتح واتساب",
    errors: {
      name: "أدخل اسمك.",
      phone: "أدخل رقم هاتفك.",
      phoneFormat: "أدخل رقم هاتف يتكوّن من 7 إلى 15 رقمًا.",
      preferredTime: "أدخل وقت التدريب المفضّل لديك.",
      interest: "اختر باقة اشتراك.",
      message: "أدخل رسالتك.",
    },
    template: {
      greeting: "مرحبًا Tiger Gym، أود الاستفسار عن العضوية.",
      name: "الاسم",
      phone: "رقم الهاتف",
      preferredTime: "وقت التدريب المفضّل",
      interest: "باقة الاشتراك",
      message: "الرسالة",
    },
  },
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: english,
  ar: arabic,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
