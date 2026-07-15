import { notFound } from 'next/navigation'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import { CATEGORY_META, SLUG_TO_TYPE, categoryLabel, categoryDesc } from '@/lib/content-meta'
import { getContentByType } from '@/lib/content'
import { ContentCard } from '@/components/watch/ContentCard'
import { isMember as checkMembership } from '@/lib/membership'
import { CONTENT_LOCKING_ENABLED } from '@/lib/flags'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const T: Record<Lang, { back: string; membersOnly: string; unlockAll: (n: number) => string; unlockDesc: string; viewPlans: string; episodes: (n: number) => string }> = {
  en: {
    back: '← Watch',
    membersOnly: 'Members Only',
    unlockAll: (n) => `Unlock all ${n} exclusive sessions`,
    unlockDesc: 'Become a member to access the full Grow Exclusive library.',
    viewPlans: 'View Membership Plans',
    episodes: (n) => `${n} episodes`,
  },
  sq: {
    back: '← Shiko',
    membersOnly: 'Vetëm Anëtarë',
    unlockAll: (n) => `Zhblloko të ${n} sesionet ekskluzive`,
    unlockDesc: 'Bëhu anëtar për të aksesuar të gjithë bibliotekën Grow Exclusive.',
    viewPlans: 'Shiko Planet e Anëtarësimit',
    episodes: (n) => `${n} episode`,
  },
}

interface Props {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return Object.keys(SLUG_TO_TYPE).map((slug) => ({ category: slug }))
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const type = SLUG_TO_TYPE[category]

  if (!type) notFound()

  const meta = CATEGORY_META[type]
  const items = await getContentByType(type)
  // While locking is off, even the exclusive category renders as a normal,
  // fully-open list (no members-only gating).
  const isExclusive = CONTENT_LOCKING_ENABLED && type === 'exclusive'
  const member = await checkMembership()
  const lang = await getLang()
  const t = T[lang]

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className={`py-20 lg:py-28 ${isExclusive ? 'bg-brand-dark' : 'bg-brand-black'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/watch" className="text-white/40 text-sm hover:text-white/70 transition-colors mb-6 inline-block">
            {t.back}
          </Link>
          {isExclusive && (
            <div className="flex items-center gap-2 mb-4">
              <Lock size={14} className="text-brand-gold" />
              <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest">{t.membersOnly}</span>
            </div>
          )}
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">{categoryLabel(lang, type)}</h1>
          <p className="text-white/50 text-lg max-w-xl">{categoryDesc(lang, type)}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isExclusive ? (
          /* Exclusive - show all locked */
          <div>
            <div className="bg-brand-black rounded-2xl p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-brand-white font-semibold mb-1">{t.unlockAll(items.length)}</p>
                <p className="text-white/50 text-sm">{t.unlockDesc}</p>
              </div>
              <Link
                href="/membership"
                className="shrink-0 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
              >
                {t.viewPlans}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => (
                <ContentCard key={item.id} item={item} isMember={member} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-black/40 text-sm mb-8">{t.episodes(items.length)}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => (
                <ContentCard key={item.id} item={item} isMember={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
