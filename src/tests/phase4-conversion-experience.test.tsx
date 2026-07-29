import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/dynamic", () => ({
  default: () => function MockDumbbellScene() {
    return <div data-testid="dumbbell-scene" />;
  },
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
  Object.assign(window, { open: mockOpen });
});

afterEach(() => cleanup());

describe("Phase 4 conversion experience", () => {
  it("adds a verified-data conversion finale to the homepage without removing the cinematic scroll story", async () => {
    const page = await HomePage({ params: paramsFor("en") });
    render(page);

    expect(screen.getByRole("region", { name: /cinematic training sequence/i })).toHaveAttribute(
      "data-home-scroll-story",
    );

    const finalCta = screen.getByRole("region", { name: /final homepage conversion action/i });
    expect(finalCta).toHaveTextContent("Ready to plan your first session?");
    expect(within(finalCta).getByRole("link", { name: /prepare membership enquiry/i })).toHaveAttribute(
      "href",
      "/en/membership#membership-form",
    );
    expect(within(finalCta).getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/96569678350"),
    );
  });

  it("renders final CTAs on About, Facilities, Membership, Gallery, and Contact pages", async () => {
    const pages = [
      { page: await AboutPage({ params: paramsFor("en") }), name: /about conversion action/i },
      { page: await FacilitiesPage({ params: paramsFor("en") }), name: /facilities conversion action/i },
      { page: await MembershipPage({ params: paramsFor("en") }), name: /membership conversion action/i },
      { page: await GalleryPage({ params: paramsFor("en") }), name: /gallery conversion action/i },
      { page: await ContactPage({ params: paramsFor("en") }), name: /contact conversion action/i },
    ];

    pages.forEach(({ page, name }) => {
      cleanup();
      render(page);
      const cta = screen.getByRole("region", { name });
      expect(within(cta).getByRole("link", { name: /^whatsapp$/i })).toHaveAttribute(
        "href",
        expect.stringContaining("wa.me/96569678350"),
      );
    });
  });

  it("shows pending FAQ guidance instead of unverified operational answers", async () => {
    const page = await ContactPage({ params: paramsFor("en") });
    render(page);

    const faq = screen.getByRole("region", { name: /tiger gym faq/i });
    expect(faq).toHaveTextContent("FAQ answers are pending confirmation.");
    expect(faq).toHaveTextContent("No unverified operating answers are published here.");
    expect(within(faq).getByRole("link", { name: /ask on whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/96569678350"),
    );
  });

  it("keeps Arabic conversion pages localized with RTL direction support", async () => {
    expect(localeDirections.ar).toBe("rtl");

    const page = await MembershipPage({ params: paramsFor("ar") });
    render(page);

    expect(screen.getByRole("heading", { name: /استفسر الآن/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /إجراء تحويل العضوية/i })).toHaveTextContent(
      "جاهز لتأكيد خيار العضوية؟",
    );
    expect(screen.getByLabelText("رقم الهاتف")).toHaveAttribute("dir", "ltr");
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
    expect(screen.getByRole("status")).toHaveTextContent("nothing was sent by this form");

    cleanup();
    render(<MembershipForm locale="en" />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Dana" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "+965 5555 5555" } });
    fireEvent.change(screen.getByLabelText("Preferred training time"), { target: { value: "Evening" } });
    fireEvent.change(screen.getByLabelText("Membership interest"), { target: { value: "Monthly Membership" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Please confirm current price." } });
    fireEvent.click(screen.getByRole("button", { name: /prepare membership enquiry/i }));

    const membershipUrl = new URL(openedUrls.at(-1) ?? "");
    expect(membershipUrl.origin + membershipUrl.pathname).toBe("https://wa.me/96569678350");
    expect(membershipUrl.searchParams.get("text")).toContain("Monthly Membership");
    expect(membershipUrl.searchParams.get("text")).toContain("Please confirm current price.");
  });
});
