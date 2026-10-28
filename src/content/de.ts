import type { Content } from "./types";

export const de: Content = {
  locale: { htmlLang: "de", ogLocale: "de_DE", switchLabel: "EN", switchName: "English" },
  brand: {
    tagline: "Reinigung und Gästeservice für Ferienwohnungen",
    byOperator: "Ein Service von Johnson Services.",
    experience: "Über 10 Jahre eigene Host-Erfahrung",
  },
  nav: {
    skip: "Zum Inhalt springen",
    main: "Hauptnavigation",
    menu: "Menü",
    close: "Menü schließen",
    services: "Leistungen",
    about: "Über uns",
    regions: "Region",
    quote: "Angebot anfragen",
  },
  cta: { primary: "Unverbindliches Angebot anfragen", services: "Leistungen ansehen" },
  home: {
    meta: {
      title: "GastKlar Rhein-Neckar – Reinigung und Gästeservice für Ferienwohnungen",
      description:
        "Wechselreinigung für Ferienwohnungen in Mannheim, Heidelberg, Ludwigshafen und Umgebung: Reinigung, frisch bezogene Betten, aufgefülltes Verbrauchsmaterial. Von Gastgebern gedacht.",
    },
    h1: "Ihre Ferienwohnung. Gastbereit für den nächsten Check-in.",
    sub: "Reinigung, frisch bezogene Betten und persönliche Gästeservices in der Rhein-Neckar-Region. Von Gastgebern gedacht.",
    timeline: {
      label: "Ein Gästewechsel bei GastKlar",
      checkout: "Check-out",
      checkin: "Check-in",
      note: "Beispielhaftes Zeitfenster. Den Ablauf stimmen wir je Unterkunft mit Ihnen ab.",
      steps: [
        "Lüften, Betten abziehen",
        "Küche und Bad reinigen",
        "Oberflächen und Böden",
        "Betten beziehen, Material auffüllen",
        "Sichtprüfung nach Checkliste",
      ],
    },
    v3: {
      heroSentence: "Wechselreinigung und Gästeservice für Ferienwohnungen in Mannheim, Heidelberg und Ludwigshafen. Von Gastgebern gedacht.",
      panels: [
        { verb: "Reinigen.", time: "Ab 11:00", text: "Küche, Bad, Oberflächen und Böden, gründlich und nach Ihrer Checkliste.", image: "/images/kueche.jpg", alt: "Saubere Küche mit aufgefülltem Kaffeeglas" },
        { verb: "Beziehen.", time: "Bis 15:00", text: "Frische Betten mit Ihrer Wäsche, Handtücher bereit, alles aufgefüllt.", image: "/images/betten-beziehen.jpg", alt: "Hände ziehen ein weißes Bettlaken glatt" },
      ],
      includedTitle: "Immer dabei.",
      blocks: [
        { title: "Küche und Bad", items: ["Küche gründlich reinigen", "Bad, Dusche und WC reinigen", "Oberflächen in allen Räumen", "Böden saugen und wischen"], image: "/images/bad.jpg", alt: "Sauberes Bad mit gefalteten Handtüchern" },
        { title: "Betten und Handtücher", items: ["Betten abziehen", "Mit Ihrer frischen Wäsche neu beziehen", "Handtücher wechseln", "Gebrauchte Wäsche bereitlegen"], image: "/images/abziehen.jpg", alt: "Hände ziehen einen Bettbezug ab" },
        { title: "Auffüllen", items: ["Toilettenpapier", "Seife und Spülmittel", "Kaffee und Tee", "Alles aus Ihrem Bestand, im abgestimmten Umfang"], image: "/images/auffuellen.jpg", alt: "Hände stellen Toilettenpapier und Seife ins Regal" },
        { title: "Prüfen und melden", items: ["Sichtprüfung nach Ihrer Checkliste", "Auffälligkeiten sofort melden", "Fertigmeldung mit Fotos auf Wunsch", "Wohnung gastbereit übergeben"], image: "/images/schluesseltresor.jpg", alt: "Schlüsseltresor neben einer Altbau-Haustür" },
      ],
      addonsTitle: "Zusatzleistungen",
      addonFormat: { keys: "persönlich oder per Tresor", guestCommunication: "zu vereinbarten Zeiten", laundry: "abholen, waschen, bringen", repairs: "kleine Mängel", renovation: "Anstrich, Boden", hostDashboard: "CRM für Ihre Objekte", shortNotice: "Ersatz und Notfall", other: "Ihr Wunsch" },
      letterTitle: "Von Gastgeber zu Gastgeber",
      letter: [
        "Seit über zehn Jahren vermiete ich selbst Unterkünfte. Ich kenne den Moment, in dem der eine Gast gerade gegangen ist und der nächste in vier Stunden vor der Tür steht.",
        "In diesen vier Stunden entscheidet sich, ob Ihre Gäste ankommen und sich wohlfühlen. Dafür gibt es GastKlar: eine Reinigung, die so arbeitet, wie ich es mir als Gastgeber immer gewünscht habe. Nach Ihrer Checkliste, abgestimmt und ehrlich in dem, was wir zusagen.",
      ],
      letterSign: "Gründer von GastKlar Rhein-Neckar",
      placesTitle: "Wo wir arbeiten",
      districts: { mannheim: "Quadrate, Neckarstadt, Lindenhof, Oststadt", heidelberg: "Altstadt, Bergheim, Weststadt, Neuenheim", ludwigshafen: "Mitte, Süd, Friesenheim, Oggersheim" },
      cityImages: { mannheim: { src: "/images/region/2026-07-11-wasserturm-mannheim-friedrichsplatz-z5.jpg", alt: "Wasserturm am Friedrichsplatz in Mannheim" }, heidelberg: { src: "/images/region/view-of-heidelberg-castle-alte-brucke-and.jpg", alt: "Alte Brücke, Altstadt und Schloss in Heidelberg" }, ludwigshafen: { src: "/images/region/view-konrad-adenauer-bridge-over-the-rhine.jpg", alt: "Blick über den Rhein auf Ludwigshafen" } },
      cityMore: "Mehr zu",
      faqFacts: ["Einsatzgebiet: Mannheim, Heidelberg, Ludwigshafen und Umgebung", "Angebot: individuell und unverbindlich", "Wäsche und Verbrauchsmaterial stellen Sie bereit"],
      plannerTitle: "Ihr nächster Wechsel",
      plannerText: "Stellen Sie Ihre Zeiten ein. Wir zeigen Ihnen einen Beispielablauf und übernehmen die Angaben in Ihre Anfrage.",
      plannerFields: { checkout: "Check-out", checkin: "Check-in", beds: "Betten", bathrooms: "Bäder" },
      plannerWindow: "Zeitfenster",
      plannerHours: "Stunden",
      plannerSteps: ["Übernahme und Abziehen", "Küche und Bad", "Betten beziehen und auffüllen", "Prüfen, gastbereit"],
      plannerNote: "Beispielablauf. Den tatsächlichen Ablauf stimmen wir mit Ihnen ab.",
      plannerSubmit: "Mit diesen Angaben anfragen",
      plannerDates: "Check-out {out}, Check-in {in}",
      backToTop: "Nach oben",
    },
    ticket: { status: "Gastbereit", label: "Ihr nächster Gästewechsel" },
    story: {
      title: "Zwischen Check-out und Check-in",
      intro: "Vier Stunden, in denen aus einer bewohnten Wohnung wieder ein Zuhause auf Zeit wird. So sieht ein Wechsel bei uns aus.",
      note: "Beispielhafter Ablauf. Zeiten und Reihenfolge stimmen wir je Unterkunft mit Ihnen ab.",
      steps: [
        { time: "11:00", title: "Übernahme nach dem Check-out", text: "Fenster auf, Bestandsaufnahme, Betten abziehen. Auffälligkeiten halten wir sofort fest.", image: "/images/wohnzimmer.jpg", alt: "Helles, aufgeräumtes Wohnzimmer einer Ferienwohnung" },
        { time: "11:30", title: "Küche", text: "Geschirr, Arbeitsflächen, Geräte und Spüle. Kaffee und Tee füllen wir aus Ihrem Bestand auf.", image: "/images/kueche.jpg", alt: "Saubere Küche mit aufgefülltem Kaffeeglas" },
        { time: "12:30", title: "Bad und Sanitär", text: "Dusche, WC, Armaturen und Spiegel. Frische Handtücher, Seife und Toilettenpapier liegen bereit.", image: "/images/bad.jpg", alt: "Sauberes Bad mit gefalteten Handtüchern" },
        { time: "13:30", title: "Betten frisch beziehen", text: "Mit Ihrer bereitgestellten Wäsche, glatt gezogen und so, wie Gäste es aus dem Hotel kennen.", image: "/images/betten-beziehen.jpg", alt: "Hände ziehen ein weißes Bettlaken glatt" },
        { time: "14:30", title: "Sichtprüfung nach Checkliste", text: "Jeder Punkt Ihrer objektbezogenen Checkliste. Auf Wunsch schicken wir eine Fertigmeldung mit Fotos.", image: "/images/waesche.jpg", alt: "Gestapelte frische Bettwäsche im Korb" },
        { time: "15:00", title: "Gastbereit", text: "Die Wohnung ist bereit für den nächsten Check-in.", image: "/images/hero-schlafzimmer.jpg", alt: "Frisch bezogenes Bett mit gefalteten Handtüchern" },
      ],
    },
    core: {
      title: "Die Wechselreinigung ist immer enthalten",
      intro: "Alles, was zwischen zwei Aufenthalten erledigt sein muss, damit die nächsten Gäste ankommen und sich wohlfühlen.",
      items: [
        "Küche, Bad und Sanitärbereiche gründlich reinigen",
        "Oberflächen und Böden in allen Räumen",
        "Betten abziehen und mit Ihrer frischen Wäsche neu beziehen",
        "Handtücher wechseln",
        "Verbrauchsmaterial aus Ihrem Bestand auffüllen: Toilettenpapier, Seife, Kaffee und mehr, im vorab abgestimmten Umfang",
        "Sichtprüfung nach Ihrer objektbezogenen Checkliste",
        "Auf Wunsch Fertigmeldung mit Fotos",
      ],
      note: "Frische Wäsche und Verbrauchsmaterial stellen Sie bereit. Wenn wir die Wäsche für Sie waschen sollen, buchen Sie den Wäscheservice dazu.",
      variants: "End- und Sonderreinigungen bieten wir ebenfalls an. Den Aufwand klären wir vorab mit Ihnen.",
    },
    addons: {
      title: "Zusatzleistungen nach Bedarf",
      intro: "Wählen Sie im Anfrageformular einfach aus, was Sie zusätzlich brauchen. Wir berücksichtigen es im Angebot.",
      tags: { keys: "auf Anfrage", guestCommunication: "nach Absprache", laundry: "auf Anfrage", repairs: "nach Prüfung", renovation: "nach Prüfung", hostDashboard: "eigenes Projekt", shortNotice: "nach Kapazität", other: "auf Anfrage" },
      collageAlt: ["Wohnungsschlüssel mit Leinenanhänger auf einer Holzkonsole", "Frisch gefaltete Bettwäsche im Korb"],
    },
    process: {
      title: "So kommen Sie zu Ihrem Angebot",
      steps: [
        { title: "Anfrage senden", text: "Sie beschreiben Ihre Unterkunft und die gewünschten Leistungen im Formular." },
        { title: "Rückfragen klären", text: "Wir melden uns bei offenen Punkten, telefonisch oder per E-Mail." },
        { title: "Angebot erhalten", text: "Sie bekommen ein schriftliches, unverbindliches Angebot für Ihre Unterkunft." },
        { title: "Abläufe festlegen", text: "Nach Ihrer Zusage erstellen wir gemeinsam die Checkliste und regeln den Zugang." },
        { title: "Erster Einsatz", text: "Wir übernehmen den ersten Gästewechsel und stimmen danach Details mit Ihnen nach." },
      ],
    },
    host: {
      title: "Aus eigener Host-Erfahrung",
      paragraphs: [
        "Aus eigener Host-Erfahrung wissen wir, worauf es zwischen Check-out und Check-in ankommt. Der Gründer von GastKlar vermietet seit über zehn Jahren eigene Unterkünfte.",
        "Er kennt knappe Wechselzeiten, Gäste mit Sonderwünschen und Bewertungen, die an Kleinigkeiten hängen. Genau dafür ist GastKlar gemacht.",
      ],
      points: [
        "Objektbezogene Checklisten statt Standardprogramm",
        "Abläufe vorab mit Ihnen abgestimmt",
        "Wir sagen nur zu, was wir verlässlich leisten können",
      ],
    },
    hostStatement: "Über 10 Jahre eigene Host-Erfahrung.",
    hostImageAlt: "Gastbereites Wohnzimmer mit Sofa und Kissen",
    regionImageAlt: "Blick aus einer Ferienwohnung über die Dächer einer Altstadt am Fluss",
    heroImageAlt: "Frisch bezogenes Bett mit gefalteten Handtüchern in einer hellen Ferienwohnung",
    imageCredit: "Wohnungsbilder: KI-generierte Beispielvisualisierungen. Stadtbilder:",
    region: {
      title: "Im Rhein-Neckar-Gebiet für Sie unterwegs",
      text: "Wir betreuen Ferienwohnungen in Mannheim, Heidelberg, Ludwigshafen und Umgebung. Anfahrt und Einsatzplanung stimmen wir je nach Lage Ihrer Unterkunft ab.",
      more: "Mehr zu Ihrer Stadt",
    },
    faq: {
      title: "Häufige Fragen",
      items: [
        {
          q: "Was kostet die Reinigung meiner Ferienwohnung?",
          a: "Jede Unterkunft ist anders. Deshalb erstellen wir ein individuelles, unverbindliches Angebot. Es richtet sich nach Größe, Betten und Bädern, Häufigkeit der Wechsel, Anfahrt und den gewünschten Zusatzleistungen. Pauschalpreise nennen wir bewusst nicht.",
        },
        {
          q: "Muss ich Bettwäsche und Verbrauchsmaterial selbst stellen?",
          a: "Ja. Sie stellen frische Wäsche, Handtücher und Verbrauchsmaterial bereit, wir beziehen die Betten und füllen auf. Auf Wunsch holen wir die Wäsche ab, waschen, trocknen und bringen sie zurück.",
        },
        {
          q: "Wie geht es nach meiner Anfrage weiter?",
          a: "Wir prüfen Ihre Angaben und melden uns mit Rückfragen oder einem unverbindlichen Angebot. Termine und Preise sagen wir erst zu, wenn alle Details geklärt sind.",
        },
        {
          q: "Können Sie auch kurzfristig einspringen?",
          a: "Kurzfristige Einsätze sind auf Anfrage möglich, sofern wir freie Kapazität haben. Eine Sofortverfügbarkeit garantieren wir nicht.",
        },
        {
          q: "Erfahre ich, wann die Wohnung fertig ist?",
          a: "Auf Wunsch senden wir Ihnen nach jedem Einsatz eine Fertigmeldung mit Fotos. Dabei achten wir auf die Privatsphäre Ihrer Gäste.",
        },
        {
          q: "Arbeiten Sie mit Vermietungsplattformen zusammen?",
          a: "Wir sind ein unabhängiger Dienstleister und mit keiner Vermietungsplattform verbunden. Wir reinigen Ihre Unterkunft, egal über welchen Kanal Sie vermieten.",
        },
      ],
    },
    final: {
      title: "Erzählen Sie uns von Ihrer Unterkunft",
      text: "Das Formular ist in wenigen Minuten ausgefüllt. Sie erhalten ein unverbindliches Angebot, keine automatische Buchung.",
    },
  },
  addons: {
    keys: { title: "Schlüsselübergabe und Check-in", text: "Persönliche Übergabe an Ihre Gäste oder Betreuung Ihres Schlüsseltresors." },
    guestCommunication: { title: "Gästekommunikation", text: "Antworten auf Gästefragen in vorab vereinbarten Zeiten und im festgelegten Umfang." },
    laundry: { title: "Wäscheservice", text: "Wir holen Bettwäsche und Handtücher ab, waschen, trocknen und bringen sie zurück." },
    repairs: { title: "Kleinreparaturen und Instandhaltung", text: "Kleine Mängel beheben, bevor Gäste sie bemerken. Umfang nach Prüfung im Einzelfall." },
    renovation: { title: "Renovierungsarbeiten", text: "Anstrich, Bodenarbeiten und weitere Arbeiten nach Prüfung im Einzelfall." },
    hostDashboard: { title: "Individuelles Host-Dashboard", text: "Ein eigenes CRM für Objekte, Buchungen und Aufgaben. Als eigenes Projekt mit separatem Angebot." },
    shortNotice: { title: "Kurzfristige Einsätze", text: "Ersatz- oder Notfalleinsatz auf Anfrage, wenn Kapazität frei ist." },
    other: { title: "Sonstiges", text: "Weitere Wünsche beschreiben Sie einfach im Hinweisfeld." },
  },
  services: {
    meta: {
      title: "Leistungen: Wechselreinigung und Gästeservice",
      description:
        "Was die Wechselreinigung von GastKlar umfasst und welche Zusatzleistungen Sie dazu wählen können: Schlüsselübergabe, Wäscheservice, Gästekommunikation und mehr.",
    },
    h1: "Leistungen für Ihre Ferienwohnung",
    intro: "Im Mittelpunkt steht die Wechselreinigung zwischen zwei Aufenthalten. Alles Weitere wählen Sie nach Bedarf dazu.",
    coreTitle: "Wechselreinigung: immer enthalten",
    hostProvides: {
      title: "Das stellen Sie bereit",
      items: ["Frische Bettwäsche und Handtücher", "Verbrauchsmaterial wie Toilettenpapier, Seife, Kaffee", "Zugang zur Unterkunft, etwa über Schlüsseltresor"],
    },
    notIncluded: {
      title: "Gut zu wissen",
      items: [
        "Den Einkauf von Wäsche und Verbrauchsmaterial übernehmen wir nicht standardmäßig.",
        "End- und Sonderreinigungen kalkulieren wir separat nach Aufwand.",
        "Handwerkliche Leistungen bieten wir nur nach Prüfung im Einzelfall an.",
      ],
    },
    addonsTitle: "Zusatzleistungen",
    addonsIntro: "Alle Zusatzleistungen sind optional und werden im Angebot einzeln berücksichtigt.",
  },
  about: {
    meta: {
      title: "Über uns: von Gastgebern für Gastgeber",
      description:
        "GastKlar Rhein-Neckar ist ein Service von Johnson Services. Der Gründer vermietet seit über zehn Jahren eigene Unterkünfte und kennt den Gästewechsel aus erster Hand.",
    },
    h1: "Von Gastgebern für Gastgeber",
    intro: "GastKlar Rhein-Neckar übernimmt den Gästewechsel in Ferienwohnungen, damit Sie sich auf Ihre Gäste und Ihr Geschäft konzentrieren können.",
    storyTitle: "Über 10 Jahre eigene Host-Erfahrung",
    story: [
      "Der Gründer von GastKlar vermietet seit über zehn Jahren eigene Unterkünfte. Er weiß, wie wenig Zeit zwischen Check-out und Check-in bleibt und wie sehr eine einzige vergessene Kleinigkeit die Bewertung beeinflussen kann.",
      "Aus dieser Erfahrung ist GastKlar entstanden: ein Service, der so arbeitet, wie Gastgeber es sich selbst wünschen. Gründlich, abgestimmt und ehrlich in dem, was zugesagt wird.",
    ],
    principlesTitle: "Wie wir arbeiten",
    principles: [
      { title: "Checkliste je Unterkunft", text: "Jede Wohnung ist anders. Wir halten fest, was bei Ihnen wo steht und was erledigt sein muss." },
      { title: "Klare Absprachen", text: "Zugang, Umfang und Rückmeldung legen wir vor dem ersten Einsatz gemeinsam fest." },
      { title: "Ehrliche Zusagen", text: "Wir versprechen keine Sofortverfügbarkeit und nennen keine Preise, bevor wir Ihre Unterkunft kennen." },
    ],
    operatorTitle: "Ein Service von Johnson Services",
    operator: "GastKlar Rhein-Neckar wird von Johnson Services betrieben, einem Dienstleister aus der Rhein-Neckar-Region.",
  },
  quote: {
    meta: {
      title: "Unverbindliches Angebot anfragen",
      description:
        "Beschreiben Sie Ihre Ferienwohnung und die gewünschten Leistungen. GastKlar Rhein-Neckar erstellt Ihnen ein individuelles, unverbindliches Angebot.",
    },
    h1: "Unverbindliches Angebot anfragen",
    intro: "Je genauer Ihre Angaben, desto passender unser Angebot. Pflichtfelder sind gekennzeichnet, alles andere ist freiwillig.",
    asideTitle: "Was danach passiert",
    aside: [
      "Ihre Anfrage geht direkt bei uns ein.",
      "Wir prüfen Ihre Angaben und melden uns mit Rückfragen.",
      "Sie bekommen ein schriftliches, unverbindliches Angebot.",
    ],
    noPrice: "Mit dem Absenden buchen Sie nichts. Preise und Termine sagen wir erst im Angebot zu.",
  },
  form: {
    required: "Pflicht",
    optional: "optional",
    groups: { property: "Ihre Unterkunft", services: "Gewünschte Leistungen", contact: "Ihre Kontaktdaten" },
    fields: {
      location: "Ort oder PLZ der Unterkunft",
      locationHint: "Zum Beispiel 68159 Mannheim",
      propertyCount: "Anzahl der Unterkünfte",
      size: "Ungefähre Größe in m²",
      sizeHint: "Bei mehreren Unterkünften: die durchschnittliche Größe",
      beds: "Betten bzw. Schlafplätze",
      bathrooms: "Badezimmer",
      turnovers: "Reinigungen pro Monat (geschätzt)",
      address: "Adresse oder Lagehinweis",
      addressHint: "Zum Beispiel Stadtteil oder Straße",
      serviceTurnover: "Wechselreinigung zwischen zwei Aufenthalten",
      serviceSpecial: "End- oder Sonderreinigung",
      addonsLegend: "Zusatzleistungen",
      dates: "Gewünschter Start oder bevorzugte Termine",
      datesHint: "Zum Beispiel ab Dezember, meist samstags",
      notes: "Besondere Hinweise",
      name: "Name oder Firma",
      email: "E-Mail-Adresse",
      phone: "Telefonnummer",
      privacy: "Ich stimme zu, dass meine Angaben zur Bearbeitung dieser Anfrage verarbeitet werden. Details in der",
      privacyLink: "Datenschutzerklärung",
      honeypot: "Bitte dieses Feld leer lassen",
    },
    servicesLegend: "Reinigung",
    submit: "Unverbindliches Angebot anfordern",
    sending: "Wird gesendet …",
    errorSummary: "Bitte prüfen Sie die folgenden Angaben:",
    errors: {
      required: "Bitte füllen Sie dieses Feld aus.",
      email: "Bitte geben Sie eine gültige E-Mail-Adresse ein, zum Beispiel name@beispiel.de.",
      number: "Bitte geben Sie eine passende ganze Zahl ein.",
      phone: "Bitte geben Sie nur Ziffern, Leerzeichen und + ( ) / - ein.",
      tooLong: "Dieser Text ist zu lang. Bitte kürzen Sie ihn.",
      consent: "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu, damit wir Ihre Anfrage bearbeiten können.",
      service: "Bitte wählen Sie mindestens eine Leistung aus.",
      rateLimit: "Es wurden gerade sehr viele Anfragen gesendet. Bitte versuchen Sie es in einigen Minuten erneut.",
    },
    success: {
      title: "Vielen Dank für Ihre Anfrage.",
      text: "Wir prüfen die Angaben und melden uns mit Rückfragen oder einem unverbindlichen Angebot.",
      again: "Weitere Anfrage senden",
    },
    failure: {
      title: "Ihre Anfrage wurde nicht übermittelt.",
      text: "Beim Senden ist ein technischer Fehler aufgetreten. Ihre Eingaben sind noch da. Bitte versuchen Sie es in einigen Minuten erneut.",
      fallback: "Alternativ erreichen Sie uns per E-Mail:",
    },
  },
  regions: {
    mannheim: {
      meta: {
        title: "Airbnb-Reinigung Mannheim",
        description:
          "Reinigung für Ferienwohnungen und Airbnb-Unterkünfte in Mannheim: Wechselreinigung, frisch bezogene Betten, Schlüsselübergabe und Wäscheservice. Unverbindliches Angebot anfragen.",
      },
      name: "Mannheim",
      h1: "Reinigung für Ferienwohnungen und Airbnb-Unterkünfte in Mannheim",
      intro:
        "Ob Apartment in den Quadraten oder Wohnung in der Neckarstadt: Wir übernehmen den Gästewechsel in Ihrer Mannheimer Unterkunft, damit die nächsten Gäste ein sauberes, vorbereitetes Zuhause auf Zeit vorfinden.",
      localTitle: "Worauf es in Mannheim ankommt",
      local: [
        "In Mannheim übernachten viele Gäste beruflich, etwa zu Messen, Veranstaltungen oder Terminen in Unternehmen. Für sie zählt eine ruhige, funktionierende Unterkunft mit verlässlich aufgefülltem Bad und Küche.",
        "In der Innenstadt sind Parkplätze knapp und Wechsel oft eng getaktet. Deshalb planen wir Anfahrt und Schlüsselzugang vorab mit Ihnen und halten alles in der Checkliste fest.",
      ],
      areaTitle: "Einsatzgebiet",
      area: "Wir betreuen Unterkünfte im Mannheimer Stadtgebiet, zum Beispiel in den Quadraten, Neckarstadt, Lindenhof, Oststadt und Schwetzingerstadt, sowie in angrenzenden Orten. Die Anfahrt stimmen wir individuell ab.",
      faqs: [
        {
          q: "Reinigen Sie auch mehrere Apartments in einem Haus?",
          a: "Ja. Mehrere Unterkünfte an einem Standort lassen sich gut gemeinsam planen. Geben Sie die Anzahl einfach im Formular an.",
        },
        {
          q: "Können Sie die Schlüsselübergabe in Mannheim übernehmen?",
          a: "Ja, als Zusatzleistung: persönliche Übergabe oder Betreuung eines Schlüsseltresors, nach Absprache.",
        },
      ],
    },
    heidelberg: {
      meta: {
        title: "Ferienwohnungsreinigung Heidelberg",
        description:
          "Ferienwohnungsreinigung in Heidelberg: Wechselreinigung zwischen zwei Aufenthalten, Betten beziehen, Verbrauchsmaterial auffüllen. Unverbindliches Angebot für Gastgeber anfragen.",
      },
      name: "Heidelberg",
      h1: "Ferienwohnungsreinigung in Heidelberg",
      intro:
        "Heidelberg empfängt das ganze Jahr Gäste, die die Stadt erleben wollen. Wir sorgen dafür, dass Ihre Ferienwohnung zwischen zwei Aufenthalten sauber, frisch bezogen und vollständig vorbereitet ist.",
      localTitle: "Worauf es in Heidelberg ankommt",
      local: [
        "Viele Heidelberger Ferienwohnungen liegen in Altbauten mit Treppenhäusern, engen Gassen und begrenzten Haltemöglichkeiten. Wir planen den Zugang und den Transport von Wäsche vorab mit Ihnen.",
        "Neben Urlaubsgästen übernachten in Heidelberg auch Besucher von Universität, Kliniken und Kongressen. Längere Aufenthalte und kurze Wechsel wechseln sich ab, der Ablauf passt sich daran an.",
      ],
      areaTitle: "Einsatzgebiet",
      area: "Wir betreuen Unterkünfte in Heidelberg, zum Beispiel in der Altstadt, Bergheim, Weststadt, Neuenheim und Handschuhsheim, sowie im Umland. Die Anfahrt stimmen wir individuell ab.",
      faqs: [
        {
          q: "Übernehmen Sie auch Unterkünfte in der Heidelberger Altstadt?",
          a: "Ja. Zugang, Parken und Wäschetransport klären wir vor dem ersten Einsatz, damit der Wechsel reibungslos läuft.",
        },
        {
          q: "Waschen Sie die Bettwäsche auch?",
          a: "Standardmäßig beziehen wir die Betten mit Ihrer bereitgestellten Wäsche. Den Wäscheservice können Sie zusätzlich wählen.",
        },
      ],
    },
    ludwigshafen: {
      meta: {
        title: "Airbnb-Reinigung Ludwigshafen",
        description:
          "Reinigung für Airbnb-Unterkünfte und Ferienwohnungen in Ludwigshafen am Rhein: Wechselreinigung, Betten beziehen, Wäscheservice optional. Unverbindliches Angebot anfragen.",
      },
      name: "Ludwigshafen",
      h1: "Reinigung für Airbnb-Unterkünfte und Ferienwohnungen in Ludwigshafen",
      intro:
        "Ludwigshafen liegt direkt gegenüber von Mannheim am Rhein und ist für viele Geschäftsreisende der erste Anlaufpunkt. Wir übernehmen den Gästewechsel in Ihrer Unterkunft, gründlich und abgestimmt.",
      localTitle: "Worauf es in Ludwigshafen ankommt",
      local: [
        "Durch die großen Arbeitgeber der Region bleiben Gäste in Ludwigshafen häufig mehrere Tage oder Wochen. Neben dem Wechsel kann deshalb auch eine Zwischenreinigung sinnvoll sein. Sprechen Sie uns darauf an.",
        "Mit der Lage zwischen Pfalz und Rhein-Neckar planen wir Einsätze in Ludwigshafen gemeinsam mit Unterkünften auf der Mannheimer Seite. So bleiben die Wege kurz.",
      ],
      areaTitle: "Einsatzgebiet",
      area: "Wir betreuen Unterkünfte in Ludwigshafen am Rhein, zum Beispiel in Mitte, Süd, Friesenheim und Oggersheim, sowie in angrenzenden Orten. Die Anfahrt stimmen wir individuell ab.",
      faqs: [
        {
          q: "Bieten Sie auch Reinigungen während längerer Aufenthalte an?",
          a: "Ja, Zwischenreinigungen können Sie im Formular unter „Sonstiges“ oder in den Hinweisen anfragen.",
        },
        {
          q: "Betreuen Sie Unterkünfte auf beiden Rheinseiten?",
          a: "Ja. Wir sind in Ludwigshafen und Mannheim unterwegs und planen Einsätze nach Lage.",
        },
      ],
    },
  },
  regionShared: {
    servicesTitle: "Das übernehmen wir bei jedem Gästewechsel",
    faqTitle: "Fragen aus der Region",
    trademark: "Airbnb ist eine Marke der Airbnb, Inc. GastKlar Rhein-Neckar ist ein unabhängiger Dienstleister und steht in keiner Verbindung zu Airbnb.",
  },
  legal: {
    privacy: {
      meta: { title: "Datenschutzerklärung", description: "Datenschutzerklärung von GastKlar Rhein-Neckar, einem Service von Johnson Services: Umgang mit Ihren Anfragedaten und Ihre Rechte." },
      h1: "Datenschutzerklärung",
      notice:
        "Die Datenschutzerklärung wird vor dem Livegang ergänzt und rechtlich geprüft. Diese Seite ist bis dahin ein Platzhalter.",
      topics: [
        "Verantwortlicher (Johnson Services, Anschrift, Kontakt)",
        "Verarbeitung der Angaben aus dem Anfrageformular, Zweck und Rechtsgrundlage",
        "E-Mail-Versand und Auftragsverarbeiter",
        "Hosting und Server-Logfiles",
        "Speicherdauer und Löschung",
        "Ihre Rechte als betroffene Person",
      ],
    },
    imprint: {
      meta: { title: "Impressum", description: "Impressum und Anbieterkennzeichnung von GastKlar Rhein-Neckar, einem Service von Johnson Services in der Rhein-Neckar-Region." },
      h1: "Impressum",
      notice: "Das Impressum wird vor dem Livegang mit den bestätigten Angaben ergänzt. Diese Seite ist bis dahin ein Platzhalter.",
      topics: [
        "Eingetragene Firmierung von Johnson Services und Inhaber",
        "Ladungsfähige Anschrift",
        "Kontakt (E-Mail, Telefon)",
        "Umsatzsteuer-Identifikationsnummer bzw. Hinweis zum Steuerstatus",
        "Ggf. Kammer und berufsrechtliche Angaben",
      ],
    },
    placeholder: "Platzhalter – noch nicht bestätigt",
  },
  footer: {
    navTitle: "Navigation",
    regionsTitle: "Region",
    legalTitle: "Rechtliches",
    privacy: "Datenschutz",
    imprint: "Impressum",
    independence: "GastKlar Rhein-Neckar ist ein unabhängiger Dienstleister und nicht mit Vermietungsplattformen verbunden.",
  },
  notFound: {
    title: "Diese Seite gibt es nicht.",
    text: "Vielleicht hat sich die Adresse geändert. Auf der Startseite finden Sie alle Leistungen.",
    home: "Zur Startseite",
  },
};
