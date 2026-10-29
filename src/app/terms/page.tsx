import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldAlert, ShieldCheck, FileText, AlertTriangle, ChevronRight, Stethoscope, Scale } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";

export const metadata: Metadata = {
  title: "Terms of Service & Clinical Veterinary Disclaimer — PawTruth",
  description:
    "Review PawTruth's terms of service, educational veterinary disclaimer, public government docket indexing policies, and intellectual property terms.",
  alternates: {
    canonical: "https://pawtruth.com/terms",
  },
  openGraph: {
    title: "Terms of Service & Clinical Disclaimer | PawTruth",
    description: "Official terms of service, medical disclaimer, and regulatory data terms for PawTruth.",
    url: "https://pawtruth.com/terms",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "October 30, 2026";

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
            name: "Terms of Service",
            item: "https://pawtruth.com/terms",
          },
        ],
      },
      {
        "@type": "WebPage",
        name: "Terms of Service and Veterinary Disclaimer",
        url: "https://pawtruth.com/terms",
        description: "Terms of service, educational disclaimer, and fair use guidelines for PawTruth.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono font-bold text-brand-taupe">
          <Link href="/" className="hover:text-brand-espresso transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-espresso">Terms of Service</span>
        </nav>

        {/* Header Banner */}
        <header className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-10 shadow-paper space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-paper-sm text-xs font-heading font-black uppercase">
            <Scale className="w-4 h-4 text-brand-leaf" />
            Terms of Use &amp; Disclaimers
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-brand-espresso tracking-tight">
            Terms of Service &amp; Clinical Disclaimer
          </h1>
          <p className="text-xs sm:text-sm font-mono font-bold text-brand-taupe">
            Last Updated &amp; Effective Date: {lastUpdated}
          </p>
          <p className="text-sm sm:text-base font-medium text-brand-espresso/80 leading-relaxed">
            Please read these Terms of Service carefully before utilizing the PawTruth consumer safety directory, veterinary calculators, breed standards, or recall search tools.
          </p>
        </header>

        {/* Content Body */}
        <article className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-10 shadow-paper space-y-8 text-brand-espresso leading-relaxed text-sm sm:text-base">
          {/* Section 1: Veterinary & Medical Disclaimer (MANDATORY FOR E-E-A-T & LIABILITY) */}
          <section className="space-y-4 p-5 sm:p-6 bg-amber-50 rounded-2xl border-2 border-amber-600/40">
            <div className="flex items-center gap-2 text-amber-900">
              <Stethoscope className="w-6 h-6 text-amber-700 flex-shrink-0" />
              <h2 className="font-heading text-xl sm:text-2xl font-black">
                1. Educational Nature — Not Veterinary Medical Advice
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              <strong>PAWTRUTH IS AN INDEPENDENT EDUCATIONAL AND REGULATORY SAFETY DIRECTORY.</strong> All materials on this website—including pet food recall dockets, brand manufacturing dossiers, breed clinical standards, and interactive calculations—are published strictly for informational, educational, and consumer transparency purposes.
            </p>
            <p className="text-xs sm:text-sm text-amber-950/90 leading-relaxed">
              Content on PawTruth is <strong>not</strong> a substitute for professional veterinary diagnosis, examination, or personalized clinical treatment. Always consult a licensed veterinarian or veterinary toxicologist regarding symptoms of pet food toxicity, suspected Salmonella poisoning, dietary changes, or pediatric growth abnormalities. In any acute emergency, contact your nearest animal emergency clinic or the ASPCA Animal Poison Control Center immediately.
            </p>
          </section>

          {/* Section 2: Public Regulatory Docket Indexing */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex items-center justify-center font-heading font-black text-xs">
                2
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                Government Regulatory Dockets &amp; Verbatim Sourcing
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-brand-espresso/80">
              PawTruth indexes and aggregates official, publicly accessible regulatory enforcement reports and recall dockets published by government authorities, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-brand-espresso/80">
              <li>United States Food and Drug Administration (FDA) Center for Veterinary Medicine</li>
              <li>Canadian Food Inspection Agency (CFIA)</li>
              <li>United Kingdom Food Standards Agency (FSA) and European RASFF</li>
              <li>Australian Competition and Consumer Commission (ACCC) and PFIAA</li>
            </ul>
            <p className="text-xs sm:text-sm text-brand-espresso/80">
              While we make rigorous editorial efforts to keep our ledger synchronized with government notices, official docket archives published directly by regulatory agencies remain the definitive legal source of recall status, lot numbers, and geographic distribution. PawTruth is an independent consumer directory and is not officially affiliated with or endorsed by any governmental body.
            </p>
          </section>

          {/* Section 3: Calculators & Mathematical Baselines */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex items-center justify-center font-heading font-black text-xs">
                3
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                Interactive Calculators &amp; Algorithmic Estimates
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-brand-espresso/80">
              Our interactive tools (such as dog age conversions, crate sizing formulas, and feeding calorie splitters) utilize established scientific baselines from organizations including the AVMA, AAHA, WSAVA, and the Merck Veterinary Manual. These calculators provide statistical approximations based on standard adult and pediatric curves. Individual pet metabolism, spay/neuter status, activity levels, and underlying medical conditions vary significantly.
            </p>
          </section>

          {/* Section 4: Nominative Fair Use & Brand Trademarks */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex items-center justify-center font-heading font-black text-xs">
                4
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                Trademarks &amp; Nominative Fair Use
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-brand-espresso/80">
              All commercial product brand names, registered trademarks, logos, and corporate parent names displayed on PawTruth (such as Purina, Blue Buffalo, Victor, Royal Canin, Advance, etc.) are the property of their respective trademark owners. Their reference on this website constitutes <strong>nominative fair use</strong> strictly for the purpose of truthful, factual public recall reporting, consumer safety identification, and regulatory transparency. PawTruth claims no ownership or affiliation with these commercial brands.
            </p>
          </section>

          {/* Section 5: User Conduct & Automated Scraping */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex items-center justify-center font-heading font-black text-xs">
                5
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                Permitted Use &amp; Intellectual Property
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-brand-espresso/80">
              You are granted a limited, revocable license to access and print materials for personal, non-commercial use. You agree not to engage in unauthorized data harvesting, automated scraping that degrades server availability, or framing of our site without prior written consent.
            </p>
          </section>

          {/* Section 6: Limitation of Liability */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex items-center justify-center font-heading font-black text-xs">
                6
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                Limitation of Liability &amp; Disclaimer of Warranties
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-brand-espresso/80">
              PawTruth is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, either express or implied. To the maximum extent permitted under applicable law, PawTruth and its creators disclaim all liability for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use this website or any information contained herein.
            </p>
          </section>

          {/* Section 7: Modifications & Governing Law */}
          <section className="space-y-3 pt-4 border-t border-brand-espresso/20">
            <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Modifications to Terms
            </h2>
            <p className="text-xs sm:text-sm text-brand-espresso/80">
              We reserve the right to revise or update these Terms of Service at any time. Continued use of PawTruth after changes are posted constitutes your acceptance of the revised terms. For legal or regulatory inquiries, please visit our{" "}
              <Link href="/contact" className="font-bold text-brand-terracotta underline hover:text-brand-espresso">
                Contact &amp; Inquiries Page
              </Link>
              .
            </p>
          </section>
        </article>

        {/* AdSense Placement Container (Zero CLS) */}
        <AdSensePlaceholder
          slot="terms-bottom-banner"
          format="horizontal"
          minHeight="min-h-[120px]"
          label="Sponsor Advertisement"
        />
      </div>
    </>
  );
}
