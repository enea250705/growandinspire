import Link from 'next/link'

export function JoinCTA() {
  return (
    <section className="bg-brand-black py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-white mb-4">
          Join a Community Built for Growth.
        </h2>
        <p className="text-white/50 text-lg mb-10">
          Grow your mindset. Grow your business. Grow together.
        </p>
        <Link
          href="/membership"
          className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
        >
          Join the Circle
        </Link>
      </div>
    </section>
  )
}
