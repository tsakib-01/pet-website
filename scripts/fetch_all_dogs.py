import os
import sys
import json
import time
import shutil
import urllib.request
from io import BytesIO
from PIL import Image

DOG_DIR = os.path.abspath('public/images/breeds/dogs')
os.makedirs(DOG_DIR, exist_ok=True)

HEADERS = {
    'User-Agent': 'PawTruthBot/1.0 (https://pawtruth.com; contact@pawtruth.com)'
}

def download_and_save_webp(url, target_path, target_size=(1200, 800)):
    req = urllib.request.Request(url, headers=HEADERS)
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
    img.save(target_path, 'WEBP', quality=85)
    print(f"Saved: {os.path.basename(target_path)} ({os.path.getsize(target_path)} bytes)")

def fetch_dog_ceo(breed_path, count=1):
    url = f"https://dog.ceo/api/breed/{breed_path}/images/random/{count}"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode())
        if data.get('status') == 'success':
            return data['message']
    return []

def fetch_wikipedia_thumb(wiki_title):
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={wiki_title}&prop=pageimages&format=json&pithumbsize=1200"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode())
        pages = data.get('query', {}).get('pages', {})
        for pid, page in pages.items():
            thumb = page.get('thumbnail', {}).get('source')
            if thumb:
                return thumb
    return None

# Mapping for direct fetching
DOG_SOURCES = {
    # Dog CEO sources
    'rottweiler.webp': ('dogceo', 'rottweiler', 0),
    'baby-rottweiler.webp': ('dogceo', 'rottweiler', 1),
    'rottweiler-pitbull-mix.webp': ('dogceo', 'rottweiler', 2),
    'shepweiler-mix.webp': ('dogceo', 'rottweiler', 3),
    'roman-rottweiler.webp': ('dogceo', 'rottweiler', 4),
    
    'german-shorthaired-pointer.webp': ('dogceo', 'pointer/german', 0),
    'gsp-puppy.webp': ('dogceo', 'pointer/german', 1),
    'black-gsp.webp': ('dogceo', 'pointer/german', 2),
    
    'american-bulldog.webp': ('wiki', 'American_Bulldog'),
    'olde-english-bulldog.webp': ('wiki', 'Olde_English_Bulldooge'),
    
    'yorkshire-terrier.webp': ('dogceo', 'terrier/yorkshire', 0),
    'yorkshire-terrier-puppy.webp': ('dogceo', 'terrier/yorkshire', 1),
    
    'australian-shepherd.webp': ('dogceo', 'australian/shepherd', 0),
    'blue-merle-australian-shepherd.webp': ('dogceo', 'australian/shepherd', 1),
    'red-merle-australian-shepherd.webp': ('dogceo', 'australian/shepherd', 2),
    'mini-australian-shepherd.webp': ('copy', 'miniature-american-shepherd.webp'),
    'border-aussie-mix.webp': ('copy', 'border-collie.webp'),
    
    'doberman-pinscher.webp': ('dogceo', 'doberman', 0),
    'red-doberman.webp': ('dogceo', 'doberman', 1),
    'blue-doberman.webp': ('dogceo', 'doberman', 2),
    'doberman-puppy.webp': ('dogceo', 'doberman', 3),
    'mini-pinscher.webp': ('dogceo', 'pinscher/miniature', 0),
    
    'pembroke-welsh-corgi.webp': ('wiki', 'Pembroke_Welsh_Corgi'),
    
    'boxer-dog.webp': ('dogceo', 'boxer', 0),
    'boxer-puppies.webp': ('dogceo', 'boxer', 1),
    
    'pomeranian.webp': ('dogceo', 'pomeranian', 0),
    'white-pomeranian.webp': ('dogceo', 'pomeranian', 1),
    'black-pomeranian.webp': ('dogceo', 'pomeranian', 2),
    'pomsky-mix.webp': ('copy', 'siberian-husky.webp'),
    
    'bernese-mountain-dog.webp': ('dogceo', 'mountain/bernese', 0),
    'bernedoodle.webp': ('dogceo', 'mountain/bernese', 1),
    
    'deer-head-chihuahua.webp': ('dogceo', 'chihuahua', 0),
    
    'red-siberian-husky.webp': ('copy', 'siberian-husky.webp'),
    
    'brittany-dog.webp': ('dogceo', 'spaniel/brittany', 0),
    
    'belgian-malinois.webp': ('dogceo', 'malinois', 0),
    'black-belgian-malinois.webp': ('dogceo', 'malinois', 1),
    
    'cocker-spaniel-puppy.webp': ('dogceo', 'spaniel/cocker', 0),
    'black-cocker-spaniel.webp': ('dogceo', 'spaniel/cocker', 1),
    'cockapoo.webp': ('wiki', 'Cockapoo'),
    
    'basset-hound.webp': ('dogceo', 'hound/basset', 0),
    'vizsla.webp': ('dogceo', 'vizsla', 0),
    
    'rough-collie.webp': ('dogceo', 'rough/collie', 0),
    'smooth-collie.webp': ('wiki', 'Smooth_Collie'),
    'rhodesian-ridgeback.webp': ('dogceo', 'ridgeback/rhodesian', 0),
    
    'papillon.webp': ('dogceo', 'papillon', 0),
    
    'shiba-inu.webp': ('dogceo', 'shiba', 0),
    'black-and-tan-shiba-inu.webp': ('dogceo', 'shiba', 1),
    
    'west-highland-white-terrier.webp': ('dogceo', 'terrier/westhighland', 0),
    
    'blue-heeler.webp': ('dogceo', 'cattledog/australian', 0),
    'red-heeler.webp': ('dogceo', 'cattledog/australian', 1),

    # French bulldog variants
    'lilac-french-bulldog.webp': ('copy', 'blue-french-bulldog.webp'),
    'black-french-bulldog.webp': ('copy', 'french-bulldog.webp'),
    'black-french-bulldog-puppy.webp': ('copy', 'french-bulldog-puppies.webp'),

    # Retriever variants
    'black-golden-retriever.webp': ('copy', 'black-labrador.webp'),

    # German shepherd variants
    'old-german-shepherd.webp': ('copy', 'german-shepherd.webp'),
    'black-german-shepherd.webp': ('copy', 'german-shepherd.webp'),
    'white-german-shepherd.webp': ('wiki', 'White_Swiss_Shepherd_Dog'),

    # Dachshund variants
    'long-haired-dachshund.webp': ('wiki', 'Dachshund'),
    'dapple-dachshund.webp': ('copy', 'mini-dachshund.webp'),
    'dachshund-puppies.webp': ('copy', 'mini-dachshund.webp'),

    # Poodle variants
    'mini-poodle.webp': ('dogceo', 'poodle/miniature', 0),

    # Beagle variants
    'beagle-mix.webp': ('copy', 'beagle.webp'),
}

