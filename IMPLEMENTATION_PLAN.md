# IMPLEMENTATION_PLAN.md — GastKlar Rhein-Neckar

Stand: 28.10.2026 · Grundlage: Build Pack 00–07, Liam-Otley-PDF, `DESIGN.md`.
Oberste Priorität: schnelle, hochwertige, zweisprachige Website, die qualifizierte Angebotsanfragen erzeugt. Automationen (E, F) erst nach stabiler Website.
Offene Punkte und Risiken: siehe `VORAUSSETZUNGEN_UND_RISIKEN.md`.

---

## 1. Eingangsaudit (Ergebnis)

| Bereich | Befund |
|---|---|
| Repo | Keins vorhanden → neu: `gastklar-web/` (git init, lokal, kein Remote) |
| Laufzeit | Node 22.22, npm 10.9 · Next.js 16.4 · Tailwind 4.3 · Zod 4.6 |
| Figma | Kein Figma-MCP verbunden, keine Datei → DESIGN.md aus 03_DESIGN_SYSTEM abgeleitet. Figma wurde **nicht** geprüft |
| Playwright MCP | Verbunden (`npx @playwright/mcp`, ungepinnt) → für Tests genutzt; zusätzlich gepinntes `@playwright/test` im Repo für reproduzierbare E2E |
| Impeccable / Emil-Skills / Taste | Quellen geprüft (pbakaus/impeccable v4.8.0, emilkowalski/skills, Leonxlnx/taste-skill). Projektlokale Installation wurde vom Auto-Mode-Klassifikator **blockiert** → Ersatz: lokal vorhandene Skills `frontend-design`, `ecc:motion-*`; `npx impeccable detect` wird als Einmal-Audit versucht |
| Vorhandene Social-Automation | Bestehender Meta-Publishing-Workflow des Betreibers read-only gesichtet (Graph API, Page-Token, Bild- und Video-Posting). Nichts verändert, keine Werte kopiert. Dient in Phase E als Muster |

### Anforderungsmatrix

| Anforderung | Vorhanden | Umsetzung | Risiko |
|---|---|---|---|
| DE default + EN mit echten Übersetzungen | – | Routen-Registry, zwei Wörterbücher, `hreflang` | Übersetzungsqualität → Review durch Eigentümer |
| Keine Preise / kein Rechner | – | Copy-Regel + Test, der Seiten auf `€`, „ab … Euro“ prüft | gering |
| Core-Leistung + 8 Add-ons im Formular | – | Zod-Schema als Single Source für Formular + Server | gering |
| „Über 10 Jahre eigene Host-Erfahrung“ | – | Hero-Trust + Über-uns | Formulierung exakt halten |
| Form-to-Inbox | – | Server Action → Mail-Adapter (Feature Flag) | **Blocker:** Empfängeradresse + SMTP-Zugang |
| Impressum/Datenschutz | – | gekennzeichnete Platzhalter, `noindex` bis bestätigt | **Launch-Gate** |
| Regionale SEO-Seiten | – | 3 Seiten mit eigenständigem Text | Thin Content → echte lokale Infos nötig |
| JSON-LD | – | nur `WebSite` + `Service` ohne Adresse; `LocalBusiness` erst mit bestätigten Daten | gering |

---

## 2. Architektur

```
gastklar-web/
├── DESIGN.md · IMPLEMENTATION_PLAN.md · VORAUSSETZUNGEN_UND_RISIKEN.md · README.md
├── .env.example                  # nur Variablennamen
├── src/
│   ├── app/
│   │   ├── globals.css           # @theme-Tokens aus DESIGN.md (einzige Quelle)
│   │   ├── (de)/layout.tsx       # <html lang="de">
│   │   ├── (de)/[[...slug]]/page.tsx
│   │   ├── (en)/en/layout.tsx    # <html lang="en">
│   │   ├── (en)/en/[[...slug]]/page.tsx
│   │   └── sitemap.ts · robots.ts
│   ├── config/
│   │   ├── site.ts               # Marke, Feature Flags, bestätigte Firmendaten (null = unbestätigt)
│   │   └── routes.ts             # Routen-Registry: pageId ↔ DE-Slug ↔ EN-Slug
│   ├── content/{de,en}.ts        # alle Texte, typisiert über ein gemeinsames Interface
│   ├── components/               # Header, Footer, Timeline, Sektionen, Formular …
│   ├── views/                    # Seiten-Templates je pageId
│   └── modules/
│       ├── leads/                # schema.ts (Zod), action.ts, rate-limit.ts, mailer/ (Adapter)
│       ├── content/              # Phase E (Feature Flag aus)
│       ├── publishers/meta|tiktok/ # Phase E
│       └── prospecting/          # Phase F
└── tests/e2e/                    # Playwright 375/768/1440
```

