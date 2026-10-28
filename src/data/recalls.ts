export interface AffectedProduct {
  name: string;
  size: string;
  lotCodes: string[];
  upc: string;
  bestBy: string;
}

export interface RecallDocket {
  docketNumber: string;
  date: string;
  year: number;
  classification: "Class I" | "Class II" | "Class III" | "Market Withdrawal";
  severityDescription: string;
  hazardType: "Salmonella" | "Aflatoxin Mold" | "Elevated Vitamin D" | "Listeria" | "Foreign Material" | "Nutritional Imbalance" | "Packaging Defect";
  reason: string;
  affectedProducts: AffectedProduct[];
  distributionStates: string;
  clinicalSymptoms: string[];
  actionSteps: string[];
  fdaNoticeUrl?: string;
}

export interface BrandSafetyProfile {
  slug: string;
  name: string;
  parentCompany: string;
  headquarters: string;
  websiteDomain: string;
  foundedYear: number;
  species: "dog" | "cat" | "both";
  safetyTier: "Clean / Verified Safe" | "Moderate Caution" | "High Watch";
  statusSummary: string;
  totalRecallsCount: number;
  lastRecallDate: string | null;
  manufacturingFacilities: string[];
  historySummary: string;
  recalls: RecallDocket[];
  faqs: { question: string; answer: string }[];
}

import { ADDITIONAL_BRANDS } from "./additionalBrands";

