"use client";

import React, { useState } from "react";
import {
  Fish,
  Scale,
  Thermometer,
  Waves,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
} from "lucide-react";

type TankShape = "rectangular" | "cube" | "bowfront" | "cylinder";
type UnitSystem = "imperial" | "metric";

interface TankPreset {
  name: string;
  shape: TankShape;
  length: number;
  width: number;
  height: number;
  bowDepth?: number;
}

const POPULAR_PRESETS: TankPreset[] = [
  { name: "10 Gallon Standard", shape: "rectangular", length: 20, width: 10, height: 12 },
  { name: "20 Gallon Long", shape: "rectangular", length: 30, width: 12, height: 12 },
  { name: "29 Gallon Standard", shape: "rectangular", length: 30, width: 12, height: 18 },
  { name: "40 Gallon Breeder", shape: "rectangular", length: 36, width: 18, height: 16 },
  { name: "55 Gallon Standard", shape: "rectangular", length: 48, width: 13, height: 21 },
  { name: "75 Gallon Standard", shape: "rectangular", length: 48, width: 18, height: 21 },
];

export default function FishTankCalculator() {
  const [unit, setUnit] = useState<UnitSystem>("imperial");
  const [shape, setShape] = useState<TankShape>("rectangular");
  const [length, setLength] = useState<number>(36);
  const [width, setWidth] = useState<number>(18);
  const [height, setHeight] = useState<number>(16);
  const [bowDepth, setBowDepth] = useState<number>(22); // for bowfront
  const [waterlineGap, setWaterlineGap] = useState<number>(1.25); // distance from rim to water
  const [substrateDepth, setSubstrateDepth] = useState<number>(2.0); // substrate thickness
  const [waterType, setWaterType] = useState<"freshwater" | "saltwater">("freshwater");

  // Conversion factors
  const inchToCm = 2.54;
  const cmToInch = 1 / 2.54;

  // Normalized dimensions in inches for calculation
  const lengthIn = unit === "imperial" ? length : length * cmToInch;
  const widthIn = unit === "imperial" ? width : width * cmToInch;
  const heightIn = unit === "imperial" ? height : height * cmToInch;
  const bowDepthIn = unit === "imperial" ? bowDepth : bowDepth * cmToInch;
  const waterlineGapIn = unit === "imperial" ? waterlineGap : waterlineGap * cmToInch;
  const substrateDepthIn = unit === "imperial" ? substrateDepth : substrateDepth * cmToInch;

  // Volume Calculation (in cubic inches)
  let grossCubicInches = 0;
  let netCubicInches = 0;

  const netHeightIn = Math.max(1, heightIn - waterlineGapIn - substrateDepthIn);

  if (shape === "rectangular" || shape === "cube") {
    grossCubicInches = lengthIn * widthIn * heightIn;
    netCubicInches = lengthIn * widthIn * netHeightIn;
  } else if (shape === "bowfront") {
    // Rectangular core + parabolic bow front segment
    const bowFrontArea = (lengthIn * widthIn) + (0.667 * lengthIn * Math.max(0, bowDepthIn - widthIn));
    grossCubicInches = bowFrontArea * heightIn;
    netCubicInches = bowFrontArea * netHeightIn;
  } else if (shape === "cylinder") {
    // Length is treated as diameter
    const radius = lengthIn / 2;
    grossCubicInches = Math.PI * Math.pow(radius, 2) * heightIn;
    netCubicInches = Math.PI * Math.pow(radius, 2) * netHeightIn;
  }

  // 1 US Gallon = 231 cubic inches
  const grossGallons = grossCubicInches / 231;
  const netGallons = netCubicInches / 231;
  const grossLiters = grossGallons * 3.78541;
  const netLiters = netGallons * 3.78541;

  // Weight Calculation (in lbs)
  // Water: 8.34 lbs/gal (fresh) or 8.55 lbs/gal (marine)
  const waterDensityLbs = waterType === "freshwater" ? 8.34 : 8.55;
  const waterWeightLbs = netGallons * waterDensityLbs;

  // Estimated dry substrate weight: ~10-12 lbs per sq ft of 1-inch depth
  const footprintSqFt = (lengthIn * widthIn) / 144;
  const substrateWeightLbs = footprintSqFt * substrateDepthIn * 11;

  // Empty glass tank weight empirical formula
  const emptyGlassWeightLbs = grossGallons < 20 ? grossGallons * 1.2 + 8 : grossGallons * 1.5 + 12;

  const totalWeightLbs = Math.round(waterWeightLbs + substrateWeightLbs + emptyGlassWeightLbs);
  const totalWeightKg = Math.round(totalWeightLbs * 0.453592);

  // Surface Area for Gas Exchange (sq inches)
  const surfaceAreaSqInches = lengthIn * widthIn;

  // Stocking Rule: Modern surface-area and net-volume synthesis
  // Traditional rule: 1 inch of slender fish per net gallon
  const maxFishInchesVolume = Math.round(netGallons * (waterType === "freshwater" ? 1.0 : 0.5));
  const maxFishInchesSurface = Math.round(surfaceAreaSqInches / (waterType === "freshwater" ? 12 : 24));
  const recommendedFishInches = Math.min(maxFishInchesVolume, maxFishInchesSurface);

  // Heater Recommendation (3-5 watts per gallon)
  const minHeaterWatts = Math.round((netGallons * 3.5) / 25) * 25;
  const heaterRecommendation =
    minHeaterWatts <= 50 ? "50 Watts" :
    minHeaterWatts <= 100 ? "100 Watts" :
    minHeaterWatts <= 150 ? "150 Watts" :
    minHeaterWatts <= 200 ? "200 Watts" :
    minHeaterWatts <= 300 ? "300 Watts" :
    `Dual Heaters: 2 × ${Math.round(minHeaterWatts / 50) * 25}W`;

  // Filter GPH Flow Rate
  // 4x to 6x turnover for freshwater; 8x to 10x for marine/cichlid
  const minGPH = Math.round(netGallons * (waterType === "freshwater" ? 4 : 8));
  const maxGPH = Math.round(netGallons * (waterType === "freshwater" ? 6 : 10));

  const applyPreset = (preset: TankPreset) => {
    setShape(preset.shape);
    if (unit === "imperial") {
      setLength(preset.length);
      setWidth(preset.width);
      setHeight(preset.height);
      if (preset.bowDepth) setBowDepth(preset.bowDepth);
    } else {
      setLength(Math.round(preset.length * inchToCm));
      setWidth(Math.round(preset.width * inchToCm));
      setHeight(Math.round(preset.height * inchToCm));
      if (preset.bowDepth) setBowDepth(Math.round(preset.bowDepth * inchToCm));
    }
  };

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill flex-shrink-0 aspect-square mt-0.5">
            <Fish className="w-5 h-5 text-brand-espresso flex-shrink-0" />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading text-lg sm:text-2xl font-black text-brand-espresso leading-snug">
              Fish Tank & Aquarium Volume Calculator
            </h3>
            <p className="text-xs sm:text-sm text-brand-taupe font-sans font-medium mt-1 leading-normal">
              University of Florida IFAS & OATA Ornamental Aquatic Science Protocol
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[10px] sm:text-xs font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex-shrink-0">
          OATA Verified
        </span>
      </div>

      {/* Preset Selector */}
      <div className="mb-6 p-4 rounded-2xl bg-white border-2 border-brand-espresso shadow-paper-sm">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-mono font-bold uppercase text-brand-espresso flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
            Standard Aquarium Presets:
          </label>
          <div className="flex rounded-lg border-2 border-brand-espresso p-0.5 bg-brand-cream/50 text-[11px] font-heading font-black">
            <button
              type="button"
              onClick={() => setUnit("imperial")}
              className={`px-2.5 py-0.5 rounded-md transition-colors ${
                unit === "imperial" ? "bg-brand-espresso text-white shadow-sm" : "text-brand-espresso hover:bg-brand-cream"
              }`}
            >
              Inches / Gallons
            </button>
            <button
              type="button"
              onClick={() => setUnit("metric")}
              className={`px-2.5 py-0.5 rounded-md transition-colors ${
                unit === "metric" ? "bg-brand-espresso text-white shadow-sm" : "text-brand-espresso hover:bg-brand-cream"
              }`}
            >
              CM / Liters
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {POPULAR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 rounded-xl border-1.5 border-brand-espresso bg-[#FAF4EE] text-xs font-heading font-bold text-brand-espresso hover:bg-brand-olive transition-all shadow-[1.5px_1.5px_0px_#583D32] active:translate-x-[1px] active:translate-y-[1px]"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Tank Shape & Ecosystem Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-brand-espresso mb-1">
                Tank Shape
              </label>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value as TankShape)}
                className="w-full bg-white border-2 border-brand-espresso rounded-xl px-3 py-2 text-xs sm:text-sm font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none focus:border-brand-terracotta cursor-pointer"
              >
                <option value="rectangular">Rectangular (Standard)</option>
                <option value="cube">Cube</option>
                <option value="bowfront">Bowfront (Curved)</option>
                <option value="cylinder">Cylinder / Column</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-brand-espresso mb-1">
                Water Chemistry
              </label>
              <select
                value={waterType}
                onChange={(e) => setWaterType(e.target.value as "freshwater" | "saltwater")}
                className="w-full bg-white border-2 border-brand-espresso rounded-xl px-3 py-2 text-xs sm:text-sm font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none focus:border-brand-terracotta cursor-pointer"
              >
                <option value="freshwater">Freshwater (8.34 lbs/gal)</option>
                <option value="saltwater">Marine / Reef (8.55 lbs/gal)</option>
              </select>
            </div>
          </div>

          {/* Dimension Controls */}
          <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 sm:p-5 shadow-paper-sm space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-brand-taupe tracking-wider border-b border-brand-espresso/15 pb-1">
              Aquarium Outer Dimensions ({unit === "imperial" ? "Inches" : "Centimeters"})
            </h4>

            <div className="grid grid-cols-3 gap-3">
              {/* Length / Diameter */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-brand-espresso mb-1">
                  {shape === "cylinder" ? "Diameter" : "Length"}
                </label>
                <input
                  type="number"
                  min="4"
                  max="300"
                  value={length}
                  onChange={(e) => setLength(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-xl px-3 py-2 text-xs sm:text-sm font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none"
                />
              </div>

              {/* Width / Depth (hidden if cylinder) */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-brand-espresso mb-1">
                  {shape === "cylinder" ? "N/A" : "Width (Depth)"}
                </label>
                <input
                  type="number"
                  min="4"
                  max="300"
                  disabled={shape === "cylinder" || shape === "cube"}
                  value={shape === "cube" ? length : width}
                  onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-xl px-3 py-2 text-xs sm:text-sm font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none disabled:opacity-50"
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-brand-espresso mb-1">
                  Height
                </label>
                <input
                  type="number"
                  min="4"
                  max="300"
                  disabled={shape === "cube"}
                  value={shape === "cube" ? length : height}
                  onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-xl px-3 py-2 text-xs sm:text-sm font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Bowfront Deepest Point Input */}
            {shape === "bowfront" && (
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-brand-espresso mb-1">
                  Center Depth at Widest Arc Point ({unit === "imperial" ? "Inches" : "CM"})
                </label>
                <input
                  type="number"
                  value={bowDepth}
                  onChange={(e) => setBowDepth(Math.max(width, Number(e.target.value)))}
                  className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-xl px-3 py-2 text-xs sm:text-sm font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Waterline & Substrate Displacements */}
          <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 sm:p-5 shadow-paper-sm space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-brand-taupe tracking-wider border-b border-brand-espresso/15 pb-1">
              Water Displacement & Clearance
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-brand-espresso">
                    Top Waterline Gap
                  </label>
                  <span className="text-[11px] font-mono font-black text-brand-terracotta">
                    {waterlineGap} {unit === "imperial" ? "in" : "cm"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={unit === "imperial" ? 4 : 10}
                  step="0.25"
                  value={waterlineGap}
                  onChange={(e) => setWaterlineGap(Number(e.target.value))}
                  className="w-full accent-brand-terracotta cursor-pointer"
                />
                <span className="text-[10px] text-brand-taupe font-sans">
                  Standard: 1.0&quot; to 1.5&quot; below rim
                </span>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-brand-espresso">
                    Substrate (Gravel/Sand)
                  </label>
                  <span className="text-[11px] font-mono font-black text-brand-terracotta">
                    {substrateDepth} {unit === "imperial" ? "in" : "cm"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={unit === "imperial" ? 5 : 12}
                  step="0.5"
                  value={substrateDepth}
                  onChange={(e) => setSubstrateDepth(Number(e.target.value))}
                  className="w-full accent-brand-terracotta cursor-pointer"
                />
                <span className="text-[10px] text-brand-taupe font-sans">
                  Standard planted / gravel bed: 2.0&quot;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 bg-white border-2 border-brand-espresso rounded-3xl p-6 shadow-paper flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-brand-espresso">
              <span className="text-xs font-mono font-bold uppercase text-brand-taupe tracking-wider">
                Computed Capacity & Load
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-brand-espresso/20 uppercase">
                {waterType} Profile
              </span>
            </div>

            {/* Primary Volume Hero Display */}
            <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-2xl p-4 sm:p-5 shadow-paper-sm">
              <div className="text-[11px] font-mono font-bold uppercase text-brand-taupe mb-1">
                Actual Net Water Volume (After Displacement)
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-4xl sm:text-5xl font-black text-brand-terracotta">
                  {netGallons.toFixed(1)}
                </span>
                <span className="font-heading font-black text-xl text-brand-espresso">
                  US Gallons
                </span>
                <span className="text-sm font-mono font-bold text-brand-taupe ml-2">
                  ({netLiters.toFixed(1)} Liters)
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-brand-espresso/15 flex items-center justify-between text-xs font-mono text-brand-espresso">
                <span>Gross Tank Capacity (to brim):</span>
                <strong>{grossGallons.toFixed(1)} Gal ({grossLiters.toFixed(1)} L)</strong>
              </div>
            </div>

            {/* Structural Filled Weight Callout */}
            <div className="bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-brand-espresso">
                  <Scale className="w-4 h-4 text-brand-terracotta" />
                  <span>Total Filled Weight:</span>
                </div>
                <div className="font-heading text-lg font-black text-brand-espresso">
                  ~{totalWeightLbs} lbs ({totalWeightKg} kg)
                </div>
              </div>

              {/* Floor / Furniture Safety Assessment */}
              <div className={`p-2.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                totalWeightLbs < 150
                  ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                  : totalWeightLbs < 450
                  ? "bg-amber-50 text-amber-900 border-amber-300"
                  : "bg-red-50 text-red-950 border-red-400"
              }`}>
                {totalWeightLbs < 150 ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <strong>{totalWeightLbs < 150 ? "Safe for Sturdy Furniture" : totalWeightLbs < 450 ? "Dedicated Aquarium Stand Advised" : "Critical Structural Weight Notice"}:</strong>{" "}
                  {totalWeightLbs < 150
                    ? "Safe on solid wood desks and consoles without specialized framing."
                    : totalWeightLbs < 450
                    ? "Requires a level, reinforced aquarium cabinet. Do not place on flatpack or particleboard furniture."
                    : "Position across load-bearing floor joists near exterior walls or on ground-floor concrete slabs."}
                </div>
              </div>
            </div>

            {/* Equipment & Stocking Guidance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Heater */}
              <div className="bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl p-3.5 shadow-paper-sm">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-brand-taupe mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-brand-terracotta" />
                  <span>Recommended Heater</span>
                </div>
                <div className="font-heading font-black text-base text-brand-espresso">
                  {heaterRecommendation}
                </div>
                <div className="text-[10px] text-brand-taupe mt-0.5 font-sans">
                  Target: 76°–78°F in 70°F ambient room
                </div>
              </div>

              {/* Filter Flow Rate */}
              <div className="bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl p-3.5 shadow-paper-sm">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-brand-taupe mb-1">
                  <Waves className="w-3.5 h-3.5 text-sky-700" />
                  <span>Filter Flow Turnover</span>
                </div>
                <div className="font-heading font-black text-base text-brand-espresso">
                  {minGPH} – {maxGPH} GPH
                </div>
                <div className="text-[10px] text-brand-taupe mt-0.5 font-sans">
                  {waterType === "freshwater" ? "4× to 6× tank turnover rate" : "8× to 10× reef turnover rate"}
                </div>
              </div>
            </div>

            {/* Stocking Rule */}
            <div className="bg-brand-olive/20 border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm space-y-1.5">
              <div className="flex items-center justify-between text-xs font-heading font-black text-brand-espresso">
                <span className="flex items-center gap-1.5">
                  <Fish className="w-4 h-4 text-brand-terracotta" />
                  <span>Biological Stocking Capacity Guide</span>
                </span>
                <span className="text-brand-terracotta font-mono font-bold">
                  ~{recommendedFishInches} Total Fish Inches
                </span>
              </div>
              <p className="text-xs text-brand-taupe leading-relaxed font-sans">
                Surface area: <strong>{surfaceAreaSqInches.toFixed(0)} sq in</strong>. Supports approximately {recommendedFishInches} inches of slender community tropical fish (e.g. Neon Tetras, Guppies). For heavy-waste species (Goldfish, African Cichlids), reduce by 50%.
              </p>
            </div>
          </div>

          {/* Reset / Recalculate */}
          <div className="pt-2 flex items-center justify-between border-t border-brand-espresso/15 text-xs font-mono text-brand-taupe">
            <span>Water displacement algorithm: <strong>Active</strong></span>
            <button
              type="button"
              onClick={() => {
                setLength(36);
                setWidth(18);
                setHeight(16);
                setWaterlineGap(1.25);
                setSubstrateDepth(2.0);
              }}
              className="hover:text-brand-terracotta transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
