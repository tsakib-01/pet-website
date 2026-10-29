import shutil
import os

DOG_DIR = "public/images/breeds/dogs"
CAT_DIR = "public/images/breeds/cats"

ALIASES = [
    # (src_folder, canonical, alias)
    (DOG_DIR, "australian-cattle-dog.webp", "blue-heeler.webp"),
    (DOG_DIR, "cocker-spaniel.webp", "cocker-spaniel-puppy.webp"),
    (DOG_DIR, "dachshund.webp", "mini-dachshund.webp"),
    (DOG_DIR, "labrador-retriever.webp", "labrador-puppy.webp"),
    (CAT_DIR, "american-shorthair.webp", "american-shorthair-tabby.webp"),
    (CAT_DIR, "ragdoll.webp", "ragdoll-kitten.webp"),
    (CAT_DIR, "chartreux.webp", "chartreux-cat.webp"),
    (CAT_DIR, "devon-rex.webp", "devon-rex-cat.webp"),
    (CAT_DIR, "himalayan.webp", "himalayan-cat.webp"),
    (CAT_DIR, "russian-blue.webp", "russian-blue-cat.webp"),
    (CAT_DIR, "sphynx.webp", "sphynx-cat.webp"),
    (CAT_DIR, "turkish-angora.webp", "turkish-angora-cat.webp"),
]

for folder, src, alias in ALIASES:
    src_path = os.path.join(folder, src)
    alias_path = os.path.join(folder, alias)
    if os.path.exists(src_path) and src != alias:
        shutil.copy2(src_path, alias_path)
        print(f"Synced {alias} -> {src}")