def main():
    dog_ceo_cache = {}
    
    for filename, source_info in DOG_SOURCES.items():
        out_path = os.path.join(DOG_DIR, filename)
        if os.path.exists(out_path):
            print(f"Already exists: {filename}")
            continue

        action = source_info[0]
        try:
            if action == 'dogceo':
                breed_sub = source_info[1]
                idx = source_info[2]
                if breed_sub not in dog_ceo_cache:
                    dog_ceo_cache[breed_sub] = fetch_dog_ceo(breed_sub, count=10)
                    time.sleep(0.3)
                images = dog_ceo_cache[breed_sub]
                if images and len(images) > idx:
                    img_url = images[idx]
                elif images:
                    img_url = images[0]
                else:
                    print(f"Dog CEO returned no images for {breed_sub}")
                    continue
                print(f"Downloading {filename} from Dog CEO ({img_url})...")
                download_and_save_webp(img_url, out_path)
                time.sleep(0.3)

            elif action == 'wiki':
                wiki_title = source_info[1]
                print(f"Fetching {filename} from Wikipedia ({wiki_title})...")
                img_url = fetch_wikipedia_thumb(wiki_title)
                if img_url:
                    download_and_save_webp(img_url, out_path)
                    time.sleep(0.8)
                else:
                    print(f"No Wikipedia thumb found for {wiki_title}")

            elif action == 'copy':
                src_filename = source_info[1]
                src_path = os.path.join(DOG_DIR, src_filename)
                if os.path.exists(src_path):
                    shutil.copy2(src_path, out_path)
                    print(f"Copied {src_filename} -> {filename}")
                else:
                    print(f"Source file not found to copy: {src_path}")

        except Exception as e:
            print(f"Error processing {filename}: {e}")

if __name__ == '__main__':
    main()
