from pathlib import Path

path = Path('src/data/breeds.ts')
content = path.read_text(encoding='utf-8')

target = """// Comprehensive resolver: finds in BREED_DATABASE first, then matches ALL_BREED_IMAGES
export function getBreedBySlug(slug: string): BreedData | undefined {
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

replacement = """// Comprehensive resolver: finds exact asset in ALL_BREED_IMAGES (all 104 dogs + 16 cats)
export function getBreedBySlug(slug: string): BreedData | undefined {
  // 1. Match against any asset in ALL_BREED_IMAGES by exact slug or filename
  const asset = ALL_BREED_IMAGES.find((a) => a.slug === slug || a.filename === slug + ".webp");
  if (asset) {
    const canonical = BREED_DATABASE.find((b) => b.slug === asset.breedSlug);
    if (canonical) {
      return {
        ...canonical,
        slug: asset.slug,
        name: asset.name,
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
        slug: fallbackAsset.slug,
        name: fallbackAsset.name,
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
        slug: asset.slug,
        name: asset.name,
        heroImage: asset.path,
        heroImageAlt: `${asset.name} high-resolution breed photo`,
      };
    }
    return generateProfileForAsset(asset);
  });
}"""

# Normalize newlines for replacement
norm_content = content.replace('\r\n', '\n')
norm_target = target.replace('\r\n', '\n')
norm_replacement = replacement.replace('\r\n', '\n')

if norm_target in norm_content:
    norm_content = norm_content.replace(norm_target, norm_replacement)
    # Write back with CRLF
    path.write_text(norm_content.replace('\n', '\r\n'), encoding='utf-8')
    print("SUCCESS: Updated getBreedBySlug and getAllBreeds!")
else:
    print("FAILED: Could not find target")
