from pathlib import Path
import re

content = Path('src/data/breeds.ts').read_text(encoding='utf-8')

# Let's count how many assets are in ALL_BREED_IMAGES and what getAllBreeds does
img_section = content[content.find('export const ALL_BREED_IMAGES'):content.find('export function generateProfileForAsset')]
assets = []
for line in img_section.splitlines():
    if 'filename:' in line:
        slug = re.search(r'slug:\s*["\']([^"\']+)["\']', line).group(1)
        species = re.search(r'species:\s*["\']([^"\']+)["\']', line).group(1)
        breed_slug = re.search(r'breedSlug:\s*["\']([^"\']+)["\']', line).group(1)
        name = re.search(r'name:\s*["\']([^"\']+)["\']', line).group(1)
        assets.append({'slug': slug, 'species': species, 'breedSlug': breed_slug, 'name': name})

print(f"Total ALL_BREED_IMAGES: {len(assets)}")
dogs = [a for a in assets if a['species'] == 'dog']
cats = [a for a in assets if a['species'] == 'cat']
print(f"Dogs: {len(dogs)}")
print(f"Cats: {len(cats)}")
