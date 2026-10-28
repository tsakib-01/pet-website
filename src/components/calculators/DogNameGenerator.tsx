"use client";

import React, { useState } from "react";
import { RefreshCw, Dog, Volume2, ShieldCheck } from "lucide-react";
import { DOG_NAMES, DogName } from "@/data/names/dogNames";

export default function DogNameGenerator() {
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedVibe, setSelectedVibe] = useState<string>("all");
  const [selectedSyllables, setSelectedSyllables] = useState<number | "all">("all");
  const [seed, setSeed] = useState<number>(0);

  const filteredNames = DOG_NAMES.filter((item) => {
    if (selectedGender !== "all" && item.gender !== selectedGender && item.gender !== "unisex") return false;
    if (selectedVibe !== "all" && item.vibe !== selectedVibe) return false;
    if (selectedSyllables !== "all" && item.syllables !== selectedSyllables) return false;
    return true;
  });

  // Deterministic shuffle with seed, showing 12 per page
  const displayNames = [...filteredNames]
    .sort((a, b) => {
      const hashA = (a.name.charCodeAt(0) * 17 + seed * 31) % 100;
      const hashB = (b.name.charCodeAt(0) * 17 + seed * 31) % 100;
      return hashA - hashB;
    })
    .slice(0, 12);

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
              Dog Name Generator (Auditory Science)
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              Phonetic Hard-Consonant Response Algorithm • {DOG_NAMES.length}+ Curated Names
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setSeed(seed + 1)}
          className="btn-pill btn-pill-terracotta px-4 py-1.5 text-xs font-black shadow-paper-sm flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Roll 12 New Names
        </button>
      </div>

      {/* Filter Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Gender */}
        <div>
          <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1">
            Gender
          </label>
          <div className="flex rounded-xl border-2 border-brand-espresso p-0.5 bg-white text-xs font-heading font-black">
            {[
              { id: "all", label: "All" },
              { id: "male", label: "Boy" },
              { id: "female", label: "Girl" },
            ].map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedGender(g.id)}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  selectedGender === g.id ? "bg-brand-espresso text-white" : "text-brand-taupe hover:text-brand-espresso"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vibe / Style */}
        <div>
          <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1">
            Vibe / Personality Style
          </label>
          <select
            value={selectedVibe}
            onChange={(e) => setSelectedVibe(e.target.value)}
            className="w-full bg-white border-2 border-brand-espresso rounded-xl px-3 py-1.5 text-xs font-heading font-black text-brand-espresso shadow-paper-sm"
          >
            <option value="all">All Styles ({DOG_NAMES.length})</option>
            <option value="classic">Classic & Friendly</option>
            <option value="tough">Tough, Guard & Strong</option>
            <option value="cute">Cute & Playful</option>
            <option value="royal">Royal & Noble</option>
            <option value="nature">Nature & Outdoors</option>
            <option value="food">Food & Treats</option>
          </select>
        </div>

        {/* Syllables */}
        <div>
          <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1">
            Syllables (Training Speed)
          </label>
          <div className="flex rounded-xl border-2 border-brand-espresso p-0.5 bg-white text-xs font-heading font-black">
            {[
              { id: "all", label: "Any" },
              { id: 1, label: "1 Syllable" },
              { id: 2, label: "2 Syllables" },
            ].map((s) => (
              <button
                key={String(s.id)}
                type="button"
                onClick={() => setSelectedSyllables(s.id as any)}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  selectedSyllables === s.id ? "bg-brand-espresso text-white" : "text-brand-taupe hover:text-brand-espresso"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-mono text-brand-taupe mb-3">
        <span>Displaying {displayNames.length} matched names ({filteredNames.length} total in filter)</span>
        <span className="text-emerald-700 font-bold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Obedience Friendly
        </span>
      </div>

      {/* Generated Names Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayNames.map((item) => (
          <div
            key={item.name}
            className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm hover:shadow-paper hover:-translate-y-0.5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading text-2xl font-black text-brand-espresso">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-brand-cream text-brand-espresso border border-brand-espresso/30">
                  {item.syllables} {item.syllables === 1 ? "Syllable" : "Syllables"}
                </span>
              </div>
              <div className="text-xs font-sans text-brand-terracotta font-bold mb-1.5">
                Meaning: {item.meaning}
              </div>
              <p className="text-[11px] font-sans text-brand-taupe leading-relaxed">
                {item.whyItWorks}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-brand-espresso/10 flex items-center justify-between text-[10px] font-mono text-brand-taupe">
              <span className="capitalize">{item.gender} • {item.vibe}</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> High Recall
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
