"use client";

import React, { useState } from "react";
import { Search, ShieldCheck, AlertTriangle, CheckCircle2, RotateCcw, Info, Hash } from "lucide-react";
import { RecallDocket } from "@/data/recalls";

interface Props {
  brandName: string;
  recalls: RecallDocket[];
}

export default function BrandLotChecker({ brandName, recalls }: Props) {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Flatten all affected lots for this brand
  const allAffectedItems: {
    lotCode: string;
    productName: string;
    docketNumber: string;
    hazardType: string;
    date: string;
    bestBy: string;
  }[] = [];

  recalls.forEach((recall) => {
    recall.affectedProducts.forEach((product) => {
      product.lotCodes.forEach((code) => {
        allAffectedItems.push({
          lotCode: code,
          productName: product.name,
          docketNumber: recall.docketNumber,
          hazardType: recall.hazardType,
          date: recall.date,
          bestBy: product.bestBy,
        });
      });
    });
  });

  const cleanedQuery = query.trim().toLowerCase();

  const matchedItems = cleanedQuery.length >= 2
    ? allAffectedItems.filter((item) =>
        item.lotCode.toLowerCase().includes(cleanedQuery) ||
        item.bestBy.toLowerCase().includes(cleanedQuery) ||
        item.productName.toLowerCase().includes(cleanedQuery)
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cleanedQuery.length >= 2) {
      setHasSearched(true);
    }
  };

  const handleReset = () => {
    setQuery("");
    setHasSearched(false);
  };

  return (
    <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-7 shadow-paper space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-light-gold/30 border-2 border-brand-espresso flex items-center justify-center flex-shrink-0 shadow-paper-sm">
            <Hash className="w-5 h-5 text-brand-espresso" />
          </div>
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso">
              Interactive &ldquo;Check My Bag&rdquo; Lot Code Inspector
            </h3>
            <p className="text-xs font-sans text-brand-taupe mt-0.5">
              Verify your specific kibble or canned {brandName} lot number against official FDA dockets.
            </p>
          </div>
        </div>

        {hasSearched && (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-mono font-bold text-brand-taupe hover:text-brand-espresso transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-brand-taupe absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim().length >= 2) {
                setHasSearched(true);
              } else {
                setHasSearched(false);
              }
            }}
            placeholder="Type your bag's lot number (e.g. 2249, 3125, or Best-By date)..."
            className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl pl-11 pr-24 py-3 text-xs sm:text-sm font-mono font-bold text-brand-espresso placeholder:text-brand-taupe/60 shadow-paper-sm focus:outline-none focus:border-brand-terracotta"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-brand-espresso text-brand-cream text-xs font-heading font-black shadow-paper-sm hover:bg-brand-espresso/90 transition-all"
          >
            Verify
          </button>
        </div>
        <p className="text-[11px] font-sans text-brand-taupe flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-brand-terracotta flex-shrink-0" />
          Lot numbers are typically printed on the back lower seam or bottom of dry kibble bags.
        </p>
      </form>

      {/* Verification Output Feedback */}
      {hasSearched && cleanedQuery.length >= 2 && (
        <div className="pt-2">
          {matchedItems.length > 0 ? (
            <div className="p-5 rounded-2xl bg-rose-50 border-2.5 border-rose-500 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-heading font-black text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <span>MATCH FOUND: Potential Recalled Lot Detected</span>
              </div>
              <p className="text-xs font-sans text-rose-900/80 leading-relaxed">
                Your search query matched one or more production batches in official FDA enforcement dockets for {brandName}.
                <strong> Stop feeding this product immediately.</strong>
              </p>
              <div className="space-y-2 pt-1">
                {matchedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-rose-300 text-xs font-mono text-brand-espresso space-y-1"
                  >
                    <div className="font-heading font-bold text-rose-950">{item.productName}</div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-brand-taupe">
                      <span><strong>Lot:</strong> {item.lotCode}</span>
                      <span>&bull;</span>
                      <span><strong>Best By:</strong> {item.bestBy}</span>
                      <span>&bull;</span>
                      <span className="text-rose-700 font-bold"><strong>Hazard:</strong> {item.hazardType}</span>
                    </div>
                    <div className="text-[10px] text-brand-taupe pt-0.5">
                      FDA Docket: <strong>{item.docketNumber}</strong> ({item.date})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs font-sans text-emerald-950 space-y-1">
                <div className="font-heading font-black text-sm text-emerald-900">
                  No Matching Recalls in FDA Records
                </div>
                <p className="text-emerald-900/80 leading-relaxed">
                  The sequence <strong>&ldquo;{query}&rdquo;</strong> does not match any documented Class I, II, or III FDA recall lots on file for {brandName}.
                  Always inspect kibble for freshness, odor, and proper moisture seal.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
