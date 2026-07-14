'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useI18n } from './I18nProvider'
import type { Lang } from '@/lib/i18n'

const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'sq', flag: '🇦🇱', label: 'Shqip' },
]

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-brand-white transition-colors"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="font-medium">{current.code.toUpperCase()}</span>
        <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-brand-dark shadow-xl overflow-hidden z-50"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === lang}
              onClick={() => { setLang(l.code); setOpen(false) }}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-left transition-colors ${
                l.code === lang ? 'bg-white/10 text-brand-white' : 'text-white/70 hover:bg-white/5 hover:text-brand-white'
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span className="font-medium">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
