/**
 * Zentrale Site-Konfiguration. Unbestätigte Firmendaten bleiben `null` und werden
 * auf der Website als Platzhalter gekennzeichnet — niemals erfinden.
 */
export const site = {
  brand: "GastKlar Rhein-Neckar",
  operator: "Johnson Services",
  /** Launch-Gate: ohne SITE_INDEXABLE=true ist die ganze Seite noindex (Impressum/Datenschutz noch Platzhalter) */
  indexable: process.env.SITE_INDEXABLE === "true",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  company: {
    legalName: null as string | null,
    address: null as string | null,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
    phone: null as string | null,
  },
  areaServed: ["Mannheim", "Heidelberg", "Ludwigshafen am Rhein", "Rhein-Neckar-Kreis"],
  features: {
    /** Phase E/F — bewusst aus, bis Freigabe vorliegt */
    contentPipeline: process.env.FEATURE_CONTENT_PIPELINE === "true",
    autoPublish: process.env.FEATURE_AUTO_PUBLISH === "true",
    prospecting: process.env.FEATURE_PROSPECTING === "true",
  },
} as const;
