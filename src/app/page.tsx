import type { Metadata } from "next";
import FacilityPreview from "@/components/home/FacilityPreview";
import HomeHero from "@/components/home/HomeHero";
import HomeIntro from "@/components/home/HomeIntro";
import HomeLoader from "@/components/home/HomeLoader";
import LocationPreview from "@/components/home/LocationPreview";
import MembershipCTA from "@/components/home/MembershipCTA";

export const metadata: Metadata = {
  title: "Tiger Gym | Fitness Center in Salmiya, Kuwait",
  description:
    "Tiger Gym is a focused strength and fitness center in Salmiya, Kuwait.",
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
