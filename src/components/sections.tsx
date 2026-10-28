import Link from "next/link";
import type { CSSProperties } from "react";
import { pathFor, type Locale } from "@/config/routes";
import type { Content, Faq } from "@/content/types";
import { addonKeys } from "@/modules/leads/schema";
import { CtaLink, H2, Section } from "./ui";

/*
 * Gemeinsame Bausteine der Unterseiten in der Sprache der Startseite
 * (Richtung „The pinned poster“): keine Linien, keine Nummern, Ordnung durch Raum und Größe.
 */

const r = (i: number) => ({ "data-reveal": "", style: { "--reveal-i": i } as CSSProperties });

export function CoreService({ locale, c, title = c.home.core.title }: { locale: Locale; c: Content; title?: string }) {
  const core = c.home.core;
  return (
    <Section labelledBy="core-title">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <H2 id="core-title">{title}</H2>
          <p {...r(1)} className="mt-6 max-w-prose">
            {core.intro}
          </p>
          <p {...r(2)} className="mt-6 max-w-prose text-muted">
            {core.note} {core.variants}
          </p>
          <div {...r(3)} className="mt-10">
            <CtaLink href={pathFor("quote", locale)}>{c.cta.primary}</CtaLink>
          </div>
        </div>
        <ul className="space-y-5 md:col-span-6 md:col-start-7">
          {core.items.map((item, i) => (
            <li key={item} {...r(i)} className="text-lg">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/** Zusatzleistungen als Line-up in einer Schriftgröße (wie auf der Startseite), mit Beschreibung */
export function AddonsList({ c, withHeading = true, cta }: { c: Content; withHeading?: boolean; cta?: string }) {
  return (
    <div>
      {withHeading && <H2 id="addons-title">{c.home.addons.title}</H2>}
      <ul className="mt-12 space-y-10">
        {addonKeys.map((k, i) => (
          <li key={k} {...r(i)} className="grid gap-2 md:grid-cols-12 md:gap-6">
            <h3 className="text-lg md:col-span-4">{c.addons[k].title}</h3>
            <p className="max-w-prose md:col-span-6">{c.addons[k].text}</p>
            <p className="text-ocean md:col-span-2 md:text-right">{c.home.addons.tags[k]}</p>
          </li>
        ))}
      </ul>
      {cta && (
        <div className="mt-16">
          <CtaLink href={cta}>{c.cta.primary}</CtaLink>
        </div>
      )}
    </div>
  );
}

/** Ablauf: Reihenfolge durch Position, nicht durch Nummern */
export function Process({ c, tone = "white" }: { c: Content; tone?: "white" | "ice" }) {
  return (
    <Section tone={tone} labelledBy="process-title">
      <H2 id="process-title">{c.home.process.title}</H2>
      <ol className="mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
        {c.home.process.steps.map((s, i) => (
          <li key={s.title} {...r(i)}>
            <h3 className="text-lg">{s.title}</h3>
            <p className="mt-3 text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function FaqList({ title, items, id = "faq-title" }: { title: string; items: Faq[]; id?: string }) {
  return (
    <div className="grid gap-12 md:grid-cols-12">
      <div className="md:col-span-4">
        <H2 id={id}>{title}</H2>
      </div>
      <div className="space-y-7 md:col-span-7 md:col-start-6">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mt-1 size-5 shrink-0 text-ocean transition-transform duration-200 ease-soft group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <p className="mt-3 max-w-prose text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function FinalCta({ locale, c }: { locale: Locale; c: Content }) {
  return (
    <section aria-labelledby="final-title" className="on-ocean bg-ocean py-32 text-white">
      <div className="container-page grid gap-10 md:grid-cols-12 md:items-end">
        <h2 id="final-title" {...r(0)} className="text-xl md:col-span-7">
          {c.home.final.title}
        </h2>
        <div {...r(1)} className="md:col-span-4 md:col-start-9">
          <p>{c.home.final.text}</p>
          <Link
            href={pathFor("quote", locale)}
            className="press mt-8 inline-flex min-h-13 items-center justify-center bg-white px-7 text-base font-medium text-ink hover:bg-ice"
          >
            {c.cta.primary}
          </Link>
        </div>
      </div>
    </section>
  );
}
