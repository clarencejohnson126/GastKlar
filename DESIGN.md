# DESIGN.md — GastKlar Rhein-Neckar

Verbindliche Gestaltungsgrundlage. Jeder Farb-, Abstands-, Radius-, Schatten- und Schriftwert im Code stammt aus diesem Dokument (umgesetzt in `src/app/globals.css` als `@theme`-Tokens). **Wird ein Wert gebraucht, der hier fehlt: zuerst hier ergänzen, dann verwenden.** Keine freien Hexwerte in Komponenten.

**Quelle:** Keine Figma-Datei vorhanden, Figma-MCP nicht verbunden → `03_DESIGN_SYSTEM.md` + `04_WEBSITE_UX_SEO.md` sind Source of Truth. Es wurde **kein** Figma geprüft.

---

## 1. Richtung in einem Satz

Ein ruhiger, heller Gastgeber-Service mit klarer Sprache. Das Erkennungsmerkmal ist **das Zeitfenster zwischen Check-out und Check-in**. Es zieht sich als visuelles Motiv (Zeitleiste) durch die Seite, weil es genau das Problem ist, das wir für Hosts lösen.

**Wirkung:** sauber, frisch, klar, seriös, freundlich, bodenständig. **Nicht:** Tech-Startup, Discount-Putzfirma, maritimer Kitsch, Luxus-Serif.

**Mutig an genau einer Stelle:** der Hero mit der Gästewechsel-Zeitleiste. Alles andere ist diszipliniert und leise.

---

## 2. Farbe

### Markenfarben (verbindlich, aus 03_DESIGN_SYSTEM)
| Token | Hex | Rolle |
|---|---|---|
| `ocean` | `#0F6297` | Headlines-Akzent, Navigation, Links, Primary-Buttons, Fokusring |
| `white` | `#FFFFFF` | Canvas, Hauptfläche |
| `sand` | `#D9A66C` | sparsame Akzente: Linien, Icon-Flächen, Zeitleisten-Marker. **Nie als Textfarbe, nie weißer Text darauf** |
| `ice` | `#EAF4FA` | Sektionsflächen, Formular-Hintergrund |

### Abgeleitete Tokens (in dieser Implementierung entschieden, Kontrast geprüft)
| Token | Hex | Rolle | Kontrast |
|---|---|---|---|
| `ink` | `#102A3D` | Fließtext, H1–H3 | 14,8:1 auf Weiß · 13,2:1 auf Ice · 6,8:1 auf Sand |
| `muted` | `#4A5F70` | Sekundärtext, Hinweise | 6,6:1 auf Weiß · 5,9:1 auf Ice |
| `ocean-deep` | `#0B4C76` | Hover/Active für Ocean | > 8:1 auf Weiß |
| `gold-deep` | `#8A5A1F` | kleiner Akzent-Text (selten), z. B. Zeitangaben in der Zeitleiste | 5,9:1 auf Weiß |
| `line` | `#C9DCE8` | dekorative Trennlinien, Kartenränder (nicht informationstragend) | – |
| `field` | `#6B8396` | Ränder von Eingabefeldern (≥ 3:1 Nicht-Text-Kontrast) | 3,9:1 auf Weiß |
| `sand-soft` | `#F6EBDD` | Icon-Hintergrund hinter Sand-Akzenten | – |
| `danger` | `#B42318` | Fehlertext, Fehlerränder | 6,5:1 auf Weiß |
| `danger-soft` | `#FDECEA` | Hintergrund der Fehlerzusammenfassung | – |

Rechnung Ocean auf Weiß: 6,5:1 (AA für Normaltext). Weiß auf Ocean-Button: 6,5:1 ✔. Weiß auf Sand: 2,2:1 ✘ → verboten.

**Kein Erfolgs-Grün** (Salbeigrün ist verworfen). Erfolg = Ocean + Häkchen-Icon + Text.

### Verteilung
~70 % Weiß, ~20 % Ice-Flächen, ~8 % Ocean, ≤ 2 % Sand. Sand erscheint pro Viewport höchstens an 1–2 Stellen.

