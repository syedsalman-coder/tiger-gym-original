import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { analyticsPropsMock, speedInsightsPropsMock, trackMock } = vi.hoisted(
  () => ({
    analyticsPropsMock: vi.fn(),
    speedInsightsPropsMock: vi.fn(),
    trackMock: vi.fn(),
  }),
);

vi.mock("@vercel/analytics", () => ({
  track: trackMock,
}));

vi.mock("@vercel/analytics/next", () => ({
  Analytics: (props: unknown) => {
    analyticsPropsMock(props);
    return null;
  },
}));

vi.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: (props: unknown) => {
    speedInsightsPropsMock(props);
    return null;
  },
}));

import SiteAnalytics from "@/components/analytics/SiteAnalytics";
import {
  classifyConversionHref,
  sanitizeAnalyticsUrl,
} from "@/lib/analytics";

beforeEach(() => {
  trackMock.mockClear();
  analyticsPropsMock.mockClear();
  speedInsightsPropsMock.mockClear();
  document.documentElement.lang = "en";
  window.history.replaceState({}, "", "/en");
});

afterEach(() => cleanup());

describe("SiteAnalytics", () => {
  it("classifies verified conversion destinations without retaining their URLs", () => {
    expect(classifyConversionHref("https://wa.me/96569678350")).toBe(
      "whatsapp_click",
    );
    expect(classifyConversionHref("tel:+96569678350")).toBe("phone_click");
    expect(
      classifyConversionHref(
        "https://www.google.com/maps/search/?api=1&query=29.32,48.05",
      ),
    ).toBe("directions_click");
    expect(classifyConversionHref("mailto:hello@example.com")).toBe(
      "email_click",
    );
    expect(classifyConversionHref("https://instagram.com/tigergymkw")).toBe(
      "instagram_click",
    );
    expect(classifyConversionHref("/en/membership")).toBeNull();
  });

  it("removes query strings and fragments before analytics transmission", () => {
    expect(
      sanitizeAnalyticsUrl(
        "https://tiger-gym-original.vercel.app/en/contact?phone=123#form",
      ),
    ).toBe("https://tiger-gym-original.vercel.app/en/contact");
  });

  it("tracks anonymous CTA events with page, locale, and placement only", () => {
    render(
      <>
        <SiteAnalytics />
        <footer>
          <a href="https://wa.me/96569678350" onClick={(event) => event.preventDefault()}>
            WhatsApp
          </a>
        </footer>
        <aside className="mobile-action-bar">
          <a href="tel:+96569678350" onClick={(event) => event.preventDefault()}>
            Call now
          </a>
        </aside>
        <main>
          <a href="#membership" onClick={(event) => event.preventDefault()}>
            Membership
          </a>
        </main>
      </>,
    );

    fireEvent.click(screen.getByRole("link", { name: "WhatsApp" }));
    expect(trackMock).toHaveBeenLastCalledWith("WhatsApp Click", {
      locale: "en",
      page: "/en",
      placement: "footer",
    });

    fireEvent.click(screen.getByRole("link", { name: "Call now" }));
    expect(trackMock).toHaveBeenLastCalledWith("Phone Click", {
      locale: "en",
      page: "/en",
      placement: "mobile-action-bar",
    });

    fireEvent.click(screen.getByRole("link", { name: "Membership" }));
    expect(trackMock).toHaveBeenCalledTimes(2);
    expect(JSON.stringify(trackMock.mock.calls)).not.toContain("96569678350");
  });

  it("applies URL redaction to page views and Web Vitals", () => {
    render(<SiteAnalytics />);

    const analyticsProps = analyticsPropsMock.mock.calls[0][0] as {
      beforeSend: (event: { type: "pageview"; url: string }) => {
        type: "pageview";
        url: string;
      };
    };
    const speedProps = speedInsightsPropsMock.mock.calls[0][0] as {
      beforeSend: (event: { type: "vital"; url: string }) => {
        type: "vital";
        url: string;
      };
    };

    expect(
      analyticsProps.beforeSend({
        type: "pageview",
        url: "https://example.com/en?private=value#section",
      }).url,
    ).toBe("https://example.com/en");
    expect(
      speedProps.beforeSend({
        type: "vital",
        url: "https://example.com/ar?private=value#section",
      }).url,
    ).toBe("https://example.com/ar");
  });
});
