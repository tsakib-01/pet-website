import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingScrollCompanion from "@/components/FloatingScrollCompanion";

export const metadata: Metadata = {
  metadataBase: new URL("https://pawtrusty.com"),
  title: {
    default: "PawTrusty — Pet Health & Safety Calculators",
    template: "%s | PawTrusty",
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
    title: "PawTrusty — Pet Health & Safety Calculators",
    description: "Veterinary-accurate calculators and clinical breed standards for dogs and cats.",
    url: "https://pawtrusty.com",
    siteName: "PawTrusty",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo-pawtrusty.png",
        width: 1200,
        height: 630,
        alt: "PawTrusty — Pet Health & Safety",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PawTrusty — Pet Health & Safety Calculators",
    description: "Veterinary-accurate calculators and clinical breed standards for dogs and cats.",
    images: ["/images/logo-pawtrusty.png"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
