"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, PawPrint, Menu, X, ArrowRight, Dog, Cat, Sparkles, AlertTriangle, HeartPulse } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Explorer" },
    { href: "/brand/purina", label: "Brand Dossiers" },
    { href: "/recall/fda-2024-salmonella-kibble", label: "Recall Dockets" },
    { href: "/pet/dogs", label: "Species Hub" },
    { href: "/safety/salmonella", label: "Hazard Guide" },
    { href: "/state/california", label: "State Feed" },
  ];

  return (
    <>
      {/* 1. TOP TICKER BAR: Hidden on mobile to save vertical space; visible on tablet/desktop */}
      <div className="hidden sm:block bg-brand-terracotta text-[#FAF4EE] py-1.5 px-4 overflow-hidden border-b-2 border-brand-espresso">
        <div className="max-w-7xl mx-auto flex items-center text-xs font-mono font-bold tracking-wider">
          <span className="bg-brand-espresso text-brand-olive px-2.5 py-0.5 rounded-full text-[10px] mr-3 whitespace-nowrap uppercase flex items-center gap-1.5 border border-brand-olive/40 shadow-sm flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-olive animate-ping"></span>
            LIVE FDA FEED
          </span>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee inline-block space-x-10 font-bold uppercase text-[11px]">
              <span>[URGENT] CLASS I RECALL: Wild Harvest Freeze-Dried Salmon (Lot #8841) • High Salmonella Risk</span>
              <span>[ALERT] PURINA LOT 4022 INVESTIGATION: FDA Veterinary Safety Update Active</span>
              <span>[VERIFIED] 84,200 BAGS CLEARED IN OCTOBER 2026 AUDIT</span>
              <span>[URGENT] CLASS I RECALL: Wild Harvest Freeze-Dried Salmon (Lot #8841) • High Salmonella Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STICKY MAIN HEADER: Slim, compact, perfectly fitted for both mobile & desktop */}
      <header className="sticky top-0 z-50 bg-[#FAF4EE]/95 backdrop-blur-md border-b-2.5 border-brand-espresso shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-brand-olive border-2 border-brand-espresso rounded-full flex items-center justify-center shadow-pill group-hover:scale-105 group-hover:-rotate-6 transition-all flex-shrink-0">
              <PawPrint className="w-5 h-5 sm:w-5 sm:h-5 text-brand-espresso" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-brand-espresso uppercase">
                  PAW<span className="text-brand-terracotta">TRUTH</span>
                </span>
                <span className="text-[9px] font-mono font-black bg-brand-cream border border-brand-espresso px-1.5 py-0.2 rounded-full uppercase">
                  FDA
                </span>
              </div>
              <p className="text-[9px] font-mono font-bold tracking-wider text-brand-taupe uppercase hidden md:block">
                Pet Food Safety & Recall Inspector
              </p>
            </div>
          </Link>

          {/* Desktop Nav Pills (Hidden on Mobile) */}
          <nav className="hidden lg:flex items-center gap-2 text-xs font-heading">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`btn-pill px-3.5 py-1.5 text-xs font-black shadow-paper-sm transition-all ${
                    isActive
                      ? "btn-pill-espresso"
                      : "btn-pill-cream hover:bg-brand-olive"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* "Verify Lot #" CTA Button */}
            <Link
              href="/#lot-checker"
              className="btn-pill btn-pill-terracotta px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black shadow-pill flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-brand-olive flex-shrink-0" />
              <span className="hidden xs:inline">Check Lot #</span>
              <span className="xs:hidden">Check</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden btn-pill btn-pill-cream p-2 text-brand-espresso shadow-paper-sm hover:bg-brand-olive cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 3. MOBILE FULL-SCREEN SLIDE-OVER MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-14 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF4EE] border-b-3 border-brand-espresso shadow-paper-lg p-5 space-y-5 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
            {/* Urgent Alert Banner */}
            <div className="p-3 bg-brand-terracotta/15 border-2 border-brand-terracotta rounded-2xl flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-brand-terracotta flex-shrink-0 animate-pulse" />
              <span className="font-heading font-black text-xs text-brand-espresso leading-tight">
                ACTIVE RECALL BULLETIN: 3 Batches Recalled for Salmonella (October 2026)
              </span>
            </div>

            {/* Navigation Links in Chunky Pill Buttons */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold text-brand-taupe uppercase tracking-widest block pl-1">
                Select Template Page:
              </span>
              <div className="grid grid-cols-1 gap-2 font-heading font-bold">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`btn-pill justify-start px-4 py-3 text-xs w-full shadow-paper-sm transition-all ${
                        isActive
                          ? "btn-pill-espresso"
                          : "btn-pill-cream hover:bg-brand-olive"
                      }`}
                    >
                      <span className="flex-grow text-left">{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Species Switcher */}
            <div className="pt-2 border-t-2 border-brand-espresso/20 space-y-2">
              <span className="font-mono text-[10px] font-bold text-brand-taupe uppercase tracking-widest block pl-1">
                Species Portals:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <Link
                  href="/pet/dogs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-pill btn-pill-cream py-2.5 text-[11px] font-black justify-center shadow-paper-sm hover:bg-brand-olive"
                >
                  <Dog className="w-3.5 h-3.5 mr-1 text-brand-espresso" />
                  Dogs
                </Link>
                <Link
                  href="/pet/cats"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-pill btn-pill-cream py-2.5 text-[11px] font-black justify-center shadow-paper-sm hover:bg-brand-olive"
                >
                  <Cat className="w-3.5 h-3.5 mr-1 text-brand-espresso" />
                  Cats
                </Link>
                <Link
                  href="/pet/puppy-kitten"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-pill btn-pill-cream py-2.5 text-[11px] font-black justify-center shadow-paper-sm hover:bg-brand-olive"
                >
                  <HeartPulse className="w-3.5 h-3.5 mr-1 text-brand-terracotta" />
                  Puppy/Kitten
                </Link>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <Link
                href="/#lot-checker"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-pill btn-pill-terracotta w-full py-3.5 text-xs font-black justify-center shadow-pill"
              >
                <ShieldAlert className="w-4 h-4 text-brand-olive mr-1.5" />
                <span>Verify Your Food Lot Number</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
