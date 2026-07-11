import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-brand-black flex items-center pt-16 lg:pt-24">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,180,166,0.08)_0%,_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - text */}
          <div>
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              A Premium Platform
            </p>
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-brand-white leading-[1.05] mb-8">
              Grow.<br />
              <span className="text-brand-gold">Inspire.</span><br />
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

          {/* Right - visual block */}
          <div className="block">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl border border-white/10 overflow-hidden bg-brand-black">
                <Image
                  src="/hero-alketa.png"
                  alt="Alketa Vejsiu"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top"
                />
                {/* gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/10 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="w-12 h-px bg-brand-gold mb-4" />
                  <p className="font-serif text-2xl text-brand-white font-medium leading-snug">
                    &ldquo;Lead by growing. Inspire by leading.&rdquo;
                  </p>
                  <p className="text-white/60 text-sm mt-3">- Alketa Vejsiu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
