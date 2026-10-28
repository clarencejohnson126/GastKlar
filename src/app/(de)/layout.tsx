import "../globals.css";
import type { Metadata } from "next";
import { RootDocument } from "@/components/RootDocument";
import { site } from "@/config/site";

export { viewport } from "@/components/RootDocument";

export const metadata: Metadata = { metadataBase: new URL(site.url) };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="de">{children}</RootDocument>;
}
