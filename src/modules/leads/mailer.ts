import "server-only";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Lead } from "./schema";
import { de } from "@/content/de";
import { en } from "@/content/en";

export interface MailMessage {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}

export interface MailTransport {
  name: string;
  send(messages: MailMessage[], leadId: string): Promise<void>;
}

/** Dev/Test: schreibt Mails als JSON nach .outbox/ (gitignored) */
const outboxTransport: MailTransport = {
  name: "outbox",
  async send(messages, leadId) {
    const dir = path.join(process.cwd(), ".outbox");
    await mkdir(dir, { recursive: true });
    const createdAt = new Date().toISOString();
    const file = path.join(dir, `${createdAt.replace(/[:.]/g, "-")}-${leadId}.json`);
    await writeFile(file, JSON.stringify({ leadId, createdAt, messages }, null, 2), "utf8");
  },
};

/** Produktion: SMTP (z. B. eigenes GastKlar-Postfach) */
const smtpTransport: MailTransport = {
  name: "smtp",
  async send(messages) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, LEAD_MAIL_FROM } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !LEAD_MAIL_FROM) {
      throw new Error("SMTP ist nicht vollständig konfiguriert");
    }
    const nodemailer = await import("nodemailer");
    const port = Number(SMTP_PORT ?? 465);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });
    for (const m of messages) {
      await transporter.sendMail({ from: LEAD_MAIL_FROM, to: m.to, replyTo: m.replyTo, subject: m.subject, text: m.text });
    }
  },
};

/** Test: simuliert einen Zustellfehler */
const failTransport: MailTransport = {
  name: "fail",
  async send() {
    throw new Error("Simulierter Zustellfehler (LEAD_MAIL_TRANSPORT=fail)");
  },
};

export function getTransport(): MailTransport {
  switch (process.env.LEAD_MAIL_TRANSPORT) {
    case "smtp":
      return smtpTransport;
    case "outbox":
      return outboxTransport;
    case "fail":
      return failTransport;
    default:
      if (process.env.NODE_ENV === "production") {
        throw new Error("LEAD_MAIL_TRANSPORT ist nicht gesetzt");
      }
      return outboxTransport;
  }
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);

export function composeMessages(leadId: string, lead: Lead): MailMessage[] {
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "anfragen@example.invalid";
  const addonTitles = lead.addons.map((a) => de.addons[a].title);
  const serviceTitles = lead.services.map((s) =>
    s === "turnover" ? de.form.fields.serviceTurnover : de.form.fields.serviceSpecial,
  );
  const row = (label: string, value: string | number | undefined) => `${label}: ${value ?? "–"}`;

  const internal: MailMessage = {
    to: recipient,
    replyTo: lead.email,
    subject: oneLine(`Neue Anfrage: ${lead.location} – ${lead.name}`),
    text: [
      `Neue Angebotsanfrage über die Website (Lead ${leadId}, Sprache ${lead.locale.toUpperCase()})`,
      "",
      "UNTERKUNFT",
      row("Ort/PLZ", lead.location),
      row("Anzahl Unterkünfte", lead.propertyCount),
      row("Größe (m²)", lead.sizeSqm),
      row("Betten/Schlafplätze", lead.beds),
      row("Badezimmer", lead.bathrooms),
      row("Reinigungen pro Monat", lead.turnovers),
      row("Adresse/Lage", lead.address),
      "",
      "LEISTUNGEN",
      row("Reinigung", serviceTitles.join(", ") || undefined),
      row("Zusatzleistungen", addonTitles.join(", ") || undefined),
      row("Termine", lead.dates),
      row("Hinweise", lead.notes),
      "",
      "KONTAKT",
      row("Name/Firma", lead.name),
      row("E-Mail", lead.email),
      row("Telefon", lead.phone),
      "",
      "Datenschutz-Zustimmung zur Bearbeitung der Anfrage: ja",
      "Hinweis: Keine Preise oder Termine automatisch zusagen.",
    ].join("\n"),
  };

  const messages = [internal];
  if (process.env.LEAD_SEND_CONFIRMATION === "true") {
    const isEn = lead.locale === "en";
    const c = isEn ? en : de;
    messages.push({
      to: lead.email,
      subject: isEn
        ? "Your enquiry to GastKlar Rhein-Neckar has been received"
        : "Ihre Anfrage bei GastKlar Rhein-Neckar ist eingegangen",
      text: [
        isEn ? `Hello ${oneLine(lead.name)},` : `Guten Tag ${oneLine(lead.name)},`,
        "",
        isEn
          ? "Thank you for your enquiry. We will review the details and get back to you with any questions or a no-obligation quote."
          : "Vielen Dank für Ihre Anfrage. Wir prüfen die Angaben und melden uns mit Rückfragen oder einem unverbindlichen Angebot.",
        "",
        isEn ? "This is not a booking confirmation." : "Dies ist keine Buchungsbestätigung.",
        "",
        "GastKlar Rhein-Neckar",
        c.brand.byOperator,
      ].join("\n"),
    });
  }
  return messages;
}
