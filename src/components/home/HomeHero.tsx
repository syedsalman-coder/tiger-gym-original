"use client";

import dynamic from "next/dynamic";
import { ArrowDown, Crosshair } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import Logo from "@/components/shared/Logo";
import { pageContent } from "@/data/pages";
import { site } from "@/data/site";

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

export default function HomeHero() {
  const content = pageContent.home.hero;

  return (
    <section className="home-hero" data-home-hero aria-labelledby="home-heading">
      <div className="home-hero__stage">
        <div className="home-hero__grid" aria-hidden="true" />
        <div className="home-hero__light" aria-hidden="true" />
        <div className="home-hero__scene" data-home-scene><DumbbellScene /></div>

        <div className="page-shell home-hero__content">
          <div className="home-hero__label">
            <Crosshair size={14} aria-hidden="true" /> {site.name.en} · {site.locality.en}
          </div>
          <div className="home-hero__title">
            <span className="home-hero__index">{content.index.en}</span>
            <h1 id="home-heading">
              <span data-home-title-line="one">{content.titleLines[0].en}</span>
              <span data-home-title-line="two">{content.titleLines[1].en}</span>
              <span data-home-title-line="three">{content.titleLines[2].en}</span>
            </h1>
          </div>

          <div className="home-hero__bottom" data-home-copy>
            <div className="home-hero__statement">
              <Logo decorative priority />
              <p>{site.description.en}</p>
            </div>
            <div className="home-hero__actions">
              <MagneticButton href="/membership">{content.joinLabel.en}</MagneticButton>
              <MagneticButton href="/facilities" variant="outline">{content.facilitiesLabel.en}</MagneticButton>
            </div>
          </div>

          <a className="home-hero__scroll" href="#home-intro" aria-label={`Scroll to the ${site.name.en} introduction`}>
            {content.scrollLabel.en} <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
