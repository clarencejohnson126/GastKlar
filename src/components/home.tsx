import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { pathFor, regionKeys, type Locale } from "@/config/routes";
import { site } from "@/config/site";
import type { Content } from "@/content/types";
import { addonKeys } from "@/modules/leads/schema";
import { HotspotImage } from "./HotspotImage";
import { QuoteForm } from "./QuoteForm";
import { CtaLink, Icon } from "./ui";

/*
 * Startseite nach 03_DESIGN_SYSTEM.md, Abschnitt „Design sections“ (Reihenfolge verbindlich):
 * Hero · Kernleistungen · Zusatzleistungen · Ablauf · Gastgeber-Erfahrung · Rhein-Neckar · FAQ · Angebotsformular.
 * Header und Footer kommen aus der Shell (views/render.tsx).
 */

const r = (i: number) => ({ "data-reveal": "", style: { "--reveal-i": i } as CSSProperties });

function SectionHead({ id, kicker, title, intro, light = false }: { id: string; kicker?: string; title: string; intro?: string; light?: boolean }) {
  return (
    <div className="max-w-[44rem]">
      {kicker && (
        <p {...r(0)} className={`flex items-center gap-3 text-sm font-semibold ${light ? "text-white" : "text-ocean"}`}>
          <span aria-hidden="true" className="h-0.5 w-8 rounded-pill bg-sand" />
          {kicker}
        </p>
      )}
      <h2 id={id} {...r(1)} className={`mt-4 text-2xl-compact md:text-2xl ${light ? "text-white" : "text-ocean"}`}>
        {title}
      </h2>
      {intro && (
        <p {...r(2)} className={`mt-5 ${light ? "text-white/90" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

/** Hero: starke Aussage (04), Trust „Über 10 Jahre eigene Host-Erfahrung“, Hotspot-Bild, CTA (03) */
export function Hero({ locale, c }: { locale: Locale; c: Content }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[38%] bg-ice lg:block" />
      <div className="container-page relative grid items-center gap-12 py-12 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-6">
          <p {...r(0)} className="inline-flex items-center gap-2 rounded-pill bg-sand px-4 py-2 text-sm font-semibold text-ink">
            <Icon name="check" className="size-4" />
            {c.brand.experience}
          </p>
          <h1 id="hero-title" {...r(1)} className="mt-6 text-hero font-extrabold text-ocean">
            {c.home.h1}
          </h1>
          <p {...r(2)} className="mt-6 max-w-[34rem] text-lg font-normal leading-snug text-ink">
            {c.home.sub}
          </p>
          <div {...r(3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="#angebot" className="press shadow-soft">
              {c.cta.primary}
            </CtaLink>
            <CtaLink href={pathFor("services", locale)} variant="secondary" className="press">
              {c.cta.services}
            </CtaLink>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[32.5rem] lg:col-span-6 lg:col-start-7">
          <HotspotImage data={c.home.hotspots} src="/images/hero-schlafzimmer-v3.jpg" alt={c.home.heroImageAlt} />
          <div className="absolute -left-4 top-24 hidden size-36 overflow-hidden rounded-pill border-[6px] border-white shadow-lift sm:block lg:-left-14">
            <Image src="/images/schluesseluebergabe-v4.jpg" alt={c.home.handoverAlt} fill sizes="144px" className="object-cover object-[30%_30%]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Kernleistungen: Wechselreinigung, immer enthalten */
export function CoreServices({ c }: { c: Content }) {
  const core = c.home.core;
  return (
    <section id="leistungen" aria-labelledby="core-title" className="bg-ice py-20 lg:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12">
        <div className="relative order-last lg:order-first lg:col-span-5">
          <div {...r(0)} className="shape-arch relative aspect-[4/5] w-[86%] shadow-soft">
            <Image src="/images/reinigen-kueche-v3.jpg" alt={c.home.v3.panels[0].alt} fill sizes="(min-width: 1024px) 420px, 86vw" className="object-cover" />
          </div>
          <div {...r(1)} className="absolute -bottom-6 right-0 aspect-square w-[46%] overflow-hidden rounded-pill border-[6px] border-ice shadow-soft">
            <Image src="/images/reinigen-bad-v3.jpg" alt={c.home.v3.blocks[0].alt} fill sizes="(min-width: 1024px) 220px, 46vw" className="object-cover" />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHead id="core-title" kicker={c.nav.services} title={core.title} intro={core.intro} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {core.items.map((item, i) => (
              <li key={item} {...r(i)} className="flex gap-3 rounded-card bg-white p-4 shadow-soft">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-pill bg-sand text-ink">
                  <Icon name="check" className="size-4" />
                </span>
                <span className="text-sm leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <p {...r(2)} className="mt-6 text-sm text-muted">
            {core.note} {core.variants}
          </p>
          <div {...r(3)} className="mt-8">
            <CtaLink href="#angebot" className="press">
              {c.cta.primary}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Zusatzleistungen als klare Icons/Karten (03) */
export function Addons({ c }: { c: Content }) {
  return (
    <section aria-labelledby="addons-title" className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHead id="addons-title" kicker={c.form.fields.addonsLegend} title={c.home.addons.title} intro={c.home.addons.intro} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {addonKeys.map((k, i) => (
            <li
              key={k}
              {...r(i % 4)}
              className="group flex flex-col rounded-card border border-line bg-white p-6 shadow-soft transition-shadow duration-200 hover:shadow-lift"
            >
              <span className="flex size-12 items-center justify-center rounded-pill bg-sand text-ink transition-transform duration-200 group-hover:scale-105">
                <Icon name={k} />
              </span>
              <h3 className="mt-5 text-base leading-snug text-ocean">{c.addons[k].title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{c.addons[k].text}</p>
              <p className="mt-4 inline-flex w-fit rounded-pill bg-ice px-3 py-1 text-xs font-semibold text-ocean">
                {c.home.addons.tags[k]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Einfacher Ablauf */
export function Steps({ c }: { c: Content }) {
  return (
    <section id="ablauf" aria-labelledby="process-title" className="bg-ice py-20 lg:py-28">
      <div className="container-page">
        <SectionHead id="process-title" kicker={c.quote.asideTitle} title={c.home.process.title} />
        <ol className="relative mt-14 grid gap-8 md:grid-cols-5">
          <span aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-0.5 rounded-pill bg-sand md:block" />
          {c.home.process.steps.map((s, i) => (
            <li key={s.title} {...r(i)} className="relative">
              <span className="relative flex size-12 items-center justify-center rounded-pill bg-ocean font-display text-lg font-bold text-white ring-8 ring-ice">
                {i + 1}
              </span>
              <h3 className="mt-5 text-base text-ocean">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Gastgeber-Erfahrung */
export function HostExperience({ c }: { c: Content }) {
  const h = c.home.host;
  return (
    <section aria-labelledby="host-title" className="bg-white py-20 lg:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <div {...r(0)} className="shape-arch relative aspect-[4/5] w-full max-w-[28rem] shadow-lift">
            <Image src="/images/schluesseluebergabe-v4.jpg" alt={c.home.handoverAlt} fill sizes="(min-width: 1024px) 448px, 100vw" className="object-cover" />
          </div>
          <div aria-hidden="true" className="absolute -bottom-5 -right-2 hidden size-28 rounded-pill bg-sand lg:block" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHead id="host-title" kicker={c.brand.experience} title={h.title} />
          <blockquote {...r(2)} className="mt-8 border-l-4 border-sand pl-6 font-display text-lg font-bold leading-snug text-ocean [text-wrap:balance]">
            {h.paragraphs[0].split(". ")[0]}.
          </blockquote>
          {h.paragraphs.map((p) => (
            <p key={p} {...r(3)} className="mt-5 text-ink">
              {p}
            </p>
          ))}
          <ul className="mt-8 space-y-3">
            {h.points.map((p, i) => (
              <li key={p} {...r(i + 3)} className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-pill bg-sand text-ink">
                  <Icon name="check" className="size-4" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Rhein-Neckar-Gebiet: Meeresblau-Fläche, Städte mit runden Bildern */
export function RegionArea({ locale, c }: { locale: Locale; c: Content }) {
  const v = c.home.v3;
  return (
    <section id="region" aria-labelledby="region-title" className="on-ocean bg-ocean py-20 text-white lg:py-28">
      <div className="container-page">
        <SectionHead id="region-title" kicker="Rhein-Neckar" title={c.home.region.title} intro={c.home.region.text} light />
        <ul className="mt-14 grid gap-10 sm:grid-cols-3">
          {regionKeys.map((key, i) => (
            <li key={key} {...r(i)}>
              <Link href={pathFor(`region-${key}`, locale)} className="group block rounded-card">
                <div className="relative mx-auto aspect-square w-full max-w-[17rem] overflow-hidden rounded-pill border-[6px] border-sand transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image src={v.cityImages[key].src} alt={v.cityImages[key].alt} fill sizes="(min-width: 640px) 272px, 80vw" className="object-cover" />
                </div>
                <h3 className="mt-6 text-center text-xl text-white">{c.regions[key].name}</h3>
                <p className="mt-2 text-center text-sm text-white/90">{v.districts[key]}</p>
                <p className="mt-3 text-center text-sm font-semibold text-white underline decoration-sand decoration-2 underline-offset-4">
                  {c.regions[key].meta.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** FAQ als echte Akkordeons */
export function Faq({ c }: { c: Content }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead id="faq-title" kicker="FAQ" title={c.home.faq.title} />
          <div {...r(3)} className="relative mt-10 hidden aspect-square w-56 overflow-hidden rounded-pill border-[6px] border-ice shadow-soft lg:block">
            <Image src="/images/waesche-v3.jpg" alt={c.home.addons.collageAlt[1]} fill sizes="224px" className="object-cover" />
          </div>
        </div>
        <div className="space-y-3 lg:col-span-8">
          {c.home.faq.items.map((f, i) => (
            <details key={f.q} {...r(i)} className="group rounded-card bg-ice px-6 open:bg-white open:shadow-soft open:ring-1 open:ring-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-base font-bold text-ocean [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-sand text-ink transition-transform duration-200 group-open:rotate-45">
                  <Icon name="other" className="size-5" />
                </span>
              </summary>
              <p className="max-w-prose pb-6 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Angebotsformular direkt auf der Startseite (03) */
export function QuoteSection({ locale, c }: { locale: Locale; c: Content }) {
  const q = c.quote;
  return (
    <section id="angebot" aria-labelledby="quote-title" className="bg-ice py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead id="quote-title" kicker={c.nav.quote} title={q.h1} intro={q.intro} />
          <div {...r(3)} className="mt-8 rounded-card bg-white p-6 shadow-soft">
            <p className="font-display text-base font-bold text-ocean">{q.asideTitle}</p>
            <ol className="mt-4 space-y-3">
              {q.aside.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-pill bg-sand text-xs font-bold text-ink">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-5 border-t border-line pt-4 text-sm text-muted">{q.noPrice}</p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <QuoteForm
            f={c.form}
            addons={c.addons}
            locale={locale}
            privacyHref={pathFor("privacy", locale)}
            quoteHref={pathFor("quote", locale)}
            contactEmail={site.company.email}
          />
        </div>
      </div>
    </section>
  );
}

export function HomeSections({ locale, c }: { locale: Locale; c: Content }): ReactNode {
  return (
    <>
      <Hero locale={locale} c={c} />
      <CoreServices c={c} />
      <Addons c={c} />
      <Steps c={c} />
      <HostExperience c={c} />
      <RegionArea locale={locale} c={c} />
      <Faq c={c} />
      <QuoteSection locale={locale} c={c} />
    </>
  );
}
