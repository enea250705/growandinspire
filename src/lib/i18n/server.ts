import 'server-only'
import { cookies } from 'next/headers'
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from './config'
import { dictionaries, type Dictionary } from './dictionaries'

/**
 * Current locale from the cookie, defaulting to Albanian. Reading the cookie
 * opts pages into dynamic rendering — the intended tradeoff of a cookie-based,
 * URL-stable language switch.
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies()
  const v = store.get(LOCALE_COOKIE)?.value
  return isLocale(v) ? v : DEFAULT_LOCALE
}

/** Dictionary for the current locale (server components). */
export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]
}
