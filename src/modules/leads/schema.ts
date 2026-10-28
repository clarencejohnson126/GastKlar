import { z } from "zod";

/** Reihenfolge = Reihenfolge im Formular und auf der Website (02_BUSINESS_ANGEBOT) */
export const addonKeys = [
  "keys",
  "guestCommunication",
  "laundry",
  "repairs",
  "renovation",
  "hostDashboard",
  "shortNotice",
  "other",
] as const;
export type AddonKey = (typeof addonKeys)[number];

export const serviceKeys = ["turnover", "special"] as const;
export type ServiceKey = (typeof serviceKeys)[number];

// Fehlermeldungen sind Codes; der Text kommt sprachabhängig aus src/content.

const text = (max: number, min: number) =>
  z
    .string({ error: "required" })
    .trim()
    .max(max, { error: "tooLong" })
    .refine((v) => v.length >= min, { error: "required" });

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: "tooLong" })
    .optional()
    .transform((v) => (v ? v : undefined));

const toNumber = (v: unknown) => (v === "" || v == null ? undefined : Number(v));

const int = (min: number, max: number) =>
  z
    .number({ error: (issue) => (issue.input === undefined ? "required" : "number") })
    .int({ error: "number" })
    .min(min, { error: "number" })
    .max(max, { error: "number" });

const requiredInt = (min: number, max: number) => z.preprocess(toNumber, int(min, max));
const optionalInt = (min: number, max: number) => z.preprocess(toNumber, int(min, max).optional());

export const leadSchema = z
  .object({
    location: text(120, 2),
    propertyCount: requiredInt(1, 500),
    sizeSqm: requiredInt(10, 5000),
    beds: optionalInt(0, 200),
    bathrooms: optionalInt(0, 100),
    turnovers: optionalInt(0, 300),
    address: optionalText(200),
    services: z.array(z.enum(serviceKeys)).default([]),
    addons: z.array(z.enum(addonKeys)).default([]),
    dates: optionalText(300),
    notes: optionalText(2000),
    name: text(120, 2),
    email: z
      .string({ error: "required" })
      .trim()
      .max(200, { error: "tooLong" })
      .pipe(z.email({ error: (issue) => (issue.input === "" ? "required" : "email") })),
    phone: optionalText(40).refine((v) => !v || /^[+0-9 ()/-]{5,40}$/.test(v), { error: "phone" }),
    privacy: z.literal("on", { error: "consent" }),
    locale: z.enum(["de", "en"]).default("de"),
  })
  .refine((d) => d.services.length + d.addons.length > 0, {
    path: ["services"],
    error: "service",
  });

export type Lead = z.infer<typeof leadSchema>;

/** Liest FormData in ein flaches Objekt; Mehrfachfelder als Array */
export function formDataToObject(fd: FormData): Record<string, unknown> {
  const multi = new Set(["services", "addons"]);
  const out: Record<string, unknown> = {};
  for (const [key, value] of fd.entries()) {
    if (typeof value !== "string" || key.startsWith("$ACTION")) continue;
    if (multi.has(key)) {
      const list = (out[key] as string[] | undefined) ?? [];
      list.push(value);
      out[key] = list;
    } else {
      out[key] = value;
    }
  }
  return out;
}
