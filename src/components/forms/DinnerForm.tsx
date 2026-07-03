'use client'

import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/FormField'
import { Check } from 'lucide-react'

const STEPS = ['Personal Info', 'Your Background', 'Your Goals', 'Review']

interface FormData {
  fullName: string
  email: string
  phone: string
  profession: string
  company: string
  website: string
  reason: string
  impact: string
  goals: string
  experience: string
}

const EMPTY: FormData = {
  fullName: '', email: '', phone: '', profession: '',
  company: '', website: '', reason: '', impact: '', goals: '', experience: '',
}

export function DinnerForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(EMPTY)
  const [submitted, setSubmitted] = useState(false)

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function next() { setStep((s) => Math.min(s + 1, 3)) }
  function back() { setStep((s) => Math.max(s - 1, 0)) }
  function submit() { setSubmitted(true) /* TODO: POST to /api/dinner */ }

  if (submitted) {
    return (
      <div className="bg-brand-white rounded-2xl border border-black/8 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-brand-gold" strokeWidth={2} />
        </div>
        <h3 className="font-serif text-2xl font-bold text-brand-black mb-3">Application Submitted</h3>
        <p className="text-black/50 max-w-sm mx-auto">
          We review every application carefully. You&apos;ll hear from us within 5–7 business days.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-brand-white rounded-2xl border border-black/8 overflow-hidden">
      {/* Step header */}
      <div className="p-8 border-b border-black/8">
        <h2 className="font-serif text-2xl font-bold text-brand-black mb-1">Apply for Dinner with Alketa</h2>
        <p className="text-black/50 text-sm">We review every application carefully.</p>

        {/* Step indicators */}
        <div className="flex items-center gap-0 mt-6">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i < step ? 'bg-brand-gold text-brand-black'
                  : i === step ? 'bg-brand-black text-brand-white'
                  : 'bg-black/8 text-black/40'
                }`}>
                  {i < step ? <Check size={13} strokeWidth={3} /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-brand-black' : 'text-black/40'}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px flex-1 mx-3 ${i < step ? 'bg-brand-gold' : 'bg-black/10'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="p-8">
        {step === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <Input label="Full Name" required value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Arta Kola" />
            </div>
            <Input label="Email Address" required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="arta@example.com" />
            <Input label="Phone Number" required type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+355 69 123 4567" />
            <Input label="Profession / Role" required value={form.profession} onChange={(e) => set('profession', e.target.value)} placeholder="CEO, Designer, Lawyer..." />
            <Input label="Company / Business" required value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Company name" />
            <div className="sm:col-span-2">
              <Input label="Website / LinkedIn" value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://linkedin.com/in/..." />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <Textarea label="Why do you want to join Dinner with Alketa?" required rows={5} value={form.reason} onChange={(e) => set('reason', e.target.value)} placeholder="Tell us what draws you to this experience..." />
            <Textarea label="What impact are you looking to create?" required rows={5} value={form.impact} onChange={(e) => set('impact', e.target.value)} placeholder="In your business, community, or life..." />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <Textarea label="What are your top goals for the next 12 months?" required rows={5} value={form.goals} onChange={(e) => set('goals', e.target.value)} placeholder="Business goals, personal milestones, projects..." />
            <Textarea label="Describe a significant challenge you have overcome" required rows={5} value={form.experience} onChange={(e) => set('experience', e.target.value)} placeholder="Share a story that shaped who you are today..." />
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <p className="text-black/50 text-sm mb-2">Please review your application before submitting.</p>
            {[
              ['Full Name', form.fullName],
              ['Email', form.email],
              ['Phone', form.phone],
              ['Profession', form.profession],
              ['Company', form.company],
              ['Why this dinner', form.reason],
              ['Impact goal', form.impact],
              ['12-month goals', form.goals],
            ].map(([label, value]) => value && (
              <div key={label} className="border-b border-black/6 pb-3">
                <p className="text-xs font-semibold text-black/40 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-sm text-brand-black">{value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-black/6">
          {step > 0 ? (
            <button onClick={back} className="text-sm text-black/50 hover:text-brand-black transition-colors">
              ← Back
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              onClick={next}
              className="bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
            >
              Next Step →
            </button>
          ) : (
            <button
              onClick={submit}
              className="bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
