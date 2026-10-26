export interface HazardGuide {
  slug: string;
  name: string;
  scientificClassification: string;
  severityLevel: "CRITICAL (CLASS I)" | "HIGH (CLASS I/II)" | "MODERATE (CLASS II)";
  primarySources: string[];
  petImage: string;
  petBreedName: string;
  incubationPeriod: string;
  mortalityRateEstimate: string;
  overviewProtocol: string;
  clinicalTimeline: {
    phase: string;
    timeframe: string;
    clinicalSigns: string[];
    pathologicalMechanism: string;
  }[];
  criticalSymptoms: {
    symptom: string;
    urgency: "Emergency ER" | "Urgent 24h" | "Monitor";
    description: string;
  }[];
  veterinaryEmergencyPlan: string[];
  safeBlandDietAdvice: string;
  aspcaEmergencyPhone: string;
}

export const hazardsData: Record<string, HazardGuide> = {
  "salmonella": {
    slug: "salmonella",
    name: "Salmonella enterica",
    scientificClassification: "Gram-Negative Zoonotic Enterobacteria",
    severityLevel: "CRITICAL (CLASS I)",
    primarySources: ["Raw chicken & poultry by-products", "Dehydrated beef & salmon treats", "Contaminated extrusion spray fat", "Cross-contaminated storage bins"],
    petImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Australian Shepherd",
    incubationPeriod: "12 to 72 hours post-ingestion",
    mortalityRateEstimate: "2% - 5% (Higher in puppies, seniors, and immunocompromised)",
    overviewProtocol: "Salmonella is an aggressive foodborne bacterium that invades intestinal mucosal epithelial cells. Dogs and cats can act as asymptomatic carriers while actively shedding live bacteria in their stool and saliva, creating acute infection risks for human family members.",
    clinicalTimeline: [
      {
        phase: "Phase 1: Bacterial Colonization",
        timeframe: "Hours 0 — 12 post-ingestion",
        clinicalSigns: ["Mild stomach rumbling (borborygmi)", "Slight lethargy and reluctance to eat", "Elevated body temperature (>102.8°F)"],
        pathologicalMechanism: "Bacteria survive gastric acid and multiply within distal ileum and cecum, triggering acute localized mucosal inflammation."
      },
      {
        phase: "Phase 2: Acute Enteritis",
        timeframe: "Hours 12 — 36 post-ingestion",
        clinicalSigns: ["Profuse watery diarrhea (often with mucus and fresh blood)", "Intractable vomiting and abdominal guarding", "Dehydration and pale oral mucous membranes"],
        pathologicalMechanism: "Salmonella endotoxins cause massive epithelial sloughing and microvascular leakage into the intestinal lumen."
      },
      {
        phase: "Phase 3: Systemic Bacteremia",
        timeframe: "Hours 36 — 72 (if untreated)",
        clinicalSigns: ["Hypothermia, septic shock, collapse", "Severe electrolyte imbalance and hypoglycemia", "Disseminated intravascular coagulation (DIC)"],
        pathologicalMechanism: "Pathogen breaches the mucosal barrier and enters the mesenteric lymphatic circulation and bloodstream."
      }
    ],
    criticalSymptoms: [
      { symptom: "Bloody or Mucus-Laden Diarrhea", urgency: "Emergency ER", description: "Indicates mucosal sloughing and active intestinal bleeding." },
      { symptom: "High Fever (>103.5°F) with Shivering", urgency: "Emergency ER", description: "Sign of active immune reaction or entering systemic bacteremia." },
      { symptom: "Persistent Vomiting (>3 times in 4 hours)", urgency: "Emergency ER", description: "Leads to fatal hypovolemic dehydration in small breeds." },
      { symptom: "Lethargy & Refusal to Stand", urgency: "Urgent 24h", description: "Depleted glucose and severe electrolyte exhaustion." }
    ],
    veterinaryEmergencyPlan: [
      "1. Immediate IV fluid resuscitation with balanced electrolytes (LRS) to restore blood pressure.",
      "2. Fecal PCR diarrhea panel to confirm Salmonella serovar and screen out Parvovirus.",
      "3. Injectable antiemetic therapy (Maropitant / Cerenia) to halt fluid loss.",
      "4. Targeted antimicrobials (Enrofloxacin or Ampicillin) only if systemic bacteremia is present."
    ],
    safeBlandDietAdvice: "Withhold all commercial kibble and treats for 12 hours. Offer small, frequent portions of 2:1 ratio boiled skinless chicken breast and white rice, paired with veterinary oral electrolytes.",
    aspcaEmergencyPhone: "(888) 426-4435"
  },
  "aflatoxin": {
    slug: "aflatoxin",
    name: "Aflatoxin Mold Poisoning",
    scientificClassification: "Aspergillus flavus & parasiticus Mycotoxins",
    severityLevel: "CRITICAL (CLASS I)",
    primarySources: ["Grain corn & wheat harvested in drought", "Peanut meal & cottonseed by-products", "Poorly ventilated feed silos"],
    petImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Foxhound / Hunting Dog",
    incubationPeriod: "3 to 14 days of cumulative ingestion",
    mortalityRateEstimate: "60% - 85% in acute toxic exposure",
    overviewProtocol: "Aflatoxins are among the most potent naturally occurring hepatotoxins known to medical science. Dogs lack specific hepatic enzymes to efficiently detoxify aflatoxin B1. It causes catastrophic acute hepatic necrosis, coagulopathy, and liver failure.",
    clinicalTimeline: [
      {
        phase: "Phase 1: Subclinical Liver Toxicity",
        timeframe: "Days 1 — 3",
        clinicalSigns: ["Mild loss of appetite", "Occasional bile vomiting", "Depression and slower walking pace"],
        pathologicalMechanism: "Aflatoxin metabolites bind covalently to hepatic DNA and protein, disrupting RNA transcription and killing hepatocytes."
      },
      {
        phase: "Phase 2: Acute Hepatic Failure",
        timeframe: "Days 4 — 7",
        clinicalSigns: ["Jaundice (yellow sclera of eyes and inner ear flaps)", "Severe abdominal ascites (fluid accumulation)", "Dark orange/brown urine and melena (black tarry stool)"],
        pathologicalMechanism: "Massive centrilobular liver necrosis eliminates albumin production and destroys clotting factors."
      },
      {
        phase: "Phase 3: Fatal Coagulopathy",
        timeframe: "Days 7+",
        clinicalSigns: ["Spontaneous bleeding from gums and nose (epistaxis)", "Coma and hepatic encephalopathy", "Cardiovascular collapse"],
        pathologicalMechanism: "Complete cessation of blood clotting leading to diffuse internal hemorrhage."
      }
    ],
    criticalSymptoms: [
      { symptom: "Jaundice (Yellow Gums, Eyes & Ears)", urgency: "Emergency ER", description: "Pathognomonic indicator of profound liver cell death." },
      { symptom: "Black, Tarry Stools (Melena)", urgency: "Emergency ER", description: "Internal gastrointestinal bleeding from liver failure." },
      { symptom: "Swollen Fluid-Filled Abdomen (Ascites)", urgency: "Emergency ER", description: "Portal hypertension and complete loss of blood protein albumin." },
      { symptom: "Persistent Anorexia (>24 hours)", urgency: "Urgent 24h", description: "Pet refuses even high-value treats; early toxic hepatopathy." }
    ],
    veterinaryEmergencyPlan: [
      "1. Immediate emergency liver panel (ALT, ALP, Total Bilirubin, Blood Ammonia, Bile Acids).",
      "2. Fresh frozen plasma (FFP) transfusions to replace depleted clotting factors and prevent fatal hemorrhage.",
      "3. Intensive hepatoprotective therapy: IV SAMe (Denamarin), Silymarin (Milk Thistle), and N-Acetylcysteine (NAC).",
      "4. Vitamin K1 subcutaneous injections to support secondary clotting pathways."
    ],
    safeBlandDietAdvice: "Strict low-copper, moderate-protein hepatic diet (e.g. Hill's l/d or Royal Canin Hepatic). Completely avoid all corn, grain, or unknown treats until liver enzymes normalize.",
    aspcaEmergencyPhone: "(888) 426-4435"
  },
  "listeria": {
    slug: "listeria",
    name: "Listeria monocytogenes",
    scientificClassification: "Psychrotolerant Facultative Anaerobic Bacterium",
    severityLevel: "CRITICAL (CLASS I)",
    primarySources: ["Refrigerated commercial pet foods", "Raw freeze-dried meats", "Unpasteurized dairy and unwashed produce"],
    petImage: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Beagle",
    incubationPeriod: "1 to 4 weeks (delayed onset)",
    mortalityRateEstimate: "20% - 30% in vulnerable pets",
    overviewProtocol: "Listeria is uniquely dangerous because it thrives and multiplies at standard refrigerator temperatures (34°F - 38°F). It crosses both the blood-brain barrier and the placenta, leading to neurological encephalitis and fetal complications in pregnant animals.",
    clinicalTimeline: [
      {
        phase: "Phase 1: Enteric Colonization",
        timeframe: "Week 1",
        clinicalSigns: ["Mild transient fever", "Soft stool or intermittent nausea", "Muscle aches and reluctance to jump"],
        pathologicalMechanism: "Internalins on the bacterial surface facilitate entry into gastrointestinal epithelial cells."
      },
      {
        phase: "Phase 2: Neurological Encephalitis",
        timeframe: "Weeks 2 — 3",
        clinicalSigns: ["Head tilt, circling, and uncoordinated gait (ataxia)", "Facial nerve paralysis (drooping lip/eyelid)", "Disorientation and seizures"],
        pathologicalMechanism: "Bacteria travel along cranial nerves directly into the brainstem and central nervous system."
      }
    ],
    criticalSymptoms: [
      { symptom: "Head Tilt & Circling to One Side", urgency: "Emergency ER", description: "Hallmark sign of Listerial rhombencephalitis (brainstem infection)." },
      { symptom: "Facial Nerve Paralysis", urgency: "Emergency ER", description: "Inability to blink or chew; asymmetrical droop." },
      { symptom: "Spontaneous Miscarriage in Pregnant Dogs", urgency: "Emergency ER", description: "Infection causes acute chorioamnionitis and fetal demise." }
    ],
    veterinaryEmergencyPlan: [
      "1. Neurological examination and cerebrospinal fluid (CSF) tap analysis.",
      "2. High-dose IV Ampicillin or Trimethoprim-Sulfa, which cross the blood-brain barrier effectively.",
      "3. Anti-inflammatory corticosteroid or osmotic diuretic (Mannitol) if intracranial pressure is elevated.",
      "4. Mandatory isolation protocol to protect veterinary staff from zoonotic transfer."
    ],
    safeBlandDietAdvice: "Feed warm, fully cooked plain meats (cooked to 165°F internal temperature). Never feed raw or undercooked meats during recovery.",
    aspcaEmergencyPhone: "(888) 426-4435"
  },
  "vitamin-d-toxicity": {
    slug: "vitamin-d-toxicity",
    name: "Hypervitaminosis D (Cholecalciferol)",
    scientificClassification: "Excessive Fat-Soluble Vitamin D3 Dosing",
    severityLevel: "CRITICAL (CLASS I)",
    primarySources: ["Manufacturer vitamin premix weighing errors", "Rodenticides containing Cholecalciferol", "Human vitamin D supplements dropped on floor"],
    petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    petBreedName: "Golden Retriever",
    incubationPeriod: "12 to 36 hours for acute signs; 1-2 weeks for chronic organ damage",
    mortalityRateEstimate: "35% - 50% without rapid renal diuresis",
    overviewProtocol: "Unlike water-soluble vitamins that are flushed in urine, Vitamin D is fat-soluble and stored in liver and adipose tissues. Toxic levels trigger massive calcium resorption from bones into the bloodstream, turning kidneys, heart tissue, and stomach lining into calcified bone-like tissue.",
    clinicalTimeline: [
      {
        phase: "Phase 1: Hypercalcemia Onset",
        timeframe: "Hours 12 — 36",
        clinicalSigns: ["Excessive thirst (drinking bowl after bowl of water)", "Constant urgent urination", "Vomiting and refusal to touch food"],
        pathologicalMechanism: "Extremely elevated calcium levels block antidiuretic hormone (ADH) receptors in kidney tubules."
      },
      {
        phase: "Phase 2: Metastatic Calcification",
        timeframe: "Days 3 — 7",
        clinicalSigns: ["Acute kidney failure (azotemia)", "Slowed heart rate (bradycardia) and cardiac arrhythmia", "Bloody vomit (calcified stomach ulcers)"],
        pathologicalMechanism: "Calcium and phosphorus product exceeds 60-70 mg/dL, causing calcium phosphate crystals to precipitate into kidney nephrons."
      }
    ],
    criticalSymptoms: [
      { symptom: "Extreme Unquenchable Thirst (Polydipsia)", urgency: "Emergency ER", description: "Earliest and most reliable clinical indicator of toxic blood calcium." },
      { symptom: "Abrupt Anorexia with Dark Vomiting", urgency: "Emergency ER", description: "Gastric mucosa ulceration from calcium crystal precipitation." },
      { symptom: "Prostration & Tremors", urgency: "Emergency ER", description: "Cardiac conductivity disruption and acute uremic poisoning." }
    ],
    veterinaryEmergencyPlan: [
      "1. Massive 0.9% Normal Saline IV diuresis to promote urinary calcium excretion.",
      "2. Furosemide loop diuretic to flush calcium through kidney tubules.",
      "3. Prednisone corticosteroid to decrease intestinal calcium absorption.",
      "4. Bisphosphonate therapy (Pamidronate / Zoledronate) to halt bone resorption."
    ],
    safeBlandDietAdvice: "Strict zero-vitamin-D, low-calcium veterinary diet (e.g. Hill's u/d). Never give dairy, cheese, fish oil, or multivitamin supplements.",
    aspcaEmergencyPhone: "(888) 426-4435"
  },
  "foreign-materials": {
    slug: "foreign-materials",
    name: "Foreign Material Contamination",
    scientificClassification: "Extraneous Physical Hazards (Metal, Plastic, Glass)",
    severityLevel: "MODERATE (CLASS II)",
    primarySources: ["Damaged conveyor belt shavings", "Broken processing line cutting blades", "Plastic bag micro-pellets", "Bone shards exceeding AAFCO limits"],
    petImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    petBreedName: "French Bulldog",
    incubationPeriod: "Immediate to 48 hours",
    mortalityRateEstimate: "5% - 15% (Primary risk: surgical perforation)",
    overviewProtocol: "Mechanical failures in commercial rendering and packaging plants can introduce fine metal shavings, hard plastic fragments, or glass shards into pet food. Ingestion can cause dental fractures, esophageal impaction, and life-threatening gastrointestinal perforation.",
    clinicalTimeline: [
      {
        phase: "Phase 1: Ingestion & Oral Injury",
        timeframe: "Hours 0 — 4",
        clinicalSigns: ["Drooling, pawing at mouth", "Refusal to swallow or gagging", "Blood on chew toys or in saliva"],
        pathologicalMechanism: "Sharp foreign fragments cause mechanical laceration to oral mucosa, tongue, or pharynx."
      },
      {
        phase: "Phase 2: Gastrointestinal Passage or Impaction",
        timeframe: "Hours 12 — 48",
        clinicalSigns: ["Retching and unproductive vomiting", "Severe abdominal pain (prayer position)", "Septic peritonitis if stomach or intestine wall is perforated"],
        pathologicalMechanism: "Foreign body becomes lodged at pylorus or ileocecal junction, blocking digesta and risking bowel necrosis."
      }
    ],
    criticalSymptoms: [
      { symptom: "Pawing at Mouth & Blood in Saliva", urgency: "Emergency ER", description: "Sharp fragment lodged in soft palate or tonsils." },
      { symptom: "Abdominal Guarding (Dog Snarls when Belly Touched)", urgency: "Emergency ER", description: "Sign of acute peritonitis from mechanical bowel perforation." },
      { symptom: "Unproductive Retching", urgency: "Emergency ER", description: "Complete esophageal or pyloric obstruction." }
    ],
    veterinaryEmergencyPlan: [
      "1. Immediate two-view orthogonal abdominal radiographs (X-rays) to locate radio-opaque metal fragments.",
      "2. Upper gastrointestinal endoscopy to retrieve fragments safely before they pass into the duodenum.",
      "3. Emergency exploratory laparotomy surgery if intestinal perforation or free peritoneal air is confirmed.",
      "4. Gastroprotectant medications (Sucralfate slurry and Omeprazole)."
    ],
    safeBlandDietAdvice: "High-fiber 'cotton-ball' bulk diet (canned pure pumpkin and soft whole-wheat bread) under veterinary direction to cushion sharp fragments through the digestive tract.",
    aspcaEmergencyPhone: "(888) 426-4435"
  }
};
