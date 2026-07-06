import Link from 'next/link'
import { Check, Crown } from 'lucide-react'
import { getMembership, tierLabel } from '@/lib/membership'

const PLANS = [
  {
    tier: 'individual',
    name: 'Individual',
    price: '€29/muaj',
    features: ['Full Learning Hub', 'Grow Exclusive library', 'Live Q&A me Alketa', '4 evente biznesi / vit'],
  },
  {
    tier: 'professional',
    name: 'Professional',
    price: '€79/muaj',
    features: ['Gjithçka nga Individual', 'Coaching group akses', 'Priority regjistrim eventesh', 'Dinner me Alketa priority'],
  },
  {
    tier: 'corporate',
    name: 'Corporate',
    price: '€199/muaj',
    features: ['Gjithçka nga Professional', 'Deri 5 anëtarë ekipi', 'Sponsorship opsione', 'Quarterly review me Alketa'],
  },
] as const

function formatDate(iso: string | null): string {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('sq-AL', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function MembershipPage() {
  const membership = await getMembership()
  const activeTier = membership?.tier ?? null

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">My Membership</h1>
        <p className="text-black/50">Menaxho planin dhe faturimet tua.</p>
      </div>

      {/* Current plan card */}
      {membership ? (
        <div className="bg-brand-black rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-gold/20 rounded-full flex items-center justify-center">
              <Crown size={18} className="text-brand-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-brand-white font-semibold">{tierLabel(membership.tier)}</p>
              <p className="text-white/40 text-sm">
                Aktiv · {membership.renews_at ? `Ripërtërihet ${formatDate(membership.renews_at)}` : 'Pa datë ripërtëritjeje'}
              </p>
            </div>
          </div>
          {/* TODO(B4): wire cancel to Stripe Customer Portal */}
          <span className="text-xs text-white/30">Menaxho abonimin (së shpejti)</span>
        </div>
      ) : (
        <div className="bg-brand-cream-dark rounded-2xl border border-black/8 p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-brand-black font-semibold mb-1">Nuk ke abonim aktiv</p>
            <p className="text-black/50 text-sm">Bëhu member për të hapur Grow Exclusive dhe përfitimet e tjera.</p>
          </div>
          <Link
            href="/membership"
            className="shrink-0 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
          >
            Shiko Planet
          </Link>
        </div>
      )}

      {/* Plans comparison */}
      <p className="text-xs text-black/40 uppercase tracking-widest mb-5">Të gjitha planet</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => {
          const current = plan.tier === activeTier
          return (
            <div
              key={plan.tier}
              className={`rounded-2xl p-6 border ${
                current ? 'bg-brand-black border-brand-gold/40' : 'bg-brand-white border-black/8'
              }`}
            >
              {current && (
                <span className="inline-block bg-brand-gold text-brand-black text-[10px] font-bold px-2.5 py-1 rounded-full mb-4">
                  PLAN AKTUAL
                </span>
              )}
              <p className={`font-semibold mb-1 ${current ? 'text-brand-white' : 'text-brand-black'}`}>{plan.name}</p>
              <p className={`font-serif text-2xl font-bold mb-5 ${current ? 'text-brand-gold' : 'text-brand-black'}`}>
                {plan.price}
              </p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={13} className={current ? 'text-brand-gold' : 'text-black/40'} strokeWidth={2.5} />
                    <span className={`text-sm ${current ? 'text-white/70' : 'text-black/60'}`}>{f}</span>
                  </li>
                ))}
              </ul>
              {!current && (
                <Link
                  href="/membership"
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-full text-sm font-semibold bg-brand-gold text-brand-black hover:bg-brand-gold-light transition-colors"
                >
                  {activeTier ? 'Ndrysho Planin' : 'Zgjidh'}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
