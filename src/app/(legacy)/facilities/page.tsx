import { permanentRedirect } from "next/navigation";

export default function LegacyFacilitiesPage() {
  permanentRedirect("/en/facilities");
}
