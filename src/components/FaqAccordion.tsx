"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "How are the pet calculators calibrated?",
    a: "Every calculator is built using peer-reviewed veterinary algorithms from official bodies including the AVMA (American Veterinary Medical Association), AAHA (American Animal Hospital Association), WSAVA (World Small Animal Veterinary Association), and the ASPCA Animal Poison Control Center.",
  },
  {
    q: "Why is the 7-year age rule for dogs obsolete?",
    a: "Modern veterinary research proves dogs age rapidly in their first two years (reaching roughly 24 human years by age 2) and their aging rate thereafter diverges dramatically by breed size: small dogs age around 4 human years/year, whereas giant breeds age at 7.5 to 8 human years per calendar year.",
  },
  {
    q: "What should I do if my dog ate chocolate?",
    a: "Use our Dog Chocolate Toxicity Calculator immediately to determine the exact mg/kg theobromine dose based on your dog's weight, chocolate type, and ounces consumed. If the dose exceeds 40 mg/kg, seek emergency veterinary attention immediately.",
  },
  {
    q: "Are my pet's measurements and calculations saved on a server?",
    a: "No. All calculation models execute 100% in volatile memory in your browser. No personal pet records or inputs are ever transmitted or saved to external databases.",
  },
];

interface FaqAccordionProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
}

export default function FaqAccordion({
  items = DEFAULT_FAQS,
  title = "Pet Health & Safety Calculator Guide",
  subtitle = "Essential veterinary computational guidance verified by clinical veterinary standards.",
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <div className="paper-box bg-[#FAF4EE] p-5 sm:p-8 rounded-3xl border-2.5 border-brand-espresso space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="border-b-2.5 border-brand-espresso pb-4">
        <span className="pill-badge pill-badge-verified text-xs mb-2">
          <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-brand-taupe font-medium mt-1">
          {subtitle}
        </p>
      </div>

      <div className="space-y-3 font-sans">
        {items.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border-2 transition-all ${
                isOpen
                  ? "bg-brand-cream/80 border-brand-espresso shadow-paper-sm"
                  : "bg-[#FAF4EE] border-brand-espresso/30 hover:border-brand-espresso"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-heading font-black text-sm sm:text-base text-brand-espresso cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-brand-terracotta transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-brand-taupe font-medium leading-relaxed border-t border-brand-espresso/20 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
