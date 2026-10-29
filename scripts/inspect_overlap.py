from pathlib import Path
import re

content = Path('src/data/breeds.ts').read_text(encoding='utf-8')

# Extract slugs from BREED_DATABASE
db_slugs = re.findall(r'id:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\'],\s*slug:\s*["\']([^"\']+)["\']', content[:content.find('export const ALL_BREED_IMAGES')])
print("BREED_DATABASE entries:")
for id_, name, slug in db_slugs:
    print(f"  {id_}: {name} ({slug})")

# Extract slugs from ALL_BREED_IMAGES
img_slugs = re.findall(r'filename:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\'],\s*species:\s*["\']([^"\']+)["\'],\s*path:\s*["\']([^"\']+)["\'],\s*slug:\s*["\']([^"\']+)["\']', content[content.find('export const ALL_BREED_IMAGES'):content.find('export function generateProfileForAsset')])
print(f"\nALL_BREED_IMAGES entries: {len(img_slugs)}")

# Check overlap
db_slug_set = set(s[2] for s in db_slugs)
img_slug_set = set(s[4] for s in img_slugs)
print(f"Overlap between DB and IMAGES: {db_slug_set.intersection(img_slug_set)}")
print(f"In DB but not in IMAGES: {db_slug_set - img_slug_set}")
print(f"In IMAGES but not in DB: {len(img_slug_set - db_slug_set)}")
