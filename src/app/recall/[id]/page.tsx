import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Package, MapPin, ShieldAlert, ChevronRight, AlertOctagon, FileCheck, CheckCircle2, AlertTriangle, Search, Dog, Cat } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import { recallsData, RecallDocket } from "@/data/recalls";

export function generateStaticParams() {
  return recallsData.map((recall) => ({ id: recall.id }));
}

export default async function RecallDocketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recall: RecallDocket | undefined = recallsData.find((r) => r.id === id) || recallsData[0];

  if (!recall) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-10 overflow-hidden">
      {/* Navigation Breadcrumb & Quick Docket Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="btn-pill btn-pill-cream px-3.5 sm:px-4 py-2 text-xs font-black shadow-paper-sm hover:bg-brand-olive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </Link>

        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <span className="text-brand-taupe font-bold mr-1 hidden sm:inline">Other Dockets:</span>
          {recallsData.slice(0, 4).map((r) => (
            <Link
              key={r.id}
              href={`/recall/${r.id}`}
              className={`btn-pill px-2.5 py-1 text-[11px] font-bold ${
                r.id === recall.id ? "btn-pill-espresso" : "btn-pill-cream"
              }`}
            >
              {r.brand.split(" ")[0]}
            </Link>
          ))}
        </div>
      </div>

      {/* INSPECTOR FILE FOLDER BANNER */}
      <ScrollReveal direction="up">
        <section className="relative paper-box p-5 sm:p-8 md:p-10 bg-[#FAF4EE] border-3 border-brand-espresso">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2.5 border-brand-espresso/30 pb-6 mb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pill-badge pill-badge-alert text-[11px] sm:text-xs font-black flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-white" />
                  {recall.classification}
                </span>
                <span className="pill-badge pill-badge-cream text-[11px] sm:text-xs font-bold">
                  DOCKET #{recall.docketNumber}
                </span>
                <span className="pill-badge pill-badge-verified text-[11px] sm:text-xs">
                  {recall.fdaEnforcementStatus}
                </span>
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-brand-espresso leading-tight tracking-tight">
                {recall.brand} — {recall.productName}
              </h1>
              <p className="font-mono text-xs text-brand-taupe font-bold">
                Classification: {recall.hazardType} • Federal Docket Date: {recall.announcementDate}
              </p>
            </div>

            {/* Red Alert Pill Seal */}
            <div className="border-3 border-dashed border-brand-terracotta bg-brand-terracotta/15 p-4 sm:p-5 rounded-3xl text-center transform rotate-1 shadow-pill self-stretch md:self-auto flex-shrink-0">
              <span className="font-mono text-[10px] font-bold text-brand-terracotta uppercase block">
                FDA Hazard Status
              </span>
              <span className="font-heading text-xl sm:text-2xl font-black text-brand-terracotta tracking-tight block">
                {recall.classification.includes("CLASS I") ? "IMMEDIATE DANGER" : "PRECAUTIONARY"}
              </span>
              <span className="pill-badge pill-badge-alert text-[9px] mt-1">
                Do Not Feed To Pets
              </span>
            </div>
          </div>

          {/* Essential Recall Metadata Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs font-mono">
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Contaminant:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-terracotta">{recall.hazardType.split(" ")[0]}</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Package Size:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-espresso">{recall.packageSize}</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">UPC Barcode:</span>
              <span className="font-heading font-black text-xs sm:text-sm text-brand-espresso">{recall.upcBarcode}</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Target Species:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-olive flex items-center gap-1">
                {recall.species === "Dogs" ? <Dog className="w-3.5 h-3.5" /> : <Cat className="w-3.5 h-3.5" />}
                {recall.species}
              </span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* AD CONTAINER */}
      <AdSensePlaceholder slot="recall-leaderboard-03" format="leaderboard" />

      {/* TWO COLUMN INVESTIGATION BRIEF */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Barcode Diagram, Lot Verification & States */}
        <div className="lg:col-span-8 space-y-8">
          {/* Packaging & Lot Code Finder Card */}
          <ScrollReveal direction="up">
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-6">
              <div className="border-b-2.5 border-brand-espresso pb-4">
                <span className="pill-badge pill-badge-alert mb-2">
                  Package Inspection
                </span>
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-brand-espresso">
                  How To Identify Your Affected Batch
                </h2>
                <p className="text-xs sm:text-sm font-sans text-brand-taupe font-medium mt-1">
                  Examine your food packaging for the exact lot numbers identified in federal enforcement docket #{recall.docketNumber}.
                </p>
              </div>

              {/* Barcode / Lot Code Technical Visual Box */}
              <div className="bg-brand-cream p-5 sm:p-6 rounded-3xl border-2.5 border-brand-espresso space-y-4 shadow-paper-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-brand-espresso/20 pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-brand-taupe uppercase">
                      Official Recalled Lot Numbers:
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {recall.lotCodes.map((code, idx) => (
                        <span
                          key={idx}
                          className="bg-brand-espresso text-brand-olive font-mono text-sm sm:text-base font-black px-3 py-1.5 rounded-xl border border-brand-espresso shadow-sm"
                        >
                          Lot: {code}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-left sm:text-right font-mono text-xs">
                    <span className="text-brand-taupe block font-bold">UPC Barcode:</span>
                    <span className="font-black text-brand-espresso">{recall.upcBarcode}</span>
                  </div>
                </div>

                {/* Packaging Blueprint Guide */}
                <div className="p-4 bg-[#FAF4EE] rounded-2xl border-2 border-brand-espresso/25 space-y-2">
                  <span className="font-heading font-black text-xs uppercase text-brand-espresso flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-brand-terracotta" />
                    Where to find your lot number on this package:
                  </span>
                  <p className="text-xs font-sans text-brand-taupe font-medium leading-relaxed">
                    {recall.stampLocationGuide}
                  </p>
                  <p className="font-mono text-[11px] text-brand-espresso font-bold">
                    Package Type: {recall.packagingType}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Geographic Distribution Grid with State Cards */}
          <ScrollReveal direction="up" delayMs={150}>
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-4">
              <div className="flex items-center gap-2 border-b-2.5 border-brand-espresso pb-3">
                <MapPin className="w-5 h-5 text-brand-olive" />
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-brand-espresso">
                  Affected Geographic Distribution
                </h2>
              </div>
              <p className="text-xs font-sans text-brand-taupe font-medium">
                {recall.distributionScope}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {recall.affectedStates.map((st) => (
                  <div
                    key={st.code}
                    className="p-3 bg-brand-cream/80 border-2 border-brand-espresso/25 rounded-2xl flex flex-col justify-between shadow-paper-sm hover:border-brand-terracotta transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-black text-sm text-brand-espresso">
                        {st.code}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-brand-terracotta animate-pulse"></span>
                    </div>
                    <span className="font-sans text-xs text-brand-taupe font-bold mt-1">
                      {st.name}
                    </span>
                    <span className="font-mono text-[10px] text-brand-terracotta font-black mt-0.5">
                      {st.volume}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Clinical Hazard & Action Protocol */}
          <ScrollReveal direction="up" delayMs={100}>
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-5">
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso border-b-2.5 border-brand-espresso pb-3">
                Immediate 4-Step Consumer Action Protocol
              </h2>
              <div className="space-y-3 font-sans text-xs">
                {recall.actionSteps.map((act, idx) => (
                  <div key={idx} className="p-4 bg-brand-cream/70 border-2 border-brand-espresso/20 rounded-2xl space-y-1">
                    <h4 className="font-heading font-black text-sm text-brand-terracotta">
                      {act.step}
                    </h4>
                    <p className="text-brand-espresso font-medium leading-relaxed">
                      {act.instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Species Lifestyle Feature & Emergency Contacts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Affected Species Portrait */}
          <ScrollReveal direction="up">
            <div className="paper-box p-4 bg-brand-cream/80 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border-2 border-brand-espresso h-64">
                <img
                  src={recall.petImage}
                  alt={recall.petBreedName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2.5 left-2.5 pill-badge bg-brand-espresso text-brand-cream text-[10px]">
                  {recall.petBreedName}
                </span>
                <span className="absolute top-2.5 right-2.5 pill-badge bg-brand-terracotta text-white font-mono text-[10px]">
                  {recall.species} Alert
                </span>
              </div>
              <p className="text-center font-mono text-[11px] text-brand-taupe font-bold">
                Veterinary warning for all registered {recall.species.toLowerCase()} owners.
              </p>
            </div>
          </ScrollReveal>

          {/* Clinical Symptoms Quick Card */}
          <ScrollReveal direction="up" delayMs={100}>
            <div className="paper-box bg-brand-terracotta/15 border-2.5 border-brand-terracotta p-5 space-y-3">
              <span className="font-heading font-black text-sm text-brand-terracotta uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-brand-terracotta" />
                Watch For Clinical Symptoms:
              </span>
              <ul className="space-y-1.5 font-sans text-xs text-brand-espresso font-medium">
                {recall.clinicalRisks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta flex-shrink-0 mt-1.5"></span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/safety/${recall.hazardSlug}`}
                className="btn-pill btn-pill-terracotta w-full py-2.5 text-xs font-black justify-center mt-2"
              >
                <span>Read Full Emergency Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Official Brand Link */}
          <ScrollReveal direction="up" delayMs={150}>
            <div className="paper-box bg-brand-olive/30 border-2.5 border-brand-espresso p-5 space-y-2">
              <span className="font-heading font-black text-xs uppercase tracking-wider text-brand-espresso block">
                Brand Safety Intelligence:
              </span>
              <h4 className="font-heading text-base font-black text-brand-espresso">
                Inspect {recall.brand} Lifetime Record
              </h4>
              <p className="font-sans text-xs text-brand-taupe font-medium">
                Review lifetime recalls, safety scorecards, and clean product lines for this manufacturer.
              </p>
              <Link
                href={`/brand/${recall.brandSlug}`}
                className="btn-pill btn-pill-espresso w-full py-2.5 text-xs font-black justify-center mt-1"
              >
                <span>View {recall.brand} Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="paper-box p-4 bg-brand-cream/80">
            <span className="font-heading font-black text-[11px] uppercase tracking-wider text-brand-taupe block mb-2">
              Sponsored Pet Health
            </span>
            <AdSensePlaceholder slot="recall-sidebar-rectangle-03" format="rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
}
