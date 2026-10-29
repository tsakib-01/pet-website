from pathlib import Path
import json
import re

# We can run node to test getAllBreeds from the compiled or ts-node or next build
# Or write a small script that loads breeds.ts
content = Path('src/data/breeds.ts').read_text(encoding='utf-8')
print("Checking getAllBreeds definition in src/data/breeds.ts...")
idx = content.find('export function getAllBreeds')
print(content[idx:idx+500])
