import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, Lock, Cookie, Eye, Globe, ChevronRight, FileText, ArrowRight } from "lucide-react";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy & Cookie Disclosures — PawTrusty",
  description:
    "Read PawTrusty's privacy policy, cookie disclosures, Google AdSense compliance terms, GDPR/CCPA consumer rights, and data handling protocols.",
  alternates: {
    canonical: "https://pawtrusty.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Cookie Disclosures | PawTrusty",
    description: "Transparent data handling, cookie policies, and advertising disclosures for PawTrusty.",
    url: "https://pawtrusty.com/privacy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
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
            item: "https://pawtrusty.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Privacy Policy",
            item: "https://pawtrusty.com/privacy",
          },
        ],
      },
      {
        "@type": "WebPage",
        name: "Privacy Policy and Cookie Notice",
        url: "https://pawtrusty.com/privacy",
        description: "Official privacy policy and third-party advertising disclosures for PawTrusty.",
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
          <span className="text-brand-espresso">Privacy Policy</span>
        </nav>

        {/* Header Banner */}
        <header className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-10 shadow-paper space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-paper-sm text-xs font-heading font-black uppercase">
            <Lock className="w-4 h-4 text-brand-leaf" />
            Compliance &amp; Consumer Trust
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-brand-espresso tracking-tight">
            Privacy Policy &amp; Cookie Disclosures
          </h1>
          <p className="text-xs sm:text-sm font-mono font-bold text-brand-taupe">
            Last Updated &amp; Effective Date: {lastUpdated}
          </p>
          <p className="text-sm sm:text-base font-medium text-brand-espresso/80 leading-relaxed">
            PawTrusty (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your personal privacy. This Privacy Policy outlines our transparent data practices, cookie disclosures, Google AdSense advertising protocols, and your legal rights under GDPR and CCPA.
          </p>
        </header>

        {/* Content Body */}
        <article className="bg-white rounded-3xl border-2.5 border-brand-espresso p-6 sm:p-10 shadow-paper space-y-8 text-brand-espresso leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex items-center justify-center font-heading font-black text-xs">
                1
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                Information We Collect &amp; Store
              </h2>
            </div>
            <p className="text-brand-espresso/80">
              PawTrusty is designed as a free, public consumer safety directory. You are never required to create an account, register personal credentials, or provide payment details to access our pet food recall database, brand dossiers, breed guides, or veterinary calculators.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-brand-espresso/80">
              <li>
                <strong>Passive Server Logs:</strong> Like virtually all web servers, our edge hosting providers (Cloudflare, Vercel) automatically record standard technical log data such as your IP address, browser type, referring URL, time of visit, and operating system for cybersecurity and DDoS mitigation.
              </li>
              <li>
                <strong>Direct Communications:</strong> If you voluntarily reach out via our contact form or email, we collect your name, email address, and message contents strictly to answer your safety inquiry or report correction.
              </li>
              <li>
                <strong>Calculator Inputs:</strong> All numerical inputs entered into our calculators (pet weights, ages, food caloric counts) are computed locally in your web browser and are not transmitted to or stored on our database.
              </li>
            </ul>
          </section>

          {/* Section 2: Google AdSense & Cookies (MANDATORY FOR ADSENSE APPROVAL) */}
          <section className="space-y-3 p-5 sm:p-6 bg-[#FAF4EE] rounded-2xl border-2 border-brand-espresso/30">
            <div className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-brand-terracotta flex-shrink-0" />
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                Cookies &amp; Google AdSense Advertising Disclosures
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-brand-espresso/85 leading-relaxed">
              Third-party vendors, including <strong>Google</strong>, use cookies to serve advertisements based on a user&apos;s prior visits to PawTrusty or other websites across the Internet:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-brand-espresso/80">
              <li>
                <strong>DoubleClick DART Cookie:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to our visitors based on their visit to our site and/or other sites on the Internet.
              </li>
              <li>
                <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-terracotta underline hover:text-brand-espresso"
                >
                  Google Ads Settings (google.com/settings/ads)
                </a>
                . Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-terracotta underline hover:text-brand-espresso"
                >
                  AboutAds.info (aboutads.info/choices)
                </a>
                .
              </li>
              <li>
                <strong>Browser Cookie Controls:</strong> You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings, though this may affect how you interact with our site or other websites.
              </li>
            </ul>
          </section>

          {/* Section 3: GDPR Rights */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex items-center justify-center font-heading font-black text-xs">
                3
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                European General Data Protection Regulation (GDPR)
              </h2>
            </div>
            <p className="text-brand-espresso/80 text-xs sm:text-sm">
              If you reside within the European Economic Area (EEA) or the United Kingdom, you are entitled to statutory data protection rights under the GDPR, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-brand-espresso/80">
              <li>The right to access, update, or delete information we hold on you.</li>
              <li>The right of rectification if your information is inaccurate or incomplete.</li>
              <li>The right to object to our processing of your personal data.</li>
              <li>The right to data portability and restriction of processing.</li>
            </ul>
          </section>

          {/* Section 4: CCPA / CPRA California Disclosures */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex items-center justify-center font-heading font-black text-xs">
                4
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                California Consumer Privacy Act (CCPA / CPRA)
              </h2>
            </div>
            <p className="text-brand-espresso/80 text-xs sm:text-sm">
              Under the California Consumer Privacy Act (CCPA), California residents have specific privacy rights. <strong>PawTrusty does not sell, rent, or trade your personal information</strong> to third parties for monetary consideration. California consumers may request disclosures regarding any data collected or request permanent deletion of contact inquiries by reaching out to us.
            </p>
          </section>

          {/* Section 5: Children's Online Privacy */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex items-center justify-center font-heading font-black text-xs">
                5
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                Children&apos;s Privacy (COPPA Compliance)
              </h2>
            </div>
            <p className="text-brand-espresso/80 text-xs sm:text-sm">
              PawTrusty does not knowingly collect any personally identifiable information from children under the age of 13. If a parent or guardian believes that a child has provided us with personal information, please contact us immediately, and we will promptly remove such information from our records.
            </p>
          </section>

          {/* Section 6: Third-Party Government Links */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso flex items-center justify-center font-heading font-black text-xs">
                6
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
                Links to Government &amp; Third-Party Websites
              </h2>
            </div>
            <p className="text-brand-espresso/80 text-xs sm:text-sm">
              Our website links extensively to official public safety regulatory portals, including the United States FDA (fda.gov), Canadian Food Inspection Agency (inspection.canada.ca), United Kingdom Food Standards Agency (food.gov.uk), and Australian Competition and Consumer Commission (recalls.gov.au). We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.
            </p>
          </section>

          {/* Section 7: Contact Us */}
          <section className="space-y-3 pt-4 border-t border-brand-espresso/20">
            <h2 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Questions &amp; Data Inquiries
            </h2>
            <p className="text-brand-espresso/80 text-xs sm:text-sm">
              If you have any questions about this Privacy Policy, your consumer rights, or wish to submit a data inquiry, please visit our{" "}
              <Link href="/contact" className="font-bold text-brand-terracotta underline hover:text-brand-espresso">
                Contact &amp; Inquiries Page
              </Link>
              .
            </p>
          </section>
        </article>

        {/* AdSense Placement Container (Zero CLS) */}
        <AdSensePlaceholder
          slot="privacy-bottom-banner"
          format="horizontal"
          minHeight="min-h-[120px]"
          label="Sponsor Advertisement"
        />
      </div>
    </>
  );
}
