export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const regionKeys = ["mannheim", "heidelberg", "ludwigshafen"] as const;
export type RegionKey = (typeof regionKeys)[number];

export type PageId =
  | "home"
  | "services"
  | "about"
  | "quote"
  | `region-${RegionKey}`
  | "privacy"
  | "imprint";

export interface RouteDef {
  id: PageId;
  slug: Record<Locale, string[]>;
  /** false = noindex und nicht in der Sitemap (z. B. Rechtstexte bis zur Bestätigung) */
  indexable: boolean;
}

/**
 * Routen-Registry: jede Seite genau einmal, mit DE- und EN-Slug.
 * Neue Seite = neuer Eintrag hier + Inhalt in src/content.
 */
export const routes: RouteDef[] = [
  { id: "home", slug: { de: [], en: [] }, indexable: true },
  { id: "services", slug: { de: ["leistungen"], en: ["services"] }, indexable: true },
  { id: "about", slug: { de: ["ueber-uns"], en: ["about"] }, indexable: true },
  { id: "quote", slug: { de: ["angebot"], en: ["quote"] }, indexable: true },
  ...regionKeys.map(
    (city): RouteDef => ({
      id: `region-${city}`,
      slug: { de: ["region", city], en: ["region", city] },
      indexable: true,
    }),
  ),
  { id: "privacy", slug: { de: ["datenschutz"], en: ["privacy"] }, indexable: false },
  { id: "imprint", slug: { de: ["impressum"], en: ["legal-notice"] }, indexable: false },
];

const byId = new Map(routes.map((r) => [r.id, r]));

export function getRoute(id: PageId): RouteDef {
  const route = byId.get(id);
  if (!route) throw new Error(`Unbekannte Route: ${id}`);
  return route;
}

export function pathFor(id: PageId, locale: Locale): string {
  const segments = getRoute(id).slug[locale];
  const prefix = locale === "en" ? "/en" : "";
  const path = [prefix, ...segments].join("/");
  return path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
}

export function resolveRoute(locale: Locale, slug: string[] = []): RouteDef | undefined {
  const key = slug.join("/");
  return routes.find((r) => r.slug[locale].join("/") === key);
}

export function staticParamsFor(locale: Locale) {
  return routes.map((r) => ({ slug: r.slug[locale] }));
}

export function regionOf(id: PageId): RegionKey | undefined {
  return id.startsWith("region-") ? (id.slice("region-".length) as RegionKey) : undefined;
}
