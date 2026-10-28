import Link from "next/link";
import { pathFor, type Locale, type PageId } from "@/config/routes";
import type { Content } from "@/content/types";
import { MobileMenu } from "./MobileMenu";
import { CtaLink } from "./ui";

function LanguageSwitch({ locale, pageId, c }: { locale: Locale; pageId: PageId; c: Content }) {
  const other: Locale = locale === "de" ? "en" : "de";
  return (
    <p className="flex items-center gap-1 text-sm font-semibold">
      <span aria-hidden="true" className="px-2 text-ink">
        {locale.toUpperCase()}
      </span>
      <span aria-hidden="true" className="text-line">
        |
      </span>
      {/* Wechsel zwischen den Root-Layouts: echter Seitenaufruf, Seitentyp bleibt erhalten */}
      <a
        href={pathFor(pageId, other)}
        hrefLang={other}
        lang={other}
        className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-control px-2 text-ocean underline-offset-4 hover:underline"
      >
        <span aria-hidden="true">{c.locale.switchLabel}</span>
        <span className="sr-only">{c.locale.switchName}</span>
      </a>
    </p>
  );
}

export function Header({ locale, pageId, c }: { locale: Locale; pageId: PageId; c: Content }) {
  const home = pathFor("home", locale);
  const links = [
    { href: pathFor("services", locale), label: c.nav.services },
    { href: pathFor("about", locale), label: c.nav.about },
    { href: `${home === "/" ? "" : home}/#region`, label: c.nav.regions },
  ];
  const quote = pathFor("quote", locale);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-ocean focus:px-4 focus:py-3 focus:text-white"
      >
        {c.nav.skip}
      </a>
      <div className="container-page relative flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href={home} className="flex flex-col rounded-control">
          <span className="font-display text-base font-extrabold tracking-tight md:text-lg">
            <span className="text-ocean">GastKlar</span> <span className="text-ink">Rhein-Neckar</span>
          </span>
          <span className="hidden text-xs text-muted lg:block">{c.brand.tagline}</span>
        </Link>

        <nav aria-label={c.nav.main} className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={l.href === pathFor(pageId, locale) ? "page" : undefined}
                  className="inline-flex min-h-12 items-center rounded-control px-3 text-sm font-semibold text-ink hover:text-ocean aria-[current=page]:text-ocean"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch locale={locale} pageId={pageId} c={c} />
          <CtaLink href={quote}>{c.cta.primary}</CtaLink>
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
