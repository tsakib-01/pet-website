"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, PawPrint, Heart, Star } from "lucide-react";

interface UniversalPetName {
  name: string;
  species: "all" | "dog" | "cat" | "small";
  theme: "mythology" | "food" | "nature" | "classic" | "royal";
  vibe: string;
  meaning: string;
}

const UNIVERSAL_PET_NAMES: UniversalPetName[] = [
  { name: "Apollo", species: "all", theme: "mythology", vibe: "Majestic", meaning: "Greek god of light, music, and truth." },
  { name: "Boba", species: "all", theme: "food", vibe: "Cute & Sweet", meaning: "Tapioca pearl tea; round and delightful." },
  { name: "Willow", species: "all", theme: "nature", vibe: "Graceful", meaning: "Slender tree known for flexibility and elegance." },
  { name: "Jasper", species: "all", theme: "classic", vibe: "Vintage", meaning: "Treasurer / precious spotted chalcedony stone." },
  { name: "Athena", species: "all", theme: "mythology", vibe: "Wise", meaning: "Goddess of wisdom and honorable courage." },
  { name: "Chai", species: "all", theme: "food", vibe: "Warm & Cozy", meaning: "Spiced aromatic tea; comforting companion." },
  { name: "Finn", species: "all", theme: "classic", vibe: "Friendly", meaning: "Fair / bright; energetic and loyal." },
  { name: "Freya", species: "all", theme: "mythology", vibe: "Regal", meaning: "Norse goddess of love, beauty, and companion cats." },
  { name: "Biscuit", species: "all", theme: "food", vibe: "Playful", meaning: "Golden baked treat; gentle and lovable." },
  { name: "Otis", species: "all", theme: "classic", vibe: "Charm", meaning: "Wealthy; cheerful companion with vintage soul." },
  { name: "Nova", species: "all", theme: "nature", vibe: "Cosmic", meaning: "Astronomical bright star explosion." },
  { name: "Hazel", species: "all", theme: "nature", vibe: "Earthy", meaning: "Nut-bearing tree symbolizing wisdom." },
  { name: "Zeus", species: "dog", theme: "mythology", vibe: "Powerful", meaning: "Ruler of the sky and thunder." },
  { name: "Cleo", species: "cat", theme: "royal", vibe: "Diva", meaning: "Queen Cleopatra; proud and discerning." },
  { name: "Pippin", species: "small", theme: "classic", vibe: "Sprightly", meaning: "Adventurous hobbit or crisp apple." },
  { name: "Nori", species: "all", theme: "food", vibe: "Sleek", meaning: "Seaweed; perfect for sleek dark or shiny coats." },
  { name: "Clover", species: "all", theme: "nature", vibe: "Lucky", meaning: "Four-leaf shamrock bringing good fortune." },
  { name: "Winston", species: "all", theme: "royal", vibe: "Dignified", meaning: "From a friendly town; classic British charm." },
  { name: "Peaches", species: "all", theme: "food", vibe: "Sweet", meaning: "Soft, golden fruit with warm sunny energy." },
  { name: "Loki", species: "all", theme: "mythology", vibe: "Mischief", meaning: "Norse trickster god; playful and clever." },
];

export default function PetNameGenerator() {
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [selectedSpecies, setSelectedSpecies] = useState<string>("all");
  const [seed, setSeed] = useState<number>(0);

  const filtered = UNIVERSAL_PET_NAMES.filter((item) => {
    if (selectedTheme !== "all" && item.theme !== selectedTheme) return false;
    if (selectedSpecies !== "all" && item.species !== "all" && item.species !== selectedSpecies) return false;
    return true;
  });

  const display = [...filtered].sort(() => 0.5 - ((seed * 3) % 10) / 10).slice(0, 8);

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
              Thematic Multi-Species Nomenclature Engine
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
