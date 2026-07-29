import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import ContentStatusNotice from "@/components/shared/ContentStatusNotice";
import PageHero from "@/components/shared/PageHero";
import { galleryContent } from "@/data/gallery";
import { getLocalizedValue } from "@/i18n/config";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { requireLocale, type LocaleParams } from "@/i18n/server";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await requireLocale(params);
  return createLocalizedMetadata(locale, "/gallery", galleryContent.metadata);
}

export default async function GalleryPage({ params }: { params: LocaleParams }) {
  const locale = await requireLocale(params);
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);

  return (
    <main id="main-content">
      <PageHero index={text(galleryContent.hero.index)} eyebrow={text(galleryContent.hero.eyebrow)} title={text(galleryContent.hero.title)} description={text(galleryContent.hero.description)} />
      <section className="gallery-page section-space">
        <div className="page-shell">
          <ContentStatusNotice
            locale={locale}
            status="pending"
            title={galleryContent.readiness.title}
            description={galleryContent.readiness.description}
            note={galleryContent.readiness.note}
          />
          <GalleryGrid locale={locale} />
        </div>
      </section>
    </main>
  );
}
