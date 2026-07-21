import { localized, type NavigationItem, type SocialLink } from "./types";

// Confirmed shared details. Update this file only after the gym owner verifies a change.
export const site = {
  status: "confirmed",
  name: localized("Tiger Gym"),
  fullName: localized("Tiger Gym Fitness Center"),
  descriptor: localized("Fitness Center"),
  locality: localized("Salmiya, Kuwait"),
  city: localized("Salmiya"),
  country: localized("Kuwait"),
  address: localized("Building 15, Floor 1, Amman Street, Salmiya, Kuwait"),
  phoneDisplay: "+965 6967 8350",
  phoneHref: "tel:+96569678350",
  whatsappNumber: "96569678350",
  whatsappHref: "https://wa.me/96569678350",
  openingHours: {
    status: "confirmed",
    regularDays: localized("Saturday to Thursday"),
    regularTime: localized("5:00 AM – 2:00 AM"),
    fridayDays: localized("Friday"),
    fridayTime: localized("12:00 PM – 2:00 AM"),
    shortDisplay: localized("Sat–Thu: 5:00 AM–2:00 AM | Fri: 12:00 PM–2:00 AM"),
  },
  description: localized(
    "A focused training environment for strength, fitness and serious progress in Salmiya, Kuwait.",
  ),
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.4774735900473!2d48.05703127531609!3d29.323539475294567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9de0ff4906e1%3A0xf9ade87108900d05!2sTIGER%20GYM!5e1!3m2!1sen!2skw!4v1784395125224!5m2!1sen!2skw",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=29.323539475294567,48.05703127531609",
} as const;

export const navigation = [
  { label: localized("Home"), href: "/" },
  { label: localized("About"), href: "/about" },
  { label: localized("Facilities"), href: "/facilities" },
  { label: localized("Membership"), href: "/membership" },
  { label: localized("Gallery"), href: "/gallery" },
  { label: localized("Contact"), href: "/contact" },
] as const satisfies readonly NavigationItem[];

// No social accounts have been confirmed. Add only owner-approved public profiles.
export const socialLinks = [] as const satisfies readonly SocialLink[];
