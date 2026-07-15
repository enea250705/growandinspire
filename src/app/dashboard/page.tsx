import Link from 'next/link'
import { BookOpen, Calendar, Download, Lock, ChevronRight, Layers, PlayCircle } from 'lucide-react'
import { CATEGORY_META, slugify, categoryLabel } from '@/lib/content-meta'
import { getFreeContent, getPremiumContent, getSeriesListWithCounts, getSavedContent, getDownloads } from '@/lib/content'
import { createClient } from '@/lib/supabase/server'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'
import type { ContentItem, Series } from '@/types'

const CONTENT: Record<Lang, {
  member: string
  welcome: string
  subtitle: string
  statMembership: string
  statSaved: string
  statDownloads: string
  statEvents: string
  continueWatching: string
  viewAll: string
  learningHub: string
  seriesPrograms: string
  growExclusive: string
  nextEvent: string
  conference: string
  conferenceWhen: string
  viewDetails: string
}> = {
  en: {
    member: 'Member',
    welcome: 'Welcome back',
    subtitle: 'Here is what is happening in your circle.',
    statMembership: 'My Membership',
    statSaved: 'Saved Content',
    statDownloads: 'My Downloads',
    statEvents: 'Upcoming Events',
    continueWatching: 'Continue Watching',
    viewAll: 'View all',
    learningHub: 'Learning Hub',
    seriesPrograms: 'Series and Programs',
    growExclusive: 'Grow Exclusive',
    nextEvent: 'Next Event',
    conference: 'Grow and Inspire Conference',
    conferenceWhen: 'April 25-26, 2026 · Tirana, Albania',
    viewDetails: 'View Details',
  },
  sq: {
    member: 'Anëtar',
    welcome: 'Mirë se u ktheve',
    subtitle: 'Ja çfarë po ndodh në rrethin tënd.',
    statMembership: 'Anëtarësimi Im',
    statSaved: 'Përmbajtja e Ruajtur',
    statDownloads: 'Shkarkimet e Mia',
    statEvents: 'Eventet e Ardhshme',
    continueWatching: 'Vazhdo të Shikosh',
    viewAll: 'Shiko të gjitha',
    learningHub: 'Qendra e Mësimit',
    seriesPrograms: 'Seri dhe Programe',
    growExclusive: 'Grow Exclusive',
    nextEvent: 'Eventi i Radhës',
    conference: 'Grow and Inspire Conference',
    conferenceWhen: '25-26 Prill, 2026 · Tiranë, Shqipëri',
    viewDetails: 'Shiko Detajet',
  },
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const lang = await getLang()
  const c = CONTENT[lang]
  const name = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? c.member
  const email = user?.email ?? ''

  const [recentContent, exclusiveContent, featuredContent, series, saved, downloads] = await Promise.all([
    getFreeContent(4),
    getPremiumContent(4),
    getFreeContent(8),
    getSeriesListWithCounts(),
    getSavedContent(),
    getDownloads(),
  ])
  const { count: eventCount } = await supabase
    .from('event_registrations')
    .select('id', { count: 'exact', head: true })
    .eq('email', email)

  const stats = [
    { label: c.statSaved, value: `${saved.length}`, icon: BookOpen, href: '/dashboard/saved' },
    { label: c.statDownloads, value: `${downloads.length}`, icon: Download, href: '/dashboard/downloads' },
    { label: c.statEvents, value: `${eventCount ?? 0}`, icon: Calendar, href: '/dashboard/events' },
  ]

  return <DashboardContent c={c} lang={lang} name={name} stats={stats} recentContent={recentContent} exclusiveContent={exclusiveContent} featuredContent={featuredContent} series={series} />
}

type DashContent = (typeof CONTENT)[Lang]

interface Stat {
  label: string
  value: string
  icon: typeof BookOpen
  href: string
}

