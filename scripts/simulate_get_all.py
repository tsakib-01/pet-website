from pathlib import Path
import json
import re

content = Path('src/data/breeds.ts').read_text(encoding='utf-8')

# Let's count how many assets are in ALL_BREED_IMAGES
lines = content.splitlines()
in_assets = False
assets = []
cur_asset = {}

for line in lines:
    if 'export const ALL_BREED_IMAGES: BreedImageAsset[] = [' in line:
        in_assets = True
        continue
    if in_assets:
        if line.strip() == '];':
            in_assets = False
            break
        m_slug = re.search(r'slug:\s*["\']([^"\']+)["\']', line)
        m_species = re.search(r'species:\s*["\']([^"\']+)["\']', line)
        m_breed_slug = re.search(r'breedSlug:\s*["\']([^"\']+)["\']', line)
        m_name = re.search(r'name:\s*["\']([^"\']+)["\']', line)
        if m_slug:
            cur_asset['slug'] = m_slug.group(1)
        if m_species:
            cur_asset['species'] = m_species.group(1)
        if m_breed_slug:
            cur_asset['breedSlug'] = m_breed_slug.group(1)
        if m_name:
            cur_asset['name'] = m_name.group(1)
        if line.strip() == '},' or line.strip() == '}':
            if cur_asset:
                assets.append(cur_asset)
                cur_asset = {}

print(f"Total assets in ALL_BREED_IMAGES: {len(assets)}")
dogs = [a for a in assets if a.get('species') == 'dog']
cats = [a for a in assets if a.get('species') == 'cat']
print(f"Dogs in ALL_BREED_IMAGES: {len(dogs)}")
print(f"Cats in ALL_BREED_IMAGES: {len(cats)}")

# Let's check BREED_DATABASE
db_slugs = re.findall(r'slug:\s*["\']([^"\']+)["\']', content[:content.find('export const ALL_BREED_IMAGES')])
print(f"Slugs in BREED_DATABASE: {len(db_slugs)}")

# Now simulate current getAllBreeds()
db_set = set(db_slugs)
result = list(db_slugs)
for a in assets:
    if a.get('breedSlug') not in db_set and a.get('slug') not in db_set:
        db_set.add(a.get('slug'))
        result.append(a.get('slug'))

print(f"Result of current getAllBreeds(): {len(result)}")
