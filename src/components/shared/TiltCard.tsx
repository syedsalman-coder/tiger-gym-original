"use client";

import type { PointerEvent, ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${y * -3.5}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 4.5}deg`);
    event.currentTarget.style.setProperty("--spot-x", `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--spot-y", `${(y + 0.5) * 100}%`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div className={`tilt-card ${className}`} onPointerMove={handleMove} onPointerLeave={reset}>
      {children}
    </div>
  );
}
