import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const STATUS = {
  pending: { label: 'Në pritje', icon: Clock, color: 'text-amber-500 bg-amber-50 border-amber-200' },
  approved: { label: 'Aprovuar', icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
  confirmed: { label: 'Konfirmuar', icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
  paid: { label: 'Paguar', icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
  rejected: { label: 'Refuzuar', icon: XCircle, color: 'text-red-500 bg-red-50 border-red-200' },
  cancelled: { label: 'Anuluar', icon: XCircle, color: 'text-red-500 bg-red-50 border-red-200' },
}

const APP_TYPE_LABEL: Record<string, string> = {
  job: 'Work with Class',
  guest: 'Become a Guest',
  investment: 'Ideas and Angel Investor',
}

interface Row {
  label: string
  date: string
  status: string
  note: string
}

function fmt(iso: string): string {
  return new Date(iso).toLocaleDateString('sq-AL', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function ApplicationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const email = user?.email ?? ''

  const [dinner, apps, regs, podcast, ideas, coaching] = await Promise.all([
    supabase.from('dinner_applications').select('status, created_at').eq('email', email),
    supabase.from('applications').select('type, status, created_at').eq('email', email),
    supabase.from('event_registrations').select('status, created_at').eq('email', email),
    supabase.from('podcast_applications').select('status, created_at').eq('email', email),
    supabase.from('idea_tables_applications').select('status, created_at').eq('email', email),
    supabase.from('coaching_applications').select('status, created_at').eq('email', email),
  ])

  const rows: Row[] = []
  const REVIEW = 'Aplikimi u mor. Ekipi po shqyrton.'

  for (const d of dinner.data ?? []) {
    rows.push({ label: 'Dinner with Alketa', date: d.created_at, status: d.status, note: REVIEW })
  }
  for (const a of apps.data ?? []) {
    rows.push({ label: APP_TYPE_LABEL[a.type] ?? a.type, date: a.created_at, status: a.status, note: REVIEW })
  }
  for (const r of regs.data ?? []) {
    rows.push({ label: 'Regjistrim Eventi', date: r.created_at, status: r.status, note: 'Regjistrimi u mor.' })
  }
  for (const p of podcast.data ?? []) {
    rows.push({ label: 'Podcast Guest', date: p.created_at, status: p.status, note: REVIEW })
  }
  for (const i of ideas.data ?? []) {
    rows.push({ label: 'Idea Tables', date: i.created_at, status: i.status, note: REVIEW })
  }
  for (const c of coaching.data ?? []) {
    rows.push({ label: 'Coaching', date: c.created_at, status: c.status, note: REVIEW })
  }

  rows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">My Applications</h1>
        <p className="text-black/50">Gjurmo statusin e aplikimeve tua.</p>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8">
          <FileText size={32} className="text-black/20 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-black/40">Nuk ke aplikime ende.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((app, i) => {
            const s = STATUS[app.status as keyof typeof STATUS] ?? STATUS.pending
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
                      <p className="text-xs text-black/40 mt-0.5">Aplikuar {fmt(app.date)}</p>
                      <p className="text-sm text-black/50 mt-2">{app.note}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${s.color}`}>
                    <StatusIcon size={12} strokeWidth={2} />
                    {s.label}
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
