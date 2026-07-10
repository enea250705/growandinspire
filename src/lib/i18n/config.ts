// Cookie-based i18n (no URL change). Albanian is the source language.
export const LOCALES = ['sq', 'en', 'it', 'de', 'fr'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'sq'
export const LOCALE_COOKIE = 'locale'

export const LOCALE_LABELS: Record<Locale, string> = {
  sq: 'Shqip',
  en: 'English',
  it: 'Italiano',
  de: 'Deutsch',
  fr: 'Français',
}

/** Short badge shown in the switcher trigger. */
export const LOCALE_SHORT: Record<Locale, string> = {
  sq: 'AL',
  en: 'EN',
  it: 'IT',
  de: 'DE',
  fr: 'FR',
}

export function isLocale(v: string | undefined): v is Locale {
  return !!v && (LOCALES as readonly string[]).includes(v)
}
