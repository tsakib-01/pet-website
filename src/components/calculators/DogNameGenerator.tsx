"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, Bookmark, Dog, Check, Volume2 } from "lucide-react";

interface DogName {
  name: string;
  gender: "male" | "female" | "unisex";
  vibe: string;
  syllables: number;
  meaning: string;
  whyItWorks: string;
}

const DOG_NAMES_DATABASE: DogName[] = [
  { name: "Max", gender: "male", vibe: "classic", syllables: 1, meaning: "Greatest", whyItWorks: "Crisp 'M' and hard 'X' stop sound creates immediate acoustic recall." },
  { name: "Bella", gender: "female", vibe: "cute", syllables: 2, meaning: "Beautiful", whyItWorks: "Strong double 'L' with open vowel ending cuts through park noise." },
  { name: "Cooper", gender: "male", vibe: "classic", syllables: 2, meaning: "Barrel maker", whyItWorks: "Hard 'K' explosive consonant commands quick canine attention." },
  { name: "Luna", gender: "female", vibe: "nature", syllables: 2, meaning: "Moon", whyItWorks: "High pitch vowel inflection ensures strong responsiveness." },
  { name: "Milo", gender: "male", vibe: "cute", syllables: 2, meaning: "Soldier or merciful", whyItWorks: "Bouncy two-syllable cadence ideal for recall whistles." },
  { name: "Daisy", gender: "female", vibe: "nature", syllables: 2, meaning: "Day's eye", whyItWorks: "Sharp 'D' start with bright '-y' ending sounds cheerful." },
  { name: "Rocky", gender: "male", vibe: "tough", syllables: 2, meaning: "Rest / Stone", whyItWorks: "Hard 'K' mid-consonant allows crisp vocal snap." },
  { name: "Thor", gender: "male", vibe: "tough", syllables: 1, meaning: "God of Thunder", whyItWorks: "Short powerful burst; impossible for dogs to confuse with commands." },
  { name: "Waffles", gender: "unisex", vibe: "food", syllables: 2, meaning: "Sweet breakfast", whyItWorks: "Sibilant 'F' sounds capture playful attention." },
  { name: "Zeus", gender: "male", vibe: "tough", syllables: 1, meaning: "King of Gods", whyItWorks: "Z-buzzing phonetics trigger distinct canine ear prick." },
  { name: "Penny", gender: "female", vibe: "classic", syllables: 2, meaning: "Weaver / Coin", whyItWorks: "Plosive 'P' creates immediate acoustic spike." },
  { name: "Duke", gender: "male", vibe: "royal", syllables: 1, meaning: "Noble leader", whyItWorks: "Hard 'D' and hard 'K' bookends—optimal training acoustic structure." },
  { name: "Ruby", gender: "female", vibe: "royal", syllables: 2, meaning: "Precious red gemstone", whyItWorks: "Bright melodic rhythm easy to call across distances." },
  { name: "Bear", gender: "male", vibe: "nature", syllables: 1, meaning: "Strong animal", whyItWorks: "Single deep plosive syllable; high obedience training speed." },
  { name: "Kona", gender: "unisex", vibe: "nature", syllables: 2, meaning: "Hawaiian leeward lady", whyItWorks: "Hard 'K' start with open 'A' resonance." },
  { name: "Hazel", gender: "female", vibe: "nature", syllables: 2, meaning: "Hazelnut tree", whyItWorks: "Soft 'H' into sharp 'Z' provides recognizable distinction." },
  { name: "Tucker", gender: "male", vibe: "classic", syllables: 2, meaning: "Fabric fuller", whyItWorks: "Hard 'T' and 'K' sounds give two immediate cues." },
  { name: "Stella", gender: "female", vibe: "royal", syllables: 2, meaning: "Star", whyItWorks: "St- blend followed by open vowel makes training seamless." },
  { name: "Mocha", gender: "unisex", vibe: "food", syllables: 2, meaning: "Coffee and chocolate", whyItWorks: "Gentle 'M' with distinct 'Ch' stop." },
  { name: "Bruno", gender: "male", vibe: "tough", syllables: 2, meaning: "Brown / Shield", whyItWorks: "Grounded plosive 'B' and rolling 'R' sound." },
  { name: "Peanut", gender: "unisex", vibe: "food", syllables: 2, meaning: "Little legume", whyItWorks: "Double plosive 'P' and 'T' consonants." },
  { name: "Roxy", gender: "female", vibe: "tough", syllables: 2, meaning: "Dawn / Bright", whyItWorks: "Sharp 'X' sound prevents confusion with general words." },
  { name: "Ollie", gender: "male", vibe: "cute", syllables: 2, meaning: "Olive tree", whyItWorks: "Lively vowel rising tone." },
  { name: "Winston", gender: "male", vibe: "royal", syllables: 2, meaning: "Joyful stone", whyItWorks: "Dignified cadence, easy two-syllable delivery." },
];

export default function DogNameGenerator() {
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedVibe, setSelectedVibe] = useState<string>("all");
  const [selectedSyllables, setSelectedSyllables] = useState<number | "all">("all");
  const [seed, setSeed] = useState<number>(0);

  const filteredNames = DOG_NAMES_DATABASE.filter((item) => {
    if (selectedGender !== "all" && item.gender !== selectedGender && item.gender !== "unisex") return false;
    if (selectedVibe !== "all" && item.vibe !== selectedVibe) return false;
    if (selectedSyllables !== "all" && item.syllables !== selectedSyllables) return false;
    return true;
  });

  // Shuffle display based on seed
  const displayNames = [...filteredNames].sort(() => 0.5 - ((seed * 7) % 10) / 10).slice(0, 8);

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill">
            <Sparkles className="w-5 h-5 text-brand-espresso" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Dog Name Generator (Auditory Science)
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              Phonetic Hard-Consonant Response Algorithm
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
            Vibe / Style
          </label>
          <select
            value={selectedVibe}
            onChange={(e) => setSelectedVibe(e.target.value)}
            className="w-full bg-white border-2 border-brand-espresso rounded-xl px-3 py-1.5 text-xs font-heading font-black text-brand-espresso shadow-paper-sm"
          >
            <option value="all">All Styles</option>
            <option value="classic">Classic & Friendly</option>
            <option value="tough">Tough & Strong</option>
            <option value="cute">Cute & Playful</option>
            <option value="royal">Royal & Elegant</option>
            <option value="nature">Nature & Wild</option>
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

      {/* Generated Names Grid */}
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
                  {item.syllables} {item.syllables === 1 ? "Syllable" : "Syllables"}
                </span>
              </div>
              <div className="text-xs font-sans text-brand-terracotta font-bold mb-2">
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
