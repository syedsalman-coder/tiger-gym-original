import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";

import type { ContentStatus, LocalizedText } from "@/data/types";
import { getLocalizedValue, type Locale } from "@/i18n/config";

type ContentStatusNoticeProps = {
  locale: Locale;
  status: ContentStatus;
  title: LocalizedText;
  description: LocalizedText;
  note?: LocalizedText;
};

const statusIcons = {
  confirmed: CheckCircle2,
  demo: Clock3,
  pending: AlertTriangle,
} as const;

export default function ContentStatusNotice({
  locale,
  status,
  title,
  description,
  note,
}: ContentStatusNoticeProps) {
  const Icon = statusIcons[status];
  const label = locale === "ar" ? "حالة المحتوى" : "Content status";
  const statusLabel =
    locale === "ar"
      ? {
          confirmed: "مؤكّد",
          demo: "نسخة تجريبية",
          pending: "قيد التأكيد",
        }[status]
      : {
          confirmed: "Confirmed",
          demo: "Demo copy",
          pending: "Pending confirmation",
        }[status];

  const text = (value: LocalizedText) => getLocalizedValue(value, locale);

  return (
    <aside
      className={`content-status content-status--${status}`}
      role="status"
      aria-label={label}
      data-reveal
    >
      <div className="content-status__icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.5} />
      </div>

      <div className="content-status__copy">
        <span>{statusLabel}</span>
        <h3>{text(title)}</h3>
        <p>{text(description)}</p>
        {note ? <small>{text(note)}</small> : null}
      </div>
    </aside>
  );
}
