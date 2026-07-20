import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { navigation, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__main">
        <div className="site-footer__identity">
          <Link href="/" aria-label="Tiger Gym home"><Logo decorative /></Link>
          <p>Built for strength.<br />Made for progress.</p>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <div className="site-footer__contact">
          <span>Speak with the gym</span>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <a href={site.whatsappHref} target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </div>
      </div>
      <div className="page-shell site-footer__bottom">
        <span>© {new Date().getFullYear()} Tiger Gym Fitness Center</span>
        <span>Salmiya · Kuwait</span>
      </div>
    </footer>
  );
}
