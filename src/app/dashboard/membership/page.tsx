import Link from 'next/link'
import { Check, Crown } from 'lucide-react'

const CURRENT_PLAN = {
  name: 'Premium Access',
  price: '€29/muaj',
  renewsOn: '1 Gusht, 2026',
}

const PLANS = [
  {
    name: 'Free Access',
    price: '€0',
    current: false,
    features: ['Artikuj dhe video të zgjedhura', 'Preview episodesh', 'Akses komunitet bazë'],
  },
  {
    name: 'Premium Access',
    price: '€29/muaj',
    current: true,
    features: [
      'Full Learning Hub',
      'Shkarkim materialesh',
      'Shablone dhe Worksheets',
      'Akses të hershëm eventeve',
      'Komunitet Member',
    ],
  },
  {
    name: 'Inner Circle',
    price: '€99/muaj',
    current: false,
    features: [
      'Gjithçka nga Premium',
      'Evente ekskluzive',
      'Darkë ekskluzive me Alketa',
      'Priority networking',
      'Coaching priority akses',
      'Akses pas skenës',
    ],
  },
]

export default function MembershipPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">My Membership</h1>
        <p className="text-black/50">Menaxho planin dhe faturimet tua.</p>
      </div>

      {/* Current plan card */}
      <div className="bg-brand-black rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-gold/20 rounded-full flex items-center justify-center">
            <Crown size={18} className="text-brand-gold" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-brand-white font-semibold">{CURRENT_PLAN.name}</p>
            <p className="text-white/40 text-sm">{CURRENT_PLAN.price} · Ripërtërihet {CURRENT_PLAN.renewsOn}</p>
          </div>
        </div>
        <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
          Anulo Abonimin
        </button>
      </div>

      {/* Plans comparison */}
      <p className="text-xs text-black/40 uppercase tracking-widest mb-5">Të gjitha planet</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-6 border ${
              plan.current
                ? 'bg-brand-black border-brand-gold/40'
                : 'bg-brand-white border-black/8'
            }`}
          >
            {plan.current && (
              <span className="inline-block bg-brand-gold text-brand-black text-[10px] font-bold px-2.5 py-1 rounded-full mb-4">
                PLAN AKTUAL
              </span>
            )}
            <p className={`font-semibold mb-1 ${plan.current ? 'text-brand-white' : 'text-brand-black'}`}>
              {plan.name}
            </p>
            <p className={`font-serif text-2xl font-bold mb-5 ${plan.current ? 'text-brand-gold' : 'text-brand-black'}`}>
              {plan.price}
            </p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check size={13} className={plan.current ? 'text-brand-gold' : 'text-black/40'} strokeWidth={2.5} />
                  <span className={`text-sm ${plan.current ? 'text-white/70' : 'text-black/60'}`}>{f}</span>
                </li>
              ))}
            </ul>
            {!plan.current && (
              <Link
                href="/membership"
                className={`w-full inline-flex items-center justify-center py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  plan.price === '€0'
                    ? 'border border-black/15 text-black/50 hover:border-black/30'
                    : 'bg-brand-gold text-brand-black hover:bg-brand-gold-light'
                }`}
              >
                {plan.price === '€0' ? 'Downgrade' : 'Upgrade'}
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
