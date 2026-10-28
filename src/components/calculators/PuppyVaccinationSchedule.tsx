"use client";

import React, { useState } from "react";
import { Calendar, ShieldCheck, CheckCircle2, AlertCircle, Info, Clock } from "lucide-react";

export default function PuppyVaccinationSchedule() {
  // Default to a puppy born 8 weeks ago
  const getDefaultBirthdate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 56);
    return d.toISOString().split("T")[0];
  };

  const [birthdate, setBirthdate] = useState<string>(getDefaultBirthdate());
  const [includeLepto, setIncludeLepto] = useState<boolean>(true);
  const [includeBordetella, setIncludeBordetella] = useState<boolean>(true);
  const [includeLyme, setIncludeLyme] = useState<boolean>(false);

  const addWeeks = (dateStr: string, weeks: number) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + weeks * 7);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getImmunityDate = (dateStr: string) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 16 * 7 + 14); // 16 weeks + 2 weeks
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const scheduleRounds = [
    {
      round: "Round 1 (6 – 8 Weeks)",
      date: addWeeks(birthdate, 7),
      core: ["Canine Distemper", "Adenovirus-2 (Hepatitis)", "Parvovirus", "Parainfluenza (DHPP/DA2P #1)"],
      optional: [],
      notes: "First immune stimulus. Maternal antibodies gradually decline.",
    },
    {
      round: "Round 2 (10 – 12 Weeks)",
      date: addWeeks(birthdate, 11),
      core: ["DHPP / DA2P Booster #2"],
      optional: [
        ...(includeBordetella ? ["Bordetella (Kennel Cough)"] : []),
        ...(includeLepto ? ["Leptospirosis 4-Way #1"] : []),
      ],
      notes: "Critical window for social development in controlled safe spaces.",
    },
    {
      round: "Round 3 (14 – 16 Weeks)",
      date: addWeeks(birthdate, 15),
      core: ["DHPP / DA2P Final Core Booster #3", "Rabies (1-Year Mandatory)"],
      optional: [
        ...(includeLepto ? ["Leptospirosis 4-Way #2 (Booster)"] : []),
        ...(includeLyme ? ["Canine Lyme Disease Vaccine"] : []),
      ],
      notes: "Final core immunization that closes the maternal antibody gap.",
    },
    {
      round: "Adult Booster (12 – 16 Months)",
      date: addWeeks(birthdate, 56),
      core: ["DHPP Adult Booster", "Rabies (1-Yr or 3-Yr Booster depending on state)"],
      optional: [
        ...(includeBordetella ? ["Bordetella Annual Booster"] : []),
        ...(includeLepto ? ["Leptospirosis Annual Booster"] : []),
      ],
      notes: "Secures multi-year immunological memory and legal rabies licensing.",
    },
  ];

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill">
            <Calendar className="w-5 h-5 text-brand-espresso" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Puppy Vaccination Schedule Planner
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              American Animal Hospital Association (AAHA) 2024 Protocol
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso">
          AAHA Verified
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1">
              Puppy Date of Birth (or Adoption Estimate)
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full bg-white border-2 border-brand-espresso rounded-2xl px-4 py-2.5 font-heading font-black text-brand-espresso shadow-paper-sm"
            />
          </div>

          {/* Lifestyle / Risk Factor Toggles */}
          <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 space-y-3">
            <div className="text-xs font-mono font-bold text-brand-espresso uppercase">
              Lifestyle & Environmental Risk Factors
            </div>

            <label className="flex items-center gap-2.5 text-xs text-brand-espresso cursor-pointer">
              <input
                type="checkbox"
                checked={includeBordetella}
                onChange={(e) => setIncludeBordetella(e.target.checked)}
                className="w-4 h-4 accent-brand-terracotta rounded"
              />
              <span><strong>Bordetella</strong> (Grooming, puppy classes, dog parks)</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-brand-espresso cursor-pointer">
              <input
                type="checkbox"
                checked={includeLepto}
                onChange={(e) => setIncludeLepto(e.target.checked)}
                className="w-4 h-4 accent-brand-terracotta rounded"
              />
              <span><strong>Leptospirosis</strong> (Puddles, wildlife, wooded trails)</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-brand-espresso cursor-pointer">
              <input
                type="checkbox"
                checked={includeLyme}
                onChange={(e) => setIncludeLyme(e.target.checked)}
                className="w-4 h-4 accent-brand-terracotta rounded"
              />
              <span><strong>Lyme Disease</strong> (Tick-endemic regions)</span>
            </label>
          </div>

          {/* Public Ground Safety Milestone */}
          <div className="bg-brand-olive/20 border-2 border-brand-espresso rounded-2xl p-4 text-xs space-y-1.5">
            <div className="font-heading font-black text-sm text-brand-espresso flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Full Public Safety Immunity Date:
            </div>
            <div className="font-mono font-bold text-brand-terracotta text-sm">
              {getImmunityDate(birthdate)}
            </div>
            <p className="text-brand-taupe text-[11px] leading-relaxed">
              Safe for public sidewalks, dog parks, and beach visits exactly 14 days after the final 16-week booster.
            </p>
          </div>
        </div>

        {/* Schedule Timeline Column */}
        <div className="lg:col-span-7 space-y-4">
          {scheduleRounds.map((rnd, idx) => (
            <div
              key={rnd.round}
              className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-brand-espresso/10">
                <span className="font-heading font-black text-sm text-brand-espresso">
                  {rnd.round}
                </span>
                <span className="font-mono font-bold text-xs bg-brand-terracotta text-white px-2.5 py-0.5 rounded-full">
                  Target: {rnd.date}
                </span>
              </div>

              {/* Core Vaccines */}
              <div className="mb-2">
                <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase mb-1">
                  Core Vaccines (Mandatory)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {rnd.core.map((c) => (
                    <span key={c} className="bg-brand-olive/40 border border-brand-espresso/30 px-2.5 py-0.5 rounded-full text-xs font-bold text-brand-espresso">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Optional Lifestyle Vaccines */}
              {rnd.optional.length > 0 && (
                <div className="mb-2">
                  <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase mb-1">
                    Lifestyle / Non-Core
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {rnd.optional.map((o) => (
                      <span key={o} className="bg-brand-cream border border-brand-espresso/30 px-2.5 py-0.5 rounded-full text-xs text-brand-espresso">
                        + {o}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-[11px] font-sans text-brand-taupe mt-1.5">
                {rnd.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
