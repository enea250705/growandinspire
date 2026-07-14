'use client'

import { useState } from 'react'
import { Input, Textarea, CheckboxGroup, RadioGroup } from '@/components/ui/FormField'
import { Check } from 'lucide-react'
import { submitCoachingApplication } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  improve: string[]
  availability: string[]
  coachingTypeOpts: { label: string; value: string }[]
  sentTitle: string
  sentDesc: string
  title: string
  subtitle: string
  personal: string
  professional: string
  first: string
  last: string
  email: string
  phone: string
  city: string
  position: string
  company: string
  industry: string
  experience: string
  experiencePh: string
  improveLabel: string
  challenge: string
  goal: string
  coachingType: string
  availabilityLabel: string
  sending: string
  submit: string
  error: string
}> = {
  en: {
    improve: ['Leadership', 'Confidence', 'Communication', 'Personal Brand', 'Business Growth', 'Career', 'Decision Making', 'Productivity'],
    availability: ['Morning', 'Afternoon', 'Evening'],
    coachingTypeOpts: [{ label: 'Individual', value: 'individual' }, { label: 'Team', value: 'team' }],
    sentTitle: 'Thank you for applying.',
    sentDesc: 'Every application is reviewed personally by the Grow and Inspire team. If selected, you will receive an invitation with the next steps.',
    title: 'Coaching Application',
    subtitle: 'Apply for individual or team coaching.',
    personal: 'Personal Information',
    professional: 'Professional',
    first: 'First Name', last: 'Last Name', email: 'Email', phone: 'Phone', city: 'City',
    position: 'Position', company: 'Company', industry: 'Industry',
    experience: 'Experience', experiencePh: 'e.g. 5 years',
    improveLabel: 'What would you like to improve?',
    challenge: 'What is your biggest challenge right now?',
    goal: 'Where do you want to be in 6 months?',
    coachingType: 'Coaching Type',
    availabilityLabel: 'Availability',
    sending: 'Sending...',
    submit: 'Submit',
    error: 'Something went wrong. Please try again.',
  },
  sq: {
    improve: ['Lidership', 'Vetëbesim', 'Komunikim', 'Personal Brand', 'Rritje Biznesi', 'Karrierë', 'Vendimmarrje', 'Produktivitet'],
    availability: ['Mëngjes', 'Pasdite', 'Mbrëmje'],
    coachingTypeOpts: [{ label: 'Individual', value: 'individual' }, { label: 'Ekip', value: 'team' }],
    sentTitle: 'Faleminderit për aplikimin.',
    sentDesc: 'Çdo aplikim shqyrtohet personalisht nga ekipi Grow and Inspire. Nëse përzgjidheni, do të merrni një ftesë me hapat e mëtejshëm.',
    title: 'Coaching Application',
    subtitle: 'Apliko për coaching individual ose ekipi.',
    personal: 'Informacion Personal',
    professional: 'Profesionale',
    first: 'Emër', last: 'Mbiemër', email: 'Email', phone: 'Telefon', city: 'Qyteti',
    position: 'Pozicioni', company: 'Kompania', industry: 'Industria',
    experience: 'Eksperienca', experiencePh: 'p.sh. 5 vjet',
    improveLabel: 'Çfarë dëshironi të përmirësoni?',
    challenge: 'Cila është sfida juaj më e madhe aktualisht?',
    goal: 'Ku dëshironi të jeni pas 6 muajsh?',
    coachingType: 'Lloji i Coaching-ut',
    availabilityLabel: 'Disponueshmëria',
    sending: 'Duke dërguar...',
    submit: 'Dërgo',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
  },
}

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '', city: '',
  position: '', company: '', industry: '', experience: '',
  biggestChallenge: '', sixMonthGoal: '', coachingType: '',
}

export function CoachingForm() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const [form, setForm] = useState(EMPTY)
  const [improveAreas, setImproveAreas] = useState<string[]>([])
  const [availability, setAvailability] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(field: keyof typeof EMPTY, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await submitCoachingApplication({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      city: form.city,
      position: form.position,
      company: form.company,
      industry: form.industry,
      experience: form.experience,
      improve_areas: improveAreas,
      biggest_challenge: form.biggestChallenge,
      six_month_goal: form.sixMonthGoal,
      coaching_type: form.coachingType,
      availability,
    })
    setLoading(false)
    if (result.ok) setSubmitted(true)
    else setError(c.error)
  }

  if (submitted) {
    return (
      <div className="bg-brand-white rounded-2xl border border-black/8 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-brand-gold" strokeWidth={2} />
        </div>
        <h3 className="font-serif text-2xl font-bold text-brand-black mb-3">{c.sentTitle}</h3>
        <p className="text-black/50 max-w-md mx-auto">
          {c.sentDesc}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-brand-white rounded-2xl border border-black/8 overflow-hidden">
      <div className="p-8 border-b border-black/8">
        <h2 className="font-serif text-2xl font-bold text-brand-black mb-1">{c.title}</h2>
        <p className="text-black/50 text-sm">{c.subtitle}</p>
      </div>

      <form onSubmit={submit} className="p-8 flex flex-col gap-10">
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">{c.personal}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label={c.first} required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
            <Input label={c.last} required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
            <Input label={c.email} required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
            <Input label={c.phone} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            <Input label={c.city} value={form.city} onChange={(e) => set('city', e.target.value)} />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">{c.professional}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label={c.position} value={form.position} onChange={(e) => set('position', e.target.value)} />
            <Input label={c.company} value={form.company} onChange={(e) => set('company', e.target.value)} />
            <Input label={c.industry} value={form.industry} onChange={(e) => set('industry', e.target.value)} />
            <Input label={c.experience} value={form.experience} onChange={(e) => set('experience', e.target.value)} placeholder={c.experiencePh} />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-5">
          <CheckboxGroup label={c.improveLabel} options={c.improve} value={improveAreas} onChange={setImproveAreas} />
          <Textarea label={c.challenge} required rows={3} value={form.biggestChallenge} onChange={(e) => set('biggestChallenge', e.target.value)} />
          <Textarea label={c.goal} required rows={3} value={form.sixMonthGoal} onChange={(e) => set('sixMonthGoal', e.target.value)} />
        </fieldset>

        <fieldset className="flex flex-col gap-5">
          <RadioGroup label={c.coachingType} options={c.coachingTypeOpts} value={form.coachingType} onChange={(v) => set('coachingType', v)} />
          <CheckboxGroup label={c.availabilityLabel} columns={3} options={c.availability} value={availability} onChange={setAvailability} />
        </fieldset>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="pt-6 border-t border-black/6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? c.sending : c.submit}
          </button>
        </div>
      </form>
    </div>
  )
}
