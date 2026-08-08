"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function RouteMotion() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const inlineStart = document.documentElement.dir === "rtl" ? "right" : "left";
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const lines = gsap.utils.toArray<HTMLElement>("[data-heading-line]");
      const dividers = gsap.utils.toArray<HTMLElement>("[data-divider]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-stagger-card]");

      if (reduceMotion) {
        gsap.set([...reveals, ...lines, ...cards], { clearProps: "all", autoAlpha: 1, x: 0, y: 0 });
        gsap.set(dividers, { scaleX: 1 });
        return;
      }

      reveals.forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 28 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 89%", once: true },
        });
      });
      lines.forEach((element) => {
        gsap.fromTo(element, { yPercent: 110 }, {
          yPercent: 0,
          duration: 0.62,
          ease: "power4.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        });
      });
      dividers.forEach((element) => {
        gsap.fromTo(element, { scaleX: 0, transformOrigin: inlineStart }, {
          scaleX: 1,
          duration: 0.65,
          ease: "power3.inOut",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });
      if (cards.length) {
        cards.forEach((card) => {
          gsap.fromTo(card, { autoAlpha: 0, y: 34 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          });
        });
      }

      const homeHero = document.querySelector<HTMLElement>("[data-home-hero]");
      if (homeHero) {
        gsap.timeline({
          scrollTrigger: { trigger: homeHero, start: "top top", end: "bottom top", scrub: 0.35 },
        })
          .to("[data-home-title-line='one']", { xPercent: -10, autoAlpha: 0.22 }, 0)
          .to("[data-home-title-line='two']", { xPercent: 8, autoAlpha: 0.16 }, 0)
          .to("[data-home-title-line='three']", { xPercent: -6, autoAlpha: 0.12 }, 0)
          .to("[data-home-scene]", { scale: 1.04, yPercent: -3 }, 0)
          .to("[data-home-copy]", { yPercent: 35, autoAlpha: 0 }, 0.08);
      }

      const logo = document.querySelector<HTMLElement>("[data-logo-parallax]");
      if (logo) {
        gsap.to(logo, {
          yPercent: -8,
          rotate: 3,
          ease: "none",
          scrollTrigger: { trigger: logo, start: "top bottom", end: "bottom top", scrub: 0.4 },
        });
      }
    });

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 240);
    return () => {
      window.clearTimeout(timer);
      context.revert();
    };
  }, [pathname, reduceMotion]);

  return null;
}
