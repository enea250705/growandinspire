'use client'

import { useState } from 'react'
import { Input, Textarea, CheckboxGroup, RadioGroup } from '@/components/ui/FormField'
import { Check } from 'lucide-react'
import { submitDinnerApplication } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const EMPLOYEES = [
  { label: '1-10', value: '1-10' },
  { label: '11-50', value: '11-50' },
  { label: '51-100', value: '51-100' },
  { label: '100+', value: '100+' },
]

const CONTENT: Record<Lang, {
  challenges: string[]
  networking: string[]
  sentTitle: string
  sentDesc: string
  title: string
  subtitle: string
  legPersonal: string
  legBusiness: string
  legAbout: string
  legLeadership: string
  legNetworking: string
  legExpectations: string
  legSocial: string
  first: string
  last: string
  email: string
  phone: string
  company: string
  industry: string
  position: string
  foundingYear: string
  foundingYearPh: string
  revenue: string
  employees: string
  describe: string
  describePh: string
  challengeLabel: string
  whyJoin: string
  question: string
  bring: string
  networkingLabel: string
  expectations: string
  sending: string
  submit: string
  error: string
}> = {
  en: {
    challenges: ['Growth', 'Team', 'Leadership', 'Finance', 'Scaling', 'Marketing', 'International Expansion', 'Other'],
    networking: ['CEO', 'Founders', 'Investors', 'Creatives', 'Executives', 'Women Leaders', 'Startup Founders'],
    sentTitle: 'Thank you for applying.',
    sentDesc: 'Every application is reviewed personally by the Grow and Inspire team. If selected, you will receive an invitation with the next steps.',
    title: 'Dinner with Alketa',
    subtitle: 'Every application is reviewed personally by the team.',
    legPersonal: 'Personal',
    legBusiness: 'Business',
    legAbout: 'About Your Business',
    legLeadership: 'Leadership',
    legNetworking: 'Networking',
    legExpectations: 'Expectations',
    legSocial: 'Social',
    first: 'First Name', last: 'Last Name', email: 'Email', phone: 'Phone',
    company: 'Company name', industry: 'Industry', position: 'Your position',
    foundingYear: 'Founding year', foundingYearPh: 'e.g. 2019',
    revenue: 'Annual revenue (optional)',
    employees: 'Number of employees',
    describe: 'Briefly describe your business.',
    describePh: 'Max 500 characters',
    challengeLabel: 'What is your biggest challenge right now?',
    whyJoin: 'Why do you want to take part in Dinner with Alketa?',
    question: 'If you could ask Alketa or the group one question, what would it be?',
    bring: 'What experience or perspective do you think you could bring to the table?',
    networkingLabel: 'What kind of people would you like to meet?',
    expectations: 'What do you expect to get from this experience?',
    sending: 'Sending...',
    submit: 'Submit',
    error: 'Something went wrong. Please try again.',
  },
  sq: {
    challenges: ['Rritje', 'Ekip', 'Lidership', 'Financa', 'Scaling', 'Marketing', 'Ekspansion Ndërkombëtar', 'Tjetër'],
    networking: ['CEO', 'Themelues', 'Investitorë', 'Kreativë', 'Drejtues', 'Gra Lidere', 'Themelues Startup-esh'],
    sentTitle: 'Faleminderit për aplikimin.',
    sentDesc: 'Çdo aplikim shqyrtohet personalisht nga ekipi Grow and Inspire. Nëse përzgjidheni, do të merrni një ftesë me hapat e mëtejshëm.',
    title: 'Dinner with Alketa',
    subtitle: 'Çdo aplikim shqyrtohet personalisht nga ekipi.',
    legPersonal: 'Personale',
    legBusiness: 'Biznesi',
    legAbout: 'Rreth Biznesit Tuaj',
    legLeadership: 'Lidershipi',
    legNetworking: 'Networking',
    legExpectations: 'Pritshmëritë',
    legSocial: 'Social',
    first: 'Emër', last: 'Mbiemër', email: 'Email', phone: 'Telefon',
    company: 'Emri i kompanisë', industry: 'Industria', position: 'Pozicioni juaj',
    foundingYear: 'Viti i themelimit', foundingYearPh: 'p.sh. 2019',
    revenue: 'Xhiro vjetore (opsionale)',
    employees: 'Numri i punonjësve',
    describe: 'Përshkruani shkurtimisht biznesin tuaj.',
    describePh: 'Max 500 karaktere',
    challengeLabel: 'Cila është sfida juaj më e madhe aktualisht?',
    whyJoin: 'Pse dëshironi të merrni pjesë në Dinner with Alketa?',
    question: "Nëse do të kishit mundësi t'i bënit një pyetje Alketës ose grupit, cila do të ishte?",
    bring: "Çfarë eksperience apo perspektive mendoni se mund t'i sillni tavolinës?",
    networkingLabel: 'Çfarë lloj njerëzish dëshironi të njihni?',
    expectations: 'Çfarë prisni të merrni nga kjo eksperiencë?',
    sending: 'Duke dërguar...',
    submit: 'Dërgo',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
  },
}

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '',
  company: '', website: '', industry: '', position: '', foundingYear: '', employeeCount: '', annualRevenue: '',
  businessDescription: '',
  whyJoin: '', questionForAlketa: '', whatYouBring: '', expectations: '',
  linkedin: '', instagram: '', socialWebsite: '',
}

