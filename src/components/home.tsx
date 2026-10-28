import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { pathFor, regionKeys, type Locale, type PageId } from "@/config/routes";
import type { Content } from "@/content/types";
import { addonKeys } from "@/modules/leads/schema";
import { MobileMenu } from "./MobileMenu";
import { TurnoverPlanner } from "./TurnoverPlanner";

/*
 * Startseite nach dem Richtungsblatt „The pinned poster“ (taste-skill v2, seed 920263089).
 * Idee: „Gast“ und „klar“ halten zwei Ecken, dazwischen zieht der Gästewechsel vorbei.
 */

const r = (i: number) => ({ "data-reveal": "", style: { "--reveal-i": i } as CSSProperties });

const btn =
  "press inline-flex min-h-13 items-center justify-center px-7 text-base font-medium";

function LangLink({ locale, pageId, c, className = "" }: { locale: Locale; pageId: PageId; c: Content; className?: string }) {
  const other: Locale = locale === "de" ? "en" : "de";
  return (
    <a href={pathFor(pageId, other)} hrefLang={other} lang={other} className={className}>
      <span aria-hidden="true">{c.locale.switchLabel}</span>
      <span className="sr-only">{c.locale.switchName}</span>
    </a>
  );
}

/** Hero + gepinnter Lauf: zwei Bildschirme Gästewechsel unter „Gast“ … „klar“ */
export function PinnedTurnover({ locale, c }: { locale: Locale; c: Content }) {
  const v = c.home.v3;
  const links = [
    { href: pathFor("services", locale), label: c.nav.services },
    { href: pathFor("about", locale), label: c.nav.about },
    { href: "#orte", label: c.nav.regions },
  ];
  return (
    <section aria-labelledby="home-title" className="relative bg-white">
      <div className="pointer-events-none relative z-20 h-[120svh] md:sticky md:top-0 md:h-svh">
        {/* Das h1 zeigt „Gast“ (oben links); „klar“ ist die zweite Hälfte des Namens unten rechts */}
        <h1
          id="home-title"
          aria-label={`GastKlar Rhein-Neckar: ${c.brand.tagline}`}
          className="pointer-events-auto absolute left-4 top-4 font-display text-display font-bold tracking-tight text-ocean md:left-7 md:top-7"
        >
          Gast
        </h1>
        <p
          aria-hidden="true"
          className="pointer-events-auto absolute bottom-4 right-4 font-display text-display font-bold leading-[0.88] tracking-tight text-ocean md:bottom-7 md:right-7"
        >
          klar
        </p>
      </div>

      <div className="-mt-[120svh] md:-mt-[100svh]">
        {/* Bildschirm 1: weiße Fläche Spalten 1–9, Foto Spalten 10–12 */}
        <div className="relative grid min-h-[120svh] grid-cols-12 md:min-h-svh">
          <div className="col-span-12 flex flex-col px-4 pb-32 pt-8 md:col-span-9 md:grid md:grid-cols-9 md:items-center md:px-7 md:py-0">
            <div className="md:col-span-5 md:col-start-3">
              <p {...r(0)} className="max-w-[34ch] text-lg">
                {v.heroSentence}
              </p>
              <div {...r(1)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href={pathFor("quote", locale)} className={`${btn} bg-ocean text-white hover:bg-ocean-deep`}>
                  {c.cta.primary}
                </Link>
              </div>
              <p {...r(2)} className="mt-10 text-sm font-medium">
                {c.brand.experience}. {c.brand.byOperator}
              </p>
            </div>
            <nav aria-label={c.nav.main} className="hidden md:col-span-2 md:col-start-8 md:block md:justify-self-end">
              <ul className="space-y-2 text-right text-sm">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-block py-1 hover:text-ocean">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <LangLink locale={locale} pageId="home" c={c} className="inline-block py-1 text-ocean hover:underline" />
                </li>
              </ul>
            </nav>
          </div>
          <div className="relative order-first col-span-12 mx-4 mt-[22svh] h-[40svh] overflow-hidden md:order-none md:col-span-3 md:mx-0 md:mt-0 md:mb-[28svh] md:h-auto">
            <Image
              src="/images/hero-schlafzimmer.jpg"
              alt={c.home.heroImageAlt}
              fill
              priority
              sizes="(min-width: 768px) 25vw, 100vw"
              className="slow-settle object-cover object-[68%_50%]"
            />
          </div>
          <div className="absolute right-4 top-4 z-30 md:hidden">
            <MobileMenu
              labels={{ menu: c.nav.menu, close: c.nav.close, main: c.nav.main }}
              links={[...links, { href: pathFor("quote", locale), label: c.nav.quote }]}
              footer={<LangLink locale={locale} pageId="home" c={c} className="text-base text-ocean underline" />}
            />
          </div>
        </div>

        {/* Bildschirme 2–3: der Wechsel zieht zwischen „Gast“ und „klar“ vorbei */}
        {v.panels.map((p, i) => (
          <div key={p.verb} className="grid grid-cols-12 items-center gap-x-6 px-4 py-20 md:min-h-[78svh] md:px-7 md:py-16">
            <h2 {...r(0)} className="col-span-12 text-xl md:col-span-3 md:col-start-1 md:self-center">
              {p.verb}
            </h2>
            <div
              {...r(1)}
              className="relative col-span-12 mt-6 aspect-[4/5] overflow-hidden md:col-span-4 md:col-start-5 md:mt-0"
            >
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 34vw, 100vw"
                className={`object-cover ${i === 0 ? "object-right" : ""}`}
              />
            </div>
            <div {...r(2)} className="col-span-12 mt-6 md:col-span-3 md:col-start-9 md:mt-0 md:self-end md:pb-24">
              <p className="text-lg font-bold tabular-nums text-gold-deep">{p.time}</p>
              <p className="mt-2 max-w-[32ch]">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** features — Pinned heading, passing rows (Ocean-Fläche) */
export function Included({ c }: { c: Content }) {
  const v = c.home.v3;
  return (
    <section aria-labelledby="included-title" className="on-ocean bg-ocean text-white">
      <div className="container-page grid grid-cols-12 gap-x-6 pb-32 md:py-32">
        <div className="col-span-12 md:col-span-5">
          <h2
            id="included-title"
            className="sticky top-0 z-10 -mx-4 bg-ocean px-4 py-3 text-xl md:top-8 md:mx-0 md:px-0 md:py-0"
          >
            {v.includedTitle}
          </h2>
        </div>
        <div className="col-span-12 mt-12 space-y-20 md:col-span-6 md:col-start-7 md:mt-0 md:space-y-32">
          {v.blocks.map((b, i) => (
            <div key={b.title}>
              <h3 {...r(0)} className="text-lg">
                {b.title}
              </h3>
              <div className={`mt-6 flex flex-col gap-6 sm:flex-row sm:items-start ${i % 2 ? "sm:flex-row-reverse sm:justify-end" : ""}`}>
                <div {...r(1)} className="relative aspect-[3/4] w-full shrink-0 overflow-hidden sm:w-52">
                  <Image
                    src={b.image}
                    alt={b.alt}
                    fill
                    sizes="(min-width: 640px) 208px, 100vw"
                    className="object-cover"
                  />
                </div>
                <ul {...r(2)} className="space-y-3.5">
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** list — Line-up at one type size: Zusatzleistungen ohne Preise */
export function AddonLineup({ c }: { c: Content }) {
  const v = c.home.v3;
  return (
    <section aria-labelledby="lineup-title" className="bg-ice py-32">
      <div className="container-page">
        <h2 id="lineup-title" {...r(0)} className="mb-5 text-lg text-ocean">
          {v.addonsTitle}
        </h2>
        <table className="w-full text-lg">
          <caption className="sr-only">{v.addonsTitle}</caption>
          <tbody>
            {addonKeys.map((k, i) => (
              <tr key={k} {...r(i + 1)} className="flex flex-col py-3 md:table-row md:py-0">
                <th scope="row" className="py-2 text-left font-normal md:w-1/3">
                  {c.addons[k].title}
                </th>
                <td className="py-1 text-base text-muted md:w-1/3 md:py-2 md:text-lg md:text-ink">{v.addonFormat[k]}</td>
                <td className="py-1 text-base text-gold-deep md:py-2 md:text-right md:text-lg">{c.home.addons.tags[k]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** about — Founder's letter */
export function FounderLetter({ c }: { c: Content }) {
  const v = c.home.v3;
  return (
    <section aria-labelledby="letter-title" className="bg-white py-40">
      <div className="mx-auto max-w-[32.5rem] px-4">
        <h2 id="letter-title" {...r(0)} className="text-lg">
          {v.letterTitle}
        </h2>
        {v.letter.map((p, i) => (
          <p key={p} {...r(i + 1)} className="mt-6">
            {p}
          </p>
        ))}
        <p {...r(4)} className="mt-10 font-medium">
          {v.letterSign}
          <span className="block font-normal text-muted">{c.brand.byOperator}</span>
        </p>
      </div>
    </section>
  );
}

/** showcase — Close-up with column card: eine Stadt je Bild, die Karte wandert eine Spalte weiter */
export function Places({ locale, c }: { locale: Locale; c: Content }) {
  const v = c.home.v3;
  const cols = ["md:col-start-2", "md:col-start-3", "md:col-start-4"];
  return (
    <div id="orte">
      <h2 className="sr-only">{v.placesTitle}</h2>
      {regionKeys.map((key, i) => {
        const region = c.regions[key];
        return (
          <section key={key} aria-labelledby={`city-${key}`} className="relative isolate flex h-svh items-end md:items-center">
            <Image src={v.cityImages[key].src} alt={v.cityImages[key].alt} fill loading="eager" sizes="100vw" className="-z-10 object-cover" />
            <div className="grid w-full grid-cols-4 md:px-7">
              <div
                {...r(0)}
                className={`on-ink col-span-4 flex min-h-[46svh] flex-col bg-ink p-5 text-white md:col-span-1 md:min-h-[52svh] md:items-center md:p-6 md:text-center ${cols[i]}`}
              >
                <h2 id={`city-${key}`} className="text-lg">
                  {region.name}
                </h2>
                <p className="mt-3 text-sm text-white/85">{v.districts[key]}</p>
                <p className="mt-3 text-sm font-medium text-sand">{region.meta.title}</p>
                <Link
                  href={pathFor(`region-${key}`, locale)}
                  className={`${btn} mt-auto w-full bg-white text-ink hover:bg-ice`}
                >
                  {v.cityMore} {region.name}
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/** faq — Questions beside a tall photograph */
export function HomeFaq({ locale, c }: { locale: Locale; c: Content }) {
  const v = c.home.v3;
  return (
    <section aria-labelledby="faq-title" className="bg-ice">
      <div className="container-page grid grid-cols-12 gap-x-6 py-24 md:py-32">
        <div className="col-span-12 md:col-span-5">
          <h2 id="faq-title" {...r(0)} className="text-xl">
            {c.home.faq.title}
          </h2>
          <ul {...r(1)} className="mt-8 space-y-2">
            {v.faqFacts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="mt-12 space-y-7">
            {c.home.faq.items.map((f) => (
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
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={pathFor("quote", locale)} className={`${btn} bg-ocean text-white hover:bg-ocean-deep`}>
              {c.cta.primary}
            </Link>
            <Link href={pathFor("services", locale)} className="text-link">
              {c.cta.services}
            </Link>
          </div>
        </div>
        <div className="relative col-span-12 order-first mb-16 md:order-none md:col-span-6 md:col-start-7 md:mb-0">
          <div className="relative aspect-[4/5] overflow-hidden md:-mt-48 md:aspect-[3/4]">
            <Image src="/images/wohnzimmer.jpg" alt={c.home.hostImageAlt} fill loading="eager" sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
          <div
            className="absolute -bottom-10 right-0 aspect-square w-[38%] overflow-hidden md:-left-10 md:right-auto md:w-1/3"
          >
            <Image src="/images/waesche.jpg" alt={c.home.addons.collageAlt[1]} fill loading="eager" sizes="(min-width: 768px) 15vw, 40vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** cta — Last photograph, text beside (rechte Hälfte als Ink-Fläche mit dem Wechsel-Planer) */
export function PlannerCta({ locale, c }: { locale: Locale; c: Content }) {
  const v = c.home.v3;
  return (
    <section aria-labelledby="planner-title" className="on-ink grid bg-ink text-white lg:min-h-[90svh] lg:grid-cols-12">
      <div className="relative h-[56svh] lg:col-span-7 lg:h-auto">
        <Image src="/images/schluesseluebergabe.jpg" alt={c.home.handoverAlt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
      </div>
      <div className="px-4 py-16 md:px-7 lg:col-span-5 lg:px-16 lg:py-24">
        <h2 id="planner-title" {...r(0)} className="text-xl">
          {v.plannerTitle}
        </h2>
        <p {...r(1)} className="mt-6 max-w-[40ch]">
          {v.plannerText}
        </p>
        <TurnoverPlanner v={v} action={pathFor("quote", locale)} cta={v.plannerSubmit} />
      </div>
    </section>
  );
}
