"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function FloatingScrollCompanion() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Do not render anything when mobile menu is open or when near the top
  if (isMenuOpen || !showScrollTop) {
    return null;
  }

  return (
    <div
      id="floating-scroll-companion"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-30"
    >
      {/* Sleek Scroll to Top button when user scrolls down */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full border-2.5 border-brand-espresso bg-white shadow-paper flex items-center justify-center text-brand-espresso hover:bg-brand-olive transition-all cursor-pointer aspect-square flex-shrink-0"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 flex-shrink-0" />
      </button>
    </div>
  );
}
