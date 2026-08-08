"use client";

import {
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function MobileActionBar({
  locale,
}: {
  locale: Locale;
}) {
  const dictionary = getDictionary(locale);
  const [footerVisible, setFooterVisible] =
    useState(false);
  const [pastHero, setPastHero] =
    useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setPastHero(window.scrollY > window.innerHeight * 0.9);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const footer =
      document.querySelector("footer");

    if (
      !footer ||
      typeof IntersectionObserver ===
        "undefined"
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setFooterVisible(
            entry.isIntersecting,
          );
        },
        {
          threshold: 0.04,
          rootMargin:
            "0px 0px 20px 0px",
        },
      );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <aside
      className={`mobile-action-bar ${
        pastHero
          ? "mobile-action-bar--ready"
          : ""
      } ${
        footerVisible
          ? "mobile-action-bar--footer-visible"
          : ""
      }`}
      aria-label={
        dictionary.accessibility
          .conversionActions
      }
    >
      <a
        className="mobile-action-bar__item mobile-action-bar__item--whatsapp"
        href={site.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={dictionary.common.whatsapp}
        title={dictionary.common.whatsapp}
      >
        <MessageCircle
          size={23}
          strokeWidth={1.9}
          aria-hidden="true"
        />
        <span>
          {dictionary.common.whatsapp}
        </span>
      </a>

      <a
        className="mobile-action-bar__item mobile-action-bar__item--call"
        href={site.phoneHref}
        aria-label={dictionary.common.callNow}
        title={dictionary.common.callNow}
      >
        <Phone
          size={20}
          strokeWidth={1.9}
          aria-hidden="true"
        />
        <span>
          {dictionary.common.callNow}
        </span>
      </a>
    </aside>
  );
}
