"use client";

import { useEffect } from "react";
import {
  Analytics,
  type BeforeSendEvent as AnalyticsEvent,
} from "@vercel/analytics/next";
import {
  SpeedInsights,
} from "@vercel/speed-insights/next";

import type { Locale } from "@/i18n/config";
import {
  classifyConversionHref,
  sanitizeAnalyticsUrl,
  trackConversion,
} from "@/lib/analytics";

type SpeedInsightsEvent = {
  type: "vital";
  url: string;
  route?: string;
};

function getLocale(): Locale {
  return document.documentElement.lang === "ar" ? "ar" : "en";
}

function getPlacement(element: Element) {
  if (element.closest(".mobile-action-bar")) return "mobile-action-bar";
  if (element.closest(".home-hero")) return "home-hero";
  if (element.closest("header")) return "navigation";
  if (element.closest("footer")) return "footer";
  if (element.closest(".enquiry-form")) return "form-fallback";
  if (element.closest("main")) return "page-content";
  return "site-shell";
}

function redactAnalyticsUrl(event: AnalyticsEvent): AnalyticsEvent {
  return {
    ...event,
    url: sanitizeAnalyticsUrl(event.url),
  };
}

function redactSpeedInsightsUrl(event: SpeedInsightsEvent): SpeedInsightsEvent {
  return {
    ...event,
    url: sanitizeAnalyticsUrl(event.url),
  };
}

export default function SiteAnalytics() {
  useEffect(() => {
    function handleConversionClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const conversionEvent = classifyConversionHref(link.href);
      if (!conversionEvent) return;

      trackConversion(conversionEvent, {
        locale: getLocale(),
        placement: getPlacement(link),
      });
    }

    document.addEventListener("click", handleConversionClick, true);

    return () => {
      document.removeEventListener("click", handleConversionClick, true);
    };
  }, []);

  return (
    <>
      <Analytics beforeSend={redactAnalyticsUrl} />
      <SpeedInsights beforeSend={redactSpeedInsightsUrl} />
    </>
  );
}
