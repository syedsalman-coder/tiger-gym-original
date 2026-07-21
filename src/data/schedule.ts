import type { ContentCollection, ScheduleEntry } from "./types";

// No class or trainer schedule is confirmed. Opening hours remain in site.ts.
export const scheduleContent = {
  status: "pending",
  ownerNote: "Add schedule entries only after days, times, class names, and trainers are confirmed.",
  items: [],
} as const satisfies ContentCollection<ScheduleEntry>;
