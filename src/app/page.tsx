import type { Metadata } from "next";
import FacilityPreview from "@/components/home/FacilityPreview";
import HomeHero from "@/components/home/HomeHero";
import HomeIntro from "@/components/home/HomeIntro";
import HomeLoader from "@/components/home/HomeLoader";
import LocationPreview from "@/components/home/LocationPreview";
import MembershipCTA from "@/components/home/MembershipCTA";
import { pageContent } from "@/data/pages";

export const metadata: Metadata = {
  title: pageContent.home.metadata.title.en,
  description: pageContent.home.metadata.description.en,
};

export default function HomePage() {
  return (
    <>
      <HomeLoader />
      <main id="main-content">
        <HomeHero />
        <HomeIntro />
        <FacilityPreview />
        <MembershipCTA />
        <LocationPreview />
      </main>
    </>
  );
}
