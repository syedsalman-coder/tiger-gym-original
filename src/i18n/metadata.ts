import type { Metadata } from "next";
import type { LocalizedText } from "@/data/types";
import { site } from "@/data/site";
import {
  getLocalizedValue,
  localizePath,
  type Locale,
  type RoutePath,
} from "./config";

const localeOpenGraph: Record<Locale, string> = {
  en: "en_KW",
  ar: "ar_KW",
};

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tigergym.kw";

export function absoluteSiteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function createLocalizedMetadata(
  locale: Locale,
  route: RoutePath,
  content: { title: LocalizedText; description: LocalizedText },
): Metadata {
  const title = getLocalizedValue(content.title, locale);
  const description = getLocalizedValue(content.description, locale);
  const canonical = localizePath(locale, route);
  const alternateLocale = (Object.keys(localeOpenGraph) as Locale[])
    .filter((candidate) => candidate !== locale)
    .map((candidate) => localeOpenGraph[candidate]);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: localizePath("en", route),
        ar: localizePath("ar", route),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: getLocalizedValue(site.fullName, locale),
      locale: localeOpenGraph[locale],
      alternateLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function createLocalBusinessJsonLd(locale: Locale) {
  const text = (value: LocalizedText) => getLocalizedValue(value, locale);

  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${absoluteSiteUrl(localizePath(locale, "/"))}#local-business`,
    name: text(site.fullName),
    alternateName: text(site.name),
    description: text(site.description),
    url: absoluteSiteUrl(localizePath(locale, "/")),
    telephone: site.phoneHref.replace(/^tel:/, ""),
    image: absoluteSiteUrl("/tiger-logo.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: text(site.address),
      addressLocality: text(site.city),
      addressCountry: text(site.country),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.323539475294567,
      longitude: 48.05703127531609,
    },
    hasMap: site.directionsUrl,
    openingHours: [
      `Sa-Th ${text(site.openingHours.regularTime)}`,
      `Fr ${text(site.openingHours.fridayTime)}`,
    ],
  };
}
