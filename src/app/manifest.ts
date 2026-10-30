import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PawTrusty — Pet Health & Safety",
    short_name: "PawTrusty",
    description: "Veterinary-accurate calculators and pet food recall safety directory.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF4EE",
    theme_color: "#583D32",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo-pawtrusty-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
