import { Check } from 'lucide-react'
import Link from 'next/link'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  badge: string
  title: string
  desc: string[]
  popular: string
  unsure: string
  discovery: string
  packages: {
    name: string
    price: string
    period: string
    tagline: string
    features: string[]
    cta: string
    highlighted: boolean
  }[]
}> = {
  en: {
    badge: 'Coaching',
    title: 'Clarity is the beginning of every meaningful decision.',
    desc: [
      "Growth isn't about doing more. It's about knowing what truly matters.",
      'Through a personalised coaching journey, you will gain the clarity, confidence and direction needed to lead yourself, your team and your business with purpose.',
    ],
    popular: 'Most Popular',
    unsure: 'Not sure which package to choose?',
    discovery: 'Book a free discovery session →',
    packages: [
      {
        name: 'Starter Package',
        price: '€350',
        period: '/month',
        tagline: 'Begin your journey',
        features: [
          '2 coaching sessions/month (60 min)',
          'Email support between sessions',
          'Personalized materials and resources',
          'Goal-setting framework',
        ],
        cta: 'Start Now',
        highlighted: false,
      },
      {
        name: 'Growth Package',
        price: '€650',
        period: '/month',
        tagline: 'Sustainable growth',
        features: [
          '4 coaching sessions/month (60 min)',
          'Priority email and WhatsApp support',
          'Personalized materials and resources',
          'Weekly accountability check-ins',
          'Access to session recordings',
        ],
        cta: 'Apply Now',
        highlighted: true,
      },
      {
        name: 'Executive Package',
        price: '€1,200',
        period: '/month',
        tagline: 'Maximum performance',
        features: [
          '8 coaching sessions/month (90 min)',
          'Direct 24/7 access',
          'Full strategy and action plan',
          'Ongoing mentorship and advisory',
          'Exclusive business connections network',
          'Bonus session every quarter',
        ],
        cta: 'Apply Now',
        highlighted: false,
      },
    ],
  },
  sq: {
    badge: 'Coaching',
    title: 'Çdo vendim i rëndësishëm fillon me qartësi.',
    desc: [
      'Rritja nuk vjen duke bërë më shumë. Vjen duke ditur çfarë ka vërtet rëndësi.',
      'Programet tona të coaching-ut janë krijuar për t\'ju ndihmuar të fitoni qartësi, besim dhe drejtim në lidership, biznes dhe zhvillimin tuaj personal.',
    ],
    popular: 'Më i Zgjedhur',
    unsure: 'Nuk je e sigurt cilën paketë të zgjedhësh?',
    discovery: 'Rezervo një sesion discovery falas →',
    packages: [
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
          'Priority email dhe WhatsApp support',
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
          'Mentorship dhe advisory i vazhdueshëm',
          'Rrjet ekskluziv lidhje biznesi',
          'Sesion bonus çdo tremujor',
        ],
        cta: 'Apliko Tani',
        highlighted: false,
      },
    ],
  },
}

export async function CoachingSection() {
  const lang = await getLang()
  const c = CONTENT[lang]
  return (
    <section className="bg-brand-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">{c.badge}</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-white mb-5 max-w-3xl mx-auto">
            {c.title}
          </h2>
          <div className="text-white/50 text-lg max-w-2xl mx-auto space-y-4">
            {c.desc.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.packages.map((pkg) => (
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
                  {c.popular}
                </span>
              )}

              <div className="mb-6">
                <p className={`font-serif text-2xl font-bold mb-1 ${pkg.highlighted ? 'text-brand-black' : 'text-brand-white'}`}>
                  {pkg.name}
                </p>
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
          {c.unsure}{' '}
          <Link href="/coaching" className="text-brand-gold hover:underline">
            {c.discovery}
          </Link>
        </p>
      </div>
    </section>
  )
}
