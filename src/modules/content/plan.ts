/**
 * Content-Planer (Phase E, Stufe 1): erzeugt ausschließlich Entwürfe (DRAFT).
 * Kein API-Aufruf, kein Posting. Rhythmus und Mix laut 06_CONTENT_AUTOMATION.md:
 * - TikTok täglich; Instagram und Facebook im Tageswechsel (fortlaufend über Wochen hinweg)
 * - Mix 50 % Tipps / 30 % Einblicke / 20 % Angebote
 * Relative Imports, damit das Modul auch per CLI (node) ohne Next-Aliase läuft.
 */

export type Platform = "tiktok" | "instagram" | "facebook";
export type Pillar = "tip" | "insight" | "offer";
export type ReviewStatus = "DRAFT" | "REVIEW" | "APPROVED";

export interface PlannedPost {
  date: string; // YYYY-MM-DD, Kalendertag in Europe/Berlin
  time: string; // HH:mm, konfigurierbar
  timezone: "Europe/Berlin";
  platforms: Platform[];
  pillar: Pillar;
  topic: string;
  cta: string;
  aiDisclosure: boolean; // KI-Kennzeichnung für generierte Bilder
  status: ReviewStatus;
}

/** 10er-Zyklus = 5 Tipps, 3 Einblicke, 2 Angebote */
const pillarCycle: Pillar[] = ["tip", "insight", "tip", "offer", "tip", "insight", "tip", "tip", "insight", "offer"];

export const topicPool: Record<Pillar, string[]> = {
  tip: [
    "5 Dinge, die Ihre Gäste beim Check-in als Erstes prüfen",
    "Warum eine Betten-Checkliste Bewertungen schützen kann",
    "Gästewechsel bei kurzfristiger Abreise: so bleibt es entspannt",
    "Verbrauchsmaterial clever lagern: was in jede Ferienwohnung gehört",
    "Bad in 3 Minuten gastbereit prüfen: was oft übersehen wird",
  ],
  insight: [
    "Was zum Core-Reinigungsservice gehört",
    "So läuft ein Gästewechsel bei GastKlar ab",
    "Warum wir mit objektbezogenen Checklisten arbeiten",
  ],
  offer: [
    "Optionale Schlüsselübergabe und Wäschelogistik",
    "Digitale Dashboards für Hosts",
  ],
};

const ctas: Record<Pillar, string> = {
  tip: "Mehr Tipps für Gastgeber: Link im Profil.",
  insight: "Wie wir arbeiten, lesen Sie auf unserer Website.",
  offer: "Unverbindliches Angebot anfragen – Link im Profil.",
};

/** Referenz-Montag für den fortlaufenden IG/FB-Wechsel (Montag = Instagram) */
const ANCHOR = Date.UTC(2026, 10, 2); // 02.11.2026, Montag
const DAY = 86_400_000;

function dayIndex(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - ANCHOR) / DAY);
}

function addDays(date: string, n: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d) + n * DAY).toISOString().slice(0, 10);
}

export function platformsFor(date: string): Platform[] {
  const i = dayIndex(date);
  return ["tiktok", ((i % 2) + 2) % 2 === 0 ? "instagram" : "facebook"];
}

export function planPosts(startDate: string, days: number, time = "18:00"): PlannedPost[] {
  const used: Record<Pillar, number> = { tip: 0, insight: 0, offer: 0 };
  return Array.from({ length: days }, (_, n) => {
    const date = addDays(startDate, n);
    const idx = dayIndex(date);
    const pillar = pillarCycle[((idx % pillarCycle.length) + pillarCycle.length) % pillarCycle.length];
    const pool = topicPool[pillar];
    const topic = pool[used[pillar]++ % pool.length];
    return {
      date,
      time,
      timezone: "Europe/Berlin" as const,
      platforms: platformsFor(date),
      pillar,
      topic,
      cta: ctas[pillar],
      aiDisclosure: true,
      status: "DRAFT" as const,
    };
  });
}
