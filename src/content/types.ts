import type { RegionKey } from "@/config/routes";
import type { AddonKey } from "@/modules/leads/schema";

export interface Faq {
  q: string;
  a: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface RegionContent {
  meta: PageMeta;
  name: string;
  h1: string;
  intro: string;
  localTitle: string;
  local: string[];
  areaTitle: string;
  area: string;
  faqs: Faq[];
}

export interface Content {
  locale: { htmlLang: string; ogLocale: string; switchLabel: string; switchName: string };
  brand: { tagline: string; byOperator: string; experience: string };
  nav: {
    skip: string;
    main: string;
    menu: string;
    close: string;
    services: string;
    about: string;
    regions: string;
    quote: string;
  };
  cta: { primary: string; services: string };
  home: {
    meta: PageMeta;
    h1: string;
    sub: string;
    timeline: {
      label: string;
      checkout: string;
      checkin: string;
      note: string;
      steps: string[];
    };
    v3: {
      heroSentence: string;
      panels: { verb: string; time: string; text: string; image: string; alt: string }[];
      includedTitle: string;
      blocks: { title: string; items: string[]; image: string; alt: string }[];
      addonsTitle: string;
      addonFormat: Record<AddonKey, string>;
      letterTitle: string;
      letter: string[];
      letterSign: string;
      placesTitle: string;
      districts: Record<RegionKey, string>;
      cityImages: Record<RegionKey, { src: string; alt: string }>;
      cityMore: string;
      faqFacts: string[];
      plannerTitle: string;
      plannerText: string;
      plannerFields: { checkout: string; checkin: string; beds: string; bathrooms: string };
      plannerWindow: string;
      plannerHours: string;
      plannerSteps: string[];
      plannerNote: string;
      plannerSubmit: string;
      plannerDates: string;
      backToTop: string;
    };
    ticket: { status: string; label: string };
    story: {
      title: string;
      intro: string;
      note: string;
      steps: { time: string; title: string; text: string; image: string; alt: string }[];
    };
    core: { title: string; intro: string; items: string[]; note: string; variants: string };
    addons: { title: string; intro: string; tags: Record<AddonKey, string>; collageAlt: [string, string] };
    hostStatement: string;
    hostImageAlt: string;
    regionImageAlt: string;
    heroImageAlt: string;
    imageCredit: string;
    process: { title: string; steps: { title: string; text: string }[] };
    host: { title: string; paragraphs: string[]; points: string[] };
    region: { title: string; text: string; more: string };
    faq: { title: string; items: Faq[] };
    final: { title: string; text: string };
  };
  addons: Record<AddonKey, { title: string; text: string }>;
  services: {
    meta: PageMeta;
    h1: string;
    intro: string;
    coreTitle: string;
    hostProvides: { title: string; items: string[] };
    notIncluded: { title: string; items: string[] };
    addonsTitle: string;
    addonsIntro: string;
  };
  about: {
    meta: PageMeta;
    h1: string;
    intro: string;
    storyTitle: string;
    story: string[];
    principlesTitle: string;
    principles: { title: string; text: string }[];
    operatorTitle: string;
    operator: string;
  };
  quote: {
    meta: PageMeta;
    h1: string;
    intro: string;
    asideTitle: string;
    aside: string[];
    noPrice: string;
  };
  form: {
    required: string;
    optional: string;
    groups: { property: string; services: string; contact: string };
    fields: {
      location: string;
      locationHint: string;
      propertyCount: string;
      size: string;
      sizeHint: string;
      beds: string;
      bathrooms: string;
      turnovers: string;
      address: string;
      addressHint: string;
      serviceTurnover: string;
      serviceSpecial: string;
      addonsLegend: string;
      dates: string;
      datesHint: string;
      notes: string;
      name: string;
      email: string;
      phone: string;
      privacy: string;
      privacyLink: string;
      honeypot: string;
    };
    servicesLegend: string;
    submit: string;
    sending: string;
    errorSummary: string;
    errors: Record<string, string>;
    success: { title: string; text: string; again: string };
    failure: { title: string; text: string; fallback: string };
  };
  regions: Record<RegionKey, RegionContent>;
  regionShared: { servicesTitle: string; faqTitle: string; trademark: string };
  legal: {
    privacy: { meta: PageMeta; h1: string; notice: string; topics: string[] };
    imprint: { meta: PageMeta; h1: string; notice: string; topics: string[] };
    placeholder: string;
  };
  footer: {
    navTitle: string;
    regionsTitle: string;
    legalTitle: string;
    privacy: string;
    imprint: string;
    independence: string;
  };
  notFound: { title: string; text: string; home: string };
}
