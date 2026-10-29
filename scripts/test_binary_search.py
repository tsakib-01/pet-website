from pathlib import Path
from PIL import Image
import io

def crop_to_1200x675(img: Image.Image) -> Image.Image:
    target_w, target_h = 1200, 675
    target_aspect = target_w / target_h

    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

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
        top = int(total_diff * 0.4)
        bottom = top + new_h
        left = 0
        right = w

    cropped = img.crop((left, top, right, bottom))
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    return resized

def optimize_webp_binary_search(img: Image.Image, min_kb=42, max_kb=68) -> bytes:
    low_q = 25
    high_q = 90
    best_data = None
    best_diff = float('inf')
    target_kb = (min_kb + max_kb) / 2 # ~55 KB

    for _ in range(6): # binary search iterations
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
            # Inside ideal target window!
            return data
        elif size_kb > max_kb:
            # Too big, lower quality
            high_q = mid_q - 1
        else:
            # Too small, raise quality
            low_q = mid_q + 1

    return best_data

test_files = [
    Path("public/images/breeds/dogs/french-bulldog.webp"),
    Path("public/images/breeds/dogs/black-labrador.webp"),
    Path("public/images/breeds/cats/ragdoll-kitten.webp"),
    Path("public/images/breeds/cats/sphynx-cat.webp")
]

for p in test_files:
    with Image.open(p) as img:
        resized = crop_to_1200x675(img)
        data = optimize_webp_binary_search(resized)
        print(f"{p.name}: {len(data) / 1024:.1f} KB, dimensions: {resized.size}")
