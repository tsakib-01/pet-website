import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Scale, AlertOctagon, ClipboardCheck } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import BrandCompareWidget from "@/components/BrandCompareWidget";
import { brandsData } from "@/data/brands";

export function generateStaticParams() {
  return Object.keys(brandsData).map((slug) => ({ slug }));
}

export default async function BrandDossierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = brandsData[slug.toLowerCase()] || brandsData["blue-buffalo"];

  if (!brand) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-12 overflow-hidden">
      {/* Back button & Brand Quick Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="btn-pill btn-pill-cream px-3.5 sm:px-4 py-2 text-xs font-black shadow-paper-sm hover:bg-brand-olive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </Link>

        {/* Quick Brand Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <span className="text-brand-taupe font-bold mr-1 hidden sm:inline">Compare:</span>
          {Object.values(brandsData).slice(0, 5).map((b) => (
            <Link
              key={b.slug}
              href={`/brand/${b.slug}`}
              className={`btn-pill px-2.5 py-1 text-[11px] font-bold ${
                b.slug === brand.slug ? "btn-pill-espresso" : "btn-pill-cream"
              }`}
            >
              {b.name}
            </Link>
          ))}
        </div>
      </div>

      {/* BRAND DOSSIER HEADER */}
      <ScrollReveal direction="up">
        <section className="relative paper-box p-5 sm:p-8 md:p-10 bg-[#FAF4EE] border-2.5 border-brand-espresso">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2.5 border-brand-espresso/30 pb-6 sm:pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-cream border-2.5 border-brand-espresso rounded-3xl flex flex-col items-center justify-center p-2 shadow-pill transform -rotate-2 flex-shrink-0">
                <span className="font-heading font-black text-xl sm:text-2xl text-brand-espresso">
                  {brand.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-brand-taupe uppercase font-bold">
                  {brand.name.split(" ")[0]}
                </span>
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill-badge pill-badge-cream text-[10px]">
                    Dossier #{brand.slug.toUpperCase()}-2026
                  </span>
                  <span className="pill-badge pill-badge-verified text-[10px]">
                    {brand.manufacturingModel}
                  </span>
                  <span className="pill-badge bg-brand-terracotta/20 text-brand-terracotta border-brand-terracotta text-[10px]">
                    {brand.inspectionComplianceStatus}
                  </span>
                </div>
                <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-brand-espresso tracking-tight">
                  {brand.name} Safety Dossier
                </h1>
                <p className="font-mono text-[11px] sm:text-xs text-brand-taupe font-bold">
                  {brand.parentCompany} • Est. {brand.establishedYear} • {brand.headquarters}
                </p>
              </div>
            </div>

            {/* Large Rubber Safety Grade Badge */}
            <div className="flex flex-col items-center self-stretch sm:self-auto">
              <div className="border-3 border-dashed border-brand-terracotta bg-brand-cream/80 p-4 sm:p-5 rounded-3xl transform rotate-1 sm:rotate-2 shadow-pill text-center w-full sm:w-auto">
                <span className="font-mono text-[10px] font-bold text-brand-taupe uppercase block">
                  FDA Safety Rating
                </span>
                <span className="font-heading text-4xl sm:text-6xl font-black text-brand-terracotta tracking-tight">
                  GRADE {brand.safetyGrade}
                </span>
                <span className="pill-badge pill-badge-alert text-[10px] mt-1">
                  {brand.totalRecalls10Yr} Recalls (10 Years)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5 sm:pt-6 font-mono text-xs">
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">10-Yr Recalls:</span>
              <span className="font-heading font-black text-base sm:text-lg text-brand-espresso">{brand.totalRecalls10Yr} Recorded</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">US Market Share:</span>
              <span className="font-heading font-black text-base sm:text-lg text-brand-terracotta">{brand.marketShareUS}</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Safety Index:</span>
              <span className="font-heading font-black text-base sm:text-lg text-brand-espresso">{brand.safetyScore}/100</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Facility Model:</span>
              <span className="font-heading font-black text-xs sm:text-sm text-brand-olive leading-tight">{brand.manufacturingModel}</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* AD CONTAINER */}
      <AdSensePlaceholder slot="brand-top-billboard-02" format="banner" />

      {/* TWO COLUMN DOSSIER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Recall History Timeline */}
        <div className="lg:col-span-8 space-y-8">
          {/* Brand Overview & Forensic Summary */}
          <ScrollReveal direction="up">
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-4">
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-brand-espresso border-b-2.5 border-brand-espresso pb-3">
                Executive Safety Profile: {brand.name}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-brand-taupe leading-relaxed font-medium">
                {brand.overviewSummary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-brand-cream/70 border-2 border-brand-espresso/20 rounded-2xl space-y-2">
                  <span className="font-heading font-black text-xs uppercase text-brand-olive block">
                    Verified Quality Strengths:
                  </span>
                  <ul className="space-y-1.5 text-xs font-sans text-brand-espresso">
                    {brand.safetyStrengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-olive flex-shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-brand-cream/70 border-2 border-brand-espresso/20 rounded-2xl space-y-2">
                  <span className="font-heading font-black text-xs uppercase text-brand-terracotta block">
                    Vulnerabilities & Risk Points:
                  </span>
                  <ul className="space-y-1.5 text-xs font-sans text-brand-espresso">
                    {brand.safetyVulnerabilities.map((vuln, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-brand-terracotta flex-shrink-0 mt-0.5" />
                        <span>{vuln}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Historical FDA Recall Timeline */}
          <ScrollReveal direction="up" delayMs={100}>
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-6">
              <div className="flex items-center justify-between border-b-2.5 border-brand-espresso pb-3">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-brand-espresso">
                    FDA Enforcement Dockets Timeline
                  </h2>
                  <p className="text-xs font-sans text-brand-taupe font-medium mt-0.5">
                    Verified federal recall notices filed with the FDA Center for Veterinary Medicine.
                  </p>
                </div>
                <span className="pill-badge pill-badge-cream text-[10px] hidden sm:inline-block">
                  OpenFDA Docket Verified
                </span>
              </div>

              {brand.historicalRecalls.length === 0 ? (
                <div className="p-6 bg-brand-olive/20 border-2 border-brand-olive rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-brand-olive mx-auto" />
                  <h4 className="font-heading text-base font-black text-brand-espresso">Spotless 10-Year Record</h4>
                  <p className="text-xs font-sans text-brand-taupe">Zero FDA product recall dockets have been registered against this brand over the last decade.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {brand.historicalRecalls.map((recall, idx) => (
                    <div key={idx} className="p-4 sm:p-5 bg-brand-cream/80 border-2 border-brand-espresso/30 rounded-2xl space-y-2 shadow-paper-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-espresso/20 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="pill-badge pill-badge-alert text-[10px]">
                            {recall.severity} RECALL
                          </span>
                          <span className="font-mono text-xs font-bold text-brand-espresso">
                            Year: {recall.year}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] sm:text-xs text-brand-taupe font-bold">
                          Docket: {recall.docket}
                        </span>
                      </div>
                      <h3 className="font-heading text-base sm:text-lg font-black text-brand-espresso">
                        {recall.product}
                      </h3>
                      <p className="text-xs font-sans text-brand-taupe leading-relaxed font-medium">
                        {recall.hazard}
                      </p>
                      <div className="text-xs font-mono text-brand-olive font-bold flex items-center gap-1.5 pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-olive" />
                        Status: {recall.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Product Line Safety Matrix */}
          <ScrollReveal direction="up" delayMs={150}>
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-4">
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-brand-espresso border-b-2.5 border-brand-espresso pb-3">
                Product Line Safety Matrix
              </h2>
              <div className="space-y-3 font-sans text-xs">
                {brand.productLineSafetyMatrix.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-brand-cream/60 border-2 border-brand-espresso/25 rounded-2xl">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-black text-sm text-brand-espresso">
                          {item.line}
                        </span>
                        <span className="pill-badge pill-badge-cream text-[9px]">
                          {item.format}
                        </span>
                      </div>
                      <p className="text-brand-taupe font-medium text-xs">
                        {item.auditNote}
                      </p>
                    </div>
                    <span className={`pill-badge text-[10px] self-start sm:self-center flex-shrink-0 ${
                      item.safetyTier === "Verified Clean Tier" ? "pill-badge-verified" : item.safetyTier === "Recalled Batch Isolated" ? "pill-badge-alert" : "pill-badge-cream"
                    }`}>
                      {item.safetyTier}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Brand Comparison Widget */}
          <ScrollReveal direction="up" delayMs={100}>
            <BrandCompareWidget />
          </ScrollReveal>
        </div>

        {/* Right Column: Advisory Box & Breed Companion */}
        <div className="lg:col-span-4 space-y-6">
          {/* Featured Dog/Cat Breed Companion Photo */}
          <ScrollReveal direction="up">
            <div className="paper-box p-4 bg-brand-cream/80 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border-2 border-brand-espresso h-64">
                <img
                  src={brand.petImage}
                  alt={brand.petBreedName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2.5 left-2.5 pill-badge bg-brand-espresso text-brand-cream text-[10px]">
                  {brand.petBreedName}
                </span>
                <span className="absolute top-2.5 right-2.5 pill-badge bg-brand-olive text-brand-espresso font-mono text-[10px]">
                  {brand.name} Companion
                </span>
              </div>
              <p className="text-center font-mono text-[11px] text-brand-taupe font-bold">
                PawTruth verified independent veterinary audit profile.
              </p>
            </div>
          </ScrollReveal>

          {/* Official Veterinary Advisory */}
          <ScrollReveal direction="up" delayMs={150}>
            <div className={`paper-box p-5 sm:p-6 space-y-3 border-2.5 border-brand-espresso ${
              brand.veterinaryAdvisory.safeToFeed ? "bg-brand-olive/40" : "bg-brand-terracotta/20"
            }`}>
              <span className="pill-badge pill-badge-verified text-[10px] flex items-center gap-1 w-fit">
                <ClipboardCheck className="w-3.5 h-3.5 text-brand-espresso" />
                Veterinary Advisory
              </span>
              <h4 className="font-heading text-lg sm:text-xl font-black text-brand-espresso">
                {brand.veterinaryAdvisory.headline}
              </h4>
              <p className="text-xs font-sans text-brand-espresso/90 leading-relaxed font-medium">
                {brand.veterinaryAdvisory.verdict}
              </p>
            </div>
          </ScrollReveal>

          <div className="paper-box p-4 bg-brand-cream/80">
            <span className="font-heading font-black text-[11px] uppercase tracking-wider text-brand-taupe block mb-2">
              Sponsored Pet Nutrition
            </span>
            <AdSensePlaceholder slot="brand-sidebar-rectangle-02" format="rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
}
