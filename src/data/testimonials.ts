import type { ContentCollection, Testimonial } from "./types";

// No customer review, rating, or transformation claim is approved for publication.
export const testimonialContent = {
  status: "pending",
  ownerNote: "Add reviews only with customer approval, exact wording, and a verifiable source.",
  items: [],
} as const satisfies ContentCollection<Testimonial>;
