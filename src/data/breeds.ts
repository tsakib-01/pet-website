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


  // ========================================================
  // LABRADOR RETRIEVER (DOG)
  // ========================================================
  {
    slug: "labrador-retriever",
    name: "Labrador Retriever",
    species: "dog",
    tagline: "America's favorite family retriever: outgoing, athletic, gentle-tempered, and highly trainable.",
    origin: "Newfoundland, Canada / United Kingdom",
    standardGroup: "AKC Sporting Group",
    heroImage: "/images/breeds/dogs/black-labrador.webp",
    heroImageAlt: "Black Labrador Retriever in alert posture",
    coatVariations: ["Yellow", "Black", "Chocolate", "Fox Red", "White", "Silver"],
    metrics: [
      { label: "Adult Weight", value: "55 \u2013 80 lbs", subtext: "Males: 65\u201380 lbs \u2022 Females: 55\u201370 lbs" },
      { label: "Standing Height", value: "21.5 \u2013 24.5 in", subtext: "Floor to shoulder withers" },
      { label: "Ideal Crate Size", value: "42-Inch Crate", subtext: "Large breed standard (+2 to 4\" buffer)" },
      { label: "Average Lifespan", value: "11 \u2013 13 Years", subtext: "Large canine life-stage pace" },
      { label: "Daily Calories", value: "1,200 \u2013 1,600 kcal", subtext: "WSAVA RER baseline for active adults" },
      { label: "Activity Level", value: "High Energy", subtext: "Needs 60+ min daily exercise & swimming" }
    ],
    calculatorLinks: [
      {
        title: "Labrador Retriever Human Age Calculator",
        description: "Calculate exact biological human age with AVMA dog life-stage scaling.",
        href: "/tools/dog-age-calculator",
        iconType: "dog",
        tag: "Age Milestone",
      },
      {
        title: "Labrador Retriever Ergonomic Sizing Matcher",
        description: "Determine exact dimensions to promote healthy posture and comfortable den rest.",
        href: "/tools/dog-crate-size-calculator",
        iconType: "box",
        tag: "Ergonomics",
      },
      {
        title: "Labrador Retriever Weight & Calorie Predictor",
        description: "Estimate adult weight curve and WSAVA daily caloric baseline for optimal body condition.",
        href: "/tools/puppy-weight-calculator",
        iconType: "scale",
        tag: "Growth & Nutrition",
      },
      {
        title: "Emergency Toxicity Triage",
        description: "Calculate immediate dosage triage if hazardous household toxins or plants are ingested.",
        href: "/tools/dog-chocolate-toxicity-calculator",
        iconType: "heartPulse",
        tag: "Emergency Safety",
      }
    ],
    healthRisks: [
      {
        name: "Canine Hip & Elbow Dysplasia",
        severity: "High Watch",
        description: "Abnormal joint development leading to degenerative arthritis.",
        actionableCare: "Screen parents via OFA/PennHIP before breeding; maintain lean BCS 4-5/9.",
      },
      {
        name: "Exercise-Induced Collapse (EIC)",
        severity: "High Watch",
        description: "Autosomal recessive mutation in DNM1 gene causing collapse during strenuous exertion.",
        actionableCare: "DNA test breeding stock; avoid intensive ball retrieval in warm weather.",
      },
      {
        name: "Progressive Retinal Atrophy (prcd-PRA)",
        severity: "Screening Advised",
        description: "Bilateral photoreceptor degeneration leading to progressive blindness.",
        actionableCare: "Annual veterinary ophthalmic screening (CERF/CAER exams).",
      }
    ],
    dietAndCareNotes:
      "Labradors possess a genetic mutation in the POMC gene associated with constant appetite and obesity predisposition. Strictly weigh meals using a gram scale and avoid free-feeding.",
    faqs: [
      {
        question: "What is the difference between English and American Labradors?",
        answer: "English (show/bench) Labradors are heavier, stockier, with wider heads and otter tails. American (field/working) Labradors are taller, leaner, with higher drive.",
      },
      {
        question: "Are Silver Labradors purebred?",
        answer: "The AKC registers Silver Labradors under Chocolate, but the silver coat arises from a dilute 'd' gene mutation, widely debated as originating from historical Weimaraner outcrosses.",
      },
      {
        question: "How much exercise does a Labrador puppy need daily?",
        answer: "Follow the 5-minute rule: 5 minutes of exercise per month of age twice daily to protect growing epiphyseal growth plates.",
      },
      {
        question: "Do Labradors shed heavily?",
        answer: "Yes. Labradors possess a dense water-repellent double coat that sheds year-round with twice-yearly heavy seasonal blowouts.",
      }
    ],
    temperament: {
      overview:
        "Renowned for their friendly, eager-to-please nature. Highly social pack animals that integrate seamlessly with children and other pets.",
      traits: [
        { label: "Affection with Family", score: 5, description: "Exceptionally devoted and human-focused." },
        { label: "Trainability & Focus", score: 5, description: "Top-tier intelligence; excels in obedience, retrieving, and service." },
        { label: "Energy & Drive", score: 4, description: "Athletic working drive requiring daily mental and physical stimulation." },
        { label: "Watchdog Instinct", score: 2, description: "Low guarding drive; welcomes strangers warmly." }
      ],
      familyCompatibility: "Outstanding with children of all ages and other pets. Their enthusiasm requires early impulse control training around toddlers.",
      trainingTips: "Use positive reinforcement retriever games and food puzzles. Early leash manners are vital before they reach 70+ lbs.",
    },
    colorGenetics: {
      overview:
        "Inheritance governed by the B (Black/Chocolate) and E (Extension/Yellow) epistatic gene loci.",
      coatType: "Dense, short, water-resistant double coat with coarse guard hairs.",
      palette: [
        { name: "Black", category: "Standard (Official)", description: "Dominant B_E_ genotype; traditional historic working coat." },
        { name: "Yellow", category: "Standard (Official)", description: "Homozygous recessive ee genotype, ranging from Fox Red to English Cream." },
        { name: "Chocolate", category: "Standard (Official)", description: "Homozygous recessive bbE_ genotype; rich liver to deep chocolate." }
      ],
      healthConsiderations: "Chocolate Labradors have an empirically documented median lifespan ~10% shorter than black/yellow counterparts according to UK VetCompass studies.",
    },
    growthMilestones: {
      overview:
        "Consistent nutritional checkpoints ensure proper skeletal and muscle growth.",
      stages: [
        { stage: "8 Weeks Checkpoint", timeline: "8 Weeks", benchmark: "11 \u2013 15 lbs", guidance: "Initial core vaccines and gradual transition to large-breed puppy formula." },
        { stage: "16 Weeks Checkpoint", timeline: "16 Weeks", benchmark: "28 \u2013 36 lbs", guidance: "Begin basic recall and retriever impulse control; monitor growth plates." },
        { stage: "6 Months Checkpoint", timeline: "6 Months", benchmark: "45 \u2013 58 lbs", guidance: "Reached roughly 65-70% of adult body weight; transition out of high jumping." },
        { stage: "Adult Benchmark", timeline: "14 \u2013 18 Months", benchmark: "55 \u2013 80 lbs", guidance: "Physiological skeletal maturity; safe to perform OFA clearance radiographs." }
      ],
    },
    sizeVarieties: {
      officialClassification: "AKC Sporting Dog Standard (21.5 to 24.5 inches at withers).",
      disclaimerTitle: "English (Bench) vs. American (Field) Classifications",
      disclaimerText:
        "While bench and field lines share the same breed standard, field lines are frequently leaner and taller, whereas bench lines carry heavier bone and broader muzzles.",
    },
    history: {
      summary:
        "Bred originally in Newfoundland from the St. John's Water Dog to retrieve fishermen's nets and duck game in freezing Atlantic surf.",
      milestones: [
        { era: "1800s", title: "St. John's Water Dog Roots", description: "Fishermen in Newfoundland bred cold-water swimming dogs with otter-like water-shedding tails." },
        { era: "1885", title: "British Nobility Patronage", description: "Earl of Malmesbury imported the dogs to Dorset, England, refining them into specialized waterfowl retrievers." },
        { era: "1917", title: "AKC Official Recognition", description: "Formally admitted to the AKC Stud Book, becoming the #1 most registered breed in US history for over 30 years." }
      ],
    },
    facts: [
      { title: "Webbed Paws & Otter Tail", detail: "Labradors possess anatomical webbing between their toes and an exceptionally powerful cylindrical tail that functions as a hydrodynamic rudder." },
      { title: "Soft Mouth Mastery", detail: "Bred to carry game without puncturing skin, a well-trained Labrador can hold an uncooked egg in its jaws without cracking it." },
      { title: "POMC Food Gene Mutation", detail: "Roughly 25% of Labradors carry a POMC gene deletion that disrupts brain satiation signaling, explaining their insatiable food drive." }
    ],
  },

  // ========================================================
  // GOLDEN RETRIEVER (DOG)
  // ========================================================
  {
    slug: "golden-retriever",
    name: "Golden Retriever",
    species: "dog",
    tagline: "Gentle, radiant, and endlessly patient: the consummate family retriever, guide dog, and athletic companion.",
    origin: "Scottish Highlands, United Kingdom",
    standardGroup: "AKC Sporting Group",
    heroImage: "/images/breeds/dogs/golden-retriever.webp",
    heroImageAlt: "Golden Retriever sitting in outdoor sunlight",
    coatVariations: ["Light Golden", "Golden", "Dark Golden", "English Cream", "Red"],
    metrics: [
      { label: "Adult Weight", value: "55 \u2013 75 lbs", subtext: "Males: 65\u201375 lbs \u2022 Females: 55\u201365 lbs" },
      { label: "Standing Height", value: "21.5 \u2013 24 in", subtext: "Floor to shoulder withers" },
      { label: "Ideal Crate Size", value: "42-Inch Crate", subtext: "Large sporting standard (+2 to 4\" buffer)" },
      { label: "Average Lifespan", value: "10 \u2013 12 Years", subtext: "Sporting canine life-stage pace" },
      { label: "Daily Calories", value: "1,150 \u2013 1,500 kcal", subtext: "WSAVA RER baseline for active adults" },
      { label: "Activity Level", value: "High Energy", subtext: "Needs 60+ min daily running, fetching, or hiking" }
    ],
    calculatorLinks: [
      {
        title: "Golden Retriever Human Age Calculator",
        description: "Calculate exact biological human age with AVMA dog life-stage scaling.",
        href: "/tools/dog-age-calculator",
        iconType: "dog",
        tag: "Age Milestone",
      },
      {
        title: "Golden Retriever Ergonomic Sizing Matcher",
        description: "Determine exact dimensions to promote healthy posture and comfortable den rest.",
        href: "/tools/dog-crate-size-calculator",
        iconType: "box",
        tag: "Ergonomics",
      },
      {
        title: "Golden Retriever Weight & Calorie Predictor",
        description: "Estimate adult weight curve and WSAVA daily caloric baseline for optimal body condition.",
        href: "/tools/puppy-weight-calculator",
        iconType: "scale",
        tag: "Growth & Nutrition",
      },
      {
        title: "Emergency Toxicity Triage",
        description: "Calculate immediate dosage triage if hazardous household toxins or plants are ingested.",
        href: "/tools/dog-chocolate-toxicity-calculator",
        iconType: "heartPulse",
        tag: "Emergency Safety",
      }
    ],
    healthRisks: [
      {
        name: "Hemangiosarcoma & Lymphoma",
        severity: "High Watch",
        description: "High hereditary incidence of endothelial and lymphoid malignancies in Golden lines.",
        actionableCare: "Bi-annual veterinary screening post-age 6; maintain lean body mass.",
      },
      {
        name: "Subvalvular Aortic Stenosis (SAS)",
        severity: "High Watch",
        description: "Congenital narrowing below the aortic valve creating cardiac murmur and left ventricular hypertrophy.",
        actionableCare: "Echocardiogram cardiac auscultation by board-certified veterinary cardiologist before breeding.",
      },
      {
        name: "Ichthyosis",
        severity: "Moderate",
        description: "Recessive PNPLA1 gene mutation causing large, dry, brown-black skin scales.",
        actionableCare: "DNA genetic test breeding stock; manage affected dogs with essential fatty acid rinses.",
      }
    ],
    dietAndCareNotes:
      "Golden Retrievers are prone to grain-free diet-associated Dilated Cardiomyopathy (DCM). Feed a nutritionally complete diet formulated by veterinary nutritionists meeting WSAVA guidelines.",
    faqs: [
      {
        question: "What is the difference between English Cream and American Golden Retrievers?",
        answer: "English Cream is a color descriptor for Golden Retrievers bred to the Kennel Club (UK) standard, which permits paler cream coats, broader skulls, and more level backs than the AKC standard.",
      },
      {
        question: "Are Red Goldens a separate breed?",
        answer: "No. Field-bred Golden Retrievers often exhibit a rich dark red or mahogany coat. They are purebred Golden Retrievers, typically slightly leaner with higher hunting drive.",
      },
      {
        question: "How often do Golden Retrievers need grooming?",
        answer: "Brush 3 to 4 times weekly with an undercoat rake and slicker brush to prevent feathering mats around ears, groin, and tail.",
      },
      {
        question: "Why do Golden Retrievers carry objects in their mouths?",
        answer: "Their genetic retrieving instinct compels them to hold toys, socks, or sticks when excited as a self-soothing and communicative behavior.",
      }
    ],
    temperament: {
      overview:
        "Celebrated for their affectionate, calm, and forgiving disposition. Naturally eager to please and trustworthy with small children and other animals.",
      traits: [
        { label: "Patience with Children", score: 5, description: "Top-tier family companion; gentle and tolerant." },
        { label: "Trainability", score: 5, description: "High working biddability; excels in search and rescue and therapy." },
        { label: "Stranger Friendliness", score: 5, description: "Welcomes visitors enthusiastically; not a guard dog." },
        { label: "Playfulness", score: 4, description: "Maintains puppy-like playfulness into senior years." }
      ],
      familyCompatibility: "Flourishes in active households where they are integrated into daily human activities.",
      trainingTips: "Responds best to gentle praise and positive rewards. Harsh corrections damage their sensitive, cooperative nature.",
    },
    colorGenetics: {
      overview:
        "Regulated by the pheomelanin intensity loci on top of a fixed homozygous recessive ee yellow coat.",
      coatType: "Dense, water-repellent double coat with rich feathering on legs, chest, and tail.",
      palette: [
        { name: "Light Golden / Cream", category: "Standard (Official)", description: "Pale luster coat popular in European lines." },
        { name: "Rich Golden", category: "Standard (Official)", description: "Classic shimmering honey-gold coat." },
        { name: "Dark Golden / Red", category: "Standard (Official)", description: "Deep copper-red shade common in field working lines." }
      ],
      healthConsiderations: "Lighter or darker shades carry no inherent genetic health differences; beware of breeders marketing 'rare white' at exorbitant markups.",
    },
    growthMilestones: {
      overview:
        "Consistent nutritional checkpoints ensure proper skeletal and muscle growth.",
      stages: [
        { stage: "8 Weeks Checkpoint", timeline: "8 Weeks", benchmark: "10 \u2013 14 lbs", guidance: "Socialize gently with novel textures and sounds; begin crate training." },
        { stage: "16 Weeks Checkpoint", timeline: "16 Weeks", benchmark: "26 \u2013 34 lbs", guidance: "Puppy obedience class; focus on soft-mouth bite inhibition." },
        { stage: "6 Months Checkpoint", timeline: "6 Months", benchmark: "42 \u2013 55 lbs", guidance: "Monitor adolescent growth; avoid high-impact jumping onto hard surfaces." },
        { stage: "Adult Benchmark", timeline: "14 \u2013 18 Months", benchmark: "55 \u2013 75 lbs", guidance: "Complete adult skeletal maturation and coat feathering." }
      ],
    },
    sizeVarieties: {
      officialClassification: "AKC Sporting Dog Standard (21.5 to 24 inches at shoulder).",
      disclaimerTitle: "Beware of 'Mini Golden Retrievers'",
      disclaimerText:
        "'Miniature Golden Retrievers' are not purebred Goldens; they are crossbreeds typically created with Cocker Spaniels or Poodles.",
    },
    history: {
      summary:
        "Developed in 1868 at Guisachan estate in Scotland by Lord Tweedmouth by crossing a yellow retriever with a Tweed Water Spaniel.",
      milestones: [
        { era: "1868", title: "Guisachan Foundation", description: "Lord Tweedmouth bred 'Nous' with 'Belle' to retrieve waterfowl in dense Scottish heather and lochs." },
        { era: "1911", title: "The Kennel Club (UK)", description: "Formally recognized as 'Retriever - Yellow or Golden'." },
        { era: "1925", title: "AKC Registration", description: "Admitted to the American Kennel Club Stud Book, becoming a premier companion globally." }
      ],
    },
    facts: [
      { title: "Lord Tweedmouth Stud Book", detail: "The breed's foundational breeding records were kept meticulously by Lord Tweedmouth and discovered in 1952." },
      { title: "#1 Guide & Service Dog", detail: "Due to their high biddability and gentle temperament, Goldens comprise a massive percentage of seeing-eye dogs." },
      { title: "Three Distinct Styles", detail: "Three variations exist: American, Canadian (taller and darker), and British (blockier with lighter cream hues)." }
    ],
  },

  // ========================================================
  // GERMAN SHEPHERD (DOG)
  // ========================================================
  {
    slug: "german-shepherd",
    name: "German Shepherd",
    species: "dog",
    tagline: "Noble, loyal, and extraordinarily versatile working canine: revered as the ultimate protector, service, and police dog.",
    origin: "Germany",
    standardGroup: "AKC Herding Group",
    heroImage: "/images/breeds/dogs/german-shepherd.webp",
    heroImageAlt: "German Shepherd dog in focused working stance",
    coatVariations: ["Black & Tan", "Sable", "Bi-Color", "Solid Black", "White", "Silver & Black"],
    metrics: [
      { label: "Adult Weight", value: "50 \u2013 90 lbs", subtext: "Males: 65\u201390 lbs \u2022 Females: 50\u201370 lbs" },
      { label: "Standing Height", value: "22 \u2013 26 in", subtext: "Floor to shoulder withers" },
      { label: "Ideal Crate Size", value: "42 or 48-Inch Crate", subtext: "Large herding standard (+2 to 4\" buffer)" },
      { label: "Average Lifespan", value: "9 \u2013 12 Years", subtext: "Large working canine pace" },
      { label: "Daily Calories", value: "1,300 \u2013 1,750 kcal", subtext: "WSAVA RER baseline for working adults" },
      { label: "Activity Level", value: "Very High Energy", subtext: "Needs 90+ min daily structured work and mental puzzles" }
    ],
    calculatorLinks: [
      {
        title: "German Shepherd Human Age Calculator",
        description: "Calculate exact biological human age with AVMA dog life-stage scaling.",
        href: "/tools/dog-age-calculator",
        iconType: "dog",
        tag: "Age Milestone",
      },
      {
        title: "German Shepherd Ergonomic Sizing Matcher",
        description: "Determine exact dimensions to promote healthy posture and comfortable den rest.",
        href: "/tools/dog-crate-size-calculator",
        iconType: "box",
        tag: "Ergonomics",
      },
      {
        title: "German Shepherd Weight & Calorie Predictor",
        description: "Estimate adult weight curve and WSAVA daily caloric baseline for optimal body condition.",
        href: "/tools/puppy-weight-calculator",
        iconType: "scale",
        tag: "Growth & Nutrition",
      },
      {
        title: "Emergency Toxicity Triage",
        description: "Calculate immediate dosage triage if hazardous household toxins or plants are ingested.",
        href: "/tools/dog-chocolate-toxicity-calculator",
        iconType: "heartPulse",
        tag: "Emergency Safety",
      }
    ],
    healthRisks: [
      {
        name: "Degenerative Myelopathy (DM)",
        severity: "High Watch",
        description: "Fatal neurodegenerative spinal cord disorder caused by SOD1 mutation resulting in progressive hindlimb paralysis.",
        actionableCare: "DNA screen breeding parents; physical rehabilitation for affected dogs.",
      },
      {
        name: "Gastric Dilatation-Volvulus (GDV / Bloat)",
        severity: "High Watch",
        description: "Deep-chested anatomy allows stomach to distend and twist on its mesenteric axis.",
        actionableCare: "Discuss preventive laparoscopic gastropexy with your veterinarian.",
      },
      {
        name: "Exocrine Pancreatic Insufficiency (EPI)",
        severity: "Moderate",
        description: "Atrophy of acinar cells causing failure to digest food and severe weight loss.",
        actionableCare: "Lifelong pancreatic enzyme replacement therapy (cTLI blood test).",
      }
    ],
    dietAndCareNotes:
      "German Shepherds have sensitive digestive tracts. Avoid sudden dietary transitions and limit post-meal strenuous running for at least 60 minutes to reduce GDV bloat risk.",
    faqs: [
      {
        question: "What is the difference between working line and show line German Shepherds?",
        answer: "Working lines possess straighter backs, compact frames, and extreme drive. Show lines feature more angulated roached toplines and lower drive.",
      },
      {
        question: "Are German Shepherds good with children?",
        answer: "When properly socialized and raised in a structured family environment, they are fiercely loyal and protective guardians of children.",
      },
      {
        question: "Why do German Shepherd ears take time to stand up?",
        answer: "Ear cartilage hardens gradually between 4 and 7 months, often drooping during the teething phase as calcium is diverted to teeth.",
      },
      {
        question: "How much do German Shepherds shed?",
        answer: "Known as 'German Shedders', they blow their dense undercoat twice annually and shed moderately year-round.",
      }
    ],
    temperament: {
      overview:
        "Aloof with strangers, fearless, exceptionally intelligent, and devoted to their handlers. They require a confident owner who provides calm leadership.",
      traits: [
        { label: "Loyalty & Devotion", score: 5, description: "Forms an unbreakable bond with primary handler." },
        { label: "Watchdog & Protection", score: 5, description: "Natural territorial and personal protection instinct." },
        { label: "Intelligence & Drive", score: 5, description: "Learns complex multi-step commands rapidly." },
        { label: "Need for Mental Work", score: 5, description: "Requires structured jobs to prevent boredom." }
      ],
      familyCompatibility: "Ideal for active, experienced owners who can provide daily mental engagement and leadership.",
      trainingTips: "Focus heavily on early neutral socialization with people and other dogs to channel guardian instincts constructively.",
    },
    colorGenetics: {
      overview:
        "Controlled by the Agouti (a) and Extension (E) series, creating rich saddle, sable, and solid phenotypes.",
      coatType: "Medium double coat with straight, harsh outer hair and dense undercoat.",
      palette: [
        { name: "Black & Tan", category: "Standard (Official)", description: "Classic saddle pattern with black mantle and rich tan legs." },
        { name: "Sable / Agouti", category: "Standard (Official)", description: "Banded hairs with black tips; the predominant color of working lines." },
        { name: "Solid Black", category: "Standard (Official)", description: "Recessive black (aa) mutation; sleek midnight coat." }
      ],
      healthConsiderations: "White German Shepherds carry an autosomal recessive gene; recognized as a distinct breed (Berger Blanc Suisse) in Europe.",
    },
    growthMilestones: {
      overview:
        "Consistent nutritional checkpoints ensure proper skeletal and muscle growth.",
      stages: [
        { stage: "8 Weeks Checkpoint", timeline: "8 Weeks", benchmark: "13 \u2013 19 lbs", guidance: "Start crate routine and bite inhibition; feed large breed puppy kibble." },
        { stage: "16 Weeks Checkpoint", timeline: "16 Weeks", benchmark: "32 \u2013 44 lbs", guidance: "Teething stage; ears may fluctuate between standing and floppy." },
        { stage: "6 Months Checkpoint", timeline: "6 Months", benchmark: "48 \u2013 65 lbs", guidance: "Adolescent phase begins; reinforce boundary obedience and loose-leash walking." },
        { stage: "Adult Benchmark", timeline: "18 \u2013 24 Months", benchmark: "50 \u2013 90 lbs", guidance: "Skeletal plates fused; evaluate OFA hip and elbow certifications." }
      ],
    },
    sizeVarieties: {
      officialClassification: "AKC Herding Dog Standard (22 to 26 inches at withers).",
      disclaimerTitle: "King Shepherd / Shiloh Shepherd Distinctions",
      disclaimerText:
        "Oversized 'King Shepherds' weighing over 100 lbs are distinct outcross creations not recognized by the AKC parent club.",
    },
    history: {
      summary:
        "Standardized in 1899 by Captain Max von Stephanitz from indigenous German herding varieties, emphasizing working utility.",
      milestones: [
        { era: "1899", title: "Von Stephanitz Standardization", description: "Captain Max von Stephanitz bought 'Hektor Linksrhein', creating the SV registry." },
        { era: "1914", title: "WWI Service", description: "Served as trench messengers and sentry guards in WWI, astounding Allied troops with their courage." },
        { era: "1920s", title: "Hollywood Stardom", description: "Rin Tin Tin popularized the breed globally, demonstrating their remarkable Hollywood acting trainability." }
      ],
    },
    facts: [
      { title: "Horand von Grafrath: Breed Father", detail: "All purebred German Shepherds trace their lineage directly back to Horand von Grafrath in 1899." },
      { title: "Bite Force Power", detail: "A full-grown German Shepherd possesses a bite force estimated at over 238 PSI." },
      { title: "Military Working Dog (MWD)", detail: "German Shepherds and Belgian Malinois make up the vast majority of military patrol dogs." }
    ],
  },

  // ========================================================
  // DACHSHUND (DOG)
  // ========================================================
  {
    slug: "dachshund",
    name: "Dachshund",
    species: "dog",
    tagline: "Iconic 'badger dog' with fearless hound tenacity, clever personality, and distinct low-slung chondrodystrophic silhouette.",
    origin: "Germany",
    standardGroup: "AKC Hound Group",
    heroImage: "/images/breeds/dogs/mini-dachshund.webp",
    heroImageAlt: "Miniature Dachshund sitting alertly",
    coatVariations: ["Smooth Coated", "Longhaired", "Wirehaired", "Red", "Black & Tan", "Dapple (Merle)", "Piebald"],
    metrics: [
      { label: "Adult Weight", value: "11 \u2013 32 lbs", subtext: "Miniature: Under 11 lbs \u2022 Standard: 16\u201332 lbs" },
      { label: "Standing Height", value: "5 \u2013 9 in", subtext: "Floor to withers" },
      { label: "Ideal Crate Size", value: "24 or 30-Inch Crate", subtext: "Small hound standard (+2 to 4\" buffer)" },
      { label: "Average Lifespan", value: "12 \u2013 16 Years", subtext: "Exceptional small-breed longevity" },
      { label: "Daily Calories", value: "350 \u2013 700 kcal", subtext: "WSAVA RER scaled to Miniature vs Standard" },
      { label: "Activity Level", value: "Moderate", subtext: "Short daily walks; protect spine from jumps" }
    ],
    calculatorLinks: [
      {
        title: "Dachshund Human Age Calculator",
        description: "Calculate exact biological human age with AVMA dog life-stage scaling.",
        href: "/tools/dog-age-calculator",
        iconType: "dog",
        tag: "Age Milestone",
      },
      {
        title: "Dachshund Ergonomic Sizing Matcher",
        description: "Determine exact dimensions to promote healthy posture and comfortable den rest.",
        href: "/tools/dog-crate-size-calculator",
        iconType: "box",
        tag: "Ergonomics",
      },
      {
        title: "Dachshund Weight & Calorie Predictor",
        description: "Estimate adult weight curve and WSAVA daily caloric baseline for optimal body condition.",
        href: "/tools/puppy-weight-calculator",
        iconType: "scale",
        tag: "Growth & Nutrition",
      },
      {
        title: "Emergency Toxicity Triage",
        description: "Calculate immediate dosage triage if hazardous household toxins or plants are ingested.",
        href: "/tools/dog-chocolate-toxicity-calculator",
        iconType: "heartPulse",
        tag: "Emergency Safety",
      }
    ],
    healthRisks: [
      {
        name: "IVDD (Intervertebral Disc Disease)",
        severity: "High Watch",
        description: "Type I disc herniation affects up to 25% of Dachshunds due to FGF4 retrogene duplication.",
        actionableCare: "Install ramps for beds/couches; prohibit high jumping; use harnesses instead of neck collars.",
      },
      {
        name: "Progressive Retinal Atrophy (crd-PRA)",
        severity: "Screening Advised",
        description: "Cone-rod dystrophy causing early retinal deterioration.",
        actionableCare: "DNA test breeding stock (RPGRIP1 gene test).",
      },
      {
        name: "Canine Acanthosis Nigricans",
        severity: "Moderate",
        description: "Primary hereditary hyperpigmentation and lichenification of axillary and groin skin.",
        actionableCare: "Veterinary antimicrobial shampoos and topical anti-inflammatory therapy.",
      }
    ],
    dietAndCareNotes:
      "Preventing obesity is a matter of life or paralysis for Dachshunds. Even 1 to 2 extra pounds drastically increases pressure on spinal intervertebral discs.",
    faqs: [
      {
        question: "What is the difference between a Mini and Standard Dachshund?",
        answer: "Miniatures weigh 11 pounds and under at 12 months. Standards weigh 16 to 32 pounds. Between 11 and 16 lbs is unofficially known as a 'tweenie'.",
      },
      {
        question: "Why are ramps necessary for Dachshunds?",
        answer: "Their long spine and short ribcage create severe biomechanical shearing forces when jumping off furniture, triggering disc rupture.",
      },
      {
        question: "Do Wirehaired Dachshunds shed less?",
        answer: "Wirehaired Dachshunds shed minimally but require hand-stripping twice a year to maintain harsh weatherproof coat texture.",
      },
      {
        question: "Are Dachshunds hard to housebreak?",
        answer: "They can be stubborn due to their independent hound nature and dislike of cold or wet weather; consistent crate training and positive rewards are key.",
      }
    ],
    temperament: {
      overview:
        "Spunky, tenacious, and affectionate with family. They possess a loud, resonant bark that belies their small size, inherited from their underground badger-hunting origins.",
      traits: [
        { label: "Loyalty & Bonding", score: 5, description: "Forms intense devotion to favorite family members." },
        { label: "Independence & Tenacity", score: 5, description: "Bred to work independently underground; strong-willed." },
        { label: "Vocal Watchdog", score: 4, description: "Quick to alert bark at unfamiliar sounds." },
        { label: "Burrowing Instinct", score: 5, description: "Loves to burrow into blankets, pillows, and sleeping bags." }
      ],
      familyCompatibility: "Best with older, respectful children who understand how to support both ends of their delicate spine when handling.",
      trainingTips: "Keep sessions short, fun, and food-rewarded. Never use physical force, which encourages stubborn resistance.",
    },
    colorGenetics: {
      overview:
        "Extensive palette regulated by Agouti, Extension, and Merle (Dapple) genetics across three coat varieties.",
      coatType: "Three distinct coat varieties: Smooth (short/shiny), Longhaired (sleek/feathered), and Wirehaired (harsh with beard).",
      palette: [
        { name: "Red", category: "Standard (Official)", description: "Clear red to deep mahogany; dominant base color." },
        { name: "Black & Tan", category: "Standard (Official)", description: "Classic hound pattern with rich tan points." },
        { name: "Dapple / Merle", category: "Exotic / Rare Mutation", description: "Silvery mottled patches over base coat via PMEL gene." }
      ],
      healthConsiderations: "Never breed two Dapples together (Double Dapple), as homozygous merle causes congenital deafness and microphthalmia (blindness).",
    },
    growthMilestones: {
      overview:
        "Consistent nutritional checkpoints ensure proper skeletal and muscle growth.",
      stages: [
        { stage: "8 Weeks Checkpoint", timeline: "8 Weeks", benchmark: "2.5 \u2013 4.5 lbs", guidance: "Handle gently; support chest and pelvis simultaneously." },
        { stage: "16 Weeks Checkpoint", timeline: "16 Weeks", benchmark: "6 \u2013 10 lbs", guidance: "Establish ramp training early before habits of couch jumping develop." },
        { stage: "6 Months Checkpoint", timeline: "6 Months", benchmark: "9 \u2013 18 lbs", guidance: "Miniatures approach adult skeletal frame; standards continue filling out." },
        { stage: "Adult Benchmark", timeline: "12 Months", benchmark: "11 \u2013 32 lbs", guidance: "Classified officially as Miniature (<11 lbs) or Standard (16-32 lbs)." }
      ],
    },
    sizeVarieties: {
      officialClassification: "AKC Hound Standard (Miniature: \u226411 lbs; Standard: 16\u201332 lbs).",
      disclaimerTitle: "The 'Tweenie' Designation",
      disclaimerText:
        "'Tweenie' is an affectionate colloquial term for purebred Dachshunds weighing between 12 and 15 pounds; they are shown in the Standard class in AKC rings.",
    },
    history: {
      summary:
        "Bred in Germany from the 15th century to hunt badgers (Dachs = badger; Hund = dog) by following them deep into subterranean burrows.",
      milestones: [
        { era: "1500s", title: "Subterranean Badger Specialists", description: "Foresters bred short-legged hounds with flap ears and loose skin to fight fierce badgers underground." },
        { era: "1885", title: "AKC Recognition", description: "One of the earliest breeds recognized by the American Kennel Club." },
        { era: "1972", title: "Waldi the Olympic Mascot", description: "A Dachshund named Waldi became the official mascot of the 1972 Munich Olympic Games." }
      ],
    },
    facts: [
      { title: "Deep Barrel Chest", detail: "Their massive ribcage houses enlarged lungs and heart to sustain stamina in oxygen-depleted underground tunnels." },
      { title: "Paddle-Shaped Paws", detail: "Their front paws rotate outward slightly and feature broad, shovel-like webbing built for rapid earth excavation." },
      { title: "Loud Hound Bay", detail: "Their deep bark allowed above-ground human hunters to locate their subterranean position through six feet of solid dirt." }
    ],
  },

  // ========================================================
  // STANDARD POODLE (DOG)
  // ========================================================
  {
    slug: "standard-poodle",
    name: "Standard Poodle",
    species: "dog",
    tagline: "Elegant, hypoallergenic athlete possessing world-class canine intelligence, gentle humor, and aristocratic grace.",
    origin: "Germany / France",
    standardGroup: "AKC Non-Sporting Group",
    heroImage: "/images/breeds/dogs/standard-poodle.webp",
    heroImageAlt: "Standard Poodle standing proudly with styled coat",
    coatVariations: ["Black", "White", "Apricot", "Silver", "Red", "Blue", "Parti-Color"],
    metrics: [
      { label: "Adult Weight", value: "45 \u2013 70 lbs", subtext: "Males: 60\u201370 lbs \u2022 Females: 45\u201360 lbs" },
      { label: "Standing Height", value: "Over 15 inches", subtext: "Typically 21\u201327 in at withers" },
      { label: "Ideal Crate Size", value: "42-Inch Crate", subtext: "Large non-sporting standard (+2 to 4\" buffer)" },
      { label: "Average Lifespan", value: "12 \u2013 15 Years", subtext: "Excellent large-breed longevity" },
      { label: "Daily Calories", value: "1,100 \u2013 1,450 kcal", subtext: "WSAVA RER baseline for active adults" },
      { label: "Activity Level", value: "High Energy", subtext: "Needs 60+ min daily exercise, swimming & mental work" }
    ],
    calculatorLinks: [
      {
        title: "Standard Poodle Human Age Calculator",
        description: "Calculate exact biological human age with AVMA dog life-stage scaling.",
        href: "/tools/dog-age-calculator",
        iconType: "dog",
        tag: "Age Milestone",
      },
      {
        title: "Standard Poodle Ergonomic Sizing Matcher",
        description: "Determine exact dimensions to promote healthy posture and comfortable den rest.",
        href: "/tools/dog-crate-size-calculator",
        iconType: "box",
        tag: "Ergonomics",
      },
      {
        title: "Standard Poodle Weight & Calorie Predictor",
        description: "Estimate adult weight curve and WSAVA daily caloric baseline for optimal body condition.",
        href: "/tools/puppy-weight-calculator",
        iconType: "scale",
        tag: "Growth & Nutrition",
      },
      {
        title: "Emergency Toxicity Triage",
        description: "Calculate immediate dosage triage if hazardous household toxins or plants are ingested.",
        href: "/tools/dog-chocolate-toxicity-calculator",
        iconType: "heartPulse",
        tag: "Emergency Safety",
      }
    ],
    healthRisks: [
      {
        name: "Addison's Disease (Hypoadrenocorticism)",
        severity: "High Watch",
        description: "Immune-mediated destruction of adrenal cortex causing lethargy, vomiting, and electrolyte crises.",
        actionableCare: "ACTH stimulation test for diagnosis; lifelong mineralocorticoid hormone replacement.",
      },
      {
        name: "Sebaceous Adenitis (SA)",
        severity: "Moderate",
        description: "Inflammatory destruction of sebaceous glands causing follicular hyperkeratosis and hair loss.",
        actionableCare: "Skin biopsy screening; managed with mineral oil soaks and topical antimicrobials.",
      },
      {
        name: "Gastric Dilatation-Volvulus (GDV)",
        severity: "High Watch",
        description: "Deep-chested structure predisposes to life-threatening stomach torsion.",
        actionableCare: "Preventive gastropexy strongly recommended during spay/neuter.",
      }
    ],
    dietAndCareNotes:
      "Standard Poodles have a high incidence of Addison's disease and GDV bloat. Provide balanced, easily digestible diets and avoid strenuous running around mealtimes.",
    faqs: [
      {
        question: "Are Poodles truly hypoallergenic?",
        answer: "Poodles possess a single-layer hair coat rather than double fur, shedding minimally and trapping dander, making them significantly better for allergy sufferers.",
      },
      {
        question: "What is the origin of the fancy Poodle haircut?",
        answer: "The traditional lion trim was functional: hair was shaved to reduce water drag while swimming, leaving puffs around joints and chest to protect vital organs from freezing water.",
      },
      {
        question: "How smart are Poodles compared to other dogs?",
        answer: "Ranked #2 smartest dog breed in Stanley Coren's canine intelligence trials, able to learn commands in under 5 repetitions.",
      },
      {
        question: "How often do Poodles need professional grooming?",
        answer: "Every 4 to 6 weeks for bathing, trimming, and ear cleaning to prevent painful coat matting.",
      }
    ],
    temperament: {
      overview:
        "Dignified, witty, and exceptionally people-oriented. They thrive on human companionship and can become anxious if left isolated for prolonged periods.",
      traits: [
        { label: "Canine Intelligence", score: 5, description: "Brilliant problem-solver; masters complex tasks effortlessly." },
        { label: "Hypoallergenic Coat", score: 5, description: "Minimal shedding; excellent for allergy-sensitive households." },
        { label: "Athletic Versatility", score: 5, description: "Excels in agility, obedience, dock diving, and retrieving." },
        { label: "Affection with Family", score: 5, description: "Warm, sensitive, and deeply bonded to owners." }
      ],
      familyCompatibility: "Superb with respectful children and multi-pet households; their athletic playfulness makes them wonderful outdoor partners.",
      trainingTips: "Use creative, varied training games. Poodles get bored quickly by endless mechanical repetition.",
    },
    colorGenetics: {
      overview:
        "Extensive single-color standard coat spectrum regulated by dilute, agouti, and pheomelanin alleles.",
      coatType: "Dense, harsh-textured curly hair coat with continuous growth (requires regular clipping).",
      palette: [
        { name: "Solid Black", category: "Standard (Official)", description: "Rich jet black with black points." },
        { name: "White", category: "Standard (Official)", description: "Pure sparkling white with dark pigment." },
        { name: "Apricot / Red", category: "Standard (Official)", description: "Warm golden-peach to deep cinnamon-red shades." }
      ],
      healthConsiderations: "Parti-colored poodles (two distinct colors) are recognized by UKC and historically purebred, though non-standard in traditional AKC conformation.",
    },
    growthMilestones: {
      overview:
        "Consistent nutritional checkpoints ensure proper skeletal and muscle growth.",
      stages: [
        { stage: "8 Weeks Checkpoint", timeline: "8 Weeks", benchmark: "9 \u2013 13 lbs", guidance: "Introduce daily gentle brushing and ear handling early to acclimate to grooming." },
        { stage: "16 Weeks Checkpoint", timeline: "16 Weeks", benchmark: "24 \u2013 32 lbs", guidance: "Begin intermediate obedience and swimming introductions." },
        { stage: "6 Months Checkpoint", timeline: "6 Months", benchmark: "38 \u2013 50 lbs", guidance: "Adolescent coat transition begins; brush daily to prevent puppy matting." },
        { stage: "Adult Benchmark", timeline: "15 \u2013 18 Months", benchmark: "45 \u2013 70 lbs", guidance: "Adult skeletal maturity; full curly adult coat texture established." }
      ],
    },
    sizeVarieties: {
      officialClassification: "AKC Standard Class (>15 inches at the highest point of withers).",
      disclaimerTitle: "Standard vs. Miniature vs. Toy",
      disclaimerText:
        "All three varieties share the identical AKC breed standard, differing solely in standing withers height: Toy (\u226410 in), Miniature (10\u201315 in), Standard (>15 in).",
    },
    history: {
      summary:
        "Originated in Germany as the 'Pudelhund' (puddle dog), specialized in retrieving downed ducks and waterfowl from icy lakes.",
      milestones: [
        { era: "1400s", title: "Water Duck Retrievers", description: "German hunters utilized water-loving dogs with dense curly coats that repelled lake water." },
        { era: "1700s", title: "French Aristocracy Adoptions", description: "Adopted by French royalty and styled into the national dog of France ('Caniche')." },
        { era: "1887", title: "AKC Recognition", description: "Admitted to the American Kennel Club Stud Book, becoming an enduring show ring champion." }
      ],
    },
    facts: [
      { title: "Name Means 'Puddle'", detail: "The German word 'Pudeln' means 'to splash in water', reflecting their waterfowl retriever lineage." },
      { title: "Truffle Hunting Specialists", detail: "Their keen olfactory senses led them to be used extensively in England and France to sniff out underground truffles." },
      { title: "No Undercoat", detail: "Unlike retrievers, Poodles have hair that grows continuously like human hair rather than seasonal shedding fur." }
    ],
  },

  // ========================================================
  // BEAGLE (DOG)
  // ========================================================
  {
    slug: "beagle",
    name: "Beagle",
    species: "dog",
    tagline: "Merry, sweet-tempered scent hound famous for boundless optimism, soulful brown eyes, and an insatiable nose.",
    origin: "United Kingdom",
    standardGroup: "AKC Hound Group",
    heroImage: "/images/breeds/dogs/beagle.webp",
    heroImageAlt: "Tricolor Beagle standing in alert sniffing pose",
    coatVariations: ["Tricolor (Black, White, Tan)", "Red & White", "Lemon & White", "Blue Tick", "Chocolate Tri"],
    metrics: [
      { label: "Adult Weight", value: "20 \u2013 30 lbs", subtext: "13-inch: Under 20 lbs \u2022 15-inch: 20\u201330 lbs" },
      { label: "Standing Height", value: "13 \u2013 15 in", subtext: "Two AKC size varieties" },
      { label: "Ideal Crate Size", value: "30-Inch Crate", subtext: "Medium hound standard (+2 to 4\" buffer)" },
      { label: "Average Lifespan", value: "12 \u2013 15 Years", subtext: "Robust small-to-medium canine pace" },
      { label: "Daily Calories", value: "650 \u2013 900 kcal", subtext: "WSAVA RER scaled to active adult weight" },
      { label: "Activity Level", value: "High Energy", subtext: "Needs 60+ min daily scent walks and yard play" }
    ],
    calculatorLinks: [
      {
        title: "Beagle Human Age Calculator",
        description: "Calculate exact biological human age with AVMA dog life-stage scaling.",
        href: "/tools/dog-age-calculator",
        iconType: "dog",
        tag: "Age Milestone",
      },
      {
        title: "Beagle Ergonomic Sizing Matcher",
        description: "Determine exact dimensions to promote healthy posture and comfortable den rest.",
        href: "/tools/dog-crate-size-calculator",
        iconType: "box",
        tag: "Ergonomics",
      },
      {
        title: "Beagle Weight & Calorie Predictor",
        description: "Estimate adult weight curve and WSAVA daily caloric baseline for optimal body condition.",
        href: "/tools/puppy-weight-calculator",
        iconType: "scale",
        tag: "Growth & Nutrition",
      },
      {
        title: "Emergency Toxicity Triage",
        description: "Calculate immediate dosage triage if hazardous household toxins or plants are ingested.",
        href: "/tools/dog-chocolate-toxicity-calculator",
        iconType: "heartPulse",
        tag: "Emergency Safety",
      }
    ],
    healthRisks: [
      {
        name: "Canine Epilepsy",
        severity: "Moderate",
        description: "Idiopathic seizures typically manifesting between 1 and 5 years of age.",
        actionableCare: "Neurological evaluation; managed with anticonvulsant medications like levetiracetam.",
      },
      {
        name: "Intervertebral Disc Disease (IVDD)",
        severity: "Moderate",
        description: "Chondrodystrophic spine genetics make discs prone to herniation.",
        actionableCare: "Maintain lean body weight and prevent excessive jumping.",
      },
      {
        name: "Hypothyroidism",
        severity: "Screening Advised",
        description: "Autoimmune thyroiditis leading to lethargy, weight gain, and bilateral symmetrical hair loss.",
        actionableCare: "Annual total T4 and free T4 blood panel; oral levothyroxine supplementation.",
      }
    ],
    dietAndCareNotes:
      "Beagles are consummate scavengers and notorious counter-surfers. Secure all trash cans and pantry cabinets, and measure food strictly on a gram scale.",
    faqs: [
      {
        question: "Can Beagles ever be walked off-leash safely?",
        answer: "Generally no. Beagles are scent-driven tracking hounds; once their nose locks onto a scent trail, selective hearing activates and they will follow it across roads.",
      },
      {
        question: "What is the Beagle 'bay'?",
        answer: "Beagles have three vocalizations: a standard bark, a mournful bay used while tracking game, and a howl when lonely or alerting.",
      },
      {
        question: "Why do Beagles have white-tipped tails?",
        answer: "Bred deliberately with a 'flag' tail so hunters on horseback could spot their hounds moving through tall grass and dense briars.",
      },
      {
        question: "Are Beagles good apartment dogs?",
        answer: "They can adapt to apartments if given sufficient daily scent walks, but their vocal baying can cause neighbor noise complaints if left understimulated.",
      }
    ],
    temperament: {
      overview:
        "Incurably merry, friendly, and pack-oriented. Bred to hunt in packs alongside other hounds, they thrive in family environments and dislike prolonged isolation.",
      traits: [
        { label: "Friendliness with Dogs", score: 5, description: "Inherent pack animal instincts; loves canine companionship." },
        { label: "Scent Drive", score: 5, description: "Over 220 million olfactory receptors; easily distracted by scents." },
        { label: "Affection with Family", score: 5, description: "Cuddly, warm, and exceptionally tolerant with children." },
        { label: "Vocal Expression", score: 4, description: "Bays, howls, and alerts enthusiastically." }
      ],
      familyCompatibility: "One of the absolute best breeds for active families with children; sturdy, playful, and non-aggressive.",
      trainingTips: "Use high-value smelly food treats (freeze-dried liver, cheese) to compete with environmental scent distractions.",
    },
    colorGenetics: {
      overview:
        "Governed by Piebald spotting alleles combined with Agouti black-and-tan and pheomelanin dilute genes.",
      coatType: "Close, hard, medium-length hound coat that repels burrs and rain.",
      palette: [
        { name: "Classic Tricolor", category: "Standard (Official)", description: "Black saddle, rich tan head and shoulders, crisp white trim." },
        { name: "Lemon & White", category: "Standard (Official)", description: "Pale straw-yellow to golden patches over white." },
        { name: "Red & White", category: "Standard (Official)", description: "Warm copper-red markings on white base." }
      ],
      healthConsiderations: "All colors must feature the signature white-tipped tail according to AKC and UK breed standards.",
    },
    growthMilestones: {
      overview:
        "Consistent nutritional checkpoints ensure proper skeletal and muscle growth.",
      stages: [
        { stage: "8 Weeks Checkpoint", timeline: "8 Weeks", benchmark: "4.5 \u2013 7 lbs", guidance: "Begin crate training and boundary safety; microchip immediately." },
        { stage: "16 Weeks Checkpoint", timeline: "16 Weeks", benchmark: "11 \u2013 15 lbs", guidance: "Reinforce recall commands on long training lines." },
        { stage: "6 Months Checkpoint", timeline: "6 Months", benchmark: "16 \u2013 22 lbs", guidance: "Monitor adolescent food scavenging; teach 'leave it' command." },
        { stage: "Adult Benchmark", timeline: "12 \u2013 15 Months", benchmark: "20 \u2013 30 lbs", guidance: "Classified into 13-inch (<20 lbs) or 15-inch (20-30 lbs) AKC class." }
      ],
    },
    sizeVarieties: {
      officialClassification: "Two official AKC varieties: 13-inch (\u226413 in) and 15-inch (13\u201315 in).",
      disclaimerTitle: "Pocket Beagles Reality Check",
      disclaimerText:
        "Historic 9-inch 'Pocket Beagles' favored by Queen Elizabeth I are extinct; modern breeders marketing 'Pocket Beagles' are selling runts or crossbreeds.",
    },
    history: {
      summary:
        "Refined in England in the 1830s by Reverend Phillip Honeywood, bred for 'beagling'\u2014hunting hares on foot for hunters without horses.",
      milestones: [
        { era: "1500s", title: "Tudor Pack Hounds", description: "English royalty kept small scent hounds small enough to fit in saddle panniers." },
        { era: "1830s", title: "Honeywood Foundation Pack", description: "Reverend Honeywood developed the modern compact tricolor beagle in Essex." },
        { era: "1885", title: "AKC Recognition", description: "Admitted to the AKC Stud Book, remaining one of America's top 10 most popular breeds for over 80 years." }
      ],
    },
    facts: [
      { title: "US Airport 'Beagle Brigade'", detail: "The USDA employs Beagles at international airports because their gentle demeanor doesn't alarm travelers while detecting prohibited agricultural products with 90%+ accuracy." },
      { title: "Snoopy's Breed", detail: "Charles Schulz's world-famous cartoon dog Snoopy is the most celebrated Beagle in pop culture history." },
      { title: "Ear Flap Aerodynamics", detail: "Their long drooping ear flaps act as miniature fans that scoop scent particles off the ground toward their nostrils as they run." }
    ],
  },

  // ========================================================
  // ROTTWEILER (DOG)
  // ========================================================
  {
    slug: "rottweiler",
    name: "Rottweiler",
    species: "dog",
    tagline: "Immensely powerful, steadfast guardian with ancient Roman drover ancestry, devoted loyalty, and calm self-assurance.",
    origin: "Rottweil, Germany",
    standardGroup: "AKC Working Group",
    heroImage: "/images/breeds/dogs/rottweiler.webp",
    heroImageAlt: "Rottweiler standing in alert, muscular profile",
    coatVariations: ["Black with Rust Markings", "Black with Mahogany Markings", "Black with Tan Markings"],
    metrics: [
      { label: "Adult Weight", value: "80 \u2013 135 lbs", subtext: "Males: 95\u2013135 lbs \u2022 Females: 80\u2013100 lbs" },
      { label: "Standing Height", value: "22 \u2013 27 in", subtext: "Floor to shoulder withers" },
      { label: "Ideal Crate Size", value: "48 or 54-Inch Crate", subtext: "Giant working standard (+2 to 4\" buffer)" },
      { label: "Average Lifespan", value: "9 \u2013 10 Years", subtext: "Giant breed canine pace" },
      { label: "Daily Calories", value: "1,500 \u2013 2,200 kcal", subtext: "WSAVA RER baseline for large working adults" },
      { label: "Activity Level", value: "Moderate to High", subtext: "Needs 60 min daily brisk walks, carting, or agility" }
    ],
    calculatorLinks: [
      {
        title: "Rottweiler Human Age Calculator",
        description: "Calculate exact biological human age with AVMA dog life-stage scaling.",
        href: "/tools/dog-age-calculator",
        iconType: "dog",
        tag: "Age Milestone",
      },
      {
        title: "Rottweiler Ergonomic Sizing Matcher",
        description: "Determine exact dimensions to promote healthy posture and comfortable den rest.",
        href: "/tools/dog-crate-size-calculator",
        iconType: "box",
        tag: "Ergonomics",
      },
      {
        title: "Rottweiler Weight & Calorie Predictor",
        description: "Estimate adult weight curve and WSAVA daily caloric baseline for optimal body condition.",
        href: "/tools/puppy-weight-calculator",
        iconType: "scale",
        tag: "Growth & Nutrition",
      },
      {
        title: "Emergency Toxicity Triage",
        description: "Calculate immediate dosage triage if hazardous household toxins or plants are ingested.",
        href: "/tools/dog-chocolate-toxicity-calculator",
        iconType: "heartPulse",
        tag: "Emergency Safety",
      }
    ],
    healthRisks: [
      {
        name: "Osteosarcoma (Bone Cancer)",
        severity: "High Watch",
        description: "High incidence of aggressive malignant bone tumors in appendicular skeleton.",
        actionableCare: "Monitor for sudden lameness; early veterinary radiographic evaluation.",
      },
      {
        name: "Subaortic Stenosis (SAS)",
        severity: "High Watch",
        description: "Fibrous ridge below aortic valve creating left ventricular pressure overload.",
        actionableCare: "OFA cardiac clearance with Doppler echocardiogram before breeding.",
      },
      {
        name: "Cranial Cruciate Ligament (CCL) Rupture",
        severity: "High Watch",
        description: "Heavy muscular frame puts extreme stress on stifle joint ligaments.",
        actionableCare: "Maintain lean Body Condition Score (BCS 4-5/9); consider TPLO surgical stabilization if ruptured.",
      }
    ],
    dietAndCareNotes:
      "Rottweilers grow rapidly during puppyhood. Feeding excess calories or calcium accelerates bone growth too fast, exacerbating hip/elbow dysplasia and osteochondritis dissecans (OCD).",
    faqs: [
      {
        question: "Are Rottweilers aggressive by nature?",
        answer: "No. A well-bred, properly socialized Rottweiler is calm, confident, and aloof, not nervously aggressive. Aggression stems from poor breeding, neglect, or lack of early socialization.",
      },
      {
        question: "Are Rottweilers good with children?",
        answer: "Yes, when raised with them and properly supervised. Their size requires teaching both dog and child respectful boundaries.",
      },
      {
        question: "What is a 'Roman Rottweiler'?",
        answer: "'Roman Rottweiler' is an unregulated marketing gimmick used by backyard breeders to sell morbidly obese or mastiff-cross dogs weighing over 150 lbs, which suffers from severe joint failure.",
      },
      {
        question: "Why were Rottweilers' tails traditionally docked?",
        answer: "Historically docked in working drover dogs to prevent tail injuries while herding cattle; docking is now prohibited in Germany and across Europe.",
      }
    ],
    temperament: {
      overview:
        "Calm, confident, courageous, and deeply devoted to their pack. They observe situations quietly before reacting, possessing an innate guardian instinct.",
      traits: [
        { label: "Guardian Instinct", score: 5, description: "Formidable protective instinct; defends territory naturally." },
        { label: "Loyalty & Affection", score: 5, description: "Affectionate 'leaner'; loves physical contact with family." },
        { label: "Confidence & Calmness", score: 4, description: "Self-assured; does not bark nervously without cause." },
        { label: "Working Drive", score: 4, description: "Excels in carting, tracking, and obedience work." }
      ],
      familyCompatibility: "Excellent for structured, experienced homes willing to provide lifelong leadership and positive training.",
      trainingTips: "Begin socialization on day one. Early leash manners and neutral reactions to strangers are mandatory for an animal that will weigh over 100 pounds.",
    },
    colorGenetics: {
      overview:
        "Fixed black base coat with strictly defined rich rust or mahogany markings over eyes, cheeks, chest, and legs.",
      coatType: "Medium double coat; coarse, flat outer coat with undercoat present on neck and thighs.",
      palette: [
        { name: "Black & Mahogany", category: "Standard (Official)", description: "Deep, rich mahogany-rust points on pitch black coat." },
        { name: "Black & Rust", category: "Standard (Official)", description: "Warm rust-colored defined points." },
        { name: "Black & Tan", category: "Standard (Official)", description: "Lighter tan points; standard conformation variation." }
      ],
      healthConsiderations: "Any other color (red, blue, albino) is a disqualification indicating crossbreeding with elevated health defects.",
    },
    growthMilestones: {
      overview:
        "Consistent nutritional checkpoints ensure proper skeletal and muscle growth.",
      stages: [
        { stage: "8 Weeks Checkpoint", timeline: "8 Weeks", benchmark: "15 \u2013 22 lbs", guidance: "Large breed puppy nutrition; ensure calcium-to-phosphorus ratio of 1.1:1." },
        { stage: "16 Weeks Checkpoint", timeline: "16 Weeks", benchmark: "38 \u2013 50 lbs", guidance: "Socialization window critical; expose to 100+ novel sights/sounds calmly." },
        { stage: "6 Months Checkpoint", timeline: "6 Months", benchmark: "60 \u2013 80 lbs", guidance: "Adolescent boundary testing; maintain strict rules on furniture and jumping." },
        { stage: "Adult Benchmark", timeline: "24 \u2013 36 Months", benchmark: "80 \u2013 135 lbs", guidance: "Slow-maturing giant breed; skeletal and muscular frame fills out until age 3." }
      ],
    },
    sizeVarieties: {
      officialClassification: "AKC Working Dog Standard (Males: 24\u201327 in; Females: 22\u201325 in).",
      disclaimerTitle: "Avoid Oversized 'Roman' Rottweilers",
      disclaimerText:
        "Breeding for oversized weights (140\u2013180 lbs) severely reduces lifespan and guarantees early-onset crippling hip dysplasia and heart failure.",
    },
    history: {
      summary:
        "Descended from Roman drover mastiffs that guarded Roman legion cattle herds across the Alps, settling in the German town of Rottweil.",
      milestones: [
        { era: "74 AD", title: "Roman Drover Origins", description: "Roman armies marched through southern Germany accompanied by drover dogs to manage and guard livestock herds." },
        { era: "1800s", title: "The Butcher's Dog of Rottweil", description: "Rottweil butchers used them ('Rottweiler Metzgerhund') to pull meat carts and guard money pouches tied around their necks." },
        { era: "1931", title: "AKC Recognition", description: "Officially admitted to the AKC Stud Book, later becoming one of the most respected police and family guardians." }
      ],
    },
    facts: [
      { title: "The Butcher's Money Bag", detail: "In medieval Germany, butchers tied their day's cash proceeds directly around their Rottweiler's neck, knowing no thief would dare approach." },
      { title: "The 'Rottie Lean'", detail: "Rottweilers have an endearing habit of leaning their full body weight against their humans' legs as a sign of affection and pack security." },
      { title: "First Police Dog Test", detail: "In 1910, the Rottweiler was officially designated as the 4th official police service dog breed in Germany." }
    ],
  },

  // ========================================================
  // SPHYNX (CAT)
  // ========================================================
  {
    slug: "sphynx",
    name: "Sphynx",
    species: "cat",
    tagline: "Endearingly hairless, extroverted feline marvel with peach-fuzz warmth, acrobat energy, and dog-like devotion.",
    origin: "Toronto, Canada",
    standardGroup: "CFA Championship Class",
    heroImage: "/images/breeds/cats/sphynx-cat.webp",
    heroImageAlt: "Hairless Sphynx cat looking curiously forward",
    coatVariations: ["Solid (Black, White, Blue, Red, Cream)", "Tortoiseshell", "Tabby Patterns", "Pointed (Sphynx-Colorpoint)"],
    metrics: [
      { label: "Adult Weight", value: "6 \u2013 12 lbs", subtext: "Males: 8\u201312 lbs \u2022 Females: 6\u20139 lbs" },
      { label: "Standing Height", value: "8 \u2013 10 in", subtext: "Fine-boned, muscular body" },
      { label: "Litter Box Size", value: "Standard Feline Carrier", subtext: "Keep insulated with warm fleece" },
      { label: "Average Lifespan", value: "12 \u2013 15 Years", subtext: "AAFP feline longevity standard" },
      { label: "Daily Calories", value: "280 \u2013 380 kcal", subtext: "High metabolism; burns calories to stay warm" },
      { label: "Coat Care", value: "High Energy", subtext: "Loves climbing cat trees, riding shoulders, and chasing toys" }
    ],
    calculatorLinks: [
      {
        title: "Sphynx Human Age Calculator",
        description: "Calculate exact biological human age with AVMA cat life-stage scaling.",
        href: "/tools/cat-age-calculator",
        iconType: "cat",
        tag: "Age Milestone",
      },
      {
        title: "Sphynx Ergonomic Sizing Matcher",
        description: "Determine exact dimensions to promote healthy posture and comfortable den rest.",
        href: "/tools/cat-litter-box-size-calculator",
        iconType: "box",
        tag: "Ergonomics",
      },
      {
        title: "Sphynx Weight & Calorie Predictor",
        description: "Estimate adult weight curve and WSAVA daily caloric baseline for optimal body condition.",
        href: "/tools/cat-calorie-calculator",
        iconType: "scale",
        tag: "Growth & Nutrition",
      },
      {
        title: "Emergency Toxicity Triage",
        description: "Calculate immediate dosage triage if hazardous household toxins or plants are ingested.",
        href: "/tools/cat-toxicity-calculator",
        iconType: "heartPulse",
        tag: "Emergency Safety",
      }
    ],
    healthRisks: [
      {
        name: "Hypertrophic Cardiomyopathy (HCM)",
        severity: "High Watch",
        description: "Thickening of the left ventricular heart muscle; the leading genetic cause of feline cardiac death.",
        actionableCare: "Annual echocardiogram screening by board-certified veterinary cardiologist before breeding.",
      },
      {
        name: "Urticaria Pigmentosa",
        severity: "Moderate",
        description: "Mast cell infiltration creating crusty, hyperpigmented macules on the skin.",
        actionableCare: "Topical veterinary steroid creams and oral antihistamines.",
      },
      {
        name: "Sebum Accumulation & Malassezia Yeast",
        severity: "Moderate",
        description: "Absence of hair allows body oils to pool in skin folds and nail beds.",
        actionableCare: "Weekly warm-water baths with gentle chlorhexidine/ketoconazole veterinary shampoo.",
      }
    ],
    dietAndCareNotes:
      "Sphynx cats have a significantly higher basal metabolic rate than furred cats because they lose body heat continuously. Feed high-protein, calorie-dense feline diets.",
    faqs: [
      {
        question: "Are Sphynx cats completely hairless?",
        answer: "No. Most have fine, downy peach fuzz over their skin, particularly on the bridge of the nose, ears, toes, and tail tip, feeling like a warm suede jacket.",
      },
      {
        question: "Are Sphynx cats hypoallergenic?",
        answer: "No! Cat allergies are caused by the Fel d 1 protein in feline saliva, sebum, and urine\u2014not hair. Sphynx cats produce normal Fel d 1 and can trigger allergic reactions.",
      },
      {
        question: "How often do Sphynx cats need baths?",
        answer: "Typically every 1 to 2 weeks. Without fur to absorb skin oils, sebum builds up on skin and rubs off onto furniture and clothing.",
      },
      {
        question: "Do Sphynx cats get cold easily?",
        answer: "Yes. Their body skin temperature feels hot to the touch (101.5\u00b0F\u2013102.5\u00b0F) because heat radiates directly off bare skin. Provide heated pet beds and winter sweaters.",
      }
    ],
    temperament: {
      overview:
        "Outrageously affectionate, curious, and clownish. Known as 'part cat, part dog, part monkey, and part child' due to their hyper-social personality.",
      traits: [
        { label: "Affection with Humans", score: 5, description: "Loves lap cuddles, sleeping under duvet blankets, and shoulder-perching." },
        { label: "Playfulness & Energy", score: 5, description: "Acrobatic jumper; plays fetch and explores high shelves." },
        { label: "Friendliness with Other Pets", score: 5, description: "Extremely social; often cuddles with dogs and other cats for warmth." },
        { label: "Grooming Maintenance", score: 5, description: "Requires weekly baths, ear cleaning, and nail bed wiping." }
      ],
      familyCompatibility: "Wonderful in busy, loving households. They hate being alone and thrive when paired with another pet.",
      trainingTips: "Easily clicker-trained using meat treats; can learn to sit, fetch, and walk on a feline chest harness.",
    },
    colorGenetics: {
      overview:
        "Pigment patterns are displayed directly on the skin leather, mirroring fur genetics (points, tabbies, solids).",
      coatType: "Apparent hairlessness; fine downy fuzz with characteristic wrinkled skin on forehead and shoulders.",
      palette: [
        { name: "Solid Black / Blue", category: "Standard (Official)", description: "Dark slate-grey to jet-black skin pigment." },
        { name: "Pink / White", category: "Standard (Official)", description: "Pale peach-toned skin leather." },
        { name: "Tortoiseshell / Calico", category: "Standard (Official)", description: "Mottled black, cream, and red skin patches." }
      ],
      healthConsiderations: "Sun exposure causes severe sunburn and solar dermatosis; strictly indoor living with UV window film recommended.",
    },
    growthMilestones: {
      overview:
        "Consistent nutritional checkpoints ensure proper skeletal and muscle growth.",
      stages: [
        { stage: "8 Weeks Checkpoint", timeline: "8 Weeks", benchmark: "1.5 \u2013 2.5 lbs", guidance: "Acclimate kitten gently to warm baths, nail wiping, and ear cleaning." },
        { stage: "16 Weeks Checkpoint", timeline: "16 Weeks", benchmark: "3.5 \u2013 5 lbs", guidance: "High caloric intake required; provide warm heated bed zones." },
        { stage: "6 Months Checkpoint", timeline: "6 Months", benchmark: "5 \u2013 8 lbs", guidance: "Baseline echocardiogram screen for HCM; monitor skin oil levels." },
        { stage: "Adult Benchmark", timeline: "12 Months", benchmark: "6 \u2013 12 lbs", guidance: "Muscular pot-bellied 'barrel' appearance is normal and healthy for the breed." }
      ],
    },
    sizeVarieties: {
      officialClassification: "CFA Medium Feline Standard (Muscular, medium-boned torso with barrel chest).",
      disclaimerTitle: "The Normal 'Pot Belly'",
      disclaimerText:
        "The Sphynx standard specifies a full, rounded abdomen as if having just eaten a large meal; this is normal anatomical breed conformation, not obesity.",
    },
    history: {
      summary:
        "Bred in Toronto, Canada in 1966 when a domestic cat named Elizabeth gave birth to a hairless male kitten named Prune, identified as a spontaneous recessive mutation in the KRT71 keratin gene.",
      milestones: [
        { era: "1966", title: "Prune the Pioneer", description: "A black-and-white domestic cat in Toronto produced 'Prune', the first recorded modern hairless kitten." },
        { era: "1975", title: "Wadena, Minnesota Foundation", description: "Farm cat 'Jezabelle' birthed hairless kittens 'Epidermis' and 'Dermis', establishing the American bloodline." },
        { era: "2002", title: "CFA Championship Status", description: "The Cat Fanciers' Association officially accepted the Sphynx for championship competition." }
      ],
    },
    facts: [
      { title: "Feels Like a Warm Peach", detail: "Petting a Sphynx feels like handling a warm chamois leather cloth or a hot, ripe peach." },
      { title: "KRT71 Keratin Gene", detail: "Their hairlessness is caused by a naturally occurring recessive mutation in the keratin 71 gene that disrupts the hair shaft root structure." },
      { title: "Earwax Buildup", detail: "Without ear hairs to filter dust, Sphynx cats produce dark brown earwax that requires weekly gentle cleaning." }
    ],
  }
];

