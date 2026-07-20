type SectionHeadingProps = {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "dark" | "yellow";
};

export default function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  tone = "dark",
}: SectionHeadingProps) {
  return (
    <header className={`section-title section-title--${tone}`} data-reveal>
      <div className="section-title__meta">
        <span>{number}</span>
        <span data-divider />
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2 className="reveal-mask"><span data-heading-line>{title}</span></h2>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}
