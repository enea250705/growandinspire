import Link from 'next/link'
import { Calendar, Users } from 'lucide-react'

export function EventHighlights() {
  return (
    <section className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conference card */}
          <div className="bg-brand-black rounded-3xl overflow-hidden flex flex-col">
            <div className="p-10 flex flex-col flex-1">
              <span className="inline-block bg-brand-gold/20 text-brand-gold text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6 w-fit">
                Annual Conference
              </span>
              <h3 className="font-serif text-3xl font-bold text-brand-white mb-4 leading-snug">
                Inspire Business Conference
              </h3>
              <p className="text-white/50 leading-relaxed mb-6 flex-1">
                Dy ditë keynote, panel ekspertësh, Smart Talks dhe networking. Evenimentja kryesore vjetore për liderë biznesi shqiptarë.
              </p>
              <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <Calendar size={13} className="text-brand-gold" />
                  2 ditë · Prill 25–26, 2026
                </div>
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <span className="text-brand-gold font-bold text-base">€</span>
                  150 – 175€ për person
                </div>
              </div>
              <Link
                href="/coaching#conference-register"
                className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors w-fit"
              >
                Regjistrohu →
              </Link>
            </div>
          </div>

          {/* Dinner card */}
          <div className="bg-brand-cream-dark rounded-3xl border border-black/10 overflow-hidden flex flex-col">
            <div className="p-10 flex flex-col flex-1">
              <span className="inline-block bg-brand-gold/15 text-brand-gold-dark text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6 w-fit">
                Ekskluzive
              </span>
              <h3 className="font-serif text-3xl font-bold text-brand-black mb-4 leading-snug">
                Dinner with Alketa
              </h3>
              <p className="text-black/60 leading-relaxed mb-6 flex-1">
                Një darkë ekskluzive me njerëz të zgjedhur me kujdes. Biseda që lënë gjurmë. Pa prezantime. Pa panele. Dialog i pastër.
              </p>
              <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center gap-2 text-black/40 text-sm">
                  <Users size={13} className="text-brand-gold-dark" />
                  8–12 persona · Me ftesë
                </div>
              </div>
              <Link
                href="/dinner-with-alketa"
                className="inline-flex items-center justify-center bg-brand-black text-brand-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors w-fit"
              >
                Apliko tani →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
