import { readdirSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { locales, pathFor, routes } from "../../src/config/routes";
import { FAIL_BASE_URL } from "../../playwright.config";

const viewports = [375, 768, 1440];
const allPages = routes.flatMap((r) => locales.map((l) => ({ id: r.id, locale: l, path: pathFor(r.id, l), indexable: r.indexable })));

async function noHorizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
}

test.describe("Alle Seiten in allen Breakpoints", () => {
  for (const vw of viewports) {
    for (const p of allPages) {
      test(`${p.path} @${vw}px`, async ({ page }) => {
        await page.setViewportSize({ width: vw, height: 900 });
        const res = await page.goto(p.path);
        expect(res?.status()).toBe(200);
        await expect(page.locator("h1")).toHaveCount(1);
        expect(await noHorizontalOverflow(page), "kein horizontales Scrollen").toBe(true);
        await expect(page).toHaveTitle(/GastKlar Rhein-Neckar/);
        await expect(page.locator("html")).toHaveAttribute("lang", p.locale);
      });
    }
  }
});

test.describe("SEO", () => {
  for (const p of allPages) {
    test(`Metadaten ${p.path}`, async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${p.path === "/" ? ":\\d+/?$" : p.path + "$"}`));
      for (const l of locales) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${l}"]`)).toHaveCount(1);
      }
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      const robots = page.locator('meta[name="robots"]');
      if (p.indexable) await expect(robots).toHaveCount(0);
      else await expect(robots).toHaveAttribute("content", /noindex/);
    });
  }

  test("Regionstitel laut Brief", async ({ page }) => {
    await page.goto("/region/mannheim");
    await expect(page).toHaveTitle("Airbnb-Reinigung Mannheim | GastKlar Rhein-Neckar");
    await page.goto("/region/heidelberg");
    await expect(page).toHaveTitle("Ferienwohnungsreinigung Heidelberg | GastKlar Rhein-Neckar");
    await page.goto("/region/ludwigshafen");
    await expect(page).toHaveTitle("Airbnb-Reinigung Ludwigshafen | GastKlar Rhein-Neckar");
  });

  test("Sitemap und robots", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const indexable = allPages.filter((p) => p.indexable);
    expect(sitemap.match(/<loc>/g)?.length).toBe(indexable.length);
    expect(sitemap).not.toContain("impressum");
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap:");
  });

  test("/kontakt leitet auf /angebot", async ({ page }) => {
    await page.goto("/kontakt");
    await expect(page).toHaveURL(/\/angebot$/);
  });

  test("Security-Header gesetzt", async ({ request }) => {
    const res = await request.get("/");
    expect(res.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(res.headers()["x-content-type-options"]).toBe("nosniff");
  });
});

test.describe("Inhaltsregeln (Copy-Guard)", () => {
  for (const p of allPages) {
    test(`keine Preise/Fake-Claims ${p.path}`, async ({ page }) => {
      await page.goto(p.path);
      const text = await page.locator("body").innerText();
      expect(text).not.toMatch(/€|\bEUR\b|\b(ab|from) \d+([.,]\d+)?\s*(€|eur|euro)|preis(e)? ab|24\/7|Sterne|\bstars?\b|Kundenstimme|testimonial/i);
    });
  }

  test("Host-Erfahrung prominent auf der Startseite", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Über 10 Jahre eigene Host-Erfahrung").first()).toBeVisible();
    await expect(page.getByText("Ein Service von Johnson Services.").first()).toBeVisible();
  });
});

test.describe("Navigation und Sprache", () => {
  test("Sprachwechsel behält den Seitentyp", async ({ page }) => {
    await page.goto("/leistungen");
    await page.getByRole("link", { name: "English" }).first().click();
    await expect(page).toHaveURL(/\/en\/services$/);
    await page.getByRole("link", { name: "Deutsch" }).first().click();
    await expect(page).toHaveURL(/\/leistungen$/);
  });

  test("Mobiles Menü: öffnen, Escape schließt", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    const button = page.getByRole("button", { name: "Menü" });
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("link", { name: "Leistungen" }).first()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Menü" })).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByRole("button", { name: "Menü" })).toBeFocused();
  });

  test("Tastatur: Skip-Link zuerst, Fokus überall sichtbar", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Zum Inhalt springen" })).toBeFocused();
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      const visible = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return true;
        const s = getComputedStyle(el);
        return s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2;
      });
      expect(visible, `sichtbarer Fokus bei Tab ${i + 1}`).toBe(true);
    }
  });

  test("FAQ-Akkordeon per Tastatur", async ({ page }) => {
    await page.goto("/");
    const summary = page.locator("summary").first();
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("details").first()).toHaveAttribute("open", "");
  });
});

