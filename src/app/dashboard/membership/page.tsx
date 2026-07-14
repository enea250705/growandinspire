import Link from 'next/link'
import { Check, Crown } from 'lucide-react'
import { getMembership, tierLabel } from '@/lib/membership'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  title: string
  subtitle: string
  active: string
  renews: (d: string) => string
  noRenewDate: string
  manage: string
  noActive: string
  noActiveDesc: string
  viewPlans: string
  allPlans: string
  currentPlan: string
  change: string
  choose: string
  plans: { tier: string; name: string; features: string[] }[]
  locale: string
}> = {
  en: {
    title: 'My Membership',
    subtitle: 'Manage your plan and billing.',
    active: 'Active',
    renews: (d) => `Renews ${d}`,
    noRenewDate: 'No renewal date',
    manage: 'Manage subscription (coming soon)',
    noActive: 'No active subscription',
    noActiveDesc: 'Become a member to unlock Grow Exclusive and other benefits.',
    viewPlans: 'View Plans',
    allPlans: 'All plans',
    currentPlan: 'CURRENT PLAN',
    change: 'Change Plan',
    choose: 'Choose',
    plans: [
      { tier: 'individual', name: 'Individual', features: ['Full Learning Hub', 'Grow Exclusive library', 'Live Q&A with Alketa', '4 business events / year'] },
      { tier: 'professional', name: 'Professional', features: ['Everything in Individual', 'Coaching group access', 'Priority event registration', 'Priority Dinner with Alketa'] },
      { tier: 'corporate', name: 'Corporate', features: ['Everything in Professional', 'Up to 5 team members', 'Sponsorship options', 'Quarterly review with Alketa'] },
    ],
    locale: 'en-US',
  },
  sq: {
    title: 'Anëtarësimi Im',
    subtitle: 'Menaxho planin dhe faturimet tua.',
    active: 'Aktiv',
    renews: (d) => `Ripërtërihet ${d}`,
    noRenewDate: 'Pa datë ripërtëritjeje',
    manage: 'Menaxho abonimin (së shpejti)',
    noActive: 'Nuk ke abonim aktiv',
    noActiveDesc: 'Bëhu member për të hapur Grow Exclusive dhe përfitimet e tjera.',
    viewPlans: 'Shiko Planet',
    allPlans: 'Të gjitha planet',
    currentPlan: 'PLAN AKTUAL',
    change: 'Ndrysho Planin',
    choose: 'Zgjidh',
    plans: [
      { tier: 'individual', name: 'Individual', features: ['Full Learning Hub', 'Grow Exclusive library', 'Live Q&A me Alketa', '4 evente biznesi / vit'] },
      { tier: 'professional', name: 'Professional', features: ['Gjithçka nga Individual', 'Coaching group akses', 'Priority regjistrim eventesh', 'Dinner me Alketa priority'] },
      { tier: 'corporate', name: 'Corporate', features: ['Gjithçka nga Professional', 'Deri 5 anëtarë ekipi', 'Sponsorship opsione', 'Quarterly review me Alketa'] },
    ],
    locale: 'sq-AL',
  },
}

export default async function MembershipPage() {
  const membership = await getMembership()
  const activeTier = membership?.tier ?? null
  const lang = await getLang()
  const c = CONTENT[lang]

  const formatDate = (iso: string | null) =>
    !iso ? '-' : new Date(iso).toLocaleDateString(c.locale, { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">{c.title}</h1>
        <p className="text-black/50">{c.subtitle}</p>
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
                {c.active} · {membership.renews_at ? c.renews(formatDate(membership.renews_at)) : c.noRenewDate}
              </p>
            </div>
          </div>
          {/* TODO(B4): wire cancel to Stripe Customer Portal */}
          <span className="text-xs text-white/30">{c.manage}</span>
        </div>
      ) : (
        <div className="bg-brand-cream-dark rounded-2xl border border-black/8 p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-brand-black font-semibold mb-1">{c.noActive}</p>
            <p className="text-black/50 text-sm">{c.noActiveDesc}</p>
          </div>
          <Link
            href="/membership"
            className="shrink-0 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
          >
            {c.viewPlans}
          </Link>
        </div>
      )}

      {/* Plans comparison */}
      <p className="text-xs text-black/40 uppercase tracking-widest mb-5">{c.allPlans}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {c.plans.map((plan) => {
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
                  {c.currentPlan}
                </span>
              )}
              <p className={`font-serif text-2xl font-bold mb-5 ${current ? 'text-brand-white' : 'text-brand-black'}`}>{plan.name}</p>
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
                  {activeTier ? c.change : c.choose}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
