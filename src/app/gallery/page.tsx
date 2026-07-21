import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import PageHero from "@/components/shared/PageHero";
import { galleryContent } from "@/data/gallery";

export const metadata: Metadata = {
  title: galleryContent.metadata.title.en,
  description: galleryContent.metadata.description.en,
};

export default function GalleryPage() {
  return (
    <main id="main-content">
      <PageHero
        index={galleryContent.hero.index.en}
        eyebrow={galleryContent.hero.eyebrow.en}
        title={galleryContent.hero.title.en}
        description={galleryContent.hero.description.en}
      />
      <section className="gallery-page section-space">
        <div className="page-shell"><GalleryGrid /></div>
      </section>
    </main>
  );
}
