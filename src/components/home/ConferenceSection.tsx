'use client'

import { useState } from 'react'
import { Check, Users, ChevronDown } from 'lucide-react'
import { Input, Select, CheckboxGroup, Textarea } from '@/components/ui/FormField'
import { submitEventRegistration } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const CONF_INTERESTS = ['Leadership', 'AI', 'Marketing', 'Finance', 'HR', 'Branding', 'Innovation', 'Entrepreneurship']
const CONF_PARTICIPATION = ['VIP Dinner', 'Workshops', 'Discussion Groups', 'Networking Sessions']

const CONTENT: Record<Lang, {
  badge: string
  title: string
  desc: string
  attendees: string
  popular: string
  tiers: { name: string; badge: string | null; features: string[] }[]
  register: string
  sentTitle: string
  sentDesc: string
  fFirst: string
  fLast: string
  fEmail: string
  fPhone: string
  fCompany: string
  fPosition: string
  fIndustry: string
  fCity: string
  interests: string
  goals: string
  participation: string
  packageLabel: string
  submit: string
  submitting: string
  error: string
}> = {
  en: {
    badge: 'Annual Event',
    title: 'Grow and Inspire Business Conference',
    desc: 'The most important conference for women leaders and entrepreneurs in Albania. International speakers, panel discussions, and real networking opportunities.',
    attendees: '300+ attendees every year',
    popular: 'Most Popular',
    tiers: [
      { name: 'Early Bird', badge: null, features: ['Access to both days', 'Keynotes and panels', 'Smart Talks', 'Conference materials'] },
      { name: 'Standard', badge: 'Most Popular', features: ['Access to both days', 'Keynotes, panels and Smart Talks', 'Discussion groups with experts', 'Networking with attendees'] },
    ],
    register: 'Register',
    sentTitle: 'Registration sent!',
    sentDesc: 'Confirmation and payment details will arrive by email.',
    fFirst: 'First Name', fLast: 'Last Name', fEmail: 'Email', fPhone: 'Phone',
    fCompany: 'Company', fPosition: 'Position', fIndustry: 'Industry', fCity: 'City',
    interests: 'Interests',
    goals: 'Networking Goals - What do you want to achieve at the conference?',
    participation: 'Would you like to take part in:',
    packageLabel: 'Package',
    submit: 'Confirm Registration',
    submitting: 'Sending...',
    error: 'Something went wrong. Please try again.',
  },
  sq: {
    badge: 'Eveniment Vjetor',
    title: 'Grow and Inspire Business Conference',
    desc: 'Konferenca më e rëndësishme për gratë lider dhe sipërmarrëse në Shqipëri. Speaker ndërkombëtarë, panel diskutime, dhe mundësi networking të vërteta.',
    attendees: '300+ pjesëmarrëse çdo vit',
    popular: 'Më Popullor',
    tiers: [
      { name: 'Early Bird', badge: null, features: ['Hyrje në të dyja ditët', 'Keynotes dhe panele', 'Smart Talks', 'Materiale konference'] },
      { name: 'Standard', badge: 'Më Popullor', features: ['Hyrje në të dyja ditët', 'Keynotes, panele dhe Smart Talks', 'Grupet e diskutimit me ekspertë', 'Networking me pjesëmarrëset'] },
    ],
    register: 'Register',
    sentTitle: 'Regjistrimi u dërgua!',
    sentDesc: 'Konfirmimi dhe detajet e pagesës do të vijnë me email.',
    fFirst: 'Emër', fLast: 'Mbiemër', fEmail: 'Email', fPhone: 'Telefon',
    fCompany: 'Kompania', fPosition: 'Pozicioni', fIndustry: 'Industria', fCity: 'Qyteti',
    interests: 'Interests',
    goals: 'Networking Goals - Çfarë kërkoni të arrini në konferencë?',
    participation: 'A dëshironi të merrni pjesë në:',
    packageLabel: 'Paketa',
    submit: 'Konfirmo Regjistrimin',
    submitting: 'Duke dërguar...',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
  },
}

