"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CALCULATOR_TOOLS } from "@/data/calculators";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import { Search, Dog, Cat, PawPrint, ArrowRight, ShieldCheck, HeartPulse, Fish } from "lucide-react";

export default function ToolsDirectoryPage() {
  const [filter, setFilter] = useState<"all" | "dog" | "cat" | "pet">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTools = CALCULATOR_TOOLS.filter((t) => {
    if (filter !== "all" && t.category !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.shortTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-paper-sm text-xs font-heading font-black uppercase">
          <ShieldCheck className="w-4 h-4" />
          100% Real Veterinary Formulations
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-black text-brand-espresso tracking-tight">
          Pet Safety & Health <span className="text-brand-terracotta">Calculators</span>
        </h1>
        <p className="text-base sm:text-lg text-brand-taupe leading-relaxed">
          Veterinary-calibrated calculators, nutrition converters, and canine & feline safety tools engineered with standards from AVMA, AAHA, WSAVA, and ASPCA.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border-2.5 border-brand-espresso rounded-3xl p-4 sm:p-5 shadow-paper">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {[
            { id: "all", label: "All Tools" },
            { id: "dog", label: "Dog Tools" },
            { id: "cat", label: "Cat Tools" },
            { id: "pet", label: "Universal Pets" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-full font-heading font-black text-xs uppercase border-2 transition-all ${
                filter === cat.id
                  ? "bg-brand-espresso text-white border-brand-espresso shadow-paper-sm"
                  : "bg-[#FAF4EE] text-brand-espresso border-brand-espresso/30 hover:border-brand-espresso"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-brand-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-full pl-9 pr-4 py-1.5 text-xs font-heading font-bold text-brand-espresso placeholder:text-brand-taupe/70 shadow-paper-sm focus:outline-none focus:border-brand-terracotta"
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 shadow-paper hover:shadow-paper-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full border border-brand-espresso ${
                  tool.category === "dog" ? "bg-amber-100 text-amber-900" : tool.category === "cat" ? "bg-sky-100 text-sky-900" : "bg-emerald-100 text-emerald-900"
                }`}>
                  {tool.iconName === "Fish" ? (
                    <Fish className="w-3.5 h-3.5 flex-shrink-0" />
                  ) : tool.category === "dog" ? (
                    <Dog className="w-3.5 h-3.5" />
                  ) : tool.category === "cat" ? (
                    <Cat className="w-3.5 h-3.5" />
                  ) : (
                    <PawPrint className="w-3.5 h-3.5" />
                  )}
                  {tool.iconName === "Fish" ? "Aquatic Tool" : tool.category === "dog" ? "Dog Tool" : tool.category === "cat" ? "Cat Tool" : "Pet Tool"}
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso group-hover:text-brand-terracotta transition-colors mb-2">
                {tool.name}
              </h3>
              <p className="text-xs sm:text-sm text-brand-taupe leading-relaxed mb-4">
                {tool.tagline}
              </p>

              <div className="bg-[#FAF4EE] border border-brand-espresso/20 rounded-xl p-2.5 text-[11px] font-mono text-brand-espresso/80 mb-4">
                <strong>Standard:</strong> {tool.authority}
              </div>
            </div>

            <div className="pt-4 border-t border-brand-espresso/10 flex items-center justify-between">
              <span className="text-xs font-heading font-black text-brand-espresso group-hover:text-brand-terracotta transition-colors flex items-center gap-1.5">
                Launch Interactive Calculator
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[10px] font-mono font-bold bg-brand-olive text-brand-espresso px-2 py-0.5 rounded-full border border-brand-espresso">
                Free
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Ad Container */}
      <div className="pt-6">
        <AdSensePlaceholder
          slot="tools-directory-bottom"
          format="horizontal"
          minHeight="min-h-[120px]"
          label="Pet Care Safety Sponsor"
        />
      </div>
    </div>
  );
}
