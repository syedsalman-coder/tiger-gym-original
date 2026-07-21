"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { navigation } from "@/data/site";
import { getLocalizedValue, localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";

type MobileMenuProps = {
  locale: Locale;
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export default function MobileMenu({ locale, open, pathname, onClose }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();
  const dictionary = getDictionary(locale);
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 100);
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog?.addEventListener("keydown", trapFocus);
    return () => {
      window.clearTimeout(focusTimer);
      dialog?.removeEventListener("keydown", trapFocus);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialogRef}
          id="mobile-navigation"
          className="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label={dictionary.accessibility.mobileNavigation}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduceMotion ? 0.12 : 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mobile-nav__plate" aria-hidden="true" />
          <nav aria-label={dictionary.accessibility.mobileNavigation}>
            {navigation.map((item, index) => {
              const href = localizePath(locale, item.href);
              return (
              <motion.div
                key={item.href}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.045 }}
              >
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  className={pathname === href ? "is-active" : undefined}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={onClose}
                >
                  <span>0{index + 1}</span>
                  {text(item.label)}
                </Link>
              </motion.div>
              );
            })}
          </nav>
          <div className="mobile-nav__footer">
            <LanguageSwitcher locale={locale} mobile />
            <Link className="mobile-nav__join" href={localizePath(locale, "/membership")} onClick={onClose}>
              {dictionary.common.joinGym} <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
