import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function MobileActionBar({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const actions = [
    {
      id: "whatsapp",
      href: site.whatsappHref,
      label: dictionary.common.whatsapp,
      icon: MessageCircle,
      external: true,
    },
    {
      id: "call",
      href: site.phoneHref,
      label: dictionary.common.callNow,
      icon: Phone,
      external: false,
    },
  ] as const;

  return (
    <aside className="mobile-action-bar" aria-label={dictionary.accessibility.conversionActions}>
      {actions.map(({ id, href, label, icon: Icon, external }) => (
        <a
          className={`mobile-action-bar__item mobile-action-bar__item--${id}`}
          href={href}
          key={id}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </aside>
  );
}
