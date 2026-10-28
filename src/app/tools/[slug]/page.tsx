import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { CALCULATOR_TOOLS, getCalculatorBySlug } from "@/data/calculators";
import CalculatorRenderer from "@/components/calculators/CalculatorRenderer";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import { ArrowLeft, ShieldCheck, HelpCircle, Dog, Cat, PawPrint, BookOpen, ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CALCULATOR_TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getCalculatorBySlug(slug);

  if (!tool) {
    return { title: "Calculator Not Found" };
  }

  return {
    title: `${tool.name} — Free 100% Veterinary Accurate Calculator`,
    description: tool.description,
    keywords: [tool.name.toLowerCase(), `${tool.name.toLowerCase()} online`, "pet calculator", "veterinary formula", tool.category],
    openGraph: {
      title: `${tool.name} | PawTruth Tools`,
      description: tool.tagline,
      type: "website",
    },
  };
}

export default async function CalculatorDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = getCalculatorBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Related tools in same category
  const relatedTools = CALCULATOR_TOOLS.filter((t) => t.slug !== tool.slug && (t.category === tool.category || t.category === "pet")).slice(0, 3);

  // Structured Data Schema (SoftwareApplication + MedicalWebPage)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "operatingSystem": "All",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "description": tool.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono font-bold text-brand-taupe">
          <Link href="/" className="hover:text-brand-espresso transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tools" className="hover:text-brand-espresso transition-colors">
            Calculators
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-espresso">{tool.shortTitle}</span>
        </nav>

        {/* Hero Title Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-olive text-brand-espresso border-2 border-brand-espresso shadow-paper-sm text-xs font-heading font-black uppercase">
              {tool.category === "cat" ? (
                <Cat className="w-3.5 h-3.5" />
              ) : tool.category === "dog" ? (
                <Dog className="w-3.5 h-3.5" />
              ) : (
                <PawPrint className="w-3.5 h-3.5" />
              )}
              {tool.authority}
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-brand-espresso tracking-tight">
              {tool.name}
            </h1>
            <p className="text-base sm:text-lg text-brand-taupe max-w-2xl leading-relaxed">
              {tool.description}
            </p>
          </div>
          <div className="hidden md:flex md:col-span-4 justify-end">
            <div className="paper-box p-2.5 bg-brand-cream border-2.5 border-brand-espresso transform rotate-1 max-w-[220px]">
              <img
                src={tool.category === "cat" ? "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80" : "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80"}
                alt={tool.category === "cat" ? "Healthy cat companion" : "Healthy dog companion"}
                className="w-full h-32 object-cover rounded-xl border border-brand-espresso"
              />
              <div className="pt-1.5 text-center">
                <span className="font-heading text-xs font-black text-brand-espresso block">
                  {tool.category === "cat" ? "Feline Health Monitor" : "Canine Health Monitor"}
                </span>
                <span className="text-[10px] font-mono text-brand-taupe font-bold">
                  Clinical Veterinary Guide
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Calculator Engine Container */}
        <div>
          <CalculatorRenderer slug={tool.slug} />
        </div>

        {/* Core Web Vitals Fixed-Height Ad Banner */}
        <div className="py-2">
          <AdSensePlaceholder
            slot="tool-mid-article"
            format="horizontal"
            minHeight="min-h-[120px]"
            label="Veterinary Partner Notice"
          />
        </div>

        {/* Medical Authority & Formula Explanation */}
        <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper space-y-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-brand-terracotta" />
            <h2 className="font-heading text-2xl font-black text-brand-espresso">
              How This Calculator Works
            </h2>
          </div>
          <div className="space-y-3 text-sm text-brand-taupe leading-relaxed">
            <p>
              Unlike generic online rules-of-thumb that rely on unscientific myths, the <strong>{tool.name}</strong> is strictly engineered around standards published by <strong>{tool.authority}</strong>.
            </p>
            <p>
              All computations execute in volatile client-side browser memory in real-time, providing instant results without transmitting any personal pet data across third-party tracking servers.
            </p>
          </div>
          <div className="bg-[#FAF4EE] border border-brand-espresso/30 rounded-2xl p-4 text-xs text-brand-espresso space-y-1">
            <div className="font-mono font-bold uppercase text-[11px] text-brand-terracotta">
              Independent Veterinary Disclaimer:
            </div>
            <p className="text-brand-taupe text-[11px] leading-relaxed">
              This interactive tool is designed for educational guidance, preventive monitoring, and home care estimation. It does not substitute for licensed hands-on veterinary diagnosis, clinical physical exams, or emergency toxicology interventions.
            </p>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        {tool.faqs && tool.faqs.length > 0 && (
          <div className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper space-y-6">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-6 h-6 text-brand-terracotta" />
              <h2 className="font-heading text-2xl font-black text-brand-espresso">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {tool.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-[#FAF4EE] border-2 border-brand-espresso rounded-2xl p-4 sm:p-5 shadow-paper-sm"
                >
                  <h3 className="font-heading text-base font-black text-brand-espresso mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-taupe leading-relaxed font-sans">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Calculators Carousel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-espresso">
              Explore More Health Calculators
            </h3>
            <Link
              href="/tools"
              className="text-xs font-mono font-bold text-brand-terracotta hover:underline flex items-center gap-1 uppercase"
            >
              View All Calculators &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((rel) => (
              <Link
                key={rel.slug}
                href={`/tools/${rel.slug}`}
                className="bg-white border-2 border-brand-espresso rounded-2xl p-4 shadow-paper-sm hover:shadow-paper hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-brand-cream text-brand-espresso mb-2 inline-block">
                    {rel.category}
                  </span>
                  <h4 className="font-heading font-black text-base text-brand-espresso group-hover:text-brand-terracotta transition-colors mb-1">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-brand-taupe line-clamp-2">
                    {rel.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-brand-espresso/10 text-xs font-mono font-bold text-brand-terracotta flex items-center gap-1">
                  Launch Tool &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
