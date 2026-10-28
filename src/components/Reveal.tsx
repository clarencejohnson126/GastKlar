"use client";

import { useEffect } from "react";

/**
 * Eintritt der Teile jeder Sektion: Elemente mit [data-reveal] bekommen [data-shown],
 * sobald sie in den Viewport kommen. Ohne JS greift die CSS-Regel nicht (Inhalt bleibt sichtbar).
 */
export function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const scan = () =>
      document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
