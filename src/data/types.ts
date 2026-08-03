export type ContentStatus = "confirmed" | "pending" | "demo";

export type LocalizedText = Readonly<{
  en: string;
  ar?: string;
}>;

export type ContentCollection<T> = Readonly<{
  status: ContentStatus;
  ownerNote: string;
  items: readonly T[];
}>;

export const localized = (en: string, ar?: string): LocalizedText => ({ en, ar });

export type NavigationItem = Readonly<{
  label: LocalizedText;
  href: "/" | "/about" | "/facilities" | "/membership" | "/gallery" | "/contact";
}>;

export type SocialLink = Readonly<{
  platform: LocalizedText;
  href: string;
  status: ContentStatus;
}>;

export type FacilityIconName = "activity" | "dumbbell" | "weight" | "zap";

export type Facility = Readonly<{
  status: ContentStatus;
  number: string;
  slug: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  detail: LocalizedText;
  icon: FacilityIconName;
  image: Readonly<{
    src: string;
    alt: LocalizedText;
    position?: string;
  }> | null;
}>;

export type MembershipIconName = "message" | "phone" | "location";

export type MembershipOption = Readonly<{
  status: ContentStatus;
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  price: LocalizedText | null;
  priceLabel: LocalizedText;
  icon: MembershipIconName;
}>;

export type Trainer = Readonly<{
  status: ContentStatus;
  id: string;
  name: LocalizedText;
  role: LocalizedText;
  qualifications: readonly LocalizedText[];
  experience: LocalizedText | null;
  imageSrc: string | null;
}>;

export type ScheduleEntry = Readonly<{
  status: ContentStatus;
  id: string;
  title: LocalizedText;
  day: LocalizedText;
  startTime: string;
  endTime: string;
  trainerId: string | null;
}>;

export type GalleryImage = Readonly<{
  status: ContentStatus;
  id: string;
  src: string;
  alt: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  width: number;
  height: number;
}>;

export type GalleryPlaceholder = Readonly<{
  status: "pending";
  number: string;
  title: LocalizedText;
  description: LocalizedText;
  size: "tall" | "standard" | "compact" | "wide";
  tone: "yellow" | "black";
}>;

export type Testimonial = Readonly<{
  status: ContentStatus;
  id: string;
  quote: LocalizedText;
  customerName: LocalizedText;
  rating: number | null;
  source: string | null;
}>;

export type Faq = Readonly<{
  status: ContentStatus;
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}>;
