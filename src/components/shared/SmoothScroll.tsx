"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
    });
    const tick = (time: number) => lenis.raf(time * 1000);
    const update = () => ScrollTrigger.update();
    const refresh = () => ScrollTrigger.refresh();
    const handleAnchor = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector<HTMLElement>(anchor.hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -82, duration: 0.95 });
    };

    lenis.on("scroll", update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("click", handleAnchor);
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("tiger-scene-ready", refresh);
    const refreshTimer = window.setTimeout(refresh, 350);

    return () => {
      window.clearTimeout(refreshTimer);
      document.removeEventListener("click", handleAnchor);
      window.removeEventListener("load", refresh);
      window.removeEventListener("tiger-scene-ready", refresh);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", update);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
