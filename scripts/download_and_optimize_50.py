import os
import io
import time
import urllib.request
from PIL import Image

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

# The 50 canonical breeds (41 Dogs, 9 Cats)
BREEDS_50 = [
    # DOGS (41)
    {
        "slug": "american-bulldog",
        "name": "American Bulldog",
        "species": "dog",
        "filename": "american-bulldog.webp",
        "url": "https://images.dogapi.dog/xhq204tiobkwxbqhjv5yhfc0ndre"
    },
    {
        "slug": "australian-cattle-dog",
        "name": "Australian Cattle Dog",
        "species": "dog",
        "filename": "australian-cattle-dog.webp",
        "url": "https://images.dogapi.dog/cfk6iko9ph0c3is03mr4zobnoe8l"
    },
    {
        "slug": "australian-shepherd",
        "name": "Australian Shepherd",
        "species": "dog",
        "filename": "australian-shepherd.webp",
        "url": "https://images.dogapi.dog/0vwkfoihrkdkosvfnlhea9y97gni"
    },
    {
        "slug": "basset-hound",
        "name": "Basset Hound",
        "species": "dog",
        "filename": "basset-hound.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/A_Basset_Hound_at_Lodhi_Gardens%2C_Delhi.jpg/1920px-A_Basset_Hound_at_Lodhi_Gardens%2C_Delhi.jpg"
    },
    {
        "slug": "beagle",
        "name": "Beagle",
        "species": "dog",
        "filename": "beagle.webp",
        "url": "https://images.dogapi.dog/oy3795t5qluydyj427j6mjxvnwu8"
    },
    {
        "slug": "belgian-malinois",
        "name": "Belgian Malinois",
        "species": "dog",
        "filename": "belgian-malinois.webp",
        "url": "https://images.dogapi.dog/vsn6hnfouwe6269avpp5915tn7y7"
    },
    {
        "slug": "bernese-mountain-dog",
        "name": "Bernese Mountain Dog",
        "species": "dog",
        "filename": "bernese-mountain-dog.webp",
        "url": "https://images.dogapi.dog/0ini4rbssle9qi8f3f9h0wglvs75"
    },
    {
        "slug": "border-collie",
        "name": "Border Collie",
        "species": "dog",
        "filename": "border-collie.webp",
        "url": "https://images.dogapi.dog/thdzop2gcmp80bhw7xh0ov37d7ty"
    },
    {
        "slug": "boston-terrier",
        "name": "Boston Terrier",
        "species": "dog",
        "filename": "boston-terrier.webp",
        "url": "https://images.dogapi.dog/vfmphaxkl9rd6ur9skvgidjnutmw"
    },
    {
        "slug": "boxer-dog",
        "name": "Boxer",
        "species": "dog",
        "filename": "boxer-dog.webp",
        "url": "https://images.dogapi.dog/vigxepzqtxp4ru30qi9ar4zgdfi5"
    },
    {
        "slug": "brittany-dog",
        "name": "Brittany Dog",
        "species": "dog",
        "filename": "brittany-dog.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Brittany_Spaniel_Lincoln.jpg/1920px-Brittany_Spaniel_Lincoln.jpg"
    },
    {
        "slug": "cockapoo",
        "name": "Cockapoo",
        "species": "dog",
        "filename": "cockapoo.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Loki_-_Beautiful_Large_Cockapoo.jpg/1920px-Loki_-_Beautiful_Large_Cockapoo.jpg"
    },
    {
        "slug": "cocker-spaniel",
        "name": "Cocker Spaniel",
        "species": "dog",
        "filename": "cocker-spaniel.webp",
        "url": "https://images.dogapi.dog/inejxkxbjm8psij0sbg4e0eotxmf"
    },
    {
        "slug": "dachshund",
        "name": "Dachshund",
        "species": "dog",
        "filename": "dachshund.webp",
        "url": "https://images.dogapi.dog/h42l1qmj60ebf9jadrr2avoz4a2k"
    },
    {
        "slug": "deer-head-chihuahua",
        "name": "Deer Head Chihuahua",
        "species": "dog",
        "filename": "deer-head-chihuahua.webp",
        "url": "https://images.dogapi.dog/atrpgapeg76bmff4lr4jqt1akpo7"
    },
    {
        "slug": "doberman-pinscher",
        "name": "Doberman Pinscher",
        "species": "dog",
        "filename": "doberman-pinscher.webp",
        "url": "https://images.dogapi.dog/6jzj710ffjnh3vev99ivzp05jf8x"
    },
    {
        "slug": "english-springer-spaniel",
        "name": "English Springer Spaniel",
        "species": "dog",
        "filename": "english-springer-spaniel.webp",
        "url": "https://images.dogapi.dog/y7fhufdume9nb8zebwlrglccrleh"
    },
    {
        "slug": "french-bulldog",
        "name": "French Bulldog",
        "species": "dog",
        "filename": "french-bulldog.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/2008-07-28_Dog_at_Frolick_Field.jpg/1920px-2008-07-28_Dog_at_Frolick_Field.jpg"
    },
    {
        "slug": "german-shepherd",
        "name": "German Shepherd",
        "species": "dog",
        "filename": "german-shepherd.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/20110425_German_Shepherd_Dog_8505.jpg/1920px-20110425_German_Shepherd_Dog_8505.jpg"
    },
    {
        "slug": "german-shorthaired-pointer",
        "name": "German Shorthaired Pointer",
        "species": "dog",
        "filename": "german-shorthaired-pointer.webp",
        "url": "https://images.dogapi.dog/iwqpmyrd2nsnrk8udh60cqa0v3dy"
    },
    {
        "slug": "golden-retriever",
        "name": "Golden Retriever",
        "species": "dog",
        "filename": "golden-retriever.webp",
        "url": "https://images.dogapi.dog/g6ymkarfp9mm92xpvcf45r4ov3x0"
    },
    {
        "slug": "great-dane",
        "name": "Great Dane",
        "species": "dog",
        "filename": "great-dane.webp",
        "url": "https://images.dogapi.dog/qa6vdnr4flnmv4dasuijycgcwgos"
    },
    {
        "slug": "havanese",
        "name": "Havanese",
        "species": "dog",
        "filename": "havanese.webp",
        "url": "https://images.dogapi.dog/sx1x8uzqbmx968k65mfen11ssp0a"
    },
    {
        "slug": "labrador-retriever",
        "name": "Labrador Retriever",
        "species": "dog",
        "filename": "labrador-retriever.webp",
        "url": "https://images.dogapi.dog/35daw3grhv5yye503fsw7oktjn2o"
    },
    {
        "slug": "mini-pinscher",
        "name": "Miniature Pinscher",
        "species": "dog",
        "filename": "mini-pinscher.webp",
        "url": "https://images.dogapi.dog/lbpdx7fzzntdb5kj0bu75j26hilg"
    },
    {
        "slug": "miniature-american-shepherd",
        "name": "Miniature American Shepherd",
        "species": "dog",
        "filename": "miniature-american-shepherd.webp",
        "url": "https://images.dogapi.dog/0qhizujmr7t21q7zfxgoise02lzd"
    },
    {
        "slug": "olde-english-bulldog",
        "name": "Olde English Bulldogge",
        "species": "dog",
        "filename": "olde-english-bulldog.webp",
        "url": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Duke_Olde_English_Bulldogge.jpg"
    },
    {
        "slug": "papillon",
        "name": "Papillon",
        "species": "dog",
        "filename": "papillon.webp",
        "url": "https://images.dogapi.dog/dflp9wa753f6ad0oh4ton3evc3we"
    },
    {
        "slug": "pembroke-welsh-corgi",
        "name": "Pembroke Welsh Corgi",
        "species": "dog",
        "filename": "pembroke-welsh-corgi.webp",
        "url": "https://images.dogapi.dog/twseq9ja54ugxt59muo0zx90d53c"
    },
    {
        "slug": "pomeranian",
        "name": "Pomeranian",
        "species": "dog",
        "filename": "pomeranian.webp",
        "url": "https://images.dogapi.dog/8lm9hn73vq1fc30ugjkx2ujk12ok"
    },
    {
        "slug": "rhodesian-ridgeback",
        "name": "Rhodesian Ridgeback",
        "species": "dog",
        "filename": "rhodesian-ridgeback.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Rhodesian_Ridgeback_%286_years%29.jpg/1920px-Rhodesian_Ridgeback_%286_years%29.jpg"
    },
    {
        "slug": "rottweiler",
        "name": "Rottweiler",
        "species": "dog",
        "filename": "rottweiler.webp",
        "url": "https://images.dogapi.dog/mb9v8jgfanldjyfs73ylesj1pv71"
    },
    {
        "slug": "rough-collie",
        "name": "Rough Collie",
        "species": "dog",
        "filename": "rough-collie.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/Rough_Collie_portrait.jpg/1920px-Rough_Collie_portrait.jpg"
    },
    {
        "slug": "shepweiler-mix",
        "name": "Shepweiler",
        "species": "dog",
        "filename": "shepweiler-mix.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/German-Shepherd-dog-rainbow-shake.jpg/1920px-German-Shepherd-dog-rainbow-shake.jpg"
    },
    {
        "slug": "shiba-inu",
        "name": "Shiba Inu",
        "species": "dog",
        "filename": "shiba-inu.webp",
        "url": "https://images.dogapi.dog/6nrj3aqs59igswqvj0bs92hipyp0"
    },
    {
        "slug": "shih-tzu",
        "name": "Shih Tzu",
        "species": "dog",
        "filename": "shih-tzu.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Shih_Tzu_%28Dog_Walk%29.jpg/1920px-Shih_Tzu_%28Dog_Walk%29.jpg"
    },
    {
        "slug": "siberian-husky",
        "name": "Siberian Husky",
        "species": "dog",
        "filename": "siberian-husky.webp",
        "url": "https://images.dogapi.dog/euw217e06653ma92hz475wuztonq"
    },
    {
        "slug": "standard-poodle",
        "name": "Standard Poodle",
        "species": "dog",
        "filename": "standard-poodle.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/Full_attention_%288067543690%29.jpg/1920px-Full_attention_%288067543690%29.jpg"
    },
    {
        "slug": "vizsla",
        "name": "Vizsla",
        "species": "dog",
        "filename": "vizsla.webp",
        "url": "https://images.dogapi.dog/kd69ol8jedha16bqbigni98qjjrq"
    },
    {
        "slug": "west-highland-white-terrier",
        "name": "West Highland White Terrier",
        "species": "dog",
        "filename": "west-highland-white-terrier.webp",
        "url": "https://images.dogapi.dog/lrmxrjcjxhmg4bsena532wqmubdo"
    },
    {
        "slug": "yorkshire-terrier",
        "name": "Yorkshire Terrier",
        "species": "dog",
        "filename": "yorkshire-terrier.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Biewer_Yorkshire_Terrier_2.jpg/1920px-Biewer_Yorkshire_Terrier_2.jpg"
    },
    # CATS (9)
    {
        "slug": "american-shorthair",
        "name": "American Shorthair",
        "species": "cat",
        "filename": "american-shorthair.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/American_shorthair_blotched_tabby.jpg/1920px-American_shorthair_blotched_tabby.jpg"
    },
    {
        "slug": "chartreux",
        "name": "Chartreux",
        "species": "cat",
        "filename": "chartreux.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Chartreux-cat-edouard-marie.jpg/1920px-Chartreux-cat-edouard-marie.jpg"
    },
    {
        "slug": "devon-rex",
        "name": "Devon Rex",
        "species": "cat",
        "filename": "devon-rex.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Devon_Rex_Izzy.jpg/1920px-Devon_Rex_Izzy.jpg"
    },
    {
        "slug": "egyptian-mau",
        "name": "Egyptian Mau",
        "species": "cat",
        "filename": "egyptian-mau.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Egyptian_Mau_Bronze.jpg/1920px-Egyptian_Mau_Bronze.jpg"
    },
    {
        "slug": "himalayan",
        "name": "Himalayan",
        "species": "cat",
        "filename": "himalayan.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Sonny_Bunny.jpg/1920px-Sonny_Bunny.jpg"
    },
    {
        "slug": "ragdoll",
        "name": "Ragdoll",
        "species": "cat",
        "filename": "ragdoll.webp",
        "url": "https://upload.wikimedia.org/wikipedia/commons/d/da/Ragdoll_Cat_Face.jpg"
    },
    {
        "slug": "russian-blue",
        "name": "Russian Blue",
        "species": "cat",
        "filename": "russian-blue.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Russian_Blue_AB.jpg/1920px-Russian_Blue_AB.jpg"
    },
    {
        "slug": "sphynx",
        "name": "Sphynx",
        "species": "cat",
        "filename": "sphynx.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/20170604_Sphynx_cat_7984.jpg/1920px-20170604_Sphynx_cat_7984.jpg"
    },
    {
        "slug": "turkish-angora",
        "name": "Turkish Angora",
        "species": "cat",
        "filename": "turkish-angora.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Turkish_Angora_Odd-Eyed.jpg/1920px-Turkish_Angora_Odd-Eyed.jpg"
    },
]

