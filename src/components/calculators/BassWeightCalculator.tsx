"use client";

import React, { useState } from "react";
import {
  Trophy,
  Scale,
  Ruler,
  Fish,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Info,
  CheckCircle2,
  Waves,
  HeartHandshake,
} from "lucide-react";

type BassSpecies = "largemouth" | "smallmouth" | "spotted" | "striped";
type CalcMode = "length_girth" | "length_only";
type BodyCondition = "lean" | "average" | "gravid";
type UnitSystem = "imperial" | "metric";

interface SpeciesConfig {
  name: string;
  scientificName: string;
  defaultDivisor: number;
  leanDivisor: number;
  gravidDivisor: number;
  lengthOnlyA: number; // a * L^b
  lengthOnlyB: number;
  typicalMaxLen: number;
  trophyThreshold: number;
  lunkerThreshold: number;
}

const SPECIES_CONFIGS: Record<BassSpecies, SpeciesConfig> = {
  largemouth: {
    name: "Largemouth Bass",
    scientificName: "Micropterus salmoides",
    defaultDivisor: 1200,
    leanDivisor: 1300,
    gravidDivisor: 1050,
    lengthOnlyA: 0.000388,
    lengthOnlyB: 3.13,
    typicalMaxLen: 30,
    trophyThreshold: 5.0,
    lunkerThreshold: 8.0,
  },
  smallmouth: {
    name: "Smallmouth Bass (Bronzeback)",
    scientificName: "Micropterus dolomieu",
    defaultDivisor: 1350,
    leanDivisor: 1450,
    gravidDivisor: 1200,
    lengthOnlyA: 0.00032,
    lengthOnlyB: 3.15,
    typicalMaxLen: 26,
    trophyThreshold: 4.0,
    lunkerThreshold: 6.0,
  },
  spotted: {
    name: "Spotted Bass (Kentucky)",
    scientificName: "Micropterus punctulatus",
    defaultDivisor: 1300,
    leanDivisor: 1400,
    gravidDivisor: 1150,
    lengthOnlyA: 0.00035,
    lengthOnlyB: 3.12,
    typicalMaxLen: 24,
    trophyThreshold: 3.5,
    lunkerThreshold: 5.5,
  },
  striped: {
    name: "Striped Bass / Wiper",
    scientificName: "Morone saxatilis",
    defaultDivisor: 1000,
    leanDivisor: 1150,
    gravidDivisor: 900,
    lengthOnlyA: 0.00037,
    lengthOnlyB: 3.18,
    typicalMaxLen: 45,
    trophyThreshold: 15.0,
    lunkerThreshold: 30.0,
  },
};

interface BassPreset {
  name: string;
  species: BassSpecies;
  length: number;
  girth: number;
  note: string;
}

const BASS_PRESETS: BassPreset[] = [
  { name: '18" Tournament Keeper', species: "largemouth", length: 18, girth: 13, note: "Standard solid bag fish (~3.5 lbs)" },
  { name: '21" Trophy Largemouth', species: "largemouth", length: 21, girth: 15.5, note: "5.5+ lb milestone fish" },
  { name: '20" Trophy Smallmouth', species: "smallmouth", length: 20, girth: 14, note: "4.1+ lb Bronzeback lunker" },
  { name: '24" ShareLunker Legend', species: "largemouth", length: 24, girth: 18.5, note: "Double-digit 9.5-10.5 lb giant" },
];

