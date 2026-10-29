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

export interface BreedTemperamentTrait {
  label: string;
  score: number; // 1 to 5
  description: string;
}

export interface BreedColorDetail {
  name: string;
  category: "Standard (Official)" | "Exotic / Rare Mutation";
  description: string;
  geneticsNote?: string;
}

export interface BreedGrowthMilestone {
  stage: string;
  timeline: string;
  benchmark: string;
  guidance: string;
}

export interface BreedFact {
  title: string;
  detail: string;
}

export interface BreedHistoryMilestone {
  era: string;
  title: string;
  description: string;
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
  // --- Enhanced Keyword Clusters ---
  temperament: {
    overview: string;
    traits: BreedTemperamentTrait[];
    familyCompatibility: string;
    trainingTips: string;
  };
  colorGenetics: {
    overview: string;
    coatType: string;
    palette: BreedColorDetail[];
    healthConsiderations: string;
  };
  growthMilestones: {
    overview: string;
    stages: BreedGrowthMilestone[];
  };
  sizeVarieties: {
    officialClassification: string;
    disclaimerTitle: string;
    disclaimerText: string;
  };
  // --- Facts & History Clusters ---
  history: {
    summary: string;
    milestones: BreedHistoryMilestone[];
  };
  facts: BreedFact[];
}

