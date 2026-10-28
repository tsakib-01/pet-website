import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { BREED_DATABASE, getBreedBySlug, BreedData } from "@/data/breeds";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import {
  Dog,
  Cat,
  PawPrint,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Stethoscope,
  HelpCircle,
  Activity,
  Box,
  Scale,
  Calendar,
  Utensils,
  HeartPulse,
  Info,
  CheckCircle2,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BREED_DATABASE.map((breed) => ({
    slug: breed.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);

  if (!breed) {
    return { title: "Breed Profile Not Found" };
  }

  const speciesName = breed.species === "dog" ? "Dog" : "Cat";

  return {
    title: `${breed.name} ${speciesName} Care Guide, Size & Health Calculators | PawTruth`,
    description: `${breed.name} complete veterinary guide: accurate weight standards, ${breed.species === "dog" ? "crate dimensions" : "litter box size"}, WSAVA calorie requirements, hereditary health risks, and 1-click interactive calculators.`,
    keywords: [
      breed.name.toLowerCase(),
      `${breed.name.toLowerCase()} weight`,
      `${breed.name.toLowerCase()} lifespan`,
      `${breed.name.toLowerCase()} health issues`,
      `${breed.name.toLowerCase()} calculator`,
      `${breed.name.toLowerCase()} care guide`,
    ],
    openGraph: {
      title: `${breed.name} Clinical Guide & Breed Calculators`,
      description: breed.tagline,
      type: "article",
      images: [
        {
          url: breed.heroImage,
          width: 1200,
          height: 675,
          alt: breed.heroImageAlt,
        },
      ],
    },
  };
}

export default async function BreedDetailPage({ params }: Props) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);

  if (!breed) {
    notFound();
  }

  const isDog = breed.species === "dog";
  const otherBreed = BREED_DATABASE.find((b) => b.slug !== breed.slug);

  // Helper for rendering calculator icons
  const renderCalculatorIcon = (iconType: string) => {
    switch (iconType) {
      case "dog":
        return <Dog className="w-5 h-5 text-brand-terracotta" />;
      case "cat":
        return <Cat className="w-5 h-5 text-brand-olive" />;
      case "box":
        return <Box className="w-5 h-5 text-brand-espresso" />;
      case "scale":
        return <Scale className="w-5 h-5 text-brand-terracotta" />;
      case "calendar":
        return <Calendar className="w-5 h-5 text-brand-espresso" />;
      case "utensils":
        return <Utensils className="w-5 h-5 text-brand-terracotta" />;
      case "heartPulse":
      default:
        return <HeartPulse className="w-5 h-5 text-red-600" />;
    }
  };

  // Structured Data Schema: MedicalWebPage + BreadcrumbList + FAQPage
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
          {
            "@type": "ListItem",
            "position": 3,
            "name": breed.name,
            "item": `https://pawtruth.com/breed/${breed.slug}`,
          },
        ],
      },
      {
        "@type": "MedicalWebPage",
        "name": `${breed.name} Comprehensive Clinical Breed Guide`,
        "description": breed.tagline,
        "aspect": ["Overview", "Health", "Nutritional Requirements", "Physical Characteristics"],
        "about": {
          "@type": "Thing",
          "name": breed.name,
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": breed.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
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
          <Link href="/breed" className="hover:text-brand-espresso transition-colors">
            Breeds
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-espresso">{breed.name}</span>
        </nav>

        {/* ========================================================
            HERO HEADER & 16:9 VISUAL SHOWCASE
            ======================================================== */}
        <section className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-10 shadow-[6px_6px_0px_#583D32] space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-[2px_2px_0px_#583D32] text-xs font-heading font-black uppercase">
              {isDog ? <Dog className="w-4 h-4" /> : <Cat className="w-4 h-4" />}
              {isDog ? "Dog Breed Clinical Profile" : "Cat Breed Clinical Profile"}
            </div>
            <div className="text-xs font-mono font-bold text-brand-taupe">
              {breed.standardGroup} • Origin: {breed.origin}
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-brand-espresso tracking-tight">
              {breed.name}
            </h1>
            <p className="text-base sm:text-xl font-medium text-brand-espresso/80 max-w-3xl leading-relaxed">
              {breed.tagline}
            </p>
          </div>

          {/* 16:9 Visual Showcase Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2.5 border-brand-espresso shadow-[4px_4px_0px_#583D32] bg-brand-cream/40">
            <img
              src={breed.heroImage}
              alt={breed.heroImageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute bottom-3 right-3 bg-brand-espresso/80 backdrop-blur-sm text-brand-cream text-[11px] font-mono font-medium px-3 py-1 rounded-full border border-brand-cream/30">
              Representative Photo (Custom Image Update Pending)
            </div>
          </div>

          {/* Recognized Coat Patterns */}
          <div className="pt-2 border-t border-brand-espresso/15">
            <div className="text-xs font-heading font-black text-brand-espresso uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <PawPrint className="w-3.5 h-3.5 text-brand-terracotta" />
              Recognized Coat & Pattern Variations:
            </div>
            <div className="flex flex-wrap gap-2">
              {breed.coatVariations.map((coat) => (
                <span
                  key={coat}
                  className="px-3 py-1 bg-brand-cream/50 text-brand-espresso text-xs font-bold rounded-lg border border-brand-espresso/30"
                >
                  {coat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            BLOCK 1: CLINICAL CHEAT-SHEET / QUICK SPECS TABLE
            ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-terracotta" />
              <h2 className="font-heading text-2xl font-black text-brand-espresso">
                {breed.name} Fast Clinical Specifications
              </h2>
            </div>
            <span className="text-xs font-mono text-brand-taupe hidden sm:inline-block">
              AVMA / WSAVA Standards
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {breed.metrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-white rounded-2xl border-2 border-brand-espresso p-4 sm:p-5 shadow-[3px_3px_0px_#583D32] flex flex-col justify-between"
              >
                <div className="text-xs font-mono font-bold text-brand-taupe uppercase tracking-wider">
                  {metric.label}
                </div>
                <div className="text-xl sm:text-2xl font-heading font-black text-brand-espresso my-2">
                  {metric.value}
                </div>
                {metric.subtext && (
                  <div className="text-xs text-brand-espresso/70 font-medium">
                    {metric.subtext}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            BLOCK 2: 1-CLICK INTERACTIVE CALCULATOR LAUNCHERS
            (High Utility / Defeats AI Overviews)
            ======================================================== */}
        <section className="bg-brand-cream/30 rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-[5px_5px_0px_#583D32] space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-terracotta text-white text-[11px] font-heading font-black uppercase tracking-wider">
              High Utility Tools
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
              Interactive Calculators for Your {breed.name}
            </h2>
            <p className="text-sm text-brand-espresso/80">
              Run customized formulas calibrated specifically for {breed.name} biological benchmarks and life stages.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {breed.calculatorLinks.map((calc) => (
              <Link
                key={calc.title}
                href={calc.href}
                className="group bg-white rounded-2xl border-2 border-brand-espresso p-5 shadow-[3px_3px_0px_#583D32] hover:shadow-[1px_1px_0px_#583D32] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-brand-cream/60 border border-brand-espresso/20">
                      {renderCalculatorIcon(calc.iconType)}
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-brand-olive/50 text-brand-espresso border border-brand-espresso/20">
                      {calc.tag}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-black text-brand-espresso group-hover:text-brand-terracotta transition-colors">
                    {calc.title}
                  </h3>
                  <p className="text-xs text-brand-espresso/80 leading-relaxed">
                    {calc.description}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1 text-xs font-heading font-black text-brand-terracotta group-hover:translate-x-1 transition-transform">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================
            BLOCK 3: CLINICAL HEALTH & SAFETY WATCHLIST
            ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-red-600" />
            <h2 className="font-heading text-2xl font-black text-brand-espresso">
              Hereditary Health & Clinical Watchlist
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {breed.healthRisks.map((risk) => (
              <div
                key={risk.name}
                className="bg-white rounded-2xl border-2 border-brand-espresso p-5 shadow-[3px_3px_0px_#583D32] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-heading font-black uppercase px-2.5 py-0.5 rounded-md border ${
                        risk.severity === "High Watch"
                          ? "bg-red-100 text-red-700 border-red-300"
                          : "bg-amber-100 text-amber-800 border-amber-300"
                      }`}
                    >
                      {risk.severity}
                    </span>
                    <ShieldAlert className="w-4 h-4 text-brand-taupe" />
                  </div>
                  <h3 className="font-heading text-base font-black text-brand-espresso">
                    {risk.name}
                  </h3>
                  <p className="text-xs text-brand-espresso/80 leading-relaxed">
                    {risk.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-espresso/10 bg-brand-cream/30 -mx-5 -mb-5 p-4 rounded-b-2xl">
                  <div className="text-[11px] font-heading font-black text-brand-espresso uppercase mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-olive" />
                    At-Home Care Protocol:
                  </div>
                  <p className="text-xs text-brand-espresso/90 font-medium leading-relaxed">
                    {risk.actionableCare}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            BLOCK 4: DIET, NUTRITION & PORTION MANAGEMENT
            ======================================================== */}
        <section className="bg-white rounded-2xl border-2 border-brand-espresso p-6 shadow-[3px_3px_0px_#583D32] space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-brand-olive" />
            <h2 className="font-heading text-xl font-black text-brand-espresso">
              Portion Control & Nutrition Notes
            </h2>
          </div>
          <p className="text-sm text-brand-espresso/80 leading-relaxed">
            {breed.dietAndCareNotes}
          </p>
        </section>

        {/* ========================================================
            BLOCK 5: VETERINARY FAQ ACCORDION
            ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-terracotta" />
            <h2 className="font-heading text-2xl font-black text-brand-espresso">
              Frequently Asked Questions About {breed.name}s
            </h2>
          </div>

          <div className="space-y-3">
            {breed.faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group bg-white rounded-2xl border-2 border-brand-espresso p-5 shadow-[3px_3px_0px_#583D32] open:shadow-[4px_4px_0px_#583D32] transition-all cursor-pointer"
              >
                <summary className="font-heading font-black text-brand-espresso flex items-center justify-between gap-4 list-none select-none text-base sm:text-lg">
                  <span>{faq.question}</span>
                  <ChevronRight className="w-4 h-4 text-brand-terracotta transition-transform duration-200 group-open:rotate-90 flex-shrink-0" />
                </summary>
                <div className="mt-4 pt-3 border-t border-brand-espresso/15 text-sm text-brand-espresso/80 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ========================================================
            SWITCH TEMPLATE LINK / DIRECTORY NAVIGATION
            ======================================================== */}
        {otherBreed && (
          <section className="bg-white rounded-2xl border-2 border-brand-espresso p-5 shadow-[3px_3px_0px_#583D32] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-brand-taupe uppercase">
                Compare Preview Templates
              </div>
              <div className="font-heading text-base font-black text-brand-espresso">
                View the {otherBreed.species === "dog" ? "Dog" : "Cat"} Template: {otherBreed.name}
              </div>
            </div>
            <Link
              href={`/breed/${otherBreed.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-[2px_2px_0px_#583D32] font-heading font-black text-xs uppercase hover:bg-brand-olive/80 transition-colors"
            >
              {otherBreed.species === "dog" ? <Dog className="w-4 h-4" /> : <Cat className="w-4 h-4" />}
              <span>View {otherBreed.name} Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        )}

        {/* Fixed Minimum Height Ad Container (Zero CLS) */}
        <AdSensePlaceholder
          slot="breed-detail-bottom"
          minHeight="min-h-[120px]"
          label="Sponsor Advertisement"
        />
      </div>
    </>
  );
}
