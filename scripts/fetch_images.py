import os
import sys
import json
import time
import urllib.request
from io import BytesIO
from PIL import Image

HEADERS = {
    'User-Agent': 'PawTrustyResearchBot/1.0 (https://pawtrusty.com; contact@pawtrusty.com)'
}

def download_and_process(img_url, out_path, target_size=(1200, 800)):
    req = urllib.request.Request(img_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as resp:
        content = resp.read()
    
    img = Image.open(BytesIO(content)).convert('RGB')
    target_w, target_h = target_size
    target_aspect = target_w / target_h
    img_aspect = img.width / img.height

    if img_aspect > target_aspect:
        new_w = int(img.height * target_aspect)
        offset = (img.width - new_w) // 2
        img = img.crop((offset, 0, offset + new_w, img.height))
    else:
        new_h = int(img.width / target_aspect)
        offset = (img.height - new_h) // 2
        img = img.crop((0, offset, img.width, offset + new_h))

    img = img.resize(target_size, Image.Resampling.LANCZOS)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, 'WEBP', quality=85)
    print(f"Successfully saved {out_path} ({os.path.getsize(out_path)} bytes)")

def test_cat_api():
    breed_map = {
        'russian-blue-cat.webp': ('rblu', 0),
        'russian-blue-kitten.webp': ('rblu', 1),
        'american-shorthair-tabby.webp': ('asho', 0),
        'american-shorthair-kitten.webp': ('asho', 1),
        'himalayan-cat.webp': ('hima', 0),
        'himalayan-kitten.webp': ('hima', 1),
        'turkish-angora-cat.webp': ('tang', 0),
        'turkish-angora-kitten.webp': ('tang', 1),
        'devon-rex-cat.webp': ('drex', 0),
        'egyptian-mau.webp': ('emau', 0),
        'egyptian-mau-tabby-mix.webp': ('emau', 1),
        'chartreux-cat.webp': ('char', 0),
        'fat-sphynx-cat.webp': ('sphy', 1),
        'baby-sphynx-cat.webp': ('sphy', 2)
    }

    cat_dir = 'public/images/breeds/cats'
    for filename, (breed_id, idx) in breed_map.items():
        out_path = os.path.join(cat_dir, filename)
        if os.path.exists(out_path):
            print(f"Already exists: {filename}")
            continue

        url = f'https://api.thecatapi.com/v1/images/search?breed_ids={breed_id}&limit=5'
        req = urllib.request.Request(url, headers=HEADERS)
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode())
                if data and len(data) > idx:
                    img_url = data[idx]['url']
                elif data:
                    img_url = data[0]['url']
                else:
                    print(f"No results for {breed_id}")
                    continue
                
                print(f"Downloading {filename} from {img_url}...")
                download_and_process(img_url, out_path)
                time.sleep(0.5)
        except Exception as e:
            print(f"Error fetching {filename}: {e}")

if __name__ == '__main__':
    test_cat_api()
