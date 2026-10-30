import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Search, ArrowRight, CheckCircle2, PawPrint, Dog, Cat, HeartPulse, ShieldCheck, AlertTriangle, Scale, Utensils, Calendar, Box, Volume2, ChevronRight, Fish, Waves, Trophy } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import FaqAccordion from "@/components/FaqAccordion";
import { CALCULATOR_TOOLS } from "@/data/calculators";
import DogAgeCalculator from "@/components/calculators/DogAgeCalculator";

export const metadata: Metadata = {
  title: "PawTrusty — Evidence-Based Pet Health & Veterinary Calculators",
  description: "Free, clinical veterinary calculators and pet food safety recall directory for dogs and cats. Formulated on AVMA, WSAVA, AAHA & Merck Veterinary Manual standards.",
  alternates: {
    canonical: "https://pawtrusty.com",
  },
};

export default function HomePage() {
  const dogTools = CALCULATOR_TOOLS.filter((t) => t.category === "dog");
  const catTools = CALCULATOR_TOOLS.filter((t) => t.category === "cat");
  const petTools = CALCULATOR_TOOLS.filter((t) => t.category === "pet");

  const homeFaqs = [
    {
      q: "Are these pet calculators mathematically accurate?",
      a: "Yes. Every tool on PawTrusty is strictly formulated using official clinical standards established by leading veterinary bodies, including the American Veterinary Medical Association (AVMA), World Small Animal Veterinary Association (WSAVA), Merck Veterinary Manual, and the American Animal Hospital Association (AAHA)."
    },
    {
      q: "Why is the old 'multiply dog age by 7' rule no longer used?",
      a: "Modern veterinary research proves dogs age non-linearly. A dog reaches roughly 15 human years in their first year and 24 by age two. Their aging pace thereafter diverges dramatically by breed size: toy breeds age much slower (around 4 human years/year) while giant breeds age around 7 to 8 human years per calendar year."
    },
    {
      q: "How does the Dog Chocolate Toxicity calculator work in an emergency?",
      a: "It computes the exact concentration of toxic methylxanthines (theobromine and caffeine) in milligrams per kilogram of your dog's body weight. It immediately categorizes the ingestion into Non-Toxic, Moderate, Cardiotoxic, or Life-Threatening Neurotoxic risk with step-by-step clinical guidance."
    },
    {
      q: "Do I need to create an account or pay to use these tools?",
      a: "No. All calculation tools are 100% free forever with no accounts, no subscriptions, and zero data tracking. Computations execute entirely in your local browser memory."
    }
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PawTrusty",
    "url": "https://pawtrusty.com",
    "description": "Veterinary-accurate calculators and clinical pet health & recall directory.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://pawtrusty.com/recalls?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PawTrusty",
    "url": "https://pawtrusty.com",
    "logo": "https://pawtrusty.com/images/logo-pawtrusty.png",
    "description": "Independent, veterinary-calibrated calculation suite and pet safety directory."
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12 sm:space-y-16 overflow-hidden">
      {/* Master SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* 1. HERO SECTION */}
      <ScrollReveal direction="up">
        <section className="relative paper-box p-5 sm:p-8 md:p-12 overflow-hidden bg-[#FAF4EE]">
          {/* Pill Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="pill-badge pill-badge-alert text-[10px] sm:text-xs">
              <PawPrint className="w-3.5 h-3.5" /> VETERINARY CALCULATORS
            </span>
            <span className="pill-badge pill-badge-verified text-[10px] sm:text-xs">
              AVMA • WSAVA • ASPCA STANDARDS
            </span>
            <span className="pill-badge pill-badge-cream text-[10px] sm:text-xs hidden sm:inline-flex">
              100% Private In-Memory
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Hero Left Content */}
            <div className="order-2 lg:order-1 lg:col-span-7 space-y-5 sm:space-y-6">
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-brand-espresso leading-[1.08] tracking-tight">
                NEVER GUESS YOUR PET’S HEALTH STATS.{" "}
                <span className="inline-block bg-brand-terracotta text-[#FAF4EE] px-3 sm:px-4 py-0.5 sm:py-1 rounded-full border-2 border-brand-espresso shadow-pill transform -rotate-1 mt-1">
                  CLINICAL TOOLS.
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-brand-taupe leading-relaxed font-sans font-medium max-w-xl">
                Veterinary-calibrated chocolate toxicity triage, life-stage age converters, precision dual-diet food mixers, and pediatric puppy growth predictors.
              </p>

              {/* Quick Jump Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] sm:text-xs font-heading font-black uppercase text-brand-taupe mr-1">
                  Popular:
                </span>
                <Link
                  href="/tools/dog-age-calculator"
                  className="btn-pill btn-pill-cream px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-bold shadow-paper-sm hover:bg-brand-olive flex items-center gap-1.5"
                >
                  <Dog className="w-3.5 h-3.5 text-brand-espresso" />
                  Dog Age
                </Link>
                <Link
                  href="/tools/dog-chocolate-toxicity-calculator"
                  className="btn-pill btn-pill-terracotta px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-bold shadow-paper-sm flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-brand-olive" />
                  Chocolate Toxicity
                </Link>
                <Link
                  href="/tools/dog-crate-size-calculator"
                  className="btn-pill btn-pill-cream px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-bold shadow-paper-sm hover:bg-brand-olive flex items-center gap-1.5"
                >
                  <Box className="w-3.5 h-3.5 text-brand-espresso" />
                  Crate Size
                </Link>
                <Link
                  href="/tools/cat-age-calculator"
                  className="btn-pill btn-pill-cream px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-bold shadow-paper-sm hover:bg-brand-olive flex items-center gap-1.5"
                >
                  <Cat className="w-3.5 h-3.5 text-brand-espresso" />
                  Cat Age
                </Link>
                <Link
                  href="/tools/puppy-vaccination-schedule"
                  className="btn-pill btn-pill-cream px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-bold shadow-paper-sm hover:bg-brand-olive flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-brand-terracotta" />
                  Puppy Vaccine
                </Link>
              </div>

              {/* Direct Explorer Button */}
              <div className="pt-2">
                <Link
                  href="/tools"
                  className="btn-pill btn-pill-espresso px-6 sm:px-8 py-3 text-sm font-black shadow-paper-lg group inline-flex items-center gap-3"
                >
                  <span>Explore All Calculators</span>
                  <span className="btn-circle-icon bg-brand-olive text-brand-espresso">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Hero Right: Original Dog & Cat Image Collage */}
            <div className="order-1 lg:order-2 lg:col-span-5 relative flex justify-center pt-2 sm:pt-4">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <Link
                  href="/tools/dog-age-calculator"
                  className="block paper-box p-3 sm:p-4 bg-brand-cream border-2.5 border-brand-espresso transform -rotate-1 hover:rotate-0 transition-transform group"
                >
                  <img
                    src="/images/hero-dog.webp"
                    alt="French Bulldog"
                    width={700}
                    height={500}
                    className="w-full h-52 sm:h-64 object-cover rounded-xl border-2 border-brand-espresso"
                  />
                  <div className="pt-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-heading font-black text-sm sm:text-base text-brand-espresso block group-hover:text-brand-terracotta transition-colors">
                        French Bulldog (Age 3)
                      </span>
                      <span className="font-mono text-[10px] sm:text-xs text-brand-taupe font-bold">
                        Human Age: 28 Yrs • Weight: 26 lbs
                      </span>
                    </div>
                    <span className="pill-badge pill-badge-verified text-[10px]">
                      AVMA FORMULA
                    </span>
                  </div>
                </Link>

                <Link
                  href="/tools/cat-pregnancy-calculator"
                  className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-6 w-36 sm:w-48 paper-box p-2 sm:p-3 bg-[#FAF4EE] border-2 sm:border-2.5 border-brand-espresso transform rotate-3 hover:rotate-1 transition-transform shadow-paper group"
                >
                  <img
                    src="/images/hero-cat.webp"
                    alt="Pregnant Domestic Cat"
                    width={400}
                    height={300}
                    className="w-full h-24 sm:h-32 object-cover rounded-lg border border-brand-espresso"
                  />
                  <div className="pt-1.5 text-center">
                    <span className="font-heading text-[10px] sm:text-xs font-black text-brand-espresso block leading-tight group-hover:text-brand-terracotta transition-colors">
                      Cat Pregnancy Tracker
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9.5px] text-brand-taupe font-bold block mt-0.5">
                      1 Month in Pregnancy (Day 32)
                    </span>
                    <span className="pill-badge pill-badge-alert text-[8px] sm:text-[9px] py-0.2 mt-1">
                      Due in 31 Days
                    </span>
                  </div>
                </Link>

                <div className="absolute -top-3 -right-2 sm:-top-5 sm:-right-3 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2.5 border-brand-espresso bg-brand-olive flex flex-col items-center justify-center transform rotate-12 shadow-pill">
                  <span className="text-[10px] sm:text-xs font-mono font-black text-brand-espresso leading-none">
                    100%
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-heading font-black text-brand-espresso uppercase">
                    Free
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 2. AD CONTAINER (Core Web Vitals Reserved) */}
      <AdSensePlaceholder
        slot="home-hero-bottom"
        format="horizontal"
        minHeight="min-h-[120px]"
        label="Veterinary Sponsor Notice"
      />

      {/* 3. CORE SUITE: CALCULATORS CATEGORIZED */}
      <section className="space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="pill-badge pill-badge-alert text-xs">
            COMPLETE DIRECTORY
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-brand-espresso">
            All Specialized Tools
          </h2>
          <p className="text-brand-taupe text-sm sm:text-base">
            Click any interactive calculator to access instant computation, clinical thresholds, and veterinary guidelines.
          </p>
        </div>

        {/* DOG TOOLS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-brand-espresso">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill flex-shrink-0 aspect-square">
                <Dog className="w-4 h-4 text-brand-espresso flex-shrink-0" />
              </div>
              <h3 className="font-heading text-2xl font-black text-brand-espresso">
                Canine Health & Nutrition Tools
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-brand-taupe uppercase hidden sm:block">
              AVMA & AAHA Guidelines
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dogTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm hover:shadow-paper hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-brand-espresso/20">
                      <Dog className="w-3 h-3" /> Dog Tool
                    </span>
                  </div>
                  <h4 className="font-heading font-black text-base text-brand-espresso group-hover:text-brand-terracotta transition-colors mb-1">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-brand-taupe line-clamp-2 leading-relaxed">
                    {tool.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-brand-espresso/10 text-xs font-mono font-bold text-brand-terracotta flex items-center justify-between">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CAT TOOLS */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-brand-espresso">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill flex-shrink-0 aspect-square">
                <Cat className="w-4 h-4 text-brand-espresso flex-shrink-0" />
              </div>
              <h3 className="font-heading text-2xl font-black text-brand-espresso">
                Feline Health & Nutrition Tools
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-brand-taupe uppercase hidden sm:block">
              AAFP & WSAVA Guidelines
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {catTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm hover:shadow-paper hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-brand-espresso/20">
                      <Cat className="w-3 h-3" /> Cat Tool
                    </span>
                  </div>
                  <h4 className="font-heading font-black text-base text-brand-espresso group-hover:text-brand-terracotta transition-colors mb-1">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-brand-taupe line-clamp-2 leading-relaxed">
                    {tool.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-brand-espresso/10 text-xs font-mono font-bold text-brand-terracotta flex items-center justify-between">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* UNIVERSAL PET TOOLS */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-brand-espresso">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill flex-shrink-0 aspect-square">
                <PawPrint className="w-4 h-4 text-brand-espresso flex-shrink-0" />
              </div>
              <h3 className="font-heading text-2xl font-black text-brand-espresso">
                Universal Pet &amp; Specialty Tools
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-brand-taupe uppercase hidden sm:block">
              All Companion Species
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {petTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white border-2 border-brand-espresso rounded-2xl p-5 shadow-paper-sm hover:shadow-paper hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-brand-espresso/20">
                      {tool.iconName === "Fish" ? (
                        <Fish className="w-3 h-3 flex-shrink-0" />
                      ) : tool.iconName === "Waves" ? (
                        <Waves className="w-3 h-3 flex-shrink-0" />
                      ) : tool.iconName === "Trophy" ? (
                        <Trophy className="w-3 h-3 flex-shrink-0" />
                      ) : tool.iconName === "Scale" ? (
                        <Scale className="w-3 h-3 flex-shrink-0" />
                      ) : (
                        <PawPrint className="w-3 h-3 flex-shrink-0" />
                      )}
                      {tool.iconName === "Fish"
                        ? "Aquarium Tool"
                        : tool.iconName === "Waves"
                        ? "Aquascaping Tool"
                        : tool.iconName === "Trophy"
                        ? "Angling Tool"
                        : tool.iconName === "Scale"
                        ? "Equine Tool"
                        : "Pet Tool"}
                    </span>
                  </div>
                  <h4 className="font-heading font-black text-lg text-brand-espresso group-hover:text-brand-terracotta transition-colors mb-1">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-brand-taupe leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-espresso/10 text-xs font-mono font-bold text-brand-terracotta flex items-center justify-between">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LIVE INLINE DEMO (Dog Age Calculator on Home Page) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
              Try It Live: Dog Age Calculator
            </h3>
            <p className="text-xs sm:text-sm text-brand-taupe font-mono">
              Test real-time calculation with breed size scaling right here:
            </p>
          </div>
          <Link
            href="/tools/dog-age-calculator"
            className="btn-pill btn-pill-cream px-4 py-1.5 text-xs font-bold hidden sm:inline-flex"
          >
            Full Page View &rarr;
          </Link>
        </div>
        <DogAgeCalculator />
      </section>

      {/* 5. VETERINARY CLINICAL INTEGRITY NOTICE */}
      <section className="paper-box p-6 sm:p-8 bg-brand-olive/20 border-2.5 border-brand-espresso rounded-3xl space-y-3 shadow-paper">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill">
            <ShieldCheck className="w-5 h-5 text-brand-espresso" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              100% Scientifically Verified Calculations
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              Zero Internet Myths • Certified Veterinary Guidelines
            </p>
          </div>
        </div>
        <p className="text-sm text-brand-espresso leading-relaxed max-w-4xl">
          PawTrusty calculations are built directly upon published formulas from the <strong>American Veterinary Medical Association (AVMA)</strong>, the <strong>World Small Animal Veterinary Association (WSAVA)</strong>, the <strong>American Animal Hospital Association (AAHA)</strong>, and the <strong>ASPCA Animal Poison Control Center</strong>. All processing is executed client-side in memory for complete privacy and instant speed.
        </p>
      </section>

      {/* 5.5. PROGRAMMATIC BREED CLINICAL HUBS (High-Intent Internal Linking) */}
      <section className="bg-brand-cream/35 border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-[5px_5px_0px_#583D32] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-terracotta text-white text-[11px] font-heading font-black uppercase tracking-wider mb-1.5">
              Top Canine & Feline Breeds
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-brand-espresso">
              Clinical Breed Standards & Calculators
            </h2>
            <p className="text-xs sm:text-sm text-brand-taupe">
              Explore weight curves, coat genetics, crate sizing, and custom calculators for popular dog and cat breeds.
            </p>
          </div>
          <Link
            href="/breed"
            className="btn-pill btn-pill-espresso px-4 py-2 text-xs font-black shadow-paper-sm self-start sm:self-auto flex-shrink-0 inline-flex items-center gap-1.5"
          >
            <span>Browse All Breeds</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/breed/french-bulldog"
            className="bg-white border-2 border-brand-espresso rounded-2xl p-5 shadow-[3px_3px_0px_#583D32] hover:shadow-[1px_1px_0px_#583D32] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-between group"
          >
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-brand-espresso/20">
                <Dog className="w-3 h-3" /> Dog Breed Profile
              </span>
              <h3 className="font-heading font-black text-lg text-brand-espresso group-hover:text-brand-terracotta transition-colors">
                French Bulldog Care Guide & Presets
              </h3>
              <p className="text-xs text-brand-taupe">
                16–28 lbs benchmarks, 24" crate sizing, BOAS watchlist, and age multipliers.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-brand-terracotta group-hover:translate-x-1 transition-transform flex-shrink-0 ml-3" />
          </Link>

          <Link
            href="/breed/ragdoll"
            className="bg-white border-2 border-brand-espresso rounded-2xl p-5 shadow-[3px_3px_0px_#583D32] hover:shadow-[1px_1px_0px_#583D32] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-between group"
          >
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-brand-espresso/20">
                <Cat className="w-3 h-3" /> Cat Breed Profile
              </span>
              <h3 className="font-heading font-black text-lg text-brand-espresso group-hover:text-brand-terracotta transition-colors">
                Ragdoll Cat Care Guide & Presets
              </h3>
              <p className="text-xs text-brand-taupe">
                3–4 yr growth timeline, wet/dry food splitter, HCM screening, and point coat varieties.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-brand-terracotta group-hover:translate-x-1 transition-transform flex-shrink-0 ml-3" />
          </Link>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-10 shadow-paper space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="pill-badge pill-badge-alert text-xs">VET VERIFIED</span>
          <h2 className="font-heading text-3xl font-black text-brand-espresso">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-brand-taupe">
            Everything you need to know about our formulas, safety thresholds, and computational standards.
          </p>
        </div>
        <FaqAccordion items={homeFaqs} />
      </section>
    </div>
  );
}
