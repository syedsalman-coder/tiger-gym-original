"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Expand, ImagePlus } from "lucide-react";
import { useCallback, useId, useState } from "react";
import { galleryContent, galleryImages, galleryPlaceholders } from "@/data/gallery";
import { getLocalizedValue, type Locale } from "@/i18n/config";
import { getDictionary, interpolate } from "@/i18n/dictionaries";
import GalleryLightbox, { type GalleryLightboxImage } from "./GalleryLightbox";

const imageLayoutClasses: Record<string, string> = {
  "tiger-gym-logo": "gallery-grid__item--logo",
  "tiger-gym-interior": "gallery-grid__item--wide",
  "tiger-gym-building": "gallery-grid__item--tall",
  "tiger-gym-dumbbells": "gallery-grid__item--standard",
};

export function GalleryGrid({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);
  const verifiedImages = galleryImages.map((image) => ({
    src: image.src,
    alt: text(image.alt),
    title: text(image.title),
    description: text(image.description),
    width: image.width,
    height: image.height,
  })) satisfies readonly GalleryLightboxImage[];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryNoteId = useId();
  const prefersReducedMotion = useReducedMotion();
  const closeLightbox = useCallback(() => setActiveIndex(null), [setActiveIndex]);

  const revealProps = (index: number) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.45, delay: Math.min(index * 0.05, 0.25) },
  });

  return (
    <div className="gallery-grid-block gallery-grid-block--yellow-black">
      <p className="gallery-grid__note" id={galleryNoteId}>
        {text(galleryContent.note)}
      </p>

      <ul className="gallery-grid" aria-describedby={galleryNoteId}>
        {galleryImages.map((image, index) => {
          const verifiedImage = verifiedImages[index];
          const layoutClass =
            imageLayoutClasses[image.id] ?? "gallery-grid__item--standard";

          return (
            <motion.li
              className={`gallery-grid__item ${layoutClass} gallery-card--black`}
              key={image.id}
              {...revealProps(index)}
            >
              <figure className="gallery-card gallery-card--image">
                <button
                  className="gallery-card__image-button"
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={interpolate(dictionary.gallery.openFullScreen, {
                    title: verifiedImage.title,
                  })}
                >
                  <span className="gallery-card__media">
                    <Image
                      className="gallery-card__image"
                      src={verifiedImage.src}
                      alt={verifiedImage.alt}
                      width={verifiedImage.width}
                      height={verifiedImage.height}
                      sizes="(max-width: 720px) 100vw, (max-width: 1100px) 62vw, 46vw"
                      loading="lazy"
                      draggable={false}
                    />
                    <span className="gallery-card__expand" aria-hidden="true">
                      <Expand />
                    </span>
                  </span>
                  <span className="gallery-card__caption">
                    <span className="gallery-card__eyebrow">
                      {text(galleryContent.verifiedLabel)}
                    </span>
                    <span className="gallery-card__title">
                      {verifiedImage.title}
                    </span>
                    <span className="gallery-card__action">
                      {text(galleryContent.viewLabel)}
                    </span>
                  </span>
                </button>
              </figure>
            </motion.li>
          );
        })}

        {galleryPlaceholders.map((slot, index) => {
          const titleId = `future-gallery-photo-${slot.number}`;

          return (
            <motion.li
              className={`gallery-grid__item gallery-grid__item--${slot.size} gallery-card--${slot.tone}`}
              key={slot.number}
              {...revealProps(galleryImages.length + index)}
            >
              <article
                className="gallery-card gallery-card--placeholder"
                aria-labelledby={titleId}
              >
                <div className="gallery-card__placeholder-mark" aria-hidden="true">
                  <ImagePlus />
                  <span>{slot.number}</span>
                </div>
                <div className="gallery-card__placeholder-copy">
                  <p className="gallery-card__eyebrow">
                    {text(galleryContent.placeholderLabel)}
                  </p>
                  <h3 id={titleId}>{text(slot.title)}</h3>
                  <p>{text(slot.description)}</p>
                </div>
              </article>
            </motion.li>
          );
        })}
      </ul>

      <GalleryLightbox
        locale={locale}
        images={verifiedImages}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}

export default GalleryGrid;
