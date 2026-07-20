import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/shared/Logo";
import MagneticButton from "@/components/shared/MagneticButton";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import TiltCard from "@/components/shared/TiltCard";
import { philosophy } from "@/data/site";

export const metadata: Metadata = {
  title: "About Tiger Gym | Salmiya, Kuwait",
  description:
    "Learn about Tiger Gym's focused approach to strength, discipline and consistent training in Salmiya, Kuwait.",
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        index="02 / About"
        eyebrow="Our approach"
        title="Built around the work."
        description="Tiger Gym is a bodybuilding, strength and fitness center in Salmiya, Kuwait."
        nextLabel="Our philosophy"
        nextHref="#philosophy"
      />

      <section className="about-story section-space">
        <div className="page-shell about-story__grid">
          <div className="about-story__logo" data-logo-parallax data-reveal>
            <div className="plate-rings" aria-hidden="true"><span /><span /><span /></div>
            <Logo />
          </div>
          <div className="about-story__copy" data-reveal>
            <span className="eyebrow">Tiger Gym Fitness Center</span>
            <h2>Strength is built through consistency.</h2>
            <p>
              Tiger Gym brings strength training, free weights, cardio and
              functional training together in a focused environment for people
              who want purpose in every session.
            </p>
            <p>
              The philosophy is direct: show up, train with intent and give
              progress time to compound. Every session is a clear commitment
              to the work in front of you.
            </p>
            <Link className="text-link" href="/facilities">Explore the training areas <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="philosophy section-space" id="philosophy">
        <div className="page-shell">
          <SectionHeading number="02.1" eyebrow="Training philosophy" title="The standard stays high." />
          <div className="philosophy__grid">
            {philosophy.map((item) => (
              <TiltCard key={item.number}>
                <article className="philosophy__card" data-stagger-card data-cursor>
                  <span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p>
                </article>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="inline-cta section-space">
        <div className="page-shell inline-cta__panel" data-reveal>
          <span className="eyebrow">Your next step</span>
          <h2>Bring intent.<br />We’ll make room for the work.</h2>
          <MagneticButton href="/membership">Ask about membership</MagneticButton>
        </div>
      </section>
    </main>
  );
}
