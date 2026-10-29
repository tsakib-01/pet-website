from pathlib import Path
import re

content = Path('src/data/breeds.ts').read_text(encoding='utf-8')
db_section = content[:content.find('export const ALL_BREED_IMAGES')]

names = re.findall(r'name:\s*["\']([^"\']+)["\']', db_section)
slugs = re.findall(r'slug:\s*["\']([^"\']+)["\']', db_section)
print(f"Names in DB: {len(names)}, Slugs in DB: {len(slugs)}")
for n, s in zip(names, slugs):
    print(f"  {n} -> {s}")

img_section = content[content.find('export const ALL_BREED_IMAGES'):content.find('export function generateProfileForAsset')]
img_names = re.findall(r'name:\s*["\']([^"\']+)["\']', img_section)
img_slugs = re.findall(r'slug:\s*["\']([^"\']+)["\']', img_section)
print(f"\nNames in IMAGES: {len(img_names)}, Slugs in IMAGES: {len(img_slugs)}")

overlap = set(slugs).intersection(set(img_slugs))
print(f"Overlap: {overlap}")
print(f"In DB only: {set(slugs) - set(img_slugs)}")
