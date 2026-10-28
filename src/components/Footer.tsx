import React from "react";
import Link from "next/link";
import { PawPrint, ShieldCheck, Code2, ArrowRight } from "lucide-react";
import AdSensePlaceholder from "./AdSensePlaceholder";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2.5 border-brand-espresso bg-brand-cream text-brand-espresso">
      {/* Upper Footer Sponsor Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <AdSensePlaceholder slot="footer-leaderboard-01" format="leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-brand-terracotta border-2 border-brand-espresso rounded-full flex items-center justify-center text-white shadow-pill flex-shrink-0">
              <PawPrint className="w-5 h-5 flex-shrink-0" />
            </div>
            <span className="font-heading text-2xl font-black uppercase tracking-tight text-brand-espresso">
              PAW<span className="text-brand-terracotta">TRUTH</span>
            </span>
          </div>
          <p className="text-xs text-brand-taupe leading-relaxed font-sans font-medium">
            Independent, veterinary-calibrated calculation suite providing canine and feline life-stage age models, emergency chocolate toxicity triage, WSAVA dual-diet portioning, and AKC ergonomic standards.
          </p>

          {/* Development Attribution */}
          <div className="pt-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-brand-espresso shadow-[2.5px_2.5px_0px_#583D32] text-xs font-heading font-black text-brand-espresso">
              <Code2 className="w-4 h-4 text-brand-terracotta flex-shrink-0" />
              <span>Developed by <strong className="text-brand-espresso font-black">White Stone</strong></span>
            </div>
          </div>
        </div>

        {/* About & Company Navigation */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-black uppercase tracking-wider text-brand-espresso border-b-2 border-brand-espresso pb-1">
            About & Inquiries
          </h4>
          <ul className="space-y-2 text-xs font-heading font-bold">
            <li>
              <Link href="/about" className="hover:text-brand-terracotta transition-colors flex items-center gap-1.5 group">
                <span className="text-brand-terracotta font-black group-hover:translate-x-0.5 transition-transform">→</span>
                <span>About PawTruth</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-terracotta transition-colors flex items-center gap-1.5 group">
                <span className="text-brand-terracotta font-black group-hover:translate-x-0.5 transition-transform">→</span>
                <span>Contact & Inquiries</span>
              </Link>
            </li>
            <li>
              <Link href="/breed" className="hover:text-brand-terracotta transition-colors flex items-center gap-1.5 text-brand-terracotta group">
                <span className="font-black group-hover:translate-x-0.5 transition-transform">→</span>
                <span>Breed Care Guides</span>
              </Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-brand-terracotta transition-colors flex items-center gap-1.5 group">
                <span className="text-brand-terracotta font-black group-hover:translate-x-0.5 transition-transform">→</span>
                <span>All Calculators Directory</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Popular Calculators Directory */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-black uppercase tracking-wider text-brand-espresso border-b-2 border-brand-espresso pb-1">
            Core Calculators
          </h4>
          <ul className="space-y-2 text-xs font-heading font-bold">
            <li>
              <Link href="/tools/dog-age-calculator" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Dog Age Calculator (AVMA)
              </Link>
            </li>
            <li>
              <Link href="/tools/dog-chocolate-toxicity-calculator" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Dog Chocolate Toxicity Triage
              </Link>
            </li>
            <li>
              <Link href="/tools/puppy-vaccination-schedule" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Puppy Vaccination Schedule
              </Link>
            </li>
            <li>
              <Link href="/tools/cat-age-calculator" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Cat Age Calculator (AAFP)
              </Link>
            </li>
            <li>
              <Link href="/tools/cat-food-calculator-wet-and-dry" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Wet & Dry Food Splitter
              </Link>
            </li>
          </ul>
        </div>

        {/* Regulatory & Veterinary Disclaimer */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-black uppercase tracking-wider text-brand-espresso border-b-2 border-brand-espresso pb-1">
            Clinical Standards
          </h4>
          <div className="bg-[#FAF4EE] p-4 border-2 border-brand-espresso rounded-2xl text-xs text-brand-taupe leading-relaxed font-sans font-medium shadow-paper-sm">
            <p className="flex items-center gap-1.5 mb-1.5 font-heading font-black text-brand-espresso">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              Veterinary Formulations
            </p>
            All calculations are built strictly upon protocols from AVMA, WSAVA, AAHA, and Merck Veterinary Manual. Educational tool suite only; not a substitute for clinical veterinary diagnosis.
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-brand-espresso/30 py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-mono text-[11px] text-brand-taupe font-bold">
          <div>
            © 2026 PawTruth — Pet Health & Safety Calculators. All rights reserved. Zero tracking cookies.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-heading font-bold text-brand-espresso">
            <Link href="/about" className="hover:text-brand-terracotta transition-colors">
              About
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-brand-terracotta transition-colors">
              Contact
            </Link>
            <span>•</span>
            <Link href="/breed" className="hover:text-brand-terracotta transition-colors">
              Breeds
            </Link>
            <span>•</span>
            <Link href="/tools" className="hover:text-brand-terracotta transition-colors">
              Calculators
            </Link>
          </div>
          <div className="flex items-center gap-1.5 text-brand-espresso">
            <span>Developed by</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-brand-espresso shadow-[1.5px_1.5px_0px_#583D32] font-heading font-black uppercase text-brand-espresso">
              White Stone
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
