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
        name: "Choose the work.",
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
  });

  it("shows Arabic membership content without a confirmation-status notice", async () => {
    const page = await MembershipPage({
      params: paramsFor("ar"),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        name: "تحدّث مع الفريق.",
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
});
