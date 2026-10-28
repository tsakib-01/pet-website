import { MetadataRoute } from "next";
import { CALCULATOR_TOOLS } from "@/data/calculators";
import { BREED_DATABASE } from "@/data/breeds";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pawtruth.com";
  const now = new Date();

  const toolRoutes = CALCULATOR_TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const breedRoutes = BREED_DATABASE.map((breed) => ({
    url: `${baseUrl}/breed/${breed.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/breed`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...breedRoutes,
    ...toolRoutes,
  ];
}
