"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/Logo";
import { navigation } from "@/data/site";
import MobileMenu from "./MobileMenu";

export default function Navigation() {
  const pathname = usePathname();
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
    const targets = [document.querySelector<HTMLElement>("main"), document.querySelector<HTMLElement>("footer")]
      .filter((element): element is HTMLElement => element !== null);
    const previousInert = targets.map((element) => element.inert);
    document.body.style.overflow = "hidden";
    targets.forEach((element) => { element.inert = true; });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      targets.forEach((element, index) => { element.inert = previousInert[index]; });
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

  const solid = pathname !== "/" || scrolled || menuOpen;

  return (
    <>
      <header className={`main-nav ${solid ? "main-nav--solid" : ""} ${menuOpen ? "main-nav--open" : ""}`}>
        <Link
          className="main-nav__brand"
          href="/"
          aria-label="Tiger Gym home"
          aria-hidden={menuOpen}
          tabIndex={menuOpen ? -1 : undefined}
        >
          <Logo decorative priority />
          <span><strong>Tiger Gym</strong><small>Fitness Center</small></span>
        </Link>

        <nav className="main-nav__links" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              className={pathname === item.href ? "is-active" : undefined}
              href={item.href}
              key={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="main-nav__join"
          href="/membership"
          aria-hidden={menuOpen}
          tabIndex={menuOpen ? -1 : undefined}
        >
          Join now <ArrowUpRight size={14} aria-hidden="true" />
        </Link>

        <button
          ref={menuButtonRef}
          className={`main-nav__toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span /><span />
        </button>
      </header>
      <MobileMenu open={menuOpen} pathname={pathname} onClose={closeMenu} />
    </>
  );
}
