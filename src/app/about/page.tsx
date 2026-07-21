import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/shared/Logo";
import MagneticButton from "@/components/shared/MagneticButton";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import TiltCard from "@/components/shared/TiltCard";
import { pageContent } from "@/data/pages";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: pageContent.about.metadata.title.en,
  description: pageContent.about.metadata.description.en,
};

export default function AboutPage() {
  const content = pageContent.about;

  return (
    <main id="main-content">
      <PageHero
        index={content.hero.index.en}
        eyebrow={content.hero.eyebrow.en}
        title={content.hero.title.en}
        description={content.hero.description.en}
        nextLabel={content.hero.nextLabel.en}
        nextHref={content.hero.nextHref}
      />

      <section className="about-story section-space">
        <div className="page-shell about-story__grid">
          <div className="about-story__logo" data-logo-parallax data-reveal>
            <div className="plate-rings" aria-hidden="true"><span /><span /><span /></div>
            <Logo />
          </div>
          <div className="about-story__copy" data-reveal>
            <span className="eyebrow">{site.fullName.en}</span>
            <h2>{content.story.title.en}</h2>
            {content.story.paragraphs.map((paragraph) => <p key={paragraph.en}>{paragraph.en}</p>)}
            <Link className="text-link" href="/facilities">{content.story.linkLabel.en} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="philosophy section-space" id="philosophy">
        <div className="page-shell">
          <SectionHeading number={content.philosophy.number.en} eyebrow={content.philosophy.eyebrow.en} title={content.philosophy.title.en} />
          <div className="philosophy__grid">
            {content.philosophy.items.map((item) => (
              <TiltCard key={item.number}>
                <article className="philosophy__card" data-stagger-card data-cursor>
                  <span>{item.number}</span><h3>{item.title.en}</h3><p>{item.text.en}</p>
                </article>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="inline-cta section-space">
        <div className="page-shell inline-cta__panel" data-reveal>
          <span className="eyebrow">{content.cta.eyebrow.en}</span>
          <h2>{content.cta.titleLineOne.en}<br />{content.cta.titleLineTwo.en}</h2>
          <MagneticButton href="/membership">{content.cta.label.en}</MagneticButton>
        </div>
      </section>
    </main>
  );
}
