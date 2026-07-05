import Link from 'next/link'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'

const EVENTS = [
  {
    id: '1',
    title: 'Grow and Inspire Business Conference',
    type: 'Conference',
    date: 'April 25–26, 2026',
    location: 'Tirana, Albania',
    price: '€150 – €175',
    capacity: 'Limited seats',
    description: 'Two days of keynotes, expert panels, Smart Talks, and networking. The flagship annual event for Albanian business leaders.',
    cta: { label: 'Register Interest', href: '/coaching#conference-register' },
    featured: true,
  },
  {
    id: '2',
    title: 'Dinner with Alketa',
    type: 'Exclusive Dinner',
    date: 'May 15, 2026',
    location: 'Tirana, Albania',
    price: 'By application',
    capacity: '8–12 people',
    description: 'An exclusive executive dinner - curated conversations with purposeful leaders.',
    cta: { label: 'Apply to Join', href: '/dinner-with-alketa' },
    featured: false,
  },
  {
    id: '3',
    title: 'Idea Tables with Alketa',
    type: 'Brainstorming Session',
    date: 'June 20, 2026',
    location: 'Tirana, Albania',
    price: 'By application',
    capacity: 'Small group',
    description: 'A curated session where young entrepreneurs present ideas and receive direct feedback from Alketa and selected mentors.',
    cta: { label: 'Apply Now', href: '/apply' },
    featured: false,
  },
  {
    id: '4',
    title: 'Coaching Cohort - Summer 2026',
    type: 'Group Coaching',
    date: 'July 15, 2026',
    location: 'Online',
    price: 'Members only',
    capacity: 'Max 10 people',
    description: 'A structured 8-week coaching group focused on business growth and personal leadership.',
    cta: { label: 'Learn More', href: '/coaching' },
    featured: false,
  },
  {
    id: '5',
    title: 'Business Breakfast - September',
    type: 'Networking',
    date: 'September 2026',
    location: 'Tirana, Albania',
    price: 'Members priority',
    capacity: 'Open registration',
    description: 'A morning of structured networking and peer learning for Grow and Inspire community members.',
    cta: { label: 'Register Interest', href: '/membership' },
    featured: false,
  },
  {
    id: '6',
    title: 'Women Leaders Forum',
    type: 'Forum',
    date: 'November 2026',
    location: 'Tirana, Albania',
    price: 'TBC',
    capacity: 'Open',
    description: 'A dedicated half-day forum celebrating and empowering women driving change in Albanian business and society.',
    cta: { label: 'Register Interest', href: '/membership' },
    featured: false,
  },
]

export default function EventsPage() {
  const featured = EVENTS[0]
  const rest = EVENTS.slice(1)

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Events</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">
            Business Events
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Conferences, dinners, coaching cohorts, and networking - curated experiences for purposeful growth.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Featured event */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-6">Featured Event</p>
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
                    href={featured.cta.href}
                    className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
                  >
                    {featured.cta.label} <ArrowRight size={14} />
                  </Link>
                  <span className="text-white/40 text-sm">{featured.price}</span>
                </div>
              </div>
              <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-brand-dark to-brand-black min-h-[200px] flex items-center justify-center border-l border-white/10">
                <div className="text-center">
                  <p className="font-serif text-6xl font-bold text-white/10">2026</p>
                  <p className="text-white/30 text-sm mt-2">April 25–26</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of events grid */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-6">All Events</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((event) => (
            <div key={event.id} className="bg-brand-white rounded-2xl border border-black/8 p-6 flex flex-col hover:shadow-md transition-shadow">
              <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-3">{event.type}</span>
              <h3 className="font-serif text-lg font-bold text-brand-black mb-2 leading-snug">{event.title}</h3>
              <p className="text-black/50 text-sm leading-relaxed mb-4 flex-1">{event.description}</p>
              <div className="flex flex-col gap-2 mb-5 text-xs text-black/40">
                <div className="flex items-center gap-2"><Calendar size={12} className="text-brand-gold" />{event.date}</div>
                <div className="flex items-center gap-2"><MapPin size={12} className="text-brand-gold" />{event.location}</div>
                <div className="flex items-center gap-2"><Users size={12} className="text-brand-gold" />{event.capacity}</div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-black/6">
                <span className="text-xs text-black/40">{event.price}</span>
                <Link href={event.cta.href} className="text-brand-gold text-sm font-medium hover:underline flex items-center gap-1">
                  {event.cta.label} <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
