'use client'

import { useState } from 'react'
import { Lightbulb, TrendingUp, ChevronDown } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/FormField'
import { submitApplication } from '@/lib/actions/forms'

export function AngelInvestorSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', project: '', phase: '', description: '' })
  // Form is collapsed behind its header on phone; always open on desktop.
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await submitApplication({
      type: 'investment',
      name: form.name,
      email: form.email,
      payload: {
        phone: form.phone,
        project: form.project,
        phase: form.phase,
        description: form.description,
      },
    })
    setLoading(false)
    if (result.ok) setSubmitted(true)
    else setError('Ka ndodhur një problem. Ju lutem provoni sërish.')
  }

  return (
    <section className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - info */}
          <div>
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Mundësi Investimi</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-6">
              Ideas and Angel Investor
            </h2>
            <p className="text-black/60 text-lg leading-relaxed mb-8">
              Ke një ide biznesi me potencial? Grow and Inspire lidh sipërmarrëset e talentuar me investitorë angjell dhe mentorë strategjik. Nëse ke vizion dhe vendosmëri - ne kemi rrjetin dhe burimet.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                  <Lightbulb size={18} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-brand-black mb-1">Pitch dhe Feedback</p>
                  <p className="text-black/50 text-sm">Prezanto idenë tënde para panelit tonë dhe merr feedback të vlefshëm nga ekspertë të industrisë.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                  <TrendingUp size={18} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-brand-black mb-1">Lidhje me Investitorë</p>
                  <p className="text-black/50 text-sm">Projektet e zgjedhura prezantohen drejtpërdrejt me investitorë angjell dhe fondacionet partnere.</p>
                </div>
              </div>
            </div>

            {/* Idea Tables themes */}
            <div className="mb-8">
              <p className="text-black/40 text-xs uppercase tracking-widest mb-4">Tematikat e Idea Tables</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Ide të Reja Biznesi',
                  'Gra me Ide',
                  'Ide Kreative dhe Media',
                  'Lifestyle dhe Wellbeing',
                  'Edukim dhe Projekte Rinore',
                  'Nga Ideja te Klienti i Parë',
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center bg-brand-gold/10 border border-brand-gold/25 text-brand-gold-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Process steps */}
            <div className="mb-8">
              <p className="text-black/40 text-xs uppercase tracking-widest mb-4">Si Funksionon</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { step: '1', label: 'Apliko', desc: 'Dërgo idenë tënde' },
                  { step: '2', label: 'Përzgjedhja', desc: 'Zgjedhim pjesëmarrëset' },
                  { step: '3', label: 'Idea Table', desc: 'Puno me ekspertë' },
                  { step: '4', label: 'Feedback', desc: 'Hapat e ardhshëm' },
                ].map((s) => (
                  <div key={s.step} className="bg-brand-white rounded-2xl border border-black/8 p-4 text-center">
                    <span className="font-serif text-brand-gold text-xl font-bold block mb-1">{s.step}</span>
                    <p className="text-brand-black text-xs font-semibold">{s.label}</p>
                    <p className="text-black/40 text-xs mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-black rounded-2xl p-6">
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-2">Kritere Bazë</p>
              <ul className="text-white/60 text-sm space-y-2">
                {[
                  'Ide origjinale me impakt të qartë',
                  'Pronare femër ose ko-themeluese femër',
                  'Treg i identifikuar dhe potencial rritjeje',
                  'Gatishmëri për mentorship 3-6 muaj',
                ].map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - form */}
          <div className="bg-brand-white rounded-3xl border border-black/8 p-8 shadow-sm">
            <button
              type="button"
              onClick={() => setFormOpen((o) => !o)}
              aria-expanded={formOpen}
              className="w-full flex items-center justify-between gap-4 text-left lg:pointer-events-none lg:cursor-default"
            >
              <span className="font-serif text-2xl font-bold text-brand-black">Dërgo Idenë Tënde</span>
              <ChevronDown
                size={22}
                strokeWidth={1.5}
                className={`text-brand-gold shrink-0 lg:hidden transition-transform ${formOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div className={`${formOpen ? 'block' : 'hidden'} lg:block mt-6`}>
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb size={20} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-xl text-brand-black font-medium mb-2">Ideja u dërgua!</p>
                <p className="text-black/50 text-sm">Ekipi ynë do ta shqyrtojë dhe do të kontaktojë brenda 5 ditëve pune.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Emri dhe Mbiemri" required placeholder="Emri juaj i plotë" value={form.name} onChange={(e) => set('name', e.target.value)} />
                <Input label="Email" type="email" required placeholder="email@juaj.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                <Input label="Numri i Telefonit" type="tel" placeholder="+355 6X XXX XXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                <Input label="Emri i Projektit / Startup" required placeholder="Emri i idesë suaj" value={form.project} onChange={(e) => set('project', e.target.value)} />
                <Select
                  label="Faza e Projektit"
                  required
                  options={[
                    { label: 'Ide - ende pa filluar', value: 'idea' },
                    { label: 'Prototip / MVP', value: 'mvp' },
                    { label: 'Biznes aktiv (nën 1 vit)', value: 'early' },
                    { label: 'Biznes në rritje (1+ vit)', value: 'growth' },
                  ]}
                  value={form.phase}
                  onChange={(e) => set('phase', e.target.value)}
                />
                <Textarea
                  label="Përshkruaj idenë tënde"
                  required
                  placeholder="Çfarë problem zgjidh? Kush është tregu? Pse tani?..."
                  rows={4}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-black text-brand-white py-3.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50"
                >
                  {loading ? 'Duke dërguar...' : 'Dërgo Aplikimin'}
                </button>
              </form>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
