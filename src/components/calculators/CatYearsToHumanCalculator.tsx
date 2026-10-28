"use client";

import React, { useState } from "react";
import { Cat, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";

export default function CatYearsToHumanCalculator() {
  const [selectedAge, setSelectedAge] = useState<number>(5);

  const calculateHumanEquivalent = (catAge: number) => {
    if (catAge <= 0) return 0;
    if (catAge === 1) return 15;
    if (catAge === 2) return 24;
    return 24 + (catAge - 2) * 4;
  };

  const currentHuman = calculateHumanEquivalent(selectedAge);

  const ageMilestones = [
    { cat: 1, human: 15, stage: "Teenager", desc: "First adult teeth set, full sexual maturity, primary vaccination complete." },
    { cat: 2, human: 24, stage: "Young Adult", desc: "Full physical bone density, adult weight stabilizes, behavioral settling." },
    { cat: 4, human: 32, stage: "Prime", desc: "Peak muscular strength, optimal immune resistance. Annual dental checks." },
    { cat: 7, human: 44, stage: "Mature", desc: "Subtle metabolic slowdown. Early screening for kidney values (SDMA/Creatinine)." },
    { cat: 10, human: 56, stage: "Senior", desc: "Bi-annual vet exams, blood pressure monitoring, arthritis mobility support." },
    { cat: 15, human: 76, stage: "Geriatric", desc: "Kidney, thyroid (T4), and cardiac monitoring. Warm, low-entry litter access." },
    { cat: 20, human: 96, stage: "Super Senior", desc: "Exceptional longevity. Comfort care, heating pads, elevated water fountains." },
  ];

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill">
            <Cat className="w-5 h-5 text-brand-espresso" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Cat Years to Human Years Chart & Calculator
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              Physiological Biological Milestone Comparison
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso">
          AAFP Standard
        </span>
      </div>

      {/* Interactive Slider Banner */}
      <div className="bg-white border-2 border-brand-espresso rounded-3xl p-6 shadow-paper mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-mono font-bold text-brand-taupe uppercase">Select Cat Chronological Age</div>
            <div className="font-heading text-3xl font-black text-brand-espresso">
              {selectedAge} {selectedAge === 1 ? "Cat Year" : "Cat Years"}
            </div>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-xs font-mono font-bold text-brand-taupe uppercase">Equivalent Human Age</div>
            <div className="font-heading text-4xl font-black text-brand-terracotta">
              = {currentHuman} Human Years
            </div>
          </div>
        </div>

        <input
          type="range"
          min="1"
          max="22"
          value={selectedAge}
          onChange={(e) => setSelectedAge(parseInt(e.target.value))}
          className="w-full accent-brand-terracotta cursor-pointer h-3 bg-brand-cream rounded-lg mb-2"
        />
        <div className="flex justify-between text-[11px] font-mono text-brand-taupe">
          <span>1 yr (15)</span>
          <span>5 yr (36)</span>
          <span>10 yr (56)</span>
          <span>15 yr (76)</span>
          <span>20 yr (96)</span>
        </div>
      </div>

      {/* Comparison Milestones Table */}
      <div className="space-y-3">
        <h4 className="font-heading font-black text-lg text-brand-espresso uppercase flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-brand-terracotta" />
          Feline Biological Lifespan Stages
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ageMilestones.map((item) => (
            <div
              key={item.cat}
              className={`p-4 rounded-2xl border-2 transition-all ${
                selectedAge === item.cat
                  ? "bg-brand-espresso text-white border-brand-espresso shadow-paper-sm"
                  : "bg-white text-brand-espresso border-brand-espresso/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-heading font-black text-base">
                  {item.cat} Cat {item.cat === 1 ? "Year" : "Years"} = {item.human} Human
                </span>
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                  selectedAge === item.cat ? "bg-brand-olive text-brand-espresso" : "bg-brand-cream text-brand-espresso"
                }`}>
                  {item.stage}
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${selectedAge === item.cat ? "text-white/80" : "text-brand-taupe"}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
