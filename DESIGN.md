# DESIGN.md — GastKlar Rhein-Neckar

**Verbindlich.** Quelle: `03_DESIGN_SYSTEM.md` und `04_WEBSITE_UX_SEO.md` (Build Pack). Es gibt keine Figma-Designdatei; die Figma-Datei enthält nur eine Aufnahme einer früheren Fassung und ist keine Quelle. Offene Punkte sind unten entschieden (Taste-Skill für Mehrdeutiges, der Brief gewinnt bei Konflikten).
**Regel:** Jeder Farb-, Abstands-, Radius-, Schatten- und Schriftwert im Code steht in dieser Datei (umgesetzt in `src/app/globals.css`). Fehlt ein Wert: zuerst hier ergänzen, dann verwenden.

## 1. Richtung

Ein heller, freundlicher Gastgeber-Service mit Boutique-Ferienwohnungs-Gefühl: viel Weiß, Eisblau-Flächen, Meeresblau als Stimme der Marke, Sandgold als warmer Akzent in jeder Sektion. Weiche Formen: Bögen und Kreise für Bilder, 16-px-Karten, runde Icon-Plaketten. Sauber, frisch, seriös, bodenständig. **Nicht:** Tech-Startup, Discount-Putzfirma, maritimer Kitsch, dunkle Flächen.

## 2. Farbe (nur diese)

| Token | Hex | Einsatz |
|---|---|---|
| `ocean` | #0F6297 | Headlines, Navigation, Links, Primary-Buttons, Footer-Fläche, Region-Fläche |
| `white` | #FFFFFF | Grundfläche, Karten |
| `sand` | #D9A66C | Akzent in jeder Sektion: Icon-Plaketten, Hotspots, Kicker-Linien, Labels/Pills, Bildrahmen, Unterstreichungen. **Nie Textfarbe**; Text auf Sand immer `ink` (6,9:1) |
| `ice` | #EAF4FA | Sektionsflächen im Wechsel mit Weiß, Formular-Hintergrund, Tags |
| `ink` | #1E2328 | Fließtext (neutral, ohne Blaustich) — 15,9:1 auf Weiß |
| `muted` | #4B5563 | Sekundärtext — 7,6:1 auf Weiß, 6,8:1 auf Eisblau |
| `line` | #D7DCE1 | dekorative Rahmen (Karten, Trenner im Formular) |
| `field` | #7A838C | Rahmen von Eingabefeldern (3,9:1) |
| `danger` / `danger-soft` | #B42318 / #FDECEA | nur Formularfehler |

Verboten: jedes Dunkelblau als Fläche, Salbeigrün, Deep Forest, Verläufe. Weißer Text nur auf `ocean` (6,5:1). Hover auf `ocean`-Buttons: `ocean` mit 90 % Deckkraft, kein dunkleres Blau.

**Rhythmus der Startseite:** Weiß (Hero, mit Eisblau-Streifen rechts) → Eisblau (Kernleistungen) → Weiß (Zusatzleistungen) → Eisblau (Ablauf) → Weiß (Gastgeber) → Meeresblau (Region) → Weiß (FAQ) → Eisblau (Angebot) → Meeresblau (Footer).

## 3. Typografie

| Rolle | Familie | Gewicht |
|---|---|---|
| Headlines | Plus Jakarta Sans | 700, 800 |
| Text/UI | Inter | 400, 500, 600 |

Selbst gehostet über `next/font`. Skala (px): **14** Bildunterschrift/Fußnote · **16** UI, Karten-Text · **18** Fließtext (Standard) · **24** Lead, Zitat · **32** H2 mobil · **44** H2 Desktop · **56** H1 (Hero `clamp(36px, …, 56px)`). Headlines in `ocean`, Tracking −0,02 em, max. zwei Zeilen wo möglich. Fließtext max. 64 Zeichen pro Zeile.

## 4. Raum, Raster, Formen

- 4/8-px-System. Sektionen: 80 px (mobil) / 112 px (Desktop) vertikal. Container max. **1200 px**, 12 Spalten, Seitenrand 16/24 px.
- Radien: Karten **16 px**, Buttons und Felder **10 px**, Pills/Icons rund.
- **Bildformen:** Bogen (`.shape-arch`: oben voll gerundet, unten 16 px) für große Bilder; Kreis mit 6-px-Rahmen in Weiß, Eisblau oder Sand für Begleitbilder. Keine kleinen eckigen Thumbnails.
- Schatten ruhig: `shadow-soft` (Karten, Buttons), `shadow-lift` (Hero-Bild, Hover, Tooltips).

## 5. Komponenten

- **Header** (alle Seiten, sticky, weiß, `shadow-soft`): Sand-Punkt + Wortmarke „GastKlar Rhein-Neckar“, Claim darunter, Navigation (Leistungen, Ablauf, Region, FAQ, Über uns), DE | EN, CTA „Unverbindliches Angebot anfragen“. Mobil: Menü-Button.
- **Primary-Button:** `ocean`, weiß, 10 px Radius, ≥ 48 px hoch, `shadow-soft`. **Secondary:** weiß, 2 px `ocean`-Rahmen.
- **Kicker:** Sand-Linie 32×2 px + Text in `ocean`, 16 px, halbfett (über H2; trägt den Sektionsnamen).
- **Hotspot-Bild (Hero):** Bogenbild mit 4 Sand-Punkten (44 px, weißer Ring); Klick/Enter öffnet eine weiße Karte (Titel `ocean`, Text `muted`); Esc schließt; Textliste für Screenreader.
- **Zusatzleistungen:** 8 Karten (weiß, `line`-Rahmen, 16 px, `shadow-soft`), runde Sand-Icon-Plakette, Titel `ocean`, Text `muted`, Status-Pill in Eisblau.
- **Ablauf:** 5 Schritte, Ocean-Kreise mit Ziffer, verbunden durch Sand-Linie.
- **FAQ:** Akkordeon-Karten in Eisblau, offen weiß mit Schatten, runder Sand-Knopf.
- **Formular:** auf Eisblau, Gruppen als weiße Karten, Fehlerzusammenfassung oben.

## 6. Bildwelt

Schön eingerichtete, helle Boutique-Ferienwohnungen im Altbau (Mannheim/Heidelberg): Kunst an den Wänden, Pflanzen, Leuchten, Textilien; Akzente in Meeresblau und Sandgold; sauber und gastbereit; natürliches Licht, iPhone-Look. Menschen bei der Arbeit und bei der Schlüsselübergabe. Kein Meer, keine Schäden, keine Unordnung. KI-Bilder sind im Footer als Beispielvisualisierungen gekennzeichnet.

## 7. Motion (apple-design, im Rahmen von 03)

150–300 ms, `cubic-bezier(0.22, 1, 0.36, 1)`. Sanftes Reveal (12 px, 300 ms, gestaffelt 60 ms), nur mit JS. Buttons: Druck auf 0,98. Karten: Schatten hebt sich beim Hover. Hotspots: Plus dreht sich zum Kreuz. Alles unterbrechbar über CSS-Transitions vom aktuellen Wert aus. **Kein** Pointer-down-Auslösen (03/01 verbieten es), kein Parallax, kein Autoplay. `prefers-reduced-motion` schaltet alles ab.

## 8. Prüfung vor „fertig“

375/768/1440 px ohne Überlauf · Tab durch die ganze Seite, sichtbarer Fokus (3 px `ocean`, auf `ocean` in `sand`) · Kontraste wie oben · Formularzustände · DE/EN · `impeccable detect` + `/impeccable critique` · Lighthouse.
