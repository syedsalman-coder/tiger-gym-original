import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function MapEmbed({ locale }: { locale: Locale }) {
  return (
    <div className="map-embed">
      <iframe
        className="map-embed__frame"
        src={site.mapEmbedUrl}
        width="100%"
        height="520"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title={getDictionary(locale).accessibility.map}
      />
    </div>
  );
}
