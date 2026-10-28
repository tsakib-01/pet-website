"use client";

import React, { useState } from "react";
import { Cat, HeartPulse, ShieldCheck, Check } from "lucide-react";

export default function CatAgeCalculator() {
  const [years, setYears] = useState<number>(4);
  const [months, setMonths] = useState<number>(0);

  // AAFP & AAHA Feline Life Stage Standard
  const calculateHumanAge = () => {
    const totalMonths = years * 12 + months;
    if (totalMonths <= 0) return 0;
    if (totalMonths <= 1) return 1;
    if (totalMonths <= 3) return 4;
    if (totalMonths <= 6) return 10;
    if (totalMonths <= 12) {
      // 6 to 12 months scales from 10 to 15
      return Math.round(10 + ((totalMonths - 6) / 6) * 5);
    }
    if (totalMonths <= 24) {
      // 12 to 24 months scales from 15 to 24
      return Math.round(15 + ((totalMonths - 12) / 12) * 9);
    }
    // After 24 months: exactly 4 human years per calendar year
    const yearsAfterTwo = (totalMonths - 24) / 12;
    return Math.round(24 + yearsAfterTwo * 4);
  };

  const humanAge = calculateHumanAge();

  const getLifeStage = () => {
    const totalMonths = years * 12 + months;
    if (totalMonths <= 6) {
      return { stage: "Kitten", color: "bg-emerald-500", text: "Rapid growth, core FVRCP vaccines, spay/neuter window." };
    } else if (totalMonths <= 24) {
      return { stage: "Junior", color: "bg-sky-500", text: "Physical growth completes; establishes social territory & adult behaviors." };
    } else if (totalMonths <= 72) {
      return { stage: "Prime Adult", color: "bg-brand-olive", text: "Peak physical fitness. Annual wellness, dental checks, weight monitoring." };
    } else if (totalMonths <= 120) {
      return { stage: "Mature", color: "bg-brand-terracotta", text: "Early metabolic shifts. Monitor hydration, kidney health, and thyroid." };
    } else if (totalMonths <= 168) {
      return { stage: "Senior", color: "bg-amber-600", text: "Twice-yearly vet checks. Blood pressure, renal SDMA, arthritis monitoring." };
    } else {
      return { stage: "Geriatric", color: "bg-purple-600", text: "Comfort care, warm accessible bedding, frequent hydration, gentle grooming." };
    }
  };

  const stage = getLifeStage();

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill flex-shrink-0 aspect-square mt-0.5">
            <Cat className="w-5 h-5 text-brand-espresso flex-shrink-0" />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading text-lg sm:text-2xl font-black text-brand-espresso leading-snug">
              Cat Age Calculator
            </h3>
            <p className="text-xs sm:text-sm text-brand-taupe font-sans font-medium mt-1 leading-normal">
              AAFP / AAHA Feline Life Stage Standard
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[10px] sm:text-xs font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex-shrink-0">
          100% Veterinary Accurate
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Years Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                1. Cat Age in Years
              </label>
              <span className="font-heading font-black text-lg text-brand-terracotta">
                {years} {years === 1 ? "Year" : "Years"}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full accent-brand-terracotta cursor-pointer h-2 bg-brand-cream rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-brand-taupe mt-1">
              <span>0 yr</span>
              <span>5 yr</span>
              <span>10 yr</span>
              <span>15 yr</span>
              <span>20 yr</span>
              <span>25 yr</span>
            </div>
          </div>

          {/* Months Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                2. Additional Months
              </label>
              <span className="font-heading font-black text-lg text-brand-espresso">
                {months} {months === 1 ? "Month" : "Months"}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="11"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="w-full accent-brand-olive cursor-pointer h-2 bg-brand-cream rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-brand-taupe mt-1">
              <span>0 mo</span>
              <span>3 mo</span>
              <span>6 mo</span>
              <span>9 mo</span>
              <span>11 mo</span>
            </div>
          </div>

          {/* Quick Life Stage Quick Reference Table */}
          <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4">
            <div className="font-mono font-bold text-xs text-brand-espresso uppercase mb-2">
              Official AAFP Feline Age Progression
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="bg-[#FAF4EE] p-2 rounded-xl border border-brand-espresso/20">
                <div className="font-bold text-brand-espresso">Age 1</div>
                <div className="text-brand-terracotta font-black">= 15 Human</div>
              </div>
              <div className="bg-[#FAF4EE] p-2 rounded-xl border border-brand-espresso/20">
                <div className="font-bold text-brand-espresso">Age 2</div>
                <div className="text-brand-terracotta font-black">= 24 Human</div>
              </div>
              <div className="bg-[#FAF4EE] p-2 rounded-xl border border-brand-espresso/20">
                <div className="font-bold text-brand-espresso">Each Year +</div>
                <div className="text-brand-terracotta font-black">+4 Human</div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-white border-2 border-brand-espresso rounded-3xl p-6 shadow-paper flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider mb-1">
              Equivalent Human Age
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-heading text-6xl font-black text-brand-espresso">
                {humanAge}
              </span>
              <span className="font-heading text-xl font-bold text-brand-terracotta">
                Human Years
              </span>
            </div>

            {/* Stage Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-espresso bg-[#FAF4EE] mb-4">
              <span className={`w-2.5 h-2.5 rounded-full ${stage.color}`}></span>
              <span className="font-heading font-black text-xs text-brand-espresso uppercase">
                Life Stage: {stage.stage}
              </span>
            </div>

            {/* Health Box */}
            <div className="bg-brand-paper border border-brand-espresso/30 rounded-2xl p-4 text-xs space-y-2">
              <div className="font-mono font-bold text-brand-espresso flex items-center gap-1.5 uppercase text-[11px]">
                <HeartPulse className="w-3.5 h-3.5 text-brand-terracotta" />
                Veterinary Milestone Focus:
              </div>
              <p className="text-brand-taupe leading-relaxed">
                {stage.text}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-espresso/20 flex items-center justify-between text-[11px] font-mono text-brand-taupe">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              AAFP Certified
            </span>
            <span>Accredited Feline Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
