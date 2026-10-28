import type { MetadataRoute } from "next";
import { locales, pathFor, routes } from "@/config/routes";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes
    .filter((r) => r.indexable)
    .flatMap((r) =>
      locales.map((locale) => ({
        url: `${site.url}${pathFor(r.id, locale)}`,
        changeFrequency: "monthly" as const,
        priority: r.id === "home" ? 1 : r.id === "quote" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${pathFor(r.id, l)}`])),
        },
      })),
    );
}
