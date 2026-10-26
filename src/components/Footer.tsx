import React from "react";
import Link from "next/link";
import { PawPrint, AlertCircle } from "lucide-react";
import AdSensePlaceholder from "./AdSensePlaceholder";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2.5 border-brand-espresso bg-brand-cream text-brand-espresso">
      {/* Upper Footer Sponsor Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <AdSensePlaceholder slot="footer-leaderboard-01" format="leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-brand-terracotta border-2 border-brand-espresso rounded-full flex items-center justify-center text-white shadow-pill">
              <PawPrint className="w-5 h-5" />
            </div>
            <span className="font-heading text-2xl font-black uppercase tracking-tight text-brand-espresso">
              PAW<span className="text-brand-terracotta">TRUTH</span>
            </span>
          </div>
          <p className="text-xs text-brand-taupe leading-relaxed max-w-md font-sans font-medium">
            Independent, real-time veterinary food safety directory indexing official FDA animal food recall dockets, 
            contaminant laboratory tests, and brand safety compliance.
          </p>
          
          {/* Visual Palette Swatches Badge */}
          <div className="pt-2">
            <span className="font-heading text-xs font-black text-brand-taupe uppercase tracking-wider block mb-1.5">
              Verified 5-Color Brand Palette:
            </span>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full border-2 border-brand-espresso bg-[#583D32] shadow-sm" title="#583D32 Espresso Dark"></span>
              <span className="w-7 h-7 rounded-full border-2 border-brand-espresso bg-[#C9C986] shadow-sm" title="#C9C986 Sage Olive"></span>
              <span className="w-7 h-7 rounded-full border-2 border-brand-espresso bg-[#7F6F72] shadow-sm" title="#7F6F72 Taupe Slate"></span>
              <span className="w-7 h-7 rounded-full border-2 border-brand-espresso bg-[#E8D5C5] shadow-sm" title="#E8D5C5 Linen Cream"></span>
              <span className="w-7 h-7 rounded-full border-2 border-brand-espresso bg-[#D57746] shadow-sm" title="#D57746 Terracotta Rust"></span>
            </div>
          </div>
        </div>

        {/* Demo Templates Directory */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-black uppercase tracking-wider text-brand-espresso border-b-2 border-brand-espresso pb-1">
            Browse Directory
          </h4>
          <ul className="space-y-2 text-xs font-heading font-bold">
            <li>
              <Link href="/" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Home Explorer
              </Link>
            </li>
            <li>
              <Link href="/brand/purina" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Brand Dossiers (8 Brands)
              </Link>
            </li>
            <li>
              <Link href="/recall/fda-2024-salmonella-kibble" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Recall Dockets (8 Cases)
              </Link>
            </li>
            <li>
              <Link href="/pet/dogs" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Species Safety Hubs
              </Link>
            </li>
            <li>
              <Link href="/safety/salmonella" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Pathogen Hazard Guides
              </Link>
            </li>
            <li>
              <Link href="/state/california" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → State Enforcement Registries
              </Link>
            </li>
          </ul>
        </div>

        {/* Regulatory & FDA Compliance */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-black uppercase tracking-wider text-brand-espresso border-b-2 border-brand-espresso pb-1">
            Regulatory Notice
          </h4>
          <div className="bg-[#FAF4EE] p-4 border-2 border-brand-espresso rounded-2xl text-xs text-brand-taupe leading-relaxed font-sans font-medium">
            <p className="flex items-center gap-1.5 mb-1.5 font-heading font-black text-brand-espresso">
              <AlertCircle className="w-4 h-4 text-brand-terracotta flex-shrink-0" />
              Official Government Data
            </p>
            Recall notices, lot distributions, and hazard ratings are referenced directly from public FDA enforcement dockets (OpenFDA).
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-brand-espresso/30 py-4 px-4 text-center font-mono text-[11px] text-brand-taupe font-bold">
        <p>© 2026 PawTruth Inspector. Designed with Terry Ho punchy pill typography & buttons. Zero-database architecture.</p>
      </div>
    </footer>
  );
}
