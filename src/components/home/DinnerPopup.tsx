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

const SEEN_KEY = 'dinnerPopupSeen'

export function DinnerPopup() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false) // drives the enter transition

  // Show once per browser session, shortly after the page loads.
  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return
    const t = setTimeout(() => setOpen(true), 600)
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
    sessionStorage.setItem(SEEN_KEY, '1')
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

      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-brand-black border border-brand-gold/25 rounded-3xl shadow-2xl transition-all duration-300 ${shown ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-brand-black/50 hover:bg-brand-black/80 text-white/70 hover:text-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="relative h-44 sm:h-52 bg-brand-dark rounded-t-3xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-alketa.png" alt="Alketa Vejsiu" className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />
        </div>

        {/* Body */}
        <div className="px-7 pb-8 -mt-6 relative">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-2 text-center">{c.badge}</p>
          <h2 className="font-serif text-3xl font-bold text-brand-white mb-4 text-center">{c.title}</h2>
          <div className="space-y-3 mb-7">
            {c.desc.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-brand-white text-base font-medium text-center' : 'text-white/60 text-sm leading-relaxed'}>
                {p}
              </p>
            ))}
          </div>
          <button
            onClick={apply}
            className="w-full bg-brand-gold text-brand-black py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
          >
            {c.apply}
          </button>
        </div>
      </div>
    </div>
  )
}
