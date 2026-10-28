"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { composeMessages, getTransport } from "./mailer";
import { leadRateLimiter } from "./rate-limit";
import { formDataToObject, leadSchema } from "./schema";

export interface LeadState {
  status: "idle" | "invalid" | "success" | "error" | "rateLimited";
  errors?: Record<string, string>;
  values?: Record<string, unknown>;
}

const MIN_FILL_MS = 2500;

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const raw = formDataToObject(formData);
  const { website, startedAt, ...values } = raw;

  // Bots: Honeypot gefüllt → scheinbarer Erfolg, kein Versand
  if (typeof website === "string" && website.trim() !== "") return { status: "success" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!leadRateLimiter.check(ip)) return { status: "rateLimited", values };

  // Validierung zuerst, damit Menschen bei schnellem Absenden ihre Fehler sehen
  const parsed = leadSchema.safeParse(values);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return { status: "invalid", errors, values };
  }

  // Gültig, aber unrealistisch schnell ausgefüllt → vermutlich Bot: scheinbarer Erfolg, kein Versand
  const started = Number(startedAt);
  if (started > 0 && Date.now() - started < MIN_FILL_MS) return { status: "success" };

  const leadId = randomUUID();
  try {
    const transport = getTransport();
    await transport.send(composeMessages(leadId, parsed.data), leadId);
    // Logging ohne personenbezogene Daten
    console.info(JSON.stringify({ event: "lead_delivered", leadId, transport: transport.name }));
    return { status: "success" };
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "lead_delivery_failed",
        leadId,
        error: error instanceof Error ? error.message : "unknown",
      }),
    );
    return { status: "error", values };
  }
}