**Entscheidungen**
- **Routen-Registry statt Ordner-Duplikation:** eine Tabelle definiert jede Seite einmal mit DE- und EN-Slug. Neue Regionsseite = ein Eintrag + Content, kein neuer Code. Der Sprachumschalter löst über die Registry das Gegenstück auf → Seitentyp bleibt erhalten.
- **Zwei Root-Layouts** (Route Groups) für korrektes `<html lang>`; vollständig statisch generiert.
- **Formular als Server Action mit `useActionState`:** funktioniert auch ohne JavaScript; Next.js prüft bei Server Actions Origin gegen Host (CSRF-Schutz). Zusätzlich Honeypot, Mindest-Ausfüllzeit, Rate-Limit pro IP (in-memory im MVP, Interface für Redis später), serverseitige Zod-Validierung, Längenlimits.
- **Mail-Adapter per Feature Flag** `LEAD_MAIL_TRANSPORT = outbox | smtp`. `outbox` (Dev/Test) schreibt die Mail als Datei nach `.outbox/` (gitignored). `smtp` via nodemailer mit eigenem GastKlar-Postfach. Fehlt die Konfiguration in Produktion → klarer Fehlerzustand mit Ersatz-Kontaktweg, nie stilles Verschlucken.
- **Keine Datenbank im MVP** (Brief: mail-only zulässig). `leads`, `lead_addons`, `lead_events` erst bei echtem Bedarf.
- **Logging ohne personenbezogene Rohdaten:** nur Lead-ID, Zeit, Transport, Ergebnis.
- **Fonts selbst gehostet** über `next/font`, **keine Analytics/Cookies** im MVP → kein Cookie-Banner nötig.
- **Security-Header:** CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'`.

---

## 3. Phasen und Aufgaben

### Stand 28.10.2026
- **A, B, C erledigt.** Alle Seiten DE/EN, Formular, Regionen, SEO, Tests: 106/106 E2E grün, 3/3 Unit grün; Lighthouse Desktop 100/100/96–100/100, Mobil Performance 97–98, A11y 100, SEO 100.
- **D teilweise:** Lead-Backend mit Outbox/SMTP/Fail-Transport fertig und getestet; echter SMTP-Versand wartet auf Postfach-Zugangsdaten und Freigabe.
- **E Stufe 1:** Content-Planer (DRAFT) + CLI + Unit-Tests. Bildgenerierung und Publishing warten auf Freigabe.
- **F Stufe 1:** Recherche-Vorlage `docs/b2b-recherche-vorlage.csv`.
- **Figma:** Datei angelegt, Startseite per `generate_figma_design` übertragen (4 von ca. 6 Aufrufen verbraucht).

### Phase A — Audit, Design, Plan, Copy, SEO-Struktur
- [x] Unterlagen gelesen, Umgebung und bestehende Automationen read-only geprüft
- [x] DESIGN.md, IMPLEMENTATION_PLAN.md, VORAUSSETZUNGEN_UND_RISIKEN.md
- [x] SEO-Struktur (Routen-Registry unten)
- [ ] Copy DE/EN direkt in `src/content/*` (mit Phase B)

