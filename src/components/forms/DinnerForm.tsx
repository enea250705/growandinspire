'use client'

import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/FormField'
import { Check } from 'lucide-react'

interface FormData {
  fullName: string
  email: string
  phone: string
  profession: string
  reason: string
  social: string
}

const EMPTY: FormData = {
  fullName: '', email: '', phone: '', profession: '', reason: '', social: '',
}

export function DinnerForm() {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [submitted, setSubmitted] = useState(false)

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true) /* TODO: POST to /api/dinner */
  }

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
      <div className="p-8 border-b border-black/8">
        <h2 className="font-serif text-2xl font-bold text-brand-black mb-1">Apply for Dinner with Alketa</h2>
        <p className="text-black/50 text-sm">We review every application carefully.</p>
      </div>

      <form onSubmit={submit} className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Input label="Full Name" required value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Arta Kola" />
          </div>
          <Input label="Email Address" required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="arta@example.com" />
          <Input label="Phone Number" required type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+355 69 123 4567" />
          <div className="sm:col-span-2">
            <Input label="Profession / Business" required value={form.profession} onChange={(e) => set('profession', e.target.value)} placeholder="CEO, Designer, Lawyer..." />
          </div>
          <div className="sm:col-span-2">
            <Textarea label="Why do you want to join Dinner with Alketa?" required rows={5} value={form.reason} onChange={(e) => set('reason', e.target.value)} placeholder="Tell us what draws you to this experience..." />
          </div>
          <div className="sm:col-span-2">
            <Input label="Social media or website link (optional)" value={form.social} onChange={(e) => set('social', e.target.value)} placeholder="https://linkedin.com/in/..." />
          </div>
        </div>

        <div className="flex justify-end mt-8 pt-6 border-t border-black/6">
          <button
            type="submit"
            className="bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  )
}
