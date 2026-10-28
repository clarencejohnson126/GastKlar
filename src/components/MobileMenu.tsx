"use client";

import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./ui";

interface Props {
  labels: { menu: string; close: string; main: string };
  links: { href: string; label: string }[];
  footer: ReactNode;
}

export function MobileMenu({ labels, links, footer }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Activity hält Seiten beim Navigieren gemountet: Menü beim Verstecken schließen.
  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-control px-3 text-sm font-semibold text-ocean hover:bg-ice"
      >
        <Icon name={open ? "close" : "menu"} />
        <span>{open ? labels.close : labels.menu}</span>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full bg-white shadow-soft"
      >
        <nav aria-label={labels.main} className="container-page py-6">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-control px-3 text-base font-semibold text-ink hover:bg-ice"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-4">{footer}</div>
        </nav>
      </div>
    </div>
  );
}
