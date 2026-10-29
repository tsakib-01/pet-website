import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllRecallBrands } from "@/data/recalls";
import BrandDirectoryClient from "@/components/recalls/BrandDirectoryClient";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import { ShieldAlert, ShieldCheck, Building2, History, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Food Brand Safety Directory (270+ Brands: USA, Canada, UK & Australia) — PawTruth",
  description:
    "Comprehensive directory of 270+ commercial pet food brands across the USA, Canada, United Kingdom, Europe, and Australia with manufacturing safety profiles, parent company ownership, verified clean records, and lot number lookup tools.",
  keywords: [
    "pet food brands list",
    "safe dog food brands",
    "safe cat food brands",
    "clean record pet food",
    "australian pet food brands",
    "uk dog food brands",
    "canadian pet food brands",
    "pet food manufacturer directory",
    "purina safety profile",
    "advance pet food recall",
    "black hawk dog food recall",
    "applaws safety dossier",
    "blue buffalo safety profile",
  ],
  alternates: {
    canonical: "https://pawtruth.com/brands",
  },
  openGraph: {
    title: "Pet Food Brand Safety Directory (270+ Brands: USA, Canada, UK & Australia) | PawTruth",
    description:
      "Inspect safety track records, parent companies, and verified clean certificates for over 270 dog and cat food brands across the US, Canada, UK, and Australia.",
    type: "website",
    url: "https://pawtruth.com/brands",
  },
};

export default function BrandsDirectoryPage() {
  const brands = getAllRecallBrands();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Pet Food Brand Safety Directory (270+ Brands: USA, Canada, UK & Australia)",
    "description":
      "Comprehensive public directory indexing 270+ pet food manufacturers, parent company ownership, and 10-year recall track records across the United States, Canada, UK, and Australia.",
    "url": "https://pawtruth.com/brands",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": brands.length,
      "itemListElement": brands.slice(0, 30).map((b, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": b.name,
        "url": `https://pawtruth.com/brand/${b.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-paper-sm text-xs font-heading font-black uppercase">
            <Building2 className="w-4 h-4 text-brand-leaf" />
            270+ Brand Safety Dossiers: USA • Canada • UK • Australia
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-black text-brand-espresso tracking-tight">
            Pet Food Brand Safety <span className="text-brand-terracotta">Directory</span>
          </h1>
          <p className="text-base sm:text-lg text-brand-taupe leading-relaxed">
            Explore independent safety profiles, corporate ownership, and verified manufacturing track records for over 270 commercial pet food brands across the United States, Canada, the United Kingdom, Europe, and Australia.
          </p>
        </div>

        {/* Cross-Link Banner to FDA Recall Ledger */}
        <div className="bg-brand-cream border-2.5 border-brand-espresso rounded-3xl p-5 sm:p-6 shadow-paper flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase text-brand-terracotta">
              <History className="w-4 h-4" />
              Live FDA Enforcement Ledger
            </div>
            <h3 className="font-heading text-base sm:text-lg font-black text-brand-espresso">
              Looking for recent FDA recall dockets and lot numbers?
            </h3>
            <p className="text-xs text-brand-taupe max-w-xl">
              Inspect our comprehensive FDA Pet Food Recall Database indexing over 120+ dockets from 2009 to 2026 with expandable lot codes and emergency action plans.
            </p>
          </div>

          <Link
            href="/recalls"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-espresso text-white hover:bg-brand-terracotta font-heading font-black text-xs sm:text-sm shadow-paper hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            <span>Open FDA Recall Database</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Brand Directory Component */}
        <BrandDirectoryClient brands={brands} />

        {/* AdSense Fixed Banner */}
        <div className="pt-4">
          <AdSensePlaceholder
            slot="brands-directory-bottom"
            format="horizontal"
            minHeight="min-h-[120px]"
            label="Consumer Safety Sponsor"
          />
        </div>

        {/* Mandatory Regulatory Disclaimer */}
        <div className="p-4 rounded-2xl bg-brand-cream/40 border border-brand-espresso/20 text-[11px] font-sans text-brand-taupe leading-relaxed">
          <strong className="text-brand-espresso">Consumer Safety Disclaimer:</strong> PawTruth indexes publicly accessible FDA veterinary enforcement notices, press announcements, and manufacturer disclosures. We do not accept advertising compensation to alter brand safety ratings or recall histories.
        </div>
      </div>
    </>
  );
}