def crop_and_optimize(img: Image.Image) -> bytes:
    target_w, target_h = 1200, 675
    target_aspect = target_w / target_h

    if img.mode != 'RGB':
        img = img.convert('RGB')

    w, h = img.size
    current_aspect = w / h

    if current_aspect > target_aspect:
        # Wider than 16:9: crop horizontally (centered)
        new_w = int(h * target_aspect)
        left = (w - new_w) // 2
        top = 0
        right = left + new_w
        bottom = h
    else:
        # Taller than 16:9: crop vertically (focus slightly towards top 35% where head/eyes typically reside)
        new_h = int(w / target_aspect)
        total_diff = h - new_h
        top = int(total_diff * 0.35)
        bottom = top + new_h
        left = 0
        right = w

    cropped = img.crop((left, top, right, bottom))
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Optimize quality for target 45 KB - 68 KB
    low_q, high_q = 30, 95
    best_data = None

    for _ in range(8):
        mid_q = (low_q + high_q) // 2
        buf = io.BytesIO()
        resized.save(buf, format='WEBP', quality=mid_q, method=4)
        data = buf.getvalue()
        kb = len(data) / 1024.0
        best_data = data
        if 45 <= kb <= 68:
            return data
        elif kb > 68:
            high_q = mid_q - 1
        else:
            low_q = mid_q + 1

    return best_data