### Phase B — Kernwebsite
1. Tokens aus DESIGN.md in `globals.css`, Fonts, Security-Header
2. Routen-Registry, Layouts DE/EN, Header (Sprachumschalter, Mobile-Menü), Footer
3. Startseite: Hero + Zeitleiste, Kernleistung, Zusatzleistungen, Ablauf, Host-Erfahrung, Region, FAQ, CTA
4. Seiten: Leistungen, Über uns, Angebot (Formular), Impressum/Datenschutz-Platzhalter (`noindex`)
5. Angebotsformular inkl. Server Action, Validierung, Fehlerzusammenfassung, Erfolgszustand, Outbox-Transport
6. Lint, Typecheck, Build

### Phase C — Regionen, SEO, A11y, Tests
1. `/region/mannheim|heidelberg|ludwigshafen` + EN mit eigenständigem Text, Titel laut Brief
2. Metadaten, canonical, hreflang (inkl. `x-default`), OpenGraph, `sitemap.xml`, `robots.txt`
3. JSON-LD (`WebSite`, `Service`; kein `LocalBusiness` ohne bestätigte Adresse)
4. Playwright: 375/768/1440, Overflow, Tastatur/Fokus, Sprachwechsel, Formular ungültig/gültig/Serverfehler, SEO-Tags, „keine Preise“
5. Lighthouse + `npx impeccable detect` (falls zulässig), Fixes, Re-Run

### Phase D — Lead-Backend produktionsreif *(Freigabe + Zugangsdaten nötig)*
1. SMTP-Transport mit GastKlar-Postfach, interne Mail + optionale Eingangsbestätigung (Betreff laut Brief)
2. Zustell- und Fehlertests gegen Test-Postfach; Alarm bei Zustellfehler
3. Verteiltes Rate-Limit beim Hosting

### Phase E — Content-Pipeline *(Feature Flag aus, Freigaben nötig)*
Themenpool → Kalender (Rhythmus aus 06) → Caption/Bildprompt → Gemini-Bild → Audit → DRAFT/REVIEW/APPROVED → Meta Graph API (Muster aus dem bestehenden Workflow des Betreibers), TikTok Photo Post nach App-Audit, sonst manueller Upload.

### Phase F — B2B-Recherche *(separates Modul)*
Rechercheliste mit Minimalfeldern aus 07, Quelle + Datum, `contact_permission_state`; **kein** automatisierter Versand.

---

## 4. Routen (SEO-Struktur)

| pageId | DE | EN | Title (DE) |
|---|---|---|---|
| home | `/` | `/en` | GastKlar Rhein-Neckar – Reinigung und Gästeservice für Ferienwohnungen |
| services | `/leistungen` | `/en/services` | Leistungen |
| about | `/ueber-uns` | `/en/about` | Über uns |
| quote | `/angebot` | `/en/quote` | Unverbindliches Angebot anfragen |
| region-mannheim | `/region/mannheim` | `/en/region/mannheim` | Airbnb-Reinigung Mannheim |
| region-heidelberg | `/region/heidelberg` | `/en/region/heidelberg` | Ferienwohnungsreinigung Heidelberg |
| region-ludwigshafen | `/region/ludwigshafen` | `/en/region/ludwigshafen` | Airbnb-Reinigung Ludwigshafen |
| privacy | `/datenschutz` | `/en/privacy` | Datenschutz (noindex bis bestätigt) |
| imprint | `/impressum` | `/en/legal-notice` | Impressum (noindex bis bestätigt) |

`/kontakt` leitet auf `/angebot` weiter.

## 5. Software-Factory (wiederholbare Abläufe)

- `npm run verify` = Lint + Typecheck + Build + Playwright. Gate vor jedem „fertig“.
- Neue Regionsseite = Eintrag in `routes.ts` + Content in `de.ts`/`en.ts`. Tests iterieren automatisch über alle registrierten Routen (Title, H1, hreflang, Sitemap).
- Copy-Guard-Test: schlägt fehl bei Preisangaben, „24/7“, Sterne-/Bewertungsbegriffen.

## 6. Definition of Done (MVP, aus 05)

Mobile/Desktop hochwertig · alle Kernseiten DE/EN · Form-to-Inbox in Testumgebung · keine Preise · alle Add-ons im Formular · 10+ Jahre Host-Erfahrung korrekt · Rechtstexte vor Livegang bestätigt · Playwright-Protokoll grün · README für Deploy und Betrieb.
