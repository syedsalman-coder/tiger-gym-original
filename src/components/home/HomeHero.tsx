"use client";

import dynamic from "next/dynamic";
import { ArrowDown, Crosshair } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import Logo from "@/components/shared/Logo";
import { pageContent } from "@/data/pages";
import { site } from "@/data/site";
import { getLocalizedValue, localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const DumbbellScene = dynamic(() => import("./DumbbellScene"), {
  ssr: false,
  loading: () => (
    <div className="dumbbell-fallback" aria-hidden="true">
      <span className="dumbbell-fallback__bar" />
      <span className="dumbbell-fallback__plate dumbbell-fallback__plate--left" />
      <span className="dumbbell-fallback__plate dumbbell-fallback__plate--right" />
    </div>
  ),
});

export default function HomeHero({ locale }: { locale: Locale }) {
  const content = pageContent.home.hero;
  const dictionary = getDictionary(locale);
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);

  return (
    <section className="home-hero" data-home-hero aria-labelledby="home-heading">
      <div className="home-hero__stage">
        <div className="home-hero__grid" aria-hidden="true" />
        <div className="home-hero__light" aria-hidden="true" />
        <div className="home-hero__scene" data-home-scene><DumbbellScene locale={locale} /></div>

        <div className="page-shell home-hero__content">
          <div className="home-hero__label">
            <Crosshair size={14} aria-hidden="true" /> {text(site.name)} · {text(site.locality)}
          </div>
          <div className="home-hero__title">
            <span className="home-hero__index">{text(content.index)}</span>
            <h1 id="home-heading">
              <span data-home-title-line="one">{text(content.titleLines[0])}</span>
              <span data-home-title-line="two">{text(content.titleLines[1])}</span>
              <span data-home-title-line="three">{text(content.titleLines[2])}</span>
            </h1>
          </div>

          <div className="home-hero__bottom" data-home-copy>
            <div className="home-hero__statement">
              <Logo locale={locale} decorative priority />
              <p>{text(site.description)}</p>
            </div>
            <div className="home-hero__actions">
              <MagneticButton href={localizePath(locale, "/membership")}>{text(content.joinLabel)}</MagneticButton>
              <MagneticButton href={localizePath(locale, "/facilities")} variant="outline">{text(content.facilitiesLabel)}</MagneticButton>
            </div>
          </div>

          <a className="home-hero__scroll" href="#home-intro" aria-label={dictionary.accessibility.scrollToIntro}>
            {text(content.scrollLabel)} <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
