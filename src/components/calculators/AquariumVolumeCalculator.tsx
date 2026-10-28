"use client";

import React, { useState } from "react";
import {
  Waves,
  Scale,
  Droplets,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Gauge,
  CheckCircle2,
} from "lucide-react";

type UnitSystem = "imperial" | "metric";
type TankShape = "rectangular" | "cube" | "bowfront" | "hexagon";

interface Preset {
  name: string;
  shape: TankShape;
  l: number;
  w: number;
  h: number;
  bowW?: number;
}

const AQUASCAPE_PRESETS: Preset[] = [
  { name: "ADA 60P (17 Gal)", shape: "rectangular", l: 24, w: 12, h: 14 },
  { name: "ADA 90P (48 Gal)", shape: "rectangular", l: 36, w: 18, h: 18 },
  { name: "Rimless Cube 30C (7 Gal)", shape: "cube", l: 12, w: 12, h: 12 },
  { name: "Rimless Cube 45C (24 Gal)", shape: "cube", l: 18, w: 18, h: 18 },
  { name: "Standard 75G Reef", shape: "rectangular", l: 48, w: 18, h: 21 },
  { name: "120 Gallon Deep Dimension", shape: "rectangular", l: 48, w: 24, h: 24 },
];

export default function AquariumVolumeCalculator() {
  const [unit, setUnit] = useState<UnitSystem>("imperial");
  const [shape, setShape] = useState<TankShape>("rectangular");
  const [length, setLength] = useState<number>(36);
  const [width, setWidth] = useState<number>(18);
  const [height, setHeight] = useState<number>(18);
  const [bowWidth, setBowWidth] = useState<number>(22);

  // Advanced Aquascaping & System Options
  const [rimGap, setRimGap] = useState<number>(1.0); // inches
  const [substrateThickness, setSubstrateThickness] = useState<number>(2.0); // inches
  const [hardscapeWeightLbs, setHardscapeWeightLbs] = useState<number>(30); // rocks/wood displacement in lbs
  const [hasSump, setHasSump] = useState<boolean>(false);
  const [sumpGallons, setSumpGallons] = useState<number>(15);

  const cmToInch = 1 / 2.54;
  const inchToCm = 2.54;

  const lengthIn = unit === "imperial" ? length : length * cmToInch;
  const widthIn = unit === "imperial" ? width : width * cmToInch;
  const heightIn = unit === "imperial" ? height : height * cmToInch;
  const bowWidthIn = unit === "imperial" ? bowWidth : bowWidth * cmToInch;
  const rimGapIn = unit === "imperial" ? rimGap : rimGap * cmToInch;
  const substrateIn = unit === "imperial" ? substrateThickness : substrateThickness * cmToInch;

  // Gross Volume (cubic inches to gallons)
  let grossCubicIn = 0;
  const netHeightIn = Math.max(1, heightIn - rimGapIn - substrateIn);

  if (shape === "rectangular" || shape === "cube") {
    grossCubicIn = lengthIn * widthIn * heightIn;
  } else if (shape === "bowfront") {
    grossCubicIn = (lengthIn * widthIn + 0.667 * lengthIn * Math.max(0, bowWidthIn - widthIn)) * heightIn;
  } else if (shape === "hexagon") {
    // Regular hexagon: 3/2 * sqrt(3) * s^2 * h
    const s = lengthIn / 2;
    grossCubicIn = 2.598 * Math.pow(s, 2) * heightIn;
  }

  const grossGallons = grossCubicIn / 231;

  // Net Display Volume
  let netCubicIn = 0;
  if (shape === "rectangular" || shape === "cube") {
    netCubicIn = lengthIn * widthIn * netHeightIn;
  } else if (shape === "bowfront") {
    netCubicIn = (lengthIn * widthIn + 0.667 * lengthIn * Math.max(0, bowWidthIn - widthIn)) * netHeightIn;
  } else if (shape === "hexagon") {
    const s = lengthIn / 2;
    netCubicIn = 2.598 * Math.pow(s, 2) * netHeightIn;
  }

  let netDisplayGallons = netCubicIn / 231;

  // Rock/wood displacement: ~1 lb of stone displaces ~0.045 gallons of water
  const rockDisplacementGal = hardscapeWeightLbs * 0.045;
  netDisplayGallons = Math.max(1, netDisplayGallons - rockDisplacementGal);

  // Total System Volume (Display + Sump)
  const totalSystemGallons = netDisplayGallons + (hasSump ? sumpGallons : 0);
  const totalSystemLiters = totalSystemGallons * 3.78541;

  // Water Changes Volume
  const change10Gal = (totalSystemGallons * 0.1).toFixed(1);
  const change20Gal = (totalSystemGallons * 0.2).toFixed(1);
  const change30Gal = (totalSystemGallons * 0.3).toFixed(1);
  const change50Gal = (totalSystemGallons * 0.5).toFixed(1);

  // 5 Gallon Buckets calculation
  const bucketsFor20Percent = Math.max(1, Math.round(Number(change20Gal) / 4.5));

  // Prime / Dechlorinator dose (standard: 5ml per 50 gallons)
  const dechlorinatorDoseMl = ((totalSystemGallons / 50) * 5).toFixed(1);

  const applyPreset = (p: Preset) => {
    setShape(p.shape);
    if (unit === "imperial") {
      setLength(p.l);
      setWidth(p.w);
      setHeight(p.h);
      if (p.bowW) setBowWidth(p.bowW);
    } else {
      setLength(Math.round(p.l * inchToCm));
      setWidth(Math.round(p.w * inchToCm));
      setHeight(Math.round(p.h * inchToCm));
      if (p.bowW) setBowWidth(Math.round(p.bowW * inchToCm));
    }
  };

  return (
    <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-6 pb-4 border-b-2 border-brand-espresso/20">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-pill flex-shrink-0 aspect-square mt-0.5">
            <Waves className="w-5 h-5 text-brand-espresso flex-shrink-0" />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading text-lg sm:text-2xl font-black text-brand-espresso leading-snug">
              Aquarium Volume & Water Change Calculator
            </h3>
            <p className="text-xs sm:text-sm text-brand-taupe font-sans font-medium mt-1 leading-normal">
              Aquatic Gardeners Association (AGA) & OATA High-Tech Planted Protocol
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[10px] sm:text-xs font-mono font-black uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex-shrink-0">
          AGA Verified
        </span>
      </div>

      {/* Preset Bar */}
      <div className="mb-6 p-4 rounded-2xl bg-white border-2 border-brand-espresso shadow-paper-sm">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-mono font-bold uppercase text-brand-espresso flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
            Aquascaping Presets:
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
          {AQUASCAPE_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 rounded-xl border-1.5 border-brand-espresso bg-[#FAF4EE] text-xs font-heading font-bold text-brand-espresso hover:bg-brand-olive transition-all shadow-[1.5px_1.5px_0px_#583D32]"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Shape Selector */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-brand-espresso mb-1">
              Aquarium Tank Geometry
            </label>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value as TankShape)}
              className="w-full bg-white border-2 border-brand-espresso rounded-xl px-3 py-2 text-xs sm:text-sm font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none focus:border-brand-terracotta cursor-pointer"
            >
              <option value="rectangular">Standard Rectangular (Rimless or Framed)</option>
              <option value="cube">Rimless Cube</option>
              <option value="bowfront">Bowfront Curved</option>
              <option value="hexagon">Hexagon Pillar</option>
            </select>
          </div>

          {/* Dimensions */}
          <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 sm:p-5 shadow-paper-sm space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-brand-taupe tracking-wider border-b border-brand-espresso/15 pb-1">
              External Tank Dimensions ({unit === "imperial" ? "Inches" : "CM"})
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-brand-espresso mb-1">
                  Length
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

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-brand-espresso mb-1">
                  Width (Depth)
                </label>
                <input
                  type="number"
                  min="4"
                  max="300"
                  disabled={shape === "cube"}
                  value={shape === "cube" ? length : width}
                  onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-xl px-3 py-2 text-xs sm:text-sm font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none disabled:opacity-50"
                />
              </div>

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
          </div>

          {/* Hardscape & Substrate Displacement */}
          <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 sm:p-5 shadow-paper-sm space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-brand-taupe tracking-wider border-b border-brand-espresso/15 pb-1">
              Aquascape Hardscape & Substrate Displacement
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-brand-espresso">
                    Substrate Bed
                  </label>
                  <span className="text-[11px] font-mono font-black text-brand-terracotta">
                    {substrateThickness} {unit === "imperial" ? "in" : "cm"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={unit === "imperial" ? 4 : 10}
                  step="0.5"
                  value={substrateThickness}
                  onChange={(e) => setSubstrateThickness(Number(e.target.value))}
                  className="w-full accent-brand-terracotta cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-brand-espresso">
                    Hardscape Rock / Wood
                  </label>
                  <span className="text-[11px] font-mono font-black text-brand-terracotta">
                    {hardscapeWeightLbs} lbs
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="5"
                  value={hardscapeWeightLbs}
                  onChange={(e) => setHardscapeWeightLbs(Number(e.target.value))}
                  className="w-full accent-brand-terracotta cursor-pointer"
                />
              </div>
            </div>

            {/* Sump Filter Chamber Checkbox */}
            <div className="pt-2 border-t border-brand-espresso/10">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSump}
                  onChange={(e) => setHasSump(e.target.checked)}
                  className="w-4 h-4 accent-brand-espresso rounded"
                />
                <span className="text-xs font-heading font-black text-brand-espresso">
                  Include Sump Chamber / Refugium Volume
                </span>
              </label>

              {hasSump && (
                <div className="mt-2.5 flex items-center gap-3">
                  <label className="text-xs font-mono font-bold text-brand-taupe uppercase">
                    Operating Sump Water:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={sumpGallons}
                    onChange={(e) => setSumpGallons(Math.max(1, Number(e.target.value)))}
                    className="w-24 bg-[#FAF4EE] border-2 border-brand-espresso rounded-xl px-2.5 py-1 text-xs font-heading font-black text-brand-espresso shadow-paper-sm"
                  />
                  <span className="text-xs font-mono text-brand-taupe">Gallons</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 bg-white border-2 border-brand-espresso rounded-3xl p-6 shadow-paper flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-brand-espresso">
              <span className="text-xs font-mono font-bold uppercase text-brand-taupe tracking-wider">
                Total System Water Volume
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-brand-espresso/20 uppercase">
                Plant & Reef Safe
              </span>
            </div>

            {/* Big Water Volume Display */}
            <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-2xl p-4 sm:p-5 shadow-paper-sm">
              <div className="text-[11px] font-mono font-bold uppercase text-brand-taupe mb-1">
                Net Circulating Water Volume
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-4xl sm:text-5xl font-black text-brand-terracotta">
                  {totalSystemGallons.toFixed(1)}
                </span>
                <span className="font-heading font-black text-xl text-brand-espresso">
                  Gallons
                </span>
                <span className="text-sm font-mono font-bold text-brand-taupe ml-2">
                  ({totalSystemLiters.toFixed(1)} L)
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-brand-espresso/15 flex items-center justify-between text-xs font-mono text-brand-taupe">
                <span>Display Tank Gross: <strong>{grossGallons.toFixed(1)} Gal</strong></span>
                <span>Hardscape Displaced: <strong>~{rockDisplacementGal.toFixed(1)} Gal</strong></span>
              </div>
            </div>

            {/* Weekly Water Change Dosage Matrix */}
            <div className="bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-brand-espresso flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-sky-600" />
                  Water Change Schedules:
                </span>
                <span className="text-[10px] font-mono font-bold text-brand-taupe">
                  ~{bucketsFor20Percent} × 5-Gallon Buckets (for 20%)
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white rounded-xl p-2 border border-brand-espresso/20 shadow-sm">
                  <div className="text-[10px] font-mono text-brand-taupe font-bold">10% Light</div>
                  <div className="font-heading font-black text-sm text-brand-espresso">{change10Gal}G</div>
                </div>
                <div className="bg-white rounded-xl p-2 border-2 border-brand-terracotta shadow-sm bg-orange-50/30">
                  <div className="text-[10px] font-mono text-brand-terracotta font-bold">20% Normal</div>
                  <div className="font-heading font-black text-sm text-brand-terracotta">{change20Gal}G</div>
                </div>
                <div className="bg-white rounded-xl p-2 border border-brand-espresso/20 shadow-sm">
                  <div className="text-[10px] font-mono text-brand-taupe font-bold">30% High</div>
                  <div className="font-heading font-black text-sm text-brand-espresso">{change30Gal}G</div>
                </div>
                <div className="bg-white rounded-xl p-2 border border-brand-espresso/20 shadow-sm">
                  <div className="text-[10px] font-mono text-brand-taupe font-bold">50% Reset</div>
                  <div className="font-heading font-black text-sm text-brand-espresso">{change50Gal}G</div>
                </div>
              </div>

              {/* Water Conditioner Dose */}
              <div className="pt-1 flex items-center justify-between text-xs font-mono text-brand-espresso">
                <span>Dechlorinator / Water Conditioner Dose:</span>
                <strong className="text-brand-terracotta">{dechlorinatorDoseMl} mL</strong>
              </div>
            </div>

            {/* Planted Tank Light & CO2 Guide */}
            <div className="bg-emerald-50/50 border-2 border-emerald-600/40 rounded-2xl p-4 shadow-paper-sm space-y-1.5 text-xs text-emerald-950 font-sans">
              <div className="flex items-center gap-1.5 font-heading font-black text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Fertilizer & Liquid Carbon Calibration</span>
              </div>
              <p className="leading-relaxed">
                When dosing All-In-One liquid fertilizers (Thrive, Tropica, Easy Green) or pressurized CO2, always calculate against your <strong>net water volume ({totalSystemGallons.toFixed(1)} gallons)</strong> rather than gross tank size to prevent toxic overdose.
              </p>
            </div>
          </div>

          {/* Reset Action */}
          <div className="pt-2 flex items-center justify-between border-t border-brand-espresso/15 text-xs font-mono text-brand-taupe">
            <span>Aquascaping displacement model: <strong>Active</strong></span>
            <button
              type="button"
              onClick={() => {
                setLength(36);
                setWidth(18);
                setHeight(18);
                setRimGap(1.0);
                setSubstrateThickness(2.0);
                setHardscapeWeightLbs(30);
                setHasSump(false);
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
