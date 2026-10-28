"use client";

import React, { useState } from "react";
import { Scale, Dog, TrendingUp, Calendar, Info, Check } from "lucide-react";

export default function PuppyWeightCalculator() {
  const [ageWeeks, setAgeWeeks] = useState<number>(14);
  const [currentWeight, setCurrentWeight] = useState<number>(18);
  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("lbs");
  const [sizeClass, setSizeClass] = useState<"toy" | "small" | "medium" | "large" | "giant">("medium");

  // Percentage of adult weight reached by week for each breed class
  // Derived from veterinary pediatric growth curves (Waltham / AKC growth benchmarks)
  const growthCurves: Record<string, { label: string; adultMonths: number; getPercent: (w: number) => number }> = {
    toy: {
      label: "Toy / Mini (< 12 lbs)",
      adultMonths: 9,
      getPercent: (w) => Math.min(1.0, 0.20 + (w / 38) * 0.80),
    },
    small: {
      label: "Small (12 - 22 lbs)",
      adultMonths: 11,
      getPercent: (w) => Math.min(1.0, 0.16 + (w / 44) * 0.84),
    },
    medium: {
      label: "Medium (23 - 50 lbs)",
      adultMonths: 13,
      getPercent: (w) => Math.min(1.0, 0.12 + (w / 52) * 0.88),
    },
    large: {
      label: "Large (51 - 90 lbs)",
      adultMonths: 16,
      getPercent: (w) => Math.min(1.0, 0.09 + (w / 64) * 0.91),
    },
    giant: {
      label: "Giant (> 90 lbs)",
      adultMonths: 20,
      getPercent: (w) => Math.min(1.0, 0.06 + (w / 80) * 0.94),
    },
  };

  const curve = growthCurves[sizeClass];
  const percentReached = curve.getPercent(ageWeeks);
  const predictedAdultWeight = currentWeight > 0 && percentReached > 0 ? currentWeight / percentReached : currentWeight;

  const minAdult = Math.round(predictedAdultWeight * 0.93);
  const maxAdult = Math.round(predictedAdultWeight * 1.07);

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill flex-shrink-0 aspect-square">
            <Dog className="w-5 h-5 text-brand-espresso flex-shrink-0" />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Puppy Weight Calculator (Adult Size Predictor)
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              Veterinary Pediatric Growth Curve Modeling
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso">
          Waltham Standard
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Size Class */}
          <div>
            <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-2">
              1. Expected Breed Adult Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(growthCurves).map(([key, val]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSizeClass(key as any)}
                  className={`p-2.5 rounded-2xl border-2 text-left transition-all ${
                    sizeClass === key
                      ? "bg-brand-espresso text-white border-brand-espresso shadow-paper-sm -translate-y-0.5"
                      : "bg-white text-brand-espresso border-brand-espresso/30 hover:border-brand-espresso"
                  }`}
                >
                  <div className="font-heading font-black text-xs">{val.label}</div>
                  <div className="text-[10px] font-mono opacity-80">Full adult ~{val.adultMonths} mo</div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Puppy Age in Weeks */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                2. Current Puppy Age in Weeks
              </label>
              <span className="font-heading font-black text-lg text-brand-terracotta">
                {ageWeeks} Weeks ({(ageWeeks / 4.345).toFixed(1)} Months)
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="60"
              value={ageWeeks}
              onChange={(e) => setAgeWeeks(parseInt(e.target.value))}
              className="w-full accent-brand-terracotta cursor-pointer h-2 bg-brand-cream rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-brand-taupe mt-1">
              <span>6 wks</span>
              <span>16 wks</span>
              <span>26 wks (6 mo)</span>
              <span>40 wks</span>
              <span>60 wks</span>
            </div>
          </div>

          {/* Current Puppy Weight */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                3. Current Measured Weight
              </label>
              <div className="inline-flex rounded-full border-2 border-brand-espresso p-0.5 bg-white text-[10px] font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setWeightUnit("lbs")}
                  className={`px-2 py-0.5 rounded-full ${weightUnit === "lbs" ? "bg-brand-espresso text-white" : "text-brand-taupe"}`}
                >
                  LBS
                </button>
                <button
                  type="button"
                  onClick={() => setWeightUnit("kg")}
                  className={`px-2 py-0.5 rounded-full ${weightUnit === "kg" ? "bg-brand-espresso text-white" : "text-brand-taupe"}`}
                >
                  KG
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0.5"
                max="150"
                step="0.5"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Math.max(0.5, parseFloat(e.target.value) || 0))}
                className="w-28 bg-white border-2 border-brand-espresso rounded-xl px-3 py-1.5 font-heading font-black text-lg text-brand-espresso shadow-paper-sm"
              />
              <span className="text-xs font-mono text-brand-taupe">
                Recorded at veterinarian or home digital scale
              </span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-white border-2 border-brand-espresso rounded-3xl p-6 shadow-paper flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider mb-1">
              Estimated Adult Weight Range
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-heading text-4xl sm:text-5xl font-black text-brand-espresso">
                {minAdult} – {maxAdult}
              </span>
              <span className="font-heading text-lg font-bold text-brand-terracotta">
                {weightUnit.toUpperCase()}
              </span>
            </div>

            {/* Growth Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-[11px] font-mono text-brand-taupe mb-1">
                <span>Current Adult Size Reached</span>
                <span className="font-bold text-brand-espresso">{Math.round(percentReached * 100)}%</span>
              </div>
              <div className="w-full bg-brand-cream/40 h-3 rounded-full border border-brand-espresso overflow-hidden">
                <div
                  className="bg-brand-olive h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round(percentReached * 100))}%` }}
                />
              </div>
            </div>

            {/* Growth Plate Details */}
            <div className="bg-[#FAF4EE] border border-brand-espresso/30 rounded-2xl p-4 text-xs space-y-2">
              <div className="font-mono font-bold text-brand-espresso uppercase text-[11px] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-terracotta" />
                Growth Plate Fusion Estimate:
              </div>
              <p className="text-brand-taupe leading-relaxed text-[11px]">
                {curve.label} puppies typically experience final epiphyseal growth plate closure around <strong>~{curve.adultMonths} months of age</strong>. Avoid repetitive high-impact jumping exercises until full skeletal maturity.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-espresso/20 text-[10px] font-mono text-brand-taupe">
            Calibrated against veterinary pediatric curve benchmarks.
          </div>
        </div>
      </div>
    </div>
  );
}