def process_all():
    print(f"Starting processing of {len(BREEDS_50)} canonical breeds...")
    success = 0
    errors = []

    for item in BREEDS_50:
        species = item['species']
        dest_dir = f"public/images/breeds/{'dogs' if species == 'dog' else 'cats'}"
        os.makedirs(dest_dir, exist_ok=True)
        dest_path = os.path.join(dest_dir, item['filename'])

        slug = item['slug']
        url = item['url']
        print(f"Fetching [{species.upper()}] {slug:30s} from {url[:60]}...")

        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=15) as resp:
                raw_bytes = resp.read()
                orig_img = Image.open(io.BytesIO(raw_bytes))
                orig_w, orig_h = orig_img.size

            opt_bytes = crop_and_optimize(orig_img)
            with open(dest_path, 'wb') as f_out:
                f_out.write(opt_bytes)

            kb = len(opt_bytes) / 1024.0
            print(f"  [OK] Saved {dest_path} (source: {orig_w}x{orig_h} -> 1200x675, {kb:.1f} KB)")
            success += 1
            time.sleep(0.4)
        except Exception as e:
            print(f"  [FAIL] Error for {slug}: {e}")
            errors.append((slug, str(e)))

    print(f"\nCompleted: {success}/{len(BREEDS_50)} successfully processed.")
    if errors:
        print(f"Errors ({len(errors)}):")
        for s, err in errors:
            print(f"  - {s}: {err}")

if __name__ == '__main__':
    process_all()
