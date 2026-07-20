"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Expand, ImagePlus } from "lucide-react";
import { useCallback, useId, useState } from "react";
import GalleryLightbox, { type GalleryLightboxImage } from "./GalleryLightbox";

const verifiedImages = [
  {
    src: "/tiger-logo.png",
    alt: "Tiger Gym Fitness Center logo with a yellow tiger and kettlebell emblem on a black circular badge.",
    title: "Tiger Gym Fitness Center logo",
    description:
      "The official yellow-and-black Tiger Gym brand mark supplied with this website.",
    width: 1233,
    height: 865,
  },
] as const satisfies readonly GalleryLightboxImage[];

const futurePhotoSlots = [
  {
    number: "01",
    title: "Future facility photo",
    description: "Reserved for a verified Tiger Gym facility photograph.",
    size: "tall",
    tone: "yellow",
  },
  {
    number: "02",
    title: "Future training photo",
    description: "Reserved for a verified Tiger Gym training photograph.",
    size: "standard",
    tone: "black",
  },
  {
    number: "03",
    title: "Future facility photo",
    description: "Reserved for another verified Tiger Gym facility photograph.",
    size: "compact",
    tone: "black",
  },
  {
    number: "04",
    title: "Future training photo",
    description: "Reserved for another verified Tiger Gym training photograph.",
    size: "wide",
    tone: "yellow",
  },
  {
    number: "05",
    title: "Future gallery photo",
    description: "Reserved until an approved Tiger Gym photograph is supplied.",
    size: "standard",
    tone: "black",
  },
] as const;

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
        One verified brand image is available. Future photo spaces are clearly
        marked and contain no stock or invented imagery.
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
              aria-label="Open the Tiger Gym Fitness Center logo full screen"
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
                <span className="gallery-card__eyebrow">Verified image</span>
                <span className="gallery-card__title">
                  Tiger Gym Fitness Center logo
                </span>
                <span className="gallery-card__action">View full screen</span>
              </span>
            </button>
          </figure>
        </motion.li>

        {futurePhotoSlots.map((slot, index) => {
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
                  <p className="gallery-card__eyebrow">Photo placeholder</p>
                  <h3 id={titleId}>{slot.title}</h3>
                  <p>{slot.description}</p>
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
