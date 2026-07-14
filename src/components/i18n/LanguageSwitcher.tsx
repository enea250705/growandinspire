'use client'

import { Globe } from 'lucide-react'
import { useI18n } from './I18nProvider'

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n()
  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'en' ? 'sq' : 'en')}
      aria-label={lang === 'en' ? 'Kalo në shqip' : 'Switch to English'}
      className={`inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-brand-white transition-colors ${className}`}
    >
      <Globe size={16} strokeWidth={1.5} />
      <span className="font-medium">{lang === 'en' ? 'EN' : 'SQ'}</span>
    </button>
  )
}
