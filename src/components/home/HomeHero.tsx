"use client";

import dynamic from "next/dynamic";
import { ArrowDown, Crosshair } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import Logo from "@/components/shared/Logo";

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
  return (
    <section className="home-hero" data-home-hero aria-labelledby="home-heading">
      <div className="home-hero__stage">
        <div className="home-hero__grid" aria-hidden="true" />
        <div className="home-hero__light" aria-hidden="true" />
        <div className="home-hero__scene" data-home-scene><DumbbellScene /></div>

        <div className="page-shell home-hero__content">
          <div className="home-hero__label">
            <Crosshair size={14} aria-hidden="true" /> Tiger Gym · Salmiya, Kuwait
          </div>
          <div className="home-hero__title">
            <span className="home-hero__index">01 / Strength protocol</span>
            <h1 id="home-heading">
              <span data-home-title-line="one">Built</span>
              <span data-home-title-line="two">For</span>
              <span data-home-title-line="three">Strength</span>
            </h1>
          </div>

          <div className="home-hero__bottom" data-home-copy>
            <div className="home-hero__statement">
              <Logo decorative priority />
              <p>A focused training environment for strength, fitness and serious progress.</p>
            </div>
            <div className="home-hero__actions">
              <MagneticButton href="/membership">Join Tiger Gym</MagneticButton>
              <MagneticButton href="/facilities" variant="outline">Explore facilities</MagneticButton>
            </div>
          </div>

          <a className="home-hero__scroll" href="#home-intro" aria-label="Scroll to the Tiger Gym introduction">
            Scroll <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
