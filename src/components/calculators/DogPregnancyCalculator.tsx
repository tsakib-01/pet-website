"use client";

import React, { useState } from "react";
import { HeartPulse, Calendar, CheckCircle, Info, Clock, AlertCircle, Dog } from "lucide-react";

export default function DogPregnancyCalculator() {
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 28);
    return d.toISOString().split("T")[0];
  };

  const [matingDate, setMatingDate] = useState<string>(getDefaultDate());

  const addDays = (dateStr: string, days: number) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // 63 days average canine gestation
  const dueDate = addDays(matingDate, 63);
  const dueWindowStart = addDays(matingDate, 58);
  const dueWindowEnd = addDays(matingDate, 68);

  const calculateDaysPregnant = () => {
    const diff = Math.floor((new Date().getTime() - new Date(matingDate).getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(65, diff));
  };

  const daysPregnant = calculateDaysPregnant();

  const milestones = [
    { day: 14, title: "Embryo Implantation", desc: "Blastocysts attach to uterine horns. Normal appetite; gentle exercise only.", date: addDays(matingDate, 14) },
    { day: 28, title: "Veterinary Ultrasound Window", desc: "Veterinarian can visualize embryonic vesicles and confirm viable heartbeats.", date: addDays(matingDate, 28) },
    { day: 45, title: "Skeletal Calcification / X-Ray", desc: "Puppy skulls and spines ossify. Radiographs can accurately count litter size.", date: addDays(matingDate, 45) },
    { day: 54, title: "Whelping Box Introduction", desc: "Introduce dam to nesting area. Switch to high-density puppy kibble.", date: addDays(matingDate, 54) },
    { day: 62, title: "Temperature Drop (<99°F)", desc: "Progesterone drops sharply. When rectal temp drops below 99°F, whelping starts within 12–24h.", date: addDays(matingDate, 62) },
  ];

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
              Dog Pregnancy (Canine Gestation) Calculator
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              Veterinary Obstetrics 63-Day Canine Timeline
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso">
          Standard Gestation
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1.5">
              1. First Mating or Ovulation Date
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
              Estimated Whelping Due Date
            </div>
            <div className="font-heading text-3xl sm:text-4xl font-black text-brand-terracotta mb-2">
              {dueDate}
            </div>
            <div className="text-xs font-mono text-brand-espresso mb-4">
              Normal Delivery Window: <strong>{dueWindowStart}</strong> to <strong>{dueWindowEnd}</strong> (Days 58–68)
            </div>

            {/* Progress bar */}
            <div className="mb-2">
              <div className="flex justify-between text-[11px] font-mono text-brand-taupe mb-1">
                <span>Progress</span>
                <span>Day {daysPregnant} of 63</span>
              </div>
              <div className="w-full bg-brand-cream/40 h-3 rounded-full border border-brand-espresso overflow-hidden">
                <div
                  className="bg-brand-olive h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (daysPregnant / 63) * 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-[#FAF4EE] border border-brand-espresso/20 rounded-2xl p-3 text-xs text-brand-taupe mt-4">
              <strong>Veterinary Tip:</strong> Schedule an abdominal ultrasound between Days 28 and 35 to verify heartbeat viability, and an X-ray on Day 45 to count skull structures.
            </div>
          </div>
        </div>

        {/* Gestation Milestones Column */}
        <div className="lg:col-span-7 space-y-3">
          <h4 className="font-heading font-black text-lg text-brand-espresso uppercase mb-2">
            Canine Gestation Milestone Timeline
          </h4>
          {milestones.map((m) => (
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
