import Link from 'next/link'
import { BookOpen, Mic2, Users, Briefcase, Sparkles, Lock } from 'lucide-react'
import { MOCK_CONTENT, CATEGORY_META } from '@/lib/mock-content'
import { ContentCard } from '@/components/watch/ContentCard'

const CATEGORIES = [
  { type: 'podcast', icon: Mic2 },
  { type: 'founder', icon: Users },
  { type: 'artist', icon: Sparkles },
  { type: 'business', icon: Briefcase },
  { type: 'revista', icon: BookOpen },
] as const

const featured = MOCK_CONTENT.find((c) => !c.is_premium && c.youtube_id)
const recent = MOCK_CONTENT.filter((c) => !c.is_premium).slice(0, 6)

export default function WatchPage() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Content Hub</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">Watch & Learn</h1>
          <p className="text-white/50 text-lg max-w-xl">
            Podcasts, founder stories, artist conversations, and premium coaching sessions.
          </p>
        </div>
      </section>

      {/* Category nav */}
      <section className="bg-brand-white border-b border-black/8 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-none">
            {CATEGORIES.map(({ type, icon: Icon }) => {
              const meta = CATEGORY_META[type]
              return (
                <Link
                  key={type}
                  href={`/watch/${meta.slug}`}
                  className="flex items-center gap-2 px-5 py-4 text-sm font-medium text-black/50 hover:text-brand-black border-b-2 border-transparent hover:border-brand-gold transition-colors whitespace-nowrap"
                >
                  <Icon size={15} strokeWidth={1.5} />
                  {meta.label}
                </Link>
              )
            })}
            <Link
              href="/watch/grow-exclusive"
              className="flex items-center gap-2 px-5 py-4 text-sm font-medium text-brand-gold border-b-2 border-transparent hover:border-brand-gold transition-colors whitespace-nowrap"
            >
              <Lock size={13} />
              Grow Exclusive
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured */}
        {featured && (
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-6">Featured</p>
            <Link href={`/watch/${CATEGORY_META[featured.type].slug}/${featured.id}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-brand-white rounded-2xl border border-black/8 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center min-h-[260px]">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-3">
                    {CATEGORY_META[featured.type].label}
                  </p>
                  <h2 className="font-serif text-2xl lg:text-3xl font-bold text-brand-black mb-3">
                    {featured.title}
                  </h2>
                  <p className="text-black/50 leading-relaxed">{featured.description}</p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Recent free content */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-6">Recent Episodes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent.map((item) => (
              <ContentCard key={item.id} item={item} isMember={false} />
            ))}
          </div>
        </div>

        {/* Grow Exclusive teaser */}
        <div className="bg-brand-black rounded-2xl p-10 text-center">
          <Lock size={24} className="text-brand-gold mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="font-serif text-2xl font-bold text-brand-white mb-2">Grow Exclusive</h3>
          <p className="text-white/50 mb-6 max-w-md mx-auto">
            Members-only coaching sessions, deep dives, and private recordings from Alketa.
          </p>
          <Link
            href="/membership"
            className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
          >
            Unlock with Membership
          </Link>
        </div>
      </div>
    </div>
  )
}
