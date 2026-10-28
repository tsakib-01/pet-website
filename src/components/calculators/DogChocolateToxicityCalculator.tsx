"use client";

import React, { useState } from "react";
import { AlertTriangle, PhoneCall, ShieldAlert, Heart, CheckCircle2 } from "lucide-react";

export default function DogChocolateToxicityCalculator() {
  const [weight, setWeight] = useState<number>(30);
  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("lbs");
  const [chocolateType, setChocolateType] = useState<string>("milk");
  const [amount, setAmount] = useState<number>(2);
  const [amountUnit, setAmountUnit] = useState<"oz" | "g">("oz");

  // Theobromine mg per ounce
  const theobromineMgPerOz: Record<string, { name: string; mg: number; desc: string }> = {
    white: { name: "White Chocolate", mg: 0.25, desc: "Negligible theobromine (GI upset from fat/sugar only)" },
    milk: { name: "Milk Chocolate", mg: 60, desc: "Standard milk chocolate bars, kisses, candy" },
    semisweet: { name: "Dark / Semi-Sweet (50-60%)", mg: 150, desc: "Baking chips, standard dark chocolate" },
    verydark: { name: "Very Dark Chocolate (70-85%)", mg: 225, desc: "Artisanal high-cacao dark bars" },
    bakers: { name: "Baker's / Unsweetened Chocolate", mg: 400, desc: "Pure unsweetened baking squares (High Risk)" },
    cocoa: { name: "Dry Cocoa Powder", mg: 750, desc: "Natural unsweetened cocoa powder (Highest Risk)" },
  };

  // Convert weight to kg
  const weightInKg = weightUnit === "lbs" ? weight * 0.453592 : weight;

  // Convert amount to oz
  const amountInOz = amountUnit === "g" ? amount * 0.035274 : amount;

  // Calculate theobromine dose in mg/kg
  const totalTheobromineMg = amountInOz * (theobromineMgPerOz[chocolateType]?.mg || 60);
  const doseMgPerKg = weightInKg > 0 ? totalTheobromineMg / weightInKg : 0;

  // Severity classification
  const getSeverity = () => {
    if (doseMgPerKg < 20) {
      return {
        level: "Mild / Non-Toxic",
        color: "text-emerald-700 bg-emerald-100 border-emerald-400",
        meter: "w-1/4 bg-emerald-500",
        action: "Observe for mild stomach upset or diarrhea from fat content. Clinical toxicity is unlikely.",
        badge: "Low Toxicity Risk",
      };
    } else if (doseMgPerKg < 40) {
      return {
        level: "Moderate Toxicity",
        color: "text-amber-800 bg-amber-100 border-amber-400",
        meter: "w-2/4 bg-amber-500",
        action: "Vomiting, diarrhea, restlessness, and excessive thirst expected. Contact your vet or pet poison helpline.",
        badge: "Veterinary Attention Advised",
      };
    } else if (doseMgPerKg < 60) {
      return {
        level: "Severe Cardiotoxicity",
        color: "text-orange-900 bg-orange-100 border-orange-500",
        meter: "w-3/4 bg-orange-500",
        action: "Rapid heartbeat (tachycardia), high blood pressure, and panting. Urgent veterinary clinic visit required immediately.",
        badge: "Urgent Medical Care Required",
      };
    } else {
      return {
        level: "Critical / Potentially Fatal",
        color: "text-red-900 bg-red-100 border-red-600",
        meter: "w-full bg-red-600 animate-pulse",
        action: "Severe risk of muscle tremors, seizures, heart arrhythmias, and coma. Transport to emergency veterinary hospital immediately.",
        badge: "LIFE-THREATENING EMERGENCY",
      };
    }
  };

  const severity = getSeverity();

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-500/15 border-2 border-red-600 flex items-center justify-center shadow-pill">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Dog Chocolate Toxicity Calculator
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              Merck Veterinary Manual & ASPCA APCC Standard
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-terracotta text-[#FAF4EE] border border-brand-espresso">
          Emergency Clinical Triage
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Weight */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                1. Dog Body Weight
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
                max="250"
                value={weight}
                onChange={(e) => setWeight(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-32 bg-white border-2 border-brand-espresso rounded-xl px-3 py-2 font-heading font-black text-lg text-brand-espresso shadow-paper-sm"
              />
              <input
                type="range"
                min="2"
                max={weightUnit === "lbs" ? "180" : "80"}
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="flex-grow accent-brand-terracotta h-2 bg-brand-cream rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Chocolate Type */}
          <div>
            <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1.5">
              2. Type of Chocolate Ingested
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(theobromineMgPerOz).map(([key, val]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setChocolateType(key)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    chocolateType === key
                      ? "bg-brand-espresso text-[#FAF4EE] border-brand-espresso shadow-paper-sm -translate-y-0.5"
                      : "bg-white text-brand-espresso border-brand-espresso/30 hover:border-brand-espresso"
                  }`}
                >
                  <div className="font-heading font-black text-xs sm:text-sm">{val.name}</div>
                  <div className="text-[10px] font-mono opacity-80 mt-0.5">{val.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Ingested */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                3. Amount Ingested
              </label>
              <div className="inline-flex rounded-full border-2 border-brand-espresso p-0.5 bg-white text-[10px] font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setAmountUnit("oz")}
                  className={`px-2 py-0.5 rounded-full ${amountUnit === "oz" ? "bg-brand-espresso text-white" : "text-brand-taupe"}`}
                >
                  OUNCES (oz)
                </button>
                <button
                  type="button"
                  onClick={() => setAmountUnit("g")}
                  className={`px-2 py-0.5 rounded-full ${amountUnit === "g" ? "bg-brand-espresso text-white" : "text-brand-taupe"}`}
                >
                  GRAMS (g)
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.5"
                min="0.1"
                max="50"
                value={amount}
                onChange={(e) => setAmount(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="w-32 bg-white border-2 border-brand-espresso rounded-xl px-3 py-2 font-heading font-black text-lg text-brand-espresso shadow-paper-sm"
              />
              <span className="text-xs font-mono text-brand-taupe">
                (Standard chocolate bar is ~1.55 oz / 43g)
              </span>
            </div>
          </div>
        </div>

        {/* Severity Output Card */}
        <div className="lg:col-span-5 bg-white border-2 border-brand-espresso rounded-3xl p-6 shadow-paper flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider mb-1">
              Estimated Ingested Dose
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-heading text-5xl font-black text-brand-espresso">
                {doseMgPerKg.toFixed(1)}
              </span>
              <span className="font-mono text-sm font-bold text-brand-taupe">
                mg theobromine / kg
              </span>
            </div>

            {/* Risk Gauge */}
            <div className="w-full bg-brand-cream/40 h-3 rounded-full border border-brand-espresso overflow-hidden mb-4">
              <div className={`h-full transition-all duration-300 ${severity.meter}`} />
            </div>

            {/* Severity Alert Box */}
            <div className={`p-4 rounded-2xl border-2 mb-4 ${severity.color}`}>
              <div className="font-heading font-black text-base uppercase mb-1">
                {severity.level}
              </div>
              <p className="text-xs leading-relaxed font-sans">
                {severity.action}
              </p>
            </div>

            {/* Emergency Numbers */}
            <div className="bg-[#FAF4EE] border border-brand-espresso/30 rounded-2xl p-4 text-xs space-y-2">
              <div className="font-mono font-bold text-brand-espresso flex items-center gap-1.5 uppercase text-[11px]">
                <PhoneCall className="w-3.5 h-3.5 text-brand-terracotta" />
                Emergency Hotline Resources:
              </div>
              <div className="space-y-1 text-[11px] font-mono text-brand-taupe">
                <div>• ASPCA Animal Poison Control: <span className="font-bold text-brand-espresso">(888) 426-4435</span></div>
                <div>• Pet Poison Helpline: <span className="font-bold text-brand-espresso">(855) 764-7661</span></div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-espresso/20 text-[10px] font-mono text-brand-taupe">
            Clinical dosage formula: Total Theobromine (mg) ÷ Dog Weight (kg).
          </div>
        </div>
      </div>
    </div>
  );
}
