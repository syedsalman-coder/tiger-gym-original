import { Barlow_Condensed, Manrope, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import CustomCursor from "@/components/shared/CustomCursor";
import RouteMotion from "@/components/shared/RouteMotion";
import ScrollProgress from "@/components/shared/ScrollProgress";
import SmoothScroll from "@/components/shared/SmoothScroll";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localeDirections, locales } from "@/i18n/config";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);
  const direction = localeDirections[locale];

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${barlowCondensed.variable} ${manrope.variable} ${notoSansArabic.variable} h-full antialiased`}
      data-locale={locale}
    >
      <body className="min-h-full">
        <noscript><style>{".home-loader{display:none!important}"}</style></noscript>
        <a className="skip-link" href="#main-content">{dictionary.accessibility.skipToContent}</a>
        <SmoothScroll />
        <RouteMotion />
        <ScrollProgress />
        <CustomCursor />
        <Navigation locale={locale} />
        <PageTransition>{children}</PageTransition>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
