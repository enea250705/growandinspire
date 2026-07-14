import { ApplyForm } from '@/components/forms/ApplyForm'
import { getOpenPositions } from '@/lib/jobs'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

type TabType = 'job' | 'guest' | 'investment'
const TABS: TabType[] = ['job', 'guest', 'investment']

const T: Record<Lang, { badge: string; title: string; subtitle: string }> = {
  en: {
    badge: 'Apply Now',
    title: 'Get Involved',
    subtitle: 'Three ways to be part of the Grow and Inspire ecosystem - as a team member, a guest voice, or an idea worth backing.',
  },
  sq: {
    badge: 'Apliko Tani',
    title: 'Përfshihu',
    subtitle: 'Tri mënyra për të qenë pjesë e ekosistemit Grow and Inspire - si anëtar ekipi, zë i ftuar, ose një ide që ia vlen të mbështetet.',
  },
}

// searchParams are read here rather than with useSearchParams inside ApplyForm,
// which would require a Suspense boundary.
export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; role?: string }>
}) {
  const { tab, role } = await searchParams
  const positions = await getOpenPositions()
  const initialTab = TABS.includes(tab as TabType) ? (tab as TabType) : 'job'
  const lang = await getLang()
  const t = T[lang]

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t.badge}</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">
            {t.title}
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApplyForm positions={positions} initialTab={initialTab} initialRole={role ?? ''} />
        </div>
      </section>
    </div>
  )
}
