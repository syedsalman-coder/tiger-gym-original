"use client";

import { type FormEvent, useState } from "react";

import { site } from "@/data/site";

type ContactValues = {
  name: string;
  phone: string;
  message: string;
};

type ContactField = keyof ContactValues;
type ContactErrors = Partial<Record<ContactField, string>>;

type SubmissionStatus =
  | { kind: "idle" }
  | { kind: "opened" }
  | { kind: "blocked"; whatsappUrl: string };

const initialValues: ContactValues = {
  name: "",
  phone: "",
  message: "",
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

function validateField(field: ContactField, value: string) {
  if (field === "phone") {
    return validatePhone(value);
  }

  if (!value.trim()) {
    return field === "name" ? "Enter your name." : "Enter a message.";
  }

  return undefined;
}

function validate(values: ContactValues) {
  const errors: ContactErrors = {};

  (Object.keys(values) as ContactField[]).forEach((field) => {
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

export default function ContactForm() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>({ kind: "idle" });

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setSubmissionStatus({ kind: "idle" });

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateField(field, value),
      }));
    }
  }

  function handleBlur(field: ContactField) {
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
        | ContactField
        | undefined;
      const fieldElement = firstInvalidField
        ? event.currentTarget.elements.namedItem(firstInvalidField)
        : null;

      if (fieldElement instanceof HTMLElement) fieldElement.focus();
      return;
    }

    const whatsappUrl = createWhatsappUrl(
      [
        "Hello Tiger Gym,",
        "",
        `Name: ${values.name.trim()}`,
        `Phone: ${values.phone.trim()}`,
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
      className="contact-form enquiry-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="enquiry-form__field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          onBlur={() => handleBlur("name")}
          onChange={(event) => updateField("name", event.target.value)}
        />
        {errors.name ? (
          <span
            className="enquiry-form__error"
            id="contact-name-error"
            role="alert"
          >
            {errors.name}
          </span>
        ) : null}
      </div>

      <div className="enquiry-form__field">
        <label htmlFor="contact-phone">Phone</label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          required
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          onBlur={() => handleBlur("phone")}
          onChange={(event) => updateField("phone", event.target.value)}
        />
        {errors.phone ? (
          <span
            className="enquiry-form__error"
            id="contact-phone-error"
            role="alert"
          >
            {errors.phone}
          </span>
        ) : null}
      </div>

      <div className="enquiry-form__field enquiry-form__field--full">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          onBlur={() => handleBlur("message")}
          onChange={(event) => updateField("message", event.target.value)}
        />
        {errors.message ? (
          <span
            className="enquiry-form__error"
            id="contact-message-error"
            role="alert"
          >
            {errors.message}
          </span>
        ) : null}
      </div>

      <div className="enquiry-form__footer">
        <button className="enquiry-form__submit" type="submit">
          Prepare WhatsApp message
        </button>
        <p className="enquiry-form__note">
          This form prepares a WhatsApp message for you to review and send.
        </p>
      </div>

      {submissionStatus.kind === "opened" ? (
        <p className="enquiry-form__status" role="status" aria-live="polite">
          WhatsApp opened with your message. Review it there and tap Send;
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
            link below to review and send your prepared message.
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
