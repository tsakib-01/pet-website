from pathlib import Path
import re

content = Path('src/data/breeds.ts').read_text(encoding='utf-8')

# 1. Replace any  with standard en-dash \u2013
content = content.replace('', '\u2013')

# 2. Update getBreedBySlug to check ALL_BREED_IMAGES and inherit canonical data while preserving asset title, slug, and heroImage
old_get_breed = """export function getBreedBySlug(slug: string): BreedData | undefined {
  // 1. Direct match in handcrafted database
  const direct = BREED_DATABASE.find((b) => b.slug === slug);
  if (direct) return direct;

  // 2. Match against any asset in ALL_BREED_IMAGES by exact slug
  const asset = ALL_BREED_IMAGES.find((a) => a.slug === slug || a.filename === slug + ".webp");
  if (asset) {
    const canonical = BREED_DATABASE.find((b) => b.slug === asset.breedSlug);
    if (canonical) return canonical;
    return generateProfileForAsset(asset);
  }

  // 3. Fallback search by partial slug matching in images
  const fallbackAsset = ALL_BREED_IMAGES.find((a) => a.slug.includes(slug) || slug.includes(a.slug));
  if (fallbackAsset) {
    const canonical = BREED_DATABASE.find((b) => b.slug === fallbackAsset.breedSlug);
    if (canonical) return canonical;
    return generateProfileForAsset(fallbackAsset);
  }

  return undefined;
}

// Get all unique breeds for directory
export function getAllBreeds(): BreedData[] {
  const databaseSlugs = new Set(BREED_DATABASE.map((b) => b.slug));
  const result: BreedData[] = [...BREED_DATABASE];

  for (const asset of ALL_BREED_IMAGES) {
    if (!databaseSlugs.has(asset.breedSlug) && !databaseSlugs.has(asset.slug)) {
      databaseSlugs.add(asset.slug);
      result.push(generateProfileForAsset(asset));
    }
  }

  return result;
}"""

new_get_breed = """export function getBreedBySlug(slug: string): BreedData | undefined {
  // 1. Match against any asset in ALL_BREED_IMAGES (all 104 dogs + 16 cats)
  const asset = ALL_BREED_IMAGES.find((a) => a.slug === slug || a.filename === slug + ".webp");
  if (asset) {
    const canonical = BREED_DATABASE.find((b) => b.slug === asset.breedSlug);
    if (canonical) {
      return {
        ...canonical,
        id: asset.slug,
        name: asset.name,
        slug: asset.slug,
        heroImage: asset.path,
        heroImageAlt: `${asset.name} high-resolution breed photo`,
      };
    }
    return generateProfileForAsset(asset);
  }

  // 2. Direct match in handcrafted database
  const direct = BREED_DATABASE.find((b) => b.slug === slug);
  if (direct) return direct;

  // 3. Fallback search by partial slug matching in images
  const fallbackAsset = ALL_BREED_IMAGES.find((a) => a.slug.includes(slug) || slug.includes(a.slug));
  if (fallbackAsset) {
    const canonical = BREED_DATABASE.find((b) => b.slug === fallbackAsset.breedSlug);
    if (canonical) {
      return {
        ...canonical,
        id: fallbackAsset.slug,
        name: fallbackAsset.name,
        slug: fallbackAsset.slug,
        heroImage: fallbackAsset.path,
        heroImageAlt: `${fallbackAsset.name} high-resolution breed photo`,
      };
    }
    return generateProfileForAsset(fallbackAsset);
  }

  return undefined;
}

// Get all 120 breeds (104 dogs, 16 cats) for directory
export function getAllBreeds(): BreedData[] {
  return ALL_BREED_IMAGES.map((asset) => {
    const canonical = BREED_DATABASE.find((b) => b.slug === asset.breedSlug);
    if (canonical) {
      return {
        ...canonical,
        id: asset.slug,
        name: asset.name,
        slug: asset.slug,
        heroImage: asset.path,
        heroImageAlt: `${asset.name} high-resolution breed photo`,
      };
    }
    return generateProfileForAsset(asset);
  });
}"""

if old_get_breed in content:
    content = content.replace(old_get_breed, new_get_breed)
    print("Successfully replaced getBreedBySlug and getAllBreeds!")
else:
    print("Could not find exact old_get_breed block, trying regex replacement...")
    # fallback regex
    pattern = r'export function getBreedBySlug[\s\S]*?return result;\s*}'
    if re.search(pattern, content):
        content = re.sub(pattern, new_get_breed, content)
        print("Replaced with regex!")
    else:
        print("Regex also failed to match.")

Path('src/data/breeds.ts').write_text(content, encoding='utf-8')
print("Updated src/data/breeds.ts")
