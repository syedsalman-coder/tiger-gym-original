import type { Metadata } from "next";
import type { LocalizedText } from "@/data/types";
import { getLocalizedValue, localizePath, type Locale, type RoutePath } from "./config";

export function createLocalizedMetadata(
  locale: Locale,
  route: RoutePath,
  content: { title: LocalizedText; description: LocalizedText },
): Metadata {
  return {
    title: getLocalizedValue(content.title, locale),
    description: getLocalizedValue(content.description, locale),
    alternates: {
      canonical: localizePath(locale, route),
      languages: {
        en: localizePath("en", route),
        ar: localizePath("ar", route),
      },
    },
  };
}
