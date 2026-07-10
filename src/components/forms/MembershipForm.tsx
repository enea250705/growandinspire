'use client'

import { useState } from 'react'
import { Input, CheckboxGroup } from '@/components/ui/FormField'
import { Check } from 'lucide-react'
import { submitMembershipSignup } from '@/lib/actions/forms'

const INTERESTS = ['Learning Hub', 'Coaching', 'Events', 'Business Conference', 'Dinner with Alketa', 'Idea Tables', 'Community']
const OBJECTIVES = ['Grow my business', 'Leadership', 'Networking', 'Career', 'Personal Development']

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '', profession: '', industry: '', howHeard: '',
}

export function MembershipForm() {
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
    else setError('Ka ndodhur një problem. Ju lutem provoni sërish.')
  }

  if (submitted) {
    return (
      <div className="bg-brand-white rounded-2xl border border-black/8 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-brand-gold" strokeWidth={2} />
        </div>
        <h3 className="font-serif text-2xl font-bold text-brand-black mb-3">Mirë se erdhe në Circle!</h3>
        <p className="text-black/50 max-w-md mx-auto">
          Faleminderit që u bashkove. Ekipi Grow and Inspire do të të kontaktojë me hapat e mëtejshëm.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-brand-white rounded-2xl border border-black/8 overflow-hidden">
      <div className="p-8 border-b border-black/8">
        <h2 className="font-serif text-2xl font-bold text-brand-black mb-1">Join the Circle</h2>
        <p className="text-black/50 text-sm">Bëhu pjesë e komunitetit Grow and Inspire.</p>
      </div>

      <form onSubmit={submit} className="p-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Emër" required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
          <Input label="Mbiemër" required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
          <Input label="Email" required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          <Input label="Telefon" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          <Input label="Profesioni" value={form.profession} onChange={(e) => set('profession', e.target.value)} />
          <Input label="Industria" value={form.industry} onChange={(e) => set('industry', e.target.value)} />
        </div>

        <CheckboxGroup label="Interests" options={INTERESTS} value={interests} onChange={setInterests} />

        <CheckboxGroup label="Objektivi kryesor" options={OBJECTIVES} value={objectives} onChange={setObjectives} />

        <Input label="Si mësuat për Grow and Inspire?" value={form.howHeard} onChange={(e) => set('howHeard', e.target.value)} />

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
          Dua të marr Newsletter.
        </button>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="pt-6 border-t border-black/6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-gold text-brand-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? 'Duke dërguar...' : 'Join NOW'}
          </button>
        </div>
      </form>
    </div>
  )
}
