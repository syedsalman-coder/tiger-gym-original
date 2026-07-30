import type { ContentCollection, Faq } from "./types";

// No production FAQ answers have been confirmed by the gym owner.
export const faqContent = {
  status: "pending",
  ownerNote: "Add FAQs only after the gym owner confirms each operational answer.",
  items: [],
} as const satisfies ContentCollection<Faq>;
