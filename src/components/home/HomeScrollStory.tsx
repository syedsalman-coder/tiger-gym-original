import type { CSSProperties } from "react";

import { pageContent } from "@/data/pages";
import {
  getLocalizedValue,
  type Locale,
} from "@/i18n/config";

export default function HomeScrollStory({
  locale,
}: {
  locale: Locale;
}) {
  const content = pageContent.home.scrollStory;

  const text = (
    value: Parameters<typeof getLocalizedValue>[0],
  ) => getLocalizedValue(value, locale);

  return (
    <section
      className="home-scroll-story"
      aria-label={text(content.ariaLabel)}
      data-home-scroll-story
      data-performance-mode="css-sticky"
      data-motion-budget="transform-opacity"
      data-reduced-motion-safe="true"
    >
      <div className="home-scroll-story__sticky">
        <div className="page-shell home-scroll-story__layout">
          <header
            className="home-scroll-story__header"
            data-reveal
          >
            <div className="home-scroll-story__meta">
              <span>{text(content.number)}</span>
              <span data-divider />
              <strong>{text(content.eyebrow)}</strong>
            </div>

            <div>
              <span className="eyebrow">
                {text(content.kicker)}
              </span>
              <h2>{text(content.title)}</h2>
              <p>{text(content.description)}</p>
            </div>
          </header>

          <div
            className="home-scroll-story__visual"
            aria-hidden="true"
          >
            <span className="home-scroll-story__orb home-scroll-story__orb--outer" />
            <span className="home-scroll-story__orb home-scroll-story__orb--inner" />
            <span className="home-scroll-story__sweep" />
            <strong>TG</strong>
          </div>

          <div className="home-scroll-story__chapters">
            {content.chapters.map((chapter, index) => (
              <article
                className="home-scroll-story__chapter"
                data-story-step={chapter.step}
                data-stagger-card
                key={chapter.step}
                style={{
                  "--story-index": index,
                } as CSSProperties}
              >
                <span className="home-scroll-story__chapter-step">
                  {chapter.step}
                </span>
                <h3>{text(chapter.title)}</h3>
                <p>{text(chapter.description)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