---

## 3. Typografie

| Rolle | Familie | Gewichte |
|---|---|---|
| Display / Headlines | **Plus Jakarta Sans** | 700, 800 |
| Body / UI | **Source Sans 3** | 400, 600 |

Begründung: Plus Jakarta Sans ist der im Brief vorgeschlagene, gut lesbare Grotesk mit Charakter. Source Sans 3 statt Inter, weil es eine größere Laufweite, offene Formen und sehr gute Lesbarkeit in 18 px für die Zielgruppe 40–60+ hat. Beide werden über `next/font` **selbst gehostet** (keine Requests an Google-Server zur Laufzeit, DSGVO).

### Type Scale (fest)
| Token | Größe / Zeilenhöhe | Verwendung |
|---|---|---|
| `text-xs` | 14 / 20 | Fußnoten, Rechtliches, Formular-Hilfe |
| `text-sm` | 16 / 24 | UI-Labels, Navigation, Sekundärtext |
| `text-base` | 18 / 30 | **Fließtext (Standard)** |
| `text-lg` | 24 / 32 | Lead-Absätze, H3 |
| `text-xl` | 32 / 40 | H2 (Mobile 28/36) |
| `text-2xl` | 44 / 52 | H1 Unterseiten (Mobile 34/42) |
| `text-3xl` | 56 / 62 | nur Hero-H1, via `clamp(2.25rem, 1.4rem + 3.6vw, 3.5rem)` |

Token-Namen der Mobile-Stufen: `text-xl-compact` (28/36) und `text-2xl-compact` (34/42); Hero: `text-hero`. Die Browser-UI-Farbe (`themeColor`) ist `ocean`.

Regeln: Headlines `ink` mit `letter-spacing: -0.02em`, `hyphens: auto` (lange deutsche Komposita dürfen trennen). Kein Wort in Headlines farbig/kursiv hervorheben. Keine ALL-CAPS-Eyebrows über Überschriften. Zeilenlänge Fließtext max. **68ch**. Deutsche Anführungszeichen „…“.

---

## 4. Abstände, Raster, Radius, Schatten

**Spacing (4/8-System):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px. Die Tailwind-Stufen 1/2/3/4/6/8/12/16/24/32 entsprechen exakt diesen Werten. **Andere Stufen sind nicht erlaubt.**

- Sektionen vertikal: Mobile 64, Desktop 96.
- Container: `max-width: 1200px`, Seitenrand 16 (Mobile) / 24 (Tablet) / 32 (Desktop).
- Raster: 12 Spalten Desktop (Gap 32), 1 Spalte Mobile. Inhalte linksbündig; zentriert nur der finale CTA-Block.

**Radius:** `radius-card` 16 px · `radius-control` 10 px (Buttons, Inputs) · `radius-pill` 999 px (Sprachumschalter, Zeitleisten-Punkte).

**Schatten (ein einziger, ink-getönt):** `shadow-soft`: `0 1px 2px rgb(16 42 61 / 0.06), 0 8px 24px rgb(16 42 61 / 0.08)`. Nur für das Formular-Panel und das mobile Menü. Karten bekommen eine `line`-Border, keinen Schatten.

---

## 5. Komponenten

