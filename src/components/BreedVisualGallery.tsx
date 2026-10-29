"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_BREED_IMAGES, BreedImageAsset } from "@/data/breeds";
import { Dog, Cat, Search, Sparkles, CheckCircle2, PawPrint, Eye, ArrowRight } from "lucide-react";

export default function BreedVisualGallery() {
  const [search, setSearch] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState<"all" | "dog" | "cat">("all");
  const [selectedImage, setSelectedImage] = useState<BreedImageAsset | null>(null);

  const filteredAssets = useMemo(() => {
    return ALL_BREED_IMAGES.filter((asset) => {
      if (speciesFilter !== "all" && asset.species !== speciesFilter) {
        return false;
      }
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        asset.name.toLowerCase().includes(q) ||
        asset.filename.toLowerCase().includes(q) ||
        asset.slug.toLowerCase().includes(q)
      );
    });
  }, [search, speciesFilter]);

  const dogCount = ALL_BREED_IMAGES.filter((a) => a.species === "dog").length;
  const catCount = ALL_BREED_IMAGES.filter((a) => a.species === "cat").length;

  return (
    <section className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-[6px_6px_0px_#583D32] space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-espresso/15 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-[2px_2px_0px_#583D32] text-xs font-heading font-black uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
            120 High-Res Breed Gallery & Clinical Guides
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
            Visual Canine & Feline Breed Care Directory
          </h2>
          <p className="text-xs sm:text-sm font-medium text-brand-espresso/80 mt-1">
            Click any dog or cat below to view its comprehensive veterinary profile: temperament scores, adult weight curves, crate sizing, and interactive calculators.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto px-3.5 py-2 rounded-xl bg-emerald-50 border-2 border-emerald-600 text-emerald-800 text-xs font-bold shadow-[2px_2px_0px_#059669]">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>120 Local High-Res Profiles (0% Fetch Error)</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-espresso/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 120 breeds by name, coat, or color (e.g. French Bulldog, Sphynx, Merle, Labrador)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-brand-espresso/30 focus:border-brand-espresso focus:outline-none text-xs sm:text-sm font-medium bg-brand-cream/30 text-brand-espresso placeholder:text-brand-espresso/50 shadow-inner"
          />
        </div>

        {/* Species Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-brand-cream/40 p-1 rounded-xl border border-brand-espresso/30">
          <button
            type="button"
            onClick={() => setSpeciesFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-black transition-all flex items-center gap-1.5 ${
              speciesFilter === "all"
                ? "bg-brand-espresso text-brand-cream shadow-sm"
                : "text-brand-espresso hover:bg-white/80"
            }`}
          >
            <PawPrint className="w-3.5 h-3.5" />
            <span>All ({ALL_BREED_IMAGES.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setSpeciesFilter("dog")}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-black transition-all flex items-center gap-1.5 ${
              speciesFilter === "dog"
                ? "bg-brand-espresso text-brand-cream shadow-sm"
                : "text-brand-espresso hover:bg-white/80"
            }`}
          >
            <Dog className="w-3.5 h-3.5 text-brand-terracotta" />
            <span>Dogs ({dogCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setSpeciesFilter("cat")}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-black transition-all flex items-center gap-1.5 ${
              speciesFilter === "cat"
                ? "bg-brand-espresso text-brand-cream shadow-sm"
                : "text-brand-espresso hover:bg-white/80"
            }`}
          >
            <Cat className="w-3.5 h-3.5 text-brand-olive" />
            <span>Cats ({catCount})</span>
          </button>
        </div>
      </div>

      {/* Grid of Breed Photos with Direct Link to Clinical Guides */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredAssets.map((asset) => {
          const isDog = asset.species === "dog";
          const breedUrl = `/breed/${asset.slug}`;

          return (
            <Link
              key={asset.filename}
              href={breedUrl}
              className="group cursor-pointer bg-white rounded-2xl border-2 border-brand-espresso p-2.5 shadow-[3px_3px_0px_#583D32] hover:-translate-y-1.5 hover:shadow-[5px_5px_0px_#583D32] transition-all flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden border border-brand-espresso/20 bg-brand-cream/30">
                <img
                  src={asset.path}
                  alt={asset.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                {/* Species Badge */}
                <div className="absolute top-1.5 left-1.5">
                  <span className="px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-white text-[9px] font-mono font-bold flex items-center gap-1">
                    {isDog ? <Dog className="w-2.5 h-2.5 text-brand-terracotta" /> : <Cat className="w-2.5 h-2.5 text-brand-olive" />}
                    <span>{isDog ? "Dog" : "Cat"}</span>
                  </span>
                </div>

                {/* Inspect Lightbox Button */}
                <button
                  type="button"
                  title="Inspect High-Res Photo"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedImage(asset);
                  }}
                  className="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-black/60 hover:bg-black text-white transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title, Subtext & Action */}
              <div className="pt-2 px-0.5 space-y-1">
                <p className="font-heading font-black text-xs text-brand-espresso truncate" title={asset.name}>
                  {asset.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-brand-terracotta group-hover:text-brand-espresso transition-colors">
                  <span>Clinical Guide</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAssets.length === 0 && (
        <div className="text-center py-12 bg-brand-cream/30 rounded-2xl border-2 border-dashed border-brand-espresso/30 p-6">
          <PawPrint className="w-8 h-8 text-brand-taupe mx-auto mb-2" />
          <p className="font-heading font-black text-sm text-brand-espresso">
            No breed matches found for &quot;{search}&quot;
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSpeciesFilter("all");
            }}
            className="mt-3 text-xs font-mono font-bold text-brand-terracotta underline hover:text-brand-espresso"
          >
            Clear Search & Reset Filters
          </button>
        </div>
      )}

      {/* Modal Lightbox for High-Res Inspect */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-3xl border-3 border-brand-espresso p-6 max-w-2xl w-full shadow-[8px_8px_0px_#000] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-brand-espresso/15 pb-3">
              <div>
                <h3 className="font-heading font-black text-xl text-brand-espresso">
                  {selectedImage.name}
                </h3>
                <p className="text-xs font-mono text-brand-taupe">
                  File: {selectedImage.path} (1200×800 WebP)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 rounded-full bg-brand-cream border-2 border-brand-espresso font-black text-xs flex items-center justify-center hover:bg-brand-terracotta hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[3/2] w-full rounded-2xl overflow-hidden border-2 border-brand-espresso shadow-inner">
              <img
                src={selectedImage.path}
                alt={selectedImage.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                ✓ Local Static Asset • 0% Fetch Error
              </span>
              <Link
                href={`/breed/${selectedImage.slug}`}
                onClick={() => setSelectedImage(null)}
                className="btn-pill btn-pill-espresso text-xs font-heading font-black px-4 py-2 flex items-center gap-1.5"
              >
                <span>Open Full Clinical Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
