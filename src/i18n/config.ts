import type { LocalizedText } from "@/data/types";

export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];
export type Direction = "ltr" | "rtl";

export const defaultLocale: Locale = "en";

export const localeDirections: Record<Locale, Direction> = {
  en: "ltr",
  ar: "rtl",
};

export const routePaths = [
  "/",
  "/about",
  "/facilities",
  "/membership",
  "/gallery",
  "/contact",
] as const;

export type RoutePath = (typeof routePaths)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocalizedValue(value: LocalizedText, locale: Locale): string {
  return value[locale] ?? value.en;
}

export function localizePath(locale: Locale, href: string): string {
  if (href.startsWith("#") || /^(?:[a-z]+:|\/\/)/i.test(href)) return href;
  if (!href.startsWith("/")) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return localizePath(nextLocale, pathname || "/");
}
