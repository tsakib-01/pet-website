"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { HISTORICAL_FDA_TIMELINE, HistoricalDocketEntry } from "@/data/historicalTimeline";
import BrandLogo from "./BrandLogo";
import {
  Search,
  Filter,
  Calendar,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowRight,
  RotateCcw,
  Building2,
  FileText,
  MapPin,
  Tag,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";

interface Props {
  knownBrandSlugs?: string[];
}

export default function RecallTableLedger({ knownBrandSlugs = [] }: Props) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedHazard, setSelectedHazard] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // Sort State
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Expanded Rows Set
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const brandSlugsSet = useMemo(() => new Set(knownBrandSlugs), [knownBrandSlugs]);

  // Extract unique available years for dropdown
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(HISTORICAL_FDA_TIMELINE.map((d) => d.year)));
    return years.sort((a, b) => b - a);
  }, []);

  // Extract unique hazard types for dropdown
  const availableHazards = useMemo(() => {
    const hazards = Array.from(new Set(HISTORICAL_FDA_TIMELINE.map((d) => d.hazardType)));
    return hazards.sort();
  }, []);

  // Filter Logic
  const filteredDockets = useMemo(() => {
    return HISTORICAL_FDA_TIMELINE.filter((docket) => {
      // Country / Jurisdiction filter
      const docketCountry = docket.country || "USA";
      if (selectedCountry !== "all" && docketCountry !== selectedCountry) {
        return false;
      }

      // Year filter
      if (selectedYear !== "all") {
        if (docket.year !== parseInt(selectedYear, 10)) return false;
      }

      // Severity filter
      if (selectedSeverity !== "all") {
        if (docket.classification !== selectedSeverity) return false;
      }

      // Hazard filter
      if (selectedHazard !== "all") {
        if (docket.hazardType !== selectedHazard) return false;
      }

      // Status filter
      if (selectedStatus === "active" && docket.terminated) return false;
      if (selectedStatus === "terminated" && !docket.terminated) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesBrand = docket.brandName.toLowerCase().includes(q);
        const matchesCompany = docket.companyName.toLowerCase().includes(q);
        const matchesDesc = docket.productDescription.toLowerCase().includes(q);
        const matchesReason = docket.reason.toLowerCase().includes(q);
        const matchesHazard = docket.hazardType.toLowerCase().includes(q);
        const matchesLots = docket.lotCodes.toLowerCase().includes(q);
        const matchesYear = docket.year.toString().includes(q);
        const matchesCountry = docketCountry.toLowerCase().includes(q);
        const matchesAgency = (docket.regulatoryAgency || "US FDA").toLowerCase().includes(q);

        return (
          matchesBrand ||
          matchesCompany ||
          matchesDesc ||
          matchesReason ||
          matchesHazard ||
          matchesLots ||
          matchesYear ||
          matchesCountry ||
          matchesAgency
        );
      }

      return true;
    }).sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
    });
  }, [
    searchQuery,
    selectedCountry,
    selectedYear,
    selectedSeverity,
    selectedHazard,
    selectedStatus,
    sortOrder,
  ]);

  // Check URL parameter (?country=canada / ?country=australia) or saved preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const countryParam = params.get("country");
    if (countryParam) {
      const lower = countryParam.toLowerCase();
      if (lower === "canada" || lower === "ca") setSelectedCountry("Canada");
      else if (lower === "australia" || lower === "au") setSelectedCountry("Australia");
      else if (lower === "uk" || lower === "europe" || lower === "eu" || lower === "gb") setSelectedCountry("UK & Europe");
      else if (lower === "usa" || lower === "us") setSelectedCountry("USA");
    } else {
      const saved = localStorage.getItem("pawtrusty_preferred_country");
      if (saved && ["USA", "Canada", "UK & Europe", "Australia"].includes(saved)) {
        setSelectedCountry(saved);
      }
    }
  }, []);

  // Country change with persistence
  const handleCountryChange = (val: string) => {
    setSelectedCountry(val);
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      if (val !== "all") {
        localStorage.setItem("pawtrusty_preferred_country", val);
      } else {
        localStorage.removeItem("pawtrusty_preferred_country");
      }
    }
  };

  // Reset page when filters change
  const handleFilterChange = (setter: (v: string) => void, val: string) => {
    setter(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCountry("all");
    setSelectedYear("all");
    setSelectedSeverity("all");
    setSelectedHazard("all");
    setSelectedStatus("all");
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      localStorage.removeItem("pawtrusty_preferred_country");
    }
  };

  // Toggle Row Expansion
  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Pagination calculation
  const totalItems = filteredDockets.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedDockets = filteredDockets.slice(startIndex, startIndex + pageSize);

  // Summary Metrics
  const classICount = useMemo(
    () => HISTORICAL_FDA_TIMELINE.filter((d) => d.classification === "Class I").length,
    []
  );
  const activeCount = useMemo(
    () => HISTORICAL_FDA_TIMELINE.filter((d) => !d.terminated).length,
    []
  );
  const totalDocketsCount = HISTORICAL_FDA_TIMELINE.length;

  // Country Counts for quick pills
  const countryCounts = useMemo(() => {
    const counts = {
      all: HISTORICAL_FDA_TIMELINE.length,
      USA: 0,
      Canada: 0,
      "UK & Europe": 0,
      Australia: 0,
    };
    HISTORICAL_FDA_TIMELINE.forEach((d) => {
      const c = d.country || "USA";
      if (c in counts) {
        counts[c as keyof typeof counts]++;
      } else {
        counts.USA++;
      }
    });
    return counts;
  }, []);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCountry !== "all" ||
    selectedYear !== "all" ||
    selectedSeverity !== "all" ||
    selectedHazard !== "all" ||
    selectedStatus !== "all";

  return (
    <div className="space-y-6">
      {/* =========================================================================
          EXECUTIVE METRICS DASHBOARD
          ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm">
          <div className="flex items-center justify-between text-brand-taupe text-xs font-mono font-bold uppercase tracking-wider">
            <span>Historical Dockets</span>
            <FileText className="w-4 h-4 text-brand-espresso" />
          </div>
          <div className="mt-2 font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
            {totalDocketsCount}
          </div>
          <div className="mt-0.5 text-[11px] font-sans text-brand-taupe">
            USA, CAN, UK &amp; AUS Archived
          </div>
        </div>

        <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm">
          <div className="flex items-center justify-between text-brand-taupe text-xs font-mono font-bold uppercase tracking-wider">
            <span>Class I (Severe)</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 font-heading text-2xl sm:text-3xl font-black text-rose-700">
            {classICount}
          </div>
          <div className="mt-0.5 text-[11px] font-sans text-brand-taupe">
            Salmonella, Listeria &amp; Toxins
          </div>
        </div>

        <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm">
          <div className="flex items-center justify-between text-brand-taupe text-xs font-mono font-bold uppercase tracking-wider">
            <span>Active / Ongoing</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 font-heading text-2xl sm:text-3xl font-black text-amber-700">
            {activeCount}
          </div>
          <div className="mt-0.5 text-[11px] font-sans text-brand-taupe">
            Pending Final FDA Termination
          </div>
        </div>

        <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm">
          <div className="flex items-center justify-between text-brand-taupe text-xs font-mono font-bold uppercase tracking-wider">
            <span>Terminated / Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 font-heading text-2xl sm:text-3xl font-black text-emerald-700">
            {totalDocketsCount - activeCount}
          </div>
          <div className="mt-0.5 text-[11px] font-sans text-brand-taupe">
            Completed Disposition
          </div>
        </div>
      </div>

      {/* =========================================================================
          PROFESSIONAL REGULATORY FILTER CONTROLS (Executive Dropdowns)
          ========================================================================= */}
      <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-5 sm:p-6 shadow-paper space-y-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-brand-taupe absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search dockets by brand name, company, country, agency, lot code, or description (e.g. Purina, Victor, Canada, Australia, Salmonella)..."
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

        {/* Jurisdiction Quick Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
          <span className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <Globe className="w-3.5 h-3.5 text-brand-espresso" />
            Jurisdiction:
          </span>
          <button
            type="button"
            onClick={() => handleCountryChange("all")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-black transition-all ${
              selectedCountry === "all"
                ? "bg-brand-espresso text-white shadow-paper-sm"
                : "bg-[#FAF4EE] hover:bg-white text-brand-espresso border border-brand-espresso/30"
            }`}
          >
            <span>🌐 All Regions</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                selectedCountry === "all"
                  ? "bg-white/20 text-white"
                  : "bg-brand-espresso/10 text-brand-espresso"
              }`}
            >
              {countryCounts.all}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleCountryChange("USA")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-black transition-all ${
              selectedCountry === "USA"
                ? "bg-brand-espresso text-white shadow-paper-sm"
                : "bg-[#FAF4EE] hover:bg-white text-brand-espresso border border-brand-espresso/30"
            }`}
          >
            <span>🇺🇸 USA (FDA)</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                selectedCountry === "USA"
                  ? "bg-white/20 text-white"
                  : "bg-brand-espresso/10 text-brand-espresso"
              }`}
            >
              {countryCounts.USA}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleCountryChange("Canada")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-black transition-all ${
              selectedCountry === "Canada"
                ? "bg-brand-espresso text-white shadow-paper-sm"
                : "bg-[#FAF4EE] hover:bg-white text-brand-espresso border border-brand-espresso/30"
            }`}
          >
            <span>🇨🇦 Canada (CFIA)</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                selectedCountry === "Canada"
                  ? "bg-white/20 text-white"
                  : "bg-brand-espresso/10 text-brand-espresso"
              }`}
            >
              {countryCounts.Canada}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleCountryChange("UK & Europe")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-black transition-all ${
              selectedCountry === "UK & Europe"
                ? "bg-brand-espresso text-white shadow-paper-sm"
                : "bg-[#FAF4EE] hover:bg-white text-brand-espresso border border-brand-espresso/30"
            }`}
          >
            <span>🇬🇧 UK &amp; Europe (FSA)</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                selectedCountry === "UK & Europe"
                  ? "bg-white/20 text-white"
                  : "bg-brand-espresso/10 text-brand-espresso"
              }`}
            >
              {countryCounts["UK & Europe"]}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleCountryChange("Australia")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-black transition-all ${
              selectedCountry === "Australia"
                ? "bg-brand-espresso text-white shadow-paper-sm"
                : "bg-[#FAF4EE] hover:bg-white text-brand-espresso border border-brand-espresso/30"
            }`}
          >
            <span>🇦🇺 Australia (ACCC)</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                selectedCountry === "Australia"
                  ? "bg-white/20 text-white"
                  : "bg-brand-espresso/10 text-brand-espresso"
              }`}
            >
              {countryCounts.Australia}
            </span>
          </button>
        </div>

        {/* Executive Dropdown Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 border-t border-brand-espresso/10">
          {/* Country / Jurisdiction Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-brand-espresso" />
              Country / Jurisdiction
            </label>
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full appearance-none bg-[#FAF4EE] border-2 border-brand-espresso/60 hover:border-brand-espresso rounded-xl px-3.5 py-2.5 text-xs font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none focus:border-brand-terracotta transition-colors pr-9 cursor-pointer"
              >
                <option value="all">🌐 All Regions ({countryCounts.all})</option>
                <option value="USA">🇺🇸 United States — FDA ({countryCounts.USA})</option>
                <option value="Canada">🇨🇦 Canada — CFIA ({countryCounts.Canada})</option>
                <option value="UK & Europe">🇬🇧 UK &amp; Europe — FSA ({countryCounts["UK & Europe"]})</option>
                <option value="Australia">🇦🇺 Australia — ACCC ({countryCounts.Australia})</option>
              </select>
              <ChevronDown className="w-4 h-4 text-brand-espresso pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          {/* Year Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-espresso" />
              Recall Year
            </label>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => handleFilterChange(setSelectedYear, e.target.value)}
                className="w-full appearance-none bg-[#FAF4EE] border-2 border-brand-espresso/60 hover:border-brand-espresso rounded-xl px-3.5 py-2.5 text-xs font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none focus:border-brand-terracotta transition-colors pr-9 cursor-pointer"
              >
                <option value="all">All Years (2009–2026)</option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr.toString()}>
                    {yr} Docket Year
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-brand-espresso pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Severity Classification Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-brand-terracotta" />
              Hazard Severity
            </label>
            <div className="relative">
              <select
                value={selectedSeverity}
                onChange={(e) => handleFilterChange(setSelectedSeverity, e.target.value)}
                className="w-full appearance-none bg-[#FAF4EE] border-2 border-brand-espresso/60 hover:border-brand-espresso rounded-xl px-3.5 py-2.5 text-xs font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none focus:border-brand-terracotta transition-colors pr-9 cursor-pointer"
              >
                <option value="all">All Classifications</option>
                <option value="Class I">Class I — High Hazard (Life-Threatening)</option>
                <option value="Class II">Class II — Moderate / Medically Reversible</option>
                <option value="Class III">Class III — Minor Technical Variance</option>
              </select>
              <ChevronDown className="w-4 h-4 text-brand-espresso pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Hazard Type Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-brand-espresso" />
              Contaminant / Hazard
            </label>
            <div className="relative">
              <select
                value={selectedHazard}
                onChange={(e) => handleFilterChange(setSelectedHazard, e.target.value)}
                className="w-full appearance-none bg-[#FAF4EE] border-2 border-brand-espresso/60 hover:border-brand-espresso rounded-xl px-3.5 py-2.5 text-xs font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none focus:border-brand-terracotta transition-colors pr-9 cursor-pointer"
              >
                <option value="all">All Contaminants</option>
                {availableHazards.map((hz) => (
                  <option key={hz} value={hz}>
                    {hz}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-brand-espresso pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-brand-taupe uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Docket Status
            </label>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => handleFilterChange(setSelectedStatus, e.target.value)}
                className="w-full appearance-none bg-[#FAF4EE] border-2 border-brand-espresso/60 hover:border-brand-espresso rounded-xl px-3.5 py-2.5 text-xs font-heading font-black text-brand-espresso shadow-paper-sm focus:outline-none focus:border-brand-terracotta transition-colors pr-9 cursor-pointer"
              >
                <option value="all">All Docket Statuses</option>
                <option value="active">Active / Ongoing Outbreaks</option>
                <option value="terminated">Terminated / Fully Resolved</option>
              </select>
              <ChevronDown className="w-4 h-4 text-brand-espresso pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Filter Summary & Quick Reset */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-brand-espresso/10 text-xs font-mono">
          <div className="flex items-center gap-2 text-brand-espresso font-bold">
            <span>Ledger Records:</span>
            <span className="px-2 py-0.5 rounded-md bg-brand-olive text-brand-espresso border border-brand-espresso/30 font-black">
              Showing {filteredDockets.length} of {totalDocketsCount} Regulatory Dockets
            </span>
            {hasActiveFilters && (
              <span className="text-[11px] text-brand-terracotta font-sans font-medium">
                (Filtered)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF4EE] hover:bg-white text-brand-espresso border border-brand-espresso/30 text-xs font-heading font-bold transition-colors"
            >
              <span>Sort Date:</span>
              <span className="font-mono font-black">{sortOrder === "desc" ? "Newest First" : "Oldest First"}</span>
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 text-xs font-heading font-black transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          REGULATORY LEDGER DATA TABLE (Bloomberg / FDA Solr Aesthetic)
          ========================================================================= */}
      <div className="bg-white border-2.5 border-brand-espresso rounded-3xl shadow-paper overflow-hidden">
        {paginatedDockets.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 border-2 border-brand-espresso flex items-center justify-center mx-auto text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-lg font-black text-brand-espresso">
                No FDA Recall Dockets Match Your Criteria
              </h3>
              <p className="text-xs text-brand-taupe max-w-md mx-auto">
                Try loosening your search terms, changing the year selection, or resetting the severity filter.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-brand-espresso text-white text-xs font-heading font-black hover:bg-brand-espresso/90"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF4EE] border-b-2 border-brand-espresso text-[11px] font-mono font-black text-brand-espresso uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6 w-[120px]">Docket Date</th>
                  <th className="py-3.5 px-4 sm:px-6 min-w-[200px]">Brand &amp; Firm</th>
                  <th className="py-3.5 px-4 sm:px-6 min-w-[260px]">Product Description</th>
                  <th className="py-3.5 px-4 sm:px-6 w-[160px]">Classification</th>
                  <th className="py-3.5 px-4 sm:px-6 w-[130px]">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 w-[90px] text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-espresso/10 text-xs font-sans">
                {paginatedDockets.map((docket) => {
                  const isExpanded = expandedRows.has(docket.id);
                  const hasBrandProfile = brandSlugsSet.has(docket.brandSlug);

                  return (
                    <React.Fragment key={docket.id}>
                      <tr
                        onClick={() => toggleRow(docket.id)}
                        className={`hover:bg-[#FAF4EE]/60 transition-colors cursor-pointer group ${
                          isExpanded ? "bg-[#FAF4EE]/40" : ""
                        }`}
                      >
                        {/* 1. Date */}
                        <td className="py-4 px-4 sm:px-6 align-top">
                          <div className="font-mono font-bold text-brand-espresso text-xs whitespace-nowrap">
                            {docket.dateFormatted || docket.date}
                          </div>
                          <div className="text-[10px] font-mono font-black text-brand-taupe mt-0.5">
                            {docket.year} Docket
                          </div>
                        </td>

                        {/* 2. Brand & Firm */}
                        <td className="py-4 px-4 sm:px-6 align-top">
                          <div className="flex items-start gap-3">
                            <BrandLogo
                              name={docket.brandName}
                              domain={docket.domain}
                              size="sm"
                              className="mt-0.5 hidden sm:flex"
                            />
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="font-heading font-black text-brand-espresso text-sm group-hover:text-brand-terracotta transition-colors">
                                  {docket.brandName}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-[#FAF4EE] text-brand-espresso border border-brand-espresso/20">
                                  {docket.country === "Canada"
                                    ? "🇨🇦 CFIA"
                                    : docket.country === "Australia"
                                    ? "🇦🇺 ACCC"
                                    : docket.country === "UK & Europe"
                                    ? "🇬🇧 FSA"
                                    : "🇺🇸 US FDA"}
                                </span>
                              </div>
                              <div className="text-[11px] text-brand-taupe font-medium mt-0.5">
                                {docket.companyName}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 3. Product Description */}
                        <td className="py-4 px-4 sm:px-6 align-top">
                          <div className="font-heading font-bold text-brand-espresso line-clamp-2">
                            {docket.productDescription}
                          </div>
                          <div className="text-[11px] text-brand-taupe line-clamp-1 mt-1 italic">
                            Reason: {docket.reason}
                          </div>
                        </td>

                        {/* 4. Classification & Hazard */}
                        <td className="py-4 px-4 sm:px-6 align-top whitespace-nowrap">
                          <div className="space-y-1.5">
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-mono font-black px-2 py-0.5 rounded-full border ${
                                docket.classification === "Class I"
                                  ? "bg-rose-100 text-rose-950 border-rose-500"
                                  : docket.classification === "Class II"
                                  ? "bg-amber-100 text-amber-950 border-amber-400"
                                  : "bg-blue-100 text-blue-950 border-blue-400"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  docket.classification === "Class I"
                                    ? "bg-rose-600"
                                    : docket.classification === "Class II"
                                    ? "bg-amber-500"
                                    : "bg-blue-500"
                                }`}
                              />
                              {docket.classification}
                            </span>
                            <div className="text-[11px] font-mono font-bold text-brand-espresso">
                              {docket.hazardType}
                            </div>
                          </div>
                        </td>

                        {/* 5. Status */}
                        <td className="py-4 px-4 sm:px-6 align-top whitespace-nowrap">
                          {docket.terminated ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Terminated
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-black text-amber-900 bg-amber-50 border border-amber-400 px-2 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              Active Docket
                            </span>
                          )}
                        </td>

                        {/* 6. Expand Drawer Toggle */}
                        <td className="py-4 px-4 sm:px-6 align-top text-right">
                          <button
                            type="button"
                            aria-label={isExpanded ? "Collapse Docket Details" : "Expand Docket Details"}
                            className="p-1.5 rounded-xl border border-brand-espresso/20 hover:border-brand-espresso text-brand-espresso hover:bg-white transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-brand-terracotta" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-brand-taupe" />
                            )}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Details Drawer */}
                      {isExpanded && (
                        <tr className="bg-[#FAF4EE]/70">
                          <td colSpan={6} className="p-4 sm:p-6 border-b border-brand-espresso/15">
                            <div className="bg-white border-2 border-brand-espresso/40 rounded-2xl p-5 shadow-paper-sm space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-espresso/10">
                                <div className="space-y-0.5">
                                  <div className="text-xs font-mono font-black uppercase text-brand-taupe tracking-wider">
                                    {docket.regulatoryAgency ||
                                      (docket.country === "Canada"
                                        ? "CFIA (Canada) Regulatory Notice"
                                        : docket.country === "Australia"
                                        ? "ACCC / PFIAA (Australia) Consumer Safety Notice"
                                        : docket.country === "UK & Europe"
                                        ? "UK FSA / EU RASFF Regulatory Alert"
                                        : "Official FDA Veterinary Enforcement Docket")}
                                  </div>
                                  <div className="font-heading font-black text-base text-brand-espresso">
                                    {docket.brandName} — {docket.companyName}
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                  {docket.fdaNoticeUrl && (
                                    <a
                                      href={docket.fdaNoticeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-espresso text-white text-xs font-heading font-black hover:bg-brand-espresso/90 shadow-paper-sm transition-all"
                                    >
                                      <span>
                                        Official{" "}
                                        {docket.country === "Canada"
                                          ? "CFIA"
                                          : docket.country === "Australia"
                                          ? "ACCC"
                                          : docket.country === "UK & Europe"
                                          ? "FSA / EU"
                                          : "FDA"}{" "}
                                        Notice
                                      </span>
                                      <ExternalLink className="w-3.5 h-3.5 text-brand-olive" />
                                    </a>
                                  )}

                                  {hasBrandProfile && (
                                    <Link
                                      href={`/brand/${docket.brandSlug}`}
                                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-terracotta text-white text-xs font-heading font-black hover:bg-brand-terracotta/90 shadow-paper-sm transition-all"
                                    >
                                      <span>Brand Safety Dossier</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                                {/* Reason Verbatim */}
                                <div className="p-3.5 rounded-xl bg-[#FAF4EE] border border-brand-espresso/15 space-y-1">
                                  <div className="font-mono font-bold text-brand-espresso text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5 text-brand-terracotta" />
                                    Regulatory Reason
                                  </div>
                                  <p className="text-brand-espresso leading-relaxed">
                                    {docket.reason}
                                  </p>
                                </div>

                                {/* Lot Codes */}
                                <div className="p-3.5 rounded-xl bg-[#FAF4EE] border border-brand-espresso/15 space-y-1">
                                  <div className="font-mono font-bold text-brand-espresso text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                                    <Tag className="w-3.5 h-3.5 text-brand-espresso" />
                                    Affected Lot Codes &amp; UPC
                                  </div>
                                  <p className="font-mono text-brand-espresso text-[11px] leading-relaxed break-words">
                                    {docket.lotCodes || "Refer to official FDA notice for individual batch identifiers."}
                                  </p>
                                </div>

                                {/* Distribution Area */}
                                <div className="p-3.5 rounded-xl bg-[#FAF4EE] border border-brand-espresso/15 space-y-1">
                                  <div className="font-mono font-bold text-brand-espresso text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                    Distribution Territory
                                  </div>
                                  <p className="text-brand-espresso leading-relaxed">
                                    {docket.distributionPattern || "Nationwide through licensed pet food distributors and retail stores."}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* =========================================================================
            CLEAN PAGINATION CONTROLS
            ========================================================================= */}
        {totalPages > 1 && (
          <div className="bg-[#FAF4EE] border-t-2 border-brand-espresso px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono font-bold text-brand-espresso">
            <div>
              Showing <span className="font-black">{startIndex + 1}</span> to{" "}
              <span className="font-black">{Math.min(startIndex + pageSize, totalItems)}</span> of{" "}
              <span className="font-black">{totalItems}</span> FDA Recall Dockets
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-xl bg-white border border-brand-espresso/30 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-espresso hover:text-white transition-colors flex items-center gap-1 font-heading font-black"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="px-3 py-1.5 rounded-xl bg-white border border-brand-espresso/30 text-xs font-black">
                Page {currentPage} of {totalPages}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-xl bg-white border border-brand-espresso/30 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-espresso hover:text-white transition-colors flex items-center gap-1 font-heading font-black"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cross-Link Banner to 250+ Brands Directory */}
      <div className="bg-brand-cream border-2.5 border-brand-espresso rounded-3xl p-6 shadow-paper flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase text-brand-terracotta">
            <Building2 className="w-4 h-4" />
            250+ Pet Food Brand Dossiers
          </div>
          <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso">
            Looking for a specific brand's 10-year safety track record?
          </h3>
          <p className="text-xs text-brand-taupe max-w-xl">
            Browse our dedicated Brand Safety Directory indexing Purina, Blue Buffalo, Fromm, Victor, Hill's, and over 250 pet food manufacturers with verified clean slate certificates.
          </p>
        </div>

        <Link
          href="/brands"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-espresso text-white hover:bg-brand-terracotta font-heading font-black text-xs sm:text-sm shadow-paper hover:-translate-y-0.5 transition-all whitespace-nowrap"
        >
          <span>Open 250+ Brand Directory</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