export const BREED_DATABASE: BreedData[] = [
  // ========================================================
  // 1. DOG PREVIEW TEMPLATE: FRENCH BULLDOG
  // ========================================================
  {
    slug: "french-bulldog",
    name: "French Bulldog",
    species: "dog",
    tagline: "Compact, affectionate companion with bat ears, gentle indoor temperament, and low-exercise requirements.",
    origin: "France / United Kingdom",
    standardGroup: "AKC Non-Sporting Group",
    heroImage: "/images/breeds/dogs/french-bulldog.webp",
    heroImageAlt: "French Bulldog sitting calmly on floor",
    coatVariations: ["Fawn", "Brindle", "White & Brindle (Pied)", "Cream", "Black", "Blue", "Lilac", "Merle", "Fluffy (Long-Haired)"],
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
        question: "What are the rarest French Bulldog colors?",
        answer: "The rarest French Bulldog colors include Fluffy (long-haired mutation via autosomal recessive FGF5 gene), Isabella/Lilac (double dilution of chocolate and blue), and Blue Merle. While prized in companion markets, they are non-standard disqualifications in AKC conformation rings.",
      },
      {
        question: "What is a French Bulldog's typical temperament with kids and other pets?",
        answer: "French Bulldogs have an exceptionally gentle, patient, and clownish temperament. They thrive in family environments, tolerate children well, and rarely bark without cause. However, they can develop separation anxiety if left alone for longer than 4 to 6 hours.",
      },
      {
        question: "What size crate does an adult French Bulldog need?",
        answer: "An adult French Bulldog typically requires a 24-inch crate (24\"L x 18\"W x 19\"H). This provides the necessary 2 to 4 inches of clearance above the head and allows comfortable turning without being oversized for housebreaking.",
      },
      {
        question: "Can French Bulldogs swim safely?",
        answer: "No. French Bulldogs are anatomical non-swimmers due to their dense heavy chest, brachycephalic snout, and short legs. They should always wear an approved canine life jacket near pools, lakes, or boats.",
      },
    ],
    // --- Enhanced Keywords Coverage ---
    temperament: {
      overview:
        "French Bulldogs are celebrated for their affectionate, calm, and charismatic temperament. Known as 'clowns in philosopher cloaks,' they are patient indoor companions that form intense bonds with their human family.",
      traits: [
        { label: "Affection with Family", score: 5, description: "Extremely loving, thrives on human contact and lap cuddles." },
        { label: "Good with Young Kids", score: 5, description: "Gentle and sturdy; tolerates supervised toddler play with patience." },
        { label: "Sociability with Dogs & Cats", score: 4, description: "Generally friendly with household pets when socialized early." },
        { label: "Barking & Vocalization Tendency", score: 2, description: "Very quiet; rarely barks, instead communicating through snorts, yodels, and chortles." },
        { label: "Energy & Daily Exercise", score: 2, description: "Low energy; satisfied with two short 15-to-20 minute daily strolls in mild weather." },
        { label: "Alone-Time Tolerance", score: 1, description: "Prone to separation anxiety; requires human presence or dedicated companionship." },
      ],
      familyCompatibility:
        "Ideal for apartments, busy suburban homes, and seniors. Their low bark drive makes them neighbor-friendly, while their robust build withstands enthusiastic family life.",
      trainingTips:
        "Frenchies respond best to positive reinforcement and high-value treats. Harsh discipline causes them to shut down. Keep training sessions brief (5–10 minutes) to match their attention span.",
    },
    colorGenetics: {
      overview:
        "French Bulldog coat colors range from traditional AKC-accepted shades to highly sought-after rare and dilute varieties like Fluffy, Blue, Merle, and Lilac.",
      coatType: "Short, smooth, close-lying single coat (except in Fluffy varieties carrying two copies of the recessive FGF5 long-hair gene).",
      palette: [
        {
          name: "Standard Fawn & Fawn Brindle",
          category: "Standard (Official)",
          description: "Classic warm tan to reddish fawn coat with characteristic black mask and subtle dark striping.",
        },
        {
          name: "White & Brindle (Pied)",
          category: "Standard (Official)",
          description: "Clean white base with clearly defined brindle patches across head, ears, and back.",
        },
        {
          name: "Fluffy (Long-Haired French Bulldog)",
          category: "Exotic / Rare Mutation",
          description: "Distinctive wavy, plush long coat on ears, collar, and chest caused by the recessive autosomal FGF5 gene.",
          geneticsNote: "Requires two recessive 'L' alleles (L/L). Non-shedding texture requiring bi-weekly grooming.",
        },
        {
          name: "Blue & Blue Fawn French Bulldog",
          category: "Exotic / Rare Mutation",
          description: "Silvery slate-gray hue created by dilute gene (d/d) that alters black pigmentation.",
          geneticsNote: "Watch for Color Dilution Alopecia (CDA); verify breeder tests parent skin integrity.",
        },
        {
          name: "Lilac & Isabella French Bulldog",
          category: "Exotic / Rare Mutation",
          description: "Ultra-rare pale champagne-silver coat produced by combining homozygous chocolate (b/b) with blue dilution (d/d).",
          geneticsNote: "Pups are born with light blue eyes that gradually transition into warm amber or hazel.",
        },
        {
          name: "Merle French Bulldog",
          category: "Exotic / Rare Mutation",
          description: "Mottled patches of dark pigment overlaid on a lighter base, often paired with piercing blue or heterochromatic eyes.",
          geneticsNote: "Never breed two merles together (M/M) to prevent congenital deafness and microphthalmia.",
        },
        {
          name: "Solid Black French Bulldog",
          category: "Exotic / Rare Mutation",
          description: "Solid jet black coat without any brindle trace. Disqualified in AKC show standards but a popular pet companion.",
        },
      ],
      healthConsiderations:
        "Dilute coat shades (Blue, Lilac) carry higher susceptibility to follicular dysplasia or dry skin. Always prioritize respiratory and spinal genetics above rare color pigments.",
    },
    growthMilestones: {
      overview:
        "French Bulldog puppy growth proceeds rapidly in bone density before slowing between 9 and 12 months, followed by muscular chest widening up to month 18.",
      stages: [
        {
          stage: "8 to 12 Weeks (Weaning & Socialization)",
          timeline: "2 to 3 Months",
          benchmark: "6 – 10 lbs",
          guidance: "Begin crate training with 24\" divider. Administer primary core DHPP vaccinations; avoid public dog parks.",
        },
        {
          stage: "4 to 6 Months (Teething & Skeletal Growth)",
          timeline: "4 to 6 Months",
          benchmark: "12 – 18 lbs",
          guidance: "Adult incisors emerge. Transition to puppy harness to prevent tracheal strain. Feed 3 WSAVA-balanced meals daily.",
        },
        {
          stage: "7 to 12 Months (Adolescence & Adult Weight)",
          timeline: "7 to 12 Months",
          benchmark: "18 – 25 lbs",
          guidance: "Spay/neuter consultation window. Transition to adult formulation at 10–12 months to prevent premature weight gain.",
        },
        {
          stage: "12 to 18 Months (Chest Widening & Muscle Maturity)",
          timeline: "12 to 18 Months",
          benchmark: "19 – 28 lbs (Full Adult Size)",
          guidance: "Skeletal plates close. Monitor body condition score (BCS) strictly to keep ribs easily palpable.",
        },
      ],
    },
    sizeVarieties: {
      officialClassification: "AKC Non-Sporting Dog Breed Standard (16–28 lbs max).",
      disclaimerTitle: "The Truth About 'Mini' or 'Teacup' French Bulldogs",
      disclaimerText:
        "The American Kennel Club recognizes only one standard size for French Bulldogs. Labels such as 'Mini Frenchie', 'Micro', or 'Teacup' are unregulated marketing descriptions. These dogs are either runts bred for dwarfism or crossbred with small breeds (e.g. Chihuahua), carrying elevated risks for organ hypoplasia and hydrocephalus.",
    },
    // --- Facts & History Clusters ---
    history: {
      summary:
        "The French Bulldog originated in the mid-1800s during England's Industrial Revolution, when lace workers in Nottingham bred toy bulldogs to serve as affectionate lap warmers. When technological mechanization pushed craftsmen to Normandy and Paris, they brought their miniature bulldogs with them, where Parisian cafe culture popularized their signature erect 'bat ears'.",
      milestones: [
        {
          era: "1850s – 1860s",
          title: "Nottingham Lacemakers' Lap Warmers",
          description:
            "English lace workers miniaturized the standard bulldog to 16–20 lbs to sit on workbenches and keep artisans warm in drafty textile mills.",
        },
        {
          era: "1870s – 1890s",
          title: "Parisian High Society & 'Bat Ear' Revolution",
          description:
            "Exported to France, the dogs became high-society mascots among artists, writers, and aristocrats, who selectively bred for erect bat ears over traditional rose ears.",
        },
        {
          era: "1897 – 1898",
          title: "First Breed Standard & AKC Recognition",
          description:
            "American fanciers founded the French Bull Dog Club of America (FBDCA) in New York, codifying the upright bat ear as an uncompromising breed hallmark.",
        },
        {
          era: "2022 – Present",
          title: "#1 Most Popular Dog in America",
          description:
            "Officially surpassed the Labrador Retriever as the most registered dog breed in the United States after a historic 31-year reign.",
        },
      ],
    },
    facts: [
      {
        title: "Anatomical Non-Swimmers",
        detail:
          "Due to their heavy, dense muscle frame, short snout, and disproportionate center of gravity, French Bulldogs sink quickly and cannot swim without an approved canine life jacket.",
      },
      {
        title: "Over 80% Delivered via C-Section",
        detail:
          "Because French Bulldog puppies have disproportionately broad heads and mothers have compact pelvic canals, the vast majority of births require planned veterinary Caesarean deliveries.",
      },
      {
        title: "The Bat Ear Controversy",
        detail:
          "British breeders originally favored folded 'rose ears' similar to English Bulldogs. Wealthy American tourists fell in love with upright 'bat ears' and organized the first club exclusively dedicated to preserving them.",
      },
      {
        title: "A Frenchie Survived on the Titanic",
        detail:
          "A champion show Frenchie named Gamin de Pycombe was on board the RMS Titanic in 1912, insured by owner Robert Daniels for a then-record sum of $750 (equivalent to ~$24,000 today).",
      },
    ],
  },

  // ========================================================
  // 2. CAT PREVIEW TEMPLATE: RAGDOLL
  // ========================================================
  {
    slug: "ragdoll",
    name: "Ragdoll",
    species: "cat",
    tagline: "Large, semi-longhaired feline famous for striking blue oval eyes, docile temperament, and affectionate disposition.",
    origin: "Riverside, California, USA",
    standardGroup: "CFA Pointed Breed Class",
    heroImage: "/images/breeds/cats/ragdoll-kitten.webp",
    heroImageAlt: "Beautiful Ragdoll cat with bright blue eyes",
    coatVariations: ["Seal Point", "Blue Point", "Chocolate Point", "Lilac Point", "Mitted", "Bicolor", "Lynx Point", "Flame (Red) Point"],
    metrics: [
      { label: "Adult Weight", value: "10 – 20 lbs", subtext: "Males: 15–20 lbs • Females: 10–15 lbs" },
      { label: "Maturation Time", value: "3 – 4 Years", subtext: "Slow-maturing skeletal growth timeline" },
      { label: "Litter Box Size", value: 'XL (22"+ Length)', subtext: "Required for long feline body frame" },
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
        question: "What are the official Ragdoll cat colors and patterns?",
        answer: "Ragdolls are pointed cats born pure white. Their colors include Seal (dark brown), Blue (slate gray), Chocolate (milk chocolate), Lilac (frosty pink-gray), Flame/Red, and Cream. Recognized patterns include Colorpoint (no white), Mitted (white paws and chin), Bicolor (inverted white V mask on face), and Lynx (tabby stripes overlaid on the points).",
      },
      {
        question: "What is a Ragdoll cat's temperament like?",
        answer: "Ragdolls are famous for their extremely docile, sweet, and trusting temperament. They greet owners at the door like puppy dogs, follow family members from room to room, and often go completely limp in your arms when held, which is how the breed earned its name.",
      },
      {
        question: "How big do Ragdoll kittens get and when do they stop growing?",
        answer: "Ragdolls are one of the largest domestic cat breeds. Males typically reach 15 to 20 pounds, while females weigh 10 to 15 pounds. Unlike most domestic cats that finish growing by 12 months, Ragdolls mature very slowly and take 3 to 4 full years to achieve their final bone frame and coat color.",
      },
      {
        question: "Do Ragdoll cats shed a lot?",
        answer: "Ragdolls have a rabbit-soft semi-long coat that lacks a dense undercoat, which means they mat and shed significantly less than Persians or Maine Coons. A thorough combing once or twice a week is usually sufficient to maintain a healthy, silky coat.",
      },
    ],
    // --- Enhanced Keywords Coverage ---
    temperament: {
      overview:
        "Ragdolls are renowned for their uniquely tranquil, gentle, and dog-like temperament. They are relaxed indoor felines that actively seek human affection, often flopping onto their backs or relaxing their limbs completely when cradled.",
      traits: [
        { label: "Affection & Lap Tendency", score: 5, description: "Unusually affectionate; prefers staying in close contact with owners throughout the day." },
        { label: "Good with Children", score: 5, description: "Patient and forgiving; does not extend claws readily during gentle play." },
        { label: "Harmony with Dogs & Other Cats", score: 5, description: "Very peaceful; rarely aggressive or territorial with other indoor pets." },
        { label: "Vocalization & Meow Volume", score: 1, description: "Extremely soft, musical chirps and purrs; rarely loud or demanding." },
        { label: "Playfulness & Energy Level", score: 3, description: "Moderate play bursts; loves wand toys and soft fetch, followed by long naps." },
        { label: "Tolerance for Being Handled", score: 5, description: "Loves being held; famously relaxes its muscle tone when scooped into arms." },
      ],
      familyCompatibility:
        "Superb for households with children, gentle dogs, and work-from-home pet parents. Because of their non-defensive nature, Ragdolls should strictly be kept as 100% indoor cats.",
      trainingTips:
        "Ragdolls learn house routines quickly. They can easily be taught to play gentle fetch or walk on a harness using positive clicker training and freeze-dried salmon treats.",
    },
    colorGenetics: {
      overview:
        "All Ragdoll kittens are born pristine white due to a temperature-sensitive albinism gene. Their true point colors and patterns gradually develop over their first 2 to 3 years.",
      coatType: "Plush, silky semi-longhair coat with minimal undercoat, resulting in low matting and a cloud-like rabbit-fur texture.",
      palette: [
        {
          name: "Seal Point Ragdoll",
          category: "Standard (Official)",
          description: "Rich dark seal-brown points (face, ears, tail, legs) set against an ivory-to-warm beige body.",
        },
        {
          name: "Blue Point Ragdoll",
          category: "Standard (Official)",
          description: "Cool slate-gray points contrasting softly with a cool platinum-white body.",
        },
        {
          name: "Chocolate Point Ragdoll",
          category: "Standard (Official)",
          description: "Warm milk-chocolate points against an ivory body, retaining cocoa tones throughout adulthood.",
        },
        {
          name: "Lilac Point Ragdoll",
          category: "Standard (Official)",
          description: "Delicate frosty silvery-gray points with subtle lavender-pink undertones and bright white body.",
        },
        {
          name: "Bicolor Pattern (Any Color)",
          category: "Standard (Official)",
          description: "Characteristic symmetrical inverted white 'V' on the facial mask, pink nose leather, white chest, belly, and all four white legs.",
        },
        {
          name: "Mitted Pattern (Any Color)",
          category: "Standard (Official)",
          description: "Pure white front mittens, white hind boots up to the hock, white chin stripe running along the underside.",
        },
        {
          name: "Lynx Point (Tabby Agouti)",
          category: "Standard (Official)",
          description: "Fascinating tabby striping etched into the mask, ears, and tail points, paired with distinct 'W' or 'M' forehead markings.",
        },
        {
          name: "Flame (Red) & Cream Point",
          category: "Standard (Official)",
          description: "Vibrant apricot to warm coral points against clear white body; less common than traditional seal and blue.",
        },
      ],
      healthConsiderations:
        "Point coloration requires strict sapphire-blue eye standard in CFA/TICA. Always confirm the breeder conducts echocardiograms for familial feline HCM.",
    },
    growthMilestones: {
      overview:
        "Ragdoll kittens have a prolonged skeletal growth curve that takes 3 to 4 years to complete, requiring specialized high-protein, high-moisture kitten nutrition through month 12.",
      stages: [
        {
          stage: "8 to 12 Weeks (Weaning & Point Development)",
          timeline: "2 to 3 Months",
          benchmark: "2.5 – 4.0 lbs",
          guidance: "Faint point color begins emerging on ear tips and nose leather. Initial FVRCP feline core vaccine series begins.",
        },
        {
          stage: "4 to 6 Months (Rapid Bone Elongation)",
          timeline: "4 to 6 Months",
          benchmark: "5.0 – 8.0 lbs",
          guidance: "Baby teeth shed for permanent fangs. Transition to an extra-large, low-rim litter box to accommodate their long spine.",
        },
        {
          stage: "7 to 12 Months (Kitten to Young Adult)",
          timeline: "7 to 12 Months",
          benchmark: "9.0 – 14.0 lbs",
          guidance: "Spay or neuter window. Coat starts developing full adult density and neck ruff.",
        },
        {
          stage: "2 to 4 Years (Full Skeletal & Coat Maturity)",
          timeline: "24 to 48 Months",
          benchmark: "10 – 20 lbs (Full Adult Weight)",
          guidance: "Final adult point pigment and deep chest ruff lock in. Establish annual veterinary blood panels and dental evaluations.",
        },
      ],
    },
    sizeVarieties: {
      officialClassification: "CFA / TICA Natural Heavy Feline Breed Standard.",
      disclaimerTitle: "Large Frame vs Obesity in Ragdolls",
      disclaimerText:
        "Ragdolls are naturally large-boned, long-bodied cats with a legitimate fatty pad on their lower abdomen (a breed characteristic). However, an adult Ragdoll should never be allowed to develop excessive spine or rib fat rolls. Regular weight monitoring prevents joint stress and feline diabetes.",
    },
    // --- Facts & History Clusters ---
    history: {
      summary:
        "The Ragdoll breed was established in the 1960s in Riverside, California, by breeder Ann Baker. Starting with a white domestic longhaired matriarch named Josephine, Baker selectively cultivated cats that demonstrated extraordinarily peaceful, gentle temperaments and a distinctive tendency to go completely limp when held.",
      milestones: [
        {
          era: "1960s",
          title: "The Matriarch Josephine & Ann Baker",
          description:
            "Ann Baker mated Josephine (a longhaired white Persian-type queen) with feral pointed males, observing kittens with exceptionally loving dispositions and blue eyes.",
        },
        {
          era: "1971",
          title: "Creation of the IRCA",
          description:
            "Baker trademarked the 'Ragdoll' name and formed the International Ragdoll Cat Association (IRCA) with strict franchise breeding controls.",
        },
        {
          era: "1975 – 1993",
          title: "The Dayton Family & Major Registry Recognition",
          description:
            "Denny and Laura Dayton split from Baker to legitimize Ragdolls under major scientific feline registries, gaining official Championship status in TICA and CFA.",
        },
        {
          era: "Present Day",
          title: "World's Most Popular Pedigreed Feline",
          description:
            "Ranked consistently as the #1 most registered cat breed globally by the Cat Fanciers' Association (CFA) for multiple consecutive years.",
        },
      ],
    },
    facts: [
      {
        title: "All Kittens Are Born 100% Pure White",
        detail:
          "Because the Siamese-patterned albinism gene is temperature-sensitive, all Ragdoll kittens develop in the warm womb without color and are born snow-white. Their points only start emerging in cooler areas (ears, tail, paws) after birth.",
      },
      {
        title: "The Famous 'Limp Doll' Muscle Reflex",
        detail:
          "The breed was named 'Ragdoll' because many individuals completely surrender their muscle tone and flop peacefully into the arms of humans they trust, resembling a child's plush toy.",
      },
      {
        title: "Known as the 'Puppy Cat'",
        detail:
          "Ragdolls exhibit classic canine behaviors: they greet owners at the front door, follow family from room to room, and often fetch tossed toys with enthusiasm.",
      },
      {
        title: "One of the Slowest-Maturing Domestic Cats",
        detail:
          "While most cats complete physical growth around their 1st birthday, Ragdolls continue developing skeletal width, muscle density, and adult coat color until 3 to 4 years of age.",
      },
    ],
  },
];

