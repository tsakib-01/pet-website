from pathlib import Path
import json

content = Path('src/data/breeds.ts').read_text(encoding='utf-8')
idx = content.find('export const ALL_BREED_IMAGES')
end_idx = content.find('];\n\nexport function', idx)
block = content[idx:end_idx]
lines = [l.strip() for l in block.splitlines() if 'filename:' in l]

print(f"Total entries in ALL_BREED_IMAGES: {len(lines)}")
dogs = [l for l in lines if '"species": "dog"' in l or "'species': 'dog'" in l or 'species: "dog"' in l]
cats = [l for l in lines if '"species": "cat"' in l or "'species': 'cat'" in l or 'species: "cat"' in l]
print(f"Dogs in ALL_BREED_IMAGES: {len(dogs)}")
print(f"Cats in ALL_BREED_IMAGES: {len(cats)}")

# Check public directories
dog_files = list(Path('public/images/breeds/dogs').glob('*.webp'))
cat_files = list(Path('public/images/breeds/cats').glob('*.webp'))
print(f"Dog files in public/images/breeds/dogs: {len(dog_files)}")
print(f"Cat files in public/images/breeds/cats: {len(cat_files)}")

# What about getAllBreeds()?
# Let's inspect what getAllBreeds() actually returns!
