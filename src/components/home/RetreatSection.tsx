'use client'

import { useState } from 'react'
import { Mountain, Brain, TrendingUp, Heart, Users, Compass, ChevronDown } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/FormField'
import { submitEventRegistration } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const THEME_ICONS = [TrendingUp, Brain, Heart, Users, Compass, Mountain]

const CONTENT: Record<Lang, {
  badge: string
  title: string
  desc: string[]
  formats: { name: string; hours: string; spots: string; desc: string }[]
  themesLabel: string
  themes: { label: string; desc: string }[]
  teamLabel: string
  roles: string[]
  teamNote: string
  whyLabel: string
  why: { q: string; a: string }[]
  stats: { num: string; label: string }[]
  formTitle: string
  formNote: string
  sentTitle: string
  sentDesc: string
  fName: string
  fNamePh: string
  fEmail: string
  fPhone: string
  fFormat: string
  formatOptions: { label: string; value: string }[]
  fTheme: string
  themeOptions: { label: string; value: string }[]
  fMessage: string
  fMessagePh: string
  submit: string
  submitting: string
  error: string
}> = {
  en: {
    badge: 'Retreats',
    title: 'The best decisions are rarely made in the middle of the noise.',
    desc: [
      'Sometimes, the most powerful step forward is taking a step back.',
      'Grow & Inspire Retreats are carefully curated experiences designed for entrepreneurs, leaders and professionals who want to pause, reflect and reconnect with what truly matters. Through inspiring conversations, coaching sessions, workshops, mindfulness practices and meaningful connections, each retreat creates the space to gain clarity, restore energy and return with a stronger vision for life, leadership and business.',
      'Because when your mind is clear, your next move becomes obvious.',
    ],
    formats: [
      { name: 'One-Day Retreat', hours: '8-10 hours', spots: 'up to 20 seats', desc: 'A deep dive into a single theme. Ideal for recalibration and clarity.' },
      { name: 'Two-Day Retreat', hours: '2 days / 1 night', spots: 'up to 15 seats', desc: 'A transformative experience - reflection, coaching, mindfulness and concrete steps.' },
      { name: 'Thematic Retreat', hours: 'Custom format', spots: 'up to 12 seats', desc: 'A special focus. Fully curated to the needs of the group or organization.' },
    ],
    themesLabel: 'Themes',
    themes: [
      { label: 'Leadership and Business', desc: 'Strategic clarity, decision-making, founder energy.' },
      { label: 'Clarity and Mindset', desc: 'Remove blocks, clarify goals, rebuild perspective.' },
      { label: 'Wellbeing and Energy', desc: 'Burnout prevention, emotional balance, somatic approach.' },
      { label: 'Communication and Brand', desc: 'Personal brand, presence, authentic communication.' },
      { label: 'Transition Moments', desc: 'Key life and career milestones - conscious decisions.' },
      { label: 'Team and Organization', desc: 'Corporate retreat for teams and leaders.' },
    ],
    teamLabel: 'Leading Team',
    roles: ['Business Coach', 'Wellbeing and Somatic Coach', 'Psychologist', 'Mindfulness Facilitator', 'Communication Expert', 'Business Mentor'],
    teamNote: 'Each retreat is led by 1-3 experts selected by theme, with a team curated by Alketa Vejsiu.',
    whyLabel: 'Why a Retreat?',
    why: [
      { q: 'Different from a conference', a: 'More personal, more selective, more transformative. It does not just inspire - it changes.' },
      { q: 'Clarity and Concrete Steps', a: 'You leave with conscious decisions and a clear development plan.' },
      { q: 'Blocks and Breakthroughs', a: 'You identify what stops you and work on it directly.' },
      { q: 'A Closed Community', a: 'Authentic connections with individuals of similar level, vision and ambition.' },
    ],
    stats: [
      { num: '12-20', label: 'Seats / Retreat' },
      { num: '360°', label: 'Holistic Development' },
      { num: '100%', label: 'Premium Experience' },
    ],
    formTitle: 'Register for the Interest List',
    formNote: 'Limited seats. Be the first to know when registration opens.',
    sentTitle: 'Thank you!',
    sentDesc: 'You will be notified as soon as we open registration for the next retreat.',
    fName: 'Full Name', fNamePh: 'Your full name',
    fEmail: 'Email', fPhone: 'Phone Number',
    fFormat: 'Format you are interested in',
    formatOptions: [
      { label: 'One-Day Retreat', value: '1-day' },
      { label: 'Two-Day Retreat', value: '2-day' },
      { label: 'Thematic / Corporate Retreat', value: 'thematic' },
    ],
    fTheme: 'Preferred theme',
    themeOptions: [
      { label: 'Leadership and Business', value: 'leadership' },
      { label: 'Clarity and Mindset', value: 'clarity' },
      { label: 'Wellbeing and Energy', value: 'wellbeing' },
      { label: 'Communication and Personal Brand', value: 'brand' },
      { label: 'Transition Moments', value: 'transition' },
      { label: 'Corporate Retreat', value: 'corporate' },
    ],
    fMessage: 'What are you looking for from this retreat?',
    fMessagePh: 'Briefly share where you are and what you want to achieve...',
    submit: 'Register for the Interest List',
    submitting: 'Sending...',
    error: 'Something went wrong. Please try again.',
  },
  sq: {
    badge: 'Retreats',
    title: 'Vendimet më të mira rrallë merren në mes të zhurmës.',
    desc: [
      'Ndonjëherë, mënyra më e mirë për të ecur përpara është të ndalosh për një moment.',
      'Grow & Inspire Retreats janë eksperienca të kuruara për sipërmarrës, drejtues dhe profesionistë që duan të largohen nga ritmi i përditshëm për të reflektuar, për të fituar qartësi dhe për t\'u rikthyer me energji dhe drejtim të ri. Përmes bisedave frymëzuese, sesioneve të coaching-ut, workshopeve praktike, aktiviteteve të mindfulness dhe networking-ut me njerëz që ndajnë të njëjtat ambicie, çdo retreat krijon hapësirën për të menduar ndryshe, për të marrë vendime më të mira dhe për të ndërtuar një vizion më të qartë për jetën, lidershipin dhe biznesin.',
      'Sepse kur ke qartësi, çdo hap bëhet më i sigurt.',
    ],
    formats: [
      { name: 'Retreat Njëditor', hours: '8-10 orë', spots: 'deri 20 vende', desc: 'Zhytje e thellë në një temë të vetme. Ideal për rikalibrim dhe qartësi.' },
      { name: 'Retreat Dyditor', hours: '2 ditë / 1 natë', spots: 'deri 15 vende', desc: 'Eksperiencë transformuese - reflektim, coaching, mindfulness dhe hapa konkretë.' },
      { name: 'Retreat Tematik', hours: 'Format i personalizuar', spots: 'deri 12 vende', desc: 'Fokus i posaçëm. Kuruar tërësisht sipas nevojave të grupit ose organizatës.' },
    ],
    themesLabel: 'Tematika',
    themes: [
      { label: 'Lidership dhe Biznes', desc: 'Qartësi strategjike, vendimmarrje, founder energy.' },
      { label: 'Clarity dhe Mindset', desc: 'Heq bllokimet, qartëso qëllimet, rikonstrukto perspektivën.' },
      { label: 'Wellbeing dhe Energji', desc: 'Burnout prevention, balancë emocionale, qasje somatike.' },
      { label: 'Komunikim dhe Brand', desc: 'Personal brand, prezencë, komunikim autentik.' },
      { label: 'Transition Moments', desc: 'Piketa kyçe jete e karriere - vendime të vetëdijshme.' },
      { label: 'Ekip dhe Organizatë', desc: 'Retreat korporativ për ekipe dhe drejtues.' },
    ],
    teamLabel: 'Ekipi Udhëheqës',
    roles: ['Business Coach', 'Wellbeing and Somatic Coach', 'Psikolog', 'Facilitator Mindfulness', 'Ekspert Komunikimi', 'Mentor Biznesi'],
    teamNote: 'Çdo retreat udhëhiqet nga 1-3 ekspertë të zgjedhur sipas temës, me ekip të kuruar nga Alketa Vejsiu.',
    whyLabel: 'Pse Retreat?',
    why: [
      { q: 'Ndryshe nga konferenca', a: 'Më personal, më i përzgjedhur, më transformues. Nuk inspiron vetëm - ndryshon.' },
      { q: 'Qartësi dhe Hapa Konkretë', a: 'Del me vendime të vetëdijshme dhe një plan të qartë zhvillimi.' },
      { q: 'Bllokime dhe Breakthrough', a: 'Identifikon çfarë të ndalon dhe punon drejtpërdrejt mbi të.' },
      { q: 'Komunitet i Mbyllur', a: 'Lidhje autentike me individë me nivel, vizion dhe ambicie të ngjashme.' },
    ],
    stats: [
      { num: '12-20', label: 'Vende / Retreat' },
      { num: '360°', label: 'Zhvillim Holistik' },
      { num: '100%', label: 'Eksperiencë Premium' },
    ],
    formTitle: 'Regjistrohu për Interest List',
    formNote: 'Vende të kufizuara. Njoftohesh i/e pari kur hapim regjistrimin.',
    sentTitle: 'Faleminderit!',
    sentDesc: 'Do të njoftohesh sapo hapim regjistrim për retreat-in tjetër.',
    fName: 'Emri dhe Mbiemri', fNamePh: 'Emri juaj i plotë',
    fEmail: 'Email', fPhone: 'Numri i Telefonit',
    fFormat: 'Formati që ju intereson',
    formatOptions: [
      { label: 'Retreat Njëditor', value: '1-day' },
      { label: 'Retreat Dyditor', value: '2-day' },
      { label: 'Retreat Tematik / Korporativ', value: 'thematic' },
    ],
    fTheme: 'Tematika e preferuar',
    themeOptions: [
      { label: 'Lidership dhe Biznes', value: 'leadership' },
      { label: 'Clarity dhe Mindset', value: 'clarity' },
      { label: 'Wellbeing dhe Energji', value: 'wellbeing' },
      { label: 'Komunikim dhe Personal Brand', value: 'brand' },
      { label: 'Transition Moments', value: 'transition' },
      { label: 'Retreat Korporativ', value: 'corporate' },
    ],
    fMessage: 'Çfarë kërkoni nga ky retreat?',
    fMessagePh: 'Ndani shkurtimisht ku ndodheni dhe çfarë dëshironi të arrini...',
    submit: 'Regjistrohu për Interest List',
    submitting: 'Duke dërguar...',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
  },
}

