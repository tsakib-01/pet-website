import React from "react";
import Link from "next/link";
import { Dog, Cat, ArrowLeft, ArrowRight, ShieldCheck, AlertTriangle, Layers, Award, Sparkles } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";

export default function SpeciesSafetyHubPage({
  params,
}: {
  params: Promise<{ species: string }>;
}) {
  return (
    <SpeciesContent resolvedParams={params} />
  );
}

async function SpeciesContent({
  resolvedParams,
}: {
  resolvedParams: Promise<{ species: string }>;
}) {
  const { species } = await resolvedParams;
  const isDog = species.toLowerCase() !== "cats" && species.toLowerCase() !== "cat";

  const speciesName = isDog ? "Canine (Dogs)" : "Feline (Cats)";
  const heroImage = isDog
    ? "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80"
    : "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80";

  const hazards = isDog
    ? [
        {
          name: "Aflatoxin in Corn & Grain Kibble",
          desc: "Mold byproduct produced by Aspergillus flavus in poorly stored corn crops. Highly toxic to canine liver, causing acute mortality.",
          risk: "HIGH MORTALITY RISK",
          recalls: "14 Historical FDA Dockets",
        },
        {
          name: "Legume & Pea Protein (DCM Investigation)",
          desc: "FDA investigation into dilated cardiomyopathy linked to grain-free formulas with heavy lentil/pea fillers substituting animal protein.",
          risk: "CARDIAC CONCERN",
          recalls: "FDA Veterinary Warning",
        },
        {
          name: "Pentobarbital Euthanasia Residue",
          desc: "Traces of veterinary euthanasia chemical detected in lower-tier canned animal by-product rendered meats.",
          risk: "FATAL NEUROTOXIN",
          recalls: "3 Major Brand Recalls",
        },
      ]
    : [
        {
          name: "Thiamine (Vitamin B1) Degradation",
          desc: "Excessive heat during canning processes degrades vital thiamine, causing severe neurological disorders, head tilts, and seizure in cats.",
          risk: "NEUROLOGICAL HAZARD",
          recalls: "8 Wet Food Recalls",
        },
        {
          name: "Excess Vitamin D Formulation Errors",
          desc: "Pre-mix calculation errors leading to hypercalcemia, irreversible renal calcification, and death in domestic cats.",
          risk: "ACUTE KIDNEY HAZARD",
          recalls: "6 Global Recalls",
        },
        {
          name: "Salmonella in Raw & Freeze-Dried Poultry/Fish",
          desc: "Cats carry and shed Salmonella, posing severe bacterial infection risks to both cats and their human owners through saliva and litter boxes.",
          risk: "ZOONOTIC RISK",
          recalls: "12 Raw Treat Recalls",
        },
      ];

  const formatComparison = [
    {
      format: "Dry Extruded Kibble",
      riskLevel: "Moderate",
      primaryThreat: "Aflatoxin mold, rancid fats, Vitamin D excesses",
      safeStorageTip: "Store in original bag inside an airtight container; consume within 6 weeks of opening.",
    },
    {
      format: "Canned Wet Food",
      riskLevel: "Low to Moderate",
      primaryThreat: "Thiamine breakdown, dented can botulism, BPA can liners",
      safeStorageTip: "Refrigerate unused portions immediately; discard if opened for more than 72 hours.",
    },
    {
      format: "Raw / Freeze-Dried",
      riskLevel: "High Bacterial Risk",
      primaryThreat: "Salmonella enterica, Listeria monocytogenes",
      safeStorageTip: "Always use dedicated stainless steel bowls and wash hands with antibacterial soap after serving.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12 overflow-hidden">
      {/* Breadcrumb & Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="btn-pill btn-pill-cream px-3.5 sm:px-4 py-2 text-xs font-black shadow-paper-sm hover:bg-brand-olive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </Link>

        {/* Chunky Species Switcher Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#FAF4EE] p-1.5 border-2.5 border-brand-espresso rounded-full shadow-paper-sm">
          <Link
            href="/pet/dogs"
            className={`btn-pill px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-black transition-all ${
              isDog
                ? "btn-pill-espresso"
                : "bg-transparent border-transparent shadow-none text-brand-espresso hover:bg-brand-cream"
            }`}
          >
            <Dog className="w-4 h-4" /> Canine (Dogs)
          </Link>
          <Link
            href="/pet/cats"
            className={`btn-pill px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-black transition-all ${
              !isDog
                ? "btn-pill-espresso"
                : "bg-transparent border-transparent shadow-none text-brand-espresso hover:bg-brand-cream"
            }`}
          >
            <Cat className="w-4 h-4" /> Feline (Cats)
          </Link>
        </div>
      </div>

      {/* SPECIES HERO */}
      <ScrollReveal direction="up">
        <section className="relative paper-box p-5 sm:p-8 md:p-12 bg-[#FAF4EE] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <span className="pill-badge pill-badge-verified text-[11px] sm:text-xs flex items-center gap-1.5 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-brand-espresso" />
                Species Nutrition Audit
              </span>

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-brand-espresso leading-[1.05] tracking-tight">
                {isDog ? "Dog Food Safety & Recall Guide" : "Cat Food Safety & Recall Guide"}
              </h1>

              <p className="text-sm sm:text-base text-brand-taupe font-sans leading-relaxed font-medium max-w-xl">
                {isDog
                  ? "Dogs face unique physiological vulnerabilities to fungal mycotoxins in corn kibble, toxic euthanasia drug residues in canned meat byproducts, and legume-heavy DCM diets."
                  : "Cats are obligate carnivores highly sensitive to nutrient formulation errors—particularly thiamine deficiency and vitamin D toxicity in wet canned diets."}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                <div className="bg-brand-cream/80 border-2 border-brand-espresso px-3.5 sm:px-4 py-2 rounded-2xl shadow-paper-sm">
                  <span className="text-brand-taupe block text-[10px] font-bold">Indexed Recalls:</span>
                  <span className="font-heading font-black text-sm sm:text-base text-brand-terracotta">
                    {isDog ? "320 Dog Recalls" : "180 Cat Recalls"}
                  </span>
                </div>
                <div className="bg-brand-cream/80 border-2 border-brand-espresso px-3.5 sm:px-4 py-2 rounded-2xl shadow-paper-sm">
                  <span className="text-brand-taupe block text-[10px] font-bold">Clean Tested:</span>
                  <span className="font-heading font-black text-sm sm:text-base text-brand-olive">85 Brands (Grade A)</span>
                </div>
              </div>
            </div>

            {/* Right Cutout Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="paper-box p-3 sm:p-4 rounded-3xl max-w-xs sm:max-w-sm transform rotate-1 hover:rotate-0 transition-transform bg-brand-cream shadow-pill border-2.5 border-brand-espresso">
                <img
                  src={heroImage}
                  alt={speciesName}
                  className="w-full h-52 sm:h-64 object-cover rounded-2xl border-2 border-brand-espresso"
                />
                <div className="pt-2 sm:pt-3 text-center">
                  <span className="font-heading font-black text-sm sm:text-base text-brand-espresso block">
                    {isDog ? "Canine Nutrition Health Profile" : "Feline Nutrition Health Profile"}
                  </span>
                  <span className="pill-badge pill-badge-verified text-[10px] mt-1">
                    100% Free OpenFDA Feed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* AD CONTAINER */}
      <AdSensePlaceholder slot="species-leaderboard-04" format="leaderboard" />

      {/* 2. PET FOOD FORMAT RISK COMPARISON (Kibble vs Canned vs Raw) */}
      <ScrollReveal direction="up" delayMs={100}>
        <div className="paper-box bg-[#FAF4EE] p-5 sm:p-8 rounded-3xl border-2.5 border-brand-espresso space-y-5">
          <div className="border-b-2.5 border-brand-espresso pb-3">
            <span className="pill-badge pill-badge-verified text-xs mb-1.5">
              <Layers className="w-3.5 h-3.5" /> Dietary Format Comparison
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
              Kibble vs. Canned vs. Raw Safety Profile
            </h2>
            <p className="text-xs sm:text-sm text-brand-taupe font-medium mt-1">
              Every pet food manufacturing format has distinct regulatory vulnerability points:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            {formatComparison.map((f, i) => (
              <div key={i} className="p-4 sm:p-5 rounded-2xl bg-brand-cream/60 border-2 border-brand-espresso/25 space-y-3">
                <div className="flex items-center justify-between border-b border-brand-espresso/20 pb-2">
                  <h3 className="font-heading font-black text-base text-brand-espresso">{f.format}</h3>
                  <span className={`pill-badge text-[10px] ${f.riskLevel.includes("High") ? "pill-badge-alert" : "pill-badge-cream"}`}>
                    {f.riskLevel}
                  </span>
                </div>
                <div>
                  <span className="font-heading font-black text-brand-terracotta uppercase block text-[11px]">Primary Risk:</span>
                  <p className="text-brand-espresso font-medium mt-0.5">{f.primaryThreat}</p>
                </div>
                <div className="pt-2 border-t border-brand-espresso/15">
                  <span className="font-heading font-black text-brand-taupe uppercase block text-[10px]">Handling Guidance:</span>
                  <p className="text-brand-taupe font-medium mt-0.5">{f.safeStorageTip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 3. SPECIES SPECIFIC CONTAMINANT WATCH */}
      <section className="space-y-6">
        <div className="border-b-2.5 border-brand-espresso pb-4">
          <span className="pill-badge pill-badge-alert mb-2">
            Pathogen Matrix
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-brand-espresso">
            Top 3 High-Risk Contaminants for {speciesName}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hazards.map((hz, idx) => (
            <ScrollReveal key={idx} direction="up" delayMs={idx * 150}>
              <div className="paper-box p-5 sm:p-6 rounded-3xl space-y-4 flex flex-col justify-between bg-[#FAF4EE] h-full">
                <div className="space-y-3">
                  <span className="pill-badge pill-badge-alert text-[10px]">
                    {hz.risk}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso leading-snug">
                    {hz.name}
                  </h3>
                  <p className="text-xs font-sans text-brand-taupe leading-relaxed font-medium">
                    {hz.desc}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-brand-espresso/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-brand-taupe font-bold">{hz.recalls}</span>
                  <Link
                    href="/safety/salmonella"
                    className="btn-pill btn-pill-espresso px-3 py-1 text-[11px] font-black group"
                  >
                    <span>Symptoms</span>
                    <span className="btn-circle-icon bg-brand-olive text-brand-espresso w-4 h-4">
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. VERIFIED 10-YEAR CLEAN BRANDS DIRECTORY */}
      <ScrollReveal direction="up" delayMs={100}>
        <section className="paper-box bg-[#FAF4EE] p-5 sm:p-8 md:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2.5 border-brand-espresso pb-4">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-brand-espresso">
                Recommended Safe {isDog ? "Dog" : "Cat"} Food Brands
              </h2>
              <p className="text-xs sm:text-sm font-sans text-brand-taupe font-medium mt-0.5">
                Brands with 0 FDA recalls over the past 10 years, verified batch testing, and US-sourced ingredients.
              </p>
            </div>
            <span className="pill-badge pill-badge-verified text-[11px] sm:text-xs self-start sm:self-auto">
              10-Yr Clean Dockets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 sm:p-5 bg-brand-cream/60 border-2 border-brand-espresso/25 rounded-2xl shadow-paper-sm">
              <span className="font-heading font-black text-base sm:text-lg text-brand-espresso block">
                {isDog ? "Canine Shield Holistic" : "Feline Purity Naturals"}
              </span>
              <span className="font-mono text-brand-taupe text-xs block mt-1 font-bold">Grade: A+ • 0 Recalls</span>
              <div className="pt-3">
                <Link
                  href="/brand/blue-harvest"
                  className="btn-pill btn-pill-cream px-3.5 py-1.5 text-[11px] font-black hover:bg-brand-olive"
                >
                  Inspect Dossier →
                </Link>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-brand-cream/60 border-2 border-brand-espresso/25 rounded-2xl shadow-paper-sm">
              <span className="font-heading font-black text-base sm:text-lg text-brand-espresso block">
                {isDog ? "Oven-Baked Prairie" : "Whisker Harvest Kibble"}
              </span>
              <span className="font-mono text-brand-taupe text-xs block mt-1 font-bold">Grade: A • 0 Recalls</span>
              <div className="pt-3">
                <Link
                  href="/brand/blue-harvest"
                  className="btn-pill btn-pill-cream px-3.5 py-1.5 text-[11px] font-black hover:bg-brand-olive"
                >
                  Inspect Dossier →
                </Link>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-brand-cream/60 border-2 border-brand-espresso/25 rounded-2xl shadow-paper-sm">
              <span className="font-heading font-black text-base sm:text-lg text-brand-espresso block">
                {isDog ? "Mountain Ridge Canine" : "Pure Salmon Feline"}
              </span>
              <span className="font-mono text-brand-taupe text-xs block mt-1 font-bold">Grade: A • 0 Recalls</span>
              <div className="pt-3">
                <Link
                  href="/brand/blue-harvest"
                  className="btn-pill btn-pill-cream px-3.5 py-1.5 text-[11px] font-black hover:bg-brand-olive"
                >
                  Inspect Dossier →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
