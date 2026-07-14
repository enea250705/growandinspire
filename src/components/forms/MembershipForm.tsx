'use client'

import { useState } from 'react'
import { Input, CheckboxGroup } from '@/components/ui/FormField'
import { Check } from 'lucide-react'
import { submitMembershipSignup } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const INTERESTS = ['Learning Hub', 'Coaching', 'Events', 'Business Conference', 'Dinner with Alketa', 'Idea Tables', 'Community']

const CONTENT: Record<Lang, {
  objectives: string[]
  sentTitle: string
  sentDesc: string
  title: string
  subtitle: string
  first: string
  last: string
  email: string
  phone: string
  profession: string
  industry: string
  interests: string
  objective: string
  howHeard: string
  newsletter: string
  sending: string
  join: string
  error: string
}> = {
  en: {
    objectives: ['Grow my business', 'Leadership', 'Networking', 'Career', 'Personal Development'],
    sentTitle: 'Welcome to the Circle!',
    sentDesc: 'Thank you for joining. The Grow and Inspire team will contact you with the next steps.',
    title: 'Join the Circle',
    subtitle: 'Become part of the Grow and Inspire community.',
    first: 'First Name', last: 'Last Name', email: 'Email', phone: 'Phone',
    profession: 'Profession', industry: 'Industry',
    interests: 'Interests',
    objective: 'Main objective',
    howHeard: 'How did you hear about Grow and Inspire?',
    newsletter: 'I want to receive the Newsletter.',
    sending: 'Sending...',
    join: 'Join NOW',
    error: 'Something went wrong. Please try again.',
  },
  sq: {
    objectives: ['Rrit biznesin tim', 'Lidership', 'Networking', 'Karrierë', 'Zhvillim Personal'],
    sentTitle: 'Mirë se erdhe në Circle!',
    sentDesc: 'Faleminderit që u bashkove. Ekipi Grow and Inspire do të të kontaktojë me hapat e mëtejshëm.',
    title: 'Join the Circle',
    subtitle: 'Bëhu pjesë e komunitetit Grow and Inspire.',
    first: 'Emër', last: 'Mbiemër', email: 'Email', phone: 'Telefon',
    profession: 'Profesioni', industry: 'Industria',
    interests: 'Interests',
    objective: 'Objektivi kryesor',
    howHeard: 'Si mësuat për Grow and Inspire?',
    newsletter: 'Dua të marr Newsletter.',
    sending: 'Duke dërguar...',
    join: 'Join NOW',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
  },
}

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '', profession: '', industry: '', howHeard: '',
}

export function MembershipForm() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const [form, setForm] = useState(EMPTY)
  const [interests, setInterests] = useState<string[]>([])
  const [objectives, setObjectives] = useState<string[]>([])
  const [newsletter, setNewsletter] = useState(false)
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
    const result = await submitMembershipSignup({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      profession: form.profession,
      industry: form.industry,
      interests,
      main_objective: objectives,
      how_heard: form.howHeard,
      newsletter,
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

      <form onSubmit={submit} className="p-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label={c.first} required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
          <Input label={c.last} required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
          <Input label={c.email} required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          <Input label={c.phone} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          <Input label={c.profession} value={form.profession} onChange={(e) => set('profession', e.target.value)} />
          <Input label={c.industry} value={form.industry} onChange={(e) => set('industry', e.target.value)} />
        </div>

        <CheckboxGroup label={c.interests} options={INTERESTS} value={interests} onChange={setInterests} />

        <CheckboxGroup label={c.objective} options={c.objectives} value={objectives} onChange={setObjectives} />

        <Input label={c.howHeard} value={form.howHeard} onChange={(e) => set('howHeard', e.target.value)} />

        <button
          type="button"
          onClick={() => setNewsletter((v) => !v)}
          className="flex items-center gap-2.5 text-sm text-brand-black text-left"
        >
          <span
            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border ${
              newsletter ? 'border-brand-gold bg-brand-gold' : 'border-black/25'
            }`}
          >
            {newsletter && <Check size={13} strokeWidth={3} className="text-brand-black" />}
          </span>
          {c.newsletter}
        </button>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="pt-6 border-t border-black/6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-gold text-brand-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? c.sending : c.join}
          </button>
        </div>
      </form>
    </div>
  )
}
