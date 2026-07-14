'use client'

import { useState } from 'react'
import { Lightbulb, TrendingUp, ChevronDown } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/FormField'
import { submitApplication } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  badge: string
  title: string
  intro: string
  feat: { title: string; desc: string }[]
  themesLabel: string
  themes: string[]
  howLabel: string
  steps: { step: string; label: string; desc: string }[]
  criteriaLabel: string
  criteria: string[]
  formTitle: string
  sentTitle: string
  sentDesc: string
  fName: string
  fNamePh: string
  fEmail: string
  fPhone: string
  fProject: string
  fProjectPh: string
  fPhase: string
  phaseOptions: { label: string; value: string }[]
  fDesc: string
  fDescPh: string
  submit: string
  submitting: string
  error: string
}> = {
  en: {
    badge: 'Investment Opportunity',
    title: 'Ideas and Angel Investor',
    intro: 'Have a business idea with potential? Grow and Inspire connects talented entrepreneurs with angel investors and strategic mentors. If you have vision and determination - we have the network and the resources.',
    feat: [
      { title: 'Pitch and Feedback', desc: 'Present your idea to our panel and get valuable feedback from industry experts.' },
      { title: 'Connections with Investors', desc: 'Selected projects are presented directly to angel investors and partner foundations.' },
    ],
    themesLabel: 'Idea Tables Themes',
    themes: ['New Business Ideas', 'Women with Ideas', 'Creative Ideas and Media', 'Lifestyle and Wellbeing', 'Education and Youth Projects', 'From Idea to First Client'],
    howLabel: 'How It Works',
    steps: [
      { step: '1', label: 'Apply', desc: 'Send your idea' },
      { step: '2', label: 'Selection', desc: 'We choose participants' },
      { step: '3', label: 'Idea Table', desc: 'Work with experts' },
      { step: '4', label: 'Feedback', desc: 'Next steps' },
    ],
    criteriaLabel: 'Basic Criteria',
    criteria: ['Original idea with clear impact', 'Female owner or female co-founder', 'Identified market and growth potential', 'Readiness for 3-6 months of mentorship'],
    formTitle: 'Send Your Idea',
    sentTitle: 'Idea sent!',
    sentDesc: 'Our team will review it and get in touch within 5 business days.',
    fName: 'Full Name', fNamePh: 'Your full name',
    fEmail: 'Email', fPhone: 'Phone Number',
    fProject: 'Project / Startup Name', fProjectPh: 'The name of your idea',
    fPhase: 'Project Phase',
    phaseOptions: [
      { label: 'Idea - not yet started', value: 'idea' },
      { label: 'Prototype / MVP', value: 'mvp' },
      { label: 'Active business (under 1 year)', value: 'early' },
      { label: 'Growing business (1+ year)', value: 'growth' },
    ],
    fDesc: 'Describe your idea',
    fDescPh: 'What problem does it solve? Who is the market? Why now?...',
    submit: 'Send Application',
    submitting: 'Sending...',
    error: 'Something went wrong. Please try again.',
  },
  sq: {
    badge: 'Mundësi Investimi',
    title: 'Ideas and Angel Investor',
    intro: 'Ke një ide biznesi me potencial? Grow and Inspire lidh sipërmarrëset e talentuar me investitorë angjell dhe mentorë strategjik. Nëse ke vizion dhe vendosmëri - ne kemi rrjetin dhe burimet.',
    feat: [
      { title: 'Pitch dhe Feedback', desc: 'Prezanto idenë tënde para panelit tonë dhe merr feedback të vlefshëm nga ekspertë të industrisë.' },
      { title: 'Lidhje me Investitorë', desc: 'Projektet e zgjedhura prezantohen drejtpërdrejt me investitorë angjell dhe fondacionet partnere.' },
    ],
    themesLabel: 'Tematikat e Idea Tables',
    themes: ['Ide të Reja Biznesi', 'Gra me Ide', 'Ide Kreative dhe Media', 'Lifestyle dhe Wellbeing', 'Edukim dhe Projekte Rinore', 'Nga Ideja te Klienti i Parë'],
    howLabel: 'Si Funksionon',
    steps: [
      { step: '1', label: 'Apliko', desc: 'Dërgo idenë tënde' },
      { step: '2', label: 'Përzgjedhja', desc: 'Zgjedhim pjesëmarrëset' },
      { step: '3', label: 'Idea Table', desc: 'Puno me ekspertë' },
      { step: '4', label: 'Feedback', desc: 'Hapat e ardhshëm' },
    ],
    criteriaLabel: 'Kritere Bazë',
    criteria: ['Ide origjinale me impakt të qartë', 'Pronare femër ose ko-themeluese femër', 'Treg i identifikuar dhe potencial rritjeje', 'Gatishmëri për mentorship 3-6 muaj'],
    formTitle: 'Dërgo Idenë Tënde',
    sentTitle: 'Ideja u dërgua!',
    sentDesc: 'Ekipi ynë do ta shqyrtojë dhe do të kontaktojë brenda 5 ditëve pune.',
    fName: 'Emri dhe Mbiemri', fNamePh: 'Emri juaj i plotë',
    fEmail: 'Email', fPhone: 'Numri i Telefonit',
    fProject: 'Emri i Projektit / Startup', fProjectPh: 'Emri i idesë suaj',
    fPhase: 'Faza e Projektit',
    phaseOptions: [
      { label: 'Ide - ende pa filluar', value: 'idea' },
      { label: 'Prototip / MVP', value: 'mvp' },
      { label: 'Biznes aktiv (nën 1 vit)', value: 'early' },
      { label: 'Biznes në rritje (1+ vit)', value: 'growth' },
    ],
    fDesc: 'Përshkruaj idenë tënde',
    fDescPh: 'Çfarë problem zgjidh? Kush është tregu? Pse tani?...',
    submit: 'Dërgo Aplikimin',
    submitting: 'Duke dërguar...',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
  },
}

