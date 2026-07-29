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

const localizedBaseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tigergym.kw";

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
    metadataBase: new URL(localizedBaseUrl),
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
