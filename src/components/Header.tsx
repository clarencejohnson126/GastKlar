import Link from "next/link";
import { pathFor, type Locale, type PageId } from "@/config/routes";
import type { Content } from "@/content/types";
import { MobileMenu } from "./MobileMenu";
import { CtaLink } from "./ui";

function LanguageSwitch({ locale, pageId, c }: { locale: Locale; pageId: PageId; c: Content }) {
  const label = locale === "de" ? "Sprache wählen" : "Choose language";
  return (
    <nav aria-label={label} className="inline-flex rounded-pill bg-ice p-1">
      {(["de", "en"] as const).map((l) => {
        const active = l === locale;
        return (
          // Wechsel zwischen den Root-Layouts: echter Seitenaufruf, Seitentyp bleibt erhalten
          <a
            key={l}
            href={pathFor(pageId, l)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            className={`press inline-flex min-h-10 min-w-12 items-center justify-center rounded-pill px-3 text-sm font-semibold ${
              active ? "bg-ocean text-white shadow-soft" : "text-ocean hover:bg-white"
            }`}
          >
            <span aria-hidden="true">{l.toUpperCase()}</span>
            <span className="sr-only">{l === "de" ? "Deutsch" : "English"}</span>
          </a>
        );
      })}
    </nav>
  );
}

export function Header({ locale, pageId, c }: { locale: Locale; pageId: PageId; c: Content }) {
  const home = pathFor("home", locale);
  const homeBase = home === "/" ? "" : home;
  const links = [
    { href: pathFor("services", locale), label: c.nav.services },
    { href: `${homeBase}/#ablauf`, label: locale === "de" ? "Ablauf" : "Process" },
    { href: `${homeBase}/#region`, label: c.nav.regions },
    { href: pathFor("about", locale), label: c.nav.about },
  ];
  // Das Formular steht laut 03 auf der Startseite; die Angebotsseite bleibt als eigene Route bestehen.
  const quote = pageId === "home" ? "#angebot" : pathFor("quote", locale);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-soft">
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-ocean focus:px-4 focus:py-3 focus:text-white"
      >
        {c.nav.skip}
      </a>
      <div className="container-page relative flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href={home} className="flex flex-col rounded-control">
          <span className="flex items-center gap-2 font-display text-base font-extrabold tracking-tight md:text-lg">
            <span aria-hidden="true" className="size-3 rounded-pill bg-sand" />
            <span className="text-ocean">GastKlar</span> <span className="text-ink">Rhein-Neckar</span>
          </span>
          <span className="hidden pl-5 text-xs text-muted lg:block">{c.brand.tagline}</span>
        </Link>

        <nav aria-label={c.nav.main} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={l.href === pathFor(pageId, locale) ? "page" : undefined}
                  className="inline-flex min-h-12 items-center whitespace-nowrap rounded-control px-3 text-sm font-semibold text-ink hover:text-ocean aria-[current=page]:text-ocean"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch locale={locale} pageId={pageId} c={c} />
          <CtaLink href={quote} className="press whitespace-nowrap px-5">{c.cta.primary}</CtaLink>
        </div>

        <MobileMenu
          labels={{ menu: c.nav.menu, close: c.nav.close, main: c.nav.main }}
          links={links}
          footer={
            <>
              <CtaLink href={quote} className="w-full">
                {c.cta.primary}
              </CtaLink>
              <LanguageSwitch locale={locale} pageId={pageId} c={c} />
            </>
          }
        />
      </div>
    </header>
  );
}
