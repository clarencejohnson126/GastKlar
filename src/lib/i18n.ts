import type { Locale } from "@/config/routes";
import type { Content } from "@/content/types";
import { de } from "@/content/de";
import { en } from "@/content/en";

const dictionaries: Record<Locale, Content> = { de, en };

export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}
