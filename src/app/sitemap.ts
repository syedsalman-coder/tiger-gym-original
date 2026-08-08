import type { MetadataRoute } from "next";
import { locales, localizePath, routePaths } from "@/i18n/config";
import { absoluteSiteUrl } from "@/i18n/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routePaths.map((route) => ({
      url: absoluteSiteUrl(localizePath(locale, route)),
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : route === "/contact" ? 0.9 : 0.8,
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((alternateLocale) => [
            alternateLocale,
            absoluteSiteUrl(localizePath(alternateLocale, route)),
          ] as const),
          ["x-default", absoluteSiteUrl(localizePath("en", route))],
        ]),
      },
    })),
  );
}
