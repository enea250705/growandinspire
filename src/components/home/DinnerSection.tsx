'use client'

import { useState, useEffect } from 'react'
import { UtensilsCrossed, ChevronDown } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/FormField'
import { submitDinnerApplication } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  badge: string
  title: string
  intro: string[]
  items: { label: string; desc: string }[]
  applyNow: string
  formTitle: string
  sentTitle: string
  sentDesc: string
  fields: { name: string; namePh: string; email: string; phone: string; profession: string; professionPh: string; reason: string; reasonPh: string }
  submit: string
  submitting: string
  error: string
}> = {
  en: {
    badge: 'Dinner with Alketa',
    title: 'Some conversations deserve more than a meeting.',
    intro: [
      'Around the right table, ideas turn into partnerships.',
      'Dinner with Alketa is an exclusive experience for entrepreneurs, leaders and professionals who value authentic conversations, the exchange of experience and connections that last. This event is built for a limited group of participants with a business profile, experience, influence or the potential to contribute to a meaningful conversation on motivation, business growth, decision-making, market challenges and opportunities for collaboration. Its value lies in access to a curated circle of people, the quality of the exchange, and the chance to build deeper professional relationships in an exclusive setting.',
    ],
    items: [
      { label: 'Food and Drinks', desc: 'A curated menu, selected wines, and artisan desserts.' },
      { label: 'Ambiance', desc: 'A premium venue with warm lighting and careful decor.' },
      { label: 'Audio-Visual', desc: 'Short inspiring presentations and documented moments.' },
      { label: 'Networking', desc: 'Real connections with successful women from various fields.' },
    ],
    applyNow: 'Apply now',
    formTitle: 'Application Form',
    sentTitle: 'Application sent!',
    sentDesc: 'You will be contacted within 48 hours.',
    fields: {
      name: 'Full Name', namePh: 'Your full name',
      email: 'Email', phone: 'Phone Number',
      profession: 'Profession / Field', professionPh: 'e.g. Entrepreneur, CEO, Consultant...',
      reason: 'Why do you want to take part?', reasonPh: 'Share a bit of your story and motivation...',
    },
    submit: 'Send Application',
    submitting: 'Sending...',
    error: 'Something went wrong. Please try again.',
  },
  sq: {
    badge: 'Dinner with Alketa',
    title: 'Ka biseda që meritojnë më shumë se një takim.',
    intro: [
      'Rreth tavolinës së duhur, idetë kthehen në bashkëpunime.',
      'Dinner with Alketa është një eksperiencë ekskluzive për sipërmarrës, drejtues dhe profesionistë që vlerësojnë bisedat autentike, shkëmbimin e përvojës dhe lidhjet që zgjasin. Ky event është ndërtuar për një grup të kufizuar pjesëmarrësish që kanë profil biznesi, eksperiencë, ndikim ose potencial për të kontribuar në një bisedë cilësore mbi motivimin, rritjen e biznesit, vendimmarrjen, sfidat e tregut dhe mundësitë e bashkëpunimit. Vlera e aktivitetit qëndron te aksesi në një rreth të kuruar njerëzish, te cilësia e shkëmbimit dhe te mundësia për të ndërtuar marrëdhënie më të thella profesionale në një ambient ekskluziv.',
    ],
    items: [
      { label: 'Ushqim dhe Pije', desc: 'Meny e kuruar, verëra të zgjedhura, dhe ëmbëlsira artizanale.' },
      { label: 'Ambient', desc: 'Lokacion premium me ndriçim të ngrohtë dhe dekor të kujdesshëm.' },
      { label: 'Audio-Vizual', desc: 'Prezantime të shkurtra inspiruese dhe momente të dokumentuara.' },
      { label: 'Networking', desc: 'Lidhje reale me gra të suksesshme nga fusha të ndryshme.' },
    ],
    applyNow: 'Apliko tani',
    formTitle: 'Formular Aplikimi',
    sentTitle: 'Aplikimi u dërgua!',
    sentDesc: 'Do të kontaktohesh brenda 48 orëve.',
    fields: {
      name: 'Emri dhe Mbiemri', namePh: 'Emri juaj i plotë',
      email: 'Email', phone: 'Numri i Telefonit',
      profession: 'Profesioni / Fusha', professionPh: 'p.sh. Sipërmarrëse, CEO, Konsulente...',
      reason: 'Pse dëshiron të jesh pjesë?', reasonPh: 'Ndaj pak nga historia dhe motivimi yt...',
    },
    submit: 'Dërgo Aplikimin',
    submitting: 'Duke dërguar...',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
  },
}

