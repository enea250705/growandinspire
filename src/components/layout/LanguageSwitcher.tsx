'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, Check } from 'lucide-react'
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT, type Locale } from '@/lib/i18n/config'
import { setLocale } from '@/lib/i18n/actions'
import { useI18n } from '@/lib/i18n/provider'

/** Compact language dropdown. `dark` variant sits on the black navbar; the
 *  default light variant is for footer / light surfaces. */
export function LanguageSwitcher({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { locale, dict } = useI18n()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [pending, start] = useTransition()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function choose(l: Locale) {
    setOpen(false)
    if (l === locale) return
    start(async () => {
      await setLocale(l)
      router.refresh()
    })
  }

  const dark = variant === 'dark'

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={pending}
        aria-label={dict.switcher.label}
        className={`inline-flex items-center gap-1.5 text-sm rounded-full px-3 py-1.5 transition-colors disabled:opacity-60 ${
          dark
            ? 'text-white/70 hover:text-brand-white border border-white/15 hover:border-white/40'
            : 'text-black/60 hover:text-brand-black border border-black/15 hover:border-black/40'
        }`}
      >
        <Globe size={14} />
        <span className="font-medium">{LOCALE_SHORT[locale]}</span>
      </button>

      {open && (
        <div
          className={`absolute right-0 mt-2 w-40 rounded-xl border shadow-lg overflow-hidden z-50 ${
            dark ? 'bg-brand-black border-white/15' : 'bg-brand-white border-black/10'
          }`}
        >
          {LOCALES.map((l) => {
            const active = l === locale
            return (
              <button
                key={l}
                type="button"
                onClick={() => choose(l)}
                className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors ${
                  dark
                    ? 'text-white/80 hover:bg-white/5'
                    : 'text-black/70 hover:bg-black/5'
                } ${active ? 'font-semibold' : ''}`}
              >
                {LOCALE_LABELS[l]}
                {active && <Check size={14} className="text-brand-gold" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
