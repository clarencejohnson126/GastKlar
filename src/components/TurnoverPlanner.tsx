"use client";

import { useState } from "react";
import type { Content } from "@/content/types";

type V3 = Content["home"]["v3"];

const outTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];
const inTimes = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "18:00"];

const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
const toTime = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0") /* taste-skill-ignore: Uhrzeit */}:${String(Math.round(m % 60 / 5) * 5 % 60).padStart(2, "0")}`;

/**
 * Das interaktive Element der Seite: der eigene Wechsel des Gastgebers.
 * Ohne JS ist es ein normales GET-Formular zur Angebotsseite.
 */
export function TurnoverPlanner({ v, action, cta }: { v: V3; action: string; cta: string }) {
  const [checkout, setCheckout] = useState("11:00");
  const [checkin, setCheckin] = useState("15:00");
  const [beds, setBeds] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);

  const start = toMin(checkout);
  const end = Math.max(toMin(checkin), start + 60);
  const span = end - start;
  const marks = [0, 0.15, 0.5, 1].map((f) => toTime(start + span * f));
  const hours = (span / 60).toLocaleString(v.plannerHours === "Stunden" ? "de-DE" : "en-GB", { maximumFractionDigits: 1 });
  const dates = v.plannerDates.replace("{out}", checkout).replace("{in}", checkin);

  const field = "mt-2 block min-h-12 w-full bg-white px-3 text-base text-ink";
  const label = "text-sm font-medium";

  return (
    <form action={action} method="get" className="mt-10">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <label className={label}>
          {v.plannerFields.checkout}
          <select name="checkout" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={field}>
            {outTimes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          {v.plannerFields.checkin}
          <select name="checkin" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={field}>
            {inTimes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          {v.plannerFields.beds}
          <input
            name="beds"
            type="number"
            inputMode="numeric"
            min={1}
            max={30}
            value={beds}
            onChange={(e) => setBeds(Number(e.target.value) || 1)}
            className={field}
          />
        </label>
        <label className={label}>
          {v.plannerFields.bathrooms}
          <input
            name="bathrooms"
            type="number"
            inputMode="numeric"
            min={1}
            max={10}
            value={bathrooms}
            onChange={(e) => setBathrooms(Number(e.target.value) || 1)}
            className={field}
          />
        </label>
      </div>
      <input type="hidden" name="dates" value={dates} />

      <div aria-live="polite" className="mt-10">
        <p className="flex items-baseline justify-between gap-4">
          <span className="text-sm">{v.plannerWindow}</span>
          <span className="text-lg font-bold tabular-nums text-sand">
            {hours} {v.plannerHours}
          </span>
        </p>
        <ol className="mt-4 space-y-3">
          {v.plannerSteps.map((s, i) => (
            <li key={s} className="flex items-baseline gap-4">
              <span className="w-14 shrink-0 font-bold tabular-nums text-sand">{marks[i]}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-white/80">{v.plannerNote}</p>
      </div>

      <button
        type="submit"
        className="press mt-10 inline-flex min-h-13 w-full items-center justify-center bg-white px-6 text-base font-medium text-ink hover:bg-ice"
      >
        {cta}
      </button>
    </form>
  );
}
