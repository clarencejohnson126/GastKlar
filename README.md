# GastKlar Rhein-Neckar — Website

Zweisprachige Service-Website (DE/EN) für „GastKlar Rhein-Neckar – Reinigung und Gästeservice für Ferienwohnungen“, ein Service von Johnson Services. Ziel: qualifizierte, unverbindliche Angebotsanfragen. Keine Preise, kein Preisrechner.

Weitere Dokumente: [`DESIGN.md`](DESIGN.md) (verbindliche Tokens) · [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md) (Architektur, Phasen) · [`VORAUSSETZUNGEN_UND_RISIKEN.md`](VORAUSSETZUNGEN_UND_RISIKEN.md) (Launch-Blocker).

## Schnellstart

```bash
npm install
cp .env.example .env.local      # Werte lokal eintragen, nie committen
npm run dev                     # http://localhost:3000
```

Ohne Konfiguration landen Anfragen im Dev-Modus als JSON in `.outbox/` (gitignored).

## Befehle

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` / `npm start` | Produktions-Build / -Server |
| `npm run verify` | Lint + Typecheck + Unit-Tests + Build + E2E (Gate vor jedem Release) |
| `npm run test:e2e` | Playwright: alle Seiten × 375/768/1440, SEO, Copy-Guard, Tastatur, Formular |
| `npm run test:unit` | Unit-Tests (Content-Planer) |
| `npm run content:plan -- 2026-11-02 14` | Redaktionsplan als JSON (nur Entwürfe) |

## Seiten

| DE | EN |
|---|---|
| `/` | `/en` |
| `/leistungen` | `/en/services` |
| `/ueber-uns` | `/en/about` |
| `/angebot` (Formular; `/kontakt` leitet hierhin) | `/en/quote` |
| `/region/mannheim`, `/region/heidelberg`, `/region/ludwigshafen` | `/en/region/…` |
| `/impressum`, `/datenschutz` (Platzhalter, `noindex`) | `/en/legal-notice`, `/en/privacy` |

Neue Seite oder Region: Eintrag in `src/config/routes.ts` + Texte in `src/content/de.ts` und `en.ts`. Sitemap, hreflang, Sprachumschalter und Tests übernehmen den Eintrag automatisch.

## Architektur in Kürze

- Next.js 16 (App Router, Cache Components), TypeScript, Tailwind 4, Zod. Alle Seiten statisch vorgerendert.
- Zwei Root-Layouts (`src/app/(de)`, `src/app/(en)/en`) für korrektes `<html lang>`; eine Routen-Registry statt doppelter Ordner.
- Design-Tokens nur in `src/app/globals.css` (Tailwind-Standardpaletten deaktiviert → keine freien Farben möglich).
- Schriften selbst gehostet über `next/font`; keine Cookies, kein Tracking → kein Cookie-Banner nötig.
- Security-Header inkl. CSP in `next.config.ts`.

## Angebotsformular (Lead-Backend)

`src/modules/leads/`: Server Action → Rate-Limit (pro IP) → Honeypot → Zod-Validierung → Mindest-Ausfüllzeit → Mail-Transport. Funktioniert auch ohne JavaScript. Logs enthalten keine personenbezogenen Daten.

| Variable | Bedeutung |
|---|---|
| `LEAD_MAIL_TRANSPORT` | `outbox` (Dev/Test), `smtp` (Produktion), `fail` (Fehlertest). In Produktion Pflicht. |
| `CONTACT_RECIPIENT_EMAIL` | internes Postfach für Anfragen |
| `LEAD_SEND_CONFIRMATION` | `true` = Eingangsbestätigung an Kunden (Betreff laut Brief) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `LEAD_MAIL_FROM` | SMTP-Zugang (z. B. eigenes GastKlar-Postfach) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | optional: Ersatz-Kontakt bei Zustellfehler |
| `NEXT_PUBLIC_SITE_URL` | Domain für canonical, hreflang, Sitemap |

Das In-Memory-Rate-Limit gilt pro Server-Instanz. Für Serverless (Vercel) in Phase D durch einen Redis-Adapter mit gleicher Schnittstelle (`RateLimiter`) ersetzen.

## Deploy (erst nach Freigabe)

1. Launch-Gates aus `VORAUSSETZUNGEN_UND_RISIKEN.md` erledigen (Impressum, Datenschutz, Postfach, Domain).
2. Umgebungsvariablen beim Hoster setzen (`LEAD_MAIL_TRANSPORT=smtp` usw.).
3. `npm run verify` lokal grün.
4. Deploy, z. B. `vercel --prod` (Vercel-CLI ist installiert) oder eigener Node-Host mit `npm run build && npm start`.
5. Nach Deploy: Testanfrage senden, Zustellung prüfen, SPF/DKIM/DMARC der Absenderdomain prüfen.

## Integrationen und Feature Flags

| Modul | Stand | Flag |
|---|---|---|
| Leads (`src/modules/leads`) | fertig, SMTP wartet auf Zugangsdaten | `LEAD_MAIL_TRANSPORT` |
| Content-Planer (`src/modules/content`) | Entwürfe nach Rhythmus und Mix aus 06; kein Posting | `FEATURE_CONTENT_PIPELINE` (aus) |
| Meta/TikTok-Publishing | nicht gebaut; Vorbild: bestehender Meta-Workflow des Betreibers (Graph API) | `FEATURE_AUTO_PUBLISH` (aus) |
| B2B-Recherche | Vorlage `docs/b2b-recherche-vorlage.csv` (Felder aus 07); kein Scraper, kein Versand | `FEATURE_PROSPECTING` (aus) |

## Figma

Die Figma-Datei liegt im Konto des Inhabers (Startseite als Capture). Konto mit View-Seat → nur wenige MCP-Aufrufe pro Monat; gezielt einsetzen.

## Liam-Otley-Werkzeuge (optional, selbst ausführen)

Die Installation wurde in der Agentensitzung aus Sicherheitsgründen blockiert:

```bash
npx skills@latest add emilkowalski/skills
npx skills add https://github.com/Leonxlnx/taste-skill
npx impeccable install
npx impeccable detect http://localhost:3000
```
