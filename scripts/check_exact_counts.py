import json
from pathlib import Path
import re

content = Path('src/data/breeds.ts').read_text(encoding='utf-8')

# Extract BREED_DATABASE slugs and species
db_slugs = []
# Match each breed object in BREED_DATABASE
# Look for id: "...", slug: "...", species: "..."
db_section = content[content.find('export const BREED_DATABASE'):content.find('export const ALL_BREED_IMAGES')]
for m in re.finditer(r'slug:\s*["\']([^"\']+)["\'],\s*species:\s*["\']([^"\']+)["\']', db_section):
    db_slugs.append((m.group(1), m.group(2)))

print(f"BREED_DATABASE count: {len(db_slugs)}")
for s, sp in db_slugs:
    print(f"  DB: {s} ({sp})")

# Extract ALL_BREED_IMAGES
img_section = content[content.find('export const ALL_BREED_IMAGES'):content.find('export function generateProfileForAsset')]
assets = []
for line in img_section.splitlines():
    if 'filename:' in line:
        slug = re.search(r'slug:\s*["\']([^"\']+)["\']', line).group(1)
        species = re.search(r'species:\s*["\']([^"\']+)["\']', line).group(1)
        breed_slug = re.search(r'breedSlug:\s*["\']([^"\']+)["\']', line).group(1)
        name = re.search(r'name:\s*["\']([^"\']+)["\']', line).group(1)
        assets.append({'slug': slug, 'species': species, 'breedSlug': breed_slug, 'name': name})

print(f"\nALL_BREED_IMAGES count: {len(assets)}")
dogs = [a for a in assets if a['species'] == 'dog']
cats = [a for a in assets if a['species'] == 'cat']
print(f"  Dogs in ALL_BREED_IMAGES: {len(dogs)}")
print(f"  Cats in ALL_BREED_IMAGES: {len(cats)}")

# Now simulate getAllBreeds()
database_slugs = set(s for s, sp in db_slugs)
result = list(db_slugs)

for asset in assets:
    if asset['breedSlug'] not in database_slugs and asset['slug'] not in database_slugs:
        database_slugs.add(asset['slug'])
        result.append((asset['slug'], asset['species']))

print(f"\ngetAllBreeds() total: {len(result)}")
r_dogs = [r for r in result if r[1] == 'dog']
r_cats = [r for r in result if r[1] == 'cat']
print(f"  getAllBreeds() Dogs: {len(r_dogs)}")
print(f"  getAllBreeds() Cats: {len(r_cats)}")
