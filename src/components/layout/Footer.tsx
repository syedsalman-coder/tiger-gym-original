import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { pageContent } from "@/data/pages";
import { navigation, site } from "@/data/site";
import { getLocalizedValue, localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Footer({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);

  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__main">
        <div className="site-footer__identity">
          <Link href={localizePath(locale, "/")} aria-label={dictionary.accessibility.home}><Logo locale={locale} decorative /></Link>
          <p>{text(pageContent.footer.taglineLineOne)}<br />{text(pageContent.footer.taglineLineTwo)}</p>
        </div>
        <nav aria-label={dictionary.accessibility.footerNavigation}>
          {navigation.map((item) => <Link href={localizePath(locale, item.href)} key={item.href}>{text(item.label)}</Link>)}
        </nav>
        <div className="site-footer__contact">
          <span>{text(pageContent.footer.contactLabel)}</span>
          <a className="bidi-isolate" href={site.phoneHref}>{site.phoneDisplay}</a>
          <a href={site.whatsappHref} target="_blank" rel="noreferrer">{dictionary.common.whatsapp} ↗</a>
        </div>
      </div>
      <div className="page-shell site-footer__bottom">
        <span>© {new Date().getFullYear()} {text(site.fullName)}</span>
        <span>{text(site.city)} · {text(site.country)}</span>
      </div>
    </footer>
  );
}
