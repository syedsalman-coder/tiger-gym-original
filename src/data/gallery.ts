import { localized, type GalleryImage, type GalleryPlaceholder } from "./types";

// Only the supplied logo is confirmed. Replace pending slots with owner-approved gym photography.
export const galleryImages = [
  {
    status: "confirmed",
    id: "tiger-gym-logo",
    src: "/tiger-logo.png",
    alt: localized(
      "Tiger Gym Fitness Center logo with a yellow tiger and kettlebell emblem on a black circular badge.",
    ),
    title: localized("Tiger Gym Fitness Center logo"),
    description: localized(
      "The official yellow-and-black Tiger Gym brand mark supplied with this website.",
    ),
    width: 1233,
    height: 865,
  },
] as const satisfies readonly GalleryImage[];

export const galleryPlaceholders = [
  {
    status: "pending",
    number: "01",
    title: localized("Future facility photo"),
    description: localized("Reserved for a verified Tiger Gym facility photograph."),
    size: "tall",
    tone: "yellow",
  },
  {
    status: "pending",
    number: "02",
    title: localized("Future training photo"),
    description: localized("Reserved for a verified Tiger Gym training photograph."),
    size: "standard",
    tone: "black",
  },
  {
    status: "pending",
    number: "03",
    title: localized("Future facility photo"),
    description: localized("Reserved for another verified Tiger Gym facility photograph."),
    size: "compact",
    tone: "black",
  },
  {
    status: "pending",
    number: "04",
    title: localized("Future training photo"),
    description: localized("Reserved for another verified Tiger Gym training photograph."),
    size: "wide",
    tone: "yellow",
  },
  {
    status: "pending",
    number: "05",
    title: localized("Future gallery photo"),
    description: localized("Reserved until an approved Tiger Gym photograph is supplied."),
    size: "standard",
    tone: "black",
  },
] as const satisfies readonly GalleryPlaceholder[];

export const galleryContent = {
  status: "demo",
  metadata: {
    title: localized("Gallery | Tiger Gym Salmiya"),
    description: localized(
      "View the verified Tiger Gym brand asset and prepared spaces for future approved gym photography.",
    ),
  },
  hero: {
    index: localized("05 / Gallery"),
    eyebrow: localized("Tiger Gym visuals"),
    title: localized("The brand. The floor—coming next."),
    description: localized(
      "The official Tiger Gym mark leads a gallery prepared for future approved photography from the training floor.",
    ),
  },
  note: localized(
    "One verified brand image is available. Future photo spaces are clearly marked and contain no stock or invented imagery.",
  ),
  verifiedLabel: localized("Verified image"),
  lightboxEyebrow: localized("Verified Tiger Gym asset"),
  placeholderLabel: localized("Photo placeholder"),
  viewLabel: localized("View full screen"),
} as const;
