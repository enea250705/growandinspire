import Link from 'next/link'
import { Bookmark, Play } from 'lucide-react'
import { CATEGORY_META, slugify } from '@/lib/content-meta'
import { getSavedContent } from '@/lib/content'
import { SaveButton } from '@/components/watch/SaveButton'

export default async function SavedPage() {
  const saved = await getSavedContent()

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Saved Content</h1>
        <p className="text-black/50">{saved.length} items të ruajtura.</p>
      </div>

      {saved.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8">
          <Bookmark size={32} className="text-black/20 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-black/40">Nuk ke ruajtur asgjë ende.</p>
          <Link href="/watch" className="text-brand-gold text-sm font-medium hover:underline mt-2 inline-block">
            Shko te Watch →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {saved.map((item) => (
            <div key={item.id} className="bg-brand-white rounded-xl border border-black/8 overflow-hidden group">
              <Link
                href={`/watch/${CATEGORY_META[item.type].slug}/${slugify(item.title)}`}
                className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center overflow-hidden"
              >
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
                {item.is_premium && (
                  <span className="absolute top-2 right-2 bg-brand-gold text-brand-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                    PREMIUM
                  </span>
                )}
                <div className="relative w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                  <Play size={14} className="text-white ml-0.5" fill="currentColor" />
                </div>
              </Link>
              <div className="p-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-brand-gold font-semibold uppercase tracking-widest mb-1">
                    {CATEGORY_META[item.type].label}
                  </p>
                  <p className="text-sm font-semibold text-brand-black line-clamp-2">{item.title}</p>
                </div>
                <SaveButton contentId={item.id} initialSaved />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
