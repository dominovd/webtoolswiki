import { MetadataRoute } from "next";

const baseUrl = "https://webtoolswiki.com";
const lastMod = new Date("2026-05-13");

const tools = [
  // High-traffic tools
  { url: "/cursive-text-generator",          priority: 0.9 },
  { url: "/imei-generator",                  priority: 0.9 },
  { url: "/us-phone-number-generator",       priority: 0.9 },
  { url: "/xbox-gamertag-generator",         priority: 0.9 },
  { url: "/pictionary-word-generator",       priority: 0.9 },
  // Text & word tools
  { url: "/anagram-generator",               priority: 0.8 },
  { url: "/superscript-generator",           priority: 0.8 },
  { url: "/subscript-generator",             priority: 0.8 },
  { url: "/weird-text-generator",            priority: 0.8 },
  { url: "/symbol-text-generator",           priority: 0.8 },
  { url: "/4-letter-word-generator",         priority: 0.8 },
  { url: "/5-letter-word-generator",         priority: 0.8 },
  { url: "/6-letter-word-generator",         priority: 0.8 },
  // Phone generators
  { url: "/canada-phone-number-generator",   priority: 0.8 },
  { url: "/uk-phone-number-generator",       priority: 0.8 },
  { url: "/au-phone-number-generator",       priority: 0.8 },
  { url: "/nz-phone-number-generator",       priority: 0.7 },
  // Fun generators
  { url: "/quirk-generator",                 priority: 0.7 },
  { url: "/mythical-creature-generator",     priority: 0.7 },
  { url: "/disney-character-generator",      priority: 0.7 },
  { url: "/wu-tang-name-generator",          priority: 0.7 },
  // Static pages
  { url: "/about",                           priority: 0.5 },
  { url: "/contact",                         priority: 0.5 },
  { url: "/privacy",                         priority: 0.3 },
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
