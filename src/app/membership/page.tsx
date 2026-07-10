import { Check } from 'lucide-react'
import Link from 'next/link'
import { MembershipForm } from '@/components/forms/MembershipForm'
import { getPublishedPlans, planFeatures } from '@/lib/plans'

const COMPARISON = [
  { feature: 'Learning Hub', individual: true, professional: true, corporate: true },
  { feature: 'Grow Exclusive library', individual: true, professional: true, corporate: true },
  { feature: 'Live Q&A sessions', individual: true, professional: true, corporate: true },
  { feature: '4 business events / year', individual: true, professional: true, corporate: true },
  { feature: 'Coaching group access', individual: false, professional: true, corporate: true },
  { feature: 'Dinner with Alketa priority', individual: false, professional: true, corporate: true },
  { feature: 'Team seats (up to 5)', individual: false, professional: false, corporate: true },
  { feature: 'Sponsorship options', individual: false, professional: false, corporate: true },
]

export default async function MembershipPage() {
  const plans = await getPublishedPlans()
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Membership</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">
            Join the Circle
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Choose the plan that fits your ambition. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  plan.highlight
                    ? 'bg-brand-black border-brand-gold/40 shadow-xl'
                    : 'bg-brand-white border-black/8'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-gold text-brand-black text-xs font-bold px-4 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${plan.highlight ? 'text-brand-gold' : 'text-black/40'}`}>
                    {plan.label}
                  </p>
                  <div className="flex items-end gap-1 mb-3">
                    <span className={`font-serif text-5xl font-bold ${plan.highlight ? 'text-brand-white' : 'text-brand-black'}`}>
                      €{plan.price}
                    </span>
                    <span className={`text-sm mb-2 ${plan.highlight ? 'text-white/40' : 'text-black/40'}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-sm ${plan.highlight ? 'text-white/60' : 'text-black/50'}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {planFeatures(plan.features).map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={15} className="text-brand-gold shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-black/70'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.cta_href || '/login'}
                  className={`w-full text-center py-3.5 rounded-full text-sm font-semibold transition-colors ${
                    plan.highlight
                      ? 'bg-brand-gold text-brand-black hover:bg-brand-gold-light'
                      : 'bg-brand-black text-brand-white hover:bg-brand-dark'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Circle signup form */}
      <section id="join" className="pb-20 lg:pb-28 scroll-mt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <MembershipForm />
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-brand-black text-center mb-10">
            What&apos;s Included
          </h2>
          <div className="bg-brand-white rounded-2xl border border-black/8 overflow-hidden">
            <div className="grid grid-cols-4 bg-brand-black text-brand-white text-xs font-semibold uppercase tracking-widest">
              <div className="p-4">Feature</div>
              <div className="p-4 text-center">Individual</div>
              <div className="p-4 text-center text-brand-gold">Professional</div>
              <div className="p-4 text-center">Corporate</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 text-sm border-t border-black/6 ${i % 2 === 0 ? 'bg-white' : 'bg-brand-cream/40'}`}
              >
                <div className="p-4 text-black/70 font-medium">{row.feature}</div>
                <div className="p-4 flex justify-center">
                  {row.individual ? <Check size={16} className="text-brand-gold" strokeWidth={2.5} /> : <span className="text-black/20">-</span>}
                </div>
                <div className="p-4 flex justify-center">
                  {row.professional ? <Check size={16} className="text-brand-gold" strokeWidth={2.5} /> : <span className="text-black/20">-</span>}
                </div>
                <div className="p-4 flex justify-center">
                  {row.corporate ? <Check size={16} className="text-brand-gold" strokeWidth={2.5} /> : <span className="text-black/20">-</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-black py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-white mb-4">Not sure which plan?</h2>
          <p className="text-white/50 mb-8">Start free - upgrade when you&apos;re ready.</p>
          <Link
            href="#join"
            className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
          >
            Join Free
          </Link>
        </div>
      </section>
    </div>
  )
}
