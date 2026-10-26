import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingScrollCompanion from "@/components/FloatingScrollCompanion";

export const metadata: Metadata = {
  title: "PawTruth — Pet Food Recall & Safety Inspector",
  description:
    "Real-time database of official FDA pet food recalls, lot numbers, brand safety grades, and contaminant warnings for dogs and cats.",
  keywords: [
    "pet food recall",
    "dog food recall 2026",
    "cat food recall list",
    "FDA pet food safety",
    "salmonella dog food",
    "aflatoxin kibble",
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
