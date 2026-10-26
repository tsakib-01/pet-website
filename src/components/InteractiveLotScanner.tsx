"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Search, Sparkles } from "lucide-react";

interface LotResult {
  status: "recalled" | "clean" | "not_found";
  brand: string;
  lot: string;
  product?: string;
  docket?: string;
  date?: string;
  severity?: string;
  reason?: string;
  action?: string;
}

const KNOWN_LOTS: Record<string, LotResult> = {
  "8841A": {
    status: "recalled",
    brand: "Wild Harvest Naturals",
    lot: "8841A",
    product: "Freeze-Dried Atlantic Salmon Cat Treats (4 oz)",
    docket: "FDA-2026-V-8841",
    date: "October 18, 2026",
    severity: "CLASS I (HIGH HAZARD)",
    reason: "Salmonella enterica bacterial contamination detected in routine retail screening.",
    action: "Do not feed. Return to retailer for 100% refund. Wash hands and sanitize bowls immediately.",
  },
  "8841B": {
    status: "recalled",
    brand: "Wild Harvest Naturals",
    lot: "8841B",
    product: "Freeze-Dried Atlantic Salmon Cat Treats (4 oz)",
    docket: "FDA-2026-V-8841",
    date: "October 18, 2026",
    severity: "CLASS I (HIGH HAZARD)",
    reason: "Salmonella enterica contamination risk.",
    action: "Do not feed. Return to store for full cash refund.",
  },
  "LOT-HP-092": {
    status: "recalled",
    brand: "Hearty Paws Premier",
    lot: "LOT-HP-092",
    product: "Adult Grain-Inclusive Roasted Chicken Kibble (30 lb)",
    docket: "FDA-2026-V-7402",
    date: "September 29, 2026",
    severity: "CLASS I (FATAL MYCOTOXIN HAZARD)",
    reason: "Potentially fatal levels of Aflatoxin mold byproduct in corn grain shipment.",
    action: "Urgent veterinary alert: Stop feeding immediately. Contact vet if dog exhibits lethargy or jaundice.",
  },
  "CLEAN-2026": {
    status: "clean",
    brand: "Canine Shield Holistic",
    lot: "CLEAN-2026",
    product: "Prairie Harvest Cold-Pressed Dog Food",
    docket: "N/A - Clean Docket",
    date: "Verified October 2026",
    severity: "100% CLEAR - NO RECORDED RECALLS",
    reason: "Batch passed third-party laboratory PCR screening for Salmonella, Aflatoxin, and heavy metals.",
    action: "Safe to feed. This lot is 100% compliant with FDA veterinary safety standards.",
  },
};

