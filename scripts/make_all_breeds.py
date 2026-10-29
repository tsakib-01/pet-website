import json
import os

# Helper to format a BreedData object in TypeScript
def breed_to_ts(b):
    calcs = [
        f"""      {{
        title: "{b['name']} Human Age Calculator",
        description: "Calculate exact biological human age with AVMA {b['species']} life-stage scaling.",
        href: "/tools/{'dog' if b['species'] == 'dog' else 'cat'}-age-calculator",
        iconType: "{'dog' if b['species'] == 'dog' else 'cat'}",
        tag: "Age Milestone",
      }}""",
        f"""      {{
        title: "{b['name']} Ergonomic Sizing Matcher",
        description: "Determine exact dimensions to promote healthy posture and comfortable den rest.",
        href: "/tools/{'dog-crate-size-calculator' if b['species'] == 'dog' else 'cat-litter-box-size-calculator'}",
        iconType: "box",
        tag: "Ergonomics",
      }}""",
        f"""      {{
        title: "{b['name']} Weight & Calorie Predictor",
        description: "Estimate adult weight curve and WSAVA daily caloric baseline for optimal body condition.",
        href: "/tools/{'puppy-weight-calculator' if b['species'] == 'dog' else 'cat-calorie-calculator'}",
        iconType: "scale",
        tag: "Growth & Nutrition",
      }}""",
        f"""      {{
        title: "Emergency Toxicity Triage",
        description: "Calculate immediate dosage triage if hazardous household toxins or plants are ingested.",
        href: "/tools/{'dog-chocolate-toxicity-calculator' if b['species'] == 'dog' else 'cat-toxicity-calculator'}",
        iconType: "heartPulse",
        tag: "Emergency Safety",
      }}"""
    ]
    calcs_str = ",\n".join(calcs)

    metrics = [
        f"""      {{ label: "Adult Weight", value: {json.dumps(b['weight'])}, subtext: {json.dumps(b['weightSub'])} }}""",
        f"""      {{ label: "Standing Height", value: {json.dumps(b['height'])}, subtext: {json.dumps(b['heightSub'])} }}""",
        f"""      {{ label: "{'Ideal Crate Size' if b['species'] == 'dog' else 'Litter Box Size'}", value: {json.dumps(b['crate'])}, subtext: {json.dumps(b['crateSub'])} }}""",
        f"""      {{ label: "Average Lifespan", value: {json.dumps(b['lifespan'])}, subtext: {json.dumps(b['lifespanSub'])} }}""",
        f"""      {{ label: "Daily Calories", value: {json.dumps(b['calories'])}, subtext: {json.dumps(b['caloriesSub'])} }}""",
        f"""      {{ label: "{'Activity Level' if b['species'] == 'dog' else 'Coat Care'}", value: {json.dumps(b['activity'])}, subtext: {json.dumps(b['activitySub'])} }}"""
    ]
    metrics_str = ",\n".join(metrics)

    risks = [
        f"""      {{
        name: {json.dumps(r[0])},
        severity: "{r[1]}",
        description: {json.dumps(r[2])},
        actionableCare: {json.dumps(r[3])},
      }}""" for r in b['risks']
    ]
    risks_str = ",\n".join(risks)

    faqs = [
        f"""      {{
        question: {json.dumps(f[0])},
        answer: {json.dumps(f[1])},
      }}""" for f in b['faqs']
    ]
    faqs_str = ",\n".join(faqs)

    traits = [
        f"""        {{ label: {json.dumps(t[0])}, score: {t[1]}, description: {json.dumps(t[2])} }}""" for t in b['traits']
    ]
    traits_str = ",\n".join(traits)

    palette = [
        f"""        {{ name: {json.dumps(p[0])}, category: "{p[1]}", description: {json.dumps(p[2])} }}""" for p in b['palette']
    ]
    palette_str = ",\n".join(palette)

    stages = [
        f"""        {{ stage: {json.dumps(s[0])}, timeline: {json.dumps(s[1])}, benchmark: {json.dumps(s[2])}, guidance: {json.dumps(s[3])} }}""" for s in b['stages']
    ]
    stages_str = ",\n".join(stages)

    milestones = [
        f"""        {{ era: {json.dumps(m[0])}, title: {json.dumps(m[1])}, description: {json.dumps(m[2])} }}""" for m in b['milestones']
    ]
    milestones_str = ",\n".join(milestones)

    facts = [
        f"""      {{ title: {json.dumps(ft[0])}, detail: {json.dumps(ft[1])} }}""" for ft in b['facts']
    ]
    facts_str = ",\n".join(facts)

    coats_json = json.dumps(b['coatVariations'])

    return f"""  // ========================================================
  // {b['name'].upper()} ({b['species'].upper()})
  // ========================================================
  {{
    slug: "{b['slug']}",
    name: "{b['name']}",
    species: "{b['species']}",
    tagline: {json.dumps(b['tagline'])},
    origin: "{b['origin']}",
    standardGroup: "{b['standardGroup']}",
    heroImage: "{b['heroImage']}",
    heroImageAlt: "{b['heroImageAlt']}",
    coatVariations: {coats_json},
    metrics: [
{metrics_str}
    ],
    calculatorLinks: [
{calcs_str}
    ],
    healthRisks: [
{risks_str}
    ],
    dietAndCareNotes:
      {json.dumps(b['diet'])},
    faqs: [
{faqs_str}
    ],
    temperament: {{
      overview:
        {json.dumps(b['tempOverview'])},
      traits: [
{traits_str}
      ],
      familyCompatibility: {json.dumps(b['familyComp'])},
      trainingTips: {json.dumps(b['trainingTips'])},
    }},
    colorGenetics: {{
      overview:
        {json.dumps(b['colorOverview'])},
      coatType: {json.dumps(b['coatType'])},
      palette: [
{palette_str}
      ],
      healthConsiderations: {json.dumps(b['colorHealth'])},
    }},
    growthMilestones: {{
      overview:
        "Consistent nutritional checkpoints ensure proper skeletal and muscle growth.",
      stages: [
{stages_str}
      ],
    }},
    sizeVarieties: {{
      officialClassification: {json.dumps(b['sizeClass'])},
      disclaimerTitle: {json.dumps(b['sizeDiscTitle'])},
      disclaimerText:
        {json.dumps(b['sizeDiscText'])},
    }},
    history: {{
      summary:
        {json.dumps(b['historySummary'])},
      milestones: [
{milestones_str}
      ],
    }},
    facts: [
{facts_str}
    ],
  }}"""

print("make_all_breeds updated with json.dumps.")
