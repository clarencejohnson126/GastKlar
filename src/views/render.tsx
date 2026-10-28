import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteForm } from "@/components/QuoteForm";
import { HomeSections } from "@/components/home";
import {
  AddonsList,
  CoreService,
  FaqList,
  FinalCta,
  Process,
} from "@/components/sections";
import { CheckList, CtaLink, H2, PageIntro, Section } from "@/components/ui";
import { locales, pathFor, regionOf, resolveRoute, type Locale, type PageId } from "@/config/routes";
import { site } from "@/config/site";
import type { Content, PageMeta } from "@/content/types";
import { getContent } from "@/lib/i18n";

function metaFor(id: PageId, c: Content): PageMeta {
  const region = regionOf(id);
  if (region) return c.regions[region].meta;
  switch (id) {
    case "home":
      return c.home.meta;
    case "services":
      return c.services.meta;
    case "about":
      return c.about.meta;
    case "quote":
      return c.quote.meta;
    case "privacy":
      return c.legal.privacy.meta;
    case "imprint":
      return c.legal.imprint.meta;
    default:
      return c.home.meta;
  }
}

export function pageMetadata(locale: Locale, slug?: string[]): Metadata {
  const route = resolveRoute(locale, slug);
  if (!route) return {};
  const c = getContent(locale);
  const meta = metaFor(route.id, c);
  const title = route.id === "home" ? meta.title : `${meta.title} | ${site.brand}`;
  const url = pathFor(route.id, locale);
  return {
    title: { absolute: title },
    description: meta.description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, pathFor(route.id, l)])),
        "x-default": pathFor(route.id, "de"),
      },
    },
    openGraph: {
      title,
      description: meta.description,
      url,
      siteName: site.brand,
      locale: c.locale.ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => getContent(l).locale.ogLocale),
      type: "website",
    },
    robots: route.indexable && site.indexable ? undefined : { index: false, follow: site.indexable },
  };
}

/** JSON-LD nur mit gesicherten Angaben (keine Adresse, kein LocalBusiness ohne bestätigte Daten) */
function JsonLd({ locale, id, c }: { locale: Locale; id: PageId; c: Content }) {
  const region = regionOf(id);
  const provider = { "@type": "Organization", name: site.brand, url: site.url};
  const data =
    id === "home"
      ? [
          { "@context": "https://schema.org", "@type": "WebSite", name: site.brand, url: `${site.url}${pathFor("home", locale)}`, inLanguage: locale },
          { "@context": "https://schema.org", "@type": "Service", name: c.brand.tagline, serviceType: c.brand.tagline, provider, areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })) },
        ]
      : region
        ? [{ "@context": "https://schema.org", "@type": "Service", name: c.regions[region].meta.title, serviceType: c.brand.tagline, provider, areaServed: { "@type": "City", name: c.regions[region].name } }]
        : null;
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

function Shell({ locale, id, c, children }: { locale: Locale; id: PageId; c: Content; children: ReactNode }) {
  return (
    <>
      <span id="top" />
      <Header locale={locale} pageId={id} c={c} />
      <main id="inhalt" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer locale={locale} pageId={id} c={c} />
      <JsonLd locale={locale} id={id} c={c} />
    </>
  );
}

function HomeView({ locale, c }: { locale: Locale; c: Content }) {
  return (
    <HomeSections locale={locale} c={c} />
  );
}

