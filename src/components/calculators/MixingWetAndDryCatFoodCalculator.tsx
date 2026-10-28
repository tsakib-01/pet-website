"use client";

import React, { useState } from "react";
import { Utensils, Scale, Clock, CheckCircle, Droplets, Info } from "lucide-react";

export default function MixingWetAndDryCatFoodCalculator() {
  const [weightLbs, setWeightLbs] = useState<number>(11);
  const [targetSplit, setTargetSplit] = useState<number>(60); // 60% wet, 40% dry
  const [canSize, setCanSize] = useState<"3oz" | "5.5oz">("3oz");

  // WSAVA Formula: Weight kg -> RER * 1.2 for adult neutered cat
  const weightKg = weightLbs * 0.453592;
  const rer = 70 * Math.pow(Math.max(1, weightKg), 0.75);
  const totalKcal = Math.round(rer * 1.2);

  const wetKcalPerCan = canSize === "3oz" ? 82 : 155;
  const kibbleKcalPerGram = 3.65; // ~365 kcal per 100g

  const wetKcal = Math.round(totalKcal * (targetSplit / 100));
  const dryKcal = Math.round(totalKcal * ((100 - targetSplit) / 100));

  const totalCans = (wetKcal / wetKcalPerCan).toFixed(2);
  const totalKibbleGrams = Math.round(dryKcal / kibbleKcalPerGram);
  const totalKibbleCups = (dryKcal / 380).toFixed(2);

  // Feeding schedule breakdown (50% morning, 50% evening)
  const morningWet = (parseFloat(totalCans) / 2).toFixed(2);
  const morningDryGrams = Math.round(totalKibbleGrams / 2);
  const eveningWet = (parseFloat(totalCans) / 2).toFixed(2);
  const eveningDryGrams = Math.round(totalKibbleGrams / 2);

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill">
            <Utensils className="w-5 h-5 text-brand-espresso" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Mixing Wet and Dry Cat Food Calculator
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              Precision Dual-Diet Portion & Satiety Planner
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso">
          Anti-Obesity Safe
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Weight */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                1. Cat Current Weight (lbs)
              </label>
              <span className="font-heading font-black text-lg text-brand-terracotta">
                {weightLbs} lbs ({weightKg.toFixed(1)} kg)
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="24"
              step="0.5"
              value={weightLbs}
              onChange={(e) => setWeightLbs(parseFloat(e.target.value))}
              className="w-full accent-brand-terracotta cursor-pointer h-2 bg-brand-cream rounded-lg"
            />
          </div>

          {/* Ratio Slider */}
          <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                2. Wet vs. Dry Ratio
              </label>
              <span className="font-heading font-black text-xs text-brand-espresso">
                {targetSplit}% Wet / {100 - targetSplit}% Dry
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="10"
              value={targetSplit}
              onChange={(e) => setTargetSplit(parseInt(e.target.value))}
              className="w-full accent-brand-olive cursor-pointer h-2 bg-brand-cream rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-brand-taupe mt-1">
              <span>Mostly Dry (10%)</span>
              <span>Balanced (50/50)</span>
              <span>Mostly Wet (90%)</span>
            </div>
          </div>

          {/* Can Size Selection */}
          <div>
            <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1">
              3. Commercial Wet Can Size
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "3oz", label: "Small Can (3 oz / 85g)", sub: "~82 kcal/can" },
                { id: "5.5oz", label: "Large Can (5.5 oz / 156g)", sub: "~155 kcal/can" },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCanSize(c.id as any)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    canSize === c.id
                      ? "bg-brand-espresso text-white border-brand-espresso shadow-paper-sm"
                      : "bg-white text-brand-espresso border-brand-espresso/30 hover:border-brand-espresso"
                  }`}
                >
                  <div className="font-heading font-black text-xs sm:text-sm">{c.label}</div>
                  <div className="text-[10px] font-mono opacity-80">{c.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Meal Schedule */}
        <div className="lg:col-span-6 bg-white border-2 border-brand-espresso rounded-3xl p-6 shadow-paper flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-espresso/20">
              <div>
                <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Total Daily Calories</div>
                <div className="font-heading text-3xl font-black text-brand-espresso">{totalKcal} kcal</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Hydration Added</div>
                <div className="font-mono font-black text-lg text-emerald-700">~{Math.round(parseFloat(totalCans) * (canSize === "3oz" ? 85 : 156) * 0.78)} ml H₂O</div>
              </div>
            </div>

            {/* Daily Total Output */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#FAF4EE] border border-brand-espresso/30 rounded-2xl p-3">
                <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Total Daily Wet</div>
                <div className="font-heading font-black text-xl text-brand-terracotta">{totalCans} Cans</div>
                <div className="text-[10px] font-mono text-brand-taupe">{wetKcal} kcal</div>
              </div>
              <div className="bg-[#FAF4EE] border border-brand-espresso/30 rounded-2xl p-3">
                <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Total Daily Dry</div>
                <div className="font-heading font-black text-xl text-brand-espresso">{totalKibbleGrams}g ({totalKibbleCups} cup)</div>
                <div className="text-[10px] font-mono text-brand-taupe">{dryKcal} kcal</div>
              </div>
            </div>

            {/* Suggested AM / PM Meal Schedule */}
            <div className="bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl p-4">
              <div className="font-heading font-black text-xs text-brand-espresso uppercase mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-terracotta" />
                Recommended Twice-Daily Feeding Bowls
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-brand-espresso/20">
                  <div className="font-bold text-brand-espresso mb-1">☀️ Morning Bowl</div>
                  <div className="text-brand-taupe text-[11px] space-y-0.5">
                    <div>• <strong>{morningWet} Can</strong> wet food</div>
                    <div>• <strong>{morningDryGrams}g</strong> dry kibble</div>
                  </div>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-brand-espresso/20">
                  <div className="font-bold text-brand-espresso mb-1">🌙 Evening Bowl</div>
                  <div className="text-brand-taupe text-[11px] space-y-0.5">
                    <div>• <strong>{eveningWet} Can</strong> wet food</div>
                    <div>• <strong>{eveningDryGrams}g</strong> dry kibble</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-espresso/20 text-[10px] font-mono text-brand-taupe">
            Calibrated to prevent the 30% caloric surplus common in unmeasured mixed diets.
          </div>
        </div>
      </div>
    </div>
  );
}
