import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const STATS = [
  { value: '10+', label: 'Years in media and business' },
  { value: '50k+', label: 'Community members' },
  { value: '200+', label: 'Podcast episodes' },
  { value: '5', label: 'Business verticals' },
]

const BRANDS = [
  { name: 'Class Media', desc: 'Albania\'s leading independent media house' },
  { name: 'Inspire Podcast', desc: 'Top business podcast in Albanian language' },
  { name: 'Revista Class', desc: 'Premium business and lifestyle magazine' },
  { name: 'Class Events', desc: 'Corporate event organization and decoration' },
  { name: 'Grow and Inspire', desc: 'Membership platform for growth' },
]

export default function AboutPage() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-black py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6">About</p>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-6 leading-tight">
                Alketa Vejsiu and Class Media
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                Alketa Vejsiu is Albania&apos;s most influential voice in business media - entrepreneur, podcast host, keynote speaker, and community builder. Founder of Class Media, the company behind Albania&apos;s leading business media ecosystem.
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                Grow and Inspire is her most personal project yet - a platform built to transfer the knowledge, connections, and experiences she has curated over a decade, directly to the next generation of Albanian leaders.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label }) => (
                <div key={label} className="bg-brand-dark rounded-2xl border border-white/10 p-7 text-center">
                  <p className="font-serif text-4xl font-bold text-brand-gold mb-2">{value}</p>
                  <p className="text-white/50 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28 border-b border-black/8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6">The Story</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-black mb-8">
            Built from the ground up
          </h2>
          <div className="flex flex-col gap-6 text-black/70 leading-relaxed text-lg">
            <p>
              Class Media was founded with a single conviction: Albania deserves world-class business content. What started as a magazine became a podcast, then an events business, then a full media ecosystem reaching hundreds of thousands of people.
            </p>
            <p>
              Grow and Inspire is the natural next step - a community where members do not just consume content, but build relationships, access exclusive experiences, and accelerate their own growth alongside like-minded leaders.
            </p>
            <p>
              Every product in the ecosystem - from the podcast to the conference to the dinner table - is designed with one purpose: to create real, lasting impact in the lives of Albanian professionals and entrepreneurs.
            </p>
          </div>
        </div>
      </section>

      {/* The Class ecosystem */}
      <section className="py-20 lg:py-28 border-b border-black/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">The Ecosystem</p>
            <h2 className="font-serif text-4xl font-bold text-brand-black">The Class Family</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRANDS.map(({ name, desc }) => (
              <div key={name} className="bg-brand-white rounded-2xl border border-black/8 p-7 hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl font-bold text-brand-black mb-2">{name}</h3>
                <p className="text-black/50 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-black py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-white mb-4">Ready to be part of it?</h2>
          <p className="text-white/50 mb-8">Join thousands of Albanian professionals growing together.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
            >
              Join the Circle <ArrowRight size={14} />
            </Link>
            <Link
              href="/sponsorship"
              className="inline-flex items-center justify-center border border-white/20 text-brand-white px-7 py-3.5 rounded-full text-sm font-medium hover:border-white/50 transition-colors"
            >
              Partner with Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
