'use client'

import { useState } from 'react'
import { Input, Textarea, Select } from '@/components/ui/FormField'
import { submitSponsorshipLead } from '@/lib/actions/forms'
import { Check, Megaphone, Mic2, Users, BookOpen, Building2, Sparkles, TrendingUp, Globe } from 'lucide-react'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const OPP_ICONS = [Globe, Megaphone, Mic2, Users, Building2, BookOpen, TrendingUp, Sparkles, Check]

const CONTENT: Record<Lang, {
  opportunities: { title: string; desc: string }[]
  badge: string
  title: string
  subtitle: string
  optionsBadge: string
  optionsTitle: string
  customTitle: string
  customDesc: string
  touchBadge: string
  formTitle: string
  formDesc: string
  receivedTitle: string
  receivedDesc: string
  company: string
  companyPh: string
  contact: string
  contactPh: string
  email: string
  phone: string
  interest: string
  budget: string
  budgetOptions: { label: string; value: string }[]
  message: string
  messagePh: string
  sending: string
  send: string
  error: string
}> = {
  en: {
    opportunities: [
      { title: 'Alketa Marketing and Brand Ambassador', desc: 'Alketa represents your brand across digital, social, and live formats. Authentic storytelling built on trust.' },
      { title: 'Alketa as a Spokesperson', desc: 'National and international conference appearances. Alketa delivers your message to decision-makers.' },
      { title: 'Sponsorship - Inspire Podcast', desc: 'Reach a dedicated audience of Albanian professionals and business leaders. Pre-roll, mid-roll, and integration options.' },
      { title: 'Sponsorship - Meet the Founder', desc: "Associate your brand with Albania's most compelling founder stories." },
      { title: 'Class Real Estate', desc: 'Premium real estate content partnership and co-branding opportunities within the Class ecosystem.' },
      { title: 'Revista Class', desc: "Full-page features, editorial partnerships, and sponsored content in Albania's leading business magazine." },
      { title: 'Class Business', desc: 'Sponsored insights, thought leadership pieces, and co-produced business content.' },
      { title: 'Influencer Campaigns', desc: 'Curated influencer campaigns through the Class network. Authentic reach across Albania and the diaspora.' },
      { title: 'Custom Packages and Budgets', desc: 'Tailored partnership packages built around your goals and budget. Tell us what you need - we design the offer.' },
    ],
    badge: 'B2B Partnership',
    title: 'Sponsorship',
    subtitle: "Partner with Albania's most trusted business platform. Reach decision-makers, founders, and professionals who act.",
    optionsBadge: 'Partnership Options',
    optionsTitle: 'How We Can Work Together',
    customTitle: 'Custom packages available',
    customDesc: 'Budget and reach tailored to your brand objectives. Fill the form below.',
    touchBadge: 'Get in Touch',
    formTitle: 'Request a Sponsorship Offer',
    formDesc: 'We will respond with a tailored proposal within 48 hours.',
    receivedTitle: 'Inquiry Received',
    receivedDesc: 'We will be in touch within 48 hours with a custom proposal.',
    company: 'Company Name', companyPh: 'Your company',
    contact: 'Contact Person', contactPh: 'Your name',
    email: 'Email', phone: 'Phone',
    interest: 'Area of Interest',
    budget: 'Indicative Budget',
    budgetOptions: [
      { label: '< €1,000', value: '<1000' },
      { label: '€1,000 - €5,000', value: '1000-5000' },
      { label: '€5,000 - €15,000', value: '5000-15000' },
      { label: '€15,000+', value: '15000+' },
      { label: 'Prefer to discuss', value: 'discuss' },
    ],
    message: 'Message', messagePh: 'Tell us about your goals and what you are looking to achieve...',
    sending: 'Sending...',
    send: 'Send Inquiry',
    error: 'Something went wrong. Please try again.',
  },
  sq: {
    opportunities: [
      { title: 'Alketa Marketing dhe Brand Ambassador', desc: 'Alketa përfaqëson brand-in tuaj në formate dixhitale, sociale dhe live. Storytelling autentik i ndërtuar mbi besim.' },
      { title: 'Alketa si Zëdhënëse', desc: 'Paraqitje në konferenca kombëtare dhe ndërkombëtare. Alketa e përcjell mesazhin tuaj te vendimmarrësit.' },
      { title: 'Sponsorizim - Inspire Podcast', desc: 'Arrij një audiencë të dedikuar profesionistësh dhe liderësh biznesi shqiptarë. Opsione pre-roll, mid-roll dhe integrimi.' },
      { title: 'Sponsorizim - Meet the Founder', desc: 'Lidh brand-in tuaj me historitë më bindëse të themeluesve në Shqipëri.' },
      { title: 'Class Real Estate', desc: 'Partneritet premium përmbajtjeje real estate dhe mundësi co-branding brenda ekosistemit Class.' },
      { title: 'Revista Class', desc: 'Reportazhe faqe të plotë, partneritete editoriale dhe përmbajtje e sponsorizuar në revistën kryesore të biznesit në Shqipëri.' },
      { title: 'Class Business', desc: 'Insights të sponsorizuara, artikuj thought leadership dhe përmbajtje biznesi e bashkëprodhuar.' },
      { title: 'Fushata Influencer', desc: 'Fushata të kuruara me influencer përmes rrjetit Class. Arritje autentike në Shqipëri dhe diasporë.' },
      { title: 'Paketa dhe Buxhete të Personalizuara', desc: 'Paketa partneriteti të përshtatura sipas qëllimeve dhe buxhetit tuaj. Na thoni çfarë ju duhet - ne dizajnojmë ofertën.' },
    ],
    badge: 'Partneritet B2B',
    title: 'Sponsorizim',
    subtitle: 'Bashkëpuno me platformën më të besuar të biznesit në Shqipëri. Arrij vendimmarrës, themelues dhe profesionistë që veprojnë.',
    optionsBadge: 'Opsione Partneriteti',
    optionsTitle: 'Si Mund të Punojmë Bashkë',
    customTitle: 'Paketa të personalizuara në dispozicion',
    customDesc: 'Buxhet dhe arritje të përshtatura sipas objektivave të brand-it tuaj. Plotëso formularin më poshtë.',
    touchBadge: 'Na Kontaktoni',
    formTitle: 'Kërko një Ofertë Sponsorizimi',
    formDesc: 'Do të përgjigjemi me një propozim të personalizuar brenda 48 orëve.',
    receivedTitle: 'Kërkesa u Mor',
    receivedDesc: 'Do të kontaktojmë brenda 48 orëve me një propozim të personalizuar.',
    company: 'Emri i Kompanisë', companyPh: 'Kompania juaj',
    contact: 'Personi i Kontaktit', contactPh: 'Emri juaj',
    email: 'Email', phone: 'Telefon',
    interest: 'Fusha e Interesit',
    budget: 'Buxheti Indikativ',
    budgetOptions: [
      { label: '< €1,000', value: '<1000' },
      { label: '€1,000 - €5,000', value: '1000-5000' },
      { label: '€5,000 - €15,000', value: '5000-15000' },
      { label: '€15,000+', value: '15000+' },
      { label: 'Preferoj të diskutoj', value: 'discuss' },
    ],
    message: 'Mesazhi', messagePh: 'Na tregoni për qëllimet tuaja dhe çfarë dëshironi të arrini...',
    sending: 'Duke dërguar...',
    send: 'Dërgo Kërkesën',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
  },
}

