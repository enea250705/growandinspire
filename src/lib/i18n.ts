// Lightweight bilingual (English / Albanian) dictionary. Phase 1 covers the
// site chrome (navbar); more surfaces get keys added over time. Any missing key
// falls back to English, then to the key itself, so partial coverage never
// breaks the UI.

export type Lang = 'en' | 'sq'
export const LANGS: Lang[] = ['en', 'sq']
export const DEFAULT_LANG: Lang = 'en'
export const LANG_COOKIE = 'lang'

type Dict = Record<string, string>

const messages: Record<Lang, Dict> = {
  en: {
    'nav.learning': 'Learning',
    'nav.coaching': 'Coaching',
    'nav.events': 'Events',
    'nav.community': 'Community',
    'nav.insights': 'Insights',
    'nav.about': 'About',
    'nav.login': 'Log In',
    'nav.join': 'Join the Circle',
    'nav.dashboard': 'Dashboard',
  },
  sq: {
    'nav.learning': 'Mësim',
    'nav.coaching': 'Coaching',
    'nav.events': 'Evente',
    'nav.community': 'Komuniteti',
    'nav.insights': 'Këshilla',
    'nav.about': 'Rreth Nesh',
    'nav.login': 'Hyr',
    'nav.join': 'Bashkohu',
    'nav.dashboard': 'Paneli',
  },
}

export function normalizeLang(value?: string | null): Lang {
  return value === 'sq' ? 'sq' : 'en'
}

export function translate(lang: Lang, key: string): string {
  return messages[lang]?.[key] ?? messages[DEFAULT_LANG][key] ?? key
}
