import Link from 'next/link'
import { Layers } from 'lucide-react'
import { getSeriesListWithCounts } from '@/lib/content'
import { slugify } from '@/lib/content-meta'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

export const revalidate = 300

const T: Record<Lang, { badge: string; title: string; subtitle: string; empty: string }> = {
  en: {
    badge: 'Series and Programs',
    title: 'Series',
    subtitle: 'Video collections organized into episodes - follow them from start to finish.',
    empty: 'No series published yet.',
  },
  sq: {
    badge: 'Seri dhe Programe',
    title: 'Seritë',
    subtitle: 'Koleksione video të organizuara në episode - ndiqi nga fillimi deri në fund.',
    empty: 'Ende asnjë seri e publikuar.',
  },
}

export default async function SeriesIndexPage() {
  const series = await getSeriesListWithCounts()
  const lang = await getLang()
  const t = T[lang]

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t.badge}</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">{t.title}</h1>
          <p className="text-white/50 text-lg max-w-xl">
            {t.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {series.length === 0 ? (
          <div className="text-center py-20">
            <Layers size={28} className="text-black/20 mx-auto mb-4" />
            <p className="text-black/40">{t.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((s) => (
              <Link
                key={s.id}
                href={`/series/${slugify(s.title)}`}
                className="group bg-brand-white rounded-2xl border border-black/8 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-gradient-to-br from-brand-dark to-brand-black overflow-hidden">
                  {s.thumbnail_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.thumbnail_url} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  )}
                  <div className="absolute inset-0 bg-brand-black/25 group-hover:bg-brand-black/10 transition-colors" />
                  <span className="absolute bottom-3 left-3 bg-brand-black/60 text-white/85 text-xs px-2.5 py-1 rounded-full">
                    {s.videoCount} video
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-serif text-xl font-semibold text-brand-black mb-1">{s.title}</h2>
                  {s.description && <p className="text-black/50 text-sm line-clamp-2">{s.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
