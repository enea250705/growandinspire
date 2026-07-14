import Link from 'next/link'
import { Calendar, ChevronRight, Ticket } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const STATUS_STYLE: Record<string, string> = {
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  paid: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
  cancelled: 'bg-red-50 text-red-500 border-red-200',
}

const CONTENT: Record<Lang, {
  title: string
  subtitle: string
  allEvents: string
  empty: string
  browse: string
  eventReg: string
  registeredOn: string
  statusLabels: Record<string, string>
  pending: string
  locale: string
}> = {
  en: {
    title: 'Upcoming Events',
    subtitle: 'Your event registrations.',
    allEvents: 'All events',
    empty: "You haven't registered for any events yet.",
    browse: 'Browse events →',
    eventReg: 'Event Registration',
    registeredOn: 'Registered',
    statusLabels: { confirmed: 'Registered', paid: 'Paid', pending: 'Pending', cancelled: 'Cancelled' },
    pending: 'Pending',
    locale: 'en-US',
  },
  sq: {
    title: 'Eventet e Ardhshme',
    subtitle: 'Regjistrimet e tua në evente.',
    allEvents: 'Të gjitha eventet',
    empty: 'Nuk je regjistruar në asnjë event ende.',
    browse: 'Shfleto eventet →',
    eventReg: 'Regjistrim Eventi',
    registeredOn: 'Regjistruar',
    statusLabels: { confirmed: 'I Regjistruar', paid: 'Paguar', pending: 'Në pritje', cancelled: 'Anuluar' },
    pending: 'Në pritje',
    locale: 'sq-AL',
  },
}

export default async function DashboardEventsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const email = user?.email ?? ''
  const lang = await getLang()
  const c = CONTENT[lang]

  const fmt = (iso: string) => new Date(iso).toLocaleDateString(c.locale, { day: 'numeric', month: 'long', year: 'numeric' })

  const { data } = await supabase
    .from('event_registrations')
    .select('id, name, status, created_at')
    .eq('email', email)
    .order('created_at', { ascending: false })

  const regs = data ?? []

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">{c.title}</h1>
          <p className="text-black/50">{c.subtitle}</p>
        </div>
        <Link
          href="/events"
          className="shrink-0 text-sm text-brand-gold font-medium hover:underline flex items-center gap-1"
        >
          {c.allEvents} <ChevronRight size={13} />
        </Link>
      </div>

      {regs.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8">
          <Ticket size={32} className="text-black/20 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-black/40 mb-4">{c.empty}</p>
          <Link href="/events" className="text-brand-gold text-sm font-medium hover:underline">
            {c.browse}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {regs.map((event) => (
            <div key={event.id} className="bg-brand-white rounded-2xl border border-black/8 p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-brand-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-black">{c.eventReg}</p>
                    <p className="text-xs text-black/40 mt-0.5">{c.registeredOn} {fmt(event.created_at)}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border ${STATUS_STYLE[event.status] ?? STATUS_STYLE.pending}`}>
                  {c.statusLabels[event.status] ?? c.pending}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
