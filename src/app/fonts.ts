import localFont from "next/font/local";

// General Sans (Indian Type Foundry, ITF Free Font License) — selbst gehostet, keine Requests an Fontshare.
export const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
});

export const fontVariables = generalSans.variable;
