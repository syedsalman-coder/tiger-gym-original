import Image from "next/image";
import { site } from "@/data/site";
import { getLocalizedValue, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type LogoProps = {
  className?: string;
  priority?: boolean;
  decorative?: boolean;
  locale: Locale;
};

export default function Logo({
  className = "",
  priority = false,
  decorative = false,
  locale,
}: LogoProps) {
  return (
    <Image
      className={className}
      src="/tiger-logo.png"
      alt={decorative ? "" : getDictionary(locale).accessibility.logo || getLocalizedValue(site.fullName, locale)}
      width={1233}
      height={865}
      priority={priority}
      sizes="(max-width: 768px) 70vw, 420px"
    />
  );
}
