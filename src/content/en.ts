import type { Content } from "./types";

export const en: Content = {
  locale: { htmlLang: "en", ogLocale: "en_GB", switchLabel: "DE", switchName: "Deutsch" },
  brand: {
    tagline: "Cleaning and guest services for holiday apartments",
    byOperator: "A service by Johnson Services.",
    experience: "Over 10 years of first-hand hosting experience",
  },
  nav: {
    skip: "Skip to content",
    main: "Main navigation",
    menu: "Menu",
    close: "Close menu",
    services: "Services",
    about: "About us",
    regions: "Region",
    quote: "Request a quote",
  },
  cta: { primary: "Request a free quote", services: "View services" },
  home: {
    meta: {
      title: "GastKlar Rhein-Neckar – Cleaning and guest services for holiday apartments",
      description:
        "Turnover cleaning for holiday apartments in Mannheim, Heidelberg, Ludwigshafen and the surrounding area: cleaning, freshly made beds and restocked supplies. Designed by hosts, for hosts.",
    },
    h1: "Your holiday apartment. Ready for the next check-in.",
    sub: "Cleaning, freshly made beds and personal guest services in the Rhein-Neckar region. Designed by hosts, for hosts.",
    timeline: {
      label: "A guest turnover with GastKlar",
      checkout: "Check-out",
      checkin: "Check-in",
      note: "Example time window. We agree the exact routine for each property with you.",
      steps: [
        "Air the rooms, strip the beds",
        "Clean the kitchen and bathroom",
        "Surfaces and floors",
        "Make the beds, restock supplies",
        "Visual check against the checklist",
      ],
    },
    v3: {
      heroSentence: "Turnover cleaning and guest services for holiday apartments in Mannheim, Heidelberg and Ludwigshafen. Designed by hosts.",
      panels: [
        { verb: "Clean.", time: "From 11:00", text: "Kitchen, bathroom, surfaces and floors, thoroughly and to your checklist.", image: "/images/kueche.jpg", alt: "Clean kitchen with a refilled coffee jar" },
        { verb: "Make up.", time: "By 15:00", text: "Fresh beds with your linen, towels laid out, everything topped up.", image: "/images/betten-beziehen.jpg", alt: "Hands smoothing a white bed sheet" },
      ],
      includedTitle: "Always included.",
      blocks: [
        { title: "Kitchen and bathroom", items: ["Thorough kitchen clean", "Bathroom, shower and toilet", "Surfaces in every room", "Floors vacuumed and mopped"], image: "/images/bad.jpg", alt: "Clean bathroom with folded towels" },
        { title: "Beds and towels", items: ["Beds stripped", "Remade with your fresh linen", "Towels changed", "Used linen set aside"], image: "/images/abziehen.jpg", alt: "Hands stripping a duvet cover" },
        { title: "Topping up", items: ["Toilet paper", "Soap and washing-up liquid", "Coffee and tea", "All from your own stock, as agreed"], image: "/images/auffuellen.jpg", alt: "Hands placing toilet paper and soap on a shelf" },
        { title: "Check and report", items: ["Visual check against your checklist", "Anything unusual reported straight away", "Completion report with photos on request", "Apartment handed over guest-ready"], image: "/images/schluesseltresor.jpg", alt: "Key safe beside a period building's front door" },
      ],
      addonsTitle: "Additional services",
      addonFormat: { keys: "in person or key safe", guestCommunication: "at agreed times", laundry: "collect, wash, return", repairs: "small defects", renovation: "painting, flooring", hostDashboard: "CRM for your properties", shortNotice: "cover and emergencies", other: "your request" },
      letterTitle: "From one host to another",
      letter: [
        "I have been letting my own properties for more than ten years. I know the moment when one guest has just left and the next will be at the door in four hours.",
        "Those four hours decide whether your guests arrive and feel at home. That is what GastKlar is for: cleaning that works the way I always wanted it to as a host. To your checklist, agreed in advance and honest about what we promise.",
      ],
      letterSign: "Founder of GastKlar Rhein-Neckar",
      placesTitle: "Where we work",
      districts: { mannheim: "Quadrate, Neckarstadt, Lindenhof, Oststadt", heidelberg: "Altstadt, Bergheim, Weststadt, Neuenheim", ludwigshafen: "Mitte, Süd, Friesenheim, Oggersheim" },
      cityImages: { mannheim: { src: "/images/region/2026-07-11-wasserturm-mannheim-friedrichsplatz-z5.jpg", alt: "Water tower on Friedrichsplatz in Mannheim" }, heidelberg: { src: "/images/region/view-of-heidelberg-castle-alte-brucke-and.jpg", alt: "Old Bridge, old town and castle in Heidelberg" }, ludwigshafen: { src: "/images/region/view-konrad-adenauer-bridge-over-the-rhine.jpg", alt: "View across the Rhine towards Ludwigshafen" } },
      cityMore: "More about",
      faqFacts: ["Service area: Mannheim, Heidelberg, Ludwigshafen and surroundings", "Quote: individual and no-obligation", "You provide linen and supplies"],
      plannerTitle: "Your next turnover",
      plannerText: "Set your times. We show you an example schedule and carry the details into your enquiry.",
      plannerFields: { checkout: "Check-out", checkin: "Check-in", beds: "Beds", bathrooms: "Bathrooms" },
      plannerWindow: "Window",
      plannerHours: "hours",
      plannerSteps: ["Handover and stripping beds", "Kitchen and bathroom", "Beds made and supplies topped up", "Checked, guest-ready"],
      plannerNote: "Example schedule. We agree the actual schedule with you.",
      plannerSubmit: "Enquire with these details",
      plannerDates: "Check-out {out}, check-in {in}",
      backToTop: "Back to top",
    },
    ticket: { status: "Guest-ready", label: "Your next turnover" },
    story: {
      title: "Between check-out and check-in",
      intro: "Four hours in which a lived-in flat becomes a home away from home again. This is what a turnover with us looks like.",
      note: "Example schedule. We agree times and order with you for each property.",
      steps: [
        { time: "11:00", title: "Handover after check-out", text: "Windows open, a quick inventory, beds stripped. Anything unusual is noted straight away.", image: "/images/wohnzimmer.jpg", alt: "Bright, tidy living room in a holiday apartment" },
        { time: "11:30", title: "Kitchen", text: "Dishes, worktops, appliances and sink. We top up coffee and tea from your own stock.", image: "/images/kueche.jpg", alt: "Clean kitchen with a refilled coffee jar" },
        { time: "12:30", title: "Bathroom", text: "Shower, toilet, taps and mirror. Fresh towels, soap and toilet paper laid out.", image: "/images/bad.jpg", alt: "Clean bathroom with folded towels" },
        { time: "13:30", title: "Beds freshly made", text: "With the linen you provide, smoothed and finished the way guests know from a hotel.", image: "/images/betten-beziehen.jpg", alt: "Hands smoothing a white bed sheet" },
        { time: "14:30", title: "Checklist inspection", text: "Every point on your property checklist. On request we send a completion report with photos.", image: "/images/waesche.jpg", alt: "Stack of fresh linen in a basket" },
        { time: "15:00", title: "Guest-ready", text: "The apartment is ready for the next check-in.", image: "/images/hero-schlafzimmer.jpg", alt: "Freshly made bed with folded towels" },
      ],
    },
    core: {
      title: "Turnover cleaning is always included",
      intro: "Everything that needs doing between two stays, so your next guests arrive to a place where they feel at home.",
      items: [
        "Thorough cleaning of the kitchen, bathroom and toilets",
        "Surfaces and floors in every room",
        "Strip the beds and remake them with your fresh linen",
        "Change the towels",
        "Restock supplies from your own stock – toilet paper, soap, coffee and more, to the extent agreed in advance",
        "Visual check against your property-specific checklist",
        "On request, a completion report with photos",
      ],
      note: "You provide fresh linen and supplies. If you would like us to wash the linen for you, simply add the laundry service.",
      variants: "We also offer end-of-tenancy and one-off deep cleans. We agree the scope with you beforehand.",
    },
    addons: {
      title: "Additional services as needed",
      intro: "Simply select anything extra you need in the request form, and we will include it in your quote.",
      tags: { keys: "on request", guestCommunication: "by arrangement", laundry: "on request", repairs: "after review", renovation: "after review", hostDashboard: "separate project", shortNotice: "subject to capacity", other: "on request" },
      collageAlt: ["Apartment key with a linen tag on a wooden console", "Freshly folded linen in a basket"],
    },
    process: {
      title: "How to get your quote",
      steps: [
        { title: "Send your request", text: "Use the form to describe your property and the services you need." },
        { title: "Answer any questions", text: "If anything is unclear, we will get in touch by phone or email." },
        { title: "Receive your quote", text: "You receive a written, no-obligation quote for your property." },
        { title: "Agree the routine", text: "Once you accept, we put together the checklist with you and arrange access." },
        { title: "First turnover", text: "We handle the first guest turnover and then fine-tune the details with you." },
      ],
    },
    host: {
      title: "Built on first-hand hosting experience",
      paragraphs: [
        "From our own hosting, we know what matters between check-out and check-in. The founder of GastKlar has been letting his own properties for over ten years.",
        "He knows tight turnover windows, guests with special requests and reviews that hinge on small details. That is exactly what GastKlar is built for.",
      ],
      points: [
        "Property-specific checklists rather than a standard routine",
        "Routines agreed with you in advance",
        "We only commit to what we can reliably deliver",
      ],
    },
    hostStatement: "Over 10 years of first-hand hosting experience.",
    hostImageAlt: "Guest-ready living room with sofa and cushions",
    regionImageAlt: "View from a holiday apartment over the rooftops of an old town by a river",
    heroImageAlt: "Freshly made bed with folded towels in a bright holiday apartment",
    imageCredit: "Apartment images: AI-generated example visualisations. City images:",
    region: {
      title: "Serving the Rhein-Neckar area",
      text: "We look after holiday apartments in Mannheim, Heidelberg, Ludwigshafen and the surrounding area. Travel and scheduling are arranged according to where your property is.",
      more: "More about your city",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "How much does cleaning my holiday apartment cost?",
          a: "Every property is different, so we prepare an individual, no-obligation quote. It depends on the size, the number of beds and bathrooms, how often guests change over, travel and any additional services you choose. We deliberately do not quote flat rates.",
        },
        {
          q: "Do I need to provide bed linen and supplies myself?",
          a: "Yes. You provide fresh linen, towels and supplies; we make the beds and restock. On request, we can collect the linen, wash and dry it, and bring it back.",
        },
        {
          q: "What happens after I send my request?",
          a: "We review your details and get back to you with any questions or a no-obligation quote. We only confirm dates and prices once all the details have been clarified.",
        },
        {
          q: "Can you step in at short notice?",
          a: "Short-notice jobs are possible on request, subject to capacity. We cannot guarantee immediate availability.",
        },
        {
          q: "Will I know when the apartment is ready?",
          a: "On request, we send you a completion report with photos after each visit, while respecting your guests' privacy.",
        },
        {
          q: "Do you work with letting platforms?",
          a: "We are an independent service provider and not affiliated with any letting platform. We clean your property regardless of which channel you let it through.",
        },
      ],
    },
    final: {
      title: "Tell us about your property",
      text: "The form takes just a few minutes to complete. You receive a no-obligation quote – no automatic booking.",
    },
  },
  addons: {
    keys: { title: "Key handover and check-in", text: "Personal handover to your guests, or management of your key safe." },
    guestCommunication: { title: "Guest communication", text: "Answering guest questions at agreed times and to an agreed extent." },
    laundry: { title: "Laundry service", text: "We collect bed linen and towels, wash and dry them, and bring them back." },
    repairs: { title: "Minor repairs and maintenance", text: "Fixing small faults before guests notice them. Scope after case-by-case review." },
    renovation: { title: "Renovation work", text: "Painting, flooring and other work after case-by-case review." },
    hostDashboard: { title: "Custom host dashboard", text: "Your own CRM for properties, bookings and tasks. A separate project with its own quote." },
    shortNotice: { title: "Short-notice jobs", text: "Cover or emergency visits on request, subject to capacity." },
    other: { title: "Other", text: "Simply describe any further requests in the notes field." },
  },
  services: {
    meta: {
      title: "Services: turnover cleaning and guest services",
      description:
        "What GastKlar's turnover cleaning includes and which additional services you can add: key handover, laundry service, guest communication and more.",
    },
    h1: "Services for your holiday apartment",
    intro: "At the heart of what we do is the turnover clean between two stays. Everything else you can add as needed.",
    coreTitle: "Turnover cleaning: always included",
    hostProvides: {
      title: "What you provide",
      items: ["Fresh bed linen and towels", "Supplies such as toilet paper, soap and coffee", "Access to the property, for example via a key safe"],
    },
    notIncluded: {
      title: "Good to know",
      items: [
        "Buying linen and supplies is not part of our standard service.",
        "End-of-tenancy and one-off deep cleans are quoted separately, based on the work involved.",
        "Trade work is only offered after case-by-case review.",
      ],
    },
    addonsTitle: "Additional services",
    addonsIntro: "All additional services are optional and itemised separately in your quote.",
  },
  about: {
    meta: {
      title: "About us: by hosts, for hosts",
      description:
        "GastKlar Rhein-Neckar is a service by Johnson Services. The founder has been letting his own properties for over ten years and knows guest turnovers first-hand.",
    },
    h1: "By hosts, for hosts",
    intro: "GastKlar Rhein-Neckar takes care of guest turnovers in holiday apartments, so you can focus on your guests and your business.",
    storyTitle: "Over 10 years of first-hand hosting experience",
    story: [
      "The founder of GastKlar has been letting his own properties for over ten years. He knows how little time there is between check-out and check-in, and how much a single forgotten detail can affect a review.",
      "GastKlar grew out of that experience: a service that works the way hosts would want it to. Thorough, coordinated and honest about what it promises.",
    ],
    principlesTitle: "How we work",
    principles: [
      { title: "A checklist for each property", text: "Every apartment is different. We note where things are kept and what needs to be done at yours." },
      { title: "Clear arrangements", text: "We agree access, scope and reporting with you before the first visit." },
      { title: "Honest commitments", text: "We do not promise immediate availability, and we do not quote prices before we know your property." },
    ],
    operatorTitle: "A service by Johnson Services",
    operator: "GastKlar Rhein-Neckar is operated by Johnson Services, a service provider based in the Rhein-Neckar region.",
  },
  quote: {
    meta: {
      title: "Request a free quote",
      description:
        "Describe your holiday apartment and the services you need. GastKlar Rhein-Neckar will prepare an individual, no-obligation quote for you.",
    },
    h1: "Request a free quote",
    intro: "The more detail you give us, the better we can tailor your quote. Required fields are marked; everything else is optional.",
    asideTitle: "What happens next",
    aside: [
      "Your enquiry comes straight to us.",
      "We review your details and get back to you with any questions.",
      "You receive a written, no-obligation quote.",
    ],
    noPrice: "Sending this form does not book anything. We only confirm prices and dates in the quote.",
  },
  form: {
    required: "Required",
    optional: "optional",
    groups: { property: "Your property", services: "Services required", contact: "Your contact details" },
    fields: {
      location: "Town or postcode of the property",
      locationHint: "For example 68159 Mannheim",
      propertyCount: "Number of properties",
      size: "Approximate size in m²",
      sizeHint: "For several properties: the average size",
      beds: "Beds or sleeping places",
      bathrooms: "Bathrooms",
      turnovers: "Cleans per month (estimate)",
      address: "Address or location",
      addressHint: "For example district or street",
      serviceTurnover: "Turnover cleaning between two stays",
      serviceSpecial: "End-of-tenancy or one-off deep clean",
      addonsLegend: "Additional services",
      dates: "Preferred start or dates",
      datesHint: "For example from December, usually on Saturdays",
      notes: "Additional notes",
      name: "Name or company",
      email: "Email address",
      phone: "Phone number",
      privacy: "I agree that my details may be processed to handle this request. For details, see the",
      privacyLink: "privacy policy",
      honeypot: "Please leave this field empty",
    },
    servicesLegend: "Cleaning",
    submit: "Request your free, no-obligation quote",
    sending: "Sending …",
    errorSummary: "Please check the following:",
    errors: {
      required: "Please fill in this field.",
      email: "Please enter a valid email address, for example name@example.com.",
      number: "Please enter a suitable whole number.",
      phone: "Please use only digits, spaces and + ( ) / -.",
      tooLong: "This text is too long. Please shorten it.",
      consent: "Please agree to the processing of your details so that we can handle your request.",
      service: "Please select at least one service.",
      rateLimit: "A large number of requests has just been sent. Please try again in a few minutes.",
    },
    success: {
      title: "Thank you for your request.",
      text: "We will review your details and get back to you with any questions or a no-obligation quote.",
      again: "Send another request",
    },
    failure: {
      title: "Your request was not sent.",
      text: "A technical error occurred while sending. Your entries have been kept. Please try again in a few minutes.",
      fallback: "Alternatively, you can reach us by email:",
    },
  },
  regions: {
    mannheim: {
      meta: {
        title: "Airbnb Cleaning Mannheim",
        description:
          "Cleaning for holiday apartments and Airbnb properties in Mannheim: turnover cleaning, freshly made beds, key handover and laundry service. Request a free quote.",
      },
      name: "Mannheim",
      h1: "Cleaning for holiday apartments and Airbnb properties in Mannheim",
      intro:
        "Whether it is an apartment in the Quadrate or a flat in Neckarstadt, we handle the guest turnover at your Mannheim property, so your next guests find a clean, well-prepared home from home.",
      localTitle: "What matters in Mannheim",
      local: [
        "Many guests in Mannheim are travelling for work – for trade fairs, events or business appointments. What they need is a quiet, well-functioning place to stay, with the bathroom and kitchen reliably stocked.",
        "Parking in the city centre is limited and turnovers are often tightly scheduled. That is why we plan travel and key access with you in advance and record everything in the checklist.",
      ],
      areaTitle: "Service area",
      area: "We look after properties across Mannheim – for example in the Quadrate, Neckarstadt, Lindenhof, Oststadt and Schwetzingerstadt – as well as in neighbouring towns. Travel is arranged individually.",
      faqs: [
        {
          q: "Do you also clean several apartments in one building?",
          a: "Yes. Several properties at one location are easy to schedule together. Simply enter the number in the form.",
        },
        {
          q: "Can you handle key handover in Mannheim?",
          a: "Yes, as an additional service: personal handover or management of a key safe, by arrangement.",
        },
      ],
    },
    heidelberg: {
      meta: {
        title: "Holiday Apartment Cleaning Heidelberg",
        description:
          "Holiday apartment cleaning in Heidelberg: turnover cleaning between stays, making beds and restocking supplies. Hosts can request a free quote.",
      },
      name: "Heidelberg",
      h1: "Holiday apartment cleaning in Heidelberg",
      intro:
        "Heidelberg welcomes visitors all year round who come to experience the city. We make sure your holiday apartment is clean, freshly made up and fully prepared between stays.",
      localTitle: "What matters in Heidelberg",
      local: [
        "Many holiday apartments in Heidelberg are in older buildings with stairwells, narrow lanes and limited space to stop. We plan access and the transport of linen with you in advance.",
        "Alongside holidaymakers, Heidelberg also hosts visitors to the university, hospitals and conferences. Longer stays alternate with quick turnovers, and the routine adapts accordingly.",
      ],
      areaTitle: "Service area",
      area: "We look after properties in Heidelberg – for example in the Altstadt, Bergheim, Weststadt, Neuenheim and Handschuhsheim – as well as in the surrounding area. Travel is arranged individually.",
      faqs: [
        {
          q: "Do you also take on properties in Heidelberg's Altstadt?",
          a: "Yes. We clarify access, parking and linen transport before the first visit, so the turnover runs smoothly.",
        },
        {
          q: "Do you also wash the bed linen?",
          a: "As standard, we make the beds with the linen you provide. You can add the laundry service as an option.",
        },
      ],
    },
    ludwigshafen: {
      meta: {
        title: "Airbnb Cleaning Ludwigshafen",
        description:
          "Cleaning for Airbnb properties and holiday apartments in Ludwigshafen am Rhein: turnover cleaning, making beds, optional laundry service. Request a free quote.",
      },
      name: "Ludwigshafen",
      h1: "Cleaning for Airbnb properties and holiday apartments in Ludwigshafen",
      intro:
        "Ludwigshafen sits directly opposite Mannheim on the Rhine and is the first port of call for many business travellers. We handle the guest turnover at your property – thoroughly and as agreed.",
      localTitle: "What matters in Ludwigshafen",
      local: [
        "Because of the region's large employers, guests in Ludwigshafen often stay for several days or weeks. As well as the turnover clean, a mid-stay clean can therefore make sense. Just ask us.",
        "As Ludwigshafen lies between the Palatinate and the Rhein-Neckar area, we schedule visits there together with properties on the Mannheim side. That keeps travel short.",
      ],
      areaTitle: "Service area",
      area: "We look after properties in Ludwigshafen am Rhein – for example in Mitte, Süd, Friesenheim and Oggersheim – as well as in neighbouring towns. Travel is arranged individually.",
      faqs: [
        {
          q: "Do you also offer cleaning during longer stays?",
          a: "Yes. You can request mid-stay cleans in the form under 'Other' or in the notes.",
        },
        {
          q: "Do you look after properties on both sides of the Rhine?",
          a: "Yes. We work in both Ludwigshafen and Mannheim and schedule visits by location.",
        },
      ],
    },
  },
  regionShared: {
    servicesTitle: "What we take care of at every guest turnover",
    faqTitle: "Questions from the region",
    trademark: "Airbnb is a trademark of Airbnb, Inc. GastKlar Rhein-Neckar is an independent service provider and is not affiliated with Airbnb.",
  },
  legal: {
    privacy: {
      meta: { title: "Privacy policy", description: "Privacy policy of GastKlar Rhein-Neckar, a service by Johnson Services: how we handle your enquiry data and your rights." },
      h1: "Privacy policy",
      notice:
        "The privacy policy will be completed and legally reviewed before the site goes live. Until then, this page is a placeholder. The German version is the legally binding one.",
      topics: [
        "Controller (Johnson Services, address, contact details)",
        "Processing of the details submitted via the request form, purpose and legal basis",
        "Sending of emails and data processors",
        "Hosting and server log files",
        "Retention period and deletion",
        "Your rights as a data subject",
      ],
    },
    imprint: {
      meta: { title: "Legal notice (Impressum)", description: "Legal notice (Impressum) and provider details of GastKlar Rhein-Neckar, a service by Johnson Services in the Rhein-Neckar region." },
      h1: "Legal notice (Impressum)",
      notice:
        "The legal notice will be completed with the confirmed details before the site goes live. Until then, this page is a placeholder. The German version is the legally binding one.",
      topics: [
        "Registered business name of Johnson Services and owner",
        "Address for service",
        "Contact (email, phone)",
        "VAT identification number or note on tax status",
        "Where applicable, professional chamber and regulatory information",
      ],
    },
    placeholder: "Placeholder – not yet confirmed",
  },
  footer: {
    navTitle: "Navigation",
    regionsTitle: "Region",
    legalTitle: "Legal",
    privacy: "Privacy",
    imprint: "Legal notice",
    independence: "GastKlar Rhein-Neckar is an independent service provider and is not affiliated with any letting platform.",
  },
  notFound: {
    title: "This page does not exist.",
    text: "The address may have changed. You will find all our services on the home page.",
    home: "Go to the home page",
  },
};
