"use client";

import {
  useLayoutEffect,
  useRef,
} from "react";
import { usePathname } from "next/navigation";

function setTopImmediately() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function MobileRouteReset() {
  const pathname = usePathname();
  const previousPath =
    useRef(pathname);

  useLayoutEffect(() => {
    const changed =
      previousPath.current !== pathname;

    previousPath.current = pathname;

    if (
      !changed ||
      window.location.hash
    ) {
      return;
    }

    const mobile =
      typeof window.matchMedia !==
        "function" ||
      window.matchMedia(
        "(max-width: 900px), (pointer: coarse)",
      ).matches;

    if (!mobile) {
      return;
    }

    const root =
      document.documentElement;

    const previousBehavior =
      root.style.scrollBehavior;

    root.style.scrollBehavior =
      "auto";

    setTopImmediately();

    let frameOne = 0;
    let frameTwo = 0;
    let timerOne = 0;
    let timerTwo = 0;

    frameOne =
      window.requestAnimationFrame(() => {
        setTopImmediately();

        frameTwo =
          window.requestAnimationFrame(
            setTopImmediately,
          );
      });

    timerOne = window.setTimeout(
      setTopImmediately,
      100,
    );

    timerTwo = window.setTimeout(
      () => {
        setTopImmediately();
        root.style.scrollBehavior =
          previousBehavior;
      },
      320,
    );

    return () => {
      window.cancelAnimationFrame(
        frameOne,
      );
      window.cancelAnimationFrame(
        frameTwo,
      );
      window.clearTimeout(timerOne);
      window.clearTimeout(timerTwo);

      root.style.scrollBehavior =
        previousBehavior;
    };
  }, [pathname]);

  return null;
}