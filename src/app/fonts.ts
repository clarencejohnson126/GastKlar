import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// Laut 03_DESIGN_SYSTEM.md: Headlines Plus Jakarta Sans, Body Inter.
// next/font lädt die Dateien beim Build und liefert sie selbst aus (keine Laufzeit-Requests an Google).
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = `${jakarta.variable} ${inter.variable}`;
