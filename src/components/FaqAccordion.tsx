"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "How do I check if my pet's specific bag of food is recalled?",
    a: "Look on the back or bottom crimp of your pet food bag near the expiration date. You will see an ink-stamped 'Lot Number' or 'Batch Code' (e.g., #8841A or #LOT-092). Manufacturers recall specific production batches, not whole brands. Enter this code into our free scanner above to instantly compare against official FDA enforcement dockets.",
  },
  {
    q: "What is the difference between FDA Class I, Class II, and Class III pet food recalls?",
    a: "Class I is the most urgent hazard category, where exposure will cause serious adverse health consequences or death (e.g. fatal Aflatoxin or Salmonella). Class II involves temporary or medically reversible health issues (e.g. elevated Vitamin D). Class III involves technical violations not likely to cause adverse health consequences (e.g. minor label formatting errors).",
  },
  {
    q: "Can I get a full refund if my pet food is subject to a recall?",
    a: "Yes. Under FDA recall guidelines and manufacturer agreements, retailers must provide a 100% full refund or replacement. Most major pet stores (Petco, PetSmart, Chewy, local independent pet shops) do not require a paper receipt—simply bring the bag or a clear photo of the stamped lot number.",
  },
  {
    q: "Can humans get sick from handling recalled pet food?",
    a: "Yes. Bacterial pathogens like Salmonella and Listeria are zoonotic, meaning they easily transmit from pet kibble or freeze-dried treats to humans through touch. Always wash your hands thoroughly with warm water and soap after feeding, and sanitize pet bowls regularly.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Structured Data Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
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
      {/* JSON-LD Script Injection for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="border-b-2.5 border-brand-espresso pb-4">
        <span className="pill-badge pill-badge-verified text-xs mb-2">
          <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
          Pet Food Safety & Recall Guide
        </h3>
        <p className="text-xs sm:text-sm text-brand-taupe font-medium mt-1">
          Essential regulatory guidance verified by veterinary compliance records.
        </p>
      </div>

      <div className="space-y-3 font-sans">
        {FAQS.map((faq, idx) => {
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
