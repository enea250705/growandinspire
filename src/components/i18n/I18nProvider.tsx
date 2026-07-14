'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { DEFAULT_LANG, LANG_COOKIE, type Lang, translate } from '@/lib/i18n'

interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Start from the default so server and first client render match (no
  // hydration mismatch); adopt the saved preference right after mount.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG)

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)lang=(en|sq)/)
    if (match && match[1] !== lang) {
      setLangState(match[1] as Lang)
      document.documentElement.lang = match[1]
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLang = useCallback((next: Lang) => {
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = next
    setLangState(next)
  }, [])

  const t = useCallback((key: string) => translate(lang, key), [lang])

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
