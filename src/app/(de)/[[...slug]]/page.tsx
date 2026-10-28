import { staticParamsFor } from "@/config/routes";
import { pageMetadata, renderPage } from "@/views/render";

type Props = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  return staticParamsFor("de");
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return pageMetadata("de", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return renderPage("de", slug);
}
