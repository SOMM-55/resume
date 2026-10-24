import { enContent } from "./en";
import { faContent } from "./fa";
import {
  ResumeContentSchema,
  type Locale,
  type ResumeContent,
} from "./schema";

export const LOCALES: readonly Locale[] = ["en", "fa"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<
  Locale,
  { code: Locale; label: string; dir: "ltr" | "rtl"; fontClass?: string }
> = {
  en: { code: "en", label: "English", dir: "ltr" },
  fa: { code: "fa", label: "فارسی", dir: "rtl" },
};

// Validate at load time so schema mismatches fail immediately in dev/build
const validatedEn = ResumeContentSchema.parse(enContent);
const validatedFa = ResumeContentSchema.parse(faContent);

const contentMap: Record<Locale, ResumeContent> = {
  en: validatedEn,
  fa: validatedFa,
};

export function isValidLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "fa";
}

export function getContent(locale: string | undefined | null): ResumeContent {
  if (isValidLocale(locale)) {
    return contentMap[locale];
  }
  return contentMap[DEFAULT_LOCALE];
}

export * from "./schema";
