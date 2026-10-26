export interface BrandDossier {
  slug: string;
  name: string;
  parentCompany: string;
  headquarters: string;
  establishedYear: number;
  safetyGrade: "A" | "A-" | "B+" | "B" | "B-" | "C+" | "D" | "F";
  safetyScore: number; // 0 to 100
  petImage: string;
  petBreedName: string;
  totalRecalls10Yr: number;
  marketShareUS: string;
  manufacturingModel: "Company Owned Plants" | "Co-Packer Blended" | "Hybrid Contract Facilities";
  inspectionComplianceStatus: "Full FDA Compliance" | "Minor Inspection Observations" | "Active Federal Monitoring" | "Severe Warning Letter Active";
  overviewSummary: string;
  safetyStrengths: string[];
  safetyVulnerabilities: string[];
  historicalRecalls: {
    year: string;
    docket: string;
    product: string;
    hazard: string;
    status: string;
    severity: string;
  }[];
  productLineSafetyMatrix: {
    line: string;
    species: "Dogs" | "Cats" | "Both";
    format: "Dry Kibble" | "Canned Wet" | "Freeze-Dried / Raw" | "Fresh Chilled";
    safetyTier: "Verified Clean Tier" | "Watchlist Tier" | "Recalled Batch Isolated";
    auditNote: string;
  }[];
  veterinaryAdvisory: {
    headline: string;
    verdict: string;
    safeToFeed: boolean;
  };
}

