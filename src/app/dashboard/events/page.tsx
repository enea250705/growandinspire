import Link from 'next/link'
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react'

const EVENTS = [
  {
    title: 'Grow and Inspire Business Conference',
    date: '25–26 Prill, 2026',
    location: 'Tirana International Hotel, Tiranë',
    time: '09:00 – 18:00',
    status: 'registered',
    ticket: 'Standard - €249',
    href: '/events',
  },
  {
    title: 'Dinner with Alketa - Qershor',
    date: '18 Qershor, 2026',
    location: 'Restaurant Oda, Tiranë',
    time: '19:30 – 22:00',
    status: 'pending',
    ticket: 'Invitation Only',
    href: '/dinner-with-alketa',
  },
  {
    title: 'Grow and Inspire Retreat 2026',
    date: 'Shtator, 2026',
    location: 'TBA - Shpallet pas konfirmimit',
    time: '2 ditë / 1 natë',
    status: 'interested',
    ticket: 'Interest List',
    href: '/',
  },
]

const STATUS_STYLE = {
  registered: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
  interested: 'bg-brand-gold/10 text-brand-gold border-brand-gold/20',
}

const STATUS_LABEL = {
  registered: 'I Regjistruar',
  pending: 'Aplikim në pritje',
  interested: 'Interest List',
}

export default function DashboardEventsPage() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Upcoming Events</h1>
          <p className="text-black/50">Eventet e tua të ardhshme dhe statuset.</p>
        </div>
        <Link
          href="/events"
          className="shrink-0 text-sm text-brand-gold font-medium hover:underline flex items-center gap-1"
        >
          Të gjitha eventet <ChevronRight size={13} />
        </Link>
      </div>

      <div className="space-y-4">
        {EVENTS.map((event) => (
          <div key={event.title} className="bg-brand-white rounded-2xl border border-black/8 p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <p className="font-semibold text-brand-black text-lg">{event.title}</p>
                <p className="text-xs text-brand-gold font-medium mt-1">{event.ticket}</p>
              </div>
              <span className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border ${STATUS_STYLE[event.status as keyof typeof STATUS_STYLE]}`}>
                {STATUS_LABEL[event.status as keyof typeof STATUS_LABEL]}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-black/50">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-brand-gold shrink-0" strokeWidth={1.5} />
                {event.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-brand-gold shrink-0" strokeWidth={1.5} />
                {event.time}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-gold shrink-0" strokeWidth={1.5} />
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-black/6 flex justify-end">
              <Link href={event.href} className="text-xs text-brand-gold hover:underline font-medium">
                Detaje →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
