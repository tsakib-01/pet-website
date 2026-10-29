from pathlib import Path
from PIL import Image
import io
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

def crop_to_1200x675(img: Image.Image) -> Image.Image:
    target_w, target_h = 1200, 675
    target_aspect = target_w / target_h

    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    elif img.mode != "RGB":
        img = img.convert("RGB")

    w, h = img.size
    current_aspect = w / h

    if current_aspect > target_aspect:
        # Wider than 16:9 -> crop horizontal
        new_w = int(h * target_aspect)
        left = (w - new_w) // 2
        top = 0
        right = left + new_w
        bottom = h
    else:
        # Taller than 16:9 -> crop vertical (slight upper bias to preserve animal faces)
        new_h = int(w / target_aspect)
        total_diff = h - new_h
        top = int(total_diff * 0.35)
        bottom = top + new_h
        left = 0
        right = w

    cropped = img.crop((left, top, right, bottom))
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    return resized

def optimize_to_target_kb(img: Image.Image, min_kb=42, max_kb=68) -> bytes:
    # Target 55 KB
    low_q = 20
    high_q = 98
    target_kb = (min_kb + max_kb) / 2
    best_data = None
    best_diff = float("inf")

    # Binary search across qualities
    for _ in range(8):
        mid_q = (low_q + high_q) // 2
        buf = io.BytesIO()
        img.save(buf, format="WEBP", quality=mid_q, method=4)
        data = buf.getvalue()
        size_kb = len(data) / 1024
        
        diff = abs(size_kb - target_kb)
        if diff < best_diff:
            best_diff = diff
            best_data = data
            
        if min_kb <= size_kb <= max_kb:
            return data
        elif size_kb > max_kb:
            high_q = mid_q - 1
        else:
            low_q = mid_q + 1

    return best_data

def process_file(file_path: Path):
    with Image.open(file_path) as img:
        resized = crop_to_1200x675(img)
        optimized_bytes = optimize_to_target_kb(resized)
    
    file_path.write_bytes(optimized_bytes)
    return len(optimized_bytes) / 1024

print("Starting processing of all 104 dogs...")
dog_dir = Path("public/images/breeds/dogs")
dog_results = []
for fn in dogs_expected:
    p = dog_dir / fn
    if not p.exists():
        print(f"ERROR: missing {fn}")
        continue
    kb = process_file(p)
    dog_results.append((fn, kb))

print(f"Processed {len(dog_results)} dogs.")

print("Starting processing of all 16 cats...")
cat_dir = Path("public/images/breeds/cats")
cat_results = []
for fn in cats_expected:
    p = cat_dir / fn
    if not p.exists():
        print(f"ERROR: missing {fn}")
        continue
    kb = process_file(p)
    cat_results.append((fn, kb))

print(f"Processed {len(cat_results)} cats.")

# Final Verification
all_results = dog_results + cat_results
outside_target = [r for r in all_results if r[1] < 40 or r[1] > 70]
print("\n--- FINAL AUDIT SUMMARY ---")
print(f"Total images processed: {len(all_results)} / 120")
print(f"Images outside 40KB - 70KB: {len(outside_target)}")
if outside_target:
    print("Outside target:", outside_target)

sizes = [r[1] for r in all_results]
print(f"Min Size: {min(sizes):.1f} KB")
print(f"Max Size: {max(sizes):.1f} KB")
print(f"Average Size: {sum(sizes)/len(sizes):.1f} KB")
