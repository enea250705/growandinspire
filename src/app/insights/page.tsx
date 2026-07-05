import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import { MOCK_CONTENT, formatDate } from '@/lib/mock-content'

const ARTICLES = MOCK_CONTENT.filter((c) => c.type === 'revista')

const FEATURED_TOPICS = [
  'Lidership femëror',
  'Sipërmarrje',
  'Biznesi shqiptar',
  'Mirëqenie dhe performancë',
  'Personal brand',
  'Financat personale',
  'Komunikim',
  'Teknologji dhe inovacion',
]

export default function InsightsPage() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen">
      {/* Hero */}
      <section className="bg-brand-black py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Insights</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-5 max-w-2xl">
            Ide. Analiza. Perspektiva.
          </h1>
          <p className="text-white/50 text-xl max-w-xl">
            Artikuj dhe analiza të thellë nga ekipi editorial i Grow and Inspire dhe Revista Class - për liderë që duan të mendojnë ndryshe.
          </p>
        </div>
      </section>

      {/* Topics */}
      <section className="bg-brand-cream border-b border-black/8 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-black/40 uppercase tracking-widest mr-2">Tema:</span>
            {FEATURED_TOPICS.map((t) => (
              <button
                key={t}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-black/15 text-black/60 hover:border-brand-gold/40 hover:text-brand-gold transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-brand-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured */}
            <div className="lg:col-span-2">
              <p className="text-xs text-black/40 uppercase tracking-widest mb-6">Artikulli kryesor</p>
              {ARTICLES[0] && (
                <article className="bg-brand-white rounded-3xl border border-black/8 overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-brand-dark to-brand-black flex items-center justify-center">
                    <BookOpen size={40} className="text-brand-gold/40" strokeWidth={1} />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest">Revista Class</span>
                      <span className="text-black/30 text-xs">{formatDate(ARTICLES[0].published_at)}</span>
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-brand-black mb-3 group-hover:text-brand-gold transition-colors">
                      {ARTICLES[0].title}
                    </h2>
                    <p className="text-black/60 leading-relaxed mb-6">{ARTICLES[0].description}</p>
                    <Link
                      href="/watch/revista-class"
                      className="inline-flex items-center gap-2 text-brand-gold text-sm font-semibold hover:underline"
                    >
                      Lexo artikullin <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              )}
            </div>

            {/* Sidebar articles */}
            <div>
              <p className="text-xs text-black/40 uppercase tracking-widest mb-6">Të fundit</p>
              <div className="space-y-4">
                {ARTICLES.slice(1).map((article) => (
                  <article key={article.id} className="bg-brand-white rounded-2xl border border-black/8 p-5 group hover:border-brand-gold/20 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-brand-gold text-[10px] font-semibold uppercase tracking-widest">Revista Class</span>
                      <span className="text-black/30 text-[10px]">{formatDate(article.published_at)}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-black mb-2 group-hover:text-brand-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-black/50 text-sm leading-relaxed line-clamp-2">{article.description}</p>
                    <Link
                      href="/watch/revista-class"
                      className="mt-3 inline-flex items-center gap-1 text-brand-gold text-xs font-semibold hover:underline"
                    >
                      Lexo <ArrowRight size={11} />
                    </Link>
                  </article>
                ))}

                {/* More from Watch */}
                <div className="bg-brand-black rounded-2xl p-5">
                  <p className="text-brand-white font-semibold text-sm mb-2">Shiko edhe episodet</p>
                  <p className="text-white/40 text-xs mb-4">Podcast, intervista dhe klasa biznesi.</p>
                  <Link
                    href="/watch"
                    className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-4 py-2 rounded-full text-xs font-semibold hover:bg-brand-gold-light transition-colors"
                  >
                    Shko te Watch <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
