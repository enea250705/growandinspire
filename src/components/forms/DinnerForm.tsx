'use client'

import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/FormField'
import { Check } from 'lucide-react'
import { submitDinnerApplication } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'
import { isValidEmail, isValidPhone, isValidWebsite, isValidProfile } from '@/lib/validation'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  title: string
  subtitle: string
  sentTitle: string
  sentDesc: string
  submit: string
  sending: string
  error: string
  errEmail: string
  errPhone: string
  errWebsite: string
  email: string
  phone: string
  fields: {
    fullName: string; age: string; city: string
    company: string; companyWebsite: string; profileLink: string; yearsInMarket: string
    industry: string; employees: string; revenueStage: string
    whyJoin: string; valueToCommunity: string; biggestChallenge: string; discussionTopic: string
    financialGoal5y: string; valuableIdea: string; betterWorld: string; objective12m: string
    whySelected: string; specificValue: string; questionForAlketa: string
  }
}> = {
  en: {
    title: 'Dinner with Alketa',
    subtitle: 'Every application is reviewed personally by the team.',
    sentTitle: 'Thank you for applying.',
    sentDesc: 'Every application is reviewed personally by the Grow and Inspire team. If selected, you will receive an invitation with the next steps.',
    submit: 'Submit',
    sending: 'Sending...',
    error: 'Something went wrong. Please try again.',
    errEmail: 'Please enter a valid email address.',
    errPhone: 'Please enter the phone number with the country code (e.g. +355 69 XXX XXXX).',
    errWebsite: 'Please enter a valid website (e.g. www.example.com).',
    email: 'Email',
    phone: 'Phone number',
    fields: {
      fullName: 'Full name of the entrepreneur / CEO',
      age: 'Age',
      city: 'City',
      company: 'Company name',
      companyWebsite: 'Company website',
      profileLink: 'Your professional website or profile (LinkedIn / Instagram)',
      yearsInMarket: 'How many years has the company been on the market?',
      industry: 'What industry does the company operate in?',
      employees: 'How many employees does the company have?',
      revenueStage: "Annual revenue or the company's stage of development",
      whyJoin: 'Why do you want to take part in Dinner with Alketa?',
      valueToCommunity: 'What value can you bring to this community?',
      biggestChallenge: 'What is the biggest challenge your business is currently facing?',
      discussionTopic: 'What topic would you like to discuss with the other entrepreneurs?',
      financialGoal5y: 'What is your financial goal for the next five years?',
      valuableIdea: 'What is the most valuable idea or experience you would share at the table?',
      betterWorld: 'What would you like to do to make the world a better place?',
      objective12m: 'What is your main objective for the next 12 months?',
      whySelected: 'Why do you think you should be one of the 20 selected entrepreneurs?',
      specificValue: 'What specific value can you bring to the other entrepreneurs at this dinner?',
      questionForAlketa: 'What is the question you would like to ask Alketa?',
    },
  },
  sq: {
    title: 'Dinner with Alketa',
    subtitle: 'Çdo aplikim shqyrtohet personalisht nga ekipi.',
    sentTitle: 'Faleminderit për aplikimin.',
    sentDesc: 'Çdo aplikim shqyrtohet personalisht nga ekipi Grow and Inspire. Nëse përzgjidheni, do të merrni një ftesë me hapat e mëtejshëm.',
    submit: 'Dërgo',
    sending: 'Duke dërguar...',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
    errEmail: 'Ju lutem vendosni një email të vlefshëm.',
    errPhone: 'Ju lutem vendosni numrin me prefiksin e shtetit (p.sh. +355 69 XXX XXXX).',
    errWebsite: 'Ju lutem vendosni një website të vlefshëm (p.sh. www.shembull.com).',
    email: 'Email',
    phone: 'Numri i telefonit',
    fields: {
      fullName: 'Emri dhe mbiemri i sipërmarrësit / CEO-s',
      age: 'Mosha',
      city: 'Qyteti',
      company: 'Emri i kompanisë',
      companyWebsite: 'Website-i i kompanisë',
      profileLink: 'Website ose profili juaj profesional (LinkedIn / Instagram)',
      yearsInMarket: 'Sa vite ka kompania në treg?',
      industry: 'Në cilën industri operon kompania?',
      employees: 'Sa punonjës ka kompania?',
      revenueStage: 'Xhiroja vjetore ose faza e zhvillimit të biznesit',
      whyJoin: 'Pse dëshironi të merrni pjesë në Dinner with Alketa?',
      valueToCommunity: 'Çfarë vlere mund t’i sillni këtij komuniteti?',
      biggestChallenge: 'Cila është sfida më e madhe me të cilën po përballet aktualisht biznesi juaj?',
      discussionTopic: 'Për cilën temë do të dëshironit të diskutonit me sipërmarrësit e tjerë?',
      financialGoal5y: 'Cili është objektivi juaj financiar për pesë vitet e ardhshme?',
      valuableIdea: 'Cila është ideja ose përvoja më e vlefshme që do të ndani në tavolinë?',
      betterWorld: 'Çfarë do të dëshironit të bënit për ta bërë botën një vend më të mirë?',
      objective12m: 'Cili është objektivi juaj kryesor për 12 muajt e ardhshëm?',
      whySelected: 'Pse mendoni se duhet të jeni një nga 20 sipërmarrësit e përzgjedhur?',
      specificValue: 'Çfarë vlere specifike mund t’u sillni sipërmarrësve të tjerë në këtë darkë?',
      questionForAlketa: 'Cila është pyetja që do të dëshironit t’ia bënit Alketës?',
    },
  },
}

