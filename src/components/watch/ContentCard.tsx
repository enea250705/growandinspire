import Link from 'next/link'
import { Play, FileText } from 'lucide-react'
import { LockBadge, PremiumBadge } from '@/components/ui/LockBadge'
import { formatDate, slugify, CATEGORY_META } from '@/lib/mock-content'
import type { ContentItem } from '@/types'

interface ContentCardProps {
  item: ContentItem
  isMember?: boolean
}

export function ContentCard({ item, isMember = false }: ContentCardProps) {
  const isLocked = item.is_premium && !isMember
  const categoryMeta = CATEGORY_META[item.type]
  const href = `/watch/${categoryMeta.slug}/${slugify(item.title)}`
  const hasVideo = !!item.youtube_id

  return (
    <div className="group relative bg-brand-white rounded-2xl border border-black/8 overflow-hidden hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center">
        {hasVideo ? (
          <div className="w-12 h-12 rounded-full bg-brand-white/10 border border-white/20 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
            <Play size={20} className="text-brand-white ml-0.5" fill="currentColor" />
          </div>
        ) : (
          <FileText size={24} className="text-white/40" />
        )}

        {item.is_premium && (
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
