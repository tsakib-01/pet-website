import React from "react";
import {
  AlertOctagon,
  Barcode,
  Archive,
  Stethoscope,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  FileSpreadsheet,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

export default function RecallActionProtocols() {
  return (
    <div className="space-y-12">
      {/* =========================================================================
          SECTION 1: 4-STEP EMERGENCY PROTOCOL
          ========================================================================= */}
      <section className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-10 shadow-paper space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-950 border border-rose-300 text-xs font-heading font-black uppercase tracking-wider">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            Emergency Consumer Safety Action Plan
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
            What to Do If Your Pet&apos;s Food Is Recalled
          </h2>
          <p className="text-sm sm:text-base text-brand-taupe leading-relaxed max-w-3xl">
            If you suspect or confirm your dog or cat food is subject to an active FDA docket or market withdrawal, take these four immediate containment steps to safeguard your household.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-brand-cream/30 border-2 border-brand-espresso/20 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-heading font-black text-lg shadow-paper-sm">
                1
              </div>
              <h3 className="font-heading font-black text-lg text-brand-espresso">
                Stop Feeding &amp; Isolate Immediately
              </h3>
              <p className="text-xs text-brand-taupe leading-relaxed">
                Immediately pull the food bowl away. Secure remaining kibble or canned food in a sealed plastic bin where curious dogs, cats, or household children cannot access it.
              </p>
            </div>
            <div className="pt-2 border-t border-brand-espresso/10 text-[11px] font-heading font-bold text-rose-700">
              ⚠️ Do not discard in open trash
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-brand-cream/30 border-2 border-brand-espresso/20 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-terracotta text-white flex items-center justify-center font-heading font-black text-lg shadow-paper-sm">
                2
              </div>
              <h3 className="font-heading font-black text-lg text-brand-espresso">
                Inspect Lot Code &amp; 12-Digit UPC
              </h3>
              <p className="text-xs text-brand-taupe leading-relaxed">
                Check the stamped ink code on the back seam or bottom rim. Match the lot code, best-by expiration date, and bag weight against the FDA enforcement docket.
              </p>
            </div>
            <div className="pt-2 border-t border-brand-espresso/10 text-[11px] font-heading font-bold text-brand-espresso flex items-center gap-1.5">
              <Barcode className="w-3.5 h-3.5 text-brand-terracotta" />
              Photograph bag packaging
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-brand-cream/30 border-2 border-brand-espresso/20 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-heading font-black text-lg shadow-paper-sm">
                3
              </div>
              <h3 className="font-heading font-black text-lg text-brand-espresso">
                Preserve an Evidence Sample
              </h3>
              <p className="text-xs text-brand-taupe leading-relaxed">
                Store approximately 2 cups of the suspected food in a clean, airtight Ziploc bag along with the original manufacturer packaging. Freeze or keep cool if wet food.
              </p>
            </div>
            <div className="pt-2 border-t border-brand-espresso/10 text-[11px] font-heading font-bold text-amber-800 flex items-center gap-1.5">
              <Archive className="w-3.5 h-3.5 text-amber-600" />
              Essential for lab toxicology
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-2xl bg-brand-cream/30 border-2 border-brand-espresso/20 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-heading font-black text-lg shadow-paper-sm">
                4
              </div>
              <h3 className="font-heading font-black text-lg text-brand-espresso">
                Veterinary Triage &amp; Full Refund
              </h3>
              <p className="text-xs text-brand-taupe leading-relaxed">
                Contact your veterinarian if your pet has consumed the batch, even without visible symptoms. Return the bag to Chewy, Petco, PetSmart, or grocery retailer for a 100% refund.
              </p>
            </div>
            <div className="pt-2 border-t border-brand-espresso/10 text-[11px] font-heading font-bold text-emerald-800 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
              No receipt often required
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OFFICIAL FDA REPORTING PORTAL & COMPLAINT DIRECTORY
          ========================================================================= */}
      <section className="bg-brand-olive/30 border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-10 shadow-paper space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-2 border-brand-espresso/15">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-espresso border border-brand-espresso/20 text-xs font-heading font-black uppercase tracking-wider shadow-paper-sm">
              <ShieldAlert className="w-4 h-4 text-brand-terracotta" />
              Official Government Safety Reporting
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
              How to Report a Sickness or Tainted Food to the FDA
            </h2>
            <p className="text-sm sm:text-base text-brand-taupe leading-relaxed max-w-2xl">
              Did a pet food make your dog or cat sick before an official recall was published? Filing a timely consumer complaint is often the primary trigger that prompts the FDA to launch laboratory testing and institute nationwide dockets.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="https://www.safetyreporting.hhs.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-brand-terracotta text-white border-2 border-brand-espresso shadow-paper font-heading font-black text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-paper-sm transition-all"
            >
              FDA Safety Reporting Portal
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://www.fda.gov/safety/report-problem-fda/consumer-complaint-coordinators"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-brand-espresso border-2 border-brand-espresso shadow-paper font-heading font-black text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-paper-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 text-brand-terracotta" />
              State Coordinators
            </a>
          </div>
        </div>

        {/* What to Keep Ready Before Filing */}
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-black text-brand-espresso flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-brand-terracotta" />
            Checklist: What Information the FDA Needs for an Investigation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans">
            <div className="bg-white p-4 rounded-2xl border-2 border-brand-espresso/15 space-y-1.5">
              <div className="font-heading font-black text-sm text-brand-espresso flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Product &amp; Container Specifics
              </div>
              <p className="text-brand-taupe leading-relaxed">
                Exact brand name, specific recipe title, package net weight (e.g., 28 lb bag vs 12.5 oz can), and complete 12-digit UPC barcode.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-brand-espresso/15 space-y-1.5">
              <div className="font-heading font-black text-sm text-brand-espresso flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Manufacturing Ink Codes
              </div>
              <p className="text-brand-taupe leading-relaxed">
                Lot number, batch stamping, best-by expiration date, and plant facility code (usually found adjacent to the expiration stamp).
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-brand-espresso/15 space-y-1.5">
              <div className="font-heading font-black text-sm text-brand-espresso flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Clinical Veterinary Notes
              </div>
              <p className="text-brand-taupe leading-relaxed">
                Veterinarian contact details, diagnostic test results, bloodwork reports, date symptoms began, and specific medical treatments administered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: COMMON RECALL HAZARDS & CLINICAL SYMPTOMS EXPLAINER
          ========================================================================= */}
      <section className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-10 shadow-paper space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light-gold/60 text-brand-espresso border border-brand-espresso/20 text-xs font-heading font-black uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-brand-espresso" />
            Veterinary Pathology Guide
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
            Recognizing Common Contaminants &amp; Symptoms
          </h2>
          <p className="text-sm text-brand-taupe leading-relaxed max-w-3xl">
            Over 90% of pet food recalls are triggered by one of four biological or chemical hazards. Recognize the warning signs early to seek prompt veterinary intervention.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          {/* Salmonella */}
          <div className="p-4 rounded-2xl bg-brand-cream/30 border border-brand-espresso/20 space-y-2">
            <div className="font-heading font-black text-sm text-brand-espresso">
              🦠 Salmonella &amp; Listeria
            </div>
            <p className="text-brand-taupe leading-relaxed">
              Bacterial pathogen causing gastrointestinal distress. Can also infect human handlers through cross-contamination during bowl preparation.
            </p>
            <div className="pt-2 border-t border-brand-espresso/10 text-[11px] text-rose-800 font-bold">
              Symptoms: Bloody diarrhea, fever, vomiting, abdominal cramping, lethargy.
            </div>
          </div>

          {/* Aflatoxin */}
          <div className="p-4 rounded-2xl bg-brand-cream/30 border border-brand-espresso/20 space-y-2">
            <div className="font-heading font-black text-sm text-brand-espresso">
              🌾 Aflatoxin (Mold Toxin)
            </div>
            <p className="text-brand-taupe leading-relaxed">
              A poisonous mycotoxin produced by <em>Aspergillus flavus</em> mold on agricultural grains like corn, peanuts, and wheat during hot storage.
            </p>
            <div className="pt-2 border-t border-brand-espresso/10 text-[11px] text-rose-800 font-bold">
              Symptoms: Sluggishness, loss of appetite, jaundice (yellowish eyes and gums), liver failure.
            </div>
          </div>

          {/* Elevated Vitamin D */}
          <div className="p-4 rounded-2xl bg-brand-cream/30 border border-brand-espresso/20 space-y-2">
            <div className="font-heading font-black text-sm text-brand-espresso">
              ☀️ Hypervitaminosis D
            </div>
            <p className="text-brand-taupe leading-relaxed">
              Premix formulation error resulting in toxic Vitamin D levels. Causes systemic calcium buildup leading to acute renal failure.
            </p>
            <div className="pt-2 border-t border-brand-espresso/10 text-[11px] text-rose-800 font-bold">
              Symptoms: Excessive thirst (polydipsia), increased urination, drooling, severe weight loss.
            </div>
          </div>

          {/* Foreign Material */}
          <div className="p-4 rounded-2xl bg-brand-cream/30 border border-brand-espresso/20 space-y-2">
            <div className="font-heading font-black text-sm text-brand-espresso">
              ⚙️ Foreign Physical Objects
            </div>
            <p className="text-brand-taupe leading-relaxed">
              In-plant manufacturing equipment breakdowns shedding metal wire shards, plastic conveyor belt fragments, or glass shards into feed batches.
            </p>
            <div className="pt-2 border-t border-brand-espresso/10 text-[11px] text-rose-800 font-bold">
              Symptoms: Choking, oral bleeding, intestinal blockage, reluctance to eat dry kibble.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
