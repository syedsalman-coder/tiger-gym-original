import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/shared/Logo";
import SectionHeading from "@/components/shared/SectionHeading";
import { pageContent } from "@/data/pages";

export default function HomeIntro() {
  const content = pageContent.home.intro;

  return (
    <section className="home-intro section-space" id="home-intro">
      <div className="page-shell">
        <SectionHeading
          number={content.number.en}
          eyebrow={content.eyebrow.en}
          title={content.title.en}
          description={content.description.en}
        />
        <div className="home-intro__body">
          <div className="home-intro__logo" data-logo-parallax data-reveal><Logo /></div>
          <div className="home-intro__copy" data-reveal>
            <p>{content.body.en}</p>
            <Link href="/about">{content.linkLabel.en} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
      <div className="brand-ticker" aria-hidden="true">
        <div><span>{content.ticker.en}</span><span>{content.ticker.en}</span></div>
      </div>
    </section>
  );
}
