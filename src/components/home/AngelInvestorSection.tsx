'use client'

import { useState } from 'react'
import { Lightbulb, TrendingUp } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/FormField'

export function AngelInvestorSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — info */}
          <div>
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Mundësi Investimi</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-6">
              Ideas & Angel Investor
            </h2>
            <p className="text-black/60 text-lg leading-relaxed mb-8">
              Ke një ide biznesi me potencial? Grow & Inspire lidh sipërmarrëset e talentuar me investitorë angjell dhe mentorë strategjik. Nëse ke vizion dhe vendosmëri — ne kemi rrjetin dhe burimet.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                  <Lightbulb size={18} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-brand-black mb-1">Pitch & Feedback</p>
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

          {/* Right — form */}
          <div className="bg-brand-white rounded-3xl border border-black/8 p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-brand-black mb-6">Dërgo Idenë Tënde</h3>

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
                <Input label="Emri & Mbiemri" required placeholder="Emri juaj i plotë" />
                <Input label="Email" type="email" required placeholder="email@juaj.com" />
                <Input label="Numri i Telefonit" type="tel" placeholder="+355 6X XXX XXXX" />
                <Input label="Emri i Projektit / Startup" required placeholder="Emri i idesë suaj" />
                <Select
                  label="Faza e Projektit"
                  required
                  options={[
                    { label: 'Ide — ende pa filluar', value: 'idea' },
                    { label: 'Prototip / MVP', value: 'mvp' },
                    { label: 'Biznes aktiv (nën 1 vit)', value: 'early' },
                    { label: 'Biznes në rritje (1+ vit)', value: 'growth' },
                  ]}
                />
                <Textarea
                  label="Përshkruaj idenë tënde"
                  required
                  placeholder="Çfarë problem zgjidh? Kush është tregu? Pse tani?..."
                  rows={4}
                />
                <button
                  type="submit"
                  className="w-full bg-brand-black text-brand-white py-3.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
                >
                  Dërgo Aplikimin
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
