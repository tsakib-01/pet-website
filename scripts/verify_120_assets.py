from pathlib import Path
import re

content = Path('src/data/breeds.ts').read_text(encoding='utf-8')

img_section = content[content.find('export const ALL_BREED_IMAGES'):content.find('export function generateProfileForAsset')]
assets = []
for line in img_section.splitlines():
    if 'filename:' in line:
        slug = re.search(r'slug:\s*["\']([^"\']+)["\']', line).group(1)
        species = re.search(r'species:\s*["\']([^"\']+)["\']', line).group(1)
        breed_slug = re.search(r'breedSlug:\s*["\']([^"\']+)["\']', line).group(1)
        name = re.search(r'name:\s*["\']([^"\']+)["\']', line).group(1)
        filename = re.search(r'filename:\s*["\']([^"\']+)["\']', line).group(1)
        path = re.search(r'path:\s*["\']([^"\']+)["\']', line).group(1)
        assets.append({'slug': slug, 'species': species, 'breedSlug': breed_slug, 'name': name, 'filename': filename, 'path': path})

print(f"Total assets: {len(assets)}")
dogs = [a for a in assets if a['species'] == 'dog']
cats = [a for a in assets if a['species'] == 'cat']
print(f"Dogs count: {len(dogs)}")
print(f"Cats count: {len(cats)}")

# Check for any duplicate slugs
slugs = [a['slug'] for a in assets]
duplicates = set([s for s in slugs if slugs.count(s) > 1])
print(f"Duplicate slugs in ALL_BREED_IMAGES: {duplicates}")

# Check that every image file actually exists on disk
missing_files = []
for a in assets:
    file_path = Path('public') / a['path'].lstrip('/')
    if not file_path.exists():
        missing_files.append(str(file_path))

print(f"Missing image files on disk: {len(missing_files)}")
if missing_files:
    print("Missing:", missing_files[:5])
