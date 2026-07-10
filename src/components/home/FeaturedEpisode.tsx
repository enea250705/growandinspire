import Link from 'next/link'
import { Play, Lock } from 'lucide-react'
import { CATEGORY_META, slugify } from '@/lib/content-meta'
import { getFeatured } from '@/lib/content'

export async function FeaturedEpisode() {
  const featured = await getFeatured()
  if (!featured) return null

  const meta = CATEGORY_META[featured.type]
  const href = `/watch/${meta.slug}/${slugify(featured.title)}`

  return (
    <section className="bg-brand-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Featured Episode</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black">Episodi i Javës</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-brand-cream rounded-3xl overflow-hidden border border-black/6">
          {/* Thumbnail */}
          <Link href={href} className="group relative block">
            <div className="relative aspect-video lg:aspect-auto lg:h-full bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center min-h-[280px] overflow-hidden">
              {featured.thumbnail_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.thumbnail_url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/25 transition-colors" />
              <div className="relative w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-brand-gold/30 transition-colors">
                <Play size={28} className="text-brand-white ml-1.5" fill="currentColor" />
              </div>
              <div className="absolute bottom-4 left-4 z-10">
                <span className="bg-brand-gold text-brand-black text-xs font-bold px-3 py-1 rounded-full">
                  {meta.label}
                </span>
              </div>
            </div>
          </Link>

          {/* Info */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              {meta.label}
            </p>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-brand-black mb-4 leading-snug">
              {featured.title}
            </h3>
            <p className="text-black/60 leading-relaxed mb-8">{featured.description}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={href}
                className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
              >
                <Play size={14} fill="currentColor" />
                Shiko tani
              </Link>

              {/* Locked "key lessons" link */}
              <button
                disabled
                className="inline-flex items-center justify-center gap-2 border border-black/15 text-black/40 px-6 py-3 rounded-full text-sm font-medium cursor-not-allowed"
                title="Vetëm për anëtarë"
              >
                <Lock size={13} />
                Mësimet kryesore
              </button>
            </div>

            <p className="text-xs text-black/35 mt-3 flex items-center gap-1.5">
              <Lock size={11} />
              Mësimet kryesore janë ekskluzive për anëtarët.{' '}
              <Link href="/membership" className="text-brand-gold hover:underline">
                Bëhu anëtar →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
