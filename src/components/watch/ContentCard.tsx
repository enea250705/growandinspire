import Link from 'next/link'
import { Play, FileText } from 'lucide-react'
import { LockBadge, PremiumBadge } from '@/components/ui/LockBadge'
import { formatDate, slugify, CATEGORY_META } from '@/lib/content-meta'
import { CONTENT_LOCKING_ENABLED } from '@/lib/flags'
import type { ContentItem } from '@/types'

interface ContentCardProps {
  item: ContentItem
  isMember?: boolean
}

export function ContentCard({ item, isMember = false }: ContentCardProps) {
  const gated = CONTENT_LOCKING_ENABLED && item.is_premium
  const isLocked = gated && !isMember
  const categoryMeta = CATEGORY_META[item.type]
  const href = `/watch/${categoryMeta.slug}/${slugify(item.title)}`
  const hasVideo = item.has_video

  return (
    <div className="group relative bg-brand-white rounded-2xl border border-black/8 overflow-hidden hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center overflow-hidden">
        {hasVideo ? (
          <>
            {/* A YouTube-derived thumbnail would expose the video ID, which is the
                access control for an unlisted video. Fall back to the gradient. */}
            {item.thumbnail_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnail_url}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/15 transition-colors" />
            <div className="relative w-12 h-12 rounded-full bg-brand-black/50 border border-white/30 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-colors">
              <Play size={20} className="text-brand-white ml-0.5 group-hover:text-brand-black transition-colors" fill="currentColor" />
            </div>
          </>
        ) : (
          <FileText size={24} className="text-white/40" />
        )}

        {gated && (
          <div className="absolute top-3 left-3">
            <PremiumBadge />
          </div>
        )}

        {isLocked && <LockBadge />}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-2">
          {categoryMeta.label}
        </p>
        <h3 className="font-serif font-semibold text-brand-black text-base leading-snug mb-1 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-black/50 text-sm line-clamp-2 mb-3">{item.description}</p>
        <p className="text-black/30 text-xs">{formatDate(item.published_at)}</p>
      </div>

      {!isLocked && (
        <Link href={href} className="absolute inset-0" aria-label={item.title} />
      )}
    </div>
  )
}