export function DinnerForm() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
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
        {/* Personal */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">{c.legPersonal}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label={c.first} required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
            <Input label={c.last} required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
            <Input label={c.email} required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
            <Input label={c.phone} required type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </div>
        </fieldset>

        {/* Business */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">{c.legBusiness}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label={c.company} value={form.company} onChange={(e) => set('company', e.target.value)} />
            <Input label="Website" value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://..." />
            <Input label={c.industry} value={form.industry} onChange={(e) => set('industry', e.target.value)} />
            <Input label={c.position} value={form.position} onChange={(e) => set('position', e.target.value)} />
            <Input label={c.foundingYear} value={form.foundingYear} onChange={(e) => set('foundingYear', e.target.value)} placeholder={c.foundingYearPh} />
            <Input label={c.revenue} value={form.annualRevenue} onChange={(e) => set('annualRevenue', e.target.value)} />
          </div>
          <RadioGroup
            label={c.employees}
            columns={4}
            options={EMPLOYEES}
            value={form.employeeCount}
            onChange={(v) => set('employeeCount', v)}
          />
        </fieldset>

        {/* About your business */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">{c.legAbout}</legend>
          <Textarea
            label={c.describe}
            rows={4}
            maxLength={500}
            value={form.businessDescription}
            onChange={(e) => set('businessDescription', e.target.value)}
            placeholder={c.describePh}
          />
          <p className="text-xs text-black/35 -mt-3">{form.businessDescription.length}/500</p>
        </fieldset>

        {/* Leadership */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">{c.legLeadership}</legend>
          <CheckboxGroup
            label={c.challengeLabel}
            options={c.challenges}
            value={challenges}
            onChange={setChallenges}
          />
          <Textarea label={c.whyJoin} required rows={3} value={form.whyJoin} onChange={(e) => set('whyJoin', e.target.value)} />
          <Textarea label={c.question} rows={3} value={form.questionForAlketa} onChange={(e) => set('questionForAlketa', e.target.value)} />
          <Textarea label={c.bring} rows={3} value={form.whatYouBring} onChange={(e) => set('whatYouBring', e.target.value)} />
        </fieldset>

        {/* Networking */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">{c.legNetworking}</legend>
          <CheckboxGroup
            label={c.networkingLabel}
            options={c.networking}
            value={networking}
            onChange={setNetworking}
          />
        </fieldset>

        {/* Expectations */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">{c.legExpectations}</legend>
          <Textarea label={c.expectations} rows={3} value={form.expectations} onChange={(e) => set('expectations', e.target.value)} />
        </fieldset>

        {/* Social */}
        <fieldset className="flex flex-col gap-5">
          <legend className="font-serif text-lg font-bold text-brand-black mb-2">{c.legSocial}</legend>
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
            {loading ? c.sending : c.submit}
          </button>
        </div>
      </form>
    </div>
  )
}
