import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, FileSpreadsheet, Building2 } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import { statesData } from "@/data/states";

export function generateStaticParams() {
  return Object.keys(statesData).map((code) => ({ code }));
}

export default async function StateRegistryPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const stateInfo = statesData[code.toLowerCase()];

  if (!stateInfo) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-10 overflow-hidden">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="btn-pill btn-pill-cream px-3.5 sm:px-4 py-2 text-xs font-black shadow-paper-sm hover:bg-brand-olive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </Link>
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="text-brand-taupe font-bold">Switch State:</span>
          <Link href="/state/california" className={`btn-pill px-2.5 py-1 text-[11px] font-bold ${stateInfo.code === "CA" ? "btn-pill-espresso" : "btn-pill-cream"}`}>CA</Link>
          <Link href="/state/texas" className={`btn-pill px-2.5 py-1 text-[11px] font-bold ${stateInfo.code === "TX" ? "btn-pill-espresso" : "btn-pill-cream"}`}>TX</Link>
          <Link href="/state/florida" className={`btn-pill px-2.5 py-1 text-[11px] font-bold ${stateInfo.code === "FL" ? "btn-pill-espresso" : "btn-pill-cream"}`}>FL</Link>
        </div>
      </div>

      {/* STATE HEADER */}
      <ScrollReveal direction="up">
        <section className="relative paper-box p-5 sm:p-8 md:p-10 bg-[#FAF4EE] border-3 border-brand-espresso">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2.5 border-brand-espresso/30 pb-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-olive border-2.5 border-brand-espresso rounded-3xl flex flex-col items-center justify-center p-2 shadow-pill transform -rotate-2 flex-shrink-0">
                <MapPin className="w-6 h-6 text-brand-espresso" />
                <span className="font-heading font-black text-xl text-brand-espresso leading-none">{stateInfo.code}</span>
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill-badge pill-badge-verified text-[10px]">
                    State Feed Registry
                  </span>
                  <span className="pill-badge pill-badge-cream text-[10px]">
                    OpenFDA Geo-Audit
                  </span>
                </div>
                <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-brand-espresso tracking-tight">
                  {stateInfo.name} Pet Food Recall Registry
                </h1>
                <p className="font-mono text-xs text-brand-taupe font-bold">
                  {stateInfo.regulatoryAgency}
                </p>
              </div>
            </div>

            {/* Quick State Stat Pill */}
            <div className="border-3 border-dashed border-brand-espresso bg-brand-cream/80 p-4 sm:p-5 rounded-3xl text-center shadow-pill self-stretch md:self-auto">
              <span className="font-mono text-[10px] font-bold text-brand-taupe uppercase block">
                Active State Dockets
              </span>
              <span className="font-heading text-3xl sm:text-4xl font-black text-brand-terracotta tracking-tight">
                {stateInfo.activeWatchlistDockets} DOCKETS
              </span>
              <span className="pill-badge pill-badge-alert text-[9px] mt-1">
                Under Surveillance
              </span>
            </div>
          </div>

          {/* Key State Inspection Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-mono text-xs">
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">10-Year Recall Dockets:</span>
              <span className="font-heading font-black text-base sm:text-lg text-brand-espresso">{stateInfo.totalRecalls10Yr} Recorded</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Primary State Risk:</span>
              <span className="font-heading font-bold text-xs sm:text-sm text-brand-terracotta leading-tight">{stateInfo.primaryRiskFactor}</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Surveillance Level:</span>
              <span className="font-heading font-black text-base sm:text-lg text-brand-olive">High Priority Lab</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* AD CONTAINER */}
      <AdSensePlaceholder slot="state-leaderboard-01" format="leaderboard" />

      {/* TWO COLUMN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: State Overview & Recent Dockets */}
        <div className="lg:col-span-8 space-y-8">
          {/* Overview */}
          <ScrollReveal direction="up">
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-4">
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso border-b-2.5 border-brand-espresso pb-3">
                {stateInfo.name} Feed Safety & Inspection Environment
              </h2>
              <p className="font-sans text-xs sm:text-sm text-brand-taupe leading-relaxed font-medium">
                {stateInfo.overviewSummary}
              </p>
              
              <div className="pt-2 space-y-2">
                <span className="font-heading font-black text-xs uppercase tracking-wider text-brand-espresso block">
                  State Surveillance Highlights:
                </span>
                <ul className="space-y-1.5 font-sans text-xs text-brand-espresso/90 font-medium">
                  {stateInfo.inspectionHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-brand-cream/60 p-2.5 rounded-xl border border-brand-espresso/20">
                      <CheckCircle2 className="w-4 h-4 text-brand-olive flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Recent Dockets Affecting State */}
          <ScrollReveal direction="up" delayMs={100}>
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-4">
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso border-b-2.5 border-brand-espresso pb-3">
                Recent FDA Enforcement Dockets Distributed to {stateInfo.name}
              </h2>
              <div className="space-y-3 font-sans text-xs">
                {stateInfo.recentStateDockets.map((dk, idx) => (
                  <div key={idx} className="p-4 bg-brand-cream/80 border-2 border-brand-espresso/25 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-paper-sm hover:border-brand-terracotta transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="pill-badge pill-badge-alert text-[10px]">
                          {dk.docket}
                        </span>
                        <span className="font-mono text-xs text-brand-taupe font-bold">
                          {dk.date}
                        </span>
                      </div>
                      <h4 className="font-heading text-base font-black text-brand-espresso">
                        {dk.brand}
                      </h4>
                      <p className="text-brand-taupe font-medium text-xs">
                        {dk.hazard}
                      </p>
                    </div>
                    <Link
                      href="/recall/fda-2024-salmonella-kibble"
                      className="btn-pill btn-pill-espresso px-3.5 py-1.5 text-xs font-black self-start sm:self-center flex-shrink-0"
                    >
                      <span>Inspect Docket</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Dog Image of State & Hotline */}
        <div className="lg:col-span-4 space-y-6">
          {/* State Pet Breed Feature */}
          <ScrollReveal direction="up" delayMs={100}>
            <div className="paper-box p-4 bg-brand-cream/80 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border-2 border-brand-espresso h-56">
                <img
                  src={stateInfo.petImage}
                  alt={stateInfo.petBreedName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2.5 left-2.5 pill-badge bg-brand-espresso text-brand-cream text-[10px]">
                  {stateInfo.petBreedName}
                </span>
              </div>
              <div className="text-center pt-1 font-mono text-[11px] text-brand-taupe font-bold">
                Protecting registered family companions across {stateInfo.name}.
              </div>
            </div>
          </ScrollReveal>

          {/* State Complaint Protocol */}
          <ScrollReveal direction="up" delayMs={150}>
            <div className="paper-box bg-brand-terracotta/15 border-2.5 border-brand-terracotta p-5 space-y-3">
              <span className="font-heading font-black text-sm text-brand-terracotta uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-brand-terracotta" />
                Report Illness in {stateInfo.name}
              </span>
              <p className="font-sans text-xs text-brand-espresso leading-relaxed font-medium">
                If your pet fell ill after eating commercial pet food purchased in {stateInfo.name}, file a complaint with the FDA Consumer Complaint Coordinator and retain the package lot code.
              </p>
              <Link
                href="/safety/salmonella"
                className="btn-pill btn-pill-terracotta w-full py-2.5 text-xs font-black justify-center"
              >
                <span>Veterinary Triage Protocol</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          {/* AdSense sidebar */}
          <div className="paper-box p-4 bg-brand-cream/80">
            <span className="font-heading font-black text-[11px] uppercase tracking-wider text-brand-taupe block mb-2">
              Sponsored Pet Safety
            </span>
            <AdSensePlaceholder slot="state-sidebar-01" format="rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
}