export function DinnerSection() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const [form, setForm] = useState({ name: '', email: '', phone: '', profession: '', reason: '' })
  // On phone the form is collapsed behind the "Apply now" button; on desktop
  // it's always shown (lg:block) and this state is ignored.
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // The homepage Dinner popup fires this when "Apply now" is tapped: open the
  // (mobile-collapsed) form and scroll it into view.
  useEffect(() => {
    function openForm() {
      setFormOpen(true)
      setTimeout(() => {
        document.getElementById('dinner-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 80)
    }
    window.addEventListener('open-dinner-form', openForm)
    return () => window.removeEventListener('open-dinner-form', openForm)
  }, [])

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await submitDinnerApplication({
      first_name: form.name,
      email: form.email,
      phone: form.phone,
      position: form.profession,
      why_join: form.reason,
    })
    setLoading(false)
    if (result.ok) setSubmitted(true)
    else setError(c.error)
  }

  return (
    <section id="dinner" className="bg-brand-cream py-24 lg:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - info */}
          <div>
            <p className="text-brand-gold font-serif text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4">{c.badge}</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-5">
              {c.title}
            </h2>
            <div className="text-black/60 text-lg leading-relaxed mb-8 space-y-4">
              {c.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="space-y-4">
              {c.items.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-gold mt-2" />
                  <div>
                    <p className="font-semibold text-brand-black text-sm">{item.label}</p>
                    <p className="text-black/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* On phone this toggles the form open/closed; on desktop the form
                is always visible so the button is inert (lg:pointer-events-none). */}
            <button
              type="button"
              onClick={() => setFormOpen((o) => !o)}
              aria-expanded={formOpen}
              className="mt-8 inline-flex items-center gap-3 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl px-5 py-4 lg:pointer-events-none lg:cursor-default"
            >
              <UtensilsCrossed size={20} className="text-brand-gold" strokeWidth={1.5} />
              <span className="text-sm text-brand-black font-medium">{c.applyNow}</span>
              <ChevronDown
                size={18}
                strokeWidth={1.5}
                className={`text-brand-gold lg:hidden transition-transform ${formOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Right - form (collapsed on phone until "Apply now" is tapped) */}
          <div id="dinner-form" className={`${formOpen ? 'block' : 'hidden'} lg:block bg-brand-white rounded-3xl border border-black/8 p-8 shadow-sm scroll-mt-24`}>
            <h3 className="font-serif text-2xl font-bold text-brand-black mb-6">{c.formTitle}</h3>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed size={20} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-xl text-brand-black font-medium mb-2">{c.sentTitle}</p>
                <p className="text-black/50 text-sm">{c.sentDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label={c.fields.name} required placeholder={c.fields.namePh} value={form.name} onChange={(e) => set('name', e.target.value)} />
                <Input label={c.fields.email} type="email" required placeholder="email@juaj.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                <Input label={c.fields.phone} type="tel" placeholder="+355 6X XXX XXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                <Input label={c.fields.profession} placeholder={c.fields.professionPh} value={form.profession} onChange={(e) => set('profession', e.target.value)} />
                <Textarea
                  label={c.fields.reason}
                  required
                  placeholder={c.fields.reasonPh}
                  rows={4}
                  value={form.reason}
                  onChange={(e) => set('reason', e.target.value)}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-black text-brand-white py-3.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50"
                >
                  {loading ? c.submitting : c.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
