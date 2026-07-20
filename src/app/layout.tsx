import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import CustomCursor from "@/components/shared/CustomCursor";
import RouteMotion from "@/components/shared/RouteMotion";
import ScrollProgress from "@/components/shared/ScrollProgress";
import SmoothScroll from "@/components/shared/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tiger Gym | Fitness Center in Salmiya, Kuwait",
    template: "%s",
  },
  description:
    "Tiger Gym is a strength and fitness center in Salmiya, Kuwait.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <noscript><style>{".home-loader{display:none!important}"}</style></noscript>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SmoothScroll />
        <RouteMotion />
        <ScrollProgress />
        <CustomCursor />
        <Navigation />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
