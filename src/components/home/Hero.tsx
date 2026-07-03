import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-brand-black flex items-center pt-16">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(196,167,107,0.08)_0%,_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              A Premium Platform
            </p>
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-brand-white leading-[1.05] mb-8">
              Grow.<br />
              Inspire.<br />
              Lead.
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-md mb-10">
              A premium platform for personal growth, business leadership, meaningful connections, and curated experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/watch"
                className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
              >
                Watch Free
              </Link>
              <Link
                href="/membership"
                className="inline-flex items-center justify-center border border-white/20 text-brand-white px-7 py-3.5 rounded-full text-sm font-medium hover:border-white/50 hover:bg-white/5 transition-colors"
              >
                Become a Member
              </Link>
            </div>
          </div>

          {/* Right — visual block */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-brand-dark to-brand-black border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(196,167,107,0.15)_0%,_transparent_70%)]" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="w-12 h-px bg-brand-gold mb-4" />
                  <p className="font-serif text-2xl text-brand-white font-medium leading-snug">
                    &ldquo;Build something that outlasts the moment.&rdquo;
                  </p>
                  <p className="text-white/40 text-sm mt-3">— Alketa Vejsiu</p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-brand-gold text-brand-black text-xs font-bold px-4 py-2 rounded-full">
                Premium Circle
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-white/20" />
      </div>
    </section>
  )
}
