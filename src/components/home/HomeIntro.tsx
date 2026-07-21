import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/shared/Logo";
import SectionHeading from "@/components/shared/SectionHeading";
import { pageContent } from "@/data/pages";
import { getLocalizedValue, localizePath, type Locale } from "@/i18n/config";

export default function HomeIntro({ locale }: { locale: Locale }) {
  const content = pageContent.home.intro;
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);

  return (
    <section className="home-intro section-space" id="home-intro">
      <div className="page-shell">
        <SectionHeading
          number={text(content.number)}
          eyebrow={text(content.eyebrow)}
          title={text(content.title)}
          description={text(content.description)}
        />
        <div className="home-intro__body">
          <div className="home-intro__logo" data-logo-parallax data-reveal><Logo locale={locale} /></div>
          <div className="home-intro__copy" data-reveal>
            <p>{text(content.body)}</p>
            <Link href={localizePath(locale, "/about")}>{text(content.linkLabel)} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
      <div className="brand-ticker" aria-hidden="true">
        <div><span>{text(content.ticker)}</span><span>{text(content.ticker)}</span></div>
      </div>
    </section>
  );
}
