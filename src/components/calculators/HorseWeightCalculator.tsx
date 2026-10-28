"use client";

import React, { useState } from "react";
import {
  Scale,
  Ruler,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  Apple,
  Droplets,
  Pill,
  Heart,
  ChevronRight,
} from "lucide-react";

type EquineType = "adult" | "pony" | "yearling" | "weanling" | "draft";
type UnitSystem = "imperial" | "metric";

interface EquineConfig {
  name: string;
  subtitle: string;
  imperialDivisor: number;
  metricDivisor: number;
  defaultGirth: number; // in inches
  defaultLength: number; // in inches
  typicalWeightLbs: string;
}

const EQUINE_CONFIGS: Record<EquineType, EquineConfig> = {
  adult: {
    name: "Mature Adult Horse",
    subtitle: "Age 3+, Quarter Horse, TB, Arab, Warmblood",
    imperialDivisor: 330,
    metricDivisor: 11900,
    defaultGirth: 74,
    defaultLength: 66,
    typicalWeightLbs: "900 - 1,350 lbs",
  },
  pony: {
    name: "Pony / Small Breed",
    subtitle: "Under 14.2 hh, Shetland, Welsh, Haflinger",
    imperialDivisor: 299,
    metricDivisor: 10800,
    defaultGirth: 64,
    defaultLength: 54,
    typicalWeightLbs: "500 - 900 lbs",
  },
  yearling: {
    name: "Yearling",
    subtitle: "Age 12 - 24 months, growing frame",
    imperialDivisor: 301,
    metricDivisor: 10850,
    defaultGirth: 62,
    defaultLength: 52,
    typicalWeightLbs: "600 - 850 lbs",
  },
  weanling: {
    name: "Weanling Foal",
    subtitle: "Age 6 - 12 months, post-weaning",
    imperialDivisor: 280,
    metricDivisor: 10100,
    defaultGirth: 52,
    defaultLength: 42,
    typicalWeightLbs: "350 - 550 lbs",
  },
  draft: {
    name: "Draft Horse / Heavy Breed",
    subtitle: "Clydesdale, Percheron, Belgian, Shire",
    imperialDivisor: 315,
    metricDivisor: 11350,
    defaultGirth: 86,
    defaultLength: 74,
    typicalWeightLbs: "1,400 - 2,200 lbs",
  },
};

interface HorsePreset {
  name: string;
  type: EquineType;
  girth: number;
  length: number;
  bcs: number;
  note: string;
}

const HORSE_PRESETS: HorsePreset[] = [
  { name: "Quarter Horse (15.1 hh)", type: "adult", girth: 74, length: 65, bcs: 5, note: "Solid stock horse build (~1,075 lbs)" },
  { name: "Thoroughbred (16.2 hh)", type: "adult", girth: 75, length: 68, bcs: 5, note: "Lean athletic sport horse (~1,150 lbs)" },
  { name: "Welsh Pony (13.0 hh)", type: "pony", girth: 63, length: 52, bcs: 6, note: "Stocky pony keeper (~690 lbs)" },
  { name: "Draft Cross / Warmblood", type: "draft", girth: 82, length: 72, bcs: 5, note: "Large heavy bone frame (~1,530 lbs)" },
];

