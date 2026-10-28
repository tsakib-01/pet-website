"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint, Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
    { href: "/tools", label: "All Calculators" },
    { href: "/tools/dog-age-calculator", label: "Dog Age" },
    { href: "/tools/dog-chocolate-toxicity-calculator", label: "Chocolate Triage" },
    { href: "/tools/dog-crate-size-calculator", label: "Crate Sizing" },
    { href: "/tools/cat-age-calculator", label: "Cat Age" },
    { href: "/tools/puppy-vaccination-schedule", label: "Vaccines" },
  ];

  return (
    <>
      {/* STICKY MAIN HEADER */}
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
                <span className="text-[9px] font-mono font-black bg-brand-olive text-brand-espresso border border-brand-espresso px-1.5 py-0.2 rounded-full uppercase">
                  TOOLS
                </span>
              </div>
              <p className="text-[9px] font-mono font-bold tracking-wider text-brand-taupe uppercase hidden md:block">
                Pet Health & Safety Calculators
              </p>
            </div>
          </Link>

          {/* Desktop Nav Pills */}
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

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href="/tools"
              className="btn-pill btn-pill-terracotta px-3 sm:px-4 py-1.5 text-xs font-black shadow-paper-sm hidden sm:inline-flex"
            >
              <PawPrint className="w-3.5 h-3.5" />
              <span>Explore Tools</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border-2 border-brand-espresso bg-white shadow-paper-sm text-brand-espresso"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Slideover Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-14 sm:top-16 bottom-0 bg-[#FAF4EE] z-50 p-6 overflow-y-auto space-y-6 border-t-2 border-brand-espresso">
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-brand-taupe tracking-wider">
                Health & Safety Calculators
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="p-3.5 rounded-2xl border-2 border-brand-espresso bg-white font-heading font-black text-sm text-brand-espresso shadow-paper-sm flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-brand-terracotta" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-brand-espresso/20 space-y-2">
              <Link
                href="/tools"
                className="btn-pill btn-pill-espresso w-full py-3 text-xs font-black justify-center flex items-center gap-2"
              >
                <PawPrint className="w-4 h-4 text-brand-olive" />
                View Complete Calculator Directory
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
