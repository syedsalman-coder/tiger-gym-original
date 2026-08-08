import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
} from "vitest";

import FacilitiesPage from "@/app/[locale]/facilities/page";
import MembershipPage from "@/app/[locale]/membership/page";

const paramsFor = (
  locale: "en" | "ar",
) => Promise.resolve({ locale });

afterEach(() => cleanup());

describe("Customer-facing facilities and membership content", () => {
  it("shows facilities without a pending-verification notice", async () => {
    const page = await FacilitiesPage({
      params: paramsFor("en"),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        name: "Choose your training zone.",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Explore the main training areas available at Tiger Gym.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Training details are being verified.",
      ),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        /pending owner confirmation/i,
      ),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Functional Training"),
    ).not.toBeInTheDocument();
  });

  it("shows Arabic membership content without a confirmation-status notice", async () => {
    const page = await MembershipPage({
      params: paramsFor("ar"),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        name: "طريقة واضحة للبدء.",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "تفاصيل العضوية قيد التأكيد.",
      ),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        /قيد تأكيد المالك/,
      ),
    ).not.toBeInTheDocument();
  });

  it("publishes the supplied membership prices and freeze terms in both languages", async () => {
    render(
      await MembershipPage({
        params: paramsFor("en"),
      }),
    );

    const englishOffers = screen.getByRole("region", {
      name: "Membership packages",
    });

    expect(englishOffers).toHaveTextContent("1 Year");
    expect(englishOffers).toHaveTextContent("150 KD");
    expect(englishOffers).toHaveTextContent("120");
    expect(englishOffers).toHaveTextContent(
      "1 month membership freeze",
    );
    expect(englishOffers).toHaveTextContent(
      "15 days membership freeze",
    );

    cleanup();

    render(
      await MembershipPage({
        params: paramsFor("ar"),
      }),
    );

    const arabicOffers = screen.getByRole("region", {
      name: "باقات الاشتراك",
    });

    expect(arabicOffers).toHaveTextContent("سنة واحدة");
    expect(arabicOffers).toHaveTextContent("120");
    expect(arabicOffers).toHaveTextContent(
      "تجميد العضوية لمدة شهر واحد",
    );
    expect(arabicOffers).toHaveTextContent(
      "تجميد العضوية لمدة 15 يومًا",
    );
  });
});
