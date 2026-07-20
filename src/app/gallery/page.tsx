import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Gallery | Tiger Gym Salmiya",
  description:
    "View the verified Tiger Gym brand asset and prepared spaces for future approved gym photography.",
};

export default function GalleryPage() {
  return (
    <main id="main-content">
      <PageHero
        index="05 / Gallery"
        eyebrow="Tiger Gym visuals"
        title="The brand. The floor—coming next."
        description="The official Tiger Gym mark leads a gallery prepared for future approved photography from the training floor."
      />
      <section className="gallery-page section-space">
        <div className="page-shell"><GalleryGrid /></div>
      </section>
    </main>
  );
}
