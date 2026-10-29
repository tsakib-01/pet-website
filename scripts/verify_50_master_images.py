import os
from PIL import Image

DOGS = [
    "american-bulldog.webp",
    "australian-cattle-dog.webp",
    "australian-shepherd.webp",
    "basset-hound.webp",
    "beagle.webp",
    "belgian-malinois.webp",
    "bernese-mountain-dog.webp",
    "border-collie.webp",
    "boston-terrier.webp",
    "boxer-dog.webp",
    "brittany-dog.webp",
    "cockapoo.webp",
    "cocker-spaniel.webp",
    "dachshund.webp",
    "deer-head-chihuahua.webp",
    "doberman-pinscher.webp",
    "english-springer-spaniel.webp",
    "french-bulldog.webp",
    "german-shepherd.webp",
    "german-shorthaired-pointer.webp",
    "golden-retriever.webp",
    "great-dane.webp",
    "havanese.webp",
    "labrador-retriever.webp",
    "mini-pinscher.webp",
    "miniature-american-shepherd.webp",
    "olde-english-bulldog.webp",
    "papillon.webp",
    "pembroke-welsh-corgi.webp",
    "pomeranian.webp",
    "rhodesian-ridgeback.webp",
    "rottweiler.webp",
    "rough-collie.webp",
    "shepweiler-mix.webp",
    "shiba-inu.webp",
    "shih-tzu.webp",
    "siberian-husky.webp",
    "standard-poodle.webp",
    "vizsla.webp",
    "west-highland-white-terrier.webp",
    "yorkshire-terrier.webp",
]

CATS = [
    "american-shorthair.webp",
    "chartreux.webp",
    "devon-rex.webp",
    "egyptian-mau.webp",
    "himalayan.webp",
    "ragdoll.webp",
    "russian-blue.webp",
    "sphynx.webp",
    "turkish-angora.webp",
]

print("=== VERIFYING 41 DOG BREEDS ===")
dog_errors = 0
for fn in DOGS:
    p = os.path.join("public/images/breeds/dogs", fn)
    if not os.path.exists(p):
        print(f"MISSING: {p}")
        dog_errors += 1
        continue
    size_kb = os.path.getsize(p) / 1024.0
    with Image.open(p) as img:
        w, h = img.size
        fmt = img.format
        if w != 1200 or h != 675:
            print(f"WRONG DIMS: {fn} -> {w}x{h}")
            dog_errors += 1
        else:
            print(f"  [OK] {fn:32s}: {w}x{h} px, {size_kb:5.1f} KB, format={fmt}")

print("\n=== VERIFYING 9 CAT BREEDS ===")
cat_errors = 0
for fn in CATS:
    p = os.path.join("public/images/breeds/cats", fn)
    if not os.path.exists(p):
        print(f"MISSING: {p}")
        cat_errors += 1
        continue
    size_kb = os.path.getsize(p) / 1024.0
    with Image.open(p) as img:
        w, h = img.size
        fmt = img.format
        if w != 1200 or h != 675:
            print(f"WRONG DIMS: {fn} -> {w}x{h}")
            cat_errors += 1
        else:
            print(f"  [OK] {fn:32s}: {w}x{h} px, {size_kb:5.1f} KB, format={fmt}")

print(f"\nTotal Dog Errors: {dog_errors}, Cat Errors: {cat_errors}")
