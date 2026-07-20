import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/shared/Logo";
import SectionHeading from "@/components/shared/SectionHeading";

export default function HomeIntro() {
  return (
    <section className="home-intro section-space" id="home-intro">
      <div className="page-shell">
        <SectionHeading
          number="02"
          eyebrow="Tiger Gym"
          title="Purpose in every rep."
          description="A strength and fitness center in Salmiya built around disciplined training and serious progress."
        />
        <div className="home-intro__body">
          <div className="home-intro__logo" data-logo-parallax data-reveal><Logo /></div>
          <div className="home-intro__copy" data-reveal>
            <p>Strength training, free weights, cardio and functional training come together in one focused environment.</p>
            <Link href="/about">Discover Tiger Gym <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
      <div className="brand-ticker" aria-hidden="true">
        <div><span>Strength · Discipline · Performance · Progress ·</span><span>Strength · Discipline · Performance · Progress ·</span></div>
      </div>
    </section>
  );
}
