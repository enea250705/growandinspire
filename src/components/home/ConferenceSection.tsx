'use client'

import { useState } from 'react'
import { Check, Users } from 'lucide-react'
import { Input, Select } from '@/components/ui/FormField'

const PRICES = [
  {
    name: 'Early Bird',
    price: '€150',
    badge: null,
    features: [
      'Hyrje në të dyja ditët',
      'Keynotes dhe panele',
      'Smart Talks',
      'Materiale konference',
    ],
  },
  {
    name: 'Standard',
    price: '€175',
    badge: 'Më Popullor',
    features: [
      'Hyrje në të dyja ditët',
      'Keynotes, panele dhe Smart Talks',
      'Grupet e diskutimit me ekspertë',
      'Networking me pjesëmarrëset',
    ],
  },
]

export function ConferenceSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Eveniment Vjetor</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-4">
            Grow and Inspire Business Conference
          </h2>
          <p className="text-black/60 text-lg max-w-2xl mx-auto">
            Konferenca më e rëndësishme për gratë lider dhe sipërmarrëse në Shqipëri. Speaker ndërkombëtarë, panel diskutime, dhe mundësi networking të vërteta.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-black/40 text-sm">
            <Users size={14} strokeWidth={1.5} />
            <span>300+ pjesëmarrëse çdo vit</span>
          </div>
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 max-w-3xl mx-auto">
          {PRICES.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 border transition-all ${
                i === 1
                  ? 'bg-brand-black border-brand-gold/30 shadow-xl scale-[1.02]'
                  : 'bg-brand-white border-black/8 hover:border-brand-gold/20'
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-black text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {tier.badge}
                </span>
              )}
              <p className={`text-sm font-medium mb-2 ${i === 1 ? 'text-brand-gold' : 'text-black/50'}`}>
                {tier.name}
              </p>
              <p className={`font-serif text-4xl font-bold mb-6 ${i === 1 ? 'text-brand-white' : 'text-brand-black'}`}>
                {tier.price}
              </p>
              <ul className="space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className={`mt-0.5 flex-shrink-0 ${i === 1 ? 'text-brand-gold' : 'text-brand-black/40'}`}
                    />
                    <span className={`text-sm ${i === 1 ? 'text-white/70' : 'text-black/60'}`}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <div className="max-w-xl mx-auto bg-brand-white rounded-3xl border border-black/8 p-8 shadow-sm">
          <h3 className="font-serif text-2xl font-bold text-brand-black mb-6 text-center">Regjistrohu</h3>

          {submitted ? (
            <div className="text-center py-8">
              <Check size={32} className="text-brand-gold mx-auto mb-4" strokeWidth={1.5} />
              <p className="font-serif text-xl text-brand-black font-medium mb-2">Regjistrimi u dërgua!</p>
              <p className="text-black/50 text-sm">Konfirmimi dhe detajet e pagesës do të vijnë me email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Emri dhe Mbiemri" required placeholder="Emri juaj i plotë" />
              <Input label="Email" type="email" required placeholder="email@juaj.com" />
              <Input label="Numri i Telefonit" type="tel" placeholder="+355 6X XXX XXXX" />
              <Select
                label="Paketa"
                required
                options={[
                  { label: 'Early Bird - €150', value: 'early-bird' },
                  { label: 'Standard - €175', value: 'standard' },
                ]}
              />
              <button
                type="submit"
                className="w-full bg-brand-black text-brand-white py-3.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
              >
                Konfirmo Regjistrimin
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
