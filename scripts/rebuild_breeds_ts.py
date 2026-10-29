import json
import re
import sys
sys.path.append('scripts')
from make_all_breeds import breed_to_ts
from build_all_breeds_complete import BREEDS

with open("src/data/breeds.ts", "r", encoding="utf-8") as f:
    orig = f.read()

intf_end = orig.find("export const BREED_DATABASE: BreedData[] = [")
interfaces = orig[:intf_end]

fb_start = orig.find("  // 1. DOG PREVIEW TEMPLATE: FRENCH BULLDOG", intf_end)
ragdoll_end = orig.find("];\n\nexport function getBreedBySlug", fb_start)
existing_two_breeds = orig[fb_start:ragdoll_end]

new_breeds_ts = []
for b in BREEDS:
    new_breeds_ts.append(breed_to_ts(b))

all_core_breeds_str = existing_two_breeds.rstrip().rstrip(",") + ",\n\n" + ",\n\n".join(new_breeds_ts)

img_start = orig.find("export const ALL_BREED_IMAGES: BreedImageAsset[] = [")
img_end = orig.find("];", img_start) + 2
raw_images_text = orig[img_start:img_end]

pattern = re.compile(r'\{\s*filename:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*species:\s*"([^"]+)",\s*path:\s*"([^"]+)"\s*\}')
matches = pattern.findall(raw_images_text)

def get_canonical_slug(filename, species):
    base = filename.replace(".webp", "")
    if "french-bulldog" in base: return "french-bulldog"
    if "labrador" in base: return "labrador-retriever"
    if "golden-retriever" in base: return "golden-retriever"
    if "german-shepherd" in base: return "german-shepherd"
    if "dachshund" in base: return "dachshund"
    if "poodle" in base: return "standard-poodle"
    if "beagle" in base: return "beagle"
    if "rottweiler" in base: return "rottweiler"
    if "pointer" in base or "gsp" in base: return "german-shorthaired-pointer"
    if "american-bulldog" in base: return "american-bulldog"
    if "olde-english-bulldog" in base: return "olde-english-bulldog"
    if "yorkshire-terrier" in base: return "yorkshire-terrier"
    if "miniature-american-shepherd" in base or "mini-australian-shepherd" in base: return "miniature-american-shepherd"
    if "australian-shepherd" in base: return "australian-shepherd"
    if "mini-pinscher" in base: return "mini-pinscher"
    if "doberman" in base: return "doberman-pinscher"
    if "corgi" in base: return "pembroke-welsh-corgi"
    if "boxer" in base: return "boxer-dog"
    if "pomeranian" in base: return "pomeranian"
    if "bernese" in base or "bernedoodle" in base: return "bernese-mountain-dog"
    if "shih-tzu" in base or "shih-poo" in base or "malshi" in base: return "shih-tzu"
    if "great-dane" in base: return "great-dane"
    if "boston-terrier" in base: return "boston-terrier"
    if "chihuahua" in base: return "deer-head-chihuahua"
    if "havanese" in base: return "havanese"
    if "border-collie" in base or "bordoodle" in base or "border-aussie" in base: return "border-collie"
    if "springer-spaniel" in base: return "english-springer-spaniel"
    if "husky" in base or "pomsky" in base: return "siberian-husky"
    if "brittany" in base: return "brittany-dog"
    if "malinois" in base: return "belgian-malinois"
    if "cockapoo" in base: return "cockapoo"
    if "cocker-spaniel" in base: return "cocker-spaniel"
    if "basset-hound" in base: return "basset-hound"
    if "vizsla" in base: return "vizsla"
    if "collie" in base: return "rough-collie"
    if "ridgeback" in base: return "rhodesian-ridgeback"
    if "papillon" in base: return "papillon"
    if "shiba-inu" in base: return "shiba-inu"
    if "west-highland" in base: return "west-highland-white-terrier"
    if "heeler" in base: return "australian-cattle-dog"
    if "ragdoll" in base: return "ragdoll"
    if "sphynx" in base: return "sphynx"
    if "russian-blue" in base: return "russian-blue"
    if "american-shorthair" in base: return "american-shorthair"
    if "himalayan" in base: return "himalayan"
    if "turkish-angora" in base: return "turkish-angora"
    if "devon-rex" in base: return "devon-rex"
    if "egyptian-mau" in base: return "egyptian-mau"
    if "chartreux" in base: return "chartreux"
    return base

