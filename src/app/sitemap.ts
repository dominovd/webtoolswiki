import { MetadataRoute } from "next";

const baseUrl = "https://webtoolswiki.com";
const lastMod = new Date("2026-05-13");

const tools = [
  { url: "/cursive-text-generator",        priority: 0.9 },
  { url: "/imei-generator",                priority: 0.9 },
  { url: "/us-phone-number-generator",     priority: 0.9 },
  { url: "/xbox-gamertag-generator",       priority: 0.9 },
  { url: "/canada-phone-number-generator", priority: 0.8 },
  { url: "/anagram-generator",             priority: 0.8 },
  { url: "/about",                         priority: 0.5 },
  { url: "/contact",                       priority: 0.5 },
  { url: "/privacy",                       priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...tools.map((t) => ({
      url: `${baseUrl}${t.url}`,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: t.priority,
    })),
  ];
}
