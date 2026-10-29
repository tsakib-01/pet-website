import json
import re

# Base dog and cat breed specifications with realistic veterinary metrics
NEW_BREEDS = [
    # 1. Labrador Retriever
    {
        "slug": "labrador-retriever",
        "name": "Labrador Retriever",
        "species": "dog",
        "tagline": "America's perennial favorite family retriever: outgoing, athletic, gentle-tempered, and highly trainable.",
        "origin": "Newfoundland, Canada / United Kingdom",
        "standardGroup": "AKC Sporting Group",
        "heroImage": "/images/breeds/dogs/black-labrador.webp",
        "heroImageAlt": "Black Labrador Retriever in alert posture",
        "coatVariations": ["Yellow", "Black", "Chocolate", "Fox Red", "White", "Silver"],
        "weight": "55 – 80 lbs", "weightSub": "Males: 65–80 lbs • Females: 55–70 lbs",
        "height": "21.5 – 24.5 in", "heightSub": "Floor to shoulder withers",
        "crate": "42-Inch Crate", "crateSub": "Large breed standard (+2 to 4\" buffer)",
        "lifespan": "11 – 13 Years", "lifespanSub": "Large canine life-stage pace",
        "calories": "1,200 – 1,600 kcal", "caloriesSub": "WSAVA RER baseline for active adults",
        "activity": "High Energy", "activitySub": "Needs 60+ min daily exercise & swimming",
        "diet": "Labradors possess a genetic mutation in the POMC gene associated with constant appetite and obesity predisposition. Strictly weigh meals using a gram scale and avoid free-feeding.",
        "risks": [
            ("Canine Hip & Elbow Dysplasia", "High Watch", "Abnormal joint development leading to degenerative arthritis.", "Screen parents via OFA/PennHIP before breeding; maintain lean BCS 4-5/9."),
            ("Exercise-Induced Collapse (EIC)", "High Watch", "Autosomal recessive mutation in DNM1 gene causing collapse during strenuous exertion.", "DNA test breeding stock; avoid intensive ball retrieval in warm weather."),
            ("Progressive Retinal Atrophy (prcd-PRA)", "Screening Advised", "Bilateral photoreceptor degeneration leading to progressive blindness.", "Annual veterinary ophthalmic screening (CERF/CAER exams).")
        ],
        "faqs": [
            ("What is the difference between English and American Labradors?", "English (show/bench) Labradors are heavier, stockier, with wider heads and otter tails. American (field/working) Labradors are taller, leaner, with higher drive."),
            ("Are Silver Labradors purebred?", "The AKC registers Silver Labradors under Chocolate, but the silver coat arises from a dilute 'd' gene mutation, widely debated as originating from historical Weimaraner outcrosses."),
            ("How much exercise does a Labrador puppy need daily?", "Follow the 5-minute rule: 5 minutes of exercise per month of age twice daily to protect growing epiphyseal growth plates."),
            ("Do Labradors shed heavily?", "Yes. Labradors possess a dense water-repellent double coat that sheds year-round with twice-yearly heavy seasonal blowouts.")
        ],
        "tempOverview": "Renowned for their friendly, eager-to-please nature. Highly social pack animals that integrate seamlessly with children and other pets.",
        "traits": [("Affection with Family", 5, "Exceptionally devoted and human-focused."), ("Trainability & Focus", 5, "Top-tier intelligence; excels in obedience, retrieving, and service."), ("Energy & Drive", 4, "Athletic working drive requiring daily mental and physical stimulation."), ("Watchdog Instinct", 2, "Low guarding drive; welcomes strangers warmly.")],
        "familyComp": "Outstanding with children of all ages and other pets. Their enthusiasm requires early impulse control training around toddlers.",
        "trainingTips": "Use positive reinforcement retriever games and food puzzles. Early leash manners are vital before they reach 70+ lbs.",
        "colorOverview": "Inheritance governed by the B (Black/Chocolate) and E (Extension/Yellow) epistatic gene loci.",
        "coatType": "Dense, short, water-resistant double coat with coarse guard hairs.",
        "palette": [("Black", "Standard (Official)", "Dominant B_E_ genotype; traditional historic working coat."), ("Yellow", "Standard (Official)", "Homozygous recessive ee genotype, ranging from Fox Red to English Cream."), ("Chocolate", "Standard (Official)", "Homozygous recessive bbE_ genotype; rich liver to deep chocolate.")],
        "colorHealth": "Chocolate Labradors have an empirically documented median lifespan ~10% shorter than black/yellow counterparts according to UK VetCompass studies.",
        "stages": [("8 Weeks Checkpoint", "8 Weeks", "11 – 15 lbs", "Initial core vaccines and gradual transition to large-breed puppy formula."), ("16 Weeks Checkpoint", "16 Weeks", "28 – 36 lbs", "Begin basic recall and retriever impulse control; monitor growth plates."), ("6 Months Checkpoint", "6 Months", "45 – 58 lbs", "Reached roughly 65-70% of adult body weight; transition out of high jumping."), ("Adult Benchmark", "14 – 18 Months", "55 – 80 lbs", "Physiological skeletal maturity; safe to perform OFA clearance radiographs.")],
        "sizeClass": "AKC Sporting Dog Standard (21.5 to 24.5 inches at withers).",
        "sizeDiscTitle": "English (Bench) vs. American (Field) Classifications",
        "sizeDiscText": "While bench and field lines share the same breed standard, field lines are frequently leaner and taller, whereas bench lines carry heavier bone and broader muzzles.",
        "historySummary": "Bred originally in Newfoundland from the St. John's Water Dog to retrieve fishermen's nets and duck game in freezing Atlantic surf.",
        "milestones": [("1800s", "St. John's Water Dog Roots", "Fishermen in Newfoundland bred cold-water swimming dogs with otter-like water-shedding tails."), ("1885", "British Nobility Patronage", "Earl of Malmesbury imported the dogs to Dorset, England, refining them into specialized waterfowl retrievers."), ("1917", "AKC Official Recognition", "Formally admitted to the AKC Stud Book, becoming the #1 most registered breed in US history for over 30 years.")],
        "facts": [("Webbed Paws & Otter Tail", "Labradors possess anatomical webbing between their toes and an exceptionally powerful cylindrical tail that functions as a hydrodynamic rudder."), ("Soft Mouth Mastery", "Bred to carry game without puncturing skin, a well-trained Labrador can hold an uncooked egg in its jaws without cracking it."), ("POMC Food Gene Mutation", "Roughly 25% of Labradors carry a POMC gene deletion that disrupts brain satiation signaling, explaining their insatiable food drive.")]
    },

    # 2. Golden Retriever
    {
        "slug": "golden-retriever",
        "name": "Golden Retriever",
        "species": "dog",
        "tagline": "Gentle, radiant, and endlessly patient: the consummate family retriever, guide dog, and athletic companion.",
        "origin": "Scottish Highlands, United Kingdom",
        "standardGroup": "AKC Sporting Group",
        "heroImage": "/images/breeds/dogs/golden-retriever.webp",
        "heroImageAlt": "Golden Retriever sitting in outdoor sunlight",
        "coatVariations": ["Light Golden", "Golden", "Dark Golden", "English Cream", "Red"],
        "weight": "55 – 75 lbs", "weightSub": "Males: 65–75 lbs • Females: 55–65 lbs",
        "height": "21.5 – 24 in", "heightSub": "Floor to shoulder withers",
        "crate": "42-Inch Crate", "crateSub": "Large sporting standard (+2 to 4\" buffer)",
        "lifespan": "10 – 12 Years", "lifespanSub": "Sporting canine life-stage pace",
        "calories": "1,150 – 1,500 kcal", "caloriesSub": "WSAVA RER baseline for active adults",
        "activity": "High Energy", "activitySub": "Needs 60+ min daily running, fetching, or hiking",
        "diet": "Golden Retrievers are prone to grain-free diet-associated Dilated Cardiomyopathy (DCM). Feed a nutritionally complete diet formulated by veterinary nutritionists meeting WSAVA guidelines.",
        "risks": [
            ("Hemangiosarcoma & Lymphoma", "High Watch", "High hereditary incidence of endothelial and lymphoid malignancies in Golden lines.", "Bi-annual veterinary screening post-age 6; maintain lean body mass."),
            ("Subvalvular Aortic Stenosis (SAS)", "High Watch", "Congenital narrowing below the aortic valve creating cardiac murmur and left ventricular hypertrophy.", "Echocardiogram cardiac auscultation by board-certified veterinary cardiologist before breeding."),
            ("Ichthyosis", "Moderate", "Recessive PNPLA1 gene mutation causing large, dry, brown-black skin scales.", "DNA genetic test breeding stock; manage affected dogs with essential fatty acid rinses.")
        ],
        "faqs": [
            ("What is the difference between English Cream and American Golden Retrievers?", "English Cream is a color descriptor for Golden Retrievers bred to the Kennel Club (UK) standard, which permits paler cream coats, broader skulls, and more level backs than the AKC standard."),
            ("Are Red Goldens a separate breed?", "No. Field-bred Golden Retrievers often exhibit a rich dark red or mahogany coat. They are purebred Golden Retrievers, typically slightly leaner with higher hunting drive."),
            ("How often do Golden Retrievers need grooming?", "Brush 3 to 4 times weekly with an undercoat rake and slicker brush to prevent feathering mats around ears, groin, and tail."),
            ("Why do Golden Retrievers carry objects in their mouths?", "Their genetic retrieving instinct compels them to hold toys, socks, or sticks when excited as a self-soothing and communicative behavior.")
        ],
        "tempOverview": "Celebrated for their affectionate, calm, and forgiving disposition. Naturally eager to please and trustworthy with small children and other animals.",
        "traits": [("Patience with Children", 5, "Top-tier family companion; gentle and tolerant."), ("Trainability", 5, "High working biddability; excels in search and rescue and therapy."), ("Stranger Friendliness", 5, "Welcomes visitors enthusiastically; not a guard dog."), ("Playfulness", 4, "Maintains puppy-like playfulness into senior years.")],
        "familyComp": "Flourishes in active households where they are integrated into daily human activities.",
        "trainingTips": "Responds best to gentle praise and positive rewards. Harsh corrections damage their sensitive, cooperative nature.",
        "colorOverview": "Regulated by the pheomelanin intensity loci on top of a fixed homozygous recessive ee yellow coat.",
        "coatType": "Dense, water-repellent double coat with rich feathering on legs, chest, and tail.",
        "palette": [("Light Golden / Cream", "Standard (Official)", "Pale luster coat popular in European lines."), ("Rich Golden", "Standard (Official)", "Classic shimmering honey-gold coat."), ("Dark Golden / Red", "Standard (Official)", "Deep copper-red shade common in field working lines.")],
        "colorHealth": "Lighter or darker shades carry no inherent genetic health differences; beware of breeders marketing 'rare white' at exorbitant markups.",
        "stages": [("8 Weeks Checkpoint", "8 Weeks", "10 – 14 lbs", "Socialize gently with novel textures and sounds; begin crate training."), ("16 Weeks Checkpoint", "16 Weeks", "26 – 34 lbs", "Puppy obedience class; focus on soft-mouth bite inhibition."), ("6 Months Checkpoint", "6 Months", "42 – 55 lbs", "Monitor adolescent growth; avoid high-impact jumping onto hard surfaces."), ("Adult Benchmark", "14 – 18 Months", "55 – 75 lbs", "Complete adult skeletal maturation and coat feathering.")],
        "sizeClass": "AKC Sporting Dog Standard (21.5 to 24 inches at shoulder).",
        "sizeDiscTitle": "Beware of 'Mini Golden Retrievers'",
        "sizeDiscText": "'Miniature Golden Retrievers' are not purebred Goldens; they are crossbreeds typically created with Cocker Spaniels or Poodles.",
        "historySummary": "Developed in 1868 at Guisachan estate in Scotland by Lord Tweedmouth by crossing a yellow retriever with a Tweed Water Spaniel.",
        "milestones": [("1868", "Guisachan Foundation", "Lord Tweedmouth bred 'Nous' with 'Belle' to retrieve waterfowl in dense Scottish heather and lochs."), ("1911", "The Kennel Club (UK)", "Formally recognized as 'Retriever - Yellow or Golden'."), ("1925", "AKC Registration", "Admitted to the American Kennel Club Stud Book, becoming a premier companion globally.")],
        "facts": [("Lord Tweedmouth Stud Book", "The breed's foundational breeding records were kept meticulously by Lord Tweedmouth and discovered in 1952."), ("#1 Guide & Service Dog", "Due to their high biddability and gentle temperament, Goldens comprise a massive percentage of seeing-eye dogs."), ("Three Distinct Styles", "Three variations exist: American, Canadian (taller and darker), and British (blockier with lighter cream hues).")]
    },

    # 3. German Shepherd
    {
        "slug": "german-shepherd",
        "name": "German Shepherd",
        "species": "dog",
        "tagline": "Noble, loyal, and extraordinarily versatile working canine: revered as the ultimate protector, service, and police dog.",
        "origin": "Germany",
        "standardGroup": "AKC Herding Group",
        "heroImage": "/images/breeds/dogs/german-shepherd.webp",
        "heroImageAlt": "German Shepherd dog in focused working stance",
        "coatVariations": ["Black & Tan", "Sable", "Bi-Color", "Solid Black", "White", "Silver & Black"],
        "weight": "50 – 90 lbs", "weightSub": "Males: 65–90 lbs • Females: 50–70 lbs",
        "height": "22 – 26 in", "heightSub": "Floor to shoulder withers",
        "crate": "42 or 48-Inch Crate", "crateSub": "Large herding standard (+2 to 4\" buffer)",
        "lifespan": "9 – 12 Years", "lifespanSub": "Large working canine pace",
        "calories": "1,300 – 1,750 kcal", "caloriesSub": "WSAVA RER baseline for working adults",
        "activity": "Very High Energy", "activitySub": "Needs 90+ min daily structured work and mental puzzles",
        "diet": "German Shepherds have sensitive digestive tracts. Avoid sudden dietary transitions and limit post-meal strenuous running for at least 60 minutes to reduce GDV bloat risk.",
        "risks": [
            ("Degenerative Myelopathy (DM)", "High Watch", "Fatal neurodegenerative spinal cord disorder caused by SOD1 mutation resulting in progressive hindlimb paralysis.", "DNA screen breeding parents; physical rehabilitation for affected dogs."),
            ("Gastric Dilatation-Volvulus (GDV / Bloat)", "High Watch", "Deep-chested anatomy allows stomach to distend and twist on its mesenteric axis.", "Discuss preventive laparoscopic gastropexy with your veterinarian."),
            ("Exocrine Pancreatic Insufficiency (EPI)", "Moderate", "Atrophy of acinar cells causing failure to digest food and severe weight loss.", "Lifelong pancreatic enzyme replacement therapy (cTLI blood test).")
        ],
        "faqs": [
            ("What is the difference between working line and show line German Shepherds?", "Working lines possess straighter backs, compact frames, and extreme drive. Show lines feature more angulated roached toplines and lower drive."),
            ("Are German Shepherds good with children?", "When properly socialized and raised in a structured family environment, they are fiercely loyal and protective guardians of children."),
            ("Why do German Shepherd ears take time to stand up?", "Ear cartilage hardens gradually between 4 and 7 months, often drooping during the teething phase as calcium is diverted to teeth."),
            ("How much do German Shepherds shed?", "Known as 'German Shedders', they blow their dense undercoat twice annually and shed moderately year-round.")
        ],
        "tempOverview": "Aloof with strangers, fearless, exceptionally intelligent, and devoted to their handlers. They require a confident owner who provides calm leadership.",
        "traits": [("Loyalty & Devotion", 5, "Forms an unbreakable bond with primary handler."), ("Watchdog & Protection", 5, "Natural territorial and personal protection instinct."), ("Intelligence & Drive", 5, "Learns complex multi-step commands rapidly."), ("Need for Mental Work", 5, "Requires structured jobs to prevent boredom.")],
        "familyComp": "Ideal for active, experienced owners who can provide daily mental engagement and leadership.",
        "trainingTips": "Focus heavily on early neutral socialization with people and other dogs to channel guardian instincts constructively.",
        "colorOverview": "Controlled by the Agouti (a) and Extension (E) series, creating rich saddle, sable, and solid phenotypes.",
        "coatType": "Medium double coat with straight, harsh outer hair and dense undercoat.",
        "palette": [("Black & Tan", "Standard (Official)", "Classic saddle pattern with black mantle and rich tan legs."), ("Sable / Agouti", "Standard (Official)", "Banded hairs with black tips; the predominant color of working lines."), ("Solid Black", "Standard (Official)", "Recessive black (aa) mutation; sleek midnight coat.")],
        "colorHealth": "White German Shepherds carry an autosomal recessive gene; recognized as a distinct breed (Berger Blanc Suisse) in Europe.",
        "stages": [("8 Weeks Checkpoint", "8 Weeks", "13 – 19 lbs", "Start crate routine and bite inhibition; feed large breed puppy kibble."), ("16 Weeks Checkpoint", "16 Weeks", "32 – 44 lbs", "Teething stage; ears may fluctuate between standing and floppy."), ("6 Months Checkpoint", "6 Months", "48 – 65 lbs", "Adolescent phase begins; reinforce boundary obedience and loose-leash walking."), ("Adult Benchmark", "18 – 24 Months", "50 – 90 lbs", "Skeletal plates fused; evaluate OFA hip and elbow certifications.")],
        "sizeClass": "AKC Herding Dog Standard (22 to 26 inches at withers).",
        "sizeDiscTitle": "King Shepherd / Shiloh Shepherd Distinctions",
        "sizeDiscText": "Oversized 'King Shepherds' weighing over 100 lbs are distinct outcross creations not recognized by the AKC parent club.",
        "historySummary": "Standardized in 1899 by Captain Max von Stephanitz from indigenous German herding varieties, emphasizing working utility.",
        "milestones": [("1899", "Von Stephanitz Standardization", "Captain Max von Stephanitz bought 'Hektor Linksrhein', creating the SV registry."), ("1914", "WWI Service", "Served as trench messengers and sentry guards in WWI, astounding Allied troops with their courage."), ("1920s", "Hollywood Stardom", "Rin Tin Tin popularized the breed globally, demonstrating their remarkable Hollywood acting trainability.")],
        "facts": [("Horand von Grafrath: Breed Father", "All purebred German Shepherds trace their lineage directly back to Horand von Grafrath in 1899."), ("Bite Force Power", "A full-grown German Shepherd possesses a bite force estimated at over 238 PSI."), ("Military Working Dog (MWD)", "German Shepherds and Belgian Malinois make up the vast majority of military patrol dogs.")]
    },

    # 4. Dachshund
    {
        "slug": "dachshund",
        "name": "Dachshund",
        "species": "dog",
        "tagline": "Iconic 'badger dog' with fearless hound tenacity, clever personality, and distinct low-slung chondrodystrophic silhouette.",
        "origin": "Germany",
        "standardGroup": "AKC Hound Group",
        "heroImage": "/images/breeds/dogs/mini-dachshund.webp",
        "heroImageAlt": "Miniature Dachshund sitting alertly",
        "coatVariations": ["Smooth Coated", "Longhaired", "Wirehaired", "Red", "Black & Tan", "Dapple (Merle)", "Piebald"],
        "weight": "11 – 32 lbs", "weightSub": "Miniature: Under 11 lbs • Standard: 16–32 lbs",
        "height": "5 – 9 in", "heightSub": "Floor to withers",
        "crate": "24 or 30-Inch Crate", "crateSub": "Small hound standard (+2 to 4\" buffer)",
        "lifespan": "12 – 16 Years", "lifespanSub": "Exceptional small-breed longevity",
        "calories": "350 – 700 kcal", "caloriesSub": "WSAVA RER scaled to Miniature vs Standard",
        "activity": "Moderate", "activitySub": "Short daily walks; protect spine from jumps",
        "diet": "Preventing obesity is a matter of life or paralysis for Dachshunds. Even 1 to 2 extra pounds drastically increases pressure on spinal intervertebral discs.",
        "risks": [
            ("IVDD (Intervertebral Disc Disease)", "High Watch", "Type I disc herniation affects up to 25% of Dachshunds due to FGF4 retrogene duplication.", "Install ramps for beds/couches; prohibit high jumping; use harnesses instead of neck collars."),
            ("Progressive Retinal Atrophy (crd-PRA)", "Screening Advised", "Cone-rod dystrophy causing early retinal deterioration.", "DNA test breeding stock (RPGRIP1 gene test)."),
            ("Canine Acanthosis Nigricans", "Moderate", "Primary hereditary hyperpigmentation and lichenification of axillary and groin skin.", "Veterinary antimicrobial shampoos and topical anti-inflammatory therapy.")
        ],
        "faqs": [
            ("What is the difference between a Mini and Standard Dachshund?", "Miniatures weigh 11 pounds and under at 12 months. Standards weigh 16 to 32 pounds. Between 11 and 16 lbs is unofficially known as a 'tweenie'."),
            ("Why are ramps necessary for Dachshunds?", "Their long spine and short ribcage create severe biomechanical shearing forces when jumping off furniture, triggering disc rupture."),
            ("Do Wirehaired Dachshunds shed less?", "Wirehaired Dachshunds shed minimally but require hand-stripping twice a year to maintain harsh weatherproof coat texture."),
            ("Are Dachshunds hard to housebreak?", "They can be stubborn due to their independent hound nature and dislike of cold or wet weather; consistent crate training and positive rewards are key.")
        ],
        "tempOverview": "Spunky, tenacious, and affectionate with family. They possess a loud, resonant bark that belies their small size, inherited from their underground badger-hunting origins.",
        "traits": [("Loyalty & Bonding", 5, "Forms intense devotion to favorite family members."), ("Independence & Tenacity", 5, "Bred to work independently underground; strong-willed."), ("Vocal Watchdog", 4, "Quick to alert bark at unfamiliar sounds."), ("Burrowing Instinct", 5, "Loves to burrow into blankets, pillows, and sleeping bags.")],
        "familyComp": "Best with older, respectful children who understand how to support both ends of their delicate spine when handling.",
        "trainingTips": "Keep sessions short, fun, and food-rewarded. Never use physical force, which encourages stubborn resistance.",
        "colorOverview": "Extensive palette regulated by Agouti, Extension, and Merle (Dapple) genetics across three coat varieties.",
        "coatType": "Three distinct coat varieties: Smooth (short/shiny), Longhaired (sleek/feathered), and Wirehaired (harsh with beard).",
        "palette": [("Red", "Standard (Official)", "Clear red to deep mahogany; dominant base color."), ("Black & Tan", "Standard (Official)", "Classic hound pattern with rich tan points."), ("Dapple / Merle", "Exotic / Rare Mutation", "Silvery mottled patches over base coat via PMEL gene.")],
        "colorHealth": "Never breed two Dapples together (Double Dapple), as homozygous merle causes congenital deafness and microphthalmia (blindness).",
        "stages": [("8 Weeks Checkpoint", "8 Weeks", "2.5 – 4.5 lbs", "Handle gently; support chest and pelvis simultaneously."), ("16 Weeks Checkpoint", "16 Weeks", "6 – 10 lbs", "Establish ramp training early before habits of couch jumping develop."), ("6 Months Checkpoint", "6 Months", "9 – 18 lbs", "Miniatures approach adult skeletal frame; standards continue filling out."), ("Adult Benchmark", "12 Months", "11 – 32 lbs", "Classified officially as Miniature (<11 lbs) or Standard (16-32 lbs).")],
        "sizeClass": "AKC Hound Standard (Miniature: ≤11 lbs; Standard: 16–32 lbs).",
        "sizeDiscTitle": "The 'Tweenie' Designation",
        "sizeDiscText": "'Tweenie' is an affectionate colloquial term for purebred Dachshunds weighing between 12 and 15 pounds; they are shown in the Standard class in AKC rings.",
        "historySummary": "Bred in Germany from the 15th century to hunt badgers (Dachs = badger; Hund = dog) by following them deep into subterranean burrows.",
        "milestones": [("1500s", "Subterranean Badger Specialists", "Foresters bred short-legged hounds with flap ears and loose skin to fight fierce badgers underground."), ("1885", "AKC Recognition", "One of the earliest breeds recognized by the American Kennel Club."), ("1972", "Waldi the Olympic Mascot", "A Dachshund named Waldi became the official mascot of the 1972 Munich Olympic Games.")],
        "facts": [("Deep Barrel Chest", "Their massive ribcage houses enlarged lungs and heart to sustain stamina in oxygen-depleted underground tunnels."), ("Paddle-Shaped Paws", "Their front paws rotate outward slightly and feature broad, shovel-like webbing built for rapid earth excavation."), ("Loud Hound Bay", "Their deep bark allowed above-ground human hunters to locate their subterranean position through six feet of solid dirt.")]
    },

    # 5. Standard Poodle
    {
        "slug": "standard-poodle",
        "name": "Standard Poodle",
        "species": "dog",
        "tagline": "Elegant, hypoallergenic athlete possessing world-class canine intelligence, gentle humor, and aristocratic grace.",
        "origin": "Germany / France",
        "standardGroup": "AKC Non-Sporting Group",
        "heroImage": "/images/breeds/dogs/standard-poodle.webp",
        "heroImageAlt": "Standard Poodle standing proudly with styled coat",
        "coatVariations": ["Black", "White", "Apricot", "Silver", "Red", "Blue", "Parti-Color"],
        "weight": "45 – 70 lbs", "weightSub": "Males: 60–70 lbs • Females: 45–60 lbs",
        "height": "Over 15 inches", "heightSub": "Typically 21–27 in at withers",
        "crate": "42-Inch Crate", "crateSub": "Large non-sporting standard (+2 to 4\" buffer)",
        "lifespan": "12 – 15 Years", "lifespanSub": "Excellent large-breed longevity",
        "calories": "1,100 – 1,450 kcal", "caloriesSub": "WSAVA RER baseline for active adults",
        "activity": "High Energy", "activitySub": "Needs 60+ min daily exercise, swimming & mental work",
        "diet": "Standard Poodles have a high incidence of Addison's disease and GDV bloat. Provide balanced, easily digestible diets and avoid strenuous running around mealtimes.",
        "risks": [
            ("Addison's Disease (Hypoadrenocorticism)", "High Watch", "Immune-mediated destruction of adrenal cortex causing lethargy, vomiting, and electrolyte crises.", "ACTH stimulation test for diagnosis; lifelong mineralocorticoid hormone replacement."),
            ("Sebaceous Adenitis (SA)", "Moderate", "Inflammatory destruction of sebaceous glands causing follicular hyperkeratosis and hair loss.", "Skin biopsy screening; managed with mineral oil soaks and topical antimicrobials."),
            ("Gastric Dilatation-Volvulus (GDV)", "High Watch", "Deep-chested structure predisposes to life-threatening stomach torsion.", "Preventive gastropexy strongly recommended during spay/neuter.")
        ],
        "faqs": [
            ("Are Poodles truly hypoallergenic?", "Poodles possess a single-layer hair coat rather than double fur, shedding minimally and trapping dander, making them significantly better for allergy sufferers."),
            ("What is the origin of the fancy Poodle haircut?", "The traditional lion trim was functional: hair was shaved to reduce water drag while swimming, leaving puffs around joints and chest to protect vital organs from freezing water."),
            ("How smart are Poodles compared to other dogs?", "Ranked #2 smartest dog breed in Stanley Coren's canine intelligence trials, able to learn commands in under 5 repetitions."),
            ("How often do Poodles need professional grooming?", "Every 4 to 6 weeks for bathing, trimming, and ear cleaning to prevent painful coat matting.")
        ],
        "tempOverview": "Dignified, witty, and exceptionally people-oriented. They thrive on human companionship and can become anxious if left isolated for prolonged periods.",
        "traits": [("Canine Intelligence", 5, "Brilliant problem-solver; masters complex tasks effortlessly."), ("Hypoallergenic Coat", 5, "Minimal shedding; excellent for allergy-sensitive households."), ("Athletic Versatility", 5, "Excels in agility, obedience, dock diving, and retrieving."), ("Affection with Family", 5, "Warm, sensitive, and deeply bonded to owners.")],
        "familyComp": "Superb with respectful children and multi-pet households; their athletic playfulness makes them wonderful outdoor partners.",
        "trainingTips": "Use creative, varied training games. Poodles get bored quickly by endless mechanical repetition.",
        "colorOverview": "Extensive single-color standard coat spectrum regulated by dilute, agouti, and pheomelanin alleles.",
        "coatType": "Dense, harsh-textured curly hair coat with continuous growth (requires regular clipping).",
        "palette": [("Solid Black", "Standard (Official)", "Rich jet black with black points."), ("White", "Standard (Official)", "Pure sparkling white with dark pigment."), ("Apricot / Red", "Standard (Official)", "Warm golden-peach to deep cinnamon-red shades.")],
        "colorHealth": "Parti-colored poodles (two distinct colors) are recognized by UKC and historically purebred, though non-standard in traditional AKC conformation.",
        "stages": [("8 Weeks Checkpoint", "8 Weeks", "9 – 13 lbs", "Introduce daily gentle brushing and ear handling early to acclimate to grooming."), ("16 Weeks Checkpoint", "16 Weeks", "24 – 32 lbs", "Begin intermediate obedience and swimming introductions."), ("6 Months Checkpoint", "6 Months", "38 – 50 lbs", "Adolescent coat transition begins; brush daily to prevent puppy matting."), ("Adult Benchmark", "15 – 18 Months", "45 – 70 lbs", "Adult skeletal maturity; full curly adult coat texture established.")],
        "sizeClass": "AKC Standard Class (>15 inches at the highest point of withers).",
        "sizeDiscTitle": "Standard vs. Miniature vs. Toy",
        "sizeDiscText": "All three varieties share the identical AKC breed standard, differing solely in standing withers height: Toy (≤10 in), Miniature (10–15 in), Standard (>15 in).",
        "historySummary": "Originated in Germany as the 'Pudelhund' (puddle dog), specialized in retrieving downed ducks and waterfowl from icy lakes.",
        "milestones": [("1400s", "Water Duck Retrievers", "German hunters utilized water-loving dogs with dense curly coats that repelled lake water."), ("1700s", "French Aristocracy Adoptions", "Adopted by French royalty and styled into the national dog of France ('Caniche')."), ("1887", "AKC Recognition", "Admitted to the American Kennel Club Stud Book, becoming an enduring show ring champion.")],
        "facts": [("Name Means 'Puddle'", "The German word 'Pudeln' means 'to splash in water', reflecting their waterfowl retriever lineage."), ("Truffle Hunting Specialists", "Their keen olfactory senses led them to be used extensively in England and France to sniff out underground truffles."), ("No Undercoat", "Unlike retrievers, Poodles have hair that grows continuously like human hair rather than seasonal shedding fur.")]
    },

    # 6. Beagle
    {
        "slug": "beagle",
        "name": "Beagle",
        "species": "dog",
        "tagline": "Merry, sweet-tempered scent hound famous for boundless optimism, soulful brown eyes, and an insatiable nose.",
        "origin": "United Kingdom",
        "standardGroup": "AKC Hound Group",
        "heroImage": "/images/breeds/dogs/beagle.webp",
        "heroImageAlt": "Tricolor Beagle standing in alert sniffing pose",
        "coatVariations": ["Tricolor (Black, White, Tan)", "Red & White", "Lemon & White", "Blue Tick", "Chocolate Tri"],
        "weight": "20 – 30 lbs", "weightSub": "13-inch: Under 20 lbs • 15-inch: 20–30 lbs",
        "height": "13 – 15 in", "heightSub": "Two AKC size varieties",
        "crate": "30-Inch Crate", "crateSub": "Medium hound standard (+2 to 4\" buffer)",
        "lifespan": "12 – 15 Years", "lifespanSub": "Robust small-to-medium canine pace",
        "calories": "650 – 900 kcal", "caloriesSub": "WSAVA RER scaled to active adult weight",
        "activity": "High Energy", "activitySub": "Needs 60+ min daily scent walks and yard play",
        "diet": "Beagles are consummate scavengers and notorious counter-surfers. Secure all trash cans and pantry cabinets, and measure food strictly on a gram scale.",
        "risks": [
            ("Canine Epilepsy", "Moderate", "Idiopathic seizures typically manifesting between 1 and 5 years of age.", "Neurological evaluation; managed with anticonvulsant medications like levetiracetam."),
            ("Intervertebral Disc Disease (IVDD)", "Moderate", "Chondrodystrophic spine genetics make discs prone to herniation.", "Maintain lean body weight and prevent excessive jumping."),
            ("Hypothyroidism", "Screening Advised", "Autoimmune thyroiditis leading to lethargy, weight gain, and bilateral symmetrical hair loss.", "Annual total T4 and free T4 blood panel; oral levothyroxine supplementation.")
        ],
        "faqs": [
            ("Can Beagles ever be walked off-leash safely?", "Generally no. Beagles are scent-driven tracking hounds; once their nose locks onto a scent trail, selective hearing activates and they will follow it across roads."),
            ("What is the Beagle 'bay'?", "Beagles have three vocalizations: a standard bark, a mournful bay used while tracking game, and a howl when lonely or alerting."),
            ("Why do Beagles have white-tipped tails?", "Bred deliberately with a 'flag' tail so hunters on horseback could spot their hounds moving through tall grass and dense briars."),
            ("Are Beagles good apartment dogs?", "They can adapt to apartments if given sufficient daily scent walks, but their vocal baying can cause neighbor noise complaints if left understimulated.")
        ],
        "tempOverview": "Incurably merry, friendly, and pack-oriented. Bred to hunt in packs alongside other hounds, they thrive in family environments and dislike prolonged isolation.",
        "traits": [("Friendliness with Dogs", 5, "Inherent pack animal instincts; loves canine companionship."), ("Scent Drive", 5, "Over 220 million olfactory receptors; easily distracted by scents."), ("Affection with Family", 5, "Cuddly, warm, and exceptionally tolerant with children."), ("Vocal Expression", 4, "Bays, howls, and alerts enthusiastically.")],
        "familyComp": "One of the absolute best breeds for active families with children; sturdy, playful, and non-aggressive.",
        "trainingTips": "Use high-value smelly food treats (freeze-dried liver, cheese) to compete with environmental scent distractions.",
        "colorOverview": "Governed by Piebald spotting alleles combined with Agouti black-and-tan and pheomelanin dilute genes.",
        "coatType": "Close, hard, medium-length hound coat that repels burrs and rain.",
        "palette": [("Classic Tricolor", "Standard (Official)", "Black saddle, rich tan head and shoulders, crisp white trim."), ("Lemon & White", "Standard (Official)", "Pale straw-yellow to golden patches over white."), ("Red & White", "Standard (Official)", "Warm copper-red markings on white base.")],
        "colorHealth": "All colors must feature the signature white-tipped tail according to AKC and UK breed standards.",
        "stages": [("8 Weeks Checkpoint", "8 Weeks", "4.5 – 7 lbs", "Begin crate training and boundary safety; microchip immediately."), ("16 Weeks Checkpoint", "16 Weeks", "11 – 15 lbs", "Reinforce recall commands on long training lines."), ("6 Months Checkpoint", "6 Months", "16 – 22 lbs", "Monitor adolescent food scavenging; teach 'leave it' command."), ("Adult Benchmark", "12 – 15 Months", "20 – 30 lbs", "Classified into 13-inch (<20 lbs) or 15-inch (20-30 lbs) AKC class.")],
        "sizeClass": "Two official AKC varieties: 13-inch (≤13 in) and 15-inch (13–15 in).",
        "sizeDiscTitle": "Pocket Beagles Reality Check",
        "sizeDiscText": "Historic 9-inch 'Pocket Beagles' favored by Queen Elizabeth I are extinct; modern breeders marketing 'Pocket Beagles' are selling runts or crossbreeds.",
        "historySummary": "Refined in England in the 1830s by Reverend Phillip Honeywood, bred for 'beagling'—hunting hares on foot for hunters without horses.",
        "milestones": [
            ("1500s", "Tudor Pack Hounds", "English royalty kept small scent hounds small enough to fit in saddle panniers."),
            ("1830s", "Honeywood Foundation Pack", "Reverend Honeywood developed the modern compact tricolor beagle in Essex."),
            ("1885", "AKC Recognition", "Admitted to the AKC Stud Book, remaining one of America's top 10 most popular breeds for over 80 years.")
        ],
        "facts": [
            ("US Airport 'Beagle Brigade'", "The USDA employs Beagles at international airports because their gentle demeanor doesn't alarm travelers while detecting prohibited agricultural products with 90%+ accuracy."),
            ("Snoopy's Breed", "Charles Schulz's world-famous cartoon dog Snoopy is the most celebrated Beagle in pop culture history."),
            ("Ear Flap Aerodynamics", "Their long drooping ear flaps act as miniature fans that scoop scent particles off the ground toward their nostrils as they run.")
        ]
    },

    # 7. Rottweiler
    {
        "slug": "rottweiler",
        "name": "Rottweiler",
        "species": "dog",
        "tagline": "Immensely powerful, steadfast guardian with ancient Roman drover ancestry, devoted loyalty, and calm self-assurance.",
        "origin": "Rottweil, Germany",
        "standardGroup": "AKC Working Group",
        "heroImage": "/images/breeds/dogs/rottweiler.webp",
        "heroImageAlt": "Rottweiler standing in alert, muscular profile",
        "coatVariations": ["Black with Rust Markings", "Black with Mahogany Markings", "Black with Tan Markings"],
        "weight": "80 – 135 lbs", "weightSub": "Males: 95–135 lbs • Females: 80–100 lbs",
        "height": "22 – 27 in", "heightSub": "Floor to shoulder withers",
        "crate": "48 or 54-Inch Crate", "crateSub": "Giant working standard (+2 to 4\" buffer)",
        "lifespan": "9 – 10 Years", "lifespanSub": "Giant breed canine pace",
        "calories": "1,500 – 2,200 kcal", "caloriesSub": "WSAVA RER baseline for large working adults",
        "activity": "Moderate to High", "activitySub": "Needs 60 min daily brisk walks, carting, or agility",
        "diet": "Rottweilers grow rapidly during puppyhood. Feeding excess calories or calcium accelerates bone growth too fast, exacerbating hip/elbow dysplasia and osteochondritis dissecans (OCD).",
        "risks": [
            ("Osteosarcoma (Bone Cancer)", "High Watch", "High incidence of aggressive malignant bone tumors in appendicular skeleton.", "Monitor for sudden lameness; early veterinary radiographic evaluation."),
            ("Subaortic Stenosis (SAS)", "High Watch", "Fibrous ridge below aortic valve creating left ventricular pressure overload.", "OFA cardiac clearance with Doppler echocardiogram before breeding."),
            ("Cranial Cruciate Ligament (CCL) Rupture", "High Watch", "Heavy muscular frame puts extreme stress on stifle joint ligaments.", "Maintain lean Body Condition Score (BCS 4-5/9); consider TPLO surgical stabilization if ruptured.")
        ],
        "faqs": [
            ("Are Rottweilers aggressive by nature?", "No. A well-bred, properly socialized Rottweiler is calm, confident, and aloof, not nervously aggressive. Aggression stems from poor breeding, neglect, or lack of early socialization."),
            ("Are Rottweilers good with children?", "Yes, when raised with them and properly supervised. Their size requires teaching both dog and child respectful boundaries."),
            ("What is a 'Roman Rottweiler'?", "'Roman Rottweiler' is an unregulated marketing gimmick used by backyard breeders to sell morbidly obese or mastiff-cross dogs weighing over 150 lbs, which suffers from severe joint failure."),
            ("Why were Rottweilers' tails traditionally docked?", "Historically docked in working drover dogs to prevent tail injuries while herding cattle; docking is now prohibited in Germany and across Europe.")
        ],
        "tempOverview": "Calm, confident, courageous, and deeply devoted to their pack. They observe situations quietly before reacting, possessing an innate guardian instinct.",
        "traits": [("Guardian Instinct", 5, "Formidable protective instinct; defends territory naturally."), ("Loyalty & Affection", 5, "Affectionate 'leaner'; loves physical contact with family."), ("Confidence & Calmness", 4, "Self-assured; does not bark nervously without cause."), ("Working Drive", 4, "Excels in carting, tracking, and obedience work.")],
        "familyComp": "Excellent for structured, experienced homes willing to provide lifelong leadership and positive training.",
        "trainingTips": "Begin socialization on day one. Early leash manners and neutral reactions to strangers are mandatory for an animal that will weigh over 100 pounds.",
        "colorOverview": "Fixed black base coat with strictly defined rich rust or mahogany markings over eyes, cheeks, chest, and legs.",
        "coatType": "Medium double coat; coarse, flat outer coat with undercoat present on neck and thighs.",
        "palette": [("Black & Mahogany", "Standard (Official)", "Deep, rich mahogany-rust points on pitch black coat."), ("Black & Rust", "Standard (Official)", "Warm rust-colored defined points."), ("Black & Tan", "Standard (Official)", "Lighter tan points; standard conformation variation.")],
        "colorHealth": "Any other color (red, blue, albino) is a disqualification indicating crossbreeding with elevated health defects.",
        "stages": [("8 Weeks Checkpoint", "8 Weeks", "15 – 22 lbs", "Large breed puppy nutrition; ensure calcium-to-phosphorus ratio of 1.1:1."), ("16 Weeks Checkpoint", "16 Weeks", "38 – 50 lbs", "Socialization window critical; expose to 100+ novel sights/sounds calmly."), ("6 Months Checkpoint", "6 Months", "60 – 80 lbs", "Adolescent boundary testing; maintain strict rules on furniture and jumping."), ("Adult Benchmark", "24 – 36 Months", "80 – 135 lbs", "Slow-maturing giant breed; skeletal and muscular frame fills out until age 3.")],
        "sizeClass": "AKC Working Dog Standard (Males: 24–27 in; Females: 22–25 in).",
        "sizeDiscTitle": "Avoid Oversized 'Roman' Rottweilers",
        "sizeDiscText": "Breeding for oversized weights (140–180 lbs) severely reduces lifespan and guarantees early-onset crippling hip dysplasia and heart failure.",
        "historySummary": "Descended from Roman drover mastiffs that guarded Roman legion cattle herds across the Alps, settling in the German town of Rottweil.",
        "milestones": [
            ("74 AD", "Roman Drover Origins", "Roman armies marched through southern Germany accompanied by drover dogs to manage and guard livestock herds."),
            ("1800s", "The Butcher's Dog of Rottweil", "Rottweil butchers used them ('Rottweiler Metzgerhund') to pull meat carts and guard money pouches tied around their necks."),
            ("1931", "AKC Recognition", "Officially admitted to the AKC Stud Book, later becoming one of the most respected police and family guardians.")
        ],
        "facts": [
            ("The Butcher's Money Bag", "In medieval Germany, butchers tied their day's cash proceeds directly around their Rottweiler's neck, knowing no thief would dare approach."),
            ("The 'Rottie Lean'", "Rottweilers have an endearing habit of leaning their full body weight against their humans' legs as a sign of affection and pack security."),
            ("First Police Dog Test", "In 1910, the Rottweiler was officially designated as the 4th official police service dog breed in Germany.")
        ]
    },

    # 8. Sphynx Cat
    {
        "slug": "sphynx",
        "name": "Sphynx",
        "species": "cat",
        "tagline": "Endearingly hairless, extroverted feline marvel with peach-fuzz warmth, acrobat energy, and dog-like devotion.",
        "origin": "Toronto, Canada",
        "standardGroup": "CFA Championship Class",
        "heroImage": "/images/breeds/cats/sphynx-cat.webp",
        "heroImageAlt": "Hairless Sphynx cat looking curiously forward",
        "coatVariations": ["Solid (Black, White, Blue, Red, Cream)", "Tortoiseshell", "Tabby Patterns", "Pointed (Sphynx-Colorpoint)"],
        "weight": "6 – 12 lbs", "weightSub": "Males: 8–12 lbs • Females: 6–9 lbs",
        "height": "8 – 10 in", "heightSub": "Fine-boned, muscular body",
        "crate": "Standard Feline Carrier", "crateSub": "Keep insulated with warm fleece",
        "lifespan": "12 – 15 Years", "lifespanSub": "AAFP feline longevity standard",
        "calories": "280 – 380 kcal", "caloriesSub": "High metabolism; burns calories to stay warm",
        "activity": "High Energy", "activitySub": "Loves climbing cat trees, riding shoulders, and chasing toys",
        "diet": "Sphynx cats have a significantly higher basal metabolic rate than furred cats because they lose body heat continuously. Feed high-protein, calorie-dense feline diets.",
        "risks": [
            ("Hypertrophic Cardiomyopathy (HCM)", "High Watch", "Thickening of the left ventricular heart muscle; the leading genetic cause of feline cardiac death.", "Annual echocardiogram screening by board-certified veterinary cardiologist before breeding."),
            ("Urticaria Pigmentosa", "Moderate", "Mast cell infiltration creating crusty, hyperpigmented macules on the skin.", "Topical veterinary steroid creams and oral antihistamines."),
            ("Sebum Accumulation & Malassezia Yeast", "Moderate", "Absence of hair allows body oils to pool in skin folds and nail beds.", "Weekly warm-water baths with gentle chlorhexidine/ketoconazole veterinary shampoo.")
        ],
        "faqs": [
            ("Are Sphynx cats completely hairless?", "No. Most have fine, downy peach fuzz over their skin, particularly on the bridge of the nose, ears, toes, and tail tip, feeling like a warm suede jacket."),
            ("Are Sphynx cats hypoallergenic?", "No! Cat allergies are caused by the Fel d 1 protein in feline saliva, sebum, and urine—not hair. Sphynx cats produce normal Fel d 1 and can trigger allergic reactions."),
            ("How often do Sphynx cats need baths?", "Typically every 1 to 2 weeks. Without fur to absorb skin oils, sebum builds up on skin and rubs off onto furniture and clothing."),
            ("Do Sphynx cats get cold easily?", "Yes. Their body skin temperature feels hot to the touch (101.5°F–102.5°F) because heat radiates directly off bare skin. Provide heated pet beds and winter sweaters.")
        ],
        "tempOverview": "Outrageously affectionate, curious, and clownish. Known as 'part cat, part dog, part monkey, and part child' due to their hyper-social personality.",
        "traits": [("Affection with Humans", 5, "Loves lap cuddles, sleeping under duvet blankets, and shoulder-perching."), ("Playfulness & Energy", 5, "Acrobatic jumper; plays fetch and explores high shelves."), ("Friendliness with Other Pets", 5, "Extremely social; often cuddles with dogs and other cats for warmth."), ("Grooming Maintenance", 5, "Requires weekly baths, ear cleaning, and nail bed wiping.")],
        "familyComp": "Wonderful in busy, loving households. They hate being alone and thrive when paired with another pet.",
        "trainingTips": "Easily clicker-trained using meat treats; can learn to sit, fetch, and walk on a feline chest harness.",
        "colorOverview": "Pigment patterns are displayed directly on the skin leather, mirroring fur genetics (points, tabbies, solids).",
        "coatType": "Apparent hairlessness; fine downy fuzz with characteristic wrinkled skin on forehead and shoulders.",
        "palette": [("Solid Black / Blue", "Standard (Official)", "Dark slate-grey to jet-black skin pigment."), ("Pink / White", "Standard (Official)", "Pale peach-toned skin leather."), ("Tortoiseshell / Calico", "Standard (Official)", "Mottled black, cream, and red skin patches.")],
        "colorHealth": "Sun exposure causes severe sunburn and solar dermatosis; strictly indoor living with UV window film recommended.",
        "stages": [("8 Weeks Checkpoint", "8 Weeks", "1.5 – 2.5 lbs", "Acclimate kitten gently to warm baths, nail wiping, and ear cleaning."), ("16 Weeks Checkpoint", "16 Weeks", "3.5 – 5 lbs", "High caloric intake required; provide warm heated bed zones."), ("6 Months Checkpoint", "6 Months", "5 – 8 lbs", "Baseline echocardiogram screen for HCM; monitor skin oil levels."), ("Adult Benchmark", "12 Months", "6 – 12 lbs", "Muscular pot-bellied 'barrel' appearance is normal and healthy for the breed.")],
        "sizeClass": "CFA Medium Feline Standard (Muscular, medium-boned torso with barrel chest).",
        "sizeDiscTitle": "The Normal 'Pot Belly'",
        "sizeDiscText": "The Sphynx standard specifies a full, rounded abdomen as if having just eaten a large meal; this is normal anatomical breed conformation, not obesity.",
        "historySummary": "Bred in Toronto, Canada in 1966 when a domestic cat named Elizabeth gave birth to a hairless male kitten named Prune, identified as a spontaneous recessive mutation in the KRT71 keratin gene.",
        "milestones": [
            ("1966", "Prune the Pioneer", "A black-and-white domestic cat in Toronto produced 'Prune', the first recorded modern hairless kitten."),
            ("1975", "Wadena, Minnesota Foundation", "Farm cat 'Jezabelle' birthed hairless kittens 'Epidermis' and 'Dermis', establishing the American bloodline."),
            ("2002", "CFA Championship Status", "The Cat Fanciers' Association officially accepted the Sphynx for championship competition.")
        ],
        "facts": [
            ("Feels Like a Warm Peach", "Petting a Sphynx feels like handling a warm chamois leather cloth or a hot, ripe peach."),
            ("KRT71 Keratin Gene", "Their hairlessness is caused by a naturally occurring recessive mutation in the keratin 71 gene that disrupts the hair shaft root structure."),
            ("Earwax Buildup", "Without ear hairs to filter dust, Sphynx cats produce dark brown earwax that requires weekly gentle cleaning.")
        ]
    }
]

print(f"Loaded {len(NEW_BREEDS)} rich breed definitions.")
