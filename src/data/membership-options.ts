import { localized, type MembershipOption } from "./types";

// The owner must confirm available plans, access terms, and prices. Null prices are intentional.
export const membershipOptions: readonly MembershipOption[] = [
  {
    status: "pending",
    id: "monthly-membership",
    title: localized("Monthly Membership"),
    description: localized("Contact Tiger Gym to confirm current monthly membership availability."),
    price: null,
    priceLabel: localized("Contact for current price"),
    icon: "message",
  },
  {
    status: "pending",
    id: "flexible-training-access",
    title: localized("Flexible Training Access"),
    description: localized("Ask the team which training-access options are currently available."),
    price: null,
    priceLabel: localized("Contact for current price"),
    icon: "phone",
  },
  {
    status: "pending",
    id: "membership-enquiry",
    title: localized("Membership Enquiry"),
    description: localized("Visit the gym or prepare a WhatsApp enquiry using the form below."),
    price: null,
    priceLabel: localized("Contact for current price"),
    icon: "location",
  },
] as const;

export const membershipContent = {
  status: "demo",
  metadata: {
    title: localized("Membership | Tiger Gym Kuwait"),
    description: localized(
      "Ask Tiger Gym in Salmiya about current membership options through phone, WhatsApp or an enquiry form.",
    ),
  },
  hero: {
    index: localized("04 / Membership"),
    eyebrow: localized("Start training"),
    title: localized("Make the enquiry. Do the work."),
    description: localized(
      "Current membership rates and access options are available directly from the Tiger Gym team.",
    ),
    nextLabel: localized("Membership options"),
    nextHref: "#membership-options",
  },
  section: {
    number: localized("04.1"),
    eyebrow: localized("Enquiry options"),
    title: localized("Talk to the team."),
  },
  homeCta: {
    eyebrow: localized("Membership · Speak with our team"),
    title: localized("Put your next session on the calendar."),
    description: localized(
      "Contact Tiger Gym for current membership options and training access details.",
    ),
    label: localized("Ask about membership"),
  },
  formIntro: {
    eyebrow: localized("Membership form"),
    title: localized("Prepare your enquiry."),
    description: localized(
      "The form validates your details and opens a message for you to review in WhatsApp. Nothing is sent automatically.",
    ),
  },
} as const;
