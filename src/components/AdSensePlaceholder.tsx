import React from "react";

interface AdProps {
  slot: string;
  format?: "banner" | "rectangle" | "leaderboard" | "inline" | "horizontal";
  className?: string;
  minHeight?: string;
  label?: string;
}

export default function AdSensePlaceholder({
  slot,
  format = "rectangle",
  className = "",
  minHeight,
  label = "Sponsored / Public Notice",
}: AdProps) {
  const heightClasses = {
    leaderboard: "min-h-[90px] md:min-h-[110px]",
    banner: "min-h-[100px]",
    horizontal: "min-h-[120px]",
    rectangle: "min-h-[260px]",
    inline: "min-h-[130px]",
  }[format] || "min-h-[120px]";

  const finalHeight = minHeight || heightClasses;

  return (
    <div
      className={`relative w-full my-6 bg-brand-cream/50 border-2 border-dashed border-brand-taupe/40 rounded-2xl p-3 flex flex-col items-center justify-center text-center overflow-hidden transition-all ${finalHeight} ${className}`}
    >
      <span className="absolute top-1.5 right-2 font-mono text-[10px] tracking-widest text-brand-taupe uppercase">
        {label}
      </span>
      <div className="flex flex-col items-center space-y-1 text-brand-taupe">
        <div className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-espresso/70">
          Google AdSense Placement Slot [{slot}]
        </div>
        <p className="text-xs text-brand-taupe/80 max-w-sm">
          Auto-optimizing responsive banner reserved for verified pet safety & veterinary service sponsors.
        </p>
      </div>
      <div className="absolute -bottom-3 -left-3 text-brand-taupe/10 font-mono text-6xl font-black select-none pointer-events-none">
        ADSENSE
      </div>
    </div>
  );
}
