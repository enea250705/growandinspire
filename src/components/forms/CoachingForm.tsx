'use client'

import { useState } from 'react'
import { Input, Textarea, CheckboxGroup, RadioGroup } from '@/components/ui/FormField'
import { Check } from 'lucide-react'
import { submitCoachingApplication } from '@/lib/actions/forms'

const IMPROVE = ['Leadership', 'Confidence', 'Communication', 'Personal Brand', 'Business Growth', 'Career', 'Decision Making', 'Productivity']
const AVAILABILITY = ['Morning', 'Afternoon', 'Evening']
const COACHING_TYPE = [
  { label: 'Individual', value: 'individual' },
  { label: 'Team', value: 'team' },
]

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '', city: '',
  position: '', company: '', industry: '', experience: '',
  biggestChallenge: '', sixMonthGoal: '', coachingType: '',
}

export function CoachingForm() {
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
    else setError('Ka ndodhur një problem. Ju lutem provoni sërish.')
  }

  if (submitted) {
    return (
      <div className="bg-brand-white rounded-2xl border border-black/8 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-brand-gold" strokeWidth={2} />
        </div>
        <h3 className="font-serif text-2xl font-bold text-brand-black mb-3">Faleminderit për aplikimin.</h3>
        <p className="text-black/50 max-w-md mx-auto">
          Çdo aplikim shqyrtohet personalisht nga ekipi Grow and Inspire. Nëse përzgjidheni, do të merrni një ftesë me hapat e mëtejshëm.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-brand-white rounded-2xl border border-black/8 overflow-hidden">
      <div className="p-8 border-b border-black/8">
        <h2 className="font-serif text-2xl font-bold text-brand-black mb-1">Coaching Application</h2>
        <p className="text-black/50 text-sm">Apliko për coaching individual ose ekipi.</p>
      </div>

      <form onSubmit={submit} className="p-8 flex flex-col gap-10">
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">Personal Information</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Emër" required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
            <Input label="Mbiemër" required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
            <Input label="Email" required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
            <Input label="Telefon" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            <Input label="Qyteti" value={form.city} onChange={(e) => set('city', e.target.value)} />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">Professional</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Pozicioni" value={form.position} onChange={(e) => set('position', e.target.value)} />
            <Input label="Kompania" value={form.company} onChange={(e) => set('company', e.target.value)} />
            <Input label="Industria" value={form.industry} onChange={(e) => set('industry', e.target.value)} />
            <Input label="Eksperienca" value={form.experience} onChange={(e) => set('experience', e.target.value)} placeholder="p.sh. 5 vjet" />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-5">
          <CheckboxGroup label="Çfarë dëshironi të përmirësoni?" options={IMPROVE} value={improveAreas} onChange={setImproveAreas} />
          <Textarea label="Cila është sfida juaj më e madhe aktualisht?" required rows={3} value={form.biggestChallenge} onChange={(e) => set('biggestChallenge', e.target.value)} />
          <Textarea label="Ku dëshironi të jeni pas 6 muajsh?" required rows={3} value={form.sixMonthGoal} onChange={(e) => set('sixMonthGoal', e.target.value)} />
        </fieldset>

        <fieldset className="flex flex-col gap-5">
          <RadioGroup label="Coaching Type" options={COACHING_TYPE} value={form.coachingType} onChange={(v) => set('coachingType', v)} />
          <CheckboxGroup label="Availability" columns={3} options={AVAILABILITY} value={availability} onChange={setAvailability} />
        </fieldset>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="pt-6 border-t border-black/6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? 'Duke dërguar...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
