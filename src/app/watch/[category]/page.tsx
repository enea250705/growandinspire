import { notFound } from 'next/navigation'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import { CATEGORY_META, SLUG_TO_TYPE } from '@/lib/content-meta'
import { getContentByType } from '@/lib/content'
import { ContentCard } from '@/components/watch/ContentCard'
import { isMember as checkMembership } from '@/lib/membership'

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
  const isExclusive = type === 'exclusive'
  const member = await checkMembership()

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className={`py-20 lg:py-28 ${isExclusive ? 'bg-brand-dark' : 'bg-brand-black'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/watch" className="text-white/40 text-sm hover:text-white/70 transition-colors mb-6 inline-block">
            ← Watch
          </Link>
          {isExclusive && (
            <div className="flex items-center gap-2 mb-4">
              <Lock size={14} className="text-brand-gold" />
              <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest">Members Only</span>
            </div>
          )}
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">{meta.label}</h1>
          <p className="text-white/50 text-lg max-w-xl">{meta.description}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isExclusive ? (
          /* Exclusive - show all locked */
          <div>
            <div className="bg-brand-black rounded-2xl p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-brand-white font-semibold mb-1">Unlock all {items.length} exclusive sessions</p>
                <p className="text-white/50 text-sm">Become a member to access the full Grow Exclusive library.</p>
              </div>
              <Link
                href="/membership"
                className="shrink-0 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
              >
                View Membership Plans
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
            <p className="text-black/40 text-sm mb-8">{items.length} episodes</p>
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
