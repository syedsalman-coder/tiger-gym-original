import { localized, type Facility } from "./types";

// Categories came from the prior site; the owner must confirm category names and equipment before publication updates.
export const facilities = [
  {
    status: "pending",
    number: "01",
    slug: "strength-zone",
    title: localized("Strength Zone"),
    shortTitle: localized("Strength Training"),
    description: localized("A focused category for structured strength training."),
    detail: localized("Confirm the available strength equipment directly with the gym."),
    icon: "dumbbell",
  },
  {
    status: "pending",
    number: "02",
    slug: "free-weights",
    title: localized("Free Weights"),
    shortTitle: localized("Free Weight Training"),
    description: localized("A category for free-weight movement and bodybuilding fundamentals."),
    detail: localized("Confirm the available free-weight equipment directly with the gym."),
    icon: "weight",
  },
  {
    status: "pending",
    number: "03",
    slug: "cardio-area",
    title: localized("Cardio Area"),
    shortTitle: localized("Cardio Training"),
    description: localized("A conditioning category for stamina and general fitness."),
    detail: localized("Confirm the available cardio equipment directly with the gym."),
    icon: "activity",
  },
  {
    status: "pending",
    number: "04",
    slug: "functional-training",
    title: localized("Functional Training"),
    shortTitle: localized("Personal Fitness"),
    description: localized("A flexible category for movement-focused training."),
    detail: localized("Confirm the available functional-training equipment directly with the gym."),
    icon: "zap",
  },
] as const satisfies readonly Facility[];

export const facilitiesContent = {
  status: "demo",
  metadata: {
    title: localized("Gym Facilities | Tiger Gym Salmiya"),
    description: localized(
      "Explore the training categories currently listed by Tiger Gym in Salmiya.",
    ),
  },
  hero: {
    index: localized("03 / Facilities"),
    eyebrow: localized("The training floor"),
    title: localized("Space for serious sessions."),
    description: localized(
      "Four training categories carried forward from Tiger Gym's existing information.",
    ),
    nextLabel: localized("View training areas"),
    nextHref: "#training-areas",
  },
  section: {
    number: localized("03.1"),
    eyebrow: localized("Listed categories"),
    title: localized("Choose the work."),
    description: localized(
      "Category and equipment details remain pending until confirmed by the gym owner.",
    ),
    detailLabel: localized("Training focus"),
  },
  preview: {
    number: localized("03"),
    eyebrow: localized("Training areas"),
    title: localized("Made for the work."),
    linkLabel: localized("View all facilities"),
  },
  cta: {
    eyebrow: localized("Train at Tiger Gym"),
    title: localized("Ask the team about current access."),
    label: localized("Membership enquiry"),
    href: "/membership",
  },
} as const;
