import Link from 'next/link'
import { Mic2, Users, Palette, Briefcase, BookOpen } from 'lucide-react'

const CATEGORIES = [
  {
    icon: Mic2,
    title: 'Inspire Podcast',
    description: 'Conversations with leaders, founders, and creatives shaping Albania and beyond.',
    href: '/watch/podcast',
  },
  {
    icon: Users,
    title: 'Meet the Founder',
    description: 'Raw, unfiltered founder stories - the pivots, the failures, the breakthroughs.',
    href: '/watch/meet-the-founder',
  },
  {
    icon: Palette,
    title: 'Meet the Artist',
    description: 'Where creativity meets commerce. Albanian artists building global careers.',
    href: '/watch/meet-the-artist',
  },
  {
    icon: Briefcase,
    title: 'Class Business',
    description: 'Frameworks, strategies, and insights for the modern business builder.',
    href: '/watch/class-business',
  },
  {
    icon: BookOpen,
    title: 'Revista Class',
    description: 'Long-form articles and features from the Class Media editorial team.',
    href: '/watch/revista-class',
  },
]

export function Ecosystem() {
  return (
    <section id="ecosystem" className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Watch</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black">Kategori</h2>
          </div>
          <Link
            href="/watch"
            className="text-sm font-medium text-brand-gold hover:underline hidden sm:block"
          >
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map(({ icon: Icon, title, description, href }) => (
            <Link
              key={title}
              href={href}
              className="group bg-brand-white rounded-2xl border border-black/8 p-6 hover:border-brand-gold/30 hover:shadow-md transition-all"
            >
              <div className="mb-4">
                <Icon size={24} className="text-brand-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-brand-black mb-2 text-sm">{title}</h3>
              <p className="text-black/50 text-xs leading-relaxed mb-4">{description}</p>
              <span className="text-brand-gold text-sm font-medium group-hover:underline">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
