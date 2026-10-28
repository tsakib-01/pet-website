import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  Smile,
  Palette,
  AlertTriangle,
  Clock,
  Sparkles,
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
  const bName = breed.name.toLowerCase();

  return {
    title: `${breed.name} Care Guide: Colors, Temperament, Size & Health | PawTruth`,
    description: `Complete ${breed.name} veterinary guide: recognized & rare colors (${breed.coatVariations.slice(0, 3).join(", ")}), temperament scores, pediatric growth milestones, weight benchmarks, and 1-click interactive calculators.`,
    keywords: [
      bName,
      `${bName} colors`,
      `${bName} temperament`,
      `${bName} puppies`,
      `${bName} kitten`,
      `fluffy ${bName}`,
      `blue ${bName}`,
      `merle ${bName}`,
      `black ${bName}`,
      `${bName} lifespan`,
      `${bName} weight`,
      `${bName} crate size`,
      `${bName} calculator`,
      `${bName} health issues`,
    ],
    alternates: {
      canonical: `https://pawtruth.com/breed/${breed.slug}`,
    },
    openGraph: {
      title: `${breed.name} Clinical Guide: Colors, Temperament & Calculators`,
      description: breed.tagline,
      type: "article",
      url: `https://pawtruth.com/breed/${breed.slug}`,
      images: [
        {
          url: breed.heroImage,
          width: 1200,
          height: 675,
          alt: breed.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${breed.name} Clinical Guide: Colors, Temperament & Calculators`,
      description: breed.tagline,
      images: [breed.heroImage],
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

  // Structured Data Schema: MedicalWebPage + BreadcrumbList + FAQPage + ImageObject
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
        "url": `https://pawtruth.com/breed/${breed.slug}`,
        "aspect": ["Overview", "Temperament", "Color Variations", "Growth Milestones", "Health", "Nutritional Requirements"],
        "about": {
          "@type": "Thing",
          "name": breed.name,
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": breed.heroImage,
          "caption": breed.heroImageAlt,
        },
        "publisher": {
          "@type": "Organization",
          "name": "PawTruth",
          "url": "https://pawtruth.com",
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
        {/* Breadcrumb Navigation (Crawlable & Screen-reader compliant) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono font-bold text-brand-taupe">
          <Link href="/" className="hover:text-brand-espresso transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/breed" className="hover:text-brand-espresso transition-colors">
            Breeds
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-espresso font-semibold">{breed.name}</span>
        </nav>

        {/* ========================================================
            HERO HEADER & 2-COLUMN BALANCED SHOWCASE
            ======================================================== */}
        <section className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 lg:p-10 shadow-[6px_6px_0px_#583D32]">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Breed Identity & Facts */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-[2px_2px_0px_#583D32] text-xs font-heading font-black uppercase">
                  {isDog ? <Dog className="w-4 h-4" /> : <Cat className="w-4 h-4" />}
                  {isDog ? "Dog Breed Clinical Profile" : "Cat Breed Clinical Profile"}
                </div>
                <div className="text-xs font-mono font-bold text-brand-taupe">
                  {breed.standardGroup} • Origin: {breed.origin}
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="font-heading text-3xl sm:text-5xl font-black text-brand-espresso tracking-tight">
                  {breed.name}
                </h1>
                <p className="text-sm sm:text-base font-medium text-brand-espresso/80 leading-relaxed">
                  {breed.tagline}
                </p>
              </div>

              {/* Recognized Coat Patterns */}
              <div className="pt-2 border-t border-brand-espresso/15 space-y-2">
                <div className="text-xs font-heading font-black text-brand-espresso uppercase tracking-wider flex items-center gap-1.5">
                  <PawPrint className="w-3.5 h-3.5 text-brand-terracotta" />
                  Recognized Coat & Color Variations:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {breed.coatVariations.map((coat) => (
                    <span
                      key={coat}
                      className="px-2.5 py-1 bg-brand-cream/50 text-brand-espresso text-xs font-bold rounded-lg border border-brand-espresso/30"
                    >
                      {coat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Hero Highlights */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                  <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">Weight</div>
                  <div className="text-xs sm:text-sm font-heading font-black text-brand-espresso">{breed.metrics[0]?.value}</div>
                </div>
                <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                  <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">{isDog ? "Crate Size" : "Litter Box"}</div>
                  <div className="text-xs sm:text-sm font-heading font-black text-brand-espresso">{breed.metrics[2]?.value}</div>
                </div>
                <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                  <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">Lifespan</div>
                  <div className="text-xs sm:text-sm font-heading font-black text-brand-espresso">{breed.metrics[3]?.value}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Balanced Breed Portrait Card */}
            <div className="lg:col-span-5">
              <div className="relative w-full max-w-md mx-auto aspect-[4/3] sm:aspect-[16/11] max-h-[320px] rounded-2xl overflow-hidden border-2.5 border-brand-espresso shadow-[5px_5px_0px_#583D32] bg-brand-cream/40 group">
                <img
                  src={breed.heroImage}
                  alt={breed.heroImageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute bottom-2.5 right-2.5 bg-brand-espresso/85 backdrop-blur-sm text-brand-cream text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full border border-brand-cream/30">
                  Representative Photo
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            BLOCK 1: CLINICAL FAST SPECIFICATIONS TABLE
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
                <h3 className="text-xs font-mono font-bold text-brand-taupe uppercase tracking-wider">
                  {metric.label}
                </h3>
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
            BLOCK 2: TEMPERAMENT & BEHAVIORAL PROFILE
            ======================================================== */}
        <section className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-[5px_5px_0px_#583D32] space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-olive text-brand-espresso text-[11px] font-heading font-black uppercase tracking-wider border border-brand-espresso/30">
              <Smile className="w-3.5 h-3.5" />
              Behavior & Personality
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
              {breed.name} Temperament & Behavioral Profile
            </h2>
            <p className="text-sm text-brand-espresso/80 leading-relaxed max-w-3xl">
              {breed.temperament.overview}
            </p>
          </div>

          {/* Behavioral Trait Ratings */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {breed.temperament.traits.map((trait) => (
              <div
                key={trait.label}
                className="bg-brand-cream/30 rounded-2xl border-2 border-brand-espresso/30 p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-black text-sm text-brand-espresso">
                    {trait.label}
                  </h3>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span
                        key={dot}
                        className={`w-2.5 h-2.5 rounded-full border border-brand-espresso ${
                          dot <= trait.score
                            ? "bg-brand-terracotta"
                            : "bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-brand-espresso/75 leading-relaxed">
                  {trait.description}
                </p>
              </div>
            ))}
          </div>

          {/* Family Compatibility & Training Callout with Internal Linking */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-brand-espresso/15">
            <div className="p-4 rounded-xl bg-brand-olive/20 border border-brand-espresso/20 space-y-1.5">
              <h3 className="text-xs font-heading font-black text-brand-espresso uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-olive" />
                Family & Home Compatibility
              </h3>
              <p className="text-xs text-brand-espresso/80 leading-relaxed">
                {breed.temperament.familyCompatibility}{" "}
                {isDog ? (
                  <span>
                    Welcoming a new puppy? Explore our curated{" "}
                    <Link href="/tools/dog-name-generator" className="font-bold underline text-brand-espresso hover:text-brand-terracotta">
                      Dog Name Generator
                    </Link>{" "}
                    for inspiration.
                  </span>
                ) : (
                  <span>
                    Bringing home a kitten? Browse our curated{" "}
                    <Link href="/tools/cat-name-generator" className="font-bold underline text-brand-espresso hover:text-brand-terracotta">
                      Cat Name Generator
                    </Link>{" "}
                    for fitting names.
                  </span>
                )}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-brand-cream/60 border border-brand-espresso/20 space-y-1.5">
              <h3 className="text-xs font-heading font-black text-brand-espresso uppercase flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-brand-terracotta" />
                Training & Daily Management
              </h3>
              <p className="text-xs text-brand-espresso/80 leading-relaxed">
                {breed.temperament.trainingTips}{" "}
                <span>
                  Calibrate life-stage discipline and cognitive aging using the{" "}
                  <Link
                    href={isDog ? "/tools/dog-age-calculator" : "/tools/cat-age-calculator"}
                    className="font-bold underline text-brand-espresso hover:text-brand-terracotta"
                  >
                    {isDog ? "AVMA Dog Age Calculator" : "AAFP Cat Age Calculator"}
                  </Link>
                  .
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            BLOCK 3: COAT COLORS & GENETICS BREAKDOWN
            ======================================================== */}
        <section className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-[5px_5px_0px_#583D32] space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-cream text-brand-espresso text-[11px] font-heading font-black uppercase tracking-wider border border-brand-espresso/30">
              <Palette className="w-3.5 h-3.5 text-brand-terracotta" />
              Coat & Color Genetics
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
              {breed.name} Colors, Patterns & Coat Types
            </h2>
            <p className="text-sm text-brand-espresso/80 leading-relaxed max-w-3xl">
              {breed.colorGenetics.overview} <span className="font-semibold text-brand-espresso">Coat texture:</span> {breed.colorGenetics.coatType}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {breed.colorGenetics.palette.map((color) => (
              <div
                key={color.name}
                className="bg-brand-cream/20 rounded-2xl border-2 border-brand-espresso/30 p-4 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-heading font-black uppercase px-2 py-0.5 rounded-md border ${
                        color.category === "Standard (Official)"
                          ? "bg-brand-olive/30 text-brand-espresso border-brand-espresso/30"
                          : "bg-brand-terracotta/20 text-brand-terracotta border-brand-terracotta/40"
                      }`}
                    >
                      {color.category}
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-base text-brand-espresso">
                    {color.name}
                  </h3>
                  <p className="text-xs text-brand-espresso/80 leading-relaxed">
                    {color.description}
                  </p>
                </div>
                {color.geneticsNote && (
                  <div className="pt-2 border-t border-brand-espresso/10 text-[11px] font-mono text-brand-taupe">
                    🧬 {color.geneticsNote}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Health Considerations for Coat Colors */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-xs font-heading font-black text-amber-900 uppercase">
                Clinical Genetics & Coat Health Notice
              </h3>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                {breed.colorGenetics.healthConsiderations}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            BLOCK 4: PUPPY / KITTEN GROWTH MILESTONES
            ======================================================== */}
        <section className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-[5px_5px_0px_#583D32] space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-olive text-brand-espresso text-[11px] font-heading font-black uppercase tracking-wider border border-brand-espresso/30">
              <Clock className="w-3.5 h-3.5" />
              Growth Milestones
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
              {breed.name} {isDog ? "Puppy" : "Kitten"} Development Timeline
            </h2>
            <p className="text-sm text-brand-espresso/80 leading-relaxed max-w-3xl">
              {breed.growthMilestones.overview}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {breed.growthMilestones.stages.map((stg) => (
              <div
                key={stg.stage}
                className="bg-brand-cream/30 rounded-2xl border-2 border-brand-espresso/30 p-4 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-brand-taupe uppercase">
                    {stg.timeline}
                  </div>
                  <h3 className="font-heading font-black text-sm text-brand-espresso">
                    {stg.stage}
                  </h3>
                  <div className="inline-block px-2 py-0.5 rounded bg-brand-terracotta/10 text-brand-terracotta font-mono text-xs font-bold border border-brand-terracotta/20">
                    Target: {stg.benchmark}
                  </div>
                </div>
                <p className="text-xs text-brand-espresso/75 leading-relaxed pt-2 border-t border-brand-espresso/10">
                  {stg.guidance}
                </p>
              </div>
            ))}
          </div>

          {/* Contextual Internal Link Callout */}
          <div className="p-4 rounded-xl bg-brand-cream/50 border border-brand-espresso/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-brand-espresso font-medium">
              {isDog ? (
                <>Track pediatric weight checkpoints with our clinical <Link href="/tools/puppy-weight-calculator" className="font-bold underline text-brand-espresso hover:text-brand-terracotta">Puppy Weight Growth Predictor</Link> and verify inoculations with the <Link href="/tools/puppy-vaccination-schedule" className="font-bold underline text-brand-espresso hover:text-brand-terracotta">Puppy Vaccination Schedule</Link>.</>
              ) : (
                <>Planning a feline litter? Calculate expected delivery milestones using the <Link href="/tools/cat-pregnancy-calculator" className="font-bold underline text-brand-espresso hover:text-brand-terracotta">Queen Feline Gestation Tracker</Link>.</>
              )}
            </span>
            <Link
              href={isDog ? "/tools/puppy-weight-calculator" : "/tools/cat-pregnancy-calculator"}
              className="inline-flex items-center gap-1 font-heading font-black text-brand-terracotta hover:underline uppercase text-[11px] flex-shrink-0"
            >
              <span>Open Growth Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ========================================================
            BLOCK 5: SIZE SPECTRUM & "MINI" DISCLAIMER
            ======================================================== */}
        <section className="bg-brand-cream/40 rounded-2xl border-2 border-brand-espresso p-5 shadow-[3px_3px_0px_#583D32] space-y-2">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-brand-terracotta" />
            <h2 className="font-heading text-lg font-black text-brand-espresso">
              {breed.sizeVarieties.disclaimerTitle}
            </h2>
          </div>
          <p className="text-xs text-brand-espresso/80 leading-relaxed">
            {breed.sizeVarieties.disclaimerText}
          </p>
        </section>

        {/* ========================================================
            BLOCK 6: 1-CLICK INTERACTIVE CALCULATOR LAUNCHERS
            (High Utility / Defeats AI Overviews)
            ======================================================== */}
        <section className="bg-brand-cream/30 rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-[5px_5px_0px_#583D32] space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-terracotta text-white text-[11px] font-heading font-black uppercase tracking-wider">
              High Utility Calculators
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
              Interactive Veterinary Calculators for {breed.name}s
            </h2>
            <p className="text-sm text-brand-espresso/80">
              Run customized formulas calibrated specifically for {breed.name} biological benchmarks, weight curves, and life stages.
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
            BLOCK 7: CLINICAL HEALTH & SAFETY WATCHLIST
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
            BLOCK 8: DIET, NUTRITION & PORTION MANAGEMENT
            ======================================================== */}
        <section className="bg-white rounded-2xl border-2 border-brand-espresso p-6 shadow-[3px_3px_0px_#583D32] space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-brand-olive" />
            <h2 className="font-heading text-xl font-black text-brand-espresso">
              Portion Control & Nutrition Notes
            </h2>
          </div>
          <p className="text-sm text-brand-espresso/80 leading-relaxed">
            {breed.dietAndCareNotes}{" "}
            {isDog ? (
              <span>
                To calculate safe treat limits and avoid toxic snacks, use the{" "}
                <Link href="/tools/dog-chocolate-toxicity-calculator" className="font-bold underline text-brand-espresso hover:text-brand-terracotta">
                  Emergency Chocolate Toxicity Triage Tool
                </Link>
                .
              </span>
            ) : (
              <span>
                To balance canned moisture against dry food calories, launch the{" "}
                <Link href="/tools/cat-food-calculator-wet-and-dry" className="font-bold underline text-brand-espresso hover:text-brand-terracotta">
                  WSAVA Wet & Dry Calorie Splitter
                </Link>
                .
              </span>
            )}
          </p>
        </section>

        {/* ========================================================
            BLOCK 9: VETERINARY FAQ ACCORDION
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
                  <h3 className="inline font-heading font-black text-base sm:text-lg text-brand-espresso">
                    {faq.question}
                  </h3>
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
            BLOCK 10: SWITCH TEMPLATE LINK / DIRECTORY NAVIGATION
            ======================================================== */}
        {otherBreed && (
          <section className="bg-white rounded-2xl border-2 border-brand-espresso p-5 shadow-[3px_3px_0px_#583D32] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-brand-taupe uppercase">
                Compare Preview Templates
              </div>
              <h2 className="font-heading text-base font-black text-brand-espresso">
                View the {otherBreed.species === "dog" ? "Dog" : "Cat"} Template: {otherBreed.name}
              </h2>
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
