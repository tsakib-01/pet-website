"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BreedData } from "@/data/breeds";
import { Dog, Cat, ArrowRight, PawPrint, Scale, Box, Clock, Search, X } from "lucide-react";

interface Props {
  breeds: BreedData[];
}

export default function BreedDirectoryClient({ breeds }: Props) {
  const [filter, setFilter] = useState<"all" | "dog" | "cat">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const dogCount = breeds.filter((b) => b.species === "dog").length;
  const catCount = breeds.filter((b) => b.species === "cat").length;
  const totalCount = breeds.length;

  const filteredBreeds = useMemo(() => {
    return breeds.filter((breed) => {
      if (filter !== "all" && breed.species !== filter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        breed.name.toLowerCase().includes(q) ||
        breed.slug.toLowerCase().includes(q) ||
        (breed.standardGroup && breed.standardGroup.toLowerCase().includes(q)) ||
        (breed.tagline && breed.tagline.toLowerCase().includes(q)) ||
        (breed.origin && breed.origin.toLowerCase().includes(q))
      );
    });
  }, [breeds, filter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search & Species Filter Bar */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl border-2.5 border-brand-espresso shadow-[4px_4px_0px_#583D32] space-y-4">
        {/* Top: Instant Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-brand-espresso/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${totalCount} breeds by name, group, or traits (e.g. French Bulldog, Sphynx, Retriever, Herding)...`}
            className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-brand-espresso/30 focus:border-brand-espresso focus:outline-none text-xs sm:text-sm font-medium bg-brand-cream/30 text-brand-espresso placeholder:text-brand-espresso/50 shadow-inner transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-brand-espresso/10 hover:bg-brand-espresso text-brand-espresso hover:text-white flex items-center justify-center transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Bottom: Species Filter Tabs & Count Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-brand-espresso/10">
          {/* On mobile: 3-column equal grid so all 3 buttons sit on 1 clean row. On desktop: inline flex row */}
          <div className="grid grid-cols-3 gap-1.5 sm:flex sm:items-center sm:gap-2 w-full sm:w-auto">
            {/* ALL OPTION (Default) */}
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`btn-pill px-2 sm:px-4 py-2 text-xs font-heading font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                filter === "all"
                  ? "btn-pill-espresso"
                  : "btn-pill-cream hover:bg-brand-olive"
              }`}
              aria-pressed={filter === "all"}
            >
              <PawPrint className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-terracotta flex-shrink-0" />
              <span className="sm:hidden">All</span>
              <span className="hidden sm:inline">All Breeds</span>
              <span
                className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex-shrink-0 ${
                  filter === "all"
                    ? "bg-brand-olive text-brand-espresso"
                    : "bg-brand-espresso/10 text-brand-espresso"
                }`}
              >
                {totalCount}
              </span>
            </button>

            {/* DOGS ONLY OPTION */}
            <button
              type="button"
              onClick={() => setFilter("dog")}
              className={`btn-pill px-2 sm:px-4 py-2 text-xs font-heading font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                filter === "dog"
                  ? "btn-pill-espresso"
                  : "btn-pill-cream hover:bg-brand-olive"
              }`}
              aria-pressed={filter === "dog"}
            >
              <Dog className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-terracotta flex-shrink-0" />
              <span className="sm:hidden">Dogs</span>
              <span className="hidden sm:inline">Dogs Only</span>
              <span
                className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex-shrink-0 ${
                  filter === "dog"
                    ? "bg-brand-olive text-brand-espresso"
                    : "bg-brand-espresso/10 text-brand-espresso"
                }`}
              >
                {dogCount}
              </span>
            </button>

            {/* CATS ONLY OPTION */}
            <button
              type="button"
              onClick={() => setFilter("cat")}
              className={`btn-pill px-2 sm:px-4 py-2 text-xs font-heading font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                filter === "cat"
                  ? "btn-pill-espresso"
                  : "btn-pill-cream hover:bg-brand-olive"
              }`}
              aria-pressed={filter === "cat"}
            >
              <Cat className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-terracotta flex-shrink-0" />
              <span className="sm:hidden">Cats</span>
              <span className="hidden sm:inline">Cats Only</span>
              <span
                className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex-shrink-0 ${
                  filter === "cat"
                    ? "bg-brand-olive text-brand-espresso"
                    : "bg-brand-espresso/10 text-brand-espresso"
                }`}
              >
                {catCount}
              </span>
            </button>
          </div>

          {/* Counter indicator */}
          <div className="text-center sm:text-right text-[11px] sm:text-xs font-mono font-bold text-brand-taupe uppercase tracking-wider px-1 pt-1.5 sm:pt-0">
            Showing {filteredBreeds.length}{" "}
            {filter === "all"
              ? "Total Breeds"
              : filter === "dog"
              ? "Dog Breeds"
              : "Cat Breeds"}
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
          </div>
        </div>
      </div>

      {/* Filtered Breed Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {filteredBreeds.map((breed) => {
          const isDog = breed.species === "dog";
          return (
            <Link
              key={breed.slug}
              href={`/breed/${breed.slug}`}
              className="group bg-white rounded-3xl border-2.5 border-brand-espresso p-5 sm:p-6 shadow-paper hover:shadow-paper-lg hover:-translate-y-1 transition-all flex flex-col justify-between space-y-5 cursor-pointer"
            >
              <div className="space-y-4">
                {/* Hero Media Container with Inset Badges */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border-2 border-brand-espresso shadow-paper-sm bg-brand-cream/30">
                  <img
                    src={breed.heroImage}
                    alt={breed.heroImageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Subtle vignette gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

                  {/* Species Badge */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-paper-sm text-xs font-heading font-black uppercase">
                    {isDog ? (
                      <Dog className="w-3.5 h-3.5 flex-shrink-0" />
                    ) : (
                      <Cat className="w-3.5 h-3.5 flex-shrink-0" />
                    )}
                    <span>{isDog ? "Dog Profile" : "Cat Profile"}</span>
                  </div>

                  {/* Registry Standard Badge */}
                  <div className="absolute top-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full bg-white/95 text-brand-espresso border-2 border-brand-espresso shadow-paper-sm text-[10px] font-mono font-bold uppercase tracking-wider">
                    {isDog ? "AKC Standard" : "CFA Standard"}
                  </div>

                  {/* Standard Group Chip */}
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF4EE]/95 backdrop-blur-sm text-brand-espresso text-[10px] font-mono font-bold border border-brand-espresso shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <span>{breed.standardGroup}</span>
                  </div>
                </div>

                {/* Identity & Tagline */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso group-hover:text-brand-terracotta transition-colors">
                      {breed.name}
                    </h2>
                    <span className="text-xs font-mono font-bold text-brand-taupe uppercase hidden sm:inline-block">
                      Origin: {breed.origin}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-taupe leading-relaxed line-clamp-2">
                    {breed.tagline}
                  </p>
                </div>

                {/* Precision Clinical Metric Chips */}
                <div className="grid grid-cols-3 gap-2.5 pt-3 border-t-2 border-brand-espresso/15">
                  <div className="bg-[#FAF4EE] rounded-xl p-2.5 border-2 border-brand-espresso/20 text-center shadow-[2px_2px_0px_#583D32]/10 group-hover:border-brand-espresso/40 transition-colors">
                    <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-brand-taupe uppercase font-bold tracking-wider">
                      <Scale className="w-3 h-3 text-brand-terracotta flex-shrink-0" />
                      <span>Weight</span>
                    </div>
                    <div className="text-xs sm:text-sm font-heading font-black text-brand-espresso mt-0.5">
                      {breed.metrics[0]?.value}
                    </div>
                  </div>
                  <div className="bg-[#FAF4EE] rounded-xl p-2.5 border-2 border-brand-espresso/20 text-center shadow-[2px_2px_0px_#583D32]/10 group-hover:border-brand-espresso/40 transition-colors">
                    <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-brand-taupe uppercase font-bold tracking-wider">
                      <Box className="w-3 h-3 text-brand-espresso flex-shrink-0" />
                      <span>{isDog ? "Crate" : "Litter Box"}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-heading font-black text-brand-espresso mt-0.5">
                      {breed.metrics[2]?.value}
                    </div>
                  </div>
                  <div className="bg-[#FAF4EE] rounded-xl p-2.5 border-2 border-brand-espresso/20 text-center shadow-[2px_2px_0px_#583D32]/10 group-hover:border-brand-espresso/40 transition-colors">
                    <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-brand-taupe uppercase font-bold tracking-wider">
                      <Clock className="w-3 h-3 text-brand-taupe flex-shrink-0" />
                      <span>Lifespan</span>
                    </div>
                    <div className="text-xs sm:text-sm font-heading font-black text-brand-espresso mt-0.5">
                      {breed.metrics[3]?.value}
                    </div>
                  </div>
                </div>
              </div>

              {/* Neo-brutalist CTA Action Button */}
              <div className="btn-pill btn-pill-espresso group-hover:btn-pill-terracotta w-full py-3 px-5 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-between shadow-paper-sm group-hover:shadow-paper transition-all">
                <span>Explore {breed.name} Guide</span>
                <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso flex items-center justify-center flex-shrink-0 group-hover:rotate-[-15deg] group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State when no breeds match search */}
      {filteredBreeds.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border-2.5 border-brand-espresso p-8 shadow-[4px_4px_0px_#583D32] space-y-3">
          <PawPrint className="w-10 h-10 text-brand-taupe mx-auto" />
          <h3 className="font-heading font-black text-lg text-brand-espresso">
            No breeds found matching &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="text-xs text-brand-taupe max-w-sm mx-auto">
            Try searching by standard breed name (e.g. Golden Retriever, Sphynx, Poodle) or reset your species filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setFilter("all");
            }}
            className="btn-pill btn-pill-espresso text-xs font-black px-4 py-2 mt-2"
          >
            Clear Search &amp; Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
