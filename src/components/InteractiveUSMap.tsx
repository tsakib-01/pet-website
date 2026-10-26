"use client";

import React, { useState } from "react";
import { MapPin, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

interface StateData {
  code: string;
  name: string;
  recalls: number;
  severity: "High" | "Moderate" | "Low";
  topIssue: string;
  isRecalledInSample?: boolean;
}

const US_STATES: StateData[] = [
  { code: "CA", name: "California", recalls: 28, severity: "High", topIssue: "Salmonella", isRecalledInSample: true },
  { code: "TX", name: "Texas", recalls: 24, severity: "High", topIssue: "Aflatoxin", isRecalledInSample: true },
  { code: "FL", name: "Florida", recalls: 19, severity: "High", topIssue: "Salmonella", isRecalledInSample: true },
  { code: "NY", name: "New York", recalls: 17, severity: "Moderate", topIssue: "Mold / Seal", isRecalledInSample: true },
  { code: "IL", name: "Illinois", recalls: 15, severity: "Moderate", topIssue: "Listeria", isRecalledInSample: true },
  { code: "OH", name: "Ohio", recalls: 14, severity: "Moderate", topIssue: "Vitamin D", isRecalledInSample: true },
  { code: "PA", name: "Pennsylvania", recalls: 13, severity: "Moderate", topIssue: "Salmonella", isRecalledInSample: true },
  { code: "GA", name: "Georgia", recalls: 12, severity: "Moderate", topIssue: "Aflatoxin", isRecalledInSample: true },
  { code: "NC", name: "North Carolina", recalls: 11, severity: "Moderate", topIssue: "Salmonella", isRecalledInSample: true },
  { code: "MI", name: "Michigan", recalls: 10, severity: "Low", topIssue: "Packaging Defect", isRecalledInSample: true },
  { code: "WA", name: "Washington", recalls: 9, severity: "Low", topIssue: "Salmonella", isRecalledInSample: true },
  { code: "CO", name: "Colorado", recalls: 8, severity: "Low", topIssue: "Foreign Material" },
  { code: "AZ", name: "Arizona", recalls: 8, severity: "Low", topIssue: "Salmonella", isRecalledInSample: true },
  { code: "TN", name: "Tennessee", recalls: 7, severity: "Low", topIssue: "Aflatoxin", isRecalledInSample: true },
  { code: "MO", name: "Missouri", recalls: 6, severity: "Low", topIssue: "Packaging Defect" },
  { code: "MN", name: "Minnesota", recalls: 5, severity: "Low", topIssue: "Salmonella" },
  { code: "VA", name: "Virginia", recalls: 5, severity: "Low", topIssue: "Salmonella", isRecalledInSample: true },
  { code: "IN", name: "Indiana", recalls: 5, severity: "Low", topIssue: "Thiamine Deficit", isRecalledInSample: true },
  { code: "WI", name: "Wisconsin", recalls: 4, severity: "Low", topIssue: "Mold" },
  { code: "OR", name: "Oregon", recalls: 4, severity: "Low", topIssue: "Salmonella" },
];

export default function InteractiveUSMap() {
  const [selectedState, setSelectedState] = useState<StateData>(US_STATES[0]);

  return (
    <div className="paper-box bg-[#FAF4EE] p-5 sm:p-8 rounded-3xl border-2.5 border-brand-espresso shadow-paper">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2.5 border-brand-espresso pb-4 mb-6">
        <div>
          <span className="pill-badge pill-badge-alert text-xs mb-1.5">
            <MapPin className="w-3.5 h-3.5" /> Geographic Distribution Heatmap
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
            US State Veterinary Alert Matrix
          </h3>
          <p className="text-xs sm:text-sm text-brand-taupe font-medium mt-1">
            Click any state badge to inspect active FDA recall volume, affected lots, and dominant contaminants:
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[11px]">
          <span className="flex items-center gap-1.5 font-bold text-brand-espresso">
            <span className="w-3 h-3 rounded-full bg-brand-terracotta border border-brand-espresso"></span> High Alert
          </span>
          <span className="flex items-center gap-1.5 font-bold text-brand-espresso">
            <span className="w-3 h-3 rounded-full bg-brand-olive border border-brand-espresso"></span> Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive State Badges Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 font-mono text-xs">
            {US_STATES.map((st) => {
              const isSelected = selectedState.code === st.code;
              return (
                <button
                  key={st.code}
                  type="button"
                  onClick={() => setSelectedState(st)}
                  className={`p-2.5 sm:p-3 rounded-2xl border-2 font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                    isSelected
                      ? "bg-brand-espresso text-brand-cream border-brand-espresso shadow-pill scale-105"
                      : st.severity === "High"
                      ? "bg-brand-terracotta/15 hover:bg-brand-terracotta hover:text-white border-brand-terracotta text-brand-espresso shadow-paper-sm"
                      : "bg-brand-cream/60 hover:bg-brand-olive border-brand-espresso/30 text-brand-espresso shadow-paper-sm"
                  }`}
                >
                  <span className="font-heading font-black text-base sm:text-lg">{st.code}</span>
                  <span className="text-[10px] mt-0.5 opacity-90">{st.recalls} alerts</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected State Detail Card */}
        <div className="lg:col-span-4">
          <div className="p-5 rounded-3xl bg-brand-cream/70 border-2.5 border-brand-espresso shadow-paper-sm space-y-4">
            <div className="flex items-center justify-between border-b-2 border-brand-espresso/20 pb-3">
              <div>
                <span className="text-[10px] font-mono text-brand-taupe uppercase font-bold">State Dossier</span>
                <h4 className="font-heading text-2xl font-black text-brand-espresso">
                  {selectedState.name} ({selectedState.code})
                </h4>
              </div>
              <span
                className={`pill-badge text-[10px] ${
                  selectedState.severity === "High" ? "pill-badge-alert" : "pill-badge-verified"
                }`}
              >
                {selectedState.severity} Priority
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="flex items-center justify-between p-2.5 bg-[#FAF4EE] rounded-xl border border-brand-espresso/20">
                <span className="font-bold text-brand-taupe">Total FDA Alerts:</span>
                <span className="font-heading font-black text-sm text-brand-terracotta">{selectedState.recalls} Dockets</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FAF4EE] rounded-xl border border-brand-espresso/20">
                <span className="font-bold text-brand-taupe">Top Contaminant:</span>
                <span className="font-heading font-bold text-sm text-brand-espresso">{selectedState.topIssue}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FAF4EE] rounded-xl border border-brand-espresso/20">
                <span className="font-bold text-brand-taupe">Active Recall Status:</span>
                <span className="font-mono text-xs font-bold flex items-center gap-1">
                  {selectedState.isRecalledInSample ? (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-brand-terracotta" />
                      <span className="text-brand-terracotta">Included in Oct 2026 Alert</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-olive" />
                      <span className="text-brand-espresso">No New 2026 Alerts</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            <Link
              href={`/state/${selectedState.code === "CA" ? "california" : selectedState.code === "TX" ? "texas" : "florida"}`}
              className="btn-pill btn-pill-espresso w-full py-2.5 text-xs font-black group text-center shadow-paper-sm justify-center"
            >
              <span>View {selectedState.name} Registry ({selectedState.code})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
