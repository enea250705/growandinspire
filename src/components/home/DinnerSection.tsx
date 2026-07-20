'use client'

import { useState, useEffect } from 'react'
import { UtensilsCrossed, ChevronDown, Calendar, Clock, Euro } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/FormField'
import { submitDinnerApplication } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  badge: string
  title: string
  intro: string[]
  dateLabel: string
  date: string
  timeLabel: string
  time: string
  priceLabel: string
  price: string
  applyNow: string
  formTitle: string
  foodNote: string
  sentTitle: string
  sentDesc: string
  fields: {
    fullName: string; age: string; city: string; email: string; phone: string
    company: string; companyWebsite: string; profileLink: string; yearsInMarket: string
    industry: string; employees: string; revenueStage: string
    whyJoin: string; valueToCommunity: string; biggestChallenge: string; discussionTopic: string
    financialGoal5y: string; valuableIdea: string; betterWorld: string; objective12m: string
    whySelected: string; specificValue: string; questionForAlketa: string
  }
  submit: string
  submitting: string
  error: string
}> = {
  en: {
    badge: 'Dinner with Alketa',
    title: 'Some conversations deserve more than a meeting.',
    intro: [
      'Around the right table, ideas turn into partnerships.',
      'Dinner with Alketa is an exclusive experience for entrepreneurs, leaders and professionals who value authentic conversations, the exchange of experience and connections that last. This event is built for a limited group of participants with a business profile, experience, influence or the potential to contribute to a meaningful conversation on motivation, business growth, decision-making, market challenges and opportunities for collaboration. Its value lies in access to a curated circle of people, the quality of the exchange, and the chance to build deeper professional relationships in an exclusive setting.',
    ],
    dateLabel: 'Date',
    date: '30 July 2026',
    timeLabel: 'Time',
    time: '20:00',
    priceLabel: 'Price',
    price: '199€',
    applyNow: 'Apply now',
    formTitle: 'Application Form',
    foodNote: 'Food and drinks are personally curated by Alketa.',
    sentTitle: 'Application sent!',
    sentDesc: 'You will be contacted within 48 hours.',
    fields: {
      fullName: 'Full name of the entrepreneur / CEO',
      age: 'Age',
      city: 'City',
      email: 'Email',
      phone: 'Phone number',
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
    submit: 'Send Application',
    submitting: 'Sending...',
    error: 'Something went wrong. Please try again.',
  },
  sq: {
    badge: 'Dinner with Alketa',
    title: 'Ka biseda që meritojnë më shumë se një takim.',
    intro: [
      'Rreth tavolinës së duhur, idetë kthehen në bashkëpunime.',
      'Dinner with Alketa është një eksperiencë ekskluzive për sipërmarrës, drejtues dhe profesionistë që vlerësojnë bisedat autentike, shkëmbimin e përvojës dhe lidhjet që zgjasin. Ky event është ndërtuar për një grup të kufizuar pjesëmarrësish që kanë profil biznesi, eksperiencë, ndikim ose potencial për të kontribuar në një bisedë cilësore mbi motivimin, rritjen e biznesit, vendimmarrjen, sfidat e tregut dhe mundësitë e bashkëpunimit. Vlera e aktivitetit qëndron te aksesi në një rreth të kuruar njerëzish, te cilësia e shkëmbimit dhe te mundësia për të ndërtuar marrëdhënie më të thella profesionale në një ambient ekskluziv.',
    ],
    dateLabel: 'Data',
    date: '30 Korrik 2026',
    timeLabel: 'Ora',
    time: '20:00',
    priceLabel: 'Çmimi',
    price: '199€',
    applyNow: 'Apliko tani',
    formTitle: 'Formular Aplikimi',
    foodNote: 'Ushqimi dhe pijet kurohen personalisht nga Alketa.',
    sentTitle: 'Aplikimi u dërgua!',
    sentDesc: 'Do të kontaktohesh brenda 48 orëve.',
    fields: {
      fullName: 'Emri dhe mbiemri i sipërmarrësit / CEO-s',
      age: 'Mosha',
      city: 'Qyteti',
      email: 'Email',
      phone: 'Numri i telefonit',
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
    submit: 'Dërgo Aplikimin',
    submitting: 'Duke dërguar...',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
  },
}

export function DinnerSection() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const [form, setForm] = useState({
    fullName: '', age: '', city: '', email: '', phone: '',
    company: '', companyWebsite: '', profileLink: '', yearsInMarket: '',
    industry: '', employees: '', revenueStage: '',
    whyJoin: '', valueToCommunity: '', biggestChallenge: '', discussionTopic: '',
    financialGoal5y: '', valuableIdea: '', betterWorld: '', objective12m: '',
    whySelected: '', specificValue: '', questionForAlketa: '',
  })
  // On phone the form is collapsed behind the "Apply now" button; on desktop
  // it's always shown (lg:block) and this state is ignored.
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // The homepage Dinner popup fires this when "Apply now" is tapped: open the
  // (mobile-collapsed) form and scroll it into view.
  useEffect(() => {
    function openForm() {
      setFormOpen(true)
      setTimeout(() => {
        document.getElementById('dinner-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 80)
    }
    window.addEventListener('open-dinner-form', openForm)
    return () => window.removeEventListener('open-dinner-form', openForm)
  }, [])

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
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

  return (
    <section id="dinner" className="bg-brand-cream py-24 lg:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal banner photo on top of the section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 lg:mb-16 h-48 sm:h-64 lg:h-80 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/dinner-table-3.jpg" alt="Dinner with Alketa" className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - info */}
          <div>
            <p className="text-brand-gold font-serif text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4">{c.badge}</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-5">
              {c.title}
            </h2>
            <div className="text-black/60 text-lg leading-relaxed mb-8 space-y-4">
              {c.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-brand-white border border-black/8 rounded-2xl px-5 py-4">
                <Calendar size={22} className="text-brand-gold" strokeWidth={1.5} />
                <div>
                  <p className="text-black/40 text-xs uppercase tracking-wider">{c.dateLabel}</p>
                  <p className="font-semibold text-brand-black">{c.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-brand-white border border-black/8 rounded-2xl px-5 py-4">
                <Clock size={22} className="text-brand-gold" strokeWidth={1.5} />
                <div>
                  <p className="text-black/40 text-xs uppercase tracking-wider">{c.timeLabel}</p>
                  <p className="font-semibold text-brand-black">{c.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-brand-white border border-black/8 rounded-2xl px-5 py-4">
                <Euro size={22} className="text-brand-gold" strokeWidth={1.5} />
                <div>
                  <p className="text-black/40 text-xs uppercase tracking-wider">{c.priceLabel}</p>
                  <p className="font-semibold text-brand-black">{c.price}</p>
                </div>
              </div>
            </div>

            {/* On phone this toggles the form open/closed; on desktop the form
                is always visible so the button is inert (lg:pointer-events-none). */}
            <button
              type="button"
              onClick={() => setFormOpen((o) => !o)}
              aria-expanded={formOpen}
              className="mt-8 inline-flex items-center gap-3 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl px-5 py-4 lg:pointer-events-none lg:cursor-default"
            >
              <UtensilsCrossed size={20} className="text-brand-gold" strokeWidth={1.5} />
              <span className="text-sm text-brand-black font-medium">{c.applyNow}</span>
              <ChevronDown
                size={18}
                strokeWidth={1.5}
                className={`text-brand-gold lg:hidden transition-transform ${formOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Right - form (collapsed on phone until "Apply now" is tapped) */}
          <div id="dinner-form" className={`${formOpen ? 'block' : 'hidden'} lg:block bg-brand-white rounded-3xl border border-black/8 p-8 shadow-sm scroll-mt-24`}>
            <h3 className="font-serif text-2xl font-bold text-brand-black mb-2">{c.formTitle}</h3>
            <p className="text-brand-gold text-sm mb-6">{c.foodNote}</p>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed size={20} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-xl text-brand-black font-medium mb-2">{c.sentTitle}</p>
                <p className="text-black/50 text-sm">{c.sentDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label={c.fields.fullName} required value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label={c.fields.age} type="number" value={form.age} onChange={(e) => set('age', e.target.value)} />
                  <Input label={c.fields.city} value={form.city} onChange={(e) => set('city', e.target.value)} />
                </div>
                <Input label={c.fields.email} type="email" required placeholder="email@juaj.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                <Input label={c.fields.phone} type="tel" placeholder="+355 6X XXX XXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                <Input label={c.fields.company} value={form.company} onChange={(e) => set('company', e.target.value)} />
                <Input label={c.fields.companyWebsite} value={form.companyWebsite} onChange={(e) => set('companyWebsite', e.target.value)} />
                <Input label={c.fields.profileLink} value={form.profileLink} onChange={(e) => set('profileLink', e.target.value)} />
                <Input label={c.fields.yearsInMarket} value={form.yearsInMarket} onChange={(e) => set('yearsInMarket', e.target.value)} />
                <Input label={c.fields.industry} value={form.industry} onChange={(e) => set('industry', e.target.value)} />
                <Input label={c.fields.employees} value={form.employees} onChange={(e) => set('employees', e.target.value)} />
                <Input label={c.fields.revenueStage} value={form.revenueStage} onChange={(e) => set('revenueStage', e.target.value)} />
                <Textarea label={c.fields.whyJoin} required rows={3} value={form.whyJoin} onChange={(e) => set('whyJoin', e.target.value)} />
                <Textarea label={c.fields.valueToCommunity} rows={3} value={form.valueToCommunity} onChange={(e) => set('valueToCommunity', e.target.value)} />
                <Textarea label={c.fields.biggestChallenge} rows={3} value={form.biggestChallenge} onChange={(e) => set('biggestChallenge', e.target.value)} />
                <Textarea label={c.fields.discussionTopic} rows={2} value={form.discussionTopic} onChange={(e) => set('discussionTopic', e.target.value)} />
                <Textarea label={c.fields.financialGoal5y} rows={2} value={form.financialGoal5y} onChange={(e) => set('financialGoal5y', e.target.value)} />
                <Textarea label={c.fields.valuableIdea} rows={3} value={form.valuableIdea} onChange={(e) => set('valuableIdea', e.target.value)} />
                <Textarea label={c.fields.betterWorld} rows={2} value={form.betterWorld} onChange={(e) => set('betterWorld', e.target.value)} />
                <Textarea label={c.fields.objective12m} rows={2} value={form.objective12m} onChange={(e) => set('objective12m', e.target.value)} />
                <Textarea label={c.fields.whySelected} rows={3} value={form.whySelected} onChange={(e) => set('whySelected', e.target.value)} />
                <Textarea label={c.fields.specificValue} rows={3} value={form.specificValue} onChange={(e) => set('specificValue', e.target.value)} />
                <Textarea label={c.fields.questionForAlketa} rows={2} value={form.questionForAlketa} onChange={(e) => set('questionForAlketa', e.target.value)} />
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
