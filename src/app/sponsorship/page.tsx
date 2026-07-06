'use client'

import { useState } from 'react'
import { Input, Textarea, Select } from '@/components/ui/FormField'
import { submitSponsorshipLead } from '@/lib/actions/forms'
import { Check, Megaphone, Mic2, Users, BookOpen, Building2, Sparkles, TrendingUp, Globe } from 'lucide-react'

const OPPORTUNITIES = [
  {
    icon: Globe,
    title: 'Alketa Marketing and Brand Ambassador',
    desc: 'Alketa represents your brand across digital, social, and live formats. Authentic storytelling built on trust.',
  },
  {
    icon: Megaphone,
    title: 'Alketa as a Spokesperson',
    desc: 'National and international conference appearances. Alketa delivers your message to decision-makers.',
  },
  {
    icon: Mic2,
    title: 'Sponsorship - Inspire Podcast',
    desc: 'Reach a dedicated audience of Albanian professionals and business leaders. Pre-roll, mid-roll, and integration options.',
  },
  {
    icon: Users,
    title: 'Sponsorship - Meet the Founder',
    desc: 'Associate your brand with Albania\'s most compelling founder stories.',
  },
  {
    icon: Building2,
    title: 'Class Real Estate',
    desc: 'Premium real estate content partnership and co-branding opportunities within the Class ecosystem.',
  },
  {
    icon: BookOpen,
    title: 'Revista Class',
    desc: 'Full-page features, editorial partnerships, and sponsored content in Albania\'s leading business magazine.',
  },
  {
    icon: TrendingUp,
    title: 'Class Business',
    desc: 'Sponsored insights, thought leadership pieces, and co-produced business content.',
  },
  {
    icon: Sparkles,
    title: 'Influencer Campaigns',
    desc: 'Curated influencer campaigns through the Class network. Authentic reach across Albania and the diaspora.',
  },
  {
    icon: Check,
    title: 'Custom Packages and Budgets',
    desc: 'Tailored partnership packages built around your goals and budget. Tell us what you need - we design the offer.',
  },
]

const INTEREST_OPTIONS = OPPORTUNITIES.map((o) => ({ label: o.title, value: o.title }))

export default function SponsorshipPage() {
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
    else setError('Ka ndodhur një problem. Ju lutem provoni sërish.')
  }

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">B2B Partnership</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">Sponsorship</h1>
          <p className="text-white/50 text-lg max-w-2xl">
            Partner with Albania&apos;s most trusted business platform. Reach decision-makers, founders, and professionals who act.
          </p>
        </div>
      </section>

      {/* Opportunities grid */}
      <section className="py-20 lg:py-28 border-b border-black/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Partnership Options</p>
            <h2 className="font-serif text-4xl font-bold text-brand-black">How We Can Work Together</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OPPORTUNITIES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-brand-white rounded-2xl border border-black/8 p-6 hover:shadow-md hover:border-brand-gold/20 transition-all">
                <Icon size={22} className="text-brand-gold mb-4" strokeWidth={1.5} />
                <h3 className="font-semibold text-brand-black text-sm mb-2 leading-snug">{title}</h3>
                <p className="text-black/50 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-brand-cream-dark rounded-2xl border border-black/8 p-6 text-center">
            <p className="text-brand-black font-semibold mb-1">Custom packages available</p>
            <p className="text-black/50 text-sm">Budget and reach tailored to your brand objectives. Fill the form below.</p>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Get in Touch</p>
            <h2 className="font-serif text-3xl font-bold text-brand-black mb-2">Request a Sponsorship Offer</h2>
            <p className="text-black/50 text-sm">We will respond with a tailored proposal within 48 hours.</p>
          </div>

          {submitted ? (
            <div className="bg-brand-white rounded-2xl border border-black/8 p-12 text-center">
              <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-brand-gold" strokeWidth={2} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-black mb-2">Inquiry Received</h3>
              <p className="text-black/50 text-sm">We will be in touch within 48 hours with a custom proposal.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-brand-white rounded-2xl border border-black/8 p-8 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label="Company Name" required value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Your company" />
                <Input label="Contact Person" required value={form.contact} onChange={(e) => set('contact', e.target.value)} placeholder="Your name" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label="Email" required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@company.com" />
                <Input label="Phone" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+355..." />
              </div>
              <Select
                label="Area of Interest"
                required
                options={INTEREST_OPTIONS}
                value={form.interest}
                onChange={(e) => set('interest', e.target.value)}
              />
              <Select
                label="Indicative Budget"
                options={[
                  { label: '< €1,000', value: '<1000' },
                  { label: '€1,000 – €5,000', value: '1000-5000' },
                  { label: '€5,000 – €15,000', value: '5000-15000' },
                  { label: '€15,000+', value: '15000+' },
                  { label: 'Prefer to discuss', value: 'discuss' },
                ]}
                value={form.budget}
                onChange={(e) => set('budget', e.target.value)}
              />
              <Textarea label="Message" required rows={4} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Tell us about your goals and what you are looking to achieve..." />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="pt-4 border-t border-black/6 flex justify-end">
                <button type="submit" disabled={loading} className="bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50">
                  {loading ? 'Duke dërguar...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
