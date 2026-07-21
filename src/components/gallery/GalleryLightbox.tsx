"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { galleryContent } from "@/data/gallery";
import { getLocalizedValue, type Locale } from "@/i18n/config";
import { getDictionary, interpolate } from "@/i18n/dictionaries";

export interface GalleryLightboxImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

interface GalleryLightboxProps {
  locale: Locale;
  images: readonly GalleryLightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function GalleryLightbox({
  locale,
  images,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const prefersReducedMotion = useReducedMotion();
  const dictionary = getDictionary(locale);
  const previousDirection: -1 | 1 = locale === "ar" ? 1 : -1;
  const nextDirection: -1 | 1 = locale === "ar" ? -1 : 1;
  const activeImage = activeIndex === null ? null : images[activeIndex] ?? null;

  const navigate = useCallback(
    (direction: -1 | 1) => {
      if (activeIndex === null || images.length <= 1 || !onNavigate) {
        return;
      }

      const nextIndex =
        (activeIndex + direction + images.length) % images.length;
      onNavigate(nextIndex);
    },
    [activeIndex, images.length, onNavigate],
  );

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingInlineEnd = document.body.style.paddingInlineEnd;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const currentPadding = Number.parseFloat(
        window.getComputedStyle(document.body).paddingInlineEnd,
      );
      document.body.style.paddingInlineEnd = `${currentPadding + scrollbarWidth}px`;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && images.length > 1) {
        event.preventDefault();
        navigate(previousDirection);
        return;
      }

      if (event.key === "ArrowRight" && images.length > 1) {
        event.preventDefault();
        navigate(nextDirection);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("aria-hidden"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingInlineEnd = originalPaddingInlineEnd;
      previouslyFocused?.focus();
    };
  }, [activeImage, images.length, navigate, nextDirection, onClose, previousDirection]);

  if (typeof document === "undefined") {
    return null;
  }

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: "easeOut" as const };

  return createPortal(
    <AnimatePresence>
      {activeImage && activeIndex !== null ? (
        <motion.div
          className="gallery-lightbox gallery-lightbox--black-yellow"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={dialogRef}
            className="gallery-lightbox__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={
              prefersReducedMotion ? false : { opacity: 0, scale: 0.985, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: 8 }}
            transition={transition}
          >
            <div className="gallery-lightbox__toolbar">
              <p className="gallery-lightbox__status" aria-live="polite">
                {interpolate(dictionary.gallery.verifiedStatus, { current: activeIndex + 1, total: images.length })}
              </p>
              <button
                ref={closeButtonRef}
                className="gallery-lightbox__close gallery-lightbox__control--yellow"
                type="button"
                onClick={onClose}
                aria-label={dictionary.gallery.close}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <figure className="gallery-lightbox__figure">
              <div className="gallery-lightbox__image-frame">
                <Image
                  className="gallery-lightbox__image"
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={activeImage.width}
                  height={activeImage.height}
                  sizes="100vw"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <figcaption className="gallery-lightbox__caption">
                <span className="gallery-lightbox__eyebrow">
                  {getLocalizedValue(galleryContent.lightboxEyebrow, locale)}
                </span>
                <h2 id={titleId}>{activeImage.title}</h2>
                <p id={descriptionId}>{activeImage.description}</p>
              </figcaption>
            </figure>

            {images.length > 1 && onNavigate ? (
              <nav
                className="gallery-lightbox__navigation"
                aria-label={dictionary.gallery.navigation}
              >
                <button
                  className="gallery-lightbox__previous gallery-lightbox__control--yellow"
                  type="button"
                  onClick={() => navigate(previousDirection)}
                  aria-label={dictionary.gallery.previous}
                >
                  {locale === "ar" ? <ChevronRight aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}
                </button>
                <button
                  className="gallery-lightbox__next gallery-lightbox__control--yellow"
                  type="button"
                  onClick={() => navigate(nextDirection)}
                  aria-label={dictionary.gallery.next}
                >
                  {locale === "ar" ? <ChevronLeft aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
                </button>
              </nav>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export default GalleryLightbox;
