export interface RecallDocket {
  id: string;
  brand: string;
  brandSlug: string;
  productName: string;
  packageSize: string;
  species: "Dogs" | "Cats" | "Both";
  petImage: string; // High-res royalty-free dog/cat lifestyle photo
  petBreedName: string;
  docketNumber: string;
  announcementDate: string;
  classification: "CLASS I (URGENT)" | "CLASS II (MODERATE)" | "CLASS III (LOW)";
  hazardType: string;
  hazardSlug: string;
  hazardSummary: string;
  clinicalRisks: string[];
  lotCodes: string[];
  upcBarcode: string;
  packagingType: string;
  stampLocationGuide: string;
  affectedStates: { code: string; name: string; volume: string }[];
  distributionScope: string;
  actionSteps: { step: string; instruction: string }[];
  manufacturerStatement: string;
  fdaEnforcementStatus: "Active Federal Docket" | "Mandatory Retail Pull" | "Voluntary Market Withdrawal" | "Case Terminated & Cleared";
}

export const recallsData: RecallDocket[] = [
  {
    id: "fda-2024-salmonella-kibble",
    brand: "Wild Harvest Naturals",
    brandSlug: "mid-america",
    productName: "Freeze-Dried Atlantic Salmon Cat Treats",
    packageSize: "4 oz Foil Barrier Pouch",
    species: "Cats",
    petImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Domestic Shorthair Cat",
    docketNumber: "FDA-2026-V-8841",
    announcementDate: "October 18, 2026",
    classification: "CLASS I (URGENT)",
    hazardType: "Salmonella enterica Contamination",
    hazardSlug: "salmonella",
    hazardSummary: "Routine microbiological audit by state agricultural lab detected Salmonella enterica serotype in retail sample pouch. Cross-contamination risk to human handlers and pets.",
    clinicalRisks: [
      "Severe acute diarrhea and vomiting within 12 to 36 hours",
      "Lethargy, abdominal cramping, and rapid fluid dehydration",
      "Asymptomatic bacterial shedding transmitting infection to human owners",
      "Life-threatening septicemia in senior cats and kittens"
    ],
    lotCodes: ["8841A", "8841B", "8842"],
    upcBarcode: "0 84024 31441 2",
    packagingType: "4 oz Multi-Ply Foil Pouch with Resealable Zip",
    stampLocationGuide: "Lower right corner on the reverse side of the pouch, approximately 1 inch above the UPC barcode. Stamped in dot-matrix black ink.",
    affectedStates: [
      { code: "CA", name: "California", volume: "12,400 bags" },
      { code: "TX", name: "Texas", volume: "9,800 bags" },
      { code: "FL", name: "Florida", volume: "7,500 bags" },
      { code: "NY", name: "New York", volume: "6,200 bags" },
      { code: "WA", name: "Washington", volume: "4,100 bags" },
      { code: "IL", name: "Illinois", volume: "3,800 bags" },
      { code: "GA", name: "Georgia", volume: "3,100 bags" },
      { code: "NC", name: "North Carolina", volume: "2,900 bags" }
    ],
    distributionScope: "Nationwide retail distribution via independent pet supply stores, Chewy, and regional wholesalers.",
    actionSteps: [
      { step: "1. Quarantine Food Immediately", instruction: "Do not feed remaining treats. Seal the bag securely inside a double Ziploc bag to prevent accidental child or pet contact." },
      { step: "2. Disinfect Bowls & Storage", instruction: "Wash all pet food bowls, treat jars, and food scoops in hot soapy water or a 1:10 bleach solution." },
      { step: "3. Monitor Clinical Symptoms", instruction: "Watch for fever, vomiting, bloody stools, and lethargy. Contact emergency veterinary clinic if symptoms develop." },
      { step: "4. Claim Full Refund", instruction: "Take a clear smartphone photo of the stamped lot code for refund processing at your retailer or via manufacturer hotline." }
    ],
    manufacturerStatement: "Wild Harvest Naturals has initiated this voluntary recall out of an abundance of caution. No confirmed pet illnesses have been reported to date. Production line sanitation has been overhauled.",
    fdaEnforcementStatus: "Active Federal Docket"
  },
  {
    id: "fda-2023-purina-pro-plan-vit-d",
    brand: "Purina Pro Plan",
    brandSlug: "purina",
    productName: "Veterinary Diets EL Elemental Dry Dog Food",
    packageSize: "6 lb and 20 lb Polywoven Bags",
    species: "Dogs",
    petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Golden Retriever",
    docketNumber: "FDA-2023-V-1209",
    announcementDate: "February 8, 2023",
    classification: "CLASS I (URGENT)",
    hazardType: "Potentially Elevated Vitamin D (Cholecalciferol)",
    hazardSlug: "vitamin-d-toxicity",
    hazardSummary: "Supplier formulation error resulted in elevated levels of Vitamin D. Prolonged ingestion causes hypercalcemia, renal calcification, and potential acute kidney failure.",
    clinicalRisks: [
      "Polydipsia (excessive thirst) and polyuria (frequent urination)",
      "Anorexia, weight loss, and intractable vomiting",
      "Severe kidney failure and secondary soft-tissue mineralization",
      "Potential death if untreated over consecutive feeding cycles"
    ],
    lotCodes: ["22491153", "22501153", "22771153", "23051153"],
    upcBarcode: "0 38100 19190 8",
    packagingType: "Multi-Wall Kraft Paper Bag with Barrier Liner",
    stampLocationGuide: "Top gusset seal of the bag, stamped along the white fold with production plant code 1153.",
    affectedStates: [
      { code: "TX", name: "Texas", volume: "18,200 bags" },
      { code: "CA", name: "California", volume: "16,400 bags" },
      { code: "FL", name: "Florida", volume: "11,200 bags" },
      { code: "OH", name: "Ohio", volume: "8,900 bags" },
      { code: "PA", name: "Pennsylvania", volume: "7,500 bags" }
    ],
    distributionScope: "Distributed nationwide through veterinary clinics and specialized veterinary authorized retailers.",
    actionSteps: [
      { step: "1. Cease Feeding Now", instruction: "Immediately halt feeding this prescription formula and switch to a bland alternative approved by your veterinarian." },
      { step: "2. Schedule Blood Chemistry", instruction: "Request a serum calcium and phosphorus panel plus BUN/Creatinine kidney function screening from your vet." },
      { step: "3. Retain Bag for Lot Audit", instruction: "Do not discard bag until lot number code is documented on your veterinary clinic intake report." },
      { step: "4. Contact Purina Hotline", instruction: "Call 1-800-345-5678 for full reimbursement voucher and medical claim consultation." }
    ],
    manufacturerStatement: "A supplier vitamin premix error led to elevated Vitamin D. Two confirmed canine illness reports were investigated. Purina has instituted mandatory double-testing on all pre-blend batches.",
    fdaEnforcementStatus: "Case Terminated & Cleared"
  },
  {
    id: "fda-2021-sportmix-aflatoxin",
    brand: "Sportmix",
    brandSlug: "sportmix",
    productName: "High Energy Adult Dry Dog Food (26/18 Formula)",
    packageSize: "44 lb and 50 lb Paper Sacks",
    species: "Dogs",
    petImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Foxhound / Working Dog",
    docketNumber: "FDA-2021-V-0043",
    announcementDate: "January 11, 2021",
    classification: "CLASS I (URGENT)",
    hazardType: "Lethal Aflatoxin Mold Poisoning",
    hazardSlug: "aflatoxin",
    hazardSummary: "Deadly concentrations of Aflatoxins produced by Aspergillus flavus fungus detected in Midwestern grain corn supply. Over 130 canine fatalities linked across 18 states.",
    clinicalRisks: [
      "Jaundice (yellowing of eye sclera, gums, and skin)",
      "Severe liver necrosis, internal hemorrhage, and ascites",
      "Uncontrolled vomiting and bloody diarrhea",
      "Fatal hepatic failure occurring within 3 to 7 days"
    ],
    lotCodes: ["EXP-03/03/22-05B", "EXP-03/04/22-05B", "EXP-07/09/22-05B"],
    upcBarcode: "0 71513 41150 4",
    packagingType: "Heavyweight Multi-Wall Woven Paper Feed Sack",
    stampLocationGuide: "Bottom left corner of the back panel, printed under the feeding chart in yellow dot-matrix ink.",
    affectedStates: [
      { code: "TX", name: "Texas", volume: "42,000 bags" },
      { code: "OK", name: "Oklahoma", volume: "28,000 bags" },
      { code: "MO", name: "Missouri", volume: "22,000 bags" },
      { code: "AR", name: "Arkansas", volume: "18,500 bags" },
      { code: "TN", name: "Tennessee", volume: "14,200 bags" }
    ],
    distributionScope: "Distributed throughout southern and midwestern farm supply and feed co-ops.",
    actionSteps: [
      { step: "1. Extreme Danger Alert", instruction: "Do not allow dog to consume even a single kibble. Aflatoxin is cumulative and builds fatal toxic liver burden." },
      { step: "2. Emergency Vet Care", instruction: "If pet has consumed this lot within the last 14 days, immediate veterinary liver panel (ALT/ALP) and ultrasound are critical." },
      { step: "3. Preserve Bag Sample", instruction: "Preserve 2 cups of kibble inside a clean Mason jar for official state agricultural board toxicological screening." },
      { step: "4. File FDA Consumer Complaint", instruction: "Submit case docket directly to your local state FDA Consumer Complaint Coordinator." }
    ],
    manufacturerStatement: "Midwestern Pet Foods issued nationwide expansion of the recall. Production at the Monmouth, Illinois facility was temporarily suspended for FDA inspection.",
    fdaEnforcementStatus: "Active Federal Docket"
  },
  {
    id: "fda-2023-mid-america-victor-salmonella",
    brand: "Victor Super Premium",
    brandSlug: "mid-america",
    productName: "Hi-Pro Plus Active Dog & Puppy Formula",
    packageSize: "5 lb, 15 lb, 40 lb and 50 lb Bags",
    species: "Dogs",
    petImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Labrador Retriever",
    docketNumber: "FDA-2023-V-9921",
    announcementDate: "November 9, 2023",
    classification: "CLASS I (URGENT)",
    hazardType: "Salmonella infantis Environmental Outbreak",
    hazardSlug: "salmonella",
    hazardSummary: "Multistate outbreak of human Salmonella infantis illnesses traced to handling of dry dog food manufactured at Mid America Pet Food facility in Mount Pleasant, Texas.",
    clinicalRisks: [
      "Human infant & toddler infections linked to touching pet food bowls",
      "Canine clinical gastroenteritis, dehydration, and high fever",
      "Carrier status in dogs passing pathogen to household surfaces",
      "Systemic bacteremia requiring IV antibiotic intervention"
    ],
    lotCodes: ["ALL LOTS WITH BEST BY BEFORE 10/31/2024"],
    upcBarcode: "8 54524 00540 2",
    packagingType: "Poly-Woven Block Bottom Bags with UV Barrier",
    stampLocationGuide: "Top fold and side gussets of bags, stamped with manufacturing date prefixes starting with TX-09.",
    affectedStates: [
      { code: "TX", name: "Texas", volume: "68,000 bags" },
      { code: "FL", name: "Florida", volume: "34,000 bags" },
      { code: "GA", name: "Georgia", volume: "29,000 bags" },
      { code: "AL", name: "Alabama", volume: "22,000 bags" },
      { code: "TN", name: "Tennessee", volume: "19,000 bags" }
    ],
    distributionScope: "Nationwide distribution through retail pet stores, feed stores, and online e-commerce.",
    actionSteps: [
      { step: "1. Universal Lot Hold", instruction: "All lots with Best By dates prior to Oct 31, 2024 are subject to federal market withdrawal. Halt feeding immediately." },
      { step: "2. Thorough Disinfection", instruction: "Bleach all food storage tubs, measuring cups, and wash human hands thoroughly after touching pet supplies." },
      { step: "3. Monitor Household Health", instruction: "Consult a human physician if young children or elderly family members experience abdominal cramping or fever." },
      { step: "4. Return for Full Credit", instruction: "Return empty bag or purchase proof to place of purchase for full credit refund." }
    ],
    manufacturerStatement: "Mid America Pet Food voluntarily halted all plant production lines, conducted deep chemical sanitation, and upgraded environmental air scrubbers.",
    fdaEnforcementStatus: "Mandatory Retail Pull"
  },
  {
    id: "fda-2024-freshpet-select-listeria",
    brand: "Freshpet Select",
    brandSlug: "freshpet",
    productName: "Fresh From The Kitchen Home Cooked Chicken Recipe",
    packageSize: "4.5 lb Chilled Bag",
    species: "Dogs",
    petImage: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Beagle",
    docketNumber: "FDA-2024-V-3310",
    announcementDate: "June 14, 2024",
    classification: "CLASS I (URGENT)",
    hazardType: "Listeria monocytogenes Bacterial Contamination",
    hazardSlug: "listeria",
    hazardSummary: "Cold-tolerant foodborne pathogen Listeria monocytogenes confirmed in refrigerated retail batch. Severe risk to pregnant women, infants, and immunocompromised pets.",
    clinicalRisks: [
      "Fever, muscular stiffness, lethargy, and neck rigidity",
      "Gastrointestinal distress followed by central nervous system symptoms",
      "Miscarriage and fetal complications in pregnant animals and humans",
      "Septicemia with higher mortality rate than Salmonella"
    ],
    lotCodes: ["SELL BY 10/29/24-L2", "SELL BY 10/30/24-L2"],
    upcBarcode: "8 55429 00445 6",
    packagingType: "Flexible Chilled Stand-Up Pouch with View Window",
    stampLocationGuide: "Printed directly beneath the top zip-lock seal on the front of the refrigerated bag.",
    affectedStates: [
      { code: "CA", name: "California", volume: "8,200 bags" },
      { code: "TX", name: "Texas", volume: "6,400 bags" },
      { code: "FL", name: "Florida", volume: "4,900 bags" },
      { code: "NY", name: "New York", volume: "4,100 bags" }
    ],
    distributionScope: "Distributed exclusively in refrigerated pet food display coolers at Target, Walmart, and grocery chains.",
    actionSteps: [
      { step: "1. Discard or Return", instruction: "Double-bag the refrigerated pouch and return to retailer or safely dispose in covered outdoor trash bin." },
      { step: "2. Sanitize Refrigerator Shelf", instruction: "Listeria can survive and multiply in cold refrigerator temperatures. Clean interior shelves with warm bleach solution." },
      { step: "3. Clinical Assessment", instruction: "Monitor for neurological signs, loss of balance, or persistent fever." },
      { step: "4. Call Freshpet Support", instruction: "Call Freshpet dedicated consumer care at 1-866-789-3737 for immediate replacement coupons." }
    ],
    manufacturerStatement: "Freshpet intercepted the majority of the batch before retail delivery. Quality assurance and environmental monitoring have been reinforced at our Bethlehem facility.",
    fdaEnforcementStatus: "Case Terminated & Cleared"
  },
  {
    id: "fda-2022-family-pet-metal-fragments",
    brand: "Family Pet Heartland",
    brandSlug: "family-pet",
    productName: "Meaty Cuts In Gravy Beef & Chicken Canned Dog Food",
    packageSize: "13.2 oz Aluminum Cans (12-Pack Case)",
    species: "Dogs",
    petImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    petBreedName: "French Bulldog",
    docketNumber: "FDA-2022-V-6512",
    announcementDate: "August 24, 2022",
    classification: "CLASS II (MODERATE)",
    hazardType: "Extraneous Foreign Material (Metal Debris)",
    hazardSlug: "foreign-materials",
    hazardSummary: "Equipment malfunction during commercial canning operation introduced fine metal conveyor belt shavings into a single production lot of wet dog food.",
    clinicalRisks: [
      "Esophageal laceration, oral cavity cuts, and damaged dental enamel",
      "Gastrointestinal micro-perforation and internal bleeding",
      "Intestinal obstruction requiring surgical or endoscopic removal",
      "Vomiting with blood or dark tarry stools (melena)"
    ],
    lotCodes: ["LOT #2236-MFG-B", "LOT #2237-MFG-B"],
    upcBarcode: "0 41220 89211 4",
    packagingType: "13.2 oz Two-Piece Steel Can with Pull-Tab Lid",
    stampLocationGuide: "Laser-etched on the bottom metal dome of each individual can, second line of text.",
    affectedStates: [
      { code: "OH", name: "Ohio", volume: "14,500 cans" },
      { code: "PA", name: "Pennsylvania", volume: "11,800 cans" },
      { code: "MI", name: "Michigan", volume: "9,200 cans" },
      { code: "IN", name: "Indiana", volume: "7,800 cans" }
    ],
    distributionScope: "Sold primarily through regional supermarket chains and discount retail stores in the Great Lakes region.",
    actionSteps: [
      { step: "1. Inspect Unopened Cans", instruction: "Turn cans upside down and examine the bottom laser stamp. If lot matches 2236 or 2237, do not puncture or open." },
      { step: "2. Veterinary Monitoring", instruction: "If dog consumed can, monitor for retching, dark stools, or refusal to eat. X-ray radiograph can detect metal shavings." },
      { step: "3. Retain Intact Cans", instruction: "Preserve intact cans as forensic evidence for store credit or product liability claim." },
      { step: "4. Store Level Refund", instruction: "All regional grocery stores are authorized to provide instant cash refund at customer service desk." }
    ],
    manufacturerStatement: "The canning line was immediately taken offline and mechanical inline X-ray metal detection equipment was replaced with high-sensitivity magnetic traps.",
    fdaEnforcementStatus: "Case Terminated & Cleared"
  },
  {
    id: "fda-2024-blue-harvest-mold",
    brand: "Blue Buffalo",
    brandSlug: "blue-buffalo",
    productName: "Life Protection Adult Chicken & Brown Rice Recipe",
    packageSize: "15 lb and 30 lb Bags",
    species: "Dogs",
    petImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Australian Shepherd",
    docketNumber: "FDA-2024-V-2104",
    announcementDate: "March 12, 2024",
    classification: "CLASS II (MODERATE)",
    hazardType: "Packaging Seal Defect & Moisture Spoilage",
    hazardSlug: "foreign-materials",
    hazardSummary: "Heat-sealing equipment temperature fluctuation caused micro-perforations along side gussets, allowing ambient humidity ingress and premature mold spoilage during summer transit.",
    clinicalRisks: [
      "Digestive upset, foul-smelling loose stool, and loss of appetite",
      "Mycotoxin exposure from surface mold colony growth",
      "Allergic respiratory sneezing from inhaled fungal spores"
    ],
    lotCodes: ["BB-2403-LP15", "BB-2403-LP30"],
    upcBarcode: "8 59610 00115 3",
    packagingType: "Multi-Ply Poly Barrier Bag with Micro-Perforations",
    stampLocationGuide: "Printed along the back bottom seam, underneath the nutritional analysis panel.",
    affectedStates: [
      { code: "NC", name: "North Carolina", volume: "16,400 bags" },
      { code: "SC", name: "South Carolina", volume: "12,200 bags" },
      { code: "GA", name: "Georgia", volume: "10,500 bags" },
      { code: "FL", name: "Florida", volume: "9,800 bags" }
    ],
    distributionScope: "Southeastern distribution hub serving Petco, PetSmart, and neighborhood pet retailers.",
    actionSteps: [
      { step: "1. Inspect Smell and Appearance", instruction: "Do not feed if kibble feels damp, smells stale/musty, or exhibits white/green powdery surface residue." },
      { step: "2. Contact Local Store", instruction: "Exchange bag at your local pet retailer for a replacement batch with Best By date after 2025." },
      { step: "3. Transition Diet Gradually", instruction: "When starting new bag, mix gradually with bland boiled chicken/rice to prevent digestive shock." }
    ],
    manufacturerStatement: "Blue Buffalo isolated the thermal sealing variance to a single shift at our Richmond manufacturing plant. All packaging seals now undergo ultrasonic integrity inspection.",
    fdaEnforcementStatus: "Case Terminated & Cleared"
  },
  {
    id: "fda-2023-raw-bistro-salmonella",
    brand: "Raw Bistro",
    brandSlug: "raw-bistro",
    productName: "Bison Entree Raw Frozen Dog Food Patties",
    packageSize: "3 lb and 6 lb Frozen Bags",
    species: "Dogs",
    petImage: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Siberian Husky",
    docketNumber: "FDA-2023-V-4419",
    announcementDate: "September 5, 2023",
    classification: "CLASS I (URGENT)",
    hazardType: "Salmonella Pathogen in Raw Frozen Meat",
    hazardSlug: "salmonella",
    hazardSummary: "Raw pasture-raised bison meat batch tested positive during routine surveillance sampling by the Minnesota Department of Agriculture.",
    clinicalRisks: [
      "High human contamination risk during freezer handling and bowl thawing",
      "Canine fever, bloody diarrhea, and systemic bacteremia",
      "Bacterial persistence on stainless steel surfaces and feeding mats"
    ],
    lotCodes: ["LOT #RB-BIS-0922"],
    upcBarcode: "8 52219 00306 7",
    packagingType: "Frozen Resealable Zip Barrier Bag",
    stampLocationGuide: "Top white bar of the frozen bag, printed in black thermal ink.",
    affectedStates: [
      { code: "MN", name: "Minnesota", volume: "3,200 bags" },
      { code: "WI", name: "Wisconsin", volume: "2,400 bags" },
      { code: "IL", name: "Illinois", volume: "1,900 bags" },
      { code: "IA", name: "Iowa", volume: "1,200 bags" }
    ],
    distributionScope: "Distributed across upper Midwest independent natural pet grocers and holistic veterinary practices.",
    actionSteps: [
      { step: "1. Keep Frozen", instruction: "Do not thaw or handle with bare hands. Place entire bag inside heavy-duty garbage bag." },
      { step: "2. Sterilize Kitchen Surfaces", instruction: "Wash kitchen counters, sink basins, and cutting boards with boiling water and disinfectant bleach." },
      { step: "3. Consult Holistic Vet", instruction: "Discuss gastrointestinal support probiotics if dog consumed thawed bison patties." }
    ],
    manufacturerStatement: "Raw Bistro operates a clean HACCP facility. We are implementing high-pressure pasteurization (HPP) evaluations for all game meat recipes.",
    fdaEnforcementStatus: "Voluntary Market Withdrawal"
  }
];
