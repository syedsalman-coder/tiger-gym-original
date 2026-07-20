"use client";

import { type FormEvent, useState } from "react";

import { site } from "@/data/site";

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

const requiredMessages: Record<Exclude<MembershipField, "phone">, string> = {
  name: "Enter your name.",
  preferredTrainingTime: "Enter your preferred training time.",
  membershipInterest: "Select a membership interest.",
  message: "Enter a message.",
};

function validatePhone(phone: string) {
  const digitCount = phone.replace(/\D/g, "").length;

  if (!phone.trim()) {
    return "Enter your phone number.";
  }

  if (digitCount < 7 || digitCount > 15) {
    return "Enter a phone number containing 7 to 15 digits.";
  }

  return undefined;
}

function validateField(field: MembershipField, value: string) {
  if (field === "phone") {
    return validatePhone(value);
  }

  if (!value.trim()) {
    return requiredMessages[field];
  }

  return undefined;
}

function validate(values: MembershipValues) {
  const errors: MembershipErrors = {};

  (Object.keys(values) as MembershipField[]).forEach((field) => {
    const error = validateField(field, values[field]);
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

export default function MembershipForm() {
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
        [field]: validateField(field, value),
      }));
    }
  }

  function handleBlur(field: MembershipField) {
    setErrors((current) => ({
      ...current,
      [field]: validateField(field, values[field]),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
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
        "Hello Tiger Gym, I would like to ask about membership.",
        "",
        `Name: ${values.name.trim()}`,
        `Phone: ${values.phone.trim()}`,
        `Preferred training time: ${values.preferredTrainingTime.trim()}`,
        `Membership interest: ${values.membershipInterest}`,
        `Message: ${values.message.trim()}`,
      ].join("\n"),
    );
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
        <label htmlFor="membership-name">Name</label>
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
        <label htmlFor="membership-phone">Phone</label>
        <input
          id="membership-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
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
          Preferred training time
        </label>
        <input
          id="preferred-training-time"
          name="preferredTrainingTime"
          type="text"
          placeholder="For example, morning or evening"
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
        <label htmlFor="membership-interest">Membership interest</label>
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
            Select an option
          </option>
          <option value="Monthly Membership">Monthly Membership</option>
          <option value="Flexible Training Access">
            Flexible Training Access
          </option>
          <option value="Membership Enquiry">Membership Enquiry</option>
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
        <label htmlFor="membership-message">Message</label>
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
          Prepare membership enquiry
        </button>
        <p className="enquiry-form__note">
          This form prepares a WhatsApp message for you to review and send.
        </p>
      </div>

      {submissionStatus.kind === "opened" ? (
        <p className="enquiry-form__status" role="status" aria-live="polite">
          WhatsApp opened with your enquiry. Review it there and tap Send;
          nothing was sent by this form.
        </p>
      ) : null}

      {submissionStatus.kind === "blocked" ? (
        <div
          className="enquiry-form__status enquiry-form__status--action"
          role="status"
          aria-live="polite"
        >
          <p>
            WhatsApp could not open automatically. Nothing was sent. Use the
            link below to review and send your prepared enquiry.
          </p>
          <a
            className="enquiry-form__whatsapp-link"
            href={submissionStatus.whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open WhatsApp
          </a>
        </div>
      ) : null}
    </form>
  );
}
