import type { MetadataRoute } from "next";
import { absoluteSiteUrl, siteUrl } from "@/i18n/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
