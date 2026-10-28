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
  PawPrint,
  Building2,
  Calendar,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  Filter,
} from "lucide-react";

interface Props {
  brands: BrandSafetyProfile[];
}

export default function BrandDirectoryClient({ brands }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState<"all" | "clean" | "recalls" | "dog" | "cat">("all");

  const totalBrandsCount = brands.length;
  const cleanCount = brands.filter((b) => b.totalRecallsCount === 0).length;
  const recallCount = brands.filter((b) => b.totalRecallsCount > 0).length;

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

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-5 sm:p-6 shadow-paper space-y-4">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-brand-taupe absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 250+ pet food brands by name, parent company, or headquarters (e.g. Purina, Blue Buffalo, Fromm, Victor)..."
            className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm font-heading font-bold text-brand-espresso placeholder:text-brand-taupe/60 shadow-paper-sm focus:outline-none focus:border-brand-terracotta"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-brand-taupe hover:text-brand-espresso px-2 py-1 rounded-md bg-white border border-brand-espresso/20"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-brand-espresso/10">
          <div className="flex flex-wrap items-center gap-2">
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-black border-2 transition-all ${
                  brandFilter === pill.id
                    ? "bg-brand-espresso text-white border-brand-espresso shadow-paper-sm"
                    : "bg-[#FAF4EE] text-brand-espresso border-brand-espresso/25 hover:border-brand-espresso"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono font-bold text-brand-taupe">
            Showing <strong>{filteredBrands.length}</strong> of {totalBrandsCount} Brands
          </div>
        </div>
      </div>

      {/* Brands 3-Column Responsive Grid */}
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
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-brand-terracotta" />
                  )}
                  {brand.safetyTier}
                </span>

                <span className="text-[10px] font-mono font-bold text-brand-taupe uppercase flex items-center gap-1">
                  <PawPrint className="w-3 h-3" />
                  {brand.species}
                </span>
              </div>

              {/* Brand Logo & Name */}
              <div className="flex items-center gap-3">
                <BrandLogo
                  domain={brand.websiteDomain}
                  name={brand.name}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-lg font-black text-brand-espresso group-hover:text-brand-terracotta transition-colors truncate">
                    {brand.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-brand-taupe truncate">
                    <Building2 className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{brand.parentCompany}</span>
                  </div>
                </div>
              </div>

              {/* Safety Summary Stat Box */}
              <div className="p-3 rounded-2xl bg-brand-cream/40 border border-brand-espresso/15 flex items-center justify-between text-xs font-mono">
                <span className="text-brand-taupe font-medium">Recalls on Record:</span>
                <span
                  className={`font-black ${
                    brand.totalRecallsCount === 0 ? "text-emerald-700" : "text-brand-terracotta"
                  }`}
                >
                  {brand.totalRecallsCount === 0
                    ? "0 (Clean Record)"
                    : `${brand.totalRecallsCount} Historical Recall${brand.totalRecallsCount > 1 ? "s" : ""}`}
                </span>
              </div>

              {/* Latest Recall preview if exists */}
              {brand.lastRecallDate && (
                <div className="text-[11px] font-sans text-brand-taupe flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-terracotta flex-shrink-0" />
                  <span>
                    Last Recall: <strong className="text-brand-espresso">{brand.lastRecallDate}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Card Footer Link */}
            <div className="pt-4 mt-4 border-t border-brand-espresso/10 flex items-center justify-between text-xs font-heading font-black text-brand-espresso group-hover:text-brand-terracotta">
              <span>View Safety Dossier &amp; Lot Checker</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-12 text-center shadow-paper space-y-3">
          <ShieldAlert className="w-8 h-8 text-brand-terracotta mx-auto" />
          <h3 className="font-heading text-lg font-black text-brand-espresso">
            No brands matched your search criteria
          </h3>
          <p className="text-xs text-brand-taupe">
            Try adjusting your search keywords or switching filters to "All Brands".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setBrandFilter("all");
            }}
            className="px-4 py-2 rounded-xl bg-brand-espresso text-white text-xs font-heading font-black hover:bg-brand-espresso/90"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
