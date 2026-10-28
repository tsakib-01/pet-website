import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingScrollCompanion from "@/components/FloatingScrollCompanion";

export const metadata: Metadata = {
  metadataBase: new URL("https://pawtruth.com"),
  title: {
    default: "PawTruth — Pet Health & Safety Calculators",
    template: "%s | PawTruth",
  },
  description:
    "Free, 100% veterinary-accurate calculators and clinical breed guides for dogs and cats: emergency toxicity triage, AVMA life-stage age converters, WSAVA nutrition portioning, and AKC sizing.",
  keywords: [
    "dog age calculator",
    "dog chocolate toxicity calculator",
    "cat age calculator",
    "dog crate size calculator",
    "puppy vaccination schedule",
    "cat food calculator wet and dry",
    "dog name generator",
    "cat name generator",
    "puppy weight calculator",
    "dog breed guides",
    "cat breed guides",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PawTruth — Pet Health & Safety Calculators",
    description: "Veterinary-accurate calculators and clinical breed standards for dogs and cats.",
    url: "https://pawtruth.com",
    siteName: "PawTruth",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PawTruth — Pet Health & Safety Calculators",
    description: "Veterinary-accurate calculators and clinical breed standards for dogs and cats.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col selection:bg-brand-olive selection:text-brand-espresso overflow-x-hidden">
        <Header />
        <main className="flex-grow overflow-x-hidden">{children}</main>
        <Footer />
        <FloatingScrollCompanion />
      </body>
    </html>
  );
}
