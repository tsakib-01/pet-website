import json
import os

# We will define the 49 breeds with complete clinical accuracy.
# Dogs: 40 breeds
# Cats: 9 breeds

def make_dog_calculators(name, slug):
    return [
        {
            "title": f"{name} Human Age Calculator",
            "description": f"Calculate exact biological human age for {name} with AVMA life-stage scaling.",
            "href": "/tools/dog-age-calculator",
            "iconType": "dog",
            "tag": "Age Milestone"
        },
        {
            "title": f"{name} Crate Sizing Ergonomics",
            "description": f"Determine ideal crate length and clearance to prevent claustrophobia and support den instincts.",
            "href": "/tools/dog-crate-size-calculator",
            "iconType": "box",
            "tag": "Ergonomics"
        },
        {
            "title": f"{name} Adult Weight Predictor",
            "description": f"Estimate adult skeletal weight curve from pediatric growth checkpoints.",
            "href": "/tools/puppy-weight-calculator",
            "iconType": "scale",
            "tag": "Growth Curve"
        },
        {
            "title": "Emergency Chocolate Toxicity Triage",
            "description": "Calculate immediate theobromine mg/kg dosage triage if chocolate or cocoa is accidentally ingested.",
            "href": "/tools/dog-chocolate-toxicity-calculator",
            "iconType": "heartPulse",
            "tag": "Emergency Triage"
        }
    ]

def make_cat_calculators(name, slug):
    return [
        {
            "title": f"{name} Human Age Converter",
            "description": f"Convert your {name}'s chronological age into human developmental life stages according to AAFP feline standards.",
            "href": "/tools/cat-age-calculator",
            "iconType": "cat",
            "tag": "Life Stage"
        },
        {
            "title": f"{name} Caloric & Portion Calculator",
            "description": f"Calculate daily resting energy requirements (RER) scaled to lean body mass and indoor activity.",
            "href": "/tools/cat-calorie-calculator",
            "iconType": "utensils",
            "tag": "WSAVA Nutrition"
        },
        {
            "title": f"{name} Ergonomic Litter Box Matcher",
            "description": f"Determine exact litter pan length (1.5x feline body length from nose to tail base) for comfort.",
            "href": "/tools/cat-litter-box-size-calculator",
            "iconType": "box",
            "tag": "Feline Ergonomics"
        },
        {
            "title": "Lilies & Plant Toxicity Emergency Guide",
            "description": "Critical emergency toxicity protocols for nephrotoxic plant ingestion.",
            "href": "/tools/cat-toxicity-calculator",
            "iconType": "heartPulse",
            "tag": "Toxicology"
        }
    ]

print("Calculator generator helper defined.")
