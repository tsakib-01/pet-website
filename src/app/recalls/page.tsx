import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllRecallBrands } from "@/data/recalls";
import { HISTORICAL_FDA_TIMELINE } from "@/data/historicalTimeline";
import RecallTableLedger from "@/components/recalls/RecallTableLedger";
import RecallActionProtocols from "@/components/recalls/RecallActionProtocols";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import { ShieldAlert, ShieldCheck, AlertTriangle, FileText, Building2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Food Recall Database & Historical Archive (2009–2026) — PawTruth",
  description:
    "Official FDA pet food recall enforcement database. Search historical recall dockets from 2009 to 2026, verify lot numbers, check Salmonella and Aflatoxin dockets, and access emergency pet action protocols.",
  keywords: [
    "pet food recall",
    "dog food recall 2026",
    "cat food recall 2026",
    "fda pet food recall list",
    "dog food recall history 2009 to 2026",
    "pet food lot number lookup",
    "salmonella dog food recall",
    "aflatoxin pet food",
    "purina recall",
    "fromm recall",
    "blue buffalo recall",
    "victor dog food recall",
  ],
  alternates: {
    canonical: "https://pawtruth.com/recalls",
  },
  openGraph: {
    title: "Pet Food Recall Database & Historical Archive (2009–2026) | PawTruth",
    description:
      "Search official FDA veterinary recall dockets, verify specific lot codes, and inspect full chronological recall histories from 2009 through 2026.",
    type: "website",
    url: "https://pawtruth.com/recalls",
  },
};

export default function RecallsDirectoryPage() {
  const brands = getAllRecallBrands();
  const knownBrandSlugs = brands.map((b) => b.slug);
  const latestDocket = HISTORICAL_FDA_TIMELINE[0];
  const lastVerifiedDate = latestDocket ? latestDocket.date : "2026-10-21";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "FDA Pet Food Recall Enforcement Database (2009–2026)",
    "description":
      "Public safety dataset indexing official FDA veterinary recall enforcement reports, Class I/II/III severity classifications, lot numbers, and pathogen contaminants.",
    "url": "https://pawtruth.com/recalls",
    "dateModified": lastVerifiedDate,
    "temporalCoverage": "2009/2026",
    "isAccessibleForFree": true,
    "creator": {
      "@type": "Organization",
      "name": "PawTruth Consumer Safety Initiative",
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
            <ShieldAlert className="w-4 h-4 text-brand-terracotta" />
            Official FDA Veterinary Enforcement Ledger
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-black text-brand-espresso tracking-tight">
            FDA Pet Food Recall <span className="text-brand-terracotta">Database</span>
          </h1>
          <p className="text-base sm:text-lg text-brand-taupe leading-relaxed">
            Executive regulatory ledger tracking official FDA Class I, II, and III animal veterinary food recall dockets from 2009 to 2026. Filter by year, severity, hazard contaminant, and status.
          </p>
        </div>

        {/* Professional Regulatory Ledger Table (Bloomberg / FDA Solr Aesthetic) */}
        <RecallTableLedger knownBrandSlugs={knownBrandSlugs} />

        {/* AdSense Fixed Banner */}
        <div className="pt-4">
          <AdSensePlaceholder
            slot="recalls-directory-bottom"
            format="horizontal"
            minHeight="min-h-[120px]"
            label="Consumer Safety Sponsor"
          />
        </div>

        {/* FDA Classification Educational Guide */}
        <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper space-y-5">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-terracotta" />
            <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Understanding FDA Pet Food Recall Classifications
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-2">
              <div className="font-heading font-black text-sm text-rose-950 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                Class I Recall (High Hazard)
              </div>
              <p className="text-rose-900/80 leading-relaxed">
                A situation where there is a reasonable probability that the use of or exposure to a product will cause serious adverse health consequences or death in pets or humans (e.g. <em>Salmonella, Aflatoxin mold, severe Vitamin D toxicity</em>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
              <div className="font-heading font-black text-sm text-amber-950 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Class II Recall (Moderate Risk)
              </div>
              <p className="text-amber-900/80 leading-relaxed">
                A situation where use of or exposure to a product may cause temporary or medically reversible adverse health consequences, or where probability of serious harm is remote (e.g. <em>mild mineral variances, foreign soft material</em>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-2">
              <div className="font-heading font-black text-sm text-emerald-950 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                Class III Recall / Withdrawal
              </div>
              <p className="text-emerald-900/80 leading-relaxed">
                A situation where exposure to a product is not likely to cause adverse health consequences, typically involving technical labeling errors, minor packaging seals, or moisture standard deviations.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Protocols & FDA Reporting Guide */}
        <RecallActionProtocols />

        {/* Mandatory Regulatory Disclaimer */}
        <div className="p-4 rounded-2xl bg-brand-cream/40 border border-brand-espresso/20 text-[11px] font-sans text-brand-taupe leading-relaxed">
          <strong className="text-brand-espresso">Notice:</strong> PawTruth indexes public regulatory reports published by the U.S. Food and Drug Administration (FDA) Center for Veterinary Medicine (CVM). PawTruth is an independent consumer directory and is not an agency of the federal government. If your pet shows acute signs of illness, immediately contact a licensed veterinarian.
        </div>
      </div>
    </>
  );
}
