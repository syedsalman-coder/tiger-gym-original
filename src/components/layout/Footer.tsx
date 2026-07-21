import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { pageContent } from "@/data/pages";
import { navigation, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__main">
        <div className="site-footer__identity">
          <Link href="/" aria-label={`${site.name.en} home`}><Logo decorative /></Link>
          <p>{pageContent.footer.taglineLineOne.en}<br />{pageContent.footer.taglineLineTwo.en}</p>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label.en}</Link>)}
        </nav>
        <div className="site-footer__contact">
          <span>{pageContent.footer.contactLabel.en}</span>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <a href={site.whatsappHref} target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </div>
      </div>
      <div className="page-shell site-footer__bottom">
        <span>© {new Date().getFullYear()} {site.fullName.en}</span>
        <span>{site.city.en} · {site.country.en}</span>
      </div>
    </footer>
  );
}
