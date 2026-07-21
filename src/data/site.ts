import { localized, type NavigationItem, type SocialLink } from "./types";

// Confirmed shared details. Update this file only after the gym owner verifies a change.
export const site = {
  status: "confirmed",
  name: localized("Tiger Gym", "Tiger Gym"),
  fullName: localized("Tiger Gym Fitness Center", "مركز Tiger Gym للياقة البدنية"),
  descriptor: localized("Fitness Center", "مركز للياقة البدنية"),
  locality: localized("Salmiya, Kuwait", "السالمية، الكويت"),
  city: localized("Salmiya", "السالمية"),
  country: localized("Kuwait", "الكويت"),
  address: localized(
    "Building 15, Floor 1, Amman Street, Salmiya, Kuwait",
    "مبنى 15، الطابق الأول، شارع عمّان، السالمية، الكويت",
  ),
  phoneDisplay: "+965 6967 8350",
  phoneHref: "tel:+96569678350",
  whatsappNumber: "96569678350",
  whatsappHref: "https://wa.me/96569678350",
  openingHours: {
    status: "confirmed",
    regularDays: localized("Saturday to Thursday", "السبت إلى الخميس"),
    regularTime: localized("5:00 AM – 2:00 AM", "5:00 ص – 2:00 ص"),
    fridayDays: localized("Friday", "الجمعة"),
    fridayTime: localized("12:00 PM – 2:00 AM", "12:00 م – 2:00 ص"),
    shortDisplay: localized(
      "Sat–Thu: 5:00 AM–2:00 AM | Fri: 12:00 PM–2:00 AM",
      "السبت–الخميس: 5:00 ص–2:00 ص | الجمعة: 12:00 م–2:00 ص",
    ),
  },
  description: localized(
    "A focused training environment for strength, fitness and serious progress in Salmiya, Kuwait.",
    "بيئة تدريب مركّزة للقوة واللياقة والتقدّم الجاد في السالمية، الكويت.",
  ),
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.4774735900473!2d48.05703127531609!3d29.323539475294567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9de0ff4906e1%3A0xf9ade87108900d05!2sTIGER%20GYM!5e1!3m2!1sen!2skw!4v1784395125224!5m2!1sen!2skw",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=29.323539475294567,48.05703127531609",
} as const;

export const navigation = [
  { label: localized("Home", "الرئيسية"), href: "/" },
  { label: localized("About", "من نحن"), href: "/about" },
  { label: localized("Facilities", "مرافق التدريب"), href: "/facilities" },
  { label: localized("Membership", "العضوية"), href: "/membership" },
  { label: localized("Gallery", "المعرض"), href: "/gallery" },
  { label: localized("Contact", "تواصل معنا"), href: "/contact" },
] as const satisfies readonly NavigationItem[];

// No social accounts have been confirmed. Add only owner-approved public profiles.
export const socialLinks = [] as const satisfies readonly SocialLink[];
