import Link from 'next/link'
import { MapPin, Briefcase, ArrowRight } from 'lucide-react'
import { getOpenPositions } from '@/lib/jobs'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

export const revalidate = 300

const T: Record<Lang, { badge: string; subtitle: string; noneTitle: string; noneDesc: string; spontaneous: string; apply: string; requirements: string }> = {
  en: {
    badge: 'Careers',
    subtitle: "Open positions on the Grow and Inspire team. If you don't find what you're looking for, write to us anyway.",
    noneTitle: 'No open positions at the moment',
    noneDesc: "We don't have published roles right now, but we keep reading every application. Send your CV and we'll reach out when something suitable opens up.",
    spontaneous: 'Apply spontaneously',
    apply: 'Apply',
    requirements: 'Requirements',
  },
  sq: {
    badge: 'Karriera',
    subtitle: 'Pozicionet e hapura në ekipin e Grow and Inspire. Nëse nuk gjen atë që kërkon, na shkruaj gjithsesi.',
    noneTitle: 'Asnjë pozicion i hapur për momentin',
    noneDesc: 'Nuk kemi role të publikuara tani, por vazhdojmë të lexojmë çdo aplikim. Dërgo CV-në tënde dhe të kontaktojmë kur të hapet diçka e përshtatshme.',
    spontaneous: 'Apliko spontanisht',
    apply: 'Apliko',
    requirements: 'Kërkesat',
  },
}

export default async function CareersPage() {
  const positions = await getOpenPositions()
  const lang = await getLang()
  const t = T[lang]

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t.badge}</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">Work with Class</h1>
          <p className="text-white/50 text-lg max-w-xl">
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {positions.length === 0 ? (
            <div className="bg-brand-white rounded-2xl border border-black/8 p-12 text-center">
              <h2 className="font-serif text-2xl font-bold text-brand-black mb-2">
                {t.noneTitle}
              </h2>
              <p className="text-black/50 text-sm max-w-md mx-auto mb-8">
                {t.noneDesc}
              </p>
              <Link
                href="/apply?tab=job"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
              >
                {t.spontaneous} <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {positions.map((p) => (
                <div key={p.id} className="bg-brand-white rounded-2xl border border-black/8 p-6 lg:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-brand-black mb-2">{p.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-black/40">
                        {p.department && (
                          <span className="flex items-center gap-1.5">
                            <Briefcase size={12} /> {p.department}
                          </span>
                        )}
                        {p.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} /> {p.location}
                          </span>
                        )}
                        {p.employment_type && (
                          <span className="bg-brand-gold/10 text-brand-gold font-semibold px-2.5 py-1 rounded-full">
                            {p.employment_type}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/apply?tab=job&role=${encodeURIComponent(p.title)}`}
                      className="shrink-0 inline-flex items-center gap-2 bg-brand-black text-brand-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
                    >
                      {t.apply} <ArrowRight size={14} />
                    </Link>
                  </div>

                  {p.description && (
                    <p className="text-black/60 text-sm leading-relaxed mb-5 whitespace-pre-line">
                      {p.description}
                    </p>
                  )}

                  {p.requirements && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-2">
                        {t.requirements}
                      </p>
                      <ul className="space-y-1.5">
                        {p.requirements
                          .split('\n')
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((line) => (
                            <li key={line} className="flex items-start gap-2 text-sm text-black/60">
                              <span className="text-brand-gold mt-1.5 w-1 h-1 rounded-full bg-brand-gold shrink-0" />
                              {line}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
