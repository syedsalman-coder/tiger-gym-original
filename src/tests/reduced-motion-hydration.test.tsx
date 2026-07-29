import { cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import HomeLoader from "@/components/home/HomeLoader";
import PageTransition from "@/components/layout/PageTransition";

type MotionCapture = {
  tag: "div" | "span";
  className?: string;
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  transition?: unknown;
};

const motionState = vi.hoisted(() => ({
  reducedMotion: false,
  captures: [] as MotionCapture[],
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
}));

vi.mock("@/components/shared/Logo", () => ({
  default: () => <div data-testid="loader-logo" />,
}));

vi.mock("framer-motion", async () => {
  const React = await vi.importActual<typeof import("react")>("react");

  function createMotion(tag: "div" | "span") {
    return function MockMotion(props: {
      children?: ReactNode;
      initial?: unknown;
      animate?: unknown;
      exit?: unknown;
      transition?: unknown;
      whileInView?: unknown;
      viewport?: unknown;
      [key: string]: unknown;
    }) {
      const {
        children,
        initial,
        animate,
        exit,
        transition,
        whileInView,
        viewport,
        ...domProps
      } = props;
      void whileInView;
      void viewport;

      const className =
        typeof domProps.className === "string"
          ? domProps.className
          : undefined;

      motionState.captures.push({
        tag,
        className,
        initial,
        animate,
        exit,
        transition,
      });

      return React.createElement(tag, domProps, children);
    };
  }

  return {
    AnimatePresence: ({ children }: { children?: ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    motion: {
      div: createMotion("div"),
      span: createMotion("span"),
    },
    useReducedMotion: () => motionState.reducedMotion,
  };
});

function renderWithReducedMotion(children: ReactNode) {
  motionState.reducedMotion = true;
  motionState.captures.length = 0;
  render(children);
  return [...motionState.captures];
}

afterEach(() => {
  cleanup();
  motionState.reducedMotion = false;
  motionState.captures.length = 0;
});

describe("reduced-motion hydration", () => {
  it("keeps PageTransition first-render motion styles stable for reduced-motion users", () => {
    const captures = renderWithReducedMotion(
      <PageTransition>
        <main>Hydrated route</main>
      </PageTransition>,
    );

    const routeContent = captures.find(
      (capture) => capture.tag === "div" && capture.className === undefined,
    );
    const routeWipe = captures.find(
      (capture) => capture.className === "route-wipe",
    );

    expect(routeContent?.initial).toEqual({ opacity: 0, y: 8 });
    expect(routeContent?.animate).toEqual({ opacity: 1, y: 0 });
    expect(routeWipe?.initial).toEqual({ scaleY: 1 });
    expect(routeWipe?.animate).toEqual({ scaleY: 0 });
  });

  it("keeps HomeLoader first-render claw styles stable for reduced-motion users", () => {
    const captures = renderWithReducedMotion(<HomeLoader locale="en" />);
    const clawLines = captures.filter((capture) => capture.tag === "span");

    expect(clawLines).toHaveLength(3);
    expect(clawLines.map((capture) => capture.initial)).toEqual([
      { scaleX: 0 },
      { scaleX: 0 },
      { scaleX: 0 },
    ]);
    expect(clawLines.map((capture) => capture.animate)).toEqual([
      { scaleX: 1 },
      { scaleX: 1 },
      { scaleX: 1 },
    ]);
  });
});