export function getBreedBySlug(slug: string): BreedData | undefined {
  return BREED_DATABASE.find((b) => b.slug === slug);
}

export interface BreedImageAsset {
  filename: string;
  name: string;
  species: "dog" | "cat";
  path: string;
}

export const ALL_BREED_IMAGES: BreedImageAsset[] = [
  // DOGS (104)
  { filename: "french-bulldog.webp", name: "French Bulldog", species: "dog", path: "/images/breeds/dogs/french-bulldog.webp" },
  { filename: "fluffy-french-bulldog.webp", name: "Fluffy French Bulldog", species: "dog", path: "/images/breeds/dogs/fluffy-french-bulldog.webp" },
  { filename: "french-bulldog-puppies.webp", name: "French Bulldog puppies", species: "dog", path: "/images/breeds/dogs/french-bulldog-puppies.webp" },
  { filename: "merle-french-bulldog.webp", name: "Merle French Bulldog", species: "dog", path: "/images/breeds/dogs/merle-french-bulldog.webp" },
  { filename: "blue-french-bulldog.webp", name: "Blue French Bulldog", species: "dog", path: "/images/breeds/dogs/blue-french-bulldog.webp" },
  { filename: "lilac-french-bulldog.webp", name: "Lilac French Bulldog", species: "dog", path: "/images/breeds/dogs/lilac-french-bulldog.webp" },
  { filename: "black-french-bulldog.webp", name: "Black French Bulldog", species: "dog", path: "/images/breeds/dogs/black-french-bulldog.webp" },
  { filename: "black-french-bulldog-puppy.webp", name: "Black French Bulldog puppy", species: "dog", path: "/images/breeds/dogs/black-french-bulldog-puppy.webp" },
  { filename: "labrador-puppy.webp", name: "Yellow Labrador puppy", species: "dog", path: "/images/breeds/dogs/labrador-puppy.webp" },
  { filename: "black-labrador.webp", name: "Black Labrador Retriever", species: "dog", path: "/images/breeds/dogs/black-labrador.webp" },
  { filename: "fox-red-labrador.webp", name: "Fox Red Labrador", species: "dog", path: "/images/breeds/dogs/fox-red-labrador.webp" },
  { filename: "white-labrador.webp", name: "White Labrador Retriever", species: "dog", path: "/images/breeds/dogs/white-labrador.webp" },
  { filename: "labrador-mix.webp", name: "Labrador mix dog", species: "dog", path: "/images/breeds/dogs/labrador-mix.webp" },
  { filename: "golden-retriever.webp", name: "Golden Retriever", species: "dog", path: "/images/breeds/dogs/golden-retriever.webp" },
  { filename: "golden-retriever-puppy.webp", name: "Golden Retriever puppy", species: "dog", path: "/images/breeds/dogs/golden-retriever-puppy.webp" },
  { filename: "mini-golden-retriever.webp", name: "Mini Golden Retriever", species: "dog", path: "/images/breeds/dogs/mini-golden-retriever.webp" },
  { filename: "english-cream-golden-retriever.webp", name: "English Cream Golden Retriever", species: "dog", path: "/images/breeds/dogs/english-cream-golden-retriever.webp" },
  { filename: "red-golden-retriever.webp", name: "Red Golden Retriever", species: "dog", path: "/images/breeds/dogs/red-golden-retriever.webp" },
  { filename: "black-golden-retriever.webp", name: "Black Golden Retriever", species: "dog", path: "/images/breeds/dogs/black-golden-retriever.webp" },
  { filename: "german-shepherd.webp", name: "German Shepherd", species: "dog", path: "/images/breeds/dogs/german-shepherd.webp" },
  { filename: "old-german-shepherd.webp", name: "Old German Shepherd dog", species: "dog", path: "/images/breeds/dogs/old-german-shepherd.webp" },
  { filename: "german-shepherd-training.webp", name: "German Shepherd training", species: "dog", path: "/images/breeds/dogs/german-shepherd-training.webp" },
  { filename: "black-german-shepherd.webp", name: "Black German Shepherd", species: "dog", path: "/images/breeds/dogs/black-german-shepherd.webp" },
  { filename: "white-german-shepherd.webp", name: "White German Shepherd", species: "dog", path: "/images/breeds/dogs/white-german-shepherd.webp" },
  { filename: "mini-dachshund.webp", name: "Mini Dachshund", species: "dog", path: "/images/breeds/dogs/mini-dachshund.webp" },
  { filename: "long-haired-dachshund.webp", name: "Long haired Dachshund", species: "dog", path: "/images/breeds/dogs/long-haired-dachshund.webp" },
  { filename: "wire-haired-dachshund.webp", name: "Wire haired Dachshund", species: "dog", path: "/images/breeds/dogs/wire-haired-dachshund.webp" },
  { filename: "dapple-dachshund.webp", name: "Dapple Dachshund", species: "dog", path: "/images/breeds/dogs/dapple-dachshund.webp" },
  { filename: "dachshund-puppies.webp", name: "Dachshund puppies", species: "dog", path: "/images/breeds/dogs/dachshund-puppies.webp" },
  { filename: "standard-poodle.webp", name: "Standard Poodle", species: "dog", path: "/images/breeds/dogs/standard-poodle.webp" },
  { filename: "mini-poodle.webp", name: "Mini Poodle", species: "dog", path: "/images/breeds/dogs/mini-poodle.webp" },
  { filename: "teacup-poodle.webp", name: "Teacup Poodle", species: "dog", path: "/images/breeds/dogs/teacup-poodle.webp" },
  { filename: "moyen-poodle.webp", name: "Moyen Poodle", species: "dog", path: "/images/breeds/dogs/moyen-poodle.webp" },
  { filename: "shih-poo.webp", name: "Shih Tzu Poodle mix", species: "dog", path: "/images/breeds/dogs/shih-poo.webp" },
  { filename: "beagle.webp", name: "Beagle dog", species: "dog", path: "/images/breeds/dogs/beagle.webp" },
  { filename: "beagle-puppy.webp", name: "Beagle puppy", species: "dog", path: "/images/breeds/dogs/beagle-puppy.webp" },
  { filename: "lemon-beagle.webp", name: "Lemon Beagle", species: "dog", path: "/images/breeds/dogs/lemon-beagle.webp" },
  { filename: "beagle-mix.webp", name: "Beagle mix dog", species: "dog", path: "/images/breeds/dogs/beagle-mix.webp" },
  { filename: "rottweiler.webp", name: "Rottweiler", species: "dog", path: "/images/breeds/dogs/rottweiler.webp" },
  { filename: "baby-rottweiler.webp", name: "Rottweiler puppy", species: "dog", path: "/images/breeds/dogs/baby-rottweiler.webp" },
  { filename: "rottweiler-pitbull-mix.webp", name: "Rottweiler Pitbull mix", species: "dog", path: "/images/breeds/dogs/rottweiler-pitbull-mix.webp" },
  { filename: "shepweiler-mix.webp", name: "German Shepherd Rottweiler mix", species: "dog", path: "/images/breeds/dogs/shepweiler-mix.webp" },
  { filename: "roman-rottweiler.webp", name: "Large Rottweiler dog", species: "dog", path: "/images/breeds/dogs/roman-rottweiler.webp" },
  { filename: "german-shorthaired-pointer.webp", name: "German Shorthaired Pointer", species: "dog", path: "/images/breeds/dogs/german-shorthaired-pointer.webp" },
  { filename: "gsp-puppy.webp", name: "German Shorthaired Pointer puppy", species: "dog", path: "/images/breeds/dogs/gsp-puppy.webp" },
  { filename: "black-gsp.webp", name: "Black German Shorthaired Pointer", species: "dog", path: "/images/breeds/dogs/black-gsp.webp" },
  { filename: "american-bulldog.webp", name: "American Bulldog", species: "dog", path: "/images/breeds/dogs/american-bulldog.webp" },
  { filename: "olde-english-bulldog.webp", name: "Olde English Bulldogge", species: "dog", path: "/images/breeds/dogs/olde-english-bulldog.webp" },
  { filename: "yorkshire-terrier.webp", name: "Yorkshire Terrier", species: "dog", path: "/images/breeds/dogs/yorkshire-terrier.webp" },
  { filename: "yorkshire-terrier-puppy.webp", name: "Yorkshire Terrier puppy", species: "dog", path: "/images/breeds/dogs/yorkshire-terrier-puppy.webp" },
  { filename: "australian-shepherd.webp", name: "Australian Shepherd", species: "dog", path: "/images/breeds/dogs/australian-shepherd.webp" },
  { filename: "mini-australian-shepherd.webp", name: "Mini Australian Shepherd", species: "dog", path: "/images/breeds/dogs/mini-australian-shepherd.webp" },
  { filename: "blue-merle-australian-shepherd.webp", name: "Blue Merle Australian Shepherd", species: "dog", path: "/images/breeds/dogs/blue-merle-australian-shepherd.webp" },
  { filename: "red-merle-australian-shepherd.webp", name: "Red Merle Australian Shepherd", species: "dog", path: "/images/breeds/dogs/red-merle-australian-shepherd.webp" },
  { filename: "border-aussie-mix.webp", name: "Border Collie Australian Shepherd mix", species: "dog", path: "/images/breeds/dogs/border-aussie-mix.webp" },
  { filename: "doberman-pinscher.webp", name: "Doberman Pinscher", species: "dog", path: "/images/breeds/dogs/doberman-pinscher.webp" },
  { filename: "red-doberman.webp", name: "Red Doberman Pinscher", species: "dog", path: "/images/breeds/dogs/red-doberman.webp" },
  { filename: "blue-doberman.webp", name: "Blue Doberman Pinscher", species: "dog", path: "/images/breeds/dogs/blue-doberman.webp" },
  { filename: "mini-pinscher.webp", name: "Miniature Pinscher", species: "dog", path: "/images/breeds/dogs/mini-pinscher.webp" },
  { filename: "doberman-puppy.webp", name: "Doberman puppy", species: "dog", path: "/images/breeds/dogs/doberman-puppy.webp" },
  { filename: "pembroke-welsh-corgi.webp", name: "Pembroke Welsh Corgi", species: "dog", path: "/images/breeds/dogs/pembroke-welsh-corgi.webp" },
  { filename: "boxer-dog.webp", name: "Boxer dog", species: "dog", path: "/images/breeds/dogs/boxer-dog.webp" },
  { filename: "boxer-puppies.webp", name: "Boxer puppies", species: "dog", path: "/images/breeds/dogs/boxer-puppies.webp" },
  { filename: "pomeranian.webp", name: "Pomeranian dog", species: "dog", path: "/images/breeds/dogs/pomeranian.webp" },
  { filename: "white-pomeranian.webp", name: "White Pomeranian", species: "dog", path: "/images/breeds/dogs/white-pomeranian.webp" },
  { filename: "black-pomeranian.webp", name: "Black Pomeranian", species: "dog", path: "/images/breeds/dogs/black-pomeranian.webp" },
  { filename: "pomsky-mix.webp", name: "Pomsky puppy", species: "dog", path: "/images/breeds/dogs/pomsky-mix.webp" },
  { filename: "bernese-mountain-dog.webp", name: "Bernese Mountain Dog", species: "dog", path: "/images/breeds/dogs/bernese-mountain-dog.webp" },
  { filename: "bernedoodle.webp", name: "Bernedoodle", species: "dog", path: "/images/breeds/dogs/bernedoodle.webp" },
  { filename: "shih-tzu.webp", name: "Shih Tzu dog", species: "dog", path: "/images/breeds/dogs/shih-tzu.webp" },
  { filename: "shih-tzu-puppy.webp", name: "Shih Tzu puppy", species: "dog", path: "/images/breeds/dogs/shih-tzu-puppy.webp" },
  { filename: "malshi.webp", name: "Maltese Shih Tzu mix", species: "dog", path: "/images/breeds/dogs/malshi.webp" },
  { filename: "great-dane.webp", name: "Great Dane dog", species: "dog", path: "/images/breeds/dogs/great-dane.webp" },
  { filename: "harlequin-great-dane.webp", name: "Harlequin Great Dane", species: "dog", path: "/images/breeds/dogs/harlequin-great-dane.webp" },
  { filename: "black-great-dane.webp", name: "Black Great Dane", species: "dog", path: "/images/breeds/dogs/black-great-dane.webp" },
  { filename: "boston-terrier.webp", name: "Boston Terrier", species: "dog", path: "/images/breeds/dogs/boston-terrier.webp" },
  { filename: "blue-boston-terrier.webp", name: "Blue Boston Terrier", species: "dog", path: "/images/breeds/dogs/blue-boston-terrier.webp" },
  { filename: "deer-head-chihuahua.webp", name: "Deer head Chihuahua", species: "dog", path: "/images/breeds/dogs/deer-head-chihuahua.webp" },
  { filename: "havanese.webp", name: "Havanese dog", species: "dog", path: "/images/breeds/dogs/havanese.webp" },
  { filename: "border-collie.webp", name: "Border Collie", species: "dog", path: "/images/breeds/dogs/border-collie.webp" },
  { filename: "red-border-collie.webp", name: "Red Border Collie", species: "dog", path: "/images/breeds/dogs/red-border-collie.webp" },
  { filename: "bordoodle.webp", name: "Border Collie Poodle mix", species: "dog", path: "/images/breeds/dogs/bordoodle.webp" },
  { filename: "english-springer-spaniel.webp", name: "English Springer Spaniel", species: "dog", path: "/images/breeds/dogs/english-springer-spaniel.webp" },
  { filename: "miniature-american-shepherd.webp", name: "Miniature American Shepherd", species: "dog", path: "/images/breeds/dogs/miniature-american-shepherd.webp" },
  { filename: "siberian-husky.webp", name: "Siberian Husky", species: "dog", path: "/images/breeds/dogs/siberian-husky.webp" },
  { filename: "white-siberian-husky.webp", name: "White Siberian Husky", species: "dog", path: "/images/breeds/dogs/white-siberian-husky.webp" },
  { filename: "red-siberian-husky.webp", name: "Red Siberian Husky", species: "dog", path: "/images/breeds/dogs/red-siberian-husky.webp" },
  { filename: "brittany-dog.webp", name: "Brittany dog breed", species: "dog", path: "/images/breeds/dogs/brittany-dog.webp" },
  { filename: "belgian-malinois.webp", name: "Belgian Malinois", species: "dog", path: "/images/breeds/dogs/belgian-malinois.webp" },
  { filename: "black-belgian-malinois.webp", name: "Black Belgian Malinois", species: "dog", path: "/images/breeds/dogs/black-belgian-malinois.webp" },
  { filename: "cocker-spaniel-puppy.webp", name: "Cocker Spaniel puppy", species: "dog", path: "/images/breeds/dogs/cocker-spaniel-puppy.webp" },
  { filename: "black-cocker-spaniel.webp", name: "Black Cocker Spaniel", species: "dog", path: "/images/breeds/dogs/black-cocker-spaniel.webp" },
  { filename: "cockapoo.webp", name: "Cockapoo dog", species: "dog", path: "/images/breeds/dogs/cockapoo.webp" },
  { filename: "basset-hound.webp", name: "Basset Hound", species: "dog", path: "/images/breeds/dogs/basset-hound.webp" },
  { filename: "vizsla.webp", name: "Vizsla dog", species: "dog", path: "/images/breeds/dogs/vizsla.webp" },
  { filename: "rough-collie.webp", name: "Rough Collie dog", species: "dog", path: "/images/breeds/dogs/rough-collie.webp" },
  { filename: "smooth-collie.webp", name: "Smooth Collie dog", species: "dog", path: "/images/breeds/dogs/smooth-collie.webp" },
  { filename: "rhodesian-ridgeback.webp", name: "Rhodesian Ridgeback", species: "dog", path: "/images/breeds/dogs/rhodesian-ridgeback.webp" },
  { filename: "papillon.webp", name: "Papillon dog", species: "dog", path: "/images/breeds/dogs/papillon.webp" },
  { filename: "shiba-inu.webp", name: "Shiba Inu", species: "dog", path: "/images/breeds/dogs/shiba-inu.webp" },
  { filename: "black-and-tan-shiba-inu.webp", name: "Black and tan Shiba Inu", species: "dog", path: "/images/breeds/dogs/black-and-tan-shiba-inu.webp" },
  { filename: "west-highland-white-terrier.webp", name: "West Highland White Terrier", species: "dog", path: "/images/breeds/dogs/west-highland-white-terrier.webp" },
  { filename: "blue-heeler.webp", name: "Blue Heeler Australian Cattle Dog", species: "dog", path: "/images/breeds/dogs/blue-heeler.webp" },
  { filename: "red-heeler.webp", name: "Red Heeler Australian Cattle Dog", species: "dog", path: "/images/breeds/dogs/red-heeler.webp" },

  // CATS (16)
  { filename: "ragdoll-kitten.webp", name: "Ragdoll kitten", species: "cat", path: "/images/breeds/cats/ragdoll-kitten.webp" },
  { filename: "sphynx-cat.webp", name: "Sphynx cat", species: "cat", path: "/images/breeds/cats/sphynx-cat.webp" },
  { filename: "fat-sphynx-cat.webp", name: "Fat Sphynx cat", species: "cat", path: "/images/breeds/cats/fat-sphynx-cat.webp" },
  { filename: "baby-sphynx-cat.webp", name: "Baby Sphynx kitten", species: "cat", path: "/images/breeds/cats/baby-sphynx-cat.webp" },
  { filename: "russian-blue-cat.webp", name: "Russian Blue cat", species: "cat", path: "/images/breeds/cats/russian-blue-cat.webp" },
  { filename: "russian-blue-kitten.webp", name: "Russian Blue kitten", species: "cat", path: "/images/breeds/cats/russian-blue-kitten.webp" },
  { filename: "american-shorthair-tabby.webp", name: "American Shorthair tabby", species: "cat", path: "/images/breeds/cats/american-shorthair-tabby.webp" },
  { filename: "american-shorthair-kitten.webp", name: "American Shorthair kitten", species: "cat", path: "/images/breeds/cats/american-shorthair-kitten.webp" },
  { filename: "himalayan-cat.webp", name: "Himalayan cat", species: "cat", path: "/images/breeds/cats/himalayan-cat.webp" },
  { filename: "himalayan-kitten.webp", name: "Himalayan kitten", species: "cat", path: "/images/breeds/cats/himalayan-kitten.webp" },
  { filename: "turkish-angora-cat.webp", name: "Turkish Angora cat", species: "cat", path: "/images/breeds/cats/turkish-angora-cat.webp" },
  { filename: "turkish-angora-kitten.webp", name: "Turkish Angora kitten", species: "cat", path: "/images/breeds/cats/turkish-angora-kitten.webp" },
  { filename: "devon-rex-cat.webp", name: "Devon Rex cat", species: "cat", path: "/images/breeds/cats/devon-rex-cat.webp" },
  { filename: "egyptian-mau.webp", name: "Egyptian Mau cat", species: "cat", path: "/images/breeds/cats/egyptian-mau.webp" },
  { filename: "egyptian-mau-tabby-mix.webp", name: "Egyptian Mau tabby", species: "cat", path: "/images/breeds/cats/egyptian-mau-tabby-mix.webp" },
  { filename: "chartreux-cat.webp", name: "Chartreux cat", species: "cat", path: "/images/breeds/cats/chartreux-cat.webp" },
];
