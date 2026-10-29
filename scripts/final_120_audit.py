import os
from PIL import Image

with open("src/data/breeds.ts", "r", encoding="utf-8") as f:
    text = f.read()

import re
pattern = r'{\s*filename:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*species:\s*"([^"]+)",\s*path:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*breedSlug:\s*"([^"]+)"\s*}'
matches = re.findall(pattern, text[text.find("export const ALL_BREED_IMAGES"):])

print(f"Total entries in ALL_BREED_IMAGES: {len(matches)}")
errors = 0
for i, (fn, name, sp, path, slug, bs) in enumerate(matches, 1):
    local_p = os.path.join("public", path.lstrip("/"))
    if not os.path.exists(local_p):
        print(f"[MISSING] #{i} {fn} ({name}) at {local_p}")
        errors += 1
        continue
    size_kb = os.path.getsize(local_p) / 1024.0
    with Image.open(local_p) as img:
        w, h = img.size
        fmt = img.format
        if w != 1200 or h != 675 or fmt != "WEBP":
            print(f"[BAD FORMAT] #{i} {fn} -> {w}x{h}, fmt={fmt}")
            errors += 1
        else:
            print(f"  [OK] #{i:3d} [{sp.upper()}] {fn:32s}: {w}x{h} px, {size_kb:4.1f} KB - {name}")

print(f"\nFinal Audit: {len(matches) - errors}/{len(matches)} files perfect. Errors: {errors}")
