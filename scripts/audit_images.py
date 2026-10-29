from pathlib import Path
from PIL import Image
import os

dogs_expected = [
    "french-bulldog.webp", "fluffy-french-bulldog.webp", "french-bulldog-puppies.webp", "merle-french-bulldog.webp",
    "blue-french-bulldog.webp", "lilac-french-bulldog.webp", "black-french-bulldog.webp", "black-french-bulldog-puppy.webp",
    "labrador-puppy.webp", "black-labrador.webp", "fox-red-labrador.webp", "white-labrador.webp", "labrador-mix.webp",
    "golden-retriever.webp", "golden-retriever-puppy.webp", "mini-golden-retriever.webp", "english-cream-golden-retriever.webp",
    "red-golden-retriever.webp", "black-golden-retriever.webp", "german-shepherd.webp", "old-german-shepherd.webp",
    "german-shepherd-training.webp", "black-german-shepherd.webp", "white-german-shepherd.webp", "mini-dachshund.webp",
    "long-haired-dachshund.webp", "wire-haired-dachshund.webp", "dapple-dachshund.webp", "dachshund-puppies.webp",
    "standard-poodle.webp", "mini-poodle.webp", "teacup-poodle.webp", "moyen-poodle.webp", "shih-poo.webp",
    "beagle.webp", "beagle-puppy.webp", "lemon-beagle.webp", "beagle-mix.webp", "rottweiler.webp", "baby-rottweiler.webp",
    "rottweiler-pitbull-mix.webp", "shepweiler-mix.webp", "roman-rottweiler.webp", "german-shorthaired-pointer.webp",
    "gsp-puppy.webp", "black-gsp.webp", "american-bulldog.webp", "olde-english-bulldog.webp", "yorkshire-terrier.webp",
    "yorkshire-terrier-puppy.webp", "australian-shepherd.webp", "mini-australian-shepherd.webp", "blue-merle-australian-shepherd.webp",
    "red-merle-australian-shepherd.webp", "border-aussie-mix.webp", "doberman-pinscher.webp", "red-doberman.webp",
    "blue-doberman.webp", "mini-pinscher.webp", "doberman-puppy.webp", "pembroke-welsh-corgi.webp", "boxer-dog.webp",
    "boxer-puppies.webp", "pomeranian.webp", "white-pomeranian.webp", "black-pomeranian.webp", "pomsky-mix.webp",
    "bernese-mountain-dog.webp", "bernedoodle.webp", "shih-tzu.webp", "shih-tzu-puppy.webp", "malshi.webp",
    "great-dane.webp", "harlequin-great-dane.webp", "black-great-dane.webp", "boston-terrier.webp", "blue-boston-terrier.webp",
    "deer-head-chihuahua.webp", "havanese.webp", "border-collie.webp", "red-border-collie.webp", "bordoodle.webp",
    "english-springer-spaniel.webp", "miniature-american-shepherd.webp", "siberian-husky.webp", "white-siberian-husky.webp",
    "red-siberian-husky.webp", "brittany-dog.webp", "belgian-malinois.webp", "black-belgian-malinois.webp",
    "cocker-spaniel-puppy.webp", "black-cocker-spaniel.webp", "cockapoo.webp", "basset-hound.webp", "vizsla.webp",
    "rough-collie.webp", "smooth-collie.webp", "rhodesian-ridgeback.webp", "papillon.webp", "shiba-inu.webp",
    "black-and-tan-shiba-inu.webp", "west-highland-white-terrier.webp", "blue-heeler.webp", "red-heeler.webp"
]

cats_expected = [
    "ragdoll-kitten.webp", "sphynx-cat.webp", "fat-sphynx-cat.webp", "baby-sphynx-cat.webp",
    "russian-blue-cat.webp", "russian-blue-kitten.webp", "american-shorthair-tabby.webp", "american-shorthair-kitten.webp",
    "himalayan-cat.webp", "himalayan-kitten.webp", "turkish-angora-cat.webp", "turkish-angora-kitten.webp",
    "devon-rex-cat.webp", "egyptian-mau.webp", "egyptian-mau-tabby-mix.webp", "chartreux-cat.webp"
]

print(f"Expected Dogs: {len(dogs_expected)}")
print(f"Expected Cats: {len(cats_expected)}")

dog_dir = Path("public/images/breeds/dogs")
cat_dir = Path("public/images/breeds/cats")

def audit_directory(directory, expected_list, label):
    missing = []
    dimension_mismatches = []
    size_issues = []
    sizes_kb = []
    
    for fn in expected_list:
        p = directory / fn
        if not p.exists():
            missing.append(fn)
            continue
        size_kb = os.path.getsize(p) / 1024
        sizes_kb.append(size_kb)
        
        try:
            with Image.open(p) as img:
                w, h = img.size
                fmt = img.format
                if (w, h) != (1200, 675):
                    dimension_mismatches.append((fn, w, h))
        except Exception as e:
            dimension_mismatches.append((fn, str(e)))
            
        if size_kb < 40 or size_kb > 70:
            size_issues.append((fn, f"{size_kb:.1f} KB"))

    print(f"\n--- {label} AUDIT ---")
    print(f"Total checked: {len(expected_list)}")
    print(f"Missing files: {len(missing)}")
    if missing:
        print(f"  Missing: {missing}")
    print(f"Dimension mismatches (!= 1200x675): {len(dimension_mismatches)}")
    if dimension_mismatches:
        print(f"  Sample dimensions: {dimension_mismatches[:3]}")
    print(f"Size issues (outside 40KB - 70KB): {len(size_issues)}")
    if sizes_kb:
        print(f"  Min size: {min(sizes_kb):.1f} KB, Max size: {max(sizes_kb):.1f} KB, Avg size: {sum(sizes_kb)/len(sizes_kb):.1f} KB")

audit_directory(dog_dir, dogs_expected, "DOGS")
audit_directory(cat_dir, cats_expected, "CATS")
