"use client";

import React, { useState } from "react";
import { Building2 } from "lucide-react";

interface Props {
  logoUrl?: string;
  domain?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function BrandLogo({ logoUrl, domain, name, size = "md", className = "" }: Props) {
  const [errorCount, setErrorCount] = useState(0);

  // Extract initials (up to 2 characters) for the typographic monogram fallback
  const getInitials = (str: string) => {
    const clean = str.replace(/[()]/g, "").trim();
    const parts = clean.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  const sizeClasses = {
    sm: "w-9 h-9 rounded-xl text-xs",
    md: "w-12 h-12 rounded-2xl text-sm",
    lg: "w-16 h-16 rounded-2xl text-lg",
  }[size];

  // Multi-tier logo resolution waterfall:
  // Tier 0: Custom explicit logoUrl (if provided)
  // Tier 1: Unavatar high-res brand logo (SVG/PNG)
  // Tier 2: Google 128px Global Favicon CDN
  // Tier 3: DuckDuckGo Icon CDN
  // Fallback: Tactile Monogram Initial Badge
  let activeSrc: string | null = null;
  if (errorCount === 0) {
    if (logoUrl) {
      activeSrc = logoUrl;
    } else if (domain) {
      activeSrc = `https://unavatar.io/${domain}?fallback=false`;
    }
  } else if (errorCount === 1) {
    if (domain) {
      activeSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    }
  } else if (errorCount === 2) {
    if (domain) {
      activeSrc = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
    }
  }

  return (
    <div
      className={`relative ${sizeClasses} bg-white border-2 border-brand-espresso shadow-paper-sm flex items-center justify-center overflow-hidden flex-shrink-0 aspect-square ${className}`}
    >
      {activeSrc ? (
        <img
          src={activeSrc}
          alt={`${name} Logo`}
          className="w-full h-full object-contain p-1.5 transition-opacity duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setErrorCount((prev) => prev + 1)}
        />
      ) : (
        <div className="w-full h-full bg-brand-light-gold/40 flex items-center justify-center font-heading font-black text-brand-espresso select-none tracking-tight">
          {initials || <Building2 className="w-5 h-5 text-brand-espresso" />}
        </div>
      )}
    </div>
  );
}