function DashboardContent({
  c,
  lang,
  name,
  stats,
  recentContent,
  exclusiveContent,
  featuredContent,
  series,
}: {
  c: DashContent
  lang: Lang
  name: string
  stats: Stat[]
  recentContent: ContentItem[]
  exclusiveContent: ContentItem[]
  featuredContent: ContentItem[]
  series: (Series & { videoCount: number })[]
}) {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black">
          {c.welcome}, {name}.
        </h1>
        <p className="text-black/50 mt-1">{c.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="bg-brand-white rounded-2xl border border-black/8 p-5 hover:border-brand-gold/30 transition-colors">
            <Icon size={16} className="text-brand-gold mb-3" strokeWidth={1.5} />
            <p className="text-xs text-black/40 uppercase tracking-widest mb-1">{label}</p>
            <p className="font-semibold text-brand-black">{value}</p>
          </Link>
        ))}
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <p className="font-semibold text-brand-black">{c.continueWatching}</p>
          <Link href="/watch" className="text-brand-gold text-sm font-medium hover:underline flex items-center gap-1">
            {c.viewAll} <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentContent.map((item) => (
            <Link
              key={item.id}
              href={`/watch/${CATEGORY_META[item.type].slug}/${slugify(item.title)}`}
              className="group bg-brand-white rounded-xl border border-black/8 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center overflow-hidden">
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
                <div className="relative w-8 h-8 rounded-full bg-brand-black/50 border border-white/30 flex items-center justify-center group-hover:bg-brand-gold transition-colors">
                  <svg className="w-3 h-3 text-white ml-0.5 group-hover:text-brand-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-brand-gold font-semibold uppercase tracking-widest mb-1">
                  {categoryLabel(lang, item.type)}
                </p>
                <p className="text-xs font-semibold text-brand-black line-clamp-2">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <PlayCircle size={15} className="text-brand-gold" />
            <p className="font-semibold text-brand-black">{c.learningHub}</p>
          </div>
          <Link href="/watch" className="text-brand-gold text-sm font-medium hover:underline flex items-center gap-1">
            {c.viewAll} <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredContent.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              href={`/watch/${CATEGORY_META[item.type].slug}/${slugify(item.title)}`}
              className="group bg-brand-white rounded-xl border border-black/8 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center overflow-hidden">
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
                <div className="relative w-8 h-8 rounded-full bg-brand-black/50 border border-white/30 flex items-center justify-center group-hover:bg-brand-gold transition-colors">
                  <svg className="w-3 h-3 text-white ml-0.5 group-hover:text-brand-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-brand-gold font-semibold uppercase tracking-widest mb-1">
                  {categoryLabel(lang, item.type)}
                </p>
                <p className="text-xs font-semibold text-brand-black line-clamp-2">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {series.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-brand-gold" />
              <p className="font-semibold text-brand-black">{c.seriesPrograms}</p>
            </div>
            <Link href="/series" className="text-brand-gold text-sm font-medium hover:underline flex items-center gap-1">
              {c.viewAll} <ChevronRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {series.slice(0, 4).map((s) => (
              <Link
                key={s.id}
                href={`/series/${slugify(s.title)}`}
                className="group bg-brand-white rounded-xl border border-black/8 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-black overflow-hidden">
                  {s.thumbnail_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.thumbnail_url} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  )}
                  <div className="absolute inset-0 bg-brand-black/25 group-hover:bg-brand-black/10 transition-colors" />
                  <span className="absolute bottom-2 left-2 bg-brand-black/60 text-white/85 text-[10px] px-2 py-0.5 rounded-full">
                    {s.videoCount} video
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-brand-black line-clamp-2">{s.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-brand-black">{c.growExclusive}</p>
            <Lock size={13} className="text-brand-gold" />
          </div>
          <Link href="/watch/grow-exclusive" className="text-brand-gold text-sm font-medium hover:underline flex items-center gap-1">
            {c.viewAll} <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exclusiveContent.map((item) => (
            <div key={item.id} className="bg-brand-white rounded-xl border border-black/8 overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center overflow-hidden">
                {item.thumbnail_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.thumbnail_url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-brand-black/40" />
                <span className="absolute top-2 right-2 bg-brand-gold text-brand-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  PREMIUM
                </span>
                <div className="relative w-8 h-8 rounded-full bg-brand-black/50 border border-white/30 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-brand-black line-clamp-2">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand-black rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-2">{c.nextEvent}</p>
          <p className="font-serif text-xl font-bold text-brand-white">{c.conference}</p>
          <p className="text-white/50 text-sm mt-1">{c.conferenceWhen}</p>
        </div>
        <Link
          href="/dashboard/events"
          className="shrink-0 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
        >
          {c.viewDetails}
        </Link>
      </div>
    </>
  )
}