export default function BassWeightCalculator() {
  const [unit, setUnit] = useState<UnitSystem>("imperial");
  const [species, setSpecies] = useState<BassSpecies>("largemouth");
  const [calcMode, setCalcMode] = useState<CalcMode>("length_girth");
  const [condition, setCondition] = useState<BodyCondition>("average");

  // Raw inputs (imperial default)
  const [length, setLength] = useState<number>(20);
  const [girth, setGirth] = useState<number>(14.5);

  const cmToInch = 1 / 2.54;
  const inchToCm = 2.54;

  const lengthIn = unit === "imperial" ? length : length * cmToInch;
  const girthIn = unit === "imperial" ? girth : girth * cmToInch;

  const config = SPECIES_CONFIGS[species];

  // Active Divisor based on condition
  let activeDivisor = config.defaultDivisor;
  if (condition === "lean") activeDivisor = config.leanDivisor;
  if (condition === "gravid") activeDivisor = config.gravidDivisor;

  // Calculation logic
  let estimatedWeightLbs = 0;
  let minWeightLbs = 0;
  let maxWeightLbs = 0;

  if (calcMode === "length_girth") {
    // Formula: (Length * Length * Girth) / Divisor
    estimatedWeightLbs = (lengthIn * lengthIn * girthIn) / activeDivisor;
    minWeightLbs = (lengthIn * lengthIn * girthIn) / config.leanDivisor;
    maxWeightLbs = (lengthIn * lengthIn * girthIn) / config.gravidDivisor;
  } else {
    // Length-only standard power regression: Weight = a * Length^b
    const baseWeight = config.lengthOnlyA * Math.pow(lengthIn, config.lengthOnlyB);
    const condMult = condition === "lean" ? 0.9 : condition === "gravid" ? 1.15 : 1.0;
    estimatedWeightLbs = baseWeight * condMult;
    minWeightLbs = baseWeight * 0.88;
    maxWeightLbs = baseWeight * 1.18;
  }

  // Weight conversions
  const lbsTotal = Math.max(0, estimatedWeightLbs);
  const wholeLbs = Math.floor(lbsTotal);
  const remainingOz = Math.round((lbsTotal - wholeLbs) * 16 * 10) / 10;
  const weightKg = lbsTotal * 0.45359237;

  // Trophy Tier
  let trophyTier = "Schoolie / Juvenile";
  let trophyBadgeColor = "bg-brand-cream text-brand-espresso border-brand-espresso/30";

  if (species === "striped") {
    if (lbsTotal >= 30) {
      trophyTier = "Monster Cow Striper (30+ lbs)";
      trophyBadgeColor = "bg-amber-100 text-amber-900 border-amber-500";
    } else if (lbsTotal >= 15) {
      trophyTier = "Trophy Striper (15+ lbs)";
      trophyBadgeColor = "bg-brand-leaf/20 text-brand-leaf border-brand-leaf";
    } else if (lbsTotal >= 8) {
      trophyTier = "Quality Keeper (8-14 lbs)";
      trophyBadgeColor = "bg-blue-100 text-blue-900 border-blue-400";
    }
  } else {
    if (lbsTotal >= 10.0) {
      trophyTier = "Legendary ShareLunker (10+ lbs Elite)";
      trophyBadgeColor = "bg-amber-100 text-amber-950 border-amber-600 ring-2 ring-amber-400/50";
    } else if (lbsTotal >= config.lunkerThreshold) {
      trophyTier = `Lunker Class (${config.lunkerThreshold}+ lbs)`;
      trophyBadgeColor = "bg-brand-light-gold/30 text-brand-espresso border-brand-espresso";
    } else if (lbsTotal >= config.trophyThreshold) {
      trophyTier = `Trophy Bass (${config.trophyThreshold}+ lbs)`;
      trophyBadgeColor = "bg-brand-leaf/20 text-brand-espresso border-brand-leaf";
    } else if (lbsTotal >= 3.0) {
      trophyTier = "Quality Tournament Bass (3-5 lbs)";
      trophyBadgeColor = "bg-blue-50 text-blue-900 border-blue-300";
    } else if (lbsTotal >= 1.5) {
      trophyTier = "Solid Keeper (1.5-3 lbs)";
      trophyBadgeColor = "bg-brand-cream/80 text-brand-espresso border-brand-espresso/20";
    }
  }

  const handlePresetSelect = (preset: BassPreset) => {
    setSpecies(preset.species);
    setCalcMode("length_girth");
    if (unit === "imperial") {
      setLength(preset.length);
      setGirth(preset.girth);
    } else {
      setLength(Math.round(preset.length * inchToCm * 10) / 10);
      setGirth(Math.round(preset.girth * inchToCm * 10) / 10);
    }
  };

  const handleReset = () => {
    setSpecies("largemouth");
    setCalcMode("length_girth");
    setCondition("average");
    setLength(unit === "imperial" ? 20 : 50.8);
    setGirth(unit === "imperial" ? 14.5 : 36.8);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header Lockup */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-brand-light-gold/40 border-2.5 border-brand-espresso flex items-center justify-center flex-shrink-0 shadow-paper mt-0.5 aspect-square">
          <Trophy className="w-6 h-6 text-brand-espresso" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase mb-2 border border-brand-espresso/20 bg-brand-cream/80 text-brand-espresso">
            <Fish className="w-3.5 h-3.5 text-brand-leaf" />
            IGFA & FWC Standard Formula
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-espresso leading-snug">
            Bass Weight Calculator (Length & Girth)
          </h1>
          <p className="text-sm font-sans text-brand-espresso/70 mt-1 max-w-2xl leading-relaxed">
            Estimate largemouth, smallmouth, and spotted bass weight instantly using the official
            catch-and-release fisheries formula. Protect your fish from scale injury.
          </p>
        </div>
      </div>

      {/* Preset Quick Picks */}
      <div className="bg-brand-cream/40 border-2.5 border-brand-espresso rounded-2xl p-4 shadow-paper">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso/70 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-leaf" />
          Benchmark Catch Presets
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {BASS_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handlePresetSelect(preset)}
              className="px-3 py-2 text-left rounded-xl border-2 border-brand-espresso/20 bg-white hover:bg-brand-light-gold/20 hover:border-brand-espresso transition-all group"
            >
              <div className="text-xs font-heading font-bold text-brand-espresso group-hover:text-brand-leaf truncate">
                {preset.name}
              </div>
              <div className="text-[11px] font-mono text-brand-espresso/60 truncate">
                {preset.note}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-7 shadow-paper space-y-6">
            {/* Top Toolbar: Units & Reset */}
            <div className="flex items-center justify-between pb-4 border-b border-brand-espresso/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-brand-espresso/70">Units:</span>
                <div className="inline-flex rounded-xl border-2 border-brand-espresso bg-brand-cream/60 p-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (unit !== "imperial") {
                        setUnit("imperial");
                        setLength(Math.round(length * cmToInch * 10) / 10);
                        setGirth(Math.round(girth * cmToInch * 10) / 10);
                      }
                    }}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                      unit === "imperial"
                        ? "bg-brand-espresso text-brand-cream shadow-sm"
                        : "text-brand-espresso/70 hover:text-brand-espresso"
                    }`}
                  >
                    Inches / Lbs
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (unit !== "metric") {
                        setUnit("metric");
                        setLength(Math.round(length * inchToCm * 10) / 10);
                        setGirth(Math.round(girth * inchToCm * 10) / 10);
                      }
                    }}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                      unit === "metric"
                        ? "bg-brand-espresso text-brand-cream shadow-sm"
                        : "text-brand-espresso/70 hover:text-brand-espresso"
                    }`}
                  >
                    cm / kg
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-brand-espresso/60 hover:text-brand-espresso transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Species Selector */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso/80 mb-2">
                Target Bass Species
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(SPECIES_CONFIGS) as BassSpecies[]).map((sp) => {
                  const cfg = SPECIES_CONFIGS[sp];
                  const isSelected = species === sp;
                  return (
                    <button
                      key={sp}
                      type="button"
                      onClick={() => setSpecies(sp)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? "bg-brand-light-gold/30 border-brand-espresso shadow-inner font-bold"
                          : "bg-white border-brand-espresso/20 hover:border-brand-espresso/50"
                      }`}
                    >
                      <div className="text-sm font-heading font-bold text-brand-espresso leading-snug">
                        {cfg.name}
                      </div>
                      <div className="text-[11px] font-sans italic text-brand-espresso/60 truncate">
                        {cfg.scientificName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calculation Method Toggle */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso/80 mb-2">
                Calculation Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCalcMode("length_girth")}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    calcMode === "length_girth"
                      ? "bg-brand-espresso text-white border-brand-espresso shadow-paper"
                      : "bg-white border-brand-espresso/20 hover:border-brand-espresso/60 text-brand-espresso"
                  }`}
                >
                  <div className="text-xs font-heading font-bold flex items-center gap-1.5">
                    <Ruler className="w-4 h-4" /> Length + Girth
                  </div>
                  <div className={`text-[11px] mt-0.5 ${calcMode === "length_girth" ? "text-brand-cream/80" : "text-brand-espresso/60"}`}>
                    Highest accuracy (±5%)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcMode("length_only")}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    calcMode === "length_only"
                      ? "bg-brand-espresso text-white border-brand-espresso shadow-paper"
                      : "bg-white border-brand-espresso/20 hover:border-brand-espresso/60 text-brand-espresso"
                  }`}
                >
                  <div className="text-xs font-heading font-bold flex items-center gap-1.5">
                    <Scale className="w-4 h-4" /> Length Only
                  </div>
                  <div className={`text-[11px] mt-0.5 ${calcMode === "length_only" ? "text-brand-cream/80" : "text-brand-espresso/60"}`}>
                    Standard curve (when no tape)
                  </div>
                </button>
              </div>
            </div>

            {/* Dimensions Inputs */}
            <div className="space-y-4 pt-2">
              {/* Length */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-brand-espresso/80">
                    Total Length ({unit === "imperial" ? "inches" : "cm"}):
                  </label>
                  <span className="text-sm font-mono font-bold text-brand-espresso bg-brand-cream/80 px-2 py-0.5 rounded-lg border border-brand-espresso/20">
                    {length} {unit === "imperial" ? 'in' : 'cm'}
                  </span>
                </div>
                <input
                  type="range"
                  min={unit === "imperial" ? 10 : 25}
                  max={unit === "imperial" ? config.typicalMaxLen : Math.round(config.typicalMaxLen * inchToCm)}
                  step={unit === "imperial" ? 0.25 : 0.5}
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                  className="w-full accent-brand-espresso cursor-pointer"
                />
                <p className="text-[11px] font-sans text-brand-espresso/60 mt-1">
                  Tip: Mouth closed flat against bump board, tail lobes squeezed gently together.
                </p>
              </div>

              {/* Girth (Only if length_girth mode) */}
              {calcMode === "length_girth" && (
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-mono font-bold uppercase text-brand-espresso/80">
                      Maximum Girth ({unit === "imperial" ? "inches" : "cm"}):
                    </label>
                    <span className="text-sm font-mono font-bold text-brand-espresso bg-brand-cream/80 px-2 py-0.5 rounded-lg border border-brand-espresso/20">
                      {girth} {unit === "imperial" ? 'in' : 'cm'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={unit === "imperial" ? 6 : 15}
                    max={unit === "imperial" ? 24 : 61}
                    step={unit === "imperial" ? 0.25 : 0.5}
                    value={girth}
                    onChange={(e) => setGirth(parseFloat(e.target.value) || 0)}
                    className="w-full accent-brand-espresso cursor-pointer"
                  />
                  <p className="text-[11px] font-sans text-brand-espresso/60 mt-1">
                    Wrap a flexible soft tape around the widest, thickest section of the belly.
                  </p>
                </div>
              )}

              {/* Body Condition / Season */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso/80 mb-2">
                  Body Condition / Seasonality
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCondition("lean")}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      condition === "lean"
                        ? "bg-brand-cream border-brand-espresso font-bold shadow-sm"
                        : "bg-white border-brand-espresso/20 hover:border-brand-espresso/40"
                    }`}
                  >
                    <div className="text-xs font-heading font-bold text-brand-espresso">Lean / Post-Spawn</div>
                    <div className="text-[10px] text-brand-espresso/60 font-mono">Slender belly</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCondition("average")}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      condition === "average"
                        ? "bg-brand-cream border-brand-espresso font-bold shadow-sm"
                        : "bg-white border-brand-espresso/20 hover:border-brand-espresso/40"
                    }`}
                  >
                    <div className="text-xs font-heading font-bold text-brand-espresso">Average Season</div>
                    <div className="text-[10px] text-brand-espresso/60 font-mono">Standard shape</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCondition("gravid")}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      condition === "gravid"
                        ? "bg-brand-light-gold/30 border-brand-espresso font-bold shadow-sm"
                        : "bg-white border-brand-espresso/20 hover:border-brand-espresso/40"
                    }`}
                  >
                    <div className="text-xs font-heading font-bold text-brand-espresso">Pre-Spawn Gravid</div>
                    <div className="text-[10px] text-brand-espresso/60 font-mono">Egg-heavy / FL strain</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Weight Callout Card */}
          <div className="bg-brand-cream/80 border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-7 shadow-paper relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso/70 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-brand-leaf" />
                Estimated Weight
              </span>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${trophyBadgeColor}`}>
                {trophyTier}
              </span>
            </div>

            {/* Giant Metric Readout */}
            <div className="my-3">
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-brand-espresso tracking-tight">
                {wholeLbs} <span className="text-2xl font-bold font-sans text-brand-espresso/70">lbs</span>{" "}
                {remainingOz} <span className="text-2xl font-bold font-sans text-brand-espresso/70">oz</span>
              </div>
              <div className="text-sm font-mono font-bold text-brand-espresso/70 mt-1">
                = {lbsTotal.toFixed(2)} lbs &bull; {weightKg.toFixed(2)} kg
              </div>
            </div>

            {/* Confidence Interval */}
            <div className="mt-5 pt-4 border-t border-brand-espresso/15 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-brand-espresso/70">Probable Variance Range:</span>
                <span className="font-bold text-brand-espresso">
                  {minWeightLbs.toFixed(2)} – {maxWeightLbs.toFixed(2)} lbs
                </span>
              </div>
              <div className="w-full bg-brand-espresso/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-leaf h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.max(10, (lbsTotal / (config.lunkerThreshold * 1.3)) * 100))}%`,
                  }}
                />
              </div>
              <p className="text-[11px] font-sans text-brand-espresso/60 leading-tight">
                Standard error with girth is ±4-7%. Length-only estimates fluctuate ±12% based on forage abundance.
              </p>
            </div>
          </div>

          {/* Catch-and-Release & Livewell Care Box */}
          <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 shadow-paper space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso">
              <HeartHandshake className="w-4 h-4 text-brand-leaf" />
              Catch &amp; Release Handling Rules
            </div>

            <div className="space-y-3 text-xs font-sans text-brand-espresso/80 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-leaf flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Support the belly:</strong> For bass over 3 lbs, never hold the fish horizontally by the lower jaw alone. Hyperextension fractures the jaw hinge, preventing the bass from feeding after release.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-leaf flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Skip lip scales:</strong> Puncturing the lower membrane with mechanical scales creates necrotic tissue. This length/girth formula yields certified IGFA weight confidence without hook trauma.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-leaf flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Water temperature alert:</strong> In summer water above 78°F (25°C), release fish within 60 seconds. Oxygen debt increases exponentially in warm surface water.
                </span>
              </div>
            </div>
          </div>

          {/* Mathematical Formula Reference */}
          <div className="bg-brand-light-gold/20 border-2.5 border-brand-espresso rounded-3xl p-5 shadow-paper text-xs font-mono text-brand-espresso/80 space-y-2">
            <div className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-brand-espresso">
              <Info className="w-4 h-4 text-brand-espresso" />
              Formula Details
            </div>
            {calcMode === "length_girth" ? (
              <div>
                <p className="font-bold text-brand-espresso">
                  Weight (lbs) = (Length &times; Length &times; Girth) &divide; {activeDivisor}
                </p>
                <p className="mt-1 text-[11px] text-brand-espresso/70">
                  Adopted by Wisconsin DNR, Florida FWC, and B.A.S.S. for certified non-invasive catch evaluations.
                </p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-brand-espresso">
                  Weight (lbs) = {config.lengthOnlyA} &times; Length<sup>{config.lengthOnlyB}</sup>
                </p>
                <p className="mt-1 text-[11px] text-brand-espresso/70">
                  Standard fisheries power-law regression for {config.name}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
