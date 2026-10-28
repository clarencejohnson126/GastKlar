import type { ReactNode } from "react";
import type { Viewport } from "next";
import { fontVariables } from "@/app/fonts";
import type { Locale } from "@/config/routes";
import { Reveal } from "./Reveal";

export const viewport: Viewport = {
  // Browser-UI-Farbe = Token `ocean` (DESIGN.md); Metadaten akzeptieren keine CSS-Variablen.
  themeColor: "#0f6297",
  width: "device-width",
  initialScale: 1,
};

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Bewegung nur, wenn JS läuft — ohne Skript bleibt jeder Inhalt sichtbar */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh bg-white font-body text-ink antialiased">
        {children}
        <Reveal />
      </body>
    </html>
  );
}
