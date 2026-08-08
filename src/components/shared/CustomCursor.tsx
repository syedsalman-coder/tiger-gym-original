"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const dumbbellRef = useRef<HTMLSpanElement>(null);
  const haloRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(pointer: fine) and (hover: hover)",
    ).matches;

    if (reduceMotion || !finePointer) {
      return;
    }

    const dumbbell = dumbbellRef.current;
    const halo = haloRef.current;

    if (!dumbbell || !halo) {
      return;
    }

    document.documentElement.classList.add(
      "custom-cursor-active",
    );

    let pointerX = -100;
    let pointerY = -100;
    let haloX = -100;
    let haloY = -100;
    let animationFrame = 0;

    const render = () => {
      haloX += (pointerX - haloX) * 0.16;
      haloY += (pointerY - haloY) * 0.16;

      dumbbell.style.transform =
        `translate3d(${pointerX}px, ${pointerY}px, 0) ` +
        "translate(-50%, -50%) rotate(-24deg)";

      halo.style.transform =
        `translate3d(${haloX}px, ${haloY}px, 0) ` +
        "translate(-50%, -50%)";

      const settled =
        Math.abs(pointerX - haloX) < 0.1
        && Math.abs(pointerY - haloY) < 0.1;

      if (settled) {
        haloX = pointerX;
        haloY = pointerY;
        halo.style.transform =
          `translate3d(${haloX}px, ${haloY}px, 0) ` +
          "translate(-50%, -50%)";
        animationFrame = 0;
        return;
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const requestRender = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const showCursor = () => {
      dumbbell.classList.add("is-visible");
      halo.classList.add("is-visible");
    };

    const hideCursor = () => {
      dumbbell.classList.remove("is-visible");
      halo.classList.remove("is-visible");
    };

    const handleMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      showCursor();
      requestRender();
    };

    const handleHover = (event: PointerEvent) => {
      const target =
        event.target instanceof Element
          ? event.target
          : null;

      const interactive = Boolean(
        target?.closest(
          "a, button, input, textarea, select, label, [data-cursor]",
        ),
      );

      dumbbell.classList.toggle(
        "is-active",
        interactive,
      );

      halo.classList.toggle(
        "is-active",
        interactive,
      );
    };

    const handlePointerDown = () => {
      dumbbell.classList.add("is-pressed");
      halo.classList.add("is-pressed");
    };

    const handlePointerUp = () => {
      dumbbell.classList.remove("is-pressed");
      halo.classList.remove("is-pressed");
    };

    window.addEventListener(
      "pointermove",
      handleMove,
      { passive: true },
    );

    document.addEventListener(
      "pointerover",
      handleHover,
      { passive: true },
    );

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
      { passive: true },
    );

    document.addEventListener(
      "pointerup",
      handlePointerUp,
      { passive: true },
    );

    document.documentElement.addEventListener(
      "mouseleave",
      hideCursor,
    );

    document.documentElement.addEventListener(
      "mouseenter",
      showCursor,
    );

    return () => {
      window.cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "pointermove",
        handleMove,
      );

      document.removeEventListener(
        "pointerover",
        handleHover,
      );

      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      document.removeEventListener(
        "pointerup",
        handlePointerUp,
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        hideCursor,
      );

      document.documentElement.removeEventListener(
        "mouseenter",
        showCursor,
      );

      document.documentElement.classList.remove(
        "custom-cursor-active",
      );
    };
  }, [reduceMotion]);

  return (
    <div className="cursor" aria-hidden="true">
      <span
        className="cursor__halo"
        ref={haloRef}
      />

      <span
        className="cursor__dumbbell"
        ref={dumbbellRef}
      >
        <span className="cursor__bar" />

        <span className="cursor__plate cursor__plate--left" />

        <span className="cursor__plate cursor__plate--right" />
      </span>
    </div>
  );
}
