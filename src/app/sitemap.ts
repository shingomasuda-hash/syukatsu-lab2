import type { MetadataRoute } from "next";
import { companies } from "@/data/companies";
import { events } from "@/data/events";
import { articles } from "@/data/knowhow";
import { NAV, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  return [
    { url: base, priority: 1 },
    ...NAV.map((item) => ({ url: `${base}${item.href}`, priority: 0.8 })),
    ...companies.map((c) => ({
      url: `${base}/companies/${c.slug}`,
      lastModified: c.publishedAt,
      priority: 0.7,
    })),
    ...events.map((e) => ({ url: `${base}/events/${e.slug}`, priority: 0.6 })),
    ...articles.map((a) => ({
      url: `${base}/knowhow/${a.slug}`,
      lastModified: a.publishedAt,
      priority: 0.6,
    })),
  ];
}