test.describe("Angebotsformular", () => {
  test.describe.configure({ mode: "serial" });
  const outbox = path.join(process.cwd(), ".outbox");
  const countOutbox = () => {
    try {
      return readdirSync(outbox).length;
    } catch {
      return 0;
    }
  };

  async function fillValid(page: Page) {
    await page.getByLabel(/Ort oder PLZ/).fill("68159 Mannheim");
    await page.getByLabel(/Ungefähre Größe/).fill("55");
    await page.getByLabel(/Name oder Firma/).fill("Testbetrieb GmbH");
    await page.getByLabel(/E-Mail-Adresse/).fill("test@example.com");
    await page.getByRole("checkbox", { name: "Wäscheservice" }).check();
    await page.getByRole("checkbox", { name: /Ich stimme zu/ }).check();
  }

  test("enthält alle Zusatzleistungen", async ({ page }) => {
    await page.goto("/angebot");
    for (const name of [
      "Schlüsselübergabe und Check-in",
      "Gästekommunikation",
      "Wäscheservice",
      "Kleinreparaturen und Instandhaltung",
      "Renovierungsarbeiten",
      "Individuelles Host-Dashboard",
      "Kurzfristige Einsätze",
      "Sonstiges",
    ]) {
      await expect(page.getByRole("checkbox", { name })).toBeVisible();
    }
    await expect(page.getByRole("checkbox", { name: /Wechselreinigung/ })).toBeChecked();
  });

  test("leeres Absenden zeigt Fehlerzusammenfassung mit Fokus", async ({ page }) => {
    await page.goto("/angebot");
    await page.getByLabel(/Anzahl der Unterkünfte/).fill("");
    await page.getByRole("button", { name: "Unverbindliches Angebot anfordern" }).click();
    const alert = page.locator("#form-alert");
    await expect(alert).toBeVisible();
    await expect(alert).toBeFocused();
    await expect(alert).toContainText("Ort oder PLZ");
    await expect(alert).toContainText("Datenschutzerklärung");
    await expect(page.getByLabel(/Ort oder PLZ/)).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel(/E-Mail-Adresse/)).toHaveAttribute("aria-invalid", "true");
  });

  test("ungültige E-Mail: Eingaben bleiben erhalten", async ({ page }) => {
    await page.goto("/angebot");
    await fillValid(page);
    await page.getByLabel(/E-Mail-Adresse/).fill("keine-mail");
    await page.getByRole("button", { name: "Unverbindliches Angebot anfordern" }).click();
    await expect(page.locator("#form-alert")).toContainText("gültige E-Mail");
    await expect(page.getByLabel(/Ort oder PLZ/)).toHaveValue("68159 Mannheim");
    await expect(page.getByRole("checkbox", { name: "Wäscheservice" })).toBeChecked();
  });

  test("gültige Anfrage landet in der Outbox", async ({ page }) => {
    const before = countOutbox();
    await page.goto("/angebot");
    await fillValid(page);
    await page.waitForTimeout(2600); // Mindest-Ausfüllzeit (Bot-Schutz)
    await page.getByRole("button", { name: "Unverbindliches Angebot anfordern" }).click();
    await expect(page.getByRole("heading", { name: "Vielen Dank für Ihre Anfrage." })).toBeFocused();
    await expect(page.getByText(/unverbindlichen Angebot/)).toBeVisible();
    await expect.poll(countOutbox).toBeGreaterThan(before);
  });

  test("Honeypot: Bot erhält Erfolg, aber nichts wird versendet", async ({ page }) => {
    const before = countOutbox();
    await page.goto("/angebot");
    await fillValid(page);
    await page.locator("#website").fill("spam", { force: true });
    await page.waitForTimeout(2600);
    await page.getByRole("button", { name: "Unverbindliches Angebot anfordern" }).click();
    await expect(page.getByRole("heading", { name: "Vielen Dank für Ihre Anfrage." })).toBeVisible();
    await page.waitForTimeout(500);
    expect(countOutbox()).toBe(before);
  });

  test("Zustellfehler wird angezeigt, Eingaben bleiben", async ({ page }) => {
    await page.goto(`${FAIL_BASE_URL}/angebot`);
    await fillValid(page);
    await page.waitForTimeout(2600);
    await page.getByRole("button", { name: "Unverbindliches Angebot anfordern" }).click();
    await expect(page.locator("#form-alert")).toContainText("nicht übermittelt");
    await expect(page.getByLabel(/Name oder Firma/)).toHaveValue("Testbetrieb GmbH");
  });

  test("englisches Formular funktioniert", async ({ page }) => {
    await page.goto("/en/quote");
    await page.getByRole("button", { name: /Request your free/ }).click();
    await expect(page.locator("#form-alert")).toBeVisible();
  });
});
