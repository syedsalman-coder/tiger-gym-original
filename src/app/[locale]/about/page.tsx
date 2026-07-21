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
import { getLocalizedValue, localizePath } from "@/i18n/config";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { requireLocale, type LocaleParams } from "@/i18n/server";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await requireLocale(params);
  return createLocalizedMetadata(locale, "/about", pageContent.about.metadata);
}

export default async function AboutPage({ params }: { params: LocaleParams }) {
  const locale = await requireLocale(params);
  const content = pageContent.about;
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);

  return (
    <main id="main-content">
      <PageHero
        index={text(content.hero.index)}
        eyebrow={text(content.hero.eyebrow)}
        title={text(content.hero.title)}
        description={text(content.hero.description)}
        nextLabel={text(content.hero.nextLabel)}
        nextHref={content.hero.nextHref}
      />

      <section className="about-story section-space">
        <div className="page-shell about-story__grid">
          <div className="about-story__logo" data-logo-parallax data-reveal>
            <div className="plate-rings" aria-hidden="true"><span /><span /><span /></div>
            <Logo locale={locale} />
          </div>
          <div className="about-story__copy" data-reveal>
            <span className="eyebrow">{text(site.fullName)}</span>
            <h2>{text(content.story.title)}</h2>
            {content.story.paragraphs.map((paragraph) => <p key={paragraph.en}>{text(paragraph)}</p>)}
            <Link className="text-link" href={localizePath(locale, "/facilities")}>{text(content.story.linkLabel)} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="philosophy section-space" id="philosophy">
        <div className="page-shell">
          <SectionHeading number={text(content.philosophy.number)} eyebrow={text(content.philosophy.eyebrow)} title={text(content.philosophy.title)} />
          <div className="philosophy__grid">
            {content.philosophy.items.map((item) => (
              <TiltCard key={item.number}>
                <article className="philosophy__card" data-stagger-card data-cursor>
                  <span>{item.number}</span><h3>{text(item.title)}</h3><p>{text(item.text)}</p>
                </article>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="inline-cta section-space">
        <div className="page-shell inline-cta__panel" data-reveal>
          <span className="eyebrow">{text(content.cta.eyebrow)}</span>
          <h2>{text(content.cta.titleLineOne)}<br />{text(content.cta.titleLineTwo)}</h2>
          <MagneticButton href={localizePath(locale, "/membership")}>{text(content.cta.label)}</MagneticButton>
        </div>
      </section>
    </main>
  );
}
