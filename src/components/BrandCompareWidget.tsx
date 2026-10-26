"use client";

import React, { useState } from "react";
import { Scale, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

interface BrandProfile {
  name: string;
  grade: string;
  recalls: number;
  plants: string;
  sourcing: string;
  testing: string;
  parent: string;
  isHighRisk: boolean;
}

const BRANDS_DATABASE: Record<string, BrandProfile> = {
  "blue-harvest": {
    name: "Blue Harvest / Blue Buffalo",
    grade: "GRADE B-",
    recalls: 2,
    plants: "Co-manufactured (US Facilities)",
    sourcing: "Domestic Meat + Imported Vitamins",
    testing: "Post-extrusion finished batch testing",
    parent: "Harvest Pet Holdings LLC",
    isHighRisk: true,
  },
  "hills": {
    name: "Hill's Science Diet",
    grade: "GRADE A",
    recalls: 1,
    plants: "Company-owned facilities (Kansas, Kentucky)",
    sourcing: "North American & European Sourcing",
    testing: "Rigorous ISO-17025 certified laboratory",
    parent: "Colgate-Palmolive",
    isHighRisk: false,
  },
  "canine-shield": {
    name: "Canine Shield Holistic",
    grade: "GRADE A+",
    recalls: 0,
    plants: "Single-source facility (Wisconsin)",
    sourcing: "100% US & Canadian Farmers",
    testing: "Triple-batch PCR release protocol",
    parent: "Independent / Private",
    isHighRisk: false,
  },
  "purina": {
    name: "Purina Pro Plan",
    grade: "GRADE A-",
    recalls: 2,
    plants: "Company-owned US facilities",
    sourcing: "Global & Domestic ingredient supply",
    testing: "Continuous automated optical sorting",
    parent: "Nestlé Purina PetCare",
    isHighRisk: false,
  },
};

export default function BrandCompareWidget() {
  const [brandA, setBrandA] = useState("blue-harvest");
  const [brandB, setBrandB] = useState("canine-shield");

  const dataA = BRANDS_DATABASE[brandA];
  const dataB = BRANDS_DATABASE[brandB];

  return (
    <div className="paper-box bg-[#FAF4EE] p-5 sm:p-8 rounded-3xl border-2.5 border-brand-espresso shadow-paper space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2.5 border-brand-espresso pb-4">
        <div>
          <span className="pill-badge pill-badge-verified text-xs mb-1.5">
            <Scale className="w-3.5 h-3.5" /> Side-by-Side Safety Comparison
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
            Compare Pet Food Brand Records
          </h3>
          <p className="text-xs sm:text-sm text-brand-taupe font-medium mt-1">
            Compare manufacturing transparency, recall frequency, and inspection grades side by side:
          </p>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
        <div>
          <label className="block font-heading font-black uppercase text-brand-espresso mb-1.5">
            Select Brand 1:
          </label>
          <select
            value={brandA}
            onChange={(e) => setBrandA(e.target.value)}
            className="w-full px-4 py-2.5 bg-brand-cream border-2 border-brand-espresso rounded-full font-bold text-brand-espresso focus:outline-none shadow-paper-sm"
          >
            {Object.entries(BRANDS_DATABASE).map(([key, b]) => (
              <option key={key} value={key}>
                {b.name} ({b.grade})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-heading font-black uppercase text-brand-espresso mb-1.5">
            Select Brand 2:
          </label>
          <select
            value={brandB}
            onChange={(e) => setBrandB(e.target.value)}
            className="w-full px-4 py-2.5 bg-brand-cream border-2 border-brand-espresso rounded-full font-bold text-brand-espresso focus:outline-none shadow-paper-sm"
          >
            {Object.entries(BRANDS_DATABASE).map(([key, b]) => (
              <option key={key} value={key}>
                {b.name} ({b.grade})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
        {/* Brand A Column */}
        <div className="p-5 rounded-3xl bg-brand-cream/60 border-2.5 border-brand-espresso shadow-paper-sm space-y-3.5">
          <div className="flex items-center justify-between border-b-2 border-brand-espresso/20 pb-3">
            <h4 className="font-heading font-black text-lg text-brand-espresso">{dataA.name}</h4>
            <span className={`pill-badge text-xs ${dataA.isHighRisk ? "pill-badge-alert" : "pill-badge-verified"}`}>
              {dataA.grade}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-brand-espresso/15">
              <span className="text-brand-taupe font-bold">Lifetime Recalls:</span>
              <span className="font-mono font-black text-brand-espresso">{dataA.recalls} Events</span>
            </div>
            <div className="flex justify-between py-1 border-b border-brand-espresso/15">
              <span className="text-brand-taupe font-bold">Manufacturing:</span>
              <span className="font-medium text-brand-espresso text-right">{dataA.plants}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-brand-espresso/15">
              <span className="text-brand-taupe font-bold">Ingredient Sourcing:</span>
              <span className="font-medium text-brand-espresso text-right">{dataA.sourcing}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-brand-espresso/15">
              <span className="text-brand-taupe font-bold">Parent Company:</span>
              <span className="font-medium text-brand-espresso text-right">{dataA.parent}</span>
            </div>
          </div>
        </div>

        {/* Brand B Column */}
        <div className="p-5 rounded-3xl bg-brand-cream/60 border-2.5 border-brand-espresso shadow-paper-sm space-y-3.5">
          <div className="flex items-center justify-between border-b-2 border-brand-espresso/20 pb-3">
            <h4 className="font-heading font-black text-lg text-brand-espresso">{dataB.name}</h4>
            <span className={`pill-badge text-xs ${dataB.isHighRisk ? "pill-badge-alert" : "pill-badge-verified"}`}>
              {dataB.grade}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-brand-espresso/15">
              <span className="text-brand-taupe font-bold">Lifetime Recalls:</span>
              <span className="font-mono font-black text-brand-espresso">{dataB.recalls} Events</span>
            </div>
            <div className="flex justify-between py-1 border-b border-brand-espresso/15">
              <span className="text-brand-taupe font-bold">Manufacturing:</span>
              <span className="font-medium text-brand-espresso text-right">{dataB.plants}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-brand-espresso/15">
              <span className="text-brand-taupe font-bold">Ingredient Sourcing:</span>
              <span className="font-medium text-brand-espresso text-right">{dataB.sourcing}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-brand-espresso/15">
              <span className="text-brand-taupe font-bold">Parent Company:</span>
              <span className="font-medium text-brand-espresso text-right">{dataB.parent}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
