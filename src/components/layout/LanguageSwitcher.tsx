"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function LanguageSwitcher({
  locale,
  mobile = false,
  disabled = false,
}: {
  locale: Locale;
  mobile?: boolean;
  disabled?: boolean;
}) {
  const pathname = usePathname();
  const dictionary = getDictionary(locale);

  return (
    <div
      className={`language-switcher ${mobile ? "language-switcher--mobile" : ""}`}
      role="group"
      aria-label={dictionary.accessibility.languageSwitcher}
      aria-hidden={disabled || undefined}
    >
      <Link
        href={switchLocalePath(pathname, "en")}
        hrefLang="en"
        lang="en"
        aria-label={dictionary.accessibility.switchToEnglish}
        aria-current={locale === "en" ? "page" : undefined}
        className={locale === "en" ? "is-active" : undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        EN
      </Link>
      <Link
        href={switchLocalePath(pathname, "ar")}
        hrefLang="ar"
        lang="ar"
        dir="rtl"
        aria-label={dictionary.accessibility.switchToArabic}
        aria-current={locale === "ar" ? "page" : undefined}
        className={locale === "ar" ? "is-active" : undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        عربي
      </Link>
    </div>
  );
}
