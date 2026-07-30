import {
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  Target,
} from "lucide-react";

import MagneticButton from "@/components/shared/MagneticButton";
import { membershipContent } from "@/data/membership-options";
import { site } from "@/data/site";
import {
  getLocalizedValue,
  localizePath,
  type Locale,
} from "@/i18n/config";

export default function MembershipCTA({
  locale,
}: {
  locale: Locale;
}) {
  const content = membershipContent.homeCta;

  const text = (
    value: Parameters<typeof getLocalizedValue>[0],
  ) => getLocalizedValue(value, locale);

  const labels =
    locale === "ar"
      ? {
          sectionNumber: "04",
          sectionLabel: "بدء العضوية",
          pathway: "مسار الاستفسار",
          steps: [
            {
              number: "01",
              title: "حدّد هدفك",
              description:
                "أخبر الفريق بنوع التدريب الذي تبحث عنه.",
            },
            {
              number: "02",
              title: "تأكّد من الخيارات",
              description:
                "استفسر عن العضويات وخيارات الدخول المتاحة حاليًا.",
            },
            {
              number: "03",
              title: "خطّط لزيارتك",
              description:
                "اختر الوقت المناسب وتعرّف إلى موقع النادي.",
            },
          ],
          membership: "استكشف العضوية",
          whatsapp: "تواصل عبر واتساب",          directContact: "تواصل مباشر مع فريق Tiger Gym",
        }
      : {
          sectionNumber: "04",
          sectionLabel: "Start membership",
          pathway: "Enquiry pathway",
          steps: [
            {
              number: "01",
              title: "Define your goal",
              description:
                "Tell the team what kind of training you are looking for.",
            },
            {
              number: "02",
              title: "Confirm your options",
              description:
                "Ask about current memberships and training access.",
            },
            {
              number: "03",
              title: "Plan your visit",
              description:
                "Choose a suitable time and locate the gym.",
            },
          ],
          membership: "Explore membership",
          whatsapp: "Message on WhatsApp",          directContact: "Direct contact with the Tiger Gym team",
        };

  const icons = [Target, MessageCircle, CalendarDays];

  return (
    <section className="membership-concierge section-space">
      <div className="page-shell">
        <div className="membership-concierge__heading">
          <div
            className="membership-concierge__meta"
            data-reveal
          >
            <span>
              {labels.sectionNumber}
            </span>

            <span data-divider />

            <strong>
              {labels.sectionLabel}
            </strong>
          </div>

          <div
            className="membership-concierge__title"
            data-reveal
          >
            <span className="eyebrow">
              {text(content.eyebrow)}
            </span>

            <h2>
              {text(content.title)}
            </h2>

            <p>
              {text(content.description)}
            </p>
          </div>
        </div>

        <div className="membership-concierge__layout">
          <div
            className="membership-concierge__pathway"
            data-reveal
          >
            <div className="membership-concierge__pathway-header">
              <span>
                {labels.pathway}
              </span>

              <span>
                TG / 04
              </span>
            </div>

            <div className="membership-concierge__steps">
              {labels.steps.map((step, index) => {
                const Icon = icons[index];

                return (
                  <article
                    className="membership-concierge__step"
                    key={step.number}
                    data-stagger-card
                  >
                    <div className="membership-concierge__step-top">
                      <span>
                        {step.number}
                      </span>

                      <Icon
                        size={23}
                        strokeWidth={1.35}
                        aria-hidden="true"
                      />
                    </div>

                    <h3>
                      {step.title}
                    </h3>

                    <p>
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <aside
            className="membership-concierge__contact"
            data-reveal
          >
            <div
              className="membership-concierge__contact-mark"
              aria-hidden="true"
            >
              <span />
              <span />
              <strong>
                TG
              </strong>
            </div>

            <div className="membership-concierge__contact-copy">
              <span className="eyebrow">
                {labels.directContact}
              </span>

              <div className="membership-concierge__actions">
                <MagneticButton
                  href={localizePath(locale, "/membership")}
                >
                  {labels.membership}

                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                  />
                </MagneticButton>

                <MagneticButton
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                >
                  <MessageCircle
                    size={17}
                    aria-hidden="true"
                  />

                  {labels.whatsapp}
                </MagneticButton>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}