"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, Cat, Heart, Volume2 } from "lucide-react";

interface CatName {
  name: string;
  gender: "male" | "female" | "unisex";
  coat: string;
  vibe: string;
  meaning: string;
  felineSuitability: string;
}

const CAT_NAMES_DATABASE: CatName[] = [
  { name: "Luna", gender: "female", coat: "black", vibe: "mystical", meaning: "Moon goddess", felineSuitability: "Gentle high-vowel cadence cats distinguish effortlessly." },
  { name: "Oliver", gender: "male", coat: "tabby", vibe: "classic", meaning: "Olive tree / Peace", felineSuitability: "Soft consonants with rising inflection." },
  { name: "Milo", gender: "male", coat: "ginger", vibe: "cute", meaning: "Beloved soldier", felineSuitability: "Short acoustic burst perfect for feline ear articulation." },
  { name: "Cleo", gender: "female", coat: "calico", vibe: "royal", meaning: "Cleopatra / Pride", felineSuitability: "Strong 'Cl' blend with bright 'O' finish." },
  { name: "Simba", gender: "male", coat: "ginger", vibe: "royal", meaning: "Lion", felineSuitability: "Soft sibilant 'S' start mimics maternal feline purr cues." },
  { name: "Shadow", gender: "unisex", coat: "black", vibe: "mystical", meaning: "Shade / Silhouette", felineSuitability: "Sh- whisper acoustic tone." },
  { name: "Bella", gender: "female", coat: "white", vibe: "sweet", meaning: "Beautiful", felineSuitability: "Melodic double-L vowel harmony." },
  { name: "Felix", gender: "male", coat: "tuxedo", vibe: "classic", meaning: "Lucky / Happy", felineSuitability: "Crisp 'F' and sharp 'X' stop phonetics." },
  { name: "Oreo", gender: "unisex", coat: "tuxedo", vibe: "food", meaning: "Black & white cookie", felineSuitability: "Vowel-heavy melodic flow." },
  { name: "Jasper", gender: "male", coat: "tabby", vibe: "mystical", meaning: "Spotted gemstone", felineSuitability: "Rich rolling sound for domestic shorthairs." },
  { name: "Nala", gender: "female", coat: "ginger", vibe: "royal", meaning: "Beloved gift", felineSuitability: "Open vocalization easy to murmur softly." },
  { name: "Smokey", gender: "unisex", coat: "grey", vibe: "classic", meaning: "Mist / Ash", felineSuitability: "Sibilant 'S' and long high '-ey' sound." },
  { name: "Chloe", gender: "female", coat: "calico", vibe: "sweet", meaning: "Blooming sprout", felineSuitability: "Bright friendly tone." },
  { name: "Ziggy", gender: "unisex", coat: "tabby", vibe: "quirky", meaning: "Victorious peace", felineSuitability: "Distinct 'Z' buzzing vibration catches feline ears." },
  { name: "Mochi", gender: "unisex", coat: "white", vibe: "food", meaning: "Sweet rice cake", felineSuitability: "Soft 'M' into cheerful 'Ch' inflection." },
  { name: "Mittens", gender: "unisex", coat: "tuxedo", vibe: "cute", meaning: "White paws", felineSuitability: "Classic domestic moniker." },
  { name: "Pepper", gender: "unisex", coat: "grey", vibe: "food", meaning: "Spicy & energetic", felineSuitability: "Snappy double 'P' plosive." },
  { name: "Penny", gender: "female", coat: "ginger", vibe: "sweet", meaning: "Copper coin", felineSuitability: "High bright register cats love." },
  { name: "Salem", gender: "male", coat: "black", vibe: "mystical", meaning: "Peace / Arcane", felineSuitability: "Smooth sibilant 'S' with grounding 'M'." },
  { name: "Willow", gender: "female", coat: "grey", vibe: "nature", meaning: "Graceful tree", felineSuitability: "Gentle breathy syllables." },
];

export default function CatNameGenerator() {
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedCoat, setSelectedCoat] = useState<string>("all");
  const [seed, setSeed] = useState<number>(0);

  const filteredNames = CAT_NAMES_DATABASE.filter((item) => {
    if (selectedGender !== "all" && item.gender !== selectedGender && item.gender !== "unisex") return false;
    if (selectedCoat !== "all" && item.coat !== selectedCoat) return false;
    return true;
  });

  const displayNames = [...filteredNames].sort(() => 0.5 - ((seed * 5) % 10) / 10).slice(0, 8);

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
              Cat Name Generator
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              Feline High-Frequency Phonetic Matcher
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setSeed(seed + 1)}
          className="btn-pill btn-pill-terracotta px-4 py-1.5 text-xs font-black shadow-paper-sm flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Roll New Names
        </button>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1">
            Gender
          </label>
          <div className="flex rounded-xl border-2 border-brand-espresso p-0.5 bg-white text-xs font-heading font-black">
            {[
              { id: "all", label: "All" },
              { id: "male", label: "Boy Cat" },
              { id: "female", label: "Girl Cat" },
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

        <div>
          <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-1">
            Coat Pattern & Color
          </label>
          <select
            value={selectedCoat}
            onChange={(e) => setSelectedCoat(e.target.value)}
            className="w-full bg-white border-2 border-brand-espresso rounded-xl px-3 py-1.5 text-xs font-heading font-black text-brand-espresso shadow-paper-sm"
          >
            <option value="all">All Coat Types</option>
            <option value="black">Black / Void</option>
            <option value="tuxedo">Tuxedo / Bicolor</option>
            <option value="ginger">Orange / Ginger</option>
            <option value="tabby">Tabby / Striped</option>
            <option value="calico">Calico / Tortie</option>
            <option value="white">White / Cream</option>
            <option value="grey">Grey / Blue</option>
          </select>
        </div>
      </div>

      {/* Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayNames.map((item) => (
          <div
            key={item.name}
            className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm hover:shadow-paper transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading text-2xl font-black text-brand-espresso">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-brand-cream text-brand-espresso border border-brand-espresso/30">
                  {item.coat}
                </span>
              </div>
              <div className="text-xs font-sans text-brand-terracotta font-bold mb-2">
                Meaning: {item.meaning}
              </div>
              <p className="text-[11px] font-sans text-brand-taupe leading-relaxed">
                {item.felineSuitability}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-brand-espresso/10 flex items-center justify-between text-[10px] font-mono text-brand-taupe">
              <span className="capitalize">{item.gender} • {item.vibe}</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> Purr Pitch
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
