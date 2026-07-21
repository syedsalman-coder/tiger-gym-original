"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Expand, ImagePlus } from "lucide-react";
import { useCallback, useId, useState } from "react";
import { galleryContent, galleryImages, galleryPlaceholders } from "@/data/gallery";
import GalleryLightbox, { type GalleryLightboxImage } from "./GalleryLightbox";

const verifiedImages = galleryImages.map((image) => ({
  src: image.src,
  alt: image.alt.en,
  title: image.title.en,
  description: image.description.en,
  width: image.width,
  height: image.height,
})) satisfies readonly GalleryLightboxImage[];

export function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryNoteId = useId();
  const prefersReducedMotion = useReducedMotion();
  const closeLightbox = useCallback(() => setActiveIndex(null), []);

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
        {galleryContent.note.en}
      </p>

      <ul className="gallery-grid" aria-describedby={galleryNoteId}>
        <motion.li
          className="gallery-grid__item gallery-grid__item--logo gallery-card--black"
          {...revealProps(0)}
        >
          <figure className="gallery-card gallery-card--image">
            <button
              className="gallery-card__image-button"
              type="button"
              onClick={() => setActiveIndex(0)}
              aria-label={`Open the ${verifiedImages[0].title} full screen`}
            >
              <span className="gallery-card__media">
                <Image
                  className="gallery-card__image"
                  src={verifiedImages[0].src}
                  alt={verifiedImages[0].alt}
                  width={verifiedImages[0].width}
                  height={verifiedImages[0].height}
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 62vw, 46vw"
                  loading="lazy"
                  draggable={false}
                />
                <span className="gallery-card__expand" aria-hidden="true">
                  <Expand />
                </span>
              </span>
              <span className="gallery-card__caption">
                <span className="gallery-card__eyebrow">{galleryContent.verifiedLabel.en}</span>
                <span className="gallery-card__title">
                  {verifiedImages[0].title}
                </span>
                <span className="gallery-card__action">{galleryContent.viewLabel.en}</span>
              </span>
            </button>
          </figure>
        </motion.li>

        {galleryPlaceholders.map((slot, index) => {
          const titleId = `future-gallery-photo-${slot.number}`;

          return (
            <motion.li
              className={`gallery-grid__item gallery-grid__item--${slot.size} gallery-card--${slot.tone}`}
              key={slot.number}
              {...revealProps(index + 1)}
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
                  <p className="gallery-card__eyebrow">{galleryContent.placeholderLabel.en}</p>
                  <h3 id={titleId}>{slot.title.en}</h3>
                  <p>{slot.description.en}</p>
                </div>
              </article>
            </motion.li>
          );
        })}
      </ul>

      <GalleryLightbox
        images={verifiedImages}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}

export default GalleryGrid;