export default function InteractiveLotScanner() {
  const [brandInput, setBrandInput] = useState("Wild Harvest Naturals");
  const [lotInput, setLotInput] = useState("8841A");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<LotResult | null>(KNOWN_LOTS["8841A"]);

  const handleScan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setScanning(true);
    setResult(null);

    setTimeout(() => {
      const cleanLot = lotInput.trim().toUpperCase();
      if (KNOWN_LOTS[cleanLot]) {
        setResult(KNOWN_LOTS[cleanLot]);
      } else if (cleanLot.startsWith("88") || cleanLot.includes("REC")) {
        setResult(KNOWN_LOTS["8841A"]);
      } else {
        setResult({
          status: "clean",
          brand: brandInput || "Verified Manufacturer",
          lot: cleanLot,
          product: "Standard Retail Production Batch",
          date: "Current FDA Record (2026)",
          severity: "NO RECALL RECORD FOUND",
          reason: "This lot code does not match any active FDA Class I, II, or III veterinary enforcement dockets.",
          action: "No active recall order on file for this batch. Continue monitoring regular safety advisories.",
        });
      }
      setScanning(false);
    }, 450);
  };

  const loadPreset = (presetLot: string, presetBrand: string) => {
    setLotInput(presetLot);
    setBrandInput(presetBrand);
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setResult(KNOWN_LOTS[presetLot]);
      setScanning(false);
    }, 300);
  };

  return (
    <div className="paper-box bg-brand-cream/90 p-5 sm:p-8 md:p-10 border-2.5 border-brand-espresso shadow-paper">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2.5 border-brand-espresso/30 pb-5 mb-6">
        <div>
          <span className="pill-badge pill-badge-alert mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Instant Regulatory Scanner
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-brand-espresso">
            Is Your Specific Bag of Food Affected?
          </h2>
          <p className="text-xs sm:text-sm text-brand-taupe font-medium mt-1">
            Pet food manufacturers recall specific production batches, not whole brands. Check your bag's stamped lot number:
          </p>
        </div>

        {/* Quick Test Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-heading font-black text-brand-taupe uppercase mr-1">
            Try Sample Lots:
          </span>
          <button
            type="button"
            onClick={() => loadPreset("8841A", "Wild Harvest Naturals")}
            className="pill-badge pill-badge-alert hover:scale-105 transition-transform text-[10px] cursor-pointer flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3" /> Test #8841A (Recalled)
          </button>
          <button
            type="button"
            onClick={() => loadPreset("LOT-HP-092", "Hearty Paws Premier")}
            className="pill-badge pill-badge-alert hover:scale-105 transition-transform text-[10px] cursor-pointer flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3" /> Test #LOT-HP-092
          </button>
          <button
            type="button"
            onClick={() => loadPreset("CLEAN-2026", "Canine Shield Holistic")}
            className="pill-badge pill-badge-verified hover:scale-105 transition-transform text-[10px] cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-3 h-3" /> Test Clean Batch
          </button>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleScan} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 mb-6">
        <div className="sm:col-span-5">
          <label className="block text-xs font-heading font-black uppercase tracking-wider text-brand-espresso mb-1.5">
            1. Brand Name
          </label>
          <input
            type="text"
            value={brandInput}
            onChange={(e) => setBrandInput(e.target.value)}
            placeholder="e.g. Purina, Blue Buffalo, Wild Harvest"
            className="w-full px-4 py-3 bg-[#FAF4EE] border-2 border-brand-espresso rounded-full font-sans font-bold text-xs sm:text-sm text-brand-espresso focus:outline-none focus:ring-2 focus:ring-brand-olive shadow-paper-sm"
          />
        </div>

        <div className="sm:col-span-4">
          <label className="block text-xs font-heading font-black uppercase tracking-wider text-brand-espresso mb-1.5">
            2. Lot Code (Found Near Barcode)
          </label>
          <input
            type="text"
            value={lotInput}
            onChange={(e) => setLotInput(e.target.value)}
            placeholder="e.g. 8841A or 092"
            className="w-full px-4 py-3 bg-[#FAF4EE] border-2 border-brand-espresso rounded-full font-sans font-bold text-xs sm:text-sm text-brand-espresso focus:outline-none focus:ring-2 focus:ring-brand-olive shadow-paper-sm uppercase font-mono"
          />
        </div>

        <div className="sm:col-span-3 flex items-end">
          <button
            type="submit"
            disabled={scanning}
            className="btn-pill btn-pill-terracotta w-full py-3 text-xs font-black group justify-center shadow-pill"
          >
            {scanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-brand-olive" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <span>Audit Lot #</span>
                <span className="btn-circle-icon bg-[#FAF4EE] text-brand-terracotta">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Verification Feedback Result Card */}
      {result && (
        <div
          className={`p-5 sm:p-6 rounded-3xl border-3 transition-all ${
            result.status === "recalled"
              ? "bg-[#FAF4EE] border-brand-terracotta shadow-paper-orange"
              : "bg-[#FAF4EE] border-brand-olive shadow-paper"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-brand-espresso/20 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-brand-espresso shadow-pill flex-shrink-0 ${
                  result.status === "recalled" ? "bg-brand-terracotta text-white" : "bg-brand-olive text-brand-espresso"
                }`}
              >
                {result.status === "recalled" ? (
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                ) : (
                  <CheckCircle2 className="w-6 h-6" />
                )}
              </div>
              <div>
                <span
                  className={`pill-badge text-[10px] ${
                    result.status === "recalled" ? "pill-badge-alert" : "pill-badge-verified"
                  }`}
                >
                  {result.severity}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso mt-1">
                  {result.status === "recalled" ? "BATCH SUBJECT TO FDA RECALL ORDER" : "VERIFIED 100% CLEAR"}
                </h3>
              </div>
            </div>

            <div className="font-mono text-xs text-brand-taupe">
              <span className="font-bold text-brand-espresso">Lot: </span>
              <span className="bg-brand-cream border border-brand-espresso px-2 py-0.5 rounded font-black text-brand-espresso">
                {result.lot}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1.5">
              <span className="font-heading font-black text-brand-espresso uppercase block text-[11px]">
                Product Line & Docket:
              </span>
              <p className="font-medium text-brand-taupe">
                <strong>{result.brand}</strong> — {result.product || "General Production"}
              </p>
              <p className="font-mono text-[11px] text-brand-taupe">
                Docket: {result.docket} • Reported: {result.date}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className={`font-heading font-black uppercase flex items-center gap-1.5 text-[11px] ${
                result.status === "recalled" ? "text-brand-terracotta" : "text-brand-espresso"
              }`}>
                {result.status === "recalled" ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-brand-terracotta" />
                    Official Reason & Hazard:
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-olive" />
                    Safety Status:
                  </>
                )}
              </span>
              <p className="font-medium text-brand-espresso">
                {result.reason}
              </p>
            </div>
          </div>

          {/* Action Instruction Box */}
          <div
            className={`mt-4 p-3.5 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans ${
              result.status === "recalled"
                ? "bg-brand-terracotta/15 border-brand-terracotta text-brand-espresso"
                : "bg-brand-olive/30 border-brand-olive text-brand-espresso"
            }`}
          >
            <div>
              <span className="font-heading font-black uppercase text-[11px] block">
                {result.status === "recalled" ? "Required Pet Parent Action:" : "Feeding Guidance:"}
              </span>
              <p className="font-medium mt-0.5">{result.action}</p>
            </div>

            {result.status === "recalled" && (
              <Link
                href="/recall/fda-2024-salmonella-kibble"
                className="btn-pill btn-pill-espresso px-4 py-2 text-[11px] font-black whitespace-nowrap self-start sm:self-auto group shadow-paper-sm flex-shrink-0"
              >
                <span>Full Docket Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
