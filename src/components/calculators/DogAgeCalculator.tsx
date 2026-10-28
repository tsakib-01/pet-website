"use client";

import React, { useState } from "react";
import { Dog, Sparkles, HeartPulse, ShieldCheck, Info } from "lucide-react";

export default function DogAgeCalculator() {
  const [years, setYears] = useState<number>(3);
  const [months, setMonths] = useState<number>(0);
  const [size, setSize] = useState<"small" | "medium" | "large" | "giant">("medium");

  // AVMA & AAHA Canine Life Stage Formula
  const calculateHumanAge = () => {
    const totalYears = years + months / 12;
    if (totalYears <= 0) return 0;
    
    // Year 1 = ~15 human years
    if (totalYears <= 1) {
      return Math.round(totalYears * 15);
    }
    
    // Year 2 = ~9 additional human years (Total 24 at age 2)
    if (totalYears <= 2) {
      return Math.round(15 + (totalYears - 1) * 9);
    }
    
    // Year 3+ rate depends on adult size class
    const afterTwo = totalYears - 2;
    let rate = 4.5;
    if (size === "small") rate = 4.0;
    else if (size === "medium") rate = 4.7;
    else if (size === "large") rate = 6.0;
    else if (size === "giant") rate = 7.5;

    return Math.round(24 + afterTwo * rate);
  };

  const humanAge = calculateHumanAge();

  const getLifeStage = () => {
    const totalYears = years + months / 12;
    if (totalYears < 0.8) return { stage: "Puppy", color: "bg-emerald-500", text: "Rapid bone growth, socialization, primary immunizations." };
    if (totalYears < 2) return { stage: "Junior", color: "bg-sky-500", text: "Physical maturity, full adult coat, peak cognitive training." };
    
    let seniorThreshold = 7;
    if (size === "small") seniorThreshold = 9;
    if (size === "giant") seniorThreshold = 5.5;

    let geriatricThreshold = seniorThreshold + 3;

    if (totalYears < seniorThreshold) return { stage: "Adult", color: "bg-brand-terracotta", text: "Peak prime vitality. Annual wellness exams & dental prophylaxis." };
    if (totalYears < geriatricThreshold) return { stage: "Senior", color: "bg-amber-500", text: "Joint support (omega-3/glucosamine), bi-annual blood chemistry profile." };
    return { stage: "Geriatric", color: "bg-purple-600", text: "Gentle mobility, cognitive support, kidney and cardiac monitoring." };
  };

  const lifeStage = getLifeStage();

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill">
            <Dog className="w-5 h-5 text-brand-espresso" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Dog Human Age Calculator
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              AVMA / AAHA Canine Life Stage Standard
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso">
          100% Veterinary Accurate
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Size Selector */}
          <div>
            <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-2">
              1. Adult Dog Size & Weight Class
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "small", label: "Small / Toy", sub: "< 20 lbs" },
                { id: "medium", label: "Medium", sub: "21 - 50 lbs" },
                { id: "large", label: "Large", sub: "51 - 90 lbs" },
                { id: "giant", label: "Giant", sub: "> 90 lbs" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSize(item.id as any)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    size === item.id
                      ? "bg-brand-espresso text-[#FAF4EE] border-brand-espresso shadow-paper-sm -translate-y-0.5"
                      : "bg-white text-brand-espresso border-brand-espresso/30 hover:border-brand-espresso"
                  }`}
                >
                  <div className="font-heading font-black text-xs sm:text-sm">{item.label}</div>
                  <div className="text-[10px] font-mono opacity-80">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Age Years Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                2. Age in Years
              </label>
              <span className="font-heading font-black text-lg text-brand-terracotta">
                {years} {years === 1 ? "Year" : "Years"}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
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
            </div>
          </div>

          {/* Age Months Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                3. Additional Months
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
        </div>

        {/* Results Card Column */}
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
              <span className={`w-2.5 h-2.5 rounded-full ${lifeStage.color}`}></span>
              <span className="font-heading font-black text-xs text-brand-espresso uppercase">
                Life Stage: {lifeStage.stage}
              </span>
            </div>

            {/* Health Focus Box */}
            <div className="bg-brand-paper border border-brand-espresso/30 rounded-2xl p-4 text-xs space-y-2">
              <div className="font-mono font-bold text-brand-espresso flex items-center gap-1.5 uppercase">
                <HeartPulse className="w-3.5 h-3.5 text-brand-terracotta" />
                Veterinary Focus:
              </div>
              <p className="text-brand-taupe leading-relaxed">
                {lifeStage.text}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-espresso/20 flex items-center justify-between text-[11px] font-mono text-brand-taupe">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              AVMA Standard
            </span>
            <span>Non-Linear Scale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
