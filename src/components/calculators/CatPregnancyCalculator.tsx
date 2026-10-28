"use client";

import React, { useState } from "react";
import { HeartPulse, Calendar, CheckCircle, Info, Cat } from "lucide-react";

export default function CatPregnancyCalculator() {
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 25);
    return d.toISOString().split("T")[0];
  };

  const [matingDate, setMatingDate] = useState<string>(getDefaultDate());

  const addDays = (dateStr: string, days: number) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // 64 days average feline gestation
  const dueDate = addDays(matingDate, 64);
  const dueWindowStart = addDays(matingDate, 61);
  const dueWindowEnd = addDays(matingDate, 70);

  const calculateDaysPregnant = () => {
    const diff = Math.floor((new Date().getTime() - new Date(matingDate).getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(68, diff));
  };

  const daysPregnant = calculateDaysPregnant();

  const felineMilestones = [
    { day: 21, title: "Nipple Pinking (Classic Sign)", desc: "The queen's nipples turn bright rosy pink ('pinking-up') and hair thins around them.", date: addDays(matingDate, 21) },
    { day: 28, title: "Veterinary Palpation & Ultrasound", desc: "A veterinarian can gently palpate grape-sized gestational sacs or confirm heartbeats on ultrasound.", date: addDays(matingDate, 28) },
    { day: 45, title: "Skeletal Mineralization / X-Ray", desc: "Kitten bone structures become visible on radiographs, providing exact count of kittens.", date: addDays(matingDate, 45) },
    { day: 55, title: "Nesting Box Preparation", desc: "Place quiet nesting box in warm, low-traffic area. Provide clean towels and kitten-growth food.", date: addDays(matingDate, 55) },
    { day: 63, title: "Active Labor Countdown", desc: "Queen purrs loudly, grooms excessively, and seeks solitude. Delivery begins within 24–48 hours.", date: addDays(matingDate, 63) },
  ];

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
              Cat Pregnancy (Feline Gestation) Calculator
            </h3>
            <p className="text-xs sm:text-sm text-brand-taupe font-sans font-medium mt-1 leading-normal">
              Veterinary Feline Reproduction Timeline
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[10px] sm:text-xs font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex-shrink-0">
          64-Day Average
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1.5">
              1. First Mating or Observed Heat Date
            </label>
            <input
              type="date"
              value={matingDate}
              onChange={(e) => setMatingDate(e.target.value)}
              className="w-full bg-white border-2 border-brand-espresso rounded-2xl px-4 py-2.5 font-heading font-black text-brand-espresso shadow-paper-sm"
            />
          </div>

          {/* Results Summary Box */}
          <div className="bg-white border-2 border-brand-espresso rounded-3xl p-6 shadow-paper">
            <div className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider mb-1">
              Estimated Queening Due Date
            </div>
            <div className="font-heading text-3xl sm:text-4xl font-black text-brand-terracotta mb-2">
              {dueDate}
            </div>
            <div className="text-xs font-mono text-brand-espresso mb-4">
              Normal Feline Window: <strong>{dueWindowStart}</strong> to <strong>{dueWindowEnd}</strong> (Days 61–70)
            </div>

            {/* Progress bar */}
            <div className="mb-2">
              <div className="flex justify-between text-[11px] font-mono text-brand-taupe mb-1">
                <span>Gestation Progress</span>
                <span>Day {daysPregnant} of 64</span>
              </div>
              <div className="w-full bg-brand-cream/40 h-3 rounded-full border border-brand-espresso overflow-hidden">
                <div
                  className="bg-brand-olive h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (daysPregnant / 64) * 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-[#FAF4EE] border border-brand-espresso/20 rounded-2xl p-3 text-xs text-brand-taupe mt-4">
              <strong>Nutrition Tip:</strong> Switch the queen to nutrient-dense kitten food during her final 3 weeks of pregnancy to support milk production.
            </div>
          </div>
        </div>

        {/* Milestones Column */}
        <div className="lg:col-span-7 space-y-3">
          <h4 className="font-heading font-black text-lg text-brand-espresso uppercase mb-2">
            Feline Gestation Milestones
          </h4>
          {felineMilestones.map((m) => (
            <div
              key={m.day}
              className={`p-4 rounded-2xl border-2 transition-all ${
                daysPregnant >= m.day
                  ? "bg-brand-olive/15 border-brand-espresso shadow-paper-sm"
                  : "bg-white border-brand-espresso/30 opacity-90"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                <span className="font-heading font-black text-sm text-brand-espresso">
                  Day {m.day}: {m.title}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-espresso text-white">
                  {m.date}
                </span>
              </div>
              <p className="text-xs font-sans text-brand-taupe leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
