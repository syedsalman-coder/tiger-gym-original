"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { navigation, site } from "@/data/site";

type MobileMenuProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export default function MobileMenu({ open, pathname, onClose }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();
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
          aria-label="Mobile navigation"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduceMotion ? 0.12 : 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mobile-nav__plate" aria-hidden="true" />
          <nav aria-label="Mobile">
            {navigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.045 }}
              >
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  className={pathname === item.href ? "is-active" : undefined}
                  href={item.href}
                  onClick={onClose}
                >
                  <span>0{index + 1}</span>
                  {item.label.en}
                </Link>
              </motion.div>
            ))}
          </nav>
          <Link className="mobile-nav__join" href="/membership" onClick={onClose}>
            Join {site.name.en} <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
