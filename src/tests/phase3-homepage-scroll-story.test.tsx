import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

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

import HomePage from "@/app/[locale]/page";

const paramsFor = (locale: "en" | "ar") => Promise.resolve({ locale });

afterEach(() => cleanup());

describe("Phase 3 homepage cinematic scroll storytelling", () => {
  it("renders a localized performant scroll story between the manifesto and facility preview", async () => {
    const page = await HomePage({ params: paramsFor("en") });

    const { container } = render(page);

    const story = screen.getByRole("region", {
      name: /cinematic training sequence/i,
    });

    expect(story).toHaveAttribute("data-home-scroll-story");
    expect(story).toHaveAttribute("data-performance-mode", "css-sticky");
    expect(story).toHaveAttribute("data-motion-budget", "transform-opacity");
    expect(story).toHaveAttribute("data-reduced-motion-safe", "true");

    const chapters = within(story).getAllByRole("article");
    expect(chapters).toHaveLength(3);
    expect(chapters.map((chapter) => chapter.getAttribute("data-story-step"))).toEqual([
      "01",
      "02",
      "03",
    ]);
    expect(story).toHaveTextContent("Enter the floor");
    expect(story).toHaveTextContent("Set the work");
    expect(story).toHaveTextContent("Leave ready for the next session");

    const intro = container.querySelector("#home-intro");
    const facilities = container.querySelector(".training-experiences");
    expect(intro?.compareDocumentPosition(story) ?? 0).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(story.compareDocumentPosition(facilities as Element)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it("localizes the scroll story for Arabic visitors", async () => {
    const page = await HomePage({ params: paramsFor("ar") });

    render(page);

    const story = screen.getByRole("region", {
      name: /تسلسل تدريبي سينمائي/i,
    });

    expect(story).toHaveAttribute("data-performance-mode", "css-sticky");
    expect(story).toHaveTextContent("ادخل مساحة التدريب");
    expect(story).toHaveTextContent("حدّد العمل");
    expect(story).toHaveTextContent("اخرج جاهزًا للحصة التالية");
  });
});
