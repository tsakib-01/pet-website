"use client";

import React, { useState } from "react";
import { Building2 } from "lucide-react";

interface Props {
  domain?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function BrandLogo({ domain, name, size = "md", className = "" }: Props) {
  const [hasError, setHasError] = useState(false);

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

  // Dimensions
  const sizeClasses = {
    sm: "w-9 h-9 rounded-xl text-xs",
    md: "w-12 h-12 rounded-2xl text-sm",
    lg: "w-16 h-16 rounded-2xl text-lg",
  }[size];

  const logoUrl = domain && !hasError ? `https://logo.clearbit.com/${domain}?size=128` : null;

  return (
    <div
      className={`relative ${sizeClasses} bg-white border-2 border-brand-espresso shadow-paper-sm flex items-center justify-center overflow-hidden flex-shrink-0 aspect-square ${className}`}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${name} Official Logo`}
          className="w-full h-full object-contain p-1.5 transition-opacity duration-300"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full bg-brand-light-gold/40 flex items-center justify-center font-heading font-black text-brand-espresso select-none tracking-tight">
          {initials || <Building2 className="w-5 h-5 text-brand-espresso" />}
        </div>
      )}
    </div>
  );
}
