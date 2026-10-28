import Link from "next/link";
import { pathFor, regionKeys, type Locale, type PageId } from "@/config/routes";
import type { Content } from "@/content/types";

/** Bildnachweise der Archivfotos (Quelle: assets/credits.json, erzeugt von taste-skill assets.mjs) */
const archiveCredits = [
  {
    title: "2026-07-11 Wasserturm Mannheim Friedrichsplatz",
    by: "Achim Lammerts (Syntaxys)",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:2026-07-11_Wasserturm_Mannheim_Friedrichsplatz_(Z5-1319M)_by_Achim_Lammerts.jpg",
  },
  {
    title: "View of Heidelberg Castle, Alte Brücke, and Altstadt from the northwest",
    by: "Eugene Alvin Villar (seav)",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:View_of_Heidelberg_Castle,_Alte_Br%C3%BCcke,_and_Altstadt_from_the_northwest.jpg",
  },
  {
    title: "View Konrad Adenauer bridge over the Rhine between Mannheim and Ludwigshafen",
    by: "Nemracc",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:View_Konrad_Adenauer_bridge_over_the_Rhine_between_Mannheim_and_Ludwigshafen.jpg",
  },
];

/** Footer: Meeresblau-Fläche, Sandgold-Akzente */
export function Footer({ locale, pageId, c }: { locale: Locale; pageId: PageId; c: Content }) {
  const other: Locale = locale === "de" ? "en" : "de";
  const link = "inline-flex min-h-11 items-center text-sm text-white hover:underline hover:decoration-sand hover:decoration-2 hover:underline-offset-4";
  return (
    <footer className="on-ocean bg-ocean text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight">
            <span aria-hidden="true" className="size-3.5 rounded-pill bg-sand" />
            GastKlar Rhein-Neckar
          </p>
          <p className="mt-2 text-sm text-white/90">{c.brand.tagline}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-pill bg-sand px-4 py-2 text-sm font-semibold text-ink">
            {c.brand.experience}
          </p>
        </div>
        <nav aria-label={c.footer.navTitle} className="md:col-span-2">
          <p className="text-sm font-semibold text-white">{c.footer.navTitle}</p>
          <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-pill bg-sand" />
          <ul className="mt-3">
            <li><Link className={link} href={pathFor("services", locale)}>{c.nav.services}</Link></li>
            <li><Link className={link} href={pathFor("about", locale)}>{c.nav.about}</Link></li>
            <li><Link className={link} href={pathFor("quote", locale)}>{c.nav.quote}</Link></li>
          </ul>
        </nav>
        <nav aria-label={c.footer.regionsTitle} className="md:col-span-3">
          <p className="text-sm font-semibold text-white">{c.footer.regionsTitle}</p>
          <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-pill bg-sand" />
          <ul className="mt-3">
            {regionKeys.map((r) => (
              <li key={r}>
                <Link className={link} href={pathFor(`region-${r}`, locale)}>{c.regions[r].meta.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={c.footer.legalTitle} className="md:col-span-2">
          <p className="text-sm font-semibold text-white">{c.footer.legalTitle}</p>
          <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-pill bg-sand" />
          <ul className="mt-3">
            <li><Link className={link} href={pathFor("imprint", locale)}>{c.footer.imprint}</Link></li>
            <li><Link className={link} href={pathFor("privacy", locale)}>{c.footer.privacy}</Link></li>
            <li>
              <a className={link} href={pathFor(pageId, other)} hrefLang={other} lang={other}>{c.locale.switchName}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-page border-t border-white/25 py-6 text-xs text-white/90">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>{c.footer.independence}</p>
          <div className="flex items-center gap-6">
            <a href="https://rebelzai.com" rel="noopener" className="underline decoration-sand decoration-2 underline-offset-4 hover:text-white">
              Website: RebelzAi.com
            </a>
            <a href="#top" className="underline decoration-sand decoration-2 underline-offset-4 hover:text-white">
              {c.home.v3.backToTop}
            </a>
          </div>
        </div>
        <details id="bildnachweise" className="group mt-3">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 underline decoration-sand decoration-2 underline-offset-4 hover:text-white [&::-webkit-details-marker]:hidden">
            {c.footer.credits}
            <span aria-hidden="true" className="transition-transform duration-200 group-open:rotate-180">▾</span>
          </summary>
          <p className="mt-2 max-w-prose">{c.home.imageCredit}</p>
          <ul className="mt-2 max-w-prose space-y-1">
            {archiveCredits.map((a) => (
              <li key={a.page}>
                <a href={a.page} className="underline underline-offset-2 hover:text-white">{a.title}</a> · {a.by} ·{" "}
                <a href={a.licenceUrl} className="underline underline-offset-2 hover:text-white">{a.licence}</a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </footer>
  );
}