export default function HorseWeightCalculator() {
  const [unit, setUnit] = useState<UnitSystem>("imperial");
  const [equineType, setEquineType] = useState<EquineType>("adult");
  const [heartGirth, setHeartGirth] = useState<number>(74); // in or cm
  const [bodyLength, setBodyLength] = useState<number>(66); // in or cm
  const [bcs, setBcs] = useState<number>(5); // 1-9 Henneke Scale

  const cmToInch = 1 / 2.54;
  const inchToCm = 2.54;

  const cfg = EQUINE_CONFIGS[equineType];

  // Normalized to inches for calculation
  const girthIn = unit === "imperial" ? heartGirth : heartGirth * cmToInch;
  const lengthIn = unit === "imperial" ? bodyLength : bodyLength * cmToInch;

  // AAEP Formula: (Heart Girth² × Body Length) / Divisor
  const weightLbs = (girthIn * girthIn * lengthIn) / cfg.imperialDivisor;
  const weightKg = weightLbs * 0.45359237;

  // Forage / Hay requirements: 1.5% to 2.5% of body weight daily
  const hayMinLbs = weightLbs * 0.015;
  const hayMaxLbs = weightLbs * 0.025;
  const hayFlakesAvg = (hayMinLbs / 5.5).toFixed(1); // standard 5-6 lb grass hay flake

  // Daily Fresh Water requirement: 5-10 gal for 1000lb, scaled
  const waterMinGal = Math.round((weightLbs / 1000) * 6 * 10) / 10;
  const waterMaxGal = Math.round((weightLbs / 1000) * 12 * 10) / 10;

  // BCS Label & Tone
  let bcsLabel = "5 - Moderate (Ideal)";
  let bcsBadgeColor = "bg-brand-leaf/20 text-brand-espresso border-brand-leaf";
  let bcsNote = "Ribs felt but not easily seen. Withers rounded, shoulders and neck blend smoothly.";

  if (bcs <= 2) {
    bcsLabel = `${bcs} - Emaciated / Very Thin`;
    bcsBadgeColor = "bg-rose-100 text-rose-900 border-rose-400";
    bcsNote = "Prominent spine, ribs, and hip bones. Severe caloric deficit requiring veterinary supervision.";
  } else if (bcs <= 4) {
    bcsLabel = `${bcs} - Moderately Thin`;
    bcsBadgeColor = "bg-amber-100 text-amber-900 border-amber-400";
    bcsNote = "Slight ridge along spine, ribs faintly discernible. Common in hard-working race/event horses.";
  } else if (bcs === 6) {
    bcsLabel = "6 - Moderately Fleshy";
    bcsBadgeColor = "bg-brand-light-gold/30 text-brand-espresso border-brand-espresso";
    bcsNote = "Fat beginning to be deposited over ribs and withers. Healthy for broodmares entering winter.";
  } else if (bcs >= 7) {
    bcsLabel = `${bcs} - Overweight / Obese`;
    bcsBadgeColor = "bg-rose-100 text-rose-900 border-rose-400";
    bcsNote = "Cresty neck, fat pockets along loin and dock. High risk for Equine Metabolic Syndrome (EMS) and laminitis.";
  }

  // Dewormer syringe calibration check (standard horse syringe = 1,250 lbs)
  const isOverweightForSingleSyringe = weightLbs > 1250;

  const handlePresetSelect = (preset: HorsePreset) => {
    setEquineType(preset.type);
    setBcs(preset.bcs);
    if (unit === "imperial") {
      setHeartGirth(preset.girth);
      setBodyLength(preset.length);
    } else {
      setHeartGirth(Math.round(preset.girth * inchToCm * 10) / 10);
      setBodyLength(Math.round(preset.length * inchToCm * 10) / 10);
    }
  };

  const handleReset = () => {
    setEquineType("adult");
    setBcs(5);
    setHeartGirth(unit === "imperial" ? 74 : 188);
    setBodyLength(unit === "imperial" ? 66 : 168);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header Lockup */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-brand-light-gold/40 border-2.5 border-brand-espresso flex items-center justify-center flex-shrink-0 shadow-paper mt-0.5 aspect-square">
          <Scale className="w-6 h-6 text-brand-espresso" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase mb-2 border border-brand-espresso/20 bg-brand-cream/80 text-brand-espresso">
            <Heart className="w-3.5 h-3.5 text-brand-leaf" />
            AAEP &amp; UC Davis Equine Science Standard
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-espresso leading-snug">
            Horse Weight Calculator (Heart Girth Tape)
          </h1>
          <p className="text-sm font-sans text-brand-espresso/70 mt-1 max-w-2xl leading-relaxed">
            Calculate accurate horse weight without a livestock scale using veterinary heart girth
            and body length measurements. Essential for proper deworming, medication, and feed rations.
          </p>
        </div>
      </div>

      {/* Preset Pickers */}
      <div className="bg-brand-cream/40 border-2.5 border-brand-espresso rounded-2xl p-4 shadow-paper">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso/70 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-leaf" />
          Common Equine Benchmarks
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {HORSE_PRESETS.map((preset) => (
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

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-7 shadow-paper space-y-6">
            {/* Unit Toggle & Reset */}
            <div className="flex items-center justify-between pb-4 border-b border-brand-espresso/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-brand-espresso/70">Units:</span>
                <div className="inline-flex rounded-xl border-2 border-brand-espresso bg-brand-cream/60 p-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (unit !== "imperial") {
                        setUnit("imperial");
                        setHeartGirth(Math.round(heartGirth * cmToInch * 10) / 10);
                        setBodyLength(Math.round(bodyLength * cmToInch * 10) / 10);
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
                        setHeartGirth(Math.round(heartGirth * inchToCm * 10) / 10);
                        setBodyLength(Math.round(bodyLength * inchToCm * 10) / 10);
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

            {/* Equine Classification */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso/80 mb-2">
                Equine Classification &amp; Growth Stage
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(Object.keys(EQUINE_CONFIGS) as EquineType[]).map((type) => {
                  const item = EQUINE_CONFIGS[type];
                  const isSelected = equineType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEquineType(type)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? "bg-brand-light-gold/30 border-brand-espresso shadow-inner font-bold"
                          : "bg-white border-brand-espresso/20 hover:border-brand-espresso/50"
                      }`}
                    >
                      <div className="text-xs font-heading font-bold text-brand-espresso leading-snug">
                        {item.name}
                      </div>
                      <div className="text-[11px] font-sans text-brand-espresso/60 truncate">
                        {item.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Measurements Section */}
            <div className="space-y-4 pt-2">
              {/* Heart Girth */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-brand-espresso/80">
                    1. Heart Girth Circumference ({unit === "imperial" ? "inches" : "cm"}):
                  </label>
                  <span className="text-sm font-mono font-bold text-brand-espresso bg-brand-cream/80 px-2 py-0.5 rounded-lg border border-brand-espresso/20">
                    {heartGirth} {unit === "imperial" ? 'in' : 'cm'}
                  </span>
                </div>
                <input
                  type="range"
                  min={unit === "imperial" ? 40 : 100}
                  max={unit === "imperial" ? 105 : 265}
                  step={unit === "imperial" ? 0.5 : 1}
                  value={heartGirth}
                  onChange={(e) => setHeartGirth(parseFloat(e.target.value) || 0)}
                  className="w-full accent-brand-espresso cursor-pointer"
                />
                <p className="text-[11px] font-sans text-brand-espresso/60 mt-1">
                  Place tape directly behind the front elbow, over the highest point of the withers. Pull snug on an exhaled breath.
                </p>
              </div>

              {/* Body Length */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-brand-espresso/80">
                    2. Body Length (Point of Shoulder to Buttock):
                  </label>
                  <span className="text-sm font-mono font-bold text-brand-espresso bg-brand-cream/80 px-2 py-0.5 rounded-lg border border-brand-espresso/20">
                    {bodyLength} {unit === "imperial" ? 'in' : 'cm'}
                  </span>
                </div>
                <input
                  type="range"
                  min={unit === "imperial" ? 35 : 90}
                  max={unit === "imperial" ? 95 : 240}
                  step={unit === "imperial" ? 0.5 : 1}
                  value={bodyLength}
                  onChange={(e) => setBodyLength(parseFloat(e.target.value) || 0)}
                  className="w-full accent-brand-espresso cursor-pointer"
                />
                <p className="text-[11px] font-sans text-brand-espresso/60 mt-1">
                  Hold tape at the bony point of the shoulder and run straight along the horse&apos;s side to the point of the buttock (ischium).
                </p>
              </div>

              {/* Henneke Body Condition Score (BCS 1-9) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-brand-espresso/80">
                    3. Henneke Body Condition Score (1–9):
                  </label>
                  <span className="text-xs font-mono font-bold text-brand-espresso bg-brand-cream/80 px-2.5 py-0.5 rounded-lg border border-brand-espresso/20">
                    BCS {bcs} / 9
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={9}
                  step={1}
                  value={bcs}
                  onChange={(e) => setBcs(parseInt(e.target.value, 10))}
                  className="w-full accent-brand-espresso cursor-pointer"
                />
                <div className="mt-2 p-2.5 rounded-xl border border-brand-espresso/15 bg-brand-cream/40 text-xs">
                  <div className="font-heading font-bold text-brand-espresso">{bcsLabel}</div>
                  <div className="text-[11px] font-sans text-brand-espresso/70 mt-0.5">{bcsNote}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Weight Readout */}
          <div className="bg-brand-cream/80 border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-7 shadow-paper relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso/70 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-brand-leaf" />
                Estimated Equine Weight
              </span>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${bcsBadgeColor}`}>
                BCS {bcs}
              </span>
            </div>

            <div className="my-3">
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-brand-espresso tracking-tight">
                {Math.round(weightLbs).toLocaleString()}{" "}
                <span className="text-2xl font-bold font-sans text-brand-espresso/70">lbs</span>
              </div>
              <div className="text-sm font-mono font-bold text-brand-espresso/70 mt-1">
                = {Math.round(weightKg).toLocaleString()} kg ({cfg.name})
              </div>
            </div>

            {/* Dewormer & Medication Alert */}
            <div className="mt-5 pt-4 border-t border-brand-espresso/15 space-y-2">
              <div className="flex items-start gap-2 text-xs font-sans text-brand-espresso/90">
                <Pill className="w-4 h-4 text-brand-leaf flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Medication &amp; Dewormer Calibration:</strong>
                  {isOverweightForSingleSyringe ? (
                    <p className="text-rose-900 font-semibold mt-0.5">
                      Notice: Exceeds standard single 1,250-lb dewormer syringe capacity. A second partial tube is required to prevent under-dosing.
                    </p>
                  ) : (
                    <p className="text-brand-espresso/70 mt-0.5">
                      Set dewormer dial to at least {Math.ceil((weightLbs + 50) / 50) * 50} lbs (AAEP recommends rounding up 50-100 lbs for therapeutic safety margin).
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Nutrition & Water Targets */}
          <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 shadow-paper space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-brand-espresso flex items-center gap-1.5">
              <Apple className="w-4 h-4 text-brand-leaf" />
              Daily Nutrition &amp; Care Rations
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-brand-cream/50 border border-brand-espresso/15">
                <div className="flex justify-between items-center text-xs font-heading font-bold text-brand-espresso">
                  <span>Daily Forage (Hay):</span>
                  <span>{Math.round(hayMinLbs)} – {Math.round(hayMaxLbs)} lbs / day</span>
                </div>
                <p className="text-[11px] font-sans text-brand-espresso/60 mt-1">
                  1.5% - 2.5% body weight in dry matter (~{hayFlakesAvg} flakes of 5-6 lb grass hay daily).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-brand-cream/50 border border-brand-espresso/15">
                <div className="flex justify-between items-center text-xs font-heading font-bold text-brand-espresso">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-600" />
                    Daily Fresh Water:
                  </span>
                  <span>{waterMinGal} – {waterMaxGal} gal / day</span>
                </div>
                <p className="text-[11px] font-sans text-brand-espresso/60 mt-1">
                  Clean water consumed daily; increases up to 18-22 gal in high summer heat or intensive training.
                </p>
              </div>
            </div>
          </div>

          {/* Science & Veterinary Formula Card */}
          <div className="bg-brand-light-gold/20 border-2.5 border-brand-espresso rounded-3xl p-5 shadow-paper text-xs font-mono text-brand-espresso/80 space-y-2">
            <div className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-brand-espresso">
              <Info className="w-4 h-4 text-brand-espresso" />
              Veterinary Mathematical Formula
            </div>
            <div>
              <p className="font-bold text-brand-espresso">
                Weight (lbs) = (Heart Girth&sup2; &times; Body Length) &divide; {cfg.imperialDivisor}
              </p>
              <p className="mt-1 text-[11px] text-brand-espresso/70">
                Formula verified by the American Association of Equine Practitioners (AAEP) and University of Minnesota Equine Center. Tape accuracy is within &plusmn;3% of commercial livestock scales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
