'use client'

import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/FormField'
import { Check, Briefcase, Mic2, Lightbulb } from 'lucide-react'
import { submitApplication } from '@/lib/actions/forms'
import { createClient } from '@/lib/supabase/client'

type TabType = 'job' | 'guest' | 'investment'

const TABS: { id: TabType; label: string; icon: React.ElementType; desc: string }[] = [
  { id: 'job', label: 'Work with Class', icon: Briefcase, desc: 'Join the Class Media team' },
  { id: 'guest', label: 'Become a Guest', icon: Mic2, desc: 'Appear on a podcast or event' },
  { id: 'investment', label: 'Idea Tables', icon: Lightbulb, desc: 'Pitch your brilliant idea' },
]

type SubmittedState = Partial<Record<TabType, boolean>>

export function ApplyForm() {
  const [active, setActive] = useState<TabType>('job')
  const [submitted, setSubmitted] = useState<SubmittedState>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [job, setJob] = useState({ name: '', email: '', role: '', message: '' })
  const [guest, setGuest] = useState({ name: '', email: '', bio: '', reason: '', social: '' })
  const [invest, setInvest] = useState({ name: '', email: '', idea: '', sector: '', pitch: '' })
  const [cvFile, setCvFile] = useState<File | null>(null)

  async function submit() {
    setLoading(true)
    setError('')

    let result
    if (active === 'job') {
      // Upload CV to the private 'cvs' bucket first (if provided).
      let cvPath = ''
      if (cvFile) {
        const supabase = createClient()
        const ext = cvFile.name.split('.').pop() ?? 'pdf'
        const path = `${crypto.randomUUID()}.${ext}`
        const { error: upErr } = await supabase.storage.from('cvs').upload(path, cvFile)
        if (upErr) {
          setLoading(false)
          setError('Ngarkimi i CV-së dështoi. Provo sërish ose hiq skedarin.')
          return
        }
        cvPath = path
      }
      result = await submitApplication({
        type: 'job',
        name: job.name,
        email: job.email,
        payload: { role: job.role, message: job.message, cv_path: cvPath },
      })
    } else if (active === 'guest') {
      result = await submitApplication({
        type: 'guest',
        name: guest.name,
        email: guest.email,
        payload: { bio: guest.bio, reason: guest.reason, social: guest.social },
      })
    } else {
      result = await submitApplication({
        type: 'investment',
        name: invest.name,
        email: invest.email,
        payload: { idea: invest.idea, sector: invest.sector, pitch: invest.pitch },
      })
    }

    setLoading(false)
    if (result.ok) {
      setSubmitted((s) => ({ ...s, [active]: true }))
    } else {
      setError('Ka ndodhur një problem. Ju lutem provoni sërish.')
    }
  }

  const isSubmitted = submitted[active]

  return (
    <div>
      {/* Tab selector */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        {TABS.map(({ id, label, icon: Icon, desc }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex-1 text-left p-5 rounded-2xl border transition-all ${
              active === id
                ? 'bg-brand-black border-brand-black text-brand-white'
                : 'bg-brand-white border-black/8 text-brand-black hover:border-black/20'
            }`}
          >
            <Icon size={18} className="text-brand-gold mb-2" strokeWidth={1.5} />
            <p className="font-semibold text-sm">{label}</p>
            <p className={`text-xs mt-0.5 ${active === id ? 'text-white/50' : 'text-black/40'}`}>{desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-brand-white rounded-2xl border border-black/8 p-8">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-brand-gold" strokeWidth={2} />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-black mb-2">Application Sent</h3>
            <p className="text-black/50 text-sm">We review every application. You&apos;ll hear from us soon.</p>
            <button
              onClick={() => setSubmitted((s) => ({ ...s, [active]: false }))}
              className="mt-6 text-brand-gold text-sm font-medium hover:underline"
            >
              Submit another
            </button>
          </div>
        ) : (
          <>
            {active === 'job' && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Full Name" required value={job.name} onChange={(e) => setJob({ ...job, name: e.target.value })} placeholder="Your name" />
                  <Input label="Email" required type="email" value={job.email} onChange={(e) => setJob({ ...job, email: e.target.value })} placeholder="you@example.com" />
                </div>
                <Input label="Role you are applying for" required value={job.role} onChange={(e) => setJob({ ...job, role: e.target.value })} placeholder="Video editor, Social media manager..." />
                <Textarea label="Cover message" required rows={5} value={job.message} onChange={(e) => setJob({ ...job, message: e.target.value })} placeholder="Tell us about yourself and why you want to work with Class..." />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-brand-black">
                    CV / Resume <span className="text-black/30 text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                    className="border border-black/15 rounded-lg px-4 py-2.5 text-sm bg-brand-white focus:outline-none focus:border-brand-gold transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-gold/15 file:text-brand-gold-dark hover:file:bg-brand-gold/25 cursor-pointer"
                  />
                  <p className="text-xs text-black/35">PDF, DOC, or DOCX - Max 5MB</p>
                </div>
              </div>
            )}

            {active === 'guest' && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Full Name" required value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} placeholder="Your name" />
                  <Input label="Email" required type="email" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} placeholder="you@example.com" />
                </div>
                <Textarea label="Short bio" required rows={3} value={guest.bio} onChange={(e) => setGuest({ ...guest, bio: e.target.value })} placeholder="Who you are and what you do..." />
                <Textarea label="Why do you want to participate?" required rows={4} value={guest.reason} onChange={(e) => setGuest({ ...guest, reason: e.target.value })} placeholder="What story or perspective would you bring?" />
                <Input label="Website / LinkedIn / Social" value={guest.social} onChange={(e) => setGuest({ ...guest, social: e.target.value })} placeholder="https://..." />
              </div>
            )}

            {active === 'investment' && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Full Name" required value={invest.name} onChange={(e) => setInvest({ ...invest, name: e.target.value })} placeholder="Your name" />
                  <Input label="Email" required type="email" value={invest.email} onChange={(e) => setInvest({ ...invest, email: e.target.value })} placeholder="you@example.com" />
                </div>
                <Textarea label="Describe your idea" required rows={5} value={invest.idea} onChange={(e) => setInvest({ ...invest, idea: e.target.value })} placeholder="What problem does it solve? Who is it for?" />
                <Input label="Industry / Sector" required value={invest.sector} onChange={(e) => setInvest({ ...invest, sector: e.target.value })} placeholder="Tech, Fashion, Food, Real Estate..." />
                <Input label="Pitch deck / link (optional)" value={invest.pitch} onChange={(e) => setInvest({ ...invest, pitch: e.target.value })} placeholder="https://..." />
              </div>
            )}

            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            <div className="mt-8 pt-6 border-t border-black/6 flex justify-end">
              <button
                onClick={submit}
                disabled={loading}
                className="bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50"
              >
                {loading ? 'Duke dërguar...' : 'Submit Application'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
