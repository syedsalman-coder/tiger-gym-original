import { track } from "@vercel/analytics";

import type { Locale } from "@/i18n/config";

export type ConversionEvent =
  | "whatsapp_click"
  | "phone_click"
  | "directions_click"
  | "email_click"
  | "instagram_click"
  | "contact_form_submitted"
  | "membership_form_submitted";

type ConversionProperties = {
  locale: Locale;
  placement: string;
};

const conversionEventNames: Record<ConversionEvent, string> = {
  whatsapp_click: "WhatsApp Click",
  phone_click: "Phone Click",
  directions_click: "Directions Click",
  email_click: "Email Click",
  instagram_click: "Instagram Click",
  contact_form_submitted: "Contact Form Submitted",
  membership_form_submitted: "Membership Form Submitted",
};

export function classifyConversionHref(rawHref: string): ConversionEvent | null {
  const href = rawHref.trim();
  const normalizedHref = href.toLowerCase();

  if (normalizedHref.startsWith("tel:")) return "phone_click";
  if (normalizedHref.startsWith("mailto:")) return "email_click";

  try {
    const url = new URL(href, "https://tiger-gym-original.vercel.app");
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");

    if (hostname === "wa.me" || hostname.endsWith(".whatsapp.com")) {
      return "whatsapp_click";
    }

    if (
      hostname === "maps.app.goo.gl" ||
      hostname === "maps.google.com" ||
      (hostname.endsWith("google.com") && url.pathname.startsWith("/maps"))
    ) {
      return "directions_click";
    }

    if (hostname === "instagram.com" || hostname.endsWith(".instagram.com")) {
      return "instagram_click";
    }
  } catch {
    return null;
  }

  return null;
}

export function sanitizeAnalyticsUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl, "https://tiger-gym-original.vercel.app");
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return rawUrl.split(/[?#]/, 1)[0];
  }
}

export function trackConversion(
  event: ConversionEvent,
  { locale, placement }: ConversionProperties,
) {
  if (typeof window === "undefined") return;

  track(conversionEventNames[event], {
    locale,
    page: window.location.pathname,
    placement,
  });
}
