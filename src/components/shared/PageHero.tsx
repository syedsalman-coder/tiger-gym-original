import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

type PageHeroProps = {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  nextLabel?: string;
  nextHref?: string;
};

export default function PageHero({
  index,
  eyebrow,
  title,
  description,
  nextLabel,
  nextHref,
}: PageHeroProps) {
  return (
    <section className="page-hero" aria-labelledby="page-heading">
      <div className="page-hero__grid" aria-hidden="true" />
      <div className="page-shell page-hero__inner">
        <div className="page-hero__meta">
          <span>{index}</span>
          <span>{eyebrow}</span>
        </div>
        <h1 id="page-heading">{title}</h1>
        <div className="page-hero__bottom">
          <p>{description}</p>
          {nextHref && nextLabel ? (
            <Link href={nextHref}>
              {nextLabel} <ArrowDownRight size={18} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
