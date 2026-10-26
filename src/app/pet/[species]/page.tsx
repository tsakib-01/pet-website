import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Dog, Cat, ArrowLeft, ArrowRight, ShieldCheck, AlertTriangle, Layers, Award, Sparkles, HeartPulse } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import { speciesData } from "@/data/species";

export function generateStaticParams() {
  return Object.keys(speciesData).map((species) => ({ species }));
}

export default async function SpeciesSafetyHubPage({
  params,
}: {
  params: Promise<{ species: string }>;
}) {
  const { species } = await params;
  const data = speciesData[species.toLowerCase()] || speciesData["dogs"];

  if (!data) {
    notFound();
  }

  const isDog = data.slug === "dogs";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12 overflow-hidden">
      {/* Breadcrumb & Species Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="btn-pill btn-pill-cream px-3.5 sm:px-4 py-2 text-xs font-black shadow-paper-sm hover:bg-brand-olive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </Link>

        {/* Species Switcher Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 bg-brand-cream/80 border-2 border-brand-espresso rounded-full shadow-paper-sm font-heading">
          <Link
            href="/pet/dogs"
            className={`btn-pill px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-black transition-all ${
              data.slug === "dogs"
                ? "btn-pill-espresso"
                : "bg-transparent border-transparent shadow-none text-brand-espresso hover:bg-brand-cream"
            }`}
          >
            <Dog className="w-4 h-4" /> Canine (Dogs)
          </Link>
          <Link
            href="/pet/cats"
            className={`btn-pill px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-black transition-all ${
              data.slug === "cats"
                ? "btn-pill-espresso"
                : "bg-transparent border-transparent shadow-none text-brand-espresso hover:bg-brand-cream"
            }`}
          >
            <Cat className="w-4 h-4" /> Feline (Cats)
          </Link>
          <Link
            href="/pet/puppy-kitten"
            className={`btn-pill px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-black transition-all ${
              data.slug === "puppy-kitten"
                ? "btn-pill-espresso"
                : "bg-transparent border-transparent shadow-none text-brand-espresso hover:bg-brand-cream"
            }`}
          >
            <HeartPulse className="w-4 h-4" /> Pediatric (Puppy/Kitten)
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
                {data.heroBadge}
              </span>

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-brand-espresso leading-[1.05] tracking-tight">
                {data.title}
              </h1>

              <p className="text-sm sm:text-base text-brand-taupe font-sans leading-relaxed font-medium max-w-xl">
                {data.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                <div className="bg-brand-cream/80 border-2 border-brand-espresso px-3.5 sm:px-4 py-2 rounded-2xl shadow-paper-sm">
                  <span className="text-brand-taupe block text-[10px] font-bold">10-Year Recalls:</span>
                  <span className="font-heading font-black text-base text-brand-terracotta">{data.stats.tenYearRecalls} Dockets</span>
                </div>
                <div className="bg-brand-cream/80 border-2 border-brand-espresso px-3.5 sm:px-4 py-2 rounded-2xl shadow-paper-sm">
                  <span className="text-brand-taupe block text-[10px] font-bold">Primary Hazard:</span>
                  <span className="font-heading font-black text-base text-brand-espresso">{data.stats.mostCommonHazard}</span>
                </div>
                <div className="bg-brand-cream/80 border-2 border-brand-espresso px-3.5 sm:px-4 py-2 rounded-2xl shadow-paper-sm">
                  <span className="text-brand-taupe block text-[10px] font-bold">Monitored Brands:</span>
                  <span className="font-heading font-black text-base text-brand-olive">{data.stats.activeMonitoredBrands} Brands</span>
                </div>
              </div>
            </div>

            {/* Species Portrait Collage */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <div className="paper-box p-3 sm:p-4 bg-brand-cream border-3 border-brand-espresso transform rotate-1 shadow-paper">
                  <img
                    src={data.petImage}
                    alt={data.petBreedName}
                    className="w-full h-56 sm:h-72 object-cover rounded-xl border-2 border-brand-espresso"
                  />
                  <div className="pt-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-heading font-black text-sm text-brand-espresso block">
                        {data.petBreedName}
                      </span>
                      <span className="font-mono text-[10px] text-brand-taupe font-bold">
                        Vulnerability Index: {data.stats.vulnerabilityLevel}
                      </span>
                    </div>
                    <span className="pill-badge pill-badge-verified text-[10px]">
                      VERIFIED AUDIT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* AD CONTAINER */}
      <AdSensePlaceholder slot="species-billboard-04" format="leaderboard" />

      {/* 2. PET FOOD FORMAT RISK COMPARISON */}
      <ScrollReveal direction="up" delayMs={100}>
        <section className="paper-box p-5 sm:p-8 md:p-10 bg-[#FAF4EE] space-y-6">
          <div className="border-b-2.5 border-brand-espresso pb-4">
            <span className="pill-badge pill-badge-alert mb-2">
              Processing Risk Audit
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-brand-espresso">
              Food Format Vulnerability Matrix
            </h2>
            <p className="text-xs sm:text-sm font-sans text-brand-taupe font-medium mt-1">
              How extrusion temperatures, canning retorts, and raw freeze-drying affect contamination rates for {data.speciesName}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {data.dietFormatRiskMatrix.map((item, idx) => (
              <div
                key={idx}
                className="paper-box p-4 sm:p-5 bg-brand-cream/80 border-2.5 border-brand-espresso flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-base text-brand-espresso">
                      {item.format}
                    </span>
                    <span className={`pill-badge text-[9px] ${item.riskColor}`}>
                      {item.riskScore}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-brand-terracotta font-bold">
                    Major Threat: {item.primaryPathogen}
                  </div>
                  <p className="text-xs font-sans text-brand-taupe font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 3. SPECIES SPECIFIC CONTAMINANT WATCH */}
      <ScrollReveal direction="up" delayMs={150}>
        <section className="paper-box p-5 sm:p-8 md:p-10 bg-[#FAF4EE] space-y-6">
          <div className="flex items-center gap-2 border-b-2.5 border-brand-espresso pb-4">
            <AlertTriangle className="w-6 h-6 text-brand-terracotta" />
            <div>
              <h2 className="font-heading text-xl sm:text-3xl font-black text-brand-espresso">
                High-Risk Pathogens for {data.speciesName}
              </h2>
              <p className="text-xs font-sans text-brand-taupe font-medium">
                Clinical conditions that disproportionately harm this species.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.speciesPathogens.map((hz, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 bg-brand-cream/70 border-2 border-brand-espresso/25 rounded-2xl space-y-2"
              >
                <span className="pill-badge pill-badge-alert text-[10px]">
                  {hz.dangerLevel}
                </span>
                <h4 className="font-heading text-base font-black text-brand-espresso">
                  {hz.name}
                </h4>
                <p className="text-xs font-sans text-brand-taupe font-medium leading-relaxed">
                  {hz.whyVulnerable}
                </p>
                <Link
                  href={`/safety/${hz.slug}`}
                  className="btn-pill btn-pill-cream text-xs font-bold px-3 py-1 mt-2 inline-flex"
                >
                  Inspect Triage Protocol →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 4. VERIFIED 10-YEAR CLEAN BRANDS DIRECTORY */}
      <ScrollReveal direction="up" delayMs={100}>
        <section className="paper-box p-5 sm:p-8 md:p-10 bg-[#FAF4EE] space-y-6">
          <div className="flex items-center gap-2 border-b-2.5 border-brand-espresso pb-4">
            <Award className="w-6 h-6 text-brand-olive" />
            <div>
              <h2 className="font-heading text-xl sm:text-3xl font-black text-brand-espresso">
                10-Year Verified Clean Brands for {data.speciesName}
              </h2>
              <p className="text-xs font-sans text-brand-taupe font-medium">
                Manufacturers with outstanding microbiological compliance profiles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.verifiedCleanBrands.map((b) => (
              <div
                key={b.slug}
                className="p-4 bg-brand-cream/90 border-2 border-brand-espresso/30 rounded-2xl flex flex-col justify-between space-y-3 shadow-paper-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="pill-badge bg-brand-espresso text-brand-olive text-[10px] font-black">
                      GRADE {b.grade}
                    </span>
                    <span className="font-mono text-[10px] text-brand-taupe font-bold">
                      {b.tenYearRecalls} Recalls (10y)
                    </span>
                  </div>
                  <h4 className="font-heading text-base font-black text-brand-espresso">
                    {b.name}
                  </h4>
                  <p className="text-xs font-sans text-brand-taupe font-medium">
                    {b.specialty}
                  </p>
                </div>
                <Link
                  href={`/brand/${b.slug}`}
                  className="btn-pill btn-pill-espresso py-2 text-xs font-black justify-center w-full"
                >
                  <span>View Safety Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
