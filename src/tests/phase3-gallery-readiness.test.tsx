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
  it("surfaces pending gallery photography guidance for English visitors", async () => {
    const page = await GalleryPage({ params: paramsFor("en") });

    render(page);

    const notice = screen.getByRole("status", { name: /content status/i });
    expect(notice).toHaveTextContent("Gallery photography is still pending.");
    expect(notice).toHaveTextContent("No stock or invented gym photos are being used");
    expect(notice).toHaveTextContent("Use the verified logo and contact Tiger Gym for current training-floor details");
  });

  it("localizes pending gallery photography guidance for Arabic visitors", async () => {
    const page = await GalleryPage({ params: paramsFor("ar") });

    render(page);

    const notice = screen.getByRole("status", { name: /حالة المحتوى/i });
    expect(notice).toHaveTextContent("صور المعرض قيد الإضافة.");
    expect(notice).toHaveTextContent("لا تُستخدم صور مخزّنة أو مختلقة للنادي");
  });
});