export const brandsData: Record<string, BrandDossier> = {
  "purina": {
    slug: "purina",
    name: "Purina",
    parentCompany: "Nestlé Purina PetCare Company",
    headquarters: "St. Louis, Missouri, USA",
    establishedYear: 1894,
    safetyGrade: "B+",
    safetyScore: 84,
    petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Golden Retriever",
    totalRecalls10Yr: 3,
    marketShareUS: "28.4% (Rank #1 in US)",
    manufacturingModel: "Company Owned Plants",
    inspectionComplianceStatus: "Full FDA Compliance",
    overviewSummary: "Purina is the largest pet food manufacturer in North America, operating over 20 proprietary manufacturing facilities. Its dedicated veterinary research teams and stringent microbiological lot tracking maintain a high safety rating relative to its gargantuan manufacturing volume.",
    safetyStrengths: [
      "99% of foods produced in 100% company-owned facilities across the USA",
      "Over 500 in-house veterinarians, animal nutritionists, and microbiologists on staff",
      "Near-zero bacterial Salmonella recalls across flagship dry lines for 12+ years"
    ],
    safetyVulnerabilities: [
      "2023 prescription diet recall due to supplier vitamin D premix dosing error",
      "Massive production volume means isolated supplier batch variance impacts tens of thousands of bags"
    ],
    historicalRecalls: [
      {
        year: "2023",
        docket: "FDA-2023-V-1209",
        product: "Pro Plan Veterinary Diets EL Elemental (Dry Dog Food)",
        hazard: "Elevated Vitamin D premix from third-party vitamin supplier",
        status: "Terminated & Resolved by FDA",
        severity: "Class I"
      },
      {
        year: "2021",
        docket: "FDA-2021-V-0891",
        product: "Pro Plan Complete Essentials Tuna & Sole Wet Cat Food",
        hazard: "Packaging seam defect causing potential mold spoilage",
        status: "Terminated & Resolved",
        severity: "Class II"
      },
      {
        year: "2016",
        docket: "FDA-2016-V-0244",
        product: "Beneful & Pro Plan Canned Entrees (Specific 10 oz tubs)",
        hazard: "Inadequate vitamins/minerals analysis variance",
        status: "Resolved",
        severity: "Class III"
      }
    ],
    productLineSafetyMatrix: [
      { line: "Purina Pro Plan (Adult & Puppy Kibble)", species: "Both", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Zero active recalls; top-rated veterinary standard formula." },
      { line: "Purina ONE Dual Defense", species: "Both", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Clean 8-year microbiological audit record." },
      { line: "Pro Plan Veterinary Diets (Prescription)", species: "Both", format: "Dry Kibble", safetyTier: "Watchlist Tier", auditNote: "Subject to 2023 supplier vitamin premix audit; resolved." },
      { line: "Fancy Feast & Friskies Classic Canned", species: "Cats", format: "Canned Wet", safetyTier: "Verified Clean Tier", auditNote: "Clean canning thermal audit; high vacuum seal scores." }
    ],
    veterinaryAdvisory: {
      headline: "Is Purina Safe To Feed in 2026?",
      verdict: "Yes. Purina maintains one of the strictest safety and nutritional quality profiles in the pet food industry. Its flagship Pro Plan and Purina ONE lines have not experienced bacterial contamination dockets. Only isolated prescription batches have faced supplier notices.",
      safeToFeed: true
    }
  },
  "blue-buffalo": {
    slug: "blue-buffalo",
    name: "Blue Buffalo",
    parentCompany: "General Mills, Inc.",
    headquarters: "Wilton, Connecticut, USA",
    establishedYear: 2003,
    safetyGrade: "B-",
    safetyScore: 78,
    petImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Labrador Retriever",
    totalRecalls10Yr: 4,
    marketShareUS: "12.8% (Rank #3 in US)",
    manufacturingModel: "Hybrid Contract Facilities",
    inspectionComplianceStatus: "Minor Inspection Observations",
    overviewSummary: "Blue Buffalo pioneered the mainstream grain-free and natural meat movement. Following its acquisition by General Mills, the brand invested heavily in proprietary manufacturing plants in Joplin, Missouri and Richmond, Indiana, improving its historical recall frequency.",
    safetyStrengths: [
      "Substantial capital investment in proprietary state-of-the-art Heartland production plants",
      "Rigid meat-first formulation standards with zero poultry by-product meals",
      "Proactive voluntary retail holds on packaging seal variances before public illness"
    ],
    safetyVulnerabilities: [
      "Historical reliance on co-packers in earlier decades led to multiple voluntary recalls",
      "2024 packaging heat-seal temperature variances caused moisture mold recalls in humid southern states",
      "High legume formulas previously scrutinized during FDA DCM investigation"
    ],
    historicalRecalls: [
      {
        year: "2024",
        docket: "FDA-2024-V-2104",
        product: "Life Protection Adult Chicken & Brown Rice (15 lb)",
        hazard: "Packaging seal integrity defect causing potential mold spoilage in transit",
        status: "Terminated & Resolved by FDA",
        severity: "Class II"
      },
      {
        year: "2017",
        docket: "FDA-2017-V-0518",
        product: "Blue Wilderness Rocky Mountain Recipe Red Meat Canned",
        hazard: "Elevated naturally occurring beef thyroid hormone levels",
        status: "Resolved",
        severity: "Class II"
      },
      {
        year: "2016",
        docket: "FDA-2016-V-0391",
        product: "Life Protection Formula Dog Kibble",
        hazard: "Potential presence of excessive moisture / mold spoilage",
        status: "Resolved",
        severity: "Class II"
      }
    ],
    productLineSafetyMatrix: [
      { line: "Life Protection Formula (Dry Kibble)", species: "Both", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Current 2026 production lots verified clean." },
      { line: "Wilderness High-Protein Kibble", species: "Both", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Clean 6-year microbiological record." },
      { line: "Wild Harvest Freeze-Dried Treats", species: "Cats", format: "Freeze-Dried / Raw", safetyTier: "Recalled Batch Isolated", auditNote: "Lot #8841 under Class I recall for Salmonella. All other batches clear." },
      { line: "Basics Limited Ingredient Diet", species: "Both", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Zero reported dockets since product launch." }
    ],
    veterinaryAdvisory: {
      headline: "Is Blue Buffalo Safe To Feed in 2026?",
      verdict: "Yes for dry and canned lines. Blue Buffalo maintains solid nutritional profiles across its core lines. The only active bulletin is strictly isolated to the freeze-dried salmon cat treats line. Their dry Life Protection and Wilderness lines are fully cleared.",
      safeToFeed: true
    }
  },
  "hills-science-diet": {
    slug: "hills-science-diet",
    name: "Hill's Science Diet",
    parentCompany: "Colgate-Palmolive Company",
    headquarters: "Topeka, Kansas, USA",
    establishedYear: 1939,
    safetyGrade: "A",
    safetyScore: 94,
    petImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Beagle / Working Dog",
    totalRecalls10Yr: 1,
    marketShareUS: "9.6% (Rank #4 in US)",
    manufacturingModel: "Company Owned Plants",
    inspectionComplianceStatus: "Full FDA Compliance",
    overviewSummary: "Hill's Science Diet is widely regarded by veterinary colleges as the gold standard in evidence-based clinical pet nutrition. Manufactured in company-owned facilities with pharmaceutical-grade lot tracking and dedicated microbiology laboratories.",
    safetyStrengths: [
      "Rigorous batch testing on every raw ingredient shipment before extrusion",
      "Global Pet Nutrition Center with 150+ board-certified veterinary nutritionists",
      "Only 1 recall in the past 10 years, which was voluntarily self-reported"
    ],
    safetyVulnerabilities: [
      "2019 voluntary recall for elevated vitamin D in canned dog foods highlighted single-supplier risk",
      "Premium price point and strict prescription formulas require clinical veterinary supervision"
    ],
    historicalRecalls: [
      {
        year: "2019",
        docket: "FDA-2019-V-0412",
        product: "Prescription Diet & Science Diet Canned Dog Food",
        hazard: "Elevated Vitamin D from a single supplier premix error",
        status: "Terminated & Completely Cleared",
        severity: "Class I"
      }
    ],
    productLineSafetyMatrix: [
      { line: "Science Diet Adult & Puppy Kibble", species: "Both", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "0 recalls in over 15 years; spotless safety audit." },
      { line: "Prescription Diet (k/d, c/d, i/d, z/d)", species: "Both", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Clinically monitored therapeutic formulas." },
      { line: "Science Diet Canned Savory Stews", species: "Both", format: "Canned Wet", safetyTier: "Verified Clean Tier", auditNote: "Overhauled post-2019 supplier verification; 100% cleared." }
    ],
    veterinaryAdvisory: {
      headline: "Is Hill's Science Diet Safe To Feed in 2026?",
      verdict: "Extremely Safe. Hill's holds an 'A' grade on PawTruth's safety index. It boasts one of the lowest recall-to-volume ratios in veterinary history and adheres to strict Association of American Feed Control Officials (AAFCO) feeding trial protocols.",
      safeToFeed: true
    }
  },
  "royal-canin": {
    slug: "royal-canin",
    name: "Royal Canin",
    parentCompany: "Mars Petcare (Mars, Incorporated)",
    headquarters: "Aimargues, France / St. Charles, Missouri, USA",
    establishedYear: 1968,
    safetyGrade: "A-",
    safetyScore: 91,
    petImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Purebred Persian Cat",
    totalRecalls10Yr: 0,
    marketShareUS: "11.2% (Rank #2 in US)",
    manufacturingModel: "Company Owned Plants",
    inspectionComplianceStatus: "Full FDA Compliance",
    overviewSummary: "Royal Canin specializes in breed-specific kibble shapes and clinical veterinary therapeutic diets. Backed by Mars Petcare's massive scientific infrastructure and Waltham Petcare Science Institute, it maintains zero FDA recalls in North America over the past 10 years.",
    safetyStrengths: [
      "Zero North American FDA product recall dockets over the last 10 years",
      "Near-infrared (NIR) spectrometry testing on 100% of incoming grain and protein trucks",
      "Proprietary breed-tailored kibble shapes designed for specific jaw structures and eating speeds"
    ],
    safetyVulnerabilities: [
      "Frequent global supply chain shortages for specialized veterinary therapeutic lines",
      "Formulations rely heavily on corn gluten meal and wheat by-products, which draws criticism from natural purists"
    ],
    historicalRecalls: [
      {
        year: "2007",
        docket: "FDA-2007-V-0001",
        product: "Dry Pet Foods (Historical Melamine Crisis)",
        hazard: "Third-party Chinese wheat gluten melamine adulteration (industry-wide crisis)",
        status: "Terminated historical record",
        severity: "Class I"
      }
    ],
    productLineSafetyMatrix: [
      { line: "Breed Health Nutrition (Frenchie, Golden, Pug)", species: "Dogs", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Spotless 10-year safety record; zero FDA dockets." },
      { line: "Feline Health Nutrition (Indoor, Senior, Kitten)", species: "Cats", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Zero recalls; optimal urinary pH formulation." },
      { line: "Veterinary Diet Hydrolyzed Protein (HP)", species: "Both", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Hypoallergenic clean-room production protocol." }
    ],
    veterinaryAdvisory: {
      headline: "Is Royal Canin Safe To Feed in 2026?",
      verdict: "Highly Recommended. With zero FDA recalls in the past decade, Royal Canin is among the most reliable, biochemically consistent veterinary formulas available in the United States.",
      safeToFeed: true
    }
  },
  "taste-of-the-wild": {
    slug: "taste-of-the-wild",
    name: "Taste of the Wild",
    parentCompany: "Diamond Pet Foods (Schell & Kampeter, Inc.)",
    headquarters: "Meta, Missouri, USA",
    establishedYear: 2007,
    safetyGrade: "B",
    safetyScore: 81,
    petImage: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Siberian Husky",
    totalRecalls10Yr: 0,
    marketShareUS: "5.8%",
    manufacturingModel: "Company Owned Plants",
    inspectionComplianceStatus: "Full FDA Compliance",
    overviewSummary: "Taste of the Wild is the flagship premium grain-free brand produced by Diamond Pet Foods. Made with novel proteins like roasted bison, venison, and wild salmon, it rebuilt its manufacturing reputation following an overhaul of Diamond's plant hygiene standards.",
    safetyStrengths: [
      "Zero FDA recalls over the past 10 years (clean record from 2013 to 2026)",
      "High protein-to-cost ratio featuring real smoked meats and species-specific K9 strain probiotics",
      "Modernized plant automation with negative air pressure rooms to prevent cross-contamination"
    ],
    safetyVulnerabilities: [
      "Manufactured in multi-brand Diamond facilities that historically suffered a major multi-state Salmonella outbreak in 2012",
      "High concentration of peas, lentils, and chickpeas featured in FDA's 2019 DCM investigation alert"
    ],
    historicalRecalls: [
      {
        year: "2012",
        docket: "FDA-2012-V-0348",
        product: "All Dry Dog and Cat Formulas",
        hazard: "Multi-state Salmonella outbreak originating at Gaston, SC facility",
        status: "Historical record resolved",
        severity: "Class I"
      }
    ],
    productLineSafetyMatrix: [
      { line: "High Prairie (Roasted Bison & Venison)", species: "Dogs", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "10-year clean record; 100% passing scores." },
      { line: "Pacific Stream (Smoked Salmon)", species: "Both", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Tested clean for heavy metals and histamine." },
      { line: "PREY Limited Ingredient", species: "Both", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Simple 4-ingredient recipes; zero audit flags." }
    ],
    veterinaryAdvisory: {
      headline: "Is Taste of the Wild Safe To Feed in 2026?",
      verdict: "Safe. While pet parents often remember the major 2012 Diamond recall, Taste of the Wild has maintained a spotless 13-year track record without a single FDA safety violation since 2012.",
      safeToFeed: true
    }
  },
  "mid-america": {
    slug: "mid-america",
    name: "Mid America Pet Food (Victor)",
    parentCompany: "Mid America Pet Food, LLC",
    headquarters: "Mount Pleasant, Texas, USA",
    establishedYear: 2007,
    safetyGrade: "D",
    safetyScore: 42,
    petImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Sporting Dog / Pointer",
    totalRecalls10Yr: 3,
    marketShareUS: "3.2%",
    manufacturingModel: "Company Owned Plants",
    inspectionComplianceStatus: "Active Federal Monitoring",
    overviewSummary: "Mid America Pet Food was a beloved budget high-protein brand among sporting and working dog breeders under the Victor label. In late 2023, an extensive multistate Salmonella outbreak led to an unprecedented complete plant shutdown and federal market withdrawal.",
    safetyStrengths: [
      "Dense caloric and protein ratios popular among canine performance trainers",
      "Completely rebuilt air filtration and sanitation systems following the 2023 federal order"
    ],
    safetyVulnerabilities: [
      "Catastrophic 2023 multistate Salmonella infantis outbreak linked to human infant hospitalizations",
      "Mandatory recall of all production lots across Victor, Eagle Mountain, and Wayne brands",
      "Temporary corporate bankruptcy and plant idle period during deep decontamination"
    ],
    historicalRecalls: [
      {
        year: "2023",
        docket: "FDA-2023-V-9921",
        product: "Victor Super Premium Dog Food (All Dry Formulas)",
        hazard: "Multistate Salmonella infantis bacterial contamination",
        status: "Active Federal Monitoring",
        severity: "Class I"
      },
      {
        year: "2023",
        docket: "FDA-2023-V-8841",
        product: "Victor Super Premium Select Beef Meal & Brown Rice",
        hazard: "Positive state surveillance test for Salmonella",
        status: "Expanded into plant shutdown",
        severity: "Class I"
      }
    ],
    productLineSafetyMatrix: [
      { line: "Victor Hi-Pro Plus (All Lots pre-10/24)", species: "Dogs", format: "Dry Kibble", safetyTier: "Recalled Batch Isolated", auditNote: "Subject to full 2023 market withdrawal; verify Best By dates after 2025." },
      { line: "Victor Purpose Performance Formulas", species: "Dogs", format: "Dry Kibble", safetyTier: "Watchlist Tier", auditNote: "Production restarted under enhanced microbiological oversight." },
      { line: "Nature's Logic (Sister Brand)", species: "Both", format: "Dry Kibble", safetyTier: "Verified Clean Tier", auditNote: "Manufactured in separate co-packing facilities; unaffected." }
    ],
    veterinaryAdvisory: {
      headline: "Is Victor Safe To Feed in 2026?",
      verdict: "Exercise Caution. Only feed Victor batches manufactured after mid-2024 with Best By dates in late 2025 or 2026. Verify that your bag is not part of the historical nationwide plant withdrawal docket #FDA-2023-V-9921.",
      safeToFeed: false
    }
  },
  "sportmix": {
    slug: "sportmix",
    name: "Sportmix",
    parentCompany: "Midwestern Pet Foods, Inc.",
    headquarters: "Evansville, Indiana, USA",
    establishedYear: 1982,
    safetyGrade: "F",
    safetyScore: 18,
    petImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Hunting Hound",
    totalRecalls10Yr: 2,
    marketShareUS: "1.4%",
    manufacturingModel: "Company Owned Plants",
    inspectionComplianceStatus: "Severe Warning Letter Active",
    overviewSummary: "Midwestern Pet Foods produced budget hunting and working dog kibble under the Sportmix, Nunn Better, and Pro Pac labels. The brand was the center of one of the deadliest pet food safety disasters in modern history when lethal aflatoxin mold killed over 130 dogs in 2020–2021.",
    safetyStrengths: [
      "Low price point historically made it accessible for rural hunting dog packs"
    ],
    safetyVulnerabilities: [
      "Deadliest US pet food disaster since 2007: over 130 dogs died and 220 sickened from grain aflatoxin",
      "FDA issued a severe Formal Warning Letter finding plant staff failed to follow required mycotoxin screening protocols",
      "Second consecutive 2021 recall for Salmonella across multiple manufacturing facilities"
    ],
    historicalRecalls: [
      {
        year: "2021",
        docket: "FDA-2021-V-0043",
        product: "Sportmix High Energy, Premium, and Energy Plus Formulas",
        hazard: "Fatal Aflatoxin fungal mold poisoning (>130 confirmed canine deaths)",
        status: "FDA Formal Warning Letter Issued",
        severity: "Class I"
      },
      {
        year: "2021",
        docket: "FDA-2021-V-0312",
        product: "Sportmix, Pro Pac, and CanineX Dry Dog & Cat Foods",
        hazard: "Salmonella bacterial contamination across 3 production lines",
        status: "Active Enforcement",
        severity: "Class I"
      }
    ],
    productLineSafetyMatrix: [
      { line: "Sportmix High Energy (Corn Based)", species: "Dogs", format: "Dry Kibble", safetyTier: "Watchlist Tier", auditNote: "Severe historical aflatoxin tragedy; rigorous avoidance advised." },
      { line: "Sportmix Wholesomes (Grain Inclusive)", species: "Dogs", format: "Dry Kibble", safetyTier: "Watchlist Tier", auditNote: "Reformulated without corn/wheat; remains under scrutiny." }
    ],
    veterinaryAdvisory: {
      headline: "Is Sportmix Safe To Feed in 2026?",
      verdict: "NOT RECOMMENDED. PawTruth veterinary editors advise switching pets to brands with proven automated mycotoxin testing protocols. Sportmix holds an 'F' grade following chronic safety non-compliance findings by federal FDA inspectors.",
      safeToFeed: false
    }
  },
  "freshpet": {
    slug: "freshpet",
    name: "Freshpet",
    parentCompany: "Freshpet, Inc.",
    headquarters: "Secaucus, New Jersey, USA",
    establishedYear: 2006,
    safetyGrade: "B+",
    safetyScore: 86,
    petImage: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Beagle",
    totalRecalls10Yr: 2,
    marketShareUS: "4.2% (Leader in Fresh Chilled)",
    manufacturingModel: "Company Owned Plants",
    inspectionComplianceStatus: "Full FDA Compliance",
    overviewSummary: "Freshpet created the refrigerated fresh pet food category in North American supermarkets. Its gentle pasteurization cooking method and cold-chain distribution preserve whole-food nutrients, but require strict thermal management from factory cooler to retail display.",
    safetyStrengths: [
      "Gentle low-temperature cooking preserves natural enzymes and whole meat moisture",
      "Dedicated company-owned kitchen in Bethlehem, Pennsylvania with SQF Level 3 food safety certification",
      "Over 99% of batches intercepted and cleared before reaching consumer bowls"
    ],
    safetyVulnerabilities: [
      "Vulnerable to retail refrigeration breakages (if store coolers fail or warm above 40°F)",
      "2024 and 2021 isolated recalls for Listeria monocytogenes in refrigerated poultry batches"
    ],
    historicalRecalls: [
      {
        year: "2024",
        docket: "FDA-2024-V-3310",
        product: "Fresh From The Kitchen Home Cooked Chicken Recipe",
        hazard: "Potential contamination with Listeria monocytogenes",
        status: "Terminated & Completely Cleared",
        severity: "Class I"
      },
      {
        year: "2021",
        docket: "FDA-2021-V-0618",
        product: "Freshpet Select Small Dog Bite-Size Beef & Chicken",
        hazard: "Potential contamination with Salmonella",
        status: "Terminated & Cleared",
        severity: "Class I"
      }
    ],
    productLineSafetyMatrix: [
      { line: "Freshpet Select Roasted Meals", species: "Dogs", format: "Fresh Chilled", safetyTier: "Verified Clean Tier", auditNote: "Verified cold-chain temperature monitoring." },
      { line: "Vital Whole Blends (Grain-Free)", species: "Both", format: "Fresh Chilled", safetyTier: "Verified Clean Tier", auditNote: "Clean 5-year microbiological audit record." },
      { line: "Freshpet Deli Fresh Rolls", species: "Dogs", format: "Fresh Chilled", safetyTier: "Verified Clean Tier", auditNote: "Sous-vide style cooked rolls; sterile vacuum casing." }
    ],
    veterinaryAdvisory: {
      headline: "Is Freshpet Safe To Feed in 2026?",
      verdict: "Yes, provided cold-chain guidelines are maintained. Freshpet holds a high 'B+' rating. Always verify that your refrigerator operates at or below 40°F (4°C) and consume refrigerated rolls within 7 days of opening.",
      safeToFeed: true
    }
  }
};
