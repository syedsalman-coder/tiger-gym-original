"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HEADER_OFFSET = -90;
const FORCE_SCROLL_TOP_KEY = "tiger-force-scroll-top";

function findHashTarget(hash: string): HTMLElement | null {
  if (!hash || hash === "#") {
    return null;
  }

  let targetId = hash.slice(1);

  try {
    targetId = decodeURIComponent(targetId);
  } catch {
    // Keep the original target ID if decoding fails.
  }

  return document.getElementById(targetId);
}

export default function SmoothScroll() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const lenisRef = useRef<Lenis | null>(null);

  const [useNativeScroll, setUseNativeScroll] =
    useState<boolean | null>(null);

  /*
   * Immediately resets both native scrolling and Lenis.
   */
  const scrollToTopImmediately = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        immediate: true,
        force: true,
      });
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  /*
   * Scrolls intentional hash links to their target section.
   */
  const scrollToCurrentLocation = useCallback(
    (smooth = false) => {
      const target = findHashTarget(window.location.hash);

      if (!target) {
        return;
      }

      if (
        lenisRef.current &&
        useNativeScroll === false
      ) {
        lenisRef.current.scrollTo(target, {
          offset: HEADER_OFFSET,
          immediate: !smooth,
          duration: smooth ? 0.9 : undefined,
          force: true,
        });

        return;
      }

      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY +
        HEADER_OFFSET;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        left: 0,
        behavior:
          smooth && !reduceMotion
            ? "smooth"
            : "auto",
      });
    },
    [reduceMotion, useNativeScroll],
  );

  /*
   * Prevent browser restoration from carrying the previous
   * page's bottom position into the next page.
   */
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previousValue =
      window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration =
        previousValue;
    };
  }, []);

  /*
   * Mobile devices use native scrolling.
   * Desktop devices use Lenis.
   */
  useEffect(() => {
    const coarsePointerQuery = window.matchMedia(
      "(pointer: coarse)",
    );

    const mobileWidthQuery = window.matchMedia(
      "(max-width: 900px)",
    );

    const updateScrollMode = () => {
      setUseNativeScroll(
        Boolean(reduceMotion) ||
          coarsePointerQuery.matches ||
          mobileWidthQuery.matches,
      );
    };

    updateScrollMode();

    coarsePointerQuery.addEventListener(
      "change",
      updateScrollMode,
    );

    mobileWidthQuery.addEventListener(
      "change",
      updateScrollMode,
    );

    return () => {
      coarsePointerQuery.removeEventListener(
        "change",
        updateScrollMode,
      );

      mobileWidthQuery.removeEventListener(
        "change",
        updateScrollMode,
      );
    };
  }, [reduceMotion]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
  }, []);

  /*
   * Global internal-link navigation handler.
   *
   * Every same-origin page link without a hash is handled
   * here, including header, footer, menu and CTA links.
   *
   * Links containing a hash are deliberately left alone.
   */
  useEffect(() => {
    const handleInternalLinkClick = (
      event: MouseEvent,
    ) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor =
        event.target.closest<HTMLAnchorElement>(
          "a[href]",
        );

      if (!anchor) {
        return;
      }

      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const rawHref = anchor.getAttribute("href");

      if (
        !rawHref ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("javascript:")
      ) {
        return;
      }

      let destination: URL;

      try {
        destination = new URL(
          anchor.href,
          window.location.href,
        );
      } catch {
        return;
      }

      /*
       * Do not interfere with external links.
       */
      if (
        destination.origin !==
        window.location.origin
      ) {
        return;
      }

      /*
       * Preserve intentional section links such as:
       * #training-areas
       */
      if (destination.hash) {
        return;
      }

      const currentLocation = new URL(
        window.location.href,
      );

      const changesPath =
        destination.pathname !==
        currentLocation.pathname;

      const changesSearch =
        destination.search !==
        currentLocation.search;

      /*
       * Clicking the current page in the header/footer
       * should also take the visitor back to the top.
       */
      if (!changesPath && !changesSearch) {
        event.preventDefault();

        window.history.pushState(
          null,
          "",
          `${destination.pathname}${destination.search}`,
        );

        scrollToTopImmediately();
        ScrollTrigger.refresh();

        return;
      }

      /*
       * Take control of cross-page navigation.
       *
       * Reset the current page first, then navigate without
       * allowing Next.js to preserve the old scroll position.
       */
      event.preventDefault();

      if (changesPath) {
        try {
          window.sessionStorage.setItem(
            FORCE_SCROLL_TOP_KEY,
            "true",
          );
        } catch {
          // Navigation still works when storage is blocked.
        }
      }

      scrollToTopImmediately();

      router.push(
        `${destination.pathname}${destination.search}`,
        {
          scroll: true,
        },
      );
    };

    document.addEventListener(
      "click",
      handleInternalLinkClick,
      true,
    );

    return () => {
      document.removeEventListener(
        "click",
        handleInternalLinkClick,
        true,
      );
    };
  }, [router, scrollToTopImmediately]);

  /*
   * Reconfirm the top position after the destination page
   * mounts. Multiple checks prevent Next.js, layout changes,
   * fonts or images from restoring an old scroll position.
   */
  useLayoutEffect(() => {
    let forceTop = false;

    try {
      forceTop =
        window.sessionStorage.getItem(
          FORCE_SCROLL_TOP_KEY,
        ) === "true";

      if (forceTop) {
        window.sessionStorage.removeItem(
          FORCE_SCROLL_TOP_KEY,
        );
      }
    } catch {
      forceTop = false;
    }

    let firstFrame = 0;
    let secondFrame = 0;
    let firstTimer = 0;
    let secondTimer = 0;

    if (forceTop) {
      scrollToTopImmediately();

      firstFrame = window.requestAnimationFrame(() => {
        scrollToTopImmediately();

        secondFrame =
          window.requestAnimationFrame(() => {
            scrollToTopImmediately();
          });
      });

      firstTimer = window.setTimeout(() => {
        scrollToTopImmediately();
      }, 120);

      secondTimer = window.setTimeout(() => {
        scrollToTopImmediately();
        ScrollTrigger.refresh();
      }, 450);
    } else if (window.location.hash) {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame =
          window.requestAnimationFrame(() => {
            scrollToCurrentLocation(false);
            ScrollTrigger.refresh();
          });
      });
    }

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
    };
  }, [
    pathname,
    scrollToCurrentLocation,
    scrollToTopImmediately,
  ]);

  /*
   * Handle same-page hash changes, including the hero's
   * training-method section link.
   */
  useEffect(() => {
    const handleHashChange = () => {
      window.requestAnimationFrame(() => {
        scrollToCurrentLocation(true);
      });
    };

    window.addEventListener(
      "hashchange",
      handleHashChange,
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange,
      );
    };
  }, [scrollToCurrentLocation]);

  /*
   * Enable Lenis smooth scrolling on desktop only.
   */
  useEffect(() => {
    if (useNativeScroll !== false) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
    });

    lenisRef.current = lenis;

    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    lenis.on("scroll", updateScrollTrigger);

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    window.addEventListener(
      "tiger-scene-ready",
      refreshScrollTrigger,
    );

    const refreshTimer = window.setTimeout(
      refreshScrollTrigger,
      350,
    );

    return () => {
      window.clearTimeout(refreshTimer);

      window.removeEventListener(
        "tiger-scene-ready",
        refreshScrollTrigger,
      );

      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);

      lenis.off(
        "scroll",
        updateScrollTrigger,
      );

      lenis.destroy();

      if (lenisRef.current === lenis) {
        lenisRef.current = null;
      }
    };
  }, [useNativeScroll]);

  /*
   * Smooth intentional same-page hash links on desktop.
   */
  useEffect(() => {
    const handleHashAnchorClick = (
      event: MouseEvent,
    ) => {
      if (
        useNativeScroll !== false ||
        !lenisRef.current ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor =
        event.target.closest<HTMLAnchorElement>(
          "a[href]",
        );

      if (!anchor) {
        return;
      }

      const destination = new URL(
        anchor.href,
        window.location.href,
      );

      const isSamePage =
        destination.origin ===
          window.location.origin &&
        destination.pathname ===
          window.location.pathname &&
        destination.search ===
          window.location.search;

      if (
        !isSamePage ||
        !destination.hash
      ) {
        return;
      }

      const target = findHashTarget(
        destination.hash,
      );

      if (!target) {
        return;
      }

      event.preventDefault();

      window.history.pushState(
        null,
        "",
        `${destination.pathname}${destination.search}${destination.hash}`,
      );

      lenisRef.current.scrollTo(target, {
        offset: HEADER_OFFSET,
        duration: 0.9,
        force: true,
      });
    };

    document.addEventListener(
      "click",
      handleHashAnchorClick,
      true,
    );

    return () => {
      document.removeEventListener(
        "click",
        handleHashAnchorClick,
        true,
      );
    };
  }, [useNativeScroll]);

  return null;
}