export function ConferenceSection() {
  const { lang } = useI18n()
  const c = CONTENT[lang]

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', position: '', industry: '', city: '', networkingGoals: '', package: '',
  })
  const [interests, setInterests] = useState<string[]>([])
  const [participation, setParticipation] = useState<string[]>([])
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
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      company: form.company,
      position: form.position,
      industry: form.industry,
      city: form.city,
      interests,
      networking_goals: form.networkingGoals,
      participation,
      package: form.package,
    })
    setLoading(false)
    if (result.ok) setSubmitted(true)
    else setError(c.error)
  }

  return (
    <section className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">{c.badge}</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-4">
            {c.title}
          </h2>
          <p className="text-black/60 text-lg max-w-2xl mx-auto">
            {c.desc}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-black/40 text-sm">
            <Users size={14} strokeWidth={1.5} />
            <span>{c.attendees}</span>
          </div>
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 max-w-3xl mx-auto">
          {c.tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 border transition-all ${
                i === 1
                  ? 'bg-brand-black border-brand-gold/30 shadow-xl scale-[1.02]'
                  : 'bg-brand-white border-black/8 hover:border-brand-gold/20'
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-black text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {tier.badge}
                </span>
              )}
              <p className={`font-serif text-2xl font-bold mb-6 ${i === 1 ? 'text-brand-white' : 'text-brand-black'}`}>
                {tier.name}
              </p>
              <ul className="space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className={`mt-0.5 flex-shrink-0 ${i === 1 ? 'text-brand-gold' : 'text-brand-black/40'}`}
                    />
                    <span className={`text-sm ${i === 1 ? 'text-white/70' : 'text-black/60'}`}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto bg-brand-white rounded-3xl border border-black/8 p-8 shadow-sm">
          <button
            type="button"
            onClick={() => setFormOpen((o) => !o)}
            aria-expanded={formOpen}
            className="w-full flex items-center justify-center gap-3 lg:pointer-events-none lg:cursor-default"
          >
            <span className="font-serif text-2xl font-bold text-brand-black">{c.register}</span>
            <ChevronDown
              size={22}
              strokeWidth={1.5}
              className={`text-brand-gold lg:hidden transition-transform ${formOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <div className={`${formOpen ? 'block' : 'hidden'} lg:block mt-6`}>
          {submitted ? (
            <div className="text-center py-8">
              <Check size={32} className="text-brand-gold mx-auto mb-4" strokeWidth={1.5} />
              <p className="font-serif text-xl text-brand-black font-medium mb-2">{c.sentTitle}</p>
              <p className="text-black/50 text-sm">{c.sentDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label={c.fFirst} required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
                <Input label={c.fLast} required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
                <Input label={c.fEmail} type="email" required placeholder="email@juaj.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                <Input label={c.fPhone} type="tel" placeholder="+355 6X XXX XXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                <Input label={c.fCompany} value={form.company} onChange={(e) => set('company', e.target.value)} />
                <Input label={c.fPosition} value={form.position} onChange={(e) => set('position', e.target.value)} />
                <Input label={c.fIndustry} value={form.industry} onChange={(e) => set('industry', e.target.value)} />
                <Input label={c.fCity} value={form.city} onChange={(e) => set('city', e.target.value)} />
              </div>

              <CheckboxGroup label={c.interests} options={CONF_INTERESTS} value={interests} onChange={setInterests} />

              <Textarea label={c.goals} rows={3} value={form.networkingGoals} onChange={(e) => set('networkingGoals', e.target.value)} />

              <CheckboxGroup label={c.participation} options={CONF_PARTICIPATION} value={participation} onChange={setParticipation} />

              <Select
                label={c.packageLabel}
                required
                options={[
                  { label: 'Early Bird', value: 'early-bird' },
                  { label: 'Standard', value: 'standard' },
                ]}
                value={form.package}
                onChange={(e) => set('package', e.target.value)}
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
