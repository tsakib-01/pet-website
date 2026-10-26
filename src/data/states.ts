export interface StateRegistry {
  code: string;
  name: string;
  regulatoryAgency: string;
  totalRecalls10Yr: number;
  activeWatchlistDockets: number;
  primaryRiskFactor: string;
  petImage: string;
  petBreedName: string;
  overviewSummary: string;
  inspectionHighlights: string[];
  recentStateDockets: {
    docket: string;
    brand: string;
    hazard: string;
    date: string;
    status: string;
  }[];
}

export const statesData: Record<string, StateRegistry> = {
  "california": {
    code: "CA",
    name: "California",
    regulatoryAgency: "California Department of Public Health (CDPH) & CDFA Commercial Feed Regulatory Program",
    totalRecalls10Yr: 48,
    activeWatchlistDockets: 6,
    primaryRiskFactor: "Port of Entry Foreign Protein Inspections & High Raw Food Adoption",
    petImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Golden Retriever (California Beach)",
    overviewSummary: "California maintains the nation's most stringent commercial feed surveillance testing program. Through the CDFA and CDPH, state inspectors conduct unannounced microbiological and chemical residue testing across retail pet superstores and independent boutiques.",
    inspectionHighlights: [
      "Rigorous random PCR sampling of refrigerated and raw freeze-dried pet foods across all 58 counties",
      "Strict enforcement of Proposition 65 chemical and heavy metal warning thresholds",
      "Dedicated FDA Pacific Region import inspection facility targeting international animal feed shipments"
    ],
    recentStateDockets: [
      { docket: "FDA-2026-V-8841", brand: "Wild Harvest Naturals", hazard: "Salmonella enterica in cat treats (12,400 bags shipped to CA)", date: "October 2026", status: "Active Docket" },
      { docket: "FDA-2024-V-3310", brand: "Freshpet Select", hazard: "Listeria monocytogenes in refrigerated poultry dog food", date: "June 2024", status: "Cleared" },
      { docket: "FDA-2023-V-1209", brand: "Purina Pro Plan Veterinary Diets", hazard: "Elevated Vitamin D in prescription kibble", date: "February 2023", status: "Cleared" }
    ]
  },
  "texas": {
    code: "TX",
    name: "Texas",
    regulatoryAgency: "Office of the Texas State Chemists (OTSC) & Texas Feed and Fertilizer Control Service",
    totalRecalls10Yr: 62,
    activeWatchlistDockets: 9,
    primaryRiskFactor: "High Concentration of Major Extrusion Manufacturing Plants & Grain Corn Silos",
    petImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Blue Lacy (Official Texas State Dog)",
    overviewSummary: "Texas is the geographic heart of the American pet food manufacturing industry, housing major extrusion plants for Mid America Pet Food (Victor), Purina, and Diamond. The OTSC operates world-renowned grain mycotoxin laboratories monitoring drought-stressed corn crops.",
    inspectionHighlights: [
      "Pioneered the 'One Health' federal-state feed surveillance program with the FDA Center for Veterinary Medicine",
      "Extensive HPLC testing on high-energy corn feeds to intercept Aflatoxin before commercial blending",
      "Mandatory environmental swab auditing across Texas commercial pet food extrusion plants"
    ],
    recentStateDockets: [
      { docket: "FDA-2023-V-9921", brand: "Victor Super Premium Dog Food", hazard: "Multistate Salmonella infantis outbreak originating at Mount Pleasant, TX plant", date: "November 2023", status: "Active Monitoring" },
      { docket: "FDA-2021-V-0043", brand: "Sportmix High Energy", hazard: "Catastrophic Aflatoxin mold contamination in grain corn supply", date: "January 2021", status: "Warning Letter" },
      { docket: "FDA-2026-V-8841", brand: "Wild Harvest Naturals", hazard: "Salmonella in cat treats (9,800 units distributed to Texas)", date: "October 2026", status: "Active Docket" }
    ]
  },
  "florida": {
    code: "FL",
    name: "Florida",
    regulatoryAgency: "Florida Department of Agriculture and Consumer Services (FDACS) - Division of Agricultural Environmental Services",
    totalRecalls10Yr: 39,
    activeWatchlistDockets: 5,
    primaryRiskFactor: "Subtropical Humidity Accelerating Post-Packaging Mold Growth & Retail Heat Decay",
    petImage: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Beagle",
    overviewSummary: "Florida's subtropical climate creates extreme challenges for pet food stability. High relative humidity and elevated summer transit temperatures accelerate lipid oxidation, mold spore germination in micro-perforated bags, and bacterial proliferation in non-climate-controlled storage.",
    inspectionHighlights: [
      "FDACS inspectors perform annual summer moisture and rancidity audits across wholesale distribution warehouses",
      "Enforces Florida Commercial Feed Law Rule 5E-3, mandating strict guarantees for fat rancidity and moisture limits",
      "Rapid-response laboratory in Tallahassee capable of real-time mycotoxin and pathogen identification"
    ],
    recentStateDockets: [
      { docket: "FDA-2024-V-2104", brand: "Blue Buffalo Life Protection", hazard: "Packaging seal temperature variance causing mold spoilage in humid transit", date: "March 2024", status: "Cleared" },
      { docket: "FDA-2026-V-8841", brand: "Wild Harvest Naturals", hazard: "Salmonella enterica in freeze-dried treats (7,500 bags in Florida)", date: "October 2026", status: "Active Docket" },
      { docket: "FDA-2023-V-9921", brand: "Victor Super Premium", hazard: "Multistate Salmonella outbreak in sporting dog formulas", date: "November 2023", status: "Monitoring" }
    ]
  }
};
