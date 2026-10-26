import React from "react";
import Link from "next/link";
import { Search, ShieldAlert, AlertTriangle, ArrowRight, CheckCircle2, PawPrint, Sparkles, Filter, ChevronRight, Activity, MapPin, Dog, Cat } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import InteractiveLotScanner from "@/components/InteractiveLotScanner";
import InteractiveUSMap from "@/components/InteractiveUSMap";
import FaqAccordion from "@/components/FaqAccordion";

export default function HomePage() {
  const recentRecalls = [
    {
      id: "fda-2024-salmonella-kibble",
      brand: "Wild Harvest Naturals",
      species: "Cats",
      product: "Freeze-Dried Atlantic Salmon Cat Treats (4 oz)",
      hazard: "Salmonella Contamination Risk",
      date: "October 18, 2026",
      severity: "CLASS I (URGENT)",
      lots: ["8841A", "8841B", "8842"],
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "fda-2024-aflatoxin-dog-corn",
      brand: "Hearty Paws Premier",
      species: "Dogs",
      product: "Adult Grain-Inclusive Roasted Chicken Kibble (30 lb)",
      hazard: "Elevated Aflatoxin Levels Detected",
      date: "September 29, 2026",
      severity: "CLASS I (URGENT)",
      lots: ["LOT-HP-092", "LOT-HP-094"],
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "fda-2024-vitamin-d-canned",
      brand: "PurrPure Holistic",
      species: "Cats",
      product: "Pâté Turkey & Giblets Canned Cat Food (5.5 oz)",
      hazard: "Excess Vitamin D Formulation Error",
      date: "August 14, 2026",
      severity: "CLASS II (POTENTIAL ILLNESS)",
      lots: ["C-2026-VTD"],
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const brandWatch = [
    { name: "Blue Harvest / Blue Buffalo", slug: "blue-harvest", grade: "B-", recalls: 2, status: "Active Watchlist", isAlert: true },
    { name: "Canine Shield Holistic", slug: "canine-shield", grade: "A+", recalls: 0, status: "10-Yr Clean Docket", isAlert: false },
    { name: "Hill's Science Diet", slug: "blue-harvest", grade: "A", recalls: 1, status: "Clean Tested", isAlert: false },
    { name: "Prairie Bark Mills", slug: "blue-harvest", grade: "D", recalls: 5, status: "Multiple Warnings", isAlert: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12 sm:space-y-16 overflow-hidden">
      {/* 1. HERO SECTION: Responsive Collage with Scroll Reveal */}
      <ScrollReveal direction="up">
        <section className="relative paper-box p-5 sm:p-8 md:p-12 overflow-hidden bg-[#FAF4EE]">
          {/* Pill Badges Floated */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="pill-badge pill-badge-alert text-[10px] sm:text-xs">
              <Sparkles className="w-3.5 h-3.5" /> 2026 OFFICIAL DATABASE
            </span>
            <span className="pill-badge pill-badge-verified text-[10px] sm:text-xs">
              OpenFDA Public Feed
            </span>
            <span className="pill-badge pill-badge-cream text-[10px] sm:text-xs hidden sm:inline-flex">
              84,200 Bags Cleared
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Hero Left Content */}
            <div className="order-2 lg:order-1 lg:col-span-7 space-y-5 sm:space-y-6">
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-brand-espresso leading-[1.08] tracking-tight">
                DON’T GUESS WHAT’S IN THEIR BOWL.{" "}
                <span className="inline-block bg-brand-terracotta text-[#FAF4EE] px-3 sm:px-4 py-0.5 sm:py-1 rounded-full border-2 border-brand-espresso shadow-pill transform -rotate-1 mt-1">
                  WE TRACK EVERY RECALL.
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-brand-taupe leading-relaxed font-sans font-medium max-w-xl">
                Real-time FDA pet food recall dockets, instant lot number scanner, and verified brand safety ratings before feeding your pet.
              </p>

              {/* Mobile-Friendly Search Box */}
              <div className="pt-1">
                <form action="/brand/blue-harvest" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-brand-cream/80 p-2 border-2.5 border-brand-espresso rounded-2xl sm:rounded-full shadow-paper">
                  <div className="relative flex-grow flex items-center pl-2 sm:pl-4">
                    <Search className="w-5 h-5 text-brand-taupe flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search brand (e.g. Purina, Blue Buffalo, Hill's)..."
                      className="w-full pl-2.5 pr-2 py-2 sm:py-3 bg-transparent font-sans font-bold text-xs sm:text-sm text-brand-espresso placeholder-brand-taupe focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-pill btn-pill-espresso w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-black group justify-center flex-shrink-0"
                  >
                    <span>Inspect Brand</span>
                    <span className="btn-circle-icon bg-brand-olive text-brand-espresso">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </form>
              </div>

              {/* Quick Filter Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] sm:text-xs font-heading font-black uppercase text-brand-taupe mr-1">
                  Explore:
                </span>
                <Link href="/pet/dogs" className="btn-pill btn-pill-cream px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-bold shadow-paper-sm hover:bg-brand-olive flex items-center gap-1.5">
                  <Dog className="w-3.5 h-3.5 text-brand-espresso" />
                  Dogs
                </Link>
                <Link href="/pet/cats" className="btn-pill btn-pill-cream px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-bold shadow-paper-sm hover:bg-brand-olive flex items-center gap-1.5">
                  <Cat className="w-3.5 h-3.5 text-brand-espresso" />
                  Cats
                </Link>
                <Link href="/safety/salmonella" className="btn-pill btn-pill-terracotta px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-bold shadow-paper-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-brand-olive" />
                  Salmonella
                </Link>
              </div>
            </div>

            {/* Hero Right Visual Collage (Shifted to top on mobile via order-1) */}
            <div className="order-1 lg:order-2 lg:col-span-5 relative flex justify-center pt-2 sm:pt-4">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <div className="paper-box p-3 sm:p-4 bg-brand-cream border-2.5 border-brand-espresso transform -rotate-1 hover:rotate-0 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=80"
                    alt="Happy healthy dog"
                    className="w-full h-52 sm:h-64 object-cover rounded-xl border-2 border-brand-espresso"
                  />
                  <div className="pt-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-heading font-black text-sm sm:text-base text-brand-espresso block">
                        Golden Retriever (Milo)
                      </span>
                      <span className="font-mono text-[10px] sm:text-xs text-brand-taupe font-bold">
                        Batch Tested: 100% Clean
                      </span>
                    </div>
                    <span className="pill-badge pill-badge-verified text-[10px]">
                      VERIFIED
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-6 w-36 sm:w-48 paper-box p-2 sm:p-3 bg-[#FAF4EE] border-2 sm:border-2.5 border-brand-espresso transform rotate-3 hover:rotate-1 transition-transform shadow-paper">
                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80"
                    alt="Curious healthy cat"
                    className="w-full h-24 sm:h-32 object-cover rounded-lg border border-brand-espresso"
                  />
                  <div className="pt-1 text-center">
                    <span className="font-heading text-[10px] sm:text-xs font-black text-brand-espresso block">
                      Feline Safe Check
                    </span>
                    <span className="pill-badge pill-badge-alert text-[8px] sm:text-[10px] py-0.2 mt-0.5">
                      3 Recalls Tracked
                    </span>
                  </div>
                </div>

                <div className="absolute -top-3 -right-2 sm:-top-5 sm:-right-3 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2.5 border-brand-espresso bg-brand-olive flex flex-col items-center justify-center transform rotate-12 shadow-pill">
                  <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase text-brand-espresso">FDA</span>
                  <span className="font-heading text-sm sm:text-lg font-black text-brand-espresso leading-none">100%</span>
                  <span className="font-mono text-[7px] sm:text-[8px] font-black uppercase text-brand-espresso">FREE</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* AD CONTAINER: High-Impact Billboard */}
      <AdSensePlaceholder slot="home-top-billboard-01" format="banner" />

      {/* 2. WORKING REAL-TIME LOT SCANNER WIDGET */}
      <ScrollReveal direction="up" delayMs={100}>
        <div id="lot-checker">
          <InteractiveLotScanner />
        </div>
      </ScrollReveal>

      {/* 3. RECENT FDA RECALL DOCKETS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2.5 border-brand-espresso pb-4">
          <div>
            <span className="pill-badge pill-badge-alert mb-2">
              Active Hazard Notices
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-brand-espresso">
              Recent FDA Recall Dockets
            </h2>
          </div>
          <Link
            href="/pet/dogs"
            className="btn-pill btn-pill-cream px-4 py-2 text-xs font-black hover:bg-brand-olive shadow-paper-sm self-start sm:self-auto"
          >
            <span>View All 500+ Dockets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentRecalls.map((recall, idx) => (
            <ScrollReveal key={recall.id} direction="up" delayMs={idx * 150}>
              <div className="paper-box p-4 sm:p-5 flex flex-col justify-between group hover:-translate-y-1.5 transition-all bg-[#FAF4EE] h-full">
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-brand-espresso h-44 sm:h-48">
                    <img
                      src={recall.image}
                      alt={recall.product}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 pill-badge bg-brand-espresso text-brand-cream border-brand-cream text-[10px] flex items-center gap-1">
                      {recall.species === "Dogs" ? (
                        <>
                          <Dog className="w-3 h-3 text-brand-olive" /> DOG
                        </>
                      ) : (
                        <>
                          <Cat className="w-3 h-3 text-brand-olive" /> CAT
                        </>
                      )}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 pill-badge pill-badge-alert text-[10px]">
                      {recall.severity}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-brand-taupe font-bold block">
                      {recall.date} • {recall.brand}
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso leading-snug mt-1 group-hover:text-brand-terracotta transition-colors">
                      {recall.product}
                    </h3>
                  </div>

                  <div className="bg-brand-cream/60 p-3 border-2 border-brand-espresso/30 rounded-xl text-xs font-sans text-brand-espresso">
                    <span className="font-heading font-black text-brand-terracotta uppercase flex items-center gap-1.5 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-brand-terracotta" />
                      Hazard Notice:
                    </span>
                    <p className="font-medium">{recall.hazard}</p>
                  </div>

                  <div className="font-mono text-xs text-brand-taupe font-bold">
                    <span className="text-brand-espresso font-black">Affected Lots: </span>
                    {recall.lots.join(", ")}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t-2 border-brand-espresso/20 flex items-center justify-between">
                  <Link
                    href={`/recall/${recall.id}`}
                    className="btn-pill btn-pill-espresso px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] font-black group"
                  >
                    <span>Inspect Docket</span>
                    <span className="btn-circle-icon bg-brand-olive text-brand-espresso w-5 h-5">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold text-brand-taupe">#FDA-9921</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE US STATE RECALL DISTRIBUTION MAP */}
      <ScrollReveal direction="up" delayMs={100}>
        <InteractiveUSMap />
      </ScrollReveal>

      {/* 5. BRAND SAFETY LEADERBOARD */}
      <ScrollReveal direction="up" delayMs={150}>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 paper-box p-5 sm:p-8 bg-[#FAF4EE]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2.5 border-brand-espresso pb-4 mb-4">
              <div>
                <span className="pill-badge pill-badge-verified mb-2">
                  Monitoring Index
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
                  Brand Safety Watchlist
                </h2>
              </div>
              <Link
                href="/brand/blue-harvest"
                className="btn-pill btn-pill-cream px-3.5 py-1.5 text-xs font-black hover:bg-brand-olive shadow-paper-sm self-start sm:self-auto"
              >
                View 250 Brands →
              </Link>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b-2 border-brand-espresso/30 text-brand-taupe font-heading font-black uppercase">
                    <th className="py-3">Brand Name</th>
                    <th className="py-3">Grade</th>
                    <th className="py-3">FDA Recalls</th>
                    <th className="py-3">Status</th>
                    <th className="py-3 text-right">Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-espresso/15">
                  {brandWatch.map((brand, i) => (
                    <tr key={i} className="hover:bg-brand-cream/50 transition-colors">
                      <td className="py-3.5 font-heading font-black text-base text-brand-espresso">
                        {brand.name}
                      </td>
                      <td className="py-3.5">
                        <span className={`pill-badge text-xs px-2.5 py-0.5 ${brand.isAlert ? "pill-badge-alert" : "pill-badge-verified"}`}>
                          {brand.grade}
                        </span>
                      </td>
                      <td className="py-3.5 font-mono font-bold text-brand-espresso">
                        {brand.recalls} Events
                      </td>
                      <td className={`py-3.5 font-heading font-bold ${brand.isAlert ? "text-brand-terracotta" : "text-brand-olive"}`}>
                        {brand.status}
                      </td>
                      <td className="py-3.5 text-right">
                        <Link
                          href={`/brand/${brand.slug}`}
                          className="btn-pill btn-pill-cream px-3 py-1 text-[11px] font-black hover:bg-brand-olive shadow-paper-sm"
                        >
                          Inspect
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Touch Cards */}
            <div className="sm:hidden space-y-3">
              {brandWatch.map((brand, i) => (
                <div
                  key={i}
                  className="bg-brand-cream/50 p-3.5 rounded-2xl border-2 border-brand-espresso/20 flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="font-heading font-black text-base text-brand-espresso block">
                      {brand.name}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`pill-badge text-[10px] px-2 py-0.2 ${brand.isAlert ? "pill-badge-alert" : "pill-badge-verified"}`}>
                        {brand.grade}
                      </span>
                      <span className="font-mono text-[10px] text-brand-taupe font-bold">
                        {brand.recalls} Recalls
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/brand/${brand.slug}`}
                    className="btn-pill btn-pill-cream px-3 py-1 text-[11px] font-black hover:bg-brand-olive shadow-paper-sm flex-shrink-0"
                  >
                    Inspect →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="paper-box p-4 bg-brand-cream/80">
              <span className="font-heading font-black text-[11px] uppercase tracking-wider text-brand-taupe block mb-2">
                Veterinary Partner Spotlight
              </span>
              <AdSensePlaceholder slot="home-sidebar-rectangle-01" format="rectangle" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 6. EXPANDABLE FAQ ACCORDION WITH GOOGLE FAQPAGE SCHEMA */}
      <ScrollReveal direction="up" delayMs={100}>
        <FaqAccordion />
      </ScrollReveal>
    </div>
  );
}
