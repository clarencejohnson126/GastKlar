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

/** footer — Name first, places under it */
export function Footer({ locale, pageId, c }: { locale: Locale; pageId: PageId; c: Content }) {
  const other: Locale = locale === "de" ? "en" : "de";
  const small = "inline-flex min-h-11 items-center text-sm text-white/85 hover:text-white";
  return (
    <footer className="on-ink overflow-hidden bg-ink text-white">
      <div className="container-page pt-16">
        <p aria-hidden="true" className="font-display text-[clamp(3.5rem,14vw,14rem)] font-bold leading-[0.85] tracking-tight">
          GastKlar
        </p>
        <p className="mt-4 text-lg">Rhein-Neckar. {c.brand.tagline}</p>

        <div className="mt-18 grid grid-cols-12 gap-x-6 gap-y-12">
          <nav aria-label={c.footer.regionsTitle} className="col-span-12 md:col-span-5">
            <ul className="space-y-1">
              {regionKeys.map((r) => (
                <li key={r}>
                  <Link href={pathFor(`region-${r}`, locale)} className="text-xl text-sand hover:text-white">
                    {c.regions[r].name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:col-span-6 md:col-start-7">
            <nav aria-label={c.footer.navTitle}>
              <p className="text-sm font-medium">{c.footer.navTitle}</p>
              <ul className="mt-2">
                <li><Link className={small} href={pathFor("services", locale)}>{c.nav.services}</Link></li>
                <li><Link className={small} href={pathFor("about", locale)}>{c.nav.about}</Link></li>
                <li><Link className={small} href={pathFor("quote", locale)}>{c.nav.quote}</Link></li>
              </ul>
            </nav>
            <nav aria-label={c.footer.legalTitle}>
              <p className="text-sm font-medium">{c.footer.legalTitle}</p>
              <ul className="mt-2">
                <li><Link className={small} href={pathFor("imprint", locale)}>{c.footer.imprint}</Link></li>
                <li><Link className={small} href={pathFor("privacy", locale)}>{c.footer.privacy}</Link></li>
              </ul>
            </nav>
            <div>
              <a href={pathFor(pageId, other)} hrefLang={other} lang={other} className={small}>
                {c.locale.switchName}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-4 pb-10 text-xs text-white/85">
          <div className="col-span-12 space-y-2 md:col-span-9">
            <p>
              {c.brand.experience}. {c.brand.byOperator} {c.footer.independence}
            </p>
            <p>
              {c.home.imageCredit}{" "}
              {archiveCredits.map((a, i) => (
                <span key={a.page}>
                  <a href={a.page} className="underline underline-offset-2 hover:text-white">
                    „{a.title}“
                  </a>{" "}
                  ({a.by},{" "}
                  <a href={a.licenceUrl} className="underline underline-offset-2 hover:text-white">
                    {a.licence}
                  </a>
                  ){i < archiveCredits.length - 1 ? "; " : "."}
                </span>
              ))}
            </p>
          </div>
          <p className="col-span-12 md:col-span-3 md:text-right">
            <a href="#top" className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-white">
              {c.home.v3.backToTop}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
