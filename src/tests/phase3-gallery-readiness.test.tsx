import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", async () => {
  const React = await import("react");

  return {
    motion: {
      li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => {
        const safeProps = { ...props } as React.HTMLAttributes<HTMLLIElement> & {
          initial?: unknown;
          whileInView?: unknown;
          viewport?: unknown;
          transition?: unknown;
        };

        delete safeProps.initial;
        delete safeProps.whileInView;
        delete safeProps.viewport;
        delete safeProps.transition;

        return <li {...safeProps}>{children}</li>;
      },
    },
    useReducedMotion: () => false,
  };
});

vi.mock("@/components/gallery/GalleryLightbox", () => ({
  default: () => null,
}));

import GalleryPage from "@/app/[locale]/gallery/page";

const paramsFor = (locale: "en" | "ar") => Promise.resolve({ locale });

afterEach(() => cleanup());

describe("Phase 3 gallery content readiness", () => {
  it("shows the owner-approved Tiger Gym photography for English visitors", async () => {
    const page = await GalleryPage({ params: paramsFor("en") });

    render(page);

    expect(
      screen.getByRole("heading", { name: "The floor. The equipment. The place." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "These official photographs were supplied for the Tiger Gym website and optimized for fast loading.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /elevated view of the tiger gym training floor/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /exterior of building 15 on amman street/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /close perspective of Tiger Gym's mirrored free-weight area/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/gallery photography is still pending/i)).not.toBeInTheDocument();
  });

  it("localizes the approved gallery photography for Arabic visitors", async () => {
    const page = await GalleryPage({ params: paramsFor("ar") });

    render(page);

    expect(
      screen.getByRole("heading", { name: "المساحة. المعدات. المكان." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("تم توفير هذه الصور الرسمية لموقع Tiger Gym وتحسينها للتحميل السريع."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /منظر علوي لمساحة التدريب في Tiger Gym/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /واجهة مبنى 15 في شارع عمّان بالسالمية/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /منظور قريب لمنطقة الأوزان الحرة/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText("صور المعرض قيد الإضافة.")).not.toBeInTheDocument();
  });
});
