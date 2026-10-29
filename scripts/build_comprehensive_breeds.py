import json

# Comprehensive definitions for the 39 additional dogs and 8 additional cats.

DOG_DEFINITIONS = [
    {
        "slug": "labrador-retriever",
        "name": "Labrador Retriever",
        "species": "dog",
        "tagline": "America's perennial favorite family retriever: outgoing, athletic, gentle-tempered, and highly trainable.",
        "origin": "Newfoundland, Canada / United Kingdom",
        "standardGroup": "AKC Sporting Group",
        "heroImage": "/images/breeds/dogs/black-labrador.webp",
        "heroImageAlt": "Black Labrador Retriever in alert posture",
        "coatVariations": ["Yellow", "Black", "Chocolate", "Fox Red", "White", "Silver (Non-Standard Dilute)"],
        "metrics": [
            { "label": "Adult Weight", "value": "55 – 80 lbs", "subtext": "Males: 65–80 lbs • Females: 55–70 lbs" },
            { "label": "Standing Height", "value": "21.5 – 24.5 in", "subtext": "Floor to shoulder withers" },
            { "label": "Ideal Crate Size", "value": "42-Inch Crate", "subtext": "Large breed standard (+2 to 4\" buffer)" },
            { "label": "Average Lifespan", "value": "11 – 13 Years", "subtext": "Large canine life-stage pace" },
            { "label": "Daily Calories", "value": "1,200 – 1,600 kcal", "subtext": "WSAVA RER baseline for active adults" },
            { "label": "Activity Level", "value": "High Energy", "subtext": "Needs 60+ min daily exercise & swimming" }
        ],
        "healthRisks": [
            { "name": "Canine Hip & Elbow Dysplasia", "severity": "High Watch", "description": "Abnormal joint development leading to degenerative arthritis.", "actionableCare": "Screen parents via OFA/PennHIP before breeding; maintain lean BCS 4-5/9." },
            { "name": "Exercise-Induced Collapse (EIC)", "severity": "High Watch", "description": "Autosomal recessive mutation in dynamin 1 (DNM1) gene causing hindlimb collapse during strenuous exercise.", "actionableCare": "DNA test breeding stock; avoid intensive ball-retrieval in warm weather." },
            { "name": "Progressive Retinal Atrophy (prcd-PRA)", "severity": "Screening Advised", "description": "Bilateral degeneration of photoreceptor cells leading to progressive blindness.", "actionableCare": "Annual veterinary ophthalmic screening (CERF/CAER exams)." }
        ],
        "dietAndCareNotes": "Labradors possess a genetic deletion in the POMC gene associated with constant appetite and obesity predisposition. Strictly measure food using a gram kitchen scale and avoid free-feeding.",
        "faqs": [
            { "question": "What is the difference between English and American Labradors?", "answer": "English (show/bench) Labradors are heavier, stockier, with wider heads and thick otter tails. American (field/working) Labradors are taller, leaner, and possess higher drive and stamina." },
            { "question": "Are Silver Labradors purebred?", "answer": "The AKC registers Silver Labradors under Chocolate, but the silver coat arises from a dilute 'd' gene mutation, widely debated as originating from historical Weimaraner outcrosses." },
            { "question": "How much exercise does a Labrador puppy need daily?", "answer": "Follow the 5-minute rule: 5 minutes of structured exercise per month of age twice daily (e.g. 20 minutes twice daily at 4 months) to protect growing epiphyseal growth plates." },
            { "question": "Do Labradors shed heavily?", "answer": "Yes. Labradors possess a dense water-repellent double coat that sheds year-round with twice-yearly heavy seasonal blowouts requiring daily slicker brushing." }
        ],
        "temperament": {
            "overview": "Renowned for their friendly, eager-to-please nature. Highly social pack animals that integrate seamlessly with children, multi-dog households, and therapy roles.",
            "traits": [
                { "label": "Affection with Family", "score": 5, "description": "Exceptionally devoted and human-focused." },
                { "label": "Trainability & Focus", "score": 5, "description": "Top-tier intelligence; excels in obedience, retrieving, and service work." },
                { "label": "Energy & Drive", "score": 4, "description": "Athletic working drive requiring vigorous daily mental and physical stimulation." },
                { "label": "Barking & Guarding", "score": 2, "description": "Low watchdog instinct; generally welcomes strangers warmly." }
            ],
            "familyCompatibility": "Outstanding with children of all ages and other pets. Their enthusiasm requires early impulse control training around toddlers.",
            "trainingTips": "Use positive reinforcement retriever games and food puzzles. Early leash manners are vital before they reach 70+ lbs of pulling strength."
        },
        "colorGenetics": {
            "overview": "Inheritance governed by the B (Black/Chocolate) and E (Extension/Yellow) epistatic gene loci.",
            "coatType": "Dense, short, water-resistant double coat with coarse guard hairs.",
            "palette": [
                { "name": "Black", "category": "Standard (Official)", "description": "Dominant B_E_ genotype; traditional historic working coat." },
                { "name": "Yellow", "category": "Standard (Official)", "description": "Homozygous recessive ee genotype, ranging from Fox Red to English Cream." },
                { "name": "Chocolate", "category": "Standard (Official)", "description": "Homozygous recessive bbE_ genotype; rich liver to deep chocolate." }
            ],
            "healthConsiderations": "Chocolate Labradors have an empirically documented median lifespan ~10% shorter than black/yellow counterparts according to UK VetCompass studies."
        },
        "growthMilestones": {
            "overview": "Rapid skeletal development up to 9 months, filling out in muscular breadth through 18-24 months.",
            "stages": [
                { "stage": "8 Weeks Checkpoint", "timeline": "8 Weeks", "benchmark": "11 – 15 lbs", "guidance": "Initial DA2PP core vaccines and gradual transition to large-breed puppy formula." },
                { "stage": "16 Weeks Checkpoint", "timeline": "16 Weeks", "benchmark": "28 – 36 lbs", "guidance": "Begin basic recall and retriever impulse control; monitor joint growth plates." },
                { "stage": "6 Months Checkpoint", "timeline": "6 Months", "benchmark": "45 – 58 lbs", "guidance": "Reached roughly 65-70% of adult body weight; transition out of intensive jumping." },
                { "stage": "Adult Benchmark", "timeline": "14 – 18 Months", "benchmark": "55 – 80 lbs", "guidance": "Physiological skeletal maturity; safe to perform OFA hip/elbow clearance radiographs." }
            ]
        },
        "sizeVarieties": {
            "officialClassification": "AKC Sporting Dog Standard (21.5 to 24.5 inches at withers).",
            "disclaimerTitle": "English (Bench) vs. American (Field) Classifications",
            "disclaimerText": "While bench and field lines share the same breed standard, field lines are frequently leaner and taller, whereas bench lines carry heavier bone and broader muzzles."
        },
        "history": {
            "summary": "Bred originally in Newfoundland from the St. John's Water Dog to retrieve fishermen's nets and duck game in freezing Atlantic surf.",
            "milestones": [
                { "era": "1800s", "title": "St. John's Water Dog Roots", "description": "Fishermen in Newfoundland bred cold-water swimming dogs with otter-like water-shedding tails." },
                { "era": "1885", "title": "British Nobility Patronage", "description": "Earl of Malmesbury imported the dogs to Dorset, England, refining them into specialized upland and waterfowl retrievers." },
                { "era": "1917", "title": "AKC Official Recognition", "description": "Formally admitted to the AKC Stud Book, going on to become the #1 most registered breed in US history for over 30 consecutive years." }
            ]
        },
        "facts": [
            { "title": "Webbed Paws & Otter Tail", "detail": "Labradors possess anatomical webbing between their toes and an exceptionally powerful cylindrical tail that functions as a hydrodynamic rudder." },
            { "title": "Soft Mouth Mastery", "detail": "Bred to carry game without puncturing skin, a well-trained Labrador can hold an uncooked egg in its jaws without cracking the shell." },
            { "title": "POMC Food Gene Mutation", "detail": "Roughly 25% of Labradors carry a POMC gene deletion that disrupts brain satiation signaling, explaining their insatiable food drive." }
        ]
    },
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
        "metrics": [
            { "label": "Adult Weight", "value": "55 – 75 lbs", "subtext": "Males: 65–75 lbs • Females: 55–65 lbs" },
            { "label": "Standing Height", "value": "21.5 – 24 in", "subtext": "Floor to shoulder withers" },
            { "label": "Ideal Crate Size", "value": "42-Inch Crate", "subtext": "Large sporting standard (+2 to 4\" buffer)" },
            { "label": "Average Lifespan", "value": "10 – 12 Years", "subtext": "Sporting canine life-stage pace" },
            { "label": "Daily Calories", "value": "1,150 – 1,500 kcal", "subtext": "WSAVA RER baseline for active adults" },
            { "label": "Activity Level", "value": "High Energy", "subtext": "Needs 60+ min daily running, fetching, or hiking" }
        ],
        "healthRisks": [
            { "name": "Hemangiosarcoma & Lymphoma", "severity": "High Watch", "description": "High hereditary incidence of endothelial and lymphoid malignancies in Golden lines.", "actionableCare": "Bi-annual veterinary screening post-age 6; maintain lean body mass and explore early cancer liquid biopsy screens." },
            { "name": "Subvalvular Aortic Stenosis (SAS)", "severity": "High Watch", "description": "Congenital narrowing below the aortic valve creating cardiac murmur and left ventricular hypertrophy.", "actionableCare": "Echocardiogram cardiac auscultation by board-certified veterinary cardiologist before breeding." },
            { "name": "Ichthyosis (Feline/Canine Scaling)", "severity": "Moderate", "description": "Recessive PNPLA1 gene mutation causing large, dry, brown-black skin scales.", "actionableCare": "DNA genetic test breeding stock; manage affected dogs with essential fatty acid rinses." }
        ],
        "dietAndCareNotes": "Golden Retrievers are prone to grain-free diet-associated Dilated Cardiomyopathy (DCM). Feed a nutritionally complete diet formulated by veterinary nutritionists meeting AAFCO/WSAVA standards.",
        "faqs": [
            { "question": "What is the difference between English Cream and American Golden Retrievers?", "answer": "English Cream is a color descriptor for Golden Retrievers bred to the Kennel Club (UK) standard, which permits paler cream coats, broader skulls, and more level backs than the AKC standard." },
            { "question": "Are Red Goldens a separate breed?", "answer": "No. Field-bred Golden Retrievers often exhibit a rich dark red or mahogany coat. They are purebred Golden Retrievers, typically slightly leaner with higher hunting drive." },
            { "question": "How often do Golden Retrievers need grooming?", "answer": "Brush 3 to 4 times weekly with an undercoat rake and slicker brush to prevent feathering mats around ears, groin, and tail." },
            { "question": "Why do Golden Retrievers carry objects in their mouths?", "answer": "Their genetic retrieving instinct compels them to hold toys, socks, or sticks when excited as a self-soothing and communicative behavior." }
        ],
        "temperament": {
            "overview": "Celebrated for their affectionate, calm, and forgiving disposition. Naturally eager to please and trustworthy with small children and other animals.",
            "traits": [
                { "label": "Patience with Children", "score": 5, "description": "Top-tier family companion; gentle and tolerant." },
                { "label": "Trainability", "score": 5, "description": "High working biddability; excels in search and rescue and therapy." },
                { "label": "Stranger Friendliness", "score": 5, "description": "Welcomes visitors enthusiastically; not a guard dog." },
                { "label": "Playfulness", "score": 4, "description": "Maintains puppy-like playfulness into senior years." }
            ],
            "familyCompatibility": "Flourishes in active households where they are integrated into daily human activities.",
            "trainingTips": "Responds best to gentle praise and positive rewards. Harsh corrections damage their sensitive, cooperative nature."
        },
        "colorGenetics": {
            "overview": "Regulated by the pheomelanin intensity loci on top of a fixed homozygous recessive ee yellow coat.",
            "coatType": "Dense, water-repellent double coat with rich feathering on legs, chest, and tail.",
            "palette": [
                { "name": "Light Golden / Cream", "category": "Standard (Official)", "description": "Pale luster coat popular in European lines." },
                { "name": "Rich Golden", "category": "Standard (Official)", "description": "Classic shimmering honey-gold coat." },
                { "name": "Dark Golden / Red", "category": "Standard (Official)", "description": "Deep copper-red shade common in field working lines." }
            ],
            "healthConsiderations": "Lighter or darker shades carry no inherent genetic health differences; beware of breeders marketing 'rare white' at exorbitant markups."
        },
        "growthMilestones": {
            "overview": "Reaches full adult height around 12 months, developing adult feathering and chest depth through 2 years.",
            "stages": [
                { "stage": "8 Weeks Checkpoint", "timeline": "8 Weeks", "benchmark": "10 – 14 lbs", "guidance": "Socialize gently with novel textures and sounds; begin crate training." },
                { "stage": "16 Weeks Checkpoint", "timeline": "16 Weeks", "benchmark": "26 – 34 lbs", "guidance": "Puppy obedience class; focus on soft-mouth bite inhibition." },
                { "stage": "6 Months Checkpoint", "timeline": "6 Months", "benchmark": "42 – 55 lbs", "guidance": "Monitor adolescent growth; avoid high-impact jumping onto hard surfaces." },
                { "stage": "Adult Benchmark", "timeline": "14 – 18 Months", "benchmark": "55 – 75 lbs", "guidance": "Complete adult skeletal maturation and coat feathering." }
            ]
        },
        "sizeVarieties": {
            "officialClassification": "AKC Sporting Dog Standard (21.5 to 24 inches at shoulder).",
            "disclaimerTitle": "Beware of 'Mini Golden Retrievers'",
            "disclaimerText": "'Miniature Golden Retrievers' are not purebred Goldens; they are crossbreeds typically created with Cocker Spaniels or Poodles."
        },
        "history": {
            "summary": "Developed in 1868 at Guisachan estate in Scotland by Dudley Marjoribanks (Lord Tweedmouth) by crossing a yellow retriever with a Tweed Water Spaniel.",
            "milestones": [
                { "era": "1868", "title": "Guisachan Foundation", "description": "Lord Tweedmouth bred 'Nous' (Yellow Retriever) with 'Belle' (Tweed Water Spaniel) to retrieve game in dense brush and lochs." },
                { "era": "1911", "title": "The Kennel Club (UK)", "description": "Formally recognized as 'Retriever - Yellow or Golden'." },
                { "era": "1925", "title": "AKC Registration", "description": "Admitted to the American Kennel Club Stud Book, becoming a premier companion and service dog globally." }
            ]
        },
        "facts": [
            { "title": "Lord Tweedmouth Stud Book", "detail": "The breed's exact foundational breeding records were kept meticulously by Lord Tweedmouth and discovered in 1952." },
            { "title": "#1 Guide & Service Dog", "detail": "Due to their high biddability, gentle temperament, and size, Goldens comprise a massive percentage of seeing-eye and assistance dogs." },
            { "title": "Three Distinct Styles", "detail": "Three variations exist: American, Canadian (taller and darker), and British (blockier with lighter cream hues)." }
        ]
    },
    {
        "slug": "german-shepherd",
        "name": "German Shepherd",
        "species": "dog",
        "tagline": "Noble, loyal, and extraordinarily versatile working canine: revered as the ultimate protector, service, and police dog.",
        "origin": "Germany",
        "standardGroup": "AKC Herding Group",
        "heroImage": "/images/breeds/dogs/german-shepherd.webp",
        "heroImageAlt": "German Shepherd dog in focused working stance",
        "coatVariations": ["Black & Tan", "Sable", "Bi-Color", "Solid Black", "White (UKC/FCI Swiss Shepherd)", "Silver & Black"],
        "metrics": [
            { "label": "Adult Weight", "value": "50 – 90 lbs", "subtext": "Males: 65–90 lbs • Females: 50–70 lbs" },
            { "label": "Standing Height", "value": "22 – 26 inches", "subtext": "Floor to shoulder withers" },
            { "label": "Ideal Crate Size", "value": "42 or 48-Inch Crate", "subtext": "Large herding standard (+2 to 4\" buffer)" },
            { "label": "Average Lifespan", "value": "9 – 12 Years", "subtext": "Large working canine pace" },
            { "label": "Daily Calories", "value": "1,300 – 1,750 kcal", "subtext": "WSAVA RER baseline for working adults" },
            { "label": "Activity Level", "value": "Very High Energy", "subtext": "Needs 90+ min daily structured work and mental puzzles" }
        ],
        "healthRisks": [
            { "name": "Degenerative Myelopathy (DM)", "severity": "High Watch", "description": "Fatal neurodegenerative spinal cord disorder caused by SOD1 gene mutation resulting in progressive hindlimb paralysis.", "actionableCare": "DNA screen breeding parents; physical rehabilitation and cart therapy for affected dogs." },
            { "name": "Gastric Dilatation-Volvulus (GDV / Bloat)", "severity": "High Watch", "description": "Deep-chested anatomy allows stomach to distend and twist on its mesenteric axis, cutting off venous return.", "actionableCare": "Discuss preventive laparoscopic gastropexy with your veterinarian during spay/neuter." },
            { "name": "Exocrine Pancreatic Insufficiency (EPI)", "severity": "Moderate", "description": "Atrophy of acinar cells causing failure to digest food and severe weight loss.", "actionableCare": "Lifelong pancreatic enzyme replacement therapy (cTLI blood test for diagnosis)." }
        ],
        "dietAndCareNotes": "German Shepherds have sensitive digestive tracts. Avoid sudden dietary transitions and limit post-meal strenuous running for at least 60 minutes to reduce GDV bloat risk.",
        "faqs": [
            { "question": "What is the difference between working line and show line German Shepherds?", "answer": "Working lines (Czech, DDR, West German working) possess straighter backs, compact frames, extreme drive, and high energy. Show lines feature more angulated roached toplines and lower drive." },
            { "question": "Are German Shepherds good with children?", "answer": "When properly socialized and raised in a structured family environment, they are fiercely loyal and protective guardians of children." },
            { "question": "Why do German Shepherd ears take time to stand up?", "answer": "Ear cartilage hardens gradually between 4 and 7 months, often drooping during the teething phase as calcium is diverted to adult teeth development." },
            { "question": "How much do German Shepherds shed?", "answer": "Known affectionately as 'German Shedders', they blow their dense undercoat twice annually and shed moderately year-round." }
        ],
        "temperament": {
            "overview": "Aloof with strangers, fearless, exceptionally intelligent, and devoted to their handlers. They require a confident owner who provides calm, consistent leadership.",
            "traits": [
                { "label": "Loyalty & Devotion", "score": 5, "description": "Forms an unbreakable bond with primary handler and family." },
                { "label": "Watchdog & Protection", "score": 5, "description": "Natural territorial and personal protection instinct." },
                { "label": "Intelligence & Drive", "score": 5, "description": "Learns complex multi-step commands rapidly." },
                { "label": "Need for Mental Work", "score": 5, "description": "Requires structured jobs (nosework, agility, obedience) to prevent boredom." }
            ],
            "familyCompatibility": "Ideal for active, experienced owners who can provide daily mental engagement and leadership.",
            "trainingTips": "Focus heavily on early neutral socialization with people and other dogs to channel their natural guardian instincts constructively."
        },
        "colorGenetics": {
            "overview": "Controlled by the Agouti (a) and Extension (E) series, creating rich saddle, sable, and solid phenotypes.",
            "coatType": "Medium double coat with straight, harsh outer hair and dense undercoat (long-coat variety also recognized).",
            "palette": [
                { "name": "Black & Tan", "category": "Standard (Official)", "description": "Classic saddle pattern with black mantle and rich tan legs." },
                { "name": "Sable / Agouti", "category": "Standard (Official)", "description": "Banded hairs with black tips; the predominant color of working and military lines." },
                { "name": "Solid Black", "category": "Standard (Official)", "description": "Recessive black (aa) or dominant black mutation; sleek midnight coat." }
            ],
            "healthConsiderations": "White German Shepherds carry an autosomal recessive gene; recognized as a distinct breed (Berger Blanc Suisse) in Europe."
        },
        "growthMilestones": {
            "overview": "Substantial bone growth through 12 months; chest depth and masculine head features mature through 2.5 to 3 years.",
            "stages": [
                { "stage": "8 Weeks Checkpoint", "timeline": "8 Weeks", "benchmark": "13 – 19 lbs", "guidance": "Start crate routine and bite inhibition; feed calcium-balanced large breed puppy kibble." },
                { "stage": "16 Weeks Checkpoint", "timeline": "16 Weeks", "benchmark": "32 – 44 lbs", "guidance": "Teething stage; ears may fluctuate between standing and floppy." },
                { "stage": "6 Months Checkpoint", "timeline": "6 Months", "benchmark": "48 – 65 lbs", "guidance": "Adolescent phase begins; reinforce boundary obedience and loose-leash walking." },
                { "stage": "Adult Benchmark", "timeline": "18 – 24 Months", "benchmark": "50 – 90 lbs", "guidance": "Skeletal plates fused; evaluate OFA hip and elbow certifications." }
            ]
        },
        "sizeVarieties": {
            "officialClassification": "AKC Herding Dog Standard (22 to 26 inches at withers).",
            "disclaimerTitle": "King Shepherd / Shiloh Shepherd Distinctions",
            "disclaimerText": "Oversized 'King Shepherds' or 'Old German Shepherds' weighing over 100 lbs are distinct outcross creations not recognized by the AKC parent club."
        },
        "history": {
            "summary": "Standardized in 1899 by Captain Max von Stephanitz from indigenous German herding varieties, emphasizing working utility and mental stability.",
            "milestones": [
                { "era": "1899", "title": "Von Stephanitz Standardization", "description": "Captain Max von Stephanitz bought 'Hektor Linksrhein' (Horand von Grafrath), creating the SV registry." },
                { "era": "1914", "title": "WWI Red Cross & Messenger Service", "description": "Served as trench messengers, sentry guards, and medical aid dogs in WWI, astounding Allied troops with their courage." },
                { "era": "1920s", "title": "Hollywood Stardom", "description": "Rin Tin Tin and Strongheart popularized the breed globally, demonstrating their remarkable Hollywood acting trainability." }
            ]
        },
        "facts": [
            { "title": "Horand von Grafrath: Breed Father", "detail": "All purebred German Shepherds trace their lineage directly back to Horand von Grafrath, the first registered German Shepherd in 1899." },
            { "title": "Bite Force Power", "detail": "A full-grown German Shepherd possesses a bite force estimated at over 238 PSI, adapted for apprehending suspects safely." },
            { "title": "Military Working Dog (MWD)", "detail": "German Shepherds and their close cousins, Belgian Malinois, make up the vast majority of military explosive detection and patrol dogs." }
        ]
    }
]

print("Script template ready.")
