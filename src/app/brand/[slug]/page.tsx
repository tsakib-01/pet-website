import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Scale, AlertOctagon, ClipboardCheck } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import BrandCompareWidget from "@/components/BrandCompareWidget";

export default function BrandDossierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-12 overflow-hidden">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="btn-pill btn-pill-cream px-3.5 sm:px-4 py-2 text-xs font-black shadow-paper-sm hover:bg-brand-olive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </Link>
      </div>

      {/* BRAND DOSSIER HEADER */}
      <ScrollReveal direction="up">
        <section className="relative paper-box p-5 sm:p-8 md:p-10 bg-[#FAF4EE] border-2.5 border-brand-espresso">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2.5 border-brand-espresso/30 pb-6 sm:pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-cream border-2.5 border-brand-espresso rounded-3xl flex flex-col items-center justify-center p-2 shadow-pill transform -rotate-2 flex-shrink-0">
                <span className="font-heading font-black text-xl sm:text-2xl text-brand-espresso">BB</span>
                <span className="font-mono text-[8px] sm:text-[9px] text-brand-taupe uppercase font-bold">Buffalo</span>
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill-badge pill-badge-cream text-[10px]">
                    Dossier #BB-8842
                  </span>
                  <span className="pill-badge pill-badge-verified text-[10px]">
                    US Co-Manufactured
                  </span>
                  <span className="pill-badge bg-brand-terracotta/20 text-brand-terracotta border-brand-terracotta text-[10px]">
                    Under Active 2026 Audit
                  </span>
                </div>
                <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-brand-espresso tracking-tight">
                  Blue Buffalo Pet Foods
                </h1>
                <p className="font-mono text-[11px] sm:text-xs text-brand-taupe font-bold">
                  General Mills Pet Division • Est. 2002 • Wilton, Connecticut, USA
                </p>
              </div>
            </div>

            {/* Large Rubber Safety Grade Badge */}
            <div className="flex flex-col items-center self-stretch sm:self-auto">
              <div className="border-3 border-dashed border-brand-terracotta bg-brand-cream/80 p-4 sm:p-5 rounded-3xl transform rotate-1 sm:rotate-2 shadow-pill text-center w-full sm:w-auto">
                <span className="font-mono text-[10px] font-bold text-brand-taupe uppercase block">
                  FDA Safety Grade
                </span>
                <span className="font-heading text-4xl sm:text-6xl font-black text-brand-terracotta tracking-tight">
                  GRADE B-
                </span>
                <span className="pill-badge pill-badge-alert text-[10px] mt-1">
                  2 Lifetime Recalls
                </span>
              </div>
            </div>
          </div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5 sm:pt-6 font-mono text-xs">
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Total Recalls:</span>
              <span className="font-heading font-black text-base sm:text-lg text-brand-espresso">2 Events</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Last Recall:</span>
              <span className="font-heading font-black text-base sm:text-lg text-brand-terracotta">Oct 18, 2026</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Primary Risk:</span>
              <span className="font-heading font-black text-base sm:text-lg text-brand-espresso">Salmonella</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Clean Years:</span>
              <span className="font-heading font-black text-base sm:text-lg text-brand-olive">2013-2023 Clean</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* AD CONTAINER */}
      <AdSensePlaceholder slot="brand-top-billboard-02" format="banner" />

      {/* TWO COLUMN DOSSIER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Recall History Timeline */}
        <div className="lg:col-span-8 space-y-6">
          <ScrollReveal direction="up" delayMs={100}>
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-6">
              <div className="flex items-center justify-between border-b-2.5 border-brand-espresso pb-3">
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-brand-espresso">
                  Official FDA Enforcement Dockets
                </h2>
                <span className="pill-badge pill-badge-alert text-[10px]">2 Events</span>
              </div>

              {/* Timeline Event 1 */}
              <div className="border-l-4 border-brand-terracotta pl-4 sm:pl-5 py-2 space-y-2 relative">
                <span className="absolute -left-2.5 sm:-left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-brand-terracotta border-2 border-brand-espresso"></span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill-badge pill-badge-alert text-[10px]">
                    CLASS I (HIGH HAZARD)
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-brand-taupe font-bold">
                    October 18, 2026 • Docket #FDA-2026-V-8841
                  </span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso">
                  Blue Buffalo Wilderness Freeze-Dried Cat Treats (4 oz)
                </h3>
                <p className="text-xs font-sans text-brand-taupe leading-relaxed font-medium">
                  Voluntary recall initiated after routine state agricultural screening detected presence of 
                  <strong> Salmonella enterica</strong> in finished lot bags. No pet illnesses confirmed at docket publication.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono pt-2">
                  <span className="text-brand-espresso font-bold">Lots: 8841A, 8841B</span>
                  <Link
                    href="/recall/fda-2024-salmonella-kibble"
                    className="btn-pill btn-pill-espresso px-3.5 py-1 text-[11px] font-black group"
                  >
                    <span>Inspect Docket</span>
                    <span className="btn-circle-icon bg-brand-olive text-brand-espresso w-4 h-4">
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Timeline Event 2 */}
              <div className="border-l-4 border-brand-taupe pl-4 sm:pl-5 py-2 space-y-2 relative">
                <span className="absolute -left-2.5 sm:-left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-brand-taupe border-2 border-brand-espresso"></span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill-badge pill-badge-cream text-[10px]">
                    CLASS II (MODERATE)
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-brand-taupe font-bold">
                    March 12, 2024 • Docket #FDA-2024-V-2104
                  </span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso">
                  Blue Buffalo Life Protection Chicken & Brown Rice (15 lb)
                </h3>
                <p className="text-xs font-sans text-brand-taupe leading-relaxed font-medium">
                  Packaging seal integrity defect leading to potential mold and moisture degradation in humid distribution hubs. 
                  Precautionary recall resolved across southeastern states.
                </p>
                <div className="text-xs font-mono text-brand-olive font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-olive" />
                  Status: Terminated & Resolved by FDA
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Product Line Safety Matrix */}
          <ScrollReveal direction="up" delayMs={150}>
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-4">
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-brand-espresso border-b-2.5 border-brand-espresso pb-3">
                Product Line Safety Matrix
              </h2>
              <div className="space-y-3 font-sans text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-brand-cream/60 border-2 border-brand-espresso/25 rounded-2xl">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-olive flex-shrink-0" />
                    <span className="font-heading font-bold text-xs sm:text-sm text-brand-espresso">Life Protection Dry Dog Kibble Line</span>
                  </div>
                  <span className="pill-badge pill-badge-verified text-[10px] self-start sm:self-auto">100% CLEAN (2026)</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-brand-cream/60 border-2 border-brand-espresso/25 rounded-2xl">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-olive flex-shrink-0" />
                    <span className="font-heading font-bold text-xs sm:text-sm text-brand-espresso">Homestyle Recipe Wet Canned Food</span>
                  </div>
                  <span className="pill-badge pill-badge-verified text-[10px] self-start sm:self-auto">100% CLEAN RECORD</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-brand-terracotta/15 border-2 border-brand-terracotta rounded-2xl">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-brand-terracotta flex-shrink-0" />
                    <span className="font-heading font-bold text-xs sm:text-sm text-brand-espresso">Wilderness Freeze-Dried Salmon Treats</span>
                  </div>
                  <span className="pill-badge pill-badge-alert text-[10px] self-start sm:self-auto">1 ACTIVE RECALL</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Side-by-Side Brand Comparison Tool */}
          <ScrollReveal direction="up" delayMs={200}>
            <BrandCompareWidget />
          </ScrollReveal>
        </div>

        {/* Right Column: Advisory Box & Sidebar Ad */}
        <div className="lg:col-span-4 space-y-6">
          <ScrollReveal direction="up" delayMs={150}>
            <div className="paper-box bg-brand-olive/40 p-5 sm:p-6 space-y-3 border-2.5 border-brand-espresso">
              <span className="pill-badge pill-badge-verified text-[10px] flex items-center gap-1 w-fit">
                <ClipboardCheck className="w-3.5 h-3.5 text-brand-espresso" />
                Veterinary Advisory
              </span>
              <h4 className="font-heading text-lg sm:text-xl font-black text-brand-espresso">
                Is Blue Buffalo Safe To Feed?
              </h4>
              <p className="text-xs font-sans text-brand-espresso/90 leading-relaxed font-medium">
                Blue Buffalo maintains high manufacturing standards across its dry kibbles and canned recipes. 
                The current recall is strictly isolated to the <strong>freeze-dried salmon cat treats</strong> line. If you feed their dry Life Protection or Wilderness kibble, your pet’s food is not under recall.
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
