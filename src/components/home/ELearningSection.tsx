import { Play, Lock } from 'lucide-react'
import Link from 'next/link'
import { PremiumBadge } from '@/components/ui/LockBadge'

const FREE_CONTENT = {
  title: 'Trailer - Ç\'është Grow and Inspire?',
  duration: '3:24',
  description: 'Zbulo platformën dhe vizionin pas lëvizjes Grow and Inspire.',
}

const EXCLUSIVE_PROGRAMS = [
  {
    title: 'Leadership Intensive',
    episodes: 8,
    description: 'Program 8-javësh për liderë në rritje. Hap pas hapi drejt impaktit.',
  },
  {
    title: 'Business Foundations',
    episodes: 12,
    description: 'Bazat e ndërtimit të biznesit - nga ideja deri te produkti i parë.',
  },
  {
    title: 'Personal Branding Masterclass',
    episodes: 6,
    description: 'Si të ndërtosh markën tënde personale dhe të tërheqësh mundësi.',
  },
]

const EXCLUSIVE_VIDEOS = [
  { title: 'Alketa Vejsiu - Historia ime', category: 'Meet the Founder' },
  { title: 'Si ta transformosh idenë në produkt', category: 'Class Business' },
  { title: 'Psikologjia e suksesit', category: 'Inspire Podcast' },
  { title: 'Ndërtimi i rrjetit profesional', category: 'Class Business' },
]

export function ELearningSection() {
  return (
    <section className="bg-brand-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">E-Learning</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-white mb-4">
            Programet dhe Përmbajtja
          </h2>
          <p className="text-white/50 text-lg max-w-2xl">
            Mëso nga Alketa Vejsiu dhe ekspertë të fushës. Programet ekskluzive dhe videot premium - ngjitur me komunitetin.
          </p>
        </div>

        {/* Free: Video Trailer */}
        <div className="mb-16">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Falas</p>
          <div className="group relative rounded-2xl bg-gradient-to-br from-brand-dark to-brand-black border border-white/10 hover:border-brand-gold/30 transition-all overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(196,167,107,0.08)_0%,_transparent_60%)]" />
            <div className="relative p-8 flex items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-brand-gold/10 border border-brand-gold/30 rounded-full flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                <Play size={24} className="text-brand-gold ml-1" strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest block mb-1">Video Trailer</span>
                <h3 className="font-serif text-2xl text-brand-white font-medium mb-1">{FREE_CONTENT.title}</h3>
                <p className="text-white/40 text-sm">{FREE_CONTENT.duration} · {FREE_CONTENT.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Paid: Exclusive Programs */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <p className="text-white/40 text-xs uppercase tracking-widest">Programe Ekskluzive</p>
            <PremiumBadge />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EXCLUSIVE_PROGRAMS.map((program) => (
              <Link
                key={program.title}
                href="/membership"
                className="group relative rounded-2xl border border-white/10 p-6 bg-brand-dark hover:border-brand-gold/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/30 text-xs">{program.episodes} episode</span>
                  <span className="flex items-center gap-1.5 text-brand-gold text-xs font-semibold">
                    <Lock size={11} strokeWidth={2} />
                    Members only
                  </span>
                </div>
                <h3 className="font-serif text-xl text-brand-white font-medium mb-2">{program.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{program.description}</p>
                <span className="text-brand-gold text-sm font-medium group-hover:underline">
                  Zhblloko me membership →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Paid: Exclusive Videos */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <p className="text-white/40 text-xs uppercase tracking-widest">Video Premium</p>
            <PremiumBadge />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXCLUSIVE_VIDEOS.map((video) => (
              <Link
                key={video.title}
                href="/membership"
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
                  Zhblloko
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/membership"
              className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
            >
              Bëhu Anëtar - Zhblloko të Gjitha
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
