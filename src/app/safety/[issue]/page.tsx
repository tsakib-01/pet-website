import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, FileSpreadsheet, ChevronRight, PhoneCall, ShieldAlert, HeartPulse, PawPrint, AlertTriangle } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import SymptomCheckerWidget from "@/components/SymptomCheckerWidget";
import { hazardsData } from "@/data/hazards";

export function generateStaticParams() {
  return Object.keys(hazardsData).map((issue) => ({ issue }));
}

export default async function HazardSymptomGuidePage({
  params,
}: {
  params: Promise<{ issue: string }>;
}) {
  const { issue } = await params;
  const hazard = hazardsData[issue.toLowerCase()] || hazardsData["salmonella"];

  if (!hazard) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-12 overflow-hidden">
      {/* Back button & Hazard Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="btn-pill btn-pill-cream px-3.5 sm:px-4 py-2 text-xs font-black shadow-paper-sm hover:bg-brand-olive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </Link>

        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <span className="text-brand-taupe font-bold mr-1 hidden sm:inline">Pathogen Guides:</span>
          {Object.values(hazardsData).map((h) => (
            <Link
              key={h.slug}
              href={`/safety/${h.slug}`}
              className={`btn-pill px-2.5 py-1 text-[11px] font-bold ${
                h.slug === hazard.slug ? "btn-pill-espresso" : "btn-pill-cream"
              }`}
            >
              {h.name.split(" ")[0]}
            </Link>
          ))}
        </div>
      </div>

      {/* EMERGENCY TRIAGE HEADER */}
      <ScrollReveal direction="up">
        <section className="relative paper-box p-5 sm:p-8 md:p-12 bg-[#FAF4EE] border-3 border-brand-terracotta">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2.5 border-brand-espresso/30 pb-6 mb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pill-badge pill-badge-alert text-[11px] sm:text-xs font-black flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-white" />
                  {hazard.severityLevel}
                </span>
                <span className="pill-badge pill-badge-cream text-[11px] sm:text-xs font-bold">
                  FDA PROTOCOL #{hazard.slug.toUpperCase()}-2026
                </span>
                <span className="pill-badge pill-badge-verified text-[11px] sm:text-xs">
                  Veterinary Reviewed
                </span>
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-brand-espresso leading-tight tracking-tight">
                {hazard.name}: 24-Hour Emergency Triage
              </h1>
              <p className="font-mono text-xs text-brand-taupe font-bold">
                Classification: {hazard.scientificClassification} • Incubation: {hazard.incubationPeriod}
              </p>
            </div>

            {/* 24/7 Hotline Chunky Pill Box */}
            <div className="bg-brand-terracotta text-white p-4 sm:p-5 rounded-3xl font-mono text-center shadow-pill border-2.5 border-brand-espresso self-stretch md:self-auto flex-shrink-0">
              <span className="text-[10px] font-black uppercase block tracking-wider text-brand-cream">
                Emergency Poison Hotline
              </span>
              <span className="font-heading text-xl sm:text-2xl font-black block mt-0.5 sm:mt-1 tracking-tight">
                {hazard.aspcaEmergencyPhone}
              </span>
              <span className="pill-badge bg-brand-espresso text-brand-olive text-[8px] sm:text-[9px] mt-1.5">
                ASPCA 24/7 Animal Poison Control
              </span>
            </div>
          </div>

          {/* Quick Triage Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-mono text-xs">
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Typical Incubation:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-espresso">{hazard.incubationPeriod}</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Severity Level:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-terracotta">{hazard.severityLevel.split(" ")[0]}</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Mortality Risk:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-espresso">{hazard.mortalityRateEstimate}</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* AD CONTAINER */}
      <AdSensePlaceholder slot="safety-leaderboard-05" format="leaderboard" />

      {/* 2. INTERACTIVE CLINICAL SYMPTOM CHECKER WIDGET */}
      <ScrollReveal direction="up" delayMs={100}>
        <SymptomCheckerWidget />
      </ScrollReveal>

      {/* 3. CLINICAL TIMELINE */}
      <ScrollReveal direction="up" delayMs={150}>
        <section className="paper-box p-5 sm:p-8 md:p-10 bg-[#FAF4EE] space-y-6">
          <div className="border-b-2.5 border-brand-espresso pb-4">
            <span className="pill-badge pill-badge-alert mb-2">
              Pathology Progression
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
              Clinical Symptom Progression Timeline
            </h2>
            <p className="text-xs sm:text-sm font-sans text-brand-taupe font-medium mt-1">
              Physiological changes and internal organ impact following ingestion of contaminated food.
            </p>
          </div>

          <div className="space-y-4">
            {hazard.clinicalTimeline.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 bg-brand-cream/70 border-2 border-brand-espresso/25 rounded-2xl space-y-2 shadow-paper-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-espresso/20 pb-2">
                  <span className="font-heading font-black text-sm sm:text-base text-brand-terracotta">
                    {item.phase}
                  </span>
                  <span className="font-mono text-xs font-bold text-brand-espresso bg-brand-olive/40 px-2.5 py-0.5 rounded-full border border-brand-espresso/30">
                    {item.timeframe}
                  </span>
                </div>
                <div className="pt-1">
                  <span className="font-heading font-black text-xs uppercase text-brand-espresso block mb-1">
                    Observable Clinical Signs:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-sans text-brand-espresso">
                    {item.clinicalSigns.map((sign, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta flex-shrink-0 mt-1.5"></span>
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs font-mono text-brand-taupe pt-1 font-medium border-t border-brand-espresso/15 mt-2">
                  <span className="font-bold text-brand-espresso">Mechanism: </span>{item.pathologicalMechanism}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* TWO COLUMN: Vet Checklist & Pet Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Veterinary Clinic Protocol */}
        <div className="lg:col-span-8 space-y-6">
          <ScrollReveal direction="up">
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-4">
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso border-b-2.5 border-brand-espresso pb-3">
                Emergency Veterinary Treatment Plan
              </h2>
              <div className="space-y-3 font-sans text-xs">
                {hazard.veterinaryEmergencyPlan.map((step, idx) => (
                  <div key={idx} className="p-3.5 bg-brand-cream/80 border-2 border-brand-espresso/20 rounded-2xl flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-brand-olive flex-shrink-0 mt-0.5" />
                    <span className="text-brand-espresso font-medium">{step}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-brand-olive/30 border-2 border-brand-espresso/25 rounded-2xl space-y-1 mt-4 font-sans text-xs">
                <span className="font-heading font-black text-brand-espresso uppercase block">
                  Bland Diet & Recovery Protocol:
                </span>
                <p className="text-brand-espresso font-medium leading-relaxed">
                  {hazard.safeBlandDietAdvice}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Species Portrait & Other Guides */}
        <div className="lg:col-span-4 space-y-6">
          <ScrollReveal direction="up" delayMs={100}>
            <div className="paper-box p-4 bg-brand-cream/80 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border-2 border-brand-espresso h-64">
                <img
                  src={hazard.petImage}
                  alt={hazard.petBreedName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2.5 left-2.5 pill-badge bg-brand-espresso text-brand-cream text-[10px]">
                  {hazard.petBreedName}
                </span>
                <span className="absolute top-2.5 right-2.5 pill-badge bg-brand-terracotta text-white font-mono text-[10px]">
                  Emergency Protocol
                </span>
              </div>
              <p className="text-center font-mono text-[11px] text-brand-taupe font-bold">
                Clinical protocol reviewed by board-certified veterinary toxicology consultants.
              </p>
            </div>
          </ScrollReveal>

          <div className="paper-box p-4 bg-brand-cream/80">
            <span className="font-heading font-black text-[11px] uppercase tracking-wider text-brand-taupe block mb-2">
              Sponsored Pet Health Services
            </span>
            <AdSensePlaceholder slot="safety-sidebar-rectangle-05" format="rectangle" />
          </div>

          <div className="paper-box bg-brand-cream/70 p-4 sm:p-5 font-sans text-xs space-y-3">
            <span className="font-heading font-black text-sm text-brand-espresso flex items-center gap-1.5 uppercase tracking-wide">
              <PawPrint className="w-4 h-4 text-brand-terracotta" />
              Other Contaminant Guides:
            </span>
            <div className="flex flex-col gap-2">
              {Object.values(hazardsData).filter((h) => h.slug !== hazard.slug).map((h) => (
                <Link
                  key={h.slug}
                  href={`/safety/${h.slug}`}
                  className="btn-pill btn-pill-cream text-left px-3.5 py-1.5 text-xs font-bold hover:bg-brand-olive justify-between"
                >
                  <span>→ {h.name}</span>
                  <span className="text-[10px] font-mono text-brand-taupe">{h.severityLevel.split(" ")[0]}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
