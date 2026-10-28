"use client";

import React, { useState } from "react";
import { RefreshCw, PawPrint, Star } from "lucide-react";
import { UNIVERSAL_PET_NAMES, UniversalPetName } from "@/data/names/petNames";

export default function PetNameGenerator() {
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [selectedSpecies, setSelectedSpecies] = useState<string>("all");
  const [seed, setSeed] = useState<number>(0);

  const filtered = UNIVERSAL_PET_NAMES.filter((item) => {
    if (selectedTheme !== "all" && item.theme !== selectedTheme) return false;
    if (selectedSpecies !== "all" && item.species !== "all" && item.species !== selectedSpecies) return false;
    return true;
  });

  const display = [...filtered]
    .sort((a, b) => {
      const hashA = (a.name.charCodeAt(0) * 23 + seed * 41) % 100;
      const hashB = (b.name.charCodeAt(0) * 23 + seed * 41) % 100;
      return hashA - hashB;
    })
    .slice(0, 12);

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill">
            <PawPrint className="w-5 h-5 text-brand-espresso" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Pet Name Generator (All Animals)
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              Thematic Multi-Species Nomenclature Engine • {UNIVERSAL_PET_NAMES.length}+ Curated Names
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

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1">
            Pet Species / Type
          </label>
          <div className="flex rounded-xl border-2 border-brand-espresso p-0.5 bg-white text-xs font-heading font-black">
            {[
              { id: "all", label: "All Pets" },
              { id: "dog", label: "Dog" },
              { id: "cat", label: "Cat" },
              { id: "small", label: "Rabbit / Pocket" },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSpecies(s.id)}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  selectedSpecies === s.id ? "bg-brand-espresso text-white" : "text-brand-taupe hover:text-brand-espresso"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1">
            Theme / Origin
          </label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full bg-white border-2 border-brand-espresso rounded-xl px-3 py-1.5 text-xs font-heading font-black text-brand-espresso shadow-paper-sm"
          >
            <option value="all">All Themes</option>
            <option value="mythology">Mythology & Gods</option>
            <option value="nature">Nature, Celestial & Trees</option>
            <option value="food">Food, Drinks & Sweets</option>
            <option value="royal">Royal & Nobility</option>
            <option value="classic">Classic & Vintage</option>
          </select>
        </div>
      </div>

      {/* Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {display.map((item) => (
          <div
            key={item.name}
            className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm hover:shadow-paper transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-heading text-2xl font-black text-brand-espresso">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-brand-olive text-brand-espresso">
                  {item.theme}
                </span>
              </div>
              <div className="text-xs font-sans text-brand-terracotta font-bold mb-1.5">
                Vibe: {item.vibe}
              </div>
              <p className="text-[11px] font-sans text-brand-taupe leading-relaxed">
                {item.meaning}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-brand-espresso/10 text-[10px] font-mono text-brand-taupe flex items-center justify-between">
              <span>Universal Pet Name</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-emerald-600" /> Top Rated
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
