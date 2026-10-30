"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PawPrint,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  Dog,
  Cat,
  AlertTriangle,
  Box,
  Calendar,
  Utensils,
  Sparkles,
  ShieldAlert,
  Building2,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open and mark body class
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [mobileMenuOpen]);

  // Essential Desktop Navigation Links (Uncluttered, High Priority)
  const desktopLinks = [
    {
      href: "/recalls",
      label: "Food Recalls",
      icon: <ShieldAlert className="w-3.5 h-3.5 text-brand-terracotta" />,
    },
    {
      href: "/brands",
      label: "Brand Directory",
      icon: <Building2 className="w-3.5 h-3.5 text-brand-leaf" />,
    },
    {
      href: "/tools",
      label: "All Calculators",
      icon: <PawPrint className="w-3.5 h-3.5" />,
    },
    {
      href: "/breed",
      label: "Breed Guides",
      icon: <BookOpen className="w-3.5 h-3.5" />,
    },
    {
      href: "/tools/dog-chocolate-toxicity-calculator",
      label: "Emergency Triage",
      icon: <AlertTriangle className="w-3.5 h-3.5 text-brand-terracotta" />,
      isEmergency: true,
    },
  ];

  // Featured calculators for mobile drawer
  const popularCalculators = [
    {
      href: "/tools/dog-age-calculator",
      label: "Dog Age Calculator",
      desc: "AVMA veterinary human years converter",
      icon: <Dog className="w-4 h-4 text-brand-espresso" />,
    },
    {
      href: "/tools/cat-age-calculator",
      label: "Cat Age Calculator",
      desc: "Feline life stage milestones",
      icon: <Cat className="w-4 h-4 text-brand-espresso" />,
    },
    {
      href: "/tools/dog-crate-size-calculator",
      label: "Dog Crate Sizing",
      desc: "AKC dimension safety formulas",
      icon: <Box className="w-4 h-4 text-brand-espresso" />,
    },
    {
      href: "/tools/puppy-vaccination-schedule",
      label: "Puppy Vaccine Schedule",
      desc: "Core 6-16 week protocol tracker",
      icon: <Calendar className="w-4 h-4 text-brand-espresso" />,
    },
    {
      href: "/tools/cat-food-calculator-wet-and-dry",
      label: "Wet & Dry Food Mixer",
      desc: "Calorie-balanced dual-diet solver",
      icon: <Utensils className="w-4 h-4 text-brand-espresso" />,
    },
  ];

  return (
    <>
      {/* ========================================================
          STICKY TOP HEADER
          Clean, solid background to prevent blur stacking traps
          ======================================================== */}
      <header className="sticky top-0 z-[60] bg-[#FAF4EE] border-b-2.5 border-brand-espresso shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0"
            onClick={() => setMobileMenuOpen(false)}
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

          {/* Desktop Nav (Only Important Sections — Un-Cramped) */}
          <nav className="hidden lg:flex items-center gap-2.5 text-xs font-heading">
            {desktopLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`btn-pill px-3.5 py-1.5 text-xs font-black shadow-paper-sm transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "btn-pill-espresso"
                      : link.isEmergency
                      ? "bg-brand-terracotta/15 text-brand-espresso border-2 border-brand-terracotta hover:bg-brand-terracotta hover:text-white"
                      : "btn-pill-cream hover:bg-brand-olive"
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* Mobile Hamburger / Close Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border-2 border-brand-espresso bg-white shadow-paper-sm text-brand-espresso hover:bg-brand-cream/60 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-brand-espresso" />
              ) : (
                <Menu className="w-5 h-5 text-brand-espresso" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          MOBILE FULLSCREEN SLIDEOVER MENU
          Rendered OUTSIDE <header> so backdrop-filter or layout
          constraints NEVER truncate dropdown height or content.
          ======================================================== */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-dropdown"
          className="lg:hidden fixed inset-x-0 top-14 sm:top-16 bottom-0 z-[55] bg-[#FAF4EE] overflow-y-auto border-t-2.5 border-brand-espresso p-4 sm:p-6 pb-28 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="max-w-lg mx-auto space-y-5">
            {/* 1. Core Primary Hubs (Tactile Cards) */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/recalls"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl border-2.5 border-brand-espresso bg-white shadow-[2.5px_2.5px_0px_#583D32] hover:bg-brand-cream/50 transition-all flex flex-col justify-between group"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-100 border-2 border-brand-espresso flex items-center justify-center shadow-paper-sm mb-2 group-hover:scale-105 transition-transform">
                  <ShieldAlert className="w-4 h-4 text-brand-terracotta" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-bold text-brand-taupe uppercase tracking-wider">
                    FDA Database
                  </div>
                  <div className="font-heading font-black text-xs text-brand-espresso leading-tight">
                    Food Recalls
                  </div>
                </div>
              </Link>

              <Link
                href="/brands"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl border-2.5 border-brand-espresso bg-white shadow-[2.5px_2.5px_0px_#583D32] hover:bg-brand-cream/50 transition-all flex flex-col justify-between group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 border-2 border-brand-espresso flex items-center justify-center shadow-paper-sm mb-2 group-hover:scale-105 transition-transform">
                  <Building2 className="w-4 h-4 text-emerald-800" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-bold text-brand-taupe uppercase tracking-wider">
                    250+ Profiles
                  </div>
                  <div className="font-heading font-black text-xs text-brand-espresso leading-tight">
                    Brand Directory
                  </div>
                </div>
              </Link>

              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl border-2.5 border-brand-espresso bg-white shadow-[2.5px_2.5px_0px_#583D32] hover:bg-brand-cream/50 transition-all flex flex-col justify-between group"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-terracotta border-2 border-brand-espresso flex items-center justify-center shadow-paper-sm mb-2 group-hover:scale-105 transition-transform">
                  <PawPrint className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-bold text-brand-taupe uppercase tracking-wider">
                    Tools
                  </div>
                  <div className="font-heading font-black text-xs text-brand-espresso leading-tight">
                    Calculators
                  </div>
                </div>
              </Link>

              <Link
                href="/breed"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl border-2.5 border-brand-espresso bg-white shadow-[2.5px_2.5px_0px_#583D32] hover:bg-brand-cream/50 transition-all flex flex-col justify-between group"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-olive border-2 border-brand-espresso flex items-center justify-center shadow-paper-sm mb-2 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4 text-brand-espresso" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-bold text-brand-taupe uppercase tracking-wider">
                    Guides
                  </div>
                  <div className="font-heading font-black text-xs text-brand-espresso leading-tight">
                    Breeds
                  </div>
                </div>
              </Link>
            </div>

            {/* 2. Emergency Highlight Tool */}
            <Link
              href="/tools/dog-chocolate-toxicity-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-4 rounded-2xl border-2.5 border-brand-espresso bg-brand-terracotta text-white shadow-[3px_3px_0px_#583D32] flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-brand-espresso flex items-center justify-center shadow-paper-sm flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-brand-terracotta" />
                </div>
                <div>
                  <div className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono font-black uppercase tracking-wider">
                    Emergency Triage
                  </div>
                  <div className="font-heading font-black text-sm text-white">
                    Chocolate Toxicity Calculator
                  </div>
                  <p className="text-[11px] text-white/90 font-sans">
                    Instant mg/kg toxic dose triage
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>

            {/* 3. Popular Calculators Quick Access List */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-brand-taupe tracking-wider flex items-center gap-1.5 px-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
                Popular Calculators
              </div>

              <div className="grid grid-cols-1 gap-2">
                {popularCalculators.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl border-2 border-brand-espresso bg-white font-heading font-black text-xs sm:text-sm text-brand-espresso shadow-paper-sm flex items-center justify-between hover:bg-brand-cream/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-brand-cream border border-brand-espresso flex items-center justify-center flex-shrink-0">
                        {tool.icon}
                      </div>
                      <div>
                        <div>{tool.label}</div>
                        <div className="text-[10px] text-brand-taupe font-normal font-sans">
                          {tool.desc}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-taupe flex-shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. Complete Directory CTA */}
            <div className="pt-2">
              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-pill btn-pill-espresso w-full py-3.5 text-xs font-black justify-center flex items-center gap-2 shadow-[3px_3px_0px_#583D32]"
              >
                <PawPrint className="w-4 h-4 text-brand-olive" />
                Browse All Calculators
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
