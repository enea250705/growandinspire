import Link from 'next/link'
import { Bookmark, Play } from 'lucide-react'
import { CATEGORY_META, slugify } from '@/lib/content-meta'
import type { ContentItem } from '@/types'

// TODO(post-B6): no saved_content table yet. Add a `saved_items` table
// (user_id, content_id) + a save button, then read the user's saved rows here.
const SAVED: ContentItem[] = []

export default function SavedPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Saved Content</h1>
        <p className="text-black/50">{SAVED.length} items të ruajtura.</p>
      </div>

      {SAVED.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8">
          <Bookmark size={32} className="text-black/20 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-black/40">Nuk ke ruajtur asgjë ende.</p>
          <Link href="/watch" className="text-brand-gold text-sm font-medium hover:underline mt-2 inline-block">
            Shko te Watch →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAVED.map((item) => (
            <div key={item.id} className="bg-brand-white rounded-xl border border-black/8 overflow-hidden group">
              <div className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center">
                {item.is_premium && (
                  <span className="absolute top-2 right-2 bg-brand-gold text-brand-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                    PREMIUM
                  </span>
                )}
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                  <Play size={14} className="text-white ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="p-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-brand-gold font-semibold uppercase tracking-widest mb-1">
                    {CATEGORY_META[item.type].label}
                  </p>
                  <p className="text-sm font-semibold text-brand-black line-clamp-2">{item.title}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Link
                    href={`/watch/${CATEGORY_META[item.type].slug}/${slugify(item.title)}`}
                    className="text-xs text-brand-gold hover:underline"
                  >
                    Watch
                  </Link>
                  <button className="text-xs text-black/30 hover:text-red-400 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
