"use client";

import { type FormEvent, useState } from "react";

import { membershipPlans } from "@/data/membership-options";
import { site } from "@/data/site";
import { getLocalizedValue, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { trackConversion } from "@/lib/analytics";

type MembershipValues = {
  name: string;
  phone: string;
  preferredTrainingTime: string;
  membershipInterest: string;
  message: string;
};

type MembershipField = keyof MembershipValues;
type MembershipErrors = Partial<Record<MembershipField, string>>;

type SubmissionStatus =
  | { kind: "idle" }
  | { kind: "opened" }
  | { kind: "blocked"; whatsappUrl: string };

const initialValues: MembershipValues = {
  name: "",
  phone: "",
  preferredTrainingTime: "",
  membershipInterest: "",
  message: "",
};

function validatePhone(phone: string, dictionary: Dictionary) {
  const digitCount = phone.replace(/\D/g, "").length;

  if (!phone.trim()) {
    return dictionary.membershipForm.errors.phone;
  }

  if (digitCount < 7 || digitCount > 15) {
    return dictionary.membershipForm.errors.phoneFormat;
  }

  return undefined;
}

function validateField(field: MembershipField, value: string, dictionary: Dictionary) {
  if (field === "phone") {
    return validatePhone(value, dictionary);
  }

  if (!value.trim()) {
    const errors = dictionary.membershipForm.errors;
    const requiredMessages: Record<Exclude<MembershipField, "phone">, string> = {
      name: errors.name,
      preferredTrainingTime: errors.preferredTime,
      membershipInterest: errors.interest,
      message: errors.message,
    };
    return requiredMessages[field];
  }

  return undefined;
}

function validate(values: MembershipValues, dictionary: Dictionary) {
  const errors: MembershipErrors = {};

  (Object.keys(values) as MembershipField[]).forEach((field) => {
    const error = validateField(field, values[field], dictionary);
    if (error) errors[field] = error;
  });

  return errors;
}

function createWhatsappUrl(message: string) {
  const verifiedNumber = site.whatsappNumber.replace(/\D/g, "");
  const baseUrl = site.whatsappHref || `https://wa.me/${verifiedNumber}`;
  const separator = baseUrl.includes("?") ? "&" : "?";

  return `${baseUrl}${separator}text=${encodeURIComponent(message)}`;
}

export default function MembershipForm({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.membershipForm;
  const text = (value: Parameters<typeof getLocalizedValue>[0]) => getLocalizedValue(value, locale);
  const [values, setValues] = useState<MembershipValues>(initialValues);
  const [errors, setErrors] = useState<MembershipErrors>({});
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>({ kind: "idle" });

  function updateField(field: MembershipField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setSubmissionStatus({ kind: "idle" });

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateField(field, value, dictionary),
      }));
    }
  }

  function handleBlur(field: MembershipField) {
    setErrors((current) => ({
      ...current,
      [field]: validateField(field, values[field], dictionary),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values, dictionary);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0] as
        | MembershipField
        | undefined;
      const fieldElement = firstInvalidField
        ? event.currentTarget.elements.namedItem(firstInvalidField)
        : null;

      if (fieldElement instanceof HTMLElement) fieldElement.focus();
      return;
    }

    const whatsappUrl = createWhatsappUrl(
      [
        copy.template.greeting,
        "",
        `${copy.template.name}: ${values.name.trim()}`,
        `${copy.template.phone}: ${values.phone.trim()}`,
        `${copy.template.preferredTime}: ${values.preferredTrainingTime.trim()}`,
        `${copy.template.interest}: ${values.membershipInterest}`,
        `${copy.template.message}: ${values.message.trim()}`,
      ].join("\n"),
    );

    trackConversion("membership_form_submitted", {
      locale,
      placement: "membership-form",
    });

    const whatsappWindow = window.open(whatsappUrl, "_blank");

    if (whatsappWindow) {
      whatsappWindow.opener = null;
      setSubmissionStatus({ kind: "opened" });
      return;
    }

    setSubmissionStatus({ kind: "blocked", whatsappUrl });
  }

  return (
    <form
      className="membership-form enquiry-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="enquiry-form__field">
        <label htmlFor="membership-name">{copy.name}</label>
        <input
          id="membership-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "membership-name-error" : undefined}
          onBlur={() => handleBlur("name")}
          onChange={(event) => updateField("name", event.target.value)}
        />
        {errors.name ? (
          <span
            className="enquiry-form__error"
            id="membership-name-error"
            role="alert"
          >
            {errors.name}
          </span>
        ) : null}
      </div>

      <div className="enquiry-form__field">
        <label htmlFor="membership-phone">{copy.phone}</label>
        <input
          id="membership-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          value={values.phone}
          required
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "membership-phone-error" : undefined}
          onBlur={() => handleBlur("phone")}
          onChange={(event) => updateField("phone", event.target.value)}
        />
        {errors.phone ? (
          <span
            className="enquiry-form__error"
            id="membership-phone-error"
            role="alert"
          >
            {errors.phone}
          </span>
        ) : null}
      </div>

      <div className="enquiry-form__field">
        <label htmlFor="preferred-training-time">
          {copy.preferredTime}
        </label>
        <input
          id="preferred-training-time"
          name="preferredTrainingTime"
          type="text"
          placeholder={copy.preferredTimePlaceholder}
          value={values.preferredTrainingTime}
          required
          aria-invalid={Boolean(errors.preferredTrainingTime)}
          aria-describedby={
            errors.preferredTrainingTime
              ? "preferred-training-time-error"
              : undefined
          }
          onBlur={() => handleBlur("preferredTrainingTime")}
          onChange={(event) =>
            updateField("preferredTrainingTime", event.target.value)
          }
        />
        {errors.preferredTrainingTime ? (
          <span
            className="enquiry-form__error"
            id="preferred-training-time-error"
            role="alert"
          >
            {errors.preferredTrainingTime}
          </span>
        ) : null}
      </div>

      <div className="enquiry-form__field">
        <label htmlFor="membership-interest">{copy.interest}</label>
        <select
          id="membership-interest"
          name="membershipInterest"
          value={values.membershipInterest}
          required
          aria-invalid={Boolean(errors.membershipInterest)}
          aria-describedby={
            errors.membershipInterest
              ? "membership-interest-error"
              : undefined
          }
          onBlur={() => handleBlur("membershipInterest")}
          onChange={(event) =>
            updateField("membershipInterest", event.target.value)
          }
        >
          <option value="" disabled>
            {copy.selectOption}
          </option>
          {membershipPlans.map((plan) => {
            const currency =
              locale === "ar" ? "د.ك" : "KD";
            const label = `${text(plan.term)} — ${plan.offerPrice} ${currency}`;

            return (
              <option value={label} key={plan.id}>
                {label}
              </option>
            );
          })}
        </select>
        {errors.membershipInterest ? (
          <span
            className="enquiry-form__error"
            id="membership-interest-error"
            role="alert"
          >
            {errors.membershipInterest}
          </span>
        ) : null}
      </div>

      <div className="enquiry-form__field enquiry-form__field--full">
        <label htmlFor="membership-message">{copy.message}</label>
        <textarea
          id="membership-message"
          name="message"
          rows={6}
          value={values.message}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "membership-message-error" : undefined
          }
          onBlur={() => handleBlur("message")}
          onChange={(event) => updateField("message", event.target.value)}
        />
        {errors.message ? (
          <span
            className="enquiry-form__error"
            id="membership-message-error"
            role="alert"
          >
            {errors.message}
          </span>
        ) : null}
      </div>

      <div className="enquiry-form__footer">
        <button className="enquiry-form__submit" type="submit">
          {copy.submit}
        </button>
        <p className="enquiry-form__note">
          {copy.note}
        </p>
      </div>

      {submissionStatus.kind === "opened" ? (
        <p className="enquiry-form__status" role="status" aria-live="polite">
          {copy.opened}
        </p>
      ) : null}

      {submissionStatus.kind === "blocked" ? (
        <div
          className="enquiry-form__status enquiry-form__status--action"
          role="status"
          aria-live="polite"
        >
          <p>{copy.blocked}</p>
          <a
            className="enquiry-form__whatsapp-link"
            href={submissionStatus.whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            {copy.openWhatsapp}
          </a>
        </div>
      ) : null}
    </form>
  );
}
