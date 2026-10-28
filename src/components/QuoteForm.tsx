"use client";

import { useActionState, useEffect, useRef } from "react";
import type { Content } from "@/content/types";
import type { Locale } from "@/config/routes";
import { submitLead, type LeadState } from "@/modules/leads/action";
import { addonKeys, serviceKeys } from "@/modules/leads/schema";
import { Icon, submitButtonClass } from "./ui";

type FormText = Content["form"];

const fieldOrder = [
  "location",
  "propertyCount",
  "sizeSqm",
  "beds",
  "bathrooms",
  "turnovers",
  "address",
  "services",
  "dates",
  "notes",
  "name",
  "email",
  "phone",
  "privacy",
] as const;

const inputClass =
  "mt-2 block min-h-12 w-full rounded-control border border-field bg-white px-4 py-2 text-base text-ink aria-[invalid=true]:border-2 aria-[invalid=true]:border-danger";

function Label({ htmlFor, text, required, f }: { htmlFor: string; text: string; required?: boolean; f: FormText }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold">
      {text} <span className="font-normal text-muted">({required ? f.required : f.optional})</span>
    </label>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-danger">
      {message}
    </p>
  );
}

export function QuoteForm({
  f,
  addons,
  locale,
  privacyHref,
  quoteHref,
  contactEmail,
}: {
  f: FormText;
  addons: Content["addons"];
  locale: Locale;
  privacyHref: string;
  quoteHref: string;
  contactEmail: string | null;
}) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  const startedRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (startedRef.current && !startedRef.current.value) startedRef.current.value = String(Date.now());
  });

  useEffect(() => {
    if (state.status === "invalid" || state.status === "error" || state.status === "rateLimited") {
      summaryRef.current?.focus();
    } else if (state.status === "success") {
      resultRef.current?.focus();
    }
  }, [state]);

  const err = (k: string) => {
    const code = state.status === "invalid" ? state.errors?.[k] : undefined;
    return code ? (f.errors[code] ?? f.errors.required) : undefined;
  };
  const val = (k: string) => {
    const v = state.values?.[k];
    return typeof v === "string" ? v : undefined;
  };
  const has = (k: string, item: string, fallback: boolean) => {
    const v = state.values?.[k];
    return state.values ? Array.isArray(v) && v.includes(item) : fallback;
  };
  const describe = (k: string, hint?: boolean) =>
    [hint ? `${k}-hint` : "", err(k) ? `${k}-error` : ""].filter(Boolean).join(" ") || undefined;

  if (state.status === "success") {
    return (
      <div className="rounded-card border border-line bg-white p-6 shadow-soft md:p-8" role="status">
        <span className="flex size-12 items-center justify-center rounded-pill bg-ocean text-white">
          <Icon name="check" />
        </span>
        <h2 ref={resultRef} tabIndex={-1} className="mt-6 text-xl-compact">
          {f.success.title}
        </h2>
        <p className="mt-4 max-w-prose">{f.success.text}</p>
        <a href={quoteHref} className="text-link mt-6 inline-block">
          {f.success.again}
        </a>
      </div>
    );
  }

  const labels: Record<string, string> = {
    location: f.fields.location,
    propertyCount: f.fields.propertyCount,
    sizeSqm: f.fields.size,
    beds: f.fields.beds,
    bathrooms: f.fields.bathrooms,
    turnovers: f.fields.turnovers,
    address: f.fields.address,
    services: f.groups.services,
    dates: f.fields.dates,
    notes: f.fields.notes,
    name: f.fields.name,
    email: f.fields.email,
    phone: f.fields.phone,
    privacy: f.fields.privacyLink,
  };
  const errorKeys = fieldOrder.filter((k) => err(k));

  const numberField = (name: string, label: string, required: boolean, min: number) => (
    <div>
      <Label htmlFor={name} text={label} required={required} f={f} />
      <input
        id={name}
        name={name}
        type="number"
        inputMode="numeric"
        min={min}
        step={1}
        defaultValue={val(name) ?? (name === "propertyCount" ? "1" : undefined)}
        aria-invalid={err(name) ? true : undefined}
        aria-describedby={describe(name, name === "sizeSqm")}
        className={inputClass}
      />
      {name === "sizeSqm" && (
        <p id="sizeSqm-hint" className="mt-2 text-xs text-muted">
          {f.fields.sizeHint}
        </p>
      )}
      <ErrorText id={`${name}-error`} message={err(name)} />
    </div>
  );

  const textField = (
    name: string,
    label: string,
    required: boolean,
    opts: { type?: string; autoComplete?: string; hint?: string; inputMode?: "email" | "tel" | "text" } = {},
  ) => (
    <div>
      <Label htmlFor={name} text={label} required={required} f={f} />
      <input
        id={name}
        name={name}
        type={opts.type ?? "text"}
        inputMode={opts.inputMode}
        autoComplete={opts.autoComplete}
        defaultValue={val(name)}
        aria-invalid={err(name) ? true : undefined}
        aria-describedby={describe(name, Boolean(opts.hint))}
        className={inputClass}
      />
      {opts.hint && (
        <p id={`${name}-hint`} className="mt-2 text-xs text-muted">
          {opts.hint}
        </p>
      )}
      <ErrorText id={`${name}-error`} message={err(name)} />
    </div>
  );

  const groupClass = "rounded-card border border-line bg-white p-6 md:p-8";
  const legendClass = "font-display text-lg font-bold";

  return (
    <form action={action} noValidate className="space-y-8" aria-describedby="form-required-note">
      {(state.status === "invalid" || state.status === "error" || state.status === "rateLimited") && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          id="form-alert"
          role="alert"
          className="rounded-card border-2 border-danger bg-danger-soft p-6"
        >
          {state.status === "invalid" && (
            <>
              <h2 className="text-base">{f.errorSummary}</h2>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                {errorKeys.map((k) => (
                  <li key={k}>
                    <a href={`#${k === "services" ? "service-turnover" : k}`} className="text-link">
                      {labels[k]}: {err(k)}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          {state.status === "rateLimited" && <p className="font-semibold">{f.errors.rateLimit}</p>}
          {state.status === "error" && (
            <>
              <h2 className="text-base">{f.failure.title}</h2>
              <p className="mt-2">{f.failure.text}</p>
              {contactEmail && (
                <p className="mt-2">
                  {f.failure.fallback}{" "}
                  <a href={`mailto:${contactEmail}`} className="text-link">
                    {contactEmail}
                  </a>
                </p>
              )}
            </>
          )}
        </div>
      )}

      <input type="hidden" name="locale" value={locale} />
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">{f.fields.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className={groupClass}>
        <legend className={`${legendClass} float-left w-full`}>{f.groups.property}</legend>
        <div className="clear-both grid gap-6 pt-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            {textField("location", f.fields.location, true, { autoComplete: "postal-code", hint: f.fields.locationHint })}
          </div>
          {numberField("propertyCount", f.fields.propertyCount, true, 1)}
          {numberField("sizeSqm", f.fields.size, true, 10)}
          {numberField("beds", f.fields.beds, false, 0)}
          {numberField("bathrooms", f.fields.bathrooms, false, 0)}
          <div className="sm:col-span-2">{numberField("turnovers", f.fields.turnovers, false, 0)}</div>
          <div className="sm:col-span-2">
            {textField("address", f.fields.address, false, { autoComplete: "street-address", hint: f.fields.addressHint })}
          </div>
        </div>
      </fieldset>

      <fieldset className={groupClass} aria-describedby={err("services") ? "services-error" : undefined}>
        <legend className={`${legendClass} float-left w-full`}>{f.groups.services}</legend>
        <div className="clear-both pt-6">
          <p className="text-sm font-semibold">{f.servicesLegend}</p>
          <div className="mt-3 space-y-3">
            {serviceKeys.map((s) => (
              <label key={s} className="flex min-h-12 cursor-pointer items-start gap-3 rounded-control border border-line p-3 has-checked:border-ocean has-checked:bg-ice">
                <input
                  id={s === "turnover" ? "service-turnover" : undefined}
                  type="checkbox"
                  name="services"
                  value={s}
                  defaultChecked={has("services", s, s === "turnover")}
                  className="mt-1 size-5 shrink-0 accent-ocean"
                />
                <span>{s === "turnover" ? f.fields.serviceTurnover : f.fields.serviceSpecial}</span>
              </label>
            ))}
          </div>
          <ErrorText id="services-error" message={err("services")} />

          <p className="mt-8 text-sm font-semibold">{f.fields.addonsLegend}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {addonKeys.map((a) => (
              <label key={a} className="flex min-h-12 cursor-pointer items-start gap-3 rounded-control border border-line p-3 has-checked:border-ocean has-checked:bg-ice">
                <input
                  type="checkbox"
                  name="addons"
                  value={a}
                  defaultChecked={has("addons", a, false)}
                  className="mt-1 size-5 shrink-0 accent-ocean"
                />
                <span>{addons[a].title}</span>
              </label>
            ))}
          </div>

          <div className="mt-8 space-y-6">
            {textField("dates", f.fields.dates, false, { hint: f.fields.datesHint })}
            <div>
              <Label htmlFor="notes" text={f.fields.notes} f={f} />
              <textarea
                id="notes"
                name="notes"
                rows={4}
                defaultValue={val("notes")}
                aria-invalid={err("notes") ? true : undefined}
                aria-describedby={describe("notes")}
                className={`${inputClass} min-h-32`}
              />
              <ErrorText id="notes-error" message={err("notes")} />
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className={groupClass}>
        <legend className={`${legendClass} float-left w-full`}>{f.groups.contact}</legend>
        <div className="clear-both grid gap-6 pt-6 sm:grid-cols-2">
          <div className="sm:col-span-2">{textField("name", f.fields.name, true, { autoComplete: "name" })}</div>
          {textField("email", f.fields.email, true, { type: "email", inputMode: "email", autoComplete: "email" })}
          {textField("phone", f.fields.phone, false, { type: "tel", inputMode: "tel", autoComplete: "tel" })}
          <div className="sm:col-span-2">
            <label htmlFor="privacy" className="flex cursor-pointer items-start gap-3">
              <input
                id="privacy"
                type="checkbox"
                name="privacy"
                defaultChecked={val("privacy") === "on"}
                aria-invalid={err("privacy") ? true : undefined}
                aria-describedby={describe("privacy")}
                className="mt-1 size-5 shrink-0 accent-ocean"
              />
              <span className="text-sm">
                {f.fields.privacy}{" "}
                <a href={privacyHref} className="text-link" target="_blank" rel="noopener">
                  {f.fields.privacyLink}
                </a>
                . <span className="text-muted">({f.required})</span>
              </span>
            </label>
            <ErrorText id="privacy-error" message={err("privacy")} />
          </div>
        </div>
      </fieldset>

      <div>
        <button type="submit" disabled={pending} className={`${submitButtonClass} w-full sm:w-auto`}>
          {pending ? f.sending : f.submit}
        </button>
      </div>
    </form>
  );
}
