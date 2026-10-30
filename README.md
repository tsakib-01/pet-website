# PawTrusty — Pet Food Safety & Recall Inspector

An interactive, real-time veterinary food safety directory indexing official FDA animal food recall dockets, contaminant laboratory data, and brand safety compliance.

Designed with an editorial collage aesthetic inspired by **IGIN USA** and punchy pill-style typography & buttons inspired by **Terry Ho**.

---

## 🎨 Brand Design System & Color Palette

- **#583D32** (Espresso Dark) — Primary structural borders, headers, and dark typography
- **#C9C986** (Sage Olive) — Verification badges, audit tags, and accent pills
- **#7F6F72** (Taupe Slate) — Secondary text, metadata dates, and docket codes
- **#E8D5C5** (Linen Cream) — Warm paper background, card fills, and secondary badges
- **#D57746** (Terracotta Rust) — Primary CTA buttons, emergency recall alerts, and action docks

---

## 📁 5 Template Pages

1. **Home Safety Explorer (`/`)**
   - Real-time live ticker feed with active FDA bulletins.
   - Interactive Barcode & Food Lot Scanner (`#lot-checker`) with instant audit results.
   - Recent FDA Recall Dockets grid with affected lot breakdowns.
   - Interactive 50-State Recall Distribution Map.
   - Brand Safety Leaderboard & SEO-optimized FAQ accordion with Google `FAQPage` schema.

2. **Brand Safety Dossier (`/brand/[slug]`)**
   - Blue Buffalo / Blue Harvest comprehensive safety dossier.
   - Overall Safety Grade stamp (Grade B-).
   - Interactive Brand Comparison Matrix (`BrandCompareWidget`).
   - 10-Year historical recall timeline and product line safety matrix.

3. **Recall Docket (`/recall/[id]`)**
   - Official FDA Recall Notice (Docket `#FDA-2026-V-8841`).
   - Package diagram with lot number location guide.
   - Geographic distribution breakdown across affected states.
   - 4-step consumer emergency protocol (stop feeding, seal sample, contact clinic, claim refund).

4. **Species Safety Hub (`/pet/[species]`)**
   - Dedicated species portals with interactive canine/feline switcher.
   - Dietary format risk comparison (Dry Kibble vs Canned Wet vs Raw Freeze-Dried).
   - Species-specific pathogen hazard guide (Salmonella, Aflatoxin, Thiamine Deficiency).
   - Verified 10-year clean brand directory.

5. **Pathogen Emergency Hazard Guide (`/safety/[issue]`)**
   - 24-hour clinical symptom timeline (Incubation vs Acute Enteritis).
   - Interactive Triage & Symptom Checker (`SymptomCheckerWidget`) with instant triage risk calculation.
   - Printable clinic checklist & 24/7 ASPCA Animal Poison Control hotline.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/tsakib-01/pet-website.git
cd pet-website

# Install dependencies
npm install

# Run development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, Tailwind CSS, Lucide React
- **Bundler:** Next.js Turbopack
- **SEO & Performance:** Google `FAQPage` Schema JSON-LD, 0 CLS AdSense placeholders
