import Link from 'next/link'
import { MapPin, Briefcase, ArrowRight } from 'lucide-react'
import { getOpenPositions } from '@/lib/jobs'

export const revalidate = 300

export default async function CareersPage() {
  const positions = await getOpenPositions()

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Karriera</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">Work with Class</h1>
          <p className="text-white/50 text-lg max-w-xl">
            Pozicionet e hapura në ekipin e Grow and Inspire. Nëse nuk gjen atë që kërkon, na shkruaj
            gjithsesi.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {positions.length === 0 ? (
            <div className="bg-brand-white rounded-2xl border border-black/8 p-12 text-center">
              <h2 className="font-serif text-2xl font-bold text-brand-black mb-2">
                Asnjë pozicion i hapur për momentin
              </h2>
              <p className="text-black/50 text-sm max-w-md mx-auto mb-8">
                Nuk kemi role të publikuara tani, por vazhdojmë të lexojmë çdo aplikim. Dërgo CV-në
                tënde dhe të kontaktojmë kur të hapet diçka e përshtatshme.
              </p>
              <Link
                href="/apply?tab=job"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
              >
                Apliko spontanisht <ArrowRight size={15} />
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
                      Apliko <ArrowRight size={14} />
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
                        Kërkesat
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
