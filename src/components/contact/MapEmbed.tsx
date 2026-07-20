import { site } from "@/data/site";

export default function MapEmbed() {
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
        title="Tiger Gym location in Salmiya, Kuwait"
      />
    </div>
  );
}