export default function SponsorshipPage() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const interestOptions = c.opportunities.map((o) => ({ label: o.title, value: o.title }))
  const [form, setForm] = useState({
    company: '', contact: '', email: '', phone: '',
    interest: '', budget: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await submitSponsorshipLead({
      company_name: form.company,
      contact_name: form.contact,
      email: form.email,
      phone: form.phone,
      interest_area: form.interest,
      budget: form.budget,
      message: form.message,
    })
    setLoading(false)
    if (result.ok) setSubmitted(true)
    else setError(c.error)
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">{c.badge}</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">{c.title}</h1>
          <p className="text-white/50 text-lg max-w-2xl">
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* Opportunities grid */}
      <section className="py-20 lg:py-28 border-b border-black/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">{c.optionsBadge}</p>
            <h2 className="font-serif text-4xl font-bold text-brand-black">{c.optionsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.opportunities.map(({ title, desc }, i) => {
              const Icon = OPP_ICONS[i]
              return (
                <div key={title} className="bg-brand-white rounded-2xl border border-black/8 p-6 hover:shadow-md hover:border-brand-gold/20 transition-all">
                  <Icon size={22} className="text-brand-gold mb-4" strokeWidth={1.5} />
                  <h3 className="font-semibold text-brand-black text-sm mb-2 leading-snug">{title}</h3>
                  <p className="text-black/50 text-xs leading-relaxed">{desc}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-8 bg-brand-cream-dark rounded-2xl border border-black/8 p-6 text-center">
            <p className="text-brand-black font-semibold mb-1">{c.customTitle}</p>
            <p className="text-black/50 text-sm">{c.customDesc}</p>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">{c.touchBadge}</p>
            <h2 className="font-serif text-3xl font-bold text-brand-black mb-2">{c.formTitle}</h2>
            <p className="text-black/50 text-sm">{c.formDesc}</p>
          </div>

          {submitted ? (
            <div className="bg-brand-white rounded-2xl border border-black/8 p-12 text-center">
              <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-brand-gold" strokeWidth={2} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-black mb-2">{c.receivedTitle}</h3>
              <p className="text-black/50 text-sm">{c.receivedDesc}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-brand-white rounded-2xl border border-black/8 p-8 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label={c.company} required value={form.company} onChange={(e) => set('company', e.target.value)} placeholder={c.companyPh} />
                <Input label={c.contact} required value={form.contact} onChange={(e) => set('contact', e.target.value)} placeholder={c.contactPh} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label={c.email} required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@company.com" />
                <Input label={c.phone} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+355..." />
              </div>
              <Select
                label={c.interest}
                required
                options={interestOptions}
                value={form.interest}
                onChange={(e) => set('interest', e.target.value)}
              />
              <Select
                label={c.budget}
                options={c.budgetOptions}
                value={form.budget}
                onChange={(e) => set('budget', e.target.value)}
              />
              <Textarea label={c.message} required rows={4} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder={c.messagePh} />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="pt-4 border-t border-black/6 flex justify-end">
                <button type="submit" disabled={loading} className="bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50">
                  {loading ? c.sending : c.send}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