export function AngelInvestorSection() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const [form, setForm] = useState({ name: '', email: '', phone: '', project: '', phase: '', description: '' })
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await submitApplication({
      type: 'investment',
      name: form.name,
      email: form.email,
      payload: {
        phone: form.phone,
        project: form.project,
        phase: form.phase,
        description: form.description,
      },
    })
    setLoading(false)
    if (result.ok) setSubmitted(true)
    else setError(c.error)
  }

  const featIcons = [Lightbulb, TrendingUp]

  return (
    <section className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - info */}
          <div>
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">{c.badge}</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-6">
              {c.title}
            </h2>
            <p className="text-black/60 text-lg leading-relaxed mb-8">
              {c.intro}
            </p>

            <div className="space-y-6 mb-8">
              {c.feat.map((f, i) => {
                const Icon = featIcons[i]
                return (
                  <div key={f.title} className="flex gap-5">
                    <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                      <Icon size={18} className="text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-black mb-1">{f.title}</p>
                      <p className="text-black/50 text-sm">{f.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Idea Tables themes */}
            <div className="mb-8">
              <p className="text-black/40 text-xs uppercase tracking-widest mb-4">{c.themesLabel}</p>
              <div className="flex flex-wrap gap-2">
                {c.themes.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center bg-brand-gold/10 border border-brand-gold/25 text-brand-gold-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Process steps */}
            <div className="mb-8">
              <p className="text-black/40 text-xs uppercase tracking-widest mb-4">{c.howLabel}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {c.steps.map((s) => (
                  <div key={s.step} className="bg-brand-white rounded-2xl border border-black/8 p-4 text-center">
                    <span className="font-serif text-brand-gold text-xl font-bold block mb-1">{s.step}</span>
                    <p className="text-brand-black text-xs font-semibold">{s.label}</p>
                    <p className="text-black/40 text-xs mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-black rounded-2xl p-6">
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-2">{c.criteriaLabel}</p>
              <ul className="text-white/60 text-sm space-y-2">
                {c.criteria.map((cr) => (
                  <li key={cr} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                    {cr}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - form */}
          <div className="bg-brand-white rounded-3xl border border-black/8 p-8 shadow-sm">
            <button
              type="button"
              onClick={() => setFormOpen((o) => !o)}
              aria-expanded={formOpen}
              className="w-full flex items-center justify-between gap-4 text-left lg:pointer-events-none lg:cursor-default"
            >
              <span className="font-serif text-2xl font-bold text-brand-black">{c.formTitle}</span>
              <ChevronDown
                size={22}
                strokeWidth={1.5}
                className={`text-brand-gold shrink-0 lg:hidden transition-transform ${formOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div className={`${formOpen ? 'block' : 'hidden'} lg:block mt-6`}>
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb size={20} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-xl text-brand-black font-medium mb-2">{c.sentTitle}</p>
                <p className="text-black/50 text-sm">{c.sentDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label={c.fName} required placeholder={c.fNamePh} value={form.name} onChange={(e) => set('name', e.target.value)} />
                <Input label={c.fEmail} type="email" required placeholder="email@juaj.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                <Input label={c.fPhone} type="tel" placeholder="+355 6X XXX XXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                <Input label={c.fProject} required placeholder={c.fProjectPh} value={form.project} onChange={(e) => set('project', e.target.value)} />
                <Select
                  label={c.fPhase}
                  required
                  options={c.phaseOptions}
                  value={form.phase}
                  onChange={(e) => set('phase', e.target.value)}
                />
                <Textarea
                  label={c.fDesc}
                  required
                  placeholder={c.fDescPh}
                  rows={4}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
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
      </div>
    </section>
  )
}
