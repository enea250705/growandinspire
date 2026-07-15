import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Lock, Calendar, ArrowLeft } from 'lucide-react'
import { CATEGORY_META, SLUG_TO_TYPE, slugify, formatDate, categoryLabel } from '@/lib/content-meta'
import { getAllContent, getContentByType, getContentBySlug, getPlayableYoutubeId, isSaved } from '@/lib/content'
import { VideoPlayer } from '@/components/watch/VideoPlayer'
import { ContentCard } from '@/components/watch/ContentCard'
import { SaveButton } from '@/components/watch/SaveButton'
import { PremiumBadge } from '@/components/ui/LockBadge'
import { createClient } from '@/lib/supabase/server'
import { isMember as checkMembership } from '@/lib/membership'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const T: Record<Lang, { watch: string; membersOnly: string; unlockDesc: string; becomeMember: string; moreFrom: string; viewAll: string }> = {
  en: {
    watch: 'Watch',
    membersOnly: 'This content is for members only',
    unlockDesc: 'Unlock the full library of premium coaching sessions and exclusive content.',
    becomeMember: 'Become a Member',
    moreFrom: 'More from',
    viewAll: 'View all',
  },
  sq: {
    watch: 'Shiko',
    membersOnly: 'Kjo përmbajtje është vetëm për anëtarë',
    unlockDesc: 'Zhblloko bibliotekën e plotë të sesioneve premium të coaching-ut dhe përmbajtjes ekskluzive.',
    becomeMember: 'Bëhu Anëtar',
    moreFrom: 'Më shumë nga',
    viewAll: 'Shiko të gjitha',
  },
}

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const all = await getAllContent()
  return all.map((item) => ({
    category: CATEGORY_META[item.type].slug,
    slug: slugify(item.title),
  }))
}

export default async function EpisodePage({ params }: Props) {
  const { category, slug } = await params
  const type = SLUG_TO_TYPE[category]
  if (!type) notFound()

  const item = await getContentBySlug(type, slug)
  if (!item) notFound()

  const meta = CATEGORY_META[type]

  // Server-side membership gate. Never render the player (or leak youtube_id)
  // to a non-member when the item is premium. getPlayableYoutubeId re-checks
  // entitlement itself, so the ID never enters this render for a locked item.
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isMember = item.is_premium ? await checkMembership() : false
  const isLocked = item.is_premium && !isMember
  const watermark = user?.email ?? 'Grow and Inspire · Member'
  const youtubeId = isLocked ? null : await getPlayableYoutubeId(item.id)
  const saved = user ? await isSaved(item.id) : false

  const related = (await getContentByType(type))
    .filter((c) => c.id !== item.id)
    .slice(0, 3)

  const lang = await getLang()
  const t = T[lang]

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-black/40 mb-8">
          <Link href="/watch" className="hover:text-brand-black transition-colors">{t.watch}</Link>
          <span>/</span>
          <Link href={`/watch/${meta.slug}`} className="hover:text-brand-black transition-colors">{categoryLabel(lang, type)}</Link>
          <span>/</span>
          <span className="text-brand-black line-clamp-1">{item.title}</span>
        </div>

        {/* Meta */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest">{categoryLabel(lang, type)}</span>
            {item.is_premium && <PremiumBadge />}
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-brand-black mb-3">{item.title}</h1>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-black/40 text-sm">
              <Calendar size={13} />
              <span>{formatDate(item.published_at)}</span>
            </div>
            {user && <SaveButton contentId={item.id} initialSaved={saved} />}
          </div>
        </div>

        {/* Video or lock gate */}
        {isLocked ? (
          <div className="aspect-video bg-brand-dark rounded-2xl flex flex-col items-center justify-center gap-4 mb-8">
            <Lock size={32} className="text-brand-gold" strokeWidth={1.5} />
            <p className="text-brand-white font-semibold text-lg">{t.membersOnly}</p>
            <p className="text-white/50 text-sm max-w-sm text-center">
              {t.unlockDesc}
            </p>
            <Link
              href="/membership"
              className="mt-2 bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
            >
              {t.becomeMember}
            </Link>
          </div>
        ) : youtubeId ? (
          <div className="mb-8">
            <VideoPlayer youtubeId={youtubeId} title={item.title} watermark={watermark} />
          </div>
        ) : null}

        {/* Description */}
        {!isLocked && (
          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-black/70 leading-relaxed text-lg">{item.description}</p>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">{t.moreFrom} {categoryLabel(lang, type)}</p>
              <Link href={`/watch/${meta.slug}`} className="text-brand-gold text-sm font-medium hover:underline flex items-center gap-1">
                {t.viewAll} <ArrowLeft size={13} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <ContentCard key={r.id} item={r} isMember={isMember} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
