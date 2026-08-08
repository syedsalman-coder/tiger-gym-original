import {
  ArrowRight,
  BadgePercent,
  CalendarDays,
  MessageCircle,
  Snowflake,
} from "lucide-react";

import {
  membershipContent,
  membershipPlans,
} from "@/data/membership-options";
import { site } from "@/data/site";
import {
  getLocalizedValue,
  type Locale,
} from "@/i18n/config";

export default function MembershipOffers({
  locale,
}: {
  locale: Locale;
}) {
  const content = membershipContent.offer;
  const text = (
    value: Parameters<
      typeof getLocalizedValue
    >[0],
  ) => getLocalizedValue(value, locale);

  const currency = text(content.currency);

  return (
    <section
      className="membership-offers section-space"
      id="membership-offers"
      aria-label={text(content.packagesLabel)}
    >
      <div className="page-shell">
        <header className="membership-offers__heading">
          <div
            className="membership-offers__meta"
            data-reveal
          >
            <span>{text(content.number)}</span>
            <span data-divider />
            <strong>
              {text(content.packagesLabel)}
            </strong>
          </div>

          <div
            className="membership-offers__intro"
            data-reveal
          >
            <span className="eyebrow">
              {text(content.eyebrow)}
            </span>

            <h2>{text(content.title)}</h2>

            <p>{text(content.description)}</p>
          </div>

          <div
            className="membership-offers__badge"
            aria-label={text(content.savingBadge)}
            data-reveal
          >
            <BadgePercent
              size={30}
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <strong>
              {text(content.savingBadge)}
            </strong>
          </div>
        </header>

        <div className="membership-offers__board">
          <div className="membership-offers__board-title">
            <span>
              {text(content.packagesLabel)}
            </span>

            <span>TG / OFFER</span>
          </div>

          <ul className="membership-offers__plans">
            {membershipPlans.map((plan, index) => {
              const savings =
                plan.regularPrice - plan.offerPrice;
              const term = text(plan.term);
              const message =
                locale === "ar"
                  ? `مرحبًا Tiger Gym، أود الاستفسار عن عرض اشتراك ${term} بسعر ${plan.offerPrice} ${currency}.`
                  : `Hello Tiger Gym, I would like to ask about the ${term} membership offer for ${plan.offerPrice} ${currency}.`;
              const href = `${site.whatsappHref}?text=${encodeURIComponent(message)}`;

              return (
                <li
                  className="membership-offers__plan"
                  key={plan.id}
                  data-stagger-card
                >
                  <div className="membership-offers__term">
                    <div aria-hidden="true">
                      <CalendarDays
                        size={25}
                        strokeWidth={1.45}
                      />

                      <span>
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>
                    </div>

                    <h3>{term}</h3>
                  </div>

                  <div className="membership-offers__pricing">
                    <div className="membership-offers__regular-price">
                      <span>
                        {text(content.regularPrice)}
                      </span>

                      <s>
                        <bdi>
                          {plan.regularPrice} {currency}
                        </bdi>
                      </s>
                    </div>

                    <ArrowRight
                      className="membership-offers__price-arrow"
                      size={25}
                      aria-hidden="true"
                    />

                    <div className="membership-offers__offer-price">
                      <span>
                        {text(content.offerPrice)}
                      </span>

                      <strong>
                        <bdi>{plan.offerPrice}</bdi>
                        <small>{currency}</small>
                      </strong>
                    </div>
                  </div>

                  <div className="membership-offers__benefits">
                    <span>
                      <BadgePercent
                        size={17}
                        aria-hidden="true"
                      />

                      {text(content.saveLabel)}: {savings} {currency}
                    </span>

                    {plan.freeze ? (
                      <span>
                        <Snowflake
                          size={17}
                          aria-hidden="true"
                        />

                        {text(plan.freeze)}
                      </span>
                    ) : null}
                  </div>

                  <a
                    className="membership-offers__enquire"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${text(content.enquire)}: ${term}`}
                  >
                    <MessageCircle
                      size={18}
                      aria-hidden="true"
                    />

                    <span>{text(content.enquire)}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="membership-offers__freeze" data-reveal>
            <Snowflake
              size={28}
              strokeWidth={1.4}
              aria-hidden="true"
            />

            <div>
              <strong>
                {text(content.freezeTitle)}
              </strong>

              <p>
                {text(content.freezeDescription)}
              </p>
            </div>
          </div>
        </div>

        <p className="membership-offers__note">
          {text(content.note)}
        </p>
      </div>
    </section>
  );
}
