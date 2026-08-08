import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import HomeHero from "@/components/home/HomeHero";

vi.mock("next/dynamic", () => ({
  default: () => function MockDumbbellScene() {
    return <div data-testid="dumbbell-scene" />;
  },
}));

vi.mock("@/components/shared/Logo", () => ({
  default: () => <div data-testid="hero-logo" />,
}));

describe("HomeHero cinematic layer", () => {
  afterEach(() => cleanup());

  it("renders an aria-hidden cinematic lighting frame around the hero scene", () => {
    const { container } = render(<HomeHero locale="en" />);

    const hero = screen.getByRole("region", {
      name: /built\s+for\s+strength/i,
    });

    expect(hero).toHaveAttribute("data-home-hero");

    const cinematic = container.querySelector("[data-home-cinematic]");
    expect(cinematic).toBeInTheDocument();
    expect(cinematic).toHaveAttribute("aria-hidden", "true");
    expect(cinematic).toHaveClass("home-hero__cinematic");
    expect(
      cinematic?.querySelector(".home-hero__spotlight"),
    ).toBeInTheDocument();
    expect(
      cinematic?.querySelector(".home-hero__grain"),
    ).toBeInTheDocument();
    expect(
      cinematic?.querySelector(".home-hero__aperture"),
    ).toBeInTheDocument();
  });
});
