import React from "react";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, ShieldAlert, ChevronRight, AlertOctagon, FileCheck, CheckCircle2, AlertTriangle, Search } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";

export default function RecallDocketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const affectedStates = [
    { code: "CA", name: "California", bags: "12,400 bags" },
    { code: "TX", name: "Texas", bags: "9,800 bags" },
    { code: "FL", name: "Florida", bags: "7,500 bags" },
    { code: "NY", name: "New York", bags: "6,200 bags" },
    { code: "IL", name: "Illinois", bags: "4,800 bags" },
    { code: "PA", name: "Pennsylvania", bags: "4,100 bags" },
    { code: "OH", name: "Ohio", bags: "3,900 bags" },
    { code: "GA", name: "Georgia", bags: "3,500 bags" },
    { code: "NC", name: "North Carolina", bags: "3,100 bags" },
    { code: "MI", name: "Michigan", bags: "2,800 bags" },
    { code: "WA", name: "Washington", bags: "2,400 bags" },
    { code: "AZ", name: "Arizona", bags: "2,100 bags" },
    { code: "TN", name: "Tennessee", bags: "1,900 bags" },
    { code: "VA", name: "Virginia", bags: "1,700 bags" },
    { code: "IN", name: "Indiana", bags: "1,500 bags" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-10 overflow-hidden">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/"
          className="btn-pill btn-pill-cream px-3.5 sm:px-4 py-2 text-xs font-black shadow-paper-sm hover:bg-brand-olive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </Link>
      </div>

      {/* INSPECTOR FILE FOLDER BANNER */}
      <ScrollReveal direction="up">
        <section className="relative paper-box p-5 sm:p-8 md:p-10 bg-[#FAF4EE] border-3 border-brand-espresso">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2.5 border-brand-espresso/30 pb-6 mb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pill-badge pill-badge-alert text-[11px] sm:text-xs font-black flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-white" />
                  CLASS I RECALL NOTICE
                </span>
                <span className="pill-badge pill-badge-cream text-[11px] sm:text-xs font-bold">
                  DOCKET #FDA-2026-V-8841
                </span>
                <span className="pill-badge pill-badge-verified text-[11px] sm:text-xs">
                  Active Federal Order
                </span>
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-brand-espresso leading-tight tracking-tight">
                Wild Harvest Freeze-Dried Salmon Cat Treats (4 oz)
              </h1>
              <p className="font-mono text-xs text-brand-taupe font-bold">
                Blue Harvest Pet Foods LLC • Distribution: Retail Pet Stores Nationwide & Online • Issued Oct 18, 2026
              </p>
            </div>

            {/* Red Alert Pill Seal */}
            <div className="border-3 border-dashed border-brand-terracotta bg-brand-terracotta/15 p-4 sm:p-5 rounded-3xl text-center transform rotate-1 shadow-pill self-stretch md:self-auto">
              <span className="font-mono text-[10px] font-bold text-brand-terracotta uppercase block">
                FDA Hazard Status
              </span>
              <span className="font-heading text-xl sm:text-3xl font-black text-brand-terracotta tracking-tight block">
                IMMEDIATE DANGER
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
              <span className="font-heading font-black text-sm sm:text-base text-brand-terracotta">Salmonella</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Package Size:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-espresso">4 oz Pouches</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">UPC Barcode:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-espresso">8-12450-02841-4</span>
            </div>
            <div className="bg-brand-cream/60 p-3.5 sm:p-4 rounded-2xl border-2 border-brand-espresso/25 shadow-paper-sm">
              <span className="text-brand-taupe block text-[10px] sm:text-[11px] font-bold">Best-By Dates:</span>
              <span className="font-heading font-black text-sm sm:text-base text-brand-espresso">08/2027 to 11/2027</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* AD CONTAINER */}
      <AdSensePlaceholder slot="recall-docket-leaderboard-03" format="leaderboard" />

      {/* TWO COLUMN SPECIFICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Lots & Product Photos */}
        <div className="lg:col-span-7 space-y-6">
          <ScrollReveal direction="up" delayMs={100}>
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-4">
              <div className="flex items-center gap-2 border-b-2.5 border-brand-espresso pb-3">
                <Package className="w-5 h-5 text-brand-terracotta" />
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-brand-espresso">
                  Verified Recalled Lot Numbers
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-sans text-brand-taupe leading-relaxed font-medium">
                Examine the stamped ink code located horizontally along the bottom crimp of the foil pouch. 
                Only packages matching the following three lots are included in the FDA recall order:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-center">
                <div className="p-3.5 bg-brand-terracotta/20 border-2.5 border-brand-terracotta rounded-2xl text-brand-espresso shadow-paper-sm">
                  <span className="font-heading font-black text-base sm:text-lg block">LOT: 8841A</span>
                  <span className="pill-badge pill-badge-alert text-[10px] mt-1">BEST BY: 08/2027</span>
                </div>
                <div className="p-3.5 bg-brand-terracotta/20 border-2.5 border-brand-terracotta rounded-2xl text-brand-espresso shadow-paper-sm">
                  <span className="font-heading font-black text-base sm:text-lg block">LOT: 8841B</span>
                  <span className="pill-badge pill-badge-alert text-[10px] mt-1">BEST BY: 09/2027</span>
                </div>
                <div className="p-3.5 bg-brand-terracotta/20 border-2.5 border-brand-terracotta rounded-2xl text-brand-espresso shadow-paper-sm">
                  <span className="font-heading font-black text-base sm:text-lg block">LOT: 8842</span>
                  <span className="pill-badge pill-badge-alert text-[10px] mt-1">BEST BY: 11/2027</span>
                </div>
              </div>

              {/* Package Diagram Card */}
              <div className="p-4 bg-brand-cream/60 rounded-2xl border-2 border-brand-espresso/25 space-y-2">
                <span className="font-heading font-black text-xs uppercase text-brand-espresso flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-brand-terracotta" />
                  Where to find your lot number on this package:
                </span>
                <p className="text-xs font-sans text-brand-taupe font-medium">
                  On the back of the 4 oz foil pouch, inspect the lower right corner, approximately 1 inch above the UPC barcode. Look for a dot-matrix ink stamp with alphanumeric letters starting with "8841".
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Geographic Distribution Grid with State Cards */}
          <ScrollReveal direction="up" delayMs={150}>
            <div className="paper-box p-5 sm:p-8 bg-[#FAF4EE] space-y-4">
              <div className="flex items-center gap-2 border-b-2.5 border-brand-espresso pb-3">
                <MapPin className="w-5 h-5 text-brand-olive" />
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-brand-espresso">
                  Geographic Distribution Area (15 States)
                </h2>
              </div>
              <p className="text-xs font-sans text-brand-taupe font-medium">
                The FDA has confirmed commercial distribution across retail chains in the following states:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-xs">
                {affectedStates.map((st) => (
                  <div
                    key={st.code}
                    className="p-2.5 bg-brand-cream/60 border border-brand-espresso/30 rounded-xl flex items-center justify-between"
                  >
                    <span className="font-heading font-black text-brand-espresso">{st.name}</span>
                    <span className="text-[10px] text-brand-terracotta font-bold">{st.bags}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Action Plan with Terry Ho Pill Button */}
        <div className="lg:col-span-5 space-y-6">
          <ScrollReveal direction="up" delayMs={200}>
            <div className="paper-box bg-[#FAF4EE] p-5 sm:p-8 rounded-3xl space-y-5 border-2.5 border-brand-terracotta">
              <div className="flex items-center gap-2 border-b-2.5 border-brand-terracotta pb-3">
                <ShieldAlert className="w-5 h-5 text-brand-terracotta" />
                <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                  What To Do If You Have This Bag
                </h3>
              </div>

              <ul className="space-y-4 font-sans text-xs text-brand-espresso font-medium">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-terracotta text-white flex items-center justify-center font-heading font-black text-xs flex-shrink-0 mt-0.5 border border-brand-espresso shadow-sm">
                    1
                  </span>
                  <span>
                    <strong>Stop feeding immediately.</strong> Do not throw loose treats into open trash where pets or wildlife can scavenge it.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-terracotta text-white flex items-center justify-center font-heading font-black text-xs flex-shrink-0 mt-0.5 border border-brand-espresso shadow-sm">
                    2
                  </span>
                  <span>
                    <strong>Seal in a plastic bag.</strong> Return it to the retail store for a 100% full refund under mandatory FDA recall regulations (no receipt required).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-terracotta text-white flex items-center justify-center font-heading font-black text-xs flex-shrink-0 mt-0.5 border border-brand-espresso shadow-sm">
                    3
                  </span>
                  <span>
                    <strong>Sanitize bowls & wash hands.</strong> Salmonella bacteria easily transfer to family members through skin contact with food bowls.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-terracotta text-white flex items-center justify-center font-heading font-black text-xs flex-shrink-0 mt-0.5 border border-brand-espresso shadow-sm">
                    4
                  </span>
                  <span>
                    <strong>Monitor pet for symptoms.</strong> Contact a veterinarian immediately if lethargy, vomiting, or diarrhea occur.
                  </span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href="/safety/salmonella"
                  className="btn-pill btn-pill-espresso w-full py-3 text-xs font-black group text-center shadow-pill justify-center"
                >
                  <span>Read 24-Hr Triage Guide</span>
                  <span className="btn-circle-icon bg-brand-olive text-brand-espresso">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* AdSense Placement */}
          <div className="paper-box p-4 bg-brand-cream/80">
            <span className="font-heading font-black text-[11px] uppercase tracking-wider text-brand-taupe block mb-2">
              Veterinary Telehealth Sponsor
            </span>
            <AdSensePlaceholder slot="recall-sidebar-rectangle-03" format="rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
}