const EMPTY = {
  fullName: '', email: '', phone: '', age: '', city: '',
  company: '', companyWebsite: '', profileLink: '', yearsInMarket: '',
  industry: '', employees: '', revenueStage: '',
  whyJoin: '', valueToCommunity: '', biggestChallenge: '', discussionTopic: '',
  financialGoal5y: '', valuableIdea: '', betterWorld: '', objective12m: '',
  whySelected: '', specificValue: '', questionForAlketa: '',
}

export function DinnerForm() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const f = c.fields
  const [form, setForm] = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(field: keyof typeof EMPTY, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    // Require real contact details before sending.
    if (!isValidEmail(form.email)) return setError(c.errEmail)
    if (!isValidPhone(form.phone)) return setError(c.errPhone)
    if (form.companyWebsite.trim() && !isValidWebsite(form.companyWebsite)) return setError(c.errWebsite)
    if (form.profileLink.trim() && !isValidProfile(form.profileLink)) return setError(c.errWebsite)
    setLoading(true)
    setError('')
    const result = await submitDinnerApplication({
      first_name: form.fullName,
      email: form.email,
      phone: form.phone,
      company: form.company,
      website: form.companyWebsite,
      linkedin: form.profileLink,
      founding_year: form.yearsInMarket,
      industry: form.industry,
      employee_count: form.employees,
      annual_revenue: form.revenueStage,
      why_join: form.whyJoin,
      what_you_bring: form.valueToCommunity,
      question_for_alketa: form.questionForAlketa,
      age: form.age,
      city: form.city,
      biggest_challenge: form.biggestChallenge,
      discussion_topic: form.discussionTopic,
      financial_goal_5y: form.financialGoal5y,
      valuable_idea: form.valuableIdea,
      better_world: form.betterWorld,
      objective_12m: form.objective12m,
      why_selected: form.whySelected,
      specific_value: form.specificValue,
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
        <p className="text-black/50 max-w-md mx-auto">{c.sentDesc}</p>
      </div>
    )
  }

  return (
    <div className="bg-brand-white rounded-2xl border border-black/8 overflow-hidden">
      <div className="p-8 border-b border-black/8">
        <h2 className="font-serif text-2xl font-bold text-brand-black mb-1">{c.title}</h2>
        <p className="text-black/50 text-sm">{c.subtitle}</p>
      </div>

      <form onSubmit={submit} className="p-8 flex flex-col gap-4">
        <Input label={f.fullName} required value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
        <Input label={c.email} type="email" required placeholder="email@juaj.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
        <Input label={c.phone} type="tel" required placeholder="+355 6X XXX XXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <Input label={f.age} type="number" value={form.age} onChange={(e) => set('age', e.target.value)} />
          <Input label={f.city} value={form.city} onChange={(e) => set('city', e.target.value)} />
        </div>
        <Input label={f.company} required value={form.company} onChange={(e) => set('company', e.target.value)} />
        <Input label={f.companyWebsite} value={form.companyWebsite} onChange={(e) => set('companyWebsite', e.target.value)} placeholder="https://..." />
        <Input label={f.profileLink} value={form.profileLink} onChange={(e) => set('profileLink', e.target.value)} />
        <Input label={f.yearsInMarket} value={form.yearsInMarket} onChange={(e) => set('yearsInMarket', e.target.value)} />
        <Input label={f.industry} value={form.industry} onChange={(e) => set('industry', e.target.value)} />
        <Input label={f.employees} value={form.employees} onChange={(e) => set('employees', e.target.value)} />
        <Input label={f.revenueStage} value={form.revenueStage} onChange={(e) => set('revenueStage', e.target.value)} />
        <Textarea label={f.whyJoin} required rows={3} value={form.whyJoin} onChange={(e) => set('whyJoin', e.target.value)} />
        <Textarea label={f.valueToCommunity} rows={3} value={form.valueToCommunity} onChange={(e) => set('valueToCommunity', e.target.value)} />
        <Textarea label={f.biggestChallenge} required rows={3} value={form.biggestChallenge} onChange={(e) => set('biggestChallenge', e.target.value)} />
        <Textarea label={f.discussionTopic} required rows={2} value={form.discussionTopic} onChange={(e) => set('discussionTopic', e.target.value)} />
        <Textarea label={f.financialGoal5y} rows={2} value={form.financialGoal5y} onChange={(e) => set('financialGoal5y', e.target.value)} />
        <Textarea label={f.valuableIdea} rows={3} value={form.valuableIdea} onChange={(e) => set('valuableIdea', e.target.value)} />
        <Textarea label={f.betterWorld} rows={2} value={form.betterWorld} onChange={(e) => set('betterWorld', e.target.value)} />
        <Textarea label={f.objective12m} rows={2} value={form.objective12m} onChange={(e) => set('objective12m', e.target.value)} />
        <Textarea label={f.whySelected} rows={3} value={form.whySelected} onChange={(e) => set('whySelected', e.target.value)} />
        <Textarea label={f.specificValue} rows={3} value={form.specificValue} onChange={(e) => set('specificValue', e.target.value)} />
        <Textarea label={f.questionForAlketa} rows={2} value={form.questionForAlketa} onChange={(e) => set('questionForAlketa', e.target.value)} />

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
