import Link from 'next/link'

const EVENTS = [
  {
    initial: 'G',
    date: 'APR 25, 2026',
    title: 'Grow and Inspire Conference',
    location: 'Tirana, Albania',
    cta: { text: 'Register Interest →', href: '/events' },
  },
  {
    initial: 'D',
    date: 'MAY 15, 2026',
    title: 'Dinner with Alketa',
    location: 'Tirana, Albania',
    cta: { text: 'Apply to Join →', href: '/dinner-with-alketa' },
  },
  {
    initial: 'I',
    date: 'JUN 20, 2026',
    title: 'Idea Tables with Alketa',
    location: 'Tirana, Albania',
    cta: { text: 'Apply Now →', href: '/apply' },
  },
  {
    initial: 'C',
    date: 'JUL 15, 2026',
    title: 'Coaching Cohort',
    location: 'Online Program',
    cta: { text: 'Learn More →', href: '/coaching' },
  },
]

export function UpcomingEvents() {
  return (
    <section className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Calendar</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black">
            Upcoming Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EVENTS.map(({ initial, date, title, location, cta }) => (
            <div
              key={title}
              className="bg-brand-white rounded-2xl border border-black/8 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full border border-brand-gold/40 flex items-center justify-center">
                <span className="text-brand-gold font-semibold text-sm">{initial}</span>
              </div>

              <div>
                <p className="text-black/40 text-xs font-medium tracking-widest uppercase mb-2">{date}</p>
                <h3 className="font-serif font-semibold text-brand-black text-lg leading-snug mb-1">
                  {title}
                </h3>
                <p className="text-black/50 text-sm">{location}</p>
              </div>

              <Link
                href={cta.href}
                className="text-brand-gold text-sm font-medium hover:underline mt-auto"
              >
                {cta.text}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
