'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, { badge: string; title: string; desc: string[]; apply: string; dismiss: string }> = {
  en: {
    badge: 'Exclusive Experience',
    title: 'Dinner with Alketa',
    desc: [
      'Around the right table, ideas turn into partnerships.',
      'Dinner with Alketa is an exclusive experience for entrepreneurs, leaders and professionals who value authentic conversations, the exchange of experience and connections that last. This event is built for a limited group of participants with a business profile, experience, influence or the potential to contribute to a meaningful conversation on motivation, business growth, decision-making, market challenges and opportunities for collaboration. Its value lies in access to a curated circle of people, the quality of the exchange, and the chance to build deeper professional relationships in an exclusive setting.',
    ],
    apply: 'Apply now',
    dismiss: 'Maybe later',
  },
  sq: {
    badge: 'Eksperiencë Ekskluzive',
    title: 'Dinner with Alketa',
    desc: [
      'Rreth tavolinës së duhur, idetë kthehen në bashkëpunime.',
      'Dinner with Alketa është një eksperiencë ekskluzive për sipërmarrës, drejtues dhe profesionistë që vlerësojnë bisedat autentike, shkëmbimin e përvojës dhe lidhjet që zgjasin. Ky event është ndërtuar për një grup të kufizuar pjesëmarrësish që kanë profil biznesi, eksperiencë, ndikim ose potencial për të kontribuar në një bisedë cilësore mbi motivimin, rritjen e biznesit, vendimmarrjen, sfidat e tregut dhe mundësitë e bashkëpunimit. Vlera e aktivitetit qëndron te aksesi në një rreth të kuruar njerëzish, te cilësia e shkëmbimit dhe te mundësia për të ndërtuar marrëdhënie më të thella profesionale në një ambient ekskluziv.',
    ],
    apply: 'Apliko tani',
    dismiss: 'Ndoshta më vonë',
  },
}

export function DinnerPopup() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false) // drives the enter transition

  // Show on every homepage load (including refreshes), shortly after the page
  // renders.
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 200)
    return () => clearTimeout(t)
  }, [])

  // Lock background scroll while open and trigger the fade/scale-in.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const r = requestAnimationFrame(() => setShown(true))
    return () => {
      document.body.style.overflow = prev
      cancelAnimationFrame(r)
    }
  }, [open])

  function close() {
    setShown(false)
    setTimeout(() => setOpen(false), 250)
  }

  function apply() {
    close()
    // Let the modal begin closing, then tell the Dinner section to open its
    // form and scroll it into view.
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-dinner-form'))
    }, 260)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Blurred backdrop over the homepage */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-brand-black/50 backdrop-blur-md transition-opacity duration-300 ${shown ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Card - full photo as a blurred background with the text over it */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-md max-h-[92vh] rounded-3xl overflow-hidden border border-brand-gold/25 shadow-2xl transition-all duration-300 ${shown ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        {/* Background photo */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/dinner-table-2.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-[3px] scale-110"
          />
          {/* Darken + gradient so the text stays readable and cool */}
          <div className="absolute inset-0 bg-brand-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/55 to-brand-black/90" />
        </div>

        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-brand-black/40 backdrop-blur-sm ring-1 ring-white/20 hover:bg-brand-black/70 text-white/80 hover:text-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {/* Content (scrolls over the fixed background) */}
        <div className="relative max-h-[92vh] overflow-y-auto px-7 pt-14 pb-8 text-center">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.25em] mb-3 drop-shadow">{c.badge}</p>
          <h2 className="font-serif text-4xl font-bold text-brand-white mb-2 drop-shadow-lg">{c.title}</h2>
          <div className="w-12 h-px bg-brand-gold/70 mx-auto mb-5" />
          <div className="space-y-3 mb-8">
            {c.desc.map((p, i) => (
              <p
                key={i}
                className={i === 0
                  ? 'text-brand-white text-lg font-medium leading-snug drop-shadow'
                  : 'text-white/80 text-sm leading-relaxed drop-shadow'}
              >
                {p}
              </p>
            ))}
          </div>
          <button
            onClick={apply}
            className="w-full bg-brand-gold text-brand-black py-4 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-brand-gold-light transition-colors shadow-lg"
          >
            {c.apply}
          </button>
        </div>
      </div>
    </div>
  )
}
