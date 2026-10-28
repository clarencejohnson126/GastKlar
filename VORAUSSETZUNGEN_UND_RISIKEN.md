# Fehlende Voraussetzungen und technische Risiken

## A. Launch-Blocker (vom Eigentümer beizustellen)

| # | Was fehlt | Wofür | Bis dahin |
|---|---|---|---|
| 1 | **Empfänger-E-Mail für Anfragen** | Form-to-Inbox | Outbox-Transport (Dateien in `.outbox/`) |
| 2 | **SMTP-Zugang für ein GastKlar-Postfach** (oder Resend/Postmark) | Versand intern + Kundenbestätigung | wie oben; bestehende Johnson-IONOS-Daten werden **nicht** ohne Freigabe wiederverwendet |
| 3 | **Impressumsangaben**: eingetragene Firmierung Johnson Services, Inhaber, ladungsfähige Anschrift, Kontakt, USt-ID/Kleinunternehmerstatus, ggf. HWK | Impressum (§ 5 DDG) | gekennzeichneter Platzhalter, `noindex` |
| 4 | **Datenschutzerklärung** (rechtlich geprüft), Verantwortlicher, Hoster, Mailprovider (AVV) | DSGVO | Platzhalter, keine erfundenen Rechtstexte |
| 5 | **Domain** | canonical, hreflang, Sitemap, OpenGraph | `NEXT_PUBLIC_SITE_URL`, Default `http://localhost:3000` |
| 6 | **Hosting-Entscheidung** (Vercel-CLI ist vorhanden, oder bestehender Provider) | Deploy | lokal |
| 7 | **Telefonnummer** (nur wenn bestätigt) | Kontaktweg | nicht angezeigt |

## B. Vor Livegang zu klären (nicht technisch)
- Gewerbeumfang, HWK-Pflicht und Versicherung für Reparatur-/Renovierungs-Add-ons. Bis dahin formuliert die Website „nach Prüfung im Einzelfall“.
- Markennutzung „Airbnb“ in den Regions-Titeln (vom Brief vorgegeben). Umsetzung rein beschreibend, plus Footer-Hinweis, dass keine Verbindung zu Vermietungsplattformen besteht. Restrisiko bleibt → Markenprüfung empfohlen.
- Bildrechte: aktuell keine Fotos. Echte Fotos (z. B. aus den eigenen Unterkünften des Gründers) würden die Conversion deutlich stärken. KI-Bilder (Higgsfield/Gemini) sind kostenpflichtig → Freigabe nötig.
- Englische Texte sind von mir übersetzt → muttersprachliche Durchsicht empfohlen.

## C. Technische Risiken

| Risiko | Auswirkung | Gegenmaßnahme |
|---|---|---|
| In-Memory-Rate-Limit gilt auf Serverless nur pro Instanz | schwächerer Spam-Schutz | Honeypot + Mindestzeit + Zod; in Phase D Redis-Adapter hinter demselben Interface |
| Mailzustellung (SPF/DKIM/DMARC der Absenderdomain) | Anfragen im Spam oder verloren | DNS einrichten; Fehler nicht verschlucken, Nutzer bekommt Ersatz-Kontaktweg, Alarm |
| Impeccable, Emil-Skills, Taste nicht installiert (Auto-Mode-Block) | Methodik nicht 1:1 nach PDF | Ersatz-Skills lokal; Installation selbst ausführen (Befehle unten) |
| Kein Figma | kein externer Designabgleich | DESIGN.md verbindlich, Screenshots zur Abnahme |
| Playwright MCP ungepinnt (`@latest`) | kann hängen (laut PDF) | Repo nutzt gepinntes `@playwright/test` |
| Next.js 16 ist neu | API-Änderungen | nur stabile APIs (App Router, Server Actions, Metadata API) |
| Dünne Regionsseiten | schlechte Rankings, Doorway-Risiko | eigenständiger Text je Stadt; weitere Orte erst mit echtem Inhalt |

## D. Freigabepflichtig (wird nicht ohne dein OK ausgeführt)
Deploy/Veröffentlichung, Domain/DNS, Versand echter E-Mails, Anlegen von Social-Accounts, OAuth, Posts, kostenpflichtige Bildgenerierung, Outreach.

## E. Optional selbst ausführen (Liam-Otley-Stack)
```bash
cd gastklar-web
npx skills@latest add emilkowalski/skills
npx skills add https://github.com/Leonxlnx/taste-skill
npx impeccable install
claude mcp add --transport http figma https://mcp.figma.com/mcp   # nur mit Dev/Full-Seat + Figma-Datei sinnvoll
```
