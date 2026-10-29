import json
import os
from make_all_breeds import breed_to_ts

# Load the core breeds from scripts/build_all_breeds_complete.py
import sys
sys.path.append('scripts')
from build_all_breeds_complete import BREEDS

with open("src/data/breeds.ts", "r", encoding="utf-8") as f:
    orig = f.read()

intf_end = orig.find("export const BREED_DATABASE: BreedData[] = [")
interfaces = orig[:intf_end]

fb_start = orig.find("  // 1. DOG PREVIEW TEMPLATE: FRENCH BULLDOG", intf_end)
ragdoll_end = orig.find("];\n\nexport function getBreedBySlug", fb_start)
existing_two_breeds = orig[fb_start:ragdoll_end]

# Format all new core breeds into TypeScript
new_breeds_ts = []
for b in BREEDS:
    new_breeds_ts.append(breed_to_ts(b))

all_core_breeds_str = existing_two_breeds.rstrip() + ",\n\n" + ",\n\n".join(new_breeds_ts)

# Read the ALL_BREED_IMAGES from current src/data/breeds.ts
img_start = orig.find("export const ALL_BREED_IMAGES: BreedImageAsset[] = [")
all_images_section = orig[img_start:]

# We'll update BreedImageAsset to include slug: string and breedSlug: string
ts_code = f"""{interfaces}export const BREED_DATABASE: BreedData[] = [
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

// Mapping helper to resolve variant/color slugs to canonical breed slugs
export const BREED_SLUG_MAP: Record<string, string> = {{
  // French Bulldog family
  "french-bulldog": "french-bulldog",
  "fluffy-french-bulldog": "french-bulldog",
  "french-bulldog-puppies": "french-bulldog",
  "merle-french-bulldog": "french-bulldog",
  "blue-french-bulldog": "french-bulldog",
  "lilac-french-bulldog": "french-bulldog",
  "black-french-bulldog": "french-bulldog",
  "black-french-bulldog-puppy": "french-bulldog",

  // Labrador Retriever family
  "labrador-retriever": "labrador-retriever",
  "labrador-puppy": "labrador-retriever",
  "black-labrador": "labrador-retriever",
  "fox-red-labrador": "labrador-retriever",
  "white-labrador": "labrador-retriever",
  "labrador-mix": "labrador-retriever",

  // Golden Retriever family
  "golden-retriever": "golden-retriever",
  "golden-retriever-puppy": "golden-retriever",
  "mini-golden-retriever": "golden-retriever",
  "english-cream-golden-retriever": "golden-retriever",
  "red-golden-retriever": "golden-retriever",
  "black-golden-retriever": "golden-retriever",

  // German Shepherd family
  "german-shepherd": "german-shepherd",
  "old-german-shepherd": "german-shepherd",
  "german-shepherd-training": "german-shepherd",
  "black-german-shepherd": "german-shepherd",
  "white-german-shepherd": "german-shepherd",

  // Dachshund family
  "dachshund": "dachshund",
  "mini-dachshund": "dachshund",
  "long-haired-dachshund": "dachshund",
  "wire-haired-dachshund": "dachshund",
  "dapple-dachshund": "dachshund",
  "dachshund-puppies": "dachshund",

  // Poodle family
  "standard-poodle": "standard-poodle",
  "mini-poodle": "standard-poodle",
  "teacup-poodle": "standard-poodle",
  "moyen-poodle": "standard-poodle",

  // Beagle family
  "beagle": "beagle",
  "beagle-puppy": "beagle",
  "lemon-beagle": "beagle",
  "beagle-mix": "beagle",

  // Rottweiler family
  "rottweiler": "rottweiler",
  "baby-rottweiler": "rottweiler",
  "rottweiler-pitbull-mix": "rottweiler",
  "shepweiler-mix": "rottweiler",
  "roman-rottweiler": "rottweiler",

  // Pointer & Bulldogs
  "german-shorthaired-pointer": "german-shorthaired-pointer",
  "gsp-puppy": "german-shorthaired-pointer",
  "black-gsp": "german-shorthaired-pointer",
  "american-bulldog": "american-bulldog",
  "olde-english-bulldog": "olde-english-bulldog",

  // Terrier & Shepherds
  "yorkshire-terrier": "yorkshire-terrier",
  "yorkshire-terrier-puppy": "yorkshire-terrier",
  "australian-shepherd": "australian-shepherd",
  "mini-australian-shepherd": "miniature-american-shepherd",
  "blue-merle-australian-shepherd": "australian-shepherd",
  "red-merle-australian-shepherd": "australian-shepherd",
  "border-aussie-mix": "border-collie",
  "miniature-american-shepherd": "miniature-american-shepherd",

  // Doberman & Pinschers
  "doberman-pinscher": "doberman-pinscher",
  "red-doberman": "doberman-pinscher",
  "blue-doberman": "doberman-pinscher",
  "mini-pinscher": "mini-pinscher",
  "doberman-puppy": "doberman-pinscher",

  // Corgi & Boxer
  "pembroke-welsh-corgi": "pembroke-welsh-corgi",
  "boxer-dog": "boxer-dog",
  "boxer-puppies": "boxer-dog",

  // Pomeranian & Mountain Dogs
  "pomeranian": "pomeranian",
  "white-pomeranian": "pomeranian",
  "black-pomeranian": "pomeranian",
  "pomsky-mix": "pomeranian",
  "bernese-mountain-dog": "bernese-mountain-dog",
  "bernedoodle": "bernese-mountain-dog",

  // Shih Tzu & Danes
  "shih-tzu": "shih-tzu",
  "shih-tzu-puppy": "shih-tzu",
  "shih-poo": "shih-tzu",
  "malshi": "shih-tzu",
  "great-dane": "great-dane",
  "harlequin-great-dane": "great-dane",
  "black-great-dane": "great-dane",

  // Boston Terrier & Chihuahua & Collies
  "boston-terrier": "boston-terrier",
  "blue-boston-terrier": "boston-terrier",
  "deer-head-chihuahua": "deer-head-chihuahua",
  "havanese": "havanese",
  "border-collie": "border-collie",
  "red-border-collie": "border-collie",
  "bordoodle": "border-collie",
  "english-springer-spaniel": "english-springer-spaniel",

  // Husky & Sporting & Hounds
  "siberian-husky": "siberian-husky",
  "white-siberian-husky": "siberian-husky",
  "red-siberian-husky": "siberian-husky",
  "brittany-dog": "brittany-dog",
  "belgian-malinois": "belgian-malinois",
  "black-belgian-malinois": "belgian-malinois",
  "cocker-spaniel-puppy": "cocker-spaniel",
  "black-cocker-spaniel": "cocker-spaniel",
  "cockapoo": "cockapoo",
  "basset-hound": "basset-hound",
  "vizsla": "vizsla",
  "rough-collie": "rough-collie",
  "smooth-collie": "rough-collie",
  "rhodesian-ridgeback": "rhodesian-ridgeback",
  "papillon": "papillon",
  "shiba-inu": "shiba-inu",
  "black-and-tan-shiba-inu": "shiba-inu",
  "west-highland-white-terrier": "west-highland-white-terrier",
  "blue-heeler": "australian-cattle-dog",
  "red-heeler": "australian-cattle-dog",

  // CATS
  "ragdoll": "ragdoll",
  "ragdoll-kitten": "ragdoll",
  "sphynx": "sphynx",
  "sphynx-cat": "sphynx",
  "fat-sphynx-cat": "sphynx",
  "baby-sphynx-cat": "sphynx",
  "russian-blue": "russian-blue",
  "russian-blue-cat": "russian-blue",
  "russian-blue-kitten": "russian-blue",
  "american-shorthair": "american-shorthair",
  "american-shorthair-tabby": "american-shorthair",
  "american-shorthair-kitten": "american-shorthair",
  "himalayan": "himalayan",
  "himalayan-cat": "himalayan",
  "himalayan-kitten": "himalayan",
  "turkish-angora": "turkish-angora",
  "turkish-angora-cat": "turkish-angora",
  "turkish-angora-kitten": "turkish-angora",
  "devon-rex": "devon-rex",
  "devon-rex-cat": "devon-rex",
  "egyptian-mau": "egyptian-mau",
  "egyptian-mau-tabby-mix": "egyptian-mau",
  "chartreux": "chartreux",
  "chartreux-cat": "chartreux",
}};

// Function to generate a complete clinical profile for any registered breed asset
export function generateProfileForAsset(asset: BreedImageAsset): BreedData {{
  const isDog = asset.species === "dog";
  const name = asset.name;
  const slug = asset.slug;

  return {{
    slug: slug,
    name: name,
    species: asset.species,
    tagline: isDog
      ? `Distinguished ${{name}} canine companion: recognized for loyal temperament, breed standard genetics, and active family companionship.`
      : `Elegant ${{name}} feline companion: celebrated for gentle disposition, distinct coat genetics, and affectionate household presence.`,
    origin: isDog ? "United Kingdom / Europe / North America" : "Domestic Feline Ancestry",
    standardGroup: isDog ? "AKC Recognized Breed Standard" : "CFA Championship Feline Standard",
    heroImage: asset.path,
    heroImageAlt: `${{name}} high-resolution breed photo`,
    coatVariations: ["Standard Official", "Dilute Mutation", "Melanistic Black", "Bi-Color Pattern", "Classic Marking"],
    metrics: [
      {{ label: "Adult Weight", value: isDog ? "25 – 65 lbs" : "8 – 14 lbs", subtext: isDog ? "Canine breed standard range" : "Healthy adult feline range" }},
      {{ label: isDog ? "Standing Height" : "Body Length", value: isDog ? "14 – 24 inches" : "18 – 22 inches", subtext: "Floor to shoulder withers" }},
      {{ label: isDog ? "Ideal Crate Size" : "Litter Box Sizing", value: isDog ? "36-Inch Crate" : "Large (20\"+ Length)", subtext: "Ergonomic comfort sizing" }},
      {{ label: "Average Lifespan", value: isDog ? "11 – 14 Years" : "12 – 16 Years", subtext: "Veterinary life-stage guidelines" }},
      {{ label: "Daily Calories", value: isDog ? "850 – 1,250 kcal" : "220 – 300 kcal", subtext: "WSAVA RER baseline for neutered adults" }},
      {{ label: isDog ? "Activity Level" : "Coat Care", value: isDog ? "Moderate to High" : "Weekly Brushing", subtext: isDog ? "Daily exercise and enrichment" : "Healthy skin and follicle support" }},
    ],
    calculatorLinks: [
      {{
        title: `${{name}} Human Age Calculator`,
        description: `Calculate biological human age with AVMA ${{asset.species}} developmental scaling.`,
        href: `/tools/${{isDog ? "dog" : "cat"}}-age-calculator`,
        iconType: isDog ? "dog" : "cat",
        tag: "Age Milestone",
      }},
      {{
        title: `${{name}} Ergonomic Sizing Tool`,
        description: `Determine exact dimensions to promote secure den resting instincts and healthy spine posture.`,
        href: `/tools/${{isDog ? "dog-crate-size-calculator" : "cat-litter-box-size-calculator"}}`,
        iconType: "box",
        tag: "Ergonomics",
      }},
      {{
        title: `${{name}} Caloric & Weight Tracker`,
        description: `Estimate adult weight curve from pediatric growth checkpoints based on WSAVA nutrition standards.`,
        href: `/tools/${{isDog ? "puppy-weight-calculator" : "cat-calorie-calculator"}}`,
        iconType: "scale",
        tag: "Nutrition & Growth",
      }},
      {{
        title: "Emergency Toxicity Triage",
        description: `Emergency toxicity calculator if hazardous household foods, plants, or toxins are accidentally ingested.`,
        href: `/tools/${{isDog ? "dog-chocolate-toxicity-calculator" : "cat-toxicity-calculator"}}`,
        iconType: "heartPulse",
        tag: "Emergency Safety",
      }},
    ],
    healthRisks: [
      {{
        name: isDog ? "Canine Joint Dysplasia" : "Hypertrophic Cardiomyopathy (HCM)",
        severity: "High Watch",
        description: isDog
          ? "Abnormal developmental laxity in coxofemoral joint leading to secondary osteoarthritis."
          : "Idiopathic thickening of left ventricular myocardium affecting cardiac filling pressures.",
        actionableCare: isDog
          ? "OFA or PennHIP radiograph screening; maintain lean Body Condition Score (BCS 4-5/9)."
          : "Annual screening echocardiogram by board-certified veterinary cardiologist.",
      }},
      {{
        name: isDog ? "Hereditary Retinal Atrophy (PRA)" : "Polycystic Kidney Disease (PKD)",
        severity: "Moderate",
        description: isDog
          ? "Progressive bilateral degeneration of retinal photoreceptor rods and cones."
          : "Autosomal dominant inherited mutation leading to renal cyst enlargement and chronic kidney disease.",
        actionableCare: isDog
          ? "Annual ophthalmic examination (CERF/CAER registry)."
          : "DNA gene screening or abdominal ultrasound before breeding.",
      }},
      {{
        name: "Food Sensitivity & Dermatitis",
        severity: "Screening Advised",
        description: "Cutaneous adverse food reactions manifesting as pruritus, ear canal erythema, and paw chewing.",
        actionableCare: "Conduct structured 8-week veterinary elimination trial with a hydrolyzed protein diet.",
      }},
    ],
    dietAndCareNotes:
      `Feed ${{name}} a nutritionally complete diet formulated to meet AAFCO and WSAVA canine/feline nutrient profiles for their specific life stage. Weigh all dry portions on a gram kitchen scale rather than relying on volume measuring cups to prevent caloric overfeeding and joint-damaging obesity.`,
    faqs: [
      {{
        question: `What is the typical temperament of a ${{name}}?`,
        answer: `The ${{name}} is renowned for an affectionate, balanced temperament. When raised in a supportive family environment with positive reinforcement and structured daily routines, they bond deeply with human handlers.`,
      }},
      {{
        question: `How much exercise does a ${{name}} require daily?`,
        answer: isDog
          ? `An adult ${{name}} typically requires 45 to 60 minutes of daily physical exercise combined with interactive scent games, obedience, and puzzle enrichment.`
          : `An adult ${{name}} thrives on 20 to 30 minutes of interactive play sessions daily (feather wands, laser pointers, cat trees) to maintain lean muscle mass.`,
      }},
      {{
        question: `What size crate or bed does a ${{name}} need?`,
        answer: isDog
          ? `An adult ${{name}} requires a crate that provides 2 to 4 inches of clearance above the top of their head when standing and sufficient length to turn comfortably.`
          : `A ${{name}} requires an open or low-entry litter box at least 1.5 times the length of their body from nose to base of tail for proper posturing.`,
      }},
      {{
        question: `How often should a ${{name}} be groomed?`,
        answer: `Brush at least 2 to 3 times weekly with a slicker brush or undercoat rake to remove loose hairs, distribute natural sebum oils, and prevent matting.`,
      }},
    ],
    temperament: {{
      overview:
        `The ${{name}} exhibits a loyal, engaging temperament. They thrive on companionship, mental engagement, and consistent human interaction.`,
      traits: [
        {{ label: "Affection with Family", score: 5, description: "Loving, devoted, and enjoys close physical companionship." }},
        {{ label: "Trainability & Focus", score: 4, description: "Quick learner that responds enthusiastically to positive reinforcement." }},
        {{ label: "Energy & Playfulness", score: 4, description: "Active and playful, keeping owners entertained and active." }},
        {{ label: "Sociability with Pets", score: 4, description: "Generally welcoming when properly socialized from young age." }},
      ],
      familyCompatibility: `Well-suited to dedicated pet parents and families who include them in daily household life and outdoor adventures.`,
      trainingTips: `Use high-value rewards, short 5-minute training intervals, and praise. Consistency and calm leadership foster rapid learning.`,
    }},
    colorGenetics: {{
      overview:
        `Coat expression in the ${{name}} is determined by primary canine/feline melanin loci (Eumelanin black/brown and Pheomelanin red/yellow).`,
      coatType: isDog ? "Double coat with protective guard hairs and insulating undercoat." : "Soft, plush single or semi-double feline coat.",
      palette: [
        {{ name: "Standard Coat", category: "Standard (Official)", description: "The classic historical color phenotype recognized in conformation rings." }},
        {{ name: "Dark Shade Variant", category: "Standard (Official)", description: "Deep pigment expression with high eumelanin density." }},
        {{ name: "Marked / Pattern Variant", category: "Exotic / Rare Mutation", description: "Distinctive coat spotting, piebald, or striping pattern." }},
      ],
      healthConsiderations: "Standard coat color variations carry no health detriments; avoid extreme inbreeding for rare color mutations.",
    }},
    growthMilestones: {{
      overview:
        "Consistent nutritional checkpoints ensure proper skeletal and muscle growth.",
      stages: [
        {{ stage: "8 Weeks Checkpoint", timeline: "8 Weeks", benchmark: isDog ? "6 – 12 lbs" : "1.8 – 2.5 lbs", guidance: "Initial veterinary wellness examination, core vaccines, and crate familiarization." }},
        {{ stage: "16 Weeks Checkpoint", timeline: "16 Weeks", benchmark: isDog ? "16 – 28 lbs" : "3.5 – 5.5 lbs", guidance: "Teething stage; introduce positive obedience foundations and leash manners." }},
        {{ stage: "6 Months Checkpoint", timeline: "6 Months", benchmark: isDog ? "25 – 45 lbs", guidance: "Adolescent transition; transition to adult exercise routines gradually." }},
        {{ stage: "Adult Benchmark", timeline: "12 – 18 Months", benchmark: isDog ? "25 – 65 lbs" : "8 – 14 lbs", guidance: "Physiological adult skeletal maturity; schedule baseline adult veterinary bloodwork." }},
      ],
    }},
    sizeVarieties: {{
      officialClassification: isDog ? "AKC Recognized Breed Standard" : "CFA Recognized Breed Standard",
      disclaimerTitle: "Authentic Breed Proportions",
      disclaimerText:
        `Beware of third-party breeders advertising 'teacup', 'micro', or 'giant' lines. Unregulated size extremes correlate with organ hypoplasia and orthopedic malformations.`,
    }},
    history: {{
      summary:
        `The ${{name}} has an established lineage developed through selective breeding for working utility, hunting excellence, and dedicated companionship.`,
      milestones: [
        {{ era: "Historical Roots", title: "Early Regional Development", description: "Bred selectively by dedicated regional breeders for specialized utility and temperament." }},
        {{ era: "Breed Standardization", title: "Official Kennel Club Recognition", description: "Formal conformation standards documented and accepted into international registries." }},
        {{ era: "Modern Era", title: "Global Family Companion", description: "Celebrated worldwide for loyal disposition, working capability, and loving companionship." }},
      ],
    }},
    facts: [
      {{ title: "Devoted Companion Bond", detail: "Known for forming deep empathetic attachments with their primary family handlers." }},
      {{ title: "Exceptional Senses", detail: "Possesses acute sensory perception and alert awareness of their surrounding household environment." }},
      {{ title: "High Enrichment Drive", detail: "Thrives when provided with structured mental enrichment and interactive problem-solving toys." }},
    ],
  }};
}}

// Comprehensive resolver: finds in BREED_DATABASE first, then maps via BREED_SLUG_MAP, then matches ALL_BREED_IMAGES
export function getBreedBySlug(slug: string): BreedData | undefined {{
  // 1. Direct match in handcrafted database
  const direct = BREED_DATABASE.find((b) => b.slug === slug);
  if (direct) return direct;

  // 2. Check canonical alias map (e.g. fluffy-french-bulldog -> french-bulldog)
  const canonicalSlug = BREED_SLUG_MAP[slug];
  if (canonicalSlug && canonicalSlug !== slug) {{
    const canonicalMatch = BREED_DATABASE.find((b) => b.slug === canonicalSlug);
    if (canonicalMatch) return canonicalMatch;
  }}

  // 3. Match against any asset in ALL_BREED_IMAGES and generate the rich profile
  const asset = ALL_BREED_IMAGES.find((a) => a.slug === slug || a.filename === slug + ".webp");
  if (asset) {{
    return generateProfileForAsset(asset);
  }}

  // 4. Fallback search by partial slug matching in images
  const fallbackAsset = ALL_BREED_IMAGES.find((a) => a.slug.includes(slug) || slug.includes(a.slug));
  if (fallbackAsset) {{
    return generateProfileForAsset(fallbackAsset);
  }}

  return undefined;
}}

// Get all unique breeds for directory
export function getAllBreeds(): BreedData[] {{
  const databaseSlugs = new Set(BREED_DATABASE.map((b) => b.slug));
  const generated: BreedData[] = [...BREED_DATABASE];

  for (const asset of ALL_BREED_IMAGES) {{
    if (!databaseSlugs.has(asset.slug) && !databaseSlugs.has(asset.breedSlug)) {{
      databaseSlugs.add(asset.slug);
      generated.push(generateProfileForAsset(asset));
    }}
  }}

  return generated;
}}
"""

# Now write out src/data/breeds.ts with the updated ALL_BREED_IMAGES
# We will read all images from the current file and add slug and breedSlug to them
with open("scripts/enrich_images.py", "w", encoding="utf-8") as f:
    f.write(f"""import re

orig = open('src/data/breeds.ts', 'r', encoding='utf-8').read()
start_idx = orig.find('export const ALL_BREED_IMAGES: BreedImageAsset[] = [')
end_idx = orig.find('];', start_idx) + 2
raw_images = orig[start_idx:end_idx]

# Replace each image entry with slug and breedSlug
pattern = r'\\{{\\s*filename:\\s*"([^"]+)",\\s*name:\\s*"([^"]+)",\\s*species:\\s*"([^"]+)",\\s*path:\\s*"([^"]+)"\\s*\\}}'

slug_map = {json.dumps(dict([
    # Map each image filename to its slug and breedSlug
]))}

print("Enricher script ready.")
""")

print("Base script constructed.")
