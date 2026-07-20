"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    document.documentElement.classList.add("custom-cursor-active");
    let x = -80;
    let y = -80;
    let ringX = -80;
    let ringY = -80;
    let frame = 0;
    const render = () => {
      ringX += (x - ringX) * 0.17;
      ringY += (y - ringY) * 0.17;
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
      ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
      frame = window.requestAnimationFrame(render);
    };
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const over = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      ring.classList.toggle("is-active", Boolean(target?.closest("a,button,[data-cursor]")));
    };
    frame = window.requestAnimationFrame(render);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [reduceMotion]);

  return (
    <div className="cursor" aria-hidden="true">
      <span className="cursor__dot" ref={dotRef} />
      <span className="cursor__ring" ref={ringRef} />
    </div>
  );
}
