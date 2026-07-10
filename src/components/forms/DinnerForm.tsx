'use client'

import { useState } from 'react'
import { Input, Textarea, CheckboxGroup, RadioGroup } from '@/components/ui/FormField'
import { Check } from 'lucide-react'
import { submitDinnerApplication } from '@/lib/actions/forms'

const CHALLENGES = ['Growth', 'Team', 'Leadership', 'Finance', 'Scaling', 'Marketing', 'International Expansion', 'Other']
const NETWORKING = ['CEO', 'Founders', 'Investors', 'Creatives', 'Executives', 'Women Leaders', 'Startup Founders']
const EMPLOYEES = [
  { label: '1-10', value: '1-10' },
  { label: '11-50', value: '11-50' },
  { label: '51-100', value: '51-100' },
  { label: '100+', value: '100+' },
]

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '',
  company: '', website: '', industry: '', position: '', foundingYear: '', employeeCount: '', annualRevenue: '',
  businessDescription: '',
  whyJoin: '', questionForAlketa: '', whatYouBring: '', expectations: '',
  linkedin: '', instagram: '', socialWebsite: '',
}

export function DinnerForm() {
  const [form, setForm] = useState(EMPTY)
  const [challenges, setChallenges] = useState<string[]>([])
  const [networking, setNetworking] = useState<string[]>([])
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
    const result = await submitDinnerApplication({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      company: form.company,
      website: form.website,
      industry: form.industry,
      position: form.position,
      founding_year: form.foundingYear,
      employee_count: form.employeeCount,
      annual_revenue: form.annualRevenue,
      business_description: form.businessDescription,
      challenges,
      why_join: form.whyJoin,
      question_for_alketa: form.questionForAlketa,
      what_you_bring: form.whatYouBring,
      networking_types: networking,
      expectations: form.expectations,
      linkedin: form.linkedin,
      instagram: form.instagram,
      website_link: form.socialWebsite,
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
        <h2 className="font-serif text-2xl font-bold text-brand-black mb-1">Dinner with Alketa</h2>
        <p className="text-black/50 text-sm">Çdo aplikim shqyrtohet personalisht nga ekipi.</p>
      </div>

      <form onSubmit={submit} className="p-8 flex flex-col gap-10">
        {/* Personal */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">Personal</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Emër" required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
            <Input label="Mbiemër" required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
            <Input label="Email" required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
            <Input label="Telefon" required type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </div>
        </fieldset>

        {/* Business */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">Business</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Emri i kompanisë" value={form.company} onChange={(e) => set('company', e.target.value)} />
            <Input label="Website" value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://..." />
            <Input label="Industria" value={form.industry} onChange={(e) => set('industry', e.target.value)} />
            <Input label="Pozicioni juaj" value={form.position} onChange={(e) => set('position', e.target.value)} />
            <Input label="Viti i themelimit" value={form.foundingYear} onChange={(e) => set('foundingYear', e.target.value)} placeholder="p.sh. 2019" />
            <Input label="Xhiro vjetore (opsionale)" value={form.annualRevenue} onChange={(e) => set('annualRevenue', e.target.value)} />
          </div>
          <RadioGroup
            label="Numri i punonjësve"
            columns={4}
            options={EMPLOYEES}
            value={form.employeeCount}
            onChange={(v) => set('employeeCount', v)}
          />
        </fieldset>

        {/* About your business */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">About Your Business</legend>
          <Textarea
            label="Përshkruani shkurtimisht biznesin tuaj."
            rows={4}
            maxLength={500}
            value={form.businessDescription}
            onChange={(e) => set('businessDescription', e.target.value)}
            placeholder="Max 500 karaktere"
          />
          <p className="text-xs text-black/35 -mt-3">{form.businessDescription.length}/500</p>
        </fieldset>

        {/* Leadership */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">Leadership</legend>
          <CheckboxGroup
            label="Cila është sfida juaj më e madhe aktualisht?"
            options={CHALLENGES}
            value={challenges}
            onChange={setChallenges}
          />
          <Textarea label="Pse dëshironi të merrni pjesë në Dinner with Alketa?" required rows={3} value={form.whyJoin} onChange={(e) => set('whyJoin', e.target.value)} />
          <Textarea label="Nëse do të kishit mundësi t'i bënit një pyetje Alketës ose grupit, cila do të ishte?" rows={3} value={form.questionForAlketa} onChange={(e) => set('questionForAlketa', e.target.value)} />
          <Textarea label="Çfarë eksperience apo perspektive mendoni se mund t'i sillni tavolinës?" rows={3} value={form.whatYouBring} onChange={(e) => set('whatYouBring', e.target.value)} />
        </fieldset>

        {/* Networking */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">Networking</legend>
          <CheckboxGroup
            label="Çfarë lloj njerëzish dëshironi të njihni?"
            options={NETWORKING}
            value={networking}
            onChange={setNetworking}
          />
        </fieldset>

        {/* Expectations */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">Expectations</legend>
          <Textarea label="Çfarë prisni të merrni nga kjo eksperiencë?" rows={3} value={form.expectations} onChange={(e) => set('expectations', e.target.value)} />
        </fieldset>

        {/* Social */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">Social</legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input label="LinkedIn" value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} placeholder="https://..." />
            <Input label="Instagram" value={form.instagram} onChange={(e) => set('instagram', e.target.value)} placeholder="@..." />
            <Input label="Website" value={form.socialWebsite} onChange={(e) => set('socialWebsite', e.target.value)} placeholder="https://..." />
          </div>
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
