import React from "react";
import Link from "next/link";
import { PawPrint, ShieldCheck, ArrowRight } from "lucide-react";
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
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 hover:opacity-90 transition-opacity w-fit"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-brand-olive border-2 border-brand-espresso rounded-full flex items-center justify-center shadow-pill group-hover:scale-105 group-hover:-rotate-6 transition-all flex-shrink-0">
              <PawPrint className="w-5 h-5 text-brand-espresso" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-brand-espresso uppercase leading-none">
                PAW<span className="text-brand-terracotta">TRUSTY</span>
              </span>
              <span className="text-[10px] sm:text-[11.5px] font-mono font-bold tracking-normal text-brand-taupe uppercase leading-none -mt-[2px] sm:-mt-[2.5px]">
                Pet Health &amp; Safety
              </span>
            </div>
          </Link>
          <p className="text-xs text-brand-taupe leading-relaxed font-sans font-medium">
            Independent, veterinary-calibrated calculation suite providing canine and feline life-stage age models, emergency chocolate toxicity triage, WSAVA dual-diet portioning, and AKC ergonomic standards.
          </p>
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
                <span>About PawTrusty</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-terracotta transition-colors flex items-center gap-1.5 group">
                <span className="text-brand-terracotta font-black group-hover:translate-x-0.5 transition-transform">→</span>
                <span>Contact & Inquiries</span>
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-brand-terracotta transition-colors flex items-center gap-1.5 group">
                <span className="text-brand-terracotta font-black group-hover:translate-x-0.5 transition-transform">→</span>
                <span>Privacy &amp; Cookie Policy</span>
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-brand-terracotta transition-colors flex items-center gap-1.5 group">
                <span className="text-brand-terracotta font-black group-hover:translate-x-0.5 transition-transform">→</span>
                <span>Terms &amp; Medical Disclaimer</span>
              </Link>
            </li>
            <li>
              <Link href="/recalls" className="hover:text-brand-terracotta transition-colors flex items-center gap-1.5 text-brand-terracotta group">
                <span className="font-black group-hover:translate-x-0.5 transition-transform">→</span>
                <span>FDA Food Recalls (2009–2026)</span>
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-brand-terracotta transition-colors flex items-center gap-1.5 group">
                <span className="text-brand-terracotta font-black group-hover:translate-x-0.5 transition-transform">→</span>
                <span>250+ Brand Safety Directory</span>
              </Link>
            </li>
            <li>
              <Link href="/breed" className="hover:text-brand-terracotta transition-colors flex items-center gap-1.5 group">
                <span className="text-brand-terracotta font-black group-hover:translate-x-0.5 transition-transform">→</span>
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
            <li>
              <Link href="/tools/fish-tank-calculator" className="hover:text-brand-terracotta transition-colors flex items-center gap-1 text-brand-terracotta">
                → Fish Tank & Water Volume
              </Link>
            </li>
            <li>
              <Link href="/tools/aquarium-volume-calculator" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Aquarium Volume & Sump
              </Link>
            </li>
            <li>
              <Link href="/tools/bass-weight-calculator" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Bass Weight Calculator (IGFA)
              </Link>
            </li>
            <li>
              <Link href="/tools/horse-weight-calculator" className="hover:text-brand-terracotta transition-colors flex items-center gap-1">
                → Horse Weight Calculator (AAEP)
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
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left font-mono text-[11px] text-brand-taupe font-bold">
          <div>
            © 2026 PawTrusty — Independent Pet Health &amp; Safety Directory. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <Link href="/privacy" className="hover:text-brand-espresso underline transition-colors">
              Privacy Policy
            </Link>
            <span className="text-brand-espresso/30">•</span>
            <Link href="/terms" className="hover:text-brand-espresso underline transition-colors">
              Terms &amp; Disclaimer
            </Link>
            <span className="text-brand-espresso/30">•</span>
            <Link href="/contact" className="hover:text-brand-espresso underline transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
