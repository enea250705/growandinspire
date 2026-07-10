'use client'

import { createContext, useContext } from 'react'
import type { Locale } from './config'
import type { Dictionary } from './dictionaries'

interface I18nValue {
  locale: Locale
  dict: Dictionary
}

const I18nContext = createContext<I18nValue | null>(null)

/** Seeded once in the root layout with the server-resolved locale + dictionary. */
export function I18nProvider({ locale, dict, children }: I18nValue & { children: React.ReactNode }) {
  return <I18nContext.Provider value={{ locale, dict }}>{children}</I18nContext.Provider>
}

/** Client-side access to the current dictionary and locale. */
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

/** Shorthand: the current dictionary. */
export function useT(): Dictionary {
  return useI18n().dict
}
