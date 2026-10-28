import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getAllRecallBrands, getRecallBrandBySlug } from "@/data/recalls";
import BrandLotChecker from "@/components/recalls/BrandLotChecker";
import BrandLogo from "@/components/recalls/BrandLogo";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import FaqAccordion from "@/components/FaqAccordion";
import {
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Building2,
  Calendar,
  AlertCircle,
  FileText,
  HeartPulse,
  RotateCcw,
  Scale,
  Utensils,
  Dog,
  Cat,
  ArrowRight,
  Info,
  CheckCircle2,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const brands = getAllRecallBrands();
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getRecallBrandBySlug(slug);

  if (!brand) {
    return { title: "Brand Not Found — PawTruth" };
  }

  const currentYear = new Date().getFullYear();
  return {
    title: `${brand.name} Dog & Cat Food Recall History (${currentYear}) — PawTruth`,
    description: `Official FDA recall record, lot number lookup, and safety history for ${brand.name}. Check whether your kibble or canned lot is affected by active Salmonella, mold, or Vitamin D dockets.`,
    keywords: [
      `${brand.name.toLowerCase()} recall`,
      `${brand.name.toLowerCase()} dog food recall`,
      `${brand.name.toLowerCase()} cat food recall`,
      `${brand.name.toLowerCase()} recall history`,
      `${brand.name.toLowerCase()} lot numbers`,
      "pet food recall checker",
      "fda pet food dockets",
    ],
    alternates: {
      canonical: `https://pawtruth.com/brand/${brand.slug}`,
    },
    openGraph: {
      title: `${brand.name} Safety Dossier & Recall History | PawTruth`,
      description: brand.statusSummary,
      type: "article",
      url: `https://pawtruth.com/brand/${brand.slug}`,
    },
  };
}

