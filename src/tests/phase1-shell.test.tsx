import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileActionBar from "@/components/layout/MobileActionBar";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { site } from "@/data/site";
import { createLocalBusinessJsonLd, createLocalizedMetadata } from "@/i18n/metadata";
import { pageContent } from "@/data/pages";

describe("Phase 1 conversion shell", () => {
  it("renders mobile WhatsApp, call, and directions actions with accessible labels", () => {
    render(<MobileActionBar locale="en" />);

    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me"),
    );
    expect(screen.getByRole("link", { name: /call now/i })).toHaveAttribute(
      "href",
      site.phoneHref,
    );
    expect(screen.getByRole("link", { name: /get directions/i })).toHaveAttribute(
      "href",
      expect.stringContaining("google.com/maps"),
    );
  });

  it("builds localized Arabic metadata with canonical and Open Graph locale data", () => {
    const metadata = createLocalizedMetadata("ar", "/", pageContent.home.metadata);

    expect(metadata.title).toBe("Tiger Gym | مركز لياقة بدنية في السالمية، الكويت");
    expect(metadata.alternates?.canonical).toBe("/ar");
    expect(metadata.alternates?.languages).toMatchObject({ en: "/en", ar: "/ar" });
    expect(metadata.openGraph).toMatchObject({ locale: "ar_KW", alternateLocale: ["en_KW"] });
  });

  it("publishes crawl routes and verified local-business structured data", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain("https://tigergym.kw/en");
    expect(urls).toContain("https://tigergym.kw/ar/contact");
    expect(robots()).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://tigergym.kw/sitemap.xml",
    });

    const structuredData = createLocalBusinessJsonLd("en");

    expect(structuredData).toMatchObject({
      "@type": "ExerciseGym",
      name: "Tiger Gym Fitness Center",
      telephone: site.phoneHref.replace(/^tel:/, ""),
      hasMap: site.directionsUrl,
    });
    expect(structuredData.telephone).not.toContain("*");
    expect(structuredData.address.streetAddress).toContain("Amman Street");
  });

});
