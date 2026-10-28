export interface BreedMetric {
  label: string;
  value: string;
  subtext?: string;
}

export interface BreedHealthRisk {
  name: string;
  severity: "High Watch" | "Moderate" | "Screening Advised";
  description: string;
  actionableCare: string;
}

export interface BreedCalculatorLink {
  title: string;
  description: string;
  href: string;
  iconType: "dog" | "cat" | "box" | "scale" | "calendar" | "utensils" | "heartPulse";
  tag: string;
}

export interface BreedFAQ {
  question: string;
  answer: string;
}

export interface BreedData {
  slug: string;
  name: string;
  species: "dog" | "cat";
  tagline: string;
  origin: string;
  standardGroup: string;
  heroImage: string;
  heroImageAlt: string;
  coatVariations: string[];
  metrics: BreedMetric[];
  calculatorLinks: BreedCalculatorLink[];
  healthRisks: BreedHealthRisk[];
  dietAndCareNotes: string;
  faqs: BreedFAQ[];
}

export const BREED_DATABASE: BreedData[] = [
  // --- 1. DOG PREVIEW TEMPLATE: FRENCH BULLDOG ---
  {
    slug: "french-bulldog",
    name: "French Bulldog",
    species: "dog",
    tagline: "Compact, affectionate companion with bat ears, gentle indoor temperament, and low-exercise requirements.",
    origin: "France / United Kingdom",
    standardGroup: "AKC Non-Sporting Group",
    heroImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80",
    heroImageAlt: "French Bulldog sitting calmly on floor",
    coatVariations: ["Fawn", "Brindle", "White & Brindle (Pied)", "Cream", "Black"],
    metrics: [
      { label: "Adult Weight", value: "16 – 28 lbs", subtext: "Males: 20–28 lbs • Females: 16–24 lbs" },
      { label: "Standing Height", value: "11 – 13 inches", subtext: "Floor to shoulder withers" },
      { label: "Ideal Crate Size", value: '24-Inch Crate', subtext: "Small breed standard (+2 to 4\" buffer)" },
      { label: "Average Lifespan", value: "10 – 12 Years", subtext: "Small breed canine life-stage pace" },
      { label: "Daily Calories", value: "550 – 750 kcal", subtext: "WSAVA RER baseline for neutered adults" },
      { label: "Activity Level", value: "Low to Moderate", subtext: "Short walks; avoid extreme heat" },
    ],
    calculatorLinks: [
      {
        title: "Frenchie Human Age Calculator",
        description: "Calculate exact biological human age with AVMA small-breed scaling (Year 1 = 15, Year 2 = 24, +4 yrs/yr thereafter).",
        href: "/tools/dog-age-calculator",
        iconType: "dog",
        tag: "Age Milestone",
      },
      {
        title: "Frenchie Crate Size Matcher",
        description: "Determine exact ergonomic crate dimensions to prevent claustrophobia while promoting secure den instincts.",
        href: "/tools/dog-crate-size-calculator",
        iconType: "box",
        tag: "AKC Ergonomics",
      },
      {
        title: "Frenchie Puppy Adult Size Predictor",
        description: "Estimate adult weight curve from 8-week to 16-week growth checkpoints based on pediatric canine data.",
        href: "/tools/puppy-weight-calculator",
        iconType: "scale",
        tag: "Pediatric Growth",
      },
      {
        title: "Emergency Chocolate Toxicity Triage",
        description: "Calculate immediate theobromine mg/kg dosage triage if chocolate or cocoa is accidentally ingested.",
        href: "/tools/dog-chocolate-toxicity-calculator",
        iconType: "heartPulse",
        tag: "Emergency Safety",
      },
    ],
    healthRisks: [
      {
        name: "BOAS (Brachycephalic Airway Syndrome)",
        severity: "High Watch",
        description: "Stenotic nares (pinched nostrils) and elongated soft palate impede airflow during panting.",
        actionableCare: "Strictly avoid heat above 75°F (24°C). Use a chest harness instead of neck collar to reduce tracheal pressure.",
      },
      {
        name: "IVDD (Intervertebral Disc Disease)",
        severity: "High Watch",
        description: "Chondrodystrophic spinal genetics make spinal discs prone to calcification and premature herniation.",
        actionableCare: "Prevent jumps from beds or couches with pet ramps. Maintain lean body weight to limit spinal vertebrae load.",
      },
      {
        name: "Skin Fold Pyoderma",
        severity: "Moderate",
        description: "Facial wrinkles and tail pockets trap moisture and skin secretions, encouraging yeast and bacterial growth.",
        actionableCare: "Clean facial folds 2 to 3 times weekly with veterinary chlorhexidine wipes and dry thoroughly.",
      },
    ],
    dietAndCareNotes:
      "French Bulldogs are prone to rapid obesity because of their low basal activity and compact muscular frame. Weigh kibble or wet portions on a gram scale rather than relying on standard measuring cups, which introduce up to 25% caloric error.",
    faqs: [
      {
        question: "What size crate does an adult French Bulldog need?",
        answer: "An adult French Bulldog typically requires a 24-inch crate (24\"L x 18\"W x 19\"H). This provides the necessary 2 to 4 inches of clearance above the head and allows comfortable turning without being oversized for housebreaking.",
      },
      {
        question: "How fast do French Bulldogs age compared to humans?",
        answer: "French Bulldogs fall into the Small Breed category under AVMA and AAHA guidelines. A Frenchie reaches roughly 15 human years at age one, 24 years at age two, and advances by approximately 4 human years for every calendar year thereafter.",
      },
      {
        question: "Can French Bulldogs swim safely?",
        answer: "No. French Bulldogs are anatomical non-swimmers due to their dense heavy chest, brachycephalic snout, and short legs. They should always wear an approved canine life jacket near pools, lakes, or boats.",
      },
    ],
  },

  // --- 2. CAT PREVIEW TEMPLATE: RAGDOLL ---
  {
    slug: "ragdoll",
    name: "Ragdoll",
    species: "cat",
    tagline: "Large, semi-longhaired feline famous for striking blue oval eyes, docile temperament, and affectionate disposition.",
    origin: "Riverside, California, USA",
    standardGroup: "CFA Pointed Breed Class",
    heroImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80",
    heroImageAlt: "Beautiful Ragdoll cat with bright blue eyes",
    coatVariations: ["Seal Point", "Blue Point", "Chocolate Point", "Lilac Point", "Mitted", "Bicolor"],
    metrics: [
      { label: "Adult Weight", value: "10 – 20 lbs", subtext: "Males: 15–20 lbs • Females: 10–15 lbs" },
      { label: "Maturation Time", value: "3 – 4 Years", subtext: "Slow-maturing skeletal growth timeline" },
      { label: "Litter Box Size", value: "XL (22\"+ Length)", subtext: "Required for long feline body frame" },
      { label: "Average Lifespan", value: "12 – 15+ Years", subtext: "Feline AAFP life-stage guidelines" },
      { label: "Daily Calories", value: "220 – 320 kcal", subtext: "WSAVA RER scaled to lean body mass" },
      { label: "Coat Care", value: "Bi-Weekly Brushing", subtext: "Plush single coat with minimal undercoat" },
    ],
    calculatorLinks: [
      {
        title: "Ragdoll Human Age Converter",
        description: "Convert your Ragdoll's chronological age into human developmental stages according to AAFP standards.",
        href: "/tools/cat-age-calculator",
        iconType: "cat",
        tag: "AAFP Standards",
      },
      {
        title: "Wet & Dry Calorie Ratio Splitter",
        description: "Calculate optimal moisture and protein ratios between premium canned food and dental kibble.",
        href: "/tools/cat-food-calculator-wet-and-dry",
        iconType: "utensils",
        tag: "WSAVA Nutrition",
      },
      {
        title: "Feline Lifespan & Senior Health Checklist",
        description: "Track organ development milestones and age-based veterinary lab screening recommendations.",
        href: "/tools/cat-years-to-human-calculator",
        iconType: "calendar",
        tag: "Senior Wellness",
      },
      {
        title: "Ragdoll Queen Gestation Tracker",
        description: "Track feline pregnancy day-by-day with palpation windows, ultrasound confirmation, and nesting cues.",
        href: "/tools/cat-pregnancy-calculator",
        iconType: "heartPulse",
        tag: "Feline Obstetrics",
      },
    ],
    healthRisks: [
      {
        name: "Hypertrophic Cardiomyopathy (HCM)",
        severity: "High Watch",
        description: "Genetic thickening of the left ventricular myocardium, impairing heart blood pump capacity.",
        actionableCare: "Ensure breeder provides DNA screening for the MYBPC3 gene mutation. Schedule echocardiograms if murmurs appear.",
      },
      {
        name: "Polycystic Kidney Disease (PKD)",
        severity: "Moderate",
        description: "Inherited condition causing progressive fluid-filled cysts in renal tissue.",
        actionableCare: "Ultrasound screening can confirm normal renal structure from 10 months of age onward.",
      },
      {
        name: "Trichobezoars (Hairball Impaction)",
        severity: "Moderate",
        description: "Semi-long coats ingested during self-grooming can clump into gastrointestinal blockages.",
        actionableCare: "Brush twice weekly with a stainless steel comb and maintain a high-moisture wet food diet for intestinal motility.",
      },
    ],
    dietAndCareNotes:
      "Because Ragdolls have a large muscular frame that grows continuously for up to 4 years, avoid abrupt puppy/kitten diet transitions. High moisture intake through wet canned food is essential to protect against feline lower urinary tract disease (FLUTD).",
    faqs: [
      {
        question: "How big do Ragdoll cats actually get?",
        answer: "Ragdolls are one of the largest domestic cat breeds. Adult males typically weigh between 15 and 20 pounds, while females weigh 10 to 15 pounds. Full skeletal maturity and final coat development take between 3 and 4 years.",
      },
      {
        question: "What is the best wet-to-dry food ratio for a Ragdoll?",
        answer: "Veterinarians generally recommend at least 50% to 70% of daily calories from canned wet food. Ragdolls have low thirst drives, and high moisture diets promote kidney and urinary tract health.",
      },
      {
        question: "Do Ragdoll cats really go limp when held?",
        answer: "Yes, many Ragdolls genuinely relax their muscles and surrender completely into the arms of people they trust. However, they should always be supported with two hands under their chest and hindquarters due to their long, heavy bodies.",
      },
    ],
  },
];

export function getBreedBySlug(slug: string): BreedData | undefined {
  return BREED_DATABASE.find((b) => b.slug === slug);
}