export interface BreedImageAsset {
  filename: string;
  name: string;
  species: "dog" | "cat";
  path: string;
  slug: string;
  breedSlug: string;
}

export const ALL_BREED_IMAGES: BreedImageAsset[] = [
  { filename: "french-bulldog.webp", name: "French Bulldog", species: "dog", path: "/images/breeds/dogs/french-bulldog.webp", slug: "french-bulldog", breedSlug: "french-bulldog" },
  { filename: "fluffy-french-bulldog.webp", name: "Fluffy French Bulldog", species: "dog", path: "/images/breeds/dogs/fluffy-french-bulldog.webp", slug: "fluffy-french-bulldog", breedSlug: "french-bulldog" },
  { filename: "french-bulldog-puppies.webp", name: "French Bulldog puppies", species: "dog", path: "/images/breeds/dogs/french-bulldog-puppies.webp", slug: "french-bulldog-puppies", breedSlug: "french-bulldog" },
  { filename: "merle-french-bulldog.webp", name: "Merle French Bulldog", species: "dog", path: "/images/breeds/dogs/merle-french-bulldog.webp", slug: "merle-french-bulldog", breedSlug: "french-bulldog" },
  { filename: "blue-french-bulldog.webp", name: "Blue French Bulldog", species: "dog", path: "/images/breeds/dogs/blue-french-bulldog.webp", slug: "blue-french-bulldog", breedSlug: "french-bulldog" },
  { filename: "lilac-french-bulldog.webp", name: "Lilac French Bulldog", species: "dog", path: "/images/breeds/dogs/lilac-french-bulldog.webp", slug: "lilac-french-bulldog", breedSlug: "french-bulldog" },
  { filename: "black-french-bulldog.webp", name: "Black French Bulldog", species: "dog", path: "/images/breeds/dogs/black-french-bulldog.webp", slug: "black-french-bulldog", breedSlug: "french-bulldog" },
  { filename: "black-french-bulldog-puppy.webp", name: "Black French Bulldog puppy", species: "dog", path: "/images/breeds/dogs/black-french-bulldog-puppy.webp", slug: "black-french-bulldog-puppy", breedSlug: "french-bulldog" },
  { filename: "labrador-puppy.webp", name: "Yellow Labrador puppy", species: "dog", path: "/images/breeds/dogs/labrador-puppy.webp", slug: "labrador-puppy", breedSlug: "labrador-retriever" },
  { filename: "black-labrador.webp", name: "Black Labrador Retriever", species: "dog", path: "/images/breeds/dogs/black-labrador.webp", slug: "black-labrador", breedSlug: "labrador-retriever" },
  { filename: "fox-red-labrador.webp", name: "Fox Red Labrador", species: "dog", path: "/images/breeds/dogs/fox-red-labrador.webp", slug: "fox-red-labrador", breedSlug: "labrador-retriever" },
  { filename: "white-labrador.webp", name: "White Labrador Retriever", species: "dog", path: "/images/breeds/dogs/white-labrador.webp", slug: "white-labrador", breedSlug: "labrador-retriever" },
  { filename: "labrador-mix.webp", name: "Labrador mix dog", species: "dog", path: "/images/breeds/dogs/labrador-mix.webp", slug: "labrador-mix", breedSlug: "labrador-retriever" },
  { filename: "golden-retriever.webp", name: "Golden Retriever", species: "dog", path: "/images/breeds/dogs/golden-retriever.webp", slug: "golden-retriever", breedSlug: "golden-retriever" },
  { filename: "golden-retriever-puppy.webp", name: "Golden Retriever puppy", species: "dog", path: "/images/breeds/dogs/golden-retriever-puppy.webp", slug: "golden-retriever-puppy", breedSlug: "golden-retriever" },
  { filename: "mini-golden-retriever.webp", name: "Mini Golden Retriever", species: "dog", path: "/images/breeds/dogs/mini-golden-retriever.webp", slug: "mini-golden-retriever", breedSlug: "golden-retriever" },
  { filename: "english-cream-golden-retriever.webp", name: "English Cream Golden Retriever", species: "dog", path: "/images/breeds/dogs/english-cream-golden-retriever.webp", slug: "english-cream-golden-retriever", breedSlug: "golden-retriever" },
  { filename: "red-golden-retriever.webp", name: "Red Golden Retriever", species: "dog", path: "/images/breeds/dogs/red-golden-retriever.webp", slug: "red-golden-retriever", breedSlug: "golden-retriever" },
  { filename: "black-golden-retriever.webp", name: "Black Golden Retriever", species: "dog", path: "/images/breeds/dogs/black-golden-retriever.webp", slug: "black-golden-retriever", breedSlug: "golden-retriever" },
  { filename: "german-shepherd.webp", name: "German Shepherd", species: "dog", path: "/images/breeds/dogs/german-shepherd.webp", slug: "german-shepherd", breedSlug: "german-shepherd" },
  { filename: "old-german-shepherd.webp", name: "Old German Shepherd dog", species: "dog", path: "/images/breeds/dogs/old-german-shepherd.webp", slug: "old-german-shepherd", breedSlug: "german-shepherd" },
  { filename: "german-shepherd-training.webp", name: "German Shepherd training", species: "dog", path: "/images/breeds/dogs/german-shepherd-training.webp", slug: "german-shepherd-training", breedSlug: "german-shepherd" },
  { filename: "black-german-shepherd.webp", name: "Black German Shepherd", species: "dog", path: "/images/breeds/dogs/black-german-shepherd.webp", slug: "black-german-shepherd", breedSlug: "german-shepherd" },
  { filename: "white-german-shepherd.webp", name: "White German Shepherd", species: "dog", path: "/images/breeds/dogs/white-german-shepherd.webp", slug: "white-german-shepherd", breedSlug: "german-shepherd" },
  { filename: "mini-dachshund.webp", name: "Mini Dachshund", species: "dog", path: "/images/breeds/dogs/mini-dachshund.webp", slug: "mini-dachshund", breedSlug: "dachshund" },
  { filename: "long-haired-dachshund.webp", name: "Long haired Dachshund", species: "dog", path: "/images/breeds/dogs/long-haired-dachshund.webp", slug: "long-haired-dachshund", breedSlug: "dachshund" },
  { filename: "wire-haired-dachshund.webp", name: "Wire haired Dachshund", species: "dog", path: "/images/breeds/dogs/wire-haired-dachshund.webp", slug: "wire-haired-dachshund", breedSlug: "dachshund" },
  { filename: "dapple-dachshund.webp", name: "Dapple Dachshund", species: "dog", path: "/images/breeds/dogs/dapple-dachshund.webp", slug: "dapple-dachshund", breedSlug: "dachshund" },
  { filename: "dachshund-puppies.webp", name: "Dachshund puppies", species: "dog", path: "/images/breeds/dogs/dachshund-puppies.webp", slug: "dachshund-puppies", breedSlug: "dachshund" },
  { filename: "standard-poodle.webp", name: "Standard Poodle", species: "dog", path: "/images/breeds/dogs/standard-poodle.webp", slug: "standard-poodle", breedSlug: "standard-poodle" },
  { filename: "mini-poodle.webp", name: "Mini Poodle", species: "dog", path: "/images/breeds/dogs/mini-poodle.webp", slug: "mini-poodle", breedSlug: "standard-poodle" },
  { filename: "teacup-poodle.webp", name: "Teacup Poodle", species: "dog", path: "/images/breeds/dogs/teacup-poodle.webp", slug: "teacup-poodle", breedSlug: "standard-poodle" },
  { filename: "moyen-poodle.webp", name: "Moyen Poodle", species: "dog", path: "/images/breeds/dogs/moyen-poodle.webp", slug: "moyen-poodle", breedSlug: "standard-poodle" },
  { filename: "shih-poo.webp", name: "Shih Tzu Poodle mix", species: "dog", path: "/images/breeds/dogs/shih-poo.webp", slug: "shih-poo", breedSlug: "shih-tzu" },
  { filename: "beagle.webp", name: "Beagle dog", species: "dog", path: "/images/breeds/dogs/beagle.webp", slug: "beagle", breedSlug: "beagle" },
  { filename: "beagle-puppy.webp", name: "Beagle puppy", species: "dog", path: "/images/breeds/dogs/beagle-puppy.webp", slug: "beagle-puppy", breedSlug: "beagle" },
  { filename: "lemon-beagle.webp", name: "Lemon Beagle", species: "dog", path: "/images/breeds/dogs/lemon-beagle.webp", slug: "lemon-beagle", breedSlug: "beagle" },
  { filename: "beagle-mix.webp", name: "Beagle mix dog", species: "dog", path: "/images/breeds/dogs/beagle-mix.webp", slug: "beagle-mix", breedSlug: "beagle" },
  { filename: "rottweiler.webp", name: "Rottweiler", species: "dog", path: "/images/breeds/dogs/rottweiler.webp", slug: "rottweiler", breedSlug: "rottweiler" },
  { filename: "baby-rottweiler.webp", name: "Rottweiler puppy", species: "dog", path: "/images/breeds/dogs/baby-rottweiler.webp", slug: "baby-rottweiler", breedSlug: "rottweiler" },
  { filename: "rottweiler-pitbull-mix.webp", name: "Rottweiler Pitbull mix", species: "dog", path: "/images/breeds/dogs/rottweiler-pitbull-mix.webp", slug: "rottweiler-pitbull-mix", breedSlug: "rottweiler" },
  { filename: "shepweiler-mix.webp", name: "German Shepherd Rottweiler mix", species: "dog", path: "/images/breeds/dogs/shepweiler-mix.webp", slug: "shepweiler-mix", breedSlug: "shepweiler-mix" },
  { filename: "roman-rottweiler.webp", name: "Large Rottweiler dog", species: "dog", path: "/images/breeds/dogs/roman-rottweiler.webp", slug: "roman-rottweiler", breedSlug: "rottweiler" },
  { filename: "german-shorthaired-pointer.webp", name: "German Shorthaired Pointer", species: "dog", path: "/images/breeds/dogs/german-shorthaired-pointer.webp", slug: "german-shorthaired-pointer", breedSlug: "german-shorthaired-pointer" },
  { filename: "gsp-puppy.webp", name: "German Shorthaired Pointer puppy", species: "dog", path: "/images/breeds/dogs/gsp-puppy.webp", slug: "gsp-puppy", breedSlug: "german-shorthaired-pointer" },
  { filename: "black-gsp.webp", name: "Black German Shorthaired Pointer", species: "dog", path: "/images/breeds/dogs/black-gsp.webp", slug: "black-gsp", breedSlug: "german-shorthaired-pointer" },
  { filename: "american-bulldog.webp", name: "American Bulldog", species: "dog", path: "/images/breeds/dogs/american-bulldog.webp", slug: "american-bulldog", breedSlug: "american-bulldog" },
  { filename: "olde-english-bulldog.webp", name: "Olde English Bulldogge", species: "dog", path: "/images/breeds/dogs/olde-english-bulldog.webp", slug: "olde-english-bulldog", breedSlug: "olde-english-bulldog" },
  { filename: "yorkshire-terrier.webp", name: "Yorkshire Terrier", species: "dog", path: "/images/breeds/dogs/yorkshire-terrier.webp", slug: "yorkshire-terrier", breedSlug: "yorkshire-terrier" },
  { filename: "yorkshire-terrier-puppy.webp", name: "Yorkshire Terrier puppy", species: "dog", path: "/images/breeds/dogs/yorkshire-terrier-puppy.webp", slug: "yorkshire-terrier-puppy", breedSlug: "yorkshire-terrier" },
  { filename: "australian-shepherd.webp", name: "Australian Shepherd", species: "dog", path: "/images/breeds/dogs/australian-shepherd.webp", slug: "australian-shepherd", breedSlug: "australian-shepherd" },
  { filename: "mini-australian-shepherd.webp", name: "Mini Australian Shepherd", species: "dog", path: "/images/breeds/dogs/mini-australian-shepherd.webp", slug: "mini-australian-shepherd", breedSlug: "miniature-american-shepherd" },
  { filename: "blue-merle-australian-shepherd.webp", name: "Blue Merle Australian Shepherd", species: "dog", path: "/images/breeds/dogs/blue-merle-australian-shepherd.webp", slug: "blue-merle-australian-shepherd", breedSlug: "australian-shepherd" },
  { filename: "red-merle-australian-shepherd.webp", name: "Red Merle Australian Shepherd", species: "dog", path: "/images/breeds/dogs/red-merle-australian-shepherd.webp", slug: "red-merle-australian-shepherd", breedSlug: "australian-shepherd" },
  { filename: "border-aussie-mix.webp", name: "Border Collie Australian Shepherd mix", species: "dog", path: "/images/breeds/dogs/border-aussie-mix.webp", slug: "border-aussie-mix", breedSlug: "border-collie" },
  { filename: "doberman-pinscher.webp", name: "Doberman Pinscher", species: "dog", path: "/images/breeds/dogs/doberman-pinscher.webp", slug: "doberman-pinscher", breedSlug: "doberman-pinscher" },
  { filename: "red-doberman.webp", name: "Red Doberman Pinscher", species: "dog", path: "/images/breeds/dogs/red-doberman.webp", slug: "red-doberman", breedSlug: "doberman-pinscher" },
  { filename: "blue-doberman.webp", name: "Blue Doberman Pinscher", species: "dog", path: "/images/breeds/dogs/blue-doberman.webp", slug: "blue-doberman", breedSlug: "doberman-pinscher" },
  { filename: "mini-pinscher.webp", name: "Miniature Pinscher", species: "dog", path: "/images/breeds/dogs/mini-pinscher.webp", slug: "mini-pinscher", breedSlug: "mini-pinscher" },
  { filename: "doberman-puppy.webp", name: "Doberman puppy", species: "dog", path: "/images/breeds/dogs/doberman-puppy.webp", slug: "doberman-puppy", breedSlug: "doberman-pinscher" },
  { filename: "pembroke-welsh-corgi.webp", name: "Pembroke Welsh Corgi", species: "dog", path: "/images/breeds/dogs/pembroke-welsh-corgi.webp", slug: "pembroke-welsh-corgi", breedSlug: "pembroke-welsh-corgi" },
  { filename: "boxer-dog.webp", name: "Boxer dog", species: "dog", path: "/images/breeds/dogs/boxer-dog.webp", slug: "boxer-dog", breedSlug: "boxer-dog" },
  { filename: "boxer-puppies.webp", name: "Boxer puppies", species: "dog", path: "/images/breeds/dogs/boxer-puppies.webp", slug: "boxer-puppies", breedSlug: "boxer-dog" },
  { filename: "pomeranian.webp", name: "Pomeranian dog", species: "dog", path: "/images/breeds/dogs/pomeranian.webp", slug: "pomeranian", breedSlug: "pomeranian" },
  { filename: "white-pomeranian.webp", name: "White Pomeranian", species: "dog", path: "/images/breeds/dogs/white-pomeranian.webp", slug: "white-pomeranian", breedSlug: "pomeranian" },
  { filename: "black-pomeranian.webp", name: "Black Pomeranian", species: "dog", path: "/images/breeds/dogs/black-pomeranian.webp", slug: "black-pomeranian", breedSlug: "pomeranian" },
  { filename: "pomsky-mix.webp", name: "Pomsky puppy", species: "dog", path: "/images/breeds/dogs/pomsky-mix.webp", slug: "pomsky-mix", breedSlug: "siberian-husky" },
  { filename: "bernese-mountain-dog.webp", name: "Bernese Mountain Dog", species: "dog", path: "/images/breeds/dogs/bernese-mountain-dog.webp", slug: "bernese-mountain-dog", breedSlug: "bernese-mountain-dog" },
  { filename: "bernedoodle.webp", name: "Bernedoodle", species: "dog", path: "/images/breeds/dogs/bernedoodle.webp", slug: "bernedoodle", breedSlug: "bernese-mountain-dog" },
  { filename: "shih-tzu.webp", name: "Shih Tzu dog", species: "dog", path: "/images/breeds/dogs/shih-tzu.webp", slug: "shih-tzu", breedSlug: "shih-tzu" },
  { filename: "shih-tzu-puppy.webp", name: "Shih Tzu puppy", species: "dog", path: "/images/breeds/dogs/shih-tzu-puppy.webp", slug: "shih-tzu-puppy", breedSlug: "shih-tzu" },
  { filename: "malshi.webp", name: "Maltese Shih Tzu mix", species: "dog", path: "/images/breeds/dogs/malshi.webp", slug: "malshi", breedSlug: "shih-tzu" },
  { filename: "great-dane.webp", name: "Great Dane dog", species: "dog", path: "/images/breeds/dogs/great-dane.webp", slug: "great-dane", breedSlug: "great-dane" },
  { filename: "harlequin-great-dane.webp", name: "Harlequin Great Dane", species: "dog", path: "/images/breeds/dogs/harlequin-great-dane.webp", slug: "harlequin-great-dane", breedSlug: "great-dane" },
  { filename: "black-great-dane.webp", name: "Black Great Dane", species: "dog", path: "/images/breeds/dogs/black-great-dane.webp", slug: "black-great-dane", breedSlug: "great-dane" },
  { filename: "boston-terrier.webp", name: "Boston Terrier", species: "dog", path: "/images/breeds/dogs/boston-terrier.webp", slug: "boston-terrier", breedSlug: "boston-terrier" },
  { filename: "blue-boston-terrier.webp", name: "Blue Boston Terrier", species: "dog", path: "/images/breeds/dogs/blue-boston-terrier.webp", slug: "blue-boston-terrier", breedSlug: "boston-terrier" },
  { filename: "deer-head-chihuahua.webp", name: "Deer head Chihuahua", species: "dog", path: "/images/breeds/dogs/deer-head-chihuahua.webp", slug: "deer-head-chihuahua", breedSlug: "deer-head-chihuahua" },
  { filename: "havanese.webp", name: "Havanese dog", species: "dog", path: "/images/breeds/dogs/havanese.webp", slug: "havanese", breedSlug: "havanese" },
  { filename: "border-collie.webp", name: "Border Collie", species: "dog", path: "/images/breeds/dogs/border-collie.webp", slug: "border-collie", breedSlug: "border-collie" },
  { filename: "red-border-collie.webp", name: "Red Border Collie", species: "dog", path: "/images/breeds/dogs/red-border-collie.webp", slug: "red-border-collie", breedSlug: "border-collie" },
  { filename: "bordoodle.webp", name: "Border Collie Poodle mix", species: "dog", path: "/images/breeds/dogs/bordoodle.webp", slug: "bordoodle", breedSlug: "border-collie" },
  { filename: "english-springer-spaniel.webp", name: "English Springer Spaniel", species: "dog", path: "/images/breeds/dogs/english-springer-spaniel.webp", slug: "english-springer-spaniel", breedSlug: "english-springer-spaniel" },
  { filename: "miniature-american-shepherd.webp", name: "Miniature American Shepherd", species: "dog", path: "/images/breeds/dogs/miniature-american-shepherd.webp", slug: "miniature-american-shepherd", breedSlug: "miniature-american-shepherd" },
  { filename: "siberian-husky.webp", name: "Siberian Husky", species: "dog", path: "/images/breeds/dogs/siberian-husky.webp", slug: "siberian-husky", breedSlug: "siberian-husky" },
  { filename: "white-siberian-husky.webp", name: "White Siberian Husky", species: "dog", path: "/images/breeds/dogs/white-siberian-husky.webp", slug: "white-siberian-husky", breedSlug: "siberian-husky" },
  { filename: "red-siberian-husky.webp", name: "Red Siberian Husky", species: "dog", path: "/images/breeds/dogs/red-siberian-husky.webp", slug: "red-siberian-husky", breedSlug: "siberian-husky" },
  { filename: "brittany-dog.webp", name: "Brittany dog breed", species: "dog", path: "/images/breeds/dogs/brittany-dog.webp", slug: "brittany-dog", breedSlug: "brittany-dog" },
  { filename: "belgian-malinois.webp", name: "Belgian Malinois", species: "dog", path: "/images/breeds/dogs/belgian-malinois.webp", slug: "belgian-malinois", breedSlug: "belgian-malinois" },
  { filename: "black-belgian-malinois.webp", name: "Black Belgian Malinois", species: "dog", path: "/images/breeds/dogs/black-belgian-malinois.webp", slug: "black-belgian-malinois", breedSlug: "belgian-malinois" },
  { filename: "cocker-spaniel-puppy.webp", name: "Cocker Spaniel puppy", species: "dog", path: "/images/breeds/dogs/cocker-spaniel-puppy.webp", slug: "cocker-spaniel-puppy", breedSlug: "cocker-spaniel" },
  { filename: "black-cocker-spaniel.webp", name: "Black Cocker Spaniel", species: "dog", path: "/images/breeds/dogs/black-cocker-spaniel.webp", slug: "black-cocker-spaniel", breedSlug: "cocker-spaniel" },
  { filename: "cockapoo.webp", name: "Cockapoo dog", species: "dog", path: "/images/breeds/dogs/cockapoo.webp", slug: "cockapoo", breedSlug: "cockapoo" },
  { filename: "basset-hound.webp", name: "Basset Hound", species: "dog", path: "/images/breeds/dogs/basset-hound.webp", slug: "basset-hound", breedSlug: "basset-hound" },
  { filename: "vizsla.webp", name: "Vizsla dog", species: "dog", path: "/images/breeds/dogs/vizsla.webp", slug: "vizsla", breedSlug: "vizsla" },
  { filename: "rough-collie.webp", name: "Rough Collie dog", species: "dog", path: "/images/breeds/dogs/rough-collie.webp", slug: "rough-collie", breedSlug: "rough-collie" },
  { filename: "smooth-collie.webp", name: "Smooth Collie dog", species: "dog", path: "/images/breeds/dogs/smooth-collie.webp", slug: "smooth-collie", breedSlug: "rough-collie" },
  { filename: "rhodesian-ridgeback.webp", name: "Rhodesian Ridgeback", species: "dog", path: "/images/breeds/dogs/rhodesian-ridgeback.webp", slug: "rhodesian-ridgeback", breedSlug: "rhodesian-ridgeback" },
  { filename: "papillon.webp", name: "Papillon dog", species: "dog", path: "/images/breeds/dogs/papillon.webp", slug: "papillon", breedSlug: "papillon" },
  { filename: "shiba-inu.webp", name: "Shiba Inu", species: "dog", path: "/images/breeds/dogs/shiba-inu.webp", slug: "shiba-inu", breedSlug: "shiba-inu" },
  { filename: "black-and-tan-shiba-inu.webp", name: "Black and tan Shiba Inu", species: "dog", path: "/images/breeds/dogs/black-and-tan-shiba-inu.webp", slug: "black-and-tan-shiba-inu", breedSlug: "shiba-inu" },
  { filename: "west-highland-white-terrier.webp", name: "West Highland White Terrier", species: "dog", path: "/images/breeds/dogs/west-highland-white-terrier.webp", slug: "west-highland-white-terrier", breedSlug: "west-highland-white-terrier" },
  { filename: "blue-heeler.webp", name: "Blue Heeler Australian Cattle Dog", species: "dog", path: "/images/breeds/dogs/blue-heeler.webp", slug: "blue-heeler", breedSlug: "australian-cattle-dog" },
  { filename: "red-heeler.webp", name: "Red Heeler Australian Cattle Dog", species: "dog", path: "/images/breeds/dogs/red-heeler.webp", slug: "red-heeler", breedSlug: "australian-cattle-dog" },
  { filename: "ragdoll-kitten.webp", name: "Ragdoll kitten", species: "cat", path: "/images/breeds/cats/ragdoll-kitten.webp", slug: "ragdoll-kitten", breedSlug: "ragdoll" },
  { filename: "sphynx-cat.webp", name: "Sphynx cat", species: "cat", path: "/images/breeds/cats/sphynx-cat.webp", slug: "sphynx-cat", breedSlug: "sphynx" },
  { filename: "fat-sphynx-cat.webp", name: "Fat Sphynx cat", species: "cat", path: "/images/breeds/cats/fat-sphynx-cat.webp", slug: "fat-sphynx-cat", breedSlug: "sphynx" },
  { filename: "baby-sphynx-cat.webp", name: "Baby Sphynx kitten", species: "cat", path: "/images/breeds/cats/baby-sphynx-cat.webp", slug: "baby-sphynx-cat", breedSlug: "sphynx" },
  { filename: "russian-blue-cat.webp", name: "Russian Blue cat", species: "cat", path: "/images/breeds/cats/russian-blue-cat.webp", slug: "russian-blue-cat", breedSlug: "russian-blue" },
  { filename: "russian-blue-kitten.webp", name: "Russian Blue kitten", species: "cat", path: "/images/breeds/cats/russian-blue-kitten.webp", slug: "russian-blue-kitten", breedSlug: "russian-blue" },
  { filename: "american-shorthair-tabby.webp", name: "American Shorthair tabby", species: "cat", path: "/images/breeds/cats/american-shorthair-tabby.webp", slug: "american-shorthair-tabby", breedSlug: "american-shorthair" },
  { filename: "american-shorthair-kitten.webp", name: "American Shorthair kitten", species: "cat", path: "/images/breeds/cats/american-shorthair-kitten.webp", slug: "american-shorthair-kitten", breedSlug: "american-shorthair" },
  { filename: "himalayan-cat.webp", name: "Himalayan cat", species: "cat", path: "/images/breeds/cats/himalayan-cat.webp", slug: "himalayan-cat", breedSlug: "himalayan" },
  { filename: "himalayan-kitten.webp", name: "Himalayan kitten", species: "cat", path: "/images/breeds/cats/himalayan-kitten.webp", slug: "himalayan-kitten", breedSlug: "himalayan" },
  { filename: "turkish-angora-cat.webp", name: "Turkish Angora cat", species: "cat", path: "/images/breeds/cats/turkish-angora-cat.webp", slug: "turkish-angora-cat", breedSlug: "turkish-angora" },
  { filename: "turkish-angora-kitten.webp", name: "Turkish Angora kitten", species: "cat", path: "/images/breeds/cats/turkish-angora-kitten.webp", slug: "turkish-angora-kitten", breedSlug: "turkish-angora" },
  { filename: "devon-rex-cat.webp", name: "Devon Rex cat", species: "cat", path: "/images/breeds/cats/devon-rex-cat.webp", slug: "devon-rex-cat", breedSlug: "devon-rex" },
  { filename: "egyptian-mau.webp", name: "Egyptian Mau cat", species: "cat", path: "/images/breeds/cats/egyptian-mau.webp", slug: "egyptian-mau", breedSlug: "egyptian-mau" },
  { filename: "egyptian-mau-tabby-mix.webp", name: "Egyptian Mau tabby", species: "cat", path: "/images/breeds/cats/egyptian-mau-tabby-mix.webp", slug: "egyptian-mau-tabby-mix", breedSlug: "egyptian-mau" },
  { filename: "chartreux-cat.webp", name: "Chartreux cat", species: "cat", path: "/images/breeds/cats/chartreux-cat.webp", slug: "chartreux-cat", breedSlug: "chartreux" }
];

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
      { label: isDog ? "Ideal Crate Size" : "Litter Box Sizing", value: isDog ? '36-Inch Crate' : 'Large (20"+ Length)', subtext: "Ergonomic comfort sizing" },
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
