"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandSafetyProfile } from "@/data/recalls";
import { HISTORICAL_FDA_TIMELINE, HistoricalDocketEntry } from "@/data/historicalTimeline";
import BrandLogo from "./BrandLogo";
import {
  Search,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  PawPrint,
  Building2,
  Calendar,
  ExternalLink,
  History,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertOctagon,
} from "lucide-react";

interface Props {
  brands: BrandSafetyProfile[];
}

export default function RecallDirectoryClient({ brands }: Props) {
  const [activeTab, setActiveTab] = useState<"brands" | "timeline">("brands");
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState<"all" | "clean" | "recalls" | "dog" | "cat">("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Filtered Brands for "brands" tab
  const filteredBrands = brands.filter((brand) => {
    if (brandFilter === "clean" && brand.totalRecallsCount > 0) return false;
    if (brandFilter === "recalls" && brand.totalRecallsCount === 0) return false;
    if (brandFilter === "dog" && brand.species === "cat") return false;
    if (brandFilter === "cat" && brand.species === "dog") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        brand.name.toLowerCase().includes(q) ||
        brand.parentCompany.toLowerCase().includes(q) ||
        brand.headquarters.toLowerCase().includes(q) ||
        brand.recalls.some(
          (r) =>
            r.hazardType.toLowerCase().includes(q) ||
            r.docketNumber.toLowerCase().includes(q) ||
            r.affectedProducts.some(
              (p) => p.name.toLowerCase().includes(q) || p.lotCodes.some((l) => l.toLowerCase().includes(q))
            )
        )
      );
    }
    return true;
  });

  // Filtered Historical Dockets for "timeline" tab
  const filteredTimeline = HISTORICAL_FDA_TIMELINE.filter((docket) => {
    // Year filter
    if (selectedYear !== "all") {
      if (selectedYear === "2009-2011") {
        if (docket.year > 2011) return false;
      } else {
        if (docket.year !== parseInt(selectedYear, 10)) return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        docket.brandName.toLowerCase().includes(q) ||
        docket.companyName.toLowerCase().includes(q) ||
        docket.productDescription.toLowerCase().includes(q) ||
        docket.hazardType.toLowerCase().includes(q) ||
        docket.reason.toLowerCase().includes(q) ||
        docket.classification.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalBrandsCount = brands.length;
  const cleanCount = brands.filter((b) => b.totalRecallsCount === 0).length;
  const recallCount = brands.filter((b) => b.totalRecallsCount > 0).length;
  const brandSlugsSet = new Set(brands.map((b) => b.slug));

  return (
    <div className="space-y-8">
      {/* =========================================================================
          VIEW MODE TOGGLE: BRANDS DIRECTORY VS CHRONOLOGICAL ARCHIVE
          ========================================================================= */}
      <div className="bg-brand-cream/60 border-2.5 border-brand-espresso rounded-3xl p-2.5 shadow-paper flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab("brands");
              setSearchQuery("");
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-heading font-black text-xs sm:text-sm border-2 transition-all ${
              activeTab === "brands"
                ? "bg-brand-espresso text-white border-brand-espresso shadow-paper-sm"
                : "bg-white text-brand-espresso border-brand-espresso/20 hover:border-brand-espresso"
            }`}
          >
            <Building2 className="w-4 h-4 text-brand-leaf" />
            <span>Brand Safety Profiles ({totalBrandsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("timeline");
              setSearchQuery("");
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-heading font-black text-xs sm:text-sm border-2 transition-all ${
              activeTab === "timeline"
                ? "bg-brand-espresso text-white border-brand-espresso shadow-paper-sm"
                : "bg-white text-brand-espresso border-brand-espresso/20 hover:border-brand-espresso"
            }`}
          >
            <History className="w-4 h-4 text-brand-terracotta" />
            <span>FDA Historical Archive (2009–2026)</span>
            <span className="px-1.5 py-0.5 rounded-md bg-brand-terracotta text-white text-[10px] font-mono font-bold">
              NEW
            </span>
          </button>
        </div>

        <div className="text-xs font-mono font-bold text-brand-taupe px-3 text-center sm:text-right">
          {activeTab === "brands" ? (
            <>
              Showing <strong>{filteredBrands.length}</strong> Brands
            </>
          ) : (
            <>
              Showing <strong>{filteredTimeline.length}</strong> FDA Dockets
            </>
          )}
        </div>
      </div>

      {/* =========================================================================
          CONTROLS: SEARCH & FILTERS
          ========================================================================= */}
      <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-5 sm:p-6 shadow-paper space-y-4">
        {/* Search Box */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-brand-taupe absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === "brands"
                ? "Search 250+ brands, lot numbers, or food lines (e.g. Purina, Victor, Fromm)..."
                : "Search historical archive by hazard, brand, or docket (e.g. Salmonella, Aflatoxin, metal, 2026)..."
            }
            className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl pl-11 pr-4 py-2.5 text-xs sm:text-sm font-heading font-bold text-brand-espresso placeholder:text-brand-taupe/60 shadow-paper-sm focus:outline-none focus:border-brand-terracotta"
          />
        </div>

        {/* Filter Pills: Switch according to Tab */}
        {activeTab === "brands" ? (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-brand-espresso/10">
            {[
              { id: "all", label: `All Brands (${totalBrandsCount})` },
              { id: "clean", label: `Clean Record (${cleanCount})` },
              { id: "recalls", label: `Recalls on File (${recallCount})` },
              { id: "dog", label: "Dog Foods" },
              { id: "cat", label: "Cat Foods" },
            ].map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setBrandFilter(pill.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-black border-2 transition-all ${
                  brandFilter === pill.id
                    ? "bg-brand-espresso text-white border-brand-espresso shadow-paper-sm"
                    : "bg-[#FAF4EE] text-brand-espresso border-brand-espresso/25 hover:border-brand-espresso"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-brand-espresso/10">
            <span className="text-xs font-mono font-bold text-brand-taupe mr-1">Filter by Year:</span>
            {[
              { id: "all", label: "All Years" },
              { id: "2026", label: "2026 (Latest)" },
              { id: "2024", label: "2024" },
              { id: "2023", label: "2023" },
              { id: "2021", label: "2021" },
              { id: "2020", label: "2020" },
              { id: "2019", label: "2019" },
              { id: "2018", label: "2018" },
              { id: "2017", label: "2017" },
              { id: "2016", label: "2016" },
              { id: "2015", label: "2015" },
              { id: "2014", label: "2014" },
              { id: "2013", label: "2013" },
              { id: "2012", label: "2012" },
              { id: "2009-2011", label: "2009–2011" },
            ].map((yr) => (
              <button
                key={yr.id}
                type="button"
                onClick={() => setSelectedYear(yr.id)}
                className={`px-3 py-1 rounded-full text-xs font-heading font-black border-2 transition-all ${
                  selectedYear === yr.id
                    ? "bg-brand-terracotta text-white border-brand-espresso shadow-paper-sm"
                    : "bg-[#FAF4EE] text-brand-espresso border-brand-espresso/25 hover:border-brand-espresso"
                }`}
              >
                {yr.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          TAB 1: BRANDS GRID VIEW (250 Brands)
          ========================================================================= */}
      {activeTab === "brands" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brand/${brand.slug}`}
              className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 shadow-paper hover:shadow-paper-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full border ${
                      brand.safetyTier === "Clean / Verified Safe"
                        ? "bg-emerald-100 text-emerald-950 border-emerald-600"
                        : brand.safetyTier === "High Watch"
                        ? "bg-rose-100 text-rose-950 border-rose-500"
                        : "bg-amber-100 text-amber-950 border-amber-400"
                    }`}
                  >
                    {brand.safetyTier === "Clean / Verified Safe" ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-brand-terracotta flex-shrink-0" />
                    )}
                    <span>{brand.safetyTier}</span>
                  </span>

                  <span className="text-[11px] font-mono font-bold text-brand-taupe">
                    {brand.species === "both" ? "Dogs & Cats" : `${brand.species}s Only`}
                  </span>
                </div>

                {/* Brand Title Lockup with Official Logo */}
                <div className="flex items-center gap-3">
                  <BrandLogo domain={brand.websiteDomain} name={brand.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso group-hover:text-brand-terracotta transition-colors truncate">
                      {brand.name}
                    </h3>
                    <div className="text-xs font-mono text-brand-taupe flex items-center gap-1 mt-0.5 truncate">
                      <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{brand.parentCompany}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Summary Preview */}
                <p className="text-xs font-sans text-brand-taupe leading-relaxed line-clamp-2">
                  {brand.statusSummary}
                </p>

                {/* Mini Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-brand-espresso/10 text-xs font-mono">
                  <div className="p-2 bg-[#FAF4EE] rounded-xl border border-brand-espresso/10">
                    <div className="text-[10px] text-brand-taupe uppercase">Total Recalls</div>
                    <div className="font-heading font-black text-brand-espresso mt-0.5">
                      {brand.totalRecallsCount} {brand.totalRecallsCount === 1 ? "Event" : "Events"}
                    </div>
                  </div>

                  <div className="p-2 bg-[#FAF4EE] rounded-xl border border-brand-espresso/10">
                    <div className="text-[10px] text-brand-taupe uppercase">Last Incident</div>
                    <div className="font-heading font-bold text-xs text-brand-espresso mt-0.5 truncate">
                      {brand.lastRecallDate || "None on File"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Launch Bar */}
              <div className="pt-4 mt-4 border-t border-brand-espresso/10 flex items-center justify-between text-xs font-heading font-black text-brand-espresso group-hover:text-brand-terracotta transition-colors">
                <span>Inspect Safety Dossier</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* =========================================================================
          TAB 2: CHRONOLOGICAL FDA ARCHIVE TIMELINE (2009–2026)
          ========================================================================= */}
      {activeTab === "timeline" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-brand-olive/20 border-2 border-brand-espresso/15 flex items-center justify-between text-xs font-sans">
            <div className="flex items-center gap-2 text-brand-espresso font-heading font-bold">
              <History className="w-4 h-4 text-brand-terracotta" />
              <span>
                FDA Veterinary Enforcement Reports: Tracking 17 Years of Government Dockets (2009 – 2026)
              </span>
            </div>
            <span className="font-mono text-brand-taupe hidden sm:inline">
              Official Source: FDA Animal &amp; Veterinary Center
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredTimeline.map((docket) => (
              <div
                key={docket.id}
                className="bg-white border-2.5 border-brand-espresso rounded-3xl p-5 sm:p-6 shadow-paper space-y-4 hover:border-brand-terracotta transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-espresso/10">
                  <div className="flex items-center gap-3">
                    <BrandLogo domain={docket.domain} name={docket.brandName} size="sm" />
                    <div>
                      <div className="flex items-center gap-2">
                        {brandSlugsSet.has(docket.brandSlug) ? (
                          <Link
                            href={`/brand/${docket.brandSlug}`}
                            className="font-heading font-black text-base sm:text-lg text-brand-espresso hover:text-brand-terracotta transition-colors"
                          >
                            {docket.brandName}
                          </Link>
                        ) : (
                          <span className="font-heading font-black text-base sm:text-lg text-brand-espresso">
                            {docket.brandName}
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-cream border border-brand-espresso/20 text-brand-espresso">
                          {docket.companyName}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-brand-taupe flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-terracotta" />
                        <span>{docket.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Classification */}
                    <span
                      className={`text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full border ${
                        docket.classification === "Class I"
                          ? "bg-rose-100 text-rose-950 border-rose-500"
                          : "bg-amber-100 text-amber-950 border-amber-500"
                      }`}
                    >
                      {docket.classification}
                    </span>

                    {/* Hazard Pill */}
                    <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-full bg-brand-cream border border-brand-espresso/20 text-brand-espresso">
                      {docket.hazardType}
                    </span>

                    {/* Terminated Status */}
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                        docket.terminated
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                          : "bg-rose-50 text-rose-800 border border-rose-300 animate-pulse"
                      }`}
                    >
                      {docket.terminated ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Terminated
                        </>
                      ) : (
                        <>
                          <AlertOctagon className="w-3 h-3 text-rose-600" />
                          Active / Ongoing
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm font-sans">
                  <div className="font-heading font-black text-brand-espresso">
                    Affected Products:{" "}
                    <span className="font-normal text-brand-taupe">{docket.productDescription}</span>
                  </div>
                  <div className="text-brand-taupe leading-relaxed">
                    <strong className="text-brand-espresso font-heading">Official Reason:</strong> {docket.reason}
                  </div>
                </div>

                <div className="pt-3 border-t border-brand-espresso/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  {brandSlugsSet.has(docket.brandSlug) ? (
                    <Link
                      href={`/brand/${docket.brandSlug}`}
                      className="inline-flex items-center gap-1.5 font-heading font-bold text-brand-espresso hover:text-brand-terracotta transition-colors"
                    >
                      <span>View Brand Safety Profile &amp; Check Lot Code</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <a
                      href={docket.fdaNoticeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-heading font-bold text-brand-espresso hover:text-brand-terracotta transition-colors"
                    >
                      <span>View Official FDA Enforcement Docket</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {docket.fdaNoticeUrl && (
                    <a
                      href={docket.fdaNoticeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-brand-taupe hover:text-brand-espresso underline transition-colors"
                    >
                      <span>FDA Notice Record</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {((activeTab === "brands" && filteredBrands.length === 0) ||
        (activeTab === "timeline" && filteredTimeline.length === 0)) && (
        <div className="text-center py-12 bg-white rounded-3xl border-2.5 border-brand-espresso p-8 shadow-paper space-y-3">
          <PawPrint className="w-10 h-10 text-brand-taupe mx-auto" />
          <h3 className="font-heading text-lg font-black text-brand-espresso">
            No Records Found Matching &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="text-xs font-sans text-brand-taupe max-w-md mx-auto">
            Try adjusting your search terms or year filter.
          </p>
        </div>
      )}
    </div>
  );
}
