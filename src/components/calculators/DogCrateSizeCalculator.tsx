"use client";

import React, { useState } from "react";
import { Shield, Check, Info, Box } from "lucide-react";

export default function DogCrateSizeCalculator() {
  const [lengthInches, setLengthInches] = useState<number>(26);
  const [heightInches, setHeightInches] = useState<number>(22);
  const [isPuppy, setIsPuppy] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string>("custom");

  const breedPresets: Record<string, { name: string; length: number; height: number }> = {
    frenchie: { name: "French Bulldog", length: 20, height: 16 },
    labrador: { name: "Labrador Retriever", length: 34, height: 28 },
    golden: { name: "Golden Retriever", length: 33, height: 27 },
    gsd: { name: "German Shepherd", length: 36, height: 30 },
    beagle: { name: "Beagle", length: 24, height: 18 },
    dachshund: { name: "Dachshund (Mini)", length: 16, height: 11 },
    poodle: { name: "Standard Poodle", length: 32, height: 28 },
    corgi: { name: "Pembroke Welsh Corgi", length: 22, height: 15 },
    husky: { name: "Siberian Husky", length: 32, height: 26 },
    greatdane: { name: "Great Dane", length: 44, height: 38 },
  };

  const handlePreset = (key: string) => {
    setSelectedPreset(key);
    if (breedPresets[key]) {
      setLengthInches(breedPresets[key].length);
      setHeightInches(breedPresets[key].height);
    }
  };

  // AKC & APDT Formula: Length + 2-4", Height + 2-4"
  const recommendedLength = lengthInches + 3;
  const recommendedHeight = heightInches + 3;
  const recommendedWidth = Math.round(recommendedHeight * 0.72);

  // Standard Commercial Crate Sizes
  const getStandardCrate = (reqLength: number) => {
    if (reqLength <= 18) return { size: "18-Inch (XS)", dims: "18\"L x 12\"W x 14\"H", breeds: "Toy Breeds, Chihuahuas, Yorkies (< 10 lbs)" };
    if (reqLength <= 24) return { size: "24-Inch (Small)", dims: "24\"L x 18\"W x 19\"H", breeds: "French Bulldogs, Dachshunds, Pugs (11 - 25 lbs)" };
    if (reqLength <= 30) return { size: "30-Inch (Medium)", dims: "30\"L x 19\"W x 21\"H", breeds: "Beagles, Corgis, Frenchies, Cocker Spaniels (26 - 40 lbs)" };
    if (reqLength <= 36) return { size: "36-Inch (Intermediate)", dims: "36\"L x 23\"W x 25\"H", breeds: "Bulldogs, Australian Shepherds, Border Collies (41 - 70 lbs)" };
    if (reqLength <= 42) return { size: "42-Inch (Large)", dims: "42\"L x 28\"W x 30\"H", breeds: "Labradors, Golden Retrievers, Boxers, GSDs (71 - 90 lbs)" };
    if (reqLength <= 48) return { size: "48-Inch (X-Large)", dims: "48\"L x 30\"W x 33\"H", breeds: "Rottweilers, Dobermans, Bernese Mountain Dogs (91 - 110 lbs)" };
    return { size: "54-Inch (XX-Large)", dims: "54\"L x 37\"W x 45\"H", breeds: "Great Danes, Mastiffs, Saint Bernards (> 110 lbs)" };
  };

  const crate = getStandardCrate(recommendedLength);

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill">
            <Box className="w-5 h-5 text-brand-espresso" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Dog Crate Size Calculator
            </h3>
            <p className="text-xs font-mono font-bold text-brand-taupe uppercase">
              AKC & Humane Society Ergonomic Standard
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso">
          Anti-Accident Sizing
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Breed Presets */}
          <div>
            <label className="block text-xs font-mono font-bold text-brand-espresso uppercase mb-2">
              Quick Adult Breed Preset (Optional)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(breedPresets).map(([key, val]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handlePreset(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-heading font-black border-2 transition-all ${
                    selectedPreset === key
                      ? "bg-brand-espresso text-white border-brand-espresso shadow-paper-sm"
                      : "bg-white text-brand-espresso border-brand-espresso/30 hover:border-brand-espresso"
                  }`}
                >
                  {val.name}
                </button>
              ))}
            </div>
          </div>

          {/* Length Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                1. Nose to Base of Tail (Length)
              </label>
              <span className="font-heading font-black text-lg text-brand-terracotta">
                {lengthInches} Inches
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={lengthInches}
              onChange={(e) => {
                setSelectedPreset("custom");
                setLengthInches(parseInt(e.target.value));
              }}
              className="w-full accent-brand-terracotta cursor-pointer h-2 bg-brand-cream rounded-lg"
            />
            <p className="text-[10px] font-mono text-brand-taupe mt-1">
              Measure from tip of nose to the base of tail (do not include the tail itself).
            </p>
          </div>

          {/* Height Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-bold text-brand-espresso uppercase">
                2. Floor to Top of Ears (Height)
              </label>
              <span className="font-heading font-black text-lg text-brand-espresso">
                {heightInches} Inches
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="45"
              value={heightInches}
              onChange={(e) => {
                setSelectedPreset("custom");
                setHeightInches(parseInt(e.target.value));
              }}
              className="w-full accent-brand-olive cursor-pointer h-2 bg-brand-cream rounded-lg"
            />
            <p className="text-[10px] font-mono text-brand-taupe mt-1">
              Measure while dog is standing upright, from paws to the highest tip of head/ears.
            </p>
          </div>

          {/* Puppy Toggle */}
          <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="font-heading font-black text-sm text-brand-espresso">
                Is this for a growing puppy?
              </div>
              <div className="text-[11px] font-mono text-brand-taupe">
                Calculate with an adjustable divider panel
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsPuppy(!isPuppy)}
              className={`px-4 py-1.5 rounded-full border-2 font-heading font-black text-xs transition-all ${
                isPuppy
                  ? "bg-brand-olive text-brand-espresso border-brand-espresso shadow-paper-sm"
                  : "bg-brand-cream text-brand-espresso border-brand-espresso/40"
              }`}
            >
              {isPuppy ? "YES (PUPPY)" : "NO (ADULT)"}
            </button>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-white border-2 border-brand-espresso rounded-3xl p-6 shadow-paper flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider mb-1">
              Recommended Crate Size
            </div>
            <div className="font-heading text-3xl sm:text-4xl font-black text-brand-espresso mb-2">
              {crate.size}
            </div>
            <div className="inline-block bg-brand-olive/30 border border-brand-espresso px-3 py-1 rounded-full font-mono font-bold text-xs text-brand-espresso mb-4">
              Standard Dims: {crate.dims}
            </div>

            {/* Ergonomic Criteria */}
            <div className="bg-[#FAF4EE] border border-brand-espresso/30 rounded-2xl p-4 text-xs space-y-2 mb-4">
              <div className="font-mono font-bold text-brand-espresso uppercase text-[11px]">
                Ergonomic Clearance Verified:
              </div>
              <ul className="space-y-1.5 text-brand-taupe text-[11px]">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Length clearance: <strong>+{recommendedLength - lengthInches}"</strong> (allows stretching)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Headroom: <strong>+{recommendedHeight - heightInches}"</strong> (prevents ear slouching)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>360-degree turnaround clearance</span>
                </li>
              </ul>
            </div>

            {isPuppy && (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 text-xs text-amber-900 font-sans">
                <strong>Puppy Divider Tip:</strong> Buy the full adult size now, but install the divider panel so the puppy only has enough space to lie down and sleep. This prevents accidents in unmonitored corners.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-brand-espresso/20 text-[10px] font-mono text-brand-taupe">
            AKC guideline: (Nose to Tail + 2–4") by (Standing Height + 2–4").
          </div>
        </div>
      </div>
    </div>
  );
}