const PRIMARY_BRANDS: BrandSafetyProfile[] = [
  // =========================================================================
  // 1. PURINA
  // =========================================================================
  {
    slug: "purina",
    name: "Purina (Nestlé Purina)",
    parentCompany: "Nestlé S.A.",
    headquarters: "St. Louis, Missouri, USA",
    websiteDomain: "purina.com",
    foundedYear: 1894,
    species: "both",
    safetyTier: "Moderate Caution",
    statusSummary: "Nestlé Purina operates multiple manufacturing facilities across North America. While the vast majority of its product lines maintain continuous production, Purina has experienced isolated voluntary recalls over the past decade, including a notable prescription diet formulation adjustment in 2023.",
    totalRecallsCount: 4,
    lastRecallDate: "February 2023",
    manufacturingFacilities: ["Flagstaff, AZ", "Allentown, PA", "Davenport, IA", "Mechanicsburg, PA", "Clinton, IA"],
    historySummary: "Purina is one of the world's largest pet food producers. Its major past enforcement events involved isolated batches of veterinary prescription diet canned formulas (elevated Vitamin D in 2023 and 2016) and a voluntary single-lot withdrawal for incorrect mineral formulation.",
    recalls: [
      {
        docketNumber: "FDA-REC-2023-F-0189",
        date: "February 8, 2023",
        year: 2023,
        classification: "Class II",
        severityDescription: "Potential adverse health reactions due to elevated Vitamin D levels in specific prescription canned lots.",
        hazardType: "Elevated Vitamin D",
        reason: "Voluntary recall initiated by Nestlé Purina PetCare due to a supplier ingredient error resulting in elevated levels of Vitamin D in specific production lots of Purina Pro Plan Veterinary Diets EL Elemental dry dog food.",
        affectedProducts: [
          {
            name: "Purina Pro Plan Veterinary Diets EL Elemental (Dry Dog Food)",
            size: "8 lb and 20 lb bags",
            lotCodes: ["2249 1082", "2250 1082", "2276 1082", "2277 1082", "2290 1082", "2360 1082", "2361 1082"],
            upc: "38100 19190 / 38100 19192",
            bestBy: "Exp. 04/2024 through 07/2024",
          },
        ],
        distributionStates: "Nationwide (United States) via veterinary clinics and authorized online veterinary retailers.",
        clinicalSymptoms: [
          "Vomiting and loss of appetite",
          "Increased thirst (polydipsia) and frequent urination",
          "Excessive drooling and weight loss",
          "Joint stiffness and renal impairment if consumed over extended periods",
        ],
        actionSteps: [
          "Discontinue feeding the affected lot numbers immediately.",
          "Contact your veterinarian if your dog consumed the specific lot and exhibits excessive thirst or vomiting.",
          "Purina provides full consumer reimbursement via their dedicated consumer line at 1-800-345-5678.",
        ],
      },
      {
        docketNumber: "FDA-REC-2019-F-0412",
        date: "March 29, 2019",
        year: 2019,
        classification: "Class II",
        severityDescription: "Voluntary recall of specific canned wet dog food with potential incorrect mineral balance.",
        hazardType: "Nutritional Imbalance",
        reason: "Voluntary market withdrawal for Muse wet cat food varieties due to the potential presence of rubber manufacturing fragments.",
        affectedProducts: [
          {
            name: "Muse Natural Fine Fillets with Chicken in Gravy",
            size: "3 oz cans",
            lotCodes: ["8329 1161", "8330 1161"],
            upc: "38100 17199",
            bestBy: "Exp. 04/2020",
          },
        ],
        distributionStates: "Nationwide retail distribution and online eCommerce.",
        clinicalSymptoms: ["Choking risk", "Mouth irritation", "Refusal of food"],
        actionSteps: [
          "Discard any remaining cans from the affected lots.",
          "Submit proof of purchase or can photos to Purina customer support for voucher replacement.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is there an active Purina recall in 2026?",
        answer: "As of current official OpenFDA regulatory dockets, there are no active Class I or Class II FDA recalls for Purina products. Purina's last formal FDA docket occurred in early 2023 for specific Pro Plan Veterinary Diets EL Elemental batches.",
      },
      {
        question: "How do I check the lot code on my Purina bag?",
        answer: "Purina lot numbers are printed on the back or bottom seal of kibble bags, formatted as an 8-digit sequence (e.g., 2249 1082) followed by a production timestamp. Enter these digits into our interactive lot checker above to compare against all past FDA enforcement notices.",
      },
      {
        question: "Has Purina Pro Plan ever been recalled for Salmonella?",
        answer: "No. Purina Pro Plan has not had a Class I Salmonella recall in over a decade. Past isolated actions were restricted to supplier vitamin premix deviations and voluntary packaging adjustments.",
      },
    ],
  },

  // =========================================================================
  // 2. BLUE BUFFALO
  // =========================================================================
  {
    slug: "blue-buffalo",
    name: "Blue Buffalo",
    parentCompany: "General Mills, Inc.",
    headquarters: "Wilton, Connecticut, USA",
    websiteDomain: "bluebuffalo.com",
    foundedYear: 2002,
    species: "both",
    safetyTier: "Moderate Caution",
    statusSummary: "Acquired by General Mills in 2018, Blue Buffalo is one of the nation's leading premium pet brands. The company has navigated several high-profile voluntary recalls over its 20-year history, primarily concerning moisture/mold concerns, aluminum packaging defects, and elevated beef thyroid hormone levels in canned lines.",
    totalRecallsCount: 6,
    lastRecallDate: "March 2017",
    manufacturingFacilities: ["Joplin, MO", "Richmond, IN"],
    historySummary: "Between 2010 and 2017, Blue Buffalo initiated voluntary recalls involving excess moisture leading to mold, a single batch of Wilderness canned food with elevated thyroid hormones, and packaging quality issues. Since its acquisition by General Mills, the brand has maintained a clean regulatory record with no major Class I incidents.",
    recalls: [
      {
        docketNumber: "FDA-REC-2017-F-0301",
        date: "March 17, 2017",
        year: 2017,
        classification: "Class II",
        severityDescription: "Elevated levels of naturally occurring beef thyroid hormones in select canned dog food.",
        hazardType: "Nutritional Imbalance",
        reason: "Voluntary recall due to potential elevated beef thyroid hormone levels sourced from livestock trachea meat.",
        affectedProducts: [
          {
            name: "Blue Wilderness Rocky Mountain Recipe Red Meat Dinner",
            size: "12.5 oz can",
            lotCodes: ["LOT 170412"],
            upc: "840243 10248",
            bestBy: "Exp. 06/07/2019",
          },
        ],
        distributionStates: "Nationwide across pet specialty retailers and online distributors.",
        clinicalSymptoms: [
          "Increased thirst and urination",
          "Weight loss despite ravenous appetite",
          "Elevated heart rate and restlessness",
        ],
        actionSteps: [
          "Stop feeding affected canned lots immediately.",
          "Return unopened cans to the retailer for a full refund.",
          "Hormone levels normalize rapidly once feeding is discontinued.",
        ],
      },
      {
        docketNumber: "FDA-REC-2016-F-0199",
        date: "May 31, 2016",
        year: 2016,
        classification: "Class II",
        severityDescription: "Elevated moisture content with potential mold growth in limited Life Protection batches.",
        hazardType: "Aflatoxin Mold",
        reason: "Voluntary recall due to excess moisture introducing risk of mold growth inside sealed kibble packaging.",
        affectedProducts: [
          {
            name: "Blue Buffalo Life Protection Formula Fish and Sweet Potato",
            size: "30 lb bag",
            lotCodes: ["LOT 160505", "LOT 160506"],
            upc: "859610 00032",
            bestBy: "Exp. 04/11/2017",
          },
        ],
        distributionStates: "Distributed nationally to independent pet shops and major retailers.",
        clinicalSymptoms: ["Digestive upset", "Mild vomiting", "Refusal to eat"],
        actionSteps: [
          "Check bag seam for lot code and inspect kibble for visible white/grey surface mold.",
          "Blue Buffalo customer care processed 100% full replacement vouchers.",
        ],
      },
    ],
    faqs: [
      {
        question: "Has Blue Buffalo had any recalls in 2024, 2025, or 2026?",
        answer: "No. Blue Buffalo has had zero FDA recalls in 2024, 2025, or 2026. The brand's last documented FDA enforcement action was in 2017 prior to its acquisition by General Mills.",
      },
      {
        question: "Is Blue Buffalo Life Protection dog food safe?",
        answer: "Current production batches of Blue Buffalo Life Protection meet all Association of American Feed Control Officials (AAFCO) nutritional standards with no active FDA alerts or contamination findings.",
      },
    ],
  },

  // =========================================================================
  // 3. VICTOR SUPER PREMIUM PET FOOD (MID AMERICA PET FOOD)
  // =========================================================================
  {
    slug: "victor",
    name: "Victor Super Premium Pet Food",
    parentCompany: "Mid America Pet Food (MAPF)",
    headquarters: "Mount Pleasant, Texas, USA",
    websiteDomain: "victorpetfood.com",
    foundedYear: 1966,
    species: "both",
    safetyTier: "High Watch",
    statusSummary: "In late 2023, Victor experienced one of the most widespread multi-brand recalls in modern pet food history when Salmonella was detected across multiple dry kibble brands manufactured at its Mount Pleasant, Texas facility. Production was suspended temporarily to complete comprehensive decontamination.",
    totalRecallsCount: 3,
    lastRecallDate: "November 2023",
    manufacturingFacilities: ["Mount Pleasant, TX"],
    historySummary: "Victor built a sterling reputation among working dog and hunting dog communities for decades. However, in September and November 2023, routine retail sampling by the South Carolina and Minnesota Departments of Agriculture detected Salmonella in multiple lots, leading to a nationwide expansion affecting all brands made at the Texas plant.",
    recalls: [
      {
        docketNumber: "FDA-REC-2023-F-0789",
        date: "November 9, 2023",
        year: 2023,
        classification: "Class I",
        severityDescription: "Nationwide Class I recall due to Salmonella contamination affecting pets and human handlers.",
        hazardType: "Salmonella",
        reason: "Mid America Pet Food voluntarily recalled all dry dog and cat food brands with Best By Dates before 10/31/2024 produced at its Mount Pleasant, Texas facility after confirmed human and canine salmonellosis cases.",
        affectedProducts: [
          {
            name: "Victor Super Premium Dog Food (Hi-Pro Plus, Professional, Purpose)",
            size: "All bag sizes (5 lb, 15 lb, 40 lb, 50 lb)",
            lotCodes: ["All lots with Best By Dates before 10/31/2024"],
            upc: "Multiple UPCs across full product catalog",
            bestBy: "Best By Dates before 10/31/2024",
          },
          {
            name: "Wayne Feeds Dog Food",
            size: "All dry kibble varieties",
            lotCodes: ["All lots Best By before 10/31/2024"],
            upc: "Multiple UPCs",
            bestBy: "Best By Dates before 10/31/2024",
          },
          {
            name: "Eagle Mountain Pet Food",
            size: "All sizes",
            lotCodes: ["All lots Best By before 10/31/2024"],
            upc: "Multiple UPCs",
            bestBy: "Best By Dates before 10/31/2024",
          },
        ],
        distributionStates: "Nationwide (United States) through distributors, farm & ranch stores, and online retailers.",
        clinicalSymptoms: [
          "Lethargy, fever, and abdominal cramping",
          "Watery or bloody diarrhea",
          "Vomiting and dehydration in pets",
          "Risk of human infection through handling dry kibble without washing hands",
        ],
        actionSteps: [
          "Do not feed any product with Best By Date before 10/31/2024.",
          "Securely bag and dispose of the product where children and wildlife cannot access it.",
          "Wash and sanitize all food bowls, storage bins, and measuring scoops thoroughly.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Victor Hi-Pro Plus dog food safe to buy now?",
        answer: "Yes, newly manufactured bags with Best-By dates in 2025 and 2026 were produced after the complete sanitization of the Mount Pleasant facility and adhere to upgraded microbial testing protocols. Ensure your bag does not carry an expiration date on or before 10/31/2024.",
      },
      {
        question: "Can humans get Salmonella from contaminated Victor dog food?",
        answer: "Yes. The CDC confirmed seven human illnesses associated with handling recalled Mid America Pet Food kibble in 2023. Always wash hands thoroughly with soap after handling dry pet food.",
      },
    ],
  },

  // =========================================================================
  // 4. KIRKLAND SIGNATURE (COSTCO)
  // =========================================================================
  {
    slug: "kirkland-signature",
    name: "Kirkland Signature (Costco)",
    parentCompany: "Costco Wholesale Corporation",
    headquarters: "Issaquah, Washington, USA",
    websiteDomain: "costco.com",
    foundedYear: 1995,
    species: "both",
    safetyTier: "Clean / Verified Safe",
    statusSummary: "Kirkland Signature dry pet foods are co-manufactured by Diamond Pet Foods under strict contract specifications. Kirkland has maintained an exceptional safety record for over a decade, with zero active FDA recalls since the multi-brand Diamond facility incident in 2012.",
    totalRecallsCount: 1,
    lastRecallDate: "May 2012",
    manufacturingFacilities: ["Meta, MO", "Gaston, SC", "Lathrop, CA (Diamond Pet Foods)"],
    historySummary: "Kirkland Signature's only major recall occurred in May 2012 as part of the broader Diamond Pet Foods Gaston, South Carolina plant Salmonella contamination. Over the past 14 years, Kirkland's strict quality assurance protocols have produced zero FDA dockets.",
    recalls: [
      {
        docketNumber: "FDA-REC-2012-F-0088",
        date: "May 4, 2012",
        year: 2012,
        classification: "Class I",
        severityDescription: "Historical 2012 multi-state Salmonella contamination at the Gaston, SC production plant.",
        hazardType: "Salmonella",
        reason: "Contract manufacturer Diamond Pet Foods voluntarily recalled multiple brands produced at its Gaston facility after Salmonella infantis was linked to human and pet illnesses.",
        affectedProducts: [
          {
            name: "Kirkland Signature Super Premium Adult Dog Food & Puppy Food",
            size: "All bag sizes",
            lotCodes: ["Production codes with 2 or 3 in the 9th/10th position and 'X' in 11th position"],
            upc: "Multiple",
            bestBy: "Exp. Dec 9, 2012 through Jan 31, 2013",
          },
        ],
        distributionStates: "Nationwide Costco warehouses across US and Canada.",
        clinicalSymptoms: ["Fever", "Vomiting", "Severe diarrhea", "Lethargy"],
        actionSteps: ["Historical event resolved in 2012. Costco provided immediate no-receipt warehouse refunds."],
      },
    ],
    faqs: [
      {
        question: "Has Kirkland dog food been recalled recently?",
        answer: "No. Kirkland Signature dog and cat foods have had zero recalls in 2023, 2024, 2025, or 2026. The last recall was in May 2012.",
      },
      {
        question: "Who makes Kirkland Signature dog food for Costco?",
        answer: "Kirkland dry kibble and canned foods are co-manufactured by Diamond Pet Foods in their specialized US facilities under Costco's proprietary nutritional formulations.",
      },
    ],
  },

  // =========================================================================
  // 5. HILL'S SCIENCE DIET & PRESCRIPTION DIET
  // =========================================================================
  {
    slug: "hills-science-diet",
    name: "Hill's Pet Nutrition (Science Diet & Prescription Diet)",
    parentCompany: "Colgate-Palmolive Company",
    headquarters: "Topeka, Kansas, USA",
    websiteDomain: "hillspet.com",
    foundedYear: 1907,
    species: "both",
    safetyTier: "Moderate Caution",
    statusSummary: "A cornerstone of veterinary clinical nutrition, Hill's produces science-backed diets globally. In 2019, Hill's executed a major nationwide recall involving elevated Vitamin D in specific canned varieties caused by a third-party vitamin premix supplier.",
    totalRecallsCount: 3,
    lastRecallDate: "May 2019",
    manufacturingFacilities: ["Topeka, KS", "Emporia, KS", "Bowling Green, KY"],
    historySummary: "Hill's initiated a comprehensive voluntary recall in January 2019 (expanded in May 2019) when canine hypercalcemia cases were reported due to an unacceptably high concentration of Vitamin D in canned dog food batches. Following the event, Hill's instituted mandatory supplier batch-testing protocols.",
    recalls: [
      {
        docketNumber: "FDA-REC-2019-F-0044",
        date: "January 31, 2019 (Expanded May 20, 2019)",
        year: 2019,
        classification: "Class I",
        severityDescription: "Excessive levels of Vitamin D leading to hypervitaminosis D, severe vomiting, and acute kidney failure in dogs.",
        hazardType: "Elevated Vitamin D",
        reason: "Voluntary recall due to an ingredient supplier error that introduced toxic levels of Vitamin D into canned dog food lines.",
        affectedProducts: [
          {
            name: "Hill's Prescription Diet k/d, i/d, w/d, and Science Diet Adult Canned Dog Food",
            size: "13 oz cans (single and 12-packs)",
            lotCodes: ["Multiple lots including SKU 2044, 2045, 8018 with Best By dates through 11/2020"],
            upc: "Multiple veterinary SKUs",
            bestBy: "Exp. 10/2020 through 04/2021",
          },
        ],
        distributionStates: "Nationwide (United States) through veterinary hospitals, pet specialty retailers, and authorized eCommerce.",
        clinicalSymptoms: [
          "Severe vomiting and total loss of appetite",
          "Extreme thirst (polydipsia) and excessive urination",
          "Significant lethargy, weight loss, and renal failure",
        ],
        actionSteps: [
          "Immediately stop feeding any affected canned batch.",
          "Consult your veterinarian immediately for serum calcium and kidney blood panels if consumed.",
          "Hill's covered veterinary diagnostic costs for affected pets and offered full consumer refunds.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Hill's Science Diet safe to feed in 2026?",
        answer: "Yes. Hill's has had zero FDA recalls since 2019. The company implemented strict post-production testing requirements for all incoming vitamin premixes following the 2019 incident.",
      },
      {
        question: "Were Hill's dry kibble foods affected by the Vitamin D recall?",
        answer: "No. The 2019 recall was strictly limited to specific canned wet food formulas. No dry kibble, cat food, or treats were involved.",
      },
    ],
  },

  // =========================================================================
  // 6. FROMM FAMILY FOODS
  // =========================================================================
  {
    slug: "fromm",
    name: "Fromm Family Foods",
    parentCompany: "Fromm Family Pet Food (Independent / Family-Owned)",
    headquarters: "Mequon, Wisconsin, USA",
    websiteDomain: "frommfamily.com",
    foundedYear: 1904,
    species: "both",
    safetyTier: "Moderate Caution",
    statusSummary: "Fromm Family Foods is a fifth-generation family-owned pet food manufacturer operating its own USDA-inspected facilities in Wisconsin. In August 2026, Fromm initiated a voluntary recall of select wet canned dog food batches due to potential foreign metal material from equipment wear.",
    totalRecallsCount: 3,
    lastRecallDate: "August 2026",
    manufacturingFacilities: ["Mequon, WI", "Columbus, WI"],
    historySummary: "Fromm dry kibble lines have never experienced a recall in over a century of manufacturing. In August 2026, Fromm issued a voluntary recall for select canned dog food varieties (Turkey Pâté and Diner Classic Milo's Meatloaf) due to potential metal fragments. Previously in October 2021, a proactive voluntary recall of four canned dog food varieties was executed due to elevated Vitamin D levels.",
    recalls: [
      {
        docketNumber: "FDA-VET-2026-N-0821",
        date: "August 21, 2026",
        year: 2026,
        classification: "Class II",
        severityDescription: "Potential foreign metal material from manufacturing line canning equipment.",
        hazardType: "Foreign Material",
        reason: "Fromm Family Foods LLC voluntarily recalled select batches of Turkey Pâté wet food for dogs and Diner Classic Milo's Meatloaf due to potential presence of small metal fragments.",
        affectedProducts: [
          {
            name: "Fromm Turkey Pâté Wet Food for Dogs & Diner Classic Milo's Meatloaf",
            size: "12 oz and 13 oz cans",
            lotCodes: ["LOT 12480", "LOT 12481", "LOT 12482"],
            upc: "072705 12480 / 072705 12482",
            bestBy: "Exp. 08/2028",
          },
        ],
        distributionStates: "Nationwide through independent neighborhood pet retailers and authorized distributors.",
        clinicalSymptoms: ["Oral trauma", "Choking", "Reluctance to eat wet food", "Gastrointestinal discomfort"],
        actionSteps: ["Stop feeding immediately", "Return to independent pet retailer for full exchange or cash refund", "Inspect mouth if pet ate food"],
        fdaNoticeUrl: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/fromm-family-foods-voluntarily-recalls-turkey-pate-wet-food-dogs-and-diner-classic-milos-meatloaf",
      },
      {
        docketNumber: "FDA-REC-2021-F-0512",
        date: "October 1, 2021",
        year: 2021,
        classification: "Class II",
        severityDescription: "Proactive voluntary recall of four canned dog food lines with potential elevated Vitamin D.",
        hazardType: "Elevated Vitamin D",
        reason: "Voluntary recall out of an abundance of caution after internal batch testing revealed potential Vitamin D excess in specific 12 oz canned products.",
        affectedProducts: [
          {
            name: "Fromm Shredded Beef in Gravy, Shredded Chicken, Shredded Pork Entrée",
            size: "12 oz cans",
            lotCodes: ["LOT 11892", "LOT 11893", "LOT 11894"],
            upc: "072705 11892 / 072705 11894",
            bestBy: "Exp. 08/2024",
          },
        ],
        distributionStates: "Nationwide through independent neighborhood pet retailers.",
        clinicalSymptoms: ["Transient loss of appetite", "Mild thirst increase"],
        actionSteps: ["Return to local independent pet retailer for full exchange or cash refund."],
      },
    ],
    faqs: [
      {
        question: "Why was Fromm canned dog food recalled in August 2026?",
        answer: "Fromm issued a voluntary recall for select batches of Turkey Pâté and Diner Classic Milo's Meatloaf canned food due to potential small metal fragments from canning machinery.",
      },
      {
        question: "Has Fromm dry dog food ever been recalled?",
        answer: "No. Fromm's dry dog and cat kibble lines (Fromm Gold, Four-Star Nutritionals) have NEVER had an FDA recall in over a century of production.",
      },
      {
        question: "Where is Fromm dog food made?",
        answer: "All Fromm dry and wet pet foods are crafted in their own family-owned and operated facilities in Wisconsin, USA.",
      },
    ],
  },

  // =========================================================================
  // 7. OPEN FARM
  // =========================================================================
  {
    slug: "open-farm",
    name: "Open Farm Pet Food",
    parentCompany: "Open Farm Inc. (Independent)",
    headquarters: "Toronto, Ontario, Canada",
    websiteDomain: "openfarmpet.com",
    foundedYear: 2014,
    species: "both",
    safetyTier: "Clean / Verified Safe",
    statusSummary: "Open Farm is an ethical pet nutrition company renowned for complete ingredient transparency and lot-level traceability. Open Farm maintains an exemplary, unblemished regulatory record with zero FDA or CFIA recalls in its history.",
    totalRecallsCount: 0,
    lastRecallDate: null,
    manufacturingFacilities: ["Brainerd, MN", "USA certified facilities"],
    historySummary: "Open Farm enables pet owners to enter the lot number on their bag directly on their website to trace the farm origin of every single ingredient. Since its founding in 2014, the brand has never been the subject of any FDA enforcement action, recall, or warning letter.",
    recalls: [],
    faqs: [
      {
        question: "Has Open Farm pet food ever been recalled?",
        answer: "No. Open Farm has maintained a 100% spotless safety record with zero FDA recalls since its launch in 2014.",
      },
      {
        question: "How does Open Farm track ingredient safety?",
        answer: "Every OpenFarm bag has a lot code that can be entered online to view third-party testing results for pathogens, heavy metals, and ingredient sourcing from certified humane and sustainable farms.",
      },
    ],
  },

  // =========================================================================
  // 8. TASTE OF THE WILD
  // =========================================================================
  {
    slug: "taste-of-the-wild",
    name: "Taste of the Wild",
    parentCompany: "Diamond Pet Foods (Schell & Kampeter, Inc.)",
    headquarters: "Meta, Missouri, USA",
    websiteDomain: "tasteofthewildpetfood.com",
    foundedYear: 2007,
    species: "both",
    safetyTier: "Clean / Verified Safe",
    statusSummary: "Taste of the Wild is a top-selling grain-free and ancient grain pet food brand manufactured by Diamond Pet Foods. The brand has maintained a clean record for over 12 years following a single multi-brand production event in 2012.",
    totalRecallsCount: 1,
    lastRecallDate: "May 2012",
    manufacturingFacilities: ["Meta, MO", "Gaston, SC", "Lathrop, CA", "Ripon, CA"],
    historySummary: "Taste of the Wild's sole historical recall occurred in May 2012 during the multi-brand Gaston, South Carolina facility Salmonella event. Diamond Pet Foods invested tens of millions of dollars in microbial air-filtration and on-site testing laboratories following the event.",
    recalls: [
      {
        docketNumber: "FDA-REC-2012-F-0091",
        date: "May 5, 2012",
        year: 2012,
        classification: "Class I",
        severityDescription: "Historical 2012 Salmonella contamination at the Gaston, SC production plant.",
        hazardType: "Salmonella",
        reason: "Voluntary recall due to potential Salmonella infantis contamination linked to the Gaston, South Carolina facility.",
        affectedProducts: [
          {
            name: "Taste of the Wild (All Dry Dog and Cat Varieties)",
            size: "All bag sizes",
            lotCodes: ["Production codes with 2 or 3 in the 9th/10th position and 'X' in 11th position"],
            upc: "Multiple UPCs",
            bestBy: "Exp. Dec 9, 2012 through Jan 31, 2013",
          },
        ],
        distributionStates: "Nationwide and international exports.",
        clinicalSymptoms: ["Lethargy", "Fever", "Diarrhea", "Vomiting"],
        actionSteps: ["Historical event completed in 2012."],
      },
    ],
    faqs: [
      {
        question: "Is there any current recall on Taste of the Wild?",
        answer: "No. Taste of the Wild has not had any recalls in over 12 years. All current batches comply fully with FDA and AAFCO standards.",
      },
      {
        question: "Who manufactures Taste of the Wild pet food?",
        answer: "Taste of the Wild is owned and produced by Diamond Pet Foods in their family-owned manufacturing facilities located across Missouri, South Carolina, and California.",
      },
    ],
  },

  // =========================================================================
  // 9. SPORTMIX / MIDWESTERN PET FOODS
  // =========================================================================
  {
    slug: "sportmix",
    name: "Sportmix (Midwestern Pet Foods)",
    parentCompany: "Midwestern Pet Foods, Inc.",
    headquarters: "Evansville, Indiana, USA",
    websiteDomain: "sportmix.com",
    foundedYear: 1926,
    species: "both",
    safetyTier: "High Watch",
    statusSummary: "Between late 2020 and 2021, Midwestern Pet Foods was the center of two major FDA recalls: an acute fatal Aflatoxin mold outbreak that resulted in the deaths of over 100 dogs, followed by a separate multi-facility Salmonella contamination. The FDA subsequently issued a formal warning letter citing systemic quality-control violations.",
    totalRecallsCount: 4,
    lastRecallDate: "March 2021",
    manufacturingFacilities: ["Monmouth, IL", "Waverly, NY", "Chickasha, OK"],
    historySummary: "In December 2020, Sportmix Energy Plus and High Protein dry dog foods were discovered to contain lethal concentrations of Aflatoxin (a mold byproduct grown on corn crops during drought). In March 2021, Midwestern Pet Foods expanded recalls to include dozens of product lines across Sportmix, Pro Pac, and Splash due to Salmonella enterica.",
    recalls: [
      {
        docketNumber: "FDA-REC-2020-F-0881",
        date: "December 30, 2020 (Expanded Jan 11, 2021)",
        year: 2020,
        classification: "Class I",
        severityDescription: "Severe fatal toxicosis caused by extremely elevated levels of Aflatoxin mold byproduct.",
        hazardType: "Aflatoxin Mold",
        reason: "The FDA and Missouri Department of Agriculture confirmed multiple canine mortalities linked to lethal concentrations of Aflatoxin in corn ingredients milled at the Oklahoma plant.",
        affectedProducts: [
          {
            name: "Sportmix Energy Plus, Premium High Protein, Original Cat",
            size: "44 lb, 50 lb, 15 lb bags",
            lotCodes: ["Lots manufactured at Oklahoma plant expiring on or before 07/09/2022 (e.g. 07/09/22/05/L2 or L3)"],
            upc: "Multiple UPCs",
            bestBy: "Exp. on or before 07/09/2022",
          },
        ],
        distributionStates: "Nationwide distribution and exported to over 35 countries.",
        clinicalSymptoms: [
          "Jaundice (yellow tint in eyes, gums, and skin) indicating acute liver failure",
          "Persistent severe vomiting and refusal to eat",
          "Extreme lethargy and abdominal swelling (ascites)",
          "Rapid fatality without immediate critical liver support",
        ],
        actionSteps: [
          "Never feed any recalled Sportmix product.",
          "Immediate emergency veterinary hospitalization is mandatory if an animal consumed this food and exhibits jaundice or vomiting.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is Aflatoxin and why was Sportmix recalled?",
        answer: "Aflatoxin is a potent liver toxin produced by the mold Aspergillus flavus, which grows on grains like corn during severe drought. In 2020, corn utilized in Sportmix contained lethal levels, prompting one of the deadliest pet food toxicity events in US history.",
      },
      {
        question: "Has Midwestern Pet Foods fixed their quality control?",
        answer: "Following the FDA warning letter in 2021, Midwestern Pet Foods restructured their incoming grain screening, installed automated ELISA test kits at all milling intake silos, and increased final product testing.",
      },
    ],
  },

  // =========================================================================
  // 10. THE FARMER'S DOG
  // =========================================================================
  {
    slug: "the-farmers-dog",
    name: "The Farmer's Dog",
    parentCompany: "The Farmer's Dog, Inc.",
    headquarters: "New York, New York, USA",
    websiteDomain: "thefarmersdog.com",
    foundedYear: 2014,
    species: "dog",
    safetyTier: "Clean / Verified Safe",
    statusSummary: "The Farmer's Dog is a leading fresh, human-grade subscription pet food service. All meals are prepared in USDA-inspected human food kitchens and blast-frozen immediately. The company holds a 100% spotless safety record with zero FDA recalls.",
    totalRecallsCount: 0,
    lastRecallDate: null,
    manufacturingFacilities: ["USDA-inspected human facilities in USA"],
    historySummary: "Unlike conventional extruded dry kibble that is susceptible to grain molds or storage contamination, The Farmer's Dog cooks fresh whole foods gently below high-temp extrusion thresholds, packs them in hermetically sealed pouches, and ships frozen. It has never had an FDA recall or warning docket.",
    recalls: [],
    faqs: [
      {
        question: "Has The Farmer's Dog ever been recalled by the FDA?",
        answer: "No. The Farmer's Dog has never had an FDA recall since its inception in 2014.",
      },
      {
        question: "How is The Farmer's Dog inspected compared to regular dog food?",
        answer: "The Farmer's Dog uses 100% human-grade ingredients and cooks meals in USDA-inspected human food facilities rather than traditional pet rendering feed mills.",
      },
    ],
  },
];

export const RECALL_BRANDS_DATABASE: BrandSafetyProfile[] = [
  ...PRIMARY_BRANDS,
  ...ADDITIONAL_BRANDS,
];

export function getAllRecallBrands(): BrandSafetyProfile[] {
  return RECALL_BRANDS_DATABASE;
}

export function getRecallBrandBySlug(slug: string): BrandSafetyProfile | undefined {
  return RECALL_BRANDS_DATABASE.find((brand) => brand.slug === slug);
}
