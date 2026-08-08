"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/Logo";
import { navigation, site } from "@/data/site";
import { getLocalizedValue, localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

export default function Navigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dictionary = getDictionary(locale);
  const navId = `primary-navigation-${locale}`;
  const mobileNavId = `mobile-navigation-${locale}`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const targets = [
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>("footer"),
      document.querySelector<HTMLElement>(".mobile-action-bar"),
    ]
      .filter((element): element is HTMLElement => element !== null);
    const previousInert = targets.map((element) => element.inert);
    const previousAriaHidden = targets.map((element) => element.getAttribute("aria-hidden"));
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.mobileMenuOpen = "true";
    targets.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.documentElement.dataset.mobileMenuOpen;
      targets.forEach((element, index) => {
        element.inert = previousInert[index];
        const previousValue = previousAriaHidden[index];
        if (previousValue === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", previousValue);
        }
      });
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      restoreFocus.current = true;
    } else if (restoreFocus.current) {
      restoreFocus.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  const solid = pathname !== localizePath(locale, "/") || scrolled || menuOpen;
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);

  return (
    <>
      <header className={`main-nav ${solid ? "main-nav--solid" : ""} ${menuOpen ? "main-nav--open" : ""}`} data-navigation-shell>
        <Link
          className="main-nav__brand"
          href={localizePath(locale, "/")}
          aria-label={dictionary.accessibility.home}
          aria-hidden={menuOpen}
          tabIndex={menuOpen ? -1 : undefined}
        >
          <Logo locale={locale} decorative priority sizes="64px" />
          <span><strong>{text(site.name)}</strong><small>{text(site.descriptor)}</small></span>
        </Link>

        <nav id={navId} className="main-nav__links" aria-label={dictionary.accessibility.primaryNavigation}>
          {navigation.map((item) => {
            const href = localizePath(locale, item.href);
            return <Link className={pathname === href ? "is-active" : undefined} href={href} key={item.href} aria-current={pathname === href ? "page" : undefined}>{text(item.label)}</Link>;
          })}
        </nav>

        <LanguageSwitcher locale={locale} disabled={menuOpen} />

        <Link
          className="main-nav__join"
          href={localizePath(locale, "/membership")}
          aria-hidden={menuOpen}
          tabIndex={menuOpen ? -1 : undefined}
        >
          {dictionary.common.joinNow} <ArrowUpRight size={14} aria-hidden="true" />
        </Link>

        <button
          ref={menuButtonRef}
          className={`main-nav__toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? dictionary.accessibility.closeMenu : dictionary.accessibility.openMenu}
          aria-expanded={menuOpen}
          aria-controls={mobileNavId}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span /><span />
        </button>
      </header>
      <MobileMenu id={mobileNavId} locale={locale} open={menuOpen} pathname={pathname} onClose={closeMenu} />
    </>
  );
}
