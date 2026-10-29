import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getAllBreeds } from "@/data/breeds";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import BreedDirectoryClient from "@/components/BreedDirectoryClient";
import BreedVisualGallery from "@/components/BreedVisualGallery";
import { Activity, ChevronRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Dog & Cat Breed Care Guides, Standards & Calculators | PawTruth",
  description:
    "Explore clinical breed standards, recognized colors, temperament ratings, pediatric growth milestones, and custom interactive veterinary calculators for dogs and cats.",
  keywords: [
    "dog breed guides",
    "cat breed guides",
    "dog breed calculators",
    "cat breed calculators",
    "french bulldog guide",
    "ragdoll cat guide",
    "dog breed colors",
    "dog breed temperament",
    "cat breed temperament",
  ],
  alternates: {
    canonical: "https://pawtruth.com/breed",
  },
  openGraph: {
    title: "Dog & Cat Breed Clinical Hubs & Calculators | PawTruth",
    description: "Clinical breed profiles, weight standards, colors, temperament, and 1-click veterinary calculators.",
    url: "https://pawtruth.com/breed",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog & Cat Breed Clinical Hubs & Calculators",
    description: "Clinical breed profiles, weight standards, colors, temperament, and 1-click veterinary calculators.",
  },
};

export default function BreedDirectoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://pawtruth.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Breeds",
            "item": "https://pawtruth.com/breed",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "name": "Dog & Cat Breed Care Guides and Calculators",
        "description": "Comprehensive clinical directory of canine and feline breed standards, temperament profiles, coat variations, and interactive veterinary tools.",
        "url": "https://pawtruth.com/breed",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono font-bold text-brand-taupe">
          <Link href="/" className="hover:text-brand-espresso transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-espresso">Breed Directory</span>
        </nav>

        {/* Hero Header */}
        <section className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-10 shadow-[6px_6px_0px_#583D32] space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-[2px_2px_0px_#583D32] text-xs font-heading font-black uppercase">
            <Activity className="w-4 h-4 text-brand-espresso" />
            Clinical Breed Directory
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-brand-espresso tracking-tight">
            Dog & Cat Breed Clinical Care Guides
          </h1>
          <p className="text-base sm:text-lg font-medium text-brand-espresso/80 max-w-3xl leading-relaxed">
            Comprehensive breed standards integrating official AKC & CFA guidelines, WSAVA nutrition baselines, coat genetics, and instant 1-click calculators designed to give pet parents actionable veterinary precision.
          </p>
        </section>

        {/* Interactive Species Filter & Breed Cards */}
        <BreedDirectoryClient breeds={getAllBreeds()} />

        {/* 120 High-Res Breed Visual Gallery & Search */}
        <BreedVisualGallery />

        {/* Why Clinical Breed Standards Matter */}
        <section className="bg-brand-cream/40 rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-[4px_4px_0px_#583D32] space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-terracotta" />
            <h2 className="font-heading text-xl font-black text-brand-espresso">
              Why Clinical Breed Standards Matter for Your Pet&apos;s Health
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-brand-espresso/80">
            <div className="bg-white rounded-xl border border-brand-espresso/30 p-4 space-y-1.5 shadow-[2px_2px_0px_#583D32]">
              <h3 className="font-heading font-black text-sm text-brand-espresso">1. Early Genetic Risk Screening</h3>
              <p>Every breed profile details recognized hereditary risks—from canine hip dysplasia to feline hypertrophic cardiomyopathy—empowering owners and veterinarians to screen early before symptoms arise.</p>
            </div>
            <div className="bg-white rounded-xl border border-brand-espresso/30 p-4 space-y-1.5 shadow-[2px_2px_0px_#583D32]">
              <h3 className="font-heading font-black text-sm text-brand-espresso">2. Precision Nutrition & Weight Goals</h3>
              <p>Adult weight ranges and structural metrics pair directly with WSAVA caloric formulas, helping ensure your dog or cat maintains an optimal Body Condition Score throughout all life stages.</p>
            </div>
            <div className="bg-white rounded-xl border border-brand-espresso/30 p-4 space-y-1.5 shadow-[2px_2px_0px_#583D32]">
              <h3 className="font-heading font-black text-sm text-brand-espresso">3. Environmental & Crate Ergonomics</h3>
              <p>Accurate height, length, and behavioral temperament metrics guide proper crate dimensions, litter box sizing, and daily physical and mental enrichment routines.</p>
            </div>
          </div>
        </section>

        {/* AdSense Placement Container (Zero CLS) */}
        <AdSensePlaceholder
          slot="breed-directory-bottom"
          minHeight="min-h-[120px]"
          label="Sponsor Advertisement"
        />
      </div>
    </>
  );
}
