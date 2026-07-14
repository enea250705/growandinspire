'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DEFAULT_LANG, LANG_COOKIE, type Lang, translate } from '@/lib/i18n'

interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({
  initialLang = DEFAULT_LANG,
  children,
}: {
  initialLang?: Lang
  children: React.ReactNode
}) {
  const router = useRouter()
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = next
    setLangState(next)
    // Re-render server components (page bodies) in the new language.
    router.refresh()
  }, [router])

  const t = useCallback((key: string) => translate(lang, key), [lang])

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
