"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PawPrint, ArrowUp } from "lucide-react";

export default function FloatingScrollCompanion() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track body class to hide completely when mobile navigation drawer is open
  useEffect(() => {
    const checkMenu = () => {
      if (typeof document !== "undefined") {
        setIsMenuOpen(document.body.classList.contains("mobile-menu-open"));
      }
    };

    checkMenu();
    const observer = new MutationObserver(checkMenu);
    if (typeof document !== "undefined" && document.body) {
      observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    }
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Do not render anything when mobile menu is open
  if (isMenuOpen) {
    return null;
  }

  return (
    <div
      id="floating-scroll-companion"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2"
    >
      {/* Quick Launch Tools Pill (Visible when not already on /tools) */}
      {pathname !== "/tools" && (
        <Link
          href="/tools"
          className="btn-pill btn-pill-terracotta text-xs font-black px-4 py-2.5 shadow-pill hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wide"
        >
          <PawPrint className="w-4 h-4 text-brand-olive flex-shrink-0" />
          <span>All Calculators</span>
        </Link>
      )}

      {/* Scroll to Top button when user scrolls down */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full border-2.5 border-brand-espresso bg-white shadow-paper flex items-center justify-center text-brand-espresso hover:bg-brand-olive transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
