import Link from 'next/link'
import { BookOpen, Calendar, Download, Users, Lock, ChevronRight } from 'lucide-react'
import { MOCK_CONTENT, CATEGORY_META, slugify } from '@/lib/mock-content'

const MOCK_USER = { name: 'Anisa' }

const MOCK_STATS = [
  { label: 'My Membership', value: 'Premium', icon: Users, href: '/dashboard/membership' },
  { label: 'Saved Content', value: '4 items', icon: BookOpen, href: '/dashboard/saved' },
  { label: 'My Downloads', value: '2 guides', icon: Download, href: '/dashboard/downloads' },
  { label: 'Upcoming Events', value: '1 event', icon: Calendar, href: '/dashboard/events' },
]

const recentContent = MOCK_CONTENT.filter((c) => !c.is_premium).slice(0, 4)
const exclusiveContent = MOCK_CONTENT.filter((c) => c.is_premium).slice(0, 4)

export default function DashboardPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black">
          Welcome back, {MOCK_USER.name}.
        </h1>
        <p className="text-black/50 mt-1">Here is what is happening in your circle.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {MOCK_STATS.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="bg-brand-white rounded-2xl border border-black/8 p-5 hover:border-brand-gold/30 transition-colors">
            <Icon size={16} className="text-brand-gold mb-3" strokeWidth={1.5} />
            <p className="text-xs text-black/40 uppercase tracking-widest mb-1">{label}</p>
            <p className="font-semibold text-brand-black">{value}</p>
          </Link>
        ))}
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <p className="font-semibold text-brand-black">Continue Watching</p>
          <Link href="/watch" className="text-brand-gold text-sm font-medium hover:underline flex items-center gap-1">
            View all <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentContent.map((item) => (
            <Link
              key={item.id}
              href={`/watch/${CATEGORY_META[item.type].slug}/${slugify(item.title)}`}
              className="group bg-brand-white rounded-xl border border-black/8 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                  <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-brand-gold font-semibold uppercase tracking-widest mb-1">
                  {CATEGORY_META[item.type].label}
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
            <p className="font-semibold text-brand-black">Grow Exclusive</p>
            <Lock size={13} className="text-brand-gold" />
          </div>
          <Link href="/watch/grow-exclusive" className="text-brand-gold text-sm font-medium hover:underline flex items-center gap-1">
            View all <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exclusiveContent.map((item) => (
            <div key={item.id} className="bg-brand-white rounded-xl border border-black/8 overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center">
                <span className="absolute top-2 right-2 bg-brand-gold text-brand-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  PREMIUM
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
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
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-2">Next Event</p>
          <p className="font-serif text-xl font-bold text-brand-white">Grow and Inspire Conference</p>
          <p className="text-white/50 text-sm mt-1">April 25–26, 2026 · Tirana, Albania</p>
        </div>
        <Link
          href="/dashboard/events"
          className="shrink-0 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
        >
          View Details
        </Link>
      </div>
    </>
  )
}
