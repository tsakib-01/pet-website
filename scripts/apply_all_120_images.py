import os
import io
import json
import time
import urllib.request
from PIL import Image

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

with open("scripts/curated_manifest.json", "r", encoding="utf-8") as f:
    manifest = json.load(f)

# Add the 4 manual additions
manifest["lemon-beagle.webp"] = {
    "species": "dog",
    "query": "Lemon beagle",
    "candidate": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/c/c8/A_2_year_old_%E2%80%9Clemon%E2%80%9D_beagle.jpg",
        "title": "File:A 2 year old lemon beagle.jpg",
        "width": 1152,
        "height": 2048
    }
}

manifest["olde-english-bulldog.webp"] = {
    "species": "dog",
    "query": "Olde English Bulldogge",
    "candidate": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Duke_Olde_English_Bulldogge.jpg",
        "title": "File:Duke Olde English Bulldogge.jpg",
        "width": 800,
        "height": 600
    }
}

manifest["mini-australian-shepherd.webp"] = {
    "species": "dog",
    "query": "Miniature American Shepherd",
    "candidate": {
        "url": "https://images.dogapi.dog/0qhizujmr7t21q7zfxgoise02lzd",
        "title": "DogAPI Miniature American Shepherd",
        "width": 1200,
        "height": 800
    }
}

manifest["miniature-american-shepherd.webp"] = {
    "species": "dog",
    "query": "Miniature American Shepherd dog",
    "candidate": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Miniature-american-shepherd-herding.jpg",
        "title": "File:Miniature-american-shepherd-herding.jpg",
        "width": 800,
        "height": 533
    }
}

print(f"Total manifest entries to download and process: {len(manifest)}")

def crop_and_optimize(img: Image.Image) -> bytes:
    target_w, target_h = 1200, 675
    target_aspect = target_w / target_h

    if img.mode != 'RGB':
        img = img.convert('RGB')

    w, h = img.size
    current_aspect = w / h

    if current_aspect > target_aspect:
        # Wider: crop horizontally
        new_w = int(h * target_aspect)
        left = (w - new_w) // 2
        top = 0
        right = left + new_w
        bottom = h
    else:
        # Taller: crop vertically, top 35% focus
        new_h = int(w / target_aspect)
        total_diff = h - new_h
        top = int(total_diff * 0.35)
        bottom = top + new_h
        left = 0
        right = w

    cropped = img.crop((left, top, right, bottom))
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

    low_q, high_q = 20, 85
    best_data = None

    for _ in range(8):
        mid_q = (low_q + high_q) // 2
        buf = io.BytesIO()
        resized.save(buf, format='WEBP', quality=mid_q, method=4)
        data = buf.getvalue()
        kb = len(data) / 1024.0
        best_data = data
        if 42 <= kb <= 68:
            return data
        elif kb > 68:
            high_q = mid_q - 1
        else:
            low_q = mid_q + 1

    return best_data

success = 0
errors = []

for fn, info in manifest.items():
    sp = info["species"]
    url = info["candidate"]["url"]
    folder = "dogs" if sp == "dog" else "cats"
    out_path = os.path.join("public/images/breeds", folder, fn)

    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw_bytes = resp.read()
            img = Image.open(io.BytesIO(raw_bytes))
            orig_w, orig_h = img.size

        opt_bytes = crop_and_optimize(img)
        with open(out_path, 'wb') as f_out:
            f_out.write(opt_bytes)

        kb = len(opt_bytes) / 1024.0
        print(f"[OK] {fn:32s} (src: {orig_w}x{orig_h} -> {kb:4.1f} KB)")
        success += 1
        time.sleep(0.25)
    except Exception as e:
        print(f"[FAIL] {fn:32s}: {e}")
        errors.append((fn, str(e)))

print(f"\nFinal: {success}/{len(manifest)} processed.")
if errors:
    print(f"Errors ({len(errors)}):")
    for fn, err in errors:
        print(f"  - {fn}: {err}")
