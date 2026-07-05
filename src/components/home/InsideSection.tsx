'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Lock } from 'lucide-react'

type Tier = 'individual' | 'professional' | 'corporate'

const TIERS: { id: Tier; label: string }[] = [
  { id: 'individual', label: 'Individual' },
  { id: 'professional', label: 'Professional' },
  { id: 'corporate', label: 'Corporate' },
]

const TIER_CONTENT: Record<Tier, { title: string; items: string[] }> = {
  individual: {
    title: 'Aksesi Individual',
    items: [
      'Biblioteka e plotë e Learning Hub',
      'Sesione live Q&A me Alketën (mujore)',
      '4 evente biznesi në vit',
      'Networking me komunitetin',
      'Guida dhe template të shkarkueshme',
    ],
  },
  professional: {
    title: 'Aksesi Professional',
    items: [
      'Gjithçka nga Individual',
      'Regjistrim prioritar në evente',
      'Aksesi në grupet e vogla të coaching (tremujore)',
      'Business Growth Plan template',
      'Hyrje e hershme në contentet e reja',
      'Prioritet për Dinner with Alketa',
    ],
  },
  corporate: {
    title: 'Aksesi Corporate',
    items: [
      'Gjithçka nga Professional',
      'Deri në 5 anëtarë të ekipit',
      'Mundësi partneriteti sponsorizimi',
      'Konsiderim për slot folës (konferencë)',
      'Mundësi co-branding',
      'Takim prezantimi i dedikuar',
    ],
  },
}

export function InsideSection() {
  const [active, setActive] = useState<Tier>('individual')
  const content = TIER_CONTENT[active]

  return (
    <section className="bg-brand-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lock size={14} className="text-brand-gold" />
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em]">
              GROW Exclusive - vetëm për anëtarë
            </p>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-white">
            Çfarë përfshihet
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1 gap-1">
            {TIERS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  active === id
                    ? 'bg-brand-gold text-brand-black'
                    : 'text-white/50 hover:text-brand-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content panel */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-brand-dark rounded-2xl border border-white/10 overflow-hidden">
            {/* Header with lock */}
            <div className="bg-brand-black/60 px-8 py-5 flex items-center justify-between border-b border-white/10">
              <h3 className="font-serif text-lg font-semibold text-brand-white">{content.title}</h3>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Lock size={11} />
                Anëtarë vetëm
              </div>
            </div>

            {/* Locked items */}
            <div className="p-8">
              <ul className="flex flex-col gap-4">
                {content.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center shrink-0">
                      <Lock size={9} className="text-brand-gold" />
                    </div>
                    <span className="text-white/50 text-sm select-none blur-[1px]">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4 justify-between">
                <p className="text-white/40 text-sm">
                  Çliro këtë content me membership.
                </p>
                <Link
                  href="/membership"
                  className="shrink-0 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
                >
                  Shiko planet →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
