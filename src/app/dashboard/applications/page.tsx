import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const STATUS_META = {
  pending: { icon: Clock, color: 'text-amber-500 bg-amber-50 border-amber-200' },
  approved: { icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
  confirmed: { icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
  paid: { icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
  rejected: { icon: XCircle, color: 'text-red-500 bg-red-50 border-red-200' },
  cancelled: { icon: XCircle, color: 'text-red-500 bg-red-50 border-red-200' },
}

const CONTENT: Record<Lang, {
  title: string
  subtitle: string
  empty: string
  review: string
  eventReg: string
  eventRegNote: string
  appliedOn: string
  appTypeLabel: Record<string, string>
  statusLabels: Record<keyof typeof STATUS_META, string>
  locale: string
}> = {
  en: {
    title: 'My Applications',
    subtitle: 'Track the status of your applications.',
    empty: "You don't have any applications yet.",
    review: 'Application received. The team is reviewing it.',
    eventReg: 'Event Registration',
    eventRegNote: 'Registration received.',
    appliedOn: 'Applied',
    appTypeLabel: { job: 'Work with Class', guest: 'Become a Guest', investment: 'Ideas and Angel Investor' },
    statusLabels: { pending: 'Pending', approved: 'Approved', confirmed: 'Confirmed', paid: 'Paid', rejected: 'Rejected', cancelled: 'Cancelled' },
    locale: 'en-US',
  },
  sq: {
    title: 'Aplikimet e Mia',
    subtitle: 'Gjurmo statusin e aplikimeve tua.',
    empty: 'Nuk ke aplikime ende.',
    review: 'Aplikimi u mor. Ekipi po shqyrton.',
    eventReg: 'Regjistrim Eventi',
    eventRegNote: 'Regjistrimi u mor.',
    appliedOn: 'Aplikuar',
    appTypeLabel: { job: 'Work with Class', guest: 'Become a Guest', investment: 'Ideas and Angel Investor' },
    statusLabels: { pending: 'Në pritje', approved: 'Aprovuar', confirmed: 'Konfirmuar', paid: 'Paguar', rejected: 'Refuzuar', cancelled: 'Anuluar' },
    locale: 'sq-AL',
  },
}

interface Row {
  label: string
  date: string
  status: string
  note: string
}

export default async function ApplicationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const email = user?.email ?? ''
  const lang = await getLang()
  const c = CONTENT[lang]

  const fmt = (iso: string) => new Date(iso).toLocaleDateString(c.locale, { day: 'numeric', month: 'long', year: 'numeric' })

  const [dinner, apps, regs, podcast, ideas, coaching] = await Promise.all([
    supabase.from('dinner_applications').select('status, created_at').eq('email', email),
    supabase.from('applications').select('type, status, created_at').eq('email', email),
    supabase.from('event_registrations').select('status, created_at').eq('email', email),
    supabase.from('podcast_applications').select('status, created_at').eq('email', email),
    supabase.from('idea_tables_applications').select('status, created_at').eq('email', email),
    supabase.from('coaching_applications').select('status, created_at').eq('email', email),
  ])

  const rows: Row[] = []

  for (const d of dinner.data ?? []) {
    rows.push({ label: 'Dinner with Alketa', date: d.created_at, status: d.status, note: c.review })
  }
  for (const a of apps.data ?? []) {
    rows.push({ label: c.appTypeLabel[a.type] ?? a.type, date: a.created_at, status: a.status, note: c.review })
  }
  for (const r of regs.data ?? []) {
    rows.push({ label: c.eventReg, date: r.created_at, status: r.status, note: c.eventRegNote })
  }
  for (const p of podcast.data ?? []) {
    rows.push({ label: 'Podcast Guest', date: p.created_at, status: p.status, note: c.review })
  }
  for (const i of ideas.data ?? []) {
    rows.push({ label: 'Idea Tables', date: i.created_at, status: i.status, note: c.review })
  }
  for (const entry of coaching.data ?? []) {
    rows.push({ label: 'Coaching', date: entry.created_at, status: entry.status, note: c.review })
  }

  rows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">{c.title}</h1>
        <p className="text-black/50">{c.subtitle}</p>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8">
          <FileText size={32} className="text-black/20 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-black/40">{c.empty}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((app, i) => {
            const key = (app.status as keyof typeof STATUS_META) in STATUS_META ? (app.status as keyof typeof STATUS_META) : 'pending'
            const s = STATUS_META[key]
            const StatusIcon = s.icon
            return (
              <div key={`${app.label}-${i}`} className="bg-brand-white rounded-2xl border border-black/8 p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-black">{app.label}</p>
                      <p className="text-xs text-black/40 mt-0.5">{c.appliedOn} {fmt(app.date)}</p>
                      <p className="text-sm text-black/50 mt-2">{app.note}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${s.color}`}>
                    <StatusIcon size={12} strokeWidth={2} />
                    {c.statusLabels[key]}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
