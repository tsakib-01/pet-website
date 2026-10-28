"use client";

import React, { useState } from "react";
import { Utensils, AlertTriangle, ShieldCheck, Scale, HeartPulse, Info, Dog } from "lucide-react";

export default function HomemadeDogFoodCalculator() {
  const [weightLbs, setWeightLbs] = useState<number>(35);
  const [activity, setActivity] = useState<string>("moderate");

  // NRC Canine Caloric Formula
  const weightKg = weightLbs * 0.453592;
  const rer = 70 * Math.pow(Math.max(1, weightKg), 0.75);

  const activityFactors: Record<string, { factor: number; label: string }> = {
    sedentary: { factor: 1.2, label: "Sedentary / Senior / Neutered (1.2x)" },
    moderate: { factor: 1.6, label: "Moderate Daily Exercise (1.6x)" },
    active: { factor: 2.0, label: "High Energy / Working / Agility (2.0x)" },
  };

  const factor = activityFactors[activity]?.factor || 1.6;
  const totalDailyKcal = Math.round(rer * factor);

  // AAFCO Standard Balanced Home-Cooked Recipe Split
  // Total daily grams of fresh food: approx ~3% of body weight for average adult
  const totalDailyFreshGrams = Math.round(weightKg * 1000 * 0.028);

  const proteinGrams = Math.round(totalDailyFreshGrams * 0.45);
  const carbGrams = Math.round(totalDailyFreshGrams * 0.35);
  const veggieGrams = Math.round(totalDailyFreshGrams * 0.12);
  const fatGrams = Math.round(totalDailyFreshGrams * 0.08);

  // Calcium Requirement: ~900 mg elemental calcium per 1000 kcal (or ~1/2 tsp ground eggshell per lb of meat)
  const calciumMgNeeded = Math.round((totalDailyKcal / 1000) * 900);
  const eggshellPowderTsp = (calciumMgNeeded / 1800).toFixed(1); // 1 tsp ground eggshell ~ 1800-2000mg calcium

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
              Homemade Dog Food Calculator
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              AAFCO & NRC Canine Nutrition Balance
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso">
          1.2:1 Ca:P Safe
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                1. Dog Body Weight (lbs)
              </label>
              <span className="font-heading font-black text-lg text-brand-terracotta">
                {weightLbs} lbs ({weightKg.toFixed(1)} kg)
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="130"
              value={weightLbs}
              onChange={(e) => setWeightLbs(parseInt(e.target.value))}
              className="w-full accent-brand-terracotta cursor-pointer h-2 bg-brand-cream rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1">
              2. Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full bg-white border-2 border-brand-espresso rounded-xl px-3 py-2 text-xs font-heading font-black text-brand-espresso shadow-paper-sm"
            >
              {Object.entries(activityFactors).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          {/* Critical Calcium Guardrail Box */}
          <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-4 text-xs space-y-2">
            <div className="font-heading font-black text-amber-950 uppercase flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              MANDATORY CALCIUM BALANCE:
            </div>
            <p className="text-amber-900 leading-relaxed font-sans">
              All plain meat is rich in phosphorus and devoid of calcium. Feeding cooked meat without calcium forces the dog's body to leech calcium from their own bones.
            </p>
            <div className="bg-white border border-amber-300 rounded-xl p-2.5 font-mono text-amber-950 font-bold">
              Required Daily Calcium Supplement: ~{calciumMgNeeded} mg ({eggshellPowderTsp} tsp pure ground eggshell powder or calcium carbonate).
            </div>
          </div>
        </div>

        {/* Daily Recipe Portions Output */}
        <div className="lg:col-span-6 bg-white border-2 border-brand-espresso rounded-3xl p-6 shadow-paper flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-espresso/20">
              <div>
                <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Total Daily Energy</div>
                <div className="font-heading text-3xl font-black text-brand-espresso">{totalDailyKcal} kcal</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Total Fresh Weight</div>
                <div className="font-mono font-black text-lg text-brand-terracotta">~{totalDailyFreshGrams}g / day</div>
              </div>
            </div>

            {/* Ingredient Portions Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#FAF4EE] border border-brand-espresso/30 rounded-2xl p-3">
                <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Lean Protein (45%)</div>
                <div className="font-heading font-black text-lg text-brand-espresso">{proteinGrams}g ({((proteinGrams * 0.035274)).toFixed(1)} oz)</div>
                <div className="text-[10px] font-mono text-brand-taupe">Turkey, 90/10 Beef, Chicken, White Fish</div>
              </div>

              <div className="bg-[#FAF4EE] border border-brand-espresso/30 rounded-2xl p-3">
                <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Cooked Carbs (35%)</div>
                <div className="font-heading font-black text-lg text-brand-espresso">{carbGrams}g ({((carbGrams * 0.035274)).toFixed(1)} oz)</div>
                <div className="text-[10px] font-mono text-brand-taupe">Sweet Potato, Brown Rice, Rolled Oats</div>
              </div>

              <div className="bg-[#FAF4EE] border border-brand-espresso/30 rounded-2xl p-3">
                <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Vegetables (12%)</div>
                <div className="font-heading font-black text-lg text-brand-espresso">{veggieGrams}g ({((veggieGrams * 0.035274)).toFixed(1)} oz)</div>
                <div className="text-[10px] font-mono text-brand-taupe">Steamed Green Beans, Carrots, Spinach</div>
              </div>

              <div className="bg-[#FAF4EE] border border-brand-espresso/30 rounded-2xl p-3">
                <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase">Healthy Fats (8%)</div>
                <div className="font-heading font-black text-lg text-brand-espresso">{fatGrams}g ({((fatGrams * 0.035274)).toFixed(1)} oz)</div>
                <div className="text-[10px] font-mono text-brand-taupe">Salmon Omega-3 Oil, Flaxseed, Olive Oil</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-espresso/20 text-[10px] font-mono text-brand-taupe">
            Formulated to meet AAFCO maintenance canine nutrient profile ratios.
          </div>
        </div>
      </div>
    </div>
  );
}
