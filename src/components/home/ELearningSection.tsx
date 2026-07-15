import { Play, Lock } from 'lucide-react'
import Link from 'next/link'
import { PremiumBadge } from '@/components/ui/LockBadge'
import { VideoPlayer } from '@/components/watch/VideoPlayer'
import { getFeatured, getPlayableYoutubeId, getSeriesListWithCounts, getPremiumContent } from '@/lib/content'
import { CATEGORY_META, slugify, categoryLabel } from '@/lib/content-meta'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  badge: string
  title: string
  desc: string
  trailer: string
  freeTitle: string
  freeDesc: string
  series: string
  viewAll: string
  viewSeries: string
  premium: string
  unlock: string
  becomeMember: string
}> = {
  en: {
    badge: 'E-Learning',
    title: 'Programs and Content',
    desc: 'Learn from Alketa Vejsiu and field experts. Exclusive programs and premium videos - right next to the community.',
    trailer: 'Video Trailer',
    freeTitle: "Trailer - What is Grow and Inspire?",
    freeDesc: 'Discover the platform and the vision behind the Grow and Inspire movement.',
    series: 'Series and Programs',
    viewAll: 'View all →',
    viewSeries: 'View series →',
    premium: 'Premium Videos',
    unlock: 'Unlock',
    becomeMember: 'Watch More',
  },
  sq: {
    badge: 'E-Learning',
    title: 'Programet dhe Përmbajtja',
    desc: 'Mëso nga Alketa Vejsiu dhe ekspertë të fushës. Programet ekskluzive dhe videot premium - ngjitur me komunitetin.',
    trailer: 'Video Trailer',
    freeTitle: "Trailer - Ç'është Grow and Inspire?",
    freeDesc: 'Zbulo platformën dhe vizionin pas lëvizjes Grow and Inspire.',
    series: 'Seri dhe Programe',
    viewAll: 'Të gjitha →',
    viewSeries: 'Shiko serinë →',
    premium: 'Video Premium',
    unlock: 'Zhblloko',
    becomeMember: 'Shiko më shumë',
  },
}

const EXCLUSIVE_VIDEOS = [
  { title: 'Alketa Vejsiu - Historia ime', category: 'Meet the Founder' },
  { title: 'Si ta transformosh idenë në produkt', category: 'Class Business' },
  { title: 'Psikologjia e suksesit', category: 'Inspire Podcast' },
  { title: 'Ndërtimi i rrjetit profesional', category: 'Class Business' },
]

export async function ELearningSection() {
  const lang = await getLang()
  const c = CONTENT[lang]
  // The free featured episode plays right here as the trailer. It's is_premium=false
  // (getFeatured enforces that), so embedding its youtube_id publicly is safe.
  const [featured, seriesList, premium] = await Promise.all([
    getFeatured(),
    getSeriesListWithCounts(),
    getPremiumContent(4),
  ])
  const trailerId = featured ? await getPlayableYoutubeId(featured.id) : null

  // Real premium videos the admin has added; fall back to the static teaser list
  // only when none exist yet. Each links to its own watch page, which gates
  // playback for non-members.
  const premiumVideos = premium.length > 0
    ? premium.map((v) => ({
        key: v.id,
        title: v.title,
        category: categoryLabel(lang, v.type),
        href: `/watch/${CATEGORY_META[v.type].slug}/${slugify(v.title)}`,
      }))
    : EXCLUSIVE_VIDEOS.map((v) => ({ key: v.title, title: v.title, category: v.category, href: '/membership' }))

  return (
    <section className="bg-brand-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">{c.badge}</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-white mb-4">
            {c.title}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl">
            {c.desc}
          </p>
        </div>

        {/* Free: Video Trailer - plays the free featured episode inline */}
        <div className="mb-16">
          {trailerId ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <VideoPlayer youtubeId={trailerId} title={featured?.title} />
              </div>
              <div className="lg:col-span-2">
                <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest block mb-2">{c.trailer}</span>
                <h3 className="font-serif text-2xl lg:text-3xl text-brand-white font-medium mb-3">{featured?.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{featured?.description}</p>
              </div>
            </div>
          ) : (
            <div className="group relative rounded-2xl bg-gradient-to-br from-brand-dark to-brand-black border border-white/10 hover:border-brand-gold/30 transition-all overflow-hidden cursor-pointer">
              <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-brand-gold/10 border border-brand-gold/30 rounded-full flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                  <Play size={24} className="text-brand-gold ml-1" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest block mb-1">{c.trailer}</span>
                  <h3 className="font-serif text-2xl text-brand-white font-medium mb-1">{c.freeTitle}</h3>
                  <p className="text-white/40 text-sm">3:24 · {c.freeDesc}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Series / Programs - DB-managed from /admin/series */}
        {seriesList.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between gap-3 mb-6">
              <p className="text-white/40 text-xs uppercase tracking-widest">{c.series}</p>
              <Link href="/series" className="text-brand-gold text-sm font-medium hover:underline">{c.viewAll}</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {seriesList.map((s) => (
                <Link
                  key={s.id}
                  href={`/series/${slugify(s.title)}`}
                  className="group relative rounded-2xl border border-white/10 bg-brand-dark hover:border-brand-gold/40 transition-colors overflow-hidden"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-black overflow-hidden">
                    {s.thumbnail_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.thumbnail_url} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    )}
                    <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/15 transition-colors" />
                    <span className="absolute bottom-3 left-3 bg-brand-black/60 text-white/80 text-xs px-2.5 py-1 rounded-full">
                      {s.videoCount} video
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-brand-white font-medium mb-2">{s.title}</h3>
                    {s.description && <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">{s.description}</p>}
                    <span className="text-brand-gold text-sm font-medium group-hover:underline">{c.viewSeries}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Paid: Exclusive Videos */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <p className="text-white/40 text-xs uppercase tracking-widest">{c.premium}</p>
            <PremiumBadge />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {premiumVideos.map((video) => (
              <Link
                key={video.key}
                href={video.href}
                className="group flex items-center gap-4 rounded-xl border border-white/10 p-4 bg-brand-dark hover:border-brand-gold/40 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-brand-gold/15 transition-colors">
                  <Lock size={14} className="text-brand-gold/60 group-hover:text-brand-gold transition-colors" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-brand-white text-sm font-medium truncate">{video.title}</p>
                  <p className="text-white/30 text-xs mt-0.5">{video.category}</p>
                </div>
                <span className="shrink-0 text-brand-gold/60 text-xs font-medium group-hover:text-brand-gold transition-colors">
                  {c.unlock}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
            >
              {c.becomeMember}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
