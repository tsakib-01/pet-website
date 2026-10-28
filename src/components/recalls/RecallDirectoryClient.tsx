"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandSafetyProfile } from "@/data/recalls";
import BrandLogo from "./BrandLogo";
import {
  Search,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Dog,
  Cat,
  PawPrint,
  CheckCircle2,
  Building2,
  Calendar,
} from "lucide-react";

interface Props {
  brands: BrandSafetyProfile[];
}

export default function RecallDirectoryClient({ brands }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "clean" | "recalls" | "dog" | "cat">("all");

  const filteredBrands = brands.filter((brand) => {
    // Filter pills
    if (filter === "clean" && brand.totalRecallsCount > 0) return false;
    if (filter === "recalls" && brand.totalRecallsCount === 0) return false;
    if (filter === "dog" && brand.species === "cat") return false;
    if (filter === "cat" && brand.species === "dog") return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        brand.name.toLowerCase().includes(q) ||
        brand.parentCompany.toLowerCase().includes(q) ||
        brand.headquarters.toLowerCase().includes(q) ||
        brand.recalls.some((r) =>
          r.hazardType.toLowerCase().includes(q) ||
          r.docketNumber.toLowerCase().includes(q) ||
          r.affectedProducts.some((p) => p.name.toLowerCase().includes(q) || p.lotCodes.some((l) => l.toLowerCase().includes(q)))
        )
      );
    }
    return true;
  });

  const totalBrandsCount = brands.length;
  const cleanCount = brands.filter((b) => b.totalRecallsCount === 0).length;
  const recallCount = brands.filter((b) => b.totalRecallsCount > 0).length;

  return (
    <div className="space-y-8">
      {/* Search Bar & Filters Controls */}
      <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-5 sm:p-6 shadow-paper space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-brand-taupe absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 250+ brands, lot numbers, or food lines (e.g. Purina, Victor, 2249)..."
              className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl pl-11 pr-4 py-2.5 text-xs sm:text-sm font-heading font-bold text-brand-espresso placeholder:text-brand-taupe/60 shadow-paper-sm focus:outline-none focus:border-brand-terracotta"
            />
          </div>

          {/* Result Counter */}
          <div className="text-xs font-mono font-bold text-brand-taupe whitespace-nowrap">
            Showing <strong className="text-brand-espresso">{filteredBrands.length}</strong> of {totalBrandsCount} Brands
          </div>
        </div>

        {/* Filter Badges */}
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
              onClick={() => setFilter(pill.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-black border-2 transition-all ${
                filter === pill.id
                  ? "bg-brand-espresso text-white border-brand-espresso shadow-paper-sm"
                  : "bg-[#FAF4EE] text-brand-espresso border-brand-espresso/25 hover:border-brand-espresso"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Grid */}
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

      {filteredBrands.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border-2.5 border-brand-espresso p-8 shadow-paper space-y-3">
          <PawPrint className="w-10 h-10 text-brand-taupe mx-auto" />
          <h3 className="font-heading text-lg font-black text-brand-espresso">
            No Brand Found Matching &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="text-xs font-sans text-brand-taupe max-w-md mx-auto">
            Try searching by the parent company or broader brand name (e.g., Purina, Victor, Blue Buffalo).
          </p>
        </div>
      )}
    </div>
  );
}
