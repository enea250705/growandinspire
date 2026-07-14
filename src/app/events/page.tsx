import Link from 'next/link'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  badge: string
  title: string
  subtitle: string
  featuredLabel: string
  event: {
    title: string
    type: string
    date: string
    location: string
    price: string
    capacity: string
    description: string
    ctaLabel: string
    href: string
  }
  collabBadge: string
  collabTitle: string
  collabDesc: string
  services: { title: string; desc: string }[]
  contactCta: string
}> = {
  en: {
    badge: 'Events',
    title: 'Business Events',
    subtitle: 'Conferences, dinners, coaching cohorts, and networking - curated experiences for purposeful growth.',
    featuredLabel: 'Featured Event',
    event: {
      title: 'Dinner with Alketa',
      type: 'Exclusive Dinner',
      date: 'May 15, 2026',
      location: 'Tirana, Albania',
      price: 'By application',
      capacity: '8-12 people',
      description: 'An exclusive executive dinner - curated conversations with purposeful leaders.',
      ctaLabel: 'Apply to Join',
      href: '/dinner-with-alketa',
    },
    collabBadge: 'In Collaboration with Class Events',
    collabTitle: 'Event Organization and Decoration',
    collabDesc: "Every Grow and Inspire event is produced together with Class Events - the team behind Albania's most refined corporate experiences. From full event organization to premium decoration and staging, Class Events also works directly with businesses for their own occasions.",
    services: [
      { title: 'Event Organization', desc: 'Concept, planning, production and coordination for business events of any scale.' },
      { title: 'Decoration and Staging', desc: 'Premium decoration, floral design and staging tailored to your brand and occasion.' },
    ],
    contactCta: 'Contact for Your Event',
  },
  sq: {
    badge: 'Evente',
    title: 'Evente Biznesi',
    subtitle: 'Konferenca, darka, grupe coaching dhe networking - eksperienca të kuruara për rritje me qëllim.',
    featuredLabel: 'Eventi Kryesor',
    event: {
      title: 'Dinner with Alketa',
      type: 'Darkë Ekskluzive',
      date: '15 Maj, 2026',
      location: 'Tiranë, Shqipëri',
      price: 'Me aplikim',
      capacity: '8-12 persona',
      description: 'Një darkë ekskluzive ekzekutive - biseda të kuruara me liderë me qëllim.',
      ctaLabel: 'Apliko për të marrë pjesë',
      href: '/dinner-with-alketa',
    },
    collabBadge: 'Në Bashkëpunim me Class Events',
    collabTitle: 'Organizim dhe Dekorim Eventesh',
    collabDesc: 'Çdo event i Grow and Inspire prodhohet së bashku me Class Events - ekipi pas eksperiencave korporative më të rafinuara në Shqipëri. Nga organizimi i plotë i eventit te dekorimi dhe skenografia premium, Class Events punon edhe drejtpërdrejt me bizneset për rastet e tyre.',
    services: [
      { title: 'Organizim Eventesh', desc: 'Koncept, planifikim, prodhim dhe koordinim për evente biznesi të çdo shkalle.' },
      { title: 'Dekorim dhe Skenografi', desc: 'Dekorim premium, dizajn floral dhe skenografi sipas brand-it dhe rastit tuaj.' },
    ],
    contactCta: 'Kontakto për Eventin Tënd',
  },
}

export default async function EventsPage() {
  const lang = await getLang()
  const c = CONTENT[lang]
  const featured = c.event

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">{c.badge}</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">
            {c.title}
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            {c.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Featured event */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-6">{c.featuredLabel}</p>
          <div className="bg-brand-black rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <span className="inline-block bg-brand-gold/20 text-brand-gold text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6 w-fit">
                  {featured.type}
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-white mb-4">
                  {featured.title}
                </h2>
                <p className="text-white/60 leading-relaxed mb-8">{featured.description}</p>
                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <Calendar size={14} className="text-brand-gold" />
                    {featured.date}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <MapPin size={14} className="text-brand-gold" />
                    {featured.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <Users size={14} className="text-brand-gold" />
                    {featured.capacity}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={featured.href}
                    className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
                  >
                    {featured.ctaLabel} <ArrowRight size={14} />
                  </Link>
                  <span className="text-white/40 text-sm">{featured.price}</span>
                </div>
              </div>
              <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-brand-dark to-brand-black min-h-[200px] flex items-center justify-center border-l border-white/10">
                <div className="text-center">
                  <p className="font-serif text-6xl font-bold text-white/10">2026</p>
                  <p className="text-white/30 text-sm mt-2">{featured.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Class Events collaboration */}
        <div className="mt-16 bg-brand-black rounded-2xl p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">{c.collabBadge}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-white mb-4">
                {c.collabTitle}
              </h2>
              <p className="text-white/60 leading-relaxed">
                {c.collabDesc}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {c.services.map((s) => (
                <div key={s.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-brand-white font-semibold mb-1">{s.title}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
              <Link
                href="/sponsorship"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors w-fit"
              >
                {c.contactCta} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
