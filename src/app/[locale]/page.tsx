import type { Metadata } from "next";
import FacilityPreview from "@/components/home/FacilityPreview";
import HomeHero from "@/components/home/HomeHero";
import HomeIntro from "@/components/home/HomeIntro";
import HomeLoader from "@/components/home/HomeLoader";
import HomeScrollStory from "@/components/home/HomeScrollStory";
import LocationPreview from "@/components/home/LocationPreview";
import MembershipCTA from "@/components/home/MembershipCTA";
import { pageContent } from "@/data/pages";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { requireLocale, type LocaleParams } from "@/i18n/server";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await requireLocale(params);
  return createLocalizedMetadata(locale, "/", pageContent.home.metadata);
}

export default async function HomePage({ params }: { params: LocaleParams }) {
  const locale = await requireLocale(params);

  return (
    <>
      <HomeLoader locale={locale} />
      <main id="main-content">
        <HomeHero locale={locale} />
        <HomeIntro locale={locale} />
        <HomeScrollStory locale={locale} />
        <FacilityPreview locale={locale} />
        <MembershipCTA locale={locale} />
        <LocationPreview locale={locale} />
      </main>
    </>
  );
}
