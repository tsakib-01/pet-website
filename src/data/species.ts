export interface SpeciesData {
  slug: string;
  speciesName: string;
  heroBadge: string;
  title: string;
  subtitle: string;
  petImage: string;
  petBreedName: string;
  stats: {
    tenYearRecalls: number;
    mostCommonHazard: string;
    vulnerabilityLevel: "High" | "Critical" | "Moderate";
    activeMonitoredBrands: number;
  };
  overviewParagraph: string;
  dietFormatRiskMatrix: {
    format: string;
    riskScore: "High Risk" | "Moderate" | "Low Risk";
    riskColor: string;
    primaryPathogen: string;
    description: string;
  }[];
  speciesPathogens: {
    name: string;
    slug: string;
    dangerLevel: string;
    whyVulnerable: string;
  }[];
  verifiedCleanBrands: {
    name: string;
    slug: string;
    tenYearRecalls: number;
    grade: string;
    specialty: string;
  }[];
}

export const speciesData: Record<string, SpeciesData> = {
  "dogs": {
    slug: "dogs",
    speciesName: "Canine (Dogs)",
    heroBadge: "Canine Nutritional Safety Audit 2026",
    title: "Dog Food Safety & Recall Inspection Hub",
    subtitle: "Dogs face unique physiological vulnerabilities to fungal mycotoxins in corn kibble, toxic euthanasia drug residues in canned meat byproducts, and legume-heavy DCM diets.",
    petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Golden Retriever",
    stats: {
      tenYearRecalls: 68,
      mostCommonHazard: "Salmonella & Aflatoxin",
      vulnerabilityLevel: "High",
      activeMonitoredBrands: 142
    },
    overviewParagraph: "Canines are facultative carnivores with robust, acidic stomachs capable of processing diverse proteins. However, commercial high-temperature extrusion processing, high-carbohydrate corn fillers, and bulk meat meals expose dogs to recurring outbreaks of Aflatoxin molds, Salmonella enterica, and elevated Vitamin D formulation errors.",
    dietFormatRiskMatrix: [
      {
        format: "Dry Extruded Kibble",
        riskScore: "Moderate",
        riskColor: "bg-brand-olive text-brand-espresso",
        primaryPathogen: "Aspergillus Aflatoxin & Mold Decay",
        description: "Heat-extrusion eliminates live bacteria, but post-extrusion fat spraying and humid grain silos create mycotoxin and mold risks."
      },
      {
        format: "Raw / Freeze-Dried Diets",
        riskScore: "High Risk",
        riskColor: "bg-brand-terracotta text-white",
        primaryPathogen: "Salmonella enterica & Listeria",
        description: "Uncooked meats carry elevated pathogen burdens that can colonize the dog's intestines and shed to human household family members."
      },
      {
        format: "Commercial Canned / Wet",
        riskScore: "Low Risk",
        riskColor: "bg-brand-cream text-brand-espresso",
        primaryPathogen: "Can Seam Defects & Foreign Metal Shavings",
        description: "Retort pressure canning produces sterile contents; primary recall vectors are mechanical foreign debris or excess thyroid hormone."
      }
    ],
    speciesPathogens: [
      {
        name: "Aflatoxin (Corn Mold)",
        slug: "aflatoxin",
        dangerLevel: "FATAL HEPATOTOXIN",
        whyVulnerable: "Canine liver enzymes cannot metabolize Aflatoxin B1, leading to rapid centrilobular liver necrosis and fatal internal hemorrhage."
      },
      {
        name: "Salmonella enterica",
        slug: "salmonella",
        dangerLevel: "ZOONOTIC ENTEROTOXIN",
        whyVulnerable: "Causes severe hemorrhagic enteritis in dogs while turning the animal into an active household bacterial shedder."
      },
      {
        name: "Hypervitaminosis D",
        slug: "vitamin-d-toxicity",
        dangerLevel: "KIDNEY CALCIFICATION",
        whyVulnerable: "Dogs cannot down-regulate excess dietary Vitamin D3, causing lethal hypercalcemia and acute renal tubule failure."
      }
    ],
    verifiedCleanBrands: [
      { name: "Hill's Science Diet", slug: "hills-science-diet", tenYearRecalls: 1, grade: "A", specialty: "Evidence-Based Clinical Veterinary Diets" },
      { name: "Royal Canin", slug: "royal-canin", tenYearRecalls: 0, grade: "A-", specialty: "Breed-Specific NIR Spectrometry Tested Diets" },
      { name: "Taste of the Wild", slug: "taste-of-the-wild", tenYearRecalls: 0, grade: "B", specialty: "Grain-Free Smoked Meats with K9 Probiotics" },
      { name: "Purina Pro Plan", slug: "purina", tenYearRecalls: 3, grade: "B+", specialty: "Top-Rated Performance & Veterinary Standards" }
    ]
  },
  "cats": {
    slug: "cats",
    speciesName: "Feline (Cats)",
    heroBadge: "Feline Nutritional Safety Audit 2026",
    title: "Cat Food Safety & Recall Inspection Hub",
    subtitle: "Cats are obligate carnivores with unique metabolic dependencies on dietary taurine, thiamine (Vitamin B1), and animal tissue arachidonic acid.",
    petImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Domestic Shorthair Cat",
    stats: {
      tenYearRecalls: 34,
      mostCommonHazard: "Thiamine Deficiency & Salmonella",
      vulnerabilityLevel: "Critical",
      activeMonitoredBrands: 98
    },
    overviewParagraph: "As strict obligate carnivores, felines possess shorter digestive tracts and lack the metabolic pathways to synthesize essential amino acids from plant sources. Cat food recalls frequently stem from thermal over-processing destroying volatile Vitamin B1 (Thiamine), lethal heart-damaging taurine deficiencies, or Salmonella in freeze-dried raw cat treats.",
    dietFormatRiskMatrix: [
      {
        format: "Commercial Canned / Wet Paté",
        riskScore: "Moderate",
        riskColor: "bg-brand-olive text-brand-espresso",
        primaryPathogen: "Thiamine (B1) Heat Degradation & Can Swells",
        description: "Excessive retort retort cooking temperatures can destroy 80%+ of thiamine, triggering fatal feline neurological ventroflexion."
      },
      {
        format: "Freeze-Dried Raw Salmon / Chicken",
        riskScore: "High Risk",
        riskColor: "bg-brand-terracotta text-white",
        primaryPathogen: "Salmonella & Listeria Contamination",
        description: "Dehydration without high heat leaves bacterial spores viable on meat surfaces, creating acute gastroenteritis and household exposure."
      },
      {
        format: "Dry Cat Kibble",
        riskScore: "Low Risk",
        riskColor: "bg-brand-cream text-brand-espresso",
        primaryPathogen: "Improper Magnesium / Ash Urinary Stone Formations",
        description: "Primary safety threat is formulation imbalances causing feline lower urinary tract disease (FLUTD) and urethral blockages."
      }
    ],
    speciesPathogens: [
      {
        name: "Thiamine (B1) Depletion",
        slug: "salmonella",
        dangerLevel: "NEUROLOGICAL COMA",
        whyVulnerable: "Cats require 3x more thiamine than dogs; deficient canned food causes cervical ventroflexion, pupillary dilation, and death within days."
      },
      {
        name: "Salmonella in Raw Treats",
        slug: "salmonella",
        dangerLevel: "ACUTE ENTERITIS",
        whyVulnerable: "Freeze-dried salmon and chicken treats frequently test positive during state department of agriculture surveillance audits."
      },
      {
        name: "Packaging Micro-Leakage",
        slug: "foreign-materials",
        dangerLevel: "ANAEROBIC SPOILAGE",
        whyVulnerable: "Cats instinctively refuse slightly spoiled foods, leading to rapid hepatic lipidosis (fatty liver disease) from fasting."
      }
    ],
    verifiedCleanBrands: [
      { name: "Royal Canin Feline", slug: "royal-canin", tenYearRecalls: 0, grade: "A-", specialty: "Urinary S/O Index & Tailored Kibble Textures" },
      { name: "Hill's Science Diet Feline", slug: "hills-science-diet", tenYearRecalls: 1, grade: "A", specialty: "Kidney Care (k/d) and Digestive Biome Nutrition" },
      { name: "Purina Pro Plan LiveClear", slug: "purina", tenYearRecalls: 3, grade: "B+", specialty: "Egg Protein Allergen Neutralization Technology" }
    ]
  },
  "puppy-kitten": {
    slug: "puppy-kitten",
    speciesName: "Pediatric (Puppies & Kittens)",
    heroBadge: "Pediatric Nutritional Vulnerability Audit",
    title: "Puppy & Kitten Food Safety & Growth Protocol",
    subtitle: "Immature immune systems, developing blood-brain barriers, and precise calcium-to-phosphorus ratio requirements make young pets 5x more vulnerable to contaminated food.",
    petImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Australian Shepherd Puppies",
    stats: {
      tenYearRecalls: 26,
      mostCommonHazard: "Salmonella & Mineral Imbalances",
      vulnerabilityLevel: "Critical",
      activeMonitoredBrands: 74
    },
    overviewParagraph: "Young companion animals lack fully established gastrointestinal microbiomes and have underdeveloped hepatic detoxifying enzymes. Ingesting bacterial pathogens like Salmonella or Listeria can trigger fatal dehydration within 24 hours. Furthermore, improper calcium ratios in large breed puppy food can permanently deform skeletal growth plates.",
    dietFormatRiskMatrix: [
      {
        format: "Raw / Unpasteurized Puppy Diets",
        riskScore: "High Risk",
        riskColor: "bg-brand-terracotta text-white",
        primaryPathogen: "Severe Bacterial Sepsis & Parasites",
        description: "Veterinary academies strictly advise against raw diets for animals under 12 months due to high mortality rates from Salmonella."
      },
      {
        format: "Dry Large Breed Puppy Kibble",
        riskScore: "Moderate",
        riskColor: "bg-brand-olive text-brand-espresso",
        primaryPathogen: "Excess Calcium & Inverted Ca:P Ratios",
        description: "Excess calcium cannot be regulated by young puppies, triggering hypertrophic osteodystrophy (HOD) and hip dysplasia."
      },
      {
        format: "Canned Kitten Starter Weaning Mousse",
        riskScore: "Low Risk",
        riskColor: "bg-brand-cream text-brand-espresso",
        primaryPathogen: "Bacterial Secondary Contamination After Opening",
        description: "Once opened, high moisture canned food left at room temperature grows dangerous bacterial colonies within 2 hours."
      }
    ],
    speciesPathogens: [
      {
        name: "Hypovolemic Dehydration",
        slug: "salmonella",
        dangerLevel: "FATAL WITHIN 24 HOURS",
        whyVulnerable: "Puppies possess limited fluid reserves; two bouts of watery diarrhea can deplete 10% of total body weight in fluids."
      },
      {
        name: "Calcium-Phosphorus Imbalance",
        slug: "vitamin-d-toxicity",
        dangerLevel: "SKELETAL DEFORMITY",
        whyVulnerable: "Large breed puppies passively absorb all dietary calcium, leading to severe joint cartilage lesions and stunted growth."
      }
    ],
    verifiedCleanBrands: [
      { name: "Royal Canin Puppy", slug: "royal-canin", tenYearRecalls: 0, grade: "A-", specialty: "Large Breed & Small Breed Growth Phase Splitting" },
      { name: "Hill's Science Diet Puppy", slug: "hills-science-diet", tenYearRecalls: 1, grade: "A", specialty: "DHA Fish Oil Brain Development & Strict Mineral Limits" }
    ]
  }
};
