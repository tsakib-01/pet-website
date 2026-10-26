# Pet Food Safety & Recall Inspector (PawRecall) - Workspace Rules

## 1. Project Mission & Technical Architecture
- **Objective:** Production-grade, programmatic SEO public pet food recall database powered by OpenFDA veterinary recall endpoints.
- **Stack:** Next.js (App Router), TypeScript (Strict), Tailwind CSS, Lucide React.
- **Cost Target:** \$0 Monthly Operational Cost (Zero Database, fully static or edge-cached on Vercel/Cloudflare).
- **Data Source:** OpenFDA Animal and Veterinary Drug & Food Recalls API (`https://api.fda.gov/animalandveterinary/event.json` and `https://api.fda.gov/food/enforcement.json`).

## 2. Programmatic SEO & Core Web Vitals
- **URL Structure:**
  - Brands: `/brand/[slug]` (e.g., `/brand/blue-buffalo`, `/brand/purina`)
  - Recall Events: `/recall/[recall-number]`
  - Pet Categories: `/pet/[species]` (e.g., `/pet/dogs`, `/pet/cats`)
  - Symptoms & Pathogens: `/safety/[issue]` (e.g., `/safety/salmonella`, `/safety/aflatoxin`)
- **Metadata & Schema:**
  - Every dynamic route must implement `generateMetadata` with accurate titles, descriptions, and canonical URLs.
  - Insert JSON-LD Structured Data (`BreadcrumbList`, `MedicalWebPage` / `FAQPage` / `Dataset`) for rich snippets in Google search results.
- **Performance Thresholds:**
  - LCP < 2.5s, CLS < 0.1, INP < 200ms.
  - Ad containers must have fixed minimum reserved heights (`min-h-[250px]`, `min-h-[90px]`) to prevent Cumulative Layout Shifts (CLS) when AdSense banners load.

## 3. Editorial & Legal Compliance
- **Factual Restraint:** Content must strictly report verbatim or summarized official FDA docket findings, Class I/II/III severity definitions, and lot numbers.
- **No Slander / Neutral Tone:** Never label a brand "dangerous" or "bad"; use objective risk indicators like *"FDA Class I Recall (Salmonella Risk) - Voluntary Recall Initiated [Date]"*.
- **Mandatory Disclaimer:** Prominent notice stating the site is an independent consumer safety directory indexing public government dockets, not medical advice or FDA endorsement.

## 4. Code Standards & Verification Gate
- No implicit `any`. Strict type definitions for OpenFDA responses.
- Before committing or finishing changes, verify:
  1. `npm run build` succeeds without syntax or build failures.
  2. `tsc --noEmit` produces 0 type errors.
  3. No broken link paths or missing exports.
