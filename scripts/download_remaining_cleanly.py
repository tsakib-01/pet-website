import os
import io
import json
import time
import urllib.request
from PIL import Image

HEADERS = {
    "User-Agent": "PawTruthPetSafetyBot/2.0 (https://pawtruth.com; safety@pawtruth.com; research education)"
}

DOGAPI_MAP = {
    "beagle.webp": "https://images.dogapi.dog/oy3795t5qluydyj427j6mjxvnwu8",
    "rottweiler.webp": "https://images.dogapi.dog/mb9v8jgfanldjyfs73ylesj1pv71",
    "doberman-pinscher.webp": "https://images.dogapi.dog/6jzj710ffjnh3vev99ivzp05jf8x",
    "boxer-dog.webp": "https://images.dogapi.dog/vigxepzqtxp4ru30qi9ar4zgdfi5",
    "shih-tzu.webp": "https://images.dogapi.dog/3a2jhitvzgvz0xsgbqhxhuajuqxc",
    "boston-terrier.webp": "https://images.dogapi.dog/vfmphaxkl9rd6ur9skvgidjnutmw",
    "havanese.webp": "https://images.dogapi.dog/sx1x8uzqbmx968k65mfen11ssp0a",
    "brittany-dog.webp": "https://images.dogapi.dog/clsgbbwv22dx6ozqip8277wuk5zn",
    "rhodesian-ridgeback.webp": "https://images.dogapi.dog/ulm9s1wjntdrparqi8cf759353wh",
    "shiba-inu.webp": "https://images.dogapi.dog/6nrj3aqs59igswqvj0bs92hipyp0",
    "mini-dachshund.webp": "https://images.dogapi.dog/h42l1qmj60ebf9jadrr2avoz4a2k",
    "rough-collie.webp": "https://images.dogapi.dog/8an9ycu6ej78domwbsgb7ya8w2u4",
}

with open("scripts/curated_manifest.json", "r", encoding="utf-8") as f:
    manifest = json.load(f)

# The manual items
manifest["lemon-beagle.webp"] = {
    "species": "dog",
    "candidate": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/c/c8/A_2_year_old_%E2%80%9Clemon%E2%80%9D_beagle.jpg"
    }
}
manifest["olde-english-bulldog.webp"] = {
    "species": "dog",
    "candidate": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Duke_Olde_English_Bulldogge.jpg"
    }
}
manifest["mini-australian-shepherd.webp"] = {
    "species": "dog",
    "candidate": {
        "url": "https://images.dogapi.dog/0qhizujmr7t21q7zfxgoise02lzd"
    }
}
manifest["miniature-american-shepherd.webp"] = {
    "species": "dog",
    "candidate": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Miniature-american-shepherd-herding.jpg"
    }
}

RETRY_LIST = [
    "blue-french-bulldog.webp",
    "white-german-shepherd.webp",
    "mini-dachshund.webp",
    "moyen-poodle.webp",
    "beagle.webp",
    "beagle-mix.webp",
    "rottweiler.webp",
    "roman-rottweiler.webp",
    "doberman-pinscher.webp",
    "blue-doberman.webp",
    "boxer-dog.webp",
    "white-pomeranian.webp",
    "black-pomeranian.webp",
    "black-great-dane.webp",
    "shih-tzu.webp",
    "boston-terrier.webp",
    "havanese.webp",
    "white-siberian-husky.webp",
    "red-siberian-husky.webp",
    "brittany-dog.webp",
    "black-cocker-spaniel.webp",
    "rough-collie.webp",
    "smooth-collie.webp",
    "rhodesian-ridgeback.webp",
    "shiba-inu.webp",
    "black-and-tan-shiba-inu.webp",
    "fat-sphynx-cat.webp",
    "american-shorthair-kitten.webp",
    "himalayan-cat.webp",
    "chartreux-cat.webp",
    "lemon-beagle.webp",
    "miniature-american-shepherd.webp"
]

def crop_and_optimize(img: Image.Image) -> bytes:
    target_w, target_h = 1200, 675
    target_aspect = target_w / target_h

    if img.mode != 'RGB':
        img = img.convert('RGB')

    w, h = img.size
    current_aspect = w / h

    if current_aspect > target_aspect:
        new_w = int(h * target_aspect)
        left = (w - new_w) // 2
        top = 0
        right = left + new_w
        bottom = h
    else:
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

def download_with_retry(url, max_retries=3):
    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20) as resp:
                return resp.read()
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait_sec = 4 * (attempt + 1)
                print(f"    [429] Waiting {wait_sec}s to retry...")
                time.sleep(wait_sec)
            else:
                raise
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            time.sleep(2)
    raise Exception("Max retries exceeded")

print(f"Retrying {len(RETRY_LIST)} items...")
success = 0
for fn in RETRY_LIST:
    info = manifest.get(fn, {})
    sp = info.get("species", "dog" if not "cat" in fn else "cat")
    folder = "dogs" if sp == "dog" else "cats"
    out_path = os.path.join("public/images/breeds", folder, fn)

    # Prefer DOGAPI_MAP if available
    url = DOGAPI_MAP.get(fn, info.get("candidate", {}).get("url"))
    if not url:
        print(f"[SKIP] No URL for {fn}")
        continue

    print(f"Processing {fn}...")
    try:
        raw_bytes = download_with_retry(url)
        img = Image.open(io.BytesIO(raw_bytes))
        opt_bytes = crop_and_optimize(img)
        with open(out_path, 'wb') as f_out:
            f_out.write(opt_bytes)
        kb = len(opt_bytes) / 1024.0
        print(f"  [OK] Saved {fn} ({kb:.1f} KB)")
        success += 1
        time.sleep(1.8) # Respect Wikimedia Commons rate limit
    except Exception as e:
        print(f"  [FAIL] {fn}: {e}")

print(f"\nFinished: {success}/{len(RETRY_LIST)} successfully updated.")
