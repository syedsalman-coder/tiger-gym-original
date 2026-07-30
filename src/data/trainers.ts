import type { ContentCollection, Trainer } from "./types";

// No trainer identity, qualifications, experience, or photography is confirmed yet.
export const trainerContent = {
  status: "pending",
  ownerNote: "Add trainers only after the gym owner approves every biographical field and image.",
  items: [],
} as const satisfies ContentCollection<Trainer>;
