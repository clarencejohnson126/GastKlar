"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { Content } from "@/content/types";

/**
 * Hotspot-Bild laut 03_DESIGN_SYSTEM.md: großes Wohnungsfoto, auf dem die Leistungen
 * des Gästewechsels als Punkte erklärt werden. Ohne JS bleibt die Liste darunter lesbar.
 */
export function HotspotImage({
  data,
  src,
  alt,
}: {
  data: Content["home"]["hotspots"];
  src: string;
  alt: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <figure ref={rootRef} className="relative">
      <div className="shape-arch relative aspect-[3/4] w-full bg-ice shadow-lift">
        <Image src={src} alt={alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
        {data.items.map((h, i) => {
          const isOpen = open === i;
          const tipId = `${baseId}-tip-${i}`;
          const alignRight = h.x > 55;
          return (
            <div key={h.title} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={tipId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="press relative -ml-[22px] -mt-[22px] flex size-11 items-center justify-center rounded-pill bg-sand text-ink shadow-soft ring-4 ring-white/70 hover:scale-105"
              >
                <span className="sr-only">{h.title}</span>
                <svg aria-hidden="true" viewBox="0 0 24 24" className={`size-5 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              {/* apple-design: Karte wächst aus ihrem Punkt (transform-origin am Auslöser), unterbrechbar per CSS-Transition */}
              <div
                id={tipId}
                role="note"
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={`absolute top-8 z-10 w-60 rounded-card bg-white p-4 text-left shadow-lift transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${alignRight ? "right-0 origin-top-right" : "-left-6 origin-top-left"} ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
              >
                <p className="font-display text-sm font-bold text-ocean">{h.title}</p>
                <p className="mt-1 text-xs text-muted">{h.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-4 flex items-center gap-2 text-xs text-muted">
        <span className="inline-block size-2.5 rounded-pill bg-sand" aria-hidden="true" />
        {data.hint}
      </figcaption>
      {/* Für Screenreader und ohne JS: alle Punkte als Liste */}
      <ul className="sr-only">
        {data.items.map((h) => (
          <li key={h.title}>
            {h.title}: {h.text}
          </li>
        ))}
      </ul>
    </figure>
  );
}
