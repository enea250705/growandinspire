import { cookies } from 'next/headers'
import { LANG_COOKIE, normalizeLang, translate, type Lang } from './i18n'

/** Current language for a server component, read from the `lang` cookie. */
export async function getLang(): Promise<Lang> {
  const store = await cookies()
  return normalizeLang(store.get(LANG_COOKIE)?.value)
}

/** Server-side translator: `const t = await getT()` then `t('key')`. */
export async function getT() {
  const lang = await getLang()
  return (key: string) => translate(lang, key)
}