- **Header:** Wortmarke „GastKlar Rhein-Neckar“ (Plus Jakarta 800; „GastKlar“ in `ocean`, „Rhein-Neckar“ in `ink` – das ist die Wortmarke, keine Headline-Hervorhebung), Untertitel „Reinigung und Gästeservice für Ferienwohnungen“ ab 1024 px sichtbar. Nav, `DE | EN`-Umschalter (echte Links, behält den Seitentyp), Primary-CTA. Mobil: Menü-Button mit `aria-expanded`, Panel ohne Fokusfalle, schließt mit Esc.
- **Primary-Button:** Ocean-Fläche, weißer Text 16/600, Höhe ≥ 48 px, Radius 10. Hover `ocean-deep`. Text „Unverbindliches Angebot anfragen“ (DE) / „Request a free quote“ (EN). Kein Pfeil-Zeichen im Text.
- **Secondary-Button:** weiß, 2 px Ocean-Border, Ocean-Text.
- **Links im Text:** Ocean, unterstrichen (1 px, Offset 3 px).
- **Fokus:** 3 px Ocean-Outline, 2 px Offset über `:focus-visible`. Auf Ocean-Flächen: weiße Outline.
- **Zeitleiste (Signatur):** vertikale Linie in `line` auf einer Ice-Karte im Hero (rechte Spalte ab 1024 px, darunter gestapelt). Start „Check-out 11:00“ (Ocean-Ring), 5 Stationen mit Sand-Punkten, Ende „Check-in 15:00“ (Ocean-Punkt mit Häkchen). Zeiten in `gold-deep`, Fußnote „Beispielhaftes Zeitfenster“. Ohne Motion vollständig lesbar. *(Entscheidung beim Bau: vertikal statt horizontal, weil 7 Stationen in einer halben Spalte horizontal zu eng sind.)*
- **Kernleistungs-Checkliste:** eine einzige Ice-Fläche mit Häkchenliste. Häkchen sind Information, keine Deko.
- **Zusatzleistungen:** Liste mit Icon (Ocean-Strich auf `sand-soft`), Titel, ein Satz. Trennung über `line`-Border oben statt identischer Schattenkarten.
- **Ablauf:** echte Sequenz → nummerierte Schritte 1–5.
- **FAQ:** native `<details>/<summary>` (tastaturbedienbar ohne JS).
- **Formular:** einseitig, drei beschriftete Gruppen („Ihr Objekt“, „Gewünschte Leistungen“, „Kontakt“). Labels über Feldern, Pflichtfelder mit „(Pflicht)“. Fehler: Zusammenfassung oben (fokussiert, verlinkt) + Text unter Feld, `aria-invalid`, `aria-describedby`. Inputs ≥ 48 px hoch, 18 px Schrift (kein iOS-Zoom).

## 6. Bildwelt

Zum Launch **keine Fotos**, da keine geklärten Bildrechte. Visuelle Last trägt die Zeitleiste. Bildslots vorgesehen (`next/image`, AVIF/WebP, `sizes`). Später: echte, helle Apartments, frisch bezogene Betten, blau-weißes Interior. KI-Bilder nur als gekennzeichnete Illustration („Beispielvisualisierung“), keine Vorher-Nachher-Belege.

## 7. Motion

- Dauer 150–250 ms, Easing `cubic-bezier(0.2, 0, 0, 1)` (Token `ease-soft`).
- Hover/Fokus: nur Farbe/Border.
- **Ein** orchestrierter Moment: Aufbau der Zeitleiste beim Laden (Stationen nacheinander, gesamt ≤ 900 ms). Keine Scroll-Reveals pro Sektion.
- `prefers-reduced-motion: reduce` → Animationen aus, Endzustand sofort.
- Native `click`/Submit-Semantik. Die pauschale „pointer-down statt click“-Regel aus dem Liam-Otley-PDF wird **bewusst nicht** übernommen (Tastatur, Touch-Scrollen, Screenreader).

## 8. Sprache & Ton

Deutsch in **Sie-Form**, sachlich-freundlich, aus Gastgeber-Sicht. Englisch als echte Übersetzung. Keine Preise, keine „ab“-Angaben, keine Superlative, kein „24/7“, keine Sterne, keine Kundenstimmen. Glaubwürdigkeit ausschließlich über „Über 10 Jahre eigene Host-Erfahrung“ und „Ein Service von Johnson Services“.

## 9. Qualitätsprüfung (vor jedem „fertig“)

375 / 768 / 1440 px ohne horizontales Scrollen · Tab durch die ganze Seite, sichtbarer Fokus, keine Fokusfalle · Kontraste wie oben · Formular-Zustände (leer, ungültig, gesendet, Serverfehler) · DE/EN-Umschaltung behält Seitentyp · Lighthouse Performance/A11y/SEO/Best Practices ≥ 95 lokal.
