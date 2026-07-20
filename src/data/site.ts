export const site = {
  name: "Tiger Gym",
  fullName: "Tiger Gym Fitness Center",
  locality: "Salmiya, Kuwait",
  address: "Building 15, Floor 1, Amman Street, Salmiya, Kuwait",
  phoneDisplay: "+965 6967 8350",
  phoneHref: "tel:+96569678350",
  whatsappNumber: "96569678350",
  whatsappHref: "https://wa.me/96569678350",
  socialLinks: [],
  description:
    "A focused training environment for strength, fitness and serious progress in Salmiya, Kuwait.",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.4774735900473!2d48.05703127531609!3d29.323539475294567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9de0ff4906e1%3A0xf9ade87108900d05!2sTIGER%20GYM!5e1!3m2!1sen!2skw!4v1784395125224!5m2!1sen!2skw",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=29.323539475294567,48.05703127531609",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Facilities", href: "/facilities" },
  { label: "Membership", href: "/membership" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

// These categories and descriptions are carried forward from the existing site.
// The gym owner should confirm exact equipment availability before adding more detail.
export const facilities = [
  {
    number: "01",
    slug: "strength-zone",
    title: "Strength Zone",
    shortTitle: "Strength Training",
    description: "Heavy racks, benches, machines, and focused lifting space.",
    detail:
      "A dedicated training category for structured strength work and focused lifting sessions.",
    icon: "dumbbell",
  },
  {
    number: "02",
    slug: "free-weights",
    title: "Free Weights",
    shortTitle: "Free Weight Training",
    description:
      "Dumbbells, barbells, plates, and classic bodybuilding equipment.",
    detail:
      "An open training category centred on free-weight movement and bodybuilding fundamentals.",
    icon: "weight",
  },
  {
    number: "03",
    slug: "cardio-area",
    title: "Cardio Area",
    shortTitle: "Cardio Training",
    description:
      "Conditioning tools for fat loss, stamina, and daily fitness.",
    detail:
      "A conditioning category for members building general fitness and training consistency.",
    icon: "activity",
  },
  {
    number: "04",
    slug: "functional-training",
    title: "Functional Training",
    shortTitle: "Personal Fitness",
    description:
      "Explosive movement, circuits, and athletic performance work.",
    detail:
      "A flexible category for movement-focused sessions and individual fitness goals.",
    icon: "zap",
  },
] as const;

export const philosophy = [
  {
    number: "01",
    title: "Strength",
    text: "Build capability through focused, purposeful training.",
  },
  {
    number: "02",
    title: "Discipline",
    text: "Make the work consistent, clear, and repeatable.",
  },
  {
    number: "03",
    title: "Progress",
    text: "Move forward one deliberate session at a time.",
  },
] as const;
