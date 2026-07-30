import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import FacilitiesPage from "@/app/[locale]/facilities/page";
import MembershipPage from "@/app/[locale]/membership/page";

const paramsFor = (locale: "en" | "ar") => Promise.resolve({ locale });

afterEach(() => cleanup());

describe("Phase 2 content readiness notices", () => {
  it("surfaces pending facility details before the training-area list", async () => {
    const page = await FacilitiesPage({ params: paramsFor("en") });

    render(page);

    const notice = screen.getByRole("status", { name: /content status/i });
    expect(notice).toHaveTextContent("Training details are being verified.");
    expect(notice).toHaveTextContent("Some details are pending owner confirmation");
    expect(notice).toHaveTextContent("Confirm equipment availability with the Tiger Gym team");
  });

  it("localizes membership readiness copy for Arabic visitors", async () => {
    const page = await MembershipPage({ params: paramsFor("ar") });

    render(page);

    const notice = screen.getByRole("status", { name: /حالة المحتوى/i });
    expect(notice).toHaveTextContent("تفاصيل العضوية قيد التأكيد.");
    expect(notice).toHaveTextContent("قيد تأكيد المالك");
  });
});
