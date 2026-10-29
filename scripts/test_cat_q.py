from pathlib import Path
from PIL import Image
import io

p = Path("public/images/breeds/cats/ragdoll-kitten.webp")
with Image.open(p) as img:
    for q in [85, 90, 95, 98, 100]:
        buf = io.BytesIO()
        img.save(buf, format="WEBP", quality=q, method=4)
        print(f"q={q}: {len(buf.getvalue())/1024:.1f} KB")
