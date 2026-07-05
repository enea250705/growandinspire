'use client'

import { useState } from 'react'
import { UtensilsCrossed } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/FormField'

export function DinnerSection() {
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
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Eksperiencë Ekskluzive</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-6">
              Dinner with Alketa
            </h2>
            <p className="text-black/60 text-lg leading-relaxed mb-8">
              Një darkë networking intime me Alketa Vejsiu — ushqim i zgjedhur, ambient premium, dhe biseda që inspirojnë. Vende të kufizuara për gratë lider dhe sipërmarrëse me vizion.
            </p>

            <div className="space-y-4">
              {[
                { label: 'Ushqim & Pije', desc: 'Meny e kuruar, verëra të zgjedhura, dhe ëmbëlsira artizanale.' },
                { label: 'Ambient', desc: 'Lokacion premium me ndriçim intimate dhe dekor të kujdesshëm.' },
                { label: 'Audio-Vizual', desc: 'Prezantime të shkurtra inspiruese dhe momente të dokumentuara.' },
                { label: 'Networking', desc: 'Lidhje reale me gra të suksesshme nga fusha të ndryshme.' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-gold mt-2" />
                  <div>
                    <p className="font-semibold text-brand-black text-sm">{item.label}</p>
                    <p className="text-black/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-3 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl px-5 py-4">
              <UtensilsCrossed size={20} className="text-brand-gold" strokeWidth={1.5} />
              <p className="text-sm text-brand-black font-medium">Vende të kufizuara — apliko tani</p>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-brand-white rounded-3xl border border-black/8 p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-brand-black mb-6">Formular Aplikimi</h3>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed size={20} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-xl text-brand-black font-medium mb-2">Aplikimi u dërgua!</p>
                <p className="text-black/50 text-sm">Do të kontaktohesh brenda 48 orëve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Emri & Mbiemri" required placeholder="Emri juaj i plotë" />
                <Input label="Email" type="email" required placeholder="email@juaj.com" />
                <Input label="Numri i Telefonit" type="tel" placeholder="+355 6X XXX XXXX" />
                <Input label="Profesioni / Fusha" placeholder="p.sh. Sipërmarrëse, CEO, Konsulente..." />
                <Textarea
                  label="Pse dëshiron të jesh pjesë?"
                  required
                  placeholder="Ndaj pak nga historia dhe motivimi yt..."
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