function ServicesView({ locale, c }: { locale: Locale; c: Content }) {
  const s = c.services;
  return (
    <>
      <PageIntro title={s.h1} intro={s.intro} image={{ src: "/images/bad-v3.jpg", alt: c.home.story.steps[2].alt }}>
        <div className="mt-8">
          <CtaLink href={pathFor("quote", locale)}>{c.cta.primary}</CtaLink>
        </div>
      </PageIntro>
      <CoreService locale={locale} c={c} title={s.coreTitle} />
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <H2>{s.hostProvides.title}</H2>
            <div className="mt-6">
              <CheckList items={s.hostProvides.items} />
            </div>
          </div>
          <div>
            <H2>{s.notIncluded.title}</H2>
            <ul className="mt-6 space-y-4">
              {s.notIncluded.items.map((i) => (
                <li key={i} className="border-l-4 border-sand pl-4">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section tone="ice" labelledBy="addons-title">
        <H2 id="addons-title">{s.addonsTitle}</H2>
        <p className="mt-4 max-w-prose text-muted">{s.addonsIntro}</p>
        <AddonsList c={c} withHeading={false} cta={pathFor("quote", locale)} />
      </Section>
      <Process c={c} />
      <FinalCta locale={locale} c={c} />
    </>
  );
}

function AboutView({ locale, c }: { locale: Locale; c: Content }) {
  const a = c.about;
  return (
    <>
      <PageIntro title={a.h1} intro={a.intro} image={{ src: "/images/betten-beziehen-v3.jpg", alt: c.home.story.steps[3].alt }} />
      <Section labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <H2 id="story-title">{a.storyTitle}</H2>
          </div>
          <div className="space-y-4 lg:col-span-7">
            {a.story.map((p) => (
              <p key={p} className="max-w-prose">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="ice" labelledBy="principles-title">
        <H2 id="principles-title">{a.principlesTitle}</H2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {a.principles.map((p) => (
            <li key={p.title} className="border-t-4 border-sand pt-6">
              <h3 className="text-base">{p.title}</h3>
              <p className="mt-2 text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <FinalCta locale={locale} c={c} />
    </>
  );
}

function QuoteView({ locale, c }: { locale: Locale; c: Content }) {
  const q = c.quote;
  return (
    <div className="bg-ice py-12 lg:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="text-2xl-compact md:text-2xl">{q.h1}</h1>
          <p id="form-required-note" className="mt-4 max-w-prose text-muted">
            {q.intro}
          </p>
          <div className="mt-8">
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
        <aside className="lg:col-span-4" aria-labelledby="aside-title">
          <div className="rounded-card border border-line bg-white p-6 lg:sticky lg:top-24">
            <h2 id="aside-title" className="text-lg">
              {q.asideTitle}
            </h2>
            <ol className="mt-4 space-y-3">
              {q.aside.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-pill bg-ocean text-xs font-semibold text-white" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="text-sm">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-l-4 border-sand pl-4 text-sm text-muted">{q.noPrice}</p>
            <p className="mt-6 text-sm font-semibold">{c.brand.experience}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

const regionImages = {
  mannheim: (c: Content) => ({ src: "/images/wohnzimmer-v3.jpg", alt: c.home.hostImageAlt }),
  heidelberg: (c: Content) => ({ src: "/images/region/view-of-heidelberg-castle-alte-brucke-and.jpg", alt: c.home.regionImageAlt }),
  ludwigshafen: (c: Content) => ({ src: "/images/schluesseltresor-v3.jpg", alt: c.home.addons.collageAlt[0] }),
} as const;

function RegionView({ locale, c, region }: { locale: Locale; c: Content; region: NonNullable<ReturnType<typeof regionOf>> }) {
  const r = c.regions[region];
  const mentionsTrademark = [r.meta.title, r.h1, r.meta.description].some((s) => s.includes("Airbnb"));
  return (
    <>
      <PageIntro title={r.h1} intro={r.intro} image={regionImages[region](c)}>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          <CtaLink href={pathFor("quote", locale)}>{c.cta.primary}</CtaLink>
          <p className="text-sm font-semibold">{c.brand.experience}</p>
        </div>
      </PageIntro>
      <Section labelledBy="local-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <H2 id="local-title">{r.localTitle}</H2>
          </div>
          <div className="space-y-4 lg:col-span-7">
            {r.local.map((p) => (
              <p key={p} className="max-w-prose">
                {p}
              </p>
            ))}
            <h3 className="pt-4 text-base">{r.areaTitle}</h3>
            <p className="max-w-prose text-muted">{r.area}</p>
          </div>
        </div>
      </Section>
      <CoreService locale={locale} c={c} title={c.regionShared.servicesTitle} />
      <Section labelledBy="addons-title">
        <AddonsList c={c} cta={pathFor("quote", locale)} />
      </Section>
      <Process c={c} />
      <Section>
        <FaqList id="region-faq-title" title={c.regionShared.faqTitle} items={[...r.faqs, ...c.home.faq.items.slice(0, 3)]} />
      </Section>
      <FinalCta locale={locale} c={c} />
      {mentionsTrademark && (
        <p className="container-page py-6 text-xs text-muted">{c.regionShared.trademark}</p>
      )}
    </>
  );
}

function LegalView({ doc, c }: { doc: Content["legal"]["privacy"] & { sections?: { title: string; lines: string[] }[] }; c: Content }) {
  return (
    <Section>
      <h1 className="text-2xl-compact text-ocean md:text-2xl">{doc.h1}</h1>
      {doc.sections ? (
        <div className="mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {doc.sections.map((s) => (
            <section key={s.title} className="rounded-card bg-ice p-6">
              <h2 className="flex items-center gap-3 text-base text-ocean">
                <span aria-hidden="true" className="h-0.5 w-6 rounded-pill bg-sand" />
                {s.title}
              </h2>
              {s.lines.map((l) => (
                <p key={l} className="mt-2">
                  {l.includes("RebelzAi.com") ? (
                    <>
                      {l.replace("RebelzAi.com", "")}
                      <a href="https://rebelzai.com" className="text-link" rel="noopener">RebelzAi.com</a>
                    </>
                  ) : l.startsWith("E-Mail") || l.startsWith("Email") ? (
                    <>
                      {l.split(":")[0]}: <a href="mailto:info@johnson-services.de" className="text-link">info@johnson-services.de</a>
                    </>
                  ) : (
                    l
                  )}
                </p>
              ))}
            </section>
          ))}
        </div>
      ) : (
        <>
          <div className="mt-8 max-w-prose rounded-card border-2 border-sand bg-white p-6">
            <p className="font-semibold text-ink">{c.legal.placeholder}</p>
            <p className="mt-2">{doc.notice}</p>
          </div>
          <ul className="mt-8 max-w-prose list-disc space-y-2 pl-6">
            {doc.topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}

export function renderPage(locale: Locale, slug?: string[]) {
  const route = resolveRoute(locale, slug);
  if (!route) notFound();
  const c = getContent(locale);
  const region = regionOf(route.id);

  let body: ReactNode;
  if (region) body = <RegionView locale={locale} c={c} region={region} />;
  else if (route.id === "home") body = <HomeView locale={locale} c={c} />;
  else if (route.id === "services") body = <ServicesView locale={locale} c={c} />;
  else if (route.id === "about") body = <AboutView locale={locale} c={c} />;
  else if (route.id === "quote") body = <QuoteView locale={locale} c={c} />;
  else if (route.id === "privacy") body = <LegalView doc={c.legal.privacy} c={c} />;
  else body = <LegalView doc={c.legal.imprint} c={c} />;

  return (
    <Shell locale={locale} id={route.id} c={c}>
      {body}
    </Shell>
  );
}

export function NotFoundView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  return (
    <Shell locale={locale} id="home" c={c}>
      <Section>
        <h1 className="text-2xl-compact md:text-2xl">{c.notFound.title}</h1>
        <p className="mt-4 max-w-prose text-muted">{c.notFound.text}</p>
        <div className="mt-8">
          <CtaLink href={pathFor("home", locale)}>{c.notFound.home}</CtaLink>
        </div>
      </Section>
    </Shell>
  );
}
