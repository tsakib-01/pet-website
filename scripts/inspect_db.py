with open('src/data/breeds.ts', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('export const BREED_DATABASE: BreedData[] = [')
end = text.find('];\n\nexport interface BreedImageAsset')
bd_text = text[start:end]

import re
slugs = re.findall(r'slug:\s*"([^"]+)"', bd_text)
print('Slugs in BREED_DATABASE:', len(slugs), slugs)

# Check commas between objects
# Each object should end with `  }` or `  },`
# Let's find every `}` at indent 2
closing_braces = [m.start() for m in re.finditer(r'\n  \}', bd_text)]
print('Found closing braces for objects:', len(closing_braces))
for i, pos in enumerate(closing_braces):
    after = bd_text[pos+4:pos+20]
    print(f'Object {i+1} after closing brace: {repr(after)}')
