"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShieldAlert, ArrowDown, ArrowUp } from "lucide-react";

export default function FloatingScrollCompanion() {
  const [isAtSection, setIsAtSection] = useState(false);
  const [direction, setDirection] = useState<"down" | "up">("down");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("lot-checker");
      if (!el) {
        // If not on homepage, or element not in DOM, keep button visible to allow navigating to it
        setIsAtSection(false);
        setDirection("down");
        return;
      }

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // The section is considered active/in-view when its bounds overlap the primary viewport area
      const isVisible = rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25;

      setIsAtSection(isVisible);

      // If user has scrolled past below the section, arrow points up; otherwise down
      if (rect.bottom <= windowHeight * 0.25) {
        setDirection("up");
      } else {
        setDirection("down");
      }
    };

    // Initial check after component mounts
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  const scrollToChecker = () => {
    const el = document.getElementById("lot-checker");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/#lot-checker";
    }
  };

  return (
    <div
      className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-300 ease-in-out ${
        isAtSection
          ? "opacity-0 pointer-events-none translate-y-6 scale-95"
          : "opacity-100 pointer-events-auto translate-y-0 scale-100"
      }`}
    >
      <button
        onClick={scrollToChecker}
        className="btn-pill btn-pill-terracotta text-xs font-black px-4 py-2.5 shadow-pill hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wide"
        aria-label="Verify Your Food Lot"
      >
        <ShieldAlert className="w-4 h-4 text-brand-olive flex-shrink-0" />
        <span>Verify Your Food Lot</span>
        {direction === "up" ? (
          <ArrowUp className="w-3.5 h-3.5 text-brand-olive animate-pulse" />
        ) : (
          <ArrowDown className="w-3.5 h-3.5 text-brand-olive animate-pulse" />
        )}
      </button>
    </div>
  );
}
