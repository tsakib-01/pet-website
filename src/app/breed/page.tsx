import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { BREED_DATABASE } from "@/data/breeds";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import { Dog, Cat, ArrowRight, Activity, ChevronRight, Calculator, CheckCircle2 } from "lucide-react";

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
  const dogBreeds = BREED_DATABASE.filter((b) => b.species === "dog");
  const catBreeds = BREED_DATABASE.filter((b) => b.species === "cat");

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
            Programmatic Breed Hubs
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-brand-espresso tracking-tight">
            Dog & Cat Breed Clinical Care Guides
          </h1>
          <p className="text-base sm:text-lg font-medium text-brand-espresso/80 max-w-3xl leading-relaxed">
            High-utility breed profiles integrating official AKC & CFA standards, WSAVA nutrition baselines, coat genetics, and instant 1-click calculators designed to give pet parents actionable veterinary precision.
          </p>
        </section>

        {/* Template Previews Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* DOG TEMPLATE CARD */}
          {dogBreeds.map((breed) => (
            <div
              key={breed.slug}
              className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-[5px_5px_0px_#583D32] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso/40 text-xs font-heading font-black uppercase">
                    <Dog className="w-3.5 h-3.5" />
                    Dog Breed Profile
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-taupe">
                    Template #1
                  </span>
                </div>

                <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-brand-espresso shadow-[3px_3px_0px_#583D32] bg-brand-cream/30">
                  <img
                    src={breed.heroImage}
                    alt={breed.heroImageAlt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-black text-brand-espresso mb-1">
                    {breed.name}
                  </h2>
                  <p className="text-xs text-brand-espresso/80 leading-relaxed">
                    {breed.tagline}
                  </p>
                </div>

                {/* Sample Metrics Chips */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-brand-espresso/15">
                  <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                    <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">Weight</div>
                    <div className="text-xs font-heading font-black text-brand-espresso">{breed.metrics[0]?.value}</div>
                  </div>
                  <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                    <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">Crate</div>
                    <div className="text-xs font-heading font-black text-brand-espresso">{breed.metrics[2]?.value}</div>
                  </div>
                  <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                    <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">Lifespan</div>
                    <div className="text-xs font-heading font-black text-brand-espresso">{breed.metrics[3]?.value}</div>
                  </div>
                </div>
              </div>

              <Link
                href={`/breed/${breed.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-terracotta text-white font-heading font-black text-sm uppercase tracking-wider border-2 border-brand-espresso shadow-[3px_3px_0px_#583D32] hover:shadow-[1px_1px_0px_#583D32] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <span>View Dog Template ({breed.name})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}

          {/* CAT TEMPLATE CARD */}
          {catBreeds.map((breed) => (
            <div
              key={breed.slug}
              className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-[5px_5px_0px_#583D32] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso/40 text-xs font-heading font-black uppercase">
                    <Cat className="w-3.5 h-3.5" />
                    Cat Breed Profile
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-taupe">
                    Template #2
                  </span>
                </div>

                <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-brand-espresso shadow-[3px_3px_0px_#583D32] bg-brand-cream/30">
                  <img
                    src={breed.heroImage}
                    alt={breed.heroImageAlt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-black text-brand-espresso mb-1">
                    {breed.name}
                  </h2>
                  <p className="text-xs text-brand-espresso/80 leading-relaxed">
                    {breed.tagline}
                  </p>
                </div>

                {/* Sample Metrics Chips */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-brand-espresso/15">
                  <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                    <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">Weight</div>
                    <div className="text-xs font-heading font-black text-brand-espresso">{breed.metrics[0]?.value}</div>
                  </div>
                  <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                    <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">Litter Box</div>
                    <div className="text-xs font-heading font-black text-brand-espresso">{breed.metrics[2]?.value}</div>
                  </div>
                  <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                    <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">Lifespan</div>
                    <div className="text-xs font-heading font-black text-brand-espresso">{breed.metrics[3]?.value}</div>
                  </div>
                </div>
              </div>

              <Link
                href={`/breed/${breed.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-terracotta text-white font-heading font-black text-sm uppercase tracking-wider border-2 border-brand-espresso shadow-[3px_3px_0px_#583D32] hover:shadow-[1px_1px_0px_#583D32] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <span>View Cat Template ({breed.name})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Why This Beats AI Overviews Feature Block */}
        <section className="bg-brand-cream/40 rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-[4px_4px_0px_#583D32] space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-terracotta" />
            <h2 className="font-heading text-xl font-black text-brand-espresso">
              How PawTruth Breed Hubs Win Search Rankings
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-brand-espresso/80">
            <div className="bg-white rounded-xl border border-brand-espresso/30 p-4 space-y-1.5 shadow-[2px_2px_0px_#583D32]">
              <h3 className="font-heading font-black text-sm text-brand-espresso">1. Interactive Utility Hub</h3>
              <p>Direct links to calculators (weight predictions, crate ergonomics, WSAVA nutrition splits) provide high-engagement features AI search snippets cannot duplicate.</p>
            </div>
            <div className="bg-white rounded-xl border border-brand-espresso/30 p-4 space-y-1.5 shadow-[2px_2px_0px_#583D32]">
              <h3 className="font-heading font-black text-sm text-brand-espresso">2. Complete Schema Markup</h3>
              <p>Every profile renders verified MedicalWebPage, BreadcrumbList, and FAQPage schemas, qualifying for rich Google snippets and Knowledge Graph inclusion.</p>
            </div>
            <div className="bg-white rounded-xl border border-brand-espresso/30 p-4 space-y-1.5 shadow-[2px_2px_0px_#583D32]">
              <h3 className="font-heading font-black text-sm text-brand-espresso">3. Clinical Precision</h3>
              <p>All figures cite official AVMA, AAHA, and WSAVA standards, establishing topical authority and high E-E-A-T trust signals with search engines.</p>
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