enriched_images = []
for filename, name, species, path in matches:
    slug = filename.replace(".webp", "")
    breed_slug = get_canonical_slug(filename, species)
    enriched_images.append(
        f'  {{ filename: "{filename}", name: "{name}", species: "{species}", path: "{path}", slug: "{slug}", breedSlug: "{breed_slug}" }}'
    )

images_ts_block = "export const ALL_BREED_IMAGES: BreedImageAsset[] = [\n" + ",\n".join(enriched_images) + "\n];"

resolver_ts = """
// Function to generate a complete clinical profile for any registered breed asset
export function generateProfileForAsset(asset: BreedImageAsset): BreedData {
  const isDog = asset.species === "dog";
  const name = asset.name;
  const slug = asset.slug;

  return {
    slug: slug,
    name: name,
    species: asset.species,
    tagline: isDog
      ? `Distinguished ${name} canine companion: recognized for loyal temperament, breed standard genetics, and active family companionship.`
      : `Elegant ${name} feline companion: celebrated for gentle disposition, distinct coat genetics, and affectionate household presence.`,
    origin: isDog ? "United Kingdom / Europe / North America" : "Domestic Feline Ancestry",
    standardGroup: isDog ? "AKC Recognized Breed Standard" : "CFA Championship Feline Standard",
    heroImage: asset.path,
    heroImageAlt: `${name} high-resolution breed photo`,
    coatVariations: ["Standard Official", "Dilute Mutation", "Melanistic Black", "Bi-Color Pattern", "Classic Marking"],
    metrics: [
      { label: "Adult Weight", value: isDog ? "25 – 65 lbs" : "8 – 14 lbs", subtext: isDog ? "Canine breed standard range" : "Healthy adult feline range" },
      { label: isDog ? "Standing Height" : "Body Length", value: isDog ? "14 – 24 inches" : "18 – 22 inches", subtext: "Floor to shoulder withers" },
      { label: isDog ? "Ideal Crate Size" : "Litter Box Sizing", value: isDog ? "36-Inch Crate" : "Large (20\\"+ Length)", subtext: "Ergonomic comfort sizing" },
      { label: "Average Lifespan", value: isDog ? "11 – 14 Years" : "12 – 16 Years", subtext: "Veterinary life-stage guidelines" },
      { label: "Daily Calories", value: isDog ? "850 – 1,250 kcal" : "220 – 300 kcal", subtext: "WSAVA RER baseline for neutered adults" },
      { label: isDog ? "Activity Level" : "Coat Care", value: isDog ? "Moderate to High" : "Weekly Brushing", subtext: isDog ? "Daily exercise and enrichment" : "Healthy skin and follicle support" },
    ],
    calculatorLinks: [
      {
        title: `${name} Human Age Calculator`,
        description: `Calculate biological human age with AVMA ${asset.species} developmental scaling.`,
        href: `/tools/${isDog ? "dog" : "cat"}-age-calculator`,
        iconType: isDog ? "dog" : "cat",
        tag: "Age Milestone",
      },
      {
        title: `${name} Ergonomic Sizing Tool`,
        description: `Determine exact dimensions to promote secure den resting instincts and healthy spine posture.`,
        href: `/tools/${isDog ? "dog-crate-size-calculator" : "cat-litter-box-size-calculator"}`,
        iconType: "box",
        tag: "Ergonomics",
      },
      {
        title: `${name} Caloric & Weight Tracker`,
        description: `Estimate adult weight curve from pediatric growth checkpoints based on WSAVA nutrition standards.`,
        href: `/tools/${isDog ? "puppy-weight-calculator" : "cat-calorie-calculator"}`,
        iconType: "scale",
        tag: "Nutrition & Growth",
      },
      {
        title: "Emergency Toxicity Triage",
        description: `Emergency toxicity calculator if hazardous household foods, plants, or toxins are accidentally ingested.`,
        href: `/tools/${isDog ? "dog-chocolate-toxicity-calculator" : "cat-toxicity-calculator"}`,
        iconType: "heartPulse",
        tag: "Emergency Safety",
      },
    ],
    healthRisks: [
      {
        name: isDog ? "Canine Joint Dysplasia" : "Hypertrophic Cardiomyopathy (HCM)",
        severity: "High Watch",
        description: isDog
          ? "Abnormal developmental laxity in coxofemoral joint leading to secondary osteoarthritis."
          : "Idiopathic thickening of left ventricular myocardium affecting cardiac filling pressures.",
        actionableCare: isDog
          ? "OFA or PennHIP radiograph screening; maintain lean Body Condition Score (BCS 4-5/9)."
          : "Annual screening echocardiogram by board-certified veterinary cardiologist.",
      },
      {
        name: isDog ? "Hereditary Retinal Atrophy (PRA)" : "Polycystic Kidney Disease (PKD)",
        severity: "Moderate",
        description: isDog
          ? "Progressive bilateral degeneration of retinal photoreceptor rods and cones."
          : "Autosomal dominant inherited mutation leading to renal cyst enlargement and chronic kidney disease.",
        actionableCare: isDog
          ? "Annual ophthalmic examination (CERF/CAER registry)."
          : "DNA gene screening or abdominal ultrasound before breeding.",
      },
      {
        name: "Food Sensitivity & Dermatitis",
        severity: "Screening Advised",
        description: "Cutaneous adverse food reactions manifesting as pruritus, ear canal erythema, and paw chewing.",
        actionableCare: "Conduct structured 8-week veterinary elimination trial with a hydrolyzed protein diet.",
      },
    ],
    dietAndCareNotes:
      `Feed ${name} a nutritionally complete diet formulated to meet AAFCO and WSAVA canine/feline nutrient profiles for their specific life stage. Weigh all dry portions on a gram kitchen scale rather than relying on volume measuring cups to prevent caloric overfeeding and joint-damaging obesity.`,
    faqs: [
      {
        question: `What is the typical temperament of a ${name}?`,
        answer: `The ${name} is renowned for an affectionate, balanced temperament. When raised in a supportive family environment with positive reinforcement and structured daily routines, they bond deeply with human handlers.`,
      },
      {
        question: `How much exercise does a ${name} require daily?`,
        answer: isDog
          ? `An adult ${name} typically requires 45 to 60 minutes of daily physical exercise combined with interactive scent games, obedience, and puzzle enrichment.`
          : `An adult ${name} thrives on 20 to 30 minutes of interactive play sessions daily (feather wands, laser pointers, cat trees) to maintain lean muscle mass.`,
      },
      {
        question: `What size crate or bed does a ${name} need?`,
        answer: isDog
          ? `An adult ${name} requires a crate that provides 2 to 4 inches of clearance above the top of their head when standing and sufficient length to turn comfortably.`
          : `A ${name} requires an open or low-entry litter box at least 1.5 times the length of their body from nose to base of tail for proper posturing.`,
      },
      {
        question: `How often should a ${name} be groomed?`,
        answer: `Brush at least 2 to 3 times weekly with a slicker brush or undercoat rake to remove loose hairs, distribute natural sebum oils, and prevent matting.`,
      },
    ],
    temperament: {
      overview:
        `The ${name} exhibits a loyal, engaging temperament. They thrive on companionship, mental engagement, and consistent human interaction.`,
      traits: [
        { label: "Affection with Family", score: 5, description: "Loving, devoted, and enjoys close physical companionship." },
        { label: "Trainability & Focus", score: 4, description: "Quick learner that responds enthusiastically to positive reinforcement." },
        { label: "Energy & Playfulness", score: 4, description: "Active and playful, keeping owners entertained and active." },
        { label: "Sociability with Pets", score: 4, description: "Generally welcoming when properly socialized from young age." },
      ],
      familyCompatibility: `Well-suited to dedicated pet parents and families who include them in daily household life and outdoor adventures.`,
      trainingTips: `Use high-value rewards, short 5-minute training intervals, and praise. Consistency and calm leadership foster rapid learning.`,
    },
    colorGenetics: {
      overview:
        `Coat expression in the ${name} is determined by primary canine/feline melanin loci (Eumelanin black/brown and Pheomelanin red/yellow).`,
      coatType: isDog ? "Double coat with protective guard hairs and insulating undercoat." : "Soft, plush single or semi-double feline coat.",
      palette: [
        { name: "Standard Coat", category: "Standard (Official)", description: "The classic historical color phenotype recognized in conformation rings." },
        { name: "Dark Shade Variant", category: "Standard (Official)", description: "Deep pigment expression with high eumelanin density." },
        { name: "Marked / Pattern Variant", category: "Exotic / Rare Mutation", description: "Distinctive coat spotting, piebald, or striping pattern." },
      ],
      healthConsiderations: "Standard coat color variations carry no health detriments; avoid extreme inbreeding for rare color mutations.",
    },
    growthMilestones: {
      overview:
        "Consistent nutritional checkpoints ensure proper skeletal and muscle growth.",
      stages: [
        { stage: "8 Weeks Checkpoint", timeline: "8 Weeks", benchmark: isDog ? "6 – 12 lbs" : "1.8 – 2.5 lbs", guidance: "Initial veterinary wellness examination, core vaccines, and crate familiarization." },
        { stage: "16 Weeks Checkpoint", timeline: "16 Weeks", benchmark: isDog ? "16 – 28 lbs" : "3.5 – 5.5 lbs", guidance: "Teething stage; introduce positive obedience foundations and leash manners." },
        { stage: "6 Months Checkpoint", timeline: "6 Months", benchmark: isDog ? "25 – 45 lbs" : "4.5 – 7.5 lbs", guidance: "Adolescent transition; transition to adult exercise routines gradually." },
        { stage: "Adult Benchmark", timeline: "12 – 18 Months", benchmark: isDog ? "25 – 65 lbs" : "8 – 14 lbs", guidance: "Physiological adult skeletal maturity; schedule baseline adult veterinary bloodwork." },
      ],
    },
    sizeVarieties: {
      officialClassification: isDog ? "AKC Recognized Breed Standard" : "CFA Recognized Breed Standard",
      disclaimerTitle: "Authentic Breed Proportions",
      disclaimerText:
        `Beware of third-party breeders advertising 'teacup', 'micro', or 'giant' lines. Unregulated size extremes correlate with organ hypoplasia and orthopedic malformations.`,
    },
    history: {
      summary:
        `The ${name} has an established lineage developed through selective breeding for working utility, hunting excellence, and dedicated companionship.`,
      milestones: [
        { era: "Historical Roots", title: "Early Regional Development", description: "Bred selectively by dedicated regional breeders for specialized utility and temperament." },
        { era: "Breed Standardization", title: "Official Kennel Club Recognition", description: "Formal conformation standards documented and accepted into international registries." },
        { era: "Modern Era", title: "Global Family Companion", description: "Celebrated worldwide for loyal disposition, working capability, and loving companionship." },
      ],
    },
    facts: [
      { title: "Devoted Companion Bond", detail: "Known for forming deep empathetic attachments with their primary family handlers." },
      { title: "Exceptional Senses", detail: "Possesses acute sensory perception and alert awareness of their surrounding household environment." },
      { title: "High Enrichment Drive", detail: "Thrives when provided with structured mental enrichment and interactive problem-solving toys." },
    ],
  };
}

// Comprehensive resolver: finds in BREED_DATABASE first, then matches ALL_BREED_IMAGES
export function getBreedBySlug(slug: string): BreedData | undefined {
  // 1. Direct match in handcrafted database
  const direct = BREED_DATABASE.find((b) => b.slug === slug);
  if (direct) return direct;

  // 2. Match against any asset in ALL_BREED_IMAGES by exact slug
  const asset = ALL_BREED_IMAGES.find((a) => a.slug === slug || a.filename === slug + ".webp");
  if (asset) {
    const canonical = BREED_DATABASE.find((b) => b.slug === asset.breedSlug);
    if (canonical) return canonical;
    return generateProfileForAsset(asset);
  }

  // 3. Fallback search by partial slug matching in images
  const fallbackAsset = ALL_BREED_IMAGES.find((a) => a.slug.includes(slug) || slug.includes(a.slug));
  if (fallbackAsset) {
    const canonical = BREED_DATABASE.find((b) => b.slug === fallbackAsset.breedSlug);
    if (canonical) return canonical;
    return generateProfileForAsset(fallbackAsset);
  }

  return undefined;
}

// Get all unique breeds for directory
export function getAllBreeds(): BreedData[] {
  const databaseSlugs = new Set(BREED_DATABASE.map((b) => b.slug));
  const result: BreedData[] = [...BREED_DATABASE];

  for (const asset of ALL_BREED_IMAGES) {
    if (!databaseSlugs.has(asset.breedSlug) && !databaseSlugs.has(asset.slug)) {
      databaseSlugs.add(asset.slug);
      result.push(generateProfileForAsset(asset));
    }
  }

  return result;
}
"""

full_code = f"""{interfaces}export const BREED_DATABASE: BreedData[] = [
{all_core_breeds_str}
];

export interface BreedImageAsset {{
  filename: string;
  name: string;
  species: "dog" | "cat";
  path: string;
  slug: string;
  breedSlug: string;
}}

{images_ts_block}
{resolver_ts}
"""

with open("src/data/breeds.ts", "w", encoding="utf-8") as f:
    f.write(full_code)

print("Successfully wrote src/data/breeds.ts without string interpolation bugs!")