export default async function BrandRecallPage({ params }: Props) {
  const { slug } = await params;
  const brand = getRecallBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const isClean = brand.totalRecallsCount === 0;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": `${brand.name} Recall History & Safety Record`,
    "description": brand.statusSummary,
    "url": `https://pawtruth.com/brand/${brand.slug}`,
    "about": {
      "@type": "Product",
      "name": brand.name,
      "brand": {
        "@type": "Brand",
        "name": brand.name,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono font-bold text-brand-taupe">
          <Link href="/" className="hover:text-brand-espresso transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/recalls" className="hover:text-brand-espresso transition-colors">
            Pet Food Recalls
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-espresso">{brand.name}</span>
        </nav>

        {/* Brand Header Dossier Card */}
        <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <BrandLogo domain={brand.websiteDomain} name={brand.name} size="lg" className="mt-1 shadow-paper" />
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-black uppercase border border-brand-espresso/20 bg-brand-cream/80 text-brand-espresso">
                  <Building2 className="w-3.5 h-3.5 text-brand-leaf" />
                  {brand.parentCompany}
                </div>
                <h1 className="font-heading text-3xl sm:text-5xl font-black text-brand-espresso tracking-tight">
                  {brand.name}
                </h1>
                <p className="text-xs sm:text-sm font-sans text-brand-taupe">
                  Headquarters: <strong>{brand.headquarters}</strong> &bull; Founded: <strong>{brand.foundedYear}</strong>
                </p>
              </div>
            </div>

            {/* Safety Rating Pill */}
            <div className="flex-shrink-0">
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border-2 font-heading font-black text-xs sm:text-sm shadow-paper-sm ${
                  brand.safetyTier === "Clean / Verified Safe"
                    ? "bg-emerald-100 text-emerald-950 border-emerald-600"
                    : brand.safetyTier === "High Watch"
                    ? "bg-rose-100 text-rose-950 border-rose-600 animate-pulse"
                    : "bg-amber-100 text-amber-950 border-amber-500"
                }`}
              >
                {brand.safetyTier === "Clean / Verified Safe" ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-brand-terracotta flex-shrink-0" />
                )}
                <span>{brand.safetyTier}</span>
              </span>
            </div>
          </div>

          <p className="text-sm font-sans text-brand-espresso/80 leading-relaxed border-t border-brand-espresso/10 pt-4">
            {brand.statusSummary}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-[#FAF4EE] rounded-xl border border-brand-espresso/15 text-center">
              <div className="text-[10px] font-mono font-bold uppercase text-brand-taupe">Total FDA Recalls</div>
              <div className="font-heading font-black text-xl text-brand-espresso mt-0.5">
                {brand.totalRecallsCount}
              </div>
            </div>

            <div className="p-3 bg-[#FAF4EE] rounded-xl border border-brand-espresso/15 text-center">
              <div className="text-[10px] font-mono font-bold uppercase text-brand-taupe">Last Action Date</div>
              <div className="font-heading font-bold text-sm text-brand-espresso mt-1">
                {brand.lastRecallDate || "Never Recalled"}
              </div>
            </div>

            <div className="p-3 bg-[#FAF4EE] rounded-xl border border-brand-espresso/15 text-center">
              <div className="text-[10px] font-mono font-bold uppercase text-brand-taupe">Species Covered</div>
              <div className="font-heading font-bold text-sm text-brand-espresso mt-1 capitalize">
                {brand.species === "both" ? "Dogs & Cats" : `${brand.species}s Only`}
              </div>
            </div>

            <div className="p-3 bg-[#FAF4EE] rounded-xl border border-brand-espresso/15 text-center">
              <div className="text-[10px] font-mono font-bold uppercase text-brand-taupe">Audit Status</div>
              <div className="font-heading font-bold text-sm text-emerald-700 mt-1">
                FDA OpenData Active
              </div>
            </div>
          </div>
        </div>

        {/* Interactive "Check My Bag" Lot Code Checker */}
        <div>
          <BrandLotChecker brandName={brand.name} recalls={brand.recalls} />
        </div>

        {/* Core Web Vitals Fixed Ad Banner */}
        <div className="py-2">
          <AdSensePlaceholder
            slot="brand-mid-dossier"
            format="horizontal"
            minHeight="min-h-[120px]"
            label="Consumer Safety Sponsor"
          />
        </div>

        {/* Complete Historical Recall Docket Archive */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b-2 border-brand-espresso">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-terracotta" />
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                FDA Recall Archive &amp; Docket History ({brand.name})
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-brand-taupe">
              {brand.recalls.length} Documented Dockets
            </span>
          </div>

          {isClean ? (
            <div className="bg-emerald-50/80 border-2.5 border-emerald-500 rounded-3xl p-7 shadow-paper text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full border-2 border-emerald-600 flex items-center justify-center mx-auto text-emerald-800">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-black text-emerald-950">
                Verified Clean Manufacturing Record
              </h3>
              <p className="text-xs sm:text-sm font-sans text-emerald-900/80 max-w-xl mx-auto leading-relaxed">
                {brand.name} has zero active or historical FDA Class I or Class II enforcement dockets on record.
                Their production facilities have maintained a 100% spotless regulatory record under federal monitoring.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {brand.recalls.map((docket) => (
                <div
                  key={docket.docketNumber}
                  className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-7 shadow-paper space-y-5"
                >
                  {/* Docket Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-brand-espresso/15">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-brand-terracotta">
                          {docket.docketNumber}
                        </span>
                        <span>&bull;</span>
                        <span className="text-xs font-mono font-bold text-brand-taupe">
                          {docket.date}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso">
                        {docket.hazardType}: {docket.severityDescription}
                      </h3>
                    </div>

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-black uppercase border self-start sm:self-auto ${
                        docket.classification === "Class I"
                          ? "bg-rose-100 text-rose-900 border-rose-500"
                          : "bg-amber-100 text-amber-900 border-amber-400"
                      }`}
                    >
                      {docket.classification} Hazard
                    </span>
                  </div>

                  {/* Official Reason */}
                  <div className="text-xs sm:text-sm font-sans text-brand-espresso/80 leading-relaxed bg-[#FAF4EE] p-4 rounded-2xl border border-brand-espresso/15">
                    <strong>Official FDA Docket Finding:</strong> {docket.reason}
                  </div>

                  {/* Affected Products & Lot Numbers Table */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso/70">
                      Recalled Lots &amp; Product Details:
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono border-collapse">
                        <thead>
                          <tr className="bg-brand-cream border-b-2 border-brand-espresso text-brand-espresso font-bold">
                            <th className="p-2.5">Product Name</th>
                            <th className="p-2.5">Packaging Size</th>
                            <th className="p-2.5">Affected Lot Codes</th>
                            <th className="p-2.5">Best-By Expiration</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-espresso/10">
                          {docket.affectedProducts.map((prod, pIdx) => (
                            <tr key={pIdx} className="hover:bg-brand-light-gold/10">
                              <td className="p-2.5 font-bold font-heading text-brand-espresso">
                                {prod.name}
                              </td>
                              <td className="p-2.5 text-brand-taupe">{prod.size}</td>
                              <td className="p-2.5 text-rose-700 font-bold">
                                {prod.lotCodes.join(", ")}
                              </td>
                              <td className="p-2.5 text-brand-taupe">{prod.bestBy}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Distribution & Symptoms */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-brand-cream/50 border border-brand-espresso/15 space-y-2">
                      <div className="text-xs font-heading font-black text-brand-espresso flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-brand-terracotta" />
                        Clinical Symptoms to Monitor:
                      </div>
                      <ul className="text-xs font-sans text-brand-taupe space-y-1 list-disc list-inside">
                        {docket.clinicalSymptoms.map((sym, sIdx) => (
                          <li key={sIdx}>{sym}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-brand-cream/50 border border-brand-espresso/15 space-y-2">
                      <div className="text-xs font-heading font-black text-brand-espresso flex items-center gap-1.5">
                        <RotateCcw className="w-4 h-4 text-brand-leaf" />
                        Consumer Return &amp; Refund Protocol:
                      </div>
                      <ul className="text-xs font-sans text-brand-taupe space-y-1 list-disc list-inside">
                        {docket.actionSteps.map((step, aIdx) => (
                          <li key={aIdx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cross-Tool Clinical Recommendations */}
        <div className="bg-brand-cream/60 border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-7 shadow-paper space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso">
            <HeartPulse className="w-4 h-4 text-brand-terracotta" />
            Veterinary Health &amp; Triage Tools for {brand.name} Owners
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/tools/dog-chocolate-toxicity-calculator"
              className="p-4 rounded-2xl bg-white border-2 border-brand-espresso/20 hover:border-brand-espresso shadow-sm transition-all group"
            >
              <div className="font-heading font-bold text-xs text-brand-espresso group-hover:text-brand-terracotta flex items-center justify-between">
                <span>Emergency Toxicity Triage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <p className="text-[11px] font-sans text-brand-taupe mt-1">
                Calculate toxin levels by dog body weight in mg/kg.
              </p>
            </Link>

            <Link
              href="/tools/cat-food-calculator-wet-and-dry"
              className="p-4 rounded-2xl bg-white border-2 border-brand-espresso/20 hover:border-brand-espresso shadow-sm transition-all group"
            >
              <div className="font-heading font-bold text-xs text-brand-espresso group-hover:text-brand-terracotta flex items-center justify-between">
                <span>Wet &amp; Dry Food Portioner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <p className="text-[11px] font-sans text-brand-taupe mt-1">
                WSAVA calorie-balanced daily split rations.
              </p>
            </Link>

            <Link
              href="/tools/dog-age-calculator"
              className="p-4 rounded-2xl bg-white border-2 border-brand-espresso/20 hover:border-brand-espresso shadow-sm transition-all group"
            >
              <div className="font-heading font-bold text-xs text-brand-espresso group-hover:text-brand-terracotta flex items-center justify-between">
                <span>Dog Age Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <p className="text-[11px] font-sans text-brand-taupe mt-1">
                AVMA weight-adjusted biological human age.
              </p>
            </Link>
          </div>
        </div>

        {/* 5+ PAA Frequently Asked Questions Accordion */}
        <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper space-y-4">
          <FaqAccordion
            title={`Frequently Asked Questions About ${brand.name} Recalls`}
            subtitle="Verified regulatory answers to common pet parent questions regarding manufacturing and safety."
            items={brand.faqs.map((f) => ({
              q: f.question,
              a: f.answer,
            }))}
          />
        </div>

        {/* Mandatory Regulatory Notice & Legal Disclaimer */}
        <div className="p-4 rounded-2xl bg-brand-cream/40 border border-brand-espresso/20 text-[11px] font-sans text-brand-taupe leading-relaxed">
          <strong className="text-brand-espresso">Official FDA Public Safety Notice:</strong> PawTruth is an independent consumer pet health directory that indexes public enforcement reports published by the U.S. Food and Drug Administration (FDA) and state agricultural departments. PawTruth is not affiliated with, endorsed by, or sponsored by {brand.name} or the FDA. If your pet exhibits acute symptoms of foodborne illness, contact a licensed veterinarian or emergency animal hospital immediately.
        </div>
      </div>
    </>
  );
}