export function RetreatSection() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const [form, setForm] = useState({ name: '', email: '', phone: '', format: '', theme: '', message: '' })
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
    const result = await submitEventRegistration({
      first_name: form.name,
      email: form.email,
      phone: form.phone,
      networking_goals: `format:${form.format} theme:${form.theme} message:${form.message}`,
    })
    setLoading(false)
    if (result.ok) setSubmitted(true)
    else setError(c.error)
  }

  return (
    <section className="bg-brand-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mb-20">
          <p className="text-brand-gold font-serif text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4">{c.badge}</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-white mb-5">
            {c.title}
          </h2>
          <div className="text-white/60 text-lg leading-relaxed space-y-4">
            {c.desc.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        {/* Formats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {c.formats.map((f, i) => (
            <div
              key={f.name}
              className={`rounded-2xl p-6 border ${
                i === 1
                  ? 'bg-brand-gold/10 border-brand-gold/40'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${i === 1 ? 'text-brand-gold' : 'text-white/40'}`}>
                {f.hours} · {f.spots}
              </p>
              <h3 className="font-serif text-xl text-brand-white font-medium mb-2">{f.name}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Themes */}
        <div className="mb-20">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">{c.themesLabel}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {c.themes.map((theme, i) => {
              const Icon = THEME_ICONS[i]
              return (
                <div key={theme.label} className="group bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-brand-gold/30 hover:bg-white/8 transition-all">
                  <Icon size={18} className="text-brand-gold mb-3" strokeWidth={1.5} />
                  <p className="text-brand-white text-sm font-semibold mb-1">{theme.label}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{theme.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-20">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">{c.teamLabel}</p>
          <div className="flex flex-wrap gap-3">
            {c.roles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {role}
              </span>
            ))}
          </div>
          <p className="text-white/40 text-sm mt-4">
            {c.teamNote}
          </p>
        </div>

        {/* Stats + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-6">{c.whyLabel}</p>
            <div className="space-y-5">
              {c.why.map((item) => (
                <div key={item.q} className="flex gap-4">
                  <div className="flex-shrink-0 w-1 h-full min-h-[4px] bg-brand-gold rounded-full mt-1.5" />
                  <div>
                    <p className="text-brand-white text-sm font-semibold mb-0.5">{item.q}</p>
                    <p className="text-white/50 text-sm">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              {c.stats.map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <p className="font-serif text-2xl text-brand-gold font-bold mb-1">{s.num}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-brand-dark rounded-3xl border border-white/10 p-8">
            <button
              type="button"
              onClick={() => setFormOpen((o) => !o)}
              aria-expanded={formOpen}
              className="w-full flex items-start justify-between gap-4 text-left lg:pointer-events-none lg:cursor-default"
            >
              <span>
                <span className="block font-serif text-lg sm:text-xl lg:text-2xl font-bold text-brand-white mb-2">{c.formTitle}</span>
                <span className="block text-white/40 text-sm">{c.formNote}</span>
              </span>
              <ChevronDown
                size={22}
                strokeWidth={1.5}
                className={`text-brand-gold shrink-0 mt-1 lg:hidden transition-transform ${formOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div className={`${formOpen ? 'block' : 'hidden'} lg:block mt-6`}>
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mountain size={20} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-xl text-brand-white font-medium mb-2">{c.sentTitle}</p>
                <p className="text-white/40 text-sm">{c.sentDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input dark label={c.fName} required placeholder={c.fNamePh} value={form.name} onChange={(e) => set('name', e.target.value)} />
                <Input dark label={c.fEmail} type="email" required placeholder="email@juaj.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                <Input dark label={c.fPhone} type="tel" placeholder="+355 6X XXX XXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                <Select
                  dark
                  label={c.fFormat}
                  required
                  options={c.formatOptions}
                  value={form.format}
                  onChange={(e) => set('format', e.target.value)}
                />
                <Select
                  dark
                  label={c.fTheme}
                  options={c.themeOptions}
                  value={form.theme}
                  onChange={(e) => set('theme', e.target.value)}
                />
                <Textarea
                  dark
                  label={c.fMessage}
                  placeholder={c.fMessagePh}
                  rows={3}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                />
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-gold text-brand-black py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50"
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
