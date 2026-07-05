import { Check } from 'lucide-react'
import Link from 'next/link'

const PACKAGES = [
  {
    name: 'Paketa Starter',
    price: '€350',
    period: '/muaj',
    tagline: 'Fillo udhëtimin tënd',
    features: [
      '2 sesione coaching/muaj (60 min)',
      'Email support ndërmjet sesioneve',
      'Materiale dhe burime personalizuara',
      'Goal-setting framework',
    ],
    cta: 'Fillo Tani',
    highlighted: false,
  },
  {
    name: 'Paketa Growth',
    price: '€650',
    period: '/muaj',
    tagline: 'Ndërtim i qëndrueshëm',
    features: [
      '4 sesione coaching/muaj (60 min)',
      'Priority email & WhatsApp support',
      'Materiale dhe burime personalizuara',
      'Accountability check-ins javore',
      'Akses në regjistrime sesionesh',
    ],
    cta: 'Apliko Tani',
    highlighted: true,
  },
  {
    name: 'Paketa Executive',
    price: '€1,200',
    period: '/muaj',
    tagline: 'Performancë maksimale',
    features: [
      '8 sesione coaching/muaj (90 min)',
      'Akses i drejtpërdrejtë 24/7',
      'Strategji dhe plan veprimi i plotë',
      'Mentorship & advisory i vazhdueshëm',
      'Rrjet ekskluziv lidhje biznesi',
      'Sesion bonus çdo tremujor',
    ],
    cta: 'Apliko Tani',
    highlighted: false,
  },
]

export function CoachingSection() {
  return (
    <section className="bg-brand-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">1:1 Coaching</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-white mb-4">
            Paketa Coaching
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Coaching personal me Alketa Vejsiu — i dizajnuar për liderë, sipërmarrëse, dhe gra me ambicie të mëdha.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-3xl p-8 flex flex-col ${
                pkg.highlighted
                  ? 'bg-brand-gold border-2 border-brand-gold'
                  : 'bg-brand-dark border border-white/10 hover:border-white/20'
              } transition-all`}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-black text-brand-gold text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  Më i Zgjedhur
                </span>
              )}

              <div className="mb-6">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${pkg.highlighted ? 'text-brand-black/60' : 'text-white/40'}`}>
                  {pkg.name}
                </p>
                <div className="flex items-end gap-1 mb-1">
                  <span className={`font-serif text-4xl font-bold ${pkg.highlighted ? 'text-brand-black' : 'text-brand-white'}`}>
                    {pkg.price}
                  </span>
                  <span className={`text-sm mb-1.5 ${pkg.highlighted ? 'text-brand-black/60' : 'text-white/40'}`}>
                    {pkg.period}
                  </span>
                </div>
                <p className={`text-sm ${pkg.highlighted ? 'text-brand-black/70' : 'text-white/50'}`}>
                  {pkg.tagline}
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className={`mt-0.5 flex-shrink-0 ${pkg.highlighted ? 'text-brand-black' : 'text-brand-gold'}`}
                    />
                    <span className={`text-sm ${pkg.highlighted ? 'text-brand-black/80' : 'text-white/60'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/coaching"
                className={`w-full inline-flex items-center justify-center py-3.5 rounded-full text-sm font-semibold transition-colors ${
                  pkg.highlighted
                    ? 'bg-brand-black text-brand-gold hover:bg-brand-dark'
                    : 'bg-white/10 text-brand-white hover:bg-white/20'
                }`}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-sm mt-10">
          Nuk je e sigurt cilën pakëtë të zgjedhësh?{' '}
          <Link href="/coaching" className="text-brand-gold hover:underline">
            Rezervo një sesion discovery falas →
          </Link>
        </p>
      </div>
    </section>
  )
}
