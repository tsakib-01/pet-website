"use client";

import React, { useState } from "react";
import { Utensils, Droplets, HeartPulse, Check, Info, Cat } from "lucide-react";

export default function CatFoodCalculatorWetAndDry() {
  const [weight, setWeight] = useState<number>(10);
  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("lbs");
  const [activity, setActivity] = useState<string>("neutered");
  const [wetPercentage, setWetPercentage] = useState<number>(50);
  const [wetCanKcal, setWetCanKcal] = useState<number>(85); // standard 3oz can
  const [dryCupKcal, setDryCupKcal] = useState<number>(380); // standard kibble cup

  // Convert to kg
  const weightInKg = weightUnit === "lbs" ? weight * 0.453592 : weight;

  // WSAVA Resting Energy Requirement: RER = 70 * (kg)^0.75
  const rer = Math.round(70 * Math.pow(Math.max(1, weightInKg), 0.75));

  // Activity / Life stage multiplier
  const multipliers: Record<string, { factor: number; label: string }> = {
    weightloss: { factor: 0.8, label: "Weight Loss / Inactive Senior (0.8x)" },
    neutered: { factor: 1.2, label: "Neutered Adult Cat (1.2x)" },
    intact: { factor: 1.4, label: "Intact Adult Active Cat (1.4x)" },
    kitten_older: { factor: 2.0, label: "Kitten 4 to 12 Months (2.0x)" },
    kitten_young: { factor: 2.5, label: "Young Kitten 0 to 4 Months (2.5x)" },
  };

  const factor = multipliers[activity]?.factor || 1.2;
  const totalDailyKcal = Math.round(rer * factor);

  // Split calories
  const dryPercentage = 100 - wetPercentage;
  const wetDailyKcal = Math.round(totalDailyKcal * (wetPercentage / 100));
  const dryDailyKcal = Math.round(totalDailyKcal * (dryPercentage / 100));

  // Portion outputs
  const cansPerDay = wetDailyKcal > 0 ? (wetDailyKcal / wetCanKcal).toFixed(2) : "0";
  const cupsPerDay = dryDailyKcal > 0 ? (dryDailyKcal / dryCupKcal).toFixed(2) : "0";

  // Hydration bonus (wet food is ~78% moisture, kibble is ~10%)
  const estimatedMoistureMl = Math.round((parseFloat(cansPerDay) * 85 * 0.78) + (parseFloat(cupsPerDay) * 100 * 0.10));

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill flex-shrink-0 aspect-square">
            <Cat className="w-5 h-5 text-brand-espresso flex-shrink-0" />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Cat Food Calculator (Wet and Dry Ratio)
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              WSAVA & NRC Resting Metabolic Energy Standard
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso">
          WSAVA Formula
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Weight */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                1. Cat Body Weight
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
                min="1"
                max="30"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-28 bg-white border-2 border-brand-espresso rounded-xl px-3 py-1.5 font-heading font-black text-lg text-brand-espresso shadow-paper-sm"
              />
              <input
                type="range"
                min="2"
                max={weightUnit === "lbs" ? "25" : "12"}
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="flex-grow accent-brand-terracotta h-2 bg-brand-cream rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Life Stage / Activity */}
          <div>
            <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1">
              2. Feline Life Stage & Metabolic Activity
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full bg-white border-2 border-brand-espresso rounded-xl px-3 py-2 text-xs font-heading font-black text-brand-espresso shadow-paper-sm"
            >
              {Object.entries(multipliers).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          {/* Wet vs Dry Split Slider */}
          <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                3. Desired Meal Split (% Calories)
              </label>
              <div className="font-heading font-black text-xs text-brand-terracotta">
                {wetPercentage}% Wet / {dryPercentage}% Dry
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={wetPercentage}
              onChange={(e) => setWetPercentage(parseInt(e.target.value))}
              className="w-full accent-brand-olive cursor-pointer h-2.5 bg-brand-cream rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-brand-taupe mt-1">
              <span>100% Kibble</span>
              <span>50 / 50 Balanced</span>
              <span>100% Canned Wet</span>
            </div>
          </div>

          {/* Caloric density inputs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-mono text-[10px] text-brand-taupe uppercase mb-1">
                Wet Food (kcal / 3oz can)
              </label>
              <input
                type="number"
                value={wetCanKcal}
                onChange={(e) => setWetCanKcal(Math.max(10, parseInt(e.target.value) || 0))}
                className="w-full bg-white border-2 border-brand-espresso rounded-xl px-3 py-1 font-mono font-bold text-brand-espresso"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-brand-taupe uppercase mb-1">
                Dry Food (kcal / cup)
              </label>
              <input
                type="number"
                value={dryCupKcal}
                onChange={(e) => setDryCupKcal(Math.max(100, parseInt(e.target.value) || 0))}
                className="w-full bg-white border-2 border-brand-espresso rounded-xl px-3 py-1 font-mono font-bold text-brand-espresso"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-white border-2 border-brand-espresso rounded-3xl p-6 shadow-paper flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider mb-1">
              Total Daily Caloric Target
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-heading text-5xl font-black text-brand-espresso">
                {totalDailyKcal}
              </span>
              <span className="font-mono text-base font-bold text-brand-terracotta">
                kcal / day
              </span>
            </div>

            {/* Daily Portions Box */}
            <div className="space-y-3 mb-4">
              <div className="bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Wet Canned Food</div>
                  <div className="font-heading font-black text-xl text-brand-espresso">
                    {cansPerDay} Cans
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-brand-taupe">Daily Calories</div>
                  <div className="font-mono font-bold text-xs text-brand-terracotta">{wetDailyKcal} kcal</div>
                </div>
              </div>

              <div className="bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Dry Kibble Food</div>
                  <div className="font-heading font-black text-xl text-brand-espresso">
                    {cupsPerDay} Cups
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-brand-taupe">Daily Calories</div>
                  <div className="font-mono font-bold text-xs text-brand-terracotta">{dryDailyKcal} kcal</div>
                </div>
              </div>
            </div>

            {/* Hydration Benefit Note */}
            <div className="bg-sky-50 border border-sky-300 rounded-2xl p-3 text-xs text-sky-900 flex items-start gap-2">
              <Droplets className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Natural Hydration:</strong> This meal split delivers approximately <strong>~{estimatedMoistureMl} ml</strong> of dietary water daily, protecting against feline idiopathic cystitis and renal stones.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-espresso/20 text-[10px] font-mono text-brand-taupe">
            WSAVA formula: RER = 70 × (kg)^0.75 × {factor} MER factor.
          </div>
        </div>
      </div>
    </div>
  );
}
