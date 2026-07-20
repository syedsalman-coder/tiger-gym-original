"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const bar = barRef.current;
    if (!bar) return;
    bar.style.transform = "scaleX(0)";
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => { bar.style.transform = `scaleX(${self.progress})`; },
    });
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      window.clearTimeout(timer);
      trigger.kill();
    };
  }, [pathname]);

  return <div className="scroll-line" aria-hidden="true"><span ref={barRef} /></div>;
}
