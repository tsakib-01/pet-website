"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BreedData } from "@/data/breeds";
import { Dog, Cat, ArrowRight, PawPrint } from "lucide-react";

interface Props {
  breeds: BreedData[];
}

export default function BreedDirectoryClient({ breeds }: Props) {
  const [filter, setFilter] = useState<"all" | "dog" | "cat">("all");

  const dogCount = breeds.filter((b) => b.species === "dog").length;
  const catCount = breeds.filter((b) => b.species === "cat").length;
  const totalCount = breeds.length;

  const filteredBreeds = breeds.filter((breed) => {
    if (filter === "all") return true;
    return breed.species === filter;
  });

  return (
    <div className="space-y-6">
      {/* Species Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border-2.5 border-brand-espresso shadow-[4px_4px_0px_#583D32]">
        <div className="flex flex-wrap items-center gap-2">
          {/* ALL OPTION (Default) */}
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`btn-pill px-4 py-2 text-xs font-heading font-black transition-all flex items-center gap-2 ${
              filter === "all"
                ? "btn-pill-espresso"
                : "btn-pill-cream hover:bg-brand-olive"
            }`}
            aria-pressed={filter === "all"}
          >
            <PawPrint className="w-4 h-4 text-brand-terracotta" />
            <span>All Breeds</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
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
            className={`btn-pill px-4 py-2 text-xs font-heading font-black transition-all flex items-center gap-2 ${
              filter === "dog"
                ? "btn-pill-espresso"
                : "btn-pill-cream hover:bg-brand-olive"
            }`}
            aria-pressed={filter === "dog"}
          >
            <Dog className="w-4 h-4 text-brand-terracotta" />
            <span>Dogs Only</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
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
            className={`btn-pill px-4 py-2 text-xs font-heading font-black transition-all flex items-center gap-2 ${
              filter === "cat"
                ? "btn-pill-espresso"
                : "btn-pill-cream hover:bg-brand-olive"
            }`}
            aria-pressed={filter === "cat"}
          >
            <Cat className="w-4 h-4 text-brand-terracotta" />
            <span>Cats Only</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
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
        <div className="text-xs font-mono font-bold text-brand-taupe uppercase tracking-wider px-1">
          Showing {filteredBreeds.length}{" "}
          {filter === "all"
            ? "Total Breeds"
            : filter === "dog"
            ? "Dog Breeds"
            : "Cat Breeds"}
        </div>
      </div>

      {/* Filtered Breed Cards Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredBreeds.map((breed) => {
          const isDog = breed.species === "dog";
          return (
            <div
              key={breed.slug}
              className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-[5px_5px_0px_#583D32] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso/40 text-xs font-heading font-black uppercase">
                    {isDog ? (
                      <Dog className="w-3.5 h-3.5" />
                    ) : (
                      <Cat className="w-3.5 h-3.5" />
                    )}
                    {isDog ? "Dog Breed Profile" : "Cat Breed Profile"}
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-taupe">
                    {isDog ? "AKC Standard" : "CFA Standard"}
                  </span>
                </div>

                <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-brand-espresso shadow-[3px_3px_0px_#583D32] bg-brand-cream/30">
                  <img
                    src={breed.heroImage}
                    alt={breed.heroImageAlt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-black text-brand-espresso mb-1">
                    {breed.name}
                  </h2>
                  <p className="text-xs text-brand-espresso/80 leading-relaxed">
                    {breed.tagline}
                  </p>
                </div>

                {/* Sample Metrics Chips */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-brand-espresso/15">
                  <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                    <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">
                      Weight
                    </div>
                    <div className="text-xs font-heading font-black text-brand-espresso">
                      {breed.metrics[0]?.value}
                    </div>
                  </div>
                  <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                    <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">
                      {isDog ? "Crate" : "Litter Box"}
                    </div>
                    <div className="text-xs font-heading font-black text-brand-espresso">
                      {breed.metrics[2]?.value}
                    </div>
                  </div>
                  <div className="bg-brand-cream/40 rounded-xl p-2.5 border border-brand-espresso/20 text-center">
                    <div className="text-[10px] font-mono text-brand-taupe uppercase font-bold">
                      Lifespan
                    </div>
                    <div className="text-xs font-heading font-black text-brand-espresso">
                      {breed.metrics[3]?.value}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={`/breed/${breed.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-terracotta text-white font-heading font-black text-sm uppercase tracking-wider border-2 border-brand-espresso shadow-[3px_3px_0px_#583D32] hover:shadow-[1px_1px_0px_#583D32] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <span>Explore {breed.name} Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
