import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, FileSpreadsheet, ChevronRight, PhoneCall, ShieldAlert, HeartPulse, PawPrint, AlertTriangle } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import SymptomCheckerWidget from "@/components/SymptomCheckerWidget";

export default function HazardSymptomGuidePage({
  params,
}: {
  params: Promise<{ issue: string }>;
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

      {/* EMERGENCY TRIAGE HEADER */}
      <ScrollReveal direction="up">
        <section className="relative paper-box p-5 sm:p-8 md:p-12 bg-[#FAF4EE] border-3 border-brand-terracotta">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2.5 border-brand-espresso/30 pb-6 mb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pill-badge pill-badge-alert text-[11px] sm:text-xs font-black flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-white" />
                  PATHOGEN EMERGENCY TRIAGE
                </span>
                <span className="pill-badge pill-badge-cream text-[11px] sm:text-xs font-bold">
                  GUIDE #EMERG-SALM-01
                </span>
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-brand-espresso leading-tight tracking-tight">
                Salmonella In Pet Food: 24-Hour Emergency Triage
              </h1>
              <p className="font-mono text-xs text-brand-taupe font-bold">
                Veterinary Protocol: Incubation Periods, Clinical Symptoms, & Immediate Owner Actions
              </p>
            </div>

            {/* 24/7 Hotline Chunky Pill Box */}
            <div className="bg-brand-terracotta text-white p-4 sm:p-5 rounded-3xl font-mono text-center shadow-pill border-2.5 border-brand-espresso self-stretch md:self-auto">
              <span className="text-[10px] font-black uppercase block tracking-wider text-brand-cream">
                Emergency Vet Hotline
              </span>
              <span className="font-heading text-xl sm:text-2xl font-black block mt-0.5 sm:mt-1 tracking-tight">
                (888) 426-4435
              </span>
              <span className="pill-badge bg-brand-espresso text-brand-olive text-[8px] sm:text-[9px] mt-1.5">
                ASPCA Poison Control (24/7)
              </span>
            </div>
          </div>

          {/* Quick Triage Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-mono text-xs">
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Typical Incubation:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-espresso">12 to 72 Hours</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Primary Threat:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-terracotta">Dehydration & Sepsis</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Human Transmission:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-espresso">High Zoonotic Risk</span>
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

      {/* 3. 24-HOUR CLINICAL TIMELINE */}
      <ScrollReveal direction="up" delayMs={150}>
        <section className="paper-box p-5 sm:p-8 md:p-10 bg-[#FAF4EE] space-y-6">
          <div className="border-b-2.5 border-brand-espresso pb-4">
            <span className="pill-badge pill-badge-alert mb-2">
              Hourly Timeline
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
              24-Hour Symptom Progression Timeline
            </h2>
            <p className="text-xs sm:text-sm font-sans text-brand-taupe font-medium mt-1">
              What physiological changes occur in dogs and cats following the ingestion of Salmonella-contaminated kibble or treats.
            </p>
          </div>

          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="border-l-4 border-brand-olive pl-4 sm:pl-5 py-2 relative">
              <span className="absolute -left-2.5 sm:-left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-brand-olive border-2 border-brand-espresso"></span>
              <span className="pill-badge pill-badge-verified text-[11px] sm:text-xs">
                Phase 1: Hours 0 — 6 (Incubation Phase)
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso mt-2">
                Bacterial Colonization in Lower Intestine
              </h3>
              <p className="text-xs font-sans text-brand-taupe leading-relaxed font-medium mt-1">
                Pets rarely exhibit acute vomiting during this early window. Watch for subtle behavioural cues: refusal of subsequent treats, excessive water drinking, minor lip-smacking (nausea), and restlessness.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="border-l-4 border-brand-terracotta pl-4 sm:pl-5 py-2 relative">
              <span className="absolute -left-2.5 sm:-left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-brand-terracotta border-2 border-brand-espresso"></span>
              <span className="pill-badge pill-badge-alert text-[11px] sm:text-xs">
                Phase 2: Hours 6 — 24 (Acute Enteritis Onset)
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso mt-2">
                Acute Diarrhea, Vomiting, and Fever
              </h3>
              <p className="text-xs font-sans text-brand-taupe leading-relaxed font-medium mt-1">
                Bacteria invade the mucosal lining of the intestines. Pets exhibit profuse, foul-smelling diarrhea, violent vomiting, elevated body temperature (&gt; 102.5°F), and visible abdominal guarding.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="border-l-4 border-brand-espresso pl-4 sm:pl-5 py-2 relative">
              <span className="absolute -left-2.5 sm:-left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-brand-espresso border-2 border-brand-cream"></span>
              <span className="pill-badge bg-brand-espresso text-brand-cream border-brand-cream text-[11px] sm:text-xs">
                Phase 3: Hours 24+ (Systemic Danger)
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso mt-2">
                Critical Dehydration and Shock Risk
              </h3>
              <p className="text-xs font-sans text-brand-taupe leading-relaxed font-medium mt-1">
                Without veterinary intervention, severe electrolyte imbalance leads to circulatory shock, pale gums, hypothermia, and potential sepsis. Immediate IV fluid resuscitation is required.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 4. TWO COLUMN: Vet Checklist & Telehealth Ad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: What to Bring to the Vet Clinic */}
        <div className="lg:col-span-8 space-y-6">
          <ScrollReveal direction="up" delayMs={200}>
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-5">
              <div className="flex items-center gap-2 border-b-2.5 border-brand-espresso pb-3">
                <FileSpreadsheet className="w-5 h-5 text-brand-terracotta" />
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-brand-espresso">
                  Printable Vet Clinic Preparation Checklist
                </h2>
              </div>
              <p className="text-xs font-sans text-brand-taupe font-medium">
                Take these 4 items with you to the emergency clinic to accelerate your veterinarian’s diagnosis and FDA case docket reporting:
              </p>

              <div className="space-y-3 font-sans text-xs">
                <div className="p-3.5 sm:p-4 bg-brand-cream/60 border-2 border-brand-espresso/25 rounded-2xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-olive flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading font-black text-xs sm:text-sm text-brand-espresso block">
                      1. Photo of Food Bag & Stamped Lot Code
                    </span>
                    <span className="text-brand-taupe font-medium text-[11px] sm:text-xs">
                      Ensure the lot code, best-by date, and UPC barcode numbers are clearly readable.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 bg-brand-cream/60 border-2 border-brand-espresso/25 rounded-2xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-olive flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading font-black text-xs sm:text-sm text-brand-espresso block">
                      2. Sealed Sample of the Recalled Food
                    </span>
                    <span className="text-brand-taupe font-medium text-[11px] sm:text-xs">
                      Place 1 cup of kibble or treats into a double Ziploc bag. Do not touch with bare hands.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 bg-brand-cream/60 border-2 border-brand-espresso/25 rounded-2xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-olive flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading font-black text-xs sm:text-sm text-brand-espresso block">
                      3. Timestamp of Last Meal Eaten
                    </span>
                    <span className="text-brand-taupe font-medium text-[11px] sm:text-xs">
                      Write down the exact hour of food consumption and onset of first vomiting or loose stool.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 bg-brand-cream/60 border-2 border-brand-espresso/25 rounded-2xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-olive flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading font-black text-xs sm:text-sm text-brand-espresso block">
                      4. FDA Docket Reference Sheet
                    </span>
                    <span className="text-brand-taupe font-medium text-[11px] sm:text-xs">
                      Provide the clinic with the active FDA enforcement docket number for lab culture matching.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Telehealth / Probiotics AdSense Placement */}
        <div className="lg:col-span-4 space-y-6">
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
              <Link href="/safety/salmonella" className="btn-pill btn-pill-cream text-left px-3.5 py-1.5 text-xs font-bold hover:bg-brand-olive">
                → Aflatoxin Mold Poisoning
              </Link>
              <Link href="/safety/salmonella" className="btn-pill btn-pill-cream text-left px-3.5 py-1.5 text-xs font-bold hover:bg-brand-olive">
                → Vitamin D Hypercalcemia
              </Link>
              <Link href="/safety/salmonella" className="btn-pill btn-pill-cream text-left px-3.5 py-1.5 text-xs font-bold hover:bg-brand-olive">
                → Foreign Metal Fragments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
