import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Mail,
  Clock,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";

export const metadata: Metadata = {
  title: "Contact PawTruth | Feedback, Formula Suggestions & Inquiries",
  description:
    "Get in touch with the PawTruth team. Submit algorithmic feedback, request new veterinary calculators, report breed standard updates, or propose clinical partnerships.",
  keywords: [
    "contact pawtruth",
    "pet calculator feedback",
    "veterinary formula suggestions",
    "pawtruth email",
    "pet health support",
  ],
  alternates: {
    canonical: "https://pawtruth.com/contact",
  },
  openGraph: {
    title: "Contact PawTruth | Pet Health Directory",
    description:
      "Reach our engineering and editorial team for algorithmic suggestions, breed updates, and clinical feedback.",
    url: "https://pawtruth.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact PawTruth | Pet Health & Calculators",
    description:
      "Reach our engineering and editorial team for algorithmic suggestions, breed updates, and clinical feedback.",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://pawtruth.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact",
            item: "https://pawtruth.com/contact",
          },
        ],
      },
      {
        "@type": "ContactPage",
        name: "Contact PawTruth",
        description:
          "Official contact portal for algorithmic feedback, clinical inquiries, and veterinary tool suggestions.",
        url: "https://pawtruth.com/contact",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-mono font-bold text-brand-taupe"
        >
          <Link href="/" className="hover:text-brand-espresso transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-espresso">Contact & Inquiries</span>
        </nav>

        {/* Hero Header */}
        <section className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-10 shadow-[6px_6px_0px_#583D32] space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-[2px_2px_0px_#583D32] text-xs font-heading font-black uppercase">
            <Mail className="w-4 h-4 text-brand-espresso" />
            Direct Communications
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-brand-espresso tracking-tight">
            We’re Here for the Pet Community.
          </h1>
          <p className="text-base sm:text-lg font-medium text-brand-espresso/80 max-w-3xl leading-relaxed">
            Have a clinical calculation suggestion, detected a newly published breed standard update, or want to partner with PawTruth? Send us a note below.
          </p>
        </section>

        {/* Main Content Grid: Form (Left) & Direct Channels / Notices (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Direct Email & Clinical Protocols */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-6 shadow-paper space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-brand-espresso/20">
                <div className="w-10 h-10 rounded-full bg-brand-terracotta border-2 border-brand-espresso flex items-center justify-center text-white shadow-pill">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-black text-brand-espresso">
                    Direct Email
                  </h3>
                  <p className="text-[11px] font-mono font-bold text-brand-taupe uppercase">
                    Official Inquiries & Editorial
                  </p>
                </div>
              </div>

              {/* Placeholder Notice */}
              <div className="space-y-2">
                <div className="bg-white border-2 border-brand-espresso rounded-xl p-3.5 shadow-paper-sm">
                  <div className="text-[10px] font-mono font-bold text-brand-taupe uppercase mb-0.5">
                    Official Contact Inbox
                  </div>
                  <a
                    href="mailto:contact@pawtruth.com"
                    className="font-heading font-black text-base sm:text-lg text-brand-terracotta hover:underline break-all"
                  >
                    contact@pawtruth.com
                  </a>
                </div>
                <p className="text-[11px] font-mono text-brand-taupe leading-relaxed">
                  <em>[Placeholder Email — you can update this to your specific inbox anytime]</em>
                </p>
              </div>

              {/* Turnaround Time */}
              <div className="flex items-center gap-2.5 pt-2 text-xs font-mono font-bold text-brand-espresso">
                <Clock className="w-4 h-4 text-brand-terracotta flex-shrink-0" />
                <span>Response time: Typically 24–48 business hours.</span>
              </div>
            </div>

            {/* Emergency Clinical Disclaimer (High Priority Callout) */}
            <div className="bg-red-50 border-2.5 border-red-600 rounded-3xl p-6 shadow-[4px_4px_0px_#B91C1C] space-y-3">
              <div className="flex items-center gap-2 text-red-700 font-heading font-black text-sm uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Urgent Medical Safety Notice</span>
              </div>
              <p className="text-xs text-red-950 font-sans font-medium leading-relaxed">
                PawTruth is an educational reference directory and <strong>cannot provide live veterinary triage</strong> for active pet poisoning, collapse, or acute trauma.
              </p>
              <div className="bg-white/80 border border-red-300 rounded-xl p-3 text-xs text-red-900 space-y-1">
                <p className="font-heading font-black">
                  In a life-threatening pet emergency:
                </p>
                <p>• ASPCA Animal Poison Control: <strong>(888) 426-4435</strong></p>
                <p>• Pet Poison Helpline: <strong>(855) 764-7661</strong></p>
                <p>• Immediately transport your pet to the nearest 24/7 animal hospital.</p>
              </div>
            </div>

            {/* Editorial Attribution Note */}
            <div className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-terracotta flex-shrink-0" />
                <div className="text-xs font-heading font-black text-brand-espresso">
                  Published by White Stone
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso">
                Consumer Safety Team
              </span>
            </div>
          </div>
        </div>

        {/* Quick FAQ / Guidance Cards */}
        <section className="bg-brand-cream/40 rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-8 shadow-paper space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-terracotta" />
            <h2 className="font-heading text-xl font-black text-brand-espresso">
              Common Questions Before Reaching Out
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs font-medium text-brand-espresso/85">
            <div className="bg-white rounded-2xl border-2 border-brand-espresso p-4 space-y-1.5 shadow-paper-sm">
              <h3 className="font-heading font-black text-sm text-brand-espresso">
                Can I suggest a new calculator?
              </h3>
              <p className="text-brand-taupe leading-relaxed">
                Yes! If you have a veterinary formula or standard guidelines you’d like to see automated, select &quot;Veterinary Formula&quot; in the form.
              </p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-brand-espresso p-4 space-y-1.5 shadow-paper-sm">
              <h3 className="font-heading font-black text-sm text-brand-espresso">
                Can veterinary clinics link to PawTruth?
              </h3>
              <p className="text-brand-taupe leading-relaxed">
                Absolutely. Our calculators and breed profiles are freely accessible public resources for veterinary clinics, rescue shelters, and pet owners.
              </p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-brand-espresso p-4 space-y-1.5 shadow-paper-sm">
              <h3 className="font-heading font-black text-sm text-brand-espresso">
                How do I report a calculation issue?
              </h3>
              <p className="text-brand-taupe leading-relaxed">
                Please provide the specific calculator URL and the clinical citation or discrepancy so our team can immediately audit the formula.
              </p>
            </div>
          </div>
        </section>

        {/* Core Web Vitals Fixed Ad Container */}
        <AdSensePlaceholder
          slot="contact-page-bottom"
          minHeight="min-h-[120px]"
          label="Sponsor Notice"
        />
      </div>
    </>
  );
}
