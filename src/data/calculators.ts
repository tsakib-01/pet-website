export interface CalculatorTool {
  slug: string;
  name: string;
  shortTitle: string;
  category: "dog" | "cat" | "pet";
  iconName: string;
  tagline: string;
  description: string;
  authority: string;
  badge?: string;
  volume?: string;
  competition?: string;
  faqs: { question: string; answer: string }[];
}

export const CALCULATOR_TOOLS: CalculatorTool[] = [
  {
    slug: "dog-age-calculator",
    name: "Dog Age Calculator",
    shortTitle: "Dog Age",
    category: "dog",
    iconName: "Dog",
    tagline: "Calculate your dog's true human age with veterinary life-stage precision.",
    description: "Move beyond the obsolete '7-year rule'. This calculator uses official AVMA and AAHA canine life-stage guidelines scaled by your dog's adult weight class to provide an accurate biological human age equivalent.",
    authority: "American Veterinary Medical Association (AVMA) & AAHA Canine Life Stage Guidelines",
    volume: "10k+",
    competition: "Easy",
    faqs: [
      {
        question: "Why is the 7-year rule for dogs inaccurate?",
        answer: "The 7-year rule assumes linear aging across all breeds. In reality, dogs age rapidly in their first two years (reaching roughly 24 human years by age 2) and their aging rate thereafter diverges dramatically based on breed size: small dogs age slower (around 4 human years/year) while giant breeds age significantly faster (7 to 8 human years/year)."
      },
      {
        question: "When is a dog officially considered a senior?",
        answer: "According to veterinary standards, small and toy breeds enter senior status around 8 to 9 years old. Medium breeds reach senior status around age 7, and giant breeds (like Great Danes or Mastiffs) are considered seniors at 5 to 6 years old."
      }
    ]
  },
  {
    slug: "dog-name-generator",
    name: "Dog Name Generator",
    shortTitle: "Dog Names",
    category: "dog",
    iconName: "Dog",
    tagline: "Discover high-recall canine names crafted with acoustic auditory science.",
    description: "Canine behavioral studies show dogs respond fastest to one- or two-syllable names featuring sharp stop consonants. Filter by gender, vibe, breed size, and phonetic rhythm.",
    authority: "Canine Behavioral & Auditory Cognition Studies",
    volume: "1k+",
    competition: "Easy",
    faqs: [
      {
        question: "What makes a dog name easy for dogs to learn?",
        answer: "Veterinary behaviorists recommend one- or two-syllable names that begin with crisp, hard consonants such as K, T, P, D, or B. These sounds produce a distinct acoustic spike that cuts through background noise and commands attention."
      },
      {
        question: "Should I avoid names that sound like commands?",
        answer: "Yes. Names that rhyme with common commands—like 'Bo' (No), 'Kit' (Sit), or 'Fletch' (Fetch)—frequently cause confusion during obedience training."
      }
    ]
  },
  {
    slug: "dog-crate-size-calculator",
    name: "Dog Crate Size Calculator",
    shortTitle: "Crate Sizing",
    category: "dog",
    iconName: "Shield",
    tagline: "Find the exact ergonomic crate dimensions for safety, comfort, and potty training.",
    description: "Calculate standard crate dimensions (length, height, and width) based on your dog's anatomical nose-to-tail and standing ear height, verified by AKC guidelines.",
    authority: "American Kennel Club (AKC) & Association of Professional Dog Trainers (APDT)",
    volume: "1k+",
    competition: "Easy",
    faqs: [
      {
        question: "How much extra space does a dog need in a crate?",
        answer: "A properly fitted crate provides 2 to 4 inches of clearance above the dog's head/ears when standing, and 2 to 4 inches of extra length beyond their nose to base-of-tail measurement. Excess room encourages puppies to eliminate in a corner."
      },
      {
        question: "Should I buy a full-size crate for a puppy?",
        answer: "Yes, but only if the crate comes with an adjustable divider panel. Sizing the space to their current puppy size prevents bathroom accidents while saving you from purchasing multiple crates as they grow."
      }
    ]
  },
  {
    slug: "cat-age-calculator",
    name: "Cat Age Calculator",
    shortTitle: "Cat Age",
    category: "cat",
    iconName: "Cat",
    tagline: "Convert feline chronological age to accurate biological human years.",
    description: "Based on the American Association of Feline Practitioners (AAFP) life stage standards: 15 years in Year 1, 9 years in Year 2, and exactly 4 human years per calendar year thereafter.",
    authority: "American Association of Feline Practitioners (AAFP) & AAHA Feline Life Stage Guidelines",
    volume: "1k+",
    competition: "Medium",
    faqs: [
      {
        question: "How fast do cats age compared to humans?",
        answer: "A one-year-old cat is developmentally equivalent to a 15-year-old human teenager. By age two, a cat reaches full young adult maturity equivalent to roughly 24 human years. Each additional calendar year equals approximately 4 human years."
      },
      {
        question: "What are the 6 feline life stages?",
        answer: "The AAFP recognizes: Kitten (0-6 months), Junior (7 months - 2 years), Prime (3-6 years), Mature (7-10 years), Senior (11-14 years), and Geriatric (15+ years)."
      }
    ]
  },
  {
    slug: "cat-name-generator",
    name: "Cat Name Generator",
    shortTitle: "Cat Names",
    category: "cat",
    iconName: "Cat",
    tagline: "Generate melodic feline names based on coat patterns, personality, and pitch.",
    description: "Cats respond best to high-frequency vowels and sibilant sounds. Filter names by gender, coat color, and personality archetype.",
    authority: "Feline Behavioral & Phonetic Research",
    volume: "1k+",
    competition: "Easy",
    faqs: [
      {
        question: "Do cats actually recognize their own names?",
        answer: "Yes. Scientific studies published in Nature Scientific Reports demonstrate that domestic cats distinguish their own names from other general words and phonetically similar names based on acoustic pitch."
      }
    ]
  },
  {
    slug: "cat-years-to-human-calculator",
    name: "Cat Years to Human Years Calculator",
    shortTitle: "Cat to Human",
    category: "cat",
    iconName: "Cat",
    tagline: "Explore biological feline development, milestones, and health checklists.",
    description: "Interactive feline lifespan converter mapping your cat's exact birthday to human physiological age, organ function milestones, and preventive veterinary screenings.",
    authority: "AAFP Feline Senior Care Guidelines",
    volume: "1k+",
    competition: "Easy",
    faqs: [
      {
        question: "At what age should senior feline screening begin?",
        answer: "Veterinarians recommend bi-annual senior wellness exams starting at age 7 (mature adulthood / 44 human years), including blood pressure checks, urinalysis, and thyroid (T4) panels."
      }
    ]
  },
  {
    slug: "pet-name-generator",
    name: "Pet Name Generator",
    shortTitle: "Pet Names",
    category: "pet",
    iconName: "PawPrint",
    tagline: "All-in-one smart name generator for dogs, cats, rabbits, and exotic companions.",
    description: "Explore curated name databases organized by mythology, food, nature, royalty, and vintage classics with instant syllable and origin insights.",
    authority: "Pet Nomenclature & Linguistic Database",
    volume: "1k+",
    competition: "Easy",
    faqs: [
      {
        question: "Can I use the same name generator for different pet species?",
        answer: "Yes. While acoustic training rules apply primarily to dogs and cats, our generator categorizes names by aesthetic, mythology, nature, and personality for any companion pet."
      }
    ]
  },
  {
    slug: "dog-chocolate-toxicity-calculator",
    name: "Dog Chocolate Toxicity Calculator",
    shortTitle: "Chocolate Toxicity",
    category: "dog",
    iconName: "AlertTriangle",
    tagline: "Instant veterinary toxicology assessment based on theobromine concentration.",
    description: "Calculate exact theobromine and caffeine dosage (mg/kg) based on chocolate type, amount ingested, and dog weight. Provides immediate medical severity triage.",
    authority: "Merck Veterinary Manual & ASPCA Animal Poison Control Center (APCC)",
    volume: "1k+",
    competition: "Easy",
    faqs: [
      {
        question: "Why is chocolate toxic to dogs?",
        answer: "Chocolate contains methylxanthines—specifically theobromine and caffeine—which dogs metabolize far slower than humans. It stimulates the central nervous system and cardiovascular system, leading to potentially fatal arrhythmias and seizures."
      },
      {
        question: "Which type of chocolate is the most dangerous?",
        answer: "Unsweetened baker's chocolate and dry cocoa powder are by far the most dangerous, containing 400 to 800 mg of theobromine per ounce. Milk chocolate contains roughly 60 mg/oz, and white chocolate has negligible amounts."
      }
    ]
  },
  {
    slug: "puppy-vaccination-schedule",
    name: "Puppy Vaccination Schedule",
    shortTitle: "Vaccine Schedule",
    category: "dog",
    iconName: "Calendar",
    tagline: "Personalized veterinary immunization timeline from 6 weeks to adult booster.",
    description: "Generate a custom vaccination calendar based on your puppy's birthdate following the official AAHA Canine Vaccination Guidelines for Core and Lifestyle vaccines.",
    authority: "American Animal Hospital Association (AAHA) Canine Vaccination Guidelines",
    volume: "1k+",
    competition: "Easy",
    faqs: [
      {
        question: "What are the core vaccines for puppies?",
        answer: "Core vaccines are medically recommended for all dogs regardless of lifestyle: Canine Distemper, Adenovirus-2 (Hepatitis), Parvovirus, Parainfluenza (DHPP), and Rabies."
      },
      {
        question: "When is it safe for a puppy to go to dog parks and public sidewalks?",
        answer: "Veterinarians strongly recommend waiting until 10 to 14 days after their final 16-week core booster to ensure maternal antibody interference has cleared and full immunity is active."
      }
    ]
  },
  {
    slug: "dog-pregnancy-calculator",
    name: "Dog Pregnancy Calculator",
    shortTitle: "Dog Gestation",
    category: "dog",
    iconName: "HeartPulse",
    tagline: "Track canine gestation milestones, ultrasound dates, and whelping countdown.",
    description: "Calculate your dam's estimated whelping date (63 days standard gestation) and detailed calendar milestones for fetal heartbeats, skeletal calcification, and nesting.",
    authority: "Veterinary Reproduction & Canine Obstetrics Standards",
    volume: "1k+",
    competition: "Easy",
    faqs: [
      {
        question: "How long is a dog pregnant?",
        answer: "The average gestation period for dogs is 63 days from ovulation, though healthy normal delivery can occur anywhere between day 58 and day 68."
      },
      {
        question: "How can I tell when whelping is about to begin?",
        answer: "A drop in the dam's rectal temperature below 99°F (37.2°C)—measured twice daily during the final week—consistently indicates that labor will commence within 12 to 24 hours."
      }
    ]
  },
  {
    slug: "cat-pregnancy-calculator",
    name: "Cat Pregnancy Calculator",
    shortTitle: "Cat Gestation",
    category: "cat",
    iconName: "HeartPulse",
    tagline: "Calculate feline gestation timeline, kitten development, and delivery dates.",
    description: "Feline gestation tracking based on standard 63–65 day queens' reproductive timelines, highlighting palpation windows, ultrasound confirmation, and nesting care.",
    authority: "Feline Obstetrics & Reproductive Veterinary Guidelines",
    volume: "100+",
    competition: "Easy",
    faqs: [
      {
        question: "How long is a queen pregnant?",
        answer: "The normal gestation period for cats is approximately 63 to 65 days, with a normal range extending from 61 to 72 days."
      },
      {
        question: "What are early physical signs of cat pregnancy?",
        answer: "Around day 21, the queen's nipples often enlarge and turn a vivid rosy pink ('pinking-up'), followed by gradual abdominal distention and increased nesting affection."
      }
    ]
  },
  {
    slug: "cat-food-calculator-wet-and-dry",
    name: "Cat Food Calculator Wet and Dry",
    shortTitle: "Cat Food Ratio",
    category: "cat",
    iconName: "Utensils",
    tagline: "Calculate daily caloric requirements and split meals between wet cans and dry kibble.",
    description: "Scientifically compute your cat's Resting Energy Requirement (RER) and Maintenance Energy Requirement (MER) using WSAVA guidelines, splitting exact portions by ratio.",
    authority: "World Small Animal Veterinary Association (WSAVA) Global Nutrition Guidelines",
    volume: "100+",
    competition: "Easy",
    faqs: [
      {
        question: "Why is combining wet and dry food recommended for cats?",
        answer: "Cats are obligate carnivores with a naturally low thirst drive. Wet food provides critical hydration that supports kidney and urinary bladder health, while dry kibble offers caloric density and feeding convenience."
      },
      {
        question: "How do you calculate a cat's daily calorie requirement?",
        answer: "Vets use the metabolic formula: RER = 70 × (Body Weight in kg)^0.75. This baseline is then multiplied by an activity factor (1.2 for neutered adults, 1.4 for intact adults, 0.8 for weight reduction, or 2.0+ for growing kittens)."
      }
    ]
  },
  {
    slug: "mixing-wet-and-dry-cat-food-calculator",
    name: "Mixing Wet and Dry Cat Food Calculator",
    shortTitle: "Mix Wet & Dry",
    category: "cat",
    iconName: "Utensils",
    tagline: "Prevent overfeeding with precision calorie-matched dual diet portioning.",
    description: "Dial in your exact wet-to-dry percentage split. Automatically balance calories per can and calories per cup to generate exact morning and evening bowl measurements.",
    authority: "National Research Council (NRC) Feline Nutrient Requirements",
    volume: "100+",
    competition: "Easy",
    faqs: [
      {
        question: "Why do so many cats gain weight when mixing wet and dry food?",
        answer: "Owners often provide a full bowl of dry kibble and 'treat' the cat with a partial can of wet food without deducting the wet food's calories from the kibble portion, creating a 30% to 50% daily caloric surplus."
      }
    ]
  },
  {
    slug: "homemade-dog-food-calculator",
    name: "Homemade Dog Food Calculator",
    shortTitle: "Homemade Food",
    category: "dog",
    iconName: "Utensils",
    tagline: "Formulate balanced cooked canine meals with required macro and calcium ratios.",
    description: "Calculate daily portions of lean proteins, digestible carbohydrates, and healthy fats tailored to your dog's weight, with mandatory 1.2:1 Calcium:Phosphorus safeguard alerts.",
    authority: "AAFCO Canine Nutrient Profiles & Veterinary Board-Certified Nutrition Standards",
    volume: "100+",
    competition: "Easy",
    faqs: [
      {
        question: "What is the biggest risk of feeding home-cooked dog food?",
        answer: "Calcium deficiency. Meat is high in phosphorus and low in calcium. Without an added calcium source (such as calcium carbonate or eggshell powder at ~900 mg calcium per 1,000 kcal), dogs can develop nutritional secondary hyperparathyroidism and brittle bones."
      },
      {
        question: "What is a healthy macronutrient split for home-cooked dog meals?",
        answer: "A standard veterinary maintenance baseline consists of 40% to 50% lean cooked protein, 30% to 40% digestible carbs and vegetables, and 5% to 10% essential fats."
      }
    ]
  },
  {
    slug: "puppy-weight-calculator",
    name: "Puppy Weight Calculator",
    shortTitle: "Puppy Growth",
    category: "dog",
    iconName: "Scale",
    tagline: "Predict your puppy's adult weight based on veterinary pediatric growth curves.",
    description: "Input your puppy's current age and weight to calculate expected adult size, growth completion timeline, and adult feeding requirements scaled by breed category.",
    authority: "Veterinary Pediatric Growth Curve Studies & AKC Breed Standards",
    volume: "1k+",
    competition: "Easy",
    faqs: [
      {
        question: "At what age do puppies stop growing?",
        answer: "Small and toy breeds typically reach full adult weight between 9 and 12 months. Medium breeds stop growing around 12 to 14 months. Large and giant breeds continue filling out their skeletal frame until 18 to 24 months."
      },
      {
        question: "How accurate is the 16-week weight multiplier rule?",
        answer: "For medium and large dogs, doubling their weight at 16 weeks provides an accurate estimate (within 10%) of their adult weight, assuming healthy body condition."
      }
    ]
  },
  {
    slug: "fish-tank-calculator",
    name: "Fish Tank & Aquarium Calculator",
    shortTitle: "Fish Tank Volume",
    category: "pet",
    iconName: "Fish",
    tagline: "Calculate aquarium water volume, filled weight, heater wattage, and fish stocking capacity.",
    description: "Determine exact net water volume in US gallons and liters from aquarium dimensions, factoring in substrate displacement and waterline rim gap. Computes total filled weight to verify floor joist and aquarium stand safety, recommended heater wattage, filtration turnover (GPH), and surface area bioload stocking limits.",
    authority: "Ornamental Aquatic Trade Association (OATA) & University of Florida IFAS Aquatic Science",
    volume: "1k+",
    competition: "Easy",
    faqs: [
      {
        question: "How do you calculate the gallons of a fish tank?",
        answer: "For rectangular aquariums, multiply Length × Width × Height (in inches) and divide the result by 231 (since there are 231 cubic inches in one US gallon). To obtain true net water volume, subtract the gravel substrate depth and waterline rim gap from the total height before calculating."
      },
      {
        question: "How much does a filled fish tank weigh?",
        answer: "Water weighs 8.34 lbs per gallon (8.55 lbs for saltwater). When including the glass tank, gravel or sand substrate (approx. 10–12 lbs per square foot of 1-inch depth), and decorations, a safe rule of thumb is 10 to 12 lbs per gallon of tank capacity. For example, a 55-gallon tank will weigh roughly 550 to 650 lbs fully loaded."
      },
      {
        question: "What heater wattage does my aquarium need?",
        answer: "A standard guideline is 3 to 5 Watts per gallon of actual water volume for a typical 5°F to 10°F room-to-tank temperature differential. For a 40-gallon tank in a typical indoor room, a 150-watt to 200-watt submersible heater is recommended."
      },
      {
        question: "How much filtration flow rate (GPH) do I need?",
        answer: "Veterinary aquatic standards recommend circulating the entire tank volume at least 4 to 6 times per hour for freshwater community tanks (e.g. 160–240 GPH for a 40-gallon tank) and 8 to 10 times per hour for heavily stocked cichlid or saltwater reef aquariums."
      },
      {
        question: "What is the 1 inch of fish per gallon rule?",
        answer: "The 'one inch of fish per gallon' guideline applies strictly to slender, low-waste tropical fish (like Neon Tetras or Guppies) and should be based on actual net water volume and surface area. Deep-bodied, waste-heavy species (such as Goldfish or African Cichlids) produce substantially higher bioload and require 2 to 3 times more water volume per inch."
      }
    ]
  }
];

export function getCalculatorBySlug(slug: string): CalculatorTool | undefined {
  return CALCULATOR_TOOLS.find((tool) => tool.slug === slug);
}
