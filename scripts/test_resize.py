from pathlib import Path
from PIL import Image
import io

def crop_to_1200x675(img: Image.Image) -> Image.Image:
    # Target aspect ratio: 1200 / 675 = 16 / 9 = 1.777777...
    target_w, target_h = 1200, 675
    target_aspect = target_w / target_h

    # Convert to RGB if necessary (e.g. RGBA or P)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    w, h = img.size
    current_aspect = w / h

    if current_aspect > target_aspect:
        # Image is wider than 16:9, crop left/right
        new_w = int(h * target_aspect)
        left = (w - new_w) // 2
        top = 0
        right = left + new_w
        bottom = h
    else:
        # Image is taller than 16:9 (e.g. 1200x800 which is 1.5), crop top/bottom
        new_h = int(w / target_aspect)
        # Center crop with slight bias towards top 40% (since heads of dogs/cats are usually in upper half)
        total_diff = h - new_h
        top = int(total_diff * 0.4) # slightly favor top
        bottom = top + new_h
        left = 0
        right = w

    cropped = img.crop((left, top, right, bottom))
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    return resized

def optimize_to_target_size(img: Image.Image, min_kb=42, max_kb=68) -> bytes:
    # Binary search or progressive stepping for WebP quality to hit 40-70 KB
    # Let's try quality from 60 to 95
    best_data = None
    best_diff = float('inf')
    target_kb = (min_kb + max_kb) / 2 # ~55 KB

    # Try different qualities
    for q in range(65, 96, 2):
        buf = io.BytesIO()
        img.save(buf, format="WEBP", quality=q, method=6)
        data = buf.getvalue()
        size_kb = len(data) / 1024
        
        diff = abs(size_kb - target_kb)
        if min_kb <= size_kb <= max_kb:
            # Perfect fit!
            if diff < best_diff:
                best_diff = diff
                best_data = data
        elif best_data is None:
            # If not yet in range, keep closest
            if diff < best_diff:
                best_diff = diff
                best_data = data

    # If even at q=95 it's under min_kb (e.g. very simple image), that's fine or we can adjust
    return best_data

test_path = Path("public/images/breeds/dogs/french-bulldog.webp")
with Image.open(test_path) as img:
    resized = crop_to_1200x675(img)
    data = optimize_to_target_size(resized)
    print(f"Original size: {test_path.stat().st_size / 1024:.1f} KB")
    print(f"New dimensions: {resized.size}")
    print(f"New size: {len(data) / 1024:.1f} KB")
