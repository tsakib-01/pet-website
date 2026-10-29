import json
import os

# Base template builder for breed clinical profiles
def generate_all_breeds():
    # Read the first 598 lines of src/data/breeds.ts to keep the interfaces, French Bulldog, and Ragdoll
    with open("src/data/breeds.ts", "r", encoding="utf-8") as f:
        content = f.read()

    # Find where BREED_DATABASE ends
    # Line 598 is "];"
    idx = content.find("export const BREED_DATABASE: BreedData[] = [")
    if idx == -1:
        raise ValueError("Could not find BREED_DATABASE in src/data/breeds.ts")
    
    # We will parse the file up to the end of Ragdoll (around line 598)
    end_bracket_idx = content.find("\n];\n\nexport function getBreedBySlug", idx)
    if end_bracket_idx == -1:
        # try without newline
        end_bracket_idx = content.find("];\n\nexport function getBreedBySlug", idx)
    
    prefix = content[:end_bracket_idx] # includes French Bulldog and Ragdoll!
    
    return prefix

print("Helper defined.")
