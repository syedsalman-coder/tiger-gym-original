import Image from "next/image";
import { site } from "@/data/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
  decorative?: boolean;
};

export default function Logo({
  className = "",
  priority = false,
  decorative = false,
}: LogoProps) {
  return (
    <Image
      className={className}
      src="/tiger-logo.png"
      alt={decorative ? "" : `${site.fullName.en} logo`}
      width={1233}
      height={865}
      priority={priority}
      sizes="(max-width: 768px) 70vw, 420px"
    />
  );
}
