import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getSeriesBySlug, getSeriesList } from '@/lib/content'
import { slugify } from '@/lib/content-meta'
import { ContentCard } from '@/components/watch/ContentCard'
import { isMember as checkMembership } from '@/lib/membership'

export const revalidate = 300

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const list = await getSeriesList()
  return list.map((s) => ({ slug: slugify(s.title) }))
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params
  const series = await getSeriesBySlug(slug)
  if (!series) notFound()

  // Per-video gating: members see premium episodes unlocked. ContentCard renders
  // the lock badge for premium videos when isMember is false.
  const isMember = await checkMembership()

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      <section className="bg-brand-black py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/series" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Të gjitha seritë
          </Link>
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Seri</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-brand-white mb-4">{series.title}</h1>
          {series.description && <p className="text-white/50 text-lg max-w-2xl">{series.description}</p>}
          <p className="text-white/30 text-sm mt-4">{series.videos.length} episode</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {series.videos.length === 0 ? (
          <p className="text-black/40 text-center py-16">Kjo seri ende nuk ka video.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.videos.map((item) => (
              <div key={item.id} className="relative">
                {item.episode_number != null && (
                  <span className="absolute top-3 left-3 z-10 bg-brand-black/70 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    Ep {item.episode_number}
                  </span>
                )}
                <ContentCard item={item} isMember={isMember} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
