import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ShieldCheck,
  Heart,
  Activity,
  Award,
  Lock,
  Zap,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";

export const metadata: Metadata = {
  title: "About PawTruth | Evidence-Based Pet Health & Veterinary Calculators",
  description:
    "Discover PawTruth's mission: delivering peer-reviewed veterinary formulas, zero-tracking privacy, and clinical dog & cat calculators calibrated to AVMA, AAHA, and WSAVA standards.",
  keywords: [
    "about pawtruth",
    "veterinary calculators mission",
    "pet health algorithms",
    "AVMA standards pet health",
    "WSAVA nutrition calculator",
    "open pet health tools",
  ],
  alternates: {
    canonical: "https://pawtruth.com/about",
  },
  openGraph: {
    title: "About PawTruth | Independent Veterinary Calculator Suite",
    description:
      "Transforming clinical veterinary literature into instant, zero-tracking, interactive calculators for modern pet parents.",
    url: "https://pawtruth.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About PawTruth | Evidence-Based Pet Health Calculators",
    description:
      "Transforming clinical veterinary literature into instant, zero-tracking, interactive calculators for modern pet parents.",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://pawtruth.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: "https://pawtruth.com/about",
          },
        ],
      },
      {
        "@type": "AboutPage",
        name: "About PawTruth",
        description:
          "Independent veterinary calculation suite and clinical pet breed database developed with peer-reviewed medical protocols.",
        url: "https://pawtruth.com/about",
      },
      {
        "@type": "Organization",
        name: "PawTruth",
        url: "https://pawtruth.com",
        logo: "https://pawtruth.com/logo.png",
        sameAs: [],
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
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-mono font-bold text-brand-taupe"
        >
          <Link href="/" className="hover:text-brand-espresso transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-espresso">About PawTruth</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-10 shadow-[6px_6px_0px_#583D32] space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-[2px_2px_0px_#583D32] text-xs font-heading font-black uppercase">
            <Sparkles className="w-4 h-4 text-brand-espresso" />
            Editorial Mission & Philosophy
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-brand-espresso tracking-tight leading-tight">
            Evidence-Based Veterinary Precision for Every Pet Parent.
          </h1>
          <p className="text-base sm:text-lg font-medium text-brand-espresso/80 max-w-3xl leading-relaxed">
            The internet is flooded with pet folklore—from the debunked &quot;1 human year equals 7 dog years&quot; myth to dangerous homemade diet recipes lacking essential calcium-to-phosphorus ratios. PawTruth was built to bridge the gap between complex academic veterinary dockets and everyday pet care.
          </p>

          {/* Quick Pillars Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-brand-espresso/15">
            <div className="bg-[#FAF4EE] border-2 border-brand-espresso/25 rounded-2xl p-3 text-center shadow-paper-sm">
              <div className="font-heading text-xl sm:text-2xl font-black text-brand-terracotta">
                100% Free
              </div>
              <div className="text-[11px] font-mono font-bold text-brand-taupe uppercase">
                Zero Paywalls
              </div>
            </div>
            <div className="bg-[#FAF4EE] border-2 border-brand-espresso/25 rounded-2xl p-3 text-center shadow-paper-sm">
              <div className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                0 Telemetry
              </div>
              <div className="text-[11px] font-mono font-bold text-brand-taupe uppercase">
                Private In-Memory
              </div>
            </div>
            <div className="bg-[#FAF4EE] border-2 border-brand-espresso/25 rounded-2xl p-3 text-center shadow-paper-sm">
              <div className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                5+ Standards
              </div>
              <div className="text-[11px] font-mono font-bold text-brand-taupe uppercase">
                AVMA, AAHA, WSAVA
              </div>
            </div>
            <div className="bg-[#FAF4EE] border-2 border-brand-espresso/25 rounded-2xl p-3 text-center shadow-paper-sm">
              <div className="font-heading text-xl sm:text-2xl font-black text-emerald-700">
                &lt; 1 Second
              </div>
              <div className="text-[11px] font-mono font-bold text-brand-taupe uppercase">
                Instant Edge Speed
              </div>
            </div>
          </div>
        </section>

        {/* 3 Core Editorial Principles */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-terracotta" />
            <h2 className="font-heading text-2xl font-black text-brand-espresso">
              Our 3 Foundational Pillars
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 shadow-paper space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill">
                  <BookOpen className="w-6 h-6 text-brand-espresso" />
                </div>
                <h3 className="font-heading text-lg font-black text-brand-espresso">
                  1. Clinical Algorithmic Transparency
                </h3>
                <p className="text-xs sm:text-sm text-brand-taupe leading-relaxed font-sans font-medium">
                  We never use black-box estimates. Every single calculator on PawTruth explicitly cites its underlying physiological coefficients, Resting Energy Requirement (RER) exponent formulas, and published veterinary literature.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono font-bold text-brand-espresso/80 border-t border-brand-espresso/15">
                Standard: AVMA, AAHA & WSAVA
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 shadow-paper space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-cream border-2 border-brand-espresso flex items-center justify-center shadow-pill">
                  <Lock className="w-6 h-6 text-brand-espresso" />
                </div>
                <h3 className="font-heading text-lg font-black text-brand-espresso">
                  2. In-Memory Privacy (Zero Cookies)
                </h3>
                <p className="text-xs sm:text-sm text-brand-taupe leading-relaxed font-sans font-medium">
                  Your pet&apos;s medical weights, pregnancy ovulation dates, and triage inputs remain 100% on your local device. We run zero server-side user tracking databases and harvest zero personal telemetry.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono font-bold text-brand-espresso/80 border-t border-brand-espresso/15">
                Standard: Client-Side Execution Only
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 shadow-paper space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-brand-espresso flex items-center justify-center shadow-pill">
                  <Zap className="w-6 h-6 text-amber-900" />
                </div>
                <h3 className="font-heading text-lg font-black text-brand-espresso">
                  3. Emergency Readiness & Speed
                </h3>
                <p className="text-xs sm:text-sm text-brand-taupe leading-relaxed font-sans font-medium">
                  When a dog consumes baker&apos;s chocolate or dark cacao, every minute counts. Our Emergency Triage Calculators load in milliseconds without heavy scripts or popups, enabling instant mg/kg theobromine toxicity analysis.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono font-bold text-brand-espresso/80 border-t border-brand-espresso/15">
                Standard: Merck Veterinary Manual Triage
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Reference Standards Section */}
        <section className="bg-brand-cream/40 rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-10 shadow-[5px_5px_0px_#583D32] space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-espresso shadow-sm text-xs font-mono font-bold text-brand-espresso uppercase">
              <Award className="w-3.5 h-3.5 text-brand-terracotta" />
              Scientific Dockets We Index
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
              Peer-Reviewed Guidelines & Protocols
            </h2>
            <p className="text-xs sm:text-sm text-brand-taupe max-w-2xl font-sans font-medium">
              We continually audit our algorithms against newly released updates from top veterinary and kennel authorities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border-2 border-brand-espresso p-4 space-y-1.5 shadow-paper-sm">
              <div className="font-heading font-black text-sm text-brand-espresso flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                AVMA (American Veterinary Medical Assoc.)
              </div>
              <p className="text-xs text-brand-taupe leading-relaxed">
                Canine epigenetic aging curves, preventive vaccination guidelines, and annual wellness recommendations.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-brand-espresso p-4 space-y-1.5 shadow-paper-sm">
              <div className="font-heading font-black text-sm text-brand-espresso flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                WSAVA (World Small Animal Veterinary Assoc.)
              </div>
              <p className="text-xs text-brand-taupe leading-relaxed">
                Resting Energy Requirement (RER) exponential formulas and global feline/canine nutrition guidelines.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-brand-espresso p-4 space-y-1.5 shadow-paper-sm">
              <div className="font-heading font-black text-sm text-brand-espresso flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                AAHA (American Animal Hospital Assoc.)
              </div>
              <p className="text-xs text-brand-taupe leading-relaxed">
                Pediatric core immunization intervals (6 to 16 weeks) and multi-factor senior life stage benchmarks.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-brand-espresso p-4 space-y-1.5 shadow-paper-sm">
              <div className="font-heading font-black text-sm text-brand-espresso flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                AAFP (American Assoc. of Feline Practitioners)
              </div>
              <p className="text-xs text-brand-taupe leading-relaxed">
                Feline lifecycle stages, indoor enrichment protocols, hydration needs, and senior geriatric care.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-brand-espresso p-4 space-y-1.5 shadow-paper-sm">
              <div className="font-heading font-black text-sm text-brand-espresso flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                AKC & CFA Breed Standards
              </div>
              <p className="text-xs text-brand-taupe leading-relaxed">
                Morphological dimensions, official recognized coat genetics, and crate/litter box ergonomic standards.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-brand-espresso p-4 space-y-1.5 shadow-paper-sm">
              <div className="font-heading font-black text-sm text-brand-espresso flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Merck Veterinary Manual & ASPCA
              </div>
              <p className="text-xs text-brand-taupe leading-relaxed">
                Theobromine and caffeine toxic dosage thresholds (mg/kg) for immediate clinical risk categorization.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Integrity & Attribution */}
        <section className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-brand-taupe">
                <ShieldCheck className="w-4 h-4 text-brand-terracotta" />
                Editorial Integrity & Transparency
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                Independent Safety Directory
              </h3>
              <p className="text-xs sm:text-sm text-brand-taupe max-w-2xl font-sans font-medium leading-relaxed">
                PawTruth operates as an independent public consumer safety initiative, dedicated to verifiable veterinary health benchmarks, objective regulatory indexing, and zero-compromise pet parent advocacy.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-pill btn-pill-terracotta self-start sm:self-auto px-5 py-2.5 text-xs font-black shadow-paper-sm flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Explore Hubs CTA */}
        <section className="bg-brand-espresso text-[#FAF4EE] rounded-3xl border-2.5 border-brand-espresso p-8 sm:p-10 shadow-paper space-y-6">
          <div className="space-y-2">
            <h2 className="font-heading text-2xl sm:text-4xl font-black tracking-tight">
              Ready to Explore Veterinary Calculators?
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF4EE]/80 max-w-2xl leading-relaxed">
              Browse our complete directory of canine and feline clinical health tools, or inspect breed profiles with recognized colors and growth timelines.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/tools"
              className="btn-pill btn-pill-olive px-6 py-3 text-xs sm:text-sm font-black shadow-paper-sm flex items-center gap-2"
            >
              <span>Explore All Calculators</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/breed"
              className="btn-pill btn-pill-cream px-6 py-3 text-xs sm:text-sm font-black shadow-paper-sm flex items-center gap-2"
            >
              <span>Browse Breed Guides</span>
              <ArrowRight className="w-4 h-4 text-brand-espresso" />
            </Link>
          </div>
        </section>

        {/* AdSense Placement Container (Zero CLS) */}
        <AdSensePlaceholder
          slot="about-page-bottom"
          minHeight="min-h-[120px]"
          label="Sponsor Notice"
        />
      </div>
    </>
  );
}
