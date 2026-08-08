import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { trackMock } = vi.hoisted(() => ({
  trackMock: vi.fn(),
}));

vi.mock("@vercel/analytics", () => ({
  track: trackMock,
}));

vi.mock("next/dynamic", () => ({
  default: () => function MockDumbbellScene() {
    return <div data-testid="dumbbell-scene" />;
  },
}));

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />,
}));

vi.mock("@/components/shared/Logo", () => ({
  default: () => <div data-testid="mock-logo" />,
}));

vi.mock("@/components/contact/MapEmbed", () => ({
  default: () => <div data-testid="mock-map" />,
}));

vi.mock("@/components/gallery/GalleryGrid", () => ({
  default: () => <div data-testid="mock-gallery-grid" />,
}));

import HomePage from "@/app/[locale]/page";
import AboutPage from "@/app/[locale]/about/page";
import FacilitiesPage from "@/app/[locale]/facilities/page";
import MembershipPage from "@/app/[locale]/membership/page";
import GalleryPage from "@/app/[locale]/gallery/page";
import ContactPage from "@/app/[locale]/contact/page";
import ContactForm from "@/components/contact/ContactForm";
import MembershipForm from "@/components/contact/MembershipForm";
import { localeDirections } from "@/i18n/config";

const paramsFor = (locale: "en" | "ar") => Promise.resolve({ locale });
const popup = { opener: null as Window["opener"] };
let openedUrls: string[] = [];
const mockOpen = vi.fn((url?: string | URL) => {
  openedUrls.push(String(url));
  return popup as Window;
});

beforeEach(() => {
  openedUrls = [];
  mockOpen.mockClear();
  trackMock.mockClear();
  Object.assign(window, { open: mockOpen });
});

afterEach(() => cleanup());

describe("Phase 4 conversion experience", () => {
  it("keeps the homepage cinematic while using one focused membership pathway", async () => {
    const page = await HomePage({ params: paramsFor("en") });
    render(page);

    expect(screen.getByRole("region", { name: /plan a session at tiger gym/i })).toHaveAttribute(
      "data-home-scroll-story",
    );
    expect(
      screen.getByRole("heading", { name: /put your next session on the calendar/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore membership/i })).toHaveAttribute(
      "href",
      "/en/membership",
    );
    expect(screen.queryByRole("region", { name: /final homepage conversion action/i })).not.toBeInTheDocument();
  });

  it("removes duplicate final CTAs while retaining one contextual action per page", async () => {
    render(await AboutPage({ params: paramsFor("en") }));
    expect(screen.getByRole("link", { name: /ask about membership/i })).toHaveAttribute(
      "href",
      "/en/membership",
    );
    expect(screen.queryByRole("region", { name: /about conversion action/i })).not.toBeInTheDocument();

    cleanup();
    render(await FacilitiesPage({ params: paramsFor("en") }));
    expect(screen.getByRole("link", { name: /membership enquiry/i })).toHaveAttribute(
      "href",
      "/en/membership",
    );
    expect(screen.queryByRole("region", { name: /facilities conversion action/i })).not.toBeInTheDocument();

    cleanup();
    render(await MembershipPage({ params: paramsFor("en") }));
    expect(screen.getByRole("button", { name: /prepare membership enquiry/i })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: /membership conversion action/i })).not.toBeInTheDocument();

    cleanup();
    render(await GalleryPage({ params: paramsFor("en") }));
    expect(screen.getByRole("region", { name: /gallery conversion action/i })).toBeInTheDocument();

    cleanup();
    render(await ContactPage({ params: paramsFor("en") }));
    expect(screen.queryByRole("region", { name: /contact conversion action/i })).not.toBeInTheDocument();
  });

  it("publishes useful verified FAQ content and FAQPage schema", async () => {
    const page = await ContactPage({ params: paramsFor("en") });
    const { container } = render(page);

    const faq = screen.getByRole("region", {
      name: /tiger gym frequently asked questions/i,
    });
    expect(faq).toHaveTextContent("Where is Tiger Gym in Salmiya?");
    expect(faq).toHaveTextContent("What are Tiger Gym's opening hours?");
    expect(faq).toHaveTextContent("+965 6967 8350");

    const scripts = Array.from(
      container.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
    );
    const faqSchema = scripts
      .map((script) => JSON.parse(script.textContent ?? "{}"))
      .find((schema) => schema["@type"] === "FAQPage");

    expect(faqSchema).toBeDefined();
    expect(faqSchema.mainEntity).toHaveLength(6);
  });

  it("keeps Arabic conversion pages localized with RTL direction support", async () => {
    expect(localeDirections.ar).toBe("rtl");

    const page = await MembershipPage({ params: paramsFor("ar") });
    render(page);

    expect(document.querySelector("#membership-form")).toBeInTheDocument();
    expect(document.querySelector("#membership-phone")).toHaveAttribute("dir", "ltr");
  });

  it("prepares encoded WhatsApp messages from contact and membership forms without sending automatically", () => {
    render(<ContactForm locale="en" />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Dana" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "+965 5555 5555" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Can I visit today?" } });
    fireEvent.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));

    const contactUrl = new URL(openedUrls.at(-1) ?? "");
    expect(contactUrl.origin + contactUrl.pathname).toBe("https://wa.me/96569678350");
    expect(contactUrl.searchParams.get("text")).toContain("Can I visit today?");
    expect(screen.getByRole("status")).toHaveTextContent("tap Send when you are ready");
    expect(trackMock).toHaveBeenLastCalledWith("Contact Form Submitted", {
      locale: "en",
      page: "/",
      placement: "contact-form",
    });

    cleanup();
    render(<MembershipForm locale="en" />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Dana" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "+965 5555 5555" } });
    fireEvent.change(screen.getByLabelText("Preferred training time"), { target: { value: "Evening" } });
    fireEvent.change(screen.getByLabelText("Which membership package interests you?"), { target: { value: "1 Year — 120 KD" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Please confirm current price." } });
    fireEvent.click(screen.getByRole("button", { name: /prepare membership enquiry/i }));

    const membershipUrl = new URL(openedUrls.at(-1) ?? "");
    expect(membershipUrl.origin + membershipUrl.pathname).toBe("https://wa.me/96569678350");
    expect(membershipUrl.searchParams.get("text")).toContain("1 Year — 120 KD");
    expect(membershipUrl.searchParams.get("text")).toContain("Please confirm current price.");
    expect(trackMock).toHaveBeenLastCalledWith("Membership Form Submitted", {
      locale: "en",
      page: "/",
      placement: "membership-form",
    });
    expect(JSON.stringify(trackMock.mock.calls)).not.toContain("Dana");
    expect(JSON.stringify(trackMock.mock.calls)).not.toContain("5555");
    expect(JSON.stringify(trackMock.mock.calls)).not.toContain("current price");
  });
});
