import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingScrollCompanion from "@/components/FloatingScrollCompanion";

export const metadata: Metadata = {
  title: "PawTruth — Pet Health & Safety Calculators",
  description:
    "Free, 100% veterinary-accurate calculators for dogs and cats: emergency chocolate toxicity triage, AVMA canine & feline age converters, WSAVA food portioning, and AKC crate sizing.",
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
  ],
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
