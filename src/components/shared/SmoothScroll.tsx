"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HEADER_OFFSET = -90;

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

  /*
   * Immediately resets native scrolling.
   */
  const scrollToTopImmediately = useCallback(() => {
    const root = document.documentElement;
    const previousScrollBehavior =
      root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    root.scrollTop = 0;
    document.body.scrollTop = 0;

    root.style.scrollBehavior =
      previousScrollBehavior;
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
    [reduceMotion],
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

      scrollToTopImmediately();

      router.push(
        `${destination.pathname}${destination.search}`,
        {
          scroll: false,
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
   * Reconfirm the top position whenever the destination page
   * mounts. Multiple checks prevent Next.js, layout changes,
   * fonts or images from restoring an old scroll position.
   */
  useLayoutEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    let firstTimer = 0;
    let secondTimer = 0;

    if (!window.location.hash) {
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
      }, 500);
    } else {
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
   * Smooth intentional same-page hash links with the
   * browser's native, compositor-friendly scrolling.
   */
  useEffect(() => {
    const handleHashAnchorClick = (
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

      let destination: URL;

      try {
        destination = new URL(
          anchor.href,
          window.location.href,
        );
      } catch {
        return;
      }

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

      scrollToCurrentLocation(true);
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
  }, [scrollToCurrentLocation]);

  return null;
}
