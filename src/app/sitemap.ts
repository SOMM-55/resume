import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date();

  return [
    {
      url: `${baseUrl}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          fa: `${baseUrl}/fa`,
        },
      },
    },
    {
      url: `${baseUrl}/fa`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          fa: `${baseUrl}/fa`,
        },
      },
    },
  ];
}
