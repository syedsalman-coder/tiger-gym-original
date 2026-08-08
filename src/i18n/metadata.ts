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

const fallbackSiteUrl = "https://tiger-gym-original.vercel.app";

function getProductionSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const candidate = configuredUrl
    || (vercelProductionUrl ? `https://${vercelProductionUrl}` : fallbackSiteUrl);

  return candidate.replace(/\/$/, "");
}

export const siteUrl = getProductionSiteUrl();

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
        "x-default": localizePath("en", route),
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
      images: [
        {
          url: "/images/tiger-gym-interior.webp",
          width: 1000,
          height: 562,
          alt: locale === "ar"
            ? "مساحة التدريب في Tiger Gym بالسالمية"
            : "Tiger Gym strength training floor in Salmiya",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/tiger-gym-interior.webp"],
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
    email: site.email,
    sameAs: [site.instagramHref],
    image: [
      absoluteSiteUrl("/images/tiger-gym-interior.webp"),
      absoluteSiteUrl("/images/tiger-gym-strength-floor.webp"),
      absoluteSiteUrl("/images/tiger-gym-building.webp"),
    ],
    logo: absoluteSiteUrl("/tiger-logo.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "ar"
        ? "مبنى 15، الطابق الأول، شارع عمّان"
        : "Building 15, Floor 1, Amman Street",
      addressLocality: text(site.city),
      addressCountry: "KW",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.323539475294567,
      longitude: 48.05703127531609,
    },
    hasMap: site.directionsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Saturday",
          "https://schema.org/Sunday",
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
        ],
        opens: "05:00",
        closes: "02:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "https://schema.org/Friday",
        opens: "12:00",
        closes: "02:00",
      },
    ],
    inLanguage: locale,
  };
}
